---
title: Develop and validate a QEC protocol
description: Define a quantum error correction code, build a qodec, audit its declarations, analyze gadget faults, and save the protocol.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 10/21/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["QDK", "Python", "qodec", "Stim", "Linux", "Windows", "Arm64", "Jupyter", "C4", "Pauli", "HiGHS", "MWPF", "CNOT", "YAML", "QIR"]
ai-usage: ai-assisted
uid: microsoft.quantum.how-to.develop-qec-protocol
# Customer intent: As a QEC researcher, I want to develop and validate an executable protocol so that I can assess its correctness and fault behavior.
---

# Develop and validate a QEC protocol

Use `qodec` and the `qdk.ec` module from the Microsoft Quantum Development Kit (QDK) to define a quantum error correction (QEC) code and turn it into an executable protocol. In this article, you define an error code, build a baseline qodec, validate its declarations, calculate gadget distance, and save the protocol.

The examples in this article use the $[[4,2,2]]$ C4 code, which stores two logical qubits in four physical qubits and detects any single physical Pauli error.

## Prerequisites

Complete these tasks before you start:

- [Install QDK for error correction](xref:microsoft.quantum.how-to.install-qdk-error-correction).
- Use an environment with Python 3.11 or later.
- Confirm that the qodec Stim parser is available. On Linux Arm64 or Windows Arm64, install Stim from source, and then restart Python or the Jupyter kernel before you call `build_qodec`.

## Define the code

Create a `qodec.Code` object with the code stabilizers and one logical X and Z representative for each logical qubit.

```python
import qodec

c4 = qodec.Code(
    "C4",
    stabilizers=["X_0 X_1 X_2 X_3", "Z_0 Z_1 Z_2 Z_3"],
    x=["X_0 X_1", "X_0 X_2"],
    z=["Z_0 Z_2", "Z_0 Z_1"],
)
```

The `qodec` package uses sparse notation for Pauli strings. Each term has a Pauli letter and a physical qubit label. For example, `X_0 X_2` applies X to physical qubits 0 and 2.

The code definition is a static mathematical object. It doesn't include circuits that prepare, preserve, or measure encoded states.

## Analyze the code

To inspect a snapshot of the code operators, create a `CodeProfile`.

```python
from qdk import ec

profile = ec.CodeProfile(c4)

print("Physical support:", sorted(profile.support))
print("Physical qubits:", profile.length)
print("Logical qubits:", profile.logical_qubit_count)
print("Stabilizers:", profile.stabilizers)
print("Logical X operators:", profile.x)
print("Logical Z operators:", profile.z)
```

The profile doesn't change if you later change the original `qodec.Code` object.

### Calculate the code distance

To find the minimum number of allowed physical errors that cause a nontrivial logical effect with zero syndrome, call `distance`.

```python
distance = profile.distance()
print("Code distance:", distance)

error = distance.witness.product
syndrome = profile.syndrome_of(error)
logical_effect = profile.logical_effect_of(error)

print("Witness:", error)
print("Syndrome:", sorted(syndrome))
print("Logical effect:", logical_effect)

assert distance.value == 2
assert profile.is_logical(error)
```

By default, the search assigns cost one to each single-qubit X, Y, or Z error. The returned `Distance` has certified bounds and a witness for any finite upper bound.

When a complete exact search costs too much, use `distance_bounds`.

```python
bounds = profile.distance_bounds(upper_bound=4)
print("Distance bounds:", bounds)
print("Lower bound:", bounds.lower_bound)
print("Upper bound:", bounds.upper_bound)
```

The default solver is HiGHS. To use a different solver, set `solver="enumeration"`, or install MWPF and set `solver="mwpf"`.

## Build a baseline qodec

A *qodec* describes how to run encoded instructions. It has instruction sets, codes, layers, gadgets, circuits, checks, and readout equations.

Use `build_qodec` to create a two-layer protocol from the C4 code.

```python
protocol = ec.build_qodec(
    c4,
    strategy="bare-css/v1",
    strict=False,
)
```

This example uses `bare-css/v1` to let you inspect a simple protocol without flag qubits.

> [!CAUTION]
> The `bare-css/v1` strategy doesn't promise fault-tolerant circuits. Calculate each gadget's distance before you use the protocol for noisy experiments.

The builder tries to create these logical instructions:

- `prepare_z_all`
- `prepare_x_all`
- `syndrome`
- `measure_z_all`
- `measure_x_all`
- `h_all`
- `cx_all`

The `_all` suffix means that an instruction acts on every logical qubit in a block. For example, `cx_all` applies CNOT between corresponding logical qubits in two blocks.

Not every code supports every candidate instruction. With `strict=True`, which is the default, the builder raises an error when it cannot build and verify a candidate. With `strict=False`, the builder keeps the supported instructions and records omissions in `protocol.metadata["qdk.ec"]["build"]["omitted"]`.

Inspect the logical layer and its gadgets.

```python
logical_layer = protocol.layers[0]

print("Instructions:")
for mnemonic in logical_layer.instruction_set.instructions:
    print(" -", mnemonic)

print("Gadgets:")
for mnemonic in logical_layer.gadgets:
    print(" -", mnemonic)
```

The second layer contains the physical Stim instruction set that the generated circuits use.

## Inspect a gadget

A logical instruction declares a contract. Its gadget gives the circuit that implements the contract.

