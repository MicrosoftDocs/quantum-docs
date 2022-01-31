---
author: cjgronlund
description: This document provides an overview of targets and target profile types in Azure Quantum.
ms.date: 01/27/2022
ms.author: cgronlun
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: Understanding target profile types in Azure Quantum
uid: microsoft.quantum.target-profiles
---

# Target profile types in Azure Quantum

This article discusses the different type of target profile types available in the quantum computing providers in Azure Quantum. 

## Quantum Processing Units (QPU): different profiles

A quantum processing unit (QPU) is a physical or simulated processor that
contains a number of interconnected qubits that can be manipulated to compute
quantum algorithms. It's the central component of a quantum computer or quantum simulator.

Quantum devices are still an emerging technology, and not all of them can run all Q# code. As such, you need to keep some restrictions in mind when developing programs for different targets. Currently, Azure Quantum and the QDK manage three different profiles for QPUs:

### Create and run applications for Full profile targets

**Full** profile targets can run any Q# program, meaning you can
write programs without functionality restrictions. Azure Quantum does not provide
any target with this profile yet, but you can try any Q# program locally using the
[full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) or the [resources estimator](xref:microsoft.quantum.machines.overview.resources-estimator) from the QDK. 

If you need help setting up your environment to run Q# programs locally, see [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview).

You can also explore different [Q# code samples](/samples/browse/?languages=qsharp) to run locally with the QDK.

### Create and run applications for No Control Flow profile targets

**No Control Flow** profile targets can run a wide variety of Q# applications, with
the constraint that they can't use results from qubit measurements to control
the program flow. More specifically, values of type `Result` do not support
equality comparison.

For example, this operation can NOT be run on a No Control Flow target:

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
> Currently, there is an additional limitation for this type of profile target: *you can't apply operations on qubits that have been measured, even
> if you don't use the results to control the program flow.* This limitation is
> not inherent to this profile type but is circumstantial to the situation of the Public
> Preview.

Presently, these No Control Flow targets are available for Azure Quantum:

- **Provider:** IonQ
  - IonQ simulator (`ionq.simulator`)
  - IonQ QPU: (`ionq.qpu`)

## Create and run applications for Basic Measurement Feedback targets

**Basic Measurement Feedback** profile targets can run a wide variety of Q#
applications, with the constraint that you can only compare values of type `Result` as part of conditions within `if` statements in operations. The
corresponding conditional blocks may not contain `return` or `set` statements. This profile type supposes an improvement over No Control Flow profiles, but still is subject to
some limitations.

Presently, these Basic Measurement Feedback targets are available for Azure Quantum:

- **Provider:** Quantinuum
  - Honeywell System Model H0 (`honeywell.hqs-lt-1.0`)
  - Honeywell System Model H1 (`honeywell.hqs-lt-s1`)
