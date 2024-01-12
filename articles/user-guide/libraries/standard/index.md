---
author: bradben
description: Learn about the Microsoft Q# standard library that define the operations, functions and data types used in quantum programs.
ms.author: brbenefield
ms.date: 11/27/2023
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Introduction to Microsoft Q# standard libraries
uid: microsoft.quantum.libraries.overview.standard.intro
---

# Introduction to the Q# standard library

Q# is supported by a range of different useful operations, functions, and user-defined types that comprise the Q# *standard library*, which is installed by default with the Azure Quantum Development Kit. 

The symbols defined by the Q# standard library are defined in much greater and more exhaustive detail in the [API documentation](xref:microsoft.quantum.apiref-intro).

[!INCLUDE [Copilot in Azure Quantum banner](../../../includes/copilot-banner.md)]

This section describes the most salient features of each part of the standard library and how each feature might be used in practice. 

## Prelude

The [prelude](xref:microsoft.quantum.libraries.overview.standard.prelude) provides a set of essential and very useful functions and operations that can be used when writing quantum programs in Q#.

For example, the [`Microsoft.Quantum.Intrinsic`](xref:Microsoft.Quantum.Intrinsic) namespace includes the Pauli operators ([X](xref:Microsoft.Quantum.Intrinsic.X), [Y](xref:Microsoft.Quantum.Intrinsic.Y) and [Z](xref:Microsoft.Quantum.Intrinsic.Z), the [Hadamard operation](xref:Microsoft.Quantum.Intrinsic.H), rotation operations such as [S](xref:Microsoft.Quantum.Intrinsic.S), [T](xref:Microsoft.Quantum.Intrinsic.T) and the general [R](xref:Microsoft.Quantum.Intrinsic.R) operation. You can also find two-qubit operations such as the [CNOT](xref:Microsoft.Quantum.Intrinsic.CNOT) and [SWAP](xref:Microsoft.Quantum.Intrinsic.SWAP) operations. This section also defines the [Measure](xref:Microsoft.Quantum.Intrinsic.Measure) operation which performs a joint measurement of one or more qubits. 

## Classical mathematics

The standard library offer the possibility of doing [classical mathematics](xref:microsoft.quantum.libraries.overview.math). The [`Microsoft.Quantum.Math`](xref:Microsoft.Quantum.Math) namespace contains classical mathematical functions and data types, which are primarily used to work with the Q# built-in data types `Int`, `Double`, and `Range`.
 
## Type conversions

Q# is a strongly-typed language, which implies that Q# does not implicitly cast between distinct types. You can use the standard library to perform [type conversions](xref:microsoft.quantum.libraries.overview.convert). The [`Microsoft.Quantum.Convert`](xref:Microsoft.Quantum.Convert) namespace contains functions for converting between various Q# data types, for example the [BoolAsResult](xref:Microsoft.Quantum.Convert.BoolAsResult) function converts a `Bool` type to a `Result` type, where `true` is mapped to `One` and `false` is mapped to `Zero`.

## Higher-order control flow

You can use the standard library to manage [higher-order control flow](xref:microsoft.quantum.libraries.overview-standard.control-flow). For example, the [`Microsoft.Quantum.Canon`](xref:Microsoft.Quantum.Canon) namespace provides a variety of different flow control constructs to express high-level algorithmic as quantum programs easier.

## Data structures and modeling

The standard library allows working with [data structures and modeling](xref:microsoft.quantum.libraries.overview.data-structures). The [`Microsoft.Quantum.Canon`](xref:Microsoft.Quantum.Canon) namespace provides operations, functions, and types for working with classical data, such as pairs and arrays. 

This section also includes two quantum oracles, *Amplitude Amplification* and *Phase Estimation*. The [`Microsoft.Quantum.Oracles`](xref:Microsoft.Quantum.Oracles) namespace  provides user-defined types that are used to label the different oracle representations in a type-safe way, making it difficult to accidentally conflate different kinds of black box operations.

## Quantum algorithms

With the standard library you can write some of the common and very useful  [quantum algorithms](xref:microsoft.quantum.libraries.overview.standard.algorithms). For example, the [`Microsoft.Quantum.Canon`](xref:Microsoft.Quantum.Canon) namespace provides the [ApproximateQFT](xref:Microsoft.Quantum.Canon.ApproximateQFT) operation, which is an approximate generalization of the Quantum Fourier Transform.

## Diagnostics

The standard library allows different ways to [diagnose](xref:microsoft.quantum.libraries.overview.diagnostics) mistakes and errors in quantum programs. For example, the [`Microsoft.Quantum.Diagnostics`](xref:Microsoft.Quantum.Diagnostics) namespace provides many operators for testing and debugging.

## Characterization

You can use the standard library to [characterize](xref:microsoft.quantum.libraries.overview.characterization) the effects of operations in order to develop useful quantum algorithms. Since every measurement of a quantum system yields at most one bit of information, the aim is less to learn classical information about the system, rather than to perform a unitary transformation on a state vector. 

## Error correction

One of the most known applications of quantum computing is [quantum error correction](xref:microsoft.quantum.libraries.overview.error-correction). The [`Microsoft.Quantum.Canon`](xref:Microsoft.Quantum.Canon) namespace provides several distinct user-defined types for building error correcting codes.

## Applications 

[Applications](xref:microsoft.quantum.libraries.overview.applications) describes some other applications of quantum computing that can be performed using Q#, such as the simulation of algorithms and Hamiltonians, and Shor's algorithm.


