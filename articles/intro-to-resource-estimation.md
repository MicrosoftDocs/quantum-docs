---
author: azure-quantum-content
description: Learn about the resource estimator, an open-source tool that allows you to estimate the resources needed to run a quantum program on a quantum computer.
ms.author: quantumdocwriters
ms.date: 05/22/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: ['Python', '$$v', Quantum Intermediate Representation, target, targets]
title: Introduction to the resource estimator
uid: microsoft.quantum.overview.intro-resource-estimator
# Customer intent: As a quantum programmer, I want to learn about the Microsoft Quantum resource estimator. What is it for, how does it work, and why should I use it?
--- 

# What is the Microsoft Quantum resource estimator?

Quantum computers are prone to noise and errors because individual qubits are highly sensitive to changes in environmental conditions. Fault-tolerant quantum computing requires algorithms that use quantum error correction (QEC) codes. These codes build and use logical qubits from collections of individual physical qubits. Logical qubits correct errors while a program runs on a quantum computer so that quantum computations can provide reliable results.

The Microsoft Quantum resource estimator is an [open-source](https://github.com/microsoft/qdk/tree/main/source/qre) tool in the Microsoft Quantum Development Kit (QDK) Python library that allows you to estimate the resources needed to run a quantum program on a fault-tolerant quantum computer. Error correction codes increase the number of physical qubits and run time of a quantum algorithm. The resource estimator determines how many physical qubits and how much time is needed for a quantum application to run on specific hardware with a given error correction scheme.

With the quantum resource estimator, you can compare qubit technologies, quantum error correction schemes, and hardware technologies to understand the impact on the resources needed to run a quantum program.

## How does the quantum resource estimator work?

The resource estimator is designed around a layered modeling approach to be flexible and composable. You construct models for the application, the hardware, and the error correction scheme. You also specify how these models interact. All the models and instructions are independent of each other, so you can combine and compare different combinations of models.

The resource estimator uses intermediate representations to connect the layers. These representations are part of the estimator’s implementation and aren't required for typical use. You interact with the resource estimator through standard programming languages and high‑level configuration models.

:::image type="content" source="media/quantum-resource-estimator-overview.png" alt-text="Overview diagram of how the Microsoft Quantum resource estimator works. The diagram shows that you start with an application model and an architecture model. Then, you create trace and ISAs from the models. Then, you explore the design space and find an optimal Pareto frontier solution.":::

The quantum resource estimator requires four inputs:

- An application model that describes the quantum computation, such as a Q# program
- An architecture model that describes the target quantum hardware, such as gate-based superconducting qubits with specific gate times and error rates
- An error correction and factory distillation model that corresponds to the hardware architecture model
- An error budget, which is the maximum allowed error rate for operations on logical qubits

From the application model, the resource estimator generates one or more applications traces. These traces are compact representations of the instruction sequences that are applied to qubits. From the architecture model and error correction model, the resource estimator derives a physical instruction set (ISA) that specifies operation times, qubit costs, and error rates.

Both the application layer and the architecture layer are converted into configurable transforms. Trace transforms from the application layer include gate decompositions and layout routines. ISA transforms from the architecture layer include quantum error correction codes and magic state factories to build higher-fidelity logical instruction sets from the architecture's physical primitives.

The resource estimator explores a large combinatorial design space because there are many valid design choices at each layer. For example, different QEC code distances, different factory protocols, and different decomposition parameters. The resource estimator explores every combination of application trace and architecture ISA to evaluate physical qubit counts, run times, and accumulated error rates for each combination. The results are filtered down to a Pareto-optimal frontier, which is the optimal set of configurations where no other result is simultaneously better in both qubits and runtime while staying within the specified error budget.

### Application language support

The resource estimator accepts quantum applications in several in the following programming languages and intermediate formats:

- Q#
- Cirq
- OpenQASM
- QIR
- Logical counts
- Custom applications

With QIR and the ability to create custom applications, the resource estimator is language‑agnostic and supports a broad range of quantum programming tools. Applications in different frameworks are analyzed using the same estimation pipeline. You can also build custom applications outside of these supported frameworks.

### Architecture hardware support

Resource estimates depend on assumptions about the target hardware and the error correction code that protects logical operations from errors. The resource estimator includes built‑in models for common architectures and error correction schemes. You can also define your own custom hardware and error correction models to explore hypothetical architectures, evaluate emerging technologies, or study how changes in physical parameters affect the resource requirements to run a program.

### Compare estimates and visualize results

The resource estimator allows you to estimate the resources needed to run the same quantum algorithm for different configurations of target architecture models. You can plot the results for each configuration to compare the results. When you compare estimates, you can understand how the qubit architecture, QEC scheme, and other hardware parameters impact the overall resources required to run your program.

## Get started with the resource estimator

To get started, see [How to install and use the Microsoft Quantum resource estimator](xref:microsoft.quantum.quickstart.install-use-qre).
