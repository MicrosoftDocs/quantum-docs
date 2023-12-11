---
author: SoniaLopezBravo
description: Introduction to resources estimation in quantum computing and the Azure Quantum Resource Estimator
ms.author: sonialopez
ms.date: 12/11/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: ['Python', '$$v', Quantum Intermediate Representation, target, targets]
title: Introduction to the Resource Estimation
uid: microsoft.quantum.overview.intro-resource-estimator
--- 

# Introduction to the Azure Quantum Resource Estimator

In quantum computing, resource estimation is the process used to determine the number of qubits, quantum gates, processing time, and other resources needed to run a quantum program assuming (or taking as parameters) specific hardware characteristics.

The Azure Quantum Resource Estimator allows you to understand the resources required to run a particular algorithm. By incorporating the Resource Estimator in your development workflow and continuously evaluating your quantum program, you can understand how implementation changes to the program impact resource consumption.

## What is the Azure Quantum Resource Estimator?

Designed specifically for post-NISQ, fault-tolerant quantum systems, the Azure Quantum Resource Estimator allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm.

The Azure Quantum Resource Estimator provides the number of physical qubits, wall clock time, and required computational resources for each program submitted, as well as details of the formulas and values used for each estimate.

The Resource Estimator is built on community supported Quantum Intermediate Representation (QIR), so it's extensible and portable. It supports any language that translates to QIR for example, Q# and Qiskit.

:::image type="content" source="media/Resource-Estimation-component-overview.png" alt-text="Diagram showing components provided by Resource Estimator and corresponding customizations. Provided aspects are Application Input, Compilation Tools, QIR, QEC models, Qubit models, and Analysis. Customer can bring Application Program, Compilation or Optimization Tools, QIR Code, QEC models, Qubit parameters, and Analysis and Visualization Tools.":::

## What features makes the Resource Estimator unique?

The Resource Estimator is a powerful tool that involves different levels of computation. The following diagram shows the levels of the quantum computing stack of the Resource Estimator.

// This image is a draft. The final image will be provided by the art team.

:::image type="content" source="media/resource-estimator-computing-stack.png" alt-text="Chart showing the levels of the quantum computing stack of the Resource Estimator. .":::

### Customizable

The Resource Estimator takes a set of target parameters and returns the resources needed to run a quantum program. The target parameters are the characteristics of the quantum computer that you want to use to run your program. The target parameters are:

- A physical qubit model, which are the properties of the underlying physical qubits.
- A Quantum Error Correction (QEC) scheme, which is the assumed quantum error correction scheme.
- An error budget, which is the overall allowed error, that is, the number of times the program is allowed to unsuccess.
- Constraints on the component level.
- Distillation units, to specify the algorithms for T factories distillation.

You can use the predefined target parameters or customize them to your needs. The advanced options allow you to configure settings across a wide range of machine characteristics such as operation error rates, operation speeds, and error correction schemes and thresholds. For more information about the target parameters, see [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator).

### Profiling

Quantum programs are complex and sometimes you want to understand how the different parts of the program contribute to the overall resource estimates. The profiling feature allows you to analyze how subroutine operations in the program impact the overall resources. 

