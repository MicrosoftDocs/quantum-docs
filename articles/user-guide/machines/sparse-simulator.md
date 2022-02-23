---
author: kuzminrobin
description: Learn how to run your Q# programs on the Microsoft Quantum Development Kit sparse simulator.
ms.author: rokuzmin
ms.date: 02/18/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Sparse simulator - Quantum Development Kit
uid: microsoft.quantum.machines.overview.sparse-simulator
---

# Quantum Development Kit (QDK) sparse simulator

Sparse simulator is a simulator with discrete (sparse) states of the qubits, as opposed to the full-state simulator. Sparse states of the qubits minimize the memory footprint of the quantum state thus enabling the larger number of qubits. This feature is efficient for a class of quantum algorithms with a smaller number of states in superposition. This simulator is an unlocker for users to explore larger applications than what can be explored using the full-state simulator alone.

## Invoking and running the sparse simulator

The sparse simulator is exposed via the `SparseSimulator` class. For more information, see [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

### Invoking the simulator from C\#

Create an instance of the `SparseSimulator` class and then pass it to the `Run` method of a quantum operation, along with any parameters.

```csharp
    using (var sim = new SparseSimulator())
    {
        var res = myOperation.Run(sim).Result;
        ///...
    }
```

Because the `SparseSimulator` class implements the <xref:System.IDisposable> interface, you must call the `Dispose` method once you don't need the instance of the simulator anymore. The best way to automate that call is to wrap the simulator declaration and operations within a [using](/dotnet/csharp/language-reference/keywords/using-statement) statement, which automatically calls the `Dispose` method.

### Invoking the simulator from Python

Use the [simulate_sparse()](/python/qsharp-core/qsharp.loader.qsharpcallable) method from the Q# Python library with the imported Q# operation:

```python
qubit_result = myOperation.simulate_sparse()
```

### Invoking the simulator from the command line

You can use the `--simulator` (or `-s` shortcut) parameter to specify the desired target machine.

```dotnetcli
dotnet run -s SparseSimulator
```

### Invoking the simulator from Jupyter Notebooks

Use the IQ# magic command [%simulate_sparse](xref:microsoft.quantum.iqsharp.magic-ref.simulate_sparse) to run the Q# operation.

```IQ#
%simulate_sparse myOperation
```

## Seeding the simulator

By default, the sparse simulator uses a random number generator to simulate quantum randomness. For testing purposes, it's sometimes useful to have deterministic results. In a C# program, you can accomplish this determinism by providing a seed for the random number generator in the `SparseSimulator` constructor via the `randomNumberGeneratorSeed` parameter.

```csharp
    using (var sim = new SparseSimulator(randomNumberGeneratorSeed: 42))
    {
        var res = myOperationTest.Run(sim).Result;
        ///...
    }
```

## Simulator options

The behavior of the sparse simulator can be adjusted via the following parameters to the C# constructor:

- `throwOnReleasingQubitsNotInZeroState`: The simulator can warn you by throwing an exception if qubits haven't been returned to the `zero` state before release. Resetting or measuring qubits before release is required by the Q# spec - not doing so may lead to computational errors! The default is `true`.
- `randomNumberGeneratorSeed`: Obtain deterministic behavior by seeding the simulator as described above.
- `disableBorrowing`: If you don't want to use [borrowed qubits](xref:microsoft.quantum.qsharp.quantummemorymanagement#borrow-statement) for this simulation, you can disable this feature by setting this parameter to `true`. Borrowed qubits will instead be replaced with regular clean qubits. The default is `false`.
- `numQubits`: The number of qubits the sparse simulator will be operating with. The default is 64. This number has a hard limit of 1024.

The code below shows a possible configuration of the parameters.

```csharp
    var sim = new SparseSimulator (
        throwOnReleasingQubitsNotInZeroState: false,
        randomNumberGeneratorSeed: 42,
        disableBorrowing: true,
        numQubits: 73
    )
```

## See also

- [Quantum full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)
- [Quantum resources estimator](xref:microsoft.quantum.machines.overview.resources-estimator)
- [Quantum Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator)
- [Quantum trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro)
- [Quantum noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator)
