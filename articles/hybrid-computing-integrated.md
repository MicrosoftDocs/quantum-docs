---
author: bradben
description: Understand the implementation of integrated hybrid quantum computing, and how to submit jobs to Azure Quantum using the Adaptive RI target profile.
ms.date: 06/03/2024
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', Quantum Development Kit, QIR Adaptive RI, target, targets]
title: Working with Integrated Hybrid Computing
uid: microsoft.quantum.hybrid.integrated
#customer intent: As a quantum programmer, I want to understand integrated hybrid computing.
---

# Integrated hybrid computing

Integrated hybrid computing brings the classical and quantum processes together, allowing classical code to control the execution of quantum operations based on mid-circuit measurements while the physical qubits remain alive. Using common programming techniques, such as nested conditionals, loops, and function calls, a single quantum program can run complex problems, reducing the number of shots needed. Using qubit reuse techniques, larger programs can run on machines utilizing a smaller number of qubits.

For more discussion, see:

- [Granade & Weibe, "Using Random Walks for Iterative Phase Estimation"](https://arxiv.org/pdf/2208.04526.pdf).
- [Lubinski, et al., "Advancing Hybrid Quantum–Classical Computation with Real-Time Execution"](https://arxiv.org/pdf/2206.12950.pdf)


## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- If you want to submit Q# standalone programs, you need the following prerequisites:
    - [Visual Studio Code](https://code.visualstudio.com/download) with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension installed.
    - The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension.
- If you wan to submit Python + Q# programs, you need the following prerequisites:
    - A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
    - The Azure Quantum `azure-quantum` and `qsharp` packages.
    
        ```bash
        pip install --upgrade azure-quantum qsharp
        ```

## Supported targets

Currently, the integrated hybrid computing model in Azure Quantum is supported on [Quantinuum](xref:microsoft.quantum.providers.quantinuum) targets.

## Submitting integrated hybrid jobs

When submitting an integrated hybrid job, you need to configure the [target profile](xref:microsoft.quantum.target-profiles) as :::no-loc text="QIR Adaptive RI":::. The :::no-loc text="QIR Adaptive RI"::: target profile offers support for mid-circuit measurements, measurement-based control flow, qubit reset, and classical integer computation.

You can submit integrated hybrid Q# standalone programs or Python + Q# programs to Azure Quantum. To configure the target profile for integrated hybrid jobs, follow the instructions below.

### [Q# in Visual Studio Code](#tab/tabid-vscode)

To configure the target profile for integrated hybrid jobs in Visual Studio Code, follow these steps:

1. Open a Q# program in Visual Studio Code.
1. Select **View -> Command Palette** and type **Q#: Set the Azure Quantum QIR target profile**. Press **Enter**.
1. Select **QIR Adaptive RI**.

Once you set QIR Adaptive RI as target profile, you can submit your Q# program as integrated hybrid job to Quantinuum.

1. Select **View -> Command Palette** and type **Q#: Connect to an Azure Quantum workspace**. Press **Enter**.
1. Select **Azure account**, and follow the prompts to connect to your preferred directory, subscription, and workspace.
1. Once you are connected, in the **Explorer** pane, expand **Quantum Workspaces**.
1. Expand your workspace and expand the **Quantinuum** provider.
1. Select any Quantinuum available target, for example **quantinuum.sim.h1-1e**. 
1. Select the play icon to the right of the target name to start submitting the current Q# program.
1. Add a name to identify the job, and the number of shots.
1. Press **Enter** to submit the job. The job status displays at the bottom of the screen.
1. Expand **Jobs** and hover over your job, which displays the times and status of your job.

### [Q# + Python](#tab/tabid-python)

1. When using the *qsharp* Python package, use the `qsharp.init` function and set the `target_profile` parameter to `Adaptive_RI`.

    ```python
    import qsharp
    
    qsharp.init(target_profile=qsharp.TargetProfile.Adaptive_RI)
    ```

1. Connect to your Azure Quantum workspace.

    ```python
    import azure.quantum
    
    workspace = azure.quantum.Workspace(
        resource_id = "", # add your resource ID
        location = "", # add your location, for example "westus"
    )
    ```

1. Set the `target` parameter to the Quantinuum target you want to use. For example, to use the `quantinuum.sim.h1-1e` target: 

    ```python
    target = workspace.get_targets("quantinuum.sim.h1-1e")
    ```
    
You can combine multiple integrated hybrid jobs within a [session](xref:microsoft.quantum.hybrid.interactive) using the `target.open_session` function. For more information, see [Get started with sessions](xref:microsoft.quantum.hybrid.interactive#get-started-with-sessions).

> [!NOTE]
> Although sessions are available for all quantum computing hardware providers, notice that `Adaptive_RI` target profile jobs are currently supported only on Quantinuum targets.

***

## Supported features

The following table lists the supported features for integrated hybrid computing with Quantinuum in Azure Quantum.

|Supported feature| Notes |
|---|---|
| Dynamics values| Bools and integers whose value depend on a measurement result|
| Loops | Classically-bounded loops only |
| Arbitrary control flow | Use of if/else branching  |
| Mid-circuit measurement | Utilizes classical register resources |
| Qubit reuse | Supported |
| Real-time classical compute| 64-bit signed integer arithmetic <br>Utilizes classical register resources |

The QDK provides target-specific feedback when Q# language features aren't supported for the selected target. If your Q# program contains unsupported features when running integrated hybrid jobs, you receive an error message at design-time. For more information, see the [QIR wiki page](https://github.com/microsoft/qsharp/wiki/QIR). 

> [!NOTE]
> You need to select the appropriate **QIR Adaptive RI** target profile to obtain appropriate feedback when using Q# features that the target does not support.

Copy the following code into a Q# file, and add the subsequent code snippets to see the supported features in action.

```qsharp
namespace HybridIntegrated {
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;

    @EntryPoint()
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

}
```

Quantinuum supports dynamic bools and integers, which means bools and integers that depend on measurement results. Note that `r0` is a `Result` type that can be used to generate dynamic bool and integer values.

```qsharp
        let dynamicBool = r0 != Zero; 
        let dynamicBool = ResultAsBool(r0); 
        let dynamicInt = dynamicBool ? 0 | 1; 
```

Quantinuum supports dynamic bools and integers, however, it doesn't support dynamic values for other data types, such as double. Copy the following code to see feedback about the limitations of dynamic values.

```qsharp
        let dynamicDouble = r0 == One ? 1. | 0.; // cannot use a dynamic double value
        let dynamicInt = r0 == One ? 1 | 0;
        let dynamicDouble = IntAsDouble(dynamicInt); // cannot use a dynamic double value
        let dynamicRoot = Sqrt(dynamicDouble); // cannot use a dynamic double value
```

Even though dynamic values are not supported for some data types, those data types can still be used with static values.

```qsharp
    let staticRoot = Sqrt(4.0);
    let staticBigInt = IntAsBigInt(2);
```

Even dynamic values of supported typed can't be used in certain situations. For example, Quantinuum doesn't support dynamic arrays, that is, arrays whose size depends on a measurement result. Quantinuum doesn't support dynamically-bounded loops either. Copy the following code to see the limitations of dynamic values.

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

Quantinuum supports control flow, including `if/else` branching, using both static and dynamic conditions. Branching on dynamic conditions is also known as branching based on measurement results.

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

Quantinuum supports loops with classical conditions and including `if` expressions.

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

## Estimating the cost of an integrated hybrid job

You can estimate the cost of running an integrated hybrid job on Quantinuum hardware by running it on an emulator first.

After a successful run on the emulator:

1. In your Azure Quantum workspace, select **Job management**.
1. Select the job you submitted.
1. In the **Job details** popup, select **Cost Estimation** to view how many eHQCs (Quantinuum emulator credits) were used. This number translates directly to the number of HQCs (Quantinuum quantum credits) that are needed to run the job on Quantinuum hardware.

![Cost estimation](~/media/hybrid/cost-estimation.png)

> [!NOTE]
> Quantinuum unrolls the entire circuit and calculates the cost on all code paths, whether they are conditionally executed or not.

## Integrated hybrid samples

The following samples can be found in [Q# code samples repository](https://github.com/microsoft/qsharp/blob/main/samples/). They demonstrate the current feature set for integrated hybrid computing.


### Three-qubit repetition code

This sample demonstrates how to create a [three-qubit repetition code](xref:microsoft.quantum.concepts.qec#example-the-three-qubit-code) that can be used to detect and correct bit flip errors.

It leverages integrated hybrid computing features to count the number of times error correction was performed while the state of a logical qubit register is coherent.

You can find the code sample [here](https://github.com/microsoft/qsharp/blob/main/samples/algorithms/ThreeQubitRepetitionCode.qs). 

### Iterative phase estimation

This sample* program demonstrates an iterative phase estimation within Q#. It uses iterative phase estimation to calculate an inner product between two 2-dimensional vectors encoded on a target qubit and an ancilla qubit. An additional control qubit is also initialized which is the only qubit used for measurement.

The circuit begins by encoding the pair of vectors on the target qubit and the ancilla qubit. It then applies an Oracle operator to the entire register, controlled off the control qubit, which is set up in the $\ket +$ state. The controlled Oracle operator generates a phase on the $\ket 1$ state of the control qubit. This can then be read by applying an H gate to the control qubit to make the phase observable when measuring.

You can find the code sample [here](https://github.com/microsoft/qsharp/blob/main/samples/algorithms/DotProductViaPhaseEstimation.qs). 

**This sample code was written by members of [KPMG](https://kpmg.com/xx/en/home/services/advisory/management-consulting/technology-consulting/quantum-technologies.html) Quantum team in Australia and falls under an MIT License. It aims to demonstrate expanded capabilities of :::no-loc text="QIR Adaptive RI"::: targets and makes use of bounded loops, classical function calls at run time, nested conditional if statements, mid circuit measurements, and qubit reuse.*


## Related content

- [Distributed hybrid computing](xref:microsoft.quantum.hybrid.distributed).
- [Interactive quantum computing: sessions](xref:microsoft.quantum.hybrid.interactive)
