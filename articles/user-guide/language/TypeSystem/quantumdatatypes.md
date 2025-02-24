---
author: bradben
description: Learn about quantum data types in the Q# programming language.
ms.author: brbenefield
ms.date: 02/21/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Quantum data types in Q#
uid: microsoft.quantum.qsharp.quantumdatatypes
---

# Quantum-specific data types

This topic describes the `Qubit` type, along with two other types that are somewhat specific to the quantum domain: `Pauli` and `Result`.

## Qubit

Q# treats qubits as opaque items that can be passed to both functions and operations, but can only be interacted with by passing them to instructions that are native to the targeted quantum processor. Such instructions are always defined in the form of operations, since their intent is to modify the quantum state.
The restriction that functions can't modify the quantum state, despite the fact that qubits can be passed as input arguments, is enforced by the requiring that functions can only call other functions, and can't call operations.

The Q# libraries are compiled against a standard set of intrinsic operations, meaning operations which have no definition for their implementation within the language.
Upon targeting, the implementations that express them in terms of the instructions that are native to the execution target are linked in by the compiler.
A Q# program thus combines these operations as defined by a target machine to create new,
higher-level operations to express quantum computation.
In this way, Q# makes it very easy to express the logic underlying quantum and hybrid quantum-classical
algorithms, while also being very general with respect to the structure of a target machine and its
realization of quantum state.

Within Q# itself, there is no type or construct in Q# that represents the quantum state.
Instead, a qubit represents the smallest addressable physical unit in a quantum computer.
As such, a qubit is a long-lived item, so Q# has no need for linear types.
Hence, we don't explicitly refer to the state within Q#,
but rather describe how the state is transformed by the program, for example, via the application of operations such as `X` and `H`.
Similar to how a graphics shader program accumulates a description of transformations to each vertex, a quantum program in Q# accumulates transformations to quantum states,
represented as entirely opaque references to the internal structure of a target machine.

A Q# program has no ability to introspect into the state of a qubit,
and thus is entirely agnostic about what a quantum state is or on how it is realized.
Rather, a program can call operations such as `Measure` to learn information about the quantum state of the computation.

## Pauli

Values of type `Pauli` specify a single-qubit Pauli operator; the possibilities are `PauliI`, `PauliX`, `PauliY`, and `PauliZ`. `Pauli` values are used primarily to specify the basis for a quantum measurement.

## Result

The `Result` type specifies the result of a quantum measurement. Q# mirrors most quantum hardware by providing measurements in products of single-qubit Pauli operators; a `Result` of `Zero` indicates that the +1 eigenvalue was measured, and a `Result` of `One` indicates that the -1 eigenvalue was measured. That is, Q# represents eigenvalues by the power to which -1 is raised.
This convention is more common in the quantum algorithms community, as it maps more closely to classical bits.
