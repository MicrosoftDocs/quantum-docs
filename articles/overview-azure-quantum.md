---
author: azure-quantum-content
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs in the cloud.
ms.date: 10/30/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: What is Azure Quantum?
uid: microsoft.quantum.azure-quantum-overview
#customer intent: As a quantum programmer, I want to know how I can use Azure Quantum. 
---

# What is Azure Quantum?

Azure Quantum is Microsoft Azure's cloud quantum computing service. Azure Quantum provides an open, flexible, and future-proofed path to quantum computing that adapts to your way of working.

Azure Quantum offers a range of quantum computing solutions, including quantum hardware from industry-leading providers, quantum software, and quantum services. With Azure Quantum, you can run quantum programs on real quantum hardware, simulate quantum algorithms, and estimate the resources needed to run your quantum programs on future scaled quantum machines.

To learn more about how you can use quantum computing and quantum algorithms, see [What is Quantum Computing?](xref:microsoft.quantum.overview.understanding)

## How to get started with Azure Quantum

To use Azure Quantum, you need to have an Azure account and an Azure Quantum workspace. To develop quantum programs and submit jobs to run your programs on Azure Quantum, use the Microsoft Quantum Development Kit (QDK).

To get an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go). If you're a student, then you can take advantage of a [free Azure account for students](https://azure.microsoft.com/free/students/?cid=msft_learn).

> [!NOTE]
> You don't need to have an Azure account to use the QDK.

### The Microsoft Quantum website

