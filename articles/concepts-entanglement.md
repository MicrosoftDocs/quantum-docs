---
author: SoniaLopezBravo
description: Learn about entanglement, a fundamental concept in quantum computing that allows qubits to be correlated in ways that classical bits can't.
ms.author: sonialopez
ms.date: 07/08/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Entanglement & Correlations 
uid: microsoft.quantum.concepts.entanglement

#customer intent: As a quantum student, I want to learn about entanglement, so that I can understand how qubits can be correlated in ways that classical bits can't.
---

# Entanglement and correlations

Entanglement is a fundamental concept in quantum mechanics that describes a quantum correlation between quantum systems. When two or more qubits are entangled, the state of one qubit is dependent on the state of the other qubit, even if they're far apart. This quantum correlation is a unique feature of quantum systems that doesn't have a classical counterpart.

This article provides an overview of entanglement, correlations, and explains how to create entanglement using quantum gates.

## What is entanglement?

Imagine that you have two qubits, $A$ and $B$. The qubits are independent from each other, which means that the information about the state of qubit $A$, whatever it is, belongs only to qubit $A$. Similarly, the information about the state of qubit $B$ belongs to qubit $B$. In this case, the qubits aren't entangled, because they aren't sharing any information about their states.

Now imagine that you entangle the qubits. If qubits $A$ and $B$ are entangled, the information about the state of qubit $A$ isn't independent of the state of qubit $B$. When entangled, information is shared between both qubits, and there's no way to know the state of qubit $A$ or qubit $B$. You can only describe the state of the global system, not the state of the individual qubits.

Entanglement is a **quantum correlation** between two or more particles. If two particles are entangled, they can't be described independently, but only as a whole system. 

Two or more particles can be entangled even if they are separated by large distances. This correlation is stronger than any classical correlation, and it's a key resource for quantum information processing tasks such as quantum teleportation, quantum cryptography, and quantum computing. If you want to learn how to teleport a qubit using entanglement, check out [this module in the Azure Quantum training path](/training/modules/explore-entanglement/).

> [!NOTE]
> Entanglement is a property of multi-qubit systems, not of single qubits. That is, a single qubit can't be entangled.

## Defining entanglement in quantum systems

Imagine two qubits $A$ and $B$ such that the state of the global system $\ket{\phi}$ is:

$$\ket{\phi}=\frac1{\sqrt2}(\ket{0_A 0_B}+ \ket{1_A 1_B})$$

> [!NOTE]
> In [Dirac notation](xref:microsoft.quantum.concepts.dirac), $\ket{0_A 0_B}= |0\rangle_\text{A} |0\rangle_\text{B}$. The first position corresponds to the first qubit, and the second position corresponds to the second qubit.

The global system $\ket{\phi}$ is in a superposition of the states $|00\rangle$ and $|11\rangle$. But what is the individual state of qubit $A$? And of qubit $B$? If you try to describe the state of qubit $A$ without considering the state of qubit $B$, you fail. Subsystems $A$ and $B$ are entangled and can't be described independently.

If you measure both qubits, only two outcomes are possible: $\ket{00}$ and $\ket{11}$, each with the same probability of $\frac{1}{2}$. The probability of obtaining the states $|01\rangle$ and $|10\rangle$ is zero.

But what happens if you measure only one qubit? When two particles are entangled the measurement outcomes are also correlated. That is, whatever operation happens to the state of one qubit in an entangled pair, also affects to the state of the other qubit.

If you measure only the qubit $A$ and you get the $|0\rangle$ state, this means that the global system collapses to the state $\ket{00}$. This is the only possible outcome, since the probability of measuring $|01\rangle$ is zero. So, without measuring the qubit $B$ you can be sure that the second qubit is also in $|0\rangle$ state. The measurement outcomes are correlated because the qubits are entangled.

The quantum state $\ket{\phi}$ is called a **Bell state**. There are four Bell states:  

$$\ket{\phi^{+}}=\frac1{\sqrt2}\ket{00} + \frac1{\sqrt2}\ket{11}$$
$$\ket{\phi^{-}}=\frac1{\sqrt2}\ket{00} - \frac1{\sqrt2}\ket{11} $$
$$ \ket{\psi^{+}}=\frac1{\sqrt2}\ket{01} + \frac1{\sqrt2}\ket{10} $$
$$\ket{\psi^{-}}=\frac1{\sqrt2}\ket{01} - \frac1{\sqrt2}\ket{10} $$


> [!NOTE]
> This example uses two qubits, but quantum entanglement isn't limited to two qubits. In general it's possible that multiple-qubit systems share entanglement.

## Creating entanglement with quantum operations

You can use quantum operations to create quantum entanglement. One of the most common ways to create entanglement to two qubits in the state $|00\rangle$ is by applying the Hadamard operation $H$ and the controlled-NOT operation $CNOT$ to transform them into the Bell state $\ket{\phi^+}=\frac1{\sqrt2}(|00\rangle+|11\rangle)$.

Here's how it works:

1. Take two qubits in the state $|00\rangle$. The first qubit is the control qubit and the second qubit is the target qubit.
1. Create a superposition state only in the control qubit by applying $H$.

   $$H |0_c\rangle= \frac{1}{\sqrt{2}}(|0_c\rangle+|1_c\rangle)$$

   > [!NOTE]
   > The subscripts ${}_c$ and ${}_t$ specify the control and target qubits.

