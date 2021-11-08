---
author: guenp
description: Learn how to submit Qiskit quantum circuits to the Azure Quantum service.
ms.author: guenp
ms.date: 09/22/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Python', '$$v']
title: Submit Qiskit quantum circuits to Azure Quantum
zone_pivot_groups: quantum-computing-platforms
uid: microsoft.quantum.quickstarts.computing.qiskit
--- 

# Quickstart: Submit a circuit with Qiskit to Azure Quantum

Learn how to use the `azure-quantum` Python package to submit Qiskit quantum circuits to an IonQ or Honeywell quantum computing target via the Azure Quantum service. For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

- To work in Azure Quantum, you need an Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/).
- Create an Azure Quantum workspace and enable your preferred provider, Honeywell or IonQ (or both), for this scenario. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- Install the latest [`azure-quantum` Python package](xref:microsoft.quantum.install-qdk.overview.python-only).

    > [!TIP]
    > If you are using [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads), you can optionally create a new environment by downloading [environment.yml](https://github.com/microsoft/qdk-python/blob/main/azure-quantum/environment.yml) and running the following:
        >```shell
        >conda env create -f environment.yml
        >```
        > This creates a new conda environment that you can activate with the following:
        >```shell
        >conda activate azurequantum

- Start your favorite code editor or interactive Python tool, such as [VS Code](https://code.visualstudio.com/docs/python/jupyter-support-py), [Jupyter](https://jupyter.readthedocs.io/en/latest/content-quickstart.html) or [iPython](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html).

::: zone pivot="platform-ionq"

[!INCLUDE [ms-procedure](includes/quickstart-qiskit-include-ionq.md)]

::: zone-end

::: zone pivot="platform-honeywell"

[!INCLUDE [ms-procedure](includes/quickstart-qiskit-include-honeywell.md)]

::: zone-end


