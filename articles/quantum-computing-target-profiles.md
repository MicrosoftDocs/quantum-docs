---
author: azure-quantum-content
description: This document provides an overview of target profile types available in Azure Quantum and their limitations. 
ms.date: 10/22/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [QIR, Base, Adaptive RI, target, targets, full, Adaptive RIF]
title: Target Profile Types 
uid: microsoft.quantum.target-profiles

# customer intent: As a quantum developer, I want to understand the different target profile types available in Azure Quantum and their limitations so that I can develop quantum programs that run on the appropriate quantum devices.
---

# Different types of target profiles in Azure Quantum

Quantum devices are still an emerging technology and unfortunately not all of them can run every Q# program. As such, you need to keep some restrictions in mind while you develop quantum programs. The target profile types define the capabilities of the quantum devices that you target with your Q# programs. The Microsoft Quantum Development Kit (QDK) has a set of different target profile types, which together support all the capabilities of the current quantum devices that are available in Azure Quantum.

This article discusses the different types of target profiles in Azure Quantum, their limitations, and how to configure them in the QDK.

## Target profiles and their limitations

Currently, Azure Quantum and the QDK manage different target profiles, depending on their ability to run [quantum intermediate representation (QIR) programs](xref:microsoft.quantum.concepts.qir).

- [**:::no-loc text="Unrestricted":::**:](#create-and-run-programs-for--target-profile) This profile can run any QIR program, and thus any Q# program, within the limits of memory for simulators or the number of qubits for physical quantum computers.
- [**:::no-loc text="Base":::**:](#create-and-run-programs-for--target-profile-1) This profile can run any Q# program that doesn't require the use of the results from qubit measurements to control the program flow. Within a Q# program that's targeted for this kind of QPU, values of type `Result` don't support equality comparison.
- [**:::no-loc text="Adaptive RI":::**:](#create-and-run-programs-for--target-profile-2) This profile has limited ability to use the results from qubit measurements to control the program flow. Within a Q# program that's targeted for this kind of QPU, you can compare values of type `Result` as part of conditions within `if` statements in operations, allowing mid-circuit measurement.
- [**:::no-loc text="Adaptive RIF":::**:](#create-and-run-programs-for--target-profile-3) This profile has the same capabilities as the :::no-loc text="Adaptive RI"::: profile, but also supports floating point operations.

## Create and run programs for :::no-loc text="Unrestricted"::: target profile

:::no-loc text="Unrestricted"::: target profiles can run all Q# program, so you can write Q# code without the need to consider functionality restrictions. Azure Quantum doesn't provide any actual device targets that support this profile. However, you can run :::no-loc text="Unrestricted"::: Q# programs that have this profile on the simulators that are provided with the QDK.

### Configure :::no-loc text="Unrestricted"::: target profile

If you don't manually set your QIR target profile, then the compiler automatically sets the target profile for you. The compiler chooses the most restrictive profile that still allows your program to run on the Azure Quantum device target that you choose.

To manually set the QIR target profile to **Unrestricted**, choose one of the following options:

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "unrestricted"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, include `@EntryPoint(Unrestricted)` right before the entrypoint operation in your program, even when that operation is the default `Main`.

- In Python, call the `qdk.init` method to set the target profile.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Unrestricted) 
  ```

## Create and run programs for :::no-loc text="Base"::: target profile

:::no-loc text="Base"::: target profiles can run a wide variety of Q# applications, with the constraint that they can't use results from qubit measurements to control the program flow. More specifically, values of type `Result` don't support equality comparison.

For example, you can't run the following `FlipQubitOnZero` operation on a :::no-loc text="Base"::: target:

```qsharp
    @EntryPoint(Base)
    operation FlipQubitOnZero() : Unit {
        use q = Qubit();
        if M(q) == Zero {
            X(q);
        }
    }
```

The `FlipQubitOnZero` operation fails when you run this code on a :::no-loc text="Base"::: target because the target device can't use the result of a qubit measurement to perform conditional logic while the quantum algorithm is running. If you plan to run algorithms on a :::no-loc text="Base"::: target device, then make sure that your code doesn't contain any `if` blocks for [conditional branching](xref:microsoft.quantum.qsharp.conditionalbranching) that rely on measured qubits to evaluate a logical condition.

### Configure :::no-loc text="Base"::: target profile

To manually set the QIR target profile to **Base**, choose one of the following options:

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "base"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, include `@EntryPoint(Base)` right before the entrypoint operation in your program, even when that operation is the default `Main`.

- In Python, call the `qdk.init` method to set the target profile.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Base) 
  ```

### Supported targets for :::no-loc text="Base"::: target profile

For now, Azure Quantum provides access to the following :::no-loc text="Base"::: targets:

| Provider | Simulator         | QPU             |
|----------|-------------------|-----------------|
| IonQ     | `ionq.simulator`  | `ionq.qpu.*`    |
| Rigetti  | `rigetti.sim.*`   | `rigetti.qpu.*` |

To learn more about these providers in Azure Quantum, see [IonQ provider](xref:microsoft.quantum.providers.ionq) and [Rigetti provider](xref:microsoft.quantum.providers.rigetti).

## Create and run programs for :::no-loc text="Adaptive RI"::: target profile

:::no-loc text="Adaptive RI"::: target profiles can run a wider variety of Q# applications than :::no-loc text="Base"::: profiles, but still have some limitations. Unlike :::no-loc text="Base"::: target profiles, :::no-loc text="Adaptive RI"::: targets support mid-circuit measurements.

With mid-circuit measurements, you can selectively measure qubits at any point in the quantum program, not just the end. You can then use the measurement results for other operations in your program, like conditional branching with `if` blocks. The qubits that you measure mid-circuit collapse to a classical state (zero or one), but the non-measured qubits remain in their quantum state.

When you measure a qubit in Q#, a value of type `Result` is returned. If you want to use this result in a conditional statement, you have to directly compare in the conditional statement. The corresponding conditional blocks may not contain `return` or `set` statements.

For example, the following Q# code is allowed in a :::no-loc text="Adaptive RI"::: target:

```qsharp
@EntryPoint(Adaptive_RI)
operation MeasureQubit(q : Qubit) : Result { 
    return M(q); 
}

operation SetToZero(q : Qubit) : Unit {
     if MeasureQubit(q) == One { X(q); }
}
```

### Configure :::no-loc text="Adaptive RI"::: target profile

To manually set the QIR target profile to **Adaptive RI**, choose one of the following options:

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "adaptive_ri"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, include `@EntryPoint(Adaptive_RI)` right before the entrypoint operation in your program, even when that operation is the default `Main`.

- In Python, call the `qdk.init` method to set the target profile.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Adaptive_RI) 
  ```

### Supported targets for :::no-loc text="Adaptive RI"::: target profile

For now, Quantinuum is the only provider in Azure Quantum that has :::no-loc text="Adaptive RI"::: targets.

- **Emulators:** `quantinuum.sim.h2-1e` and `quantinuum.sim.h2-2e`
- **QPUs:** `quantinuum.qpu.h2-1` and `quantinuum.qpu.h2-2`

For more information on Quantinuum's offerings in Azure Quantum, see [Quantinuum Emulators](xref:microsoft.quantum.providers.quantinuum).

## Create and run programs for :::no-loc text="Adaptive RIF"::: target profile

:::no-loc text="Adaptive RIF"::: target profiles have all the capabilities of :::no-loc text="Adaptive RI"::: profiles, but also support Q# programs that contain floating point calculations.

For example, the following Q# code is allowed in a :::no-loc text="Adaptive RIF"::: target:

```qsharp
@EntryPoint(Adaptive_RIF)
operation DynamicFloat() : Double {
    use q = Qubit();
    H(q);
    mutable f = 0.0;
    if M(q) == One {
        f = 0.5;
    }
    Reset(q);
    return f;
}
```

### Configure :::no-loc text="Adaptive RIF"::: target profile

To manually set the QIR target profile to **Adaptive RIF**, choose one of the following options:

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "adaptive_rif"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, include `@EntryPoint(Adaptive_RIF)` right before the entrypoint operation in your program, even when that operation is the default `Main`.

- In Python, call the `qdk.init` method to set the target profile.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Adaptive_RIF) 
  ```

### Supported targets for :::no-loc text="Adaptive RIF"::: target profile

For now, Azure Quantum doesn't have :::no-loc text="Adaptive RIF"::: targets. However, you can run programs for :::no-loc text="Adaptive RIF"::: targets on the local simulator in the QDK.
