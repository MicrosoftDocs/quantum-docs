---
author: azure-quantum-content
description: This article gives an overview of sparse isometry, which is a technique created by Microsoft Quantum to efficiently generate simplified state preparation circuits for quantum chemistry calculations on a real quantum computer.
ms.date: 01/23/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API]
title: Use sparse isometry to efficiently generate simplified state preparation circuits for quantum chemistry calculations
uid: microsoft.quantum.overview.qdk-chem-sparse-isometry
#customer intent: As a quantum chemistry researcher, I want to understand what sparse isometry is and why I should use it to build state preparation quantum circuits for my quantum chemistry calculations
---

# Build state preparation circuits for quantum chemistry calculations with sparse isometry

State preparation is a central subroutine in many quantum algorithms for quantum chemistry calculations, such as Quantum Phase Estimation (QPE).

The state preparation circuit puts the qubit system on the quantum computer into a state that represents the real quantum state of your molecule. Isometry techniques are used to create the state preparation circuit from the wavefunction that you calculate for your molecule. Typical isometry approaches usually result in deep circuits that contain a lot of quantum gates. Each gate in a circuit has the potential to introduce noise into the calculation on the quantum computer, so the ideal circuit is one that performs an accurate computation with the fewest gates.

## Sparse isometry circuit generation with the QDK chemistry libraries

QDK for chemistry (QDK/Chemistry) in the Microsoft Quantum Development Kit (QDK) includes a novel sparse isometry technique that uses a small number of dense qubits to efficiently build an optimal state preparation circuit with less depth and fewer gates than traditional isometry encoding techniques. The circuit from sparse isometry prepares the same initial state as the larger circuit from regular isometry, but the sparse isometry circuit is less computationally expensive and introduces less noise into the calculation on the quantum computer.

The sparse isometry implementation in QDK/Chemistry allows you to encode ab initio wavefunctions in a consistent linear workflow to help you build optimal state preparation circuits for a wide variety of molecules and systems. To get started, see [How to install QDK for chemistry](xref:microsoft.quantum.how-to.install-qdk-chemistry).

## Learn more

To learn more about state preparation circuits and sparse isometry in QDK/Chemistry, see [State preparation](https://microsoft.github.io/qdk-chemistry/user/comprehensive/algorithms/state_preparation.html) in the QDK/Chemistry documentation on GitHub.
