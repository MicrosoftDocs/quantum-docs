---
author: azure-quantum-content
description: This article explains how to build noise models for multi-qubit gates in the QDK.
ms.date: 08/17/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, Jupyter, Python, Visual Studio Code, VS Code, "Jupyter Notebook"]
title: Build noise models for multi-qubit gates
uid: microsoft.quantum.how-to.multi-qubit-noise-models
# Customer intent: As a quantum computing researcher, I want to know how to build advanced noise models for multi-qubit gates.
---

# Build noise models for multi-qubit gates

The Microsoft Quantum Development Kit (QDK) Python package supports flexible noise models for multi-qubit gates in quantum program simulations. You can model correlated errors and other noise effects across multiple qubits to more accurately represent the behavior of quantum hardware.

For more information on noise models in the QDK, see [How to build noise models for quantum simulations in the QDK](xref:microsoft.quantum.how-to.qdk-simulator-noise-models).

## Prerequisites

To build noise models in the QDK, install the following tools.

- Visual Studio Code (VS Code) with [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) installed.
- The latest version of the `qdk` Python package with the `jupyter` extra.

```bash
pip install --upgrade "qdk[jupyter]"
```

## Correlated noise

Multi-qubit gates can produce correlated noise, where the same noise pattern applies to all qubits that the gate operates on. To set correlated noise on multi-qubit gates, specify a noise parameter for each qubit.

For example, the following Python code sets correlated bit flips on $CX$ gates with a 2% probability. When noise occurs on a $CX$ gate, an $X$ gate applies to both the control qubit and the target qubit. The noise is correlated because the noise always applies to both qubits.

```python
from qdk.simulation import NoiseConfig

noise = NoiseConfig()

noise.cx.xx = 0.02
```

To make the noise uncorrelated, set multiple noise types with the identity parameter.

```python
noise.cx.xi = 0.02 # Bit flip on control qubit, do nothing to target qubit
noise.cx.ix = 0.02 # Do nothing to control qubit, bit flip on target qubit
```

In the uncorrelated model, each noise setting occurs independently with 2% probability. Because only one noise setting can apply to an individual gate, this noise model can't apply $X$ noise to both qubits in the same gate.

To model the possibility of noise on both qubits, configure another noise setting that applies noise to both qubits.

```python
noise.cx.xi = 0.02 # Bit flip on control qubit, do nothing to target qubit
noise.cx.ix = 0.02 # Do nothing to control qubit, bit flip on target qubit
noise.cx.xx = 0.02 # Bit flip on both qubits
```

## Qubit loss policies

Qubit loss is a type of noise where qubits are lost from the device. Loss policies define the behavior of a multi-qubit gate when one or more of the qubits is missing when the operation begins. The QDK supports the following loss policies.

| Loss policy         | Gates the policy can apply to | Effect on remaining qubits                         |
|---------------------|-------------------------------|----------------------------------------------------|
| `SKIP`              | All gates                     | The gate has no effect on the remaining qubits     |
| `PROPAGATE`         | All gates                     | The other qubits are also lost                     |
| `DEGRADE`           | `rxx` ,`ryy`, and `rzz`       | Apply as single-qubit gate to remaining qubit      |
| `RESIDUAL_S_DAGGER` | All gates                     | Apply `s_sdj` gate to remaining qubits             |
| `APPLY_ANYWAY`      | `swap`                        | Remaining qubit still swaps states with lost qubit |

For loss policies to affect your simulation, you need to include qubit loss in your noise model. Lost qubits are tracked during the simulation. Loss policies apply when a gate operates on at least one lost qubit.

To include loss policies in your noise model, use `LossPolicy` from the `qdk.simulation` module. The following code shows examples to set each policy.

```python
from qdk.simulation import NoiseConfig, LossPolicy

noise = NoiseConfig()

noise.x.l = 0.01 # 1% chance of qubit loss after X gates

noise.cz.on_loss   = LossPolicy.SKIP               # Don't apply CZ to remaining qubit
noise.cx.on_loss   = LossPolicy.PROPAGATE          # Both qubits are lost from CX gate
noise.rxx.on_loss  = LossPolicy.DEGRADE            # Apply Rx gate to remaining qubit
noise.ryy.on_loss  = LossPolicy.RESIDUAL_S_DAGGER  # Apply S-adjoint to remaining qubit
noise.swap.on_loss = LossPolicy.APPLY_ANYWAY       # Perform swap anyway
```

For all loss policies, configured noise can still affect the remaining qubits. For example, the following code can still apply bit flip noise on CZ gates even when one of the qubits in a CZ gate is missing.

```python
noise.z.l = 0.01 # Introduce qubit loss

noise.cz.xx = 0.02 # Set correlated bit flip noise on CZ gates
noise.cz.on_loss = LossPolicy.SKIP
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
