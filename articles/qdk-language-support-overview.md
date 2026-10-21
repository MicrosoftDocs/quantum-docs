---
author: azure-quantum-content
description: Learn which quantum programming languages, frameworks, and circuit formats the QDK supports in Visual Studio Code and the QDK Python package.
ms.date: 10/12/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ["Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "IntelliSense", "CodeLens", "Jupyter Notebook", "AI", "Copilot", "Microsoft's", "Q#", "OpenQASM", "Stim", "QDK-Stim", "Qiskit", "Cirq", "PennyLane", "Python", "QIR", "Circuit Editor"]
ai-usage: ai-assisted
title: Quantum language support in the QDK
uid: microsoft.quantum.overview.qdk-language-support
# Customer intent: As a developer, I want to know which quantum languages, frameworks, and circuit formats I can use in the QDK, and how the support is structured.
---

# Quantum programming language support in the QDK

The Microsoft Quantum Development Kit (QDK) supports multiple quantum programming languages, frameworks, and circuit formats through the QDK extension for Visual Studio Code (VS Code) and the QDK Python package. With the QDK, you can use one or more programming frameworks in your development workflow and submit supported programs to Azure Quantum.

## Language support in the QDK extension for VS Code

The [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) directly supports development in the Q# and OpenQASM quantum programming languages. When you open a Q# `.qs` file or OpenQASM `.qasm` file in VS Code, you can use QDK features such as resource estimation, circuit visualization, and job submission to Azure Quantum provider targets. You can also use VS Code features such as code completion, IntelliSense, and debugging.

The QDK extension also provides syntax highlighting for Stim `.stim` files. To compile and simulate Stim circuits, use the `qdk.stim` module in the QDK Python package.

The VS Code extension includes the [QDK circuit editor](xref:microsoft.quantum.how-to.qdk-circuit-editor), a graphical interface for building quantum circuits that you can use in Q# programs.

## Language support in the QDK Python package

The [QDK Python package](https://pypi.org/project/qdk/) supports development with the following quantum programming languages, frameworks, and circuit formats:

- Q#
- OpenQASM
- Qiskit
- Cirq
- Stim
- PennyLane

The QDK package includes modules that let you:

- Use Jupyter Notebook features, such as visualization tools and a magic command to write Q# code.
- Convert Q# and OpenQASM structs and callables into Python objects for use in other languages and frameworks.
- Connect to your Azure Quantum workspace and submit supported programs.

## Compare QDK language options

The following table compares the availability of languages, frameworks, and circuit formats in the QDK extension and Python package.

| Language, framework, or format | QDK VS Code extension | QDK Python package                                                         |
|--------------------------------|-----------------------|----------------------------------------------------------------------------|
| Q#                             | Directly available    | Available through the `qdk.qsharp` module and the `%%qsharp` magic command |
| OpenQASM                       | Directly available    | Available through the `qdk.openqasm` module                                |
| Qiskit                         | Not available         | Available through the `qdk.qiskit` module                                  |
| Cirq                           | Not available         | Available through the `qdk.cirq` module                                    |
| PennyLane                      | Not available         | Available through conversion to QIR                                        |
| Stim                           | Syntax highlighting   | Available through the `qdk.stim` module                                    |

## Next steps

To get started with the quantum programming languages, frameworks, and circuit formats in the QDK, install the QDK extension for VS Code and the QDK Python package. For more information, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

To submit quantum programs to Azure Quantum, see the following guides:

- [How to submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs)
- [Submit jobs to Azure Quantum with the QDK extension for VS Code](xref:microsoft.quantum.how-to.submit-jobs-vscode)
- [Submit jobs to Azure Quantum with the QDK Python package](xref:microsoft.quantum.how-to.submit-jobs-python)
- [Stim support for quantum error correction in the QDK](xref:microsoft.quantum.overview.qdk-stim)
