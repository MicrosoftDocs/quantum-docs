---
author: azure-quantum-content
description: This article provides an overview of all the quantum simulators in the QDK.
ms.author: quantumdocwriters
ms.date: 05/08/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ["Q#", "OpenQASM", "QIR", "Qiskit", "Microsoft", "Quantum Development Kit", "QDK", "Clifford", "Pauli", "Hadamard", "GPU", "CPU", "Azure Quantum", "Python"]
title: Overview of quantum simulators in the QDK
uid: microsoft.quantum.overview.qdk-simulators
# Customer intent: As a quantum developer or researcher, I want to know about the simulation tools that the QDK provides and their use cases.
---

# Overview of quantum simulators in the QDK

The Microsoft Quantum Development Kit (QDK) includes a set of quantum simulators that let you run quantum programs on your local machine. Use the local simulators to iterate on your programs before you submit them to run on Azure Quantum targets.

The QDK has four simulators:

- The sparse simulator
- The Clifford simulator
- The GPU simulator
- The CPU simulator

## The sparse simulator

The sparse simulator is the default simulator in the QDK. This simulator represents qubit states as sparse vectors to take advantage of sparse matrix algebra for fast simulations, especially for programs that don't generate many superposition states. Use the sparse simulator when you want quick simulations of Q#, OpenQASM, or Qiskit programs, or when you want to display the quantum state of your program during simulation.

The sparse simulator is available in both the QDK extension for Visual Studio Code (VS Code) and the QDK Python library. This simulator is the only available simulator in the QDK extension, so the compiler automatically calls the sparse simulator when you run Q# and OpenQASM programs in VS Code. With the sparse simulator in VS Code, you can use the Q# `DumpMachine` function or the debugger to display qubit state vectors at different points in the simulation.

Both the VS Code extension and the Python library support noise models for sparse simulations of Q# and OpenQASM programs. Only the Python library supports sparse simulation for Qiskit programs, but without noise model support.

For more information about the sparse simulator, see [The sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator).

## The Clifford simulator

The Clifford simulator is fast and efficient for programs with up to thousands of qubits, but can only simulate programs that contain only Clifford gates. Clifford gates are common components of error correction circuits. The set of Clifford gates consists of the H, S, and CX gates, and all of the gates that can be constructed from those three gates. The following Clifford gates are common components of quantum circuits:

- $X$, $Y$, and $Z$
- $S$ and $S^\dagger$
- $H$, or Hadamard
- $CX$, $CY$, and $CZ$
- SWAP and iSWAP

The Clifford simulator is available in the QDK Python library for Q#, OpenQASM, Qiskit, and QIR programs, but isn't available in the QDK extension for VS Code.

## The GPU simulator

The GPU simulator is a full-state simulator that uses your machine's GPU to run many shots of your quantum program in parallel. This simulator can run programs that contain any type of gate, but is expensive to run. The simulator can model up to 27 qubits. The power of your machine's GPU determines the performance, but performance is optimal for programs that have around 20 qubits and lots of shots.

The GPU simulator takes QIR or Qiskit as input, and is available through certain QDK Python library APIs, but not the VS Code extension. There is also rich support for noise models on any type of quantum gate or operation.

## The CPU simulator

Like the GPU simulator, the CPU simulator is a full-state simulator that can run programs that contain any type of quantum gate. However, the CPU simulator is slower because it can't run multiple shots in parallel. This simulator scales up to around 25 qubits, but slows down exponentially with more qubits because of memory issues. Use the CPU simulator when your machine doesn't have a GPU, or when your program has few qubits and you aren't running a lot of shots.

The CPU simulator takes QIR or Qiskit as input, and is available through certain QDK Python library APIs, but not the VS Code extension. There's also rich support for noise models on any type of quantum gate or operation.

## What simulator should I use?

The best simulator to use depends on several factors, such as:

- Your development environment (VS Code or Python)
- The quantum programming framework that you're developing in
- The complexity of your program and the number of shots
- The hardware capabilities of your local machine
- The Azure Quantum targets or other quantum hardware that you want to run your programs on
- The noise models that you want to build

The following table summarizes the QDK options and quantum programming frameworks that you can use for each simulator:

| Simulator | Availability                         | Supported frameworks      |
|-----------|--------------------------------------|---------------------------|
| Sparse    | VS Code extension and Python library | Q#, OpenQASM, Qiskit      |
| Clifford  | Python library                       | Q#, OpenQASM, Qiskit, QIR |
| GPU       | Python library                       | Qiskit, QIR               |
| CPU       | Python library                       | Qiskit, QIR               |

### Simulations in the QDK extension for VS Code

The sparse simulator is the only available simulator in the QDK extension for VS Code. To use the sparse simulator, run your Q# or OpenQASM file in VS Code. You can add limited noise models to the sparse simulator for Q# programs in VS Code, but not for OpenQASM programs.

### Simulations in the QDK Python library

The QDK Python development environment supports multiple quantum frameworks and all four QDK simulators, but not all simulators are compatible with all frameworks and APIs.

This table shows the simulators that you can use for each Python API that calls a QDK simulator, and the programming framework that each API supports:

| Python API                      | Sparse | Clifford | GPU | CPU | Programming framework |
|---------------------------------|------- |----------|-----|-----|-----------------------|
| `qsharp.run`                    | ✅     | ✅       |     |     | Q#                    |
| `openqasm.run`                  | ✅     | ✅       |     |     | OpenQASM              |
| `qiskit.QSharpBackend`          | ✅     |          |     |     | Qiskit                |
| `simulation.NeutralAtomDevice`  |        | ✅       | ✅  | ✅  | QIR                   |
| `simulation.NeutralAtomBackend` |        | ✅       | ✅  | ✅  | Qiskit                |
| `simulation.run_qir`            |        | ✅       | ✅  | ✅  | QIR                   |

## Related content

- [How to install and run the QDK quantum simulators](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators)
- [How to build noise models for quantum simulations in the QDK Python library](xref:microsoft.quantum.how-to.qdk-simulator-noise-models)
- [Backend quantum simulators from quantum providers](xref:microsoft.quantum.machines.overview.backend-simulators)
