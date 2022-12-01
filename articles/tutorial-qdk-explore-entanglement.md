---
author: SoniaLopezBravo
description: In this tutorial, write a quantum program in Q# that demonstrates the superposition and entanglement of qubits.
ms.author: sonialopez
ms.date: 05/24/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v']
title: 'Tutorial: Explore quantum entanglement with Q#'
uid: microsoft.quantum.tutorial-qdk.entanglement
zone_pivot_groups: ide-platforms
---

# Tutorial: Explore quantum entanglement with Q\#

This tutorial shows you how to write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement. 

* Where classical bits hold a single binary value such as a 0 or 1, the state of a [qubit](xref:microsoft.quantum.glossary-qdk#qubit) can be in a [superposition](xref:microsoft.quantum.glossary-qdk#superposition) of two quantum states, 0 and 1. Each possible quantum state has an associated probability amplitude.
* The act of [measuring](xref:microsoft.quantum.glossary-qdk#measurement) a qubit produces a binary result, either 0 or 1, with a certain probability, and changes the state of the qubit out of superposition. 
* Multiple qubits can be [entangled](xref:microsoft.quantum.glossary-qdk#entanglement) such that they cannot be described independently from each other. That is, whatever happens to one qubit in an entangled pair also happens to the other qubit.

In this tutorial, you will prepare two qubits in a specific quantum state, learn how to operate on qubits with Q# to change their state, and demonstrate the effects
of superposition and entanglement. You will build your Q# program piece-by-piece to introduce qubit states, operations, and measurements.

::: zone pivot="ide-azure-portal"

[!INCLUDE [portal-procedure](includes/tutorial-entanglement-portal-include.md)]

::: zone-end

::: zone pivot="ide-local"

[!INCLUDE [local-procedure](includes/tutorial-entanglement-local-include.md)]

::: zone-end

## Next steps

Continue to explore other quantum algorithms and techniques:

* The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
* The tutorial [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
* The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are Jupyter Notebook-based, self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
