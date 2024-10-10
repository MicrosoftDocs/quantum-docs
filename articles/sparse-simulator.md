---
author: SoniaLopezBravo
description: Learn how to run your Q# programs on the Azure Quantum Development Kit sparse simulator.
ms.author: sonialopez
ms.date: 10/10/2024
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: concept-article
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Sparse quantum simulator 
uid: microsoft.quantum.machines.overview.sparse-simulator
---

# Sparse quantum simulator

The sparse simulator is the default local simulator for Azure Quantum development environments, and utilizes a sparse representation of quantum state vectors. This feature allows the sparse simulator to minimize the memory footprint used to represent quantum states, thus enabling simulations over a larger number of qubits. The sparse simulator is efficient for representing quantum states that are sparse in the computational basis, that is, quantum states for which most of the amplitude coefficients are zero in the computational basis. As such, the sparse simulator enables users to explore larger applications than what can be represented using a full-state simulator which will waste both memory and time on an exponentially large number of zero-amplitudes.

For more information about the sparse simulator, please see [Jaques and Häner (arXiv:2105.01533)](https://arxiv.org/abs/2105.01533).

## Calling the sparse simulator

The sparse simulator is the default local simulator in Visual Studio Code with the Azure Quantum Development Kit extension installed, and in the Azure Quantum portal. 

| Scenario | Method |
|----------|--------|
|**In a Q# program in VS Code**  | Select **Run Q# file** |
|**In a Python notebook cell**  | `result=qsharp.eval("EntryPointOperation()")`<br>or<br>`result=qsharp.run("EntryPointOperation()", shots=##)` |
|**In a `%%qsharp` notebook cell**  | `EntryPointOperation()` |



