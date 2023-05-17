---
author: SoniaLopezBravo
description: This document provides an overview of target profile types in Azure Quantum and their limitations
ms.date: 05/08/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
no-loc: [No control flow, Basic measurement feedback, target, targets, full]
title: Understanding target profile types in Azure Quantum
uid: microsoft.quantum.target-profiles
---

# Target profile types in Azure Quantum

This article discusses the different type of target profile types available in the quantum computing providers in Azure Quantum. At this time, because of the early development stage of the field, quantum devices have some limitations and requirements for programs that run on them.

[!INCLUDE [Quantinuum target name update](includes/quantinuum-name-change.md)] 

## Quantum Processing Units (QPU): different profiles and their limitations 

A Quantum Processing Unit (QPU) is a physical or simulated processor that contains a number of interconnected qubits that can be manipulated to compute
quantum algorithms. It's the central component of a quantum computer or quantum simulator.

Quantum devices are still an emerging technology, and not all of them can run all Q# code. As such, you need to keep some restrictions in mind when developing programs for different targets. Currently, Azure Quantum and the QDK manage three different profiles for QPUs:

- [**:::no-loc text="Full:::**](#create-and-run-applications-for-full-profile-targets): This profile can run any Q# program within the limits of memory for simulators or the number of qubits for physical quantum computers.
- [**:::no-loc text="No Control Flow":::**](#create-and-run-applications-for-no-control-flow-profile-targets): This profile can run any Q# program that doesn't require the use of the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, values of type `Result` don't support equality comparison.
- [**:::no-loc text="Basic Measurement Feedback":::**](#create-and-run-applications-for-basic-measurement-feedback-profile-targets): This profile has limited ability to use the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, you can compare values of type `Result` as part of conditions within `if` statements in operations, allowing mid-circuit measurement. The corresponding conditional blocks might not contain `return` or `set` statements.

## Create and run applications for :::no-loc text="Full::: profile targets

:::no-loc text="Full::: profile targets can run any Q# program, meaning you can
write programs without functionality restrictions. Azure Quantum does not provide
any target with this profile yet, but you can try any Q# program locally using the
[:::no-loc text="Full state"::: simulator](xref:microsoft.quantum.machines.overview.full-state-simulator). 

If you need help setting up your environment to run Q# programs locally, see [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview).

You can also explore different [Q# code samples](/samples/browse/?languages=qsharp) to run locally with the QDK.

## Create and run applications for :::no-loc text="No Control Flow"::: profile targets

:::no-loc text="No Control Flow"::: profile targets can run a wide variety of Q# applications, with
the constraint that they can't use results from qubit measurements to control
the program flow. More specifically, values of type `Result` do not support
equality comparison.

For example, this operation can **not** be run on a :::no-loc text="No Control Flow"::: target:

```qsharp
    operation SetQubitState(desired : Result, q : Qubit) : Result {
        if (desired != M(q)) {
            X(q);
        }
    }
```

Trying to run this operation on a :::no-loc text="No Control Flow"::: target will fail because it evaluates a comparison between two results (`desired != M(q)`)
to control the computation flow with an `if` statement. This will be applicable to any type of [conditional branching](xref:microsoft.quantum.qsharp.conditionalbranching), such as `elif` and `else` statements. 

> [!NOTE]
> Currently, you can't submit quantum programs that apply operations on qubits that have been measured in :::no-loc text="No Control Flow"::: targets, even
> if you don't use the results to control the program flow. That is, :::no-loc text="No Control Flow"::: targets don't allow mid-circuit measurements.
>
> For example, the following code can **not** be run on a :::no-loc text="No Control Flow"::: target:
> ```qsharp
> operation MeasureQubit(q : Qubit) : Result { 
>    return M(q); 
> }
>
> operation SampleMeasuredQubit(q : Qubit) : Result {
>     H(MeasureQubit(q));
>     return M(MeasureQubit(q));
> }
> ```

Presently, these :::no-loc text="No Control Flow"::: targets are available for Azure Quantum:

- **Provider:** IonQ
  - [IonQ simulator](xref:microsoft.quantum.providers.ionq#quantum-simulator) (`ionq.simulator`)
  - [IonQ QPU](xref:microsoft.quantum.providers.ionq##quantum-computer) (`ionq.qpu`)

- **Provider:** Rigetti
  - [Rigetti Simulator](xref:microsoft.quantum.providers.rigetti#simulators) (`rigetti.sim.*`)
  - [Rigetti QPU](xref:microsoft.quantum.providers.rigetti#quantum-computers) (`rigetti.qpu.*`)

## Create and run applications for :::no-loc text="Basic Measurement Feedback"::: profile targets

:::no-loc text="Basic Measurement Feedback"::: profile targets can run a wide variety of Q# applications, with the constraint that you can only compare values of type `Result` as part of conditions within `if` statements in operations. This profile type supposes an improvement over :::no-loc text="No Control Flow"::: profiles, but still is subject to some limitations.

:::no-loc text="Basic Measurement Feedback"::: profile targets allow measurement-based conditional operations and **mid-circuit measurements**, meaning that qubits can be selectively measured at a point other than the final statement of a quantum program, and the output of the measurement can be used in other operations. Mid-circuit measurement enables multiple measurements at any point throughout the quantum program. The quantum information of the measured qubits collapses to a classical state (zero or one), but the non-measured qubits retain their quantum state.

In Q# when measuring a qubit, a value of type `Result` is returned. If you want to use this result in a conditional statement, you have to directly compare in the conditional statement. The corresponding conditional blocks may not contain `return` or `set` statements. 

For example, the following Q# code would be allowed in a :::no-loc text="Basic Measurement Feedback"::: target:
```qsharp
operation MeasureQubit(q : Qubit) : Result { 
    return M(q); 
}

operation SetToZero(q : Qubit) : Unit {
     if MeasureQubit(q) == One { X(q); )
}
```
 
However, the same code with the Boolean evaluation moved would **not** be allowed:
 
```qsharp
operation BeOne(q : Qubit) : Bool {
     return M(q) == One;
}

operation SetToZeroUsingBeOne(q : Qubit) : Unit {
     if BeOne(q) { X(q); }
}
```

The `SetQubitState `operation in [:::no-loc text="No Control Flow"::: target profile](#create-and-run-applications-for-no-control-flow-profile-targets) can be used in a :::no-loc text="Basic Measurement Feedback"::: target as long as you don't include any `return` or `set` statement within the `if` statement. This will be applicable to any type of [conditional branching](xref:microsoft.quantum.qsharp.conditionalbranching), such as `elif` and `else` statements.  For example, the following operation can **not** be used in a :::no-loc text="Basic Measurement Feedback"::: target:

```qsharp
    operation SetQubitState(desired : Result, q : Qubit) : Result {
    if desired != M(q) {
        X(q);
        return M(q);
    }
}
```

Presently, these :::no-loc text="Basic Measurement Feedback"::: targets are available for Azure Quantum:

- **Provider:** Quantinuum
  - [Quantinuum System Model H1-1 and H1-2](xref:microsoft.quantum.providers.quantinuum#system-model-h1) (`quantinuum.qpu.h1-1`, `quantinuum.qpu.h1-2`)
