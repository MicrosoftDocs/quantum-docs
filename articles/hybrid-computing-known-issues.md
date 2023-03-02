---
author: bradben
description: Understand the known issues of integrated hybrid programs with Q# and the QDK and supported hardware.
ms.date: 03/02/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Known issues for integrated hybrid computing
uid: microsoft.quantum.hybrid.known-issues
---

# Integrated hybrid known issues

Developing and running integrated hybrid algorithms on the latest supported hardware is a new and quickly evolving field. These article outlines the tools and methods currently available, along with known issues, and will be updated as new features are supported.

## Supported libraries

As of this release, not all libraries in the QDK support integrated hybrid programs. This table lists the common supported functions and operations.

| Function or operation | Library |
| --- | --- |
| TBD | TBD |
| TBD | TBD |
| TBD | TBD |

## Compiler warnings

By default, target-specific errors compiler errors are converted to warnings.  Be sure to validate your code on the simulator, emulator, or validator provided by the targeted hardware provider to detect issues prior to running on quantum hardware.

## Composite data types

The use of composite data types such as structure types, tuples, and sequential types, including arrays, is not currently supported. This also precludes the use of such data structures for callable values. Additionally, the use of subroutines as first class values is not currently supported, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution.

## Unbounded loops or recursions

Unbounded loops, and direct or indirect function recursions are out of scope for this release.

## Dynamic qubit allocations and access

Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. 

## Avoid partial applications

TBD

## Use ranges rather than arrays when possible

TBD

## Integer support

Current integer support is limited to 32-bit unsigned values, even though Q# integers are treated as 64-bit signed in the code. This can affect some bitwise operations and comparisons. It is recommended to use positive values when using hybrid integer support.

## Returning constant values

TBD

## Loops and classical register limitations

Each supported target has hardware-specific classical register counts, and your compilation may fail if the underlying program uses more classical registers than are available.

## Error messages and troubleshooting

TBD - list of error messages and actions for known/common scenarios. 