The [Microsoft Quantum website](https://quantum.microsoft.com/) is a central resource where you can explore quantum computing at Microsoft. You can get the latest news and information from Microsoft Quantum. You can learn from experts and enthusiasts through blogs, articles, and videos.

You don't need an Azure account to access the resources and information on the Microsoft Quantum website.

### The Microsoft Quantum Development Kit

The Microsoft Quantum Development Kit (QDK) is a software development kit designed specifically for quantum development. With the QDK, you can write programs in different quantum programming languages, debug your code, visualize quantum circuits and results, and submit jobs to quantum hardware providers on Azure Quantum. The QDK supports Microsoft's Q# programming language, along with other languages like Qiskit, Cirq, and OpenQASM.

The QDK is free and open source. To get started, install the QDK extension in Visual Studio Code (VS Code) or install the QDK Python library. For more information, see [Set up the Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).

> [!NOTE]
> To run programs on Azure Quantum, you need to have an Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

### The Azure portal

If you have an Azure account, use the [Azure portal](https://ms.portal.azure.com/#create/Microsoft.AzureQuantum) to create an Azure Quantum workspace. An Azure Quantum workspace is a collection of assets that are associated with running quantum programs. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

With the Azure portal, you can submit your quantum programs to real quantum hardware, manage your Azure Quantum workspace, view information about your quantum jobs, and monitor your quantum programs.

## What is Q\#?

Q# is an open-source quantum programming language created by Microsoft to develop and run your quantum programs.

You can think of a quantum program as a set of classical subroutines that interact with a quantum system to perform a computation. A Q# program doesn't directly model the quantum state, but rather describes how a classical control computer interacts with qubits. Q# is hardware-agnostic, so you don't need to consider actual qubit technologies when you write Q# programs. Your Q# code can run on any quantum hardware technology.

Q# is a standalone language that offers a high level of abstraction. There's no notion of a quantum state or circuit. Instead, Q# implements programs in terms of statements and expressions, like classical programming languages such as Python. You can seamlessly integrate classical and quantum computing structures in your Q# code.

For more information, see [Introduction to Q#](xref:microsoft.quantum.qsharp-overview). To start writing Q# code, see [Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart).

## What can I do with Azure Quantum?

Azure Quantum offers a wide range of services and tools to help you develop quantum solutions.

For the latest information about Microsoft's quantum computing research, see the [Microsoft Research Quantum Computing](https://www.microsoft.com/research/research-area/quantum-computing/?) page.

### Hybrid quantum computing

Hybrid quantum computing refers to the processes and architecture of a classical computer and a quantum computer working together to solve a problem. With the latest generation of hybrid quantum computer architecture available in Azure Quantum, you can get started with a classical-quantum hybrid approach to programming.

For more information, see [What is hybrid quantum computing?](xref:microsoft.quantum.overview.hybrid)

### Resource estimation in quantum computing

In quantum computing, resource estimation is a technique to understand the resources that are required to run an algorithm on a quantum computer. When you understand the resource requirements to run your programs on different types of quantum hardware, you can prepare and refine your quantum solutions to run on future scaled quantum machines. For example, resource estimation can help you determine the feasibility of breaking a particular encryption algorithm on a specific type of quantum computer.

The [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator) allows you to assess architectural decisions, compare qubit technologies, and determine the resources that you need to run a specific quantum algorithm. You can choose from pre-defined fault-tolerant protocols, or set your own estimation parameters. The resource estimator computes post-layout physical resource estimates from a set of inputs such as qubit parameters, the quantum error correction (QEC) code, the error budget, and [other parameters](xref:microsoft.quantum.overview.resources-estimator).

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

:::image type="content" source="media/Resource-Estimation-component-overview.png" alt-text="Diagram showing components provided by resource estimator and corresponding customizations.":::

### Quantum chemistry simulations with Azure Quantum and the QDK

You can think of quantum mechanics as the underlying operating system of our universe that describes how the fundamental building blocks of nature behave. Chemical reactions, cellular processes, and material properties are all quantum mechanical in nature, and often involve interactions between a huge number of quantum particles. Quantum computers have promise to simulate quantum mechanical systems, such as molecules, because qubits can be used to represent the natural quantum states in these systems. Examples of quantum systems that qubits can model include photosynthesis, superconductivity, and complex molecular formations.

The QDK and Azure Quantum are purpose-built to accelerate scientific discovery. Reinvent your research and development productivity with simulation workflows that are optimized for scaling on Azure high-performance computing (HPC) clusters, AI-accelerated computing, integration with quantum tools and quantum hardware, and future access to Microsoft’s quantum supercomputer.

For more information, see [Unlocking the power of Azure for Molecular Dynamics](https://cloudblogs.microsoft.com/quantum/2023/06/01/unlocking-the-power-of-azure-for-molecular-dynamics/).

### Quantum speedup

Quantum computers do exceptionally well with problems that require calculations of a large number of possible combinations. These types of problems can be found in many areas, such as quantum simulation, cryptography, quantum machine learning, and search problems.

One of the goals of quantum computing research is to study the kinds of problems that a quantum computer can solve faster than a classical computer, and how much faster. One well-known example is Grover's algorithm, which yields a polynomial speedup over the classical algorithms.

[Grover's algorithm](xref:microsoft.quantum.concepts.grovers) speeds up the solution to unstructured data searches by running the search in fewer steps than any classical algorithm could. In general, problems that allow you to check whether a given value is a valid solution (a "yes or no problem") can be formulated in terms of the search problem.

For an implementation of Grover's algorithm, see [Tutorial: Implement Grover's search algorithm in Q#](xref:microsoft.quantum.tutorial-qdk.grovers).

## Quantum providers available on Azure Quantum

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. Azure Quantum currently partners with the following providers to empower you to run your quantum programs on real hardware or on hardware simulators.

Choose the provider that best suits the characteristics of your problem and your needs.

- [IonQ](xref:microsoft.quantum.providers.ionq): Dynamically reconfigurable trapped-ion quantum computers for up to 36 fully connected qubits, that lets you run a two-qubit gate between any pair.
- [Pasqal](xref:microsoft.quantum.providers.pasqal): Neutral atom-based quantum processors that operate at room temperature, with long coherence times and impressive qubit connectivity.
- [Quantinuum](xref:microsoft.quantum.providers.quantinuum): Trapped-ion systems with high-fidelity, fully connected qubits, low error rates, qubit reuse, and the ability to perform mid-circuit measurements.
- [Rigetti](xref:microsoft.quantum.providers.rigetti): Powered by superconducting qubit-based quantum processors, these systems offer fast gate times, low-latency conditional logic, and fast program execution times.

For more information on the specifications of each provider, see the full [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list).

For information about job cost, see [Pricing in Azure Quantum](xref:microsoft.quantum.providers-pricing) and [FAQ: Understanding Job Costs and Billing in Azure Quantum](xref:microsoft.quantum.azure.job-cost-billing).

## Related content

To start using Azure Quantum, explore the following links:

- [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace)
- [Get started with Q# and Visual Studio Code](xref:microsoft.quantum.submit-jobs)
- [Install the Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
- [Run a Qiskit circuit in Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)