Inspect the `prepare_z_all` gadget.

```python
gadget = logical_layer.gadgets["prepare_z_all"]
gadget_profile = ec.GadgetProfile(gadget)

print("Declared objective:")
print(gadget_profile.objective)

print("Computed action:")
print(gadget_profile.action)
```

Compare the action computed from the circuit with the declared instruction objective.

```python
objective = gadget_profile.objective
assert objective is not None

if gadget_profile.action.is_equivalent_to(objective):
    print("The gadget implements its declared instruction.")
else:
    print(objective.why_not_equivalent_to(gadget_profile.action))
```

A `GadgetProfile` takes a snapshot of its input, so it doesn't reflect later changes. After you edit a gadget, create a new profile.

## Audit the protocol

Use `audit` to check the whole qodec.

```python
report = ec.audit(protocol)
print(report)
```

If the audit finds no errors or warnings, it prints:

```output
audit: ok
```

The audit checks these areas:

- Code algebra
- Instruction and layer structure
- Circuit calls and parameter bindings
- Gadget actions
- Checks and readout equations
- Flag equations
- Input and output frame relations
- Reference bounds and protocol completeness

To act on specific severities, use the report collections.

```python
if report.errors:
    for diagnostic in report.errors:
        print(diagnostic)
    raise ValueError("The qodec has audit errors.")

if report.warnings:
    for diagnostic in report.warnings:
        print(diagnostic)
```

The `report.ok` value means that the report has no errors. Warnings don't change that property.

### Derive missing equations

Use `filled` when a draft gadget or qodec omits checks or logical readout equations that exact simulation can derive.

The following example creates an incomplete copy of the protocol.

```python
draft = qodec.Qodec.loads(protocol.dumps())
draft_gadgets = draft.layers[0].gadgets

draft_gadgets["measure_x_all"].readouts = []
draft_gadgets["cx_all"].checks = []

print(ec.audit(draft))
```

Fill in the supported equations, and then audit the result.

```python
completed = ec.filled(draft)
print(ec.audit(completed))
```

The `filled` function returns a new gadget or qodec and doesn't change its input. It derives checks, observable readout equations, and frame relations. It preserves flag bindings because noiseless simulation can't identify which faults a flag should detect.

If the original protocol already has verified direct equations, `filled` keeps them when possible.

## Analyze gadget faults

An audit with no errors proves noiseless consistency. It doesn't prove fault tolerance.

Call `GadgetProfile.distance` to find the minimum number of allowed circuit faults that causes a logical failure while all declared checks and flags remain zero. The combined fault must also leave each output inside its code space.

```python
protocol = completed

for mnemonic, gadget in sorted(protocol.layers[0].gadgets.items()):
    result = ec.GadgetProfile(gadget).distance()
    witness = result.witness if result.upper_bound is not None else "none"
    print(f"{mnemonic}: distance={result}, witness={witness}")
```

The default fault model includes these events after each circuit call:

- A Pauli error on the qubits that the call touches
- A flip of a readout bit that the call produces
- A correlated combination of those errors

Each event at one call costs one, even when it has a correlated multiqubit error.

A code can have distance two while one of its gadgets has distance one. For example, a single circuit fault can spread through an ancilla and create an undetected logical error. Add checks or flag circuits, then create a new `GadgetProfile` and calculate the distance again.

### Inspect a specific fault

Use `FaultEvent.after` to define a fault after a zero-based circuit call index.

```python
gadget = protocol.layers[0].gadgets["syndrome"]
profile = ec.GadgetProfile(gadget)

fault = ec.FaultEvent.after(0, ec.Pauli("X_0"))
(effect,) = profile.effects_of([fault])

print("Fault:", fault)
print("Changed quantities:", effect)
```

A `FaultEffect` can include changed checks, logical readouts, and output frame signs. Use explicit fault sets when the default circuit-level model doesn't match your hardware assumptions.

```python
result = profile.distance(faults=[fault])
print(result)
```

Exact gadget searches can take a long time because the default fault set grows exponentially with each call's support. Use `distance_bounds`, an explicit fault set, or an `upper_bound` when you need to limit the search.

## Save the protocol

Audit the final qodec before you save it.

```python
report = ec.audit(protocol)
if report.errors or report.warnings:
    raise ValueError(str(report))
```

Save the protocol as a single YAML bundle, and then load it again to check that it matches the original.

```python
from pathlib import Path

output_directory = Path("qodec-output")
output_directory.mkdir(exist_ok=True)

saved_path = protocol.save(str(output_directory), single_file=True)
loaded = qodec.Qodec.load(saved_path)

assert loaded == protocol
print("Saved qodec:", saved_path)
```

A single-file bundle stores the manifest, code definitions, instruction sets, gadgets, and circuit sources in one YAML file, which makes it easy to share and reload.

## Run the protocol

After the qodec passes its audit and meets your distance requirements, compile a logical program to Quantum Intermediate Representation (QIR) and run it through the protocol. See [Run and decode logical programs](xref:microsoft.quantum.how-to.run-decode-logical-programs).

For a complete example that adds flag circuits and compares logical error rates, see the [QEC protocol walkthrough](https://github.com/microsoft/qdk/blob/main/samples/notebooks/qdk_ec/qdk_ec_walkthrough.ipynb) on the QDK GitHub repository.
