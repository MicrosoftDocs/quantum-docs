---
author: KittyYeungQ
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud.
ms.author: kitty
ms.date: 08/11/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
title: Introduction to Azure Quantum
uid: microsoft.quantum.azure-quantum-overview
---

# What is Azure Quantum?

Azure Quantum is a cloud service of quantum partners and technologies for running quantum computing programs or solving optimization problems. With Azure Quantum you can create your own path to scalable quantum computing, and also integrate optimization solutions running on classical Azure hardware for immediate results.

- An **open ecosystem**, enabling you to access diverse quantum software, hardware, and solutions from Microsoft and its partners.
- Quantum impact today, with pre-built solutions that run on classical and accelerated compute resources (also referred to as optimization solutions).

With Azure Quantum and the *Quantum Development Kit toolset*, you will be able to program and test your quantum algorithms and solve optimization problems, then apply those quantum solutions within the existing Azure platform to achieve real-world impacts even before the development of a general-purpose quantum computer. Microsoft and its partners ensure hardware and software innovations are brought to you with minimal to no change to your code base.


## What is Q\# and the Quantum Development Kit?

The Microsoft Quantum Development Kit (QDK) is an open-source development kit to develop quantum applications and to formulate optimization problems. The QDK includes the quantum programming language [Q#](xref:microsoft.quantum.overview.q-sharp), a high-level programming language that allows you to focus your work at the algorithm and application level to create quantum programs.

The QDK offers a set of tools that will assist you in the quantum software development process: 

- **Ready-to-use libraries** to help you keep your code high-level, including both “standard” libraries that implement patterns common for a lot of quantum algorithms, and domain-specific libraries, such as chemistry and machine learning. 
- **Quantum computing simulators**, so that you can run a small instance of your program and see what it does without actual hardware access. 
- A **resource estimator** that provides real world costs to run your solutions, for example, how many qubits you need and how long your program will take.

The Quantum Development Kit is the development kit for Q#, a quantum-focused programming language and Azure Quantum is the quantum cloud platform. Build and run Q# programs on quantum hardware or formulate solutions that execute optimization solvers running on classical hardware on Azure.

### Tools for developers

The Quantum Development Kit includes extensions for [Visual Studio](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit) and [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode), and integration with [Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview.jupyter). 
 
You can use Q# as standalone, in notebooks, and at the command-line or use a host language, the QDK supports interoperability with [Python](xref:microsoft.quantum.install-qdk.overview.python) and [.NET languages](microsoft.quantum.install-qdk.overview.cs). You can also formulate optimization solutions with the Azure Quantum optimization Python package. As quantum systems evolve, your code endures.

## Who is Azure Quantum for?

Developers will find tools to formulate and run optimization problems on large-scale or hardware-accelerated Azure compute resources, as well as for developing durable quantum applications for quantum hardware.

For businesses, Azure Quantum is the best path to leverage the latest optimization technologies from Microsoft and its partners, as you seek long term cost-saving solutions. You will get access to some of the most diverse quantum resources available today—including optimization solvers and quantum hardware—with applications for a wide range of industries. 
To learn more about quantum applications in real-life problems, see the following [case studies](https://azure.microsoft.com/resources/whitepapers/search/?term=quantum).

As a researcher, student or quantum enthusiast, you will broaden your learnings through the access to the most diverse set of quantum technologies. To learn more about research resources and career opportunities, see the [Microsoft Quantum Computing research area](https://www.microsoft.com/research/research-area/quantum-computing/?facet%5Btax%5D%5Bmsr-research-area%5D%5B0%5D=243138&sort_by=most-recent)

## Quantum cloud solutions available on Azure Quantum

Azure Quantum offers some of the most compelling and diverse quantum resources available today from industry leaders. Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers. 

![azure quantum job flow](~/media/azure-quantum-flow-diagram.png)

Choose the provider that best suits the characteristics of your problem and your needs. 

### Quantum computing providers

- [Honeywell Quantum Solutions](https://www.honeywell.com/ecompany/quantum): Trapped-ion system with high-fidelity, fully connected qubits, and the ability to perform mid-circuit measurements.
- [IONQ](https://ionq.com/): Dynamically reconfigurable trapped-ion quantum computer for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.
- {Quantum Circuits, Inc](https://quantumcircuits.com/): Fast and high-fidelity system with powerful real-time feedback to enable error correction.

For more information, see the full [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list).

### Optimization providers

- [1QBit](https://1qbit.com/): Iterative heuristic algorithms that usessearch techniques to solve QUBO problems.
- [Microsoft QIO](xref:microsoft.quantum.optimization.providers.microsoft.qio): A set of multiple targets that rephrase the optimization problem inspired by decades of quantum research.
- [Toshiba SBM](https://www.toshiba-sol.co.jp/en/pro/sbm/index.htm): Toshiba Simulated Bifurcation Machine is a GPU-powered ISING machine that solves large-scale combinatorial optimization problems at high speed.

For more information, see the full [Optimization target list](xref:microsoft.quantum.reference.qio-target-list).

## The power of quantum

Quantum computing makes use of wave-like properties of nature to encode information in qubits that can process highly complex calculations more quickly. When designed to scale, quantum systems will have capabilities that exceed our most powerful supercomputers. As the global community of quantum researchers, scientists, engineers, and business leaders continue to collaborate to advance the quantum ecosystem, we expect to see quantum impact accelerate across every industry.

The quantum bit, or qubit, is the basic unit of quantum information. Whereas a classical bit holds a single binary value, 0 or 1, a qubit can be in a “superposition” of both values at the same time. This enables quantum mechanical effects such as interference, tunneling, and entanglement, which in turn empower quantum algorithms for faster searching, better optimization, and greater security. When multiple qubits are connected, these properties can deliver significantly more processing power than the same number of classical bits. For instance, 4 bits are enough for a classical computer to represent any number between 0 and 15. In opposition, with 4 qubits a quantum computer can represent **every** number between 0 and 15 at the same time!

### Quantum computing

Quantum mechanics is the underlying "operating system" of our universe. It describes how the fundamental building blocks of nature behave. Nature's behaviors, such as chemical reactions, biological reactions, and material formations, often involve many-body quantum interactions. Classical computing, which uses binary states, is increasingly challenged as the size of the system grows. For intrinsically simulating quantum mechanical problems, quantum computing is promising, because quantum states can be used to represent the natural states in question. 

Quantum computing harnesses quantum mechanics to enable computations that can solve remarkably complex problems. Applied to areas such as financial services, machine learning, chemistry, biology, and materials development, quantum computers can aid in development far beyond the capacity of present-day supercomputers. Researchers and businesses can model complex scenarios in risk management, cybersecurity, network analysis, vaccine development, and materials science. When quantum systems are designed to scale, they'll have capabilities that exceed our most powerful supercomputers. 

To learn more about quantum computers and quantum algorithms see [What is quantum computing?](xref:microsoft.quantum.overview.qdk-overview).  

### Optimization

Complex optimization problems exist across every industry: vehicle routing, supply chain management, scheduling, portfolio optimization, power grid management, and many others. Optimization algorithms are also at the core of many machine learning methods. Solving these real-world problems results in high-value benefits, such as reduced costs, accelerated processes, or reduced risks. Many real-world optimization problems are still unsolvable by classical computing, despite the advancement in both algorithms and computing power over the past decades.

Optimization is a class of computing problems that are primary candidates for running on quantum computers in the future, providing a quantum advantage over classical solutions. We can already accelerate optimization problems using Azure Quantum solvers that run on classical hardware in Azure today faster than many other classical optimization techniques.

Optimization algorithms are available to run on various classical computing silicon solutions, such as CPU, FPGA, GPU, or custom silicon. For more information about optimization problems, see [What is optimization?](xref:microsoft.quantum.optimization.concepts.overview.introduction).

### Quantum-inspired optimization
Emulating the quantum effects on classical computers has led to the development of new types of quantum solutions that run on classical hardware, also called *Quantum-Inspired Optimization (QIO)* algorithms. These algorithms allow us to exploit some of the advantages of quantum computing approaches today on classical hardware, providing a speedup over traditional approaches. Using quantum solutions on classical hardware also prepares us for the future of quantum optimization on actual quantum hardware. Once quantum computers become available at scale, even greater acceleration is possible.

Quantum-inspired solutions harness the power of quantum physics to solve hard computational problems on classical hardware, today. Azure Quantum gives you access to a broad set of state-of-the-art optimization algorithms developed by Microsoft and its partners. Azure Quantum supports QIO to help developers apply the power of new quantum techniques today without waiting for quantum hardware.

For more information, see [What is quantum-inspired optimization?](xref:microsoft.quantum.optimization.overview.what-is-qio). 

## Next steps

Start using Azure Quantum:
- [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
- [Get started with the Quantum Development Kit](xref:microsoft.quantum.get-started-qdk)
- [Q# user guide](xref:microsoft.quantum.user-guide-qdk.overview)
