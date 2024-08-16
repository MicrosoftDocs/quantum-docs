---
author: bradben
description: Learn about array item access and array slicing in Q#.
ms.author: brbenefield
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Item access in Q#
uid: microsoft.quantum.qsharp.itemaccessexpression
---

# Item access

Q# supports item access for array items and for `struct` types. In both cases, the access is read-only; the value cannot be changed without creating a new instance using a [copy-and-update expression](xref:microsoft.quantum.qsharp.copyandupdateexpressions#copy-and-update-expressions).

## Array item access and array slicing

Given an array expression and an expression of type `Int` or `Range`, a new expression may be formed using the array item access operator consisting of `[` and `]`.

If the expression inside the brackets is of type `Int`, then the new expression contains the array item at that index.
For example, if `arr` is of type `Double[]` and contains five or more items, then `arr[4]` is an expression of type `Double`.

If the expression inside the brackets is of type `Range`, then the new expression contains an array of all the items indexed by the specified `Range`. If the `Range` is empty, then the resulting array is empty.
For example,

```qsharp
let arr = [10, 11, 36, 49];
let ten = arr[0]; // contains the value 10
let odds = arr[1..2..4]; // contains the value [11, 49]
let reverse = arr[...-1...]; // contains the value [49, 36, 11, 10]
```

In the last line of the example, the start and end value of the range have been omitted for convenience. For more information, see [Contextual expressions](xref:microsoft.quantum.qsharp.contextualexpressions#contextual-and-omitted-expressions).

If the array expression is not a simple identifier, it must be enclosed in parentheses in order to extract an item or a slice.
For instance, if `arr1` and `arr2` are both arrays of integers, an item from the concatenation would be expressed as `(arr1 + arr2)[13]`. For more information, see [Precedence and associativity](xref:microsoft.quantum.qsharp.precedenceandassociativity#precedence-and-associativity).

All arrays in Q# are zero-based, that is, the first element of an array `arr` is always `arr[0]`.
An exception is thrown at runtime if the index or one of the indices used for slicing is outside the bounds of the array, for example, if it is less than zero or larger or equal to the length of the array.

## Item access for struct types

The contained items can be accessed via their name or by deconstruction, illustrated by the following statements that may be used as part of an operation or function implementation:


```qsharp
    let complex = new Complex {Real = 1., Imaginary = 0.}; // create a value of type Complex
    let (re, _) = complex!;       // item access via deconstruction
    let im = complex.Imaginary;  // item access via name
```

You can use a period (`.`) to reference named items in the struct, as in the following example:

```qsharp
struct TwoStrings {
    str1 : String,
    str2 : String,
}

operation LinkTwoStrings(str : TwoStrings) : String {
    let s1 = str.str1;
    let s2 = str.str2;
    return s1 + s2;
}
```

Access via deconstruction makes use of the unwrap operator (`!`). The unwrap operator returns a tuple of all contained items, where the shape of the tuple matches the one defined in the declaration, and a single item tuple is equivalent to the item itself (see [this section](xref:microsoft.quantum.qsharp.singletontupleequivalence#singleton-tuple-equivalence)).

For instance, in the previous example, for the instance `MyStrings` of type `TwoStrings`, the expression `MyStrings!` returns a value of type `(String, String)`. Individual values can be accessed using deconstruction syntax. For example, to retrieve just the first value in this example

```qsharp
let (S1, _) = MyStrings!;
```

For more information on deconstruction syntax, see [Variable declarations and reassignments](xref:microsoft.quantum.qsharp.variabledeclarationsandreassignments).

The `!` operator has lower [precedence](xref:microsoft.quantum.qsharp.precedenceandassociativity#modifiers-and-combinators) than both item access operators, but higher precedence than any other operator. For a complete list of precedences, see [Precedence and associativity](xref:microsoft.quantum.qsharp.precedenceandassociativity#precedence-and-associativity).




