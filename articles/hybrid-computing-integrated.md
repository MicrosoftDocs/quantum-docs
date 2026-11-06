---
title: Run Hybrid Quantum Computing
description: Understand the implementation of integrated hybrid quantum computing, and how to submit jobs to Azure Quantum using the Adaptive RI target profile.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 09/09/2024
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["Q#", "$$v", "Microsoft Quantum", "Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Azure Quantum", "Python", "Quantinuum", "QIR", "Adaptive RI", "target", "targets"]
uid: microsoft.quantum.hybrid.integrated
# Customer intent: As a quantum programmer, I want to understand integrated hybrid computing.
---

# Run hybrid quantum computing jobs with an adaptive target profile

Hybrid computing combines classical and quantum computing processes to solve complex problems.

In hybrid computing, the classical code controls the execution of quantum operations based on mid-circuit measurements while the physical qubits remain active. You can use common programming techniques, like nested conditionals, loops, and function calls, in a single quantum program to run complex programs with fewer shots. With qubit reuse techniques, larger programs can run on machines using a smaller number of qubits.

This article explains how to submit hybrid jobs to Azure Quantum using the [Adaptive RI](xref:microsoft.quantum.target-profiles) target profile. The Adaptive RI target profile supports mid-circuit measurements, measurement-based control flow, qubit reset, and classical integer computation.

## Prerequisites

- An Azure account with an active subscription. If you don't have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

To submit Q# standalone programs, you also need the following prerequisites:

- Install [Visual Studio Code (VS Code)](https://code.visualstudio.com/download).
- Install the latest version of the [Microsoft Quantum Development Kit (QDK) extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).

To submit Python and Q# programs, you also need the following prerequisites:

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9pnrbtzxmb4z) installed.
- The latest `qdk` Python package with the optional `azure` extra.

    ```bash
    pip install --upgrade "qdk[azure]"
    ```

## Supported targets

To run hybrid quantum computing jobs, select a quantum provider that supports the [Adaptive RI target profile](xref:microsoft.quantum.target-profiles).

Currently, [Quantinuum](xref:microsoft.quantum.providers.quantinuum) targets support the Adaptive RI target profile in Azure Quantum.

## Submitting adaptive RI jobs

To submit hybrid quantum computing jobs, set the [target profile](xref:microsoft.quantum.target-profiles) to **:::no-loc text="Adaptive RI":::**, where RI stands for ":::no-loc text="qubit Reset"::: and :::no-loc text="Integer computations":::".

The :::no-loc text="Adaptive RI"::: target profile supports mid-circuit measurements, measurement-based control flow, qubit reset, and classical integer computation.

Submit hybrid quantum jobs to Azure Quantum as Q# standalone programs or Python + Q# programs. To set the target profile for hybrid quantum jobs, see the following sections.

### [Q# in Visual Studio Code](#tab/tabid-vscode)

To set the target profile for hybrid jobs in VS Code, choose one of the following options:

- If your Q# file isn't part of a Q# project, open the file and enter `@EntryPoint(Adaptive_RI)` before your program's entry point operation.
- If your Q# file is part of a Q# project, add the following code to your project's `qsharp.json` file:
  
  ```json
  {
    "targetProfile": "adaptive_ri"
  }
  ```

After you set your target profile to **Adaptive RI**, follow these steps to submit your Q# program as a hybrid quantum job to Quantinuum:

1. In VS Code, select **View** > **Command Palette**
1. Enter **QDK: Connect to an Azure Quantum workspace**.
1. Select **Azure account**, and follow the prompts to connect to your preferred directory, subscription, and workspace.
1. To view your Azure Quantum workspaces, select the **Microsoft Quantum** icon on the Activity Bar.
1. Expand your workspace and expand the **Quantinuum** provider.
1. Select an available Quantinuum target, like **quantinuum.sim.h2-1e**.
1. Select the play icon next to the target name to submit the current Q# program.
1. Enter a name to identify the job, and the number of shots.
1. Submit the job. The job status shows at the bottom of the screen.
1. Expand **Jobs** and hover over your job to see its times and status.

### [Q# + Python](#tab/tabid-python)

