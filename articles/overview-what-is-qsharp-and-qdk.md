---
author: SoniaLopezBravo
description: Learn about the Q# programming language, the Quantum Development Kit (QDK), `and how you can create quantum programs.
ms.author: sonialopez
ms.date: 12/31/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, target, targets]
title: Introduction to Q# & Quantum Development Kit
uid: microsoft.quantum.overview.q-sharp
---

# What are Q# and the Azure Quantum Development Kit?

The Azure Quantum Development Kit (Modern QDK) is the SDK required to interface with the Azure Quantum service. With the Quantum Development Kit, you can build quantum programs that run on quantum hardware in Azure Quantum.

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

The Modern QDK is the only development kit ready for Fault-Tolerant Quantum Computing (FTQC). With the Modern QDK, you can:

- **Debug your code:** It offers a quantum computing debugger that can step through classical and quantum code. Paired with its sparse in-memory simulator it provides fast simulation of up to thousands of logical qubits.

- **Choose your platform:** The Modern QDK runs in your web browser with no installation necessary, and with its VS Code extension on your PC, Mac or Linux machine.

- **Write your code faster:** Syntax highlighting and intelligent code completion with IntelliSense and write entire blocks of code assisted with Copilot.

- **Run on your choice of hardware:** The QDK integrates seamlessly with Azure Quantum to run your algorithms on a wide range of quantum computers and simulators.

- **Design for the FTQC:** Paired with the state-of-the-art Azure Quantum Resource Estimator, it provides a language designed specifically for quantum computing, Q#, freeing you from thinking about qubit architectures, abstracting the hardware and allowing you to mix classical and quantum computation all performed by the quantum machine you are targeting.

[!INCLUDE [Azure Quantum copilot banner](includes/copilot-banner.md)]

## The quantum programming language Q\#

The Modern QDK includes the quantum programming language Q#, a high-level, **open-source** programming language that allows you to focus your work at the algorithm level to create quantum programs.

Q# is an **open-source**, high-level, programming language for developing and running quantum algorithms. It’s part of the Quantum Development Kit (QDK) and it's designed to be hardware agnostic, scale to the full range of quantum applications, and to optimize execution. 

As a programming language, Q# draws familiar elements from Python, C#, and F#, and supports a basic procedural model for writing programs with loops, if/then statements, and common data types. It also introduces new quantum-specific data structures and operations, such as [repeat-until-success](xref:microsoft.quantum.qsharp.conditionalloops), which allow the integration of quantum and classical computations. For example, the flow control of a classical program can be based on the outcome of a quantum measurement.

When writing algorithms, a quantum programming language should meet the following requirements for the language, compiler, and runtime:

- **Abstract qubits.** Quantum algorithms use qubits that are not tied to specific hardware or layout. The compiler and runtime handle the mapping from program qubits to physical qubits.
- **Quantum and classical computation.** The ability to perform classical and quantum computations is essential in a universal quantum computer.
- **Respect laws of physics.** Quantum algorithms follow the rules of quantum physics. For example, they cannot copy or access qubit state directly.

