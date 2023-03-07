---
author: bradben
description: Understand the architecture and implementation of interactive (sessions) quantum computing.
ms.date: 03/06/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Overview of interactive (sessions) quantum computing
uid: microsoft.quantum.hybrid.interactive
---

# Interactive (sessions) quantum computing

In this model, the client compute resource is moved to the cloud, resulting in lower-latency and the ability to repeat execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session, and the jobs in that session can be prioritized over non-session jobs.  Although the qubit states do not persist between jobs, a job session allows for shorter queue times and longer running problems.

![Interactive quantum computing](~/media/hybrid/interactive.png)

## Next steps

[Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)