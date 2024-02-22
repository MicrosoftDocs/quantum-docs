---
title: Release notes for QDK and Azure Quantum - 2020
description: Learn about updates to the Microsoft Quantum Development Kit (QDK) and Azure Quantum in 2020.
ms.date: 11/17/2023
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, Basic measurement feedback, target, targets]
uid: microsoft.quantum.relnotes-qdk-2020
---

# Release notes for Quantum Development Kit (QDK) and Azure Quantum - 2020

This article outlines updates to the [Quantum Development Kit (QDK)](xref:microsoft.quantum.overview.q-sharp) and the [Azure Quantum service](xref:microsoft.quantum.azure-quantum-overview) in 2020.

## QDK version 0.14.2011120240

### 2020-11-25

- Improved compiler performance with faster reference loading.
- Added an [ANTLR grammar for Q#](https://github.com/microsoft/qsharp-language/tree/main/Specifications/Language/5_Grammar) to the Q# language specification.
- Updated the [`Microsoft.Quantum.Preparation` namespace](xref:Microsoft.Quantum.Preparation) so it is more consistent with style guide and API design principles, and to support purified mixed states with more data (see [proposal](https://github.com/microsoft/QuantumLibraries/issues/344), [review notes](https://github.com/microsoft/QuantumLibraries/blob/main/Design/meetings/2020/api-design-2020-11-05.md), and PRs [#212](https://github.com/microsoft/QuantumLibraries/pull/212), [#322](https://github.com/microsoft/QuantumLibraries/pull/322), [#375](https://github.com/microsoft/QuantumLibraries/pull/375), [#376](https://github.com/microsoft/QuantumLibraries/pull/376)).
- Parentheses around repeated call expressions are now optional: `(Foo(x))(y)` may be written as `Foo(x)(y)`.
- Users of the Visual Studio or Visual Studio Code extensions who have installed .NET 5 or Visual Studio 16.8 may be prompted to install .NET Core 3.1 to continue to work with the extensions.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18).

## QDK version 0.13.20111004

### 2020-11-10

This release disables IntelliSense features for Q# files in Visual Studio and Visual Studio Code when a project file isn't present. This resolves an issue where IntelliSense features may stop working after adding a new Q# file to a project (see [qsharp-compiler#720](https://github.com/microsoft/qsharp-compiler/issues/720)).

## QDK version 0.13.20102604

### 2020-10-27

This release contains the following:

- Resource estimation now emits simultaneously achievable depth and width estimates also to the qubit count.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22).

## QDK version 0.12.20100504

### 2020-10-05

This release fixes a bug affecting the load of Q# notebooks (see [iqsharp#331](https://github.com/microsoft/iqsharp/pull/331)).

## QDK version 0.12.20092803

### 2020-09-29

This release contains the following:

- Announcement and draft specification of [quantum intermediate representation (QIR)](https://github.com/qir-alliance/qir-spec) intended as a common format across different front- and back-ends. See also our [blog post](https://devblogs.microsoft.com/qsharp/introducing-quantum-intermediate-representation-qir) on QIR.
- Launch of our new [Q# language repo](https://github.com/microsoft/qsharp-language) containing also the full [Q# documentation](https://github.com/microsoft/qsharp-language/tree/main/Specifications/Language#q-language).
- Performance improvements for QuantumSimulator for programs involving a large number of qubits: better application of gate fusion decisions; improved parallelization on Linux system; added intelligent scheduling of gate execution; bug fixes.
- IntelliSense features are now supported for Q# files in Visual Studio and Visual Studio Code even without a project file.
- Various Q#/Python interoperability improvements and bug fixes, including better support for NumPy data types.
- Improvements to the Microsoft.Quantum.Arrays namespace (see [microsoft/QuantumLibraries#313](https://github.com/microsoft/QuantumLibraries/issues/313)).
- Added a new [Repeat-Until-Success sample](https://github.com/microsoft/Quantum/tree/main/samples/algorithms/repeat-until-success) that uses only two qubits.

Since the last release, the default branch in each of our open-source repositories has been renamed to `main`.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+closed%3A2020-08-24..2020-09-24), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+closed%3A2020-08-24..2020-09-24), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+closed%3A2020-08-24..2020-09-24), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+closed%3A2020-08-24..2020-09-24), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+closed%3A2020-08-24..2020-09-24) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+closed%3A2020-08-24..2020-09-24).

## QDK version 0.12.20082513

### 2020-08-25

This release contains the following:

