---
author: azure-quantum-content
description: Learn how to submit Cirq quantum circuits to the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 06/03/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: Submit Cirq quantum circuits to Azure Quantum
zone_pivot_groups: ide-local-portal
uid: microsoft.quantum.quickstarts.computing.cirq
--- 

# How to submit a circuit with Cirq to Azure Quantum

Learn how to submit a Cirq quantum circuit using the `azure-quantum` Python package. You can submit Cirq circuits to Azure Quantum using the Azure Quantum notebook, which have built-in `azure-quantum` Python package, or from your local machine.

For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

::: zone pivot="platform-local"

[!INCLUDE [local-procedure](includes/quickstart-cirq-include-local.md)]

::: zone-end

::: zone pivot="platform-portal"

[!INCLUDE [portal-procedure](includes/quickstart-cirq-include-portal.md)]

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

## Related content

- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit).
- [Quickstart: Submit a circuit with a provider-specific format to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.provider).
