---
author: azure-quantum-content
description: This article gives an overview of the neutral atom simulator tools in the QDK, which allow quantum researchers to simulate and visualize how their quantum programs run on neutral atom quantum computers.
ms.date: 05/08/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API, Clifford, GPU, CPU]
title: Simulate jobs on neutral atom quantum computers in the QDK
uid: microsoft.quantum.overview.qdk-neutral-atom-simulators
#customer intent: As a quantum chemistry researcher, I want to understand the tools that the QDK provides to simulate how my quantum programs will run on a neutral atom devices
---

# Neutral atom device simulator overview

The Microsoft Quantum Development Kit (QDK) provides a suite of simulation tools that allow you to evaluate your quantum programs before you run them on real quantum hardware. The neutral atom device simulator models the types of noise and qubit processing that occurs when programs run on neutral atom quantum computers, such as qubit loss and qubit movement. If you plan to run your quantum programs on neutral atom hardware, then use the neutral atom device simulator to test and refine your code.

## How neutral atom quantum computers work

Neutral atom devices are one of many current quantum computer hardware technologies. Other technologies include superconducting qubits, trapped-ion qubits, and topological qubits. Each technology has its own strengths and drawbacks. For example, neutral atom technology has good potential for scalability, but faces challenges with qubit loss.

The exact qubit technology in a neutral atom device depends on the particular architecture, but in general each qubit is a single atom with no electric charge. Lasers are used to trap the atoms and make them transition between different energy states that represent 0 and 1. The qubits tend to be arranged in 2D or 3D arrays.

## Neutral atom device simulation in the QDK

Neutral atom device simulation in the QDK is designed to incorporate the unique properties of neutral atom quantum hardware. The QDK Python library has two neutral atom simulation APIs from the `qdk.simulation` module that call one of the QDK quantum simulators to run your program:

- The `NeutralAtomDevice` class to run programs from QIR
- The `NeutralAtomBackend` class to run Qiskit programs

These classes call either the Clifford, GPU, or CPU simulator to simulate how your program runs on a neutral atom device specifically. The simulator converts your program into a new QIR that includes only the set of gates that exist on neutral atom devices. The new QIR also contains instructions for neutral atom movement, and noise models can include qubit loss.

There's also the `qdk.widgets` module, which includes a neutral atom device visualizer for Jupyter Notebook. This visualizer shows how qubits move and get processed in a basic neutral atom device.

For more information on quantum simulation in the QDK, see [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators)

## The neutral atom device visualizer

The neutral atom device visualizer is a QDK tool for Jupyter Notebook. The visualizer creates an interactive animated diagram of the atoms in a basic neutral atom device. The diagram shows how the atoms move and change as your program runs on the simulated hardware. The visualizer is independent of which simulator that you use, and doesn't model noise or qubit loss.

The visualizer shows the different zones where qubits are located in a neutral atom device. The qubits move between these zones as your program runs. For example, available qubits are in the storage zone, then move to the interaction zone where quantum gates are applied to them, and then move to the measurement zone when the qubits are ready to be measured.

## Get started with neutral atom device simulation

To learn how to install and use the neutral atom device simulator in the QDK, see [How to install and use the neutral atom device simulators in the QDK](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

To learn how to use the neutral atom device simulator, see [How to use the neutral atom device visualizer](xref:microsoft.quantum.how-to.qdk-neutral-atom-visualizer).

For full end-to-end code samples of neutral atom device simulation and visualization, see the neutral atom notebook samples on the [QDK GitHub repository](https://github.com/microsoft/qdk/tree/main/samples/notebooks).
