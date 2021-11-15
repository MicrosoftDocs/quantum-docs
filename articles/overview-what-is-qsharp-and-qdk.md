---
author: SoniaLopezBravo
description: Learn about the Quantum Development Kit (QDK), the Q# programming language, and how you can create quantum programs.
ms.author: v-sonialopez
ms.date: 11/15/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: What are the Q# programming language & QDK?
uid: microsoft.quantum.overview.q-sharp
---

# What are the Q# programming language and Quantum Development Kit (QDK)?

Q# is a Microsoft’s **open-source** programming language for developing and running quantum algorithms. It’s part of the Quantum Development Kit (QDK), which offers a set of tools that will assist you in the quantum software development process. The QDK includes [quantum libraries](xref:microsoft.quantum.libraries.overview) that let you create complex quantum operations, and [quantum simulators](xref:microsoft.quantum.machines.overview) to accurately run and test your programs. The Q# programs can run as standalone apps or be called from [other programming environments](xref:microsoft.quantum.install-qdk.overview), and can be written, run, and tested from your local computer. The QDK also includes [API documentation](xref:microsoft.quantum.apiref-intro).

As a programming language, Q# draws familiar elements from Python, C#, and F# and supports a basic procedural model for writing programs with loops, if/then statements, and common data types. It also introduces new quantum-specific data structures and operations.

## The quantum programming language Q\#

Why a quantum programming language? In short terms, because you want to write algorithms, not circuits.

The Q# language allows the integration on classical and quantum computing. Q# supports general classical control flow during the execution of an algorithm. This allows clean expression of adaptive algorithms that are difficult to express directly in the circuit model of a fixed sequence of quantum gates.

The Q# language doesn’t specify whether qubits are logical or physical. This can be decided by the runtime when the algorithm is executed. Similarly, the mapping from a qubit variable in a program to an actual logical or physical qubit is decided by the runtime, and that mapping may be deferred until after the topology and other details of the target device is known. The runtime is responsible for determining a mapping that allows the algorithm to execute, including any qubit state transfer and remapping required during execution.

You can use Q# as standalone, in notebooks, and at the command-line or use a host language such as Python or C#. 

## What is a quantum program?

A quantum program can be seen as a particular set of classical subroutines which, when called, perform a computation by interacting with a quantum system; a program written in Q# does not directly model the quantum state, but rather describes how a classical control computer interacts with qubits.

This allows you to be entirely agnostic about what a quantum state even *is* on each target machine, which might have different interpretations depending on the machine. 

When designing a programming language to express a quantum computation, the question naturally arises of whether qubits should be represented in the language, and if so, how. In the most naïve model of such a picture, there would be a software entity that represented each horizontal line, with little or no accessible state other than perhaps a label, but there are other possibilities.

### Qubits as opaque references

In Q# qubits are modeled as opaque data types that represent a reference to a specific two-state quantum system, whether physical or logical (error-corrected), on which quantum operations such as [Hadamard](xref:Microsoft.Quantum.Intrinsic.H) or [Pauli X](xref:Microsoft.Quantum.Intrinsic.X) may be performed. This is an operational view of qubits: qubits are defined by what you can do to them. 

The representation used in Q# has the interesting implication that all of the actual quantum computing is done by side effect. There is no way to directly interact with the quantum state of the computer; it has no software representation at all. Instead, one performs operations on qubit entities that have the side effect of modifying the quantum state. Effectively, the quantum state of the computer is an opaque global variable that is inaccessible except through a small set of accessor primitives (measurements) — and even these accessors have side effects on the quantum state, and so are really “mutators with results” rather than true accessors.

Therefore, Q# has no ability to introspect into the state of a qubit or other properties of quantum mechanics directly, which guarantees that a Q# program can be physically executed on any quantum computer. Instead, a Q# program can call operations such as [`Measure`](xref:Microsoft.Quantum.Intrinsic.Measure) to extract classical information from a qubit.

## Programing quantum operations

Once allocated, a qubit can be passed to operations and functions, also referred to as [*callables*](xref:microsoft.quantum.qsharp.callabledeclarations). In some sense, this is all that a Q# program can do with a qubit. Any direct actions on state of a qubit are all defined by *intrinsic* callables such as [`X`](xref:Microsoft.Quantum.Intrinsic.X) and [`H`](xref:Microsoft.Quantum.Intrinsic.H) - that is, callables whose implementations are not defined within Q# but are instead defined by the target machine. What these operations actually *do* is only made concrete by the target machine you choose to run the particular Q# program. For more information, see [Q# program implementation](xref:microsoft.quantum.qsharp.programstructure-overview).

For example, if running the program on the [full-state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator), the simulator performs the corresponding mathematical operations to the simulated quantum system. But looking toward the future, when the target machine is a real quantum computer, calling such operations in Q# will direct the quantum computer to perform the corresponding **real operations** on the **real quantum hardware**. For example, in a trapped-ion quantum computer the quantum operations are realised by precisely timed laser pulses.

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

