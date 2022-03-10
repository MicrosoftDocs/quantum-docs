---
author: mblouin
description: This document provides a step-by-step guide to get you started with quantum computing on Azure Quantum
ms.author: mblouin
ms.date: 01/27/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: quickstart
ms.custom: mode-api
title: 'Quickstart: Create a quantum random number generator'
uid: microsoft.quantum.quickstarts.computing
zone_pivot_groups: quantum-computing-platforms
---

# Quickstart: Create a quantum-based random number generator in Azure Quantum

Learn how to use Azure Quantum to create a simple quantum-based random number generator. 

::: zone pivot="platform-ionq"

[!INCLUDE [ionq-procedure](includes/quickstart-qc-include-ionq.md)]

::: zone-end


::: zone pivot="platform-quantinuum"

[!INCLUDE [quantinuum-procedure](includes/quickstart-qc-include-quantinuum.md)]

::: zone-end

> [!NOTE]
> If you run into an error while working with Azure Quantum, you can check our [list of common issues](xref:microsoft.quantum.azure.common-issues).

## Next steps

This quickstart demonstrated how to get started running Q# programs against different quantum computing simulators and QPUs. For more information on the available providers, see the [Quantum computing provider overview](xref:microsoft.quantum.reference.qc-target-list) documentation.

We recommend you continue your journey by learning more about the [different types of targets in Azure Quantum](xref:microsoft.quantum.target-profiles), which dictate the types of Q# programs you can run against a given provider. You might also be interested in learning [how to submit Q# jobs](xref:microsoft.quantum.submit-jobs) with Python, Jupyter Notebooks, or the Azure CLI.

Looking for more samples to run? Check out the [samples directory](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum) for Azure Quantum.

Lastly, if you would like to learn more about writing Q# programs please see the [Q# programming language user guide](xref:microsoft.quantum.user-guide-qdk.overview).
