---
author: azure-quantum-content
description: Learn about concatenation expressions in the Q# programming language.
ms.author: quantumdocwriters
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Concatenation expressions in Q#
uid: microsoft.quantum.qsharp.concatenationexpressions
---

# Concatenation

Concatenations are supported for values of type `String` and arrays. In both cases, they're expressed via the operator `+`. For instance, `"Hello " + "world!"` evaluates to `"Hello world!"`, and `[1, 2, 3] + [4, 5, 6]` evaluates to `[1, 2, 3, 4, 5, 6]`.

Concatenating two arrays requires that both arrays be of the same type. This requirement differs from constructing an [array literal](xref:microsoft.quantum.qsharp.valueliterals#array-literals) where the compiler determines a common base type for all array items. This difference is because arrays are treated as [invariant](xref:microsoft.quantum.qsharp.subtypingandvariance#subtyping-and-variance). The type of the entire expression matches the type of the operands.





