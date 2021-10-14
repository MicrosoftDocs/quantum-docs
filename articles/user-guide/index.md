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

# The Q programming language user guide

The Q# programming language is part of Microsoft's [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview) and provides rich IDE support and tools for program visualization and analysis.
Q# supports the development of future large-scale applications while supporting the user's first efforts in that direction on current quantum hardware.

The Q# user guide contains:

- **The Q# language guide**: A full specification and documentation of the Q# quantum programming language.

- **The Q# library documentation**: Documentation of the operations, functions, and user-defined types that make up the standard Q# library, as well as the chemistry, machine learning, and numerics libraries.

- **Quantum simulator documentation**: Documentation and examples of the quantum software simulators that make it possible to run and test quantum programs on classical computers.

## Programming in Q#

The type system permits Q# programs to safely interleave and naturally represent the composition of classical and quantum computations. A Q# program may express arbitrary classical computations based on quantum measurements that execute while qubits remain live, meaning they are not released and maintain their state. Even though the full complexity of such computations requires further hardware development, Q# programs can be targeted to run on various [quantum hardware backends](xref:microsoft.quantum.reference.qc-target-list) in Azure Quantum.

Q# is a stand-alone language offering a high level of abstraction. There is no notion of a quantum state or a circuit; instead, Q# implements programs in terms of statements and expressions, much like classical programming languages. Distinct quantum capabilities (such as support for functors and control-flow constructs) facilitate expressing, for example, phase estimation and quantum chemistry algorithms.

## What is a quantum program?

A quantum program can be seen as a particular set of classical subroutines which, when called, perform a computation by interacting with a quantum system; a program written in Q# does not directly model the quantum state, but rather describes how a classical control computer interacts with qubits.
This allows us to be entirely agnostic about what a quantum state even *is* on each target machine, which might have different interpretations depending on the machine. 

An important consequence of that is that Q# has no ability to introspect into the state of a qubit or other properties of quantum mechanics directly, which guarantees that a Q# program can be physically executed on a quantum computer.
Instead, a program can call operations such as [`Measure`](xref:Microsoft.Quantum.Intrinsic.Measure) to extract classical information from a qubit.

Once allocated, a qubit can be passed to operations and functions, also referred to as *callables*. In some sense, this is all that a Q# program can do with a qubit. Any direct actions on state of a qubit are all defined by *intrinsic* callables such as [`X`](xref:Microsoft.Quantum.Intrinsic.X) and [`H`](xref:Microsoft.Quantum.Intrinsic.H) - that is, callables whose implementations are not defined within Q# but are instead defined by the target machine. What these operations actually *do* is only made concrete by the target machine we use to run the particular Q# program.

For example, if running the program on our [full-state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator), the simulator performs the corresponding mathematical operations to the simulated quantum system.
But looking toward the future, when the target machine is a real quantum computer, calling such operations in Q# will direct the quantum computer to perform the corresponding *real* operations on the *real* quantum system (for example, precisely timed laser pulses).

A Q# program recombines these operations as defined by a target machine to create new, higher-level operations to express quantum computation.
In this way, Q# makes it easy to express the logic underlying quantum and hybrid quantum–classical algorithms, while also being general with respect to the structure of a target machine or simulator.

A simple example is the following program, which allocates one qubit in the $\ket{0}$ state, then applies a Hadamard operation `H` to it and measures the result in the `PauliZ` basis.

```qsharp
@EntryPoint()
operation MeasureOneQubit() : Result {
    // The following using block creates a fresh qubit and initializes it
    // in the |0〉 state.
    use qubit = Qubit();
    // We apply a Hadamard operation H to the state, thereby preparing the
    // state 1 / sqrt(2) (|0〉 + |1〉).
    H(qubit);
    // Now we measure the qubit in Z-basis.
    let result = M(qubit);
    // As the qubit is now in an eigenstate of the measurement operator,
    // we reset the qubit before releasing it.
    if result == One { X(qubit); }
    // Finally, we return the result of the measurement.
    return result;
    
}
```

Our [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) provide a good introduction to [quantum computing concepts](xref:microsoft.quantum.tutorial-qdk.katas#introduction-to-quantum-computing-concepts) such as common quantum operations and how to manipulate qubits.
For more examples, see [intrinsic operations and functions](xref:microsoft.quantum.libraries.overview.standard.prelude).

## Next steps

- [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs)
- [Testing and debugging Q# programs](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
