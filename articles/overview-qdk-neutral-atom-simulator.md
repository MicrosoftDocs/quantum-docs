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
uid: microsoft.quantum.overview.qdk-neutral-atom-simulators
#customer intent: As a quantum chemistry researcher, I want to understand the tools that the QDK provides to simulate how my quantum programs will run on a neutral atom devices
---

# Neutral atom simulator overview

The Microsoft Quantum Development Kit (QDK) provides a suite of simulation tools that allow you to evaluate your quantum programs before you run them on real quantum hardware. The neutral atom simulators model the types of noise that occur when programs run on neutral atom quantum computers, such as qubit loss. If you plan to run your quantum programs on neutral atom hardware, then use the neutral atom simulators to test and refine your code.

## How neutral atom quantum computers work

Neutral atom devices are one of many current quantum computer hardware technologies. Other technologies include superconducting qubits, trapped-ion qubits, and topological qubits. Each technology has its own strengths and drawbacks. For example, neutral atom technology has good potential for scalability, but faces challenges with qubit loss.

The exact qubit technology in a neutral atom device depends on the particular architecture, but in general each qubit is a single atom with no electric charge. Lasers are used to trap the atoms and make them transition between different energy states that represent 0 and 1. The qubits tend to be arranged in 2D or 3D arrays.

## Neutral atom simulators in the QDK

Neutral atom device simulation in the QDK is designed to incorporate the unique properties of neutral atom quantum hardware, such as qubit loss. There are three simulators in the `qdk.simulation` Python module that can run neutral atom device simulations:

- The Clifford simulator
- The full-state GPU simulator
- The full-state CPU simulator

Also, the `qdk.widgets` module offers has a neutral atom device visualizer for Jupyter Notebook. This visualizer shows how qubits move and get processed in a basic neutral atom device.

To run your quantum program, the simulators and the visualizer use QIR that you generate from your quantum program.

### The Clifford simulator

The Clifford simulator models quantum circuits that exclusively use Clifford gates, which is the set of quantum gates that includes Hadamard gates, S gates, CNOT gates, and gates that are compositions of these three gates. Clifford gates are used extensively for quantum error correction (QEC) algorithms, which are essential to get accurate results when you run programs on real quantum hardware.

The Clifford simulator is fast and efficient, so you can model systems that have a large number of qubits. But if your circuit has non-Clifford gates, then you can't use the Clifford simulator to run your program.

### The full-state GPU and CPU simulators

The full-state GPU and CPU simulators can model quantum circuits that contain any type of gate. However, these simulators are more computationally expensive to run, and performance is determined by the power of your local machine's GPU and CPU capabilities. The GPU simulator is faster than the CPU simulator, but the CPU simulator is a good option for machines that don't have a compatible GPU.

The GPU simulator can model only up to 27 qubits. The CPU simulator can model any number of qubits, but runtimes become impossible when your program contains too many qubits. Use the full-state simulators when your program has non-Clifford gates. For example, quantum programs for chemistry often contain non-Clifford gates.

### The neutral atom device visualizer

The neutral atom device visualizer is a QDK tool for Jupyter Notebook. The visualizer creates an interactive animated diagram of the atoms in a basic neutral atom device. The diagram shows how the atoms move and change as your program runs on the simulated hardware. The visualizer is independent of which simulator that you use, and doesn't model noise or qubit loss.

The visualizer shows the different zones where qubits are located in a neutral atom device. The qubits move between these zones as your program runs. For example, available qubits are in the storage zone, then move to the interaction zone where quantum gates are applied to them, and then move to the measurement zone when the qubits are ready to be measured.

## Get started with the neutral atom simulators

To learn how to install and use the neutral atom device simulators in the QDK, see [How to install and use the neutral atom device simulators in the QDK](microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

To learn how to use the neutral atom device simulator, see [How to use the neutral atom device visualizer](xref:microsoft.quantum.how-to.qdk-neutral-atom-visualizer).

For full end-to-end code samples of neutral atom device simulation and visualization, see the neutral atom notebook samples on the [QDK GitHub repository] (https://github.com/microsoft/qdk/tree/main/samples/notebooks).
