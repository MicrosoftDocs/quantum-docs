---
author: bradben
description: Overview of the standard and numerics libraries included in the Quantum Development Kit (QDK).
ms.author: brbenefield
ms.date: 11/27/2023

ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, target, targets]
title: Quantum Development Kit Libraries
uid: microsoft.quantum.libraries.overview
---

# The Q# Libraries

The Quantum Development Kit (QDK) provides the following libraries to use in your Q# projects.

| Q# Library  | Notes |
|---------|---------|--------|
| [Q# standard library](xref:microsoft.quantum.libraries.overview.standard.intro) | Included by default |
| [Quantum numerics library](xref:microsoft.quantum.libraries-numerics.usage) |  |

[!INCLUDE [Copilot in Azure Quantum banner](../../includes/copilot-banner.md)]

## Standard library

The `Microsoft.Quantum.Sdk` package installed during [installation](xref:microsoft.quantum.install-qdk.overview) automatically provides the Q# standard library. The standard library provides a set of essential and very useful functions and operations that can be used when writing quantum programs in Q#.

The functionality of the standard library includes classical mathematics, type conversions between various Q# data types, diagnostic of mistakes and errors in quantum programs, quantum error correction, characterization of the effects of operations in order to develop useful quantum algorithms, and many more features. 

For more information, see [Standard Library](xref:microsoft.quantum.libraries.overview.standard.intro).


## Quantum numerics library

Many quantum algorithms rely on [oracles](xref:microsoft.quantum.concepts.oracles) that evaluate mathematical functions on a superposition of inputs.
The main component of Shor's algorithm, for example, evaluates $f(x) = a^x\operatorname{mod} N$ for a fixed $a$, the number to factor $N$, and $x$ a $2n$-qubit integer in a uniform superposition over all $2n$-bit strings.

To run Shor's algorithm on an actual quantum computer, this function has to be written in terms of the native operations of the target machine.
Using the binary representation of $x$ with $x_i$ denoting the $i$-th bit counting from the least-significant bit, $f(x)$ can be written as $f(x) = a^{\sum_{i=0}^{2n-1} x_i 2^i} \operatorname{mod} N$.

In turn, this can be written as a product (mod N) of terms $a^{2^i x_i}=(a^{2^i})^{x_i}$. The function $f(x)$ can thus be implemented using a sequence of $2n$ (modular) multiplications by $a^{2^i}$ conditional on $x_i$ being nonzero. The constants $a^{2^i}$ can be precomputed and reduced modulo N before running the algorithm.

This sequence of controlled modular multiplications can be simplified further: Each multiplication can be performed using a sequence of $n$ controlled modular additions; and each modular addition can be built from a regular addition and a comparator.

Given that so many steps are necessary to arrive at an actual implementation, it would be extremely helpful to have such functionality available from the start.
This is why the Quantum Development Kit provides support for a wide range of numerics functionality.

Besides the integer arithmetic mentioned thus far, the [numerics library](xref:microsoft.quantum.libraries-numerics.usage) provides:

- (Un)signed integer functionality (multiply, square, division with remainder, inversion, ...) with one or two quantum integer numbers as input.
- Fixed-point functionality (add / subtract, multiply, square, 1/x, polynomial evaluation) with one or two quantum fixed-point numbers as input.

## Next Steps

Sources of the libraries as well as code samples can be obtained from GitHub. See [Licensing](xref:microsoft.quantum.libraries.overview.licensing) for further information. Note that package references ("binaries") are available also for the libraries and offer another way of including the libraries in projects.

- [Standard libraries](xref:microsoft.quantum.libraries.overview.standard.intro)
- [Quantum numerics library](xref:microsoft.quantum.libraries-numerics.usage)
