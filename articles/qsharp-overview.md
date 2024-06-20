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

When writing algorithms, a quantum programming language should meet the following language, compiler, and runtime requirements:

- **Abstract qubits:** Quantum algorithms use qubits that aren't tied to specific hardware or layout. The compiler and runtime handle the mapping from program qubits to physical qubits.
- **Quantum and classical computing:** The ability to perform classical and quantum computations is essential in a universal quantum computer.
- **Respect the laws of physics:** Quantum algorithms follow the rules of quantum physics. For example, they cannot directly copy or access the qubit state.

## Structure of a Q# program

Q# has a well-defined structure. Consider the following program:

```qsharp
namespace Superposition {
    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit. By default, it's in the zero state.  
        use q = Qubit();  
        // Apply the Hadamard operation, H, to the state.
        // It now has a 50% chance of being measured as 0 or 1.
        H(q);      
        // Measure the qubit in Z-basis.
        let result = M(q);
        // Reset the qubit before releasing it.
        Reset(q);
        // Return the result of the measurement.
        return result;
    }
}
```

Based on the comments (`//`), the `Superposition` program allocates a qubit, applies an operation to superpose the qubit, measures the state of the qubit, resets the qubit, and then returns the result. Continue reading to learn about each component of this program.

> [!NOTE]
> Q# is available as a standalone program or with Python, which doesn't support some of the following program components. For more information, see NEW GET STARTED

### Namespaces

Q# programs start with a user-named [namespace](xref:microsoft.quantum.qsharp.namespaces), such as:

```qsharp
namespace Superposition {
    // Your code goes here.
}
```

Namespaces help you organize related functionality. Each Q# program can have only one `namespace`.

The Q# standard library has predefined namespaces that contain functions and operations you can use in quantum programs. For more information, see [Built-in namespaces](#built-in-namespaces).

### EntryPoint()

The `@EntryPoint()` attribute tells the Q# compiler where to start executing the program. In programs with multiple functions and operations, you can place `@EntryPoint()` before them to have the program start there and continue sequentially.

```qsharp
    ...
    @EntryPoint()
    operation MeasureOneQubit() : Result {
        ...
```

### Types

Q# provides [built-in types](xref:microsoft.quantum.qsharp.typesystem-overview) that are common to most languages, including `Int`, `Double`, `Bool`, and `String`, and types that are specific to quantum computing. For example, the [`Result`](xref:microsoft.quantum.qsharp.quantumdatatypes#result) type represents the result of a qubit measurement and can have one of two values: `Zero` or `One`. In the `Superposition` program, the `MeasureOneQubit()` operation expects a return type of `Result`, and the `M` operation measures the qubit and returns the `Result`.

```qsharp
...
// Operation definition expects a return type of Result.
operation MeasureOneQubit() : Result {
    ...
    // Measure the qubit in Z-basis, returning a Result type.
    let result = M(q);
    ...
}
```

Q# also provides types that define ranges, arrays, and tuples. You can even define your own [custom types](xref:microsoft.quantum.qsharp.typedeclarations).

### Allocating qubits

To allocate qubits in Q#, use the [`use`](xref:microsoft.quantum.qsharp.quantummemorymanagement#use-statement) keyword. Every qubit you allocate with the use keyword starts in the |0〉 state.

The `Superposition` program defines a single qubit:

```qsharp
// Allocate a qubit.
use q = Qubit();
...
```

You can also allocate multiple qubits and access each one through its index:

```qsharp
...
use qubits = Qubit[2];
X(qubits[1]);
H(qubits[0]);
...
```

By default, qubits allocated with the `use` keyword start in the zero state. You **must** reset each qubit to the zero state before releasing it at the end of the program. Failure to reset a qubit results in a runtime error.

```qsharp
// Reset a qubit.
Reset(q);
...
```

### Quantum operations

After allocating a qubit, you can pass it to operations and functions, also known as [callables](xref:microsoft.quantum.qsharp.callabledeclarations). [Operations](xref:microsoft.quantum.qsharp.operationsandfunctions) are the basic building blocks of a Q# program. A Q# operation is a quantum subroutine, or a callable routine that contains quantum operations that change the state of the qubit register.

To define a Q# operation, you specify a name for the operation, its inputs, and its output. In the `Superposition` program, the `MeasureOneQubit()` operation is essentially the entire program. It takes no parameters and expects a return type of `Result`:

```qsharp
operation MeasureOneQubit() : Result {
    ...
}
```

Here's a basic example that takes no parameters and expects no return value. The `Unit` value is equivalent to `NULL` in other languages.

```qsharp
operation SayHelloQ() : Unit {
    Message("Hello quantum world!");
}
```

The Q# standard library also provides operations you can use in your programs, such as the Hadamard (`H`) operation in the `Superposition` program. Given a qubit in Z-basis, the `H` operation puts the qubit into an *even* superposition, where the qubit has a 50% chance of being measured as zero or one.

### Measuring qubits

There are many types of quantum measurements, but Q# focuses on projective measurements on single qubits, also known as [Pauli measurements](xref:microsoft.quantum.concepts.pauli). Upon measurement in a given basis, such as the computational basis $\ket{0},\ket{1}$, the qubit state is projected onto whichever basis state was measured, destroying any superposition between the two.

Our example program uses the `M` operation, which performs a measurement of a single qubit in the Pauli Z basis and returns a `Result` type.

### Built-in namespaces

The Q# standard library makes use of built-in namespaces that contain functions and operations that you can use in quantum programs. For example, the namespace `Microsoft.Quantum.Intrinsic` contains commonly used operations and functions such as `M`, to measure results and `Message`, to display user messages anywhere in the program.  

You can call a function or operation by specifying the full namespace, or use  an `open` statement to make all the functions and operations for that namespace available, and to make your code easier to read. These two examples call the same operation:

```qsharp
 Microsoft.Quantum.Intrinsic.Message("Hello quantum world!");
```

```qsharp
open Microsoft.Quantum.Intrinsic;
Message("Hello quantum world!");
```

Notice in the example program, there are no `open` statements or calls with full namespaces. That is because the Q# development environment automatically loads two namespaces by default - `Microsoft.Quantum.Core` and `Microsoft.Quantum.Intrinsic` - which contain commonly used functions and operations. 

You can take advantage of the `Microsoft.Quantum.Measurement` namespace and use the `MResetZ` operation to optimize the code in the example program. `MResetZ` combines the measurement and reset operations into one step, as in the following example:


```qsharp
namespace Superposition {

    // open the namespace for the MResetZ operation
    open Microsoft.Quantum.Measurement;

    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit, by default it is in zero state      
        use q = Qubit();  
        // Apply the Hadamard operation, H, to the state.
        // It now has a 50% chance of being measured 0 or 1  
        H(q);   
        // Measure and reset the qubit, and return the result value   
        return MResetZ(q);
    }
    
}
```

## Next steps

- Different ways to work with Q#
- Quickstart: Create your first Q# program