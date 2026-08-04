---
title: Build Quantum Solutions with the Microsoft Quantum Development Kit
description: This document is the main landing page for the Microsoft Quantum Development Kit (QDK), and gives a high level overview of the QDK and links to documentation on its features.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
ms.date: 08/03/2026
no-loc: ["Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "IntelliSense", "CodeLens", "Jupyter Notebook", "AI", "Copilot", "Microsoft's", "Q#", "OpenQASM", "Qiskit", "Cirq", "Python", "Circuit Editor"]
uid: microsoft.quantum.overview.qdk-landing-page

# Customer intent: As a quantum developer, I want to learn about what the QDK has to offer and how to use the QDK.
---

# Build quantum solutions with the Microsoft Quantum Development Kit

👉 **[Explore the latest QDK updates at quantum.microsoft.com](https://quantum.microsoft.com/en-us/tools/microsoft-quantum-development-kit)**

👉 **[Watch hands-on QDK tutorials](https://www.youtube.com/playlist?list=PLlrxD0HtieHj3mBWaxRbKBGil8Snm6LK2)**

The Microsoft Quantum Development Kit (QDK) is a free open-source software development kit designed specifically for quantum program development and quantum computing. The QDK connects directly to Azure Quantum, so you can run programs on real quantum computers in the cloud.

:::image type="content" source="media/qdk-overview-diagram.png" alt-text="Diagram that shows a high level overview of the QDK structure and capabilities. There are three main pillars: the core foundation, productivity and tools, and domain libraries.":::

With the QDK, you have everything you need to write, simulate, debug, and run quantum programs all in one toolkit.

## Features of the QDK

Explore the following documentation to learn more about the main features of the QDK.

- [Quantum language support](xref:microsoft.quantum.overview.qdk-language-support)
- [Quantum simulators and noise models](xref:microsoft.quantum.overview.qdk-simulators)
- [The circuit editor](xref:microsoft.quantum.how-to.qdk-circuit-editor)
- [The quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator)
- [Quantum error correction](https://github.com/microsoft/qdk-ec)
- [Chemistry and materials science applications with QDK/Chemistry](xref:microsoft.quantum.overview.qdk-chemistry)
- [Learn quantum computing with QDK Learning](xref:microsoft.quantum.overview.qdk-learning-katas-vscode)
- [Copilot integration in VS Code](xref:microsoft.quantum.how-to.qdk-vscode-agent-setup)

## Get started with the QDK

The QDK consists of the following components.

| Component                                | Use for                                     | Where to install                                                                                      |
|------------------------------------------|---------------------------------------------|-------------------------------------------------------------------------------------------------------|
| The QDK extension for Visual Studio Code | General quantum development                 | [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) |
| The `qdk` Python package                 | General quantum development                 | [Python Package Index](https://pypi.org/project/qdk/)                                                 |
| The `qdk-chemistry` Python library       | Chemistry and material science applications | [Python Package Index](https://pypi.org/project/qdk-chemistry/)                                       |
| The QDK-EC software suite                | Quantum error correction research           | [GitHub](https://github.com/microsoft/qdk-ec)                                                         |

To get started with the QDK, install the VS Code extension and Python libraries. You can use each component individually, or use them together for the same project. For example, you can quickly write and run Q# or OpenQASM programs in VS Code, then import the programs in Python to perform resource estimation for your program.

For instructions on how install the QDK extension for VS Code and the Python package, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview). To install the QDK/Chemistry library, see [How to install QDK for chemistry](xref:microsoft.quantum.how-to.install-qdk-chemistry).

👉 **[Explore the latest QDK updates at quantum.microsoft.com](https://quantum.microsoft.com/en-us/tools/microsoft-quantum-development-kit)**

👉 **[Watch hands-on QDK tutorials](https://www.youtube.com/playlist?list=PLlrxD0HtieHj3mBWaxRbKBGil8Snm6LK2)**
