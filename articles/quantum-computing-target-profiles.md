---
author: SoniaLopezBravo
description: This document provides an overview of target profile types available in Azure Quantum and their limitations. 
ms.date: 11/18/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [QIR Base, QIR Adaptive RI, target, targets, full]
title: Target Profile Types 
uid: microsoft.quantum.target-profiles
---

# Different types of target profiles in Azure Quantum

Quantum devices are still an emerging technology, and not all of them can run every Q# code. As such, you need to keep some restrictions in mind when developing quantum programs.

The target profile types are used to define the capabilities of the quantum devices that you can target with your Q# programs. 

This article discusses the different types of target profiles available in Azure Quantum, their limitations, and how to configure them in the Quantum Development Kit (QDK).

## Target profiles and their limitations 

Currently, Azure Quantum and the QDK manage three different target profiles:

- [**:::no-loc text="Unrestricted":::**:](#create-and-run-programs-for--target-profile) This profile can run any [QIR program](xref:microsoft.quantum.concepts.qir), and thus any Q# program, within the limits of memory for simulators or the number of qubits for physical quantum computers.
- [**:::no-loc text="QIR base":::**:](#create-and-run-programs-for--target-profile-1) This profile can run any Q# program that doesn't require the use of the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, values of type `Result` don't support equality comparison.
- [**:::no-loc text="QIR Adaptive RI":::**:](#create-and-run-programs-for--target-profile-2) This profile has limited ability to use the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, you can compare values of type `Result` as part of conditions within `if` statements in operations, allowing mid-circuit measurement.

## Create and run programs for :::no-loc text="Unrestricted"::: target profile

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

## Create and run programs for :::no-loc text="QIR Base"::: target profile

:::no-loc text="QIR Base"::: target profiles can run a wide variety of Q# applications, with the constraint that they can't use results from qubit measurements to control
the program flow. More specifically, values of type `Result` don't support equality comparison.

For example, this operation **can't** be run on a :::no-loc text="QIR Base"::: target:

```qsharp
    operation FlipQubitOnZero() : Unit {
        use q = Qubit();
        if M(q) == Zero {
            X(q);
        }
    }
```

If you try to run this operation on a :::no-loc text="QIR Base"::: target, the operation will fail because it does a comparison using a measurement result (`M(q) == Zero`)
to control the computation flow with an `if` statement. The same is applicable to any type of [conditional branching](xref:microsoft.quantum.qsharp.conditionalbranching), such as `elif` and `else` statements. 


### Configure :::no-loc text="QIR Base"::: target profile

In Visual Studio Code:

1. Select **View -> Command Palette** and type **Q#: Set the Azure Quantum QIR target profile**. Press **Enter**.
1. Select **QIR base**.

In Python, you can set the target profile using the `qsharp.init` method.

```python
qsharp.init(target_profile=qsharp.TargetProfile.Base) 
```

### Supported targets for :::no-loc text="QIR Base"::: target profile

Currently, the following :::no-loc text="QIR Base"::: targets are available in Azure Quantum:

- **Provider:** IonQ
  - [IonQ simulator](xref:microsoft.quantum.providers.ionq#quantum-simulator) (`ionq.simulator`)
  - [IonQ QPU](xref:microsoft.quantum.providers.ionq##quantum-computer) (`ionq.qpu.*`)

- **Provider:** Rigetti
  - [Rigetti Simulator](xref:microsoft.quantum.providers.rigetti#simulators) (`rigetti.sim.*`)
  - [Rigetti QPU](xref:microsoft.quantum.providers.rigetti#quantum-computers) (`rigetti.qpu.*`)

## Create and run programs for :::no-loc text="QIR Adaptive RI"::: target profile

:::no-loc text="QIR Adaptive RI"::: profile targets can run a wide variety of Q# applications, with some constraints. This profile type supposes an improvement over :::no-loc text="QIR Base"::: profiles, but still is subject to some limitations.

:::no-loc text="QIR Adaptive RI"::: profile targets allow measurement-based conditional operations and **mid-circuit measurements**, meaning that qubits can be selectively measured at a point other than the final statement of a quantum program, and the output of the measurement can be used in other operations. Mid-circuit measurement enables multiple measurements at any point throughout the quantum program. The quantum information of the measured qubits collapses to a classical state (zero or one), but the non-measured qubits remain in their quantum state.

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
 
### Configure :::no-loc text="QIR Adaptive RI"::: target profile

In Visual Studio Code:

1. Select **View -> Command Palette** and type **Q#: Set the Azure Quantum QIR target profile**. Press **Enter**.
1. Select **QIR Adaptive RI**.

In Python, you can set the target profile using the `qsharp.init` method.

```python
qsharp.init(target_profile=qsharp.TargetProfile.Adaptive_RI) 
```

### Supported targets for :::no-loc text="QIR Adaptive RI"::: target profile

Currently, the following :::no-loc text="QIR Adaptive RI"::: targets are available in Azure Quantum:

- **Provider:** Quantinuum
  - [Quantinuum Emulators](xref:microsoft.quantum.providers.quantinuum) (`quantinuum.sim.h1-1e`, `quantinuum.sim.h2-1e`)
  - [Quantinuum QPUs](xref:microsoft.quantum.providers.quantinuum) (`quantinuum.qpu.h1-1`, `quantinuum.qpu.h2-1`)
