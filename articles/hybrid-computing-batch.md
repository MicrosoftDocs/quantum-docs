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

However, by batching multiple circuits into one job, the circuits are submitted to the quantum hardware as soon as the previous circuit is complete, eliminating the wait between job submissions and allowing you to run multiple jobs significantly faster. In this mode, you can submit batches of non-parameterized circuits, that is, circuits with a fixed number of predefined gates. Batches of parameterized circuits, in which gates depend on adjustable parameters that the classical computer provides to encode different quantum states, are part of the [Interactive quantum computing](xref:microsoft.quantum.hybrid.interactive) model.

![Batch quantum computing](~/media/hybrid/batch.png)

## Next steps

[Interactive quantum computing](xref:microsoft.quantum.hybrid.interactive)