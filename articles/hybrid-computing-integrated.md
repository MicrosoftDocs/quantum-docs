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

### Adaptive Profile

Quantinuum and QCI also support various elements of the upcoming [Adaptive Profile](https://github.com/qir-alliance/.github/pull/31), which supports defining and executing quantum programs that permit for limited classical computations and control flow during execution.

#### Limitations

The following are currently not supported by the Adaptive Profile:

- **Composite data types** - The use of composite data types such as structure types, such as tuples, and sequential types, including arrays, is not supported within an Adaptive Profile. This also precludes the use of such data structures for callable values. For example, the usage of subroutines as first class values is not supported within the Adaptive Profile, and the use of function types is limited to globally declared [LLVM](https://llvm.org/) functions that may be called as part of program execution.
- **Unbounded loops or recursions** - The Adaptive Profile requires that any profile compliant program is known to terminate. That is, it must be possible to statically bind resources and schedule QPU instructions. Supporting direct or indirect function recursions is out of scope for the Adaptive Profile.
- **Dynamic qubit allocations and access** - Within the Base Profile, all qubit uses refer directly to a unique qubit ID (requires an update of the full specification as part of this workstream). Runtime functions for qubit allocation and release are not available, and the lack of support for local variables and composite data types prevents any qubit aliasing. Dynamic qubit access is further prevented by prohibiting classical computations and branching that are based on measurement results.

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

This example checks the states of three qubits entangled in a GHZ state. 

The first cell connects to the Azure Quantum service, specifies the target hardware, and then specifies the Adaptive profile capability of the target. 

```qsharp
%azure.connect "/subscriptions/f5300c84-19ad-4e7f-98c4-f2557bf622ee/resourceGroups/AzureQuantum/providers/Microsoft.Quantum/Workspaces/AQuantumWorkspace" location="westus2"
%azure.target quantinuum.sim.h1-1e-preview
%azure.target-capability AdaptiveExecution 
```

```output
Target capability AdaptiveExecution
Classical computation	Integral
Result opacity	Transparent
```

The next cell creates the entanglement, then measures and resets the qubits. 

```qsharp
open Microsoft.Quantum.Measurement;
open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Convert;

operation CheckGHZ() : Int {
    use q = Qubit[3];
    mutable mismatch = 0;
    for _ in 1..10 {
        H(q[0]);
        CNOT(q[0], q[1]);
        CNOT(q[1], q[2]);

        // Measures and resets the 3 qubits
        let (r0, r1, r2) = (MResetZ(q[0]), MResetZ(q[1]), MResetZ(q[2]));

        // Adjusts classical code based on measurement results
        if not (r0 == r1 and r1 == r2) {
            set mismatch += 1;
        }
    }
    return mismatch;
}

@EntryPoint()
operation EP() : Int {
    return CheckGHZ();
    }
```

```output
CheckGHZ
EP
```

The last cell submits the job and displays the resulting histogram. 

```qsharp
%azure.execute EP shots=50 jobName="CheckGHZ with L3" timeout=240
```

![GHZ output](~/media/hybrid/ghz-output.png)


### Error correction

### KPMG  


## Next steps



