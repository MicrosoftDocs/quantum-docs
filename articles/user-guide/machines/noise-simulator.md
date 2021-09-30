---
author: SoniaLopezBravo
description: Learn how to run your Q# programs on the Microsoft Quantum Development Kit noise simulator.
ms.author: v-sonialopez
ms.date: 09/28/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Noise quantum simulator - Quantum Development Kit
uid: microsoft.quantum.machines.overview.noise-simulator
---

# Quantum Development Kit (QDK) preview simulator

Quantum systems that are very well isolated from their environments such that no other system interacts with the qubits are called *closed quantum systems*. By contrast, a device that is subject to some amount of  interaction, or *noise* from its environment is an *open quantum system*. 

As a preview feature, the Quantum Development Kit provides a preview simulator for simulation of open quantum systems. This feature allows for simulating the behavior of Q# programs under the influence of noise, and also for using the *stabilizer representation* (also known as CHP simulation) of quantum algorithms, that is algorithms consisting solely of CNOT, Hadamard, and phase gates. 

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
'text/plain': 'Mixed state on 3 qubits: [ [0.5000000000000001 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0.5000000000000001 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] [0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] [0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] [0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] [0.5000000000000001 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0.5000000000000001 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] [0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] [0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] [0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i, 0 + 0 i] ]'
```

5. Looking at the output, you can notice two distinct differences with the output from [default simulator](xref:microsoft.quantum.machines.overview.full-state-simulator), which can be invoked by `.simulate()`:

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
```output
Quantum object: dims = [[2, 2, 2], [2, 2, 2]], shape = (8, 8), type = oper, isherm = True
Qobj data =
[[0.5 0.  0.  0.  0.5 0.  0.  0. ]
 [0.  0.  0.  0.  0.  0.  0.  0. ]
 [0.  0.  0.  0.  0.  0.  0.  0. ]
 [0.  0.  0.  0.  0.  0.  0.  0. ]
 [0.5 0.  0.  0.  0.5 0.  0.  0. ]
 [0.  0.  0.  0.  0.  0.  0.  0. ]
 [0.  0.  0.  0.  0.  0.  0.  0. ]
 [0.  0.  0.  0.  0.  0.  0.  0. ]]
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
'text/plain': 'Mixed state on 1 qubits: [ [0.5000000000000001 + 0 i, 0.5000000000000001 + 0 i] [0.5000000000000001 + 0 i, 0.5000000000000001 + 0 i] ]'
```
2. You can modify the noise model used in simulating Q# programs by using several functions in the `qsharp.experimental` module. For instance, to initialize the noise model to an **ideal model** (that is, with no noise), you can use `set_noise_model_by_name`. You can then access the noise model by using `get_noise_model`:

```python
qsharp.experimental.set_noise_model_by_name('ideal')
noise_model = qsharp.experimental.get_noise_model()
```
> [!NOTE]
> If you are using Jupyter Notebooks to develop you Python program, you use the `%noise_model --set-by-name` magic command to initialize the noise model to an ideal model.

This noise model is represented as a Python dictionary from preparations, measurements, and gates to Python objects representing the noise in each. For example, in the ideal noise model, the <xref:Microsoft.Quantum.Intrinsic.H> is simulated by a unitary matrix:

```python
print(noise_model['h'])
```
```output
Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
Qobj data =
[[ 0.70710678  0.70710678]
 [ 0.70710678 -0.70710678]]
```

3. The **depolarizing channel** is a simple model for noise in quantum systems. A quantum channel can be view as a map $\Delta_{p}$, depending on one parameter $\lambda$ , which maps a quantum state $\rho$ to a quantum state $\rho^{'}$. The single-qubit depolarizing channel is written as:

$$\Delta_{p}(\rho) = (1-p) \frac{\mathbb{I}}{2} + p \rho $$

You can modify the noise model to add **depolarizing noise** using QuTiP functions. 

```python
I, X, Y, Z = [P.as_qobj() for P in qsharp.Pauli]

def depolarizing_noise(p=1.0):
    return p * qt.to_super(I) + ((1 - p) / 4) * sum(map(qt.to_super, [I, X, Y, Z]))
    
noise_model['h'] = depolarizing_noise(0.99) * qt.to_super(qt.qip.operations.hadamard_transform())

print(noise_model['h'])
```
```output
Quantum object: dims = [[[2], [2]], [[2], [2]]], shape = (4, 4), type = super, isherm = True
Qobj data =
[[ 0.5    0.495  0.495  0.5  ]
 [ 0.495 -0.495  0.495 -0.495]
 [ 0.495  0.495 -0.495 -0.495]
 [ 0.5   -0.495 -0.495  0.5  ]]
 ```

You can apply the depolarizing noise model to the density operator $\rho_{\text{zero}} = \left|0\right\rangle\left\langle0\right|$ to check how it changes under the effects of depolarizing noise. Using this model, you no longer get the exact state $\rho_{+}=|+\rangle\langle+|$ state, but the Q# program has incurred some small error due to noise in the application of <xref:Microsoft.Quantum.Intrinsic.H>:

```python
ket_zero = qt.basis(2, 0)
rho_zero = ket_zero * ket_zero.dag()
rho_zero_dep_noise = noise_model['h'](rho_zero)
print(rho_zero_dep_noise)
```
```output
Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
Qobj data =
[[0.5   0.495]
 [0.495 0.5  ]]
