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
After calling `enable_noisy_simulation()`, Q# operations imported into Python expose a `.simulate_noise()` method that can be used to run Q# programs against the experimental simulators.

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

In Q#, you can ask the default simulator to dump the state that it uses to simulate quantum programs, getting back a description of that state as a vector of this form.

```qsharp
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
```


