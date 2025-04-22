---
author: azure-quantum-content
description: Learn how to work with single-qubit and multi-qubit Pauli measurement operations in quantum computing.
ms.author: quantumdocwriters
ms.date: 12/18/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: concept-article
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Pauli Measurements in Quantum Computing
uid: microsoft.quantum.concepts.pauli

#customer intent: As a quantum computing student, I want to learn how to work with single-qubit and multi-qubit Pauli measurement operations in quantum computing.
---

# Single-qubit and multi-qubit Pauli measurements

As you work with Q#, you find that *Pauli measurements* are a common type of measurement. Pauli measurements generalize computational basis measurements to include measurements in other bases and of parity between different qubits. In such cases, it's common to discuss measuring a Pauli operator, which is an operator such as $X,Y,Z$ or $Z\otimes Z, X\otimes X, X\otimes Y$, and so forth. For the basics of quantum measurement, see [The qubit](xref:microsoft.quantum.concepts.qubit) and [Multiple qubits](xref:microsoft.quantum.concepts.multiple-qubits).

Discussing measurement in terms of Pauli operators is common in the subfield of quantum error correction.  
Q# guide follows a similar convention; this article explains this alternative view of measurements.


> [!TIP]
> In Q#, multi-qubit Pauli operators are generally represented by arrays of type `Pauli[]`.
> For example, to represent $X \otimes Z \otimes Y$, you can use the array `[PauliX, PauliZ, PauliY]`.


Before delving into the details of how to think of a Pauli measurement, it's useful to think about what measuring a single qubit inside a quantum computer does to the quantum state.
Imagine a $n$-qubit quantum state; then measuring one qubit immediately rules out half of the $2^n$ possibilities that state could be in.
In other words, the measurement projects the quantum state onto one of two half-spaces.
You can generalize the way you think about measurement to reflect this intuition.

In order to concisely identify these subspaces, one needs a language for describing them.
One way to describe the two subspaces is by specifying them through a matrix that just has two unique eigenvalues, taken by convention to be $\pm 1$.
For a simple example of describing subspaces in this way, consider $Z$:

$$
\begin{align}
  Z & = \begin{bmatrix} 1 & 0 \\\\ 0 & -1 \end{bmatrix}.
\end{align}
$$

When you read the diagonal elements of the Pauli-$Z$ matrix, you can see that $Z$ has two eigenvectors, $\ket{0}$ and $\ket{1}$, with corresponding eigenvalues $\pm 1$.
Thus, if a measurement of the qubit results in `Zero` (corresponding to the state $\ket{0}$), it's known that the state of the qubit is a $+1$ eigenstate of the $Z$ operator.
Similarly, if the result is `One`, it's known that the state of the qubit is a $-1$ eigenstate of $Z$.
This process is referred to in the language of Pauli measurements as "measuring Pauli $Z$," and is entirely equivalent to performing a computational basis measurement.

Any $2\times 2$ matrix that is a unitary transformation of $Z$ also satisfies this criteria.
That is, you could also use a matrix $A=U^\dagger Z U$, where $U$ is any other unitary matrix, to give a matrix that defines the two outcomes of a measurement in its $\pm 1$ eigenvectors.
The notation of Pauli measurements references this unitary equivalence by identifying $X,Y,Z$ measurements as equivalent measurements that you could do to gain information from a qubit.
These measurements are given here for convenience.


|Pauli Measurement  |Unitary transformation  |
|-------------------|------------------------|
| $Z$               | $\mathbf{1}$             |
| $X$               | $H$                    |
| $Y$               | $HS^{\dagger}$         |

That is, using this language, "measure $Y$" is equivalent to applying $HS^\dagger$ and then measuring in the computational basis, where `S` is an intrinsic quantum operation sometimes called the "phase gate," and can be simulated using the unitary matrix

$$
\begin{align}
    S = \begin{bmatrix}
        1 & 0 \\\\ 0 & i
    \end{bmatrix}.
\end{align}
$$

It's also equivalent to applying $HS^\dagger$ to the quantum state vector and then measuring $Z$, such that the following operation is equivalent to `Measure([PauliY], [q])`:

```Q#
operation MeasureY(qubit : Qubit) : Result {
    mutable result = Zero;
    within {
        Adjoint S(q);
        H(q);
    } apply {
        result = M(q);
    }
    return result;
}
```

The correct state is then found by transforming back to the computational basis, which amounts to applying $SH$ to the quantum state vector; in the code snippet, the transformation back to the computational basis is handled automatically with the use of the `within … apply` block.

In Q#, the outcome---that is, the classical information extracted from interacting with the state---is given using a `Result` value $j \in \\{\texttt{Zero}, \texttt{One}\\}$ indicating if the result is in the $(-1)^j$ eigenspace of the Pauli operator measured.


## Multiple-qubit measurements

Measurements of multi-qubit Pauli operators are defined similarly, as seen from:

