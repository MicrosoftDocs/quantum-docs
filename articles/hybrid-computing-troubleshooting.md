---
author: bradben
description: Understand the known issues of integrated hybrid programs with Q# and the QDK and supported hardware.
ms.date: 06/06/2024
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: troubleshooting
no-loc: ['Q#', '$$v', Quantum Intermediate Representation, target, targets]
title: Known issues for integrated hybrid computing
uid: microsoft.quantum.hybrid.troubleshooting
---

# Troubleshooting integrated hybrid issues

> [!NOTE]
> This content applies only to the Classic QDK.

Developing and running integrated hybrid algorithms on the latest supported hardware is a new and quickly evolving field. This article outlines the tools and methods currently available, along with known issues, and is updated as new features are supported.

## Feature limitations and restrictions

The following table lists the currently known limitations and restrictions of the integrated hybrid feature set. Being aware of these limitations can help prevent errors as you explore integrated hybrid programs. This table is updated as the functionality is expanded.

| Item | Notes |
| --- | --- |
| **Target-specific feedback** | The QDK will provide feedback when Q# language features are not supported for the selected target. If you want to know more details about the target-specific errors you might encounter, please visit the [QIR wiki page](https://github.com/microsoft/qsharp/wiki/QIR).|
| **Classical register limitations** | Each supported target has hardware-specific classical register counts, and your compilation may fail if the underlying program uses more classical registers than are available. These failures usually occur with loop structures.|

## Error messages and troubleshooting

### Exceeded max allowed number of classical registers 

- Error code: **honeywell - 1000**
- Error message: **1000: Compile error: Exceeded max allowed number of classical registers** 
- Type: **Job error**
- Source: **Target compiler**

This error can occur when a program that requires a significant number of classical registers is submitted. Some patterns that can cause this issue are **for** loops that contain a large number of iterations, deeply nested **if** statements, or a large number of qubit measurements.

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

### Target specific transformation failed

- Error code: **QATTransformationFailed**
- Error message: **The message will be specific to the program**
- Type: **Job error**
- Source: **Azure Quantum service**

This error can occur because the Azure Quantum service could not transform the program’s [Quantum Intermediate Representation](xref:microsoft.quantum.concepts.qir) (QIR) enough to be able to run the program on the specified target. The error message contains the details about QIR that represent the program and what caused the validation to fail. However, it does not provide details on how the error is related to the source code.

If you encounter this issue, it might be a bug. Please consider creating a GitHub issue in the [Q# repository](https://github.com/microsoft/qsharp/issues).
