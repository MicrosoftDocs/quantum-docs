---
title: Use sparse isometry to efficiently generate simplified state preparation circuits for quantum chemistry calculations
description: Learn how sparse isometry in QDK/Chemistry uses sparse molecular wavefunctions to reduce the resources required for state preparation.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/02/2026
ms.topic: overview
ms.service: azure-quantum
ms.subservice: core
no-loc: ["Microsoft", "Microsoft Quantum Development Kit", "QDK", "QDK/Chemistry", "QPE"]
ai-usage: ai-assisted
uid: microsoft.quantum.overview.qdk-chem-sparse-isometry
# Customer intent: As a quantum chemistry researcher, I want to understand when sparse isometry can reduce the resources required to prepare a molecular wavefunction on a quantum computer.
---

# Build state preparation circuits for quantum chemistry calculations with sparse isometry

State preparation is a key subroutine in many quantum chemistry algorithms used to solve quantum chemistry problems, like quantum phase estimation (QPE).

A state preparation circuit puts a qubit register into a state that represents a target wavefunction for your molecule. Isometry techniques build this circuit from your calculated wavefunction.

A circuit that prepares an arbitrary dense state can require a number of quantum gates that grows exponentially with the number of qubits. Sparse isometry can reduce circuit depth and the number of gates compared with dense state preparation.

## Sparse isometry circuit generation with the QDK chemistry libraries

QDK for chemistry (QDK/Chemistry) in the Microsoft Quantum Development Kit (QDK) includes a novel sparse isometry method for wavefunctions. The method first prepares a compact state on a smaller qubit register, then applies additional gates to produce the target wavefunction. Compared with dense state preparation, this approach can prepare the same wavefunction with substantially fewer quantum gates and lower circuit depth.

The wavefunction that you use for state preparation approximates the molecular state that you want to study. Sparse isometry builds a circuit that prepares this wavefunction.

To get started with QDK/Chemistry, see [How to install QDK for chemistry](xref:microsoft.quantum.how-to.install-qdk-chemistry).

## Learn more

To learn more about state preparation circuits and sparse isometry in QDK/Chemistry, see [State preparation](https://microsoft.github.io/qdk-chemistry/user/comprehensive/algorithms/state_preparation.html) in the QDK/Chemistry documentation on GitHub.
