---
title: Release notes
description: Learn about the latest updates to the Microsoft Quantum Development Kit (QDK) and Azure Quantum.
ms.date: 10/27/2022
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
uid: microsoft.quantum.relnotes-qdk
---

# Quantum Development Kit (QDK) and Azure Quantum release notes

This article outlines updates to the [Quantum Development Kit (QDK)](xref:microsoft.quantum.overview.q-sharp) and the [Azure Quantum service](xref:microsoft.quantum.azure-quantum-overview).

For 'getting started' instructions, see [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview). For instructions on how to update your QDK to the latest version, see [Update the Quantum Development Kit (QDK) to the latest version](xref:microsoft.quantum.update-qdk).

## 2022-10-27

### QDK version 0.27.238334

- Minor fixes.

## 2022-10-24

### QDK version 0.27.236950

- Made the DumpMachine consistent between the full-state simulator and sparse simulator by fixing a GitHub issue [microsoft/qsharp-runtime#1081](https://github.com/microsoft/qsharp-runtime/issues/1081) in Q# runtime.
- Honeywell provider and targets are no longer supported. Customers should use the Quantinuum provider and targets. See more at [Honeywell to Quantinuum migration guide](xref:microsoft.quantum.providers.honeywell.migration).

## 2022-10-04

### QDK version 0.26.233415

- Improved adherence to the Jupyter messaging protocol by fixing issue [microsoft/iqsharp#732](https://github.com/microsoft/iqsharp/issues/732).

## 2022-09-28

### QDK version 0.26.232864

- Added support for [Rigetti](xref:microsoft.quantum.providers.rigetti) in Azure Quantum, that includes the Rigetti [Aspen-M-2](xref:microsoft.quantum.providers.rigetti#aspen-m-2), [Aspen-11](xref:microsoft.quantum.providers.rigetti#aspen-11) and [Quantum Virtual Machine](xref:microsoft.quantum.providers.rigetti#simulators).
- Updated all Microsoft Quantum Development Kit components to Python 3.9.
- The [Quantinuum target names](xref:microsoft.quantum.providers.quantinuum) have been updated for clarity and consistency. The old target names will continue to be available.
- Added support for multiple classical registers in Qiskit by addressing issues [microsoft/qdk-python#361](https://github.com/microsoft/qdk-python/issues/361) and [microsoft/qdk-python#375](https://github.com/microsoft/qdk-python/issues/375).
- Corrected the number of qubits for Quantinuum H1-2 target references by fixing [microsoft/qdk-python#391](https://github.com/microsoft/qdk-python/issues/391).

### Azure Quantum service update

- Optimizations to reduce job submission time

## 2022-09-01

### QDK version 0.25.228311

- Added support for [IonQ Aria QPU](https://cloudblogs.microsoft.com/quantum/2022/08/16/ionq-aria-is-available-now-exclusively-on-azure-quantum/) in Azure Quantum.
- The operation `ApplyFunctionWithTableLookup` ([QuantumLibraries#607](https://github.com/microsoft/QuantumLibraries/issues/607)) has been added to the quantum libraries. This operation allows you to implement classical, real-valued functions up to a given precision using table lookup techniques. Thanks to Rajiv Krishnakumar (@rajkk1) for contributing this new feature to the Q# libraries.
- The FPGA hardware option for Microsoft QIO solvers has been deprecated. Migration details can be found in the [Simulated Annealing solver documentation](xref:microsoft.quantum.optimization.simulated-annealing#simulated-annealing-fpga---deprecated).

## 2022-07-26

### QDK version 0.25.222597

- Added support for [IonQ Native Gates](https://ionq.com/docs/getting-started-with-native-gates) when creating a Qiskit job.
- Added two new operations [`SmallestFixedPoint` and `LargestFixedPoint`](https://github.com/microsoft/QuantumLibraries/issues/594) to compute the numerical value for the smallest and largest fixed point given a number of integer and fractional bits.
- Fixed Q# project loading for users of .NET 6.0.302 or above by addressing issue [qsharp-compiler/1470](https://github.com/microsoft/qsharp-compiler/issues/1470).
- Allowed the use of array items as steps of a ranged expression without causing a type-checking error by fixing [qsharp-compiler/1430](https://github.com/microsoft/qsharp-compiler/issues/1430).

### Azure Quantum service update

- Improved the Azure Quantum Portal experience so that you can easily check how much [Azure Quantum Credits](xref:microsoft.quantum.credits) you have used, how much is remaining, and [quota](xref:microsoft.quantum.quotas) status if applicable.
- Added a new advanced sample that will help you explore the execution of hidden shift problems on a quantum computer.
- Prevented long waiting times by rejecting job submission if Target is in 'Unavailable' state.

## 2022-06-28

### QDK version 0.25.218240

- The latest version of the QDK has new magic commands for Q# Jupyter notebooks: [`%azure.target-capability`](/qsharp/api/iqsharp-magic/azure.target-capability), [`%qir`](/qsharp/api/iqsharp-magic/qir). The new commands will allow you to target specific diagnostics and will show in each notebook cell if the target is set.
- We've improved the Q# compiler diagnostics in Jupyter notebooks. Upon cell compilation, the compiler will now point to lines that cause errors and warnings, and will also direct you to Q# documentation for the given error or warning message.
- This release also adds support for continuous-angle rotations to the open systems simulator (e.g. Microsoft.Quantum.Intrinsic.Rx and Microsoft.Quantum.Intrinsic.Exp), enabling the simulation of more Q# programs. See GitHub feature request [microsoft/qsharp-runtime#914](https://github.com/microsoft/qsharp-runtime/issues/914) for more details.
- All Microsoft QIO CPU solvers now support [squared linear combination](/azure/quantum/optimization-slc-term) terms and [protobuf binary format](/azure/quantum/optimization-problem#input-problem-serialization-to-protobuf-binary-format). Additionally, several solvers now benefit from performance improvements, resulting in reduced memory usage and shortened runtimes. These solvers only use input format `microsoft.qio.v2`, the default format for all problems submitted via the Azure Quantum Python SDK.
- The latest update also enables calling [Parity()](/qsharp/api/qsharp/microsoft.quantum.bitwise.parity) with a negative argument, fixing GitHub issue [microsoft/qsharp-runtime#993](https://github.com/microsoft/qsharp-runtime/issues/993).
- We've added a new Azure CLI quantum extension, version 0.16.0
  - Lastly, any providers participating in the ‘Credits for All’ program will be automatically  added when you create a workspace with the CLI. See
[Azure Quantum Credits FAQ](/azure/quantum/credits-faq)

## 2022-05-23

### QDK version 0.24.210930

- In the May release, we've added names to access fields in `FixedPoint` user-defined type ([microsoft/QuantumLibraries#549](https://github.com/microsoft/QuantumLibraries/issues/549)).
- We've added two new operations `SubtractFxP` and `InvertFxP`. These will allow you to subtract and invert quantum fixed-point numbers, respectively  ([microsoft/QuantumLibraries#555](https://github.com/microsoft/QuantumLibraries/issues/555)).
- The release has added utility functions to convert between floating-point and fixed-point representation [microsoft/QuantumLibraries#559](https://github.com/microsoft/QuantumLibraries/issues/559).
- Lastly, we've fixed issue [microsoft/qdk-python#323](https://github.com/microsoft/qdk-python/issues/323), addressing an apparent inconsistency in results returned by `job.result()` on a Qiskit job.

### Azure Quantum service update

- The latest service update streamlines advanced creation flow for Azure Quantum workspaces in the Azure Portal.
- We've updated the default storage account type to general-purpose v2 (from general-purpose v1) to support modern storage account offerings and features when managing data.

## 2022-04-29

### QDK version 0.24.208024

- New this month, we've added a [large simulation sample](https://github.com/microsoft/Quantum/tree/main/samples/getting-started/simulation)
demonstrating the use of the sparse simulator.
- The release also includes a new Azure CLI quantum extension, version 0.15.0
- We've fixed the following GitHub issues:
  - The QDK now includes improved processing of Qiskit job data in the Azure Quantum Python SDK. This enables VQE scenarios and Qiskit Experiment's StateTomography. This fixes GitHub issues: [microsoft/qdk-python#224](https://github.com/microsoft/qdk-python/issues/224), [microsoft/qdk-python#258](https://github.com/microsoft/qdk-python/issues/258), [microsoft/qdk-python#259](https://github.com/microsoft/qdk-python/issues/259), and [microsoft/qdk-python#263](https://github.com/microsoft/qdk-python/issues/263).
  - The release implements GitHub issue [microsoft/QuantumLibraries#442](https://github.com/microsoft/QuantumLibraries/issues/442). The QDK now provides two new operations for a concise shorthand to control operations with a single qubit: `SinglyControlled` and `SinglyControlledA` .
  - [microsoft/QuantumLibraries#367](https://github.com/microsoft/QuantumLibraries/issues/367)  changes how variants of operations are counted in [AllowAtMostNCallsCA](/qsharp/api/qsharp/microsoft.quantum.diagnostics.allowatmostncallsca).
  - [microsoft/QuantumLibraries#546](https://github.com/microsoft/QuantumLibraries/issues/546) proposes an alternative for the use of `Default`, which is not advised.
 - [microsoft/QuantumLibraries#560](https://github.com/microsoft/QuantumLibraries/issues/560) addresses the wrong value being returned in the [MeasureFxP](/qsharp/api/qsharp/microsoft.quantum.arithmetic.measurefxp) operation when the measurement value corresponds to the smallest representable fixed point.
  - [azure/azure-cli-extensions#4697](https://github.com/azure/azure-cli-extensions/issues/4697) in the Azure CLI extension, which allows setting a polling interval when waiting for an Azure Quantum job to complete.

### Azure Quantum service update

- The Azure portal now includes a [notebook](/azure/quantum/how-to-run-notebooks-workspace) for the [large simulation sample](https://github.com/microsoft/Quantum/blob/main/samples/getting-started/simulation/LargeSimulation.ipynb).

## 2022-03-30

### QDK version 0.24.201332

- In this month's release, we've added the [SparseSimulator](/azure/quantum/user-guide/machines/sparse-simulator) with discrete (sparse) states of the qubits. This simulator is more efficient for a class of quantum algorithms with a smaller number of states in superposition. It unlocks applications with a larger number of qubits than supported by QuantumSimulator.
- We've migrated the Quantum Development Kit from **.NETCore 3.1** to [.NET 6.0](https://dotnet.microsoft.com/download), and raised the minimum supported version accordingly.
- The release also updates the [Microsoft Quantum Development Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode) extension to support QDK versions based on .NET 6.
- There's a new marketplace extension: [Microsoft Quantum Development Kit for Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) extension.
- The new QDK includes performance improvements made for Q# notebooks and Q# + Python workflows.
- There's a new Azure CLI quantum extension, version 0.14.0, that includes the following:
    - Extended error message in failed jobs to include details originated from the provider.
    - Support during workspace creation for all storage account types allowed in the Azure Quantum service.
- This release addresses the following GitHub issues:
  - [microsoft/qsharp-runtime#967](https://github.com/microsoft/qsharp-runtime/issues/967) where decomposition of the [Exp operation](/qsharp/api/qsharp/microsoft.quantum.intrinsic.exp)in Q# programs submitted to IonQ targets would use the incorrect angle convention resulting in incorrect rotation.
  -[microsoft/iqsharp#606](https://github.com/microsoft/iqsharp/issues/606) where lambda expressions couldn't be used in Q# programs that are called from Python, including Jupyter notebooks.
  - [microsoft/QuantumLibraries#511](https://github.com/microsoft/QuantumLibraries/issues/511) where the reflection phases for amplitude estimation were calculated incorrectly.
  -[microsoft/QuantumLibraries#527](https://github.com/microsoft/QuantumLibraries/issues/527) where the [RangeAsIntArray](/qsharp/api/qsharp/microsoft.quantum.convert.rangeasintarray) function returned a wrong value for a corner case.
-[microsoft/QuantumLibraries#494](https://github.com/microsoft/QuantumLibraries/issues/494) where the [qdk-chem tool](xref:microsoft.quantum.libraries.overview-chemistry.concepts.installation#using-the-quantum-development-kit-with-qdk-chem) produced invalid Broombridge files.
  -[microsoft/QuantumLibraries#386](https://github.com/microsoft/QuantumLibraries/issues/386) where the [AllowAtMostNCallsCA](/qsharp/api/qsharp/microsoft.quantum.diagnostics.allowatmostncallsca) operation failed non-deterministically.
  -[microsoft/qsharp-runtime#929](https://github.com/microsoft/qsharp-runtime/issues/929) where the empty quantum program was causing an exception when submitted to Azure Quantum.
- [microsoft/QuantumLibraries#444](https://github.com/microsoft/QuantumLibraries/issues/444) where tests failed probabilistically.
  - Fixed GitHub issue [microsoft/QuantumLibraries#270](https://github.com/microsoft/QuantumLibraries/issues/270) where the number of qubits was overestimated in the [machine learning library](xref:microsoft.quantum.libraries.overview.machine-learning.intro).


### Azure Quantum service update

- We've [streamlined](xref:microsoft.quantum.how-to.workspace) workspace creation and the navigation experience in Azure portal and have added a portal [notebook](xref:microsoft.quantum.how-to.notebooks) sample for the hidden shift scenario. 

## 2022-03-15

### QDK version 0.23.198514-beta (Preview)

- We've released [Microsoft Quantum Development Kit for Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) as preview.

## 2022-03-02

### QDK version 0.23.195983

- This release addresses the following GitHub issues:
  - [microsoft/qsharp-compiler#1235](https://github.com/microsoft/qsharp-compiler/issues/1235), Visual Studio and Visual Studio Code extensions no longer throw an unhandled exception if the .NET SDK isn't found. The Language Server will fall back to purely syntactic diagnostics.
  - Q# now supports lambda expressions. See the [Q# language documentation](https://github.com/microsoft/qsharp-compiler/issues/1113) for information about how to use them.
  - [microsoft/qsharp-compiler#1300](https://github.com/microsoft/qsharp-compiler/issues/1300) - This fixes the issue where the Q# compiler would log an exception in addition to an error message for operations that return a non-unit type when incorrectly defined to be adjointable and/or controllable.
  - [microsoft/qsharp-compiler#1346](https://github.com/microsoft/qsharp-compiler/issues/1346) - Fixes the issue where the Q# Formatter was removing parentheses around for-loop conditions without ensuring spacing around the condition.
  -[microsoft/qsharp-compiler#1289](https://github.com/microsoft/qsharp-compiler/issues/1289) - Improves the usability of the Q# Formatter by outputting a summary of its changes to console and not overwriting unchanged files.
  - We've improved the error message you get when trying to run a sample before adding a provider to your Azure Quantum workspace ([link](https://aka.ms/AQ/Docs/AddProvider)) on how to add a new provider.
  - Breaking change: [microsoft/qdk-python#269](https://github.com/microsoft/qdk-python/issues/269) - You can now pass `shots` to `backend.run` and `backend.estimate_cost` for all backends in the azure-quantum Python package.
  - [microsoft/qdk-python#248](https://github.com/microsoft/qdk-python/issues/248) - This change applies to the Qiskit plugin of the azure-quantum Python package. The total number of counts in the histogram now matches the total number of shots.
  - We've removed the UserWarning when initializing a solver job sent to Toshiba SimulatedBifurcationMachine.
  - Breaking change: The compress flag was removed from problem, solvers and streaming_problem classes. The compress parameter can no longer be set in `solvers.problem` or `streaming_problem` objects and methods.
  - [microsoft/qsharp-compiler#1046](https://github.com/microsoft/qsharp-compiler/issues/1046) and [microsoft/qsharp-compiler#1352](https://github.com/microsoft/qsharp-compiler/issues/1352) - These fixes are related to QIR generation. The first fixes an issue when generating big integer literals with more than 64 bits. The second change addresses potential runtime failures caused by using a new array expression to create an array of callables.
  - We've added support for the [Quantinuum Provider](xref:microsoft.quantum.providers.quantinuum), which replaces the Honeywell Provider.
  - Breaking change: The QuantumSimulator has been refactored. If you use the `StateDumper::Callback()` directly, then you'll need to update that code.

#### Known Issues

- Q# lambda functions and operations don't compile properly in Q# Jupyter notebooks or from Q# + Python applications, as tracked by [microsoft/iqsharp#606](https://github.com/microsoft/iqsharp/issues/606).

## 2022-02-01

### QDK version 0.22.189218-beta (Preview)

- Adding support for .NET 6.0 to the Quantum Development Kit.
- Updating the minimum required version for the Quantum Development Kit extensions to .NET 6.0.
- Q# Compiler uses LLVM 13 binaries for producing QIR.
- Released Microsoft Quantum Development Kit for Visual Studio Code .NET 6 Preview. (**Update:** *This extension preview has now been retired and its changes have been incorporated into the regular [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).*)

## 2022-01-26

### QDK version 0.22.187631

- The Full State Simulator has been migrated from the platform-specific compiler to Clang to fix [GitHub issue #876](https://github.com/microsoft/qsharp-runtime/issues/876). 
- When submitting a job to Azure Quantum via the CLI, Python, IQ# and other Azure Quantum SDKs, the job details may include the cost estimate of the job (if supported by the provider). The final cost on your bill might be slightly different due to added taxes and currency conversion rates. 
- You can now estimate the price of your job in azure-quantum package by using [estimate_cost](xref:microsoft.quantum.quickstarts.computing.provider.portal#estimate-job-cost) for the target that you're using with the Qiskit, Cirq and pass-through feature.
- The azure-quantum package now supports submitting Qiskit lists of length 1. 
- Fixed GitHub issue [microsoft/qdk-python#198](https://github.com/microsoft/qdk-python/issues/198) in the azure-quantum package where the Qiskit jobs were causing incorrect results in circuits with helper qubits.
- In azure-quantum package, the perform_icm parameter of the 1QBit `PticmSolver` was deprecated, using it will now return a deprecation warning. A `seed` parameter was added to all other 1QBit solvers that specifies a random seed.
- Fixed GitHub issue [microsoft/qdk-python#178](https://github.com/microsoft/qdk-python/issues/178) in the azure-quantum package so errors returned by the Azure Quantum service when using the Qiskit or Cirq feature are now propagated up.
- Fixed GitHub issue [microsoft/qsharp-compiler#1297](https://github.com/microsoft/qsharp-compiler/issues/1297) where the IntelliSense information wasn't updated when the ExecutionTarget property was modified in the project file.

## 2021-12-14

### QDK version 0.21.2112.180703

- Released Azure CLI quantum extension version 0.11.0: Job result histograms will be left-aligned (not centered) in console output.

## 2021-11-23

### QDK version 0.21.2111.177148

- Added a [Q# formatter](https://github.com/microsoft/qsharp-compiler/tree/main/src/QsFmt) to update deprecated Q# syntax and basic formatting for Q# projects with QDK version **0.21.2111.177148** and up:
  - You need to update the QDK version in the `<Project>` tag of your `.csproj` file to use the Q# formatter.
  - You can use the Q# formatter via Visual Studio by clicking on the **Edit -> Advanced -> Format Document** menu item. Via Visual Studio Code, you can format your code by right-clicking on the code you want to format, and clicking on the **Format Document** menu item.
  - Added a build target, UpdateSyntax, for updating deprecated syntax in a Q# project. This target can be used with `dotnet msbuild -t:UpdateSyntax` at a command prompt.
  - Added Code Actions to automatically update deprecated syntax.
- Added support for submitting problems to a subset of Microsoft targets in [protobuf binary format](xref:microsoft.quantum.optimization.problem#input-problem-serialization-to-protobuf-binary-format). You can use it for encoding significantly larger problems by reducing the payload sizes, and improve upload and processing speeds.
- **Breaking change:** The [deserialize](xref:microsoft.quantum.optimization.problem#problemserialize) class method of the Problem class has a parameter name change from `problem_as_json` to `input_problem` to support deserialization of protobuf.

## 2021-10-26

### QDK version 0.20.2110.171573

- IQ# kernel [%azure.connect](/qsharp/api/iqsharp-magic/azure.connect) command no longer sets "West US" as the default location. Location parameter is now required.
- The `azure-quantum` package now supports asynchronous I/O via the new `azure.quantum.aio` package. For more information, see [Solve a batch of problems](xref:microsoft.quantum.optimization.async-io).
- Fixed an [issue](https://github.com/microsoft/qdk-python/issues/160): Qiskit jobs fetched with `AzureQuantumProvider.get_job()` can now use `job.result()` without running into a `KeyError`.
- Fixed an [issue](https://github.com/microsoft/qdk-python/issues/164) that caused `azure.quantum.cirq` and `azure.quantum.qiskit` not to be recognized by [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance). The `azure.quantum.plugins` package is deprecated and will be removed next release.  
- Fixed an [issue](https://github.com/microsoft/iqsharp/issues/531) in IQ# in which job execution would fail if any operation defined in an external file wasn't supported on the given target.
- Fixed an [issue](https://github.com/microsoft/qsharp-compiler/issues/1163) in the Visual Studio extension that caused incorrect indentation in some cases when a closing bracket was typed.
- Refactored the [quantum intermediate representation (QIR) runtime](https://www.nuget.org/packages/Microsoft.Quantum.Qir.Runtime) DLLs to use static VC runtime, removing dependency on msvcrt.dll and Visual Studio installation.
- Refactored [QIR Runtime](https://www.nuget.org/packages/Microsoft.Quantum.Qir.Runtime) to use `intptr_t` for Qubit ID types consistently.
- Updated Azure CLI Extensions to version 0.9.0.

## 2021-09-28

### QDK version 0.19.2109.165653

- Added support for submitting [Cirq](/azure/quantum/quickstart-microsoft-cirq) and [Qiskit](/azure/quantum/quickstart-microsoft-qiskit) circuits to IonQ and Quantinuum.
- Conda packages have been moved from the quantum-engineering channel to the microsoft channel. When using conda to install the Quantum Development Kit for Q# notebook or Q# + Python usage, the `-c quantum-engineering` argument to conda should be changed to `-c microsoft`, and the `channels` section of environment.yml files should be updated. See the [getting started guide](xref:microsoft.quantum.install-qdk.overview) for the full install command using the new packages.
- You can formulate PUBO and Ising problems using [squared linear terms](/azure/quantum/optimization-slc-term) natively on the PA and SSMC solvers.
- Fixed [issue](https://github.com/microsoft/qsharp-compiler/issues/1089) with memory management and improved reliability for QIR generation: [1152](https://github.com/microsoft/qsharp-compiler/issues/1152) and [1086](https://github.com/microsoft/qsharp-compiler/issues/1086).
- Fixed [issue](https://github.com/microsoft/qdk-python/issues/147) related to `Workspace.get_targets()`. It now returns all available targets in the subscription, even those that don't have client-side support.
- Fixed issues with Q# compiler's diagnostics appearing in incorrect places: [1133](https://github.com/microsoft/qsharp-compiler/issues/1133) and [1172](https://github.com/microsoft/qsharp-compiler/issues/1172).
- **Breaking change:** The order of arguments in `ApplyIf`, `ApplyIfA`, `ApplyIfC`, and `ApplyIfCA` [has been changed](https://github.com/microsoft/QuantumLibraries/issues/377) to be consistent with related operations such as `ApplyIfElseB` and [Q# API design principles](/azure/quantum/contributing-api-design-principles).
- `Problem.serialize()` of the `azure.quantum.optimization` Python package now serializes the name of the Optimization Problem in a new optional metadata field, so you don't have to specify it again when deserializing the problem as detailed in this [issue](https://github.com/microsoft/qdk-python/issues/153).
- Released Azure CLI quantum extension version 0.8.0: Users will receive recommendation at most once a day, to update the az quantum extension if the version installed is out-of-date.

## 2021-09-10

### QDK version 0.18.2109.162713

- Fixes an [issue](https://github.com/microsoft/iqsharp/issues/517) that sometimes resulted in kernel crash in online Quantum Katas. No customer impact since online Katas stayed with the older QDK version.

## 2021-09-01

### QDK version 0.18.2108.160999

- Fixed an issue where required metadata was missing for the [Microsoft.Quantum.Qir.Runtime](https://www.nuget.org/packages/Microsoft.Quantum.Qir.Runtime) NuGet package.

## 2021-08-31

### QDK version 0.18.2108.160310

- Alternative operation in [@SubstitutableOnTarget](/qsharp/api/qsharp/microsoft.quantum.targeting.substitutableontarget) doesn't need to be explicitly referred to anymore in [Microsoft.Quantum.AutoSubstitution](https://www.nuget.org/packages/Microsoft.Quantum.AutoSubstitution/) NuGet package.
- New [Workspace.get_targets()](xref:microsoft.quantum.optimization.workspace#workspaceget_targets) method in azure-quantum package that returns a list of all available targets. Can filter by Provider ID or Target ID.
- An [issue](https://github.com/microsoft/iqsharp/issues/500) was resolved that prevented using IQ# or the `qsharp` Python package with Python 3.8 or 3.9 when using `conda`.
- Fixed an [issue](https://github.com/microsoft/qsharp-compiler/issues/768) where nested Conditional blocks may be incorrectly lifted.
- Resolved an [issue](https://github.com/microsoft/qsharp-compiler/issues/1112) where some code failed to compile previously for Quantinuum target.
- Added an option where QIR generation isn't target specific.
- Fixed a concurrency [bug](https://github.com/microsoft/qsharp-runtime/pull/798) that could cause intermittent crashes if multiple simulator instances are run in the same process.
- Released Azure CLI quantum extension version 0.7.0:
  - Provide compiler output to users if there was error for easier troubleshooting.
  - Fixed bug in which retrieving output from workspaces in a location different to another set as default failed.
  - Processing jobs that produce no output is allowed.

## 2021-07-27

### QDK version 0.18.2107.153439

- You can filter by job name, job status, and job creation time when listing jobs in azure-quantum.
- Fixed [regression](https://github.com/microsoft/qsharp-compiler/issues/1067) in Code Actions because of incompatibility with protocol in VS 16.10.x versions.
- Improved error message on IQ# `%azure.*` magic commands when no quantum computing targets are available.
- `azure-quantum` Python package fixes an [issue](https://github.com/microsoft/qdk-python/issues/80) with MSAL Credentials on Windows and now requires minimum versions for all dependencies to mitigate other potential issues with older dependencies.
- Fixed a [bug in IQ#](https://github.com/microsoft/iqsharp/issues/448) in which job execution would fail if any operation was defined that wasn't supported on the given target.
- Fixed a [bug in IQ#](https://github.com/microsoft/iqsharp/issues/484) in which some programs targeting hardware that supports the [Basic Measurement Feedback profile](xref:microsoft.quantum.target-profiles) were incorrectly being reported as not supported by the Azure Quantum target.
- Released Azure CLI quantum extension version 0.6.1:
  - Added command to request job cancellation: `az quantum job cancel`.
  - Fixed a bug in which job submissions in Azure Quantum that emit standard output were reported as failed, even if the job succeeded.
  - Enabled job submissions from a different directory using `--project` parameter.

### Azure Quantum service update

- Parameter Free Population Annealing solver is now available through the Early Access plan in Azure Quantum. To sign up for early access, see [Apply for Azure Quantum Early Access](https://aka.ms/aq/preview).
- Terms banner in Review tab in Azure Quantum portal is hidden when only Microsoft provider is being added during workspace creation.

## 2021-06-25

### QDK version 0.18.2106.148911

- You can now [configure](xref:microsoft.quantum.optimization.apply-solver#returning-multiple-solutions) how many solutions you want returned from a solver run.
- A new NuGet package [Microsoft.Quantum.AutoSubstitution](https://www.nuget.org/packages/Microsoft.Quantum.AutoSubstitution/), which when added to a Q# project, allows you to annotate operations with the `SubstitutableOnTarget(AltOp, Sim)` attribute. It will then call `AltOp` instead of the annotated operation, whenever it's executed using `Sim`.
- Integration with Azure-Identity provides more mechanisms to [authenticate](xref:microsoft.quantum.iqsharp.magic-ref.azure.connect) with Azure.
- The .NET [Microsoft.Azure.Management.Quantum](https://www.nuget.org/packages/Microsoft.Azure.Management.Quantum) now returns the Restricted Access URL so you can know more/apply for a restricted access plan.
- Preview support for noisy simulation in open systems and stabilizer representations [qsharp-runtime#714](https://github.com/microsoft/qsharp-runtime/issues/714). See [here](https://github.com/microsoft/qsharp-runtime/blob/0826903c0842ba99a923e79be9f072054fe44a43/documentation/preview-simulators.md) for documentation on preview simulators.
- Using [quantum-viz.js](https://github.com/microsoft/quantum-viz.js) as the engine to render the output from the jupyter notebook %trace magic.

## 2021-06-01

### QDK version 0.17.2105.144881

- Reverted a change in the `azure-quantum` Python client that could create authentication issues for some users (refer to issues [#66](https://github.com/microsoft/qdk-python/issues/66), [#67](https://github.com/microsoft/qdk-python/issues/67)).

## 2021-05-26

### QDK version 0.17.2105.143879

- Added a new function to the `azure-quantum` Python client to support the translation of binary optimization terms from `npz` to Azure Quantum. See full details in [QDK Python](https://github.com/microsoft/qdk-python/pull/61).
- Published [QIR oracle generation sample](https://github.com/microsoft/Quantum/issues/496). This program allows turning classical Q# functions on Boolean inputs into quantum implementations of those functions in terms of Q# operations at the level of QIR. This allows, for example, to implement quantum algorithms that are used by many quantum algorithms readily as classical functions.
- Fixed a bug that prevents QIR generation from being enabled in the iqsharp-base Docker image. See details [here](https://github.com/microsoft/iqsharp/issues/432).
- Implemented new special functions, for example, `factorial` and `log-gamma`, in Microsoft.Quantum.Math (microsoft/QuantumLibraries#448). Thanks to @TheMagicNacho for the contribution (microsoft/QuantumLibraries#440)!
- C# Client: Changed input data format type to "v2" for Quantum Computing.
- Released Azure CLI quantum extension version 0.5.0: Adapted to 'az' tool version 2.23.0, adding user agent information on calls to Azure Quantum Service.

### Azure Quantum service update

- Added PA (population annealing) and SSMC (sub-stochastic Monte Carlo) solvers along with preview access via a specialized plan available to a subset of customers.
- Added support for new regions: Japan East, Japan West, UK South, UK West
- Set Provider in Failed state if provisioning fails. Previously it would be stuck in Launching/Updating state.
- Added help button in portal to direct user to support forum.
- Rendered provider cost in localized currency from Azure Marketplace.
- Added feedback button in portal to gather user feedback.
- Added quickstart guide in portal in overview blade.

## 2021-05-10

### QDK version 0.16.2105.140472

- Fixed dependency error in IQSharp on System.Text.Json when submitting jobs to Azure Quantum. See full details in issue [iqsharp#435](https://github.com/microsoft/iqsharp/issues/435).
- Resolved issue affecting joint measurements of multi-qubit states on some combinations of Pauli basis resulting in incorrect values. For details, please refer to issue [qsharp-runtime#680](https://github.com/microsoft/qsharp-runtime/issues/680).

## 2021-04-27

### QDK version 0.16.2104.138035

- Improved Q# type inference based on the Hindley-Milner type inference algorithm.
- Added support for NumPy types in coefficient definitions for problems in QIO *azure-quantum* Python package.
- Updated control-plane swagger file to [support restricted access plans](https://github.com/Azure/azure-rest-api-specs/pull/13002).
- Added new `StreamingProblem` class in QIO *azure-quantum* Python package. It supports the same interface for adding terms to a problem definition as the `Problem` class. However, once terms are added to the problem they are queued to be uploaded by a background thread and are not kept in memory for future reference.
- Restored the packages size of Microsoft.Quantum.Sdk and Microsoft.Quantum.Compiler back to normal. (See related note in 0.15.2103.133969)
- Improved compiler performance.
- Released Azure CLI quantum extension version 0.4.0: Exposed URL for restricted access plans. Fixed regression on offerings commands dependent on Azure Marketplace APIs.

## 2021-03-30

### QDK version 0.15.2103.133969

- Released QIR emission as experimental feature (https://github.com/microsoft/qsharp-compiler/tree/main/src/QsCompiler/QirGeneration#qir-emission---preview-feature). The inclusion of the necessary LLVM packages, and in particular LlvmLibs, causes an increase in package size of the Microsoft.Quantum.Sdk and the Microsoft.Quantum.Compiler, and correspondingly to longer download times the first time the new versions are used. We're working on reducing that again in the future.
- Loosen restriction on AllowAtMostNCallsCA operation (https://github.com/microsoft/QuantumLibraries/pull/431).
- Added missing APIs for Math Library (https://github.com/microsoft/QuantumLibraries/issues/413).
- Removed <xref:Microsoft.Quantum.Environment.GetQubitsAvailableToBorrow> and <xref:Microsoft.Quantum.Environment.GetQubitsAvailableToUse> (https://github.com/microsoft/QuantumLibraries/issues/418).
- Fixed Q# Language Server fails during initialization in Visual Studio caused by JsonReaderException (https://github.com/microsoft/qsharp-compiler/issues/885).
- Added support for multiple entry points.
- Released Az CLI quantum extension version 0.3.0: Updated command 'az quantum workspace create' to require an explicit list of Quantum providers and remove a default. Fixed issue with incorrect location parameter during job submission.

## 2021-02-25

### QDK version 0.15.2102.129448

- Improved IQ# debug user experience by adding a horizontal scrollbar to scroll both execution path and basis state visualizations.
- New functions to represent the group product and group inverse on the single-qubit Clifford group, to quickly define common single-qubit Clifford operators, and to apply single-qubit Clifford operators as operations. For more information, see issue [#409](https://github.com/microsoft/QuantumLibraries/issues/409).
- Addressing security issue in the Microsoft Quantum Development Kit for Visual Studio Code extension. For details, refer to [CVE-2021-27082](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-27082).
- Released Az CLI quantum extension version 0.2.0: Added parameter '--provider-sku-list' to 'az quantum workspace create' to allow specification of Quantum providers. Added command group 'az quantum offerings' with 'list', 'accept-terms' and 'show-terms'.

## 2021-02-12

### QDK version 0.15.2102.128318

- Fix "'npm' is not recognized as an internal or external command" error during creation of Q# projects with Visual Studio Code extension. See issue [#848](https://github.com/microsoft/qsharp-compiler/issues/848). 

## 2021-01-29

### QDK version 0.15.2101.126940

- Added project templates to Q# compiler for executables targeting IonQ and Quantinuum providers
- Update IQ# kernel syntax highlighting to include changes to Q# syntax introduced in version [0.15.2101125897](#qdk-version-0152101125897)
- Bugfix to support passing arrays as input arguments to Q# programs submitted to Azure Quantum via `%azure.execute`, see issue [#401](https://github.com/microsoft/iqsharp/issues/401)
- Fix "Permission denied" error when using `az` in `iqsharp-base` Docker images, see issue [#404](https://github.com/microsoft/iqsharp/issues/404)
- Released Az CLI quantum extension version 0.1.0: Provided command-line tool for workspace management and quantum computing job submission.

## 2021-01-26

### QDK version 0.15.2101125897

- Simplified qubit allocation, providing more convenient syntax for allocating qubits, [see details in Q# language repository](https://github.com/microsoft/qsharp-language/blob/main/Approved/1-implicitly-scoped-qubit-allocation.md).
- Created QDK-Python repository that includes `azure-quantum`, the Python client for submitting quantum-inspired optimization jobs to the Azure Quantum service, and `qdk`, including `qdk.chemistry`, a Python-based convenience layer for the Q# chemistry library that includes molecular visualization and functionality to generate input files for several chemistry packages such as NWChem, Psi4, and OpenMolcas.
- Parentheses are now optional for operation and function types and `if`, `elif`, `while`, and `until` statements. Parentheses for `for`, `use`, and `borrow` statements have been deprecated.
- Improved width estimates for optimal depth, [see details](https://github.com/MicrosoftDocs/quantum-docs-pr/pull/1159).
- Apply unitary operation provided as explicit matrix using `ApplyUnitary` ([QuantumLibraries#391](https://github.com/microsoft/QuantumLibraries/pull/391), external contribution by Dmytro Fedoriaka)
- Fixed https://github.com/microsoft/iqsharp/issues/387 by mitigating performance impact on IQ# kernel startup.

## 2020-11-25

### QDK version 0.14.2011120240

- Improved compiler performance with faster reference loading.
- Added an [ANTLR grammar for Q#](https://github.com/microsoft/qsharp-language/tree/main/Specifications/Language/5_Grammar) to the Q# language specification.
- Updated the [`Microsoft.Quantum.Preparation` namespace](xref:Microsoft.Quantum.Preparation) to be more consistent with style guide and API design principles, and to support purified mixed states with more data (see [proposal](https://github.com/microsoft/QuantumLibraries/issues/344), [review notes](https://github.com/microsoft/QuantumLibraries/blob/main/Design/meetings/2020/api-design-2020-11-05.md), and PRs [#212](https://github.com/microsoft/QuantumLibraries/pull/212), [#322](https://github.com/microsoft/QuantumLibraries/pull/322), [#375](https://github.com/microsoft/QuantumLibraries/pull/375), [#376](https://github.com/microsoft/QuantumLibraries/pull/376)).
- Parentheses around repeated call expressions are now optional: `(Foo(x))(y)` may be written as `Foo(x)(y)`.
- Users of the Visual Studio or Visual Studio Code extensions who have installed .NET 5 or Visual Studio 16.8 may be prompted to install .NET Core 3.1 to continue to work with the extensions.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+closed%3A2020-10-23..2020-11-18).

## 2020-11-10

### QDK version 0.13.20111004

This release disables IntelliSense features for Q# files in Visual Studio and Visual Studio Code when a project file isn't present. This resolves an issue where IntelliSense features may stop working after adding a new Q# file to a project (see [qsharp-compiler#720](https://github.com/microsoft/qsharp-compiler/issues/720)).

## 2020-10-27

### QDK version 0.13.20102604

This release contains the following:

- Resource estimation now emits simultaneously achievable depth and width estimates also to the qubit count. See [here](xref:microsoft.quantum.machines.overview.resources-estimator#metrics-reported) for details.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+closed%3A2020-09-25..2020-10-22).

## 2020-10-05

### QDK version 0.12.20100504

This release fixes a bug affecting the load of Q# notebooks (see [iqsharp#331](https://github.com/microsoft/iqsharp/pull/331)).

## 2020-09-29

### QDK version 0.12.20092803

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

## 2020-08-25

### QDK version 0.12.20082513

This release contains the following:

- New [Microsoft.Quantum.Random namespace](xref:Microsoft.Quantum.Random), providing a more convenient way to sample random values from within Q# programs. ([QuantumLibraries#311](https://github.com/microsoft/QuantumLibraries/pull/311), [qsharp-runtime#328](https://github.com/microsoft/qsharp-runtime/pull/328))
- Improved [Microsoft.Quantum.Diagnostics namespace](xref:Microsoft.Quantum.Diagnostics) with new [`DumpOperation` operation](xref:Microsoft.Quantum.Diagnostics.DumpOperation), and new operations for restricting qubit allocation and oracle calls. ([QuantumLibraries#302](https://github.com/microsoft/QuantumLibraries/pull/302))
- New [`%project` magic command](xref:microsoft.quantum.iqsharp.magic-ref.project) in IQ# and [`qsharp.projects` API](/python/qsharp-core/qsharp.projects.projects) in Python to support references to Q# projects outside the current workspace folder. See [iqsharp#277](https://github.com/microsoft/iqsharp/issues/277) for the current limitations of this feature. 
- Support for automatically loading `.csproj` files for IQ#/Python hosts, which allows external project or package references to be loaded at initialization time. See the guide for using [Q# with Python and Jupyter Notebooks](xref:microsoft.quantum.user-guide-qdk.overview.host-programs) for more details.
- Added `ErrorCorrection.Syndrome` sample.
- Added tunable coupling to `SimpleIsing`.
- Updated `HiddenShift` sample.
- Added sample for solving Sudoku with Grover's algorithm (external contribution)
- General bug fixes.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2020-07-21

### QDK version 0.12.20072031


This release contains the following:

- Opened namespaces in Q# notebooks are now available when running all future cells. This allows, for example, namespaces to be opened once in a cell at the top of the notebook, rather than needing to open relevant namespaces in each code cell. A new `%lsopen` magic command displays the list of currently-opened namespaces.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2020-07-02

### QDK version 0.12.20070124

This release contains the following:

- New `qdk-chem` tool for converting legacy electronic structure problem serialization formats (for example, FCIDUMP) to [Broombridge](xref:microsoft.quantum.libraries.overview.chemistry.schema.broombridge)
- New functions and operations in the [`Microsoft.Quantum.Synthesis`](xref:Microsoft.Quantum.Synthesis) namespace for coherently applying classical oracles using transformation- and decomposition-based synthesis algorithms.
- IQ# now allows arguments to the `%simulate`, `%estimate`, and other magic commands. See the [`%simulate` magic command reference](xref:microsoft.quantum.iqsharp.magic-ref.simulate) for more details.
- New phase display options in IQ#. See the [`%config` magic command reference](xref:microsoft.quantum.iqsharp.magic-ref.config) for more details.
- IQ# and the `qsharp` Python package are now provided via conda packages ([qsharp](https://anaconda.org/quantum-engineering/qsharp) and [iqsharp](https://anaconda.org/quantum-engineering/iqsharp)) to simplify local installation of Q# Jupyter and Python functionality to a conda environment. See the  [Q# with Python](xref:microsoft.quantum.install-qdk.overview) installation guides for more details.
- When using the simulator, qubits no longer need to be in the |0⟩ state upon release, but can be automatically reset if they were measured immediately before releasing.
- Updates to make it easier for IQ# users to consume library packages with different QDK versions, requiring only major & minor version numbers match rather than the exact same version
- Removed deprecated `Microsoft.Quantum.Primitive.*` namespace
- Moved operations:
  - `Microsoft.Quantum.Intrinsic.Assert` is now `Microsoft.Quantum.Diagnostics.AssertMeasurement`
  - `Microsoft.Quantum.Intrinsic.AssertProb` is now `Microsoft.Quantum.Diagnostics.AssertMeasurementProbability`
- Bug fixes 

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2020-06-04

### QDK version 0.11.2006.403

This release fixes a bug-affecting compilation of Q# projects.

## 2020-06-03

### QDK version 0.11.2006.207

This release contains the following:

- Q# notebooks and Python host programs will no longer fail when a Q# entry point is present
- Updates to [Standard library](xref:microsoft.quantum.libraries.overview.standard.intro) to use access modifiers
- Compiler now allows plug-in of rewrite steps between built-in rewrite steps
- Several deprecated functions and operations have been removed following the schedule described in our [API principles](xref:microsoft.quantum.contributing-qdk.overview.api-design). Q# programs and libraries that build without warnings in version 0.11.2004.2825 will continue to work unmodified.

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed), [IQ#](https://github.com/microsoft/iqsharp/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

> [!NOTE]
> This version contains a bug that affects the compilation of Q# projects. We recommend upgrading to a newer release.

## 2020-04-30

### QDK version 0.11.2004.2825

This release contains the following:

- New support for Q# applications, which no longer require a C# or Python host file. For more information on getting started with Q# applications, see [here](xref:microsoft.quantum.install-qdk.overview).
- Updated quantum random number generator quickstart to no longer require a C# or Python host file. See the updated  [Quickstart](xref:microsoft.quantum.tutorial-qdk.random-number)
- Performance improvements to IQ# Docker images

> [!NOTE]
> Q# applications using the new [`@EntryPoint()`](xref:Microsoft.Quantum.Core.EntryPoint) attribute currently cannot be called from Python or .NET host programs.
> See the [Python](xref:microsoft.quantum.install-qdk.overview) and [.NET interoperability](xref:microsoft.quantum.how-to.csharp-local) guides for more information.

## 2020-03-31

### QDK version 0.11.2003.3107

This release contains minor bug fixes for version 0.11.2003.2506.

## 2020-03-26

### QDK version 0.11.2003.2506

This release contains the following:

- New support for access modifiers in Q#
- Updated to .NET Core SDK 3.1

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2020-02-27

### QDK version 0.10.2002.2610

This release contains the following:

- New Quantum Machine Learning library, for more information go to our [QML docs page](xref:microsoft.quantum.libraries.overview#quantum-machine-learning-library)
- IQ# bug fixes, resulting in up to a 10-20x performance increase when loading NuGet packages

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2020-01-29

### QDK version 0.10.2001.2831

This release contains the following:

- New Microsoft.Quantum.SDK NuGet package which will replace Microsoft.Quantum.Development.Kit NuGet package when creating new projects. Microsoft.Quantum.Development.Kit NuGet package will continue to be supported for existing projects. 
- Support for Q# compiler extensions, enabled by the new Microsoft.Quantum.SDK NuGet package, for more information see the [documentation on GitHub](https://github.com/microsoft/qsharp-compiler/tree/main/src/QuantumSdk#extending-the-q-compiler), the [compiler extensions sample](https://github.com/microsoft/qsharp-compiler/tree/main/examples/CompilerExtensions) and the [Q# Dev Blog](https://devblogs.microsoft.com/qsharp/extending-the-q-compiler/)
- Added support for .NET Core 3.1, it's highly recommended to have version 3.1.100 installed since building with older .NET Core SDK versions may cause issues
- New compiler transformations available under Microsoft.Quantum.QsCompiler.Experimental
- New functionality to expose output state vectors as HTML in IQ#
- Added support for EstimateFrequencyA to Microsoft.Quantum.Characterization for Hadamard and SWAP tests
- AmplitudeAmplification namespace now uses Q# style guide

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2019-12-05

### QDK version 0.10.1912.0501

This release contains the following:

- New Test attribute for Q# unit testing, see updated API documentation [here](xref:Microsoft.Quantum.Diagnostics.Test) and updated testing & debugging guide [here](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
- Added stack trace if there's a Q# program run error
- Support for breakpoints in Visual Studio Code because of an update in the [OmniSharp C# Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2019-11-17

### QDK version 0.10.1911.1607

This release contains the following:

- Performance fix for [Quantum Katas](https://github.com/Microsoft/QuantumKatas) and Jupyter notebooks

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2019-11-01

### QDK version 0.10.1911.307

This release contains the following:

- Updates to Visual Studio Code & Visual Studio extensions to deploy language server as a self-contained executable file, eliminating the .NET Core SDK version dependency  
- Migration to .NET Core 3.0
- Breaking change to Microsoft.Quantum.Simulation.Core.IOperationFactory with introduction of new `Fail` method. It affects only custom simulators that don't extend SimulatorBase. For more details, [view the pull request on GitHub](https://github.com/microsoft/qsharp-runtime/pull/59).
- New support for Deprecated attributes

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2019-09-30

### QDK version 0.9.1909.3002

This release contains the following:

- New support for Q# code completion in Visual Studio 2019 (versions 16.3 & later) & Visual Studio Code
- New [Quantum Kata](https://github.com/Microsoft/QuantumKatas) for quantum adders

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

## 2019-08-29

### QDK version 0.9.1908.2902

This release contains the following:

- New support for [conjugation statements](xref:microsoft.quantum.qsharp.conjugations#conjugations) in Q#
- New code actions in the compiler, such as: "replace with", "add documentation", and simple array item update
- Added install template and new project commands to Visual Studio Code extension
- Added new variants of ApplyIf combinator such as [Microsoft.Quantum.Canon.ApplyIfOne](xref:Microsoft.Quantum.Canon.ApplyIfOne)
- Additional [Quantum Katas](https://github.com/Microsoft/QuantumKatas) converted to Jupyter Notebooks
- Visual Studio Extension now requires Visual Studio 2019

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed), [compiler](https://github.com/microsoft/qsharp-compiler/pulls?q=is%3Apr+is%3Aclosed), [runtime](https://github.com/microsoft/qsharp-runtime/pulls?q=is%3Apr+is%3Aclosed), [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed) and [Katas](https://github.com/microsoft/QuantumKatas/pulls?q=is%3Apr+is%3Aclosed).  

The changes are summarized here with instructions for upgrading your existing programs.  Read more about these changes on the [Q# dev blog](https://devblogs.microsoft.com/qsharp).

## 2019-07-12

### QDK version 0.8.1907.1701

This release contains the following:

- New indexing for slicing arrays, [see the language reference](xref:microsoft.quantum.qsharp.contextualexpressions#contextual-and-omitted-expressions) for more information.
- Added Dockerfile hosted on the [Microsoft Container Registry](https://github.com/microsoft/ContainerRegistry), see the [IQ# repository for more information](https://github.com/microsoft/iqsharp/blob/main/README.md)
- Breaking change for [the trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro), update to configuration settings, name changes; see the [.NET API Browser for the updated names](/dotnet/api/microsoft.quantum.simulation.simulators.qctracesimulators.qctracesimulatorconfiguration).

See the full list of closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed) and [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed).  

## 2019-05-31

### QDK version 0.7.1905.3109

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

## 2019-05-03

### QDK version 0.6.1905

This release contains the following:

- Makes changes to the Q# language
- Restructures the Quantum Development Kit libraries
- Adds new samples
- Fixes bugs.  Several closed PRs for [libraries](https://github.com/Microsoft/QuantumLibraries/pulls?q=is%3Apr+is%3Aclosed) and [samples](https://github.com/Microsoft/Quantum/pulls?q=is%3Apr+is%3Aclosed).  

The changes are summarized here and instructions for upgrading your existing programs.  You can read more about these changes on devblogs.microsoft.com/qsharp.

#### Q# language syntax

This release adds new Q# language syntax:

- Add a [shorthand way to express specializations of quantum operations](xref:microsoft.quantum.qsharp.specializationdeclarations) (control and adjoints) with `+` operators.  The old syntax is deprecated.  Programs that use the old syntax (for example, `: adjoint`) will continue to work, but a compile-time warning will be generated.  
- Add a new ternary operator for [copy-and-update](xref:microsoft.quantum.qsharp.copyandupdateexpressions#copy-and-update-expressions), `w/` `<-`, can be used to express array creation as a modification of an existing array.
- Add the common [apply-and-reassign statement](xref:microsoft.quantum.qsharp.variabledeclarationsandreassignments#evaluate-and-reassign-statements), for example, `+=`, `w/=`.
- Add a way to specify a short name for namespaces in [open directives](xref:microsoft.quantum.qsharp.namespaces#open-directives).

With this release, we no longer allow an array element to be specified on the left side of a set statement.  This is because that syntax implies that arrays are mutable when in fact, the result of the operation has always been the creation of a new array with the modification.  Instead, a compiler error will be generated with a suggestion to use the new copy-and-update operator, `w/`, to accomplish the same result.  

#### Library restructuring

This release reorganizes the libraries to enable their growth in a consistent way:

- Renames the Microsoft.Quantum.Primitive namespace  to Microsoft.Quantum.Intrinsic.  These operations are implemented by the target machine.  The Microsoft.Quantum.Primitive namespace is deprecated.  A runtime warning will advise when programs call operations and functions using deprecated names.

- Renames the Microsoft.Quantum.Canon package to Microsoft.Quantum.Standard.  This package contains namespaces that are common to most Q# programs.  This includes:  
  - Microsoft.Quantum.Canon for common operations
  - Microsoft.Quantum.Arithmetic for general purpose arithmetic operations
  - Microsoft.Quantum.Preparation for operations used to prepare qubit state
  - Microsoft.Quantum.Simulation for simulation functionality

With this change, programs that include a single "open" statement for the namespace Microsoft.Quatum.Canon may find build errors if the program references operations that were moved to the other three new namespaces.  Adding the additional open statements for the three new namespaces is a straightforward way to resolve this issue.  

- Several namespaces have been deprecated as the operations within have been reorganized to other namespaces. Programs that use these namespaces will continue to work, and a compile-time warning will denote the namespace where the operation is defined.  

- The Microsoft.Quantum.Arithmetic namespace has been normalized to use the <xref:Microsoft.Quantum.Arithmetic.LittleEndian> user-defined type. Use the function [BigEndianAsLittleEndian](xref:Microsoft.Quantum.Arithmetic.BigEndianAsLittleEndian) when needed to convert to little endian.  

- The names of several callables (functions and operations) have been changed to conform to the [Q# Style Guide](xref:microsoft.quantum.contributing-qdk.overview.style).  The old callable names are deprecated.  Programs that use the old callables will continue to work with a compile-time warning.

#### New samples

We added a [sample of using Q# with F# driver](https://github.com/Microsoft/Quantum/pull/164).  

**"Thank you!"** to the following contributor to our open code base at http://github.com/Microsoft/Quantum. These contributions add significantly to the rich samples of Q# code:

- Mathias Soeken ([@msoeken](https://github.com/msoeken)): Oracle function synthesis. [PR #135](https://github.com/Microsoft/Quantum/pull/135).

#### Migrating existing projects to 0.6.1905.

See the [install guide](xref:microsoft.quantum.install-qdk.overview) to update the QDK.
  
If you have existing Q# projects from version 0.5 of the Quantum Development Kit, the following are the steps to migrate those projects to the newest version.

1. Projects need to be upgraded in order.  If you have a solution with multiple projects, update each project in the order they're referenced.
2. From a command prompt, Run `dotnet clean` to remove all existing binaries and intermediate files.
3. In a text editor, edit the `.csproj` file to change the version of all the `Microsoft.Quantum` `PackageReference` to version 0.6.1904, and change the `Microsoft.Quantum.Canon` package name to `Microsoft.Quantum.Standard`, for example:

    ```xml
    <PackageReference Include="Microsoft.Quantum.Standard" Version="0.6.1905.301" />
    <PackageReference Include="Microsoft.Quantum.Development.Kit" Version="0.6.1905.301" />
    ```
4. From the command prompt, run this command: `dotnet msbuild`  
5. After running this, you might still need to manually address errors because of the changes listed above.  In many cases, these errors will also be reported by IntelliSense in Visual Studio or Visual Studio Code.
    - Open the root folder of the project or the containing solution in Visual Studio 2019 or Visual Studio Code.
    - After opening a `.qs` file in the editor, you should see the output of the Q# language extension in the output window.
    - After the project has loaded successfully (indicated in the output window) open each file and manually to address all remaining issues.

> [!NOTE]
> * For the 0.6 release, the language server included with the Quantum Development Kit does not support multiple workspaces.
> * In order to work with a project in Visual Studio Code, open the root folder containing the project itself and all referenced projects.
> * In order to work with a solution in Visual Studio, all projects contained in the solution need to be in the same folder as the solution or in one of its subfolders.  
> * References between projects migrated to 0.6 and higher and projects using older package versions are **not** supported.

## 2019-04-15

### QDK version 0.5.1904

This release contains bug fixes.

## 2019-03-27

### QDK version 0.5.1903

This release contains the following:

- Adds support for Jupyter Notebook, which offers a great way to learn about Q#.  [Check out new Jupyter Notebook samples and learn how to write your own Notebooks](xref:microsoft.quantum.install-qdk.overview). 

- Adds integer adder arithmetic to the Quantum Canon library.  See also a Jupyter Notebook that [describes how to use the new integer adders](https://github.com/microsoft/Quantum/blob/main/samples/arithmetic/quantum-adders/AdderExample.ipynb).

- Bug fix for DumpRegister issue reported by the community ([#148](https://github.com/Microsoft/Quantum/issues/148)).

- Added ability to return from within a [using- and borrowing-statement](xref:microsoft.quantum.qsharp.quantummemorymanagement#quantum-memory-management).

- Revamped [getting started guide](xref:microsoft.quantum.install-qdk.overview).

## 2019-02-27

### QDK version 0.5.1902

This release contains the following:

- Adds support for a cross-platform Python host.  The `qsharp` package for Python makes it easy to simulate Q# operations and functions from within Python. Learn more about [Python interoperability](xref:microsoft.quantum.install-qdk.overview).

- The Visual Studio and Visual Studio Code extensions now support renaming of symbols (for example, functions and operations).

- The Visual Studio extension can now be installed on Visual Studio 2019.

## 2019-01-30

### QDK version 0.4.1901

This release contains the following:

- Adds support for a new primitive type, BigInt, which represents a signed integer of arbitrary size.  Learn more about [BigInt](xref:microsoft.quantum.qsharp.valueliterals#bigint-literals).
- Adds new Toffoli simulator, a special purpose fast simulator that can simulate X, CNOT and multi-controlled X quantum operations with very large numbers of qubits.  Learn more about [Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator).
- Adds a simple resource estimator that estimates the resources required to run a given instance of a Q# operation on a quantum computer.  Learn more about the [Resource Estimator](xref:microsoft.quantum.machines.overview.resources-estimator).

## 2018-11-28

### QDK version 0.3.1811.2802

Even though our VS Code extension wasn't using it, it was flagged and removed from the marketplace during
[the extensions purge](https://code.visualstudio.com/blogs/2018/11/26/event-stream) related to the `event-stream` NPM package. 
This version removes all runtime dependencies that could make the extension trigger any red flags.

If you had previously installed the extension you'll need to install it again by visiting
the [Microsoft Quantum Development Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode) extension on the Visual Studio Marketplace and press Install. We're sorry about the inconvenience.

## 2018-11-20

### QDK version 0.3.1811.1511

This release fixes a bug that prevented some users to successfully load the Visual Studio extension.

## 2018-11-02

### QDK version 0.3.1811.203

This release includes a few bug fixes, including:

* Invoking `DumpMachine` could change the state of the simulator under certain situations.
* Removed compilation warnings when building projects using a version of .NET Core previous to 2.1.403.
* Clean up of documentation, specially the tooltips shown during mouse hover in VS Code or Visual Studio.

## 2018-10-29

### QDK version 0.3.1810.2508

This release includes new language features and an improved developer experience:

* This release includes a language server for Q#, and the client integrations for Visual Studio and Visual Studio Code. This enables a new set of IntelliSense features along with live feedback on typing in form of squiggly underlinings of errors and warnings. 
* This update greatly improves diagnostic messages in general, with easy navigation to and precise ranges for diagnostics and additional details in the displayed hover information.
* The Q# language has been extended in ways that unifies the ways developers can do common operations and new enhancements to the language features to powerfully express quantum computation.  There are a handful of breaking changes to the Q# language with this release.

This release also includes a new quantum chemistry library:

- The chemistry library contains new Hamiltonian simulation features, including:
  - Trotter–Suzuki integrators of arbitrary even order for improved simulation accuracy.
  - Qubitization simulation technique with chemistry-specific optimizations for reducing $T$-gate complexity.
- A new open-source schema, called Broombridge Schema (in reference to a [landmark](https://en.wikipedia.org/wiki/Broom_Bridge) celebrated as a birthplace of Hamiltonians), is introduced for importing representations of molecules and simulating them.
- Multiple chemical representations defined using the Broombridge Schema are provided.  These models were generated by [NWChem](http://www.nwchem-sw.org/), an open source high-performance computational chemistry tool.
- Tutorials and Samples describe how to use the chemistry library and the Broombridge data models to:
  - Construct simple Hamiltonians using the chemistry library
  - Visualize ground and excited energies of Lithium Hydride using phase estimation.
  - Perform resource estimates of quantum chemistry simulation.
  - Estimate energy levels of molecules represented by the Broombridge schema.
- Documentation describes how to use NWChem to generate additional chemical models for quantum simulation with Q#.

Learn more about the [Quantum Development Kit chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview).

With the new chemistry library, we're separating out the libraries into a new GitHub repo, [Microsoft/QuantumLibraries](https://github.com/Microsoft/QuantumLibraries).  The samples remain in the repo [Microsoft/Quantum](https://github.com/Microsoft/Quantum).  We welcome contributions to both!

This release includes bug fixes and features for issues reported by the community.

#### Community contributions

**"Thank you!"** to the following contributors to our open code base at http://github.com/Microsoft/Quantum. These contributions add significantly to the rich samples of Q# code:

- Rolf Huisman ([@RolfHuisman](https://github.com/RolfHuisman)): Improved the experience for QASM/Q# developers by creating a QASM to Q# translator. [PR #58](https://github.com/Microsoft/Quantum/pull/58).

- Andrew Helwer ([@ahelwer](https://github.com/ahelwer)):  Contributed a sample implementing the CHSH Game, a quantum game related to non-locality.  [PR #84](https://github.com/Microsoft/Quantum/pull/84).

Thank you also to Rohit Gupta ([@guptarohit](https://github.com/guptarohit),[PR #90](https://github.com/Microsoft/quantum/pull/90)), Tanaka Takayoshi ([@tanaka-takayoshi](https://github.com/tanaka-takayoshi),[PR #289](https://github.com/MicrosoftDocs/quantum-docs-pr/pull/289)), and Lee James O'Riordan ([@mlxd](https://github.com/mlxd),[PR #96](https://github.com/Microsoft/Quantum/pull/96)) for their work improving the content for all of us through documentation, spelling and typo corrections!

## 2018-09-10

### QDK version 0.2.1809.701

This release includes bug fixes for issues reported by the community.

## 2018-06-30

### QDK version 0.2.1806.3001

This release is just a quick fix for [issue #48 reported on GitHub](https://github.com/Microsoft/Quantum/issues/48) (Q# compilation fails if user name contains a blank space). Follow same update instructions as `0.2.1806.1503` with the corresponding new version (`0.2.1806.3001-preview`).

## 2018-06-22

### QDK version 0.2.1806.1503

This release includes several community contributions and an improved debugging experience and improved performance.  Specifically:

- Performance improvements on both small and large simulations for the QuantumSimulator target machine.
- Improved debugging functionality.
- Community contributions in bug fixes, new helper functions, operations and new samples.

#### Performance improvements

This update includes significant performance improvements for simulation of large and small numbers of qubits for all the target machines.  This improvement is easily visible with the H<sub>2</sub> simulation that is a standard sample in the Quantum Development Kit.

#### Improved debugging functionality

This update adds new debugging functionality:
- Added two new operations,  @"microsoft.quantum.extensions.diagnostics.dumpmachine" and @"microsoft.quantum.extensions.diagnostics.dumpregister" that output wave function information about the target quantum machine at that point in time.  
- In Visual Studio, the probability of measuring a $\ket{1}$ on a single qubit is now automatically shown in the debugging window for the QuantumSimulator target machine.
- In Visual Studio, improved the display of variable properties in the **Autos** and **Locals** debug windows. 

Learn more about [Testing and Debugging](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging).

#### Community contributions

The Q# coder community is growing and we're thrilled to see the first user contributed libraries and samples that were submitted to our open code base at http://github.com/Microsoft/quantum.  **A big "Thank you!"** to the following contributors:
- Mathias Soeken ([@msoeken](https://github.com/msoeken)):  contributed a sample defining a transformation-based logic synthesis method that constructs Toffoli networks to implement a given permutation. The code is written entirely in Q# functions and operations.  [PR #41](https://github.com/Microsoft/Quantum/pull/41).
- RolfHuisman ([@RolfHuisman](https://github.com/RolfHuisman)): Microsoft MVP Rolf Huisman contributed a sample that generates flat QASM code from Q# code for a restricted class of programs that don't have classical control flow and restricted quantum operations. [PR #59](https://github.com/Microsoft/Quantum/pull/59)
- Sarah Kasier ([@crazy4pi314](https://github.com/crazy4pi314)): helped to improve our code base by submitting a library function for controlled operations. [PR #53](https://github.com/Microsoft/Quantum/pull/53)
- Jessica Lemieux ([@Lemj3111](https://github.com/Lemj3111)): fixed @"microsoft.quantum.canon.quantumphaseestimation" and created new unit tests.  [PR #54](https://github.com/Microsoft/Quantum/pull/54)
- Tama McGlinn ([@TamaMcGlinn](https://github.com/TamaMcGlinn)): cleaned the Teleportation sample by making sure the QuantumSimulator instance is disposed. [PR #20](https://github.com/Microsoft/Quantum/pull/20)

Additionally, a big **"Thank You!"** to these Microsoft Software Engineers from the Commercial Engineering Services team contributors who made valuable changes to our documentation during their Hackathon.  Their changes vastly improved the clarity and onboarding experience for all of us:

- Sascha Corti
- Mihaela Curmei
- John Donnelly
- Kirill Logachev
- Jan Pospisil
- Anita Ramanan
- Frances Tibble
- Alessandro Vozza

#### Update existing projects

This release is fully backwards compatible. Just update the nuget packages in your projects to version `0.2.1806.1503-preview` and do a **full rebuild** to make sure all intermediate files are regenerated.

From Visual Studio, follow the normal instructions on how to [update a package](/nuget/tools/package-manager-ui#updating-a-package).

To update project templates for the command line, run the following command:

```bash
dotnet new -i "Microsoft.Quantum.ProjectTemplates::0.2.1806.1503-preview"
```

After running this command, any new projects created using `dotnet new <project-type> -lang Q#` will automatically use this version of the Quantum Development Kit.

To update an existing project to use the newest version, run the following command from within the directory for each project:

```bash
dotnet add package Microsoft.Quantum.Development.Kit -v "0.2.1806.1503-preview"
dotnet add package Microsoft.Quantum.Canon -v "0.2.1806.1503-preview"
```

If an existing project also uses XUnit integration for unit testing, then a similar command can be used to update that package as well:

```bash
dotnet add package Microsoft.Quantum.Xunit -v "0.2.1806.1503-preview"
```

Depending on the version of XUnit that your test project uses, you may also need to update XUnit to 2.3.1:

```bash
dotnet add package xunit -v "2.3.1" 
```

After the update, make sure you remove all temporary files generated by the previous version by doing:

```bash
dotnet clean 
```

#### Known issues

No additional known issues to report.

## 2018-02-26

### QDK version 0.2.1802.2202

This release brings support for development on more platforms, language interoperability, and performance enhancements. Specifically:

- Support for macOS- and Linux-based development. 
- .NET Core compatibility, including support for Visual Studio Code across platforms.
- A full Open Source license for the Quantum Development Kit Libraries.
- Improved simulator performance on projects requiring 20 or more qubits.
- Interoperability with the Python language (preview release available on Windows).

#### .NET editions

The .NET platform is available through two different editions, the .NET Framework that is provided with Windows, and the open-source .NET Core that is available on Windows, macOS and Linux.
With this release, most parts of the Quantum Development Kit are provided as libraries for .NET Standard, the set of classes common to both Framework and Core.
These libraries are then compatible with recent versions of either .NET Framework or .NET Core.

To help ensure that projects written using the Quantum Development Kit are as portable as possible, we recommend that library projects written using the Quantum Development Kit target .NET Standard. Console applications should target .NET Core.
Since previous releases of the Quantum Development Kit only supported .NET Framework, you may need to migrate your existing projects. See below for details on how to do this.

#### Project migration

Projects created using previous versions of Quantum Development Kit will still work, as long as you don't update the NuGet packages used in them. To migrate existing code to the new version, do the following steps:

1. Create a new .NET Core project using the right type of Q# project template (Application, Library or Test Project).
2. Copy existing `.qs` and `.cs`/`.fs` files from the old project to the new project (using Add > Existing Item). Don't copy the AssemblyInfo.cs file.
3. Build and run the new project.

Note that the operation RandomWalkPhaseEstimation from the namespace Microsoft.Quantum.Canon was moved into the namespace Microsoft.Research.Quantum.RandomWalkPhaseEstimation in the [Microsoft/Quantum-NC](https://github.com/microsoft/quantum-nc) repository.

#### Known issues

- The `--filter` option to `dotnet test` doesn't work correctly for tests written in Q#.
  As a result, individual unit tests cannot be run in Visual Studio Code; we recommend using `dotnet test` at the command prompt to re-run all tests.

## 2018-01-18

### QDK version 0.1.1801.1707

This release fixes some issues reported by the community. Namely:

- The simulator now works with early non-AVX-enabled CPUs.
- Regional decimal settings won't cause the Q# parser to fail.
- `SignD` primitive operation now returns `Int` rather than `Double`.

## 2017-12-11

### QDK version 0.1.1712.901

#### Known issues

##### Hardware and software requirements

- The simulator included with the Quantum Development Kit requires a 64-bit installation of Microsoft Windows to run.
- Microsoft's quantum simulator, installed with the Quantum Development Kit, uses Advanced Vector Extensions (AVX), and requires an AVX-enabled CPU. Intel processors shipped in Q1 2011 (Sandy Bridge) or later support AVX. We're evaluating support for earlier CPUs and may announce details at a later time.

##### Project creation

- When creating a solution (.sln) that will use Q#, the solution must be one directory higher than each project (`.csproj`) in the solution. When creating a new solution, this can be accomplished by making sure that the "Create directory for solution" checkbox on the "New Project" dialog box is checked. If this isn't done, the Quantum Development Kit NuGet packages will need to be installed manually.

##### Q#

- Intellisense doesn't display proper errors for Q# code. Make sure that you're displaying Build errors in the Visual Studio Error List to see correct Q# errors. Also note that Q# errors won't show up until after you've done a build.
- Using a mutable array in a partial application may lead to unexpected behavior.
- Binding an immutable array to a mutable array (let a = b, where b is a mutable array) may lead to unexpected behavior.
- Profiling, code coverage and other VS plugins may not always count Q# lines and blocks accurately.
- The Q# compiler doesn't validate interpolated strings. It's possible to create C# compilation errors by misspelling variable names or using expressions in Q# interpolated strings.

##### Simulation

- The Quantum Simulator uses OpenMP to parallelize the linear algebra required. By default OpenMP uses all available hardware threads, which means that programs with small numbers of qubits will often run slowly because the coordination required will dwarf the actual work. This can be fixed by setting the environment variable OMP_NUM_THREADS to a small number. As a very rough rule of thumb, 1 thread is good for up to about 4 qubits, and then an additional thread per qubit is good, although this is highly dependent on your algorithm.

##### Debugging

- F11 (step in) doesn't work in Q# code.
- Code highlighting in Q# code at a breakpoint or single-step pause is sometimes inaccurate. The correct line will be highlighted, but sometimes the highlight will start and end at incorrect columns on the line.

##### Testing

- Tests must be run in 64-bit mode. If your tests are failing with a BadImageFormatException, go to the Test menu and select Test Settings > Default Processor Architecture > X64.
- Some tests take a long time (possibly as much as 5 minutes depending on your computer) to run. This is normal, as some use over twenty qubits; our largest test currently runs on 23 qubits.

##### Samples

- On some machines, some small samples may run slowly unless the environment variable OMP_NUM_THREADS is set to "1". See also the release note under "Simulation".

##### Libraries

- There's an implicit assumption that the qubits passed to an operation in different arguments are all distinct. For instance, all of the library operations (and all of the simulators) assume that the two qubits passed to a controlled NOT are different qubits. Violating this assumption may lead to unpredictable unexpected. It's possible to test for this using the quantum computer tracer simulator.
- The `Microsoft.Quantum.Bind` function may not act as expected in all cases.
- In the `Microsoft.Quantum.Extensions.Math` namespace, the `SignD` function returns a `Double` rather than an `Int`, although the underlying `System.Math.Sign` function always returns an `integer`. It's safe to compare the result against 1.0, -1.0, and 0.0, since these `doubles` all have exact binary representations.
