---
title: How to use Q# callables in Python
description: Learn how to pass Q# functions, operations, and closures between Q# and Python, and use callable arguments with QDK simulation, compilation, and circuit APIs.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/02/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["Microsoft Quantum Development Kit", "QDK", "Q#", "Python", "Jupyter Notebook", "Quantum Intermediate Representation", "QIR", "Azure Quantum"]
ai-usage: ai-assisted
uid: microsoft.quantum.how-to.qsharp-callables-python
# Customer intent: As a quantum developer, I want to compose Q# programs from Python so that I can reuse routines without constructing Q# source strings.
---

# How to use Q# callables in Python

With the Microsoft Quantum Development Kit (QDK), you can pass Q# functions and operations between Q# and Python as objects. A Q# function or operation is called a *callable*. Instead of building a Q# expression string for each combination of routines and parameters, you can select a callable in Python and pass it to another Q# callable.

You can also return a callable from Q# to Python, including a *closure* that captures values from the Q# code that created it. Use these callable objects as arguments to Q# routines or as entry points for QDK simulation, compilation, and circuit visualization.

The examples in this article use a state preparation workflow: choose an operation that prepares a qubit, and then pass it to a reusable measurement routine.

## Prerequisites

- Python 3.10 or later.
- The QDK Python package. For installation instructions, see [Set up the Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).
- A Jupyter Notebook environment, if you want to run the examples in a notebook instead of a Python file. This environment is optional.

Run the examples in order and in the same Python session.

## Pass Q# callables from Python

When you define Q# callables, the QDK adds Python wrappers for them to the `qdk.code` module. Import the wrappers after you load the Q# definitions. You can call a wrapper directly or pass the callable itself as an argument without parentheses. A direct wrapper call runs the Q# callable once on the sparse simulator, just like a call through `qsharp.eval`.

To load callables from a Q# project instead of defining them with `qsharp.eval`, use a `qsharp.json` project. Then import the callables from the corresponding namespace in `qdk.code`. For project setup, see [How to create and manage Q# projects and custom libraries](xref:microsoft.quantum.qsharp-projects).

### Pass an operation

Initialize a QIR target profile and define two Q# operations. The `Base` target profile supports the QIR compilation example later in this article.

The `PreparePlus` operation applies a Hadamard gate to a qubit. The `RunPreparation` operation accepts a preparation operation, allocates a qubit, applies the preparation, and then measures and resets the qubit.

```python
from qdk import qsharp

qsharp.init(target_profile=qsharp.TargetProfile.Base)

qsharp.eval("""
    operation PreparePlus(q : Qubit) : Unit {
        H(q);
    }

    operation RunPreparation(prepare : Qubit => Unit) : Result {
        use q = Qubit();
        prepare(q);
        MResetZ(q)
    }
""")

from qdk.code import PreparePlus, RunPreparation

print(qsharp.run(RunPreparation, 5, PreparePlus))
```

This call passes `PreparePlus` to `RunPreparation` and runs five shots. Each shot returns one measurement result, with an equal probability of `Zero` or `One`.

The parameter type `Qubit => Unit` requires an operation that accepts a qubit and returns no value. Python passes the operation, not the qubit. The `RunPreparation` operation supplies the qubit inside Q#.

### Pass a function

Functions use the same passing syntax. For example, here's how to convert a list of rotation angles from degrees to radians:

```python
qsharp.eval("""
    function DegreesToRadians(angle : Double) : Double {
        angle * Std.Math.PI() / 180.0
    }

    function ConvertAngles(convert : Double -> Double, angles : Double[]) : Double[] {
        Std.Arrays.Mapped(convert, angles)
    }
""")

from qdk.code import DegreesToRadians, ConvertAngles

print(ConvertAngles(DegreesToRadians, [0.0, 90.0, 180.0]))
```

The result is a list of angles in radians. `ConvertAngles` applies the supplied `DegreesToRadians` function to each angle.

## Get a callable value from Q\#

Use `qsharp.eval` to evaluate an expression whose result is a callable. For example, evaluate the name `PreparePlus` without calling it:

```python
prepare_plus = qsharp.eval("PreparePlus")

print(qsharp.run(RunPreparation, 5, prepare_plus))
```

