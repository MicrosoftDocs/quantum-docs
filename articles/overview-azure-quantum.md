---
author: SoniaLopezBravo
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs problems in the cloud.
ms.date: 01/13/2025
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: What is Azure Quantum?
uid: microsoft.quantum.azure-quantum-overview
#customer intent: As a quantum programmer, I want to know how I can use Azure Quantum. 
---

# What is Azure Quantum?

Azure Quantum is the cloud quantum computing service of Azure. Azure Quantum provides an open, flexible, and future-proofed path to quantum computing that adapts to your way of working.

Azure Quantum offers a range of quantum computing solutions, including quantum hardware from industry-leading providers, quantum software, and quantum services. With Azure Quantum, you can run quantum programs on real quantum hardware, simulate quantum algorithms, and estimate the resources needed to run your quantum programs on future scaled quantum machines.

To learn more about how you can use quantum computing and quantum algorithms, see [What is Quantum Computing](xref:microsoft.quantum.overview.understanding).

## How to get started with Azure Quantum?

To get started with Azure Quantum, you first need to determine your current setup and requirements. Whether you are a developer or not, and whether you have an Azure account or not, there are different ways to begin your journey with Azure Quantum. The following table provides guidance based on your user type:

|User type|How to get started|
|---|---|
|I don't have an Azure account and I'm not a developer|You can visit the [Azure Quantum website](#the-azure-quantum-website)|
|I don't have an Azure account and I'm a developer|You can install the [Quantum Development Kit for Visual Studio Code](#visual-studio-code)|
|I have an Azure account|You can start by creating an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). Then, you can either use the [Azure portal](#the-azure-portal) or install the [Quantum Development Kit for Visual Studio Code](#visual-studio-code)|

You **don't need** to have an Azure account to use Azure Quantum. But, if you want to submit your quantum programs to real quantum hardware in Azure Quantum, you need an Azure account and an Azure Quantum workspace. 

To have an Azure account, can register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go). If you are a student, you can take advantage of a [free Azure account for students](https://azure.microsoft.com/free/students/).

### The Azure Quantum website

[Azure Quantum (quantum.microsoft.com)](https://quantum.microsoft.com/) is a central resource for exploring quantum computing. You can engage with the Copilot in Azure Quantum, a quantum-focused chatbot that helps you write code and better understand quantum concepts. You can also learn from experts and enthusiasts through blogs, articles and videos.

You can try out Q# code samples in the [online code editor](https://quantum.microsoft.com/tools/quantum-coding), submit your job the to the cloud-based Quantinuum Emulator, and open your code in [VS Code for the Web](https://vscode.dev/quantum) and continue working in a pre-configure quantum environment.

The Azure Quantum website is **free** of charge and **doesn't require** an Azure account. To get started, all you need is a Microsoft (MSA) email account. For more information, see [Explore Copilot in Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum).

### Visual Studio Code

Azure Quantum offers the **Quantum Development Kit (QDK)**. With the QDK, you can write Q# quantum programs, debug your code, get real-time code feedback, and choose your target machine. The QDK is the only development kit ready for Fault-Tolerant Quantum Computing (FTQC). Besides supporting for Q#, the QDK also supports Qiskit and Cirq programs for quantum computing, so if you're already working in other development languages, you can also run your circuits on Azure Quantum.

The Quantum Development Kit is **free** of charge and available in Visual Studio Code. For more information, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).

> [!NOTE]
> An Azure Quantum workspace is required to run your local quantum programs on Azure Quantum providers. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

### The Azure portal

If you have an Azure account, you can use the [Azure portal](https://ms.portal.azure.com/#create/Microsoft.AzureQuantum) to create an Azure Quantum workspace. An Azure Quantum workspace is a collection of assets associated with running quantum. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

With the Azure portal, you can submit your quantum programs to real quantum hardware, manage your Azure Quantum workspace, view your quantum jobs, and monitor your quantum programs.

## What is Q\#?

Q# is an open-source quantum programming language for developing and running quantum programs.

A quantum program can be seen as a particular set of classical subroutines which, when called, perform a computation by interacting with a quantum system; a program written in Q# does not directly model the quantum state, but rather describes how a classical control computer interacts with qubits. This allows you to be entirely agnostic about what a quantum state even *is* on each target machine, which might have different interpretations depending on the machine.

Q# is a standalone language offering a high level of abstraction. There is no notion of a quantum state or a circuit; instead, Q# implements programs in terms of statements and expressions, much like classical programming languages. Thus, the Q# language supports the integration of rich classical and quantum computing.

For more information, see [Introduction to Q#](xref:microsoft.quantum.qsharp-overview). To start writing Q# code, see [Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart).

## What can I do with Azure Quantum?

Azure Quantum offers a wide range of services and tools to help you develop quantum solutions.

For the latest information about Microsoft's quantum computing research, see the [Microsoft Research Quantum Computing](https://www.microsoft.com/research/research-area/quantum-computing/?) page.

### Hybrid quantum computing

Hybrid quantum computing refers to the processes and architecture of a classical computer and a quantum computer working together to solve a problem. With the latest generation of hybrid quantum computing architecture available in Azure Quantum you can start programming quantum computers by mixing classical and quantum instructions together.

For more information, see [Hybrid quantum computing](xref:microsoft.quantum.overview.hybrid).

### Resource estimation in quantum computing

In quantum computing, resource estimation is the ability to understand the resources, that is the number of qubits, number of quantum gates, processing time, etc., that will be required for a given algorithm, assuming (or taking as parameters) certain hardware characteristics. Understanding the number of qubits required for a quantum solution and the differences between qubit technologies allows innovators to prepare and refine their quantum solutions to run on future scaled quantum machines and ultimately accelerate their quantum impact.

The [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator) allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm. You can choose from pre-defined fault-tolerant protocols and specify assumptions of the underlying physical qubit model. The Azure Quantum Resource Estimator computes post-layout physical resource estimation by taking a set of inputs such as qubit parameters, the quantum error correction (QEC) code, the error budget, and [other parameters](xref:microsoft.quantum.overview.resources-estimator) into account.

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

:::image type="content" source="media/Resource-Estimation-component-overview.png" alt-text="Diagram showing components provided by Resource Estimator and corresponding customizations.":::

### Quantum simulation with Azure Quantum Elements

Quantum mechanics is the underlying "operating system" of the universe. It describes how the fundamental building blocks of nature behave. Nature's behaviors, such as chemical reactions, biological reactions, and material formations, often involve many-body quantum interactions. For simulating intrinsically quantum mechanical systems, such as molecules, quantum computing is promising, because qubits can be used to represent the natural states in question. Examples of quantum systems that quantum computing can model are photosynthesis, superconductivity, and complex molecular formations.

[Azure Quantum Elements](https://quantum.microsoft.com/solutions/azure-quantum-elements) is purpose-built to accelerate scientific discovery. Reinvent your research and development productivity with simulation workflows optimized for scaling on Azure High-Performance Computing (HPC) clusters, AI-accelerated computing, augmented reasoning using AI, integration with quantum tools to start experimenting with existing quantum hardware, and access in the future to Microsoft’s quantum supercomputer. 

For more information, see [Unlocking the power of Azure for Molecular Dynamics](https://cloudblogs.microsoft.com/quantum/2023/06/01/unlocking-the-power-of-azure-for-molecular-dynamics/).

### Quantum speedups

Quantum computers do exceptionally well with problems that require calculating a large number of possible combinations. These types of problems can be found in many areas, such as quantum simulation, cryptography, quantum machine learning, and search problems.

One of the goals of quantum computing research is to study which problems can be solved by a quantum computer faster than a classical computer and how large the speedup can be. One well-known example is the Grover's algorithm, which yield a polynomial speedup over the classical counterparts. 

[Grover's algorithm](xref:microsoft.quantum.concepts.grovers) speeds up the solution to unstructured data searches, running the search in fewer steps than any classical algorithm could. Indeed, any problem that allows you to check whether a given value $x$ is a valid solution (a "yes or no problem") can be formulated in terms of the search problem. 

For an implementation of Grover's algorithm, see [Tutorial: Implement Grover's search algorithm in Q#](xref:microsoft.quantum.tutorial-qdk.grovers).

## Quantum providers available on Azure Quantum

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers.

Choose the provider that best suits the characteristics of your problem and your needs. 

- [IONQ](xref:microsoft.quantum.providers.ionq): Dynamically reconfigurable trapped-ion quantum computers for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.
- [PASQAL](xref:microsoft.quantum.providers.pasqal) (Private Preview): Neutral atom-based quantum processors operating at room temperature, with long coherence times and impressive qubit connectivity. 
- [Quantinuum](xref:microsoft.quantum.providers.quantinuum): Trapped-ion systems with high-fidelity, fully connected qubits, low error rates, qubit reuse, and the ability to perform mid-circuit measurements.
- [Rigetti](xref:microsoft.quantum.providers.rigetti): Rigetti's systems are powered by superconducting qubit-based quantum processors. They offer fast gate times, low-latency conditional logic, and fast program execution times.

For more information on the specifications of each provider, see the full [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list). 

For information about job cost, see [Pricing in Azure Quantum](xref:microsoft.quantum.providers-pricing) and [FAQ: Understanding Job Costs and Billing in Azure Quantum](xref:microsoft.quantum.azure.job-cost-billing).

### Providers coming soon

- [Quantum Circuits, Inc](https://quantumcircuits.com/): Full-stack superconducting circuits, with real-time feedback that enables error correction, encoding-agnostic entangling gates.

## Related content

Start using Azure Quantum:

- [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace)
- [Get started with Q# and Visual Studio Code](xref:microsoft.quantum.submit-jobs)
- [Get started with Q# and Azure Quantum notebooks](xref:microsoft.quantum.get-started.notebooks)
- [Install the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
- [Run a Qiskit circuit in Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)