$$
Z\otimes Z = \begin{bmatrix}1 &0 &0&0\\\\  0&-1&0&0\\\\ 0&0&-1&0\\\\ 0&0&0&1\end{bmatrix}.
$$

Thus the tensor products of two Pauli-$Z$ operators forms a matrix composed of two spaces consisting of $+1$ and $-1$ eigenvalues.
As with the single-qubit case, both constitute a *half-space*, meaning that half of the accessible vector space belongs to the $+1$ eigenspace and the remaining half to the $-1$ eigenspace.
In general, it's easy to see from the definition of the tensor product that any tensor product of Pauli-$Z$ operators and the identity also obeys this.
For example,

$$
\begin{align}
    Z \otimes \mathbf{1} = \begin{bmatrix}
        1 &  0 &  0 &  0 \\\\
        0 &  1 &  0 &  0 \\\\
        0 &  0 & -1 &  0 \\\\
        0 &  0 &  0 & -1
    \end{bmatrix}.
\end{align}
$$

As before, any unitary transformation of such matrices also describes two half-spaces labeled with $\pm 1$ eigenvalues.
For example, $X\otimes X = H\otimes H(Z\otimes Z)H\otimes H$  from the identity that $Z=HXH$.
Similar to the one-qubit case, all two-qubit Pauli-measurements can be written as $U^\dagger (Z\otimes 1) U$ for $4\times 4$ unitary matrices $U$. 
The transformations are enumerated in the following table.

> [!NOTE]
> In this table, $\operatorname{SWAP}$ is used to indicate the matrix
> $$
> \begin{align}
>     \operatorname{SWAP} & =
>     \left(\begin{matrix}
>         1 & 0 & 0 & 0 \\\\
>         0 & 0 & 1 & 0 \\\\
>         0 & 1 & 0 & 0 \\\\
>         0 & 0 & 0 & 1
>     \end{matrix}\right)
> \end{align}
> $$
> used to simulate the intrinsic operation `SWAP`.

|Pauli Measurement     |Unitary transformation  |
|----------------------|------------------------|
| $Z\otimes \mathbf{1}$ | $\mathbf{1}\otimes \mathbf{1}$ |
| $X\otimes \mathbf{1}$ | $H\otimes \mathbf{1}$ |
| $Y\otimes \mathbf{1}$ | $HS^\dagger\otimes \mathbf{1}$ |
| $\mathbf{1} \otimes Z$ | $\operatorname{SWAP}$ |
| $\mathbf{1} \otimes X$ | $(H\otimes \mathbf{1})\operatorname{SWAP}$ |
| $\mathbf{1} \otimes Y$ | $(HS^\dagger\otimes \mathbf{1})\operatorname{SWAP}$ |
| $Z\otimes Z$ | $\operatorname{CNOT}\_{10}$ |
| $X\otimes Z$ | $\operatorname{CNOT}\_{10}(H\otimes \mathbf{1})$ |
| $Y\otimes Z$ | $\operatorname{CNOT}\_{10}(HS^\dagger\otimes \mathbf{1})$ |
| $Z\otimes X$ | $\operatorname{CNOT}\_{10}(\mathbf{1}\otimes H)$ |
| $X\otimes X$ | $\operatorname{CNOT}\_{10}(H\otimes H)$ |
| $Y\otimes X$ | $\operatorname{CNOT}\_{10}(HS^\dagger\otimes H)$ |
| $Z\otimes Y$ | $\operatorname{CNOT}\_{10}(\mathbf{1} \otimes HS^\dagger)$ |
| $X\otimes Y$ | $\operatorname{CNOT}\_{10}(H\otimes HS^\dagger)$ |
| $Y\otimes Y$ | $\operatorname{CNOT}\_{10}(HS^\dagger\otimes HS^\dagger)$ |

Here, the `CNOT` operation appears for the following reason.
Each Pauli measurement that doesn't include the $\mathbf{1}$ matrix is equivalent up to a unitary to $Z\otimes Z$ by the earlier reasoning.
The eigenvalues of $Z\otimes Z$ only depend on the parity of the qubits that comprise each computational basis vector, and the controlled-not operations serve to compute this parity and store it in the first bit.
Then once the first bit is measured, you can recover the identity of the resultant half-space, which is equivalent to measuring the Pauli operator.

Also, while it can be tempting to assume that measuring $Z\otimes Z$ is the same as sequentially measuring $Z\otimes \mathbb{1}$ and then $\mathbb{1} \otimes Z$, this assumption would be false.
The reason is that measuring $Z\otimes Z$ projects the quantum state into either the $+1$ or $-1$ eigenstate of these operators.
Measuring $Z\otimes \mathbb{1}$ and then $\mathbb{1} \otimes Z$ projects the quantum state vector first onto a half space of $Z\otimes \mathbb{1}$ and then onto a half space of $\mathbb{1} \otimes Z$.
As there are four computational basis vectors, performing both measurements reduces the state to a quarter-space and hence reduces it to a single computational basis vector.

## Correlations between qubits

