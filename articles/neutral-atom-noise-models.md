---
author: azure-quantum-content
description: This article describes how to build noise models for neutral atom device simulations in the QDK.
ms.date: 06/23/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, Jupyter, Python, Visual Studio Code, VS Code, "Jupyter Notebook"]
title: How to build noise models for neutral atom device simulations in the QDK
uid: microsoft.quantum.how-to.neutral-atom-simulators-noise
# Customer intent: As a quantum computing researcher, I want to know how to include noise models for simulations of programs on neutral atom devices.
---

# How to build noise models for neutral atom device simulations in the QDK

The Microsoft Quantum Development Kit (QDK) includes a set of neutral atom device simulation APIs that you can use to model how your program runs on a neutral atom quantum computer. These APIs model the types of noise that occur specifically on neutral atom hardware. The QDK Python library lets you noise models for simulations with the `NoiseConfig` class.

For more information on noise models in QDK simulations, see [How to build noise models for quantum simulations in the QDK Python library](xref:microsoft.quantum.how-to.qdk-simulator-noise-models).

For instructions on how to install and use the QDK simulators, see [How to install and run the QDK quantum simulators](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

## The neutral atom device simulation APIs

The QDK includes two neutral atom device simulation APIs, `NeutralAtomDevice` and `NeutralAtomBackend`. These APIs model the noise that occurs specifically on neutral atom quantum computers. For more information, see [Simulate quantum programs on neutral atom device hardware](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).

## Types of noise in neutral atom device simulators

In neutral atom devices, lasers physically move the qubits between different zones in the device. Noise can occur in neutral atom devices in the following situations:

- Qubit movements between zones
- Quantum gate operations on qubits in the interaction zone
- Qubit measurements in the measurement zone

Neutral atom devices have a limited set of quantum gates. Neutral atom device simulations in the QDK support noise from the following sources.

| Noise source                | Noise model parameter | Source description                            |
|-----------------------------|-----------------------|-----------------------------------------------|
| $S_X$ quantum gate          | `sx`                  | Single-qubit gate, half bit flip              |
| $R_Z$ quantum gate          | `rz`                  | Single-qubit gate, general phase rotation     |
| $CZ$ quantum gate           | `cz`                  | Two-qubit gate, controlled-$Z$ phase flip     |
| Qubit measurement and reset | `mresetz`             | Single-qubit measurement and reset to 0 state |
| Qubit movement              | `mov`                 | Qubit movement between device zones           |

For these noise sources, you can configure all of the noise types that the QDK simulators support.

Your quantum program can contain any type of gate that the QIR target profile supports. The neutral atom simulation APIs compile the input QIR and decompose your program's gates into the set of gates that exist on neutral atom devices: $S_X$, $R_Z$, and $CZ$. When you use `NeutralAtomDevice` and `NeutralAtomBackend` for your simulations, don't configure noise on other gates because that noise doesn't affect the simulation. For example, if your program contains Hadamard gates and you configure noise for Hadamard gates, that noise doesn't show up in the simulation because the Hadamard gates are decomposed into neutral atom device gates.

The neutral atom simulation APIs convert all measurements in your program into measure-and-reset instructions. To include measurement noise, configure the noise on `mresetz`. Noise on `mz` isn't included in the simulation.

## Build a noise model for a neutral atom device simulation

To build a noise model for a neutral atom device simulation, follow these steps.

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of the notebook, import the required Python objects.

    ```python
    from qdk import init, TargetProfile
    from qdk.openqasm import compile
    from qdk.simulation import NeutralAtomDevice, NoiseConfig
    from qdk.widgets import Histogram
    ```

1. In a new cell, set the device QIR target profile and compile an OpenQASM program into QIR.

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

1. Create a `NoiseConfig` object and build your noise model. For example, run the following code in a new cell.

    ```python
    noise = NoiseConfig()

    noise.sx.x = 0.01
    noise.rz.z = 0.01
    noise.cz.iy = 0.02
    noise.mov.loss = 0.005
    ```

    This code produces the following noise model, where the noise rate is the probability that the source causes the corresponding type of noise.

    | Noise source   | Noise type                              | Noise rate |
    |----------------|-----------------------------------------|------------|
    | $S_X$ gate     | Bit flip                                | 1%         |
    | $R_Z$ gate     | Phase flip                              | 1%         |
    | $CZ$ gate      | Bit flip and phase flip on target qubit | 2%         |
    | Qubit movement | Qubit loss                              | 0.5%       |

1. Run the simulator with the noise model and view a histogram of measurement results. For example, run the following code in a new cell to run 1,000 shots of your program on the Clifford simulator.

    ```python
    device = NeutralAtomDevice()

    results = device.simulate(qir, shots=1000, noise=noise, type="clifford")
    Histogram(results, labels="kets")
    ```
