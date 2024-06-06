---
author: SoniaLopezBravo
description: This document provides an overview of target profile types available in Azure Quantum and their limitations. 
ms.date: 05/29/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Base QIR, QIR Adaptive RI, target, targets, full]
title: QIR Target Profile Types 
uid: microsoft.quantum.target-profiles
---

# QIR target profile types in Azure Quantum

This article discusses the different type of QIR target profile types available in the quantum computing providers in Azure Quantum. The QIR target profile types are used to define the capabilities of the quantum devices that you can target with your Q# programs.

## Target profiles and their limitations 

Quantum devices are still an emerging technology, and not all of them can run all Q# code. As such, you need to keep some restrictions in mind when developing programs for different targets. Currently, Azure Quantum and the QDK manage three different target profiles:

- **:::no-loc text="Unrestricted":::**: This profile can run any QIR program within the limits of memory for simulators or the number of qubits for physical quantum computers.
- **:::no-loc text="QIR base":::**: This profile can run any Q# program that doesn't require the use of the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, values of type `Result` don't support equality comparison.
- **:::no-loc text="QIR Adaptive RI":::**: This profile has limited ability to use the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, you can compare values of type `Result` as part of conditions within `if` statements in operations, allowing mid-circuit measurement.

## Create and run applications for :::no-loc text="Unrestricted"::: target profile

:::no-loc text="Unrestricted"::: target profiles can run any program, meaning you can write Q# programs without functionality restrictions. Azure Quantum doesn't provide
any target with this profile. However, you can run :::no-loc text="Unrestricted"::: Q# programs on simulators provided by the QDK.

### Configure :::no-loc text="Unrestricted"::: target profile

In Visual Studio Code:

1. Select **View -> Command Palette** and type **Q#: Set the Azure Quantum QIR target profile**. Press **Enter**.
1. Select **Unrestricted**.

In Python, you can set the target profile using the `qsharp.init` method.

```python
qsharp.init(target_profile=qsharp.TargetProfile.Unrestricted) 
```

## Create and run applications for :::no-loc text="Base QIR"::: target profile

:::no-loc text="Base QIR"::: target profiles can run a wide variety of Q# applications, with the constraint that they can't use results from qubit measurements to control
the program flow. More specifically, values of type `Result` don't support equality comparison.

For example, this operation **can't** be run on a :::no-loc text="Base QIR"::: target:

```qsharp
    operation SetQubitState(desired : Result, q : Qubit) : Result {
        if (desired != M(q)) {
            X(q);
        }
    }
```

If you try to run this operation on a :::no-loc text="Base QIR"::: target, the operation will fail because it does a comparison using a measurement result (`M(q) == Zero`)
to control the computation flow with an `if` statement. The same is applicable to any type of [conditional branching](xref:microsoft.quantum.qsharp.conditionalbranching), such as `elif` and `else` statements. 

> [!NOTE]
> Currently, you can't submit quantum programs that apply operations on qubits that have been measured in :::no-loc text="Base QIR"::: targets, even
> if you don't use the results to control the program flow. That is, :::no-loc text="Base QIR"::: targets don't allow mid-circuit measurements.
>
> For example, the following code **can't** be run on a :::no-loc text="Base QIR"::: target:
>
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

### Configure :::no-loc text="Base QIR"::: target profile

In Visual Studio Code:

1. Select **View -> Command Palette** and type **Q#: Set the Azure Quantum QIR target profile**. Press **Enter**.
1. Select **QIR base**.

In Python, you can set the target profile using the `qsharp.init` method.

```python
qsharp.init(target_profile=qsharp.TargetProfile.Base) 
```

### Supported targets

Currently, these :::no-loc text="Base QIR"::: targets are available for Azure Quantum:

- **Provider:** IonQ
  - [IonQ simulator](xref:microsoft.quantum.providers.ionq#quantum-simulator) (`ionq.simulator`)
  - [IonQ QPU](xref:microsoft.quantum.providers.ionq##quantum-computer) (`ionq.qpu`)

- **Provider:** Rigetti
  - [Rigetti Simulator](xref:microsoft.quantum.providers.rigetti#simulators) (`rigetti.sim.*`)
  - [Rigetti QPU](xref:microsoft.quantum.providers.rigetti#quantum-computers) (`rigetti.qpu.*`)

## Create and run applications for :::no-loc text="QIR Adaptive RI"::: profile targets

:::no-loc text="QIR Adaptive RI"::: profile targets can run a wide variety of Q# applications, with the constraint that you can only compare values of type `Result` as part of conditions within `if` statements in operations. This profile type supposes an improvement over :::no-loc text="Base QIR"::: profiles, but still is subject to some limitations.

:::no-loc text="QIR Adaptive RI"::: profile targets allow measurement-based conditional operations and **mid-circuit measurements**, meaning that qubits can be selectively measured at a point other than the final statement of a quantum program, and the output of the measurement can be used in other operations. Mid-circuit measurement enables multiple measurements at any point throughout the quantum program. The quantum information of the measured qubits collapses to a classical state (zero or one), but the non-measured qubits retain their quantum state.

In Q# when measuring a qubit, a value of type `Result` is returned. If you want to use this result in a conditional statement, you have to directly compare in the conditional statement. The corresponding conditional blocks may not contain `return` or `set` statements. 

For example, the following Q# code would be allowed in a :::no-loc text="QIR Adaptive RI"::: target:

```qsharp
operation MeasureQubit(q : Qubit) : Result { 
    return M(q); 
}

operation SetToZero(q : Qubit) : Unit {
     if MeasureQubit(q) == One { X(q); }
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

The `SetQubitState ` operation in :::no-loc text="Base QIR"::: can be used in a :::no-loc text="QIR Adaptive RI"::: target as long as you don't include any `return` or `set` statement within the `if` statement. This will be applicable to any type of [conditional branching](xref:microsoft.quantum.qsharp.conditionalbranching), such as `elif` and `else` statements.  For example, the following operation can **not** be used in a :::no-loc text="QIR Adaptive RI"::: target:

```qsharp
    operation SetQubitState(desired : Result, q : Qubit) : Result {
    if desired != M(q) {
        X(q);
        return M(q);
    }
}
```

### Configure :::no-loc text="QIR Adaptive RI"::: target profile

In Visual Studio Code:

1. Select **View -> Command Palette** and type **Q#: Set the Azure Quantum QIR target profile**. Press **Enter**.
1. Select **QIR Adaptive RI**.

In Python, you can set the target profile using the `qsharp.init` method.

```python
qsharp.init(target_profile=qsharp.TargetProfile.Adaptive_RI) 
```

### Supported targets

Currently, these :::no-loc text="QIR Adaptive RI"::: targets are available for Azure Quantum:

- **Provider:** Quantinuum
  - [Quantinuum Emulators](xref:microsoft.quantum.providers.quantinuum) (`quantinuum.sim.h1-1e`, `quantinuum.sim.h2-1e`)
  - [Quantinuum QPUs](xref:microsoft.quantum.providers.quantinuum) (`quantinuum.qpu.h1-1`, `quantinuum.qpu.h2-1`)
