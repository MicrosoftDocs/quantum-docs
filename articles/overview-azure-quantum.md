---
author: KittyYeungQ
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud.
ms.author: kitty
ms.date: 07/21/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
title: Introduction to Azure Quantum
uid: microsoft.quantum.azure-quantum-overview
---

# What is Azure Quantum?

Azure Quantum is a Microsoft Azure service that developers, researchers, and businesses can use to run quantum computing programs or solve optimization problems in the cloud. It is an open ecosystem of quantum partners and technologies; a complete solution that gives you the freedom to create your own path to scalable quantum computing, and also a way to integrate optimization solutions running on classical Azure hardware for immediate results.

The Microsoft Quantum Development Kit (QDK) is an open-source development kit to develop quantum applications and solve optimization problems. It includes the high-level quantum programming language [Q#](xref:microsoft.quantum.overview.q-sharp), a set of libraries, simulators, support for Q# in environments like Visual Studio Code and Jupyter Notebooks, and interoperability with Python and .NET languages, a Python SDK for optimization solvers, and quantum simulators. As quantum systems evolve, your code endures.

Working together with the Quantum Development Kit toolset and Azure Quantum services, you will be able to program and test your [quantum algorithms](https://wikipedia.org/wiki/Shor%27s_algorithm) and solve optimization problems, then apply those quantum solutions within the existing Azure platform to achieve real-world impacts even before the development of a general-purpose quantum computer.

Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers. 

- 1QBit
- Honeywell
- IonQ

For more information, see [Quantum computing targets](xref:microsoft.quantum.reference.qc-target-list) and [Optimization targets](xref:microsoft.quantum.reference.qio-target-list).
## The power of quantum

Quantum computing makes use of wave-like properties of nature to encode information in qubits that can process highly complex calculations more quickly. When designed to scale, quantum systems will have capabilities that exceed our most powerful supercomputers. As the global community of quantum researchers, scientists, engineers, and business leaders continue to collaborate to advance the quantum ecosystem, we expect to see quantum impact accelerate across every industry.

The quantum bit, or qubit, is the basic unit of quantum information. Whereas a classical bit holds a single binary value, 0 or 1, a qubit can be in a “superposition” of both values at the same time. This enables quantum mechanical effects such as interference, tunneling, and entanglement, which in turn empower quantum algorithms for faster searching, better optimization, and greater security. When multiple qubits are connected, these properties can deliver significantly more processing power than the same number of classical bits. For instance, 4 bits are enough for a classical computer to represent any number between 0 and 15. In opposition, with 4 qubits a quantum computer can represent **every** number between 0 and 15 at the same time!

To learn more about the power of quantum and its applications in real-life problems, see the following [case studies](https://azure.microsoft.com/resources/whitepapers/search/?term=quantum).

## Quantum computing

Quantum mechanics is the underlying "operating system" of our universe. It describes how the fundamental building blocks of nature behave. Nature's behaviors, such as chemical reactions, biological reactions, and material formations, often involve many-body quantum interactions. Classical computing, which uses binary states, is increasingly challenged as the size of the system grows. For intrinsically simulating quantum mechanical problems, quantum computing is promising, because quantum states can be used to represent the natural states in question. 

Quantum computing harnesses quantum mechanics to enable computations that can solve remarkably complex problems. Applied to areas such as financial services, machine learning, chemistry, biology, and materials development, quantum computers can aid in development far beyond the capacity of present-day supercomputers. Researchers and businesses can model complex scenarios in risk management, cybersecurity, network analysis, vaccine development, and materials science. When quantum systems are designed to scale, they'll have capabilities that exceed our most powerful supercomputers. 

To learn more about quantum computers and quantum algorithms see [What is quantum computing?](xref:microsoft.quantum.overview.qdk-overview).  

## Optimization

Complex optimization problems exist across every industry: vehicle routing, supply chain management, scheduling, portfolio optimization, power grid management, and many others. Optimization algorithms are also at the core of many machine learning methods. Solving these real-world problems results in high-value benefits, such as reduced costs, accelerated processes, or reduced risks. Many real-world optimization problems are still unsolvable by classical computing, despite the advancement in both algorithms and computing power over the past decades.

Optimization is a class of computing problems that are primary candidates for running on quantum computers in the future, providing a quantum advantage over classical solutions. We can already accelerate optimization problems using Azure Quantum solvers that run on classical hardware in Azure today faster than many other classical optimization techniques.

Optimization algorithms are available to run on various classical computing silicon solutions, such as CPU, FPGA, GPU, or custom silicon. For more information about optimization problems, see [What is optimization?](xref:microsoft.quantum.optimization.concepts.overview.introduction).

### Quantum-inspired optimization
Emulating the quantum effects on classical computers has led to the development of new types of quantum solutions that run on classical hardware, also called *Quantum-Inspired Optimization (QIO)* algorithms. These algorithms allow us to exploit some of the advantages of quantum computing approaches today on classical hardware, providing a speedup over traditional approaches. Using quantum solutions on classical hardware also prepares us for the future of quantum optimization on actual quantum hardware. Once quantum computers become available at scale, even greater acceleration is possible.

Quantum-inspired solutions harness the power of quantum physics to solve hard computational problems on classical hardware, today. Azure Quantum gives you access to a broad set of state-of-the-art optimization algorithms developed by Microsoft and its partners. Azure Quantum supports QIO to help developers apply the power of new quantum techniques today without waiting for quantum hardware.

For more information, see [What is quantum-inspired optimization?](xref:microsoft.quantum.optimization.overview.what-is-qio). 
