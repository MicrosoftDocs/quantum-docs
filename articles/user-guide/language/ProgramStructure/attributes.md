---
author: azure-quantum-content
description: Learn about the built-in attributes that you can apply to declarations in the Q# programming language.
ms.author: quantumdocwriters
ms.date: 06/24/2026
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Attributes in Q#
uid: microsoft.quantum.qsharp.attributes
---

# Attributes

Attributes attach extra information to a declaration that the Q# compiler uses to change how the declaration is processed. An attribute is written with a leading `@` symbol, followed by the attribute name and a parenthesized argument list, and it's placed immediately before the declaration it applies to.

```qsharp
@EntryPoint()
operation Main() : Result {
    use q = Qubit();
    H(q);
    MResetZ(q)
}
```

You can apply more than one attribute to the same declaration by placing each attribute on its own line before the declaration.

Q# supports the following built-in attributes.

## @EntryPoint()

The `@EntryPoint()` attribute marks an operation or function as the starting point of a program's execution. If you don't specify an entry point, the compiler starts execution from the `Main()` operation, if one exists. You can place the `@EntryPoint()` attribute on any callable that takes no input parameters to make it the entry point instead.

```qsharp
@EntryPoint()
operation MeasureOneQubit() : Result {
    use q = Qubit();
    H(q);
    MResetZ(q)
}
```

When you work in a single `.qs` file that isn't part of a Q# project, you can also pass a target profile name to the attribute, such as `@EntryPoint(Base)`, `@EntryPoint(Adaptive_RI)`, `@EntryPoint(Adaptive_RIF)`, or `@EntryPoint(Unrestricted)`, to set the QIR target profile for the program. For more information, see [Quantum computing target profiles](xref:microsoft.quantum.target-profiles).

## @Config(...)

The `@Config(...)` attribute provides pre-processing information about when a declaration should be included in compilation, based on the capabilities of the current [target profile](xref:microsoft.quantum.target-profiles). This lets a library provide different implementations of a callable for targets with different capabilities.

Valid arguments are `Base`, `Adaptive`, `IntegerComputations`, `FloatingPointComputations`, `BackwardsBranching`, `HigherLevelConstructs`, and `Unrestricted`. You can negate an argument with the `not` operator to include the declaration only when the capability *isn't* available.

```qsharp
@Config(Adaptive)
operation MeasureAndReset(q : Qubit) : Result {
    let result = M(q);
    if result == One {
        X(q);
    }
    result
}

@Config(not Adaptive)
operation MeasureAndReset(q : Qubit) : Result {
    MResetZ(q)
}
```

## @Test()

The `@Test()` attribute turns a callable into a unit test. You can apply it only to a callable that takes no input parameters. Tests marked with this attribute appear in the **Testing** view in Visual Studio Code, where you can run them individually or as a group. For more information, see [Testing and debugging Q# programs](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging).

```qsharp
@Test()
operation TestCase() : Unit {
    Fact(1 + 1 == 2, "Expected 1 + 1 to equal 2.");
}
```

## Attributes for intrinsic callables

The following attributes describe how an intrinsic callable is treated during [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir) code generation. They're primarily used by library and hardware authors who define low-level intrinsic operations.

### @SimulatableIntrinsic()

The `@SimulatableIntrinsic()` attribute indicates that a callable should be treated as an intrinsic callable for QIR code generation, while the body that you provide is used only during simulation. This lets you supply a simulation implementation for an operation that's otherwise opaque to the target hardware.

### @Measurement()

The `@Measurement()` attribute indicates that an intrinsic callable is a measurement. The operation is marked as *irreversible* in the generated QIR, and the output `Result` value is moved to the arguments of the generated function.

### @Reset()

The `@Reset()` attribute indicates that an intrinsic callable is a reset. The operation is marked as *irreversible* in the generated QIR.
