---
author: bradben
description: Learn about how struct types are declared in the Q# programming language.
ms.author: brbenefield
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Type declarations in Q#
uid: microsoft.quantum.qsharp.typedeclarations
---

# Type Declarations

Q# supports user-defined `struct` types. `struct` types are similar to record types in F#; they're immutable but support a [copy-and-update](xref:microsoft.quantum.qsharp.copyandupdateexpressions) construct.

## Struct types

`struct` types can only contain named items and don't support anonymous items. Any combination of named items is supported, although items can't be nested.

The following declaration, for example, defines a struct `Complex` which has two named items `Real` and `Imaginary`, both of type `Double`:

```qsharp
struct Complex {
    Real : Double,
    Imaginary : Double,
}
```

You can access the contained items via their name or by *deconstruction* (for more information, see [item access](xref:microsoft.quantum.qsharp.itemaccessexpression#item-access-for-struct-types)).
You can also access a tuple of all items where the shape matches the one defined in the declaration via the [unwrap operator](xref:microsoft.quantum.qsharp.itemaccessexpression#item-access-for-struct-types).

`struct` types are useful for two reasons. First, as long as the libraries and programs that use the defined types access items via their name rather than by deconstruction, the type can be extended to contain additional items later on without breaking any library code. Because of this, accessing items via deconstruction is discouraged.

Second, Q# allows you to convey the intent and expectations for a specific data type since there's no automatic conversion between values of two `struct` types, even if their item types are identical.

## Struct constructors

The compiler automatically generates constructors for new `struct` types when it reads a `struct` definition. For the `Complex` struct in the previous example, you can create an instance with

```qsharp
let complexPair = Complex(1.4, 2.1);
```

You can also define instances with the `new` keyword, for example

```qsharp
let complexPair = new Complex { Real = 1.4, Imaginary = 2.1 };
```

You can copy an existing struct with the `...` syntax

```qsharp
let copyPair = new Complex { ...complexPair };
```

When copying, you can specify individual fields to change

```qsharp
let updatedPair = new Complex { ...complexPair, Real = 3.5 };
```
