---
author: bradben
description: This document provides an overview of target profile types in Azure Quantum and their limitations
ms.date: 09/21/2022
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Understanding target profile types in Azure Quantum
uid: microsoft.quantum.target-profiles
---

# Target profile types in Azure Quantum

This article discusses the different type of target profile types available in the quantum computing providers in Azure Quantum. At this time, because of the early development stage of the field, quantum devices have some limitations and requirements for programs that run on them. 

## Quantum Processing Units (QPU): different profiles and their limitations 

A Quantum Processing Unit (QPU) is a physical or simulated processor that contains a number of interconnected qubits that can be manipulated to compute
quantum algorithms. It's the central component of a quantum computer or quantum simulator.

Quantum devices are still an emerging technology, and not all of them can run all Q# code. As such, you need to keep some restrictions in mind when developing programs for different targets. Currently, Azure Quantum and the QDK manage three different profiles for QPUs:

- [**Full**](#create-and-run-applications-for-full-profile-targets): This profile can run any Q# program within the limits of memory for simulators or the number of qubits for physical quantum computers.
- [**No Control Flow**](#create-and-run-applications-for-no-control-flow-profile-targets): This profile can run any Q# program that doesn't require the use of the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, values of type `Result` don't support equality comparison.
- [**Basic Measurement Feedback**](#create-and-run-applications-for-basic-measurement-feedback-profile-targets): This profile has limited ability to use the results from qubit measurements to control the program flow. Within a Q# program targeted for this kind of QPU, you can compare values of type `Result` as part of conditions within `if` statements in operations, allowing mid-circuit measurement. The corresponding conditional blocks might not contain `return` or `set` statements.

## Create and run applications for Full profile targets

Full profile targets can run any Q# program, meaning you can
write programs without functionality restrictions. Azure Quantum does not provide
any target with this profile yet, but you can try any Q# program locally using the
[full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) or the [resources estimator](xref:microsoft.quantum.machines.overview.resources-estimator) from the QDK. 

If you need help setting up your environment to run Q# programs locally, see [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview).

You can also explore different [Q# code samples](/samples/browse/?languages=qsharp) to run locally with the QDK.

## Create and run applications for No Control Flow profile targets

No Control Flow profile targets can run a wide variety of Q# applications, with
the constraint that they can't use results from qubit measurements to control
the program flow. More specifically, values of type `Result` do not support
equality comparison.

For example, this operation can **NOT** be run on a No Control Flow target:

```qsharp
    operation SetQubitState(desired : Result, q : Qubit) : Result {
        if (desired != M(q)) {
            X(q);
        }
    }
```

Trying to run this operation on a No Control Flow target will fail because it evaluates a comparison between two results (`desired != M(q)`)
to control the computation flow with an `if` statement.

> [!NOTE]
> Currently, you can't submit quantum programs that apply operations on qubits that have been measured in No Control Flow targets, even
> if you don't use the results to control the program flow. This limitation is
> not inherent to this profile type but is circumstantial to the current situation of the hardware.

Presently, these No Control Flow targets are available for Azure Quantum:

- **Provider:** IonQ
  - [IonQ simulator](xref:microsoft.quantum.providers.ionq#quantum-simulator) (`ionq.simulator`)
  - [IonQ QPU](xref:microsoft.quantum.providers.ionq##quantum-computer) (`ionq.qpu`)

- **Provider:** Rigetti
  - [Rigetti Simulator](xref:microsoft.quantum.providers.rigetti#simulators) (`rigetti.sim.*`)
  - [Rigetti QPU](xref:microsoft.quantum.providers.rigetti#quantum-computers) (`rigetti.qpu.*`)

## Create and run applications for Basic Measurement Feedback profile targets

Basic Measurement Feedback profile targets can run a wide variety of Q# applications, with the constraint that you can only compare values of type `Result` as part of conditions within `if` statements in operations. This profile type supposes an improvement over No Control Flow profiles, but still is subject to some limitations.

Basic Measurement Feedback profile targets allow measurement-based conditional operations and **mid-circuit measurements**, meaning that qubits can be selectively measured at a point other than the final statement of a quantum program, and the output of the measurement can be used in other operations. Mid-circuit measurement enables multiple measurements at any point throughout the quantum program. The quantum information of the measured qubits collapses to a classical state (zero or one), but the non-measured qubits retain their quantum state.

In Q# when measuring a qubit, a value of type `Result` is returned. If you want to use this result in a conditional statement, you have to directly compare in the conditional statement. The corresponding conditional blocks may not contain `return` or `set` statements. 

For example, the following Q# code would be allowed in a Basic Measurement Feedback target:
```qsharp
operation MeasureQubit(q : Qubit) : Result { 
return M(q); 
}

operation SetToZero(q : Qubit) : Unit {

     if(MeasureQubit(q) == One) { X(q); )

}
```
 
However, the same code with the Boolean evaluation moved would **NOT** be allowed:
 
```qsharp
operation IsOne(q : Qubit) : Bool {
     return M(q) == One;
}

operation SetToZeroUsingIsOne(q : Qubit) : Unit {
     if(IsOne(q)) { X(q); }
}
```

The `SetQubitState `operation in [No Control Flow target profile](#create-and-run-applications-for-no-control-flow-profile-targets) can be used in a Basic Measurement Feedback target as long as you don't include any `return` or `set` statement within the `if` block. For example, the following operation can **NOT** be used in a Basic Measurement Feedback target:

```qsharp
    operation SetQubitState(desired : Result, q : Qubit) : Result {
    if desired != M(q) {
        X(q);
        return M(q);
    }
}
```

Presently, these Basic Measurement Feedback targets are available for Azure Quantum:

- **Provider:** Quantinuum
  - [Quantinuum System Model H1-1](xref:microsoft.quantum.providers.quantinuum#system-model-h1-powered-by-honeywell) (`quantinuum.hqs-lt-s1`)
  - [Quantinuum System Model H1-2](xref:microsoft.quantum.providers.quantinuum#system-model-h1-powered-by-honeywell) (`quantinuum.hqs-lt-s2`)

