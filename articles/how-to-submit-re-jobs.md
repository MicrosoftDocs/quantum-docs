---
author: azure-quantum-content
description: This document provides a basic guide to run resource estimates both locally and online using different SDKs and IDEs.
ms.author: quantumdocwriters
ms.date: 02/09/2026
ms.service: azure-quantum
ms.custom:
ms.topic: how-to
title: Run the Microsoft Quantum resource estimator
uid: microsoft.quantum.submit-resource-estimation-jobs
no-loc: ["Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Azure Quantum", "Azure", "Q#", "Python", "Jupyter Notebook", "Jupyter", "target", "targets"]
zone_pivot_groups: ide-local-jupyter-qiskit
---

# Different ways to run the Microsoft Quantum resource estimator

In this article, you learn how to work with the [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator). The resource estimator helps you estimate the resources required to run a quantum program on a quantum computer. Use the resource estimator to estimate the number of qubits, the number of gates, and the depth of the circuit required to run a quantum program.

The resource estimator is available in Visual Studio Code (VS Code) as part of the Microsoft Quantum Development Kit (QDK) extension. For more information, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

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
> If you experience issues when you work with the resource estimator, then see the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next steps

- [Understand the results of the Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Handle large programs with the Microsoft Quantum resource estimator](xref:microsoft.quantum.resource-estimator-caching)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
