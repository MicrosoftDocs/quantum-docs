---
author: SoniaLopezBravo
description: Introduction to resources estimation in quantum computing and the Azure Quantum Resource Estimator
ms.author: sonialopez
ms.date: 11/09/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: ['Python', '$$v']
title: Introduction to resource estimation
uid: microsoft.quantum.overview.intro-resource-estimator
--- 

# An introduction to resource estimation

In quantum computing, resource estimation is the ability to understand the resources, that is the number of qubits, number of quantum gates, processing time, etc., that will be required for a given algorithm, assuming (or taking as parameters) certain hardware characteristics. 

Estimating the running time, number of qubits and other resources needed by realistic models of quantum computers is the first necessary step to reducing these resource requirements. Understanding the number of qubits required for a quantum solution and the differences between qubit technologies allows innovators to prepare and refine their quantum solutions to run on future scaled quantum machines and ultimately accelerate their quantum impact. 

Quantum resource estimation allows you to understand the simulated resources required to run a particular algorithm. By continuously evaluating a quantum program against a common set of metrics, you can understand the improvement of your theoretical approaches.

## Why is resource estimation important in the development of quantum computing?

Quantum operations at
the physical level are noisy, and so the long computations required for practical quantum advantage necessarily require error correction to achieve fault tolerance. Quantum error correction is
both time and space intensive, requiring both increased execution time for an algorithm-level, or
so-called logical, operation and an additional number of physical qubits to store and compute information at the logical level




## The Azure Quantum Resource Estimator

In [link to paper](link to paper) define the layers of the quantum stack
at a sufficiently high-level of abstraction, so that a broad range of known and yet-to-be discovered
approaches can be readily incorporated.

The Azure Quantum Resource Estimator is an Azure Quantum target that calculates resources required for a quantum algorithm. For example, you can see the total number of physical qubits, wall clock time, the computational resources required, and the details of the formulas and values used for each estimate. These insights enable you to focus on algorithm development, with the goal of optimizing performance and decreasing cost.

You can also compare resource estimates for quantum algorithms across different hardware profiles. Start from well-known pre-defined qubit parameter settings and Quantum Error Correction (QEC) schemes or configure unique settings across a wide range of machine characteristics such as operation error rates, operation speeds, and error correction schemes and thresholds.  

:::image type="content" source="media/Resource-Estimation-component-overview.png" alt-text="Diagram showing components provided by Resource Estimator and corresponding customizations. Provided aspects are Application Input, Compilation Tools, QIR, QEC models, Qubit models, and Analysis. Customer can bring Application Program, Compilation or Optimization Tools, QIR Code, QEC models, Qubit parameters, and Analysis and Visualization Tools":::

The Azure Quantum Resource Estimator is built on community supported [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir), so it's extensible and portable. Because it takes a QIR program as input, it supports any language that translates to QIR. For example, you can use the Azure Quantum Resource Estimator with popular quantum SDKs and languages such as Q# and Qiskit.

The Azure Quantum Resource Estimator is **free of charge** and requires an Azure account.

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

## Resource estimation of practical quantum applications


o identify
architecture features which will be crucial to achieve practical quantum computing advantage. To
do so, we estimate the resources for select applications with the potential for practical quantum
advantage using qubit parameters that are relevant for prominent qubit technologies.

To achieve practical quantum advantage, quantum computers will require an underlying qubit technology that at scale is:
- Controllable: Apt quantum error correction requires reliable control of more than a million well-connected qubits, with parallel operations that fail in under one part in a thousand.
- Fast: To achieve a practical runtime of one month or less, while targeting a physical qubit count of around one million, operations will need to be performed in under a microsecond.
- Small: Scaling to a million and more qubits constrains the size of the qubit to tens of microns in diameter; this size is determined to avoid the complexity of coherent high-bandwidth quantum interconnects between qubits on different modules

### Quantum dynamics

Some of the most compelling quantum algorithms with scientific and commercial interest are those which leverage the ability of a quantum computer to efficiently simulate quantum systems, with applications across chemistry, materials science, condensed matter, and nuclear
physics. The exact simulation time of the dynamics of such quantum systems scales exponentially
with classical algorithms, but has a favorable polynomial scaling for quantum algorithms. The earliest application of scientific interest may be simulating the dynamics of around one hundred quantum spins in a quantum magnet. 

 quantum dynamics of a simple
quantum magnet, the so-called two-dimensional (2D) transverse field Ising model, where we consider a parameter regime that is on the boundary of what can be done by classical computation

You can run this sample in the notebook gallery sample in Azure portal, and in 
### Quantum chemistry

The earliest commercially relevant applications will
likely be quantum simulations of chemistry and materials science problems, where a quantum-accelerated elucidation of catalytic reaction mechanisms has applications to fertilizer production, carbon fixation, among many other problems. 



### Factoring large numbers

One algorithm with superquadratic speedup and for which the cost of error correction is well
studied is Shor’s algorithm. Estimating the resources required for Shor’s
algorithm is important for assessing the vulnerability of some of today’s public key cryptosystems
to future quantum threats. With the fastest quantum hardware operations proposed to date,
factoring a 2048-bit integer using Shor’s algorithm would require about 20 minutes with 25000 perfect, noiseless qubits. Yet in reality, qubits are noisy and must have error correction to enable long computation, and the implementation cost increases to one day with tens of millions of qubits.

