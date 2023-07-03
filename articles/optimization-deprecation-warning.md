---
author: SoniaLopezBravo
description: A
ms.author: sonialopez
ms.date: 06/28/2023
ms.service: azure-quantum
ms.subservice: core  
ms.topic: reference
title: Deprecation notice for optimization
uid: microsoft.quantum.optimization.deprecation-redirect
---

# Important Update: Quantum-inspired optimization deprecation

Quantum-inspired optimization solutions are no longer part of the Azure Quantum service after **June 30th, 2023**. The Microsoft QIO and 1QBit optimization solvers are deprecated and aren't available. You can still submit optimizations jobs to [Toshiba SQBM+](xref:microsoft.quantum.providers.optimization.toshiba) solver. 

When you try to submit an optimization job to Microsoft QIO or 1QBit providers in Azure Quantum, you get the following error message:

```output
Error code: InvalidJobDefinition
Error message: The target specified does not exist or is not enabled for the workspace.
```
> [!TIP]
> [Toshiba SQBM+](xref:microsoft.quantum.providers.optimization.toshiba) provider is still available in Azure Quantum.

For further questions, you can contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

> [!NOTE]
> If you have any questions or run into any issue using Azure Quantum, bookmark [Azure Quantum office hours](https://aka.ms/AQ/OfficeHours) and join our open office hours every Thursday 8∶30 AM Pacific Time zone (PT).