1. Apply the $CNOT$ operator to the control qubit, which is in a superposition state, and the target qubit, which is in the state $|0_t\rangle$.

    $$ CNOT \frac{1}{\sqrt{2}}(\ket{0_c}+\ket{1_c})\ket{0}_t = CNOT \frac{1}{\sqrt2}(\ket{0_c 0_t}+|\ket{1_c 0_t})= $$
    $$ =\frac{1}{\sqrt2}(CNOT \ket{0_c 0_t} + CNOT \ket{1_c 0_t})= $$
    $$= \frac{1}{\sqrt2}(\ket{0_c 0_t}+\ket{1_c 1_t})$$

> [!TIP]
> To learn how to entangle two qubits with Q#, see [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart).

## Separability and quantum entanglement

Entanglement can be seen as the lack of separability: a
state is entangled when it isn't separable.

A quantum state is separable if it can be written as a product state of the subsystems. That is, a state $\ket{\phi}_{AB}$ is separable if it can be written as a combination of product states of the subsystems, that is $\ket{\phi}_{AB} = \ket{a}_A \otimes \ket{b}_B$.

### Entanglement in pure states

A pure quantum state is a single ket vector, such as the state $\ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})$. 

Pure states can't be written as a statistical mixture (or *convex combination*) of other quantum states.

On the [Bloch sphere](xref:microsoft.quantum.concepts.qubit#visualizing-qubits-and-transformations-using-the-bloch-sphere), pure states are represented by a point on the surface of the sphere, whereas mixed states are represented by an interior point. 

<!-- Port concatenates most of this sentence -->

A **pure state** $\ket{\phi}_{AB}$ is entangled if it can't be written as a combination of product states of the subsystems, that is $\ket{\phi}_{AB} = \ket{a}_A \otimes \ket{b}_B$. 

For example, consider the state <!-- Port is raw code -->
$$ \ket{\psi}_{AB} = \frac{1}{2} (\ket{00} + \ket{10} +\ket{01} +\ket{11})$$

At first, the state $\ket{\psi}_{AB}$ <!-- Port works --> doesn't look like a product state, but if we rewrite the state as

<!-- Port is raw code -->
$$ \ket{\psi}_{AB} = \frac{1}{\sqrt{2}} (\ket{0}_A +\ket{1}_A) \otimes \frac{1}{\sqrt{2}} (\ket{0}_B +\ket{1}_B)= \ket{+}_A \ket{+}_B$$

the state $\ket{\psi}_{AB}$ <!-- Port works --> is a product state, therefore it's not entangled.  

### Entanglement in mixed states

<!-- there are more errors below, but I stopped here -->

Mixed quantum states are a statistical ensemble of pure states. To describe mixed states is easier to use their density matrix $\rho$ rather than the ket notation. 

A mixed state $\rho$ is separable if it can be written as a *convex combination* of product states of the subsystems, such as 

$$\rho = \sum_j p_j \rho^{A}_j \otimes \rho^{B}_j$$ 

where $p_j \geq 0, \sum p_j = 1$ and $\rho^{A}_j \geq 0, \rho^{B}_j \geq 0$.

For more information, see [Density matrices](xref:microsoft.quantum.concepts.dirac#density-operators).

A mixed state $\rho$ is entangled if it's not separable, that is, it can't be written as a convex combination of product states. 

> [!NOTE]
> - If an entangled state $\rho$ is pure, then it contains only quantum correlations. 
> - If an entangled state $\rho$ is mixed, then it contains both classical and quantum correlations. 

## Understanding classical correlations

Classical correlations are due to the lack of knowledge of the state of the system. That is, there's some randomness associated to classical correlation, but it can be eliminated by gaining knowledge.

For example, consider two boxes, each containing one ball. You know that both balls are the same color, either blue or red. If you open one box and find out that the ball inside is blue, then we know that the other ball is blue too. Therefore, they are correlated. However, the uncertainty that we have when opening the box is due to our lack of knowledge, it's not fundamental. The ball was blue before we opened the box. Thus, this is a classical correlation, not a quantum correlation. 

The mixed quantum state of the system formed by the two boxes $\rho_{boxes}$ can be written as

$$ \rho_{boxes} = \frac{1}{2} (\ket{red}\bra{red}_{A} \otimes \ket{red}\bra{red}_B) +\frac{1}{2} (\ket{blue}\bra{blue}_A \otimes \ket{blue}\bra{blue}_B) $$

Notice that the state $\rho_{boxes}$ is separable, where $p_1 = p_2 = \frac{1}{2}$ then it contains only classical correlations. Another example of a mixed separable state is

$$ \rho = \frac{1}{2} (\ket{0}\bra{0}_A \otimes \ket{0}\bra{0}_B) +\frac{1}{2} (\ket{1}\bra{1}_A \otimes \ket{1}\bra{1}_B) $$

Now, consider the following state:

$$ \rho = \frac{1}{4} (\ket{00}\bra{00} + \ket{00}\bra{11} + \ket{11}\bra{00} + \ket{11}\bra{11}) = \ket{\phi^+}\bra{\phi^+} $$

In this case, our knowledge of the state is perfect, we know with maximal certainty that the system $AB$ is in the Bell state $\ket{\phi^+}$ and $\rho$ is a pure state. Therefore, there aren't classical correlations. But if we measure an observable on subsystem $A$, we obtain a random result which gives us information about the state of the subsystem $B$. This randomness is fundamental, namely these are quantum correlations.

An example of a quantum state that contains both classical and quantum correlations is

$$ \rho = \frac{1}{2} (\ket{\phi^+}\bra{\phi^+} + \ket{\phi^-}\bra{\phi^-})$$

> [!NOTE]
> A separable state contains only classical correlations.


## Related content



