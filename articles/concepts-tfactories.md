---
author: SoniaLopezBravo
description: Learn about the role of T gates and T factories in quantum computing
ms.author: sonialopez
ms.date: 12/13/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: T gates & T factories
uid: microsoft.quantum.concepts.tfactories
---

# T gates and T factories

This article describes the role of T gates and T factories in the computation of the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator)

$T$-gate (also known as the $\pi/8$ gate)

$$T=\begin{bmatrix} 1 & 0 \\\\  0 & e^{i\pi/4} \end{bmatrix}$$

## Universal set of quantum gates

According to [DiVincenzo's criteria](https://arxiv.org/pdf/cond-mat/9612126v2.pdf) a scalable quantum computer must be able to implement a **universal set of quantum gates**. A *universal set* contains all the gates needed to perform any quantum computation, that is, any computation must decompose back into a finite sequence of universal gates. At a minimum, a quantum computer must be able to move single qubits to any position on the Bloch Sphere (using single-qubit gates), as well as introduce entanglement in the system, which requires a multi-qubit gate. 

There are only four functions that map one bit to one bit on a classical computer. In contrast, there are an infinite number of unitary transformations on a single qubit on a quantum computer. Therefore, no finite set of primitive quantum operations or gates, can exactly replicate the infinite set of unitary transformations allowed in quantum computing. This means, unlike classical computing, it is impossible for a quantum computer to implement every possible quantum program exactly using a finite number of gates. Thus quantum computers cannot be universal in the same sense of classical computers. As a result, when we say that a set of gates is *universal* for quantum computing we actually mean something slightly weaker than we mean with classical computing.

For universality, we require that a quantum computer only *approximate* every unitary matrix within a finite error using a finite length gate sequence.
In other words, a set of gates is a universal gate set if any unitary transformation can be approximately written as a product of gates from this set. It is required that for any prescribed error bound, there exist gates $G_{1}, G_{2}, \ldots, G_N$ from the gate set such that

$$
G_N G_{N-1} \cdots G_2 G_1 \approx U.
$$

Note that because the convention for matrix multiplication is to multiply from right to left the first gate operation in this sequence, $G_N$, is actually the last one applied to the quantum state vector. More formally, such a gate set is said to be universal if for every error tolerance $\epsilon>0$ there exists $G_1, \ldots, G_N$ such that  the distance between $G_N\ldots G_1$ and $U$ is at most $\epsilon$. Ideally the value of $N$ needed to reach this distance of $\epsilon$ should scale poly-logarithmically with $1/\epsilon$.

For example, the set formed by Hadamard, CNOT and T gates is a universal set, from which any quantum computation (on any number of qubits) can be generated. The Hadamard and the T gate set generates any single-qubit gate:

$$
H=\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & 1 \\\\  1 &-1  \end{bmatrix}, \qquad T=\begin{bmatrix} 1 & 0 \\\\  0 & e^{i\pi/4} \end{bmatrix}.
$$

In a quantum computer, quantum gates can be classified into two categories: Clifford gates and the $T$-gate. This subdivision is useful because in many quantum error correction (QEC)schemes the so-called Clifford gates are easy to implement, that is they require very few resources in terms of operations and qubits to implement fault tolerantly, whereas non-Clifford gates are quite costly when requiring fault tolerance. The standard set of single-qubit Clifford gates, [included by default in Q#](xref:microsoft.quantum.libraries.overview.standard.prelude), include

$$
H=\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & 1 \\\\  1 &-1  \end{bmatrix} , \qquad S =\begin{bmatrix} 1 & 0 \\\\  0 & i \end{bmatrix}= T^2, \qquad X=\begin{bmatrix} 0 &1 \\\\  1& 0 \end{bmatrix}= HT^4H,
$$

$$
Y = \begin{bmatrix} 0 & -i \\\\  i & 0 \end{bmatrix}=T^2HT^4  HT^6, \qquad Z=\begin{bmatrix}1&0\\\\ 0&-1 \end{bmatrix}=T^4.
$$

Together with the non-Clifford gate (the T gate), these operations can be composed to approximate any unitary transformation on a single qubit.


## T factories in the Azure Quantum Resource Estimator 

The non-Clifford T gate preparation is crucial because the other operations are not sufficient for universal quantum computation. To implement non-Clifford operations for practical-scale algorithms, we require low error rate T gates or T states, however these can be difficult to directly implement on logical qubits, and can also be difficult for some physical qubits.


In the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator), the required low error rate T states are produced using a T state distillation factory, or T factory for short. These T factories typically involve a sequence of rounds of distillation, where each round takes in many noisy T states encoded in a smaller distance code, processes them using a distillation unit, and outputs fewer less noisy T states encoded in a larger distance code, with the number of rounds, distillation units, and distances all being parameters which can be varied. This procedure is iterated, where the output T states of one round are fed into the next round as inputs. 

We consider T state distillation factories which are implemented in a sequence of rounds, where each round consists of a set of identical distillation units run in parallel.

For more information, see Appendix C of [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629).