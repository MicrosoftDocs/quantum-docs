---
author: azure-quantum-content
description: This article provides an overview of all the quantum simulators in the QDK.
ms.author: quantumdocwriters
ms.date: 04/28/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concept-article
no-loc: ['Q#', '$$v', Microsoft Quantum Development Kit, target, targets]
title: Overview of quantum simulators in the QDK
uid: microsoft.quantum.overview.qdk-simulators
---

# Overview of quantum simulators in the QDK

The Microsoft Quantum Development Kit (QDK) includes a set of quantum simulators that let you run quantum programs on your local machine. Use the local simulators to iterate on your program before you submit the program to run on Azure Quantum targets.

The QDK has three main simulators:

- The sparse simulator
- The neutral atom device simulator
- The QIR (quantum intermediate representation) simulator

## The sparse simulator

The sparse simulator represents qubits states as sparse vectors for fast and efficient simulation. Use this simulator for general program development and to quickly iterate on results.

The sparse simulator is the default simulator in the QDK. This simulator is available in both the QDK extension for Visual Studio Code (VS Code) and the QDK Python library. You can include noise models with the sparse simulator in the QDK Python library, but not in the VS Code extension.

The sparse simulator is the only available simulator in the QDK extension for VS Code, so the compiler automatically calls this simulator when you run Q# and OpenQASM programs in VS Code.

For more information about the sparse simulator, see [The sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator).

## The neutral atom device simulator

Use the neutral atom device simulator when you plan to run quantum programs on a neutral atom quantum computer. The neutral atom simulator decomposes your program's quantum gates into the set of gates that exist on neutral atom devices. Noise models for this simulator can include noise that's specific to neutral atom technology, such as atom loss and noise from qubit movement between device zones.

The QDK offers three implementations of the neutral atom device simulator:

- **The Clifford simulator:** Fast simulation for programs that contain only Clifford gates
- **The GPU simulator:** Fast and general simulation for programs with non-Clifford gates and up to 27 qubits
- **The CPU simulator:** General simulation for programs with non-Clifford gates

The neutral atom device simulator is available only in the QDK Python library. How you call the simulator depends on the quantum language framework that you're using in the QDK library.

For more information on neutral atom device simulation, see [Neutral atom device simulator overview](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).

## The QIR simulators

QIR is an intermediate representation of your program that quantum hardware uses to 

## What simulator should I use?

### Adding Pauli noise to Python programs or Jupyter Notebooks

Pauli noise configuration is available with the `qdk.qsharp` Python package, and histogram capability with the `qdk.widgets` package. Noise is added as a parameter to the `qsharp.run` method.

- `qsharp.BitFlipNoise`
- `qsharp.PhaseFlipNoise`
- `qsharp.DepolarizingNoise`

The following sample shows the effect of 10% depolarizing noise on a Bell state measurement.

```python
from qdk import qsharp
from qdk import widgets
```

```python
%%qsharp

operation BellPair() : Result[] {
    use q = Qubit[2];
    H(q[0]);
    CNOT(q[0], q[1]);
    MResetEachZ(q)
}
```

```python
results = qsharp.run("BellPair()", 20, noise=qsharp.DepolarizingNoise(0.1))
results
```

Arbitrary Pauli noise can be added to the noise model by specifying the probabilities of each Pauli operator. Let's use the previous GHz sample program:

```python
%%qsharp

operation GHzSample() : Result[] {
    use q = Qubit[5];
    H(q[0]);
    ApplyCNOTChain(q);
    MResetEachZ(q)
}
```

This run of the program applies noise with 20% probability (bit-flip half the time and phase-flip half the time),

```python
result = qsharp.run("GHzSample()", 20, noise=(0.1, 0.0, 0.1))
display(widgets.Histogram(result))
```

and this run applies Pauli-Y noise with 10% probability.

```python
result = qsharp.run("GHzSample()", 20, noise=(0.0, 0.1, 0.0))
display(widgets.Histogram(result))
```
