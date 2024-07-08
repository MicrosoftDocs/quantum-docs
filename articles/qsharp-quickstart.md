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

In this quickstart, you write a basic Q# program that demonstrates entanglement, a fundamental concept of quantum computing.

Entangles two qubits, also known as a Bell pair. Quantum entanglement occurs when two qubits are interconnected. In other words, if one qubit is in a certain state, the other is also in that state.

For more information about quantum entanglement, see [Tutorial: Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement). // Rewrite this?

## Prerequisites

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download).
- The [Azure Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum).

## Create a Q# file

1. In VS Code, select **File** > **New Text File**.
1. Save the file as `Entanglement.qs`. The .qs extension denotes a Q# program.

## Write your Q# code

1. Declare a namespace to organize your code. User namespaces can have any name, but for this quickstart, call it `Bell`.

    ```qsharp
    namespace Bell {
        // Your code goes here.
    }
    ```

1. Use an `open` statement to import `Microsoft.Quantum.Diagnostic`, a built-in namespace from the Q# standard library that contains diagnostic functions and operations.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;
    }
    ```

1. Define an operation named `EntangleQubits` that returns a tuple of two `Result` values, which are the measurements of our qubits.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

        operation EntangleQubits() : (Result, Result) {  
        
        }
    }
    ```

1. Allocate two qubits, `q1` and `q2`, for use within the `EntangleQubits` operation. Qubits allocated with the `use` statement always start in the $\ket{0}$ state.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

        operation EntangleQubits() : (Result, Result) {  
            use (q1, q2) = (Qubit(), Qubit());
        }
    }
    ```

1. Apply the Hadamard gate, `H`, to the first qubit. This operation puts `q1` in an even superposition, where it has a 50% chance of being measured as zero or one.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

        operation EntangleQubits() : (Result, Result) {  
            use (q1, q2) = (Qubit(), Qubit());
            H(q1);
        }
    }
    ```

1. Apply the controlled-NOT gate, `CNOT`, with `q1` as the control qubit and `q2` as the target qubit. This operation entangles both qubits, creating a Bell pair. The state of `q2` now depends on the state of `q1`.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

        operation EntangleQubits() : (Result, Result) {  
            use (q1, q2) = (Qubit(), Qubit());
            H(q1);
            CNOT(q1, q2);
        }
    }
    ```

1. Use the `DumpMachine` operation, which is enabled with the `Microsoft.Quantum.Diagnostic` namespace, to output the current state of the quantum machine. This is useful for debugging and understanding the state of qubits at any point in your Q# programs.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

        operation EntangleQubits() : (Result, Result) {  
            use (q1, q2) = (Qubit(), Qubit());
            H(q1);
            CNOT(q1, q2);

            DumpMachine();
        }
    }
    ```

1. Use the `M` operation to measure both qubits in the Pauli-Z basis and store the results in `m1` and `m2`. Due to entanglement, these results are correlated: if `q1` is measured as 0, `q2` is also 0, and vice versa.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

        operation EntangleQubits() : (Result, Result) {  
            use (q1, q2) = (Qubit(), Qubit());
            H(q1);
            CNOT(q1, q2);

            DumpMachine();

            let (m1, m2) = (M(q1), M(q2));
        }
    }
    ```

1. Reset `q1` and `q2` to the $\ket{0}$ state. This ensures that the qubits are ready for future operations and that no residual state remains.


    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

        operation EntangleQubits() : (Result, Result) {  
            use (q1, q2) = (Qubit(), Qubit());
            H(q1);
            CNOT(q1, q2);

            DumpMachine();

            let (m1, m2) = (M(q1), M(q2));
            Reset(q1);
            Reset(q2);
        }
    }
    ```

1. Return the measurement results of `q1` and `q2` as a tuple, which allows you to see their entangled states.

    ```qsharp
    namespace Bell {
        open Microsoft.Quantum.Diagnostics;

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

## Run your Q# program

You've now written a Q# program that entangles two qubits and creates a Bell pair. Before running it, use the `@EntryPoint()` attribute to tell the Q# compiler where to start executing the program. In this case, place it before the `EntangleQubits` operation:

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

Under `@EntryPoint()`, select **Run** to see the initialization and measurement of the qubits. You can run the program several times, each with a different output in the debug console.

> [!NOTE]
> `@EntryPoint()` is only required for standalone Q# programs. When running a Q# program in Jupyter Notebooks or calling a Q# program from a Python host file, it's not required and will throw an error if included.

## Next step

- [Tutorial: Implement a quantum random number generator in Q#](xref:microsoft.quantum.tutorial-qdk.random-number)
