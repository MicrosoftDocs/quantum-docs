---
author: haileytap
description: This article explains how to create your first Q# program using the Quantum Development Kit and Visual Studio Code.
ms.author: t-htapia
ms.date: 06/17/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: []
title: 'Quickstart: Create a Q# Program'
uid: microsoft.quantum.qsharp-quickstart
# Customer intent: As a new quantum programmer, I want to quickly create my first Q# program so that I can begin developing and running quantum algorithms.
---

# Quickstart: Create your first Q# program

Learn how to write a basic Q# program that demonstrates entanglement, a key concept of quantum computing, by creating a Bell pair.

Two or more [qubits](xref:microsoft.quantum.concepts.qubit) can be entangled such that whatever happens to one qubit also happens to the other. This means if you measure one qubit in the |0⟩ state, the other qubit is also in the |0⟩ state, and vice versa. For more information, see [Sonia's upcoming entanglement article](xref:).

In this quickstart, you:

> [!div class="checklist"]
> - Create a Q# file.
> - Allocate a pair of qubits.
> - Entangle the qubits.

## Prerequisites

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download).
- The [Azure Quantum Development Kit (QDK) extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

## Create a Q# file

1. Open Visual Studio Code.
1. Select **File** > **New Text File**.
1. Save the file as `Entanglement.qs`. The .qs extension denotes a Q# program.

## Write your Q# code

In your `Entanglement.qs` file, follow these steps to entangle and measure a pair of qubits.

> [!TIP]
> If you want to learn more about a Q# function or operation, hover over it.

### Define a namespace

Every Q# program starts with a user-defined namespace. For this quickstart, your namespace is `BellStates`.

```qsharp
namespace BellStates {
    // Your code goes here.
}
```

### Open a Q# library

The Q# standard library includes predefined functions and operations for your quantum programs. To use them, you must first open the relevant library.

In your `BellStates` namespace, use an `open` statement to import the `Microsoft.Quantum.Diagnostics` library. This gives you access to all of its functions and operations, including `DumpMachine()`, which you'll later call to observe the entangled state of two qubits.

```qsharp
    open Microsoft.Quantum.Diagnostics;
```

### Define an operation

After opening the `Microsoft.Quantum.Diagnostics` library, define an operation named `EntangleQubits`. This is where you'll write the Q# code to allocate, manipulate, and measure two qubits.

Because you want to entangle two qubits and observe their correlated measurements, `EntangleQubits` takes no parameters and returns two `Result` values:

```qsharp
    operation EntangleQubits() : (Result, Result) {
        // Your entanglement code goes here.
}
```

### Allocate two qubits

Right now, your Q# program doesn't have any qubits, so the next step is to allocate them with the `use` keyword.

In your `EntangleQubits` operation, bind two qubits to the variables `q1` and `q2`:

```qsharp
        // Allocate two qubits.
        use (q1, q2) = (Qubit(), Qubit());
```

> [!NOTE]
> In Q#, qubits are always allocated in the $\ket{0}$ state.

### Put the first qubit in superposition

To prepare the qubits for entanglement, you must put one of them into an even superposition. This gives the qubit a 50% chance of being measured as either $\ket{0}$ or $\ket{1}$. In Q#, you achieve superposition with the Hadamard operation, `H`.

Apply `H` to the first qubit, `q1`:

```qsharp
    // Put q1 into an even superposition.
    H(q1);
```

### Entangle the qubits

You're now ready to entangle the qubits. Do this by applying the controlled-NOT operation, `CNOT`, to both qubits, with `q1` as the control qubit and `q2` as the target qubit. The state of `q2` now depends on the state of `q1`.

```qsharp
        // Entangle the qubits.
        CNOT(q1, q2);
```

### Display the quantum state

Use the `DumpMachine` operation, which is enabled with the `Microsoft.Quantum.Diagnostic` namespace, to output the current state of the quantum machine. This is useful for debugging and understanding the state of qubits at any point in your Q# programs.

```qsharp
        DumpMachine();
```

### Measure the qubits

Use the `M` operation to measure both qubits in the Pauli-Z basis. To store the results, use the `let` keyword to declare two variables, `m1` and `m2`. Due to entanglement, these results are correlated: if `q1` is measured as zero, `q2` is also zero, and vice versa.

```qsharp
        let (m1, m2) = (M(q1), M(q2));
```

### Reset the qubits

In Q#, you must reset qubits to the $\ket{0}$ state. This prepares `q1` and `q2` for future operations and ensures that no residual state remains.

```qsharp
        Reset(q1);
        Reset(q2);
```

### Return the measurement results

Finally, return the measurement results of `q1` and `q2` as a tuple, which allows you to observe their entangled states.

```qsharp
        return (m1, m2);
```

## Run your Q# code

You've now written a Q# program that entangles two qubits and creates a Bell pair. Before running it, use the `@EntryPoint()` attribute to tell the Q# compiler where to start executing the program. In this case, place `@EntryPoint()` before the `EntangleQubits` operation.

Your final Q# program should look like this:

```qsharp
namespace Bell {
    open Microsoft.Quantum.Diagnostics;
        
    @EntryPoint()
    operation EntangleQubits() : (Result, Result) {  
        use (q1, q2) = (Qubit(), Qubit());
        H(q1);
        CNOT(q1, q2);

        DumpMachine();

        let (m1, m2) = (M(q1), M(q2));
        Reset(q1);
        Reset(q2);
        return (m1, m2);
    }
}
```

Under `@EntryPoint()`, select **Run** to see the result of both qubits. You can run the program several times, each with a different result in the debug console. This demonstrates the probabilistic nature of quantum measurements and the entanglement of the qubits.

// insert screenshot of running the program: 

## Next step

To write a more complex Q# program involving quantum entanglement, see [Tutorial: Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement).
