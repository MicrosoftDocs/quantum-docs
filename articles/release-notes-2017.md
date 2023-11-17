---
title: Release notes for QDK and Azure Quantum - 2017
description: Learn about updates to the Microsoft Quantum Development Kit (QDK) and Azure Quantum in 2017.
ms.date: 11/17/2023
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, Basic measurement feedback, target, targets]
uid: microsoft.quantum.relnotes-qdk
---

# Release notes for Quantum Development Kit (QDK) and Azure Quantum - 2017

This article outlines updates to the [Quantum Development Kit (QDK)](xref:microsoft.quantum.overview.q-sharp) and the [Azure Quantum service](xref:microsoft.quantum.azure-quantum-overview) in 2017.

## QDK version 0.1.1712.901

### 2017-12-11

#### Known issues

##### Hardware and software requirements

- The simulator included with the Quantum Development Kit requires a 64-bit installation of Microsoft Windows to run.
- Microsoft's quantum simulator, installed with the Quantum Development Kit, uses Advanced Vector Extensions (AVX), and requires an AVX-enabled CPU. Intel processors shipped in Q1 2011 (Sandy Bridge) or later support AVX. We're evaluating support for earlier CPUs and may announce details at a later time.

##### Project creation

- When creating a solution (.sln) that uses Q#, the solution must be one directory higher than each project (`.csproj`) in the solution. When creating a new solution, this can be accomplished by making sure that the "Create directory for solution" checkbox on the "New Project" dialog box is checked. If this isn't done, the Quantum Development Kit NuGet packages must be installed manually.

##### Q#

- Intellisense doesn't display proper errors for Q# code. Make sure that you're displaying Build errors in the Visual Studio Error List to see correct Q# errors. Also note that Q# errors won't show up until after you've done a build.
- Using a mutable array in a partial application may lead to unexpected behavior.
- Binding an immutable array to a mutable array (let a = b, where b is a mutable array) may lead to unexpected behavior.
- Profiling, code coverage and other VS plugins may not always count Q# lines and blocks accurately.
- The Q# compiler doesn't validate interpolated strings. It's possible to create C# compilation errors by misspelling variable names or using expressions in Q# interpolated strings.

##### Simulation

- The Quantum Simulator uses OpenMP to parallelize the linear algebra required. By default OpenMP uses all available hardware threads, which means that programs with small numbers of qubits often run slowly because the coordination required dwarfs the actual work. This can be fixed by setting the environment variable OMP_NUM_THREADS to a small number. As a rough rule of thumb, one thread is good for up to about four qubits, and then an additional thread per qubit is good, although this is highly dependent on your algorithm.

##### Debugging

- F11 (step in) doesn't work in Q# code.
- Code highlighting in Q# code at a breakpoint or single-step pause is sometimes inaccurate. The correct line is highlighted, but sometimes the highlight starts and ends at incorrect columns on the line.

##### Testing

- Tests must be run in 64-bit mode. If your tests are failing with a BadImageFormatException, go to the Test menu and select Test Settings > Default Processor Architecture > X64.
- Some tests take a long time (possibly as much as 5 minutes depending on your computer) to run. This is normal, as some use over 20 qubits; our largest test currently runs on 23 qubits.

##### Samples

- On some machines, some small samples may run slowly unless the environment variable OMP_NUM_THREADS is set to "1". See also the release note under "Simulation".

##### Libraries

- There's an implicit assumption that the qubits passed to an operation in different arguments are all distinct. For instance, all of the library operations (and all of the simulators) assume that the two qubits passed to a controlled NOT are different qubits. Violating this assumption may lead to unpredictable unexpected. It's possible to test for this using the quantum computer tracer simulator.
- The `Microsoft.Quantum.Bind` function may not act as expected in all cases.
- In the `Microsoft.Quantum.Extensions.Math` namespace, the `SignD` function returns a `Double` rather than an `Int`, although the underlying `System.Math.Sign` function always returns an `integer`. It's safe to compare the result against 1.0, -1.0, and 0.0, since these `doubles` all have exact binary representations.