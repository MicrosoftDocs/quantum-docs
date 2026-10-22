---
title: Run and decode logical programs
description: Compile Q# and OpenQASM programs to QIR, run them through a qodec, configure noise, and select a decoder.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 10/21/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["QDK", "Python", "qodec", "Stim", "Linux", "Windows", "Arm64", "Visual Studio Code", "VS Code", "Jupyter", "Jupyter Notebook", "Quantum Intermediate Representation", "QIR", "Q#", "OpenQASM", "C4", "Pauli", "Clifford", "GPU", "deq"]
ai-usage: ai-assisted
uid: microsoft.quantum.how-to.run-decode-logical-programs
# Customer intent: As a QEC researcher, I want to run and decode logical programs so that I can evaluate a protocol under realistic noise.
---

# Run and decode logical programs

Use the Microsoft Quantum Development Kit (QDK) to compile a logical Q# or OpenQASM program to Quantum Intermediate Representation (QIR), and then use `qdk.simulation.run_qir` to run the program through a qodec. Set up a noise model, and then choose the built-in syndrome decoder or the optional deq circuit-level decoder.

## Prerequisites

Complete these tasks before you start:

- [Install QDK for error correction](xref:microsoft.quantum.how-to.install-qdk-error-correction).
- [Develop and validate a QEC protocol](xref:microsoft.quantum.how-to.develop-qec-protocol) or get a complete qodec from another source.
- Audit the qodec by using `qdk.ec.audit`.

The Q# examples use a qodec named `protocol` that has instructions for the C4 code. To create one, see [Develop and validate a QEC protocol](xref:microsoft.quantum.how-to.develop-qec-protocol).

```python
import qodec
from qdk import ec

c4 = qodec.Code(
    "C4",
    stabilizers=["X_0 X_1 X_2 X_3", "Z_0 Z_1 Z_2 Z_3"],
    x=["X_0 X_1", "X_0 X_2"],
    z=["Z_0 Z_2", "Z_0 Z_1"],
)

protocol = ec.build_qodec(
    c4,
    strategy="bare-css/v1",
    strict=False,
)

report = ec.audit(protocol)
if report.errors or report.warnings:
    raise ValueError(str(report))
```

Audit the qodec before you run it. The runtime trusts the qodec's checks, readouts, flags, and frame equations, so invalid declarations can cause incorrect logical results or decoder failures.