If you want to learn more, the [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) provide a good introduction to [quantum computing concepts](xref:microsoft.quantum.tutorial-qdk.katas#introduction-to-quantum-computing-concepts) such as common quantum operations and how to manipulate qubits.
For more information, see [the Q# user guide](xref:microsoft.quantum.user-guide-qdk.overview).


## What can I do with the QDK?

The Quantum Development Kit is a full-featured development kit for Q# that you can use with common tools and languages to develop quantum applications that you can run in various environments. A Q# program can compile into a standalone application, through Jupyter Notebooks, or be called by a host program that is written either in Python or a .NET language.

When you compile and run the program, it creates an instance of the quantum simulator and passes the Q# code to it. The simulator uses the Q# code to create qubits (simulations of quantum particles) and apply transformations to modify their state. The results of the quantum operations in the simulator are then returned to the program.  

Isolating the Q# code in the simulator ensures that the algorithms follow the laws of quantum physics and can run correctly on quantum computers.

![qdk workflow](~/media/quantum-development-kit-flow-diagram.svg)

> [!Note]
> You use the same Q# code for all steps of the workflow. In the short term you might have to tweak some portions of the code to account for the current hardware limitations. But in the long run you’ll be able to switch between various simulators and hardware providers without any code modifications.

### Try quantum operations and domain-specific libraries

You can [create your Q# program](xref:microsoft.quantum.install-qdk.overview.standalone) using the QDK extensions for Visual Studio, Visual Studio Code or Jupyter Notebooks. You can follow the Q# tutorials and start writing quantum programs to explore [superposition](xref:microsoft.quantum.tutorial-qdk.random-number), [entanglement](xref:microsoft.quantum.tutorial-qdk.entanglement), [Grover's quantum algorithm](xref:microsoft.quantum.tutorial-qdk.grovers), and other quantum phenomena. 

The [Q# libraries](xref:microsoft.quantum.libraries.overview) will help you keep your code high-level, enabling you to run complex quantum operations without having to design low-level operation sequences. The [`Microsoft.Quantum.Sdk` NuGet package](https://www.nuget.org/packages/Microsoft.Quantum.Sdk/) automatically includes the Q# [standard library](xref:microsoft.quantum.libraries.overview.standard.intro), which provides a set of essential and very useful functions and operations that can be used when writing quantum programs in Q#.

In addition to the standard library, the QDK includes a [quantum chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview) for simulating quantum dynamics and electronic structure problems on quantum computers, a [quantum machine learning library](xref:microsoft.quantum.libraries.overview#quantum-machine-learning-library) which provides an implementation of the sequential classifiers that take advantage of quantum computing to run hybrid quantum/classical machine learning experiments, and a [quantum numeric library](xref:microsoft.quantum.libraries-numerics.usage) which provides support for a wide range of numerics functionality.

### Tools for developers

The Quantum Development Kit includes extensions for [Visual Studio, Visual Studio Code](xref:microsoft.quantum.install-qdk.overview.standalone), and integration with [Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview.standalone). 

The Quantum Development Kit's built-in APIs supports interoperability with [Python](xref:microsoft.quantum.install-qdk.overview.python) and other [.NET languages](xref:microsoft.quantum.install-qdk.overview.cs). You can also formulate optimization solutions with the Azure Quantum optimization Python package. 

As an additional feature, the QDK supports integration with [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq), so quantum developers that are already working in other development languages, can also run their programs on Azure Quantum.

### Run programs in simulators

Once you’ve written your program, QDK offers a set of [quantum simulators](xref:microsoft.quantum.machines.overview) – classical programs that simulate the behavior of a quantum system, so that you can run a small instance of your program and see what it does without actual hardware access. You can run your quantum programs on a [full-state quantum simulator](xref:microsoft.quantum.machines.overview.full-state-simulator), a limited-scope [Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator), or 
even use the [noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator) for simulating the behavior of Q# programs under the influence of noise. 

Before running on quantum hardware, you’ll need to figure out whether your program can run on existing hardware. You can use [QDK resource estimators](xref:microsoft.quantum.machines.overview.resources-estimator) to tell you how many qubits and quantum gates you need, and how long your program will take.


### Submit jobs to the Azure Quantum service

[Azure Quantum](xref:microsoft.quantum.submit-jobs) is the quantum computing cloud platform that allow you to run your program on quantum hardware.

You can write [quantum computing](xref:microsoft.quantum.overview.understanding) and [quantum-inspired optimization](xref:microsoft.quantum.optimization.concepts.overview.introduction) programs and submit them to Azure Quantum to run on [quantum hardware](xref:microsoft.quantum.reference.qc-target-list) and [optimization solvers](xref:microsoft.quantum.reference.qio-target-list). 

## How do I use the QDK?

Everything you need to write and run Q# programs, including the Q# compiler, the Q# libraries, and the quantum simulators, can be installed and run from your local computer. Eventually you will be able to run your Q# programs remotely on an actual quantum computer, but until then the quantum simulators provided with the QDK provide accurate and reliable results.

- Developing [Q# applications](xref:microsoft.quantum.install-qdk.overview.standalone) is the quickest way to get started.

- Run standalone [Jupyter Notebooks with IQ#](xref:microsoft.quantum.install-qdk.overview.standalone), a Jupyter extension for compiling, simulating, and visualizing Q# programs.

- If you are familiar with [Python](xref:microsoft.quantum.install-qdk.overview.python), you can use it as a host programming platform to get started. Python enjoys widespread use not only among developers, but also scientists, researchers and teachers.

- If you already have experience with [C#, F#, or VB.NET](xref:microsoft.quantum.install-qdk.overview.cs) and are familiar with the Visual Studio development environment, there are just a few extensions you need to add to Visual Studio to prepare it for Q#.  


## Next Steps

- [QuickStarts](xref:microsoft.quantum.install-qdk.overview)
- [Understanding quantum computing](xref:microsoft.quantum.overview.understanding)
- [The Q# User Guide](xref:microsoft.quantum.user-guide-qdk.overview)
- [Linear algebra for quantum computing](xref:microsoft.quantum.overview.algebra)
