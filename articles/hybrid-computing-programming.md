---
author: bradben
description: Understand the best practices for writing and submitting integrated quantum programs with Q# and the QDK.
ms.date: 02/09/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Programming guide for integrated quantum computing
uid: microsoft.quantum.hybrid.programming
---

# Integrated quantum computing programming best practices

- Set capability and target early? 
- Opt-in mechanism for partially supported features
  - Opt to convert compiler error to warnings
  - https://ms-quantum.visualstudio.com/Quantum%20Program/_workitems/edit/48242
- Emulator first
  - Will emulators validate for compiler errors above?
- Link to troubleshooting
- Command line arguments
- Avoid partial applications
- Use ranges rather than arrays when possible
- Which functions/operations have the capability attributes?
  - Q# core and standard libraries
  - Chem, ML, numerics, etc. not this time
  - Not katas (assume, not samples on /learn/samples, either?)
- Partner TBD: 
  - integer support
  - returning constant values


### Adaptive Profile

Quantinuum also supports various elements of the upcoming [Adaptive Profile](https://github.com/qir-alliance/.github/pull/31), which supports defining and executing quantum programs that permit for limited classical computations and control flow during execution.

#### Limitations

The following are currently not supported by the Adaptive Profile:

- **Composite data types** - The use of composite data types such as structure types, such as tuples, and sequential types, including arrays, is not supported within an Adaptive Profile. This also precludes the use of such data structures for callable values. For example, the usage of subroutines as first class values is not supported within the Adaptive Profile, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution.
- **Unbounded loops or recursions** - The Adaptive Profile requires that any profile compliant program is known to terminate. That is, it must be possible to statically bind resources and schedule QPU instructions. Supporting direct or indirect function recursions is out of scope for the Adaptive Profile.
- **Dynamic qubit allocations and access** - Within the Base Profile, all qubit uses refer directly to a unique qubit ID (requires an update of the full specification as part of this workstream). Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. Dynamic qubit access is further prevented by prohibiting classical computations and branching that are based on measurement results.

## Implementation

Integrated quantum programs on Azure Quantum are managed just as regular batch jobs are. Each job has a single job ID and the result is a single histogram.

### IQ\#

When using the IQ# kernel in a Jupyter Notebook, use the [%azure.target-capability](xref:microsoft.quantum.iqsharp.magic-ref.azure.target-capability) magic command. 

```qsharp
%azure.target-capability AdaptiveExecution
```

### Python + Q\#

When using the *quantum* Python package, use the qsharp.azure.target_capability function. 

```python
qsharp.azure.target_capability("AdaptiveExecution")
```

### Azure CLI

When using the Azure CLI to submit a program, use the \<TBD\>.

```azurecli
TBD
```

## Next steps

- [Batch quantum computing](xref:microsoft.quantum.hybrid.batch)
- LINK TO PAPER