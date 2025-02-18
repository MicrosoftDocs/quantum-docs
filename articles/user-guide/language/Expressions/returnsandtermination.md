---
author: bradben
description: Learn about using the 'return' and 'fail' statements in Q# to end a subroutine or program.
ms.author: brbenefield
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: The return and fail statements in Q#
uid: microsoft.quantum.qsharp.returnsandtermination
---

# Returns and termination

There are two expressions available that conclude the execution of the current subroutine or the program; the `return` and the `fail` expressions. Generally, callables may end their execution before executing all of their statements with a `return` or `fail` expression. A `return` expression just ends the execution of the current callable, while a `fail` ends the execution of the whole program and result in a runtime error.

## Return expression

The `return` expression exits from the current callable and returns control to the callee. It changes the context of the execution by popping a stack frame.

The expression always returns a value to the context of the callee; it consists of the keyword `return`, followed by an expression of the appropriate type. The return value is evaluated before any terminating actions are performed and control is returned. Terminating actions include, for example, cleaning up and releasing qubits that are allocated within the context of the callable. When running on a simulator or validator, terminating actions often also include checks related to the state of those qubits. For example, they may check whether they are properly disentangled from all qubits that remain live.

The `return` expression at the end of a callable that returns a `Unit` value may be omitted. In that case, control is returned automatically when all statements complete and all terminating actions performed. Callables may contain multiple `return` expressions, albeit the adjoint implementation for operations containing multiple `return` expressions can't be automatically generated.

For example,

```qsharp
return 1;
```

or

```qsharp
return ();
```

## Fail expression

The `fail` expression ends the computation entirely. It corresponds to a fatal error that aborts the program.

It consists of the keyword `fail`, followed by an expression of type `String`.
The `String` should provide information about the encountered failure.

For example,

```qsharp
fail "Impossible state reached";
```

or, using an [interpolated string](xref:microsoft.quantum.qsharp.valueliterals#string-literals),

```qsharp
fail $"Syndrome {syn} is incorrect";
```

In addition to the given `String`,  a `fail` expression ideally collects and permits the retrieval of information about the program state. This facilitates diagnosing and remedying the source of the error, and requires support from the executing runtime and firmware, which may vary across different targets.

