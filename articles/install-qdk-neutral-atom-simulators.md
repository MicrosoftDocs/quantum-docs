---
author: azure-quantum-content
description: This article describes how to install the neutral atom simulators from the QDK, and how to run a basic neutral atom device simulation.
ms.date: 01/23/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API]
title: How to install and use the neutral atom device simulators in the QDK
uid: microsoft.quantum.how-to.install-qdk-neutral-atom-simulators
#customer intent: As a quantum developer, I want to know how to install and use the neutral atom device simulators in the QDK
---

# How to install and use the neutral atom device simulators in the QDK

The neutral atom device simulators are features of the Microsoft Quantum Development Kit (QDK) that simulate how your quantum programs run on a real neutral atom quantum computer. In this article, you install the simulation Python modules from the QDK and run a basic neutral atom device simulation.

## Prerequisites

To use the neutral atom device simulators, you must install the following:

- Python environment (version 3.10 or greater) with Python and Pip
- Visual Studio Code (VS Code) with the Jupyter Notebook extension, or open VS Code for the Web
- The latest version of the QDK extension in VS Code

## Install the neutral atom device simulators

To use the neutral atom device simulators, install the latest version of the `qdk` Python library with the `jupyter` extra:

```bash
pip install --upgrade "qdk[jupyter]"
```

The `jupyter` extra isn't required to use the simulators, but does install the `qdk.widgets` module. The `widgets` module allows you to create visualizations from your simulation results in Jupyter Notebook.

## Simulate a basic quantum program

To use a neutral atom device simulator, you need to convert your program from OpenQASM code to QIR, create a simulator object, and then pass the QIR and other parameters to the simulator. The QDK simplifies this entire process for you.

For example, to run a neutral atom simulation for a basic quantum program and view a distribution of the results, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with an empty Jupyter Notebook file.
1. To import the required libraries and objects, run the following code in the first cell:

    ```python
    from qdk import init, TargetProfile
    from qdk.openqasm import compile
    from qdk.simulation import NeutralAtomDevice, NoiseConfig
    from qdk.widgets import Histogram
    ```

1. To generate QIR for a neutral atom quantum computer, you must set a target profile. For this example, set the target profile to the `Base`. To set the target profile, run the following code in a new cell:

    ```python
    init(target_profile=TargetProfile.Base)
    ```

    > [!NOTE]
    > The neutral atom device simulators can't run quantum programs that contain branching, even when the target profile supports branching.

1. To create a quantum circuit in OpenQASM code and compile the circuit into QIR, run the following code in a new cell:

    ```python
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

1. To include noise in your simulation, copy and run the following code in a new cell:

    ```python
    noise = NoiseConfig()
    noise.cz.set_depolarizing(0.05)
    noise.sx.set_bitflip(0.01)
    noise.mov.loss = 0.001
    ```

1. To create a GPU simulator and run your program on the simulator, copy and run the following code in a new cell:

    ```python
    simulator = NeutralAtomDevice()
    results = simulator.simulate(qir, shots=1000, noise=noise, type="gpu")
    ```

    > [!NOTE]
    > If you don't specify a `type` argument in the `simulate` method, then the default simulator is the GPU simulator. If the GPU simulator can't run on your machine, then the QDK uses the CPU simulator instead. However, if you specify `"gpu"` for `type` and your machine can't run the GPU simulator, then you get an error.

1. To view a histogram of your simulation results, copy and run the following code in a new cell:

    ```python
    Histogram(results, labels="kets")
    ```

    :::image type="content" source="media/neutral-atom-simulator-histogram.png" alt-text="Screenshot that shows a results histogram from a GPU simulation of a quantum program run on a neutral atom device.":::

## Related content

- [Neutral atom simulator overview](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).
- [How to use the neutral atom device visualizer](xref:microsoft.quantum.how-to.qdk-neutral-atom-visualizer).
