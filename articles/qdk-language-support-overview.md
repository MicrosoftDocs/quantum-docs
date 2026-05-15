---
title: Quantum language support in the QDK
description: This document introduces all the quantum languages that the QDK supports, and explains how to develop in these languages in the QDK
author: azure-quantum-content
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
ms.date: 04/22/2026
no-loc: ["Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "IntelliSense", "CodeLens", "Jupyter Notebook", "AI", "Copilot", "Microsoft's", "Q#", "OpenQASM", "Qiskit", "Cirq", "Python", "Circuit Editor"]
uid: microsoft.quantum.overview.qdk-language-support

#Customer intent: As a developer, I want to know what quantum languages and frameworks I can use in the QDK, and how the language support is structured
---

# Quantum programming language support in the QDK

The Microsoft Quantum Development Kit (QDK) supports development in multiple quantum programming languages with both the QDK extension for Visual Studio Code (VS Code) and the QDK Python library. With the QDK, you can write quantum programs and submit them to Azure Quantum in your language of choice, or use multiple languages in your development workflow.

## Language support in the QDK extension for VS Code

The [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) directly supports development in the Q# and OpenQASM quantum programming languages. When you open a Q# `.qs` file or OpenQASM `.qasm` file in VS Code, you can use all the features of the QDK extension, such as resource estimation, circuit visualization, and job submission to Azure Quantum provider targets. You can also use other VS Code features, such as code completion, IntelliSense, and debugging.

The VS Code extension also includes the [QDK circuit editor](xref:microsoft.quantum.how-to.qdk-circuit-editor), a graphical interface to build quantum circuits that you can use in Q# programs.

## Language support in the QDK Python library

The [QDK Python library](https://pypi.org/project/qdk/) supports development in the following quantum programming languages and packages:

- Q#
- OpenQASM
- Qiskit
- Cirq
- PennyLane

The QDK library includes modules that let you:

- Use Jupyter Notebook features, such as visualization tools and a magic command to write Q# code
- Convert Q# and OpenQASM structs and callables into Python objects for use in other languages and frameworks
- Connect to your Azure Quantum workspace and submit jobs

## Compare QDK language options

The following table compares the availability of languages and frameworks for the VS Code extension and Python library.

| Language  | QDK VS Code extension | QDK Python library                                                         |
|-----------|-----------------------|----------------------------------------------------------------------------|
| Q#        | Directly available    | Available through the `qdk.qsharp` module and the `%%qsharp` magic command |
| OpenQASM  | Directly available    | Available through the `qdk.openqasm` module                                |
| Qiskit    | Not available         | Available through the `qdk.qiskit` module                                  |
| Cirq      | Not available         | Available through the `qdk.cirq` module                                    |
| PennyLane | Not available         | Available through conversion to QIR                                        |

## Next steps

To get started with the quantum programming languages in the QDK, install the QDK VS Code extension and Python library. For more information, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

To submit quantum programs to Azure Quantum in different languages, see the following guides:

- [How to submit Q# programs to Azure Quantum](xref:microsoft.quantum.submit-jobs)
- [How to submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)
- [How to submit a circuit with Cirq to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.cirq)
- [How to submit a PennyLane circuit to Azure Quantum](xref:microsoft.quantum.how-to.submit-pennylane-programs)