This workflow uses `qdk.simulation.run_qir` with a qodec. The qodec tooling uses the separate [Stim Python package](https://github.com/quantumlib/Stim) to parse Stim-format gadget circuits. It doesn't call `qdk.stim.run`. On Linux Arm64 or Windows Arm64, install Stim from source and restart Python or the Jupyter kernel before you run a qodec that has Stim-format circuits.

## Match QIR calls to qodec instructions

Match each quantum call in the QIR program to an instruction in the qodec's top instruction set. The instruction mnemonic must exactly match the QIR callee name.

The following table shows example mappings:

| Source call                                  | Required qodec mnemonic    |
|----------------------------------------------|----------------------------|
| Q# `X(q)` or OpenQASM `x q;`                 | `__quantum__qis__x__body`  |
| Q# `H(q)` or OpenQASM `h q;`                 | `__quantum__qis__h__body`  |
| Q# `CNOT(a, b)` or OpenQASM `cx a, b;`       | `__quantum__qis__cx__body` |
| Q# `Adjoint S(q)` or OpenQASM `sdg q;`       | `__quantum__qis__s__adj`   |
| Q# `M(q)` or OpenQASM `c = measure q;`       | `__quantum__qis__m__body`  |
| Q# intrinsic operation `Foo`                 | `Foo`                      |
| OpenQASM intrinsic gate or `def` named `foo` | `foo`                      |

QIR arguments bind to qodec instruction elements in this order:

1. Qubit pointer arguments bind to block operands.
2. Scalar arguments bind to instruction parameters.
3. Result pointer arguments receive instruction outcomes and any returned flags.

The compiler raises an error if a quantum call doesn't match an instruction in the top instruction set.

## Declare logical instructions in Q#

A qodec built from the C4 code exposes custom instructions like `prepare_z_all`, `measure_z_all`, `syndrome`, and `cx_all`. Declare Q# intrinsic operations with the same names.

Initialize Q# with the adaptive target profile because custom measurement operations require it.

```python
from qdk import TargetProfile, qsharp

qsharp.init(target_profile=TargetProfile.Adaptive_RI)
```

Declare the C4 instructions as Q# operations.

```python
qsharp.eval("""
@Measurement()
operation prepare_z_all(block : Qubit) : Result { body intrinsic; }

@Measurement()
operation prepare_x_all(block : Qubit) : Result { body intrinsic; }

@Measurement()
operation measure_z_all(block : Qubit) : (Result, Result) { body intrinsic; }

@Measurement()
operation measure_x_all(block : Qubit) : (Result, Result) { body intrinsic; }

operation cx_all(control : Qubit, target : Qubit) : Unit { body intrinsic; }
operation syndrome(block : Qubit) : Unit { body intrinsic; }
""")
```

In this program, each Q# `Qubit` represents one encoded block. The C4 block has two logical qubits, so each measurement operation returns two logical results. Each preparation operation returns one rejection flag.

## Compile a logical Q# experiment

Define a state preparation and measurement (SPAM) experiment.

```python
qsharp.eval("""
operation TestSpamZ() : (Result[], Result[]) {
    use block = Qubit();
    let reject = prepare_z_all(block);
    let (left, right) = measure_z_all(block);
    ([reject], [left, right])
}
""")
```

Compile the `TestSpamZ` operation to QIR.

```python
qir = str(qsharp.compile("TestSpamZ()"))
```

The QIR keeps the calls to `prepare_z_all` and `measure_z_all`. When the program runs, the qodec runtime matches these names against the top instruction set and replaces each logical call with its gadget.

## Run with the built-in decoder

Call `run_qir` and pass the qodec. If `decoder` is `None`, the runtime uses the built-in minimum weight Pauli decoder.

```python
from qdk.simulation import run_qir

results = run_qir(
    qir,
    qodec=protocol,
    type="stabilizer",
    shots=100,
    seed=42,
)

print(results[:5])
```

To run a qodec, use these simulator options:

| `type` value             | Behavior                                            |
|--------------------------|-----------------------------------------------------|
| `None` or `"stabilizer"` | Use the stabilizer backend                          |
| `"cpu"`                  | Use the state vector backend for supported programs |
| `"gpu"`                  | Not supported with a qodec                          |

The runtime prepares each program qubit before its first use unless the first instruction creates its block. A preparation instruction has output blocks, no input blocks, and an action that stabilizes logical `Z`.

Single-qubit Pauli decoder corrections and qodec frame updates use a noiseless Pauli frame, not noisy physical gates.

## Configure simulator noise

Define noise on simulator operations, not qodec instruction names. The runtime translates each bottom-layer instruction into one or more simulator operations, so noise settings apply to those operations.

The C4 walkthrough uses these mappings:

| Bottom-layer instruction | Simulator operation    | `NoiseConfig` field |
|--------------------------|------------------------|---------------------|
| `R`                      | Prepare or reset to Z+ | `mresetz`           |
| `H`                      | Hadamard               | `h`                 |
| `CX`                     | Controlled X           | `cx`                |
| `M`                      | Z-basis measurement    | `mresetz`           |

Create a simple 1% noise model:

```python
from qdk.simulation import NoiseConfig

noise = NoiseConfig()
for gate in (noise.h, noise.cx):
    gate.set_depolarizing(0.01)
noise.mresetz.x = 0.01
```

Run the experiment with noise:

```python
results = run_qir(
    qir,
    qodec=protocol,
    noise=noise,
    type="stabilizer",
    shots=1000,
    seed=42,
    on_shot_failure="discard",
)
```

Noise on `mresetz` acts on the qubit after measurement or preparation. It doesn't flip a measurement bit that the simulator already recorded. To study recorded bit flips, use qodec readout fault models and gadget analysis.

## Control shot failures

Use `on_shot_failure` to choose how the runtime responds when a qodec flag, decoder, or readout doesn't produce an accepted shot.

| Value       | Behavior                                                             |
|-------------|----------------------------------------------------------------------|
| `"discard"` | Omit failed shots from the returned list. This value is the default. |
| `"raise"`   | Stop when the first shot fails.                                      |
| `"retry"`   | Restart the failed shot, up to `max_retries` additional attempts.    |

With the `"discard"` policy, the `shots` argument counts attempted shots, so the returned list can have fewer items than `shots`.

A flag triggers the shot policy only when the logical program doesn't receive that flag. If a Q# `@Measurement()` operation returns an extra `Result` for the flag, the program receives the flag and decides whether to reject the shot.

In the `TestSpamZ` example, the program returns the preparation flag in the first array. So the `on_shot_failure="discard"` setting doesn't remove rows where the returned flag is `One`.

## Select a decoder

To choose how errors are decoded, use the `decoder` parameter to pass a decoder preparation callable for each encoded layer.

The QDK has the following decoders:

| Decoder                  | Use it to                                                                              |
|--------------------------|----------------------------------------------------------------------------------------|
| Default syndrome decoder | Infer minimum-weight Pauli corrections from syndrome evidence. Use `decoder=None`.     |
| Frame decoder            | Track noiseless frames without inferring physical faults. Use `prepare_frame_decoder`. |
| deq decoder              | Decode circuit-level fault models with deq. Use `prepare_deq_decoder`.                 |

### Use the default deq configuration

Install `deq` and `deq-runtime`, then pass `prepare_deq_decoder`.

```python
from qdk.simulation.decoders import prepare_deq_decoder

results = run_qir(
    qir,
    qodec=protocol,
    decoder=prepare_deq_decoder,
    noise=noise,
    type="stabilizer",
    shots=1000,
    seed=42,
    on_shot_failure="discard",
)
```

By default, the deq adapter uses relay belief propagation and a window coordinator. To change these settings, use a runtime factory.

### Configure a monolithic deq runtime

To choose deq settings directly, pass a runtime factory to `prepare_deq_decoder`.

```python
from functools import partial
from deq.runtime import Runtime
from qdk.simulation import decoders


def make_runtime(seed: int) -> Runtime:
    return Runtime(
        decoder="black-box-relay-bp",
        decoder_config={"parallel": 1, "seed": seed},
        coordinator="monolithic",
        controller="jit",
    )


results = run_qir(
    qir,
    qodec=protocol,
    decoder=partial(
        decoders.prepare_deq_decoder,
        runtime_factory=make_runtime,
    ),
    noise=noise,
    type="stabilizer",
    shots=1000,
    seed=42,
    on_shot_failure="discard",
)
```

Return a new `Runtime` from each factory call. The QDK starts and closes each runtime.

> [!NOTE]
> The deq adapter requires:
>
> - One encoded layer
> - A measurement-independent Clifford execution trace
> - The stabilizer backend
> - A noise model without qubit loss
>
> The deq adapter doesn't support the retry policy. Unsupported programs raise an error instead of falling back to another decoder.

## Reject low-confidence deq results

The deq adapter returns a score for each logical readout. Lower scores indicate a stronger preference for the chosen correction. The scores aren't calibrated failure probabilities.

To reject low-confidence results, pass `max_readout_score` when you prepare the decoder, like in the following example:

```python
from functools import partial
from qdk.simulation import decoders

scored_decoder = partial(
    decoders.prepare_deq_decoder,
    max_readout_score=0.2,
)

results = run_qir(
    qir,
    qodec=protocol,
    decoder=scored_decoder,
    noise=noise,
    type="stabilizer",
    shots=1000,
    on_shot_failure="discard",
)
```

The runtime accepts a shot only when every returned logical readout has a score at or below the threshold. The threshold doesn't apply to raw flags or unused intermediate readouts.

Score-based rejection can lower the logical error rate of accepted shots. But it also reduces the number of accepted shots and adds decoder work.

## Compile OpenQASM programs

Standard OpenQASM operations use the same QIR mnemonic rules as standard Q# operations.

```python
from qdk import TargetProfile, openqasm

source = """
OPENQASM 3.0;
include "stdgates.inc";
qubit q;
bit c;
x q;
c = measure q;
"""

qir = openqasm.compile(
    source,
    target_profile=TargetProfile.Adaptive_RI,
)

print(qir)
```

To run this program through a qodec, make sure the qodec's top instruction set has `__quantum__qis__x__body` and `__quantum__qis__m__body`, with compatible block operands and one measurement outcome.

An OpenQASM intrinsic gate or subroutine named `foo` uses the mnemonic `foo`. Qubit arguments bind to block operands. The `float`, `int`, and `bool` arguments bind to instruction parameters in declaration order.

OpenQASM has these limitations for qodec calls:

- Custom intrinsics can't return a QIR `Result`. To get one measurement result, use the standard `measure` statement.
- OpenQASM programs can't run custom measurements, receive several outcomes from one call, or receive returned flags. For these cases, use Q# `@Measurement()` operations.
- The runtime controls any flags that the OpenQASM program can't receive, and these flags can reject a shot.

For detailed mapping examples, see the following QDK notebooks:

- [Call qodec instructions from Q#](https://github.com/microsoft/qdk/blob/main/samples/notebooks/qdk_ec/qodec_instructions_from_qsharp.ipynb)
- [Call qodec instructions from OpenQASM](https://github.com/microsoft/qdk/blob/main/samples/notebooks/qdk_ec/qodec_instructions_from_openqasm.ipynb)

## Review requirements and limitations

Review these requirements, limitations, and result differences before you run a large experiment.

Requirements:

- Every QIR quantum call must resolve to a top-layer qodec instruction.
- Audit the protocol before you run it. The qodec runtime trusts the equations that you write and doesn't check them.

Limitations:

- GPU simulation doesn't support qodec execution.
- The default gadget fault set can grow exponentially, so exact distance searches can take a long time.
- The deq and Stim packages have platform limitations. For more information, see [Install QDK for error correction](xref:microsoft.quantum.how-to.install-qdk-error-correction).

Result differences:

- Exact output counts can vary by decoder.
- Discard and retry policies can change the returned result distribution.

For a complete Q# experiment with noise sweeps, deq decoding, and confidence-based rejection, see the [QEC protocol walkthrough](https://github.com/microsoft/qdk/blob/main/samples/notebooks/qdk_ec/qdk_ec_walkthrough.ipynb).
