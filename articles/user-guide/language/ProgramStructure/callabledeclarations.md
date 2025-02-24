---
author: bradben
description: Learn how operations and functions, or callables, are declared in the Q# programming language.
ms.author: brbenefield
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Callable Declarations in Q#
uid: microsoft.quantum.qsharp.callabledeclarations
---

# Callable declarations

Callable declarations, or *callables*, declared at a global scope are publicly visible by default; that is, they can be used anywhere in the same project and in a project that references the assembly in which they're declared. [Access modifiers](xref:microsoft.quantum.qsharp.programstructure-overview#access-modifiers) allow you to restrict their visibility to the current assembly only, such that implementation details can be changed later on without breaking code that relies on a specific library.

Q# supports two kinds of callables: operations and functions. The topic [Operations and Functions](xref:microsoft.quantum.qsharp.operationsandfunctions#operations-and-functions) elaborates on the distinction between the two. Q# also supports defining *templates*; for example, type-parameterized implementations for a certain callable. For more information, see [Type parameterizations](xref:microsoft.quantum.qsharp.typeparameterizations#type-parameterizations).

> [!NOTE]
> Such type-parametrized implementations may not use any language constructs that rely on particular properties of the type arguments; there's currently no way to express type constraints in Q#, or to define specialized implementations for particular type arguments.

## Callables and functors

Q# allows specialized implementations for specific purposes; for example, operations in Q# can implicitly or explicitly define support for certain *functors*, and along with it the specialized implementations to invoke when a specific functor is applied to that callable.

A functor, in a sense, is a factory that defines a new callable implementation that has a specific relation to the callable it was applied to.
Functors are more than traditional higher-level functions in that they require access to the implementation details of the callable they have been applied to. In that sense, they're similar to other factories, such as templates. They can be applied to type-parameterized callables as well.

Consider the following operation, `ApplyQFT`:

```qharp
    operation ApplyQFT(qs : Qubit[]) : Unit is Adj + Ctl {
        let length = Length(qs);
        Fact(length >= 1, "ApplyQFT: Length(qs) must be at least 1.");
        for i in length - 1..-1..0 {
            H(qs[i]);
            for j in 0..i - 1 {
                Controlled R1Frac([qs[i]], (1, j + 1, qs[i - j - 1]));
            }
        }
    }
```

This operation takes an argument of type `Qubit[]` and returns a value of type `Unit`. The annotation `is Adj + Ctl` in the declaration of `ApplyQFT` indicates that the operation supports both the `Adjoint` and the `Controlled` functor. (For more information, see [Operation characteristics](xref:microsoft.quantum.qsharp.operationsandfunctions#operation-characteristics)). The expression `Adjoint ApplyQFT` accesses the specialization that implements the adjoint of `ApplyQFT`, and `Controlled ApplyQFT` accesses the specialization that implements the controlled version of `ApplyQFT`.
In addition to the original operation's argument, the controlled version of an operation takes an array of control qubits and applies the original operation on the condition that all of these control qubits are in a |1⟩ state.

In theory, an operation for which an adjoint version can be defined should also have a controlled version and vice versa. In practice, however, it may be hard to develop an implementation for one or the other, especially for probabilistic implementations following a repeat-until-success pattern.
For that reason, Q# allows you to declare support for each functor individually. However, since the two functors commute, an operation that defines support for both also has to have an implementation (usually implicitly defined, meaning compiler-generated) for when both functors are applied to the operation.

There are no functors that can be applied to functions. Functions currently have exactly one body implementation and no further specializations. For example, the declaration

```qsharp
    function Hello (name : String) : String {
        $"Hello, {name}!"
    }
```

is equivalent to

```qsharp
    function Hello (name : String) : String {
        body ... {
            $"Hello, {name}!"
        }
    }
```

Here, `body` specifies that the given implementation applies to the default body of the function `Hello`, meaning the implementation is invoked when no functors or other factory mechanisms have been applied prior to invocation. The three dots in `body ...` correspond to a compiler directive indicating that the argument items in the function declaration should be copy and pasted into this spot.  

The reasons behind explicitly indicating where the arguments of the parent callable declaration are to be copied and pasted are twofold: one, it's unnecessary to repeat the argument declaration, and two, it ensures that functors that require additional arguments, like the `Controlled` functor, can be introduced in a consistent manner.

When there's exactly one specialization defining the implementation of the default body, the additional wrapping of the form `body ... { <implementation> }` may be omitted.

## Recursion

Q# callables can be directly or indirectly recursive and can be declared in any order; an operation or function may call itself, or it may call another callable that directly or indirectly calls the caller.

Stack space may be limited when running on quantum hardware, and recursions that exceed that stack space limit result in a runtime error.
