---
author: bradben
description: Learn how to obtain resource estimates using a quantum trace simulator in Azure Quantum
ms.author: brbenefield
ms.date: 07/29/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: sample
no-loc: ['Q#', '$$v']
title: Obtaining resource counts
uid: microsoft.quantum.libraries.overview-chemistry.examples.overview.resourcecounts
---

# Obtaining resource counts

The cost of simulating $n$ qubits on classical computers scales exponentially with $n$. This greatly limits the size of a quantum chemistry simulation we may perform with the full-state simulator. For large instances of chemistry, we may nevertheless obtain useful information. Here, we examine how resource costs, such as the number of T-gates or CNOT gates, for simulating chemistry may be obtained in an automated fashion using the [trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro). Such information informs us of when quantum computers might be large enough to run these quantum chemistry algorithms. For reference, see the provided `GetGateCount` sample.

Let us assume that we already have a `FermionHamiltonian` instance, say, loaded from the Broombridge schema as discussed in the [loading-from-file](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.loadhamiltonian) example.

```csharp
// The code snippets in this section require the following namespaces.
// Make sure to include these at the top of your file or namespace.
using Microsoft.Quantum.Chemistry;
using Microsoft.Quantum.Chemistry.Broombridge;
using Microsoft.Quantum.Chemistry.OrbitalIntegrals;
using Microsoft.Quantum.Chemistry.Fermion;
using Microsoft.Quantum.Chemistry.Paulis;
using Microsoft.Quantum.Chemistry.QSharpFormat;
using Microsoft.Quantum.Simulation.Simulators.QCTraceSimulators;
using System.Linq;
```

```csharp
    // Filename of Hamiltonian to be loaded.
    var filename = @"...";
    // This creates a stream that can be passed to the deserializer
    using var textReader = System.IO.File.OpenText(filename);

    // This deserializes Broombridge.
    var problem = BroombridgeSerializer.Deserialize(textReader).First();

    // This extracts the `OrbitalIntegralHamiltonian` from Broombridge format,
    // then converts it to a fermion Hamiltonian, then to a Jordan-Wigner
    // representation.
    var orbitalIntegralHamiltonian = problem.OrbitalIntegralHamiltonian;
    var fermionHamiltonian = orbitalIntegralHamiltonian.ToFermionHamiltonian(IndexConvention.UpDown);
    var jordanWignerEncoding = fermionHamiltonian.ToPauliHamiltonian(QubitEncoding.JordanWigner);

    // The desired initial state, assuming that a description of it is present in the
    // Broombridge schema.
    var state = "...";
    var wavefunction = problem.InitialStates[state].ToIndexing(IndexConvention.UpDown);

    // This is a data structure representing the Jordan-Wigner encoding 
    // of the Hamiltonian that we may pass to a Q# algorithm.
    var qSharpHamiltonianData = jordanWignerEncoding.ToQSharpFormat();
    var qSharpWavefunctionData = wavefunction.ToQSharpFormat();
    var qSharpData = Convert.ToQSharpFormat(qSharpHamiltonianData, qSharpWavefunctionData);
```

The syntax for obtaining resource estimates is almost identical to running the algorithm on the full-state simulator. We simply choose a different target machine. For the purposes of resource estimates, it suffices to evaluate the cost of a single Trotter step, or a quantum walk created by the Qubitization technique. The boilerplate for invoking these algorithms is as follows.

```qsharp
open Microsoft.Quantum.Intrinsic;
open Microsoft.Quantum.Chemistry.JordanWigner;

/// This allocates qubits and applies a single Trotter step.
operation RunTrotterStep (qSharpData: JordanWignerEncodingData) : Unit {

    // The data describing the Hamiltonian for all these steps is contained in
    // `qSharpData`
    // We use a Product formula, also known as `Trotterization` to
    // simulate the Hamiltonian.
    // The integrator step size does not affect the gate cost of a single step.
    let trotterStepSize = 1.0;

    // Order of integrator
    let trotterOrder = 1;
    let (nQubits, (rescaleFactor, oracle)) = TrotterStepOracle(qSharpData, trotterStepSize, trotterOrder);

    // We not allocate qubits an run a single step.
    use qubits = Qubit[nQubits];
    oracle(qubits);
    ResetAll(qubits);
}

/// This allocates qubits and applies a single qubitization step.
operation RunQubitizationStep (qSharpData: JordanWignerEncodingData) : Double {

    // The data describing the Hamiltonian for all these steps is contained in
    // `qSharpData`
    let (nQubits, (l1Norm, oracle)) = QubitizationOracle(qSharpData);

    // We now allocate qubits and run a single step.
    use qubits = Qubit[nQubits] {
        oracle(qubits);
        ResetAll(qubits);
    }

    return l1Norm;
}
```

We now configure the trace simulator to track the resources we are interested in. In this case, we count primitive quantum operations by setting the `usePrimitiveOperationsCounter` flag to `true`. A technical detail `throwOnUnconstraintMeasurement` is set to `false` to avoid exceptions in cases where the Q# code does not correctly assert of probability of measurement outcomes, if any are performed.

```csharp
private static QCTraceSimulator CreateAndConfigureTraceSim()
{
    // Create and configure Trace Simulator
    var config = new QCTraceSimulatorConfiguration()
    {
        UsePrimitiveOperationsCounter = true,
        ThrowOnUnconstrainedMeasurement = false
    };

    return new QCTraceSimulator(config);
}
```

We now run the quantum algorithm from the driver program as follows.

```csharp
    // Instantiate a trace simulator instance
    QCTraceSimulator sim = CreateAndConfigureTraceSim();

    // Run the quantum algorithm on the trace simulator.
    RunQubitizationStep.Run(sim, qSharpData);

    // Print all resource counts to file.
    var gateStats = sim.ToCSV();
    foreach (var x in gateStats)
    {
        System.IO.File.WriteAllLines($"QubitizationGateCountEstimates.{x.Key}.csv", new string[] { x.Value });
    }
```
