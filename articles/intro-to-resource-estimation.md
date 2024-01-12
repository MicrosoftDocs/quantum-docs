---
author: SoniaLopezBravo
description: Introduction to resources estimation in quantum computing and the Azure Quantum Resource Estimator
ms.author: sonialopez
ms.date: 01/04/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: ['Python', '$$v', Quantum Intermediate Representation, target, targets]
title: Introduction to the Resource Estimator
uid: microsoft.quantum.overview.intro-resource-estimator
--- 

# Introduction to the Azure Quantum Resource Estimator

In quantum computing, resource estimation is the process used to determine the number of qubits, quantum gates, processing time, and other resources needed to run a quantum program assuming (or taking as parameters) specific hardware characteristics.

This article introduces the Azure Quantum Resource Estimator, a powerful tool that allows you to estimate the resources needed to run a quantum program on a quantum computer.

## What is the Azure Quantum Resource Estimator?

The Azure Quantum Resource Estimator is a tool that allows you to estimate the resources needed to execute a given quantum algorithm on a fault-tolerant quantum computer.

It provides the total number of physical and logical qubits, runtime, , as well as details of the formulas and values used for each estimate. This means algorithm development becomes the focus, with the goal of optimizing performance and decreasing cost. With the Azure Quantum Resource Estimator, you can compare qubit technologies, quantum error correction schemes, and other hardware characteristics to understand how they impact the resources needed to run a quantum program.

You can start from well-known, pre-defined qubit parameter settings and quantum error correction (QEC) schemes or configure unique settings across a wide range of machine characteristics such as operation error rates, operation speeds, and error correction schemes and thresholds.

> [!TIP]
> The Azure Quantum Resource Estimator is **free of charge** and doesn't require an Azure account.

The Resource Estimator supports any language that translates to QIR for example, Q# and Qiskit. To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

## What features make the Resource Estimator unique?

The Resource Estimator is a powerful tool that involves all levels of quantum computing stack. The quantum computing stack can be divided into three levels: the application level, the quantum programming or compilation level, and the hardware or modeling level. 

The Resource Estimator allows you to customize the parameters of each level and analyze how they impact the overall resources needed to run a quantum program.

:::image type="content" source="media/resource-estimator-stack-computing.png" alt-text="Chart showing the levels of the quantum computing stack of the Resource Estimator.":::

### Customizable

The Resource Estimator takes a set of target parameters and returns the resources needed to run a quantum program. The target parameters are the characteristics of the quantum computer that you want to use to run your program, for example, the properties of the physical qubits, the error budget, or the quantum error correction scheme.

You can use the predefined target parameters or customize them to your needs. The advanced options allow you to configure settings across a wide range of machine characteristics such as operation error rates, operation speeds, and error correction schemes and thresholds. For more information about the target parameters, see [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator).

### Batching

Sometimes you want to estimate the resources needed to run the same quantum algorithm for different combinations of input parameters, and compare the results. In this way you can understand how the qubit architecture, QEC scheme, and the rest of the target parameters impact the overall resources.
 
The Resource Estimator allows you to run multiple resource estimation configurations as a single job and avoid long running times. For more information, see how to [Run multiple configurations as a single job](xref:microsoft.quantum.work-with-resource-estimator#how-to-run-multiple-configurations-as-a-single-job). 

### Visualization of resources

You can inspect the distribution of physical qubits used for the algorithm and the T factories using the space-time diagrams. The [space-time diagrams](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagrams) show the total number of qubits and the total runtime of the program, and the contribution of the T factories.

The space diagram shows the proportion of these two. The time diagram shows the time required to execute the algorithm as it relates to each T factory invocation runtime and the number of T factory invocations.

## Why is resource estimation important in the development of quantum computing?

Although quantum computers promise to solve important scientific and commercial problems, achieving commercial viability will require large-scale, fault-tolerant quantum computers that have both a large number of qubits in superposition and physical error rates below a certain threshold. Commercial and scientific viability will also require quantum error correction (QEC) schemes to achieve fault tolerance. QEC is both time and space intensive, requiring increased execution time for algorithm or logical-level operations, as well as additional physical qubits to store and compute information. 

Using the Resource Estimator, you can understand the impact of architectural design choices and quantum error correction schemes. The Resource Estimator will help you understand how many qubits are needed to run an application, how long it will take to run, and which qubit technologies are better suited to solving a specific problem. Understanding these requirements will allow you to prepare and refine quantum solutions to run on future, scaled quantum machines. 

## Get started with the Resource Estimator

The Resource Estimator is part of the Azure Quantum Development Kit (Modern QDK). It supports any language that translates to QIR, for example you can use the Resource Estimator with Q# and Qiskit. For more information, see [How to use the Resource Estimator with different SDKs and IDEs](xref:microsoft.quantum.submit-resource-estimation-jobs).

The following table shows different user scenarios and the recommended articles to get started with the Resource Estimator.

|User scenario|You want to |
|---|---|
|I'm developing QEC codes|You can use the Resource Estimator to custom your QEC codes and compare different combinations of parameters. See [How to customize your QEC schemes](xref:microsoft.quantum.overview.resources-estimator#customize-predefined-qec-schemes). |
|I'm developing quantum algorithms| By analyzing the impact of different configurations of hardware and software profiles on the resource requirements, you can gain insights into how your quantum algorithm might perform under different hardware and error conditions. This information can help you optimize your algorithm for specific quantum hardware or error rates. See [Running multiple configurations of target parameters](xref:microsoft.quantum.work-with-resource-estimator#how-to-run-multiple-configurations-as-a-single-job). |
|I want to improve the performance of quantum programs| To learn how to harness the power of the Resource Estimator, see [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator). |
|I'm interested in large-scale quantum computing| You can use the Resource Estimator to analyze the resources of real-world problems that are expected to be solved by large-scale fault-tolerant quantum computers. See how in [Resource estimation for large-scale quantum computing](#resource-estimation-for-large-scale-quantum-computing). |
|I'm developing quantum-safe cryptography|You can use the Resource Estimator to compare the performance of different encryption algorithms, key strengths, qubit types, and error rates, and their resilience to quantum attacks. See [Resource estimation for quantum-safe planning](#resource-estimation-for-quantum-safe-planning). |

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator).

## Resource estimation for large-scale quantum computing

If you want to develop quantum algorithms for large-scale quantum computers, check out the [Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry) tutorial.

This tutorial represents a first step to integrate resource estimation of quantum solutions to electronic structure problems. One of the most important applications of scaled quantum computers is solving quantum chemistry problems. The simulation of complex quantum mechanical systems has the potential to unlock breakthroughs in areas such as carbon capture, food insecurity, and designing better fuels and materials.  

For example, one of the Hamiltonians used in this tutorial, the *nitrogenase_54orbital*, describes the nitrogenase enzyme. If you could accurately simulate how this enzyme works at a quantum level, it could help us to understand how to produce it at scale. You could replace the highly energy-intensive process which is used to produce enough fertilizer to feed the planet. This has the potential to reduce the global carbon footprint and also to help address concerns regarding food insecurity in a growing population.

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





