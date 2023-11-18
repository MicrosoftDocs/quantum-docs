---
title: Release notes for QDK and Azure Quantum - 2019
description: Learn about updates to the Microsoft Quantum Development Kit (QDK) and Azure Quantum in 2019.
ms.date: 11/17/2023
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, Basic measurement feedback, target, targets]
uid: microsoft.quantum.relnotes-qdk-2019
---

# Release notes for Quantum Development Kit (QDK) and Azure Quantum - 2019

This article outlines updates to the [Quantum Development Kit (QDK)](xref:microsoft.quantum.overview.q-sharp) and the [Azure Quantum service](xref:microsoft.quantum.azure-quantum-overview) in 2019.

## QDK version 0.10.1912.0501

### 2019-12-05

This release contains the following:

- New Test attribute for Q# unit testing, see updated API documentation [here](xref:Microsoft.Quantum.Diagnostics.Test) and updated testing & debugging guide [here](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
- Added stack trace if there's a Q# program run error
- Support for breakpoints in Visual Studio Code because of an update in the [OmniSharp C# Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.10.1911.1607

### 2019-11-17

This release contains the following:

- Performance fix for [Quantum Katas](https://github.com/Microsoft/QuantumKatas) and Jupyter notebooks

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.10.1911.307

### 2019-11-01

This release contains the following:

- Updates to Visual Studio Code & Visual Studio extensions to deploy language server as a self-contained executable file, eliminating the .NET Core SDK version dependency  
- Migration to .NET Core 3.0
- Breaking change to Microsoft.Quantum.Simulation.Core.IOperationFactory with introduction of new `Fail` method. It affects only custom simulators that don't extend SimulatorBase. For more details, [view the pull request on GitHub](https://github.com/microsoft/qsharp-runtime/pull/59).
- New support for Deprecated attributes

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.9.1909.3002

### 2019-09-30

This release contains the following:

- New support for Q# code completion in Visual Studio 2019 (versions 16.3 & later) & Visual Studio Code
- New [Quantum Kata](https://github.com/Microsoft/QuantumKatas) for quantum adders

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.9.1908.2902

### 2019-08-29

This release contains the following:

- New support for [conjugation statements](xref:microsoft.quantum.qsharp.conjugations#conjugations) in Q#
- New code actions in the compiler, such as: "replace with", "add documentation", and simple array item update
- Added install template and new project commands to Visual Studio Code extension
- Added new variants of ApplyIf combinator such as [Microsoft.Quantum.Canon.ApplyIfOne](xref:Microsoft.Quantum.Canon.ApplyIfOne)
- Additional [Quantum Katas](https://github.com/Microsoft/QuantumKatas) converted to Jupyter Notebooks
- Visual Studio Extension now requires Visual Studio 2019

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

The changes are summarized here with instructions for upgrading your existing programs.  Read more about these changes on the [Q# dev blog](https://devblogs.microsoft.com/qsharp).

## QDK version 0.8.1907.1701

### 2019-07-12

This release contains the following:

- New indexing for slicing arrays, for more information, see the [language reference](xref:microsoft.quantum.qsharp.contextualexpressions#contextual-and-omitted-expressions).
- Added Dockerfile hosted on the [Microsoft Container Registry](https://github.com/microsoft/ContainerRegistry), for more information, see the [IQ# repository](https://github.com/microsoft/iqsharp/blob/main/README.md)
- Breaking change for [the trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro), update to configuration settings, name changes; see the [.NET API Browser for the updated names](/dotnet/api/microsoft.quantum.simulation.simulators.qctracesimulators.qctracesimulatorconfiguration).

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed) and [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed).  

## QDK version 0.7.1905.3109

### 2019-05-31

This release contains the following:
- Additions to the Q# language
- Updates to the chemistry library
- New numerics library

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed) and [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed).  

The changes are summarized here as well instructions for upgrading your existing programs.  Read more about these changes on the [Q# dev blog](https://devblogs.microsoft.com/qsharp).

#### Q# language syntax
This release adds new Q# language syntax:
* Add named items for [user-defined types](xref:microsoft.quantum.qsharp.typedeclarations#type-declarations).  
* User-defined type constructors can now be used as functions.
* Add support for [copy-and-update](xref:microsoft.quantum.qsharp.copyandupdateexpressions#copy-and-update-expressions) and [apply-and-reassign](xref:microsoft.quantum.qsharp.variabledeclarationsandreassignments#evaluate-and-reassign-statements) in user-defined types.
* Fixup-block for [repeat-until-success](xref:microsoft.quantum.qsharp.conditionalloops#repeat-statement) loops is now optional.
* We now support while loops in functions (not in operations).

#### Library

This release adds a numerics library: Learn more about how to [use the new numerics library](xref:microsoft.quantum.libraries-numerics.usage) and try out the [new samples](https://github.com/microsoft/Quantum/tree/main/samples/numerics).  [PR #102](https://github.com/Microsoft/QuantumLibraries/pull/102).  
This release reorganizes, extends and updates the chemistry library:

* Improves modularity of components, extensibility, general code cleanup.  [PR #58](https://github.com/microsoft/QuantumLibraries/pull/58).
* Add support for [multi-reference wavefunctions](xref:microsoft.quantum.libraries.overview-chemistry.concepts.multireference), both sparse multi-reference wavefunctions and unitary coupled cluster.  [PR #110](https://github.com/Microsoft/QuantumLibraries/pull/110).
* (Thank you!) [1QBit](https://1qbit.com) contributor ([@valentinS4t1qbit](https://github.com/ValentinS4t1qbit)): Energy evaluation using variational ansatz. [PR #120](https://github.com/Microsoft/QuantumLibraries/pull/120).
* Updating [Broombridge](xref:microsoft.quantum.libraries.overview.chemistry.schema.broombridge) schema to new [version 0.2](xref:microsoft.quantum.libraries.overview.chemistry.schema.spec_v_0_2), adding unitary coupled cluster specification. [Issue #65](https://github.com/microsoft/QuantumLibraries/issues/65).
* Adding Python interoperability to chemistry library functions. Try out this [sample](https://github.com/microsoft/Quantum/tree/main/samples/chemistry/PythonIntegration). [Issue #53](https://github.com/microsoft/QuantumLibraries/issues/53) [PR #110](https://github.com/Microsoft/QuantumLibraries/pull/110).

## QDK version 0.6.1905

### 2019-05-03

This release contains the following:

- Makes changes to the Q# language
- Restructures the Quantum Development Kit libraries
- Adds new samples
- Fixes bugs.  Several closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed) and [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed).  

The changes are summarized here and instructions for upgrading your existing programs.  You can read more about these changes on devblogs.microsoft.com/qsharp.

#### Q# language syntax

This release adds new Q# language syntax:

- Add a [shorthand way to express specializations of quantum operations](xref:microsoft.quantum.qsharp.specializationdeclarations) (control and adjoints) with `+` operators.  The old syntax is deprecated.  Programs that use the old syntax (for example, `: adjoint`) continue to work, but a compile-time warning is generated.  
- Add a new ternary operator for [copy-and-update](xref:microsoft.quantum.qsharp.copyandupdateexpressions#copy-and-update-expressions), `w/` `<-`, can be used to express array creation as a modification of an existing array.
- Add the common [apply-and-reassign statement](xref:microsoft.quantum.qsharp.variabledeclarationsandreassignments#evaluate-and-reassign-statements), for example, `+=`, `w/=`.
- Add a way to specify a short name for namespaces in [open directives](xref:microsoft.quantum.qsharp.namespaces#open-directives).

With this release, we no longer allow an array element to specify on the left side of a set statement.  This is because that syntax implies that arrays are mutable when in fact, the result of the operation has always been the creation of a new array with the modification.  Instead, a compiler error is generated with a suggestion to use the new copy-and-update operator, `w/`, to accomplish the same result.  

#### Library restructuring

This release reorganizes the libraries to enable their growth in a consistent way:

- Renames the Microsoft.Quantum.Primitive namespace  to Microsoft.Quantum.Intrinsic.  These operations are implemented by the target machine.  The Microsoft.Quantum.Primitive namespace is deprecated.  A runtime warning advises when programs call operations and functions using deprecated names.

- Renames the Microsoft.Quantum.Canon package to Microsoft.Quantum.Standard.  This package contains namespaces that are common to most Q# programs.  This includes:  
  - Microsoft.Quantum.Canon for common operations
  - Microsoft.Quantum.Arithmetic for general purpose arithmetic operations
  - Microsoft.Quantum.Preparation for operations used to prepare qubit state
  - Microsoft.Quantum.Simulation for simulation functionality

With this change, programs that include a single "open" statement for the namespace Microsoft.Quatum.Canon may find build errors if the program references operations that were moved to the other three new namespaces.  Adding the additional open statements for the three new namespaces is a straightforward way to resolve this issue.  

- Several namespaces have been deprecated as the operations within have been reorganized to other namespaces. Programs that use these namespaces continue to work, and a compile-time warning denotes the namespace where the operation is defined.  

- The Microsoft.Quantum.Arithmetic namespace has been normalized to use the <xref:Microsoft.Quantum.Arithmetic.LittleEndian> user-defined type. Use the function [BigEndianAsLittleEndian](xref:Microsoft.Quantum.Arithmetic.BigEndianAsLittleEndian) when needed to convert to little endian.  

- The names of several callables (functions and operations) have been changed to conform to the [Q# Style Guide](xref:microsoft.quantum.contributing-qdk.overview.style).  The old callable names are deprecated.  Programs that use the old callables continue to work with a compile-time warning.

#### New samples

We added a [sample of using Q# with F# driver](https://github.com/Microsoft/Quantum/pull/164).  

**"Thank you!"** to the following contributor to our open code base at https://github.com/Microsoft/Quantum. These contributions add to the rich samples of Q# code:

- Mathias Soeken ([@msoeken](https://github.com/msoeken)): Oracle function synthesis. [PR #135](https://github.com/Microsoft/Quantum/pull/135).

#### Migrating existing projects to 0.6.1905.

See the [install guide](xref:microsoft.quantum.install-qdk.overview) to update the QDK.
  
If you have existing Q# projects from version 0.5 of the Quantum Development Kit, the following are the steps to migrate those projects to the newest version.

1. Projects need to upgrade in order.  If you have a solution with multiple projects, update each project in the order they're referenced.
2. From a command prompt, Run `dotnet clean` to remove all existing binaries and intermediate files.
3. In a text editor, edit the `.csproj` file to change the version of all the `Microsoft.Quantum` `PackageReference` to version 0.6.1904, and change the `Microsoft.Quantum.Canon` package name to `Microsoft.Quantum.Standard`, for example:

    ```xml
    <PackageReference Include="Microsoft.Quantum.Standard" Version="0.6.1905.301" />
    <PackageReference Include="Microsoft.Quantum.Development.Kit" Version="0.6.1905.301" />
    ```
4. From the command prompt, run this command: `dotnet msbuild`  
5. After running this, you might still need to manually address errors because of the changes listed above.  In many cases, these errors are also reported by IntelliSense in Visual Studio or Visual Studio Code.
    - Open the root folder of the project or the containing solution in Visual Studio 2019 or Visual Studio Code.
    - After opening a `.qs` file in the editor, you should see the output of the Q# language extension in the output window.
    - After the project has loaded successfully (indicated in the output window), open each file and manually to address all remaining issues.

> [!NOTE]
> * For the 0.6 release, the language server included with the Quantum Development Kit does not support multiple workspaces.
> * In order to work with a project in Visual Studio Code, open the root folder containing the project itself and all referenced projects.
> * In order to work with a solution in Visual Studio, all projects contained in the solution must be in the same folder as the solution or in one of its subfolders.  
> * References between projects migrated to 0.6 and higher and projects using older package versions are **not** supported.

## QDK version 0.5.1904

### 2019-04-15

This release contains bug fixes.

## QDK version 0.5.1903

### 2019-03-27

This release contains the following:

- Adds support for Jupyter Notebook, which offers a great way to learn about Q#.  [Check out new Jupyter Notebook samples and learn how to write your own Notebooks](xref:microsoft.quantum.install-qdk.overview). 

- Adds integer adder arithmetic to the Quantum Canon library.  See also a Jupyter Notebook that [describes how to use the new integer adders](https://github.com/microsoft/Quantum/blob/main/samples/arithmetic/quantum-adders/AdderExample.ipynb).

- Bug fix for DumpRegister issue reported by the community ([#148](https://github.com/Microsoft/Quantum/issues/148)).

- Added ability to return from within a [using- and borrowing-statement](xref:microsoft.quantum.qsharp.quantummemorymanagement#quantum-memory-management).

- Revamped [getting started guide](xref:microsoft.quantum.install-qdk.overview).

## QDK version 0.5.1902

### 2019-02-27

This release contains the following:

- Adds support for a cross-platform Python host.  The `qsharp` package for Python makes it easy to simulate Q# operations and functions from within Python. Learn more about [Python interoperability](xref:microsoft.quantum.install-qdk.overview).

- The Visual Studio and Visual Studio Code extensions now support renaming of symbols (for example, functions and operations).

- The Visual Studio extension can now be installed on Visual Studio 2019.

## QDK version 0.4.1901

### 2019-01-30

This release contains the following:

- Adds support for a new primitive type, BigInt, which represents a signed integer of arbitrary size.  Learn more about [BigInt](xref:microsoft.quantum.qsharp.valueliterals#bigint-literals).
- Adds new Toffoli simulator, a special purpose fast simulator that can simulate X, CNOT and multi-controlled X quantum operations with large numbers of qubits.  Learn more about [Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator).
- Adds a simple resource estimator that estimates the resources required to run a given instance of a Q# operation on a quantum computer.  Learn more about the [Resource Estimator](xref:microsoft.quantum.machines.overview).