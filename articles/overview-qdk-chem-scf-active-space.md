---
title: Construct molecular orbitals with SCF calculations in QDK Chemistry
description: Learn how self-consistent field calculations and active space selection provide molecular orbitals for quantum chemistry workflows in QDK/Chemistry.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/02/2026
ms.topic: overview
ms.service: azure-quantum
ms.subservice: core
no-loc: ["Microsoft", "Microsoft Quantum Development Kit", "QDK", "QDK/Chemistry", "MOs", "SCF", "Hartree-Fock", "HF", "Kohn-Sham", "DFT", "X2C"]
ai-usage: ai-assisted
uid: microsoft.quantum.overview.qdk-chem-scf-active-space
# Customer intent: As a quantum chemistry researcher, I want to understand how SCF calculations and active space selection support my quantum chemistry workflow.
---

# Perform SCF calculations and active space selection to construct molecular orbitals

In quantum chemistry, electronic structure theory is a framework that describes the organization of electrons in molecular orbitals (MOs). Self-consistent field (SCF) methods are an electronic structure technique that you use to calculate the MOs of the electrons.

Hartree-Fock (HF) is an SCF method that represents a molecule's electronic wavefunction as a single determinant that satisfies the Pauli exclusion principle. Each term in the determinant is a product of spin orbitals. SCF methods also include Kohn-Sham density functional theory (DFT), which uses an exchange-correlation functional to account for exchange and correlation effects.

## How SCF methods work

It's difficult to describe the exact electronic structure of a molecule because electrons interact with each other. For molecules with many electrons, an accurate treatment of these interactions becomes computationally expensive. Methods such as Hartree-Fock use a mean-field approximation for many-electron interactions. The SCF procedure finds this field self-consistently, so each electron interacts with the mean field of the other electrons.

An SCF calculation is an iterative procedure to find MO coefficients that are consistent with the mean field that the MOs generate. Start with an initial guess at the MO coefficients. The SCF method then builds an electron density and calculates the energy of the molecule from that guess. Then, the SCF method uses the electron density to build a new set of MO coefficients and uses these coefficients to calculate a new electron density and energy.

The process repeats until the molecular orbitals and the mean field are self-consistent within your specified tolerance. The native QDK/Chemistry SCF solver checks the orbital gradient, which measures how the energy responds to small changes in the molecular orbitals. A small enough gradient means that further small orbital changes have little effect on the energy.

For Hartree-Fock calculations, the variational principle guarantees that the calculated energy is greater than or equal to the exact electronic ground-state energy for the same Hamiltonian. This upper bound guarantee doesn't generally apply to approximate DFT calculations.

### Include scalar-relativistic effects

Relativistic effects can change electron energies and orbital shapes, especially in molecules with heavy elements. QDK/Chemistry includes spin-free one-electron exact-two-component (X2C) methods to account for scalar-relativistic effects in SCF calculations.

## Active space selection

For some molecular systems, a single-determinant wavefunction doesn't adequately model the electronic structure and correlation, even in the basis set limit. In these cases, a multi-determinant wavefunction describes the electronic state within a selected set of molecular orbitals (MOs).

Active space selection identifies which MOs to include in the multi-determinant wavefunction. QDK for chemistry (QDK/Chemistry), part of the Microsoft Quantum Development Kit (QDK), has methods that select orbitals based on criteria like their occupations or entanglement. You can also specify the number of active electrons and orbitals to select a valence active space.

## Get started with SCF calculations and active space selection

To learn more about SCF calculations and active space selection in QDK/Chemistry, see [Self-consistent field (SCF) solver](https://microsoft.github.io/qdk-chemistry/user/comprehensive/algorithms/scf_solver.html) and [Active space selection](https://microsoft.github.io/qdk-chemistry/user/comprehensive/algorithms/active_space.html).

For code examples, see [Run a self-consistent field (SCF) calculation](https://microsoft.github.io/qdk-chemistry/user/quickstart.html#run-a-self-consistent-field-scf-calculation) and [Select an active space](https://microsoft.github.io/qdk-chemistry/user/quickstart.html#select-an-active-space) in the QDK/Chemistry quickstart guide.
