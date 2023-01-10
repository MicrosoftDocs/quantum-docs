---
author: bradben
description: Learn how to submit Qiskit quantum circuits to the Azure Quantum service.
ms.author: brbenefield
ms.date: 01/10/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Python', '$$v']
title: Submit Qiskit quantum circuits to Azure Quantum
zone_pivot_groups: quantum-computing-platforms-rigetti
uid: microsoft.quantum.quickstarts.computing.qiskit
--- 

# Quickstart: Submit a circuit with Qiskit to Azure Quantum

Learn how to use the `azure-quantum` Python package to submit Qiskit quantum circuits to an IonQ, Quantinuum, or Rigetti quantum computing target via the Azure Quantum service. For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- Create an Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- Install the latest [`azure-quantum` Python package](xref:microsoft.quantum.install-qdk.overview#use-python-with-qiskit-or-cirq-or-azure-quantum-optimization-solvers) using the \[qiskit\] tag.

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

> [!NOTE]
> The examples in this Quickstart use a Jupyter Notebook environment. From your conda environment, run `Jupyter Notebook`.

::: zone pivot="platform-ionq"

[!INCLUDE [ionq-procedure](includes/quickstart-qiskit-include-ionq.md)]

::: zone-end

::: zone pivot="platform-quantinuum"

[!INCLUDE [quantinuum-procedure](includes/quickstart-qiskit-include-quantinuum.md)]

::: zone-end

::: zone pivot="platform-rigetti"

[!INCLUDE [rigetti-procedure](includes/quickstart-qiskit-include-rigetti.md)]

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
 

