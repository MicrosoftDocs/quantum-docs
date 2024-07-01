---
author: haileytap
description: This article describes the environment options for developing quantum programs with Q# and the Quantum Development Kit.
ms.author: t-htapia
ms.date: 06/17/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: []
title: Environment Options for Quantum Programming with Q#
uid: microsoft.quantum.qsharp-ways-to-work
# Customer intent: As a new quantum programmer, I want to understand the pros and cons of each Q# environment so that I can choose the best one for my needs.
---

# Different ways to work with Q#

Learn about the environment options for quantum programming with Q#. Each environment uses the Quantum Development Kit (QDK), a set of open-source tools that includes Q# and accompanying libraries. With the QDK, you can develop quantum programs in various IDEs and languages and run them on quantum simulators or hardware using Azure Quantum. For more information, see [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).

## Options for running quantum programs

Azure Quantum offers a variety of tools to help you learn about quantum programming and develop your quantum solutions with Q#. Depending on your level of coding, quantum knowledge, and objectives, you may prefer different tools for running your quantum programs. 

You can run quantum programs in three development environments:

- **Azure Quantum website:** Use Copilot to write, run, and explain Q# code in your browser. No installation or Azure account required.
- **Azure portal:** Manage your Azure subscription and quantum workspace, where you can write and run Q# and Python programs in Jupyter Notebooks. No installation required.
- **Visual Studio Code:** Write, run, and debug quantum code in a local IDE, using Q# as a standalone program or with Python. Installation required.

Each environment has different features and functionality. Typically, you use different Azure Quantum options together, such as writing Q# in Visual Studio Code with the QDK while managing your quantum workspace in the Azure portal. For more information, see the following table:

