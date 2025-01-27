---
author: bradben
description: This document provides a basic guide to submit and run Azure Quantum using the Azure portal, Python, Jupyter Notebooks, or the Azure CLI.
ms.author: sonialopez
ms.date: 01/17/2025
ms.service: azure-quantum
ms.subservice: core
ms.custom: devx-track-azurecli
ms.topic: how-to
title: Submit Q# Programs with VS Code
no-loc: [target, targets]
uid: microsoft.quantum.submit-jobs
zone_pivot_groups: azurequantum-quantumcomputing-ide
---

# How to submit Q# programs with Visual Studio Code

Learn how to use Visual Studio Code to create and submit Q# programs to real quantum hardware. You can submit quantum computing jobs to Azure Quantum as a standalone Q# program, combine Q# with Python in a Q# project, and run a Jupyter Notebook.

[!INCLUDE [Azure Quantum credits deprecation banner](includes/azure-quantum-credits.md)]


::: zone pivot="ide-qsharp"

[!INCLUDE [qsharp-procedure](includes/how-to-submit-quantum-include-qsharp.md)]

::: zone-end

::: zone pivot="ide-jupyter"

[!INCLUDE [jupyter-procedure](includes/how-to-submit-quantum-include-jupyter.md)]

::: zone-end

::: zone pivot="ide-python"

[!INCLUDE [python-procedure](includes/how-to-submit-quantum-include-python.md)]

::: zone-end

## Related content

- [Work with Azure Quantum jobs](xref:microsoft.quantum.work-with-jobs)
- [Quantum computing providers](xref:microsoft.quantum.reference.qc-target-list)
