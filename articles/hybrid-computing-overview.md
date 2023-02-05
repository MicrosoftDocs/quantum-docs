---
author: bradben
description: Understand what hybrid quantum computing is and the different implementation types.Hybrid quantum computing 
ms.date: 01/25/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Overview of hybrid quantum computing
uid: microsoft.quantum.overview.hybrid
---

# Hybrid quantum computing

Hybrid quantum computing refers to the processes and architecture of a classical computer and a quantum computer working together to solve a problem. Classical computers have always been used in quantum computing to define quantum gates, control configuration of the quantum computer, submit jobs, and process results from the quantum computer. With hybrid quantum computing, however, classical and quantum computers work together in a back-and-forth collaboration, with each platform performing tasks at different stages of the solution. 

## Levels of hybrid quantum computing

As quantum technology evolves and advances, the integration between the classical and quantum processing will become increasingly more integrated. At Microsoft, we see this evolving in four levels:

|Hybrid level | Description|
|---|---|
| Batch quantum computing | This is how most quantum computing is done today. Local clients define circuits and submit them as jobs to the QPU, which returns the result to the client. By batching multiple circuits into one job, however, eliminated the wait between job submissions, allowing you to run multiple jobs significantly faster. Examples of problems include Shor's algorithm and simple quantum phase estimation.  |
| Interactive atch quantum computing | In this model, the client compute is moved to the cloud, resulting in lower-latency and a repeated execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session, and prioritized within that session.  Although this allows for shorter queue times and longer running problems, the qubit states do not persist between each loop iteration. Examples of problems that can leverage this approach are variational quantum eigensolvers (VQE) and quantum approximation optimization algorithms (QAOA).   |
| Integrated quantum computing | With integrated quantum computing, the classical and quantum architectures are tightly coupled, allowing qubits to persist their state between computations. Though limited by qubit life and error correction, this allows for programs to perform mid-circuit measurements, optimize and re-use qubits, and adapt in real-time to the QPU. Examples of scenarios that can take advantage of this are adaptive phase estimation, machine learning, and advanced error correction.   |
| Distributed quantum computing | With fully integrated classical control and longer lived logical qubits, distributed quantum computing will enable real-time computations across quantum and distributed resources. The classical controls will no longer be limited to looping, allowing for scenarios such as complex materials modeling or the evaluation of full catalytic reactions.  |

![Hybrid quantum computing models](~/media/hybrid/hybrid-5.gif)

<!-- 
### Batch quantum computing

This is how most quantum computing is done today. Local clients define circuits and submit them as jobs to the QPU, which returns the result to the client. By batching multiple circuits into one job, however, eliminated the wait between job submissions, allowing you to run multiple jobs significantly faster. Examples of problems include Shor's algorithm and simple quantum phase estimation.  

![Batch quantum computing](~/media/hybrid/batch.png)

For more information, see [Batch quantum computing](xref:microsoft.quantum.hybrid.batch).

### Interactive batch quantum hybrid computing

In this model, the client is moved to the cloud, resulting in lower-latency and a repeated execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session, and prioritized within that session.  Although this allows for shorter queue times and longer running problems, the qubit states do not persist between each loop iteration. Examples of problems that can leverage this approach are variational quantum eigensolvers (VQE) and quantum approximation optimization algorithms (QAOA).

![Interactive batch quantum computing](~/media/hybrid/interactive-batch.png)

For more information, see [Interactive batch quantum computing](xref:microsoft.quantum.hybrid.interactive-batch).

### Integrated quantum computing

With integrated quantum computing, the classical and quantum architectures are tightly coupled, allowing qubits to persist their state between computations. Though limited by qubit life and error correction, this allows for programs to perform mid-circuit measurements, optimize and re-use qubits, and adapt in real-time to the QPU. Examples of scenarios that can take advantage of this are adaptive phase estimation, machine learning, and advanced error correction. 

![Integrated batch quantum computing](~/media/hybrid/integrated.png)

For more information, see [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated).

### Distributed quantum computing

With fully integrated classical control and longer lived logical qubits, distributed quantum computing will enable real-time computations across quantum and distributed resources. The classical controls will no longer be limited to looping, allowing for scenarios such as complex materials modeling or the evaluation of full catalytic reactions. 

![Distributed quantum computing](~/media/hybrid/distributed.png)

For more information, see [Distributed quantum computing](xref:microsoft.quantum.hybrid.distributed).

-->

## Next steps

- [Batch quantum computing](xref:microsoft.quantum.hybrid.batch)
- LINK TO PAPER