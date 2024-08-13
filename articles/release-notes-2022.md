---
title: Release notes for QDK and Azure Quantum - 2022
description: Learn about updates to the Microsoft Quantum Development Kit (QDK) and Azure Quantum in 2022.
ms.date: 11/17/2023
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, Basic measurement feedback, target, targets]
uid: microsoft.quantum.relnotes-qdk-2022
---

# Release notes for Quantum Development Kit (QDK) and Azure Quantum - 2022

This article outlines updates to the [Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview) and the [Azure Quantum service](xref:microsoft.quantum.azure-quantum-overview) in 2022.

## QDK version 0.27.244707

### 2022-12-07

- Azure Quantum now supports CCX native gates, this fixes GitHub issue [microsoft/qiskit-qir#19](https://github.com/microsoft/qiskit-qir/issues/19).
- Submitting a job to Azure Quantum now supports passing arrays from Python to Q#.

## QDK version 0.27.238334

### 2022-10-27

- Minor fixes.

## QDK version 0.27.236950

### 2022-10-24

- Made the DumpMachine consistent between the full-state simulator and sparse simulator by fixing a GitHub issue [microsoft/qsharp-runtime#1081](https://github.com/microsoft/qsharp-runtime/issues/1081) in Q# runtime.
- Honeywell provider and targets are no longer supported. Customers should use the Quantinuum provider and targets.

## QDK version 0.26.233415

### 2022-10-04

- Improved adherence to the Jupyter messaging protocol by fixing issue [microsoft/iqsharp#732](https://github.com/microsoft/iqsharp/issues/732).

## QDK version 0.26.232864

### 2022-09-28

- Added support for [Rigetti](xref:microsoft.quantum.providers.rigetti) in Azure Quantum, that includes the Rigetti [Aspen-M-2](xref:microsoft.quantum.providers.rigetti#aspen-m-2) and [Quantum Virtual Machine](xref:microsoft.quantum.providers.rigetti#simulators).
- Updated all Microsoft Quantum Development Kit components to Python 3.9.
- The [Quantinuum target names](xref:microsoft.quantum.providers.quantinuum) have been updated for clarity and consistency. The old target names continue to be available.
- Added support for multiple classical registers in Qiskit by addressing issues [microsoft/azure-quantum-python#361](https://github.com/microsoft/azure-quantum-python/issues/361) and [microsoft/azure-quantum-python#375](https://github.com/microsoft/azure-quantum-python/issues/375).
- Corrected the number of qubits for Quantinuum H1-2 target references by fixing [microsoft/azure-quantum-python#391](https://github.com/microsoft/azure-quantum-python/issues/391).

## Azure Quantum service update 2022-09-28

- Optimizations to reduce job submission time

## QDK version 0.25.228311

### 2022-09-01

- Added support for [IonQ Aria QPU](https://cloudblogs.microsoft.com/quantum/2022/08/16/ionq-aria-is-available-now-exclusively-on-azure-quantum/) in Azure Quantum.
- The operation `ApplyFunctionWithTableLookup` ([QuantumLibraries#607](https://github.com/microsoft/QuantumLibraries/issues/607)) has been added to the quantum libraries. This operation allows you to implement classical, real-valued functions up to a given precision using table lookup techniques. Thanks to Rajiv Krishnakumar (@rajkk1) for contributing this new feature to the Q# libraries.
- The FPGA hardware option for Microsoft QIO solvers has been deprecated.

## QDK version 0.25.222597

### 2022-07-26

- Added support for [IonQ Native Gates](https://ionq.com/docs/getting-started-with-native-gates) when creating a Qiskit job.
- Added two new operations [`SmallestFixedPoint` and `LargestFixedPoint`](https://github.com/microsoft/QuantumLibraries/issues/594) to compute the numerical value for the smallest and largest fixed point given a number of integer and fractional bits.
- Fixed Q# project loading for users of .NET 6.0.302 or above by addressing issue [qsharp-compiler/1470](https://github.com/microsoft/qsharp-compiler/issues/1470).
- Allowed the use of array items as steps of a ranged expression without causing a type-checking error by fixing [qsharp-compiler/1430](https://github.com/microsoft/qsharp-compiler/issues/1430).

## Azure Quantum service update 2022-07-26

- Improved the Azure Quantum Portal experience so that you can easily check how much [Azure Quantum Credits](xref:microsoft.quantum.credits) you have used, how much is remaining, and [quota](xref:microsoft.quantum.quotas) status if applicable.
- Added a new advanced sample that helps you explore the execution of hidden shift problems on a quantum computer.
- Prevented long waiting times by rejecting job submission if Target is in 'Unavailable' state.

## QDK version 0.25.218240

### 2022-06-28

- The latest version of the QDK has new magic commands for Q# Jupyter notebooks: [`%azure.target-capability`](/qsharp/api/iqsharp-magic/azure.target-capability), [`%qir`](/qsharp/api/iqsharp-magic/qir). The new commands allow you to target specific diagnostics and show in each notebook cell if the target is set.
- We've improved the Q# compiler diagnostics in Jupyter notebooks. Upon cell compilation, the compiler now points to lines that cause errors and warnings, and also directs you to Q# documentation for the given error or warning message.
- This release also adds support for continuous-angle rotations to the open systems simulator (for example, Microsoft.Quantum.Intrinsic.Rx and Microsoft.Quantum.Intrinsic.Exp), enabling the simulation of more Q# programs. For more information, see GitHub feature request [microsoft/qsharp-runtime#914](https://github.com/microsoft/qsharp-runtime/issues/914).
- All Microsoft QIO CPU solvers now support [squared linear combination](/azure/quantum/optimization-slc-term) terms and [protobuf binary format](/azure/quantum/optimization-problem#input-problem-serialization-to-protobuf-binary-format). Additionally, several solvers now benefit from performance improvements, resulting in reduced memory usage and shortened runtimes. These solvers only use input format `microsoft.qio.v2`, the default format for all problems submitted via the Azure Quantum Python SDK.
- The latest update also enables calling [Parity()](/qsharp/api/qsharp/microsoft.quantum.bitwise.parity) with a negative argument, fixing GitHub issue [microsoft/qsharp-runtime#993](https://github.com/microsoft/qsharp-runtime/issues/993).
- We've added a new Azure CLI quantum extension, version 0.16.0
  - Lastly, any providers participating in the ‘Credits for All’ program are automatically  added when you create a workspace with the CLI. See
[Azure Quantum Credits FAQ](/azure/quantum/credits-faq)

## QDK version 0.24.210930

### 2022-05-23

- In the May release, we've added names to access fields in `FixedPoint` user-defined type ([microsoft/QuantumLibraries#549](https://github.com/microsoft/QuantumLibraries/issues/549)).
- We've added two new operations `SubtractFxP` and `InvertFxP`. These allow you to subtract and invert quantum fixed-point numbers, respectively  ([microsoft/QuantumLibraries#555](https://github.com/microsoft/QuantumLibraries/issues/555)).
- The release has added utility functions to convert between floating-point and fixed-point representation [microsoft/QuantumLibraries#559](https://github.com/microsoft/QuantumLibraries/issues/559).
- Lastly, we've fixed issue [microsoft/azure-quantum-python#323](https://github.com/microsoft/azure-quantum-python/issues/323), addressing an apparent inconsistency in results returned by `job.result()` on a Qiskit job.

## Azure Quantum service update 2022-05-23

- The latest service update streamlines advanced creation flow for Azure Quantum workspaces in the Azure Portal.
- We've updated the default storage account type to general-purpose v2 (from general-purpose v1) to support modern storage account offerings and features when managing data.

## QDK version 0.24.208024

### 2022-04-29

- New this month, we've added a [large simulation sample](https://github.com/microsoft/Quantum/tree/main/samples/getting-started/simulation)
demonstrating the use of the sparse simulator.
- The release also includes a new Azure CLI quantum extension, version 0.15.0
- We've fixed the following GitHub issues:
  - The QDK now includes improved processing of Qiskit job data in the Azure Quantum Python SDK. This enables VQE scenarios and Qiskit Experiment's StateTomography. This fixes GitHub issues: [microsoft/azure-quantum-python#224](https://github.com/microsoft/azure-quantum-python/issues/224), [microsoft/azure-quantum-python#258](https://github.com/microsoft/azure-quantum-python/issues/258), [microsoft/azure-quantum-python#259](https://github.com/microsoft/azure-quantum-python/issues/259), and [microsoft/azure-quantum-python#263](https://github.com/microsoft/azure-quantum-python/issues/263).
  - The release implements GitHub issue [microsoft/QuantumLibraries#442](https://github.com/microsoft/QuantumLibraries/issues/442). The QDK now provides two new operations for a concise shorthand to control operations with a single qubit: `SinglyControlled` and `SinglyControlledA` .
  - [microsoft/QuantumLibraries#367](https://github.com/microsoft/QuantumLibraries/issues/367)  changes how variants of operations are counted in [AllowAtMostNCallsCA](/qsharp/api/qsharp/microsoft.quantum.diagnostics.allowatmostncallsca).
  - [microsoft/QuantumLibraries#546](https://github.com/microsoft/QuantumLibraries/issues/546) proposes an alternative for the use of `Default`, which is not advised.
 - [microsoft/QuantumLibraries#560](https://github.com/microsoft/QuantumLibraries/issues/560) addresses the wrong value being returned in the [MeasureFxP](/qsharp/api/qsharp/microsoft.quantum.arithmetic.measurefxp) operation when the measurement value corresponds to the smallest representable fixed point.
  - [azure/azure-cli-extensions#4697](https://github.com/azure/azure-cli-extensions/issues/4697) in the Azure CLI extension, which allows setting a polling interval when waiting for an Azure Quantum job to complete.

## Azure Quantum service update 2022-04-29

- The Azure portal now includes a [notebook](/azure/quantum/how-to-run-notebooks-workspace) for the [large simulation sample](https://github.com/microsoft/Quantum/blob/main/samples/getting-started/simulation/LargeSimulation.ipynb).

## QDK version 0.24.201332

### 2022-03-30

- In this month's release, we've added the [SparseSimulator](/azure/quantum/user-guide/machines/sparse-simulator) with discrete (sparse) states of the qubits. This simulator is more efficient for a class of quantum algorithms with a smaller number of states in superposition. It unlocks applications with a larger number of qubits than supported by QuantumSimulator.
- We've migrated the Quantum Development Kit from **.NETCore 3.1** to [.NET 6.0](https://dotnet.microsoft.com/download), and raised the minimum supported version accordingly.
- The release also updates the [Microsoft Quantum Development Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode) extension to support QDK versions based on .NET 6.
- There's a new marketplace extension: [Microsoft Quantum Development Kit for Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) extension.
- The new QDK includes performance improvements made for Q# notebooks and Q# + Python workflows.
- There's a new Azure CLI quantum extension, version 0.14.0, that includes the following:
    - Extended error message in failed jobs to include details originated from the provider.
    - Support during workspace creation for all storage account types allowed in the Azure Quantum service.
- This release addresses the following GitHub issues:
  - [microsoft/qsharp-runtime#967](https://github.com/microsoft/qsharp-runtime/issues/967) where decomposition of the [Exp operation](/qsharp/api/qsharp/microsoft.quantum.intrinsic.exp) in Q# programs submitted to IonQ targets would use the incorrect angle convention resulting in incorrect rotation.
  -[microsoft/iqsharp#606](https://github.com/microsoft/iqsharp/issues/606) where lambda expressions couldn't be used in Q# programs that are called from Python, including Jupyter notebooks.
  - [microsoft/QuantumLibraries#511](https://github.com/microsoft/QuantumLibraries/issues/511) where the reflection phases for amplitude estimation were calculated incorrectly.
  -[microsoft/QuantumLibraries#527](https://github.com/microsoft/QuantumLibraries/issues/527) where the [RangeAsIntArray](/qsharp/api/qsharp/microsoft.quantum.convert.rangeasintarray) function returned a wrong value for a corner case.
-[microsoft/QuantumLibraries#494](https://github.com/microsoft/QuantumLibraries/issues/494) where the qdk-chem tool produced invalid Broombridge files.
  -[microsoft/QuantumLibraries#386](https://github.com/microsoft/QuantumLibraries/issues/386) where the [AllowAtMostNCallsCA](/qsharp/api/qsharp/microsoft.quantum.diagnostics.allowatmostncallsca) operation failed nondeterministically.
  -[microsoft/qsharp-runtime#929](https://github.com/microsoft/qsharp-runtime/issues/929) where the empty quantum program was causing an exception when submitted to Azure Quantum.
- [microsoft/QuantumLibraries#444](https://github.com/microsoft/QuantumLibraries/issues/444) where tests failed probabilistically.
  - Fixed GitHub issue [microsoft/QuantumLibraries#270](https://github.com/microsoft/QuantumLibraries/issues/270) where the number of qubits was overestimated in the machine learning library.


## Azure Quantum service update 2022-03-30

- We have [streamlined](xref:microsoft.quantum.how-to.workspace) workspace creation and the navigation experience in Azure portal and have added a portal [notebook](xref:microsoft.quantum.how-to.notebooks) sample for the hidden shift scenario. 

## QDK version 0.23.198514-beta (Preview)

### 2022-03-15

- We've released [Microsoft Quantum Development Kit for Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) as preview.

## QDK version 0.23.195983

### 2022-03-02

- This release addresses the following GitHub issues:
  - [microsoft/qsharp-compiler#1235](https://github.com/microsoft/qsharp-compiler/issues/1235), Visual Studio and Visual Studio Code extensions no longer throw an unhandled exception if the .NET SDK isn't found. The Language Server falls back to purely syntactic diagnostics.
  - Q# now supports lambda expressions. See the [Q# language documentation](https://github.com/microsoft/qsharp-compiler/issues/1113) for information about how to use them.
  - [microsoft/qsharp-compiler#1300](https://github.com/microsoft/qsharp-compiler/issues/1300) - This fixes the issue where the Q# compiler would log an exception in addition to an error message for operations that return a non-unit type when incorrectly defined as adjointable and/or controllable.
  - [microsoft/qsharp-compiler#1346](https://github.com/microsoft/qsharp-compiler/issues/1346) - Fixes the issue where the Q# Formatter was removing parentheses around for-loop conditions without ensuring spacing around the condition.
  -[microsoft/qsharp-compiler#1289](https://github.com/microsoft/qsharp-compiler/issues/1289) - Improves the usability of the Q# Formatter by outputting a summary of its changes to console and not overwriting unchanged files.
  - We've improved the error message you get when trying to run a sample before adding a provider to your Azure Quantum workspace ([link](https://aka.ms/AQ/Docs/AddProvider)) on how to add a new provider.
  - Breaking change: [microsoft/azure-quantum-python#269](https://github.com/microsoft/azure-quantum-python/issues/269) - You can now pass `shots` to `backend.run` and `backend.estimate_cost` for all backends in the azure-quantum Python package.
  - [microsoft/azure-quantum-python#248](https://github.com/microsoft/azure-quantum-python/issues/248) - This change applies to the Qiskit plugin of the azure-quantum Python package. The total number of counts in the histogram now matches the total number of shots.
  - We've removed the UserWarning when initializing a solver job sent to Toshiba SimulatedBifurcationMachine.
  - Breaking change: The compress flag was removed from problem, solvers and streaming_problem classes. The compress parameter can no longer be set in `solvers.problem` or `streaming_problem` objects and methods.
  - [microsoft/qsharp-compiler#1046](https://github.com/microsoft/qsharp-compiler/issues/1046) and [microsoft/qsharp-compiler#1352](https://github.com/microsoft/qsharp-compiler/issues/1352) - These fixes are related to QIR generation. The first fixes an issue when generating big integer literals with more than 64 bits. The second change addresses potential runtime failures caused by using a new array expression to create an array of callables.
  - We've added support for the [Quantinuum Provider](xref:microsoft.quantum.providers.quantinuum), which replaces the Honeywell Provider.
  - Breaking change: The QuantumSimulator has been refactored. If you use the `StateDumper::Callback()` directly, then you need to update that code.

#### Known Issues

- Q# lambda functions and operations don't compile properly in Q# Jupyter notebooks or from Q# + Python applications, as tracked by [microsoft/iqsharp#606](https://github.com/microsoft/iqsharp/issues/606).

## QDK version 0.22.189218-beta (Preview)

### 2022-02-01

- Adding support for .NET 6.0 to the Quantum Development Kit.
- Updating the minimum required version for the Quantum Development Kit extensions to .NET 6.0.
- Q# Compiler uses LLVM 13 binaries for producing QIR.
- Released Microsoft Quantum Development Kit for Visual Studio Code .NET 6 Preview. (**Update:** *This extension preview has now been retired and its changes have been incorporated into the regular [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).*)

## QDK version 0.22.187631

### 2022-01-26

- The :::no-loc text="Full state::: Simulator has been migrated from the platform-specific compiler to Clang to fix [GitHub issue #876](https://github.com/microsoft/qsharp-runtime/issues/876). 
- When submitting a job to Azure Quantum via the CLI, Python, IQ# and other Azure Quantum SDKs, the job details may include the cost estimate of the job (if supported by the provider). The final cost on your bill might be slightly different due to added taxes and currency conversion rates. 
- You can now estimate the price of your job in azure-quantum package by using `estimate_cost` for the target that you're using with the Qiskit, Cirq and pass-through feature.
- The azure-quantum package now supports submitting Qiskit lists of length 1. 
- Fixed GitHub issue [microsoft/azure-quantum-python#198](https://github.com/microsoft/azure-quantum-python/issues/198) in the azure-quantum package where the Qiskit jobs were causing incorrect results in circuits with helper qubits.
- In azure-quantum package, the perform_icm parameter of the 1QBit `PticmSolver` was deprecated, using it now returns a deprecation warning. A `seed` parameter was added to all other 1QBit solvers that specifies a random seed.
- Fixed GitHub issue [microsoft/azure-quantum-python#178](https://github.com/microsoft/azure-quantum-python/issues/178) in the azure-quantum package so errors returned by the Azure Quantum service when using the Qiskit or Cirq feature are now propagated up.
- Fixed GitHub issue [microsoft/qsharp-compiler#1297](https://github.com/microsoft/qsharp-compiler/issues/1297) where the IntelliSense information wasn't updated when the ExecutionTarget property was modified in the project file.