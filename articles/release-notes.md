---
title: Latest release notes for QDK and Azure Quantum 2023
description: Learn about the latest updates to the Microsoft Quantum Development Kit (QDK) and Azure Quantum.
ms.date: 11/22/2023
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, Basic measurement feedback, target, targets]
uid: microsoft.quantum.relnotes-qdk
---

# Latest release notes for Quantum Development Kit (QDK) and Azure Quantum - 2023

This article outlines updates to the [Quantum Development Kit (QDK)](xref:microsoft.quantum.overview.q-sharp) and the [Azure Quantum service](xref:microsoft.quantum.azure-quantum-overview).

For 'getting started' instructions, see [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview). For instructions on how to update your QDK to the latest version, see [Update the Quantum Development Kit (QDK) to the latest version](xref:microsoft.quantum.update-qdk).

## Latest azure-quantum python version 0.29.0

### 2023-11-22

- Added two input parameters `maxDuration` and `maxPhysicalQubits` to [specify constraints for resource estimation solutions](xref:microsoft.quantum.overview.resources-estimator#constraints).
- Added support for handling partial success in batch jobs in Resource Estimator, by displaying `No solution found` as an output for job results.
- The [azure-quantum](https://pypi.org/project/azure-quantum/) python SDK now ships separately from the rest of the Classic QDK. The first version available as a standalone release is 0.29.0.
- The previous qdk-python GitHub repository has been renamed [azure-quantum-python](https://github.com/microsoft/azure-quantum-python) to better reflect the purpose and content of the repository.
- The [qdk](https://pypi.org/project/qdk/) python package for qdk.chemistry python interop has been deprecated and it will no longer be maintained or receive further updates.

## Latest QDK version 0.28.302812

### 2023-09-15

- You can now generate resource estimation profiles to learn how operations in your quantum program contribute to the overall cost; learn how to use in the [Azure Quantum documentation](xref:microsoft.quantum.work-with-resource-estimator#use-profiling-to-analyze-the-structure-of-your-program).
- You can now call `result.json` to get the JSON representation of a resource estimation result.
- Updated IonQ cost estimation function for aria-1 to use minimum job pricing of $97.50 (this assumes that error mitigation is enabled by default). Learn more about [IonQ pricing](xref:microsoft.quantum.providers-pricing#ionq) or how to enable/disable [error mitigation](xref:microsoft.quantum.providers.ionq#error-mitigation).
- Removed deprecated Quantinuum target names. See full list of Quantinuum [supported targets](xref:microsoft.quantum.providers.quantinuum#targets).

## QDK version 0.28.291394

### 2023-07-31

- Added a support of [custom distillation units](xref:microsoft.quantum.overview.resources-estimator#distillation-units). Resource Estimator now accepts your custom definitions of distillation algorithms that can be applied to physical or logical qubits.
- Added more granularity of [physical qubit error definitions](xref:microsoft.quantum.overview.resources-estimator#customize-predefined-qubit-parameters): idle error rates for all types of qubits and 'readout' and 'process' error rates for Majorana qubit measurements.
- You can now use the [result.diagram endpoint](xref:microsoft.quantum.learn-how-resource-estimator-works#space-time-diagrams) to visualize your algorithm's estimated runtime and space requirements.
- Added [rQOPS](/azure/quantum/overview-resources-estimator#physical-qubits) to the resource estimation results summary.
- Breaking change: Removed the ability to submit jobs to Microsoft QIO targets or 1QBit targets, as these have now been deprecated.

## QDK version 0.28.277227

### 2023-06-05

- Added support for [sessions](/azure/quantum/hybrid-computing-interactive?tabs=tabid-iqsharp) to improve experience for interactive hybrid algorithms.
- You can now use a unified and convenient resource estimation client API to submit jobs from Q#, Qiskit, and QIR.
- In Q# Jupyter notebooks, fixed an issue [microsoft/iqsharp#776](https://github.com/microsoft/iqsharp/pull/776) where Q# exceptions would cause the notebook kernel to run out of memory.
- Removed references to previously deprecated Rigetti Aspen M-2 target.
- Added a warning that Microsoft QIO solvers will be deprecated and no longer available in Azure Quantum after June 30, 2023.

## QDK version 0.28.263081

### 2023-03-29

- Added [Q# Azure Quantum Resource Estimator API](/azure/quantum/how-to-work-with-re#how-to-handle-large-programs) to aid with estimation of large programs.
- In the azure-quantum package, we simplified the experience to submit QIR jobs to the resource estimator.
- In the azure-quantum package, the Qiskit provider object now provides a list of backends and ability to filter and acquire backends.
- Fixed the hard-coded tolerance in [AssertOperationsEqualInPlace](/qsharp/api/qsharp/microsoft.quantum.diagnostics.assertoperationsequalinplace) and added a call to reset all auxiliary qubits at the end of their scope. Fixes [microsoft/qsharp-runtime#1129](https://github.com/microsoft/qsharp-runtime/issues/1129).
- The local Resources Estimator has been removed. [The Azure Quantum Resource Estimator](/azure/quantum/intro-to-resource-estimation) is now available through Azure Quantum.

## QDK version 0.27.258160

### 2023-03-01

- In Q# Jupyter notebooks, fixed an issue where `%azure.connect` would take several minutes before succeeding in certain environments. For more information, see [microsoft/Quantum#762](https://github.com/microsoft/Quantum/issues/762).
- Removed support for Rigetti Aspen-11 Quantum Processor due to deprecation. For other targets available, see the [Rigetti provider](/azure/quantum/provider-rigetti?tabs=tabid-pyquil) documentation.
- Added a warning that the [local Resources Estimator](/azure/quantum/machines/resources-estimator) will be removed in March 2023. The Azure Quantum Resource Estimator is now available through [Azure Quantum](/azure/quantum/intro-to-resource-estimation).

## QDK version 0.27.253010

### 2023-01-31

- Added support for Rigetti [Aspen-M-3](/azure/quantum/provider-rigetti?tabs=tabid-pyquil#aspen-m-3) Quantum Processor.
- Compiler errors related to hardware capabilities are now warnings by default. Programs with these warnings may or may not run on a specific target, but they are validated by the Azure Quantum service before execution and users are not to be charged if the program does not pass validation.
- The Q# compiler now uses LLVM 14 to generate QIR.
- In the [iqsharp-base](https://mcr.microsoft.com/product/quantum/iqsharp-base/about) image, removed support for .NET Core 3.1, since it is [end-of-life](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). Upgraded various packages in the image and made small improvements to decrease container size. Fixes [microsoft/iqsharp#757](https://github.com/microsoft/iqsharp/pull/754).
- In the azure-quantum package, fixed `cost_estimate()` pricing for IonQ Aria from \\$0.00022 per one qgs to \\$0.0002205 per one qgs.
