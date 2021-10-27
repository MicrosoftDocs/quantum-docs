---
author: SoniaLopezBravo
description: Learn about the Microsoft Quantum Chemistry Library and how it is used to simulate electronic structure problems on quantum computers.
ms.author: v-sonialopez
ms.date: 10/22/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Introduction to the Quantum Chemistry Library
uid: microsoft.quantum.libraries.overview-chemistry.concepts.overview
---

# Introduction to the Quantum Chemistry Library

The quantum chemistry library for the Quantum Development Kit is designed to work well with computational chemistry packages, most notably the [**NWChem**](http://www.nwchem-sw.org/) computational chemistry platform developed by the Environmental Molecular Sciences Laboratory (EMSL) at Pacific Northwest National Laboratory.

In particular, the [**Microsoft.Quantum.Chemistry** package](https://www.nuget.org/packages/Microsoft.Quantum.Chemistry) provides tools for loading instances of quantum chemistry simulation problems represented in the [Broombridge schema](xref:microsoft.quantum.libraries.overview.chemistry.schema.broombridge), also supported for export by recent versions of NWChem.

For more information about how to use the Quantum Development Kit with either NWChem and Broombridge, see [Installation of the Quantum Chemistry Library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.installation)

## Quantum chemistry concepts

The quantum chemistry concepts provide a concise introduction to simulating electronic structure problems on quantum computers in order to help you understand the role that many aspects of the Hamiltonian simulation library play within the space.  The quantum chemistry concepts start with a brief introduction to quantum mechanics and then proceed to discuss how electronic systems are modeled in it, and how such quantum dynamics can be emulated using a quantum computer.

- [Quantum Dynamics](xref:microsoft.quantum.libraries.overview-chemistry.concepts.quantumdynamics), a brief introduction to quantum mechanics and how an initial quantum state evolves over time. 
- [Quantum Models for Electronic Systems](xref:microsoft.quantum.libraries.overview-chemistry.concepts.quantummodels).
- [Second Quantization](xref:microsoft.quantum.libraries.overview-chemistry.concepts.secondquantization).
- [Symmetries of Molecular Integrals](xref:microsoft.quantum.libraries.overview-chemistry.concepts.symmetries).
- [Jordan-Wigner Representation](xref:microsoft.quantum.libraries.overview-chemistry.concepts.jordanwigner).
- [Simulating Hamiltonian Dynamics](xref:microsoft.quantum.libraries.overview-chemistry.concepts.simulationalgorithms), where you can find two methods to compile the quantum dynamics to sequences of elementary gates: Trotter-Suzuki decompositions and qubitization.
- [Hartree–Fock Theory](xref:microsoft.quantum.libraries.overview-chemistry.concepts.hartreefock). One of the most important quantities in quantum chemistry simulation is the ground state, which is the minimum energy eigenvector of the Hamiltonian matrix. The Hartree–Fock theory gives a simple way to construct the ground state for quantum systems.
- [Correlated wavefunctions](xref:microsoft.quantum.libraries.overview-chemistry.concepts.multireference). Although [Hartree–Fock](xref:microsoft.quantum.libraries.overview-chemistry.concepts.hartreefock) theory provides a qualitative description of molecular properties through a single-determinant reference state, in order to achieve quantitative accuracy, one must consider correlation effects.

## Quantum chemistry examples

The quantum chemistry examples combine the chemistry simulation algorithms outlined in [Simulating Hamiltonian dynamics](xref:microsoft.quantum.libraries.overview.standard.algorithms) with [quantum phase estimation](xref:microsoft.quantum.libraries.overview.characterization) in the canon library. 
This combination allows to estimates of energy levels in the represented molecule, which is one of the key applications of quantum chemistry on a quantum computer. 

Instead of specifying terms of the Hamiltonian one-by-one, you can work through some examples that allow you to perform quantum chemistry experiments at scale. 

- [Estimating the values of energy levels](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.energyestimate) for the canonical example of molecular hydrogen.
- [Loading a Hamiltonian from file](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.loadhamiltonian). Since quantum chemistry at scale require Hamiltonians with millions or billions of terms, this Hamiltonians are too large to import by hand. 
- [Obtaining resource counts](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.resourcecounts) of a quantum chemistry simulation, such as the number of T-gates or CNOT gates.
- [End-to-end with NWChem](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.endtoend).

## Broombridge Quantum Chemistry Schema

The examples load a chemistry Hamiltonian encoded in the [Broombridge schema](xref:microsoft.quantum.libraries.overview.chemistry.schema.broombridge), which is a [YAML](https://en.wikipedia.org/wiki/YAML)-based schema.

The [Broombridge Quantum Chemistry Schema](xref:microsoft.quantum.libraries.overview.chemistry.schema.spec_v_0_2)) is an Open Source schema. Being YAML-based, Broombridge is a structured, human-readable and human-editable way of representing electronic structure problems. In particular, the following data can be represented:

- Fermionic Hamiltonians can be represented using one- and two-electron integrals.
- Ground and excited states can be presented using creation sequences.
- Upper and lower bounds of energy levels can be specified.

## Next Steps

- [Installation of the Quantum Chemistry Library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.installation)
- [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs)
- [Testing and debugging quantum programs](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
