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

However, by batching multiple circuits into one job, the circuits are submitted to the quantum hardware as soon as the previous one is complete, eliminating the wait between job submissions abd allowing you to run multiple jobs significantly faster.

![Batch quantum computing](~/media/hybrid/batch.png)

<!-- 
## Examples

Snippets

## Batching with QIR API

## Portal experience

-->

## Next steps



