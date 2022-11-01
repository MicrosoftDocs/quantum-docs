---
author: tedhudek
description: Describes the quantum simulators available as target machines for Q# programs.
ms.author: tedhudek
ms.date: 10/26/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Quantum simulators and Q# programs
uid: microsoft.quantum.machines.overview
---

# Quantum simulators

Quantum simulators are software programs that run on classical computers and act as the *target machine* for a Q# program, making it possible to run and test quantum programs in an environment that predicts how qubits will react to different operations. 

The quantum simulator is responsible for providing implementations of quantum operations for an algorithm. This includes primitive operations such as `H`, `CNOT`, and `Measure`, as well as qubit management and tracking. The Quantum Development Kit includes different classes of quantum simulators representing different ways of simulating the same quantum algorithm.

Each type of quantum simulator can provide different implementations of these primitives. For example, the [full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) runs the quantum algorithm by fully simulating the [quantum state vector](xref:microsoft.quantum.glossary-qdk#quantum-state), whereas the [quantum computer trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro) doesn't consider the actual quantum state at all. Rather, it tracks gate, qubit, and other resource usage for the algorithm.

## Quantum machine classes

In the future, the QDK will define additional quantum machine classes to support other types of simulation and to support running on quantum hardware. Allowing the algorithm to stay constant while varying the underlying machine implementation makes it easy to test and debug an algorithm in simulation and then run it on real hardware with confidence
that the algorithm hasn't changed.

|Simulator |Class| Namespace|Description|
|-----|------|---|------|
|[Full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)| `QuantumSimulator` | `Microsoft.Quantum.Simulation.Simulators`| Runs and debugs quantum algorithms, and is limited to about 30 qubits. |
|[Sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator)| `SparseSimulator` | `Microsoft.Quantum.Simulation.Simulators`| Simulates quantum algorithms with sparse states, small number of states in superposition. |
|[Simple resources estimator](xref:microsoft.quantum.machines.overview.resources-estimator)| `ResourcesEstimator` | `Microsoft.Quantum.Simulation.Simulators`| Performs a top level analysis of the resources needed to run a quantum algorithm, and supports thousands of qubits.|
|[Trace-based resource estimator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro)|  `QCTraceSimulator` | `Microsoft.Quantum.Simulation.Simulators`| Runs advanced analysis of resources consumptions for the algorithm's entire call-graph, and supports thousands of qubits.|
|[Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator)| `ToffoliSimulator` | `Microsoft.Quantum.Simulation.Simulators`|Simulates quantum algorithms that are limited to `X`, `CNOT`, and multi-controlled `X` quantum operations, and supports million of qubits. |
|[Noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator)| `OpenSystemsSimulator` | `Microsoft.Quantum.Simulation.Simulators`|Simulates quantum algorithms under the presence of noise, and also the *stabilizer representation* (also known as CHP simulation) of quantum algorithms.|

## Next steps

For details about how to invoke target machines for Q# programs in different environments, see [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).
