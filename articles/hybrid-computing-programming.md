---
author: bradben
description: Understand the best practices for writing and submitting integrated quantum programs with Q# and the QDK.
ms.date: 02/21/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Programming guide for integrated quantum computing
uid: microsoft.quantum.hybrid.programming
---

# Integrated hybrid programming best practices

To start exploring integrated hybrid programming, we suggest walking through the examples in the [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated) article, or in the **Hybrid quantum computing** sample gallery in the Azure Portal.

To adapt your own code to run on integrated hybrid supported hardware, see [QIR Alliance Profile B: Basic Measure Feedback](https://github.com/qir-alliance/qir-spec/blob/main/specification/v0.1/7_Profiles.md#profile-b-basic-measurement-feedback) documentation. 

This article provides some best practices for adapting and creating quantum code to run on Azure Quantum's supported hardware.

## Adaptive Profile

Quantinuum hardware also supports various elements of the upcoming [Adaptive Profile](https://github.com/qir-alliance/.github/pull/31), which supports defining and executing quantum programs that permit for limited classical computations and control flow during execution.

### Limitations

The following are currently not supported by the Adaptive Profile:

- **Composite data types** - The use of composite data types such as structure types, such as tuples, and sequential types, including arrays, is not supported within an Adaptive Profile. This also precludes the use of such data structures for callable values. For example, the usage of subroutines as first class values is not supported within the Adaptive Profile, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution.
- **Unbounded loops or recursions** - The Adaptive Profile requires that any profile compliant program is known to terminate. That is, it must be possible to statically bind resources and schedule QPU instructions. Supporting direct or indirect function recursions is out of scope for the Adaptive Profile.
- **Dynamic qubit allocations and access** - Within the Base Profile, all qubit uses refer directly to a unique qubit ID (requires an update of the full specification as part of this workstream). Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. Dynamic qubit access is further prevented by prohibiting classical computations and branching that are based on measurement results.

## Implementation

Integrated quantum programs on Azure Quantum are run and managed just as regular batch jobs. Each job has a single job ID and the result is a single histogram.

### IQ\#

When using the IQ# kernel in a Jupyter Notebook, use the [%azure.target-capability](xref:microsoft.quantum.iqsharp.magic-ref.azure.target-capability) magic command with the `AdaptiveExecution` parameter. 

```qsharp
%azure.target-capability AdaptiveExecution
```

### Python + Q\#

When using the *quantum* Python package, use the `qsharp.azure.target_capability` function with the `AdaptiveExecution` parameter. 

```python
qsharp.azure.target_capability("AdaptiveExecution")
```

### Azure CLI

When using the Azure CLI to submit a program, use the \<TBD\>.

```azurecli
TBD
```

## Best practices

Developing and running hybrid algorithms on the latest supported hardware is a new and quickly evolving field. These best practices outline the tools and methods currently available, and will be updated as new features are supported. 

### Supported libraries

As of this release, not all libraries in the QDK support the Adaptive Profile. This table lists the common supported functions and operations.

| Function or operation | Library |
| --- | --- |
| TBD | TBD |
| TBD | TBD |
| TBD | TBD |

### Compiler warnings

By default, target-specific errors compiler errors are converted to warnings.  Be sure to validate your code on the simulator, emulator, or validator provided by the
targeted hardware provider to detect issues prior to running on quantum hardware.

### Avoid partial applications

TBD

### Use ranges rather than arrays when possible

TBD

### Integer support

Current integer support is limited to 32-bit unsigned values, even though Q# integers are treated as 64-bit signed in the code. This can affect some bitwise operations and comparisons. It is recommended to use positive values when using the hybrid integer support.

### Returning constant values

TBD

### Loops and classical register limitations

Each supported target has hardware-specific classical register counts, and your compilation may fail if the underlying program uses more classical registers than are available.

### Troubleshooting

TBD - list of error messages and actions for known/common scenarios. 
