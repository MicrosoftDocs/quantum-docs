---
author: SoniaLopezBravo
description: Learn how to run your Q# programs on the Azure Quantum Development Kit sparse simulator.
ms.author: sonialopez
ms.date: 01/13/2025
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
|**In a Python notebook cell**  | `result=qsharp.eval("Program_Entry_Operation()")`<br>or<br>`result=qsharp.run("Program_Entry_Operation()", shots=##)` |
|**In a `%%qsharp` notebook cell**  | `Program_Entry_Operation()` |


## Adding Pauli noise to the sparse simulator

The sparse simulator supports the addition of Pauli noise to the simulation. This feature allows users to simulate the effects of noise on quantum operations and measurements. The noise model is specified using a dictionary of Pauli noise probabilities, where the keys are the Pauli operators `X`, `Y`, and `Z`, and the values are the probabilities of applying the corresponding Pauli operator. The noise model can be applied to each qubit independently and can be called from Q# programs, Python programs, or configured in the VS Code settings. 

### Adding Pauli noise to Q# programs

Using ConfigurePauliNoise, BitFlipNoise, PhaseFlipNoise, and DepolarizingNoise operations, users can add Pauli noise to their Q# programs. Also NoNoise and ApplyIdleNoise opes. 

### Adding Pauli noise to Python programs or Jupyter Notebooks

All parameters for the qsharp.run() method.

### Adding Pauli noise using the VS Code settings

Only combinations of X, Y, and Z are allowed. Apply to all qubits?
