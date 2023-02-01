---
author: SoniaLopezBravo
description: Learn what quantum machine learning is and how you can experiment with it using Azure Quantum
ms.date: 01/28/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Understanding quantum machine learning
uid: microsoft.quantum.overview.qml
---

# Understanding quantum machine learning

Quantum computing and machine learning have converged towards a new discipline, called Quantum Machine Learning (QML) that brings together concepts from both fields. Quantum machine learning usually refers to quantum algorithms that solve tasks in machine learning, thereby improving and often expediting classical machine learning techniques. 

This article describe the origin and difficulties of quantum machine learning, and shows you how to use Azure Quantum to run your quantum machine learning experiments.

## What is quantum machine learning? 

Classical machine learning methods, such as deep neural networks, can both recognize statistical patterns in data, and produce data that have the same statistical patterns: machine learning algorithms recognize the patterns that they produce. If quantum processors can produce statistical patterns that are computationally difficult to be produced by a classical computer, then perhaps quantum computers can also recognize patterns that are difficult to recognize by classical means. Quantum machine learning brings together concepts from both fields to come up with enhanced solutions, either improving machine learning algorithms, quantum experiments, or both. 

The machines that learn can be either classical or quantum computers, and the data they analyze can be either classical or quantum states. In quantum machine learning, the data that the quantum computer analyzes can be either classical data, which ends up encoded as quantum states, or quantum data. This leads to two main approaches of quantum machine learning: 

- Quantum computing resources used to compute immense quantities of data and improve machine learning algorithms in terms of speed-up and/or performance. This includes the implementation of machine learning algorithms in quantum computers, including adiabatic quantum annealers, and hybrid methods that involve both classical and quantum processing. The analysis of classical data by machine learning algorithms executed on a quantum computer is known as *quantum-enhanced* machine learning. 

- Machine learning methods applied to data generated from quantum experiments, that is machine learning of quantum systems, such as learning the phase transitions of a quantum system.

Quantum machine learning is a very active field of research. While its real potential isn't completely clear yet, there are reasons to be optimistic that quantum computers can recognize patterns in data that classical computers can't do. The determination of whether there's a scaling advantage contrasting quantum and classical machine learning rely on the existence of a fault-tolerant, full-scale quantum computer, making it a benchmarking problem. 


### The barren plateau

 Most machine learning algorithms solve an [optimization task](xref:microsoft.quantum.optimization.concepts.overview.introduction) represented by a cost function, where the posible solutions are contained in a problem-solving landscape, and the valleys are the low energy values. To find the solution, the algorithm trains itself about the landscape, thereby navigating to the global minimum of the cost function. For more information, see [Key concepts of optimization](xref:microsoft.quantum.optimization.concepts.overview.key-concepts).

A *barren plateau* is a problem that occurs in machine learning optimization algorithms when the problem-solving space turns flat as the algorithm is run. In that situation, the algorithm can't find its way to the global minimum of the cost function. Lacking landscape features, the machine learning can't train itself to find the solution.


## Quantum machine learning with Qiskit and Azure Quantum 

You can adapt any Qiskit sample to run on Azure Quantum, and in particular, you can adapt any sample from [Qiskit/qiskit-machine-learning](https://github.com/Qiskit/qiskit-machine-learning). See [Adapting Qiskit samples to run on Azure Quantum](xref:microsoft.quantum.how-to.adapting-qiskit) and follow to steps to adapt your sample. 

> [!NOTE]
> If you don't have Qiskit Machine Learning installed, copy the following code at the top of your Qiskit quantum machine learning sample. 
> 
> ```python
> # Restart the kernel after running that cell
> !pip install qiskit-machine-learning qiskit-terra==0.20.1
> ```

## Quantum machine learning with Q# and Azure Quantum 

You can experiment quantum machine learning with Q# and the Quantum Development Kit (QDK). The QDK includes a ready-to-use [Quantum Machine Learning library](xref:microsoft.quantum.libraries.overview.machine-learning.intro), that gives you the ability to run hybrid quantum/classical machine learning experiments. 

You can install the Quantum Machine Learning library using the NuGet package [Microsoft.Quantum.MachineLearning](https://www.nuget.org/packages/Microsoft.Quantum.MachineLearning).

The model implemented in this library is based on the quantum-classical training scheme presented in [Circuit-centric quantum classifiers](https://arxiv.org/abs/1804.00633). Circuit centric quantum classifier is a quantum solution that combines data encoding with a rapidly entangling/disentangling quantum circuit, followed by measurement to infer class labels of data samples. The goal is to ensure classical characterization and storage of subject circuits, as well as hybrid quantum/classical training of the circuit parameters even for extremely large feature spaces.

You can start exploring quantum classification in [this tutorial](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/QuantumClassification), and experiment with the QDK [quantum machine learning code samples](https://github.com/microsoft/Quantum/tree/main/samples/machine-learning). 

For more information, see:

- [Basic classification with QDK](xref:microsoft.quantum.libraries.overview.machine-learning.basics), to run quantum sequential classifier written in Q# using the Quantum Machine Learning library of the QDK.
- [How to design your own classifier with Q#](xref:microsoft.quantum.libraries.overview.machine-learning.design), learning the basic concepts behind the design of circuit models for the quantum circuit centric classifier.
- [How to load your own data sets](xref:microsoft.quantum.libraries.overview.machine-learning.load) to train a classifier model with the QDK.

> [!NOTE]
> The Q# libraries and samples are designed to only run against a fault-tolerant quantum computer. Currently this is only possible in simulators.

## Next steps

- [Quantum Machine Learning library](xref:microsoft.quantum.libraries.overview.machine-learning.intro)
- [Quantum Machine Learning code samples](https://github.com/microsoft/Quantum/tree/main/samples/machine-learning)
- [How to perform long running experiments on Azure Quantum](xref:microsoft.quantum.long-running-experiments)

