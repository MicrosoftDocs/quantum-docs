---
author: azure-quantum-content
description: This article gives an overview of sparse isometry, which is a technique created by Microsoft Quantum to efficiently generate simplified state preparation circuits for quantum chemistry calculations on a real quantum computer.
ms.date: 01/12/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: Use sparse isometry to quickly generate simplified state preparation circuits for quantum chemistry calculations
uid: microsoft.quantum.overview.qdk-chem-sparse-isometry
#customer intent: As a quantum chemistry researcher, I want to understand what sparse isometry is and why I should use it to build state preparation quantum circuits for my quantum chemistry calculations
---

# Build state preparation circuits for quantum chemistry calculations with sparse isometry

The circuit for a full quantum chemistry calculation on a quantum computer consists of two parts. The first part is the state preparation circuit, and the second part is the quantum phase estimation (QPE) circuit.

[INSERT IMAGE THAT HIGHLIGHTS STATE PREP VS TIME EVOLUTION PARTS OF CIRCUIT]

The state preparation circuit puts the qubit system on the quantum computer into a state that closely represents the real quantum state of your molecule. Isometry techniques are used to create the state preparation circuit from the wavefunction that you calculate for your molecule. Typical isometry approaches usually result in deep circuits that contain a lot of quantum gates. Each gate in a circuit has the potential to introduce noise into the calculation on the quantum computer, so the ideal circuit is one that performs an accurate computation with the fewest gates.

## Sparse isometry circuit generation with QDK Chemistry

QDK Chemistry from the Microsoft Quantum Development Kit (QDK) includes a novel sparse isometry technique that uses a small number of dense qubits to quickly build a state preparation circuit with less depth and fewer gates than regular isometry techniques. The circuit from sparse isometry prepares the same initial state as the larger circuit from regular isometry, but the sparse isometry circuit is less computationally expensive and introduces less noise into the calculation.

[INSERT IMAGE THAT COMPARES THE CIRCUIT DIAGRAM FOR REGULAR VS SPARSE ISOMETRY ON THE SAME SYSTEM]

The sparse isometry implementation in QDK Chemistry includes a robust set of customizable parameters to help you build optimal state preparation circuits for a wide variety of molecules and systems. To get started, [install the QDK and QDK Chemistry libraries](LINK TO THESE DOCS).

## Related content

To learn more about generate state preparation circuits how to use the sparse isometry tools in QDK Chemistry, see the following links:

- [Link A](xref:microsoft.quantum.)
- [Link B](xref:microsoft.quantum.)
