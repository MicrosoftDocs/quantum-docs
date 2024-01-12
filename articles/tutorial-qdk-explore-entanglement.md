---
author: SoniaLopezBravo
description: In this tutorial, write a quantum program in Q# that demonstrates the superposition and entanglement of qubits.
ms.author: sonialopez
ms.date: 12/21/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v']
title: 'Tutorial: Quantum Entanglement with Q#'
uid: microsoft.quantum.tutorial-qdk.entanglement
zone_pivot_groups: ide-platforms-copilot-vscode
---

# Tutorial: Explore quantum entanglement with Q\#

This tutorial shows you how to write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement. You prepare two qubits in a specific quantum state, learn how to operate on qubits with Q# to change their state, and demonstrate the effects
of superposition and entanglement. You build your Q# program piece-by-piece to introduce qubit states, operations, and measurements.

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

Here are some key concepts to understand before you begin:

* Where classical bits hold a single binary value such as a 0 or 1, the state of a qubit can be in a superposition of two quantum states, 0 and 1. Each possible quantum state has an associated probability amplitude.
* The act of measuring a qubit produces a binary result with a certain probability, and changes the state of the qubit out of superposition. 
* Multiple qubits can be entangled such that they can't be described independently from each other. That is, whatever happens to one qubit in an entangled pair also happens to the other qubit.

In this tutorial, you'll learn how to:

> [!div class="checklist"]
> * Create Q# operations to initialize a qubit to a desired state.
> * Put a qubit in superposition.
> * Entangle a pair of qubits.
> * Measure a qubit and observe the results.


[!INCLUDE [Copilot in Azure Quantum banner](includes/copilot-banner.md)]


::: zone pivot="ide-azure-copilot"

[!INCLUDE [copilot-procedure](includes/tutorial-entanglement-copilot-include.md)]

::: zone-end

::: zone pivot="ide-local"

[!INCLUDE [local-procedure](includes/tutorial-entanglement-local-include.md)]

::: zone-end

## Next steps

Explore other Q# tutorials:

* [Quantum random number generator](xref:microsoft.quantum.tutorial-qdk.random-number) shows how to write a Q# program that generates random numbers out of qubits in superposition.
* [Grover's search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm.
* [Quantum Fourier Transform](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
* The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
