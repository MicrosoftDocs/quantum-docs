---
author: SoniaLopezBravo
description: This document provides a basic guide to run resource estimates both locally and online using different SDKs and IDEs.
ms.author: sonialopez
ms.date: 01/07/2024
ms.service: azure-quantum
ms.subservice: computing
ms.custom:
ms.topic: how-to
title: Run Resource Estimates with Different SDKs and IDEs
uid: microsoft.quantum.submit-resource-estimation-jobs
no-loc: [target, targets]
zone_pivot_groups: ide-local-portal-jupyter
---

# How to use different SDKs and IDEs with the Resource Estimator

In this article, you'll learn to work with the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). The Resource Estimator is available both in VS Code and online in Azure portal.

The following table shows the different ways to run the Resource Estimator.

|User scenario|Platform| Tutorial|
|---|---|---|
|Estimate the resources of a Q# program|Visual Studio Code| Select **Q# in VS Code** at the top of the page|
|Estimate the resources of a Q# program (advanced)|Jupyter Notebook in Visual Studio Code| Select **Q# in Jupyter Notebook** at the top of the page|
|Estimate the resources of a Qiskit program|Azure Quantum portal|Select **Qiskit in Azure portal** at the top of the page|
|Estimate the resources of a QIR program|Azure Quantum portal| [Submit QIR](xref:microsoft.quantum.tutorial.resource-estimator.qir)|
|Use FCIDUMP files as argument parameters (advanced)| Visual Studio Code| [Submit a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)|

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

::: zone pivot="platform-local"

[!INCLUDE [local-procedure](includes/how-to-submit-resources-estimation-include-qsharp-local.md)]

::: zone-end

::: zone pivot="platform-local-jupyter"

[!INCLUDE [local-jupyter-procedure](includes/how-to-submit-resources-estimation-include-jupyter-local.md)]

::: zone-end

::: zone pivot="platform-portal-qiskit"

[!INCLUDE [portal-qiskit-procedure](includes/how-to-submit-resources-estimation-include-qiskit.md)]

::: zone-end


> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator).

## Next steps

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Tutorial: Submit a QIR program to the Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
