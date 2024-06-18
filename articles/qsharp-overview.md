---
author: haileytap
description: This article introduces Q#, a programming language for developing and running quantum algorithms, and the structure of a Q# program.
ms.author: t-htapia
ms.date: 06/17/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: []
title: Introduction to the Quantum Programming Language Q#
uid: microsoft.quantum.qsharp-overview
# Customer intent: As a new quantum programmer, I want to learn what Q# is and how a Q# program is structured so that I can begin writing my own quantum programs.
---

# What is Q#?

Q# is a high-level, open-source programming language for developing and running quantum algorithms. As part of the Quantum Development Kit (QDK), Q# is designed to work with any quantum hardware, scale to all quantum applications, and optimize execution. For more information about the QDK, see ...

When writing algorithms, a quantum programming language should meet the following requirements for the language, compiler, and runtime:

- **Abstract qubits:** Quantum algorithms use qubits that are not tied to specific hardware or layout. The compiler and runtime handle the mapping from program qubits to physical qubits.
- **Quantum and classical computation:** The ability to perform classical and quantum computations is essential in a universal quantum computer.
- **Respect laws of physics:** Quantum algorithms follow the rules of quantum physics. For example, they cannot copy or access qubit state directly.

## Structure of a Q# program

Consider the following Q# program:

```qsharp
namespace Superposition {
    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit. By default, it's in the zero state.  
        use q = Qubit();  
        // We apply the Hadamard operation, H, to the state.
        // It now has a 50% chance of being measured 0 or 1.
        H(q);      
        // We now measure the qubit in Z-basis.
        let result = M(q);
        // Reset the qubit before releasing it.
        Reset(q);
        // Finally, we return the result of the measurement.
        return result;
    }
}
```

By just reading the comments (//), you can tell that this program allocates a qubit, applies an operation to put it in superposition, measures the state of the qubit, then resets it and returns the result.

To run this program in Visual Studio Code, see Get started with Q# programs and VS Code.

## Next steps

- Different ways to work with Q#
- Quickstart: Create your first Q# program