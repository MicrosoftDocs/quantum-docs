---
author: bradben
description: Understand the known issues of integrated hybrid programs with Q# and the QDK and supported hardware.
ms.date: 02/21/2023
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

## Adaptive Profile

In addition to the [QIR Alliance Profile B: Basic Measure Feedback](https://github.com/qir-alliance/qir-spec/blob/main/specification/v0.1/7_Profiles.md#profile-b-basic-measurement-feedback) profile, Quantinuum hardware also supports various elements of the upcoming [Adaptive Profile](https://github.com/qir-alliance/.github/pull/31), which supports defining and executing quantum programs that permit for limited classical computations and control flow during execution.

### Limitations

The following are currently not supported by the Adaptive Profile:

- **Composite data types** - The use of composite data types such as structure types, such as tuples, and sequential types, including arrays, is not supported within an Adaptive Profile. This also precludes the use of such data structures for callable values. For example, the usage of subroutines as first class values is not supported within the Adaptive Profile, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution.
- **Unbounded loops or recursions** - The Adaptive Profile requires that any profile compliant program is known to terminate. That is, it must be possible to statically bind resources and schedule QPU instructions. Supporting direct or indirect function recursions is out of scope for the Adaptive Profile.
- **Dynamic qubit allocations and access** - Within the Base Profile, all qubit uses refer directly to a unique qubit ID (requires an update of the full specification as part of this workstream). Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. Dynamic qubit access is further prevented by prohibiting classical computations and branching that are based on measurement results.

## Supported libraries

As of this release, not all libraries in the QDK support the Adaptive Profile. This table lists the common supported functions and operations.

| Function or operation | Library |
| --- | --- |
| TBD | TBD |
| TBD | TBD |
| TBD | TBD |

## Compiler warnings

By default, target-specific errors compiler errors are converted to warnings.  Be sure to validate your code on the simulator, emulator, or validator provided by the targeted hardware provider to detect issues prior to running on quantum hardware.

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
