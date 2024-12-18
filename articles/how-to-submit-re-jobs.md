---
author: SoniaLopezBravo
description: This document provides a basic guide to run resource estimates both locally and online using different SDKs and IDEs.
ms.author: sonialopez
ms.date: 12./18/2024
ms.service: azure-quantum
ms.custom:
ms.topic: how-to
title: Run the Resource Estimator
uid: microsoft.quantum.submit-resource-estimation-jobs
no-loc: [target, targets]
zone_pivot_groups: ide-local-jupyter-qiskit
---

# Different ways to run the Resource Estimator

In this article, you learn to work with the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). The Resource Estimator helps you estimate the resources required to run a quantum program on a quantum computer. You can use the Resource Estimator to estimate the number of qubits, the number of gates, and the depth of the circuit required to run a quantum program.

The Resource Estimator is available in Visual Studio Code with the Quantum Development Kit extension. For more information, see [Install the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).

> [!WARNING]
> The Resource Estimator in Azure portal is deprecated. We recommend that you transition to the local Resource Estimator in Visual Studio Code provided in the [Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).

::: zone pivot="platform-local"

[!INCLUDE [local-procedure](includes/how-to-submit-resources-estimation-include-qsharp-local.md)]

::: zone-end

::: zone pivot="platform-local-jupyter"

[!INCLUDE [local-jupyter-procedure](includes/how-to-submit-resources-estimation-include-jupyter-local.md)]

::: zone-end

::: zone pivot="platform-qiskit"

[!INCLUDE [portal-qiskit-procedure](includes/how-to-submit-resources-estimation-include-qiskit.md)]

::: zone-end

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next steps

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Handle large programs with the Resource Estimator](xref:microsoft.quantum.resource-estimator-caching)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
