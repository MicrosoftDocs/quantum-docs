---
author: SoniaLopezBravo
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud.
ms.author: v-sonialopez
ms.date: 09/21/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
title: What is Azure Quantum?
uid: microsoft.quantum.azure-quantum-overview
---

# What is Azure Quantum?

Azure Quantum is a cloud service that brings you, under as single pane a glass, the most diverse set of quantum solutions and technologies. You can write your code once and run it with little to no change against multiple targets of the same family and worry less about hardware or solution specificities.

- An **open ecosystem**, enabling you to access diverse quantum software, hardware, and solutions from Microsoft and its partners.
- Quantum impact today, with pre-built solutions that run on classical and accelerated compute resources (also referred to as optimization solutions).

Azure Quantum offers you two main paths of quantum solutions:

- [Quantum Computing]((xref:microsoft.quantum.overview.qdk-overview)): to learn, experiment and prototype with a variety of quantum hardware providers to help you get ready for the future of scaled quantum machines. Unlike other solutions, you are not siloed to a single hardware technology, and you benefit from a full stack approach protecting your long-term investments. 
- [Optimization](xref:microsoft.quantum.optimization.overview.what-is-qio): to develop solutions that help you reduce cost of operation in a broad range of fields such as finance, energy cost, fleet management, scheduling, and more. 

With Azure Quantum and the [Quantum Development Kit toolset](xref:microsoft.quantum.overview.q-sharp), you will be able to program  your quantum algorithms and optimization solutions, then apply those quantum solutions within the existing Azure platform to achieve real-world impacts even before the development of a general-purpose quantum computer. 



