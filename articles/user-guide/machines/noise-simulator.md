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
- Python host programs
- Q# standalone notebooks
- C# host programs

The preview simulators are **not yet** supported by:
- Q# standalone command-line programs
- QIR-based executables

## Invoking the preview simulators from Python

You need to create a Python host program that invokes the quantum program, and can further process returned results. For additional details, see [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

1. You start by importing the [QuTiP library](https://qutip.org/), a popular Python library for manipulating states and processes of closed and open quantum systems.

```python
import qutip as qt
```
2. You can enable the use of the experimental simulators by using the `qsharp.experimental` module:

```python
import qsharp
import qsharp.experimental
qsharp.experimental.enable_noisy_simulation()
```
After calling `enable_noisy_simulation()`, Q# operations imported into Python will expose a `.simulate_noise()` method that can be used to run Q# programs against the experimental simulators.

By default, `.simulate_noise()` method will assume an ideal error model (that is, no noise). To configure a particular error model, you can use the `qsharp.experimental.get_noise_model` and `qsharp.experimental.set_noise_model` functions to get and set the current noise model for the preview simulators. Each error model is represented as a dictionary from intrinsic operation names to objects representing the errors in those intrinsic operations.

3. In the same folder as the Python host program, create the following Q# program in a file called `NoisySimulation.qs`:

```qsharp
namespace NoisySimulation {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Diagnostics;

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
4. Add the following code to your host program to import the Q# operation `DumpPlus`:

```python
from NoisySimulation import DumpPlus

print(DumpPlus.simulate_noise())
```
```output
[[0.5000000000000001 + 0*i , 0.5000000000000001 + 0*i],
[0.5000000000000001 + 0*i , 0.5000000000000001 + 0*i]]
```

5. Looking at the output, you can notice two distinct differences with the output from [default simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) with `.simulate()`:

- The preview simulators use quantum registers of a fixed size (by default, three qubits), and allocate qubits from that register.
- By default, the preview simulators represent quantum states as density operators $\rho = \left|\psi\right\rangle\left\langle\psi\right|$ instead of as state vectors $\left|\psi\right\rangle$.

For example, in the output above, the preview simulator has output the density operator $\rho = \left|+00\right\rangle\left\langle+00\right|$, as we can verify by using QuTiP.

```python
ket_zero = qt.basis(2, 0)
ket_one = qt.basis(2, 1)
ket_plus = (ket_zero + ket_one).unit()

ket_psi = qt.tensor(ket_plus, ket_zero, ket_zero)

rho = ket_psi * ket_psi.dag()
print(rho)
```

> [!NOTE]
> The QuTiP library is a very handful library to work with quantum states. In QuTiP notation, quantum states are written as `qt.basis(d,s)`, where *d* is the dimension of the systems and *s* is the state. For example, the quantum state $|0\rangle$ can be written as `ket_zero = qt.basis(2, 0)`. To learn more about QuTiP methods and features, see the [QuTiP user guide](https://qutip.org/docs/latest/guide/guide.html).

## Configuring Open Systems Noise Models

1. The preview simulators can be configured by the use of the `qsharp.config` object. For example, to change the size of the register used to one qubit, you can modify the `experimental.simulators.nQubits` configuration setting:

```python
qsharp.config['experimental.simulators.nQubits'] = 1
print(DumpPlus.simulate_noise())
```
```output
[[0.5000000000000001 + 0*i , 0.5000000000000001 + 0*i],
[0.5000000000000001 + 0*i , 0.5000000000000001 + 0*i]]
```
2. You can modify the noise model used in simulating Q# programs by using several functions in the `qsharp.experimental` module. For instance, to initialize the noise model to an **ideal model** (that is, with no noise), you can use `set_noise_model_by_name`. You can then access the noise model by using `get_noise_model`:

```python
qsharp.experimental.set_noise_model_by_name('ideal')
noise_model = qsharp.experimental.get_noise_model()
```
> [!NOTE]
> If you are using Jupyter Notebooks to develop you Python program, you use the `%noise_model --set-by-name` magic command to initialize the noise model to an ideal model.

This noise model is represented as a Python dictionary from preparations, measurements, and gates to Python objects representing the noise in each. For example, in the ideal noise model, the `Microsoft.Quantum.Intrinsic.H` operation is simulated by a unitary matrix:

```python
print(noise_model['h'])
```
```output
[[0.707 , 0.707],[0.707 , -0.707]]
```

3. You can modify the noise model to add **depolarizing noise** using QuTiP functions to build a depolarizing noise channel:

```python
I, X, Y, Z = [P.as_qobj() for P in qsharp.Pauli]

def depolarizing_noise(p=1.0):
    return p * qt.to_super(I) + ((1 - p) / 4) * sum(map(qt.to_super, [I, X, Y, Z]))
    
noise_model['h'] = depolarizing_noise(0.99) * qt.to_super(qt.qip.operations.hadamard_transform())

print(noise_model['h'])
```
```output
[[0.500 , 0.495 , 0.495 , 0.500],[0.495 , -0.495 , 0.495 , -0.495],[0.495 , 0.495 , -0.495 , -0.495],[0.500 , -0.495 , -0.495 , 0.500]]

You can apply the depolarizing noise model to the density operator $\rho = \left|0\right\rangle\left\langle0\right|$ to check how the density operator changes under the effects of depolarizing noise.

```python
ket_zero = qt.basis(2, 0)
rho_zero = ket_zero * ket_zero.dag()
print(rho_zero)
noise_model['h'](rho_zero)
print(rho_zero_dep_noise)
```
```output
rho_zero = [[1.0 , 0.0],[0.0 , 0.0]]
rho_zero_dep_noise = [[0.500 , 0.495],[0.495 , 0.500]]
```

4. Once you have modified our noise model in this way, you can set it as the active noise model used in simulating Q# programs:

```python
qsharp.experimental.set_noise_model(noise_model)
```
Using this model, you no longer get the exact $\rho=|+\rangle\langle+|$ state, but the Q# program has incurred some small error due to noise in the application of `Microsoft.Quantum.Intrinsic.H`:
``python
print(DumpPlus.simulate_noise())
```
```output
[[0.5032581095356969 + 0*i , 0.4951069263733158 + 0 i],[0.4951069263733158 + 0*i , 0.49667422634133085 + 0*i]]
```

> [!TIP]
> Any noise model $\Delta_{\lambda}$ has a operator-sum representation on a density matrix $\rho$, such that $\Delta_{\lambda }(\rho )=\sum_{i=0}^{3}K_{i}\rho K_{i}^{\dagger}$, where $K_{i}$ are the *Kraus operators*. 
> 
> You can calculate the Kraus decomposition of a noise model using the QuTiP library:
> 
> ```python
> qt.to_kraus(noise_model['h'])
> ```
> ```output
> [Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
> Qobj data =
> [[ 0.06123724 -0.02041241]
> [-0.02041241  0.02041241]],
> Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
> Qobj data =
> [[ 0.70445014  0.70445014]
>  [ 0.70445014 -0.70445014]],
> Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = False
> Qobj data =
> [[ 0.05707046 -0.02948997]
>  [ 0.00190948  0.02948997]],
> Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = False
> Qobj data =
> [[-0.00103545  0.04950143]
>  [ 0.00197827  0.05044425]]]
> ```

## Configuring Stabilizer Noise Models

You can configure the preview simulator to be used with stabilizer circuits, also known as CHP simulation. CHP is a high-performance simulator of stabilizer circuits, that is quantum circuits that consist of controlled-NOT, Hadamard, and π/2 phase gates as well as 1-qubit measurement gates. Stabilizer circuits can be simulated efficiently on a classical computer.

1. Create a new noise model by using `get_noise_model_by_name` and set it as the active noise model:

```python
noise_model = qsharp.experimental.get_noise_model_by_name('ideal_stabilizer')
qsharp.experimental.set_noise_model(noise_model)
```
2. To make the best use of stabilizer noise models, you also need to configure the simulator to start off in the stabilizer representation:

```python
qsharp.config['experimental.simulators.representation'] = 'stabilizer'
print(DumpPlus.simulate_noise())
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
