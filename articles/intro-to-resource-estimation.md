---
author: SoniaLopezBravo
description: Introduction to resources estimation in quantum computing and the Azure Quantum Resource Estimator
ms.author: sonialopez
ms.date: 11/18/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: ['Python', '$$v']
title: Introduction to resource estimation
uid: microsoft.quantum.overview.intro-resource-estimator
--- 

# An introduction to resource estimation

In quantum computing, resource estimation is the process used to determine the number of qubits, quantum gates, processing time, and other resources needed to run a quantum program assuming (or taking as parameters) specific hardware characteristics. 

The Azure Quantum Resource Estimator allows you to understand the resources required to run a particular algorithm. By incorporating the Resource Estimator in your development workflow and continuously evaluating your quantum program, you can understand how implementation changes to the program impact resource consumption. 

## Why is resource estimation important in the development of quantum computing?

Although quantum computers promise to solve important scientific and commercial problems, achieving commercial viability will require large-scale, fault-tolerant quantum computers that have both a large number of qubits in superposition and physical error rates below a certain threshold. Commercial and scientific viability will also require quantum error correction (QEC) schemes to achieve fault tolerance. QEC is both time and space intensive, requiring increased execution time for algorithm or logical-level operations, as well as additional physical qubits to store and compute information. 

Using the Resource Estimator, you can understand the impact of architectural design choices and quantum error correction schemes. The Resource Estimator will help you understand how many qubits are needed to run an application, how long it will take to run, and which qubit technologies are better suited to solving a specific problem. Understanding these requirements will allow you to prepare and refine quantum solutions to run on future, scaled quantum machines. 

## The Azure Quantum Resource Estimator

Designed specifically for post-NISQ, fault-tolerant quantum systems, the Resource Estimator allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm. The tool provides the number of physical qubits, wall clock time, and required computational resources for each program submitted, as well as details of the formulas and values used for each estimate. You can start from well-known pre-defined qubit parameter settings and Quantum Error Correction (QEC) schemes. More advanced options are also available, allowing you to configure settings across a wide range of machine characteristics such as operation error rates, operation speeds, and error correction schemes and thresholds.  

The Resource Estimator is built on community supported Quantum Intermediate Representation (QIR), so it's extensible and portable. Because it takes a QIR program as input, it supports any language that translates to QIR. For example, you can use the Resource Estimator with popular quantum SDKs and languages such as Q# and Qiskit. 

:::image type="content" source="media/Resource-Estimation-component-overview.png" alt-text="Diagram showing components provided by Resource Estimator and corresponding customizations. Provided aspects are Application Input, Compilation Tools, QIR, QEC models, Qubit models, and Analysis. Customer can bring Application Program, Compilation or Optimization Tools, QIR Code, QEC models, Qubit parameters, and Analysis and Visualization Tools":::

The Resource Estimator is **free of charge** and only requires an Azure account.

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator) or explore [using the Resource Estimator with different SDKs and IDEs](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Resource estimation of practical quantum applications

To achieve practical quantum advantage, quantum computers require an underlying qubit technology that at scale is:

- Controllable: Quantum error correction requires reliable control of more than a million well-connected qubits, with parallel operations that fail in under one part in a thousand.
- Fast: To achieve a practical runtime of one month or less, while targeting around one million physical qubits, operations need to be performed in under a microsecond.
- Small: Scaling to a million and more qubits constrains the size of the qubit to tens of microns in diameter.

The Resource Estimator has been used to analyze the required resources of three applications with potential practical quantum advantage, using qubit parameters that are relevant for prominent qubit technologies. For more information, see [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629).

### Quantum dynamics

One of the applications of quantum algorithms with scientific and commercial interest is the efficient simulation of quantum systems such as complex molecules, and chemical reactions, which often involve many-body quantum interactions. The simulation time of the dynamics of quantum systems scales exponentially with classical algorithms, but has a polynomial scaling for quantum algorithms. 

The earliest application of scientific interest may be simulating the dynamics of around one hundred quantum spins in a quantum magnet. Using the Resource Estimator, the Microsoft Quantum research team estimated the resources needed to simulate the quantum spin of a simple quantum magnet, the so-called two-dimensional transverse field Ising model.

You can find the sample of **quantum dynamics** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/blob/main/samples/azure-quantum/resource-estimation/estimation-dynamics.ipynb), or run it in the notebook gallery sample of your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 

### Quantum chemistry

Another commercially relevant application of quantum computing might be quantum simulations of chemistry and materials science problems. A mechanism to develop quantum-accelerated catalytic reactions has applications such as fertilizer production and carbon fixation, among many other problems. 

In the context of climate change and global warming , finding an efficient catalyst for carbon fixation has become a main issue. Carbon fixation is a natural process by which carbon dioxide is turned into valuable chemicals for storing energy. The most well-known example of carbon fixation is photosynthesis: conversion of carbon dioxide into glucose in plants.

The Microsoft Quantum research team developed a [new quantum algorithm to simulate catalytic processes](https://arxiv.org/abs/2007.14460). They focused on a well-known catalytic process, based on the transition metal ruthenium, to convert carbon dioxide into methanol. Using the Resource Estimator, they estimated the resources needed to analyze the activation energy of a ruthenium-based catalyst for carbon fixation.

You can find the sample of **quantum chemistry** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/estimation-chemistry.ipynb), or run it in the notebook gallery sample of your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 

### Factoring large numbers

Because many of today’s classical cryptographic schemes are based on the difficulty of factoring large numbers, estimating the resources required to run Shor’s factoring algorithm is important for assessing the vulnerability of current cryptographic schemes. Assuming the fastest quantum hardware operations proposed to date, factoring a 2048-bit integer using Shor’s algorithm would require about 20 minutes on 25,000 perfect, noiseless qubits. However, qubits are noisy and must have error correction to enable long computations. In the paper [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629), the Microsoft Quantum research team estimated the resources needed to factorize a 2048-bit number using the Resource Estimator. 

You can find the sample of **factoring large numbers** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/estimation-factoring.ipynb), or run it in the notebook gallery sample of your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 