For more information, see how to [Use profiling to analyze the structure of your program](xref:microsoft.quantum.work-with-resource-estimator##use-profiling-to-analyze-the-structure-of-your-program) and explore this tutorial [Estimate the resources of a quantum adder using the profiling feature](xref:microsoft.quantum.tutorial.resource-estimator.profiling).

### Batching

Sometimes you want to estimate the resources needed to run the same quantum algorithm for different combinations of input parameters, and compare the results. In this way you can understand how the qubit architecture, QEC scheme, and the rest of the target parameters impact the overall resources.
 
The Resource Estimator allows you to run multiple resource estimation configurations as a single job and avoid long running times. For more information, see how to [Run multiple configurations as a single job](xref:microsoft.quantum.work-with-resource-estimator#how-to-run-multiple-configurations-as-a-single-job). 

### Visualization of resources

The Resource Estimator provides a visualization of the results, allowing you to compare the resources needed to run different algorithms on different qubit technologies.

The [space-time diagrams](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagrams) show the total number of qubits and the total runtime of the program, and the contribution of the T factories. 

## Why is resource estimation important in the development of quantum computing?

Although quantum computers promise to solve important scientific and commercial problems, achieving commercial viability will require large-scale, fault-tolerant quantum computers that have both a large number of qubits in superposition and physical error rates below a certain threshold. Commercial and scientific viability will also require quantum error correction (QEC) schemes to achieve fault tolerance. QEC is both time and space intensive, requiring increased execution time for algorithm or logical-level operations, as well as additional physical qubits to store and compute information. 

Using the Resource Estimator, you can understand the impact of architectural design choices and quantum error correction schemes. The Resource Estimator will help you understand how many qubits are needed to run an application, how long it will take to run, and which qubit technologies are better suited to solving a specific problem. Understanding these requirements will allow you to prepare and refine quantum solutions to run on future, scaled quantum machines. 

## How to start with the Resource Estimator

The Azure Quantum Resource Estimator is **free of charge** and is available to all Azure Quantum users. To use the Resource Estimator, you only need an Azure Quantum workspace. See how to [Enable the Resource Estimator in you Azure Quantum workspace](xref:microsoft.quantum.quickstarts.computing.resources-estimator#enable-the-azure-quantum-resource-estimator-target-in-your-workspace).

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator) or explore [using the Resource Estimator with different SDKs and IDEs](xref:microsoft.quantum.submit-resource-estimation-jobs).

## How to use the Resource Estimator

To use the Resource Estimator you need a QIR quantum program, for example a program written in Q#, Qiskit, or a QIR generator as PyQIR. Then, you specify the target parameters that define the characteristics of the quantum computer that you want to use to run your program. You can either use the predifined target parameters or customize them to your needs.

You submit your program and the target parameters to the Resource Estimator, and it returns the resources needed to run your program in the form of a report data. For more information, see [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data). 

To learn how to harness the power of the Resource Estimator, see [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator).

If you are interested in the workflow of the Resource Estimator and how the output data is extracted, see [How the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works).

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator).

## Resource estimation for quantum-safe planning

With the Azure Quantum Resource Estimator, you can estimate the resources needed for a future scaled quantum computer to break a particular encryption algorithm..

The Azure Quantum Resource Estimator is available in [Azure Quantum website (quantum.microsoft.com)](https://quantum.microsoft.com/experience/quantum-cryptography) to analyze the impact of quantum computing on classical cryptography. You only need a Microsoft account to access the experience.

The Resource Estimator in [quantum.microsoft.com](https://quantum.microsoft.com/experience/quantum-cryptography) takes a set of four target parameters: a classical encryption algorithm, a key strength, a qubit type, and a qubit error rate. The results are displayed in a plot that shows the number of qubits and the runtime that a quantum computer with the selected architecture would need to break the encryption algorithm.

1. Click on the **arrows** to switch between different selections of preset input parameters. See that the fields are populated for you.
1. Click **Ask Copilot**  if you want to know more about the resource estimation data.
1. Click **Download** to download the plot of the resource estimation job.
1. You can also **customize the parameters** of the encryption algorithm. You need to select *at least* one option for each input parameter. You can select multiple combinations of parameters and compare their security against quantum computers.
1. **Hover over** the points of the plot to see more information about the resource estimates.
1. At any point, you can **ask Copilot a question** about cryptography, resource estimation, or quantum computing.

    :::image type="content" source="media/quantum-cryptography-qcom.png" alt-text="Screenshot of the quantum cryptography experience in Azure Quantum website. The picture displays the input parameters that constitute the encryption algorithm and the resulting plot of the resource estimation job.":::

## Resource estimation of practical quantum applications

The Resource Estimator has been used to analyze the required resources of three applications with potential practical quantum advantage, using qubit parameters that are relevant for prominent qubit technologies. For more information, see [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629).

### Quantum dynamics

One of the applications of quantum algorithms with scientific and commercial interest is the efficient simulation of quantum systems such as complex molecules, and chemical reactions, which often involve many-body quantum interactions. The simulation time of the dynamics of quantum systems scales exponentially with classical algorithms, but has a polynomial scaling for quantum algorithms.

The earliest application of scientific interest may be simulating the dynamics of around one hundred quantum spins in a quantum magnet. Using the Resource Estimator, the Microsoft Quantum research team estimated the resources needed to simulate the quantum spin of a simple quantum magnet, the so-called two-dimensional transverse field Ising model.

You can find the sample of **quantum dynamics** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/blob/main/samples/azure-quantum/resource-estimation/estimation-dynamics.ipynb).

### Quantum chemistry

If we gain the ability to accurately simulate complex, correlated quantum mechanical systems, we could unlock breakthroughs in areas as diverse as carbon capture, food insecurity and designing better fuels and materials to enable a greener future.

For example, in the context of climate change and global warming , finding an efficient catalyst for carbon fixation has become a main issue. Carbon fixation is a natural process by which carbon dioxide is turned into valuable chemicals for storing energy. The most well-known example of carbon fixation is photosynthesis: conversion of carbon dioxide into glucose in plants.

The Microsoft Quantum research team developed a [new quantum algorithm to simulate catalytic processes](https://arxiv.org/abs/2007.14460). They focused on a well-known catalytic process, based on the transition metal ruthenium, to convert carbon dioxide into methanol. Using the Resource Estimator, they estimated the resources needed to analyze the activation energy of a ruthenium-based catalyst for carbon fixation.

You can find a sample of **quantum chemistry** in the tutorial [Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry), or run the sample in the notebook gallery sample of your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). This sample represents the first step in the quantum chemistry journey, allowing us to understand in more detail what computational resources would be required to simulate certain quantum mechanical systems.

### Factoring large numbers

Because many of today’s classical cryptographic schemes are based on the difficulty of factoring large numbers, estimating the resources required to run Shor’s factoring algorithm is important for assessing the vulnerability of current cryptographic schemes. Assuming the fastest quantum hardware operations proposed to date, factoring a 2048-bit integer using Shor’s algorithm would require about 20 minutes on 25,000 perfect, noiseless qubits. However, qubits are noisy and must have error correction to enable long computations. In the paper [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629), the Microsoft Quantum research team estimated the resources needed to factorize a 2048-bit number using the Resource Estimator.

You can find the sample of **factoring large numbers** in the [Resource estimation sample notebooks](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/estimation-factoring.ipynb).
