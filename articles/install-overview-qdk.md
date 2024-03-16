---
author: bradben
description: Learn how to set up the Azure Quantum Development Kit VS Code extension and set up your environment for different languages and platforms.
ms.author: brbenefield
ms.date: 03/14/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Get started with the Quantum Development Kit 
uid: microsoft.quantum.install-qdk.overview
#customer intent: As a quantum developer, I want to configure my environment with the latest Azure Quantum tools. 
---

# Get started with the Azure Quantum Development Kit (Modern QDK)

Learn about the different environment options available to develop quantum computing using the [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) service. Every environment uses the [Azure Quantum Development Kit (Modern QDK)](xref:microsoft.quantum.overview.q-sharp), an open source set of tools that includes the quantum programming language Q# and accompanying libraries. With the QDK, you can develop quantum computing applications using different IDEs and languages and run them on quantum simulators or quantum hardware using Azure Quantum. 

## Running quantum programs

Azure Quantum offers several environments to start exploring quantum programming.

| &nbsp;  | [Azure Quantum Website](#the-azure-quantum-website) | [Visual Studio Code (Web)](#visual-studio-code-on-the-web) | [Azure portal](#the-azure-quantum-portal) | [Visual Studio Code](#visual-studio-code) |
|-----|:-----:|:-----:|:-----:|:-----:|
| Built-in Q# support * | &#10004; |  &#10004;  |  &#10004;  |  &#10004;  |
| Jupyter  notebooks  |&nbsp; |  &#10004;  |  &#10004;  |  &#10004;  |
| Resource Estimator  | &nbsp; |  &#10004;  |  &#10004;  |  &#10004;  |
| QPU access  | &nbsp; |  &#10004;<br>(with Azure subscription)  |  &#10004;<br>(with Azure subscription)  |  &#10004;<br>(with Azure subscription)  |
| Python support  | &nbsp; |  &nbsp;  |  &#10004;  |  &#10004;  |
| Qiskit and Cirq support  | &nbsp; |  &nbsp;  |  &#10004;  |  &#10004;  |
| Integrated Hybrid  | &nbsp; |  &nbsp;  |  &nbsp;  |  &#10004;<br>(with Classic QDK)  |
| Local setup  | &nbsp; |  &nbsp;  |  &nbsp;  |  &#10004;  |

**\*** VS Code and VS Code (Web) provide rich Q# language support such as IntelliSense and debugging. 


### The Azure Quantum website

On the [Azure Quantum website](https://quantum.microsoft.com/experience/quantum-coding), you can write and run Q# code right in your browser in the online code editor and open your code directly in [VS Code on the Web](https://vscode.dev/quantum) with one click - no installation or Azure account required. Write your own Q# code, use the built-in samples, or prompt the Copilot in Azure Quantum to create Q# code. For more information, see [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum). 

### The Azure Quantum portal

The [Azure Quantum portal](https://portal.azure.com) provides a no-install development environment where you can create, upload, store, and run your quantum code in Jupyter Notebooks on a quantum simulator or quantum hardware targets. A gallery of sample Jupyter Notebooks is provided to get you started with quantum programming in Q#, Python, and running Qiskit and Cirq circuits.  From the portal, you can also manage quantum workspaces, jobs, activity, credits and usage, and access control. To get started, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

### Visual Studio Code

The Modern QDK VS Code extension is the latest version of the Q# language and quantum development tools. With a smaller footprint and faster performance, it features a streamlined installation, language improvements, integrated Python, Jupyter Notebook, and Qiskit support, integrated Azure connectivity for submitting jobs to quantum hardware, debugger support, and improved syntax highlighting and error messages. The Modern QDK is platform independent, running on Windows, Mac, Linux, and the web. For set up information, see [Installing the Modern QDK](#installing-the-modern-qdk-on-vs-code).

### Visual Studio Code on the Web

[VS Code on the Web](https://vscode.dev/quantum) is a free resource that offers the same performance, Azure connectivity, and Q# language features (such as syntax highlighting, IntelliSense, and debugging) as the installed version of VS Code, minus some of the extended features (see the [comparison table](#running-quantum-programs) for details). [vscode.dev/quantum](https://vscode.dev/quantum) offers a preconfigured quantum environment, and [vscode.dev/quantum/playground](https://vscode.dev/quantum/playground) offers a preconfigured quantum environment, sample code, and learning content to get you up and running. 

> [!NOTE]
> If you already have a Python and Jupyter Notebook environment configured on your machine, you can connect to your Jupyter server from VS Code on the Web and run Q# notebooks. For more information, see [Connecting to a remote Jupyter server from vscode.dev](https://github.com/microsoft/vscode-jupyter/wiki/Connecting-to-a-remote-Jupyter-server-from-vscode.dev).

## Installing the Modern QDK on VS Code

> [!NOTE]
> To avoid possible conflicts of package version, be sure to follow the uninstall instructions in step 2.

To install the Modern QDK:

1. In VS Code, disable or uninstall the **Microsoft Quantum Development Kit** extension. 
1. Run `python -m pip uninstall qsharp qsharp-core qsharp-chemistry azure-quantum`
1. If needed, install the latest version of [VS Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/).
1. Install the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension.

That's it. You can now write, debug, and run Q# programs against the built-in quantum simulator, or if you already have an Azure account, connect and submit Q# programs to quantum hardware, all from VS Code. 

To test your setup, see [Submit Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp)

### Add support for Python and Jupyter Notebooks

With added Python support, you can embed or call Q# code from your Python programs or Jupyter Notebooks and run them on the built-in quantum simulator, or connect to your Azure workspace and submit your jobs to quantum hardware, all from VS Code.

**Prerequisites**

- A Python environment  (3.9 or greater, 3.11 recommended) with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed. 
- VS Code with the Modern QDK extension installed.


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


## Compatibility with the Classic QDK

For more information, see [What's new in the Modern QDK](xref:microsoft.quantum.modern-qdk).

 - The Modern QDK is not fully backwards compatible with the previous Classic QDK. Not all APIs have been ported, and existing project files aren't recognized. Your current programs and projects could require significant changes and updates. For more information, see [Migrating your code to the Modern QDK](xref:microsoft.quantum.how-to.migrate-code) and [What's new in the Modern QDK](xref:microsoft.quantum.modern-qdk).
 - The Modern QDK extension and the previous Classic QDK extension can be installed in VS Code at the same time, but both cannot be enabled at the same time. If you are working exclusively with the Modern QDK, or if your programs require features not yet supported in the Modern QDK (such as hybrid quantum computing), only enable one extension at a time. For more information, see [Continue working in the Classic QDK](#continue-working-in-the-classic-qdk).
 - The [Azure Quantum website](https://quantum.microsoft.com/) and [Azure Quantum portal](https://portal.azure.com) environments use the Modern QDK exclusively. 

### Continue working in the Classic QDK

Some features, such as hybrid computing, are not yet supported in the Modern QDK. To continue using the Classic QDK environment for this functionality:

1. If you have installed any of the Modern QDK components:
    1. In VS Code, disable or uninstall the **Azure Quantum Development Kit** extension. 
    2. Run `python -m pip uninstall qsharp`
1. In VS Code, enable or install the **Microsoft Quantum Development Kit** extension. 
1. Run `python -m pip install qsharp<1.0`.

## Related content

Using the Azure portal:

- [Work with Jupyter notebooks on Azure Quantum](xref:microsoft.quantum.how-to.notebooks)
- [Create and submit a Qiskit circuit](xref:microsoft.quantum.quickstarts.computing.qiskit) to quantum hardware.
- [Learn quantum computing with the Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas)
