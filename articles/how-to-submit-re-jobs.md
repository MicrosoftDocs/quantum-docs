---
author: SoniaLopezBravo
description: This document provides a basic guide to submit jobs to the Azure Quantum Resources Estimator
ms.author: sonialopez
ms.date: 11/10/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: how-to
title: Submit jobs to the Resource Estimator target
uid: microsoft.quantum.submit-resource-estimation-jobs
zone_pivot_groups: azurequantum-quantumcomputing-re-ide
---

# Use different SDKs and IDEs with Resource Estimator

In this article, you'll learn to work with the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) using different SDKs and development environments. As a running example, you'll estimate and analyze the physical resource estimates of a quantum program targeted on a fault-tolerant quantum computer.

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The **Azure Quantum Resource Estimator target** enabled in your workspace. If you don't know how to do it, see [Enabling the Resource Estimator target](xref:microsoft.quantum.quickstarts.computing.resources-estimator#enable-the-resources-estimator-in-your-workspace).

## Run the Azure Quantum Resource Estimator

Usage of the Azure Quantum Resource Estimator is similar to submitting a job against other software and hardware providers in Azure Quantum.
You define your program, set a target, and submit your job for computation. To use the Azure Quantum Resource Estimator, the target is the `microsoft.estimator`. 

When you set the target, you can provide additional optional parameters such as the qubit type, one qubit gate time, etc. 
The Azure Quantum Resource Estimator will return detailed output that can be visually rendered or programmatically parsed. For more information about input and output parameters, see [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator).

- Job type: Simulation (Estimation)
- Provider Id: `microsoft`
- Target ID: `microsoft.estimator`

::: zone pivot="ide-python-qsharp"

[!INCLUDE [python-qsharp-procedure](includes/how-to-submit-resources-estimation-include-python.md)]

::: zone-end

::: zone pivot="ide-portal-qiskit"

[!INCLUDE [portal-qiskit-procedure](includes/how-to-submit-resources-estimation-include-qiskit.md)]

::: zone-end

::: zone pivot="ide-vscode-qsharp"

[!INCLUDE [vscode-qsharp-procedure](includes/how-to-submit-resources-estimation-include-vscode.md)]

::: zone-end

## Next steps

- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Tutorial: Submit a QIR program to the Azure Quantum Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
- [Sample: Resource estimation with Q# and VS Code](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/integer-factorization-with-cli)
