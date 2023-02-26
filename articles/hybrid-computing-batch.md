---
author: bradben
description: Understand the architecture and implementation of batch quantum computing.
ms.date: 02/21/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Overview of batch quantum computing
uid: microsoft.quantum.hybrid.batch
---

# Batch quantum computing

Typically, quantum jobs, or circuits, are sent one at a time to a quantum hardware target. When that job is complete, the next job is added to the queue. 

However, by batching multiple circuits into one job, the circuits are submitted to the quantum hardware as soon as the previous one is complete, eliminating the wait between job submissions and allowing you to run multiple jobs significantly faster.

## Parameterized quantum circuits

Parameterized quantum circuits are the best example of using hybrid quantum computing with today's *noisy intermediate-scale quantum (NISQ)* hardware. Parameterized quantum circuits depend on adjustable parameters that the classical computer provides to encode different quantum states or perform different quantum operations. Withing the closed loop, the classical computer can evaluate the quantum measurements and adjust the parameters accordingly. Parameterized circuits excel at optimization problems, machine learning, and chemistry simulations. 

![Batch quantum computing](~/media/hybrid/batch.png)

<!-- 
## Examples

Snippets

## Batching with QIR API

## Portal experience

-->

## Next steps



