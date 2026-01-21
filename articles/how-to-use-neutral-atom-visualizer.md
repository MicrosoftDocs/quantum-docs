---
author: azure-quantum-content
description: This article gives an overview of the neutral atom simulator tools in the QDK, which allow quantum researchers to simulate and visualize how their quantum programs will run on neutral atom quantum computers.
ms.date: 01/20/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: Simulate jobs on neutral atom quantum computers in the QDK
uid: microsoft.quantum.how-to.qdk-neutral-atom-visualizer
#customer intent: As a quantum chemistry researcher, I want to understand the tools that the QDK provides to simulate how my quantum programs will run on a neutral atom devices
---

# How to use the neutral atom device visualizer

The Microsoft Quantum Development Kit (QDK) offers several quantum simulators, including three simulators and a visualizer for neutral atom quantum computers. The neutral atom visualizer produces an interactive diagram where you can track how qubits move and get processed when your program runs on a basic neutral atom device. This article explains how to create and interact with neutral atom diagrams from the visualizer.

To use the neutral atom visualizer, you must run your code in a Jupyter notebook in VS Code. For instructions on how to install the simulators and visualizer, see [How to install and use the neutral atom device simulators in the QDK](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

## How to create a neutral atom qubit diagram

To create a qubit diagram with the neutral atom visualizer, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with an empty Jupyter Notebook file.
1. Import the necessary packages and objects. In the first cell, enter and run the following code:

    ```python
    from qdk import init, TargetProfile
    from qdk,openqasm import compile
    from qdk.simulation import NeutralAtomDevice, NoiseConfig
    from qdk.widgets import Histogram
    ```

1. Write your quantum circuit and compile the circuit into QIR. Copy and run the following code in a new cell:

    ```python
    init(target_profile=TargetProfile.Base

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

    This simple circuit entangles two qubits.

1. Create a simulator object. In a new cell, enter and run the following code:

    ```python
    simulator = NeutralAtomDevice()
    ```

1. To access the visualizer and create a neutral atom qubit diagram for your program, call the simulator's `trace` method and pass the QIR for your quantum program. In a new cell, enter and run the following code:

    ```python
    simulator.trace(qir)
    ```

    The neutral atom qubit diagram renders in the output cell. Note that the visualizer diagrams don't include the effects of noise or qubit loss.

## How to interact with the visualizer diagram

The diagram has interactive elements that let you explore a simulation of how qubits behave as your program runs on a basic neutral atom quantum computer. The diagram is a 2D grid with labeled rows and columns. Each neutral atom qubit is represented by a dot at one of the grid positions.

The diagram contains three zones:

- **Storage zone:** This zone is labeled **Register 1**. The qubits start in the storage zone and stay there until they're ready for processing or measurement. Qubits always move back to the storage zone after operations and measurement.
- **Interaction zone:** This zone is where quantum gates are applied to the qubits for processing. Qubits move from the storage zone to the interaction zone, quantum gates are applied, and then the qubits move back to the storage zone.
- **Measurement zone:** This zone is where the qubits are measured. After qubits are processed and move back to the storage zone, they move to the measurement zone for measurement. After measurement, qubits move back to the storage zone.

### Interactive elements in the visualizer diagram

Use the elements at the top of the diagram to interact with the diagram and view a simulation of how your program runs. The diagram contains the following elements:

- **Play button:** Choose this button to play an animation of your program run. The animation goes through each step of the program until the program ends. During the animation, choose this button again to pause the animation on the current step. When the animation ends, choose this button again to start the animation from the beginning.
- **Forward and backward buttons:** Choose these buttons to go through the program one step at a time without playing the full animation.
- **Progress slider:** This element shows the current step of the program. Move the slider to go through the program and choose a specific step. At each step, hover over a qubit to see where the qubit moved from in the previous step.
- **Resize buttons:** Choose the up arrow button to increase the size of the diagram, and choose the down arrow button to decrease the size of the diagram.
- **Information icon:** Hover over this icon to view a list of keyboard shortcuts that let you interact with the diagram. The keyboard shortcut **F** speeds up the animation and **S** slows down the animation when you choose the **Play** button.
