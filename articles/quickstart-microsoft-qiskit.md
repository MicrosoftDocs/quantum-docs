---
author: bradben
description: Learn how to submit Qiskit quantum circuits to the Azure Quantum service.
ms.author: brbenefield
ms.date: 11/15/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: Submit Qiskit quantum circuits to Azure Quantum
zone_pivot_groups: ide-local-portal
uid: microsoft.quantum.quickstarts.computing.qiskit
--- 

# How to submit a circuit with Qiskit to Azure Quantum

Learn how to submit a Qiskit quantum circuit using the `azure-quantum` Python package. You can submit Qiskit circuits to Azure Quantum using an Azure Quantum notebook, which has a built-in `azure-quantum` Python package, or from your local machine. You can also test your circuits using the local sparse simulator.

For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

::: zone pivot="platform-local"

[!INCLUDE [local-procedure](includes/quickstart-qiskit-include-local.md)]

::: zone-end

::: zone pivot="platform-portal"

[!INCLUDE [portal-procedure](includes/quickstart-qiskit-include-portal.md)]

::: zone-end

::: zone pivot="platform-simulator"

[!INCLUDE [local-simulator-procedure](includes/quickstart-qiskit-include-simulator.md)]

::: zone-end

> [!IMPORTANT]
> Submitting multiple circuits on a single job is currently not supported. As a workaround you can call the `backend.run` method to submit each circuit asynchronously, then fetch the results of each job. For example:
>
> ```python
> jobs = []
> for circuit in circuits:
>     jobs.append(backend.run(circuit, shots=N))
> 
> results = []
> for job in jobs:
>     results.append(job.result())
>```

## Next steps

- [Quickstart: Submit a circuit with Cirq to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.cirq).
- [Quickstart: Submit a circuit with a provider-specific format to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.provider).