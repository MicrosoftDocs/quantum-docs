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

The Neutral Atom Simulator is a feature of the Azure Quantum Development Kit (QDK) in Visual Studio Code (VS Code). This feature includes a visualizer that produces an interactive diagram where you can track how qubits are moved and processed when your program runs on a typical neutral atom quantum computer. This article explains how to create and interact with neutral atom diagrams from the visualizer.

To use the visualizer from the Neutral Atom Simulator, you must run your code in a Jupyter notebook in VS Code [DOES IT ACTUALLY HAVE TO BE THROUGH VS CODE?]. For instructions on how to install and use the Neutral Atom Simulator, see [LINK TO THE NAS INSTALLATION HOW-TO ARTICLE].

## How to create a neutral atom qubit diagram

To create a qubit diagram with the neutral atom visualizer, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with an empty Jupyter Notebook file.
1. Import the necessary packages and objects. In the first cell, enter and run the following code:

from qdk import init, TargetProfile
from qdk,openqasm import compile
from qdk.simulation import AC1000, NoiseConfig
from qdk.widgets import Histogram

To generate QIR for a neutral atom quantum computer, you must set the target QIR profile to the `Base`. To set the target profile, enter and run the following code in a new cell:

init(target_profile=TargetProfile.Base

Write your quantum program in OpenQASM code as a string and then compile your code into QIR. In a new cell, enter and run the following code:

qasm_src = """
include "stdgates.inc";
qubit[2] qs;
bit[2] r;

h qs[0];
cx qs[0], qs[1];
r = measure qs;
"""

qir = compile(qasm_src)

This program [DOES XYZ QUANTUM THINGY – CAN USE ANY SIMPLE PROGRAM HERE INSTEAD OF THE ABOVE EXAMPLE]

Create a simulator object. In a new cell, enter and run the following code:

simulator = AC1000()

To access the visualizer and create a neutral atom qubit diagram for your program, call the simulator's `trace` method and pass to it the QIR for your quantum program. In a new cell, enter and run the following code:

simulator.trace(qir)

The neutral atom qubit diagram renders in the cell's output. The diagram is simulator-independent (full-state GPU and Clifford) and doesn't include the effects of noise or qubit loss.

## How to interact with the visualizer diagram

The visualizer produces a diagram that has interactive elements that let you explore a simulation of how qubits behave as your program runs on a typical neutral atom quantum computer. The diagram is a grid with labeled rows and columns. Each neutral atom qubit is represented by a dot at one of the grid positions.

The diagram contains three types of zones:

Storage zones: These zones are labeled Register 1 and Register 2 [WHAT ELSE CAN WE SAY ABOUT THESE ZONES, WHY ARE THERE TWO AND WHAT IS THE DIFFERENCE?]. The qubits start in the storage zone and stay there until they are ready to be operated on by quantum gates or measured. After operations and measurement, qubits always move back to the storage zone.

Interaction zone: This zone is where quantum gates are applied to the qubits for processing. Qubits move from a storage zone to the interaction zone, quantum gates are applied, and then the qubits move back to a storage zone.

Measurement zone: This zone is where the qubits are measured. After qubits are processed and move back to the storage zone, they move to the measurement zone for measurement. After measurement, qubits move back to the storage zone.


[INCLUDE SCREENSHOT WITH LABELED ZONES? A MOVEMENT GRAPHIC COULD BE USEFUL HERE] 


Interactive elements in the visualizer diagram 

Use the elements at the top of the diagram to interact with the diagram and view a simulation of how your program runs. The diagram contains the following elements: 

Play button: Choose this button to play an animation of your program run. The animation goes through step of the program until the program ends. During the animation, choose this button again to pause the animation on the current step. When the animation ends, choose this button again to start the animation from the beginning. 

Forward and backward buttons: Chose these buttons to go through the program one step at a time without playing the full animation. 

Progress slider: This element shows the current step of the program. Slide the icon to move through the program and choose a specific step. At each step, hover over a qubit to see where it moved from in the previous step. 

Resize buttons: Choose the up arrow button to increase the size of the diagram, and choose the down arrow button to decrease the size of the diagram. 

Information icon: Hover over this icon to view a list of keyboard shortcuts that let you interact with the diagram. The keyboard shortcuts F and S are the only way you can speed up or slow down the animation when you choose the Play button. 

 

Related content 

 