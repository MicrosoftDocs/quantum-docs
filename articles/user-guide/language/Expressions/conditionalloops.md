---
author: bradben
description: Learn about conditional loops in the Q# programming language.
ms.author: brbenefield
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Conditional loops in Q#
uid: microsoft.quantum.qsharp.conditionalloops
---

# Conditional loops

Like most classical programming languages, Q# supports loops that break based on a condition: loops for which the number of iterations is unknown and may vary from run to run. Since the instruction sequence is unknown at compile-time, the compiler handles these conditional loops in a particular way in a quantum runtime.

> [!IMPORTANT]
> **Quantum hardware restrictions**
>
> Loops that break based on a condition are challenging to process on quantum hardware *if the condition depends on measurement outcomes*, since the length of the instruction sequence to run isn't known ahead of time.
>
> Despite their common presence in particular classes of quantum algorithms, current hardware doesn't yet provide native support for these kinds of control flow constructs. Running these kinds of loops on quantum hardware can potentially be supported in the future by imposing a maximum number of iterations, or as other hardware support becomes available. Quantum simulators, however, run any loops based on measurements.

## Compiling loops

As long as the condition doesn't depend on quantum measurements, conditional loops are processed with a just-in-time compilation before sending the instruction sequence to the quantum processor. In particular, using conditional loops within functions is unproblematic since code within functions can always run on conventional (non-quantum) hardware. Q#, therefore, supports the use of traditional `while` loops within functions.


## Repeat expression

When you run programs on quantum simulators, Q# allows you to express control flow that depends on the results of quantum measurements.
This capability enables probabilistic implementations that can significantly reduce computational costs.
A common example is the *repeat-until-success* pattern, which repeats a computation until a certain condition - which usually depends on a measurement - is satisfied. Such `repeat` loops are widely used in particular classes of quantum algorithms. Q# hence has a dedicated language construct to express them, despite that they still pose a challenge for execution on quantum hardware.



The `repeat` expression takes the following form

```qsharp
repeat {
    // ...
}
until condition
fixup {
    // ...
}
```

or alternatively

```qsharp
repeat {
    // ...
}
until condition;
```

where `condition` is an arbitrary expression of type `Bool`.

The `repeat` loop runs a block of statements before evaluating a condition. If the condition evaluates to true, the loop exits. If the condition evaluates to false, an additional block of statements defined as part of an optional `fixup` block, if present, is run before entering the next loop iteration.

## While loop

A more familiar-looking loop for classical computations is the `while` loop, which consists of the keyword `while`, an expression of type `Bool`, and a statement block.
For example, if `arr` is an array of positive integers,

```qsharp
mutable (item, index) = (-1, 0);
while index < Length(arr) && item < 0 {
    item = arr[index];
    index += 1;
}
```

The statement block is run as long as the condition evaluates to `true`.

