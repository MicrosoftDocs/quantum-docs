---
author: bradben
description: Understand the architecture and implementation of batch quantum computing.
ms.date: 03/06/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Overview of batch quantum computing
uid: microsoft.quantum.hybrid.batch
---

# Batch quantum computing

Typically, quantum circuits are sent one at a time as single jobs to a quantum hardware target. When the result of one circuit is received by the client, the next one is added as a new job to the queue. You can also parameterize your circuits by binding a variable to your circuit such that the variable’s value is not required at the time you define your circuit. 

With the batch computing model, you can also batch multiple pre-defined circuits into one job. The circuits are submitted to the quantum hardware as soon as the previous circuit is complete, reducing the wait between job submissions. 

In this architecture, the state of the qubits is lost between each circuit submission.

![Batch quantum computing](~/media/hybrid/batch.png)

## Next steps

[Interactive quantum computing](xref:microsoft.quantum.hybrid.interactive)