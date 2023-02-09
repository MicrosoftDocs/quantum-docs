---
author: bradben
description: Understand the best practices for writing and submitting hybrid quantum programs with Q# and the QDK.
ms.date: 02/09/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Programming guide for hybrid quantum computing
uid: microsoft.quantum.programming
---

# Hybrid quantum computing programming best practices

- Set capability and target early? 
- Opt-in mechanism for partially supported features
  - Opt to convert compiler error to warnings
  - https://ms-quantum.visualstudio.com/Quantum%20Program/_workitems/edit/48242
- Emulator first
  - Will emulators validate for compiler errors above?
- Link to troubleshooting
- Command line arguments
- Avoid partial applications
- Use ranges rather than arrays when possible
- Which functions/operations have the capability attributes?
  - Q# core and standard libraries
  - Chem, ML, numerics, etc. not this time
  - Not katas (assume, not samples on /learn/samples, either?)
- Partner TBD: 
  - integer support
  - returning constant values


## Next steps

- [Batch quantum computing](xref:microsoft.quantum.hybrid.batch)
- LINK TO PAPER