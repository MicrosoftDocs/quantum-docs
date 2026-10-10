---
author: azure-quantum-content
description: This article provides an overview of all the quantum simulators in the QDK.
ms.author: quantumdocwriters
ms.date: 10/06/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
ai-usage: ai-assisted
no-loc: ["Q#", "OpenQASM", "QIR", "Qiskit", "Microsoft", "Quantum Development Kit", "QDK", "Stabilizer", "Clifford", "Pauli", "Hadamard", "GPU", "CPU", "Azure Quantum", "Python", "Visual Studio Code", "VS Code", "Jupyter Notebook"]
title: Overview of quantum simulators in the QDK
uid: microsoft.quantum.overview.qdk-simulators
# Customer intent: As a quantum developer or researcher, I want to know about the simulation tools that the QDK provides and their use cases.
---

# Overview of quantum simulators in the QDK

The Microsoft Quantum Development Kit (QDK) includes quantum simulators that run quantum programs on your local machine. Use these local simulators to test and develop your programs before you submit them to Azure Quantum targets.

The QDK provides four primary simulators to run quantum programs:

- The sparse simulator
- The stabilizer simulator
- The GPU simulator
- The CPU simulator

## The sparse simulator

The sparse simulator represents qubit states as sparse vectors and uses sparse matrix algebra to quickly simulate programs that generate few nonzero amplitudes. It's the default simulator for Q# and OpenQASM programs in the QDK extension and for the `qsharp.run` and `openqasm.run` Python APIs. Use the sparse simulator when you want quick simulations of Q#, OpenQASM, or Qiskit programs, or when you want to display the quantum state of your program during simulation.

The sparse simulator is available in both the QDK extension for Visual Studio Code (VS Code) and the QDK Python package. This simulator is the only simulator available in the QDK extension, so the extension automatically uses it when you run Q# and OpenQASM programs in VS Code. In VS Code, use the Q# `DumpMachine` function or the debugger to display qubit state vectors at different points in the simulation.

Both the VS Code extension and the Python package support noise models for sparse simulations of Q# and OpenQASM programs. Only the Python package supports sparse simulation of Qiskit programs, but it doesn't support noise models for Qiskit simulations.

For more information about how to run simulations in the QDK extension, see [Run quantum simulations in the QDK extension for Visual Studio Code](xref:microsoft.quantum.machines.overview.sparse-simulator).

## The stabilizer simulator

The stabilizer simulator quickly and efficiently simulates Clifford-dominated programs with thousands of qubits. Clifford gates are common components of quantum error correction circuits. Clifford operations don't increase the number of stabilizer branches, so the simulator can apply them efficiently even in wide circuits. Common Clifford operations include:

- $X$, $Y$, and $Z$
- $S$ and $S^\dagger$
- $H$, or Hadamard
- $CX$, $CY$, and $CZ$
- $SWAP$

The stabilizer simulator also uses stabilizer branching to simulate circuits with a limited number of non-Clifford operations. The simulator supports the following non-Clifford operations:

- $T$ and $T^\dagger$
- Arbitrary-angle $R_X$, $R_Y$, $R_Z$, $R_{XX}$, $R_{YY}$, and $R_{ZZ}$ rotations

Each non-Clifford operation can increase the number of stabilizer branches. Adding non-Clifford operations can increase memory usage and shot time exponentially. Use the stabilizer simulator for wide circuits with mostly Clifford operations and a modest number of non-Clifford operations. Use a sparse or full-state simulator for circuits that have a lot of non-Clifford operations.

The stabilizer simulator supports adaptive execution, Pauli noise, and qubit loss. It's available in the QDK Python package for Q#, OpenQASM, Qiskit, and QIR programs, but isn't available in the QDK extension for VS Code.

In Python APIs with a simulator selector, use either `"stabilizer"` or `"clifford"` to select the stabilizer simulator.

## The GPU simulator

The GPU simulator is a full-state simulator that uses your machine's GPU to run many shots of your quantum program in parallel. The simulator supports all gate types but requires significant computing resources. The simulator can model up to 27 qubits. The power of your machine's GPU determines the performance, but performance is optimal for programs that have around 20 qubits and lots of shots.

The GPU simulator accepts QIR or Qiskit as input through certain QDK Python package APIs. The VS Code extension doesn't support the GPU simulator. There is also rich support for noise models on any type of quantum gate or operation.

## The CPU simulator

Like the GPU simulator, the CPU simulator is a full-state simulator that runs programs with any type of quantum gate. But it's slower because it can't run multiple shots in parallel. This simulator scales up to around 25 qubits, but slows down exponentially with more qubits because of memory issues. Use the CPU simulator when your machine doesn't have a GPU, or when your program has few qubits and doesn't require many shots.

The CPU simulator accepts QIR or Qiskit input. You can use it through certain QDK Python package APIs, but not through the VS Code extension. There's also rich support for noise models on any type of quantum gate or operation.

## What simulator should I use?

Consider these factors when you choose a simulator:

- Your development environment (VS Code or Python)
- The quantum programming framework that you use
- The complexity of your program and the number of shots
- The hardware capabilities of your local machine
- The Azure Quantum targets or other quantum hardware that you want to run your programs on
- The noise models that you want to build

The following table summarizes each QDK simulator's availability and supported quantum programming frameworks:

| Simulator  | Availability                         | Supported frameworks      |
|------------|--------------------------------------|---------------------------|
| Sparse     | VS Code extension and Python package | Q#, OpenQASM, Qiskit      |
| Stabilizer | Python package                       | Q#, OpenQASM, Qiskit, QIR |
| GPU        | Python package                       | Qiskit, QIR               |
| CPU        | Python package                       | Qiskit, QIR               |

### Simulations in the QDK extension for VS Code

The QDK extension for VS Code supports only the sparse simulator. To use the sparse simulator, run your Q# or OpenQASM file in VS Code. You can add Pauli noise models to sparse simulations of Q# programs in VS Code, but not to OpenQASM programs.

### Simulations in the QDK Python package

The QDK Python package supports multiple quantum programming frameworks and all four QDK simulators. Compatibility varies by framework and API.

The following table lists the simulators and programming frameworks that each Python API supports:

| Python API                      | Sparse        | Stabilizer    | GPU           | CPU           | Programming framework |
|---------------------------------|---------------|---------------|---------------|---------------|-----------------------|
| `qsharp.run`                    | Supported     | Supported     | Not supported | Not supported | Q#                    |
| `openqasm.run`                  | Supported     | Supported     | Not supported | Not supported | OpenQASM              |
| `qiskit.QSharpBackend`          | Supported     | Not supported | Not supported | Not supported | Qiskit                |
| `simulation.NeutralAtomDevice`  | Not supported | Supported     | Supported     | Supported     | QIR                   |
| `qiskit.NeutralAtomBackend`     | Not supported | Supported     | Supported     | Supported     | Qiskit                |
| `simulation.run_qir`            | Not supported | Supported     | Supported     | Supported     | QIR                   |

## Related content

- [Run quantum simulations with the QDK Python package](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators)
- [Run quantum simulations in the QDK extension for Visual Studio Code](xref:microsoft.quantum.machines.overview.sparse-simulator)
- [How to build noise models for quantum simulations in the QDK](xref:microsoft.quantum.how-to.qdk-simulator-noise-models)
- [Backend quantum simulators from quantum providers](xref:microsoft.quantum.machines.overview.backend-simulators)
