---
author: azure-quantum-content
description: Learn how to submit Qiskit quantum circuits to the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 10/17/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: Submit Qiskit quantum circuits to Azure Quantum
zone_pivot_groups: ide-local-simulator
uid: microsoft.quantum.quickstarts.computing.qiskit
--- 

# How to submit a circuit with Qiskit to Azure Quantum

Learn how to submit a Qiskit quantum circuit with the Azure Quantum Development Kit (QDK). You can submit Qiskit circuits to Azure Quantum using the Azure Quantum Development Kit (QDK) and Jupyter Notebook in Visual Studio Code (VS Code). You can also test your circuits using the local sparse simulator. The QDK supports versions 1 and 2 of Qiskit.

For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

::: zone pivot="platform-local"

[!INCLUDE [local-procedure](includes/quickstart-qiskit-include-local.md)]

::: zone-end

::: zone pivot="platform-simulator"

[!INCLUDE [local-simulator-procedure](includes/quickstart-qiskit-include-simulator.md)]

::: zone-end

## Next steps

- [Quickstart: Submit a circuit with Cirq to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.cirq).
- [Quickstart: Submit a circuit with a provider-specific format to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.provider).