`PreparePlus`, imported from `qdk.code`, is a Python wrapper for the Q# operation. `prepare_plus`, returned by `qsharp.eval("PreparePlus")`, is a reference to that same operation. You can pass either object to `RunPreparation`, but you can't call `prepare_plus` directly as a Python function.

The `qsharp.run` call runs `RunPreparation` for five shots and passes `prepare_plus` to its Q# parameter `prepare`. On each shot, `RunPreparation` allocates a qubit, invokes `PreparePlus` through `prepare(q)`, and then measures and resets the qubit.

A callable reference can also be an entry point when its inputs and output support Python conversion. Here, `RunPreparation` is the entry point because `PreparePlus` needs a qubit that's supplied inside Q#.

## Return a closure to Python

A Q# function can return an operation that captures a value. Define `MakeRotation` to return a Y-rotation operation, then pass the returned closure to the same `RunPreparation` routine:

```python
qsharp.eval("""
    function MakeRotation(angle : Double) : Qubit => Unit {
        q => Ry(angle, q)
    }
""")

from qdk.code import MakeRotation

rotation = MakeRotation(0.5)
print(qsharp.run(RunPreparation, 5, rotation))
```

The returned operation captures the angle `0.5` radians. Calling `MakeRotation` creates the operation; it doesn't apply a gate. `RunPreparation` supplies a qubit and invokes the operation during each shot.

Like the callable reference from `qsharp.eval`, a returned closure isn't a directly callable Python function. This closure also needs a qubit, which Python can't supply. Pass it to `RunPreparation` so that qubit allocation and use stay inside Q#.

The closure captures only an angle, not a qubit, so it works with a fresh qubit on each shot.

Callable values can also appear in tuples, arrays, and Q# struct fields that pass between Q# and Python. These values remain references to Q# code, including any captured values.

## Pass a partially applied operation

Partial application creates a callable by supplying some arguments and leaving others unspecified. In Q#, use `_` for an argument that the new callable receives later.

Create the same Y-rotation operation as `MakeRotation` without calling the factory function:

```python
rotation_from_expression = qsharp.eval("Ry(0.5, _)")

print(qsharp.run(RunPreparation, 5, rotation_from_expression))
```

The expression captures the rotation angle but leaves the qubit argument unspecified. The resulting operation accepts a qubit and returns `Unit`, which matches the parameter of `RunPreparation`.

Use a Q# lambda expression or partial application to build a callable in Q#, and then keep the result in Python. You don't need a new top-level Q# declaration for each combination of arguments.

## Compile and visualize a program with callable arguments

Pass the same callable objects and Q# arguments to `qsharp.compile` and `qsharp.circuit`. These APIs don't take a shot count.

```python
program = qsharp.compile(RunPreparation, rotation)
circuit = qsharp.circuit(RunPreparation, rotation)

print(circuit)
```

These calls use the closure returned by `MakeRotation`. You can also pass `PreparePlus` or `rotation_from_expression`.

The `program` object has the compiled program in Quantum Intermediate Representation (QIR). Use `str(program)` to get the QIR text. The `circuit` object represents the preparation, measurement, and reset operations.

These calls don't submit a job to Azure Quantum. The program must still meet the requirements of the selected target profile and the destination target. For more information, see [Azure Quantum QIR target profiles in the QDK](xref:microsoft.quantum.target-profiles).

To get logical resource counts, pass callable arguments to `qsharp.logical_counts`.

## Usage guidelines

- Use callables defined in Q#. Import wrappers from `qdk.code`, or get Q# callable references and closures. Ordinary Python functions and lambdas can't serve as Q# callable arguments.
- Match the expected type. Check the callable's input and output types, plus any required `Adjoint` or `Controlled` support.
- Keep qubits and Q# ranges inside Q#. Pass the callable that uses them instead of the values themselves. When you call Q# code from Python, make sure its arguments and return value support Python conversion.
- Specify concrete types for generic routines. Define a Q# wrapper with specific input and output types instead of relying on Python to infer Q# type parameters.
- Reuse callables within their original Q# context. After another `qsharp.init` call, reload your Q# definitions and get fresh callable objects.

## Related content

- [Functions and operations in Q#](xref:microsoft.quantum.qsharp.operationsandfunctions)
- [Closures in Q#](xref:microsoft.quantum.qsharp.closures)