For more information, see [the Q# quantum programming language user guide](xref:microsoft.quantum.user-guide-qdk.overview).

### Get started with the Azure Quantum Development Kit

There are more than one way to get started with quantum programming. You can choose the option that best fits your needs.

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

#### Azure Quantum website

The [Azure Quantum website](https://quantum.microsoft.com/) is the easiest way to get started with quantum programming. With the [online code editor](https://quantum.microsoft.com/experience/quantum-coding) in the Azure Quantum website, you can run Q# code in your browser with no setup required and ask Copilot for help. With one click in the online code editor, you can open your code in [VS Code on the web](https://vscode.dev/quantum) and continue working in a preconfigured quantum environment for free. 

> [!NOTE]
> The Azure Quantum website is free and doesn't require an Azure account.

#### Samples in Azure Quantum portal

If you want to start practicing and writing your Q# programs without installing additional software, you can use the [hosted Jupyter Notebooks](xref:microsoft.quantum.get-started.notebooks) available in your Azure Quantum workspace in the Azure portal. The sample gallery contains a collection of annotated notebook samples - select the sample you want to explore and run it on cloud-based simulators or real quantum computers.

> [!NOTE]
> To use the hosted Jupyter Notebooks, you need an Azure account. If you don't have an Azure account, you can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).

#### Local development environment

If you prefer a local development environment, you can install [the Modern QDK extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). The Modern QDK extension provides a full-featured development environment for Q#, including syntax highlighting, realtime coding feedback, and debugging.

To get started with the Modern QDK extension, see the following [Tutorial](xref:microsoft.quantum.tutorial-qdk.random-number).

> [!TIP]
> The Modern QDK includes a set of built-in Q# samples that you can use to learn more about Q# and quantum computing. To view the samples, open a new Q# file and type `sample`, then select the sample you want to view from the list of options. 

## Quantum development workflow

The following diagram shows the stages through which a quantum program goes from idea to complete implementation on Azure Quantum, and the tools offered for each stage.

:::image type="content" source="~/media/quantum-development-kit-flow-diagram.svg" alt-text="Diagram showing the workflow of quantum programming development.":::

### Choose your development environment

Run your quantum programs in your preferred development environment. You can use the [online code editor](https://quantum.microsoft.com/experience/quantum-coding) in the Azure Quantum website, the [hosted Jupyter Notebooks](xref:microsoft.quantum.get-started.notebooks) available in your Azure Quantum workspace in the Azure portal, or your own local development environment.

### Write your quantum program

The QDK offers support for Q#, but also for [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit), and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq) languages for quantum computing.

To get started, you can follow the Q# tutorials and explore quantum concepts such as [superposition](xref:microsoft.quantum.tutorial-qdk.random-number), [entanglement](xref:microsoft.quantum.tutorial-qdk.entanglement), [Grover's quantum algorithm](xref:microsoft.quantum.tutorial-qdk.grovers), and other quantum phenomena.

### Integrate with Python

The QDK allows you to integrate Q# programs with Python. You can use a [Python program](xref:microsoft.quantum.submit-jobs?pivots=ide-python) to call Q# operations. 

### Estimate resources

Before running on quantum hardware, you’ll need to figure out whether your program can run on existing hardware, and how many resources it will consume.

The [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm. You can choose from pre-defined fault-tolerant protocols and specify assumptions of the underlying physical qubit model.

For more information, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

> [!NOTE]
> The Azure Quantum Resources Estimator is free of charge and doesn't require an Azure account.

### Run program in simulator

When you compile and run a quantum program, the QDK creates an instance of the quantum simulator and passes the Q# code to it. The simulator uses the Q# code to create qubits (simulations of quantum particles) and apply transformations to modify their state. The results of the quantum operations in the simulator are then returned to the program. Isolating the Q# code in the simulator ensures that the algorithms follow the laws of quantum physics and can run correctly on quantum computers.

### Submit jobs to the Azure Quantum service

You can submit your Q# programs (also known as jobs) to Azure Quantum through your preferred development environment, both locally and online. For more information, see [how to submit Q# jobs](xref:microsoft.quantum.submit-jobs). You can also run and submit quantum circuits written in Qiskit and Cirq languages.

Azure Quantum offers some of the most compelling and diverse quantum hardware available today from industry leaders. See [Quantum computing providers](xref:microsoft.quantum.reference.qc-target-list) for the current list of supported hardware providers.

> [!NOTE]
> The cloud-based [Quantinuum H-Series Emulator](xref:microsoft.quantum.providers.quantinuum#h-series-emulator-cloud-based) target is available without an Azure account. To submit a job to the rest of the Azure Quantum providers, you need an Azure account and quantum workspace. If you don't have a quantum workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

The following diagram shows the basic workflow after you submit your job:

:::image type="content" source="~/media/azure-quantum-flow-diagram.png" alt-text="Diagram showing the workflow after a job submission to Azure Quantum.":::

## Next Steps

If you want to learn more, the [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) provide a good introduction to [quantum computing concepts](xref:microsoft.quantum.tutorial-qdk.katas#introduction-to-quantum-computing-concepts) such as common quantum operations and how to manipulate qubits.

- [QuickStarts](xref:microsoft.quantum.install-qdk.overview)
- [Understanding quantum computing](xref:microsoft.quantum.overview.understanding)
- [The Q# User Guide](xref:microsoft.quantum.user-guide-qdk.overview)
- [Linear algebra for quantum computing](xref:microsoft.quantum.overview.algebra)