Another way of looking at measuring tensor products of Pauli matrices, such as $X\otimes X$ or $Z\otimes Z$, is that these measurements let you look at information stored in the correlations between the two qubits.
Measuring $X\otimes 1$ lets you look at information that is locally stored in the first qubit.
While both types of measurements are equally valuable in quantum computing, the former illuminates the power of quantum computing.
It reveals that in quantum computing, often the information you wish to learn isn't stored in any single qubit but rather stored non-locally in all the qubits at once, and therefore only by looking at it through a joint measurement (e.g. $Z\otimes Z$) does this information become manifest.

Arbitrary Pauli operators such as $X\otimes Y \otimes Z \otimes \mathbf{1}$ can also be measured.
All such tensor products of Pauli operators have only two eigenvalues $\pm 1$ and both eigenspaces constitute half-spaces of the entire vector space.
Thus they coincide with the requirements stated earlier.

In Q#, such measurements return $j$ if the measurement yields a result in the eigenspace of sign $(-1)^j$.
Having Pauli measurements as a built-in feature in Q# is helpful because measuring such operators requires long chains of controlled-NOT gates and basis transformations to describe the diagonalizing $U$ gate needed to express the operation as a tensor product of $Z$ and $1$.
By being able to specify that you wish to do one of these pre-defined measurements, you don't need to worry about how to transform your basis such that a computational basis measurement provides the necessary information.
Q# handles all the necessary basis transformations for you automatically.

## The No-Cloning Theorem

Quantum information is powerful.
It enables you to do amazing things such as factor numbers exponentially faster than the best known classical algorithms, or efficiently simulate correlated electron systems that classically require exponential cost to simulate accurately.
However, there are limitations to the power of quantum computing.
One such limitation is given by the *No-Cloning Theorem*.

The No-Cloning Theorem is aptly named.
It disallows cloning of generic quantum states by a quantum computer.
The proof of the theorem is remarkably straightforward.
While a full proof of the no-cloning theorem is too technical for this article, the proof in the case of no additional auxiliary qubits is within the scope.

For such a quantum computer, the cloning operation must be described with a unitary matrix.
Quantum measurement is disallowed, since it would corrupt the quantum state to be cloned.
To simulate the cloning operation, the unitary matrix used needs to have the property that
$$
  U \ket{\psi} \ket{0} = \ket{\psi} \ket{\psi}
$$
for any state $\ket{\psi}$.
The linearity property of matrix multiplication then implies that for any second quantum state $\ket{\phi}$,

$$
\begin{align}
    U \left[
      \frac{1}{\sqrt{2}}\left(\ket{\phi}+\ket{\psi} \right)
    \right] \ket{0}
    & = \frac{1}{\sqrt{2}} U\ket{\phi}\ket{0}
      + \frac{1}{\sqrt{2}} U\ket{\psi}\ket{0} \\\\
    & = \frac{1}{\sqrt{2}} \left(
            \ket{\phi} \ket{\phi} + \ket{\psi} \ket{\psi}
        \right) \\\\
    & \ne \left(
          \frac{1}{\sqrt{2}}\left(\ket{\phi}+\ket{\psi} \right)
      \right) \otimes \left(
          \frac{1}{\sqrt{2}}\left(\ket{\phi}+\ket{\psi} \right)
      \right).
\end{align}
$$

This provides the fundamental intuition behind the No-Cloning Theorem: any device that copies an unknown quantum state must induce errors on at least some of the states it copies.
While the key assumption that the cloner acts linearly on the input state can be violated through the addition and measurement of auxiliary qubits, such interactions also leak information about the system through the measurement statistics and prevent exact cloning in such cases as well.

The No-Cloning Theorem is important for qualitative understanding of quantum computing because if you could clone quantum states inexpensively then you would be granted a near-magical ability to learn from quantum states.
Indeed, you could violate Heisenberg's vaunted uncertainty principle.
Alternatively, you could use an optimal cloner to take a single sample from a complex quantum distribution and learn everything you could possibly learn about that distribution from just one sample.
This would be like you flipping a coin and observing heads and then upon telling a friend about the result having them respond "Ah the distribution of that coin must be Bernoulli with $p=0.512643\ldots$!"  Such a statement would be nonsensical because one bit of information (the heads outcome) simply can't provide the many bits of information needed to encode the distribution without substantial prior information.
Similarly, without prior information you can't perfectly clone a quantum state just as you can't prepare an ensemble of such coins without knowing $p$.

Information isn't free in quantum computing.
Each qubit measured gives a single bit of information, and the No-Cloning Theorem shows that there's no backdoor that can be exploited to get around the fundamental tradeoff between information gained about the system and the disturbance invoked upon it.

## Related content

- [T gates and T factories](xref:microsoft.quantum.concepts.tfactories)
- [Quantum circuits](xref:microsoft.quantum.concepts.circuits)
- [Quantum oracles](xref:microsoft.quantum.concepts.oracles)
- [Grover's algorithm](xref:microsoft.quantum.concepts.grovers)