- New [Microsoft.Quantum.Random namespace](xref:Microsoft.Quantum.Random), providing a more convenient way to sample random values from within Q# programs. ([QuantumLibraries#311](https://github.com/microsoft/QuantumLibraries/pull/311), [qsharp-runtime#328](https://github.com/microsoft/qsharp-runtime/pull/328))
- Improved [Microsoft.Quantum.Diagnostics namespace](xref:Microsoft.Quantum.Diagnostics) with new [`DumpOperation` operation](xref:Microsoft.Quantum.Diagnostics.DumpOperation), and new operations for restricting qubit allocation and oracle calls. ([QuantumLibraries#302](https://github.com/microsoft/QuantumLibraries/pull/302))
- New [`%project` magic command](xref:microsoft.quantum.iqsharp.magic-ref.project) in IQ# and `qsharp.projects` API in Python to support references to Q# projects outside the current workspace folder. See [iqsharp#277](https://github.com/microsoft/iqsharp/issues/277) for the current limitations of this feature. 
- Support for automatically loading `.csproj` files for IQ#/Python hosts, which allows external project or package references to load at initialization time. For more information, see the guide for using Q# with Python and Jupyter Notebooks.
- Added `ErrorCorrection.Syndrome` sample.
- Added tunable coupling to `SimpleIsing`.
- Updated `HiddenShift` sample.
- Added sample for solving Sudoku with Grover's algorithm (external contribution)
- General bug fixes.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.12.20072031

### 2020-07-21

This release contains the following:

- Opened namespaces in Q# notebooks are now available when running all future cells. This allows, for example, namespaces to be opened once in a cell at the top of the notebook, rather than needing to open relevant namespaces in each code cell. A new `%lsopen` magic command displays the list of currently opened namespaces.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.12.20070124

### 2020-07-02

This release contains the following:

- New `qdk-chem` tool for converting legacy electronic structure problem serialization formats (for example, FCIDUMP) to Broombridge.
- New functions and operations in the [`Microsoft.Quantum.Synthesis`](xref:Microsoft.Quantum.Synthesis) namespace for coherently applying classical oracles using transformation- and decomposition-based synthesis algorithms.
- IQ# now allows arguments to the `%simulate`, `%estimate`, and other magic commands. For more information, see the [`%simulate` magic command reference](xref:microsoft.quantum.iqsharp.magic-ref.simulate).
- New phase display options in IQ#. For more information, see the [`%config` magic command reference](xref:microsoft.quantum.iqsharp.magic-ref.config).
- IQ# and the `qsharp` Python package are now provided via conda packages ([qsharp](https://anaconda.org/quantum-engineering/qsharp) and [iqsharp](https://anaconda.org/quantum-engineering/iqsharp)) to simplify local installation of Q# Jupyter and Python functionality to a conda environment. For more information, see the [Q# with Python](xref:microsoft.quantum.install-qdk.overview) installation guides.
- When using the simulator, qubits no longer need to be in the |0⟩ state upon release, but can be automatically reset if they were measured immediately before releasing.
- Updates to make it easier for IQ# users to consume library packages with different QDK versions, requiring only major & minor version numbers match rather than the exact same version
- Removed deprecated `Microsoft.Quantum.Primitive.*` namespace
- Moved operations:
  - `Microsoft.Quantum.Intrinsic.Assert` is now `Microsoft.Quantum.Diagnostics.AssertMeasurement`
  - `Microsoft.Quantum.Intrinsic.AssertProb` is now `Microsoft.Quantum.Diagnostics.AssertMeasurementProbability`
- Bug fixes 

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.11.2006.403

### 2020-06-04

This release fixes a bug-affecting compilation of Q# projects.

## QDK version 0.11.2006.207

### 2020-06-03

This release contains the following:

- Q# notebooks and Python host programs no longer fail when a Q# entry point is present.
- Updates to Standard library to use access modifiers
- Compiler now allows plug-in of rewrite steps between built-in rewrite steps
- Several deprecated functions and operations have been removed following the schedule described in our API principles. Q# programs and libraries that build without warnings in version 0.11.2004.2825 continue to work unmodified.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

> [!NOTE]
> This version contains a bug that affects the compilation of Q# projects. We recommend upgrading to a newer release.

## QDK version 0.11.2004.2825

### 2020-04-30

This release contains the following:

- New support for Q# applications, which no longer require a C# or Python host file. For more information on getting started with Q# applications, see [here](xref:microsoft.quantum.install-qdk.overview).
- Updated quantum random number generator quickstart to no longer require a C# or Python host file. See the updated  [Quickstart](xref:microsoft.quantum.tutorial-qdk.random-number)
- Performance improvements to IQ# Docker images

> [!NOTE]
> Q# applications using the new [`@EntryPoint()`](xref:Microsoft.Quantum.Core.EntryPoint) attribute currently can't be called from Python or .NET host programs.
> For more information, see the [Python](xref:microsoft.quantum.install-qdk.overview) guide.

## QDK version 0.11.2003.3107

### 2020-03-31

This release contains minor bug fixes for version 0.11.2003.2506.

## QDK version 0.11.2003.2506

### 2020-03-26

This release contains the following:

- New support for access modifiers in Q#
- Updated to .NET Core SDK 3.1

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.10.2002.2610

### 2020-02-27

This release contains the following:

- New Quantum Machine Learning library.
- IQ# bug fixes, resulting in up to a 10-20x performance increase when loading NuGet packages

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.10.2001.2831

### 2020-01-29

This release contains the following:

- New Microsoft.Quantum.SDK NuGet package, which replaces the Microsoft.Quantum.Development.Kit NuGet package when creating new projects. Microsoft.Quantum.Development.Kit NuGet package is still supported for existing projects. 
- Support for Q# compiler extensions, enabled by the new Microsoft.Quantum.SDK NuGet package, for more information, see the [documentation on GitHub](https://github.com/microsoft/qsharp-compiler/tree/main/src/QuantumSdk#extending-the-q-compiler), the [compiler extensions sample](https://github.com/microsoft/qsharp-compiler/tree/main/examples/CompilerExtensions) and the [Q# Dev Blog](https://devblogs.microsoft.com/qsharp/extending-the-q-compiler/)
- Added support for .NET Core 3.1, it's highly recommended to have version 3.1.100 installed since building with older .NET Core SDK versions may cause issues
- New compiler transformations available under Microsoft.Quantum.QsCompiler.Experimental
- New functionality to expose output state vectors as HTML in IQ#
- Added support for EstimateFrequencyA to Microsoft.Quantum.Characterization for Hadamard and SWAP tests
- AmplitudeAmplification namespace now uses Q# style guide

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  