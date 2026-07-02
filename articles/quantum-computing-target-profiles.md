---
author: azure-quantum-content
description: This article provides an overview of the QIR target profiles in the QDK.
ms.date: 06/30/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: ["QDK", "Microsoft", "Quantum Development Kit", "Azure Quantum", "QIR", "Base", "Adaptive RI", "Adaptive RIF", "Adaptive", "Unrestricted"]
title: Azure Quantum QIR target profiles in the QDK 
uid: microsoft.quantum.target-profiles
# Customer intent: As a quantum developer, I want to learn about QIR target profiles in the QDK and how to choose the correct target profile for my program and quantum hardware.
---

# Azure Quantum QIR target profiles in the QDK

Quantum computing is still an emerging technology. Not all quantum hardware can run all quantum programs. For example, only certain hardware can perform mid circuit measurements, which is required to run programs with conditional branches based on qubit measurement results.

When you submit a program to run on Azure Quantum, your program is converted to quantum intermediate representation (QIR) format. QIR doesn't depend on the programming language or type of quantum hardware that your program runs on. The Microsoft Quantum Development Kit (QDK) supports several QIR target profiles for different hardware capabilities.

For more information about QIR, see [Quantum intermediate representation](xref:microsoft.quantum.concepts.qir).

## Overview of target profiles

Azure Quantum and the QDK support several QIR target profiles. The type of target profile that you choose determines which of the following programming constructs your program can use.

- Conditional branches with `if` statements based on qubit measurement results
- Arithmetic operations on floating point numbers computed from qubit measurement results
- Fixed and unbounded loops based on qubit measurement results

The following table lists all the QIR target profiles in the QDK and the programming constructs that the target profiles support, in order from most to least restrictive.

| QIR target profile | Conditional branches | Floating point operations | Loops |
|--------------------|----------------------|---------------------------|-------|
| Base               | ❌                   | ❌                        | ❌    |
| Adaptive RI        | ✅                   | ❌                        | ❌    |
| Adaptive RIF       | ✅                   | ✅                        | ❌    |
| Adaptive           | ✅                   | ✅                        | ✅    |
| Unrestricted       | ✅                   | ✅                        | ✅    |

## Set target profiles in the QDK

To run a program on the QDK simulators or Azure Quantum target, you need to set a QIR target profile. If you don't manually set a target profile, the QDK tries to automatically set the appropriate profile for the chosen target.

when submitting programs to run through the Azure Quantum service, the QDK tries to automatically select the appropriate profile for the chosen execution target.

### Base QIR profile

The base QIR target profile is the most restrictive one. Use the base profile for simpler programs that don't use classical programming structures like branches and loops. If your quantum hardware target can't perform mid-circuit measurements, then you probably need to use the base profile.

The following Azure Quantum targets can run programs that use the base QIR profile.

| Provider | Simulator         | QPU             |
|----------|-------------------|-----------------|
| IonQ     | `ionq.simulator`  | `ionq.qpu.*`    |
| Rigetti  | `rigetti.sim.*`   | `rigetti.qpu.*` |

To learn more about these Azure Quantum providers, see [IonQ provider](xref:microsoft.quantum.providers.ionq) and [Rigetti provider](xref:microsoft.quantum.providers.rigetti).

#### Set the base profile

To set the base QIR target profile in the QDK extension for Visual Studio Code (VS Code), choose one of the following options.

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file.

  ```json
  {
    "targetProfile": "base"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, add `@EntryPoint(Base)` on the line before the entrypoint operation in your program.

    ```qsharp
    @EntryPoint(Base)
    operation Main() : Unit {

    ...

    }
    ```

To set the base target profile in the QDK Python library, run the following code.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Base) 
  ```

#### Limitations on Q# programs with base profile

The base target profile can run a wide variety of Q# programs. The main constraint is that Q# programs can't perform logical comparisons with `Result` type values from measurement operations.

For example, you can't run the following `FlipQubitOnZero` operation on a base target because the program contains an `if` statement that uses a measurement result.

```qsharp
    @EntryPoint(Base)
    operation FlipQubitOnZero() : Unit {
        use q = Qubit();
        if M(q) == Zero {
            X(q);
        }
    }
```

### Adaptive RI QIR profile

