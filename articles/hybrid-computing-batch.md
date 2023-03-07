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

Typically, quantum circuits are sent one at a time to a quantum hardware target. When the result of the circuit is received by the client, the next one is added to the queue. You can parameterize your circuits by binding a variable to your circuit so that the variable’s value is not required when defining your circuit. 

You can also batch multiple pre-defined circuits into one job. The circuits are submitted to the quantum hardware as soon as the previous circuit is complete, reducing the wait between job submissions. 

In this architecture, the state of the qubits is lost between each circuit submission.

![Batch quantum computing](~/media/hybrid/batch.png)

## Next steps

[Interactive quantum computing](xref:microsoft.quantum.hybrid.interactive)