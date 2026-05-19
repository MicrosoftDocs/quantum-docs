---
author: azure-quantum-content
description: This article describes the noise models that the neutral atoms simulators support, and how to include noise in neutral atom device simulations.
ms.date: 02/24/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, Jupyter, Python, Visual Studio Code, VS Code, "Jupyter Notebook"]
title: How to build noise models for neutral atom device simulations
uid: microsoft.quantum.how-to.neutral-atom-simulators-noise
# Customer intent: As a quantum computing researcher, I want to know what kinds of noise models I can add to my neutral atom device simulations and how to build a noise models
---

# How to build noise models for quantum simulations in the QDK Python library

The Microsoft Quantum Development Kit (QDK) offers a set of quantum simulators that model how your program runs on a quantum computer. Programs that you run on a real quantum computer always include some type and degree of noise. The QDK Python library lets you build custom noise models to use in your simulations through the `NoiseConfig` API.

For instructions on how to install and use the qdk simulators, see [How to install and run the QDK quantum simulators](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

## Types of noise

Each operation or instruction in a quantum program is a potential source of noise. The following table lists all of the operations and instructions that you can set noise for with specific probabilities:

| Noise source                | Noise model parameter | Source description                                                       |
|-----------------------------|-----------------------|--------------------------------------------------------------------------|
| $X$ gate                    | `x`                   | Single-qubit Pauli gate, bit fip                                         |
| $Y$ gate                    | `y`                   | Single-qubit Pauli gate, phase fip                                       |
| $Z$ gate                    | `z`                   | Single-qubit Pauli gate, bit and phase fip                               |
| $H$ gate                    | `h`                   | Single-qubit Hadamard gate, creates equal superposition state            |
| $S$ gate                    | `s`                   | Single-qubit gate, half-pi phase flip                                    |
| $S^\dagger$ gate            | `s_adj`               | Single-qubit gate, adjoint of $S$                                        |
| $T$ gate                    | `t`                   | Single-qubit gate, eighth-pi phase flip                                  |
| $T^\dagger$ gate            | `t_adj`               | Single-qubit gate, adjoint of $T$                                        |
| $S_X$ gate                  | `sx`                  | Single-qubit gate, half bit flip                                         |
| $S_X^\dagger$ gate          | `sx_adj`              | Single-qubit gate, adjoint of $S_X$                                      |
| $R_X$ gate                  | `rx`                  | Single-qubit gate, general phase rotation about $x$ axis                 |
| $R_Y$ gate                  | `ry`                  | Single-qubit gate, general phase rotation about $y$ axis                 |
| $R_Z$ gate                  | `rz`                  | Single-qubit gate, general phase rotation about $z$ axis                 |
| $CX$ gate                   | `cx`                  | Two-qubit gate, controlled-$X$ gate                                      |
| $CY$ gate                   | `cy`                  | Two-qubit gate, controlled-$Y$ gate                                      |
| $CZ$ gate                   | `cz`                  | Two-qubit gate, controlled-$Z$ gate                                      |
| $R_{XX}$ gate               | `rxx`                 | Two-qubit gate, analogous to $R_X$                                       |
| $R_{YY}$ gate               | `ryy`                 | Two-qubit gate, analogous to $R_Y$                                       |
| $R_{ZZ}$ gate               | `rzz`                 | Two-qubit gate, analogous to $R_Z$                                       |
| $SWAP$ gate                 | `swap`                | Two-qubit gate, swaps the qubits states                                  |
| $CCX$ gate                  | `ccx`                 | Three-qubit gate, two-qubit controlled-$X$ gate                          |
| Qubit movement              | `mov`                 | Qubit movement between device zones (for neutral atom device simulation) |
| Qubit measurement           | `mz`                  | Single-qubit measurement in the Pauli-$Z$ basis                          |
| Qubit measurement and reset | `mresetz`             | Single-qubit measurement and reset to 0 state                            |

With `NoiseConfig`, you can apply four different kinds of noise to the preceding operations with specific probabilities. The following table lists the noise type parameters that you can set with `NoiseConfig`, including a parameter for no noise:

| Noise type      | Noise model parameter | Noise description             | Example use             | Example description                                                                      |
|-----------------|-----------------------|-------------------------------|-------------------------|------------------------------------------------------------------------------------------|
| Pauli $X$ noise | `x`                   | Bit flip                      | `noise.z.x = 0.03`     | Bit flip occurs in 3% of $Z$ operations                                                   |
| Pauli $Y$ noise | `y`                   | Bit flip and phase flip       | `noise.sx.y = 0.01`     | Bit flip and phase flip occurs in 1% of $S_X$ operations                                 |
| Pauli $Z$ noise | `z`                   | Phase flip                    | `noise.h.z = 0.02`     | Phase flip occurs in 2% of $H$ operations                                                 |
| No noise        | `i`                   | Identity operation, no effect | `noise.cz.ix = 0.02`    | Bit flip on only the target qubit occurs in 2% of $CZ$ operations                        |
| Qubit loss      | `loss`                | Qubit is lost from the device | `noise.mov.loss = 0.03` | Qubit is lost in 3% of movements between device zones on a neutral atom quantum computer |

The noise occurs after the circuit operation. For example, `noise.z.x` means that an $X$ operation is erroneously applied to the qubit after the intended $Z$ gate is applied.

## Build a noise model

To build a noise model for a simulation and view the effects of that noise on the results of your quantum program, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of the notebook, import the required Python objects:

    ```python
    from qdk import init, TargetProfile
    from qdk.openqasm import compile
    from qdk.simulation import NoiseConfig, run_qir
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

    noise.h.x = 0.01
    noise.cx.iy = 0.02
    ```

    This code produces the following noise model, where the noise rate is the probability that the source causes the corresponding type of noise:

    | Noise source   | Noise type                              | Noise rate |
    |----------------|-----------------------------------------|------------|
    | $H$ gate       | Bit flip                                | 1%         |
    | $CX$ gate      | Bit flip and phase flip on target qubit | 2%         |

1. Run the simulator with the noise model and view a histogram of measurement results. For example, run the following code in a new cell to run 1,000 shots of your program on the Clifford simulator:

    ```python
    results = run_qir(qir, shots=1000, noise=noise, type="clifford")
    Histogram(results, labels="kets")
    ```

1. To compare the noisy results with a noiseless simulation, run the simulation again with no noise model.

    ```python
    results = run_qir(qir, shots=1000, type="clifford")
    Histogram(results, labels="kets")
    ```

## Correlated noise

Multi-qubit gates can produce correlated noise, where the same noise pattern applies to all qubits that the gate operates on.

For example, the following $CX$ noise is correlated because a bit flip on the control qubit always occurs with a phase flip on the target qubit:

```python
noise.cx.xz = 0.02
```

In the correlated model, the noise occurs in 2% of $CX$ operations and always affects both qubits in the same operation.

Compare that model with the following uncorrelated noise model:

```python
noise.cx.xi = 0.02
noise.cx.iz = 0.02
```

In the uncorrelated model, a bit flip occurs on the control qubit in 2% of $CX$ operations and a phase flip occurs on the target qubit in 2% of $CX$ operations, but the noise doesn't necessarily happen together in the same operation.

## Noise models for simulations on neutral atom quantum computers

The QDK includes two neutral atom device simulation APIs: `NeutralAtomDevice` and `NeutralAtomBackend`. These APIs model the noise that occurs specifically on neutral atom quantum computers. For more information, see [Simulate quantum programs on neutral atom device hardware](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).

### Types of noise in neutral atom device simulators

In neutral atom devices, lasers physically move the qubits between different zones in the device. Noise can occur when programs run on a neutral atom device in the following situations:

- Qubit movements between zones
- Quantum gate operations on qubits in the interaction zone
- Qubit measurements in the measurement zone

The neutral atom device simulators in the QDK support noise from the following sources:

| Noise source       | Noise model parameter | Source description                        |
|--------------------|-----------------------|-------------------------------------------|
| $S_X$ quantum gate | `sx`                  | Single-qubit gate, half bit flip          |
| $R_Z$ quantum gate | `rz`                  | Single-qubit gate, general phase rotation |
| $CZ$ quantum gate  | `cz`                  | Two-qubit gate, controlled-$Z$ phase flip |
| Qubit movement     | `mov`                 | Qubit movement between device zones       |

Your quantum program can contain any type of gate that the QIR target profile supports. But the neutral atom simulation APIs compile the input QIR to decompose the gates in your circuit into the three gates that exist on neutral atom devices: $S_X$, $R_Z$, and $CZ$. The APIs also add qubit movement instructions to your program. Only noise on these gates and on qubit movement affect your simulations through `NeutralAtomDevice` and `NeutralAtomBackend`.

For all three gates, you can configure any type of noise.

### Build a noise model for simulations on a neutral atom quantum computer

To build a noise model for a neutral atom device simulation, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of the notebook, import the required Python objects:

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

1. Run the simulator with the noise model and view a histogram of measurement results. For example, run the following code in a new cell to run 1,000 shots of your program on the Clifford simulator:

    ```python
    device = NeutralAtomDevice()

    results = device.simulate(qir, shots=1000, noise=noise, type="clifford")
    Histogram(results, labels="kets")
    ```

## Alternative methods to build noise models

Instead of noise model parameters, you can use the following set of noise functions to build your noise model.

### Set Pauli noise

To include Pauli noise in your model, call the `set_pauli_noise` function on a gate or movement operation.

For single-qubit operations, pass a one-character Pauli string and a noise rate. For example, the following code sets a 1% chance that a bit flip occurs during qubit movement:

```python
# Equivalent to: noise.mov.x = 0.01
noise.mov.set_pauli_noise('X', 0.01)
```

For the two-qubit $CX$ operation, pass a two-character Pauli string and a noise rate. The first character of the Pauli string corresponds to noise on the control qubit and the second character corresponds to noise on the target qubit. For example, the following code sets correlated phase flips after 1% of $CX$ operations:

```python
# Equivalent to: noise.cz.zz = 0.01
noise.cx.set_pauli_noise('ZZ', 0.01)
```

### Set depolarizing noise

The `set_depolarizing` function sets equal but uncorrelated noise rates for all three types of Pauli noise. For example, the following code sets a 3% chance that Pauli noise occurs after $H$ operations, distributed evenly as a 1% chance for each of the three Pauli noise types:

```python
# Equivalent to:
#     noise.h.x = 0.01
#     noise.h.y = 0.01
#     noise.h.z = 0.01
noise.sx.set_depolarizing(0.03)
```

### Set bit flip noise

To set the noise rate for bit flips, use the `set_bitflip` function on a gate or movement operation. For example, the following code sets a 1% chance that a phase flip occurs after an $R_Z$ operation:

```python
# Equivalent to: noise.rz.x = 0.01
noise.rz.set_bitflip(0.01)
```

### Set phase flip noise

To set the noise rate for phase flips in an operation, use the `set_phaseflip` function on a gate or movement operation. For example, the following code sets a 1% chance that a phase flip occurs after an $R_Z$ operation:

```python
# Equivalent to: noise.rz.z = 0.01
noise.rz.set_phaseflip(0.01)
```
