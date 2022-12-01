---
author: SoniaLopezBravo
description: Learn how to run your Q# programs on the Microsoft Quantum Development Kit sparse simulator.
ms.author: sonialopez
ms.date: 10/31/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Sparse simulator 
uid: microsoft.quantum.machines.overview.sparse-simulator
---

# Quantum Development Kit (QDK) sparse simulator

The sparse simulator is a simulator that utilizes a sparse representation of quantum state vectors, as opposed to the full-state simulator. This feature allows the sparse simulator to minimize the memory footprint used to represent quantum states, thus enabling simulations over a larger number of qubits. The sparse simulator is efficient for representing quantum states that are sparse in the computational basis, that is, quantum states for which most of the amplitude coefficients are zero in the computational basis. As such, sparse simulator enables users to explore larger applications than what can be represented using the full-state simulator which will waste both memory and time on an exponentially large number of zero-amplitudes.

For more information about the sparse simulator, please see [Jaques and Häner (arXiv:2105.01533)](https://arxiv.org/abs/2105.01533).

## Invoking and running the sparse simulator

The sparse simulator is exposed via the `SparseSimulator` class. For more information, see [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

### [Using Python](#tab/tabid-python)

Use the [simulate_sparse()](/python/qsharp-core/qsharp.loader.qsharpcallable) method from the [Q# Python library](/python/qsharp-core/qsharp) with the imported Q# operation:

```python
qubit_result = RunMyOperation.simulate_sparse()
```
### [Using commmand line](#tab/tabid-commandline)

You can use the `--simulator` (or `-s` shortcut) parameter to specify the desired target machine.

```dotnetcli
dotnet run -s SparseSimulator
```

### [Using Jupyter Notebooks](#tab/tabid-jupyter)

Use the IQ# magic command [%simulate_sparse](xref:microsoft.quantum.iqsharp.magic-ref.simulate_sparse) to run the Q# operation.

```IQ#
%simulate_sparse RunMyOperation
```

For an example of sparse simulator usage in Jupyter Notebook see the [LargeSimulation Sample](https://github.com/microsoft/Quantum/tree/main/samples/getting-started/simulation).

### [Using C#](#tab/tabid-csharp)

Create an instance of the `SparseSimulator` class and then pass it to the `Run` method of a quantum operation, along with any parameters.

```csharp
    using (var sim = new SparseSimulator())
    {
        var res = RunMyOperation.Run(sim).Result;
        ///...
    }
```

Because the `SparseSimulator` class implements the <xref:System.IDisposable> interface, you must call the `Dispose` method once you don't need the instance of the simulator anymore. The best way to automate that call is to wrap the simulator declaration and operations within a [using](/dotnet/csharp/language-reference/keywords/using-statement) statement, which automatically calls the `Dispose` method.

For an example of sparse simulator usage in C\# see the [Integer Factorization Sample](https://github.com/microsoft/Quantum/tree/main/samples/algorithms/integer-factorization).

#### Simulator options

The behavior of the sparse simulator can be adjusted via the following parameters to the C# constructor:

- `throwOnReleasingQubitsNotInZeroState`: The simulator can warn you by throwing an exception if qubits haven't been returned to the `zero` state before release. Resetting or measuring qubits before release is required by the Q# spec - not doing so may lead to computational errors! The default is `true`.
- `randomNumberGeneratorSeed`: Obtain deterministic behavior by seeding the simulator as described above.
- `disableBorrowing`: If you don't want to use [borrowed qubits](xref:microsoft.quantum.qsharp.quantummemorymanagement#borrow-statement) for this simulation, you can disable this feature by setting this parameter to `true`. Borrowed qubits will instead be replaced with regular clean qubits. The default is `false`.
- `numQubits`: The number of qubits the sparse simulator will be operating with. By default, this number is set to 64 and it has a hard limit of 1024.

The code below shows a possible configuration of the parameters.

```csharp
    var sim = new SparseSimulator(
        throwOnReleasingQubitsNotInZeroState: false,
        randomNumberGeneratorSeed: 42,
        disableBorrowing: true,
        numQubits: 73
    )
```

***
## Seeding the simulator

By default, the sparse simulator uses a random number generator to simulate quantum randomness. For testing purposes, it's sometimes useful to have deterministic results. In a C# program, you can accomplish this determinism by providing a seed for the random number generator in the `SparseSimulator` constructor via the `randomNumberGeneratorSeed` parameter.

```csharp
    using (var sim = new SparseSimulator(randomNumberGeneratorSeed: 42))
    {
        var res = RunMyTestOperation.Run(sim).Result;
        ///...
    }
```

## See also

- [Quantum full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)
- [Quantum Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator)
- [Quantum trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro)
- [Quantum noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator)
