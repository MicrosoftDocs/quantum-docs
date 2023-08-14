---
author: SoniaLopezBravo
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs problems in the cloud.
ms.date: 08/14/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: What is Azure Quantum?
uid: microsoft.quantum.azure-quantum-overview
---

# What is Azure Quantum?

Azure Quantum is the cloud quantum computing service of Azure, with a diverse set of quantum solutions and technologies. Azure Quantum ensures an open, flexible, and future-proofed path to quantum computing that adapts to your way of working, accelerates your progress, and protects your technology investments.

Azure Quantum provides the best development environment to create quantum algorithms for multiple platforms at once while preserving flexibility to tune the same algorithms for specific systems. You can write your code once and run it with little to no change against multiple targets of the same family which allows you to focus your programming at the algorithm level.

If you aim to simulate quantum mechanical problems, such as chemical reactions, biological reactions, or material formations, quantum computers work exceptionally well because they use quantum phenomena in their computation. Quantum computers can also aid to speed up progress in diverse areas such as financial services, machine learning, and unstructured data searches, where lots of calculations are needed. 

To learn more about how you can use quantum computing and quantum algorithms, see [Understanding Quantum Computing](xref:microsoft.quantum.overview.understanding).

> [!TIP]
> If you don’t have an Azure account, register for **free** and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go). If you are a student, you can take advantage of a [free Azure account for students](https://azure.microsoft.com/free/students/).

  
## How to get started with Azure Quantum?

### The Azure Quantum website

[Azure Quantum (quantum.microsoft.com)](https://quantum.microsoft.com/) is a central resource for exploring quantum computing. You can play with the Copilot in Azure Quantum, a quantum-focused chatbot that helps you write code and better understand concepts. You can also learn from experts and enthusiasts through blogs, articles and videos. And you can try out some Q# code samples in the online code editor, free of charge - all you need is a Microsoft (MSA) email account. To get started, see [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum)

### The Azure portal

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Start using Azure Quantum is very easy and free of cost for new users. To submit your quantum programs and optimization solutions to Azure Quantum you only need two things:

1. **Azure account**: If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
1. **Azure Quantum workspace**: An Azure Quantum workspace is a collection of assets associated with running quantum or optimization applications. To create an Azure Quantum workspace, go to the [Azure portal](https://ms.portal.azure.com/#create/Microsoft.AzureQuantum), select **Quick create** and it automatically creates the workspace and adds the default providers. Or select **Advance create**, and enter the details of your workspace and choose the providers.

For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Hybrid quantum computing

Hybrid quantum computing refers to the processes and architecture of a classical computer and a quantum computer working together to solve a problem. With the latest generation of hybrid quantum computing architecture available in Azure Quantum you can start programming quantum computers by mixing classical and quantum instructions together. For more information, see [Hybrid quantum computing](xref:microsoft.quantum.overview.hybrid).

- [Batch quantum computing](xref:microsoft.quantum.hybrid.batch): Batching multiple circuits into one job eliminates the wait between job submissions, allowing you to run multiple jobs faster. Examples of problems that can take advantage of batch quantum computing include Shor's algorithm and simple quantum phase estimation.
- [Interactive quantum computing (Sessions)](xref:microsoft.quantum.hybrid.interactive): Jobs can be grouped logically into one session and prioritized over non-session jobs. Examples of problems that can use this approach are Variational Quantum Eigensolvers (VQE) and Quantum Approximate Optimization Algorithms (QAOA).
- [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated): By integrating quantum and classical computing, quantum programs can move away from just circuits. Programs can now use common programming constructs to perform mid-circuit measurements, optimize and reuse qubits, and adapt in real-time to the QPU. Examples of scenarios that can take advantage of this model are adaptive phase estimation and machine learning.
- [Distributed quantum computing](xref:microsoft.quantum.hybrid.distributed): The distributed quantum computing model enables real-time computations across quantum and distributed resources. Eamples of scenarios that can take advantage of this model are complex materials modeling or the evaluation of full catalytic reactions.

## Resource estimation in quantum computing

In quantum computing, resource estimation is the ability to understand the resources, that is the number of qubits, number of quantum gates, processing time, etc., that will be required for a given algorithm, assuming (or taking as parameters) certain hardware characteristics. Understanding the number of qubits required for a quantum solution and the differences between qubit technologies allows innovators to prepare and refine their quantum solutions to run on future scaled quantum machines and ultimately accelerate their quantum impact.

Azure Quantum offers a first-party resource estimation target that computes and outputs wall clock execution time and physical resource estimates for a program, assuming it is executed on a fault-tolerant error-corrected quantum computer. Designed specifically for scaled quantum (post-NISQ, fault-tolerant systems), the **Azure Quantum Resource Estimator** allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm. You can choose from pre-defined fault-tolerant protocols and specify assumptions of the underlying physical qubit model. 

The Azure Quantum Resource Estimator computes post-layout physical resource estimation by taking assumptions about qubit parameters, quantum error correction (QEC) codes, and an error budget into account. It takes a [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir) program as input and, therefore, supports any language that translates to QIR, for example, you can use the Azure Quantum Resource Estimator with popular quantum SDKs and languages such as Q# and Qiskit.

The Azure Quantum Resource Estimator takes a set of inputs, with predefined and custom values to easily get you started. For more information, see [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) reference page.

## What are Q\# and the Quantum Development Kit?

The [Microsoft Quantum Development Kit (QDK)](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode) is the SDK required to interface with the Azure Quantum service. The QDK includes the language Q#, a high-level **open-source** quantum programming language that allows you to focus your work at the algorithm and application level to create quantum programs.


You can [install the QDK locally](xref:microsoft.quantum.install-qdk.overview) on your computer, or use it as a pre-installed component in the free hosted Jupyter notebooks part of the Azure Quantum service. Either environment allows you to submit jobs to quantum hardware through the Azure Quantum service, or use cloud-based or local quantum simulators. For more information, see [different ways you can run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

A quantum program can be seen as a particular set of classical subroutines which, when called, perform a computation by interacting with a quantum system; a program written in Q# does not directly model the quantum state, but rather describes how a classical control computer interacts with [qubits](xref:microsoft.quantum.glossary-qdk#qubit). This allows you to be entirely agnostic about what a quantum state even *is* on each target machine, which might have different interpretations depending on the machine. You can write your code once and, with little to no change, run it against multiple targets of the same family, allowing you to focus your programming at the algorithm level.

For more information, see [Introduction to Q\# and the Quantum Development Kit](xref:microsoft.quantum.overview.q-sharp).

## Workflow of the quantum software development

Azure Quantum provides the best development environment to create quantum algorithms for multiple platforms at once while preserving flexibility to tune the same algorithms for specific systems. You can pick from quantum programming languages such as Qiskit, Cirq, and Q# and run your algorithms on multiple quantum systems.

The following diagram shows the stages through which a quantum program goes from idea to complete implementation on Azure Quantum, and the tools offered by the QDK for each stage.

![qdk workflow](~/media/quantum-development-kit-flow-diagram.svg)

1. **Write your quantum code.** You can write your Q# program with the [hosted Jupyter Notebooks](xref:microsoft.quantum.get-started.notebooks) available in your Azure Quantum workspace. If you prefer a local development environment, you can [create your Q# program](xref:microsoft.quantum.install-qdk.overview) using the QDK extensions for [Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) and [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode). 

2. **Use libraries to keep your code high level.** The open-source [quantum libraries](xref:microsoft.quantum.libraries.overview) help you keep your code high-level, doing a lot of the heavy lifting in implementation for you so that you can focus on the logic of your algorithms. They include [standard libraries](xref:microsoft.quantum.libraries.overview.standard.intro) that implement patterns common for a lot of quantum algorithms, and domain-specific libraries, such as a [chemistry](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview) and [machine learning](xref:microsoft.quantum.libraries.overview.machine-learning.intro) libraries. 

3. **Integrate with classical software.** The Quantum Development Kit allows you to [integrate Q# programs with Python and .NET](xref:microsoft.quantum.user-guide-qdk.overview.host-programs), enabling a quantum software developer to take advantage of a lot of the advances made in classical computing in the past 70 years. You can also reuse and submit your existing [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit.portal) and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq.portal) source code with little to no change.

4. **Run your quantum code in simulation.**  Once you’ve written your program, you’ll want to use [quantum simulators](xref:microsoft.quantum.machines.overview) – classical programs that simulate the behavior of a quantum system, so that you can run and debug your quantum algorithms written in Q#.

5. **Estimate resources.**  You need to understand how the implementation of your quantum program changes to the resource consumption. You can use the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) to tell you the physical resource estimates you need and how long your program will take to run.

6. **Run your code on quantum hardware.** Finally, the last step is using [Azure Quantum](xref:microsoft.quantum.submit-jobs) to run your program on [quantum hardware](xref:microsoft.quantum.reference.qc-target-list). 

> [!NOTE]
> Azure Quantum is a flexible ecosystem. You can run Python code on Azure Quantum without explicitly calling any Q# code, such as submitting Qiskit or Cirq circuits. To use these features, you must install the [*azure-quantum* Python package](xref:microsoft.quantum.install-qdk.overview).

## Providers available on Azure Quantum

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers.

Choose the provider that best suits the characteristics of your problem and your needs. 

- [Quantinuum](https://www.quantinuum.com): Trapped-ion system with high-fidelity, fully connected qubits, low error rates, qubit reuse, and the ability to perform mid-circuit measurements.
- [IONQ](https://ionq.com/): Dynamically reconfigurable trapped-ion quantum computer for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.
- [Rigetti](https://www.rigetti.com/): Gate-based superconducting processors that utilize [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir) to enable low latency and parallel execution.
- [Pasqal](https://pasqal.io/): Neutral atom-based quantum processors operating at room temperature, with long coherence times and impressive qubit connectivity.  You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of Pasqal.
- [Quantum Circuits, Inc](https://quantumcircuits.com/): Full-stack superconducting circuits, with real-time feedback that enables error correction, encoding-agnostic entangling gates. 

For more information on the specifications of each provider, see the full [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list).


## Next steps

Start using Azure Quantum:

- [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace)
- [Get started with a Jupyter Notebook and Qiskit in Azure Quantum](xref:microsoft.quantum.get-started.notebooks)
- [Set up a local development environment for Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
