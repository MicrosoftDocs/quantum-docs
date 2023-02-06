---
author: bradben
description: Understand the architecture and implementation of integrated quantum computing.
ms.date: 02/05/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Overview of integrated quantum computing
uid: microsoft.quantum.hybrid.integrated
---

# Integrated quantum computing

Integrated quantum computing brings the classical and quantum processes together, allowing classical code to control the execution of quantum operations based on measurement results while the physical qubits remain alive. Using common programming techniques, such as nested conditionals, loops, and function calls, a single quantum program can run complex problems, reducing the number of shots needed. Leveraging qubit re-use techniques, larger programs can be run on machines utilizing a smaller number of qubits.

![Integrated batch quantum computing](~/media/hybrid/integrated-2.png)

## Supported hardware

Currently, the integrated quantum computing model in Azure Quantum is supported on [Quantinuum](https://www.quantinuum.com/) and [Quantum Circuits, Inc.](https://quantumcircuits.com/) (QCI) targets. Both providers support the QIR Alliance [Basic Measurement Feedback](https://github.com/qir-alliance/qir-spec/blob/main/specification/v0.1/7_Profiles.md#profile-b-basic-measurement-feedback) (Profile B), which allows limited capabilities to control the execution of quantum operations based on prior measurement results. 

### Adaptive Profile

Quantinuum and QCI also support various elements of the upcoming [Adaptive Profile](https://github.com/qir-alliance/.github/pull/31), which supports defining and executing quantum programs that permit for limited classical computations and control flow during execution.

#### Limitations

The following are currently not supported by the Adaptive Profile:

- **Composite data types** - The use of composite data types such as structure types, such as tuples, and sequential types, including arrays, is not supported within an Adaptive Profile. This also precludes the use of such data structures for callable values. For example, the usage of subroutines as first class values is not supported within the Adaptive Profile, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution.
- **Unbounded loops or recursions** - The Adaptive Profile requires that any profile compliant program is known to terminate. That is, it must be possible to statically bind resources and schedule QPU instructions. Supporting direct or indirect function recursions is out of scope for the Adaptive Profile.
- **Dynamic qubit allocations and access** - Within the Base Profile, all qubit uses refer directly to a unique qubit ID (requires an update of the full specification as part of this workstream). Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. Dynamic qubit access is further prevented by prohibiting classical computations and branching that are based on measurement results.

### Quantinuum

- Supported
  - aaa
  - bbb
- Not supported
  - aaa
  - bbb
- Limitations
  - Loops are un-rolled
  - bbb

### QCI

- Supported
  - aaa
  - bbb
- Not supported
  - aaa
  - bbb
- Limitations
  - aaa
  - bbb

## Implementation

Integrated quantum programs on Azure Quantum are managed (that is,submitted, queried, or cancelled) just as a regular batch job is. Each job has a single job ID and the result is a single histogram.

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


## Cost estimation

TBD

- Can't be calculated before submission
- Samples that reduce the risk of any cost over-run?
- Does Quantinuum bill for only what is run or the entire unrolled circuit for instance?
- Ability to stop execution when cost exceeds customer limit?

## Examples

### Check GHZ 

### Error correction

### KPMG  


## Next steps



