---
author: SoniaLopezBravo
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud.
ms.date: 08/29/2022
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

> [!Tip]
> **Free trial.** If you don’t have an Azure subscription, you can [create an Azure free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) (check out free Azure accounts [for students](https://azure.microsoft.com/free/students/)). With Azure you can create, deploy, and manage applications across multiple clouds, on-premises, and at the edge. You will get 200 USD Azure credit to use in other Azure services. 


- [The parts of Azure Quantum](#the-parts-of-azure-quantum)
- [How to get started with Azure Quantum?](#how-to-get-started-with-azure-quantum)
- [Who is Azure Quantum for?](#who-is-azure-quantum-for)
- [Why use quantum computing?](#why-use-quantum-computing)
- [What are Q# and the Quantum Development Kit?](#what-are-q-and-the-quantum-development-kit)
- [Workflow of the quantum software development](#workflow-of-the-quantum-software-development)
- [Quantum cloud solutions available on Azure Quantum](#quantum-cloud-solutions-available-on-azure-quantum)

## The parts of Azure Quantum

Azure Quantum offers you two main paths of quantum solutions:

- [Quantum Computing](xref:microsoft.quantum.overview.understanding): Learn, experiment and prototype with a variety of quantum hardware providers to help you get ready for the future of scaled quantum machines. Unlike other solutions, you are not siloed to a single hardware technology, and you benefit from a full stack approach protecting your long-term investments. 
- [Optimization](xref:microsoft.quantum.optimization.concepts.overview.introduction): Develop solutions that help you reduce the cost of operation in a broad range of fields such as finance, energy cost, fleet management, scheduling, and more. 

With Azure Quantum and the [Quantum Development Kit toolset](xref:microsoft.quantum.overview.q-sharp), you will be able to program your quantum algorithms and optimization solutions, then apply those quantum solutions within the existing Azure platform to achieve real-world impacts even before the development of a general-purpose quantum computer. 

## How to get started with Azure Quantum?

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Start using Azure Quantum is very easy and free of cost for new users. To submit your quantum programs and optimization solutions to Azure Quantum you only need two things:

1. **Azure account**: If you don't have one yet, you can [create an Azure account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) for free. 
1. **Azure Quantum workspace**: An Azure Quantum workspace is a collection of assets associated with running quantum or optimization applications. To create an Azure Quantum workspace, go to the [Azure portal](https://ms.portal.azure.com/#create/Microsoft.AzureQuantum), select **Quick create** and it automatically creates the workspace and adds the default providers. Or select **Advance create**, and enter the details of your workspace and choose the providers. . 

For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Who is Azure Quantum for?

Azure Quantum is for individuals and teams who want to take a step forward and bring quantum computation into production.

### Industry solutions

For businesses, incorporating quantum type solutions can help to be more competitive and be at the forefront of innovation. To build industry solutions, Azure Quantum is the best path to apply the latest optimization technologies, as you seek long term cost-saving solutions. Azure Quantum offers the advantages of the most diverse quantum resources available today with applications for a wide range of industries. 

Enterprises or other organizations can work directly with the Azure Quantum team through the **Enterprise Acceleration Program** to tackle difficult, but high-reward, problems using high-performance hybrid quantum classical systems and a rich set of quantum hardware.

To learn more about how real-life problems can be solved using Azure Quantum and quantum applications, see the following [case studies](https://azure.microsoft.com/resources/whitepapers/search/?term=quantum).

### Developers

As a developer, you will use familiar programming tools to create quantum applications. You can start with the language and SDK that you’re most familiar with, such as [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) or [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq) Python packages, as well as explore and learn the full-featured, built-for-quantum language, Q#. With Azure Quantum and the Quantum Development Kit, developers can explore quantum programming and learn more about quantum applications, such as data search, quantum machine learning, or optimization solutions. 

You can build on code and work in your favorite [local development environment](xref:microsoft.quantum.install-qdk.overview), such as Visual Studio and Visual Studio Code, or work directly in the Azure Quantum portal with the [hosted Jupyter notebooks](xref:microsoft.quantum.how-to.notebooks).

### Researchers

As a researcher, Azure Quantum can help you test your quantum algorithms and theories and efficiently simulate quantum systems such as superconductivity and complex molecular formations. Azure Quantum enables you to learn, build, and deploy impactful solutions towards industrial-scale quantum computing, helping you harness quantum computing and benefit from the latest innovations. 

In addition to the default Azure Quantum credit grant of USD 500 per quantum hardware provider, Microsoft offers up to USD 10,000 in Azure Quantum credits towards use of quantum hardware to explore new algorithms, investigate use cases, and experiment with leading hardware platforms. Credits are awarded based on an application’s value to the quantum ecosystem from a research, education, or industry perspective. For more information, see [FAQ: Azure Quantum Credits program](xref:microsoft.quantum.credits.credits-faq).

To learn more about research resources and career opportunities, see the [Microsoft Quantum Computing research area](https://www.microsoft.com/research/research-area/quantum-computing/?facet%5Btax%5D%5Bmsr-research-area%5D%5B0%5D=243138&sort_by=most-recent). 


### Quantum enthusiasts

If you are an educator, a student, or quantum enthusiast, Azure Quantum is a great tool for teaching quantum computing and quantum applications. You will broaden your learning through the access to the most diverse set of quantum technologies, learn the basics of quantum computing and the quantum programming language Q#, and discover the areas where quantum computers have the potential to make a big impact.  In addition to using the default USD 500 in Azure Quantum credits for a class project, an [Azure for Students](https://azure.microsoft.com/free/students/) account will jumpstart the learning journey with an additional USD 100 in traditional Azure credits.

## Why use quantum computing?

Quantum computers harness the unique behavior of quantum physics—such as superposition, entanglement, and quantum interference—and apply it to computing. This introduces new concepts to traditional programming methods. Quantum effects empower quantum computers for calculating exponentially more information and solve more complicated problems. When designed to scale, quantum computers will have capabilities that exceed today's most powerful supercomputers. 

With Azure Quantum, you can make use of the advantages of quantum computing today, in a full-stack open cloud ecosystem with access to software, hardware, and pre-built solutions. Azure Quantum offers two types of solutions: quantum computing and optimization.

### Quantum computing

If you aim to simulate quantum mechanical problems, such as chemical reactions, biological reactions, or material formations, quantum computers work exceptionally well because they use quantum phenomena in their computation. Quantum computers can also aid to speed up progress in diverse areas such as financial services, machine learning, and unstructured data searches, where lots of calculations are needed.

With Azure Quantum, researchers and businesses can use quantum computing to model complex scenarios in risk management, cybersecurity, network analysis, data search, vaccine development, or materials science. To learn more about how you can use quantum computing and quantum algorithms, see [Understanding Quantum Computing](xref:microsoft.quantum.overview.understanding).  

### Optimization

Optimization is the process of finding the best solution to a problem given its desired outcome and constraints. Complex optimization problems exist across every industry: vehicle routing, supply chain management, scheduling, portfolio optimization, power grid management, and many others. Solving these real-world problems results in high-value benefits, such as reduced costs, accelerated processes, or reduced risks. 

In Azure Quantum, you can already implement optimization problems to run on various classical computing silicon solutions, such as CPU, FPGA, GPU, or custom silicon, faster than many other classical optimization techniques. 

On the other hand, simulating the quantum effects on classical computers has led to the development of new types of quantum solutions. **Quantum-Inspired Optimization** algorithms exploit some of the advantages of quantum computing on classical hardware, providing a speedup over traditional approaches.

Azure Quantum gives you access to a broad set of state-of-the-art quantum-inspired optimization algorithms developed by Microsoft and its partners. 

To learn more about the optimization solutions in Azure Quantum, see [What is optimization?](xref:microsoft.quantum.optimization.concepts.overview.introduction).

## What are Q\# and the Quantum Development Kit?

The Microsoft Quantum Development Kit (QDK) is an **open-source** development kit for Azure Quantum. It is built-in to the Azure Quantum portal, where you can develop programs using Jupyter Notebooks. You can also install the QDK to your own local environment and work both online with the Azure Quantum service and offline. The QDK includes the [quantum programming language Q#](xref:microsoft.quantum.overview.q-sharp), a high-level programming language that allows you to focus your work at the algorithm and application level to create quantum programs.

### The Quantum Development Kit

The QDK offers a set of tools that will assist you in the quantum software development process: 

- [Ready-to-use libraries](xref:microsoft.quantum.libraries.overview) to help you keep your code high-level, including both “standard” libraries that implement patterns common for a lot of quantum algorithms, and domain-specific libraries, such as chemistry and machine learning. 
- Local and cloud-based [quantum computing simulators](xref:microsoft.quantum.machines.overview) that simulate current and future quantum machines, so that you can run and debug your quantum algorithms written in Q#.  
- [Noise simulators](xref:microsoft.quantum.machines.overview.noise-simulator) that allow for simulating the behavior of Q# programs under the influence of noise and the stabilizer representation. 
- A [resource estimator](xref:microsoft.quantum.machines.overview.resources-estimator) that provides real world costs to run your solutions, for example, how many qubits you need and how long your program will take.
- Extensions for [Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) and [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode), and integration with [Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview.standalone).
- Interoperability with [Python](xref:microsoft.quantum.install-qdk.overview.python) and other [.NET languages](xref:microsoft.quantum.install-qdk.overview.cs), as well as integration with [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq), so quantum developers that are already working in other development languages can also run their circuits on Azure Quantum.

> [!NOTE]
> Azure Quantum is an flexible ecosystem. You can run Python code on Azure Quantum without explicitly calling any Q# code, such as submitting Qiskit or Cirq circuits, or submitting [optimization problems](xref:microsoft.quantum.submit-jobs-optimization). To use these features, you must install the [`azure-quantum´ Python package](xref:microsoft.quantum.install-qdk.overview.python-only).

### The quantum programming language Q\#

Why a quantum programming language? In short terms, because you want to write algorithms, not circuits.

A quantum program can be seen as a particular set of classical subroutines which, when called, perform a computation by interacting with a quantum system; a program written in Q# does not directly model the quantum state, but rather describes how a classical control computer interacts with [qubits](xref:microsoft.quantum.glossary-qdk#qubit). This allows you to be entirely agnostic about what a quantum state even *is* on each target machine, which might have different interpretations depending on the machine. You can write your code once and, with little to no change, run it against multiple targets of the same family, allowing you to focus your programming at the algorithm level.

You can develop quantum programs with Q# or Python in the Azure Quantum portal using Jupyter Notebooks, or develop in your local environment using your favorite IDE. Either environment allows you to submit jobs to quantum hardware through the Azure Quantum service, or use cloud-based or local quantum simulators. For more information, see [the different ways you can run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

## Workflow of the quantum software development

Azure Quantum provides the best development environment to create quantum algorithms for multiple platforms at once while preserving flexibility to tune the same algorithms for specific systems. You can pick from quantum programming languages such as Qiskit, Cirq, and Q# and run your algorithms on multiple quantum systems. With Azure Quantum, it’s easy to simultaneously explore today’s quantum systems and be ready for the scaled quantum systems of the future.

The following diagram shows the stages through which a quantum program goes from idea to complete implementation on Azure Quantum, and the tools offered by the QDK for each stage.

![qdk workflow](~/media/quantum-development-kit-flow-diagram.svg)

1. **Write your quantum code.** You can write your Q# program with the [hosted Jupyter notebooks](xref:microsoft.quantum.get-started.notebooks) available in your Azure Quantum workspace. If you prefer a local development environment, you can [create your Q# program](xref:microsoft.quantum.install-qdk.overview) using the QDK extensions for Visual Studio, Visual Studio Code, or Jupyter notebooks. 

2. **Use libraries to keep your code high level.** The [quantum libraries](xref:microsoft.quantum.libraries.overview) will help you keep your code high-level, doing a lot of the heavy lifting in implementation for you so that you can focus on the logic of your algorithms.

3. **Integrate with classical software.** The Quantum Development Kit allows you to [integrate Q# programs with Python and .NET](xref:microsoft.quantum.user-guide-qdk.overview.host-programs), enabling a quantum software developer to take advantage of a lot of the advances made in classical computing in the past 70 years. You can also reuse and submit your existing Qiskit and Cirq source code with little to no change.

4. **Run your quantum code in simulation.**  Once you’ve written your program, you’ll want to use [quantum simulators](xref:microsoft.quantum.machines.overview) – classical programs that simulate the behavior of a quantum system, so that you can run a small instance of your program and see what it does without actual hardware access.

5. **Estimate resources.**  Before running on quantum hardware, you’ll need to figure out whether your program can run on existing hardware. You can use [QDK resource estimators](xref:microsoft.quantum.machines.overview.resources-estimator) to tell you how many qubits you need and how long your program will take.

6. **Run your code on quantum hardware.** Finally, the last step is using [Azure Quantum](xref:microsoft.quantum.submit-jobs) to run your program on quantum hardware!

> [!Note]
> You use the same Q# code for all steps of the workflow. In the short term you might have to tweak some portions of the code to account for the current hardware limitations. But in the long run you’ll be able to switch between various simulators and hardware providers without any code modifications.

## Quantum cloud solutions available on Azure Quantum

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers.

### Quantum computing providers

Choose the provider that best suits the characteristics of your problem and your needs. 

- [Quantinuum](https://www.quantinuum.com): Trapped-ion system with high-fidelity, fully connected qubits, low error rates, qubit reuse, and the ability to perform mid-circuit measurements.
- [IONQ](https://ionq.com/): Dynamically reconfigurable trapped-ion quantum computer for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.
- [Pasqal](http://www.pasqal.com/): Neutral atom-based quantum processors operating at room temperature, with long coherence times and impressive qubit connectivity.  You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of Pasqal.
- [Rigetti](https://www.rigetti.com/): Gate-based superconducting processors will be available in Azure Quantum soon and utilize [Quantum Intermediate Representation (QIR)](https://github.com/qir-alliance/qir-spec/tree/main/specification) to enable low latency and parallel execution. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of Rigetti.
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
- [Get started with a Jupyter notebook and Qiskit in Azure Quantum](xref:microsoft.quantum.get-started.notebooks)
- [Set up a local development environment for Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
