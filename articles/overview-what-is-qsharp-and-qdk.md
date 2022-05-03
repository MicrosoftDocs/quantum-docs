---
author: bradben
description: Learn about the Quantum Development Kit (QDK), the Q# programming language, and how you can create quantum programs.
ms.author: brbenefield
ms.date: 11/15/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: What are the Q# programming language & QDK?
uid: microsoft.quantum.overview.q-sharp
---

# What are the Q# programming language and the Quantum Development Kit?

Q# is Microsoft’s **open-source** programming language for developing and running quantum algorithms. It’s part of the Quantum Development Kit (QDK), an SDK which offers a set of tools that will assist you in the quantum software development process. The Quantum Development Kit provides:
- A tool set integrated with leading development environments
- Open-source resources
- [Quantum libraries](xref:microsoft.quantum.libraries.overview) that let you create complex quantum operations
- [Quantum simulators](xref:microsoft.quantum.machines.overview) to accurately run and test your programs

With the Quantum Development Kit, you can build programs that run on quantum hardware or formulate problems that run on quantum-inspired solvers in Azure Quantum, an open cloud ecosystem with a diverse set of quantum solutions and technologies. The QDK offers support for Q#, Qiskit, and Cirq for quantum computing, so if you are already working in other development languages you can also run your circuits on Azure Quantum.  It also provides access to optimization solvers for running optimization problems in the cloud. 

