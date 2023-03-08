---
author: bradben
description: Understand what hybrid quantum computing is and the different implementation types. Hybrid quantum computing 
ms.date: 03/06/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Overview of hybrid quantum computing
uid: microsoft.quantum.overview.hybrid
---

# Hybrid quantum computing

*Hybrid quantum computing* refers to the processes and architecture of a classical computer and a quantum computer working together to solve a problem. Classical computers have always been used in quantum computing to define quantum gates, control configuration of the quantum computer, submit jobs, and process results from the quantum computer. With the latest generation of hybrid quantum computing architecture available in Azure Quantum, Integrated Hybrid, you can start programming quantum computers by mixing classical and quantum instructions together.

> [!VIDEO 18bede0d-b000-4938-99e5-6c22282df594]

<!--
![Hybrid quantum computing models](~/media/hybrid/overview.png)
-->

## Hybrid quantum computing architectures

As quantum technology evolves and advances, the classical and quantum processes become increasingly more integrated. Microsoft has developed a precise taxonomy to understand each architecture and its benefits.

|Architecture | Description|
|---|---|
| [**Batch quantum computing**](xref:microsoft.quantum.hybrid.batch) | Local clients define circuits and submit them as jobs to the quantum processing unit (QPU), which returns the result to the client. Batching multiple circuits into one job, however, eliminates the wait between job submissions, allowing you to run multiple jobs faster. Examples of problems that can take advantage of batch quantum computing include Shor's algorithm and simple quantum phase estimation.  |
| [**Interactive quantum computing**](xref:microsoft.quantum.hybrid.interactive) | In this model, the client compute resource is moved to the cloud, resulting in lower latency and repeated execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session and prioritized over non-session jobs.  Although sessions allow for shorter queue times and longer running problems, the qubit states don't persist between each iteration. Examples of problems that can use this approach are variational quantum eigensolvers (VQE) and quantum approximation optimization algorithms (QAOA).   |
| [**Integrated quantum computing**](xref:microsoft.quantum.hybrid.integrated) | With integrated quantum computing, the classical and quantum architectures are tightly coupled, allowing classical computations to be performed while physical qubits are coherent. Though limited by qubit life and error correction, this allows for quantum programs to move away from just circuits. Programs can now use common programming constructs to perform mid-circuit measurements, optimize and reuse qubits, and adapt in real-time to the QPU. Examples of scenarios that can take advantage of this model are adaptive phase estimation and machine learning.   |
| [**Distributed quantum computing**](xref:microsoft.quantum.hybrid.distributed) | In this architecture, classical computation is working alongside logical qubits. The long coherence time provided by logical qubits enables complex and distributed computation across heterogenous cloud resources. Paired with a QPU composed of a large number of qubits, you can expect this architecture to be used to solve problems such as evaluation of full catalytic reactions that can benefit commercial applications and the hardest problems facing humanity including carbon capture and discovery of new drugs.  |


## Next steps

- [Batch quantum computing](xref:microsoft.quantum.hybrid.batch)