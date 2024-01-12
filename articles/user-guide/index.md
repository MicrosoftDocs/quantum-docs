---
author: bradben
description: A guide to the Q# programming language, the Q# libraries, and how to develop quantum programs.
ms.author: brbenefield
ms.date: 01/07/2024
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: overview
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, target, targets]
title: The Q# Programming Language Overview
uid: microsoft.quantum.user-guide-qdk.overview
---

# The Q# programming language overview

The [Q# quantum programming language](xref:microsoft.quantum.overview.q-sharp) is part of the Azure Quantum Development Kit, which provides rich IDE support and tools for program visualization and analysis. With Q# and the Quantum Development Kit (QDK) you can write your quantum programs and run them on real quantum hardware using Azure Quantum.

[!INCLUDE [Classic QDK banner](../includes/classic-qdk-deprecation.md)]

The Q# user guide contains:

- [**Structure of a Q# programs**](xref:microsoft.quantum.user-guide-qdk.overview.program-structure)
- [**Working with Q# projects**](xref:microsoft.quantum.qsharp-projects)
- [**Debugging and testing Q# programs**](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
- [**Perform long running programs**](xref:microsoft.quantum.long-running-experiments)
<!-- - **Common command reference** ->

## Characteristics of Q\#

The following sections describe the main features of the Q# programming language.

### Q\# integrates quantum and classical computation

Q# is a standalone language offering a high level of abstraction. There is no notion of a quantum state or a circuit; instead, Q# implements programs in terms of statements and expressions, much like classical programming languages. Distinct quantum capabilities, such as support for [functors](xref:microsoft.quantum.qsharp.functorapplication) and control-flow constructs, facilitate expressing, for example, [phase estimation](xref:microsoft.quantum.libraries.overview.standard.algorithms#quantum-phase-estimation).

The Q# language supports the integration of rich classical and quantum computing. This allows clean expression of adaptive algorithms such as the [random walk phase estimation operation](xref:Microsoft.Quantum.Research.Characterization.RandomWalkPhaseEstimation) that are difficult to express directly in the circuit model of a fixed sequence of quantum gates.

Q# supports general classical flow control during the execution of an algorithm. In particular, classical flow control is based on quantum measurement outcomes, which makes it much easier to write things that depend on intermediate measurements. For instance, the loop required for probabilistic algorithms such as Grover search can easily be expressed in Q#, rather than having to return to the classical driver to test whether the result satisfies the oracle and rerunning if not.

### Qubits are opaque references

In Q#, qubits are a resource that are requested from the runtime when needed and returned when no longer in use. This is similar to the way that classical languages deal with heap memory.
In Q#, qubits are a resource that are requested from the runtime when needed and returned when no longer in use. This is similar to the way that classical languages deal with heap memory.

Qubits are modeled as opaque data types that represent a reference to a specific two-state quantum system, whether physical or logical (error-corrected), on which quantum operations may be performed. This is an operational view of qubits - that is, qubits are defined by what you can do to them.

The mapping from a qubit variable in a program to an actual logical or physical qubit is decided by the runtime, and that mapping may be deferred until after the topology and other details of the target device is known. The runtime is responsible for determining a mapping that allows the algorithm to execute, including any qubit state transfer and remapping required during execution.

The representation used in Q# has the interesting implication that all of the actual quantum computing is done by side effect. There is no way to directly interact with the quantum state of the computer; it has no software representation at all. Instead, you perform operations on qubit entities that have the side effect of modifying the quantum state. Effectively, the quantum state of the computer is an opaque global variable that is inaccessible except through a small set of accessor primitives (measurements) — and even these accessors have side effects on the quantum state, and so are really “mutators with results” rather than true accessors.

### Q\# respects the laws of physics

Quantum programs should be required to respect the laws of physics. For example, copying the state of a qubit or directly accessing the qubit state are not possible in Q#.

Therefore, Q# has no ability to introspect into the state of a qubit or other properties of quantum mechanics directly, which guarantees that a Q# program can be physically executed on any quantum computer. Instead, a Q# program has the ability to call operations and functions to extract classical information from a qubit.

### Q\# is hardware agnostic

Q# is hardware agnostic, meaning that it provides the means to express and leverage powerful quantum computing concepts independently of how hardware evolves in the future. To be useable across a wide range of applications, Q# allows you to build reusable components and layers of abstractions. To achieve performance with growing quantum hardware size, the Q# quantum programming language ensures the scalability of both applications and development effort. Even though the full complexity of such computations requires further hardware development, Q# programs can be targeted to run on various [quantum hardware backends](xref:microsoft.quantum.reference.qc-target-list) in Azure Quantum.

### Q\# allows efficient execution

The Q# language is focused on expressing information to optimize the execution of quantum components, independent of the context within which they are invoked. Q# allows the developer to communicate their knowledge about a computation so that the compiler can make an informed decision regarding how to translate it into instructions, leveraging information about the end-to-end application that is not available to the developer.

## Next steps

- [Debugging and testing Q# programs](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
- [Statements in Q#](xref:microsoft.quantum.qsharp.statements-overview)
- [Program implementation in Q#](xref:microsoft.quantum.qsharp.programstructure-overview)
- [Expressions in Q#](xref:microsoft.quantum.qsharp.expressions-overview)
- [Data types in Q#](xref:microsoft.quantum.qsharp.typesystem-overview)
- [Q# libraries](xref:microsoft.quantum.libraries.overview)