The adaptive RI target profile can run a wider variety of programs than the base profile, but still has some limitations. Adaptive RI targets support programs that use mid-circuit measurements in conditional `if` statements. If your quantum hardware can perform mid-circuit measurements and your program uses `if` statements based on measurement results, then you probably need to use the adaptive RI profile.

For example, the following Q# program can run on an adaptive RI target.

```qsharp
@EntryPoint(Adaptive_RI)
operation MeasureQubit(q : Qubit) : Result { 
    return M(q); 
}

operation SetToZero(q : Qubit) : Unit {
     if MeasureQubit(q) == One { X(q); }
}
```

The following Azure Quantum targets can run programs that use the adaptive RI target profile.

| Provider   | Simulator              | QPU                   |
|------------|------------------------|-----------------------|
| Quantinuum | `quantinuum.sim.h2-1e` | `quantinuum.qpu.h2-1` |
| Quantinuum | `quantinuum.sim.h2-2e` | `quantinuum.qpu.h2-2` |

For more information on Quantinuum in Azure Quantum, see [Quantinuum provider](xref:microsoft.quantum.providers.quantinuum).

#### Set the adaptive RI profile

To set the adaptive RI QIR target profile in the QDK extension for VS Code, choose one of the following options.

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "adaptive_ri"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, add `@EntryPoint(Adaptive_RI)` on the line before the entrypoint operation in your program.

    ```qsharp
    @EntryPoint(Adaptive_RI)
    operation Main() : Unit {

    ...

    }
    ```

To set the adaptive RI target profile in the QDK Python library, run the following code.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Adaptive_RI)
  ```

### Adaptive RIF QIR profile

The adaptive RIF target profile has the same capabilities as the adaptive RI profile, but also supports programs that contain floating point arithmetic operations. If your quantum hardware can perform mid-circuit measurements, and your program uses `if` statements and floating point numbers computed from measurement results, then you probably need to use the adaptive RIF profile.

For example, the following Q# program can run on an adaptive RIF target.

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

Azure Quantum doesn't have adaptive RIF targets at this time, but you can run programs for adaptive RIF targets on the local QDK simulators. For more information on simulators in the QDK, see [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators).

#### Set the adaptive RIF profile

To set the adaptive RIF QIR target profile in the QDK extension for VS Code, choose one of the following options.

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "adaptive_rif"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, add `@EntryPoint(Adaptive_RIF)` on the line before the entrypoint operation in your program.

    ```qsharp
    @EntryPoint(Adaptive_RIF)
    operation Main() : Unit {

    ...

    }
    ```

To set the adaptive RIF target profile in the QDK Python library, run the following code.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Adaptive_RIF) 
  ```

### Adaptive QIR profile

The adaptive target profile has the same capabilities as the adaptive RIF profile, but also supports programs that use loops based on measurement results. Adaptive programs can use loops with a set number of iterations, and repeat-until-success (RUS) loops.

Azure Quantum doesn't have adaptive targets at this time, but you can run programs for adaptive targets on the local QDK simulators. For more information on simulators in the QDK, see [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators).

#### Set the adaptive profile

To set the adaptive QIR target profile in the QDK extension for VS Code, choose one of the following options.

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "adaptive"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, add `@EntryPoint(Adaptive)` on the line before the entrypoint operation in your program.

    ```qsharp
    @EntryPoint(Adaptive)
    operation Main() : Unit {

    ...

    }
    ```

To set the adaptive target profile in the QDK Python library, run the following code.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Adaptive) 
  ```

### Unrestricted QIR profile

The unrestricted target profile can run all quantum programs. No current quantum target supports unrestricted QIR, but you can use the unrestricted profile to run complex programs on the QDK simulators for quantum development.

### Set the unrestricted profile

To set the unrestricted QIR target profile in the QDK extension for VS Code, choose one of the following options.

- If you set up a Q# project, then add the following command to your project's `qsharp.json` file:

  ```json
  {
    "targetProfile": "unrestricted"
  }
  ```

- If you're working in a `.qs` file that isn't part of a Q# project, then set the target profile directly in your Q# code. To do so, add `@EntryPoint(Unrestricted)` on the line before the entrypoint operation in your program.

    ```qsharp
    @EntryPoint(Unrestricted)
    operation Main() : Unit {

    ...

    }
    ```

To set the unrestricted target profile in the QDK Python library, run the following code.

  ```python
  from qdk import init, TargetProfile

  init(target_profile=TargetProfile.Unrestricted) 
  ```
