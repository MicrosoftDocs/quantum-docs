---
author: azure-quantum-content
description: This article gives on overview of self-consistent field theory, which is used to approximate the molecular orbitals in electronic structure theory.
ms.date: 01/12/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: Construct molecular orbitals with SCF calculations in QDK Chemistry
uid: microsoft.quantum.overview.qdk-chem-scf-active-space
#customer intent: As a quantum chemistry researcher, I want to understand what SCF is, why I perform SCF calculations, and how SCF is implemented in the QDK chemistry libraries
---

# Perform SCF calcualtions and active space selection to construct molecular orbitals

In quantum chemistry, electronic structure theory is a framework that describes the organization of electrons in molecular orbitals (MOs). Self-consistent field (SCF) methods are an electronic structure technique that you use to calculate the MOs of the electrons.

The most common SCF method in quantum chemistry is the Hartree-Fock (HF) method, which represents the electronic wavefunction of the molecule as a single determinant that satisfies the Pauli exclusion principle. Each term in the determinant is a product of MOs. Most other SCF methods are based on the HF method.

## How SCF methods work

SCF methods treat many-body interactions as a single mean field interaction rather than individual interactions between particles. In the context of quantum chemistry and electronic structure theory, SCF methods model the electron-electron interactions within a molecule. When a molecule has many electrons, it becomes computationally expensive to calculate the interactions between all the individual electrons. Instead, SCF methods calculate a mean field that's due to all the electrons, and each individual electron interacts with this mean field.

An SCF calculation is an iterative procedure to find MO coefficients that are consistent with the mean field that the MOs generate. You make an initial guess at the MO coefficients, and then the SCF method builds an electron density and calculates the energy of the molecule from the initial guess. Then, the SCF method uses the electron density to build a new set of MO coefficients, which are used to calculate a new electron density and energy.

The process repeats until the changes in the electron density and energy are smaller than the specified convergence criteria. This method to calculate the energy is called a variational method. For variational methods, the calculated energy is guaranteed to be greater than or equal to the true energy of the molecule, but never less than the true energy.

## Active space selection

For some molecular systems, a single-determinant wave function doesn't adequately model the electronic structure, even with large basis sets. In these cases, a multi-determinant wavefunction is used to model the molecular orbitals (MOs) that are most involved with chemical activity.

Active space selection is the process of choosing which MOs from the SCF calculation to include in the multi-determinant wavefunction. The best choice of MOs to model your system can be as much an art as it is a science, so good chemical intuition is useful for active space selection. Or, the QDK chemistry libraries can automatically choose the best active space for your problem within a specified set of parameters.

Your choice of active space orbitals is important because the active space affects the structure of your qubit Hamiltonian, and therefore the circuit that runs on the quantum computer.

## Get started with SCF calculations and active space selection in QDK the chemistry libraries

To learn more about SCF calculations in the QDK chemistry libraries, see [Self-consistent field (SCF) solver](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/algorithms/scf_solver.html).

To learn more about active space selection in the QDK chemistry libraries, see [Active space selection](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/algorithms/active_space.html).

For code examples of SCF calculations and active space selection in the QDK chemistry libraries, see [Run a self-consistent field (SCF) calculation](https://animated-adventure-mwrpnpe.pages.github.io/user/quickstart.html#run-a-self-consistent-field-scf-calculation) and [Select an active space](https://animated-adventure-mwrpnpe.pages.github.io/user/quickstart.html#select-an-active-space) in the QDK Chemistry quickstart guide.
