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

Q# is a high-level, [open-source](https://github.com/microsoft/qsharp) programming language for developing and running quantum algorithms. The Q# programming language is included in the Quantum Development Kit (QDK). For more information, see [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).

As a quantum programming language, Q# meets the following language, compiler, and runtime requirements:

- **Hardware agnostic:** Qubits in quantum algorithms aren't tied to a specific quantum hardware or layout. The Q# compiler and runtime handle the mapping from program qubits to physical qubits.
- **Integration of quantum and classical computing:** The ability to perform classical and quantum computations is essential in a universal quantum computer.
- **Respect the laws of physics:** Q# and quantum algorithms follow the rules of quantum physics. For example, in Q# you can't directly copy or access the qubit state.

> [!NOTE]
> You can use Q# as a standalone program or with Python in various IDEs. For more information, see [Different ways to work with Q#](xref:microsoft.quantum.qsharp-ways-to-work).

## Structure of a Q# program

Before you start writing quantum programs, it's important to understand the structure and components of a Q# program. As an example, consider the following Q# program which creates a superposition state: 

```qsharp
namespace Superposition {
    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit. By default, it's in the 0 state.  
        use q = Qubit();  
        // Apply the Hadamard operation, H, to the state.
        // It now has a 50% chance of being measured as 0 or 1.
        H(q);      
        // Measure the qubit in the Z-basis.
        let result = M(q);
        // Reset the qubit before releasing it.
        Reset(q);
        // Return the result of the measurement.
        return result;
    }
}
```

Based on the comments (`//`), the `Superposition` program first allocates a qubit, applies an operation to put the qubit in superposition, measures the qubit state, resets the qubit, and finally returns the result. Let's break this program down into its components.

### User namespaces

Q# programs start with a user-named [namespace](xref:microsoft.quantum.qsharp.namespaces), such as:

```qsharp
namespace Superposition {
    // Your code goes here.
}
```

Namespaces help you organize related functionality. Each Q# program can have only one `namespace`.

The Q# standard library has predefined namespaces that contain functions and operations you can use in quantum programs. For more information, see [Built-in namespaces](#built-in-namespaces).

### Entry points

The `@EntryPoint()` attribute tells the Q# compiler where to start executing the program. In a program with multiple functions and operations, you can place `@EntryPoint()` before any of them to make the program start there and continue sequentially.

```qsharp
    @EntryPoint()
    operation MeasureOneQubit() : Result {
        ...
```

### Types

Q# provides [built-in types](xref:microsoft.quantum.qsharp.typesystem-overview) that are common to most languages, including `Int`, `Double`, `Bool`, and `String`, and types that are specific to quantum computing. For example, the `Result` type represents the result of a qubit measurement and can have one of two values: `Zero` or `One`.

In the `Superposition` program, the `MeasureOneQubit()` operation expects a return type of `Result`, and the `M` operation measures the qubit and returns the `Result`:

```qsharp
// The operation definition expects a return type of Result.
operation MeasureOneQubit() : Result {
    ...
    // Measure the qubit in the Z-basis, returning a Result type.
    let result = M(q);
    ...
```

Q# also provides types that define ranges, arrays, and tuples. You can even define your own [custom types](xref:microsoft.quantum.qsharp.typedeclarations).

### Allocating qubits

In Q#, you allocate qubits with the `use` keyword. Qubits are always allocated in the zero state.

The `Superposition` program defines a single qubit:

```qsharp
// Allocate a qubit.
use q = Qubit();
```

You can also allocate multiple qubits and access each one through its index:

```qsharp
// Allocate multiple qubits.
use qubits = Qubit[2];
X(qubits[1]);
H(qubits[0]);
```

For more information, see [Use statement](xref:microsoft.quantum.qsharp.quantummemorymanagement#use-statement).

### Quantum operations

After allocating a qubit, you can pass it to operations and functions, also known as [callables](xref:microsoft.quantum.qsharp.callabledeclarations). [Operations](xref:microsoft.quantum.qsharp.operationsandfunctions) are the basic building blocks of a Q# program. A Q# operation is a quantum subroutine, or a callable routine that contains quantum operations that change the state of the qubit register.

To define a Q# operation, specify a name for the operation, its inputs, and its output. In the `Superposition` program, the `MeasureOneQubit()` operation is essentially the entire program. It takes no parameters and expects a return type of `Result`:

```qsharp
operation MeasureOneQubit() : Result {
    ...
}
```

Here's a basic example that takes no parameters and expects no return value. The `Unit` value is equivalent to `NULL` in other languages:

```qsharp
operation SayHelloQ() : Unit {
    Message("Hello quantum world!");
}
```

The Q# standard library also provides operations you can use in quantum programs, such as the Hadamard operation, `H`, in the `Superposition` program. Given a qubit in the Z-basis, `H` puts it into an even superposition, where the qubit has a 50% chance of being measured as zero or one.

### Measuring qubits

While there are many types of quantum measurements, Q# focuses on projective measurements on single qubits, also known as [Pauli measurements](xref:microsoft.quantum.concepts.pauli). After being measured in a given basis, such as the computational basis $\ket{0},\ket{1}$, the qubit state is projected onto whichever basis state was measured, destroying any superposition between the two.

The `Superposition` program uses the `M` operation, which measures a single qubit in the Pauli Z-basis and returns a `Result` type:

```qsharp
// Measure the qubit in the Z-basis.
let result = M(q);
```

### Resetting qubits

By default, qubits allocated with the `use` keyword start in the zero state. You **must** reset each qubit to the zero state before releasing it at the end of the program. Failure to reset a qubit results in a runtime error.

```qsharp
// Reset a qubit.
Reset(q);
```

### Built-in namespaces

The Q# standard library has built-in namespaces that contain functions and operations you can use in quantum programs. For example, the `Microsoft.Quantum.Intrinsic` namespace contains commonly used operations and functions, such as `M` to measure results and `Message` to display user messages anywhere in the program.  

To call a function or operation, you can specify the full namespace or use an `open` statement, which makes all the functions and operations for that namespace available and makes your code more readable. The following examples call the same operation:

```qsharp
Microsoft.Quantum.Intrinsic.Message("Hello quantum world!");
```

```qsharp
open Microsoft.Quantum.Intrinsic;
Message("Hello quantum world!");
```

The `Superposition` program doesn't have any `open` statements or calls with full namespaces. That's because the Q# development environment loads two namespaces by default: `Microsoft.Quantum.Core` and `Microsoft.Quantum.Intrinsic`, which contain commonly used functions and operations.

You can take advantage of the `Microsoft.Quantum.Measurement` namespace by using the `MResetZ` operation to optimize the `Superposition` program. `MResetZ` combines the measurement and reset operations into one step, as in the following example:

```qsharp
namespace Superposition {
    // Open the namespace for the MResetZ operation.
    open Microsoft.Quantum.Measurement;

    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit. By default, it's in the 0 state.      
        use q = Qubit();  
        // Apply the Hadamard operation, H, to the state.
        // It now has a 50% chance of being measured as 0 or 1. 
        H(q);   
        // Measure and reset the qubit, and then return the result value.
        return MResetZ(q);
    }
}
```

## Related content

- [Different ways to work with Q#](xref:microsoft.quantum.qsharp-ways-to-work)
- [Set up the Azure Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
- [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart)
