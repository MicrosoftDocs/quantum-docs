---
author: azure-quantum-content
description: This article explains noise models in the QDK and describes how to add noise models to simulations.
ms.date: 06/23/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, Jupyter, Python, Visual Studio Code, VS Code, "Jupyter Notebook"]
title: How to build noise models for the QDK simulators
uid: microsoft.quantum.how-to.qdk-simulator-noise-models
# Customer intent: As a quantum computing researcher, I want to know what kinds of noise models I can add to my quantum program simulations and how to build the noise models in the QDK.
---

# How to build noise models for quantum simulations in the QDK Python library

The Microsoft Quantum Development Kit (QDK) includes a set of quantum simulators that model how your program runs on a quantum computer. Programs that you run on a real quantum computer always include some type and degree of noise. The QDK Python library lets you build custom noise models to use in your simulations through the `NoiseConfig` API.

For instructions on how to install and use the QDK simulators, see [How to install and run the QDK quantum simulators](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

## Types of noise

Each operation or instruction in a quantum program is a potential source of noise. The following table lists all of the operations and instructions that you can set noise for with specific probabilities.

| Noise source                | Noise model parameter | Source description                                                       |
|-----------------------------|-----------------------|--------------------------------------------------------------------------|
| $X$ gate                    | `x`                   | Single-qubit Pauli gate, bit flip                                        |
| $Y$ gate                    | `y`                   | Single-qubit Pauli gate, bit flip and phase flip                         |
| $Z$ gate                    | `z`                   | Single-qubit Pauli gate, phase flip                                      |
| $H$ gate                    | `h`                   | Single-qubit Hadamard gate, creates equal superposition state            |
| $S$ gate                    | `s`                   | Single-qubit gate, half-pi phase flip                                    |
| $S^\dagger$ gate            | `s_adj`               | Single-qubit gate, adjoint of $S$                                        |
| $T$ gate                    | `t`                   | Single-qubit gate, quarter-pi phase lip                                  |
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
| $SWAP$ gate                 | `swap`                | Two-qubit gate, swaps the states of the qubits                           |
| $CCX$ gate                  | `ccx`                 | Three-qubit gate, two-qubit controlled-$X$ gate                          |
| Qubit movement              | `mov`                 | Qubit movement between device zones (for neutral atom device simulation) |
| Qubit measurement           | `mz`                  | Single-qubit measurement in the Pauli-$Z$ basis                          |
| Qubit measurement and reset | `mresetz`             | Single-qubit measurement and reset to 0 state                            |

With `NoiseConfig`, you can apply four different kinds of noise to the preceding operations with specific probabilities. The following table lists the noise type parameters that you can set with `NoiseConfig`, including a parameter for no noise.

| Noise type      | Noise model parameter | Noise description             | Example use             | Example description                                                                      |
|-----------------|-----------------------|-------------------------------|-------------------------|------------------------------------------------------------------------------------------|
| Pauli $X$ noise | `x`                   | Bit flip                      | `noise.z.x = 0.03`      | Bit flip occurs in 3% of $Z$ operations                                                  |
| Pauli $Y$ noise | `y`                   | Bit flip and phase flip       | `noise.sx.y = 0.01`     | Bit flip and phase flip occurs in 1% of $S_X$ operations                                 |
| Pauli $Z$ noise | `z`                   | Phase flip                    | `noise.h.z = 0.02`      | Phase flip occurs in 2% of $H$ operations                                                |
| No noise        | `i`                   | Identity operation, no effect | `noise.cz.ix = 0.02`    | Bit flip on only the target qubit occurs in 2% of $CZ$ operations                        |
| Qubit loss      | `loss`                | Qubit is lost from the device | `noise.mov.loss = 0.03` | Qubit is lost in 3% of movements between device zones on a neutral atom quantum computer |

The noise occurs after the source operation, not instead of the source operation. For example, `noise.z.x` means that the program applies the intended $Z$ gate to the qubit, and then an unintended $X$ gate applies to the qubit. Because the noise applies after the source, you can configure noise that has the same effect as the source. For example, `noise.x.x` applies an unintended bit flip after the intended bit flip, which undoes the intended operation.

> [!NOTE]
> The neutral atom device simulation APIs support noise from a limited number of sources. For more information, see [How to build noise models for neutral atom device simulations in the QDK](xref:microsoft.quantum.how-to.neutral-atom-simulators-noise).

## Build a noise model

To build a noise model for a simulation and view the effects of that noise on the results of your quantum program, follow these steps.

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of the notebook, import the required Python objects.

    ```python
    from qdk import init, TargetProfile
    from qdk.openqasm import compile
    from qdk.simulation import NoiseConfig, run_qir
    from qdk.widgets import Histogram
    ```

1. In a new cell, set the device QIR target profile and compile your OpenQASM circuit into QIR.

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

1. Create a `NoiseConfig` object and build your noise model.

    ```python
    noise = NoiseConfig()

    noise.h.x = 0.01
    noise.cx.zi = 0.02
    ```

    This code produces the following noise model, where the noise rate is the probability that the source causes the corresponding type of noise.

    | Noise source   | Noise type                              | Noise rate |
    |----------------|-----------------------------------------|------------|
    | $H$ gate       | Bit flip                                | 1%         |
    | $CX$ gate      | Phase flip on control qubit             | 2%         |

1. Run the simulator with the noise model and view a histogram of measurement results. For example, run the following code to simulate 1,000 shots of your program on the Clifford simulator.

    ```python
    results = run_qir(qir, shots=1000, noise=noise, type="clifford")
    Histogram(results, labels="kets")
    ```

1. To compare the noisy results with a noiseless simulation, run the simulation again with no noise model.

    ```python
    results = run_qir(qir, shots=1000, type="clifford")
    Histogram(results, labels="kets")
    ```

## Set multiple types of noise on the same source

You can model different types of noise on the same source, with different probabilities for each type of noise. For example, the following code sets a 1% chance that a bit flip occurs after a Hadamard gate and a 3% chance that a phase flip occurs.

```python
noise.h.x = 0.01
noise.h.z = 0.03
```

When you configure multiple noise types for the same operation, only one noise type applies to each operation in your program. For example, each Hadamard gate can have either $X$ noise or $Z$ noise. The simulator can't apply both $X$ noise and $Z$ noise to the same Hadamard gate.

## Correlated noise

Multi-qubit gates can produce correlated noise, where the same noise pattern applies to all qubits that the gate operates on. To set correlated noise on multi-qubit gates, specify a noise parameter for each qubit. For example, the following code sets correlated bit flips on $CX$ gates with a 2% probability.

```python
noise.cx.xx = 0.02
```

When noise occurs on a $CX$ gate, an $X$ gate applies to both the control qubit and the target qubit. The noise is correlated because the noise always applies to both qubits. To make the noise uncorrelated, set multiple noise types with the identity parameter.

```python
noise.cx.xi = 0.02 # Bit flip on control qubit, do nothing to target qubit
noise.cx.ix = 0.02 # Do nothing to control qubit, bit flip on target qubit
```

In the uncorrelated model, each noise setting occurs independently with 2% probability. Because only one noise setting can apply to an individual gate, this noise model can't apply $X$ noise to both qubits in the same gate. To model the possibility of noise on both qubits, configure another noise setting for both qubits.

```python
noise.cx.xi = 0.02 # Bit flip on control qubit, do nothing to target qubit
noise.cx.ix = 0.02 # Do nothing to control qubit, bit flip on target qubit
noise.cx.xx = 0.02 # Bit flip on both qubits
```

## Noise model functions

Instead of noise model parameters, you can use the following set of noise functions to build your noise model.

### Set Pauli noise

To include Pauli noise in your model, call the `set_pauli_noise` function on a gate or movement operation.

For single-qubit operations, pass a one-character Pauli string and a noise rate. For example, the following code sets a 1% chance that a bit flip occurs during qubit movement.

```python
# Equivalent to: noise.mov.x = 0.01
noise.mov.set_pauli_noise('X', 0.01)
```

For two-qubit operations, pass a two-character Pauli string and a noise rate. The first character of the Pauli string corresponds to noise on the control qubit and the second character corresponds to noise on the target qubit. For example, the following code sets correlated phase flips after 1% of $CX$ operations.

```python
# Equivalent to: noise.cx.zz = 0.01
noise.cx.set_pauli_noise('ZZ', 0.01)
```

### Set depolarizing noise

The `set_depolarizing` function sets equal but uncorrelated noise rates for all three types of Pauli noise. For example, the following code sets a 3% chance that Pauli noise occurs after an $H$ operation, distributed evenly as a 1% chance for each of the three Pauli noise types.

```python
# Equivalent to:
#     noise.h.x = 0.01
#     noise.h.y = 0.01
#     noise.h.z = 0.01
noise.h.set_depolarizing(0.03)
```

### Set bit flip noise

To set the noise rate for bit flips, use the `set_bitflip` function on a gate or movement operation. For example, the following code sets a 1% chance that a phase flip occurs after an $R_Z$ operation.

```python
# Equivalent to: noise.rz.x = 0.01
noise.rz.set_bitflip(0.01)
```

### Set phase flip noise

To set the noise rate for phase flips in an operation, use the `set_phaseflip` function on a gate or movement operation. For example, the following code sets a 1% chance that a phase flip occurs after an $R_Y$ operation.

```python
# Equivalent to: noise.ry.z = 0.01
noise.ry.set_phaseflip(0.01)
```

## Custom noise intrinsics

To build more complex noise models, the QDK has custom noise intrinsics for Q# and OpenQASM programs. Noise intrinsics behave like custom gates that you insert into your program to model correlated noise. You can use custom intrinsics to model noise on the gates that `NoiseConfig` supports, or on custom gates.

The following examples show how to build a custom noise intrinsic that models crosstalk between three qubits. The noise intrinsic applies correlated bit flips to two of the qubits after a $CNOT$ gate is applied.

### Add noise intrinsics to a Q\# program

In Q# programs, use`@NoiseIntrinsic()` to declare a noise intrinsic. Then, use the `intrinsic` method from `NoiseConfig` to configure the noise intrinsic.

To configure and use the example noise intrinsic, follow these steps in a Jupyter notebook.

1. Import the required objects and set the QIR target profile.

    ```python
    from qdk import init, TargetProfile
    from qdk import qsharp
    from qdk.simulation import run_qir, NoiseConfig

    init(target_profile=TargetProfile.Adaptive_RIF)
    ```

1. Write a Q# program called `GHZ` that calls a noise intrinsic called `Crosstalk3Q` after each $CNOT$ gate.

    ```qsharp
    %%qsharp
    
    // A noise intrinsic representing crosstalk on 3 qubits.
    // In the ideal circuit this is a no-op; the simulator injects
    // Pauli errors according to the NoiseConfig.
    @NoiseIntrinsic()
    operation Crosstalk3Q(q0: Qubit, q1: Qubit, q2: Qubit) : Unit {
        body intrinsic;
    }
    
    // Prepare a GHZ state on 3 qubits, with crosstalk after each CNOT.
    operation GHZ() : Result[] {
        use qs = Qubit[3];
        H(qs[0]);
        CNOT(qs[0], qs[1]);
        Crosstalk3Q(qs[0], qs[1], qs[2]);  // crosstalk hits all 3 qubits
        CNOT(qs[1], qs[2]);
        Crosstalk3Q(qs[0], qs[1], qs[2]);  // crosstalk again
        MResetEachZ(qs)
    }
    ```

1. Configure the noise table for the intrinsic. Set the number of qubits, the types of noise, and the probability for each noise type.

    ```python
    noise = NoiseConfig()
    table = noise.intrinsic("Crosstalk3Q", num_qubits=3)
    table.ixx = 0.10  # 10% XX on qubits 1-2
    table.xxi = 0.05  #  5% XX on qubits 0-1
    ```
  
1. Compile the program to QIR.

    ```python
    qir = qsharp.compile("GHZ()")
    ```
  
1. Run the simulation and plot of histogram of the results.

    ```python
    result = run_qir(qir, shots=1000, noise=noise)
    Histogram(result)
    ```

1. To compare the result to a simulation without noise, run the simulation again with no noise model.

    ```python
    result = run_qir(qir, shots=1000)
    Histogram(result)
    ```

### Add noise intrinsics to an OpenQASM program

In OpenQASM programs, use `@qdk.qir.noise_intrinsic` to create a noise intrinsic as a custom gate definition. Then, use the `intrinsic` method from `NoiseConfig` to configure the noise intrinsic.

To write an OpenQASM program with a noise intrinsic called `crosstalk_3q` and compile the program into QIR, run the following code in a Jupyter notebook.

```python
from qdk.openqasm import compile, OutputSemantics
from qdk import TargetProfile
from qdk.simulation import run_qir, NoiseConfig
from qdk.widgets import Histogram

qasm_source = """
OPENQASM 3.0;
include "stdgates.inc";

// A noise intrinsic representing crosstalk on 3 qubits.
// In the ideal circuit this is a no-op; the simulator injects
// Pauli errors according to the NoiseConfig.
@qdk.qir.noise_intrinsic
gate crosstalk_3q q0, q1, q2 {}

qubit[3] qs;

// Prepare a GHZ state on 3 qubits, with crosstalk after each CNOT.
h qs[0];
cx qs[0], qs[1];
crosstalk_3q qs[0], qs[1], qs[2];  // crosstalk hits all 3 qubits
cx qs[1], qs[2];
crosstalk_3q qs[0], qs[1], qs[2];  // crosstalk again

bit[3] res = measure qs;
"""

qir_qasm = compile(
    qasm_source,
    output_semantics=OutputSemantics.OpenQasm,
    target_profile=TargetProfile.Base,
)
```

To configure the noise intrinsic and run the simulation, run the following code.

```python
noise = NoiseConfig()
table = noise.intrinsic("crosstalk_3q", num_qubits=3)
table.ixx = 0.10  # 10% XX on qubits 1-2
table.xxi = 0.05  #  5% XX on qubits 0-1

result = run_qir(qir_qasm, shots=1000, noise=noise)
Histogram(result)
```
