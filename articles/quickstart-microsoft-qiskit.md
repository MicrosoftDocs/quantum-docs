---
author: guenp
description: Learn how to install the Azure Quantum SDK for Python to submit Quantum circuits to Azure Quantum.
ms.author: guenp
ms.date: 09/22/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Python', '$$v']
title: Submit quantum circuits to IonQ and Honeywell with Python
zone_pivot_groups: quantum-computing-platforms
uid: microsoft.quantum.install-qdk.overview.azure-sdk-python
--- 

# Quickstart: Submit Qiskit, Cirq, or native quantum circuits to IonQ and Honeywell with Python

Learn how to use the `azure-quantum` Python package to submit Qiskit, Cirq, or native quantum circuits (OpenQASM or IonQ JSON) to Azure Quantum. For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

- To work in Azure Quantum, you need an Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/).
- Create an Azure Quantum workspace and enable your preferred provider, Honeywell or IonQ, or both) for this scenario. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Install the `azure-quantum` Python package

The `azure-quantum` Python package contains the necessary functionality for connecting to the Azure Quantum Workspace and submit quantum circuits to the quantum computing targets such as [IonQ](xref:microsoft.quantum.providers.ionq) and [Honeywell](xref:microsoft.quantum.providers.honeywell).

1. Install [Python](https://www.python.org/downloads/) 3.6 or later in case you haven't already.
1. Install [PIP](https://pip.pypa.io/en/stable/) and ensure you have **version 19.2 or higher**.
    > Optionally, if you are using [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads), create a new environment by downloading the [environment.yml](https://github.com/microsoft/qdk-python/blob/main/azure-quantum/environment.yml) file and running the following:

    >```shell
    >conda env create -f environment.yml
    >```

    > This creates a new conda environment that you can activate with the following:

    >```shell
    >conda activate azurequantum
    >```

1. Install the `azure-quantum` package using pip, adding the necessary dependency for your desired code source:

    ```shell
    // for native quantum circuits
    pip install azure-quantum
    // for Cirq
    pip install azure-quantum[cirq]
    // for Qiskit
    pip install azure-quantum[qiskit]
    ```

1. Start your favorite code editor or interactive Python tool, such as [VS Code](https://code.visualstudio.com/docs/python/jupyter-support-py), [Jupyter](https://jupyter.readthedocs.io/en/latest/content-quickstart.html) or [iPython](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html).

Select your code source from the following: 

::: zone pivot="platform-ionq"

[!INCLUDE [ms-procedure](includes/quickstart-qiskit-include-ionq.md)]

::: zone-end

::: zone pivot="platform-honeywell"

[!INCLUDE [ms-procedure](includes/quickstart-qiskit-include-honeywell.md)]

::: zone-end


