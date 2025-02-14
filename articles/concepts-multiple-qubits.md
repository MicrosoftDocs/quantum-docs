---
author: SoniaLopezBravo
description: Learn the rules used to build multi-qubit states out of single-qubit states. Also learn about gate operations needed to form a many-qubit quantum computer.
ms.author: sonialopez
ms.date: 02/13/2025
ms.service: azure-quantum
ms.subservice: core
ms.topic: concept-article
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Multiple-qubit Operations
uid: microsoft.quantum.concepts.multiple-qubits

#customer intent: As a quantum student, I want to learn how to build multi-qubit states out of single-qubit states.
---

# Operations on multiple qubits

This article reviews the rules used to build multi-qubit states out of single-qubit states and discusses the gate operations needed to include in a gate set to form a universal many-qubit quantum computer. These tools are necessary to understand the gate sets that are commonly used in Q# code. They're also important to gain intuition about why quantum effects such as entanglement or interference render quantum computing more powerful than classical computing.

## Single-qubit and multi-qubit gates

The true power of quantum computing only becomes evident as you increase the number of qubits. Single qubits possess some counter-intuitive features, such as the ability to be in more than one state at a given time. However, if you only had single-qubit gates in a quantum computer, then a calculator and certainly a classical supercomputer would dwarf its computational power. 

Quantum computing power arises, in part, because the dimension of the vector space of quantum state vectors grows exponentially with the number of qubits. This means that while a single qubit can be trivially modeled, simulating a fifty-qubit quantum computation would arguably push the limits of existing supercomputers. Increasing the size of the computation by only one extra qubit *doubles* the memory required to store the state and roughly *doubles* the computational time. This rapid doubling of computational power is why a quantum computer with a relatively small number of qubits can far surpass the most powerful supercomputers of today, tomorrow, and beyond for some computational tasks.

## Two-qubit states

