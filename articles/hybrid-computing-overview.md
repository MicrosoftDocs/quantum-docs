---
author: azure-quantum-content
description: Learn about hybrid quantum computing, the different implementation types, and how to choose the best approach for your quantum computing needs.
ms.date: 07/22/2024
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Introduction to Hybrid Quantum Computing
uid: microsoft.quantum.overview.hybrid

#customer intent: As a quantum developer, I want to understand what hybrid quantum computing is and the different implementation types so that I can choose the best approach for my quantum computing needs.
---

# What is hybrid quantum computing?

*Hybrid quantum computing* refers to the processes and architecture of a classical computer and a quantum computer working together to solve a problem. With the latest generation of hybrid quantum computing architecture available in Azure Quantum you can start programming quantum computers by mixing classical and quantum instructions together.

Azure Quantum embodies a forward-looking vision for hybrid quantum computing, where certain architectures are already operational, while others are actively being developed. This article describes the different approaches to hybrid quantum computing and how they can be used to optimize certain problems.

## Grouping circuits with batch quantum computing

Batch quantum computing allows you to submit multiple quantum circuits as a single job to the quantum hardware.

Typically, quantum circuits are sent one at a time as single jobs to a quantum hardware target. When the client receives the result of one circuit, the next circuit is added as a new job to the queue. Batching multiple circuits into one job, however, eliminates the wait between job submissions, allowing you to run multiple jobs faster. Examples of problems that can take advantage of batch quantum computing include Shor's algorithm and simple quantum phase estimation.  

With the batch computing model, you can also batch multiple predefined circuits into one job. The circuits are submitted to the quantum hardware as soon as the previous circuit is complete, reducing the wait between job submissions.

In this architecture, the state of the qubits is lost between each circuit submission.

> [!NOTE]
> Azure Quantum currently doesn't support batch quantum computing.

## Grouping jobs with sessions

Sessions allow you to organize multiple quantum computing jobs with the ability to run classical code between quantum jobs. You'll be able to run complex algorithms to better organize and track your individual quantum computing jobs. Plus, jobs grouped in sessions are prioritized over non-session jobs.

In this model, the client compute resource is moved to the cloud, resulting in lower latency and repeated execution of the quantum circuit with different parameters.   Although sessions allow for shorter queue times and longer running problems, the qubit states don't persist between each iteration. Examples of problems that can use this approach are :::no-loc text="Variational Quantum Eigensolvers"::: (VQE) and :::no-loc text="Quantum Approximate Optimization Algorithms":::  (QAOA).

For more information, see [Get started with sessions](xref:microsoft.quantum.hybrid.interactive).

## Running hybrid quantum computing

With hybrid quantum computing, the classical and quantum architectures are tightly coupled, allowing classical computations to be performed while physical qubits are coherent. Though limited by qubit life and error correction, this allows for quantum programs to move away from just circuits. Programs can now use common programming constructs to perform mid-circuit measurements, optimize and reuse qubits, and adapt in real-time to the QPU. Examples of scenarios that can take advantage of this model are adaptive phase estimation and machine learning. 

For more information, see  [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated).

## Running distributed quantum computing

In this architecture, classical computation is working alongside logical qubits. With fully integrated classical control and longer lived logical qubits, the distributed quantum computing model enables real-time computations across quantum and distributed resources. The classical controls are no longer limited to loops, and allow for scenarios such as complex materials modeling or the evaluation of full catalytic reactions.

> [!NOTE]
> Azure Quantum currently doesn't support distributed quantum computing.
