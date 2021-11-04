---
author: bradben
description: A guide to the Q# programming language, the Q# libraries, and how to develop quantum programs.
ms.author: v-benbra
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: The Q# programming language user guide
uid: microsoft.quantum.user-guide-qdk.overview
---

# The Q# programming language user guide

The Q# programming language is part of Microsoft's [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview) and provides rich IDE support and tools for program visualization and analysis.
Q# supports the development of future large-scale applications while supporting the user's first efforts in that direction on current quantum hardware.

The Q# user guide contains:

- 
- **The Q# language guide**: A full specification and documentation of the Q# quantum programming language.

- **The Q# library documentation**: Documentation of the operations, functions, and user-defined types that make up the standard Q# library, as well as the chemistry, machine learning, and numerics libraries.

- **Quantum simulator documentation**: Documentation and examples of the quantum software simulators that make it possible to run and test quantum programs on classical computers.

## Programming in Q#

The type system permits Q# programs to safely interleave and naturally represent the composition of classical and quantum computations. A Q# program may express arbitrary classical computations based on quantum measurements that execute while qubits remain live, meaning they are not released and maintain their state. Even though the full complexity of such computations requires further hardware development, Q# programs can be targeted to run on various [quantum hardware backends](xref:microsoft.quantum.reference.qc-target-list) in Azure Quantum.

Q# is a stand-alone language offering a high level of abstraction. There is no notion of a quantum state or a circuit; instead, Q# implements programs in terms of statements and expressions, much like classical programming languages. Distinct quantum capabilities (such as support for functors and control-flow constructs) facilitate expressing, for example, phase estimation and quantum chemistry algorithms.

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

When you call a function or operation from a library, you specify the library's namespace. Here's an example that calls the `Message` function from the `Microsoft.Quantum.Intrinsic` library to print a message to the console:

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

Q# provides many built-in types you're already familiar with, including `Int`, `Double`, `Bool`, and `String`, along with types that are specific to quantum computing. Q# also provides types that define ranges, arrays, and tuples. You can even define your own custom types.

In this module, you'll work with the `Result` type. A `Result` represents the result of a qubit measurement and can have one of two possible values: `One` and `Zero`.

### Allocating qubits

In Q#, to obtain a qubit you use the `use` keyword. You can allocate one or many qubits at a time.

Here's an example that allocates one qubit:

```qsharp
// Allocate a qubit.
use q = Qubit();

// Do something with q here.
```

Every qubit you allocate with the `use` keyword starts in the zero state.

## Next steps

- [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs)
- [Testing and debugging Q# programs](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
