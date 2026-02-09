---
author: azure-quantum-content
description: Learn how to set up the Microsoft Quantum Development Kit VS Code extension and set up your environment for different languages and platforms.
ms.author: quantumdocwriters
ms.date: 09/12/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: install-set-up-deploy
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Set up the Quantum Development Kit Extension
uid: microsoft.quantum.install-qdk.overview
#customer intent: As a quantum developer, I want to configure my environment with the latest Microsoft Quantum tools. 
---

# Set up the Microsoft Quantum Development Kit
In this article, you learn how to install the Microsoft Quantum Development Kit (QDK) extension for Visual Studio Code (VS Code) and add support for Python, Jupyter Notebook, and the Azure CLI.

## Prerequisites

- The latest version of [VS Code](https://code.visualstudio.com/download).
- If you want to submit jobs to Azure Quantum, then you need to have an Azure account with a quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Install the QDK extension

To use the QDK in VS Code, install the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). You can also use the QDK in [VS Code for the Web](https://vscode.dev/quantum) without installing the extension, but you won't have all the features of VS Code Desktop. For more information, see [Different ways to run Q# programs](xref:microsoft.quantum.qsharp-ways-to-work).

You can now write, debug, and run Q# programs against the built-in quantum simulator. Or, if you have an Azure account, you can connect and submit Q# programs to quantum hardware, all from VS Code.

To test your setup, see [Submit Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp).

## Add support for Python and Jupyter Notebook

With Python support in VS Code, you can embed or call Q# code from your Python programs or Jupyter notebooks, and run them on the built-in quantum simulator. You can also connect to your Azure Quantum workspace and submit your jobs to run on real quantum hardware.

### Prerequisites

- Install a Python environment (3.10 or greater, 3.11 recommended) with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K).
- Install the QDK extension in VS Code.

### Install the required packages

To add Python and Jupyter Notebook support:

1. Install the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
1. Open the command line.
1. Install the `qdk` Python library with the `azure` extra:

   ```cmd
   python -m pip install "qdk[azure]"
   ```

1. For Qiskit version 1 and version 2 support, install the `qiskit` extra:

   ```cmd
   python -m pip install "qdk[qiskit]"
   ```

   > [!IMPORTANT]
   > If you're updating from a previous Qiskit environment, then see [Update the `qdk.azure` module with Qiskit support](xref:microsoft.quantum.update-qdk##update-the-qdkazure-module-with-qiskit-support-in-a-virtual-python-environment-recommended).

1. To work in Jupyter Notebook and display visualizations, install the following Python packages:

    ```cmd
    python -m pip install "qdk[jupyter]" ipykernel ipympl jupyterlab
    ```

To test your setup, see [Submit Q# jobs with Python](xref:microsoft.quantum.submit-jobs?pivots=ide-python) or [Submit Q# jobs with Jupyter Notebooks](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter).

## Add support for the Azure CLI

You have the option to use the Azure CLI to submit quantum jobs from a terminal window in VS Code.

1. Install the [Azure CLI](/cli/azure/install-azure-cli).
1. Open a Windows command prompt or a terminal in VS Code.
1. In the command prompt, run the following command to update to the latest Azure CLI `quantum` extension:

    ```cmd
    az extension add --upgrade -n quantum
    ```

To test your setup, see [Submit Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-python).

## Related content

- [Different ways to run Q# programs](xref:microsoft.quantum.qsharp-ways-to-work)
- [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart)
- [Update the QDK to the latest version](xref:microsoft.quantum.update-qdk)
