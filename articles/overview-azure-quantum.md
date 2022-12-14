---
author: SoniaLopezBravo
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud.
ms.date: 10/26/2022
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
title: What is Azure Quantum?
uid: microsoft.quantum.azure-quantum-overview
---

# What is Azure Quantum?

Azure Quantum is the cloud quantum computing service of Azure, with a diverse set of quantum solutions and technologies. Azure Quantum ensures an open, flexible, and future-proofed path to quantum computing that adapts to your way of working, accelerates your progress, and protects your technology investments.

Azure Quantum provides the best development environment to create quantum algorithms for multiple platforms at once while preserving flexibility to tune the same algorithms for specific systems. You can write your code once and run it with little to no change against multiple targets of the same family which allows you to focus your programming at the algorithm level.

- An **open ecosystem**, enabling you to access diverse quantum software, hardware, and solutions from Microsoft and its partners. You can pick from quantum programming languages such as Qiskit, Cirq, and Q# and run your algorithms on multiple quantum systems.
- Quantum impact today, allowing you to simultaneously explore today’s quantum systems and be ready for the scaled quantum systems of the future, and with pre-built solutions that run on classical and accelerated compute resources (also referred to as optimization solutions).

> [!TIP]
> If you don’t have an Azure account, register for **free** and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go). If you are a student, you can take advantage of a [free Azure account for students](https://azure.microsoft.com/free/students/).


- [The parts of Azure Quantum](#the-parts-of-azure-quantum)
- [How to get started with Azure Quantum?](#how-to-get-started-with-azure-quantum)
- [Resource estimation in quantum computing](#resource-estimation-in-quantum-computing)
- [What are Q# and the Quantum Development Kit?](#what-are-q-and-the-quantum-development-kit)
- [Workflow of the quantum software development](#workflow-of-the-quantum-software-development)
- [Providers available on Azure Quantum](#providers-available-on-azure-quantum)


## The parts of Azure Quantum

With Azure Quantum, you can make use of the advantages of quantum computing today in a full-stack open cloud ecosystem with access to software, hardware, and pre-built solutions. Azure Quantum offers two types of quantum solutions: quantum computing and optimization.

### Quantum computing

If you aim to simulate quantum mechanical problems, such as chemical reactions, biological reactions, or material formations, quantum computers work exceptionally well because they use quantum phenomena in their computation. Quantum computers can also aid to speed up progress in diverse areas such as financial services, machine learning, and unstructured data searches, where lots of calculations are needed.

With Azure Quantum, researchers and businesses can use quantum computing to model complex scenarios in risk management, cybersecurity, network analysis, data search, vaccine development, or materials science. To learn more about how you can use quantum computing and quantum algorithms, see [Understanding Quantum Computing](xref:microsoft.quantum.overview.understanding).  

### Optimization

Decades of simulation of the quantum effects on classical computers has led to the development of new types of quantum solutions named *quantum-inspired optimization*. Optimization is the process of finding the best solution to a problem given its desired outcome and constraints. Complex optimization problems exist across every industry: vehicle routing, supply chain management, scheduling, portfolio optimization, power grid management, and many others. Solving these real-world problems results in high-value benefits, such as reduced costs, accelerated processes, or reduced risks. 

Quantum-inspired optimization algorithms exploit some of the advantages of quantum computing on classical hardware, providing a speedup over traditional approaches.

Azure Quantum gives you access to a broad set of state-of-the-art quantum-inspired optimization algorithms developed by Microsoft and its partners. To learn more about the optimization solutions in Azure Quantum, see [What is optimization?](xref:microsoft.quantum.optimization.concepts.overview.introduction).

## How to get started with Azure Quantum?

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Start using Azure Quantum is very easy and free of cost for new users. To submit your quantum programs and optimization solutions to Azure Quantum you only need two things:

1. **Azure account**: If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
1. **Azure Quantum workspace**: An Azure Quantum workspace is a collection of assets associated with running quantum or optimization applications. To create an Azure Quantum workspace, go to the [Azure portal](https://ms.portal.azure.com/#create/Microsoft.AzureQuantum), select **Quick create** and it automatically creates the workspace and adds the default providers. Or select **Advance create**, and enter the details of your workspace and choose the providers.

For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Resource estimation in quantum computing

In quantum computing, resource estimation is the ability to understand the resources, that is the number of qubits, number of quantum gates, processing time, etc., that will be required for a given algorithm, assuming (or taking as parameters) certain hardware characteristics. Understanding the number of qubits required for a quantum solution and the differences between qubit technologies allows innovators to prepare and refine their quantum solutions to run on future scaled quantum machines and ultimately accelerate their quantum impact.

Azure Quantum offers a first-party resource estimation target that computes and outputs wall clock execution time and physical resource estimates for a program, assuming it is executed on a fault-tolerant error-corrected quantum computer. Designed specifically for scaled quantum (post-NISQ, fault-tolerant systems), the **Azure Quantum Resource Estimator** allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm. You can choose from pre-defined fault-tolerant protocols and specify assumptions of the underlying physical qubit model. 

The Azure Quantum Resource Estimator computes post-layout physical resource estimation by taking assumptions about qubit parameters, quantum error correction (QEC) codes, and an error budget into account. It takes a [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir) program as input and, therefore, supports any language that translates to QIR, for example, you can use the Azure Quantum Resource Estimator with popular quantum SDKs and languages such as Q# and Qiskit.

The Azure Quantum Resource Estimator takes a set of inputs, with pre-defined values to easily get you started: 

- Physical qubit parameters
- A Quantum Error Correction (QEC) scheme  
- An error budget 

For more information, see [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) reference page.


## What are Q\# and the Quantum Development Kit?

The Microsoft Quantum Development Kit (QDK) is an **open-source** development kit for Azure Quantum. It is built-in to the Azure Quantum portal, where you can develop programs using hosted Jupyter Notebooks. You can also install the QDK to your own local environment and work both online with the Azure Quantum service and offline. The QDK includes the [quantum programming language Q#](xref:microsoft.quantum.overview.q-sharp), a high-level programming language that allows you to focus your work at the algorithm and application level to create quantum programs.

### The Quantum Development Kit

The QDK offers a set of tools that will assist you in the quantum software development process: 

- [Ready-to-use libraries](xref:microsoft.quantum.libraries.overview) to help you keep your code high-level, including both “standard” libraries that implement patterns common for a lot of quantum algorithms, and domain-specific libraries, such as chemistry and machine learning. 
- Local and cloud-based [quantum computing simulators](xref:microsoft.quantum.machines.overview) that simulate current and future quantum machines, so that you can run and debug your quantum algorithms written in Q#.  
- [Noise simulators](xref:microsoft.quantum.machines.overview.noise-simulator) that allow for simulating the behavior of Q# programs under the influence of noise and the stabilizer representation. 
- Extensions for [Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) and [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode), and integration with [Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview).
- Interoperability with [Python](xref:microsoft.quantum.install-qdk.overview) and other [.NET languages](xref:microsoft.quantum.how-to.csharp-local)), as well as integration with [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit.portal) and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq.portal), so quantum developers that are already working in other development languages can also run their circuits on Azure Quantum.

> [!NOTE]
> Azure Quantum is a flexible ecosystem. You can run Python code on Azure Quantum without explicitly calling any Q# code, such as submitting Qiskit or Cirq circuits, or submitting [optimization problems](xref:microsoft.quantum.submit-jobs-optimization). To use these features, you must install the [*azure-quantum* Python package](xref:microsoft.quantum.install-qdk.overview).

### The quantum programming language Q\#

Why a quantum programming language? In short terms, because you want to write algorithms, not circuits.

A quantum program can be seen as a particular set of classical subroutines which, when called, perform a computation by interacting with a quantum system; a program written in Q# does not directly model the quantum state, but rather describes how a classical control computer interacts with [qubits](xref:microsoft.quantum.glossary-qdk#qubit). This allows you to be entirely agnostic about what a quantum state even *is* on each target machine, which might have different interpretations depending on the machine. You can write your code once and, with little to no change, run it against multiple targets of the same family, allowing you to focus your programming at the algorithm level.

You can develop quantum programs with Q# or Python in the Azure Quantum portal using Jupyter Notebooks, or develop in your local environment using your favorite IDE. Either environment allows you to submit jobs to quantum hardware through the Azure Quantum service, or use cloud-based or local quantum simulators. For more information, see [different ways you can run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

## Workflow of the quantum software development

Azure Quantum provides the best development environment to create quantum algorithms for multiple platforms at once while preserving flexibility to tune the same algorithms for specific systems. You can pick from quantum programming languages such as Qiskit, Cirq, and Q# and run your algorithms on multiple quantum systems. With Azure Quantum, it’s easy to simultaneously explore today’s quantum systems and be ready for the scaled quantum systems of the future.

The following diagram shows the stages through which a quantum program goes from idea to complete implementation on Azure Quantum, and the tools offered by the QDK for each stage.

![qdk workflow](~/media/quantum-development-kit-flow-diagram.svg)

1. **Write your quantum code.** You can write your Q# program with the [hosted Jupyter Notebooks](xref:microsoft.quantum.get-started.notebooks) available in your Azure Quantum workspace. If you prefer a local development environment, you can [create your Q# program](xref:microsoft.quantum.install-qdk.overview) using the QDK extensions for Visual Studio, Visual Studio Code, or Jupyter Notebooks. 

2. **Use libraries to keep your code high level.** The [quantum libraries](xref:microsoft.quantum.libraries.overview) will help you keep your code high-level, doing a lot of the heavy lifting in implementation for you so that you can focus on the logic of your algorithms.

3. **Integrate with classical software.** The Quantum Development Kit allows you to [integrate Q# programs with Python and .NET](xref:microsoft.quantum.user-guide-qdk.overview.host-programs), enabling a quantum software developer to take advantage of a lot of the advances made in classical computing in the past 70 years. You can also reuse and submit your existing Qiskit and Cirq source code with little to no change.

4. **Run your quantum code in simulation.**  Once you’ve written your program, you’ll want to use [quantum simulators](xref:microsoft.quantum.machines.overview) – classical programs that simulate the behavior of a quantum system, so that you can run a small instance of your program and see what it does without actual hardware access.

5. **Estimate resources.**  Before running on quantum hardware, you’ll need to figure out whether your program can run on existing hardware. You can use the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) to tell you the physical resource estimates you need and how long your program will take.

6. **Run your code on quantum hardware.** Finally, the last step is using [Azure Quantum](xref:microsoft.quantum.submit-jobs) to run your program on quantum hardware!

> [!Note]
> You use the same Q# code for all steps of the workflow. In the short term you might have to tweak some portions of the code to account for the current hardware limitations. But in the long run you’ll be able to switch between various simulators and hardware providers without any code modifications.

## Providers available on Azure Quantum

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers.

### Quantum computing providers

Choose the provider that best suits the characteristics of your problem and your needs. 

- [Quantinuum](https://www.quantinuum.com): Trapped-ion system with high-fidelity, fully connected qubits, low error rates, qubit reuse, and the ability to perform mid-circuit measurements.
- [IONQ](https://ionq.com/): Dynamically reconfigurable trapped-ion quantum computer for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.
- [Rigetti](https://www.rigetti.com/): Gate-based superconducting processors that utilize [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir) to enable low latency and parallel execution.
- [Pasqal](https://pasqal.io/): Neutral atom-based quantum processors operating at room temperature, with long coherence times and impressive qubit connectivity.  You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of Pasqal.
- [Quantum Circuits, Inc](https://quantumcircuits.com/): Full-stack superconducting circuits, with real-time feedback that enables error correction, encoding-agnostic entangling gates. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of QCI.

For more information on the specifications of each provider, see the full [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list).

### Optimization providers

For optimization solutions, these are the available providers you can choose from:

- [1QBit](https://1qbit.com/): Iterative heuristic algorithms that use search techniques to solve QUBO problems.
- [Microsoft QIO](xref:microsoft.quantum.optimization.providers.microsoft.qio): A set of multiple targets that rephrase the optimization problem inspired by decades of quantum research.
- [Toshiba SQBM+](https://www.toshiba-sol.co.jp/en/pro/sbm/index.htm): Toshiba Simulated Quantum Bifurcation Machine is a GPU-powered ISING machine that solves large-scale combinatorial optimization problems at high speed.

For more information on the specifications of each provider, see the full [Optimization target list](xref:microsoft.quantum.reference.qio-target-list).

## Next steps

Start using Azure Quantum:

- [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace)
- [Get started with a Jupyter Notebook and Qiskit in Azure Quantum](xref:microsoft.quantum.get-started.notebooks)
- [Set up a local development environment for Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
