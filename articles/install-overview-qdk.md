---
author: bradben
description: Learn how to set up the Azure Quantum Development Kit VS Code extension and set up your environment for different languages and platforms.
ms.author: brbenefield
ms.date: 07/05/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Set up the Quantum Development Kit Extension
uid: microsoft.quantum.install-qdk.overview
#customer intent: As a quantum developer, I want to configure my environment with the latest Azure Quantum tools. 
---

# Set up the Quantum Development Kit extension

In this article, you learn how to install the Azure Quantum Development Kit (QDK) extension for Visual Studio Code and add support for Python, Jupyter Notebooks, and the Azure CLI.

## Prerequisites

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download).
- If you want to submit jobs to Azure Quantum, you also need an Azure account with a quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Install the QDK extension

To use the QDK in Visual Studio Code, install the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). You can also use the QDK in [VS Code for the Web](https://vscode.dev/quantum) without installing the extension, but you won't have all the features of VS Code Desktop. For more information, see [Different ways to run Q# programs](xref:microsoft.quantum.qsharp-ways-to-work).

> [!NOTE]
> If you used previous versions of the QDK, run `python -m pip uninstall qsharp qsharp-core qsharp-chemistry azure-quantum` to avoid package version conflicts.

You can now write, debug, and run Q# programs against the built-in quantum simulator or, if you have an Azure account, connect and submit Q# programs to quantum hardware, all from VS Code.

To test your setup, see [Submit Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp).

## Add support for Python and Jupyter Notebooks

With Python support in Visual Studio Code, you can embed or call Q# code from your Python programs or Jupyter Notebooks and run them on the built-in quantum simulator, or connect to your Azure workspace and submit your jobs to quantum hardware.

### Prerequisites

- A Python environment (3.9 or greater, 3.11 recommended) with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- VS Code with the QDK extension installed.

### Install the required packages

To add Python and Jupyter Notebook support:

1. Install the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
1. Open the command line.
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

1. Install optional Python packages you might need to display results and work in Jupyter Notebooks:

    ```cmd
    python -m pip install ipykernel ipympl jupyterlab
    ```

To test your setup, see [Submit Q# jobs with Python](xref:microsoft.quantum.submit-jobs?pivots=ide-python) or [Submit Q# jobs with Jupyter Notebooks](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter).

## Add support for the Azure CLI

The Azure CLI is an optional method for submitting quantum jobs using a terminal window in Visual Studio Code.

1. Install the [Azure CLI](/cli/azure/install-azure-cli).
1. Open the command line.
1. Install the latest Azure CLI `quantum` extension:

    ```cmd
    az extension add \
        --upgrade \
        -n quantum
    ```

To test your setup, see [Submit Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-python).

## Related content

- [Different ways to run Q# programs](xref:microsoft.quantum.qsharp-ways-to-work)
- [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart)
- [Update the QDK to the latest version](xref:microsoft.quantum.update-qdk)
