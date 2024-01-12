---
author: bradben
description: Learn how to submit provider-formatted quantum circuits with OpenQASM and IonQ JSON to the Azure Quantum service.
ms.author: brbenefield
ms.date: 11/16/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Python', '$$v', target, targets]
title: Submit provider-formatted quantum circuits
zone_pivot_groups: ide-local-portal
uid: microsoft.quantum.quickstarts.computing.provider
--- 

# Quickstart: Submit a circuit with a provider-specific format to Azure Quantum

Learn how to use the `azure-quantum` Python package to submit provider-specific formatted quantum circuits to a quantum computing target via the Azure Quantum service.

For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

::: zone pivot="platform-local"

[!INCLUDE [local-procedure](includes/quickstart-provider-include-local.md)]

::: zone-end

::: zone pivot="platform-portal"

[!INCLUDE [portal-procedure](includes/quickstart-provider-include-portal.md)]

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

- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit).
- [Quickstart: Submit a circuit with Cirq to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.cirq).