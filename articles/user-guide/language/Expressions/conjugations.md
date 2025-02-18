---
author: bradben
description: Learn about using conjugations in Q# to manage memory in quantum programs.
ms.author: brbenefield
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Conjugations in Q#
uid: microsoft.quantum.qsharp.conjugations
---

# Conjugations

Conjugations are common in quantum computations. In mathematical terms, they are patterns of the form *U†VU* for two unitary transformations *U* and *V*. That pattern is relevant due to the particularities of quantum memory: computations build up quantum correlations, or *entanglement*, to use the unique assets of quantum. However, that also means that once a subroutine no longer needs its qubits, those qubits cannot easily be reset and released since observing their state would impact the rest of the system. For that reason, the effect of a previous computation usually needs to be reversed before releasing and reusing quantum memory.

Q# hence has a dedicated construct for expressing computations that require such a cleanup. The expressions consist of two code blocks, one containing the implementation of *U* and one containing the implementation of *V*. The *uncomputation* (that is, the application of *U†*) is done automatically as part of the expression.

The expression takes the form

```qsharp
within {
    <statements>
}
apply {
    <statements>
}
```

where `<statements>` is replaced with any number of statements defining the implementation of *U* and *V* respectively.
Both blocks may contain arbitrary classical computations, aside from the usual restrictions for automatically generating adjoint versions that apply to the `within` block. Mutably bound variables used as part of the `within` block may not be reassigned as part of the `apply` block.  
