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

Azure Quantum is a Microsoft Azure service that developers, researchers, and businesses can use to run quantum computing programs or solve optimization problems in the cloud.

The Microsoft Quantum Development Kit (QDK) consists of [Q#](xref:microsoft.quantum.overview.q-sharp), Microsoft’s open-source programming language for developing your quantum algorithms. It also contains Q# libraries, APIs for Python and .NET languages, a Python SDK for optimization solvers, and quantum simulators.

Azure Quantum currently partners with the following providers to enable you to run your Q# quantum programs on real hardware, and the option to test your code on simulated quantum computers. 

- 1QBit
- Honeywell
- IonQ

For more information, see [Quantum computing targets](xref:microsoft.quantum.reference.qc-target-list) and [Optimization targets](xref:microsoft.quantum.reference.qio-target-list).

## Quantum computing

Quantum computing harnesses quantum mechanics to enable computations that can solve remarkably complex problems. Applied to areas such as financial services, machine learning, or chemistry and materials development, quantum computers can aid in development far beyond the capacity of present-day supercomputers. Researchers and businesses can model complex scenarios in risk management, cybersecurity, vaccine development, and materials science.

To learn more about quantum computers and quantum algorithms see [What is quantum computing?](xref:microsoft.quantum.overview.qdk-overview).  

## Optimization

Optimization is a class of computing problems that are primary candidates for running on quantum computers in the future, providing a quantum advantage over classical solutions. We can already accelerate optimization problems using Azure Quantum solvers that run on classical hardware in Azure today faster than many other classical optimization techniques.

Complex optimization problems exist across every industry, such as vehicle routing, supply chain management, portfolio optimization, and power grid management. Optimization algorithms are also at the core of many machine learning methods. These real-world problems are very valuable to solve and can reduce costs, accelerate processes, or reduce risk. 

Optimization algorithms are available to run on various classical computing silicon solutions, such as CPU, FPGA, GPU, or custom silicon. For more information about optimization problems, see [What is optimization?](xref:microsoft.quantum.optimization.concepts.overview.introduction).

### Quantum-inspired optimization

Azure Quantum gives you access to a broad set of state-of-the-art optimization algorithms developed by Microsoft and its partners. You can use classic optimization algorithms inspired by standard physics, or *Quantum-Inspired Optimization (QIO)*. QIO uses algorithms that are based on quantum principles for increased speed and accuracy. Azure Quantum supports QIO to help developers apply the power of new quantum techniques today without waiting for quantum hardware.

For more information, see [What is quantum-inspired optimization?](xref:microsoft.quantum.optimization.overview.what-is-qio). 