---
title: Release notes for QDK and Azure Quantum - 2021
description: Learn about updates to the Microsoft Quantum Development Kit (QDK) and Azure Quantum in 2021.
ms.date: 11/17/2023
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, Basic measurement feedback, target, targets]
uid: microsoft.quantum.relnotes-qdk-2021
---

# Release notes for Quantum Development Kit (QDK) and Azure Quantum - 2021

This article outlines updates to the [Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview) and the [Azure Quantum service](xref:microsoft.quantum.azure-quantum-overview) in 2021.

## QDK version 0.21.2112.180703

### 2021-12-14

- Released Azure CLI quantum extension version 0.11.0: Job result histograms are left-aligned (not centered) in console output.

## QDK version 0.21.2111.177148

### 2021-11-23

- Added a [Q# formatter](https://github.com/microsoft/qsharp-compiler/tree/main/src/QsFmt) to update deprecated Q# syntax and basic formatting for Q# projects with QDK version **0.21.2111.177148** and up:
  - You need to update the QDK version in the `<Project>` tag of your `.csproj` file to use the Q# formatter.
  - You can use the Q# formatter via Visual Studio by clicking on the **Edit -> Advanced -> Format Document** menu item. Via Visual Studio Code, you can format your code by right-clicking on the code you want to format, and clicking on the **Format Document** menu item.
  - Added a build target, UpdateSyntax, for updating deprecated syntax in a Q# project. This target can be used with `dotnet msbuild -t:UpdateSyntax` at a command prompt.
  - Added Code Actions to automatically update deprecated syntax.
- Added support for submitting problems to a subset of Microsoft targets in protobuf binary format. You can use it for encoding larger problems by reducing the payload sizes, and improve upload and processing speeds.
- **Breaking change:** The deserialize class method of the Problem class has a parameter name change from `problem_as_json` to `input_problem` to support deserialization of protobuf.

## QDK version 0.20.2110.171573

### 2021-10-26

- IQ# kernel [%azure.connect](/qsharp/api/iqsharp-magic/azure.connect) command no longer sets "West US" as the default location. Location parameter is now required.
- The `azure-quantum` package now supports asynchronous I/O via the new `azure.quantum.aio` package.
- Fixed an [issue](https://github.com/microsoft/azure-quantum-python/issues/160): Qiskit jobs fetched with `AzureQuantumProvider.get_job()` can now use `job.result()` without running into a `KeyError`.
- Fixed an [issue](https://github.com/microsoft/azure-quantum-python/issues/164) that causes `azure.quantum.cirq` and `azure.quantum.qiskit`  to not be recognized by [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance). The `azure.quantum.plugins` package is deprecated.  
- Fixed an [issue](https://github.com/microsoft/iqsharp/issues/531) in IQ# in which job execution would fail if any operation defined in an external file wasn't supported on the given target.
- Fixed an [issue](https://github.com/microsoft/qsharp-compiler/issues/1163) in the Visual Studio extension that caused incorrect indentation in some cases when a closing bracket was typed.
- Refactored the [Quantum Intermediate Representation (QIR) runtime](https://www.nuget.org/packages/Microsoft.Quantum.Qir.Runtime) DLLs to use static VC runtime, removing dependency on msvcrt.dll and Visual Studio installation.
- Refactored [QIR Runtime](https://www.nuget.org/packages/Microsoft.Quantum.Qir.Runtime) to use `intptr_t` for Qubit ID types consistently.
- Updated Azure CLI Extensions to version 0.9.0.

## QDK version 0.19.2109.165653

### 2021-09-28

- Added support for submitting [Cirq](/azure/quantum/quickstart-microsoft-cirq) and [Qiskit](/azure/quantum/quickstart-microsoft-qiskit) circuits to IonQ and Quantinuum.
- Conda packages have been moved from the quantum-engineering channel to the microsoft channel. When using conda to install the Quantum Development Kit for Q# notebook or Q# + Python usage, the `-c quantum-engineering` argument to conda should be changed to `-c microsoft`, and the `channels` section of environment.yml files should be updated. See the [getting started guide](xref:microsoft.quantum.install-qdk.overview) for the full install command using the new packages.
- You can formulate PUBO and Ising problems using [squared linear terms](/azure/quantum/optimization-slc-term) natively on the PA and SSMC solvers.
- Fixed [issue](https://github.com/microsoft/qsharp-compiler/issues/1089) with memory management and improved reliability for QIR generation: [1152](https://github.com/microsoft/qsharp-compiler/issues/1152) and [1086](https://github.com/microsoft/qsharp-compiler/issues/1086).
- Fixed [issue](https://github.com/microsoft/azure-quantum-python/issues/147) related to `Workspace.get_targets()`. It now returns all available targets in the subscription, even those that don't have client-side support.
- Fixed issues with Q# compiler's diagnostics appearing in incorrect places: [1133](https://github.com/microsoft/qsharp-compiler/issues/1133) and [1172](https://github.com/microsoft/qsharp-compiler/issues/1172).
- **Breaking change:** The order of arguments in `ApplyIf`, `ApplyIfA`, `ApplyIfC`, and `ApplyIfCA` [has been changed](https://github.com/microsoft/QuantumLibraries/issues/377) so it is consistent with related operations such as `ApplyIfElseB` and [Q# API design principles](/azure/quantum/contributing-api-design-principles).
- `Problem.serialize()` of the `azure.quantum.optimization` Python package now serializes the name of the Optimization Problem in a new optional metadata field, so you don't have to specify it again when deserializing the problem as detailed in this [issue](https://github.com/microsoft/azure-quantum-python/issues/153).
- Released Azure CLI quantum extension version 0.8.0: Users receive recommendations, at most once a day, to update the az quantum extension if the version installed is out-of-date.

## QDK version 0.18.2109.162713

### 2021-09-10

- Fixes an [issue](https://github.com/microsoft/iqsharp/issues/517) that sometimes resulted in kernel crash in online Quantum Katas. No customer impact since online Katas stayed with the older QDK version.

## QDK version 0.18.2108.160999

### 2021-09-01

- Fixed an issue where required metadata was missing for the [Microsoft.Quantum.Qir.Runtime](https://www.nuget.org/packages/Microsoft.Quantum.Qir.Runtime) NuGet package.

## QDK version 0.18.2108.160310

### 2021-08-31

- Alternative operation in [@SubstitutableOnTarget](/qsharp/api/qsharp/microsoft.quantum.targeting.substitutableontarget) doesn't need to be explicitly referred to anymore in [Microsoft.Quantum.AutoSubstitution](https://www.nuget.org/packages/Microsoft.Quantum.AutoSubstitution/) NuGet package.
- New `Workspace.get_targets()` method in azure-quantum package that returns a list of all available targets. Can filter by Provider ID or Target ID.
- An [issue](https://github.com/microsoft/iqsharp/issues/500) was resolved that prevented using IQ# or the `qsharp` Python package with Python 3.8 or 3.9 when using `conda`.
- Fixed an [issue](https://github.com/microsoft/qsharp-compiler/issues/768) where nested Conditional blocks may be incorrectly lifted.
- Resolved an [issue](https://github.com/microsoft/qsharp-compiler/issues/1112) where some code failed to compile previously for Quantinuum target.
- Added an option where QIR generation isn't target specific.
- Fixed a concurrency [bug](https://github.com/microsoft/qsharp-runtime/pull/798) that could cause intermittent crashes if multiple simulator instances are run in the same process.
- Released Azure CLI quantum extension version 0.7.0:
  - Provide compiler output to users if there was error for easier troubleshooting.
  - Fixed bug in which retrieving output from workspaces in a location different to another set as default failed.
  - Processing jobs that produce no output is allowed.

## QDK version 0.18.2107.153439

### 2021-07-27

- You can filter by job name, job status, and job creation time when listing jobs in azure-quantum.
- Fixed [regression](https://github.com/microsoft/qsharp-compiler/issues/1067) in Code Actions because of incompatibility with protocol in VS 16.10.x versions.
- Improved error message on IQ# `%azure.*` magic commands when no quantum computing targets are available.
- `azure-quantum` Python package fixes an [issue](https://github.com/microsoft/azure-quantum-python/issues/80) with MSAL Credentials on Windows and now requires minimum versions for all dependencies to mitigate other potential issues with older dependencies.
- Fixed a [bug in IQ#](https://github.com/microsoft/iqsharp/issues/448) in which job execution would fail if any operation was defined that wasn't supported on the given target.
- Fixed a [bug in IQ#](https://github.com/microsoft/iqsharp/issues/484) in which some programs targeting hardware that supports the [:::no-loc text="Basic Measurement Feedback"::: profile](xref:microsoft.quantum.target-profiles) were incorrectly being reported as not supported by the Azure Quantum target.
- Released Azure CLI quantum extension version 0.6.1:
  - Added command to request job cancellation: `az quantum job cancel`.
  - Fixed a bug in which job submissions in Azure Quantum that emit standard output were reported as failed, even if the job succeeded.
  - Enabled job submissions from a different directory using `--project` parameter.

## Azure Quantum service update 2021-07-27

- Parameter Free Population Annealing solver is now available through the Early Access plan in Azure Quantum. To sign up for early access, see [Apply for Azure Quantum Early Access](https://aka.ms/aq/preview).
- Terms banner in Review tab in Azure Quantum portal is hidden when only Microsoft provider is being added during workspace creation.

## QDK version 0.18.2106.148911

### 2021-06-25

- You can now configure how many solutions you want returned from a solver run.
- A new NuGet package [Microsoft.Quantum.AutoSubstitution](https://www.nuget.org/packages/Microsoft.Quantum.AutoSubstitution/), which when added to a Q# project, allows you to annotate operations with the `SubstitutableOnTarget(AltOp, Sim)` attribute. It then calls `AltOp` instead of the annotated operation, whenever it's executed using `Sim`.
- Integration with Azure-Identity provides more mechanisms to [authenticate](xref:microsoft.quantum.iqsharp.magic-ref.azure.connect) with Azure.
- The .NET [Microsoft.Azure.Management.Quantum](https://www.nuget.org/packages/Microsoft.Azure.Management.Quantum) now returns the Restricted Access URL so you can know more/apply for a restricted access plan.
- Preview support for noisy simulation in open systems and stabilizer representations [qsharp-runtime#714](https://github.com/microsoft/qsharp-runtime/issues/714). See [here](https://github.com/microsoft/qsharp-runtime/blob/0826903c0842ba99a923e79be9f072054fe44a43/documentation/preview-simulators.md) for documentation on preview simulators.
- Using [quantum-viz.js](https://github.com/microsoft/quantum-viz.js) as the engine to render the output from the jupyter notebook %trace magic.

## QDK version 0.17.2105.144881

### 2021-06-01

- Reverted a change in the `azure-quantum` Python client that could create authentication issues for some users (refer to issues [#66](https://github.com/microsoft/azure-quantum-python/issues/66), [#67](https://github.com/microsoft/azure-quantum-python/issues/67)).

## QDK version 0.17.2105.143879

### 2021-05-26

- Added a new function to the `azure-quantum` Python client to support the translation of binary optimization terms from `npz` to Azure Quantum. See full details in [QDK Python](https://github.com/microsoft/azure-quantum-python/pull/61).
- Published [QIR oracle generation sample](https://github.com/microsoft/Quantum/issues/496). This program allows turning classical Q# functions on Boolean inputs into quantum implementations of those functions in terms of Q# operations at the level of QIR. This allows, for example, to implement quantum algorithms that are used by many quantum algorithms readily as classical functions.
- Fixed a bug that prevents QIR generation from being enabled in the iqsharp-base Docker image. See details [here](https://github.com/microsoft/iqsharp/issues/432).
- Implemented new special functions, for example, `factorial` and `log-gamma`, in Microsoft.Quantum.Math (microsoft/QuantumLibraries#448). Thanks to @TheMagicNacho for the contribution (microsoft/QuantumLibraries#440)!
- C# Client: Changed input data format type to "v2" for Quantum Computing.
- Released Azure CLI quantum extension version 0.5.0: Adapted to 'az' tool version 2.23.0, adding user agent information on calls to Azure Quantum Service.

## Azure Quantum service update 2021-05-26

- Added PA (population annealing) and SSMC (substochastic Monte Carlo) solvers along with preview access via a specialized plan available to a subset of customers.
- Added support for new regions: Japan East, Japan West, UK South, UK West
- Set Provider in Failed state if provisioning fails. Previously it would be stuck in Launching/Updating state.
- Added help button in portal to direct user to support forum.
- Rendered provider cost in localized currency from Azure Marketplace.
- Added feedback button in portal to gather user feedback.
- Added quickstart guide in portal in overview blade.

## QDK version 0.16.2105.140472

### 2021-05-10

- Fixed dependency error in IQSharp on System.Text.Json when submitting jobs to Azure Quantum. See full details in issue [iqsharp#435](https://github.com/microsoft/iqsharp/issues/435).
- Resolved issue affecting joint measurements of multi-qubit states on some combinations of Pauli basis resulting in incorrect values. For details, refer to issue [qsharp-runtime#680](https://github.com/microsoft/qsharp-runtime/issues/680).

## QDK version 0.16.2104.138035

### 2021-04-27

- Improved Q# type inference based on the Hindley-Milner type inference algorithm.
- Added support for NumPy types in coefficient definitions for problems in QIO *azure-quantum* Python package.
- Updated control-plane swagger file to [support restricted access plans](https://github.com/Azure/azure-rest-api-specs/pull/13002).
- Added new `StreamingProblem` class in QIO *azure-quantum* Python package. It supports the same interface for adding terms to a problem definition as the `Problem` class. However, once terms are added to the problem they are queued to be uploaded by a background thread and are not kept in memory for future reference.
- Restored the packages size of Microsoft.Quantum.Sdk and Microsoft.Quantum.Compiler back to normal. (See related note in 0.15.2103.133969)
- Improved compiler performance.
- Released Azure CLI quantum extension version 0.4.0: Exposed URL for restricted access plans. Fixed regression on offerings commands dependent on Azure Marketplace APIs.

## QDK version 0.15.2103.133969

### 2021-03-30

- Released QIR emission as experimental feature (https://github.com/microsoft/qsharp-compiler/tree/main/src/QsCompiler/QirGeneration#qir-emission---preview-feature). The inclusion of the necessary LLVM packages, and in particular LlvmLibs, causes an increase in package size of the Microsoft.Quantum.Sdk and the Microsoft.Quantum.Compiler, and correspondingly to longer download times the first time the new versions are used. We're working on reducing that again in the future.
- Loosen restriction on AllowAtMostNCallsCA operation (https://github.com/microsoft/QuantumLibraries/pull/431).
- Added missing APIs for Math Library (https://github.com/microsoft/QuantumLibraries/issues/413).
- Removed <xref:Microsoft.Quantum.Environment.GetQubitsAvailableToBorrow> and <xref:Microsoft.Quantum.Environment.GetQubitsAvailableToUse> (https://github.com/microsoft/QuantumLibraries/issues/418).
- Fixed Q# Language Server fails during initialization in Visual Studio caused by JsonReaderException (https://github.com/microsoft/qsharp-compiler/issues/885).
- Added support for multiple entry points.
- Released Az CLI quantum extension version 0.3.0: Updated command 'az quantum workspace create' to require an explicit list of Quantum providers and remove a default. Fixed issue with incorrect location parameter during job submission.

## QDK version 0.15.2102.129448

### 2021-02-25

- Improved IQ# debug user experience by adding a horizontal scrollbar to scroll both execution path and basis state visualizations.
- New functions to represent the group product and group inverse on the single-qubit Clifford group, to quickly define common single-qubit Clifford operators, and to apply single-qubit Clifford operators as operations. For more information, see issue [#409](https://github.com/microsoft/QuantumLibraries/issues/409).
- Addressing security issue in the Microsoft Quantum Development Kit for Visual Studio Code extension. For details, refer to [CVE-2021-27082](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-27082).
- Released Az CLI quantum extension version 0.2.0: Added parameter '--provider-sku-list' to 'az quantum workspace create' to allow specification of Quantum providers. Added command group 'az quantum offerings' with 'list', 'accept-terms' and 'show-terms'.

## QDK version 0.15.2102.128318

### 2021-02-12

- Fix "'npm' is not recognized as an internal or external command" error during creation of Q# projects with Visual Studio Code extension. See issue [#848](https://github.com/microsoft/qsharp-compiler/issues/848). 

## QDK version 0.15.2101.126940

### 2021-01-29

- Added project templates to Q# compiler for executables targeting IonQ and Quantinuum providers
- Update IQ# kernel syntax highlighting to include changes to Q# syntax introduced in version [0.15.2101125897](#qdk-version-0152101125897)
- Bugfix to support passing arrays as input arguments to Q# programs submitted to Azure Quantum via `%azure.execute`, see issue [#401](https://github.com/microsoft/iqsharp/issues/401)
- Fix "Permission denied" error when using `az` in `iqsharp-base` Docker images, see issue [#404](https://github.com/microsoft/iqsharp/issues/404)
- Released Az CLI quantum extension version 0.1.0: Provided command-line tool for workspace management and quantum computing job submission.

## QDK version 0.15.2101125897

### 2021-01-26

- Simplified qubit allocation, providing more convenient syntax for allocating qubits, [see details in Q# language repository](https://github.com/microsoft/qsharp-language/blob/main/Approved/1-implicitly-scoped-qubit-allocation.md).
- Created azure-quantum-python repository that includes `azure-quantum`, the Python client for submitting quantum-inspired optimization jobs to the Azure Quantum service, and `qdk`, including `qdk.chemistry`, a Python-based convenience layer for the Q# chemistry library that includes molecular visualization and functionality to generate input files for several chemistry packages such as NWChem, Psi4, and OpenMolcas.
- Parentheses are now optional for operation and function types and `if`, `elif`, `while`, and `until` statements. Parentheses for `for`, `use`, and `borrow` statements have been deprecated.
- Improved width estimates for optimal depth, [see details](https://github.com/MicrosoftDocs/quantum-docs-pr/pull/1159).
- Apply unitary operation provided as explicit matrix using `ApplyUnitary` ([QuantumLibraries#391](https://github.com/microsoft/QuantumLibraries/pull/391), external contribution by Dmytro Fedoriaka)
- Fixed https://github.com/microsoft/iqsharp/issues/387 by mitigating performance impact on IQ# kernel startup.