If you have two separate qubits, one in the state $\psi=\begin{bmatrix} \alpha \\\\  \beta \end{bmatrix}$ and the other in the state  $\phi=\begin{bmatrix} \gamma \\\\  \delta \end{bmatrix}$, the corresponding two-qubit state is the result of the tensor product, or [Kronecker product](https://en.wikipedia.org/wiki/Kronecker_product)), of vectors, which is defined as follows 

<!-- works in Port -->

$$
\psi \otimes \phi = \begin{bmatrix} \alpha \\\\  \beta \end{bmatrix} \otimes \begin{bmatrix} \gamma \\\\  \delta \end{bmatrix} 
=\begin{bmatrix} \alpha \begin{bmatrix} \gamma \\\\  \delta \end{bmatrix} \\\\ \beta \begin{bmatrix}\gamma \\\\  \delta \end{bmatrix} \end{bmatrix}
= \begin{bmatrix} \alpha\gamma \\\\  \alpha\delta \\\\  \beta\gamma \\\\  \beta\delta \end{bmatrix}.
$$

Therefore, given two single-qubit states $\psi$ and $\phi$, each of dimension 2, the corresponding two-qubit state $\psi \otimes \phi$ is 4-dimensional. The vector

<!-- Port is raw code -->

$$
\begin{bmatrix} \alpha_{00} \\\\  \alpha_{01} \\\\  \alpha_{10} \\\\  \alpha_{11} \end{bmatrix}
$$

represents a quantum state on two qubits if

<!-- Port is raw code -->

$$|\alpha_{00}|^2+|\alpha_{01}|^2+|\alpha_{10}|^2+|\alpha_{11}|^2=1.$$

More generally, you can see that the unit vector $v_1 \otimes v_2 \otimes \cdots \otimes v_n$ of dimension $2 \cdot 2 \cdot 2 \cdots = 2^n$ represents the quantum state of $n$ qubits using this construction. As with single qubits, the quantum state vector of multiple qubits holds all the information needed to describe the system's behavior. For more information about vectors and tensor products, see [Vectors and Matrices in Quantum Computing](xref:microsoft.quantum.concepts.vectors).

The computational basis for two-qubit states is formed by the tensor products of one-qubit basis states. For example, you have

<!-- Port renders but all out of whack -->

$$
\begin{align}
00 \equiv \begin{bmatrix}1 \\\\ 0 \end{bmatrix}\otimes \begin{bmatrix}1 \\\\ 0 \end{bmatrix} &= \begin{bmatrix}1 \\\\ 0\\\\ 0\\\\ 0 \end{bmatrix},\qquad 01 \equiv \begin{bmatrix}1 \\\\ 0 \end{bmatrix}\otimes \begin{bmatrix}0 \\\\ 1 \end{bmatrix} = \begin{bmatrix}0 \\\\ 1\\\\ 0\\\\ 0 \end{bmatrix},\\\\
10 \equiv \begin{bmatrix}0 \\\\ 1 \end{bmatrix}\otimes \begin{bmatrix}1 \\\\ 0 \end{bmatrix} &= \begin{bmatrix}0 \\\\ 0\\\\ 1\\\\ 0 \end{bmatrix},\qquad 11 \equiv \begin{bmatrix}0 \\\\ 1 \end{bmatrix}\otimes \begin{bmatrix}0 \\\\ 1 \end{bmatrix} = \begin{bmatrix}0 \\\\ 0\\\\ 0\\\\ 1 \end{bmatrix}.
\end{align}
$$

While you can always take the tensor product of two single-qubit states to form a two-qubit state, not all two-qubit quantum states can be written as the tensor product of two single-qubit states.
For example, there are no states $\psi=\begin{bmatrix} \alpha \\\\  \beta \end{bmatrix}$ and $\phi=\begin{bmatrix} \gamma \\\\  \delta \end{bmatrix}$ <!-- this works in Port. Compare with earlier, same formula -->such that their tensor product is the state 

<!-- this is just raw code in Port -->

$$\psi\otimes \phi = \begin{bmatrix} 1/\sqrt{2} \\\\  0 \\\\  0 \\\\  1/\sqrt{2} \end{bmatrix}.$$ 

Such a two-qubit state, which cannot be written as the tensor product of single-qubit states, is called an "entangled state"; the two qubits are said to be [*entangled*](https://en.wikipedia.org/wiki/Quantum_entanglement).  Loosely speaking, because the quantum state cannot be thought of as a tensor product of single qubit states, the information that the state holds isn't confined to either of the qubits individually.  Rather, the information is stored non-locally in the correlations between the two states.  This non-locality of information is one of the major distinguishing features of quantum computing over classical computing, and is essential for many quantum protocols, including quantum error correction.

### Measuring two-qubit states 

Measuring two-qubit states is similar to single-qubit measurements. Measuring the state

<!-- testing localization -->
<!-- Port is raw code -->

$$
    \begin{bmatrix}
        \alpha_{00} \\\\ 
        \alpha_{01} \\\\ 
        \alpha_{10} \\\\ 
        \alpha_{11}
    \end{bmatrix}
$$



yields $00$ with probability <!--Port puts everything between $ from here... -->$|\alpha_{00}|^2$, $01$ with probability $|\alpha_{01}|^2$, $10$ with probability $|\alpha_{10}|^2$, and $11$ with probability $|\alpha_{11}|^2$. The variables $\alpha_{00}, \alpha_{01}, \alpha_{10},$ and $\alpha_{11}$ were deliberately named to make this connection clear. After the measurement, if the outcome is $00$ <!-- ... to here. -->then the quantum state of the two-qubit system collapses and is now

<!-- works in Port -->

$$
    00 \equiv
    \begin{bmatrix}
        1 \\\\ 
        0 \\\\ 
        0 \\\\ 
        0
    \end{bmatrix}.
$$

It's also possible to measure just one qubit of a two-qubit quantum state. When you measure only one qubit of a two-qubit state, the impact of measurement is subtly different than measuring two qubits. It's different because the entire state isn't collapsed to a computational basis state, rather it collapses to only one subsystem.  In other words, measuring one qubit of a two-qubit state only collapses the related subsystem to a computational basis state. 

To see this, consider measuring the first qubit of the following state, which is formed by applying the Hadamard transform $H$ on two qubits initially set to the "0" state:

$$
H^{\otimes 2} \left( \begin{bmatrix}1 \\\\ 0 \end{bmatrix}\otimes \begin{bmatrix}1 \\\\ 0 \end{bmatrix} \right) = \frac{1}{2}\begin{bmatrix}1 & 1 & 1 & 1 \\\\ 1 & -1 & 1 & -1 \\\\ 1 & 1 & -1 & -1 \\\\ 1 & -1 & -1 & 1 \end{bmatrix}\begin{bmatrix}1\\\\ 0\\\\ 0\\\\ 0\end{bmatrix} = \frac{1}{2}\begin{bmatrix}1\\\\ 1\\\\ 1\\\\ 1\end{bmatrix} \mapsto \begin{cases}\text{outcome }=0 & \frac{1}{\sqrt{2}}\begin{bmatrix}1\\\\ 1\\\\ 0\\\\ 0 \end{bmatrix}\\\\ \text{outcome }=1 & \frac{1}{\sqrt{2}}\begin{bmatrix}0\\\\ 0\\\\ 1\\\\ 1 \end{bmatrix}\\\\  \end{cases}.
$$
Both outcomes have a 50% probability of occurring.  That outcome can be intuited from the fact that the quantum state before measurement doesn't change if $0$ is swapped with $1$ on the first qubit.

The mathematical rule for measuring the first or second qubit is simple.  Let <!-- Port strings all together from here... -->$e_k$ be the $k^{\rm th}$ computational basis vector and $S$ be the set of all $e_k$ such that the qubit in question takes the value $1$ for that value of $k$.  For example, if you are interested in measuring the first qubit then $S$ would consist of $e_1\equiv 10$ and $e_3\equiv 11$.  Similarly, if you are interested in the second qubit $S$ would consist of $e_2\equiv 01$ and $e_3 \equiv 11$.  Then the probability of measuring the chosen qubit to be $1$ is for state vector $\psi$<!-- to here-->


$$
P(\text{outcome}=1)= \sum_{e_k \text{ in the set } S}\psi^\dagger e_k e_k^\dagger \psi.
$$

> [!NOTE]
> This article uses the *little-endian* format to label the computational basis. In little-endian format, the least significant bits come first. For example, in little-endian format the string of bits 001 represents the number four.

Since each qubit measurement can only yield $0$ or $1$, the probability of measuring $0$ is $1-P(\text{outcome}=1)$, which is why you only need a formula for the probability of measuring $1$.

The action that such a measurement has on the state can be expressed mathematically as

$$
\psi \mapsto \frac{\sum_{e_k \text{ in the set } S} e_k e_k^\dagger \psi}{\sqrt{P(\text{outcome}=1)}}.
$$

The cautious reader may worry about what happens if the denominator is zero.  While such state is undefined, you don't need to worry about such eventualities because the probability is zero! 


If you take $\psi$ to be the uniform state vector given previously and are interested in measuring the first qubit, then 

$$
P(\text{measurement of first qubit}=1) = (\psi^\dagger e_1)(e_1^\dagger \psi)+(\psi^\dagger e_3)(e_3^\dagger \psi)=|e_1^\dagger \psi|^2+|e_3^\dagger \psi|^2.
$$

This is just the sum of the two probabilities that would be expected for measuring the results $10$ and $11$.
For our example, this evaluates to


$$
\frac{1}{4}\left|\begin{bmatrix}0&0&1&0\end{bmatrix}\begin{bmatrix}1\\\\ 1\\\\ 1\\\\ 1\end{bmatrix} \right|^2+\frac{1}{4}\left|\begin{bmatrix}0&0&0&1\end{bmatrix}\begin{bmatrix}1\\\\ 1\\\\ 1\\\\ 1\end{bmatrix} \right|^2=\frac{1}{2}.
$$

which perfectly matches our intuition.  Similarly, the state after the first qubit is measured as $1$ can be written as


$$
\frac{\frac{e_1}{2}+\frac{e_3}{2}}{\sqrt{\frac{1}{2}}}=\frac{1}{\sqrt{2}}\begin{bmatrix} 0\\\\ 0\\\\ 1\\\\ 1\end{bmatrix}
$$

again in accordance with our intuition.

### Two-qubit operations

As in the single-qubit case, any unitary transformation is a valid operation on qubits. In general, a unitary transformation on $n$ qubits is a matrix $U$ of size $2^n \times 2^n$ (so that it acts on vectors of size $2^n$), such that $U^{-1} = U^\dagger$.
For example, the CNOT (controlled-NOT) gate is a commonly used two-qubit gate and is represented by the following unitary matrix:


$$
\operatorname{CNOT} = \begin{bmatrix} 1\ 0\ 0\ 0  \\\\  0\ 1\ 0\ 0 \\\\  0\ 0\ 0\ 1 \\\\  0\ 0\ 1\ 0 \end{bmatrix}
$$

We can also form two-qubit gates by applying single-qubit gates on both qubits. For example, if you apply the gates 

$$
\begin{bmatrix}
a\ b\\\\ c\ d
\end{bmatrix}
$$

and

$$\begin{bmatrix}
e\ f\\\\ g\ h
\end{bmatrix}
$$

to the first and second qubits, respectively, this is equivalent to applying the two-qubit unitary given by their tensor product:
$$\begin{bmatrix}
a\ b\\\\ c\ d
\end{bmatrix}
\otimes 
\begin{bmatrix}
e\ f\\\\ g\ h
\end{bmatrix}=
    \begin{bmatrix}
    ae\ af\ be\ bf \\\\
    ag\ ah\ bg\ bh \\\\
    ce\ cf\ de\ df \\\\
    cg\ ch\ dg\ dh
    \end{bmatrix}.$$

Thus, you can form two-qubit gates by taking the tensor product of some known single-qubit gates. Some examples of two-qubit gates include $H \otimes H$, $X \otimes \mathbf{1}$, and $X \otimes Z$.

Note that while any two single-qubit gates define a two-qubit gate by taking their tensor product, the converse isn't true. Not all two-qubit gates can be written as the tensor product of single-qubit gates.  Such a gate is called an *entangling* gate. One example of an entangling gate is the CNOT gate.

The intuition behind a controlled-not gate can be generalized to arbitrary gates.  A controlled gate in general is a gate that acts as identity unless a specific qubit is $1$.  You denote a controlled unitary, controlled in this case on the qubit labeled $x$, with a $\Lambda\_x(U)$.  As an example $\Lambda_0(U) e\_{1}\otimes {\psi}=e\_{1}\otimes U{\psi}$ and <!-- Port start choking here through.... --> $\Lambda\_0(U) e\_{0}\otimes {\psi}=e\_{0}\otimes{\psi}$, where $e\_0$ and $e\_1$ are the computational basis vectors for a single qubit corresponding to the values $0$ and $1$.  For example, consider the following controlled-$Z$ <!-- to here -->gate then you can express this as

<!-- Port renders this but uses one of the previous $, leaving the correct display with an extra $ at the end -->
$$
\Lambda\_0(Z)= \begin{bmatrix}1&0&0&0\\\\0&1&0&0\\\\0&0&1&0\\\\0&0&0&-1 \end{bmatrix}=(\mathbf{1}\otimes H)\operatorname{CNOT}(\mathbf{1}\otimes H).
$$

Building controlled unitaries in an efficient manner is a major challenge.  The simplest way to implement this requires forming a database of controlled versions of fundamental gates and replacing every fundamental gate in the original unitary operation with its controlled counterpart.  This is often quite wasteful and clever insight often can be used to just replace a few gates with controlled versions to achieve the same impact.  For this reason, the framework provides the ability to perform either the naive method of controlling or allow the user to define a controlled version of the unitary if an optimized hand-tuned version is known.

Gates can also be controlled using classical information.  A classically controlled not-gate, for example, is just an ordinary not-gate but it's only applied if a classical bit is $1$ as opposed to a quantum bit.  In this sense, a classically controlled gate can be thought of as an if statement in the quantum code wherein the gate is applied only in one branch of the code.

As in the single-qubit case, a two-qubit gate set is universal if any $4\times 4$ unitary matrix can be approximated by a product of gates from this set to arbitrary precision.
One example of a universal gate set is the Hadamard gate, the T gate, and the CNOT gate. By taking products of these gates, you can approximate any unitary matrix on two qubits.

## Many-qubit systems

We follow exactly the same patterns explored in the two-qubit case to build many-qubit quantum states from smaller systems.  Such states are built by forming tensor products of smaller states.  For example, consider encoding the bit string $1011001$ in a quantum computer.  You can encode this as

$$
1011001 \equiv \begin{bmatrix} 0 \\\\  1 \end{bmatrix}\otimes \begin{bmatrix} 1 \\\\  0 \end{bmatrix}\otimes \begin{bmatrix} 0 \\\\  1 \end{bmatrix}\otimes \begin{bmatrix} 0 \\\\  1 \end{bmatrix} \otimes \begin{bmatrix} 1 \\\\  0 \end{bmatrix}\otimes \begin{bmatrix} 1 \\\\  0 \end{bmatrix}\otimes \begin{bmatrix} 0 \\\\  1 \end{bmatrix}.
$$

Quantum gates work in exactly the same way.  For example, if you wish to apply the $X$ gate to the first qubit and then perform a CNOT between the second and third qubits you can express this transformation as

\begin{align}
&(X \otimes \operatorname{CNOT}_{12}\otimes \mathbf{1}\otimes \mathbf{1} \otimes \mathbf{1} \otimes \mathbf{1}) \begin{bmatrix} 0 \\\\  1 \end{bmatrix}\otimes \begin{bmatrix} 1 \\\\  0 \end{bmatrix}\otimes \begin{bmatrix} 0 \\\\  1 \end{bmatrix}\otimes \begin{bmatrix} 0 \\\\  1 \end{bmatrix} \otimes \begin{bmatrix} 1 \\\\  0 \end{bmatrix}\otimes \begin{bmatrix} 1 \\\\  0 \end{bmatrix}\otimes \begin{bmatrix} 0 \\\\  1 \end{bmatrix}\\\\
&\qquad\qquad\equiv 0011001.
\end{align}

In many qubit systems, there's often a need to allocate and deallocate qubits that serve as temporary memory for the quantum computer.  Such a qubit is said to be _auxiliary_.  By default, you can assume the qubit state is initialized to $e_0$ upon allocation.  You can further assume that it's returned again to $e_0$ before deallocation.  This assumption is important because if an auxiliary qubit becomes entangled with another qubit register when it becomes deallocated, then the process of deallocation will damage the auxiliary qubit.  For this reason, you always assume that such qubits are reverted to their initial state before being released.

Finally, although new gates needed to be added to our gate set to achieve universal quantum computing for two qubit quantum computers, no new gates need to be introduced in the multi-qubit case.  The gates $H$, $T$ and CNOT form a universal gate set on many qubits because any general unitary transformation can be broken into a series of two qubit rotations.  You then can leverage the theory developed for the two-qubit case and use it again here when you have many qubits.

> [!NOTE]
> While the linear algebraic notation that has been used thus far can certainly be used to describe multi-qubit states, it becomes increasingly cumbersome as you increase the size of the states.  The resulting column-vector for a length 7 bit string, for example, is $128$ dimensional, which makes it cumbersome to express it using the notation described earlier.  Instead, *Dirac notation*, a symbolic shorthand that simplifies the representation of quantum states, is used. For more information, see [Dirac notation](xref:microsoft.quantum.concepts.dirac).

## Related content

- [Dirac notation](xref:microsoft.quantum.concepts.dirac)
- [Pauli measurements](xref:microsoft.quantum.concepts.pauli)
- [T gates and T factories](xref:microsoft.quantum.concepts.tfactories)
- [Quantum circuits](xref:microsoft.quantum.concepts.circuits)
- [Quantum oracles](xref:microsoft.quantum.concepts.oracles)
