---
author: bradben
description: Overview of the structure and components of a Q# program
ms.author: brbenefield
ms.date: 01/06/2024
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Structure of a Q# Program
uid: microsoft.quantum.user-guide-qdk.overview.program-structure
---

# Structure of a Q# program

This article explores the general components that make up a Q# program. Note that Q# programs written in Jupyter Notebooks will not use some of these components - these differences are described in each section.

Consider the following Q# program:

```qsharp
namespace Superposition {

    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit, by default it is in zero state      
        use q = Qubit();  
        // We apply a Hadamard operation H to the state
        // It now has a 50% chance of being measured 0 or 1  
        H(q);      
        // Now we measure the qubit in Z-basis.
        let result = M(q);
        // We reset the qubit before releasing it.
        Reset(q);
        // Finally, we return the result of the measurement.
        return result;
    }
}
```

By just reading the comments (**//**), you can tell that this program allocates a qubit, applies an operation to put it in superposition, measures the state of the qubit, then resets it and returns the result. 

To run this program in VS Code, see [Get started with Q# programs and VS Code](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp).

## Namespaces

Q# programs typically start with a namespace, such as 

```qsharp
namespace Superposition {
    // Your code goes here.
}
```

[Namespaces](xref:microsoft.quantum.qsharp.namespaces) help you organize related functionality. Their use becomes important when you use Q# libraries in your programs and when you write your own libraries. Namespaces are user-named, and there can only be one namespace per qsharp (*.qs) file. 

**Jupyter Notebooks** do not use namespaces.

## EntryPoint()

The `@EntryPoint()` attribute tells the Q# compiler where to begin executing the program. In programs with multiple function and operation definitions, the `@EntryPoint()` can be placed before any of the functions or operations and program flow starts from there and continues sequentially. 

```qsharp
    ...
    @EntryPoint()
    operation MeasureOneQubit() : Result {
        ...
```

**Jupyter Notebooks** do not use entry points. 

### The %%qsharp command

By default, Q# programs in Jupyter Notebooks use the *ipykernel* Python kernel. In order to add Q# code to a notebook cell, you need to use the `%%qsharp` command, which is enabled with the `qsharp` Python package. For example, the previous sample code in a Jupyter Notebook looks like this:

```python
import qsharp
```

```qsharp
%%qsharp

    operation MeasureOneQubit() : Result {
        // Allocate a qubit, by default it is in zero state      
        use q = Qubit();  
        // We apply a Hadamard operation H to the state
        // It now has a 50% chance of being measured 0 or 1  
        H(q);      
        // Now we measure the qubit in Z-basis.
        let result = M(q);
        // We reset the qubit before releasing it.
        Reset(q);
        // Display the result
        Message($"Result is {result}");
        // Finally, we return the result of the measurement.
        return result;
    
    }
    MeasureOneQubit();
```

Note the absence of a namespace or an `@EntryPoint()`, which are not needed for Jupyter Notebooks. Instead of an entry point, the operation is called directly in the last line. Also note that a `Message` statement was added to the Jupyter Notebook code to display the result. When running the earlier Q# program in VS Code, the built-in simulator displays the result by default. 

When using the `%%qsharp` command:

- You must run `import qsharp` first to enable the `%%qsharp` command.
- The `%%qsharp` command is scoped to the entire cell in which it appears.
- The Q# code that follows the command must adhere to standard Q# coding syntax. For example, comments are denoted by `//` instead of `#` within `%%qsharp` cells, and code lines must end with a semi-colon `;`.
- The `%%qsharp` command cannot be preceded by or followed by a Python statement within its cell. 

For an example of working with a Jupyter Notebook program, see [Get started with Q# programs and VS Code](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter).

## Types

Q# provides many [built-in types](xref:microsoft.quantum.qsharp.typesystem-overview) that are common to most languages, including `Int`, `Double`, `Bool`, and `String`, along with types that are specific to quantum computing. For example, the [`Result`](xref:microsoft.quantum.qsharp.quantumdatatypes#result) type represents the result of any qubit measurement and can have one of two possible defined values: `One` and `Zero`.  In the example program, the operation `MeasureOneQubit()` expects a return type of `Result` and the [`M` operation](xref:Microsoft.Quantum.Intrinsic.M) measures the qubit and returns the `Result`.

```qsharp
...
// operation definition expecting a return type of Result
operation MeasureOneQubit() : Result {
    ...
    // Now we measure the qubit in Z-basis, returning a Result type
    let result = M(q);
    ...
}
```

Q# also provides types that define ranges, arrays, and tuples. You can even define your [own custom types](xref:microsoft.quantum.qsharp.typedeclarations).

## Allocating qubits

In Q#, qubits are allocated through the [`use`](xref:microsoft.quantum.qsharp.quantummemorymanagement#use-statement) keyword. 

Our example defines a single qubit:

```qsharp
// Allocate a qubit.
use q = Qubit();
...
```

but you can also allocate multiple qubits and access each one through its index:

```qsharp
...
use qubits = Qubit[2];
X(qubits[1]);
H(qubits[0]);
...
```

By default, every qubit you allocate with the `use` keyword starts in the zero state. Each qubit **must** be reset back the zero state before it is released at the end of the program. Failing to reset a qubit triggers a runtime error. 

```qsharp
// Reset a qubit.
Reset(q);
...
```

## Quantum operations

Once allocated, a qubit can be passed to operations and functions, also referred to as [*callables*](xref:microsoft.quantum.qsharp.callabledeclarations). [Operations](xref:microsoft.quantum.qsharp.operationsandfunctions) are the basic building blocks of a Q# program. A Q# operation is a quantum subroutine. That is, it's a callable routine that contains quantum operations that modify the state of the qubit register.

To define a Q# operation, you specify a name for the operation along with its inputs and its output. In our example, the single operation is essentially the entire program. It takes no parameters and expects a return type of `Result`:

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

The [Q# libraries](xref:microsoft.quantum.libraries.overview) also provide operations that you can use in your programs, for example the Hadamard or the [`H`](xref:Microsoft.Quantum.Intrinsic.H) operation that is used in the example program. Given a qubit in Z-basis, the `H` operation puts the qubit into an *even* superposition. Once in superposition, the qubit has a 50% chance of being measured as zero or one.

## Measuring qubits

There are many types of quantum measurements, but Q# focuses on projective measurements on single qubits, also known as [Pauli measurements](xref:microsoft.quantum.concepts.pauli). Upon measurement in a given basis (for example, the computational basis $\ket{0},\ket{1}$) the qubit state is projected onto whichever basis state was measured, hence destroying any superposition between the two.

Our example program uses the [`M` operation](xref:Microsoft.Quantum.Intrinsic.M), which performs a measurement of a single qubit in the Pauli Z basis and returns a `Result` type.

## Libraries

Q# makes extensive use of libraries. A library is a package that contains functions and operations that you can use in quantum programs.

You can call a function or operation by specifying the full namespace, or use  an `open` statement to make all the functions and operations for that library available, and to make your code easier to read. These two examples call the same operation:

```qsharp
 Microsoft.Quantum.Intrinsic.Message("Hello quantum world!");
```

```qsharp
open Microsoft.Quantum.Intrinsic;
Message("Hello quantum world!");
```

Notice in the example program, there are no `open` statements or calls with full namespaces. That is because the Q# development environment automatically loads two common libraries by default - [`Microsoft.Quantum.Core`](xref:Microsoft.Quantum.Core) and [`Microsoft.Quantum.Intrinsic`](xref:Microsoft.Quantum.Intrinsic) - which contain commonly used functions and operations. 

You can take advantage of the [`Microsoft.Quantum.Measurement`](xref:Microsoft.Quantum.Measurement) library and use the [`MResetZ`](xref:Microsoft.Quantum.Measurement.MResetZ) operation to optimize the code in the example program. `MResetZ` combines the measurement and reset operations into one step, as in the following:


```qsharp
namespace Superposition {

    // open the library for the MResetZ operation
    open Microsoft.Quantum.Measurement;

    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit, by default it is in zero state      
        use q = Qubit();  
        // We apply a Hadamard operation H to the state
        // It now has a 50% chance of being measured 0 or 1  
        H(q);   
        // Measure and reset the qubit, and return the result value   
        return MResetZ(q);
    }
    
}
```
