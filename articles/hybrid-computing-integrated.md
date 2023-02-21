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

Integrated quantum computing brings the classical and quantum processes together, allowing classical code to control the execution of quantum operations based on mid-circuit measurements while the physical qubits remain alive. Using common programming techniques, such as nested conditionals, loops, and function calls, a single quantum program can run complex problems, reducing the number of shots needed. Leveraging qubit re-use techniques, larger programs can run on machines utilizing a smaller number of qubits.

![Integrated batch quantum computing](~/media/hybrid/integrated-2.png)

## Supported hardware

Currently, the integrated quantum computing model in Azure Quantum is supported on [Quantinuum](https://www.quantinuum.com/) targets. Quantinuum supports the QIR Alliance [Basic Measurement Feedback](https://github.com/qir-alliance/qir-spec/blob/main/specification/v0.1/7_Profiles.md#profile-b-basic-measurement-feedback) (Profile B), which allows limited capabilities to control the execution of quantum operations based on prior measurement results. 

### Quantinuum 

|Supported feature| Notes |
|---|---|
|TBD |TBD  |
|TBD |TBD  |
|TBD |TBD  |
|TBD |TBD  |

## Cost estimation

TBD

- Can't be calculated before submission
- Samples that reduce the risk of any cost over-run?
- Does Quantinuum bill for only what is run or the entire unrolled circuit for instance?
- Ability to stop execution when cost exceeds customer limit?

## Examples

The following examples demonstrate the available integrated feature set. For more examples, see the Integrated Quantum Computing notebook samples in the Azure Quantum portal, and [Integrated quantum computing programming best practices](xref:microsoft.quantum.hybrid.programming). 

- Verify an entangled GHZ state. 
- View how error correction works with integrate hybrid. 
- KPMG (TBD)

### [Check GHZ](#tab/tabid-ghz) 

This example verifies a 3-qubit [Greenberger-Horne-Zeilinger](https://en.wikipedia.org/wiki/Greenberger%E2%80%93Horne%E2%80%93Zeilinger_state#:~:text=In%20physics%2C%20in%20the%20area%20of%20quantum%20information,Greenberger%2C%20Michael%20Horne%20and%20Anton%20Zeilinger%20in%201989) (GHZ) state, counting the number of times it sees the entanglement fail out of 10 attempts. Without noise, this would return 0 for every shot, but with noise, you can get back failures. 

Feature to note about this example:

- The loop and qubit measurements happen while the qubits remain coherent.
- The routine mixes classical and quantum compute operations. 
- You do not need to learn to program for specialized high-performance hardware running next to the QPU (such as FPGAs).
- Running an equivalent program without the integrated hybrid features would require returning every intermediate measurement result and then running post-processing on the data. 

```python
import qsharp.azure

# Enter your Azure Quantum workspace details here
qsharp.azure.connect(resourceId = "", location = "")

%%qsharp
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

# Set a Quantinuum target back-end with the Adaptive Execution flag
qsharp.azure.target("quantinuum.sim.h1-1e")
qsharp.azure.target_capability("AdaptiveExecution")

# Submit the job. This run will use approximately 10 HQC's (Quantinuum billing unit)
result = qsharp.azure.execute(CheckGHZ, shots=50, jobName="CheckGHZ", timeout=240)
```

![GHZ output](~/media/hybrid/ghz-output.png)


### [Error correction](#tab/tabid-qec)


### [Quantum machine learning](#tab/tabid-qml)

Add appropriate credit to KPMG

***

## Next steps



