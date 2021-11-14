---
author: SoniaLopezBravo
description: Learn how quantum operations affect the states of open systems.
ms.author: v-sonialopez
ms.date: 11/12/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Open systems
uid: microsoft.quantum.concepts.opensystems
---

# Open quantum systems

Quantum systems that are very well isolated from their environments such that no other system interacts with the qubits are called *closed quantum systems*. By contrast, a device that is subject to some amount of  interaction, or *noise*, from its environment is an *open quantum system*. 
 
The Quantum Development Kit provides a [noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator) for simulation of open quantum systems. This feature allows for simulating the behavior of Q# programs under the influence of noise, and also for using the *stabilizer representation* (also known as CHP simulation) of quantum algorithms, that is, algorithms consisting solely of [CNOT](xref:Microsoft.Quantum.Intrinsic.CNOT), [Hadamard](xref:Microsoft.Quantum.Intrinsic.H), and phase gates. 

This article explains some of the basic concepts on open quantum systems, and how quantum operations affect the states of open systems. 

## Invoking the noise simulators from Python

You need to create a Python host program that invokes the quantum program, and can further process returned results. For additional details, see [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

1. You start by importing the [QuTiP library](https://qutip.org/), a popular Python library for manipulating states and processes of closed and open quantum systems.

```python
import qutip as qt
import numpy as np
import matplotlib.pyplot as plt

```

2. You can enable the use of the noise simulators by using the `qsharp.experimental` module:

```python
import qsharp
import qsharp.experimental
qsharp.experimental.enable_noisy_simulation()
```
After calling `enable_noisy_simulation()`, Q# operations imported into Python expose a `.simulate_noise()` method that can be used to run Q# programs against the noise simulators.

By default, `.simulate_noise()` method assumes an *ideal error* model (that is, no noise). To configure a particular error model, you can use the `qsharp.experimental.get_noise_model` and `qsharp.experimental.set_noise_model` functions to get and set the current noise model for the preview simulators. Each error model is represented as a dictionary from intrinsic operation names to objects representing the errors in those intrinsic operations. For more information, see [Configuring open systems noise models](#configuring-open-systems-noise-models).


## Revisiting quantum states

Before proceeding to discuss representing open quantum systems, it's helpful to quickly revisit representations of closed quantum systems. In particular, the state of an $n$-qubit register can be represented as a vector of $2^n$ complex numbers. For example, the state of a single qubit can be written as a vector of the form

$$
\begin{aligned}
    \ket{\psi} = \alpha \ket{0} + \beta \ket{1} = \left( \begin{matrix}
        \alpha \\ \beta
    \end{matrix} \right)
\end{aligned}
$$

for complex numbers $\alpha$ and $\beta$ such that $|\alpha|^2 + |\beta|^2 = 1$.

In Q#, you can ask the default simulator to dump the state that it uses to simulate quantum programs, getting back a description of that state as a vector of this form. For more information, see [Dump functions](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging#dump-functions).

1. In the same folder as the Python host program, create the following Q# program in a file called `DumpSimulation.qs`:

```qsharp
namespace DumpSimulation {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Random;

    operation DumpPlus() : Unit {
        use q = Qubit();
        within {
            H(q);
        } apply {
            DumpMachine();
        }
    }
}
```

> [!Note]
> The `@EntryPoint()` attribute used for Q# applications cannot be used with host programs. An error will be raised if it is present in the Q# file being called by a host.

1. Add the following code to your host program to import the Q# operation `DumpPlus`:

```python
from DumpSimulation import DumpPlus

print(DumpPlus.simulate_noise())
```
Calling <xref:Microsoft.Quantum.Diagnostics.DumpMachine> generates the following output:

```output
# wave function for qubits with ids (least to most significant): 0
∣0❭:     0.707107 +  0.000000 i  ==     ***********          [ 0.500000 ]     --- [  0.00000 rad ]
∣1❭:     0.707107 +  0.000000 i  ==     ***********          [ 0.500000 ]     --- [  0.00000 rad ]
```

The first row provides a comment with the ids of the corresponding qubits in their significant order.
The rest of the rows describe the probability amplitude of measuring the basis state vector $\ket{n}$ in both Cartesian and polar formats. In detail for the first row:

* **`∣0❭:`** this row corresponds to the `0` computational basis state
* **`0.707107 +  0.000000 i`**: the probability amplitude in Cartesian format.
* **` == `**: the `equal` sign separates both equivalent representations.
* **`**********  `**: A graphical representation of the magnitude, the number of `*` is proportionate to the probability of measuring this state vector.
* **`[ 0.500000 ]`**: the numeric value of the magnitude
* **`    ---`**: A graphical representation of the amplitude's phase (see the following output).
* **`[ 0.0000 rad ]`**: the numeric value of the phase (in radians).


The above diagnostic tells you that at the point when `DumpMachine` is called, the state of the qubit is given by the vector $\ket{+} \mathrel{:=} (\ket{0} + \ket{1}) / \sqrt{2} \approx 0.7071 \ket{0} + 0.7071 \ket{1}$.

You can also write this state in QuTiP notation, using `qt.basis(2, i)` to represent $\ket{i}$ on a single qubit:

```python
ket0 = qt.basis(2, 0)
ket1 = qt.basis(2, 1)
ket_plus = (1 / np.sqrt(2)) * (ket0 + ket1)
print(ket_plus)

```


When measuring a qubit in the $\ket{+}$ state in the $Z$-basis, we get Zero and One with equal probability:

```qsharp
operation SampleRandomBit() : Result {
    use q = Qubit();
    H(q);
    return MResetZ(q);
}
```
```python
from DumpSimulation import SampleRandomBit
print(sum(SampleRandomBit.simulate() for _ in range(100)))
```
```output
54
```
Importantly, though, the $\ket{+}$ state is not inherently random — we can determinstically return to the $\ket{0}$ state by applying another H operation:

```qsharp
operation ApplyHTwiceAndMeasure() : Result {
    use q = Qubit();
    H(q);
    H(q);
    return MResetZ(q);
}
```
```python
from DumpSimulation import ApplyHTwiceAndMeasure
print(sum(ApplyHTwiceAndMeasure.simulate() for _ in range(100)))
```
```output
0
```
## Preparing random states

As opposed to preparing $\ket{+}$ and measuring, you could also consider flipping a coin classically, and using the outcome to prepare either the $\ket{0}$ or $\ket{1}$ state. Thus, if the outcome is "heads", the qubit is prepared in the $\ket{0}$ state, and if the outcome is "tails", the qubit is prepared in the $\ket{1}$ state.

```qsharp
operation PrepareAndMeasureRandomState() : Result {
    use q = Qubit();
    if DrawRandomBool(0.5) {
        X(q);
    }
    return MResetZ(q);
}
```
Doing so, we get the same 50/50 outcomes that we saw before:

```python
from import PrepareAndMeasureRandomState
print(sum(PrepareAndMeasureRandomState.simulate() for _ in range(100)))
```
```output
45
```
This time, however, when we apply H again, we don't get back to a determinstic outcome:
```qsharp
operation ApplyHToRandomStateAndMeasure() : Result {
    use q = Qubit();
    if DrawRandomBool(0.5) {
        X(q);
    }
    H(q); // Doesn't get us back to 0 state
    return MResetZ(q);
}
```
```python
from import PrepareAndMeasureRandomState
print(sum(ApplyHToRandomStateAndMeasure.simulate() for _ in range(100)))
```
```output
42
```

### Density operator

As it turns out, there is no single vector that represents the state prepared by `ApplyHToRandomStateAndMeasure` unless you know the outcome of the random coin flip `(DrawRandomBool(0.5))`. If you don't know the outcome of the coin flip, the quantum state is given by the following *ensemble* of state vectors,

$$
\begin{aligned}
    \rho =
        \left\{
            \ket{0} \text{ with probability 50%}, \quad
            \ket{1} \text{ with probability 50%}
        \right\}.
\end{aligned}
$$

Given a quantum state $\ket{\psi}$ the probability of the outcome $\ket{\phi}$ after a measurement is given by the Born's rule,

$$
\begin{aligned}
    \Pr(\phi | \psi) &amp; = \left|\left\langle \phi | \psi \right\rangle\right|^2 \\
                     &amp; = \left\langle \phi | \psi \right\rangle \left\langle \psi | \phi \right\rangle.
\end{aligned}
$$

The trick here is to average over the different state vectors that could be prepared by the `ApplyHToRandomStateAndMeasure` operation:

$$
\begin{aligned}
    \Pr(\phi | \rho)
        &amp; = \mathbb{E}_{\psi \sim \rho} \left[
            \Pr(\phi | \psi)
        \right] \\
        &amp; = \mathbb{E}_{\psi \sim \rho} \left [
            \left\langle \phi | \psi \right\rangle \left\langle \psi | \phi \right\rangle
        \right] \\
        &amp; = \sum_i \Pr(\psi_i) \left\langle \phi | \psi_i \right\rangle \left\langle \psi_i | \phi \right\rangle \\
        &amp; = \left\langle
            \phi \Bigg| \left(
                \sum_i \Pr(\psi_i) \ket{\psi_i} \bra{\psi_i}
            \right) \Bigg| \phi
        \right\rangle.
\end{aligned}
$$

Factoring out $\bra{\phi}$ and $\ket{\phi}$ in the last step gives us a neat new way of writing out ensembles of state vectors as matrices called [**density operators**](xref:microsoft.quantum.concepts.dirac#density-operators). For example, the ensemble $\rho$ can also be written out as the following density operator,

$$
\begin{aligned}
    \rho &amp; = \sum_i \Pr(\psi_i) \ket{\psi_i} \bra{\psi_i} \\
         &amp; = \frac{1}{2} \ket{0} \bra{0} + \frac{1}{2} \ket{1} \bra{1} \\
         &amp; = \frac{1}{2} \left( \begin{matrix}
             1 &amp; 0 \\ 0 &amp; 1
         \end{matrix} \right).
\end{aligned}
$$

Using density operators, you can write both ensembles of states, as well as the projectors on to those state vectors. For example, the $\ket{+}$ state can be written as the density operator

$$
\begin{aligned}
    \ket{+}\bra{+} = 
    \frac{1}{2} \left( \begin{matrix}
        1 &amp; 1 \\ 1 &amp; 1
    \end{matrix} \right).
\end{aligned}
$$

That is, even though both `SampleRandomBit` and `PrepareAndMeasureRandomState` both prepare density operators with the same diagonal elements (and thus have the same measurement probabilies in the $Z$-basis), the two density operators have different off-diagonal elements. 



