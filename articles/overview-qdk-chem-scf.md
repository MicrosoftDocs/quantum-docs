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
uid: microsoft.quantum.overview.qdk-chem-scf
#customer intent: As a quantum chemistry researcher, I want to understand what SCF is, why I perform SCF calculations, and how SCF is implemented in QDK Chemistry
---

# Perform SCF calcualtions to construct molecular orbitals

In quantum chemistry, electronic structure theory is a framework that describes the organization of electrons in molecular orbitals (MOs). Self-consistent field (SCF) methods are an electronic structure technique that you use to calculate the MOs of the electrons.

The most common SCF method in quantum chemistry is the Hartree-Fock method, which represents the electronic wavefunction of the molecule as a single determinant that satisfies the Pauli exclusion principle. Each term in the determinant is a product of MOs. Most other SCF methods are based on the HF method.

## How SCF methods work

SCF methods treat many-body interactions as a single mean field interaction rather than individual interactions between particles. In the context of quantum chemistry and electronic structure theory, SCF methods model the electron-electron interactions within a molecule. When a molecule has many electrons, it becomes computationally expensive to calculate the interactions between all the individual electrons. Instead, SCF methods calculate a mean field that's due to all the electrons, and each individual electron interacts with this mean field.

[INSERT GRAPHIC WITH ONE PANEL OF A BUNCH OF PARTICLES INTERACTING WITH EACH OTHER, AND ANOTHER PANEL OF THE PARTICLES INTERACTING WITH A MEAN FIELD INSTEAD. SOMEHOW INDICATE COMPUTATIONAL DIFFICULTY IN EACH PANEL]

An SCF calculation is an iterative procedure to find MO coefficients that are consistent with the mean field that the MOs generate. You make an initial guess at the MO coefficients, and then the SCF method builds an electron density and calculates the energy of the molecule from the initial guess. Then, the SCF method uses the electron density to build a new set of MO coefficients, which are used to calculate a new electron density and energy.

The process repeats until the changes in the electron density and energy are smaller than the specified convergence criteria. This method to calculate the energy is called a variational method. For variational methods, the calculated energy is guaranteed to be greater than or equal to the true energy of the molecule, but never less than the true energy.

## . with QDK Chemistry



## Get started with SCF calculations in QDK Chemistry

To learn more about generate state preparation circuits how to use the sparse isometry tools in QDK Chemistry, see the following links:

- [Link A](xref:microsoft.quantum.)
- [Link B](xref:microsoft.quantum.)
