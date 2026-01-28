---
author: azure-quantum-content
description: Learn about the resource estimator, an open-source tool that allows you to estimate the resources needed to run a quantum program on a quantum computer.
ms.author: quantumdocwriters
ms.date: 07/01/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: ['Python', '$$v', Quantum Intermediate Representation, target, targets]
title: Introduction to the resource estimator
uid: microsoft.quantum.overview.intro-resource-estimator
#customer intent: As a quantum programmer, I want to learn about resource estimation with Microsoft Quantum.
--- 

# What is the Microsoft Quantum resource estimator?

The Microsoft Quantum resource estimator is an [open-source](https://aka.ms/AQ/RE/OpenSource) tool that allows you to estimate the resources needed to run a  quantum program on a fault-tolerant quantum computer.

The resource estimator calculates the total number of physical and logical qubits, the runtime, and details of the formulas and values used for each estimate. With the Microsoft Quantum resource estimator, you can compare qubit technologies, quantum error correction schemes, and other hardware characteristics to understand how they impact the resources needed to run a quantum program.

> [!TIP]
> The Microsoft Quantum resource estimator is free of charge and doesn't require an Azure account.

## What features make the resource estimator unique?

The resource estimator is a powerful tool that involves all levels of the quantum computing stack. The quantum computing stack can be divided into three levels: the application level, the quantum programming or compilation level, and the hardware or modeling level.

The resource estimator allows you to customize the parameters of each level and analyze how they impact the overall resources needed to run a quantum program.

:::image type="content" source="media/resource-estimator-stack-computing.png" alt-text="Diagram showing the levels of the quantum computing stack of the resource estimator.":::

### Customization

The resource estimator has an extensibility API to model any quantum architecture and to modify all assumptions. You can adapt the resource estimator and specify the characteristics of your quantum system.

You can use pre-defined qubit parameters and quantum error correction (QEC) schemes or configure unique settings across a wide range of machine characteristics. For more information, see [Customize the target parameters of the resource estimator](xref:microsoft.quantum.overview.resources-estimator).

| Target parameters                                                                                                       | Describe your system |
|-------------------------------------------------------------------------------------------------------------------------|----------------------|
| [Physical qubit model](xref:microsoft.quantum.overview.resources-estimator#Physical-qubit-parameters)                   | For example, specify the instruction set, the qubit measurement time, error rates, or gate times. |
| [Quantum error correction scheme](xref:microsoft.quantum.overview.resources-estimator#quantum-error-correction-schemes) | For example, specify the number of physical qubits per logical qubit, the logical cycle time, or the error correction threshold. |
| [Error budget](xref:microsoft.quantum.overview.resources-estimator#error-budget)                                        | For example, specify the error budget to implement logical qubits, T states distillation, and synthesis of the rotation gates. |
| [Distillation units](xref:microsoft.quantum.overview.resources-estimator#distillation-units) | For example, specify the number of T states required for the distillation process, number of T states produced as output from the distillation process, or the probability of failure of the distillation process. |
| [Constraints](xref:microsoft.quantum.overview.resources-estimator#constraints)                                          | For example, specify the maximum number of physical qubits, the maximum runtime, or the maximum number of [T factory copies](xref:microsoft.quantum.concepts.tfactories). |

> [!NOTE]
> With the resource estimator, you can model any quantum architecture. For example, the startup [Alice & Bob's](https://alice-bob.com/) uses the resource estimator to evaluate their architecture, which uses cat qubits and repetition error correction code. For more information, see this [post in the Q# blog](https://devblogs.microsoft.com/qsharp/evaluating-cat-qubits-for-fault-tolerant-quantum-computing-using-azure-quantum-resource-estimator/).

### Flexibility

You can bring your own code and compilation tools to the resource estimator. The resource estimator supports Q# and Qiskit as input. See [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

### Batch multiple estimates

The resource estimator allows you to estimate the resources needed to run the same quantum algorithm for [different configurations of target parameters](xref:microsoft.quantum.resource-estimator-batching), and compare the results. In this way you can understand how the qubit architecture, QEC scheme, and the rest of the target parameters impact the overall resources.

### Optimization

You can reduce the execution time of the resource estimator by incorporating some estimates in the overall cost. For example, if you're working with a large program, you can compute and [cache the cost of subroutines](xref:microsoft.quantum.resource-estimator-caching), or if you already [know estimates for an operation](xref:microsoft.quantum.resource-estimator-known-estimates) you can pass them to the resource estimator.

### Visualization of resources

You can visualize the tradeoffs between the number of physical qubits and the runtime of the algorithm using the [space-time diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagram), which allows you to find the optimal combination of {number of qubits, runtime} pairs.

You can also inspect the distribution of physical qubits used for the algorithm and the [T factories](xref:microsoft.quantum.concepts.tfactories) using the [space diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-diagram).

## Get started with the resource estimator

The resource estimator is part of the Quantum Development Kit (QDK) and doesn't require an Azure account. To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

The following table shows different user scenarios and the recommended articles to start with the resource estimator.

| User scenario                                         | You want to |
|-------------------------------------------------------|-------------|
| I'm developing QEC codes                              | You can use the resource estimator to customize your QEC codes and compare different combinations of parameters. See [How to customize your QEC schemes](xref:microsoft.quantum.overview.resources-estimator#customize-predefined-qec-schemes). |
| I'm developing quantum algorithms                     | By analyzing the impact of different configurations of hardware and software profiles on the resource requirements, you can gain insights into how your quantum algorithm might perform under different hardware and error conditions. This information can help you optimize your algorithm for specific quantum hardware or error rates. See [Running multiple configurations of target parameters](xref:microsoft.quantum.resource-estimator-batching). |
| I want to improve the performance of quantum programs | To learn how to harness the power of the resource estimator, see [Running large programs](xref:microsoft.quantum.resource-estimator-caching) and [Using known estimates](xref:microsoft.quantum.resource-estimator-known-estimates). |
| I'm interested in large-scale quantum computing       | You can use the resource estimator to analyze the resources of real-world problems that are expected to be solved by large-scale fault-tolerant quantum computers. See how in [Resource estimation for large-scale quantum computing](#resource-estimation-for-large-scale-quantum-computing). |
| I'm developing quantum-safe cryptography              | You can use the resource estimator to compare the performance of different encryption algorithms, key strengths, qubit types, and error rates, and their resilience to quantum attacks. See [Resource estimation and cryptography](xref:microsoft.quantum.resource-estimator-cryptography). |

## Resource estimation for large-scale quantum computing

If you want to develop quantum algorithms for large-scale quantum computers, check out the [Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry) tutorial.

This tutorial represents a first step to integrate resource estimation of quantum solutions to electronic structure problems. One of the most important applications of scaled quantum computers is solving quantum chemistry problems. The simulation of complex quantum mechanical systems has the potential to unlock breakthroughs in areas such as carbon capture, food insecurity, and designing better fuels and materials.  

For example, one of the Hamiltonians used in this tutorial, the *nitrogenase_54orbital*, describes the nitrogenase enzyme. If you could accurately simulate how this enzyme works at a quantum level, it could help us to understand how to produce it at scale. You could replace the highly energy-intensive process which is used to produce enough fertilizer to feed the planet. This has the potential to reduce the global carbon footprint and also to help address concerns regarding food insecurity in a growing population.

## Why is resource estimation important in the development of quantum computing?

Although quantum computers promise to solve important scientific and commercial problems, achieving commercial viability will require large-scale, fault-tolerant quantum computers that have both a large number of qubits in superposition and physical error rates below a certain threshold. Commercial and scientific viability will also require QEC schemes to achieve fault tolerance. QEC is both time and space intensive, requiring increased execution time for algorithm or logical-level operations, as well as additional physical qubits to store and compute information.

With the resource estimator, you can understand the impact of architectural design choices and quantum error correction schemes. The resource estimator helps you understand how many qubits are needed to run an application, how long it will take to run, and which qubit technologies are better suited to solving a specific problem. When you understand these requirements, you can prepare and refine quantum solutions to run on future, scaled quantum machines.
