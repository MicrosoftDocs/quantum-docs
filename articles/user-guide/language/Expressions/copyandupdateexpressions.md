---
author: bradben
description: Learn how to use copy-and-update expressions in Q#.
ms.author: brbenefield
ms.date: 08/15/2024
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Copy-and-update expressions in Q#
uid: microsoft.quantum.qsharp.copyandupdateexpressions
---

# Copy-and-update expressions

To reduce the need for mutable bindings, Q# supports copy-and-update expressions for arrays, which allow you to access items via an index or range of indices.

Copy-and-update expressions instantiate a new array with all items set to the corresponding value in the original array, except the certain specified items, which are set to the ones defined on the right-hand side of the expression.
They are constructed using a ternary operator `w/` `<-`; the syntax `w/` should be read as the commonly used short notation for "with":

```qsharp
    original w/ itemAccess <- modification
```

where `original` is an array expression, `itemAccess` is any expression that is valid for array slicing, and `modification` is the new value or values. Concretely, the `itemAccess` expression can be of type `Int` or `Range`. If `itemAccess` is a value of type `Int`, then the type of `modification` has to match the item type of the array. If `itemAccess` is a value of type `Range`, then the type of `modification` has to be the same as the array type.

For example, if `arr` contains an array `[0, 1, 2, 3]`, then

- `arr w/ 0 <- 10` is the array `[10, 1, 2, 3]`.
- `arr w/ 2 <- 10` is the array `[0, 1, 10, 3]`.
- `arr w/ 0..2..3 <- [10, 12]` is the array `[10, 1, 12, 3]`.

In terms of precedence, the copy-and-update operator is left-associative and has lowest precedence, and, in particular, lower precedence than the range operator (`..`) or the ternary conditional operator (`?` `|`).
The chosen left associativity allows easy chaining of copy-and-update expressions:

```qsharp
    let model = ArrayConstructor()
        w/ 1 <- alpha
        w/ 3 <- gamma
        w/ 5 <- epsilon;
```

As for any operator that constructs an expression of the same type as the left-most expression involved, the corresponding [evaluate-and-reassign statement](xref:microsoft.quantum.qsharp.variabledeclarationsandreassignments#evaluate-and-reassign-statements) is available.
The two following statements, for example, achieve the following: The first statement declares a mutable variable `arr` and binds it to the default value of an integer array. The second statement then builds a new array with the first item (with index 0) set to 10 and reassigns it to `arr`.

```qsharp
    mutable arr = [0, size = 3]; // arr contains [0, 0, 0]
    arr w/= 0 <- 10;             // arr contains [10, 0, 0] 
```

The second statement is just short-hand for the more verbose syntax `arr = arr w/ 0 <- 10;`.

Copy-and-update expressions allow the efficient creation of new arrays based on existing ones.
The implementation for copy-and-update expressions avoids copying the entire array
by duplicating only the necessary parts to achieve the desired behavior and performs an in-place modification if possible. Hence, array initializations do not incur additional overhead due to immutability.

The `Std.Arrays` namespace provides an arsenal of convenient tools for array creation and manipulation.

Copy-and-update expressions are a convenient way to construct new arrays on the fly;
the following expression, for example, evaluates to an array with all items set to `PauliI`, except the item at index `i`, which is set to `PauliZ`:

```qsharp
[PauliI, size = n] w/ i <- PauliZ
```
