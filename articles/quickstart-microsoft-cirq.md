---
author: bradben
description: Learn how to submit Cirq quantum circuits to the Azure Quantum service.
ms.author: brbenefield
ms.date: 08/17/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Python', '$$v']
title: Submit Cirq quantum circuits to Azure Quantum
zone_pivot_groups: quantum-computing-platforms
uid: microsoft.quantum.quickstarts.computing.cirq
--- 

# Quickstart: Submit a circuit with Cirq to Azure Quantum

Learn how to use the [`azure-quantum` Python package](xref:microsoft.quantum.install-qdk.overview.python-only) to submit [Cirq](https://github.com/quantumlib/Cirq) quantum circuits to an IonQ or Quantinuum quantum computing target via the Azure Quantum service. For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

For information on how to submit a circuit with Qiskit, see [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- Create an Azure Quantum workspace and enable your preferred provider, Quantinuum or IonQ (or both), for this scenario. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- Install the latest [`azure-quantum` Python package](xref:microsoft.quantum.install-qdk.overview.python-only) using the \[cirq\] tag.

    > [!TIP]
    > If you are using [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads), you can optionally create a new environment by downloading [environment.yml](https://github.com/microsoft/qdk-python/blob/main/azure-quantum/environment.yml) and running the following:
    >
    >```shell
    >conda env create -f environment.yml
    >```
    >
    > This creates a new conda environment that you can activate with the following:
    >
    >```shell
    >conda activate azurequantum

- Start your favorite code editor or interactive Python tool, such as [VS Code](https://code.visualstudio.com/docs/python/jupyter-support-py), [Jupyter](https://jupyter.readthedocs.io/en/latest/content-quickstart.html) or [iPython](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html).

::: zone pivot="platform-ionq"

[!INCLUDE [ionq-procedure](includes/quickstart-cirq-include-ionq.md)]

::: zone-end

::: zone pivot="platform-quantinuum"

[!INCLUDE [quantinuum-procedure](includes/quickstart-cirq-include-quantinuum.md)]

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

