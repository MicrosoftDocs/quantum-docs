---
author: bradben
description: A guide to the Q# programming language, the Q# libraries, and how to develop quantum programs.
ms.author: brbenefield
ms.date: 11/05/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: The Q# programming language user guide
uid: microsoft.quantum.user-guide-qdk.overview
---

# The Q# programming language user guide

The Q# quantum programming language is part of Microsoft's [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview) and provides rich IDE support and tools for program visualization and analysis.

Q# supports the development of future large-scale applications while supporting the user's first efforts in that direction on current quantum hardware.

The Q# user guide contains:

- [**Ways to run a Q# program**](xref:microsoft.quantum.user-guide-qdk.overview.host-programs): A Q# program can be run as a standalone application, or with an additional host program, written in Python or a .NET language.

- [**Testing and debugging Q# programs**](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging): As with classical programming, it is essential to be able to check that quantum programs act as intended, and to be able to diagnose incorrect behavior. The Quantum Development Kit for testing and debugging quantum programs.

- **The Q# language guide**: Q# is a stand-alone language offering a high level of abstraction. There is no notion of a quantum state or a circuit; instead, Q# implements programs in terms of statements and expressions, much like classical programming languages. The Q# language guide provides a full specification and documentation of the Q# quantum programming language. 

- [**Quantum simulators documentation**](xref:microsoft.quantum.machines.overview): Quantum simulators are software programs that run on classical computers and act as the target machine for a Q# program, making it possible to run and test quantum programs on classical computers.

- [**The Q# library documentation**](xref:microsoft.quantum.libraries.overview): The Quantum Development Kit provides additional domain-specific functionality through *NuGet* packages that can be added to your Q# projects. The documentation includes operations, functions, user-defined types, examples, and concepts that make up the standard Q# library, as well as the quantum chemistry, quantum machine learning, and quantum numerics libraries.

## Programming in Q#

Q# is a stand-alone language offering a high level of abstraction. There is no notion of a quantum state or a circuit; instead, Q# implements programs in terms of statements and expressions, much like classical programming languages. Distinct quantum capabilities (such as support for functors and control-flow constructs) facilitate expressing, for example, phase estimation and quantum chemistry algorithms.

Q# is hardware agnostic, meaning that the Q# language provides the means to express and leverage powerful quantum computing concepts independent on how hardware evolves in the future. To be useable across a wide range of applications, Q# allows to build reusable components and layers of abstractions. To achieve performance with growing quantum hardware size, the Q# quantum programming language ensures the scalability of both applications and development effort. Even though the full complexity of such computations requires further hardware development, Q# programs can be targeted to run on various [quantum hardware backends](xref:microsoft.quantum.reference.qc-target-list) in Azure Quantum.

The Q# language  is focused on expressing information to optimize execution. The goal is to ensure an efficient execution of quantum components, independent of the context within which they are invoked. Q# allows the developer to communicate their knowledge about a computation so that the compiler can make an informed decision regarding how to translate it into instructions, leveraging information about the end-to-end application that is not available to the developer.

The type system permits Q# programs to safely interleave and naturally represent the composition of classical and quantum computations. A Q# program may express arbitrary classical computations based on quantum measurements that execute while qubits remain live, meaning they are not released and maintain their state. 

## What is in a Q# program?

Let's explore the general pieces that fit within a Q# program. Consider the following Q# program:

```qsharp
namespace HelloQuantum {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;


    @EntryPoint()
    operation HelloQ() : Unit {
        Message("Hello quantum world!");
    }
}
```

`EntryPoint` tells the Q# compiler where to begin executing the program. The program prints this message:

```output
    Hello quantum world!
```

### Namespaces

Every Q# file typically starts with a namespace. Here's an example:

```qsharp
namespace HelloQuantum {
    // Your code goes here.
}
```

[Namespaces](xref:microsoft.quantum.qsharp.namespaces) help you organize related functionality. Their use becomes important when you use Q# libraries in your programs and when you write your own libraries.

### Libraries

Q# makes extensive use of libraries. A library is a package that contains functions and operations that you can use in quantum programs.

For example, the [Microsoft.Quantum.Chemistry](/qsharp/api/qsharp/microsoft.quantum.chemistry?azure-portal=true) library helps you perform quantum calculations that relate to chemistry. There are several standard libraries that include all sorts of basic operations.

When you call a function or operation from a library, you specify the library's namespace. Here's an example that calls the `Message` function from the [Microsoft.Quantum.Intrinsic](xref:Microsoft.Quantum.Intrinsic) library to print a message to the console:

```qsharp
namespace HelloQuantum {

    @EntryPoint()
    operation HelloQ() : Unit {
        Microsoft.Quantum.Intrinsic.Message("Hello quantum world!");
    }
}
```

More commonly, you use the `open` directive to make your code more succinct and easier to read. 

This example does the same thing as the previous example, except this one uses the `open` directive to bring the `Microsoft.Quantum.Intrinsic` namespace into the program:

```qsharp
namespace HelloQuantum {

    open Microsoft.Quantum.Intrinsic;

    @EntryPoint()
    operation HelloQ() : Unit {
        Message("Hello quantum world!");
    }
}
```

Here, you simply specify `Message` and the compiler understands which namespace it belongs to.

The Q# documentation provides complete reference documentation for each built-in library. For more information, see [the Q# libraries documentation](/quantum/user-guide/libraries/additional-libraries?tabs=tabid-csproj).

### Operations

[Operations](xref:microsoft.quantum.qsharp.operationsandfunctions) are the basic building blocks of a Q# program. A Q# operation is a quantum subroutine. That is, it's a callable routine that contains quantum operations that modify the state of the qubit register.

To define a Q# operation, you specify a name for the operation along with its inputs and its output. Here's a basic example:

```qsharp
operation HelloQ() : Unit {
    Message("Hello quantum world!");
}
```

Here, `HelloQ` is the name of the operation. It takes zero arguments as its input and returns type `Unit`, which means that the operation returns no information.

Q# libraries also provide operations that you can use in your programs. One operation you'll use later is the `H` operation. Think of the `H` operation as a way of putting a qubit into an *even* superposition. Once in superposition, a qubit has a 50% chance of being measured as zero or one.

### Types

Q# provides many [built-in types](xref:microsoft.quantum.qsharp.typesystem-overview) you're already familiar with, including `Int`, `Double`, `Bool`, and `String`, along with types that are specific to quantum computing. For example, the `Result` type represents the result of a qubit measurement and can have one of two possible values: `One` and `Zero`. Q# also provides types that define ranges, arrays, and tuples. You can even define your [own custom types](xref:microsoft.quantum.qsharp.typedeclarations).

All in all, the Q# type system is fairly minimalist, in the sense that there isn't an explicit notion of classes or interfaces as one might be used to from classical languages like C# or Java. 

### Allocating qubits

In Q#, qubits are allocated through the `use` keyword. You can allocate one or many qubits at a time.

Here's an example that allocates one qubit:

```qsharp
// Allocate a qubit.
use q = Qubit();

// Do something with q here.
```
By default, every qubit you allocate with the `use` keyword starts in the zero state.

### Measuring qubits

There are many sorts of quantum measurements, but Q# focuses on projective measurements on single qubits, also known as [Pauli measurements](xref:microsoft.quantum.concepts.pauli). Upon measurement in a given basis (for example, the computational basis $\ket{0},\ket{1}$) the qubit state is projected onto whichever basis state was measured, hence destroying any superposition between the two.

In Q#, Pauli measurements are done by applying [`Measure` operation](xref:Microsoft.Quantum.Intrinsic.Measure), which performs a joint measurement of one or more qubits in the specified Pauli bases. `Measure` operation returns a `Result` type.

To implement a measurement in the computational basis $\ket{0},\ket{1}$, you can also use the [`M` operation](xref:Microsoft.Quantum.Intrinsic.M), wich performs a measurement of a single qubit in the Pauli Z basis. Therefore `M` operation is equivalent to applying `Measure([PauliZ], [qubit])`.

> [!NOTE]
> If the basis array and qubit array are different lengths, then the `Measure` operation will fail.

For performing measurements beyond a single joint measurement, the [`Microsoft.Quantum.Measurement` namespace](xref:Microsoft.Quantum.Measurement) includes more specific operations. For example, the [`MultiM` operation](xref:Microsoft.Quantum.Measurement.MultiM) takes an array of qubits and returns an array of measurement results in the computational basis. 

## Next steps

- [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs)
- [Testing and debugging Q# programs](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
- [Statements in Q#](xref:microsoft.quantum.qsharp.statements-overview)
- [Program implementation in Q#](xref:microsoft.quantum.qsharp.programstructure-overview)
- [Expressions in Q#](xref:microsoft.quantum.qsharp.expressions-overview)
- [Data types in Q#](xref:microsoft.quantum.qsharp.typesystem-overview)
- [Q# libraries](xref:microsoft.quantum.libraries.overview)
- [Quantum simulators](xref:microsoft.quantum.machines.overview)
