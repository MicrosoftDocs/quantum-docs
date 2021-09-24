---
author: SoniaLopezBravo
description: Learn how to run your Q# programs on the Microsoft Quantum Development Kit noise simulator.
ms.author: v-sonialopez
ms.date: 09/23/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Noise quantum simulator - Quantum Development Kit
uid: microsoft.quantum.machines.overview.noise-simulator
---

# Quantum Development Kit (QDK) preview simulator

Quantum systems that are very well isolated from their environments such that no other system interacts with the qubits are called *closed quantum systems*. By contrast, a device that is subject to some amount of  interaction, or *noise* from its environment is an *open quantum system*. 

As a preview feature, the Quantum Development Kit provides a preview simulator for simulation of open quantum systems. This feature allows for simulating the behavior of Q# programs under the influence of noise, and also for using the *stabilizer representation* (also known as CHP simulation) with programs that only call Clifford operations.

Currently, the preview simulators are supported for use with:
- C# host programs
- Python host programs
- Q# standalone notebooks

The preview simulators are **not yet** supported by:
- Q# standalone command-line programs
- QIR-based executables

## Invoking  the preview simulators from Python

You start by importing the [QuTiP library]( https://qutip.org/), a popular Python library for manipulating states and processes of closed and open quantum systems.

```python
import qutip as qt
```
You can enable the use of the experimental simulators by using the `qsharp.experimental` module:

```python
import qsharp
import qsharp.experimental
qsharp.experimental.enable_noisy_simulation()
```
After calling `enable_noisy_simulation()`, Q# operations imported into Python will expose a `.simulate_noise()` method that can be used to run Q# programs against the experimental simulators.
By default, `.simulate_noise()` method will assume an ideal error model (that is, no noise). To configure a particular error model, you can use the `qsharp.experimental.get_noise_model` and `qsharp.experimental.set_noise_model` functions to get and set the current noise model for the preview simulators. Each error model is represented as a dictionary from intrinsic operation names to objects representing the errors in those intrinsic operations.


```qsharp
namespace NoisySimulation {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Measurement;

    
    @EntryPoint()
    operation DumpPlus() : Unit {
        use q = Qubit();
        H(q);
        DumpMachine();
        X(q);
        Reset(q);
    }
}
```

```python
qubit_result = DumpPlus.simulate_noise()
```




## Known issues and limitations

Since this feature is currently under active development, there are still a number of limitations and missing capabilities.

- Continuous-time rotations (e.g.: `Rx`, `Ry`, `Rz`, and `Exp`) are not yet supported.
- Fractional rotations (e.g.: `R1Frac`, `ExpFrac`) are not yet supported.
- The `Controlled Y` operation with more than one control qubit is not yet supported.
- The `Controlled T` operation is not yet supported.
- Joint measurement is not yet supported.
- In some cases, qubits may need to be manually `Reset` before releasing, even if they have been measured.

> [!NOTE]
> For more information about the development of this feature, please see the GitHub issue at <https://github.com/microsoft/qsharp-runtime/issues/714>.

Some limitations are inherent to open systems simulation, and may not ever be supported:

- Assertions (e.g.: `AssertMeasurement` and `AssertMeasurementProbability`) are not supported, as these assertions may fail for correct code in the presence of noise. These assertions are no-ops on the experimental simulators.

## See also

- [Quantum full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)
- [Quantum resources estimator](xref:microsoft.quantum.machines.overview.resources-estimator)
- [Quantum Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator)
- [Quantum trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro)
