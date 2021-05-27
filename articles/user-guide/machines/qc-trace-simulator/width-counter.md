---
author: vadym-kl
description: Learn about the Microsoft QDK width counter, which uses the Quantum trace simulator to count the number of qubits allocated and borrowed by operations in a Q# program.
ms.author: vadym
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Width counter - Quantum Development Kit
uid: microsoft.quantum.machines.overview.qc-trace-simulator.width-counter
---

# Quantum trace simulator: width counter

The width counter is a part of the Quantum Development Kit [Quantum trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro). You can use it to count the number of qubits allocated and borrowed by each operation in a Q# program. Some primitive operations can allocate extra qubits, for example, multiply controlled `X` operations or controlled `T` operations.

## Invoking the width counter

To run the quantum trace simulator with the width counter, you must create a <xref:Microsoft.Quantum.Simulation.Simulators.QCTraceSimulators.QCTraceSimulatorConfiguration> instance, set the `UseWidthCounter` property to **true**, and then create a new <xref:Microsoft.Quantum.Simulation.Simulators.QCTraceSimulators.QCTraceSimulator> instance with the `QCTraceSimulatorConfiguration` as the parameter. 

```csharp
var config = new QCTraceSimulatorConfiguration();
config.UseWidthCounter = true;
var sim = new QCTraceSimulator(config);
```

## Using the width counter in a C# host program

The C# example that follows in this section computes the number of extra qubits allocated by the implementation of a multiply controlled <xref:Microsoft.Quantum.Intrinsic.X> operation, based on the following Q# sample code:

```qsharp
open Microsoft.Quantum.Intrinsic;
open Microsoft.Quantum.Arrays;
operation ApplyMultiControlledX( numberOfQubits : Int ) : Unit {
    use qubits = Qubit[numberOfQubits];
    Controlled X (Rest(qubits), Head(qubits));
}
```

The multiply controlled <xref:Microsoft.Quantum.Intrinsic.X> operation acts on a total of five qubits, allocates two [ancillary qubits](xref:microsoft.quantum.glossary-qdk#ancilla), and has an input width of **5**. Use the following C# program to verify the counts:

```csharp 
var config = new QCTraceSimulatorConfiguration();
config.UseWidthCounter = true;
var sim = new QCTraceSimulator(config);
int totalNumberOfQubits = 5;
var res = ApplyMultiControlledX.Run(sim, totalNumberOfQubits).Result;

double allocatedQubits = 
    sim.GetMetric<Primitive.X, ApplyMultiControlledX>(
        WidthCounter.Metrics.ExtraWidth,
        functor: OperationFunctor.Controlled); 

double inputWidth =
    sim.GetMetric<Primitive.X, ApplyMultiControlledX>(
        WidthCounter.Metrics.InputWidth,
        functor: OperationFunctor.Controlled);
```

The first part of the program runs the `ApplyMultiControlledX` operation. The second part uses the [`QCTraceSimulator.GetMetric`](/dotnet/api/microsoft.quantum.simulation.simulators.qctracesimulators.qctracesimulator.getmetric) method to retrieve the number of allocated qubits as well as the number of qubits that the `Controlled X` operation received as input. 

Finally, you can output all the statistics collected by the width counter in CSV format using the following:
```csharp
string csvSummary = sim.ToCSV()[MetricsCountersNames.widthCounter];
```

## See also

- The Quantum Development Kit [Quantum trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro) overview.
- The <xref:Microsoft.Quantum.Simulation.Simulators.QCTraceSimulators.QCTraceSimulator> API reference.
- The <xref:Microsoft.Quantum.Simulation.Simulators.QCTraceSimulators.QCTraceSimulatorConfiguration> API reference.
- The <xref:Microsoft.Quantum.Simulation.Simulators.QCTraceSimulators.MetricsNames.WidthCounter> API reference.