> [!Tip]
> **Free trial.** If you don’t have an Azure subscription, you can [create an Azure free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) (check out free Azure accounts [for students](https://azure.microsoft.com/free/students/)). With Azure you can create, deploy, and manage applications across multiple clouds, on-premises, and at the edge. You will get 200 USD Azure credit to use in other Azure services. 

Q# programs can run as standalone programs or be called from other programming environments. You can write, run, and test programs using the [online Jupyter notebooks](xref:microsoft.quantum.get-started.notebooks) available in your Azure Quantum workspace, and from your [local computer](xref:microsoft.quantum.install-qdk.overview.standalone). As a programming language, Q# draws familiar elements from Python, C#, and F#, and supports a basic procedural model for writing programs with loops, if/then statements, and common data types. It also introduces new quantum-specific data structures and operations.

As an additional feature, the QDK supports integration with [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq), so quantum developers that are already working in other development languages, can also run their programs on Azure Quantum.

> [!Tip]
> Get started with the Q# language:
> - Run Q# in Azure portal (no installation required) 
>   - [Get started with Q# and an Azure Quantum notebook](xref:microsoft.quantum.get-started.notebooks)
> 
> - Install and run Q# SDK locally
>   - [Set up a Q# and Python development environment](xref:microsoft.quantum.install-qdk.overview.python)
>   - [Set up a standalone Q# development environment](xref:microsoft.quantum.install-qdk.overview.standalone)
>
> - [Q# API reference documentation](xref:microsoft.quantum.apiref-intro)


## The quantum programming language Q\#

Why the need of a quantum programming language? In short terms, because you want to write algorithms, not circuits.

A quantum program can be seen as a particular set of classical subroutines which, when called, perform a computation by interacting with a quantum system; a program written in Q# does not directly model the quantum state, but rather describes how a classical control computer interacts with qubits. This allows you to be entirely agnostic about what a quantum state even *is* on each target machine, which might have different interpretations depending on the machine. You can write your code once and run it with little to no change against multiple targets of the same family which allows you to focus your programming at the algorithm level.

To learn more about the QDK features and the general pieces that fit within a Q# program, see [the Q# programming language user guide](xref:microsoft.quantum.user-guide-qdk.overview).

### Integration with quantum and classical computation

Q# is a stand-alone language offering a high level of abstraction. There is no notion of a quantum state or a circuit; instead, Q# implements programs in terms of statements and expressions, much like classical programming languages. Distinct quantum capabilities (such as support for functors and control-flow constructs) facilitate expressing, for example, phase estimation and quantum chemistry algorithms. The Q# language allows the integration of classical and quantum computing, and  supports general classical control flow during the execution of an algorithm. This allows clean expression of adaptive algorithms that are difficult to express directly in the circuit model of a fixed sequence of quantum gates.

### Qubits as opaque references

The Q# language doesn’t specify whether qubits are logical or physical. This can be decided by the runtime when the algorithm is executed. Similarly, the mapping from a qubit variable in a program to an actual logical or physical qubit is decided by the runtime, and that mapping may be deferred until after the topology and other details of the target device is known. The runtime is responsible for determining a mapping that allows the algorithm to execute, including any qubit state transfer and remapping required during execution.

In Q# qubits are modeled as opaque data types that represent a reference to a specific two-state quantum system, whether physical or logical (error-corrected), on which quantum operations may be performed. This is an operational view of qubits: qubits are defined by what you can do to them. 

The representation used in Q# has the interesting implication that all of the actual quantum computing is done by side effect. There is no way to directly interact with the quantum state of the computer; it has no software representation at all. Instead, one performs operations on qubit entities that have the side effect of modifying the quantum state. Effectively, the quantum state of the computer is an opaque global variable that is inaccessible except through a small set of accessor primitives (measurements) — and even these accessors have side effects on the quantum state, and so are really “mutators with results” rather than true accessors.

### Respect the laws of physics

Quantum programs should be required to respect the laws of physics. For example, copying the state of a qubit or direct access to the qubit state are not possible in Q#. 

Therefore, Q# has no ability to introspect into the state of a qubit or other properties of quantum mechanics directly, which guarantees that a Q# program can be physically executed on any quantum computer. Instead, a Q# program has the ability to call operations, such as [`Measure`](xref:Microsoft.Quantum.Intrinsic.Measure), to extract classical information from a qubit, that allows validation and state examination to facilitate debugging with a simulator.

### Hardware agnostic

Q# is hardware agnostic, meaning that the Q# language provides the means to express and leverage powerful quantum computing concepts independent on how hardware evolves in the future. To be useable across a wide range of applications, Q# allows to build reusable components and layers of abstractions. To achieve performance with growing quantum hardware size, the Q# quantum programming language ensures the scalability of both applications and development effort. Even though the full complexity of such computations requires further hardware development, Q# programs can be targeted to run on various [quantum hardware backends](xref:microsoft.quantum.reference.qc-target-list) in Azure Quantum.

### Efficient execution

The Q# language is focused on expressing information to optimize the execution. The goal is to ensure an efficient execution of quantum components, independent of the context within which they are invoked. Q# allows the developer to communicate their knowledge about a computation so that the compiler can make an informed decision regarding how to translate it into instructions, leveraging information about the end-to-end application that is not available to the developer.

## What can I do with the Quantum Development Kit?

The Quantum Development Kit is a full-featured development kit for Q# that you can use with common tools and languages to develop quantum applications that you can run in various environments. A Q# program can compile into a standalone application, or be called by a host program that is written either in Python or a .NET language.

When you compile and run the program, it creates an instance of the quantum simulator and passes the Q# code to it. The simulator uses the Q# code to create qubits (simulations of quantum particles) and apply transformations to modify their state. The results of the quantum operations in the simulator are then returned to the program. Isolating the Q# code in the simulator ensures that the algorithms follow the laws of quantum physics and can run correctly on quantum computers.

The following diagram shows the stages through which a quantum program goes from idea to complete implementation on Azure Quantum, and the tools offered by the QDK for each stage.

![qdk workflow](~/media/quantum-development-kit-flow-diagram.svg)

> [!Note]
> You use the same Q# code for all steps of the workflow. In the short term you might have to tweak some portions of the code to account for the current hardware limitations. But in the long run you’ll be able to switch between various simulators and hardware providers without any code modifications.

### Write your quantum program

If you want to start practicing and writing your Q# programs without installing additional software, you can use the [hosted Jupyter notebooks](xref:microsoft.quantum.get-started.notebooks) available in Azure portal in your Azure Quantum workspace. In the sample gallery you will find various notebook samples, you can select the sample you want to use and run it on cloud-based simulators or real quantum computers.

If you prefer a local development environment, you can [create your Q# program](xref:microsoft.quantum.install-qdk.overview.standalone) using the QDK extensions for Visual Studio 2022, Visual Studio Code, or Jupyter notebooks with IQ#. 

### Try quantum operations and domain-specific libraries

You can follow the Q# tutorials and start writing quantum programs to explore quantum concepts such as [superposition](xref:microsoft.quantum.tutorial-qdk.random-number), [entanglement](xref:microsoft.quantum.tutorial-qdk.entanglement), [Grover's quantum algorithm](xref:microsoft.quantum.tutorial-qdk.grovers), and other quantum phenomena. If you have leaned towards online development, in the sample gallery in your Azure Quantum workspace you will also find notebook samples to get started in the quantum software development.

The [Q# libraries](xref:microsoft.quantum.libraries.overview) will help you keep your code high level, enabling you to run complex quantum operations without having to design low-level operation sequences. The [`Microsoft.Quantum.Sdk` NuGet package](https://www.nuget.org/packages/Microsoft.Quantum.Sdk/) automatically includes the Q# [standard library](xref:microsoft.quantum.libraries.overview.standard.intro), which provides a set of essential and very useful functions and operations that can be used when writing quantum programs in Q#.

In addition to the standard library, the QDK includes a [quantum chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview) for simulating quantum dynamics and electronic structure problems on quantum computers, a [quantum machine learning library](xref:microsoft.quantum.libraries.overview#quantum-machine-learning-library) which provides an implementation of the sequential classifiers that take advantage of quantum computing to run hybrid quantum/classical machine learning experiments, and a [quantum numeric library](xref:microsoft.quantum.libraries-numerics.usage) which provides support for a wide range of numerics functionality.


### Run programs in simulators

Once you’ve written your program, the QDK offers a set of [quantum simulators](xref:microsoft.quantum.machines.overview) – classical programs that simulate the behavior of a quantum system, so that you can run a small instance of your program and see what it does without actual hardware access. You can run your quantum programs on a [full-state quantum simulator](xref:microsoft.quantum.machines.overview.full-state-simulator), a limited-scope [Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator), a [sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator) for systems with larger number of qubits, and even use the [noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator) for simulating the behavior of Q# programs under the influence of noisy environments. 

Before running on quantum hardware, you’ll need to figure out whether your program can run on existing hardware, and how many resources it will consume. You can use the [resource estimator](xref:microsoft.quantum.machines.overview.resources-estimator) to tell you how many qubits and quantum gates you need, and how long your program will take, and the [trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro) to do an advanced analysis of resources consumption and  debug classical code that is part of your quantum program.

See the full list of [quantum simulators](xref:microsoft.quantum.machines.overview).

### Submit jobs to the Azure Quantum service

[Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) is the cloud quantum computing service of Azure, with a diverse set of quantum solutions and technologies. Azure Quantum ensures an open, flexible, and future-proofed path to quantum computing that allows you to run your program on quantum hardware. You can run your Qiskit, Cirq, and Q# algorithms on multiple quantum systems.

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Once you’ve created an Azure Quantum workspace, you can submit your Q# programs (also known as jobs) to Azure Quantum through your preferred development enviroment, both locally and online. For more information, see [how to submit Q# jobs](xref:microsoft.quantum.submit-jobs). You can also run and submit quantum circuits written in [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) or [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq). 

The following diagram shows the basic workflow after you submit your job:

![azure quantum job flow](~/media/azure-quantum-flow-diagram-providers.svg)

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. With Azure Quantum and the QDK you can write [quantum computing](xref:microsoft.quantum.overview.understanding) and [quantum-inspired optimization](xref:microsoft.quantum.optimization.concepts.overview.introduction) programs, and submit them to Azure Quantum to run on [quantum hardware](xref:microsoft.quantum.reference.qc-target-list) and [optimization solvers](xref:microsoft.quantum.reference.qio-target-list). 


## How can I use the Quantum Development Kit?

Everything you need to write and run Q# programs, including the Q# compiler, the Q# libraries, and the quantum simulators, can be done cloud-base in the Azure portal with the hosted Jupyter notebooks, or it can be installed and run from your local computer if you prefer to.

The Quantum Development Kit includes extensions for [Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) and [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode), and integration for [Jupyter Notebooks with IQ#](xref:microsoft.quantum.install-qdk.overview.standalone). 

The Quantum Development Kit supports interoperability with [Python](xref:microsoft.quantum.install-qdk.overview.python) and other [.NET languages](xref:microsoft.quantum.install-qdk.overview.cs), as well as integration with [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq), so quantum developers that are already working in other development languages can also run their circuits on Azure Quantum.

- Running a Q# code in a Jupyter notebook in the [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) portal is the quickest way to get started.

- You can develop Q# programs as standalone applications in a [local development environment](xref:microsoft.quantum.install-qdk.overview.standalone). 

- If you are familiar with Python, you can use it as a [host programming platform](xref:microsoft.quantum.install-qdk.overview.python) to get started. Python enjoys widespread use not only among developers, but also scientists, researchers and teachers.

- If you already have experience with [C#, F#, or VB.NET](xref:microsoft.quantum.install-qdk.overview.cs) and are familiar with the Visual Studio development environment, there are just a few extensions you need to add to Visual Studio to prepare it for Q#.  

## Next Steps

If you want to learn more, the [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) provide a good introduction to [quantum computing concepts](xref:microsoft.quantum.tutorial-qdk.katas#introduction-to-quantum-computing-concepts) such as common quantum operations and how to manipulate qubits.

- [QuickStarts](xref:microsoft.quantum.install-qdk.overview)
- [Understanding quantum computing](xref:microsoft.quantum.overview.understanding)
- [The Q# User Guide](xref:microsoft.quantum.user-guide-qdk.overview)
- [Linear algebra for quantum computing](xref:microsoft.quantum.overview.algebra)
