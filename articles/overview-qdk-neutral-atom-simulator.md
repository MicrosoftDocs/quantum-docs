---
author: azure-quantum-content
description: This article gives an overview of the Neutral Atom Simulator tools in the QDK, which allow quantum researchers to simulate and visualize how their quantum programs will run on neutral atom quantum computers.
ms.date: 01/14/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: Discover the Neutral Atom Simulator in the QDK
uid: microsoft.quantum.overview.qdk-chem-sparse-isometry
#customer intent: As a quantum chemistry researcher, I want to understand what sparse isometry is and why I should use it to build state preparation quantum circuits for my quantum chemistry calculations
---

# Neutral Atom Simulator overview

The Azure Quantum Development Kit (QDK) provides a suite of simulation tools that allow you to evaluate your quantum programs before you run them on real quantum hardware. The Neutral Atom Simulator tools model the physical processes that occur on general neutral atom machines. If you plan to run your quantum programs on neutral atom hardware, then use the Neutral Atom Simulator to test and refine your code.

## How neutral atom quantum computers work

Neutral atom devices are one of many current quantum computer hardware technologies. Other technologies include superconducting qubits, trapped-ion qubits, and topological qubits. Each technology has its own strengths and drawbacks. For example, neutral atom technology has good potential for scalability, but faces challenges with qubit loss.

The exact qubit technology in a neutral atom device depends on the particular architecture, but in general each qubit is a single atom with no electric charge. The two states of the qubit are usually given by !!!!!!!!!!!!!!!!... The qubits tend to be arranged in 2D or 3D arrays where each qubit is held in place and then moved for processing by optical lasers.

[INCLUDE A GRAPHIC THAT ILLUSTRATES WHAT THE STATES ARE FOR NEUTRAL ATOM QUBITS AND HOW THE QUBITS TRANSITION BETWEEN STATES]

## Features of the Neutral Atom Simulator 

The Neutral Atom Simulator in the QDK is designed for the unique physics of neutral atom quantum hardware to simulate how quantum programs run on neutral atom quantum computers. The Neutral Atom Simulator is a Python package that includes two different simulators, the Clifford simulator and full-state GPU simulator, along with a neutral atom visualizer. 

 
Both simulators take OpenQASM code as input and then build QIR from your OpenQASM source code. The QIR is then passed to the simulators and visualizer. The simulators use the QIR to model physical processes that are unique to neutral atom quantum hardware, such as: 

Qubit loss 

Noise [WHAT KINDS OF NOISE? IS IT SPECIFIC TO NEUTRAL ATOM TECH?] 

?????? 

?????? 

 
The Clifford simulator 

 
The Clifford simulator models quantum circuits that exclusively use Clifford gates, which is a set of quantum gates that include [LIST CLIFFORD GATES]. Clifford gates are used extensively for quantum error correction (QEC) algorithms, which are essential to get accurate results when you run programs on real quantum hardware. 

 
The Clifford simulator is fast and efficient, so you can model systems with up to #### qubits. [OTHER HIGH-LEVEL SPECS? QUBIT NUMBER RANGE, RUN TIME, SHOT NUMBER RANGE, ETC.] 

 
The full-state GPU simulator [WHY DO WE CALL IS FULL-STATE? BECAUSE IT CAN MODEL ANY GATE TYPE?] 

 
The GPU simulator can model quantum circuits that contain any type of gate, which is important for certain applications. For example, quantum chemistry algorithms require operations that aren't within the set of Clifford gates. However, the GPU simulator is more expensive to run, and performance is determined by the power of your local machine's GPU capabilities.  

 
The GPU simulator can model up to 27 qubits. [OTHER HIGH-LEVEL SPECS? QUBIT NUMBER RANGE, RUN TIME, SHOT NUMBER RANGE, ETC.] 

 
The neutral atom visualizer 

 
The neutral atom visualizer is a tool for Jupyter Notebook in Visual Studio Code. The visualizer creates an interactive animated diagram of the atoms in a typical neutral atom machine. The diagram shows how the atoms move and change as your program runs on the simulated hardware.  

 
The visualizer shows the various zones where qubits are located in a neutral atom machine. The qubits move between these zones as your program runs. For example, available qubits are in the storage zone, then move to the interaction zone where quantum gates are applied to them, then move to the measurement zone when the qubits are ready to be measure 

 
The visualizer is independent of which simulator that you use, and doesn't model noise or qubit loss. 

 
Get started with the Neutral Atom Simulator 

 
To learn how to install and use the Neutral Atom Simulator in the QDK, see [LINKS TO HOW-TO ARTICLES (INSTALLATION, RUNNING CODE, USING VISUALIZER). Or, see neutral atom code sample for full end-to-end workflows [LINK TO SAMPLE NOTEBOOKS]. 

 
Related content 

[LINK TO QDK INSTALLATION] 

[LINKS TO OTHER SIMULATION PAGES] 

[LINK TO QIR OVERVIEW] 