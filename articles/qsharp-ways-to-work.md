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

## Options for running Q# programs

Azure Quantum offers several tools to help you learn quantum programming and develop quantum solutions with Q#. Depending on your coding experience, quantum knowledge, and goals, you might prefer different tools for running Q# programs.

You can run Q# programs in three development environments:

- **Azure Quantum website:** Use Copilot to write, run, and explain Q# code in your browser. No installation or Azure account required.
- **Azure portal:** Manage your Azure subscription and quantum workspace, where you can write and run Q# and Python programs in Jupyter Notebooks. No installation required.
- **Visual Studio Code:** Write, run, and debug quantum code in a local IDE, using Q# as a standalone program or with Python. Installation required.

Each tool has different features and functionality. Typically, you use different Azure Quantum tools together, such as writing Q# programs with the QDK in VS Code while managing your quantum workspace in the Azure portal. For more information, see the following table:

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

On the [Azure Quantum website](https://quantum.microsoft.com/), you can run Q# programs in an online code editor—no installation or Azure account required. Write your own Q# code, explore the built-in Q# samples, or prompt Copilot to code for you. You can then open your Q# code in [VS Code for the Web](https://vscode.dev/quantum) and continue working in a preconfigured quantum environment.

The Azure Quantum website also features blogs, articles, and videos from quantum experts and enthusiasts. The [Quantum Katas](https://quantum.microsoft.com/en-us/experience/quantum-katas) deepen your knowledge with self-paced tutorials on the fundamentals of quantum computing and Q#. For more information, see [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum).

### Is the Azure Quantum website right for me?

The Azure Quantum website allows you to run Q# programs in your browser and provides multiple learning resources. If you're a quantum enthusiast who wants to learn by doing, the Azure Quantum website is for you.

The following table shows what you can and can't do on the Azure Quantum website:

| You can: | You can't: | You need: |
| --- | --- | --- |
| <ul><li>Run Q# programs online and simulate them in the Quantinuum H-Series Emulator.</li><li> Ask Copilot to explain quantum computing concepts or generate Q# programs.</li><li>Learn quantum programming using tutorials in the Quantum Katas.</li></ul> | <ul><li> Save your programs and results.</li><li> Select any quantum computing provider.</li><li>Run Python code.</li><li>Manage your quantum jobs.</li><li>Debug your programs.</li></ul> | <ul><li>No installation required.</li><li>No Azure account required.</li><ul> |

## Azure portal

The [Azure portal](https://portal.azure.com) is the main interface of the Microsoft Azure cloud computing platform. From the portal, you can create an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace) to run quantum programs and jobs, send them to [quantum providers](xref:microsoft.quantum.reference.qc-target-list), and store their results in an Azure Quantum storage account. You can also manage your subscriptions, activity, credit usage, quotas, and access control. For more information, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace).

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Workspaces provide access to [Azure Quantum notebooks](xref:microsoft.quantum.get-started.notebooks), which are web-based Jupyter Notebooks in the Azure portal. Use notebooks to create, upload, store, and run Q# and Python programs on quantum simulators or hardware targets. You can also use the sample notebooks to get started with quantum programming and circuits. For more information, see [Work with Jupyter Notebooks in an Azure Quantum workspace](xref:microsoft.quantum.how-to.notebooks).

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

For more information on quantum programming with Jupyter Notebooks, see [Get started with Q# and an Azure Quantum notebook](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter).

### Is the Azure portal right for me?

From the Azure portal, you can grant a group of users, like your team members or students, access to your Azure Quantum workspace. If you want to manage your subscriptions, review your invoices, or add new quantum providers, the Azure portal is for you.

The following table shows what you can and can't do in the Azure portal:

| You can: | You can't: | You need: |
| --- | --- | --- |
| <ul><li> Create quantum workspaces.</li><li> Manage your subscriptions and workspaces.</li><li> Copy access keys of your workspace.</li><li> Manage your quantum jobs.</li><li>Select your quantum computing providers.</li><li>Run Q# and Qiskit programs in Azure Quantum notebooks.</li><li> Save your programs and results.</li></ul> | <ul><li>Access Copilot.</li><li>Debug your programs.| <ul><li>An Azure subscription.</li><li>A quantum workspace.</li><li> No installation required.</li></ul> |

## Visual Studio Code

With the QDK extension for VS Code, you can create Q# programs, load pre-installed Q# samples, and use features like improved error messaging, Q# syntax highlighting, circuit diagram visualization, and integrated debugging. You can also use the [Azure Quantum Resource Estimator](microsoft.quantum.overview.intro-resource-estimator) to estimate the number of qubits and operations required to run your Q# programs on quantum computers.

You don't need an Azure account to use the QDK in VS Code. However, if you have an Azure account, you can connect to your Azure Quantum workspace from VS Code. This allows you to run Q# programs on the quantum computers and simulators of your selected providers. See [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview) to get started.

> [!NOTE]
> VS Code on the Web is a free resource that offers the same performance, Azure connectivity, and Q# language features (such as syntax highlighting, IntelliSense, and debugging) as the installed version of VS Code, minus some of the extended features (see the comparison table for details). vscode.dev/quantum offers a preconfigured quantum environment, and vscode.dev/quantum/playground/ offers a preconfigured quantum environment, sample code, and learning content to get you up and running.

In VS Code, you can write the following standalone or hybrid quantum programs:

| Program | File(s) | Description |
| --- | --- | --- |
| Q# | .qs | A Q# program that contains only Q# code. |
| Q# and Python | .qs and .py | The Python program is a host program that calls the Q# program at some point in its routine and uses the results. To use Python and Q#, you must install the `qsharp` and `azure-quantum` Python packages. This is typically for complex projects. |
| Jupyter Notebook | .ipynb | The Python kernel has either code or text cells. Code cells are Python by default. However, if you use the `%%qsharp` command, they become Q# cells. This means you can have Python code, Q# code, and text with explanations in the same file. To use Python and Q#, you must install the `qsharp` and `azure-quantum` Python packages. For more information, see [The %%qsharp command](#the-qsharp-command). |

- **Standalone Q# program:** A Q# (.qs) file that contains only Q# code.
- **Q# and Python:** A Q# (.qs) file and Python (.py) file. The Python program is a host program that calls the Q# program at some point in its routine and uses the results. To use Python and Q#, you must install the `qsharp` and `azure-quantum` Python packages. This is typically for complex projects.
- **Jupyter Notebook:** A Jupyter Notebook (.ipynb) file. The Python kernel has either code or text cells. Code cells are Python by default. However, if you use the `%%qsharp` command, they become Q# cells. This means you can have Python code, Q# code, and text with explanations in the same file. To use Python and Q#, you must install the `qsharp` and `azure-quantum` Python packages. For more information, see [The %%qsharp command](#the-qsharp-command).

### Is Visual Studio Code right for me?

The following table shows what you can and can't do in VS Code:

| You can: | You can't: | You need: |
| --- | --- | --- |
| <ul><li>Run Q# and Python programs.</li><li>Run Q# samples.</li><li>Debug your programs.</li><li>Save your programs and results.</li><li>Select your quantum computing providers.</li><li> Visualize quantum circuit diagrams.</li><li> Create and run Jupyter Notebooks.</li><li>Have compiler error messages.</li><li>Use the Resource Estimator.</li></ul> | <ul><li>Access Copilot.</li><li>Manage your subscriptions and workspaces.</li><li>Manage your quantum jobs.</li></ul> | <ul><li>To install [VS Code](https://code.visualstudio.com/).</li><li>To install the [QDK for VS Code extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).</li><li> An Azure subscription and a quantum workspace (*Only if you want to run programs on real hardware*) </li></ul> |

## Q# learning resources

To learn how to write Q# programs, use the following resources:

- **Quantum Katas:** Self-paced Q# tutorials.
- **Training modules:** 
- **Q# code samples:**

## Related content

- [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
- [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart)
- Tutorials
