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

Copy-and-update expressions instantiate a new value with all items set to the corresponding value in the original expression, except certain specified items, which are set to the ones defined on the right-hand side of the expression.
They are constructed using a ternary operator `w/` `<-`; the syntax `w/` should be read as the commonly used short notation for "with":

```qsharp
    original w/ itemAccess <- modification
```

where `original` is either an expression of user-defined type or an array expression. For the corresponding requirements for `itemAccess` and `modification`, see [Copy-and-update of user-defined types](#copy-and-update-of-user-defined-types) and [Copy-and-update of arrays](#copy-and-update-of-arrays).

In terms of precedence, the copy-and-update operator is left-associative and has lowest precedence, and, in particular, lower precedence than the range operator (`..`) or the ternary conditional operator (`?` `|`).
The chosen left associativity allows easy chaining of copy-and-update expressions:

```qsharp
    let model = Default<SequentialModel>()
        w/ Structure <- ClassifierStructure()
        w/ Parameters <- parameters
        w/ Bias <- bias;
```

As for any operator that constructs an expression of the same type as the left-most expression involved, the corresponding [evaluate-and-reassign statement](xref:microsoft.quantum.qsharp.variabledeclarationsandreassignments#evaluate-and-reassign-statements) is available.
The two following statements, for example, achieve the following: The first statement declares a mutable variable `arr` and binds it to the default value of an integer array. The second statement then builds a new array with the first item (with index 0) set to 10 and reassigns it to `arr`.

```qsharp
    mutable arr = [0, size = 3]; // arr contains [0, 0, 0]
    set arr w/= 0 <- 10;      // arr contains [10, 0, 0] 
```

The second statement is just short-hand for the more verbose syntax `set arr = arr w/ 0 <- 10;`.

## Copy-and-update of arrays

For arrays, `itemAccess` can be an arbitrary expression of a suitable type;
the same types that are valid for array slicing are valid in this context. Concretely, the `itemAccess` expression can be of type `Int` or `Range`. If `itemAccess` is a value of type `Int`, then the type of `modification` has to match the item type of the array. If `itemAccess` is a value of type `Range`, then the type of `modification` has to be the same as the array type.

For example, if `arr` contains an array `[0, 1, 2, 3]`, then

- `arr w/ 0 <- 10` is the array `[10, 1, 2, 3]`.
- `arr w/ 2 <- 10` is the array `[0, 1, 10, 3]`.
- `arr w/ 0..2..3 <- [10, 12]` is the array `[10, 1, 12, 3]`.

Copy-and-update expressions allow the efficient creation of new arrays based on existing ones.
The implementation for copy-and-update expressions avoids copying the entire array
by duplicating only the necessary parts to achieve the desired behavior and performs an in-place modification if possible. Hence, array initializations do not incur additional overhead due to immutability.

The `Microsoft.Quantum.Arrays` namespace provides an arsenal of convenient tools for array creation and manipulation.

Copy-and-update expressions are a convenient way to construct new arrays on the fly;
the following expression, for example, evaluates to an array with all items set to `PauliI`, except the item at index `i`, which is set to `PauliZ`:

```qsharp
[PauliI, size = n] w/ i <- PauliZ
```

## Copy-and-update of struct types

To copy and update `struct` types, you use a copy constructor to declare a new `struct` from an existing one. For example, if `MyPair` is an instance of the struct `IntPair`, with the values `5` and `7`, you can create a new struct with the same values using the `new` keyword and the name of the existing `struct`.  For more information on defining a `struct` type, see [Type declarations](xref:microsoft.quantum.qsharp.typedeclarations).

```qsharp
let ThisPair = new IntPair {...MyPair};
```

Or you can modify one or more of the values when you create it

```qsharp
let ThisPair = new IntPair {...MyPair, Int1 = 8, Int2 = 10};
```