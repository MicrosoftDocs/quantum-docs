---
author: azure-quantum-content
description: In this tutorial, write a quantum program in Q# that demonstrates the superposition and entanglement of qubits.
ms.author: quantumdocwriters
ms.date: 12/18/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ["Q#", "$$v"]
title: 'Tutorial: Quantum Entanglement with Q#'
uid: microsoft.quantum.tutorial-qdk.entanglement
zone_pivot_groups: ide-platforms-copilot-vscode
#customer intent: As a quantum programmer, 
---

# Tutorial: Explore quantum entanglement with Q\#

In this tutorial, you write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement. You prepare two qubits in a specific quantum state, learn how to write Q# code to operate on qubits to change their state, and demonstrate the effects of superposition and entanglement. You build your Q# program piece-by-piece to introduce qubit states, operations, and measurements.

Here are some key concepts to understand before you begin:

- Classical bits hold a single binary value such as a 0 or 1, but qubits can be in a superposition of the two states, 0 and 1. Each possible qubit state is described by a set of probability amplitudes.
- When you measure a qubit's state, you always get either 0 or 1. The probability of each result is determined by the probability amplitudes that define the superposition state before you measure.
- Multiple qubits can be entangled such that you can't describe them independently from each other. When you measure one qubit in an entangled pair, you also get information about the other qubit without measuring it.

In this tutorial, you'll learn how to:

> [!div class="checklist"]
>
> - Create Q# operations to initialize a qubit to a desired state.
> - Put a qubit in superposition.
> - Entangle a pair of qubits.
> - Measure a qubit and observe the results.

[!INCLUDE [Copilot in Azure Quantum banner](includes/copilot-banner.md)]

::: zone pivot="ide-azure-copilot"

[!INCLUDE [copilot-procedure](includes/tutorial-entanglement-copilot-include.md)]

::: zone-end

::: zone pivot="ide-local"

[!INCLUDE [local-procedure](includes/tutorial-entanglement-local-include.md)]

::: zone-end

## Related content

Explore other Q# tutorials:

- [Grover's search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm.
- [Quantum Fourier Transform](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
- The [Quantum Katas](https://quantum.microsoft.com/tools/quantum-katas) are self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
