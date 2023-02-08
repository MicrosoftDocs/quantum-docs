---
author: SoniaLopezBravo
description: Learn what quantum machine learning is and how you can experiment with it using Azure Quantum
ms.date: 02/08/2023
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

## Quantum machine learning with Qiskit and Azure Quantum 

You can adapt any Qiskit sample to run on Azure Quantum, and in particular, you can adapt any sample from [Qiskit/qiskit-machine-learning](https://github.com/Qiskit/qiskit-machine-learning). See [Adapting Qiskit samples to run on Azure Quantum](xref:microsoft.quantum.how-to.adapting-qiskit) and follow to steps to adapt your sample. 

> [!NOTE]
> If you don't have Qiskit Machine Learning installed, copy the following code at the top of your Qiskit quantum machine learning sample. 
> 
> ```python
> # Restart the kernel after running that cell
> !pip install qiskit-machine-learning
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
> The Q# libraries and samples are designed to only run against a fault-tolerant quantum computer. Currently this is only possible in the QDK quantum simulators.

## Next steps

- [Quantum Machine Learning library](xref:microsoft.quantum.libraries.overview.machine-learning.intro)
- [Quantum Machine Learning code samples](https://github.com/microsoft/Quantum/tree/main/samples/machine-learning)
- [How to perform long running experiments on Azure Quantum](xref:microsoft.quantum.long-running-experiments)

