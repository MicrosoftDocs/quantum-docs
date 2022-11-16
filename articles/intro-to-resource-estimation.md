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

Quantum resource estimation allows you to understand the simulated resources required to run a particular algorithm. By continuously evaluating a quantum program against a common set of metrics, you can understand the improvement of your theoretical approaches.

## Why is resource estimation important in the development of quantum computing?

Quantum computers promise to solve some scientifically and commercially valuable problems, and accomplishing this will require a large-scale, fault-tolerant quantum computer. 
That is, a quantum computer capable of allowing a large number of qubits, in superposition, and with a physical error rate below a certain threshold such that through the application of quantum error correction (QEC) schemes, protect quantum information from errors due to decoherence and other quantum noise .

Quantum operations at the physical level are noisy, and so the long computations required for practical quantum advantage necessarily require error correction to achieve fault tolerance. Quantum error correction is both time and space intensive, requiring increased execution time for an algorithm-level, operation and an additional number of physical qubits to store and compute information at the logical level. 

Understanding the impact of architecture design choices and quantum error correction schemes for a scaled quantum stack for specific applications, prior to full realization of the quantum system, is an important open challenge. Many questions arise. For example, how large does a quantum computer need to be to achieve practical quantum advantage? How long will the computation take? Are some qubit technologies better suited than others for solving such problems? What are the best architecture choices across the hardware and software stacks to enable scaled quantum computation?

Estimating the running time, number of qubits and other resources needed by realistic models of quantum computers is the first necessary step to reducing these resource requirements. Understanding the number of qubits required for a quantum solution and the differences between qubit technologies allows innovators to prepare and refine their quantum solutions to run on future scaled quantum machines and ultimately accelerate their quantum impact. 

## The Azure Quantum Resource Estimator

Azure Quantum offers a resource estimation tool that computes and outputs the resources required for a quantum algorithm, assuming it is executed on a fault-tolerant error-corrected quantum computer. You can see the total number of physical qubits, wall clock time, the computational resources required, and the details of the formulas and values used for each estimate. These insights enable you to focus on algorithm development, with the goal of optimizing performance and decreasing cost.

Designed specifically for post-NISQ, fault-tolerant quantum systems, the Azure Quantum Resource Estimator allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm. You can start from well-known pre-defined qubit parameter settings and Quantum Error Correction (QEC) schemes or configure unique settings across a wide range of machine characteristics such as operation error rates, operation speeds, and error correction schemes and thresholds.  

The Azure Quantum Resource Estimator is built on community supported [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir), so it's extensible and portable. Because it takes a QIR program as input, it supports any language that translates to QIR. For example, you can use the Azure Quantum Resource Estimator with popular quantum SDKs and languages such as Q# and Qiskit.

:::image type="content" source="media/Resource-Estimation-component-overview.png" alt-text="Diagram showing components provided by Resource Estimator and corresponding customizations. Provided aspects are Application Input, Compilation Tools, QIR, QEC models, Qubit models, and Analysis. Customer can bring Application Program, Compilation or Optimization Tools, QIR Code, QEC models, Qubit parameters, and Analysis and Visualization Tools":::

The Azure Quantum Resource Estimator is **free of charge** and requires an Azure account.

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

## Resource estimation of practical quantum applications

In [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629), Microsoft Quantum research team reveals that to achieve practical quantum advantage, quantum computers require an underlying qubit technology that at scale is:

- Controllable: Quantum error correction requires reliable control of more than a million well-connected qubits, with parallel operations that fail in under one part in a thousand.
- Fast: To achieve a practical runtime of one month or less, while targeting around one million of physical qubits, operations need to be performed in under a microsecond.
- Small: Scaling to a million and more qubits constrains the size of the qubit to tens of microns in diameter.

Microsoft Quantum research team implement the Azure Quantum Resource Estimator to analyze the required resources of three applications with potential for practical quantum advantage, using qubit parameters that are relevant for prominent qubit technologies. 

### Quantum dynamics

One of the applications of quantum algorithms with scientific and commercial interest is the efficient simulation of quantum systems such as complex molecules, and chemical reactions, which often involve many-body quantum interactions. The simulation time of the dynamics of quantum systems scales exponentially with classical algorithms, but has a polynomial scaling for quantum algorithms. 

The earliest application of scientific interest may be simulating the dynamics of around one hundred quantum spins in a quantum magnet. Using the Azure Quantum Resource Estimator, Microsoft Quantum research team estimate the resources needed to simulate the quantum spin of a simple quantum magnet, the so-called two-dimensional transverse field Ising model.

You can find the sample of **quantum dynamics** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/blob/main/samples/azure-quantum/resource-estimation/estimation-dynamics.ipynb), or run it in the notebook gallery sample of your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 

### Quantum chemistry

Another commercially relevant applications of quantum computing might be quantum simulations of chemistry and materials science problems. A mechanism to develop quantum-accelerated catalytic reactions has applications such as fertilizer production and carbon fixation, among many other problems. 

In the context of climate change and global warming , finding an efficient catalyst for carbon fixation has become a main issue. Carbon fixation is a natural process by which carbon dioxide is turned into valuable chemicals for storing energy. The most well-known example of carbon fixation is photosynthesis: conversion of carbon dioxide into glucose in plants.

Microsoft Quantum research team develop a [new quantum algorithm to simulate catalytic processes](https://arxiv.org/abs/2007.14460). They focused on a well-known catalytic process, based on the transition metal ruthenium, to convert carbon dioxide into methanol. Using the Azure Quantum Resource Estimator, they estimated the resources needed to analyze the activation energy of a ruthenium-based catalyst for carbon fixation.

You can find the sample of **quantum chemistry** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/estimation-chemistry.ipynb), or run it in the notebook gallery sample of your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 

### Factoring large numbers

One quantum algorithm with superquadratic speedup and for which the cost of error correction is well studied is Shor’s factoring algorithm. Estimating the resources required for Shor’s algorithm is important for assessing the vulnerability of some of today’s classical cryptographic schemes that are based on assumptions of the difficulty of factoring large numbers.

With the fastest quantum hardware operations proposed to date, factoring a 2048-bit integer using Shor’s algorithm would require about 20 minutes with 25000 perfect, noiseless qubits. However, qubits are noisy and must have error correction to enable long computation. In the paper [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629), Microsoft Quantum research team estimate the resources needed to factorize a 2048-bit number using the Azure Quantum Resource Estimator. 

You can find the sample of **factoring large numbers** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/estimation-factoring.ipynb), or run it in the notebook gallery sample of your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 
