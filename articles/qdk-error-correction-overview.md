---
title: Get started with QDK for error correction
description: Learn how to use the QDK Python package to develop, validate, analyze, and run quantum error correction protocols.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 10/21/2026
ms.topic: overview
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "Python", "qodec", "deq", "Quantum Intermediate Representation", "QIR", "Q#", "OpenQASM", "YAML", "Pauli", "CSS"]
ai-usage: ai-assisted
uid: microsoft.quantum.overview.qdk-for-error-correction
# Customer intent: As a quantum developer or researcher, I want to understand the QDK error correction tools so that I can choose the right workflow for my protocol.
---

# Get started with QDK for error correction

The Microsoft Quantum Development Kit (QDK) includes Python tools to develop and test quantum error correction (QEC) protocols. Use the `qdk.ec` module to analyze error correction codes, build executable protocols, validate protocol declarations, and study circuit faults. Use `qdk.simulation` to run logical programs through those protocols.

## Understand the QDK error correction tools

The QDK error correction workflow uses these packages and modules:

| Component                 | Use it to                                                                                            |
|---------------------------|------------------------------------------------------------------------------------------------------|
| `qodec`                   | Define and save codes, instruction sets, gadgets, layers, and complete QEC protocols.                |
| `qdk.ec`                  | Analyze codes and gadgets, build baseline qodecs, derive equations, and audit protocol declarations. |
| `qdk.simulation`          | Run Quantum Intermediate Representation (QIR) programs through a qodec and apply a decoder.          |
| `qdk.simulation.decoders` | Select the built-in syndrome decoder, track frames, or connect to the optional deq decoder.          |
| `qdk.qre`                 | Estimate the space, time, and error costs of QEC models for fault-tolerant resource estimation.      |

A *qodec* is a formal description of an executable QEC protocol. It connects logical instructions to physical circuits through one or more layers. The `qodec` package defines this data model and its YAML representation. The `qdk.ec` module derives facts from the model and checks whether its declarations match its circuits.

For more information, see the [qodec overview](https://github.com/microsoft/qdk-ec/blob/main/qodec/README.md).

The `qdk.qre` module has a different purpose. It models the resource cost of an error correction scheme. It doesn't define, audit, or run qodec gadgets. For more information about quantum resource estimation in the QDK, see [What is the Microsoft Quantum resource estimator?](xref:microsoft.quantum.overview.intro-resource-estimator)

## Understand the qodec protocol components

The following components define a qodec protocol and support its execution.

| Component       | Description                                                                          |
|-----------------|--------------------------------------------------------------------------------------|
| Code            | A static set of stabilizers and logical operators that defines a code space.         |
| Instruction set | The logical or physical operations that a qodec layer supports.                      |
| Gadget          | A circuit that implements an instruction through operations in the next lower layer. |
| Layer           | A mapping from one instruction set to a lower-level instruction set.                 |
| Encoding        | The connection between logical blocks and circuit qubits at a gadget boundary.       |
| Check           | A parity equation that must equal zero when the declared relation holds.             |
| Readout         | An equation that maps circuit results and frame signs to a logical outcome or flag.  |
| Flag            | A named readout that reports whether an instruction met its acceptance condition.    |
| Decoder         | A component that uses syndrome evidence to infer corrections and logical results.    |

A qodec can contain several layers. The top layer can define logical operations over encoded blocks. The gadgets in the top layer can call instructions in the next lower layer. The bottom layer contains the physical operations that the simulator runs.

## Example protocol workflow

A typical workflow has six steps. The following steps use functions and classes from the `qdk.ec` module.

1. **Define a code.** Create a `qodec.Code` with stabilizers and logical Pauli operators.
1. **Analyze the code.** Use the `CodeProfile` class to inspect logical operators, calculate syndromes, and compute code distance.
1. **Build or load a qodec.** Use the `build_qodec` function to create a baseline protocol, or load an existing qodec from YAML.
1. **Complete and validate the protocol.** Use the `filled` function to derive supported check and readout equations. Use the `audit` function to find inconsistent or incomplete declarations.
1. **Analyze circuit faults.** Use the `GadgetProfile` class to inspect logical actions, fault effects, and gadget distance.
1. **Run logical programs.** Compile Q# or OpenQASM code to QIR. Pass the QIR and qodec to `qdk.simulation.run_qir`, then select a decoder and noise model.

The following code shows the main objects in this workflow:

```python
import qodec
from qdk import ec
from qdk.simulation import run_qir

code = qodec.Code(
    "C4",
    stabilizers=["X_0 X_1 X_2 X_3", "Z_0 Z_1 Z_2 Z_3"],
    x=["X_0 X_1", "X_0 X_2"],
    z=["Z_0 Z_2", "Z_0 Z_1"],
)

code_profile = ec.CodeProfile(code)
print("Code distance:", code_profile.distance())

protocol = ec.build_qodec(code, strategy="bare-css/v1", strict=False)
print(ec.audit(protocol))

# Compile a logical program to QIR before you call run_qir.
# results = run_qir(qir, qodec=protocol, shots=100)
```

The `bare-css/v1` strategy in this example creates a simple baseline protocol without flag qubits. It helps you inspect the workflow, but it doesn't guarantee fault-tolerant gadgets. Use gadget distance analysis before you choose a protocol implementation.

## Separate protocol validation from fault analysis

Protocol audits and distance analysis assess different aspects of a QEC protocol.

- Protocol audits check whether the declared protocol matches its circuits and equations when no faults occur.
- Distance analysis determines the minimum number of allowed errors or circuit faults that can cause an undetected logical failure.

Use the `audit` function to check noiseless consistency. The audit checks code algebra, instruction declarations, gadget actions, checks, readouts, flags, frame relations, and references between qodec objects.

An audit that reports no issues doesn't guarantee fault tolerance. A circuit can implement the correct logical action without faults and still fail after one physical fault. Use the `CodeProfile.distance` method to analyze the code and the `GadgetProfile.distance` method to analyze each circuit implementation.

Before you use a protocol for noisy simulations, run a protocol audit and analyze code and gadget distances.

## Choose a construction strategy

The `build_qodec` function supports two baseline CSS construction strategies.

| Strategy         | Description                                                                                                                    |
|------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `flagged-css/v1` | Uses the flagged CSS construction and selects the flag count from the code distance. This strategy is the default.             |
| `bare-css/v1`    | Uses no flag qubits and skips the distance calculation that selects a flag count. Use it for inspection and early development. |

Both strategies try to create these logical instructions:

- `prepare_z_all`
- `prepare_x_all`
- `syndrome`
- `measure_z_all`
- `measure_x_all`
- `h_all`
- `cx_all`

Not every code supports every candidate. With the default setting `strict=True`, `build_qodec` raises an error when it can't build and verify an instruction. With `strict=False`, `build_qodec` keeps the supported instructions and records each skipped instruction in the qodec metadata.

## Choose your next task

- To prepare a Python environment, see [How to install QDK for error correction](xref:microsoft.quantum.how-to.install-qdk-error-correction).
- To define a code and create a protocol, see [Develop and validate a QEC protocol](xref:microsoft.quantum.how-to.develop-qec-protocol).
- To compile, simulate, and decode logical programs, see [Run and decode logical programs](xref:microsoft.quantum.how-to.run-decode-logical-programs).

For a complete notebook that follows the full workflow, see [Develop and test a QEC protocol](https://github.com/microsoft/qdk/blob/main/samples/notebooks/qdk_ec/qdk_ec_walkthrough.ipynb) in the QDK repository.
