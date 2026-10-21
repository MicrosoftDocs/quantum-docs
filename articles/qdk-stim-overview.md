---
author: azure-quantum-content
description: Learn how to compile and simulate Stim circuits with the Microsoft Quantum Development Kit, including support for loss, post-selection, and non-Clifford gates.
ms.date: 10/09/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ["Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "QDK-Stim", "Stim", "Clifft", "tsim", "QIR", "Python", "Clifford", "Pauli", "GPU", "CPU"]
ai-usage: ai-assisted
title: Stim support for quantum error correction in the QDK
uid: microsoft.quantum.overview.qdk-stim
# Customer intent: As a quantum developer or researcher, I want to use Stim circuits with the QDK and understand the features that the QDK adds to the Stim circuit format.
---

# Stim support for quantum error correction in the QDK

Stim is an open-source tool from Google Quantum AI for fast simulation and analysis of quantum stabilizer circuits, especially quantum error correction (QEC) circuits. QEC protocols commonly use repeated rounds of Clifford operations and Pauli measurements, and researchers often analyze QEC protocols with Pauli noise models. This circuit structure is much more efficient to simulate classically than a general quantum circuit, so researchers can test many runs of large error-correction circuits.

The Microsoft Quantum Development Kit (QDK) includes QDK-Stim, which extends Stim with additional features. You can write circuits with the Stim instruction set, compile them to quantum intermediate representation (QIR), and run them on the QDK simulators. QDK-Stim adds support for qubit loss, post-selection, repeat-until-success patterns, and non-Clifford operations.

Access QDK-Stim through the `qdk.stim` module. The module accepts Stim source code and runs the compiled program on QDK simulators. The QDK Python API doesn't have the full functionality of the `stim` Python package and doesn't expose classes such as `stim.Circuit`, compiled samplers, or detector error models.

For more information about Stim, see the [Stim repository on GitHub](https://github.com/quantumlib/Stim).

## Prerequisites

To use Stim circuits with the QDK, you need:

- Python 3.10 or later.
- `pip` or another Python package manager.
- A Python environment, such as a virtual environment or Jupyter Notebook.
- Basic familiarity with the [Stim circuit format](https://github.com/quantumlib/Stim/blob/main/doc/file_format_stim_circuit.md).

## Install and use Stim with the QDK

Install or update the QDK Python package:

```bash
pip install --upgrade qdk
```

Import the `stim` module from `qdk`, define a Stim circuit as a string, and pass the circuit to `stim.run`. The following example prepares and measures a Bell state:

```python
from qdk import stim

bell = """
H 0
CX 0 1
M 0 1
"""

results = stim.run(bell, shots=100, type="stabilizer")
print(results[:5])
```

Each item in `results` contains the measurement results from one shot. A standard result is `Result.Zero` or `Result.One`. QDK-Stim also includes `Result.Loss` for measurements of lost qubits.

For standard Stim stabilizer circuits, start with `type="stabilizer"`. For more information about the simulators, see [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators).

## QDK features for Stim circuits

The QDK extends the Stim instruction set and connects it to QIR and the QDK simulators. These additions support simulation workflows that aren't available in Stim.

### Compile Stim circuits to QIR

The QDK compiles Stim circuit source code to QIR before it runs the circuit. The `stim.run` function performs both steps in one call. Use `stim.compile` when you want to inspect the generated QIR or run it on another simulator or service.

The `stim.compile` function returns the QIR source code and the QDK `NoiseConfig` that the simulator needs. The following example compiles a Bell-state circuit and prints the QIR:

```python
from qdk import stim

bell = """
H 0
CX 0 1
M 0 1
"""

qir, noise = stim.compile(bell)
print(qir)
```

### Add noise to Stim circuits

You can add noise to a Stim circuit with Stim noise instructions or with a QDK `NoiseConfig`. Choose the method that best matches how you define the circuit and noise model:

| Noise method | How to use it | Use when |
|--------------|---------------|----------|
| Stim noise instructions | Add instructions such as `X_ERROR`, `DEPOLARIZE1`, and `CORRELATED_ERROR` to the Stim code. | The noise is part of the Stim circuit definition. |
| QDK noise model | Define a `NoiseConfig` and pass it with the `noise` argument. | You want to apply an existing QDK noise model to a Stim circuit that doesn't contain noise instructions. |

The `NoiseConfig` returned by `stim.compile` represents the noise instructions in the Stim circuit. It isn't a separate noise model.

> [!CAUTION]
> Choose one noise method. Use either Stim noise instructions or a QDK `NoiseConfig`. If you use both, the simulator applies both noise models.

The following example defines a Stim circuit that has depolarizing noise:

```python
from qdk import stim

noisy_bell = """
H 0
CX 0 1
DEPOLARIZE2(0.01) 0 1
M 0 1
"""

results = stim.run(noisy_bell, shots=1000, type="stabilizer")
```

For more information, see [How to build noise models for quantum simulations in the QDK](xref:microsoft.quantum.how-to.qdk-simulator-noise-models).

### Model qubit loss

The QDK adds loss instructions and targets to the Stim circuit format. Measurement of a lost qubit returns `Result.Loss` instead of `Result.Zero` or `Result.One`.

| Construct              | Syntax              | Behavior                                                                                    |
|------------------------|---------------------|---------------------------------------------------------------------------------------------|
| Loss error             | `LOSS_ERROR(p) 0 1` | Independently loses each target with probability `p`.                                       |
| Correlated loss target | `L0`                | Represents loss of a qubit in a `CORRELATED_ERROR` or `ELSE_CORRELATED_ERROR` event.        |
| Loss inspection        | `PEEK_LOSS 0 1`     | Appends `1` for a lost qubit and `0` for a present qubit without measuring or resetting it. |

The following example applies independent loss to two qubits, inspects their loss state, and then measures them:

```python
from qdk import Result, stim

loss_program = """
H 0
LOSS_ERROR(0.2) 0 1
PEEK_LOSS 0 1
M 0 1
"""

results = stim.run(loss_program, shots=100, type="stabilizer")

symbols = {
    Result.Zero: "0",
    Result.One: "1",
    Result.Loss: "L",
}

formatted = ["".join(symbols[value] for value in shot) for shot in results[:10]]

print(formatted)
```

Each formatted shot contains four characters. The first two characters are the `PEEK_LOSS` values, and the last two are the measurement results. A final `L` means that the corresponding qubit was lost.

Use `L` targets to combine loss and Pauli errors in one correlated event:

```text
CORRELATED_ERROR(0.1) L0 X1
ELSE_CORRELATED_ERROR(0.1) L1
```

> [!NOTE]
> In QDK-Stim, `CORRELATED_ERROR` and `ELSE_CORRELATED_ERROR` must come one immediately after the other. In Stim, they don't necessarily need to.

### Post-select measurement results

The QDK adds `SELECT` blocks for post-selection and repeat-until-success patterns based on parity measurements and qubit-loss checks. If a condition in a `SELECT` block fails, the simulator reruns that block until all its conditions pass. A nested block restarts independently from its enclosing block.

| Construct           | Syntax              | Behavior                                                                                                 |
|---------------------|---------------------|----------------------------------------------------------------------------------------------------------|
| Selection block     | `SELECT { ... }`    | Reruns the block body until every selection condition passes.                                            |
| Parity condition    | `REQUIRE rec[-1]`   | Requires the referenced measurement records to have even parity. A lost record also fails the condition. |
| Inverted record     | `REQUIRE !rec[-1]`  | Inverts a record before the parity check. With one record, this keeps measurement result `1`.            |
| Loss-only condition | `NOTLEAKED rec[-1]` | Requires the referenced measurements to not be loss, but doesn't constrain their bit values.             |

List multiple `rec[...]` targets in one `REQUIRE` instruction to select their joint parity. The following program keeps only non-lost results with even parity, so the final measurements are `00` or `11`:

```python
from qdk import stim

post_selected = """
SELECT {
    H 0
    H 1
    LOSS_ERROR(0.1) 0 1
    M 0 1
    REQUIRE rec[-1] rec[-2]
}
"""

results = stim.run(post_selected, shots=1000, type="stabilizer")
```

Use `NOTLEAKED` when both `0` and `1` are valid outcomes, but you want to discard measurements of lost qubits:

```text
SELECT {
    H 0
    LOSS_ERROR(0.2) 0
    M 0
    NOTLEAKED rec[-1]
}
```

Each condition must reference at least one record that the current `SELECT` block or a nested block produces. The compiler rejects a condition if a rerun of the block can't change any of its referenced records.

### Simulate non-Clifford operations

Stim focuses on stabilizer circuits and doesn't support non-Clifford operations such as T and Toffoli gates. QDK-Stim adds operations similar to those supported by [Clifft](https://github.com/unitaryfoundation/clifft), a simulator for near-Clifford circuits.

| Category                   | Instructions                    | Target grouping                    |
|----------------------------|---------------------------------|------------------------------------|
| Phase gates                | `T`, `T_DAG`                    | One qubit per target               |
| Pauli-product phase gates  | `TPP`, `TPP_DAG`                | One Pauli product per target group |
| Controlled gates           | `CH`                            | Consecutive pairs                  |
| Controlled gates           | `CCX`, `CCZ`                    | Consecutive triples                |
| Single-qubit rotations     | `R_X(a)`, `R_Y(a)`, `R_Z(a)`    | One qubit per target               |
| General single-qubit gates | `U3(t, p, l)`, `U(t, p, l)`     | One qubit per target               |
| Two-qubit rotations        | `R_XX(a)`, `R_YY(a)`, `R_ZZ(a)` | Consecutive pairs                  |
| Pauli-product rotations    | `R_PAULI(a)`                    | One Pauli product per target group |

By default, rotation arguments use half turns. For example, `R_X(0.5)` rotates by $\pi/2$ radians. Add the `rad` suffix to specify radians directly, such as `R_X(0.5rad)`. You can use either `U3` or `U` to mix angle units because both are the same.

The following circuit uses a Toffoli gate and an arbitrary Y rotation:

```python
from qdk import stim

near_clifford = """
X 0 1
CCX 0 1 2
R_Y(0.25) 3
M 0 1 2 3
"""

results = stim.run(near_clifford, shots=1000, type="stabilizer")
```

The QDK stabilizer simulator branches the stabilizer decomposition when it encounters a non-Clifford operation. This approach remains efficient when non-Clifford operations are sparse, but the required state space grows exponentially with the number of non-Clifford operations. Use `type="cpu"` or `type="gpu"` for circuits that contain many non-Clifford operations.

For the complete non-Clifford gate definitions, see the [Clifft supported gates reference](https://unitaryfoundation.github.io/clifft/stable/reference/gates/).

## Current limitations

The QDK supports most instructions in the [Stim gate reference](https://github.com/quantumlib/Stim/blob/main/doc/gates.md), with the following limitations. For the current implementation status, see the [QDK-Stim missing-features tracking issue](https://github.com/microsoft/qdk/issues/3518).

| Stim feature                                                    | Current QDK behavior                                                             |
|-----------------------------------------------------------------|----------------------------------------------------------------------------------|
| `DETECTOR` and `OBSERVABLE_INCLUDE`                             | Parsed and ignored. The QDK doesn't provide detector or observable sampling.     |
| `HERALDED_ERASE` and `HERALDED_PAULI_CHANNEL_1`                 | Compilation fails because the QDK doesn't support these instructions.            |
| `MPAD`                                                          | Compilation fails because the QDK doesn't support these instructions.            |
| Sweep-bit targets, such as `CX sweep[5] 7`                      | Compilation fails because the QDK doesn't support sweep-bit targets.             |
| Pauli products that reduce to the identity, such as `MPP Z0*Z0` | Compilation fails because the QDK doesn't support the resulting identity target. |

Use Stim when you need detector error models, compiled Stim samplers, Sinter, or other Stim Python APIs. Use `qdk.stim` when you want to compile Stim code to QIR and run the QIR on QDK simulators, or use the QDK loss, post-selection, and non-Clifford extensions.

## Related content

- [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators)
- [How to build noise models for quantum simulations in the QDK](xref:microsoft.quantum.how-to.qdk-simulator-noise-models)
- [Stim in the QDK sample notebook](https://github.com/microsoft/qdk/blob/main/samples/notebooks/qdk_stim.ipynb) in the QDK repository on GitHub
