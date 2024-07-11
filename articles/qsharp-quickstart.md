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

Each Q# program starts with a user-defined namespace, which helps you organize related functionality. For this quickstart, your namespace is `BellPair`:

```qsharp
namespace BellPair {
    // Your code goes here.
}
```

### Open a quantum library

The Q# standard library includes predefined functions and operations for your quantum programs. To use them, you must first open the relevant library.

In your `BellPair` namespace, use an `open` statement to import the `Microsoft.Quantum.Diagnostics` library. This gives you access to all its functions and operations, including `DumpMachine()`, which you'll later use to display the entangled state of two qubits.

```qsharp
    open Microsoft.Quantum.Diagnostics;
```

### Define an operation

After opening the `Microsoft.Quantum.Diagnostics` library, define an operation named `EntangleQubits`. This is where you'll write the remaining Q# code to allocate, manipulate, and measure two qubits.

Because you want to entangle two qubits and observe their correlated measurements, `EntangleQubits` takes no parameters and returns two `Result` values, which represent the measurements:

```qsharp
    operation EntangleQubits() : (Result, Result) {
        // Your entanglement code goes here.
}
```

### Allocate two qubits

Right now, your `EntangleQubits` operation has no qubits, so the next step is to allocate two of them. In Q#, you do this with the `use` keyword:

```qsharp
        // Allocate two qubits, q1 and q2.
        use (q1, q2) = (Qubit(), Qubit());
```

> [!NOTE]
> Qubits are always allocated in the $\ket{0}$ state.

### Put the first qubit into superposition

To prepare the qubits for entanglement, you must put one of them into an even superposition, where it has a 50% chance of being measured as $\ket{0}$ or $\ket{1}$. This creates the uncertainty needed for the entangled state.

In Q#, you put a qubit into superposition using the `H` operation:

```qsharp
        // Put q1 into an even superposition.
        H(q1);
```

### Entangle the qubits

You're now ready to entangle the qubits. Do this by applying the `CNOT` operation to both qubits, with `q1` as the control qubit and `q2` as the target qubit. This makes the state of `q2` depend on the state of `q1`.

```qsharp
        // Entangle q1 and q2, making q2 depend on q1.
        CNOT(q1, q2);
```

### Display the entangled state

Before measuring the qubits, it's important to verify that they're entangled. You can use the `DumpMachine` operation, which is part of the `Microsoft.Quantum.Diagnostics` library, to output the current state of your Q# program:

```qsharp
        // Show the entangled state of the qubits.
        DumpMachine();
```

### Measure the qubits

Now that you've verified the qubits are entangled, you can use the `M` operation to measure them. Measuring `q1` and `q2` collapses their quantum states into classical results that you store in the variables `m1` and `m2`, respectively:

```qsharp
        // Measure q1 and q2 and store the results in m1 and m2.
        let (m1, m2) = (M(q1), M(q2));
```

### Reset the qubits

Before being released at the end of each Q# program, qubits must be in the $\ket{0}$ state. You do this using the `Reset` operation:

```qsharp
        // Reset q1 and q2 to the 0 state.
        Reset(q1);
        Reset(q2);
```

### Return the measurement results

Finally, to complete the `EntangleQubits` operation and observe the entangled state, return the measurement results `m1` and `m2`:

```qsharp
        // Return the classical results.
        return (m1, m2);
```

## Run your Q# code

You've now written a Q# program that entangles two qubits and creates a Bell pair. Before running it, use the `@EntryPoint()` attribute to tell the Q# compiler where to start executing the program. In this case, place `@EntryPoint()` before the `EntangleQubits` operation.

Your final Q# program should look like this:

```qsharp
namespace BellPair {
    open Microsoft.Quantum.Diagnostics;
        
    @EntryPoint()
    operation EntangleQubits() : (Result, Result) {  
        // Allocate two qubits, q1 and q2.
        use (q1, q2) = (Qubit(), Qubit());

        // Put q1 into an even superposition.
        // It now has a 50% chance of being measured as 0 or 1.
        H(q1);

        // Entangle q1 and q2, making q2 depend on q1.
        CNOT(q1, q2);

        // Show the entangled state of the qubits.
        DumpMachine();

        // Measure q1 and q2 and store the classical results in m1 and m2.
        let (m1, m2) = (M(q1), M(q2));

        // Reset q1 and q2 to the 0 state.
        Reset(q1);
        Reset(q2);

        // Return the classical results.
        return (m1, m2);
    }
}
```

Under `@EntryPoint()`, select **Run** to view the result of both qubits. You can run the program several times, each with a different result in the debug console. This demonstrates the probabilistic nature of quantum measurements and the entanglement of the qubits.

![Screenshot of the Q# file in Visual Studio Code showing where to find the "Run" command.](image.png)

## Next step

To write a more complex entanglement program, see [Tutorial: Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement).
