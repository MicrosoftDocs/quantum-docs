---
author: bradben
description: Understand the known issues of integrated hybrid programs with Q# and the QDK and supported hardware.
ms.date: 03/06/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Known issues for integrated hybrid computing
uid: microsoft.quantum.hybrid.troubleshooting
---

# Troubleshooting integrated hybrid issues

Developing and running integrated hybrid algorithms on the latest supported hardware is a new and quickly evolving field. This article outlines the tools and methods currently available, along with known issues, and is updated as new features are supported.

## Supported libraries

As of this release, not all libraries in the QDK support integrated hybrid programs. This table lists the common supported functions and operations.

| Function or operation | Library |
| --- | --- |
| SO WE NEED TO KEEP THIS TABLE? | TBD |
| TBD | TBD |
| TBD | TBD |

## Feature limitations and restrictions

The following table lists the currently known limitations and restrictions of the integrated hybrid feature set. Being aware of these limitations can help prevent errors as you explore integrated hybrid programs. This table is updated as the functionality is expanded.

| Item | Notes |
| --- | --- |
| **Compiler warnings** | By default, target-specific compiler errors are converted to warnings.  Be sure to validate your code on the simulator, emulator, or validator provided by the targeted hardware provider to detect issues prior to running on quantum hardware. |
| **Composite data types** | The use of composite data types, such as structure types, tuples, and sequential types, including arrays, isn't currently supported with integrated hybrid programs. This limitation also precludes the use of such data structures for callable values. Additionally, integrated programs can't use subroutines as first class values, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution. |
| **Unbounded loops or recursions** | Unbounded loops, and direct or indirect function recursions are out of scope for this release. |
| **Dynamic qubit allocations and access** | Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. |
| **Partial applications** | TBD<br>WHY - WHAT ARE THE RISKS OR LIMITATIONS? |
| **Arrays** | Use ranges rather than arrays, when possible.<br>WHY - WHAT ARE THE RISKS OR LIMITATIONS?  |
| **Integer support** | Current Quantinuum hardware support for integers is limited to 32-bit unsigned values, even though Q# integers are treated as 64-bit signed in the code. This limitation can affect some bitwise operations and comparisons. It's recommended to use positive integer values for integrated hybrid programs. |
| **Returning constant values** | TBD<br>WHY - WHAT ARE THE RISKS OR LIMITATIONS? |
| **Classical register limitations** | Each supported target has hardware-specific classical register counts, and your compilation may fail if the underlying program uses more classical registers than are available. These failures usually occur with loop structures. |

## Error messages and troubleshooting

### Compile error: Internal Error: Incomplete Compilation 

- Type: Error
- Source: Target compiler

This error most likely occurs because of a comparison operation between signed integers. Current hardware supports comparison operations for unsigned integers only.

### 1000: Compile error

- Type: Error
- Source: Target compiler

This error can occur for multiple scenarios:

- A comparison operation between signed integers. Current hardware supports comparison operations for unsigned integers only.
- The amount of classical registers exceeded what the hardware supports. Try to reduce the loop count or move logic from within the loop to the outside of the loop, if possible.
- An unbounded loop or a recursion was detected. Neither unbounded loops or recursion are supported.

### Warning QS5023: The target {0} doesn't support comparing measurement results.

- Type: Warning
- Source: Target compiler

TBD

### Warning QS5024: Measurement results cannot be compared here. The target {0} only supports comparing measurement results as part of the condition of an if- or elif-statement in an operation.

- Type: Warning
- Source: Target compiler

TBD

### Warning QS5025: A return statement cannot be used here. The target {0} doesn't support return statements in conditional blocks that depend on a measurement result.

- Type: Warning
- Source: Target compiler

TBD

### Warning QS5026: The variable "{0}" cannot be reassigned here. In conditional blocks that depend on a measurement result, the target {1} only supports reassigning variables that were declared within the block.

- Type: Warning
- Source: Target compiler

TBD

### Warning QS5027: The callable {0} requires runtime capabilities which are not supported by the target {1}.

- Type: Warning
- Source: Target compiler

TBD

### Warning QS5028: This construct requires a classical runtime capability that is not supported by the target

- Type: Warning
- Source: Target compiler

This warning indicates that the Q# program is using advanced classical features, which must be optimized out during [QIR](xref:microsoft.quantum.concepts.qir) processing. If this optimization cannot occur, the program execution may fail at a later compilation step.

### External call 'llvm.assume:void (i1)' isn't allowed for this adaptor (generic) / Fatal error: QIR isn't valid within the defined adaptor

- Type: Error
- Source: Target compiler

For some classical compute that is not compatible with the chosen target, the Azure Quantum service was unable to transform it into a classical or quantum instruction set.

<!--
## Errors: table option

| Message | Type | Source | Notes |
| --- | --- |--- | --- |
| Compile error: Internal Error: Incomplete Compilation | Error | Target compiler | Quantinuum hardware supports comparison operations for unsigned integers only. |
| Job ID \[JobID\] failed or was cancelled with the message: 1000: Compile error:  | Error | Target compiler |- Quantinuum hardware supports comparison operations for unsigned integers only.<br>- The amount of classical registers exceeded what the hardware supports. Try to reduce the loop count or move logic from within the loop to the outside of the loop, if possible.<br>- Neither unbounded loops or recursion are supported. |
| Warning QS5028: Warning QS5028: This construct requires a classical runtime capability that is not supported by the target  | Warning |Target compiler | This warning indicates that the Q# program is using advanced classical features, which must be optimized out during [QIR](xref:microsoft.quantum.concepts.qir) processing. If this optimization cannot occur, the program execution may fail at a later compilation step. |
| Job ID \[JobId\] failed or was cancelled with the message: <br>error - /controller/artifacts/labeledQir.bc:10257,61 - External call 'llvm.assume:void (i1)' isn't allowed for this adaptor (generic). <br>error - /controller/artifacts/labeledQir.bc:10257,61 - Fatal error: QIR isn't valid within the defined adaptor | Error | Target compiler | For some classical compute that is not compatible with the chosen target, the Azure Quantum service was unable to transform it into a classical or quantum instruction set. |


| Job ID \[JobID\] failed or was cancelled with the message: 1000: Compile error:  **Exceeded max allowed number of classical registers** | Error | Azure Quantum service | TBD |

| Warning QS5027: The callable {0} requires runtime capabilities which are not supported by the target {1}. | Warning |TBD | TBD |

| Warning QS5026: "The variable \"{0}\" cannot be reassigned here." + "In conditional blocks that depend on a measurement result, the target {1} only supports reassigning variables that were declared within the block." | Warning |TBD | TBD |

| Warning QS5025: "A return statement cannot be used here." + "The target {0} doesn't support return statements in conditional blocks that depend on a measurement result." | Warning |TBD | TBD |

| Warning QS5024: "Measurement results cannot be compared here." + "The target {0} only supports comparing measurement results as part of the condition of an if- or elif-statement in an operation." | Warning |TBD | TBD |

| Warning QS5023: "The target {0} doesn't support comparing measurement results." | Warning |TBD | TBD |

-->