```

4. Once you have modified our noise model in this way, you can set it as the active noise model used in simulating Q# programs:

```python
qsharp.experimental.set_noise_model(noise_model)
print(DumpPlus.simulate_noise())
```
```output
'text/plain': 'Mixed state on 1 qubits: [ [0.5002403569793327 + 0 i, 0.49578581259001314 + 0 i] [0.49578581259001314 + 0 i, 0.499235767960659 
+ 0 i] ]'
```

> [!TIP]
> Any quantum channel has a operator-sum representation on a density matrix $\rho$, such that $\Delta_{p}(\rho )=\sum_{i}K_{i}\rho K_{i}^{\dagger}$, such that $\sum_{i}K_{i}^{\dagger}K_{i} = \mathcal{I}$ where matrices $K_{i}$ are the *Kraus operators*.
> 
> You can calculate the Kraus decomposition of a noise model using the QuTiP library:
> 
> ```python
> kraus_operators = qt.to_kraus(noise_model['h'])
> print(kraus_operators)
> ```
> ```output
>[Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
>Qobj data =
>[[ 0.06123724 -0.02041241]
> [-0.02041241  0.02041241]], Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
>Qobj data =
>[[ 0.70445014  0.70445014]
> [ 0.70445014 -0.70445014]], Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = False
>Qobj data =
>[[ 0.01550345 -0.03309488]
> [ 0.0506863   0.03309488]], Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = False
>Qobj data =
>[[-2.74180053e-18  5.00000000e-02]
> [-5.27753089e-18  5.00000000e-02]]]
> ```

## Configuring Stabilizer Noise Models

You can configure the preview simulator to be used with stabilizer circuits or algorithms, also known as CHP simulation. CHP (CNOT-Hadamard-Phase) is a high-performance simulator of stabilizer circuits, that is quantum algorithms that consist solely of controlled-NOT, Hadamard, and π/2 phase gates, as well as 1-qubit measurement gates. Stabilizer algorithms can be simulated efficiently on a classical computer, which is shown by [the Gottesman–Knill theorem](https://en.wikipedia.org/wiki/Gottesman%E2%80%93Knill_theorem).

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
The visualization of the output is the following:

$$\left(\begin{array}{c|c|c}0 & 1 & 0\\\hline 1 & 0 & 0\end{array}\right)$$

> [!TIP]
> If you are running the Python host program from the terminal, you will obtain the *html* metadata as output of `print(.simulate_noise())`. For easier visualization, Jupyter Notebooks display *html* tables within the same notebook.

3. Notably, the stabilizer representation does not support operations outside of the stabilizer formalism, such as T and CCNOT. This allows the stabilizer representation to support significantly more qubits than other representations. For example, consider a quantum register of 10 qubits:

```python
qsharp.config['experimental.simulators.nQubits'] = 10
print(DumpPlus.simulate_noise())
```
The visualization of the output is the following:

$$\left(\begin{array}{cccccccccc|cccccccccc|c}0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
\hline
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0\end{array}\right)$$

4.  Modify the Q# program with the following code, where `DumpBellPair` operation performs `DumpMachine` function to a Bell pair, which is an entangled paid of qubits. 

```qsharp
operation DumpBellPair() : Unit {
    use left = Qubit();
    use right = Qubit();
    within {
        H(left);
        CNOT(left, right);
    } apply {
        DumpMachine();
    }
}
```
5. Run `DumpBellPair` operation using the stabilizer noise simulator. For simplicity, let's consider a quantum register of 4 qubits.

```python
from NoisySimulation import DumpBellPair

qsharp.config['experimental.simulators.nQubits'] = 4
DumpBellPair.simulate_noise()
```

The visualization of the output is the following:

$$\left(\begin{array}{cccc|cccc|c}0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0\\
0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0\\
\hline
1 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 1 & 1 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0\end{array}\right)$$


6. The visualization style for stabilizer states can be selected by using the `experimental.simulators.stabilizerStateStyle` configuration setting. 

For example, you can select the visualization without destabilizers with 'matrixWithoutDestabilizers':

```python
qsharp.config['experimental.simulators.stabilizerStateStyle'] = 'matrixWithoutDestabilizers'
```
$$\left(\begin{array}{cccc|cccc|c}1 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 1 & 1 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0\end{array}\right)$$

To select the representation of the stabilizer group, use 'denseGroupPresentation':

```python
qsharp.config['experimental.simulators.stabilizerStateStyle'] = 'denseGroupPresentation'
```
$$\left\langle XX𝟙𝟙, ZZ𝟙𝟙, 𝟙𝟙Z𝟙, 𝟙𝟙𝟙Z \right\rangle $$

To select the representation of the stabilizer group without the identity matrix, use 'sparseGroupPresentation':

```python
qsharp.config['experimental.simulators.stabilizerStateStyle'] = 'sparseGroupPresentation'
```
$$\left\langle X_{0}X_{1}, Z_{0}Z_{1}, Z_{2}, Z_{3} \right\rangle $$

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

- Assertions (e.g.: `AssertMeasurement` and `AssertMeasurementProbability`) are not supported, as these assertions may fail for correct code in the presence of noise. These assertions are no-ops on the preview simulators.

## See also

- [Quantum full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)
- [Quantum resources estimator](xref:microsoft.quantum.machines.overview.resources-estimator)
- [Quantum Toffoli simulator](xref:microsoft.quantum.machines.overview.toffoli-simulator)
- [Quantum trace simulator](xref:microsoft.quantum.machines.overview.qc-trace-simulator.intro)
