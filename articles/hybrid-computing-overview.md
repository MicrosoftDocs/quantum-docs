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

As quantum technology evolves and advances, hybrid quantum computing  

VIDEO LINK

## Five levels of hybrid computing

BLURB

### Batch quantum computing

Description - Local clients enable quantum circuits with classical pre- and post-processing

Shor's, simple quantum phase estimation

![Batch quantum computing](~/media/hybrid/batch.png)

### Interactive quantum hybrid computing

Description - Cloud-based clients enable parameterized quantum circuits in a classical driver loop that runs in the cloud. Move classical computation to the cloud, 

- long running programs without interruption
- access to more powerful compute
- prioritzed access to QPU, with shorter queue times
- no real time computation with QPU

Variational quantum eigensolvers, Quantum approximation optimization algorithms

Prioritized loop

![Interactive batch quantum computing](~/media/hybrid/interactive-batch.png)

### Integrated quantum computing

Description - Parameterized quantum co-routines with a classical driver loop, Physical qubit remains alive, Limited classical control. 
You can do mid-circuit measurement, re-use qubits, branch and adapt in real-time what will be the next computation performed by the QPU.



Adaptive phase estimation (random walk, Bayesian), error correction

![Integrated batch quantum computing](~/media/hybrid/integrated.png)

### Distributed quantum computing

Description - The highest level of maturity for Hybrid quantum computing will be reached once Logical qubits are available.
The classical control is not bounded anymore by the lifespan of the qubit.

It can perform richer computation on its own, distribute elements of computation to external resources, harnessing the full power of what a public cloud provider such as Azure can offer.

Longer lived qubits enable full classical compute next to the QPU

- Logical qubit with indefinite lifetime enables full classical control
- Real-time cloud processing


Full data center integration enables complex distributed hybrid jobs across quantum & HPC resources



Complex materials modelling, Evaluation of a full catalytic reaction


![Distributed quantum computing](~/media/hybrid/distributed.png)


## Next steps

- [Batch quantum computing](xref:microsoft.quantum.hybrid.batch)
- LINK TO PAPER