---
author: bradben
description: Learn how to set up the Azure Quantum Development Kit VS Code extension and set up your environment for different languages and platforms.
ms.author: brbenefield
ms.date: 07/05/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concept-article
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Set up the Quantum Development Kit Extension
uid: microsoft.quantum.install-qdk.overview
#customer intent: As a quantum developer, I want to configure my environment with the latest Azure Quantum tools. 
---

# Set up the Quantum Development Kit extension

The Quantum Development Kit (QDK).

## Prerequisites

To set up the QDK, you need:

- Install [VS Code](https://code.visualstudio.com/download).
- To submit jobs to Azure Quantum, you need an Azure account and a quantum workspace. For more information, see Create an Azure Quantum workspace. 

## Install the QDK extension

Install the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension. You can also run the QDK in [VS Code for the Web](https://vscode.dev/quantum) without installing the extension.

> [!NOTE]
> If you used previous versions of the QDK, run `python -m pip uninstall qsharp qsharp-core qsharp-chemistry azure-quantum` to avoid package version conflicts.

That's it. You can now write, debug, and run Q# programs against the built-in quantum simulator, or if you already have an Azure account, connect and submit Q# programs to quantum hardware, all from VS Code.

To test your setup, see [Submit Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp)

### Add support for Python and Jupyter Notebooks

With added Python support, you can embed or call Q# code from your Python programs or Jupyter Notebooks and run them on the built-in quantum simulator, or connect to your Azure workspace and submit your jobs to quantum hardware, all from VS Code.

**Prerequisites**

- A Python environment  (3.9 or greater, 3.11 recommended) with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed. 
- VS Code with the QDK extension installed.


To add Python and Jupyter Notebook support:

1. Install the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
1. Install the `qsharp` and `azure-quantum` packages:

    ```cmd
    python -m pip install qsharp azure-quantum
    ```

1. For Qiskit or Cirq support, install `azure-quantum` using the [qiskit] or [cirq] parameters:

    > [!IMPORTANT]
    > If you are updating from a previous Qiskit environment, see [Update the azure-quantum package with Qiskit support](xref:microsoft.quantum.update-qdk#update-azure-quantum-with-qiskit-support).

    ```cmd
    python -m pip install azure-quantum[qiskit]
    or
    python -m pip install azure-quantum[cirq]
    or
    python -m pip install azure-quantum[qiskit, cirq]
    ```

1. Install optional Python packages you may need to display results and work in Jupyter Notebooks:

    ```cmd
    python -m pip install ipykernel ipympl jupyterlab
    ```

To test your setup, see [Submit Q# jobs with Python](xref:microsoft.quantum.submit-jobs?pivots=ide-python) or [Submit Q# jobs with Jupyter Notebooks](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter).

### Add support for Azure CLI

The Azure CLI is an optional method for submitting quantum jobs using a terminal window in VS Code. 

1. Install the [Azure CLI](/cli/azure/install-azure-cli). 
1. Install the latest Azure CLI `quantum` extension. Open a command prompt and run the following command:

    ```cmd
    az extension add \
        --upgrade \
        -n quantum
    ```
    
To test your setup, see [Submit Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-python).

## Related content

Using the Azure portal:

- [Work with Jupyter notebooks on Azure Quantum](xref:microsoft.quantum.how-to.notebooks)
- [Create and submit a Qiskit circuit](xref:microsoft.quantum.quickstarts.computing.qiskit) to quantum hardware.