| &nbsp;  | [Azure Quantum website](#azure-quantum-website) | [Azure portal](#azure-portal) | [Visual Studio Code](#visual-studio-code) |
|-----|:-----:|:-----:|:-----:|
| Built-in Q# support | &#10004; |  &#10004;  |  &nbsp; &#10004; * |
| QPU access | &#10004; |  &#10004;  |  &nbsp; &nbsp; &#10004; **  |
| Jupyter  Notebooks  | &nbsp; |  &#10004;  |  &#10004;  |
| Resource Estimator  | &nbsp; |  &#10004;  |  &#10004;  |
| Python support  | &nbsp; |  &#10004;  |  &#10004;  |
| Qiskit and Cirq support  |  &nbsp;  |  &#10004;  |  &#10004;  |
| Integrated hybrid  | &nbsp; |  &nbsp;  |  &#10004;  |
| Local setup  | &nbsp; |  &nbsp;  |  &#10004;  |

**\*** VS Code has rich Q# support, such as IntelliSense and debugging.

**\*\*** QPU access in VS Code requires an Azure subscription.

## Azure Quantum website

On the [Azure Quantum website](https://quantum.microsoft.com/), you can write and run Q# code in an online code editor and open your code in [VS Code for the Web](https://vscode.dev/quantum) with one click—no installation or Azure account required. Write your own Q# code, explore the built-in samples, or prompt Copilot in Azure Quantum to create Q# code. For more information, see [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum).

### Is the Azure Quantum website right for me?

The following table shows what you can and can't do on the Azure Quantum website:

| You can: | You can't: | You need: |
| --- | --- | --- |
| <ul><li>Learn quantum programming using tutorials in Quantum Katas</li><li>Read about quantum computing concepts</li><li>Run Q# programs online and simulate them in Quantinuum H-Series Emulator</li><li> Ask Copilot to explain quantum computing concepts or generate Q# programs </li><li> Open your quantum programs in VS Code for the Web</li></ul> | <ul><li> Save your programs and results</li><li> Select quantum computing provider </li><li>Run Python code </li><li>Manage your quantum jobs</li><li>Debug your programs</li></ul> | <ul><li>No installation required</li><li>No Azure account required</li><ul> |

## Azure portal

Use Jupyter Notebooks in the [Azure portal](https://portal.azure.com) to create, upload, store, and run quantum code on quantum simulators or hardware targets. Sample Jupyter Notebooks are provided to help you get started with quantum programming in Q# and Python and with running Qiskit and Cirq circuits. From the portal, you can also manage quantum workspaces, jobs, activity, credits, and access control. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace) to get started.

### The %%qsharp command

By default, Q# programs in Jupyter Notebooks use the `ipykernel` Python package. To add Q# code to a notebook cell, use the `%%qsharp` command, which is enabled with the `qsharp` Python package.

When using `%%qsharp`, keep the following in mind:

- You must first run `import qsharp` to enable `%%qsharp`.
- `%%qsharp` scopes to the notebook cell in which it appears and changes the cell type from Python to Q#.
- You can't put a Python statement before or after `%%qsharp`.
- Q# code that follows `%%qsharp` must adhere to Q# syntax. For example, use `//` instead of `#` to denote comments and `;` to conclude code lines.

Here's an example of using `%%qsharp` in a Jupyter Notebook:

```python
import qsharp
```

```qsharp
%%qsharp
    operation MeasureOneQubit() : Result {
        use q = Qubit();  
        H(q);      
        let result = M(q);
        Reset(q);
        Message($"Result is {result}");
        return result;
    }
    MeasureOneQubit();
```

Jupyter Notebooks don't require a `namespace` or `@EntryPoint()`. Instead, you can call an operation or function directly, as in the last line of this Q# program. And unlike VS Code, Jupyter Notebooks don't display program results by default, so the `Message` statement is necessary.

For an example of quantum programming with Q# and Python in Jupyter Notebooks, see [Get started with Q# programs and VS Code](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter).

### Is the Azure portal right for me?

The following table shows what you can and can't do in the Azure portal:

| You can: | You can't: | You need: |
| --- | --- | --- |
| <ul><li> Create quantum workspace </li><li> Manage your subscriptions and workspaces</li><li> Copy access keys of your workspace </li><li> Manage your quantum jobs</li><li>Select your quantum computing providers</li><li>Run your Q# and Qiskit programs in an Azure notebook </li><li> Save your programs and results</li></ul> | <ul><li>Ask Copilot</li><li>Debug your programs | <ul><li>An Azure subscription</li><li>A quantum workspace</li><li> No installation required</li></ul> |

## Visual Studio Code

The QDK VS Code extension is the latest version of the Q# language and quantum development tools. With a smaller footprint and faster performance, it features a streamlined installation, language improvements, integrated Python, Jupyter Notebook, and Qiskit support, integrated Azure connectivity for submitting jobs to quantum hardware, debugger support, and improved syntax highlighting and error messages. The Modern QDK is platform independent, running on Windows, Mac, Linux, and the web. See [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview) to get started.

Mention that VS Code is available in the web.

In VS Code, you can use Q# on its own or with Python in the following

- **Standalone Q# programs:** .qs file
- **Q# and Python: 1 .qs + 1 .py files.** The Python program is a host program that at some point in its routine calls the Q# program and use the results. To use Python and Q#, you need to install the qsharp and azure-quantum Python packages. Usually this is for very complex projects, users who have more experience and background.
- **Jupyter Notebook in VS Code:** .ipynb file. The kernel is Python and it has cells, which can be code or text. Code cells are python unless you use the magic command %%qsharp, then it's a Q# code cell. This means you can have, python code, Q# code, and text with explanations in the same file. To use Python and Q#, you need to install the qsharp and azure-quantum Python packages. Link to %%qsharp

### Is Visual Studio Code right for me?

The following table shows what you can and can't do in VS Code:

| You can: | You can't: | You need: |
| --- | --- | --- |

## Q# learning resources

To learn how to write Q# programs, use the following resources:

- **Quantum Katas:** Self-paced Q# tutorials.
- **Training modules:** 
- **Q# code samples:**

## Related content

- Ask Sonia.
