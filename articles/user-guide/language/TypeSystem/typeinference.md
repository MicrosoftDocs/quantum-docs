---
author: bradben
description: Learn about type inference in Q#.
ms.author: brbenefield
ms.date: 02/21/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Type inference in Q#
uid: microsoft.quantum.qsharp.typeinference
---

# Type inference

Q#'s type inference algorithm is based on inference algorithms designed for the Hindley-Milner type system.
While top-level callables must be declared with explicit type annotations, most types used within a callable can be inferred.
For example, given these callables:

```qsharp
function Length<'a>(xs : 'a[]) : Int
function Mapped<'a, 'b>(f : 'a -> 'b, xs : 'a[]) : 'b[]
```

and this expression:

```qsharp
Mapped(Length, [[], ["a"], ["b", "c"]])
```

then the type argument to `Length` is inferred as `Length<String[]>`, and the type arguments to `Mapped` are inferred as `Mapped<String[], Int>`.
It isn't required to write these types explicitly.

## Ambiguous types

Sometimes there isn't a single principal type that can be inferred for a type variable.
In these cases, type inference fails with an error referring to an ambiguous type.
For example, change the previous example slightly:

```qsharp
Mapped(Length, [[]])
```

What is the type of `[[]]`?
In some type systems, it's possible to give it the type `∀a. a[][]`, but this isn't supported in Q#.
A concrete type is required, but there are an infinite number of types that work: `String[][]`, `(Int, Int)[][]`, `Double[][][]`, and so on.
You must explicitly say which type you meant.

There are multiple ways to do this, depending on the situation.
For example:

1. Call `Length` with a type argument.

   ```qsharp
   Mapped(Length<String>, [[]])
   ```

2. Call `Mapped` with its first type argument.
   (The `_` for its second type argument means that it should still be inferred.)

   ```qsharp
   Mapped<String[], _>(Length, [[]])
   ```

3. Replace the empty array literal with an explicitly-typed call to a library function.

   ```qsharp
   Mapped<String[], _>(Length, [EmptyArray<String>()])
   ```

---

