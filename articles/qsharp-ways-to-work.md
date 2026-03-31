---
author: azure-quantum-content
description: This article describes the environment options to develop quantum programs with Q# and the QDK.
ms.author: quantumdocwriters
ms.date: 03/30/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: []
title: Development Options for quantum programming with Q#
uid: microsoft.quantum.qsharp-ways-to-work
# Customer intent: As a new quantum programmer, I want to understand the pros and cons of each Q# environment so that I can choose the best one for my needs.
---

# Different ways to run Q\# programs

Microsoft Quantum offers different development options to write and run Q\# quantum programs. These development environments use the [Microsoft Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview), a set of open-source tools that includes the Q# programming language. For more information, see [Introduction to Q#](xref:microsoft.quantum.qsharp-overview).

## Options to work with Q# programs

Develop Q# programs and manage Q# jobs that you submit to Azure Quantum through the following development environments:

- [**Visual Studio Code:**](#visual-studio-code) Write, run, and debug Q# code in your local environment, and submit jobs to Azure Quantum with the QDK extension in Visual Studio Code (VS Code). Installation required.
- [**Jupyter Notebook:**](#jupyter-notebook) Develop Q# code and submit jobs to Azure Quantum in Jupyter Notebook with the `qdk.qsharp` Python module. Installation required.
- [**Azure portal:**](#azure-portal)  Manage your Azure subscription and Azure Quantum workspace, and access information about your quantum providers and job submissions. Requires an Azure account.

The option that you choose to run Q# programs depends on your coding experience, quantum knowledge, and goals. Each option has different features and functionality, so you can use them together. For example, write Q# programs with the QDK extension in VS Code and manage your quantum workspace in the Azure portal.

## Visual Studio Code

[VS Code](https://code.visualstudio.com/) is a free, open-source code editor from Microsoft. With the QDK extension for VS Code, you can create Q# programs and load built-in Q# samples. The QDK in VS Code offers the following local development features and more for Q\# programs (`.qs` files):

- Error messaging
- Syntax highlighting
- Debugging
- CodeLens
- IntelliSense
- Quantum computer resource estimation

> [!NOTE]
> The QDK extension also provides language support for OpenQASM programs (`.qasm` files).

You don't need an Azure account to use the QDK in VS Code, but you do need an Azure account to submit jobs to Azure Quantum with the QDK. You can use the QDK to connect to your Azure Quantum workspace from VS Code and run Q\# programs on the quantum computers and simulators from different Azure Quantum providers. For more information, see [How to submit Q# programs with Visual Studio Code](xref:microsoft.quantum.submit-jobs).

To get started with the QDK extension in VS Code, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

> [!NOTE]
> The QDK extension is also available in [VS Code for the Web](https://vscode.dev/quantum), which provides the same Azure connectivity and Q# language features as the desktop version. However, the web doesn't support Python, Qiskit, or Cirq programs.

### Is the QDK extension in VS Code right for me?

VS Code is a feature-rich environment that includes CodeLens and IntelliSense to help you write, run, and debug Q\# and OpenQASM quantum programs. If you have coding experience and want to explore Q# in depth, then VS Code is for you.

The following table shows what you can and can't do in VS Code:

| You can: | You can't: | You need: |
| -------- | ---------- | --------- |
| <ul><li>Run Q# and OpenQASM programs.</li><li>Load code samples.</li><li>Debug your programs.</li><li>Save your programs and results.</li><li>View compiler error messages.</li><li>Connect to your Azure Quantum workspace.</li><li>Visualize quantum circuits.</li><li>Use the resource estimator.</li></ul> | <ul><li>Manage your subscriptions and workspaces.</li><li>Manage your quantum jobs.</li><li>Choose quantum computing providers and plans.</li></ul> | <ul><li>To install [VS Code](https://code.visualstudio.com/).</li><li>To install the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).</li><li> An Azure subscription and a quantum workspace (if you want to run programs on real hardware).</li></ul> |

## Jupyter Notebook

The QDK has a rich `qdk` Python library that allows you to develop Q\# programs in `.py` Python files or Jupyter Notebook. The QDK Python library also supports other quantum languages, such as Qiskit, Cirq, and PennyLane.

The `qdk` Python library includes several modules to help you develop quantum programs and manage Azure Quantum jobs. For example, the `qsharp` module lets you write Q# code in Jupyter Notebook, and the `azure` module lets you connect to your quantum workspace and submit jobs to Azure Quantum.

For an overview of the `qdk` Python library and module features, see the [QDK project description](https://pypi.org/project/qdk/) on the PyPi website.

### Is Python and Jupyter Notebook right for me?

Jupyter Notebook is convenient to write Python code and visualize output all in one development environment. If you prefer to develop in Python and want support for multiple quantum programming languages, then the QDK Python library and Jupyter Notebook is for you.

The following table shows what you can and can't do in Python and Jupyter Notebook:

| You can: | You can't: | You need: |
| -------- | ---------- | --------- |
| <ul><li>Develop in multiple quantum programming languages.</li><li>Save your programs and results.</li><li>Connect to your Azure Quantum workspace.</li><li>Visualize quantum circuits.</li><li>Use the resource estimator.</li></ul> | <ul><li>Manage your subscriptions and workspaces.</li><li>Manage your quantum jobs.</li><li>Choose quantum computing providers and plans.</li></ul> | <ul><li>To install [Python and Pip](https://www.python.org/).</li><li>To install [Jupyter Notebook](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter).</li><li>To install the [QDK Python library](https://pypi.org/project/qdk/).</li><li> An Azure subscription and a quantum workspace (if you want to run programs on real hardware).</li></ul> |

## Azure portal

The [Azure portal](https://portal.azure.com) is the main interface of the Microsoft Azure cloud computing platform. From the portal, you can create an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace) to run quantum programs, send jobs to [quantum hardware providers](xref:microsoft.quantum.reference.qc-target-list), and store job results in an Azure Quantum storage account. You can also manage your subscriptions, activity, credit usage, quotas, and access control.

### Is the Azure portal right for me?

From the Azure portal, you can grant a group of users, like your team members or students, access to your quantum workspace. If you want to manage your jobs and subscriptions, review your invoices, or try out different quantum providers, then the Azure portal is for you.

The following table shows what you can and can't do in the Azure portal:

| You can: | You can't: | You need: |
| -------- | ---------- | --------- |
| <ul><li>Create quantum workspaces.</li><li>Manage your subscriptions and workspaces.</li><li>Copy workspace access keys.</li><li>Manage your quantum jobs.</li><li>Save your programs and results.</li><li>Choose quantum computing providers and plans.</li></ul> | <ul><li>Develop quantum programs</li><li>Visualize quantum circuits and results.</li><li>Calculate resource estimates for your programs.</li></ul> | <ul><li>An Azure subscription.</li><li>An Azure Quantum workspace.</li></ul> |

## Q# learning resources

To learn and explore the Q# programming language, use the following resources:

- [**Azure Quantum learning path**](/training/paths/quantum-computing-fundamentals)**:** If you're interested in quantum computing but don't know where to start, take this learning path. Through a series of interactive modules, you learn about quantum computing and how to develop quantum solutions in Azure Quantum using Q# and the QDK.
- [**Quantum Katas**](https://quantum.microsoft.com/tools/quantum-katas)**:** Learn quantum computing and programming together with these self-paced tutorials, each with relevant theory and Q# exercises to test your knowledge.
- [**Q# code samples**](https://github.com/microsoft/qdk/tree/main/samples)**:** Build your first quantum solution with these ready-to-use Q# samples. They cover four areas: quantum algorithms, resource estimation, language constructs, and Jupyter notebooks.
- [**QDK playground**](https://vscode.dev/quantum/playground/)**:** Explore common quantum algorithms written in Q#. The playground is hosted on VS Code for the Web and comes preconfigured with the QDK, so you don't need to install anything.

## Related content

- [Set up the Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
- [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart)
- [Reference: QDK extension for Visual Studio Code](xref:microsoft.quantum.reference.vscode)