> [!Tip]
> **Free trial!** If you don’t have an Azure subscription, you can [create a free account](https://azure.microsoft.com/free/) before you begin. You can also apply to the [Azure Quantum Credits program](https://microsoft.qualtrics.com/jfe/form/SV_3fl9dfFrkC3g0aG?aq_source=organic), Microsoft offers up to $10,000 USD in credits for use on quantum hardware. After the credits are used up, you can keep the account and use free Azure services. Your credit card is never charged unless you explicitly change your settings and ask to be charged.

## What is Q\# and the Quantum Development Kit?

The Microsoft Quantum Development Kit (QDK) is an open-source development kit to develop quantum applications and to formulate optimization problems. The QDK includes the [quantum programming language Q#](xref:microsoft.quantum.overview.q-sharp), a high-level programming language that allows you to focus your work at the algorithm and application level to create quantum programs.

The QDK offers a set of tools that will assist you in the quantum software development process: 

- [Ready-to-use libraries](xref:microsoft.quantum.libraries.overview) to help you keep your code high-level, including both “standard” libraries that implement patterns common for a lot of quantum algorithms, and domain-specific libraries, such as chemistry and machine learning. 
- [Quantum computing simulators](xref:microsoft.quantum.machines.overview), so that you can run a small instance of your program and see what it does without actual hardware access. 
- Preview simulators that allow for simulating the behavior of Q# programs under the influence of noise and the stabilizer representation. 
- A [resource estimator](xref:microsoft.quantum.machines.overview.resources-estimator) that provides real world costs to run your solutions, for example, how many qubits you need and how long your program will take.

### Tools for developers

The Quantum Development Kit includes extensions for [Visual Studio](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit) and [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode), and integration with [Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview.jupyter). 
 
You can use Q# as standalone, in notebooks, and at the command-line or use a host language, the QDK supports interoperability with [Python](xref:microsoft.quantum.install-qdk.overview.python) and [.NET languages](xref:microsoft.quantum.install-qdk.overview.cs). You can also formulate optimization solutions with the Azure Quantum optimization Python package. As quantum systems evolve, your code endures.

### Workflow of the quantum software development

The Quantum Development Kit is the development kit for Q#, a quantum-focused programming language and Azure Quantum is the quantum cloud platform. The following diagram shows the stages through which a quantum program goes from idea to complete implementation on Azure Quantum, and the tools offered by the QDK for each stage.

![qdk workflow](~/media/quantum-development-kit-flow-diagram.png)

1. **Write your quantum code.** You can create you Q# program using the QDK extensions for Visual Studio, Visual Studio Code or Jupyter Notebooks.
2. **Use libraries to keep your code high level.** The quantum libraries will help you keep your code high-level, doing a lot of the heavy lifting in implementation for you so that you can focus on the logic of your algorithms.
3. **Integrate with classical software.** The Quantum Development Kit allows you to [integrate Q# programs with Python and .NET](xref:microsoft.quantum.user-guide-qdk.overview.host-programs), enabling a quantum software developer to take advantage of a lot of the advances made in classical computing in the past 70 years.
4. **Run your quantum code in simulation.**  Once you’ve written your program, you’ll want to use simulators – classical programs that simulate the behavior of a quantum system, so that you can run a small instance of your program and see what it does without actual hardware access.
5. **Estimate resources.**  Before running on quantum hardware, you’ll need to figure out whether your program can run on existing hardware. You can use [QDK resource estimators](xref:microsoft.quantum.machines.overview.resources-estimator) to tell you how many qubits you need and how long your program will take.
6. **Run your code on quantum hardware.** Finally, the last step is using [Azure Quantum](xref:microsoft.quantum.submit-jobs) to run your program on quantum hardware!

> [!Note]
> You use the same Q# code for all steps of the workflow. In the short term you might have to tweak some portions of the code to account for the current hardware limitations. But in the long run you’ll be able to switch between various simulators and hardware providers without any code modifications.

## Who is Azure Quantum for?

Developers will find tools to formulate and run optimization problems on large-scale or hardware-accelerated Azure compute resources, as well as for developing durable quantum applications for quantum hardware.

For businesses, Azure Quantum is the best path to leverage the latest optimization technologies from Microsoft and its partners, as you seek long term cost-saving solutions. You will get access to some of the most diverse quantum resources available today—including optimization solvers and quantum hardware—with applications for a wide range of industries. 
To learn more about quantum applications in real-life problems, see the following [case studies](https://azure.microsoft.com/resources/whitepapers/search/?term=quantum).

As a researcher, student or quantum enthusiast, you will broaden your learnings through the access to the most diverse set of quantum technologies. To learn more about research resources and career opportunities, see the [Microsoft Quantum Computing research area](https://www.microsoft.com/research/research-area/quantum-computing/?facet%5Btax%5D%5Bmsr-research-area%5D%5B0%5D=243138&sort_by=most-recent)

## Quantum cloud solutions available on Azure Quantum

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers. 

![azure quantum job flow](~/media/azure-quantum-flow-diagram-providers.png)

### Quantum computing providers

Choose the provider that best suits the characteristics of your problem and your needs. 

- [Honeywell Quantum Solutions](https://www.honeywell.com/us/en/company/quantum): Trapped-ion system with high-fidelity, fully connected qubits, and the ability to perform mid-circuit measurements.
- [IONQ](https://ionq.com/): Dynamically reconfigurable trapped-ion quantum computer for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.
- [Quantum Circuits, Inc](https://quantumcircuits.com/): Fast and high-fidelity system with powerful real-time feedback to enable error correction.

For more information, see the full [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list).

### Optimization providers

For optimization solutions, these are the available providers you can choose from:

- [1QBit](https://1qbit.com/): Iterative heuristic algorithms that uses search techniques to solve QUBO problems.
- [Microsoft QIO](xref:microsoft.quantum.optimization.providers.microsoft.qio): A set of multiple targets that rephrase the optimization problem inspired by decades of quantum research.
- [Toshiba SBM](https://www.toshiba-sol.co.jp/en/pro/sbm/index.htm): Toshiba Simulated Bifurcation Machine is a GPU-powered ISING machine that solves large-scale combinatorial optimization problems at high speed.

For more information, see the full [Optimization target list](xref:microsoft.quantum.reference.qio-target-list).

## Why use quantum computing

Quantum computing makes use of wave-like properties of quantum particles to encode information, so it can process highly complex calculations more quickly. When designed to scale, quantum computers will have capabilities that exceed today's most powerful supercomputers. 

The quantum bit, or qubit, is the basic unit of quantum information. Whereas a classical bit holds a single binary value, 0 or 1, a qubit can be in a “superposition” of both values at the same time. For instance, 4 bits are enough for a classical computer to represent any number between 0 and 15. In opposition, with 4 qubits a quantum computer can represent **every** number between 0 and 15 at the same time! 

Superposition enables quantum mechanical effects which in turn empower quantum algorithms for faster searching, better optimization, and greater security. 

### Quantum computing

Quantum mechanics is the underlying "operating system" of our universe. If you aim to simulate quantum mechanical problems, such as chemical reactions, biological reactions, or material formations, quantum computing is promising, because quantum states can be used to represent the natural states in question. 

At the same time quantum computers can aid in diverse areas such as financial services, machine learning, chemistry, biology, and materials development, where lots of calculations are needed. 

Researchers and businesses can use quantum computing to model complex scenarios in risk management, cybersecurity, network analysis, vaccine development, or materials science. 

To learn more about quantum computers and quantum algorithms see [What is quantum computing?](xref:microsoft.quantum.overview.qdk-overview).  

### Optimization

Complex optimization problems exist across every industry: vehicle routing, supply chain management, scheduling, portfolio optimization, power grid management, and many others.  Solving these real-world problems results in high-value benefits, such as reduced costs, accelerated processes, or reduced risks. 

Optimization is a class of computing problems that are primary candidates for running on quantum computers in the future, providing a quantum advantage over classical solutions. You can already implement optimization problems using Azure Quantum solvers that run on classical hardware in Azure today faster than many other classical optimization techniques.

Optimization algorithms are available to run on various classical computing silicon solutions, such as CPU, FPGA, GPU, or custom silicon. For more information about optimization problems, see [What is optimization?](xref:microsoft.quantum.optimization.concepts.overview.introduction).

### Quantum-inspired optimization

Simulating the quantum effects on classical computers has led to the development of new types of quantum solutions. **Quantum-Inspired Optimization** algorithms exploit some of the advantages of quantum computing on classical hardware, providing a speedup over traditional approaches. 

In addition, using quantum solutions on classical hardware also prepares us for the future of quantum optimization on actual quantum hardware. Once quantum computers become available at scale, even greater acceleration is possible.

Azure Quantum gives you access to a broad set of state-of-the-art quantum-inspired optimization algorithms developed by Microsoft and its partners. For more information, see [What is quantum-inspired optimization?](xref:microsoft.quantum.optimization.overview.what-is-qio). 

## Next steps

Start using Azure Quantum:
- [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
- [Get started with the Quantum Development Kit](xref:microsoft.quantum.get-started-qdk)
- [Q# user guide](xref:microsoft.quantum.user-guide-qdk.overview)
