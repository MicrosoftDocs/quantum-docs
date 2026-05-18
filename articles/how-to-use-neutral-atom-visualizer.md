---
author: azure-quantum-content
description: This article explains how to use the neutral atom device visualizer from the QDK Python library.
ms.date: 05/14/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API]
title: Visualize qubits on a neutral atom device
uid: microsoft.quantum.how-to.qdk-neutral-atom-visualizer
# Customer intent: As a quantum researcher or developer, I want to understand the tools that the QDK provides to simulate how my quantum programs run on a neutral atom quantum computers
---

# How to use the neutral atom device visualizer

The Microsoft Quantum Development Kit (QDK) offers several quantum simulators, including three simulators and a visualizer for neutral atom quantum computers. The neutral atom device visualizer produces an interactive diagram where you can track how qubits move and get processed when your program runs on a basic neutral atom device. This article explains how to create and interact with neutral atom diagrams from the visualizer.

For instructions on how to install the simulators and visualizer, see [How to install and use the neutral atom device simulators in the QDK](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

## How to create a neutral atom qubit diagram

To create a qubit diagram with the neutral atom visualizer, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with an empty Jupyter Notebook file.
1. Import the necessary packages and objects. In the first cell, enter and run the following code:

    ```python
    from qdk.openqasm import compile
    from qdk.simulation import NeutralAtomDevice
    ```

1. Write your OpenQASM circuit and compile the circuit into QIR. For example, the following circuit entangles two qubits:

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

1. Create a simulator object using `NeutralAtomDevice`.

    ```python
    simulator = NeutralAtomDevice()
    ```

1. To access the visualizer, call the `show_trace` method and pass the QIR for your program.

    ```python
    simulator.show_trace(qir)
    ```

    The neutral atom qubit diagram renders in the output cell. The visualizer doesn't include the effects of noise or qubit loss.

## How to interact with the visualizer diagram

The diagram has interactive elements that let you explore a simulation of how qubits behave as your program runs on a basic neutral atom quantum computer. The diagram is a 2D grid with labeled rows and columns. Each dot in a grid position represents one neutral atom qubit on the device.

The diagram contains three zones:

| Zone             | Description |
|------------------|-------------|
| Storage zone     | This zone is labeled **Register 1**. The qubits start in the storage zone and stay there until they're ready for processing or measurement. Qubits always move back to the storage zone after operations and measurements. |
| Interaction zone | This zone is where quantum gates are applied to the qubits for processing. |
| Measurement zone | This zone is where the qubits are measured. |

:::image type="content" source="media/neutral-atom-visualizer-zones.png" alt-text="Screenshot that shows the three zones in the neutral atom device visualizer":::

### Interactive elements in the visualizer diagram

Use the elements at the top of the diagram to interact with the diagram and view a simulation of how your program runs. The diagram contains the following elements:

1. **Play button:** Choose this button to play an animation of your program run. The animation goes through each step of the program until the program ends. During the animation, choose this button again to pause the animation on the current step. When the animation ends, choose this button again to start the animation from the beginning.
1. **Forward and backward buttons:** Choose these buttons to go through the program one step at a time without playing the full animation.
1. **Progress slider:** This element shows the current step of the program. Move the slider to go through the program and choose a specific step. At each step, hover over a qubit to see where the qubit moved from in the previous step.
1. **Resize buttons:** Choose the up arrow button to increase the size of the diagram, and choose the down arrow button to decrease the size of the diagram.
1. **Information icon:** Hover over this icon to view a list of keyboard shortcuts that let you interact with the diagram. The keyboard shortcut **F** speeds up the animation and **S** slows down the animation when you choose the **Play** button.

:::image type="content" source="media/neutral-atom-visualizer-elements.png" alt-text="Screenshot with labeled UI elements of the neutral atom device visualizer.":::
