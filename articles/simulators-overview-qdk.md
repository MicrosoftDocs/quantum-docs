---
author: azure-quantum-content
description: This article provides an overview of all the quantum simulators in the QDK.
ms.author: quantumdocwriters
ms.date: 04/28/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concept-article
no-loc: ['Q#', '$$v', Microsoft Quantum Development Kit, target, targets]
title: Overview of quantum simulators in the QDK
uid: microsoft.quantum.overview.qdk-simulators
---

# Overview of quantum simulators in the QDK

The Microsoft Quantum Development Kit (QDK) includes a set of quantum simulators that let you run quantum programs on your local machine. Use the local simulators to iterate on your programs before you submit them to run on Azure Quantum targets.

The QDK has three simulators:

- The sparse simulator
- The neutral atom device simulator
- The QIR (quantum intermediate representation) simulator

## The sparse simulator

The sparse simulator represents qubits states as sparse vectors for fast and efficient simulations, especially for programs that don't generate a lot of qubit superposition. Use the sparse simulator when you want quick simulations of Q# or OpenQASM programs, or when you want to display qubit state vectors at different points in a program.

The sparse simulator is the default simulator in the QDK. This simulator is available in both the QDK extension for Visual Studio Code (VS Code) and the QDK Python library. You can include noise models with the sparse simulator in the QDK Python library, but not in the VS Code extension.

The sparse simulator is the only available simulator in the QDK extension for VS Code, so the compiler automatically calls this simulator when you run Q# and OpenQASM programs in VS Code.

For more information about the sparse simulator, see [The sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator).

## The neutral atom device simulator

Use the neutral atom device simulator when you plan to run quantum programs on a neutral atom quantum computer. The neutral atom simulator decomposes your program into the set of gates that exist on neutral atom devices. Noise models for this simulator can include noise that's specific to neutral atom technology, such as atom loss and qubit movement between device zones.

The QDK offers three implementations of the neutral atom device simulator:

- **The Clifford simulator:** Fast simulation for programs that contain only Clifford gates
- **The GPU simulator:** Fast and general simulation for programs with non-Clifford gates and up to 27 qubits
- **The CPU simulator:** General simulation for programs with non-Clifford gates

The neutral atom device simulator is available only in the QDK Python library. How you call the simulator depends on the quantum language framework that you're using.

For more information on neutral atom device simulation in the QDK, see [Neutral atom device simulator overview](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).

## The QIR simulators

Quantum programs get compiled into QIR before they run on quantum computers. QIR is a common representation of quantum program instructions between different quantum languages and hardware devices. With the QDK, you can run simulations directly on QIR.

Like the neutral atom device simulator, the QIR simulator has three implementation options: Clifford simulation, GPU simulation, and CPU simulation.

For more information about QIR, see [Quantum intermediate representation](xref:microsoft.quantum.concepts.qir)

## What simulator should I use?

