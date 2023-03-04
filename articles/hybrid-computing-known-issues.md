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

Developing and running integrated hybrid algorithms on the latest supported hardware is a new and quickly evolving field. This article outlines the tools and methods currently available, along with known issues, and will be updated as new features are supported.

## Supported libraries

As of this release, not all libraries in the QDK support integrated hybrid programs. This table lists the common supported functions and operations.

| Function or operation | Library |
| --- | --- |
| TBD | TBD |
| TBD | TBD |
| TBD | TBD |

## Feature limitations and restrictions

The following table lists the currently known limitations and restrictions of the integrated hybrid feature set. Being aware of these limitations can help prevent errors as you explore integrated hybrid programs. This table will be updated as the functionality is expanded.

| Item | Notes |
| --- | --- |
| **Compiler warnings** | By default, target-specific errors compiler errors are converted to warnings.  Be sure to validate your code on the simulator, emulator, or validator provided by the targeted hardware provider to detect issues prior to running on quantum hardware. |
| **Composite data types** | The use of composite data types, such as structure types, tuples, and sequential types, including arrays, is not currently supported. This limitation also precludes the use of such data structures for callable values. Additionally, the use of subroutines as first class values is not currently supported, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution. |
| **Unbounded loops or recursions** | Unbounded loops, and direct or indirect function recursions are out of scope for this release. |
| **Dynamic qubit allocations and access** | Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. |
| **Partial applications** | TBD |
| **Arrays** | Use ranges rather than arrays, when possible. TBD |
| **Integer support** | Current Quantinuum hardware support for integers is limited to 32-bit unsigned values, even though Q# integers are treated as 64-bit signed in the code. This can affect some bitwise operations and comparisons. It is recommended to use positive integer values for integrated hybrid programs. |
| **Returning constant values** | TBD |
| **Classical register limitations** | Each supported target has hardware-specific classical register counts, and your compilation may fail if the underlying program uses more classical registers than are available. This will usually manifest itself with loop structures. |

## Error messages and troubleshooting

The following table lists error messages you may encounter when compiling and submitting integrated hybrid programs.  


| Message | Type | Source | Notes |
| --- | --- |--- | --- |
| Compile error: Internal Error: Incomplete Compilation | Error | Quantinuum compiler | The Quantinuum hardware does not support comparison operations for signed integers. |
| Warning QS5028: This construct requires a classical runtime capability that is not supported by the target Unspecified: **repeat or while loop.** | Warning |Quantinuum compiler | TBD |
| Warning QS5028: This construct requires a classical runtime capability that is not supported by the target Unspecified: **conditional expression or mutable variable in a constant context.** | Warning |Quantinuum compiler | TBD |
| Job ID \[JobId\] failed or was cancelled with the message: error - /controller/artifacts/labeledQir.bc:10257,61 - External call 'llvm.assume:void (i1)' is not allowed for this adaptor (generic). error - /controller/artifacts/labeledQir.bc:10257,61 - Fatal error: QIR is not valid within the defined adaptor | Error |After job submission | TBD |
| Warning QS5028: This construct requires a classical runtime capability that is not supported by the target Unspecified: fail statement. | Warning |Quantinuum compiler | TBD |
| Job ID \[JobID\] failed or was cancelled with the message: 1000: Compile error:  **Internal Error: Incomplete Compilation** | Error |After job submission | TBD |
| Job ID \[JobID\] failed or was cancelled with the message: 1000: Compile error:  **Exceeded max allowed number of classical registers** | Error |After job submission | TBD |
| Warning QS5027: The callable {0} requires runtime capabilities which are not supported by the target {1}. | Warning |TBD | TBD |
| Warning QS5026: "The variable \"{0}\" cannot be reassigned here." + "In conditional blocks that depend on a measurement result, the target {1} only supports reassigning variables that were declared within the block." | Warning |TBD | TBD |
| Warning QS5025: "A return statement cannot be used here." + "The target {0} does not support return statements in conditional blocks that depend on a measurement result." | Warning |TBD | TBD |
| Warning QS5024: "Measurement results cannot be compared here." + "The target {0} only supports comparing measurement results as part of the condition of an if- or elif-statement in an operation." | Warning |TBD | TBD |
| Warning QS5023: "The target {0} does not support comparing measurement results." | Warning |TBD | TBD |