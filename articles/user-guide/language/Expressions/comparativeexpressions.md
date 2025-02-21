---
author: bradben
description: Learn about equality comparison expressions in the Q# programming language.
ms.author: brbenefield
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Comparative expressions in Q#
uid: microsoft.quantum.qsharp.comparativeexpressions
---

# Comparative expressions

## Equality comparisons

*Equality comparisons* (`==`) and *inequality comparisons* (`!=`) are currently limited to the following data types: `Int`, `BigInt`, `Double`, `String`, `Bool`, `Result`, `Pauli`, and `Qubit`. Equality comparisons of `struct` types and callables aren't currently supported.

Equality comparison for values of type `Qubit` evaluates whether the two expressions identify the same qubit. There's no notion of a quantum state in Q#; equality comparison, in particular, does *not* access, measure, or modify the quantum state of the qubits.

Equality comparisons for `Double` values may be misleading due to rounding effects.
For instance, the following comparison evaluates to `false` due to rounding errors: `49.0 * (1.0/49.0) == 1.0`.

Equality comparison of arrays, and tuples are supported by comparisons of their items, and are only supported if all of their nested types support equality comparison.

Equality comparison of close-ended ranges is supported, and two ranges are considered equal if they produce the same sequence of integers. For example, the following two ranges

```qsharp
    let r1 = 0..2..5; // generates the sequence 0,2,4
    let r2 = 0..2..4; // generates the sequence 0,2,4
```

are considered equal. Equality comparison of open-ended ranges isn't supported.

## Quantitative comparison

The operators *less-than* (`<`), *less-than-or-equal* (`<=`), *greater-than* (`>`), and *greater-than-or-equal* (`>=`) define quantitative comparisons. They can only be applied to data types that support such comparisons, that is, the same data types that can also support [arithmetic expressions](xref:microsoft.quantum.qsharp.arithmeticexpressions#arithmetic-expressions).