1. With the `qdk` Python package, use the `init` and `TargetProfile` objects to set the `target_profile` parameter to `Adaptive_RI`.

    ```python
    from qdk import init, TargetProfile

    init(target_profile=TargetProfile.Adaptive_RI)
    ```

1. Connect to your Azure Quantum workspace.

    ```python
    from qdk.azure import Workspace
    
    workspace = Workspace(resource_id="<ResourceID>") # Add your resource ID
    ```

1. Set the `target` parameter to the Quantinuum target you want to use. For example, to use the `quantinuum.sim.h2-1e` target:

    ```python
    target = workspace.get_targets("quantinuum.sim.h2-1e")
    ```

Combine multiple hybrid quantum jobs within a [session](xref:microsoft.quantum.hybrid.interactive) by using the `target.open_session` function. For more information, see [Get started with sessions](xref:microsoft.quantum.hybrid.interactive#get-started-with-sessions).

> [!NOTE]
> Although sessions are available for all quantum computing hardware providers, `Adaptive_RI` target profile jobs are currently supported only on Quantinuum targets.

***

## Supported features

The following table lists the supported features for hybrid quantum computing with Quantinuum in Azure Quantum.

| Supported feature           | Notes                                                                   |
|-----------------------------|-------------------------------------------------------------------------|
| Dynamic values              | Bools and integers whose values depend on a measurement result          |
| Loops                       | Classically bounded loops only                                          |
| Arbitrary control flow      | Use of if/else branching                                                |
| Mid-circuit measurement     | Utilizes classical register resources                                   |
| Qubit reuse                 | Supported                                                               |
| Real-time classical compute | 64-bit signed integer arithmetic, utilizes classical register resources |

The QDK provides target-specific feedback when Q# language features aren't supported for the selected target. If your Q# program has unsupported features when you run hybrid quantum jobs, you get an error message at design time. For more information, see the [QIR wiki page](https://github.com/microsoft/qdk/wiki/QIR).

> [!NOTE]
> Select the **Adaptive RI** target profile to get feedback when you use Q# features that the target doesn't support.

To see the supported features in action, copy the following code into a Q# file and add the subsequent code snippets.

```qsharp
import Std.Measurement.*;
import Std.Math.*;
import Std.Convert.*;

operation Main() : Result {
    use (q0, q1) = (Qubit(), Qubit());
    H(q0);
    let r0 = MResetZ(q0);

    // Copy here the code snippets below to see the supported features 
    // in action.
    // Supported features include dynamic values, classically-bounded loops, 
    // arbitrary control flow, and mid-circuit measurement.

    r0
}
```

Quantinuum supports dynamic bools and integers, which are bools and integers that depend on measurement results. `r0` is a `Result` type that you can use to generate dynamic bool and integer values.

```qsharp
    let dynamicBool = r0 != Zero; 
    let dynamicBool = ResultAsBool(r0); 
    let dynamicInt = dynamicBool ? 0 | 1; 
```

Quantinuum supports dynamic bools and integers, but it doesn't support dynamic values for other data types, like double. Copy the following code to see feedback about the limitations of dynamic values.

```qsharp
    let dynamicDouble = r0 == One ? 1. | 0.; // cannot use a dynamic double value
    let dynamicInt = r0 == One ? 1 | 0;
    let dynamicDouble = IntAsDouble(dynamicInt); // cannot use a dynamic double value
    let dynamicRoot = Sqrt(dynamicDouble); // cannot use a dynamic double value
```

Even though some data types don't support dynamic values, you can still use those data types with static values.

```qsharp
    let staticRoot = Sqrt(4.0);
    let staticBigInt = IntAsBigInt(2);
```

You can't use dynamic values of supported types in certain situations. For example, Quantinuum doesn't support dynamic arrays, which are arrays whose size depends on a measurement result. Quantinuum doesn't support dynamically bounded loops either. Copy the following code to see the limitations of dynamic values.

```qsharp
    let dynamicInt = r0 == Zero ? 2 | 4;
    let dynamicallySizedArray = [0, size = dynamicInt]; // cannot use a dynamically-sized array
    let staticallySizedArray = [0, size = 10];
    // Loops with a dynamic condition are not supported by Quantinuum.
    for _ in 0..dynamicInt {
         Rx(PI(), q1);
    }
        
    // Loops with a static condition are supported.
    let staticInt = 3;
    for _ in 0..staticInt {  
         Rx(PI(), q1);  
    }
```

Quantinuum supports control flow, including `if/else` branching, with both static and dynamic conditions. Branching on dynamic conditions is also called branching based on measurement results.

```qsharp
    let dynamicInt = r0 == Zero ? 0 | 1; 
    if dynamicInt > 0 {
        X(q1);
     }
    let staticInt = 1;
    if staticInt > 5 {
         Y(q1);
    } else {
         Z(q1);
    }
```

Quantinuum supports loops that have classical conditions and include `if` expressions.

```qsharp
    for idx in 0..3 {
        if idx % 2 == 0 {
            Rx(ArcSin(1.), q0);
            Rz(IntAsDouble(idx) * PI(), q1)
        } else {
            Ry(ArcCos(-1.), q1);
             Rz(IntAsDouble(idx) * PI(), q1)
        }
     }
```

Quantinuum supports mid-circuit measurement, that is, branching based on measurement results.

```qsharp
    if r0 == One {
        X(q1);
    }
    let r1 = MResetZ(q1);
    if r0 != r1 {
        let angle = PI() + PI() + PI()* Sin(PI()/2.0);
        Rxx(angle, q0, q1);
    } else {
        Rxx(PI() + PI() + 2.0 * PI() * Sin(PI()/2.0), q1, q0);
    }
```

## Estimate the cost of a hybrid quantum computing job

Estimate the cost to run a hybrid quantum computing job on Quantinuum hardware by running the job on an emulator first.

After a successful run on the emulator:

1. In your Azure Quantum workspace, select **Job management**.
1. Select the job you submitted.
1. In the **Job details** popup, select **Cost Estimation** to view how many eHQCs (Quantinuum emulator credits) were used. This number corresponds to the number of HQCs (Quantinuum quantum credits) that you need to run the job on Quantinuum hardware.

![Screenshot of the Job details popup showing the Cost Estimation tab with eHQC usage for a job.](~/media/hybrid/cost-estimation.png)

> [!NOTE]
> Quantinuum unrolls the entire circuit and calculates the cost on all code paths, whether or not they run conditionally.

## Hybrid quantum computing samples

Find the following samples in the [Q# code samples repository](https://github.com/microsoft/qdk/blob/main/samples/). These samples demonstrate the current feature set for hybrid quantum computing.

### Three-qubit repetition code

This sample demonstrates how to create a [three-qubit repetition code](xref:microsoft.quantum.concepts.qec#example-the-three-qubit-code) that detects and corrects bit flip errors.

It uses integrated hybrid computing features to count how many times error correction runs while the state of a logical qubit register is coherent.

Find the code in the [three-qubit repetition code sample](https://github.com/microsoft/qdk/blob/main/samples/algorithms/ThreeQubitRepetitionCode.qs).

### Iterative phase estimation

This sample program demonstrates iterative phase estimation in Q#. It uses iterative phase estimation to calculate an inner product between two 2-dimensional vectors encoded on a target qubit and an ancilla qubit. The program also initializes a control qubit, which is the only qubit used for measurement.

The circuit begins by encoding the pair of vectors on the target qubit and the ancilla qubit. It then applies an Oracle operator to the entire register, controlled off the control qubit, which is set up in the $\ket +$ state. The controlled Oracle operator generates a phase on the $\ket 1$ state of the control qubit. To read this phase, apply an H gate to the control qubit, which makes the phase observable during measurement.

Find the code in the [dot product via phase estimation sample](https://github.com/microsoft/qdk/blob/main/samples/algorithms/DotProductViaPhaseEstimation.qs).

> [!NOTE]
> Members of the [KPMG](https://kpmg.com/xx/en/what-we-do/alliances/microsoft/kpmg-and-microsoft-azure-quantum.html) Quantum team in Australia wrote this sample code, which falls under an MIT License. The sample demonstrates expanded capabilities of :::no-loc text="Adaptive RI"::: targets and uses bounded loops, classical function calls at run time, nested conditional `if` statements, mid-circuit measurements, and qubit reuse.

## Related content

- [Get started with sessions](xref:microsoft.quantum.hybrid.interactive)
