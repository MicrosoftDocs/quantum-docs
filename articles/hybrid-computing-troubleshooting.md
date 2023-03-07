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

## Feature limitations and restrictions

The following table lists the currently known limitations and restrictions of the integrated hybrid feature set. Being aware of these limitations can help prevent errors as you explore integrated hybrid programs. This table is updated as the functionality is expanded.

| Item | Notes |
| --- | --- |
| **Supported libraries** | As of this release, not all libraries in the QDK support integrated hybrid programs. |
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

- [Incomplete compilation](#incomplete-compilation)
- [Exceeded max allowed number of classical registers](#exceeded-max-allowed-number-of-classical-registers)
- [Warning QS5023](#warning-qs5023)
- [Warning QS5024](#warning-qs5024)
- [Warning QS5025](#warning-qs5025)
- [Warning QS5026](#warning-qs5026)
- [Warning QS5027](#warning-qs5027)
- [Warning QS5028](#warning-qs5028)
- [QIR isn't valid within the defined adaptor](#qir-isnt-valid-within-the-defined-adaptor)

#### Incomplete compilation 

- Error code: **honeywell - 1000**
- Error message: **1000: Compile error: Internal Error: Incomplete Compilation** 
- Type: **Job error**
- Source: **Target compiler**

This error can occur when a program that implements any of the following scenarios is submitted: 

- An unsupported integer comparison. 

    ```qsharp
    operation IntegerComparisons() : Bool[] { 
        use register = Qubit[2]; 
        mutable i = 0; 
        if (MResetZ(register[0]) == Zero) { 
            set i += 1; 
        } 
        mutable j = 0; 
        if (MResetZ(register[1]) == One) { 
            set j += 1; 
        } 
        let logicalResults = [ 
            // Supported: equality comparisons with non-negative constants. 
            i == 0, 
            // Supported: equality comparisons between integer variables. 
            i == j, 
            // Not supported: equality comparisons with negative constants. 
            i == -1, 
            // Not supported: non-equality integer comparisons. 
            i < 0, 
            i <= i, 
            i > 0, 
            i >= j 
        ]; 
        return logicalResults; 
    } 
    ```

- Unsupported loops that depend on qubit measurement results. 

    ```qsharp
    operation UnboundedLoops() : Result { 
        use q = Qubit(); 
        H(q); 
        use t = Qubit(); 
        repeat { 
            X(t); 
            H(q); 
        } 
        until MResetZ(q) == One; 
        return MResetZ(t); 
    } 
    ```

#### Exceeded max allowed number of classical registers 

- Error code: **honeywell - 1000**
- Error message: **1000: Compile error: Exceeded max allowed number of classical registers** 
- Type: **Job error**
- Source: **Target compiler**

This error can occur when a program that requires a significant number of classical registers is submitted. Some patterns that can cause this issue are **for** loops with many iterations, deeply nested **if** statements, and a large number of qubit measurements. 

```qsharp
operation ClassicalRegisterUsage() : Result { 
    use q = Qubit(); 
    use t = Qubit(); 
    mutable count = 0; 
    for _ in 1 .. 100 { 
        H(q); 
        if (MResetZ(q) == One) { 
            X(t); 
        } 
        if (MResetZ(t) == One) { 
            set count += 1; 
        } 
    } 
    return MResetZ(t); 
} 
```

#### Warning QS5023

- Error code: **Warning QS5023**
- Error message: **The target {0} doesn't support comparing measurement results** 
- Type: **Warning**
- Source: **Target compiler**

TBD

#### Warning QS5024

- Error code: **Warning QS5024**
- Error message: **Measurement results cannot be compared here. The target {0} only supports comparing measurement results as part of the condition of an if- or elif-statement in an operation.** 
- Type: **Warning**
- Source: **Target compiler**

TBD

#### Warning QS5025

- Error code: **Warning QS5025**
- Error message: **A return statement cannot be used here. The target {0} doesn't support return statements in conditional blocks that depend on a measurement result.** 
- Type: **Warning**
- Source: **Target compiler**

TBD

#### Warning QS5026

- Error code: **Warning QS5026**
- Error message: **The variable "{0}" cannot be reassigned here. In conditional blocks that depend on a measurement result, the target {1} only supports reassigning variables that were declared within the block.** 
- Type: **Warning**
- Source: **Target compiler**

TBD

#### Warning QS5027

- Error code: **Warning QS5027**
- Error message: **The callable {0} requires runtime capabilities which are not supported by the target {1}.** 
- Type: **Warning**
- Source: **Target compiler**

TBD

#### Warning QS5028

- Error code: **Warning QS5028**
- Error message: **This construct requires a classical runtime capability that is not supported by the target.** 
- Type: **Warning**
- Source: **Target compiler**

This warning indicates that the Q# program is using advanced classical features, which must be optimized out during [QIR](xref:microsoft.quantum.concepts.qir) processing. If this optimization cannot occur, the program execution may fail at a later compilation step.

#### Target specific transformation failed

- Error code: **QATTransformationFailed**
- Error message: **The message will be specific to the program**
- Type: **Job error**
- Source: **Azure Quantum service**

This error can occur because the Azure Quantum service could not transform the program’s [quantum intermediate representation](xref:microsoft.quantum.concepts.qir) (QIR) enough to be able to run the program on the specified target. The error message contains the details about QIR that represent the program and what caused the validation to fail. However, it does not provide details on how the error is related to the source code.

The scenarios that can cause this error to occur are very broad. The following list does not contain all of them, but it enumerates some of the most common ones: 

- Accessing array elements that are outside of the array’s range. 

    ```qsharp
    operation IndexOutOfRange() : Result { 
        use register = Qubit[1]; 
        H(register[1]); 
        return MResetZ(register[1]); 
    } 
    ```

- Using arithmetic operations that are not supported by the target. 

    ```qsharp
    operation UnsupportedArithmetic() : Result { 
        use q = Qubit(); 
        mutable theta = 0.0; 
        for _ in 1 .. 10 { 
            Rx(theta, q); 
            set theta += (0.25 * PI()); 
        } 
        return MResetZ(q); 
    } 
    ```













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
