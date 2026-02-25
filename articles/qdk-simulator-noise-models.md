---
author: azure-quantum-content
description: This article describes the noise models that the neutral atoms simulators support, and how to include noise in neutral atom device simulations.
ms.date: 02/19/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API]
title: How to build noise models for neutral atom device simulations
uid: microsoft.quantum.how-to.neutral-atom-simulators-noise
#customer intent: As a quantum computing researcher, I want to understand the tools that the QDK provides to simulate how my quantum programs run on a neutral atom quantum computers
---

# How to build noise models for neutral atom device simulations

The neutral atom device simulators in the Microsoft Quantum Development Kit (QDK) can model noise that occurs when you run programs on a neutral atom quantum computer. This article explains the kinds of noise that the neutral atom simulators support and how to include a noise model in your simulation.

For instructions on how to install and use the neutral atom device simulators from the QDK, see [How to install and use the neutral atom device simulators in the QDK](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

## Types of noise in neutral atom device simulators

In neutral atom devices, lasers physically move the neutral atom qubits between different zones in the device. Noise can occur on a neutral atom device at runtime in the following situations:

- Qubit movements between zones
- Quantum gate operations on qubits in the interaction zone
- Qubit measurements in the measurement zone

The neutral atom device simulators in the QDK support noise from the following sources:

| Noise source       | Noise model parameter | Source description                        |
|--------------------|-----------------------|-------------------------------------------|
| $S_X$ quantum gate | `sx`                  | Single-qubit gate, $90^\circ$ phase flip  |
| $R_Z$ quantum gate | `rz`                  | Single-qubit gate, general phase rotation |
| $CZ$ quantum gate  | `cz`                  | Two-qubit gate, controlled-$Z$ phase flip |
| Qubit movement     | `mov`                 | Qubit movement between device zones       |

> [!NOTE]
> Your quantum circuit can contain all gate types that the QIR target profile supports. The neutral atom simulators compile the QIR to decompose the gates in your circuit into the three gates that exist on neutral atom devices: $S_X$, $R_Z$, and $CZ$.

Each of the noise sources can produce the following types of noise:

| Noise type      | Noise model parameter | Noise description             | Example use             | Example description                                               |
|-----------------|-----------------------|-------------------------------|-------------------------|-------------------------------------------------------------------|
| Pauli $X$ noise | `x`                   | Bit flip                      | `noise.rz.x = 0.03`     | Bit flip occurs in 3% of $R_Z$ operations                         |
| Pauli $Y$ noise | `y`                   | Bit flip and phase flip       | `noise.sx.y = 0.01`     | Bit flip and phase flip occurs in 1% of $S_X$ operations          |
| Pauli $Z$ noise | `z`                   | Phase flip                    | `noise.rz.z = 0.02`     | Phase flip occurs in 2% of $R_Z$ operations                       |
| No noise        | `i`                   | Identity operation, no effect | `noise.cz.ix = 0.02`    | Bit flip on only the target qubit occurs in 2% of $CZ$ operations |
| Qubit loss      | `loss`                | Qubit is lost from the device | `noise.mov.loss = 0.03` | Qubit is lost in 3% of movements between zones                    |

> [!NOTE]
> To specify Pauli noise for $CZ$ gates, you must include two noise parameters. The first noise parameter applies to the control qubit and the other parameter applies to the target qubit. Qubit loss on $CZ$ gates applies to both qubits and can't be combined with Pauli noise.

## Build a noise model

To build a noise model for a quantum program on a neutral atom device and view the effects of that noise on the program results, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first the cell of the notebook, import the required Python objects:

    ```python
    from qdk import init, TargetProfile
    from qdk.openqasm import compile
    from qdk.simulation import NeutralAtomDevice, NoiseConfig
    from qdk.widgets import Histogram
    ```

1. In a new cell, set the device QIR target profile and compile your OpenQASM circuit into QIR:

    ```python
    init(target_profile=TargetProfile.Base)

    qasm_src = """
    include "stdgates.inc";
    qubit[2] qs;
    bit[2] r;
    
    h qs[0];
    cx qs[0], qs[1];
    r = measure qs;
    """

    qir = compile(qasm_src)
    ```

1. Create a `NoiseConfig` object and build your noise model. For example, run the following code in a new cell:

    ```python
    noise = NoiseConfig()

    noise.sx.x = 0.01
    noise.rz.z = 0.01
    noise.cz.iy = 0.02
    noise.mov.loss = 0.005
    ```

    This code produces the following noise model, where the noise rate is the probability that the source causes the corresponding type of noise:

    | Noise source   | Noise type                              | Noise rate |
    |----------------|-----------------------------------------|------------|
    | $S_X$ gate     | Bit flip                                | 1%         |
    | $R_Z$ gate     | Phase flip                              | 1%         |
    | $CZ$ gate      | Bit flip and phase flip on target qubit | 2%         |
    | Qubit movement | Qubit loss                              | 0.5%       |

1. Run the simulator with the noise model and view a histogram of measurement results. For example, run the following code in a new cell to run 1000 shots of your program on the Clifford simulator:

    ```python
    results = device.simulate(qir, shots=1000, noise=noise, type="clifford")
    Histogram(results, labels="kets")
    ```

1. To compare the noisy results with a simulation that doesn't include noise, run the simulation again but don't pass the noise model.

    ```python
    results = device.simulate(qir, shots=1000, type="clifford")
    Histogram(results, labels="kets")
    ```

## Correlated noise

Multi-qubit gates can produce correlated noise, where the same noise pattern applies to all qubits that the gate operates on. For the neutral atom device simulators, you can model correlated noise from the two-qubit $CZ$ gate.

For example, the following $CZ$ noise is correlated because a bit flip on the control qubit always occurs with a phase flip on the target qubit:

```python
noise.cz.xz = 0.02
```

In the correlated model, the noise occurs in 2% of $CZ$ operations and always affects both qubits in the same operations.

Compare that model with the following uncorrelated noise model:

```python
noise.cz.xi = 0.02
noise.cz.iz = 0.02
```

In the uncorrelated model, a bit flip occurs on the control qubit in 2% of $CZ$ operations and a phase flip occurs on the target qubit in 2% of $CZ$ operations, but the noise doesn't necessarily happen together in the same operation.

## Alternative methods to build noise models

Instead of noise model parameters, you can use the following set of noise model functions to build your noise model.

### Set Pauli noise

To include Pauli noise in your model, call the `set_pauli_noise` function on a gate or movement operation.

For single-qubit operations, pass a one-character Pauli string and a noise rate. For example, the following code sets a 1% chance that a bit flip occurs during qubit movement:

```python
# Equivalent to: noise.mov.x = 0.01
noise.mov.set_pauli_noise('X', 0.01)
```

For the two-qubit $CZ$ operation, pass a two-character Pauli string and a noise rate. The first character of the Pauli string corresponds to noise on the control qubit and the second character corresponds to to noise on the control qubit. For example, the following code sets correlated phase flips in 1% of $CZ$ operations:

```python
# Equivalent to: noise.cz.zz = 0.01
noise.cz.set_pauli_noise('ZZ', 0.01)
```

### Set depolarizing noise

The `set_depolarizing` function sets equal but uncorrelated noise rates for all three types of Pauli noise. For example, the following code sets a 1% chance that one of the Pauli noise types occurs in $S_X$ operations:

```python
# Equivalent to:
#     noise.sx.x = 0.01
#     noise.sx.y = 0.01
#     noise.sx.z = 0.01
noise.sx.set_depolarizing(0.03)
```

### Set bit flip noise

To set the noise rate for bit flips in an operation, use the `set_bitflip` function on a gate or movement operation. For example, the following code sets a 1% chance that a phase flip occurs in an $R_Z$ operation:

```python
# Equivalent to: noise.rz.x = 0.01
noise.rz.set_bitflip(0.01)
```

### Set phase flip noise

To set the noise rate for phase flips in an operation, use the `set_phaseflip` function on a gate or movement operation. For example, the following code sets a 1% chance that a phase flip occurs in an $R_Z$ operation:

```python
# Equivalent to: noise.rz.z = 0.01
noise.rz.set_phaseflip(0.01)
```
