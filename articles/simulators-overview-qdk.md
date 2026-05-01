---
author: azure-quantum-content
description: This article provides an overview of all the quantum simulators in the QDK.
ms.author: quantumdocwriters
ms.date: 04/29/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ["Q#", "OpenQASM", "QIR", "Qiskit", "Microsoft", "Quantum Development Kit", "QDK"]
title: Overview of quantum simulators in the QDK
uid: microsoft.quantum.overview.qdk-simulators
#Customer intent: As a quantum developer or researcher, I want to know about the simulation tools that the QDK provides and their use cases.
---

# Overview of quantum simulators in the QDK

The Microsoft Quantum Development Kit (QDK) includes a set of quantum simulators that let you run quantum programs on your local machine. Use the local simulators to iterate on your programs before you submit them to run on Azure Quantum targets.

The QDK has three simulators:

- The sparse simulator
- The neutral atom device simulator
- The QIR (quantum intermediate representation) simulator

## The sparse simulator

The sparse simulator is the default simulator in the QDK. This simulator represents qubit states as sparse vectors for fast and efficient simulations, especially for programs that don't generate many superposition states. You can also include noise models in sparse simulations. Use the sparse simulator when you want quick simulations of Q# or OpenQASM programs, or when you want to display qubit state vectors at different points in a program.

The sparse simulator is available in both the QDK extension for Visual Studio Code (VS Code) and the QDK Python library. The sparse simulator is the only available simulator in the QDK extension, so the compiler automatically calls this simulator when you run Q# and OpenQASM programs in VS Code.

For more information about the sparse simulator, see [The sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator).

## The neutral atom device simulator

The neutral atom device simulator takes the QIR for your program and converts into a set of instructions that are specific to neutral atom qubit devices. Noise models for this simulator apply only to the set of gates that exist on neutral atom devices, and to noise that's specific to neutral atom technology, such as qubit loss and qubit movement between device zones. Use the neutral atom device simulator when you plan to run quantum programs on a neutral atom quantum computer.

The neutral atom device simulator is available only in the QDK Python library, and is compatible with all quantum programming frameworks. How you call the simulator depends on the framework that you're using.

For more information on neutral atom device simulation in the QDK, see [Neutral atom device simulator overview](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).

## The QIR simulator

The QIR simulator takes the QIR for your program and performs a direct simulation based on the instructions in the QIR. For more information about QIR, see [Quantum intermediate representation](xref:microsoft.quantum.concepts.qir).

The QIR simulator is available only in the QDK Python library, and is compatible with all quantum programming frameworks that you can convert to QIR. How you call the simulator is the same for all supported frameworks because the simulator takes direct QIR as input.

## What simulator should I use?

The available simulators and how to use them depend on the QDK and quantum language that you're using.

### Simulations in the QDK extension for VS Code

The sparse simulator is the only available simulator in the QDK extension for VS Code. To use the sparse simulator, run your Q# or OpenQASM file in VS Code.

### Simulations in the QDK Python library

The QDK Python development environment supports multiple quantum frameworks and all the QDK simulators, but not all simulators are compatible with all frameworks.

The following table lists the Python APIs to run simulations based on the simulator and quantum framework:

| Simulator           | Framework | Python API                         | Supports noise models |
|---------------------|-----------|------------------------------------|-----------------------|
| Sparse              | Q#        | `qdk.qsharp.run`                   | Yes                   |
| Sparse              | OpenQASM  | `qdk.openqasm.run`                 | Yes                   |
| Sparse              | Qiskit    | `qdk.qiskit.QSharpBackend`         | No                    |
| Neutral atom device | QIR       | `qdk.simulation.NeutralAtomDevice` | Yes                   |
| Neutral atom device | Qiskit    | `qdk.qiskit.NeutralAtomBackend`    | Yes                   |
| QIR                 | QIR       | `qdk.simulation.run_qir`           | Yes                   |

## Related content

- [How to install and use the neutral atom device simulators in the QDK](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators)
- [How to build noise models for neutral atom device simulations](xref:microsoft.quantum.how-to.neutral-atom-simulators-noise)
- [Backend quantum simulators from quantum providers](xref:microsoft.quantum.machines.overview.backend-simulators)
