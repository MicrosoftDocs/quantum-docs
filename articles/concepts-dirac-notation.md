---
author: SoniaLopezBravo
description: Learn about Dirac notation and how to use it to represent quantum states and to simulate quantum operations.
ms.author: sonialopez
ms.date: 02/13/2025
ms.service: azure-quantum
ms.subservice: core
ms.topic: concept-article
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Dirac Notation in Quantum Computing
uid: microsoft.quantum.concepts.dirac

#customer intent: As a quantum computing student, I want to learn about Dirac notation and how to use it to represent quantum states and to simulate quantum operations.
---

# Dirac notation in quantum computing

[*Dirac notation*](https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation) is a concise and powerful way to describe quantum states and operations. It was named after the physicist Paul Dirac, who developed the notation in the 1930s. Dirac notation is used in quantum computing to describe quantum states, quantum operations, and quantum measurements.  

This article introduce you to Dirac notation and show you how to use it to describe quantum states and operations.

## Vectors in Dirac notation

There are two types of vectors in Dirac notation: the *bra* vector, corresponding to a row vector, and the *ket* vector, corresponding to a column vector. 

If $\psi$ is a column vector, then you can write it in Dirac notation as $\ket{\psi}$, where the $\ket{\cdot}$ denotes that it's a *ket* vector. 

Similarly, the row vector $\psi^\dagger$ is expressed as $\bra{\psi}$, which is a *bra* vector. In other words, $\psi^\dagger$ is obtained by applying entry-wise complex conjugation to the elements of the transpose of $\psi$. The bra-ket notation directly implies that $\braket{\psi|\psi}$ is the inner product of vector $\psi$ with itself, which is by definition $1$. 

More generally, if $\psi$ and $\phi$ are quantum state vectors, then their inner product is $\braket{\phi|\psi}$. This inner product implies that the probability of measuring the state $\ket{\psi}$ to be $\ket{\phi}$ is $|\braket{\phi|\psi}|^2$.

The computational basis states $0$ and $1$ are represented as $\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \ket{0}$ and $\begin{bmatrix} 0 \\  1 \end{bmatrix} = \ket{1}$, respectively.

### Example: Represent the Hadamard operation with Dirac notation

Let's apply the Hadamard gate $H$ to the quantum states $\ket{0}$ and $\ket{1}$ using Dirac notation:

$$
\frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\\\  1 \end{bmatrix}=H\ket{0} = \ket{+}
$$

$$
\frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\\\  -1 \end{bmatrix} =H\ket{1} = \ket{-}
$$

The resulting states correspond to the unit vectors in the $+x$ and $-x$ directions on the Bloch sphere. These states can also be expanded using Dirac notation as sums of $\ket{0}$ and $\ket{1}$:

$$
\ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})
$$

$$
\ket{-} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})
$$

## Computational basis vectors

Every quantum state can always be expressed as sums of computational basis vectors and such sums are easily expressed using Dirac notation. The converse is also true in that the states $\ket{+}$ and $\ket{-}$ also form a basis for quantum states. You can see this basis from the fact that

$$
\ket{0} = \frac{1}{\sqrt{2}}(\ket{+} + \ket{-})
$$

$$
\ket{1} = \frac{1}{\sqrt{2}}(\ket{+} - \ket{-})
$$

As an example of Dirac notation, consider the braket $\braket{0 | 1}$, which is the inner product between $0$ and $1$.  It can be written as

$$
\braket{0 | 1}=\begin{bmatrix} 1 & 0 \end{bmatrix}\begin{bmatrix}0\\\\ 1\end{bmatrix}=0.
$$

This example says that $\ket{0}$ and $\ket{1}$ are orthogonal vectors, meaning that $\braket{0 | 1} = \braket{1 | 0} =0$.  Also, by definition $\braket{0 | 0} = \braket{1 | 1}=1$, which means that the two computational basis vectors can also be called *orthonormal*.

These orthonormal properties are used in the following example. If you have a state $\ket{\psi} = {\frac{3}{5}} \ket{1} + {\frac{4}{5}} \ket{0}$, then because $\braket{1 | 0} =0$ the probability of measuring $1$ is

$$
\big|\braket{1 | \psi}\big|^2= \left|\frac{3}{5}\braket{1 | 1} +\frac{4}{5}\braket{1 | 0}\right|^2=\frac{9}{25}.
$$

## Tensor product notation

Dirac notation is useful to express the [tensor product](xref:microsoft.quantum.concepts.vectors#tensor-product).  Tensor product is important in quantum computing because the state vector described by two uncorrelated quantum registers is the tensor products of the two state vectors.

The tensor product $\psi \otimes \phi$ for any two quantum state vectors $\phi$ and $\psi$ is written in Dirac notation as $\ket{\psi} \otimes \ket{\phi}$. By convention, you can also write the tensor product as $\ket{\psi} \ket{\phi} = \ket{\psi \phi}$.

For example, the state with two qubits initialized to the zero state is $\ket{0} \otimes \ket{0} = \ket{0} \ket{0} = \ket{00}$.

### Example: Describe superposition with Dirac notation

As another example of how you can use Dirac notation to describe a quantum state, consider the following equivalent ways of writing a quantum state that is an equal [superposition](xref:microsoft.quantum.overview.understanding#superposition) over every possible bit string of length $n$

$$
H^{\otimes n} \ket{0} = \frac{1}{2^{n/2}} \sum_{j=0}^{2^n-1} \ket{j} = \ket{+}^{\otimes n}.
$$

Here you may wonder why the sum goes from $0$ to $2^{n}-1$ for $n$ bits.  First, note that there are $2^{n}$ different configurations that $n$ bits can take.  You can see this by noting that one bit can take $2$ values but two bits can take $4$ values, and so forth. In general, this means that there are $2^n$ different possible bit strings but the largest value encoded in any of them $1\cdots 1=2^n-1$ and hence it is the upper limit for the sum.
Also, in this example you did not use $\ket{+}^{\otimes n}=\ket{+}$ in analogy to $\ket{0}^{\otimes n} = \ket{0}$. This notational convention is reserved for the computational basis state with every qubit initialized to zero.

## Express linearity with Dirac notation

Another feature of Dirac notation is the fact that it's linear. For example, for two complex numbers $\alpha$ and $\beta$, you can write

$$ \ket{\psi} \otimes ( \alpha\ket{\phi} + \beta\ket{\chi})= \alpha\ket{\psi}\ket{\phi} + \beta\ket{\psi}\ket{\chi}.$$

That is to say, you can distribute the tensor product notation in Dirac notation so that taking tensor products between state vectors ends up looking just like ordinary multiplication.

Bra vectors follow a similar convention to ket vectors. For example, the vector $\bra{\psi}\bra{\phi}$ is equivalent to the state vector $\psi^\dagger \otimes \phi^\dagger=(\psi\otimes \phi)^\dagger$. If the ket vector $\ket{\psi}$ is $\alpha \ket{0} + \beta \ket{1}$, then the bra vector version of the vector is $\bra{\psi}=\ket{\psi}^\dagger = (\bra{0}\alpha^* +\bra{1}\beta^*)$.

As an example, imagine that you wish to calculate the probability of measuring the state $\ket{\psi} = \frac{3}{5} \ket{1} + \frac{4}{5} \ket{0}$ using a quantum program for measuring states to be either $\ket{+}$ or $\ket{-}$. Then the probability that the device would output that the state is $\ket{-}$ is 

$$|\braket{- | \psi}|^2= \left|\frac{1}{\sqrt{2}}(\bra{0} - \bra{1})(\frac{3}{5} \ket{1} + \frac{4}{5} \ket{0}) \right|^2=\left|-\frac{3}{5\sqrt{2}} + \frac{4}{5\sqrt{2}}\right|^2=\frac{1}{50}.$$

The fact that the negative sign appears in the calculation of the probability is a manifestation of quantum interference, which is one of the mechanisms by which quantum computing gains advantages over classical computing.

## ketbra or outer product

The final item worth discussing in Dirac notation is the *ketbra* or outer product. The outer product is represented within Dirac notations as $\ket{\psi} \bra{\phi}$.  The outer product is defined via matrix multiplication as $\ket{\psi} \bra{\phi} = \psi \phi^\dagger$ for quantum state vectors $\psi$ and $\phi$.  The simplest, and arguably most common example of this notation, is

$$
\ket{0} \bra{0} = \begin{bmatrix}1\\\\ 0 \end{bmatrix}\begin{bmatrix}1&0 \end{bmatrix}= \begin{bmatrix}1 &0\\\\ 0 &0\end{bmatrix} \qquad \ket{1} \bra{1} = \begin{bmatrix}0\\\\ 1 \end{bmatrix}\begin{bmatrix}0&1 \end{bmatrix}= \begin{bmatrix}0 &0\\\\ 0 &1\end{bmatrix}.
$$

Ketbras are often called projectors because they project a quantum state onto a fixed value. Since these operations aren't unitary (and do not even preserve the norm of a vector), a quantum computer cannot deterministically apply a projector. However projectors do a beautiful job of describing the action that measurement has on a quantum state. For example, if you measure a state $\ket{\psi}$ to be $0$, then the resulting transformation that the state experiences as a result of the measurement is

$$\ket{\psi} \rightarrow \frac{(\ket{0} \bra{0})\ket{\psi}}{|\braket{0 | \psi}|}= \ket{0},$$

as you would expect if you measured the state and found it to be $\ket{0}$. To reiterate, such projectors cannot be applied on a state in a quantum computer deterministically. Instead, they can at best be applied randomly with the result $\ket{0}$ appearing with some fixed probability. The probability of such a measurement succeeding can be written as the expectation value of the quantum projector in the state

$$
\bra{\psi} (\ket{0} \bra{0})\ket{\psi} = |\braket{\psi | 0}|^2,
$$

which illustrates that projectors give a new way of expressing the measurement process.

If instead you consider measuring the first qubit of a multi-qubit state to be $1$, then you can also describe this process conveniently using projectors and Dirac notation:

$$
P(\text{first qubit = 1})= \bra{\psi}\left(\ket{1}\bra{1}\otimes \mathbf{1}^{\otimes n-1}\right) \ket{\psi}.
$$

Here the identity matrix can be conveniently written in Dirac notation as

$$
\mathbb{I} = \ket{0} \bra{0}+\ket{1} \bra{1}= \begin{bmatrix}1&0\\\\ 0&1 \end{bmatrix}.
$$

For the case where there are two-qubits, the projector can be expanded as 

$$
\ket{1} \bra{1} \otimes \mathbb{I} = \ket{1}\bra{1} \otimes (\ket{0} \bra{0}+\ket{1} \bra{1})= \ket{10}\bra{10} + \ket{11}\bra{11}.
$$

and you can see that this is consistent with the discussion about measurement likelihoods for multiqubit states using column-vector notation:

$$
P(\text{first qubit = 1})= \psi^\dagger (e_{10}e_{10}^\dagger + e_{11}e_{11}^\dagger)\psi = |e_{10}^\dagger \psi|^2 + |e_{11}^\dagger \psi|^2,
$$

which matches the multi-qubit measurement discussion. The generalization of this result to the multi-qubit case, however, is slightly more straightforward to express using Dirac notation than column-vector notation, and is entirely equivalent to the previous treatment.

## Density operators

Another useful operator to express using Dirac notation is the *density operator*, sometimes also known as a *state operator*. As the quantum state vector, the density operator describes the quantum state of a system. While quantum state vectors can only represent *pure states*, density operators can also represent *mixed states*.

More generally, a given matrix $\rho$ is a valid density operator if the following conditions are fulfilled:

- $\rho$ is a matrix of complex numbers
- $\rho = \rho^{\dagger}$ (that is, $\rho$ is Hermitian)
- Every eigenvalue $p$ of $\rho$ is non-negative
- All the eigenvalues of $\rho$ sum to 1

Together, these conditions guarantee that $\rho$ can be thought of as an ensemble. A density operator for a quantum state vector $\ket{\psi}$ takes the form $\rho = \sum_i p_i \ket{\psi_i} \bra{\psi_i}$ is an eigenvalue decomposition of $\rho$, then $\rho$ describes the ensemble $\rho = \{ \ket{\psi_i} \text{with probability} p_i \}$.

Pure quantum states are characterized by a single ket vector or wavefunction, and can't be written as a statistical mixture, or *convex combination*, of other quantum states. A mixed quantum state is a statistical ensemble of pure states. 

A Bloch sphere represents pure states by a point on the surface of the sphere, whereas mixed states are represented by an interior point. The mixed state of a single qubit is represented by the center of the sphere, by symmetry. The purity of a state can be visualized as the degree in which it is close to the surface of the sphere.

This concept of representing the state as a matrix, rather than a vector, is often convenient because it gives a convenient way of representing probability calculations, and also allows you to describe both statistical uncertainty and quantum uncertainty within the same formalism.

A density operator $\rho$ represents a pure state if and only if: 

- $\rho$ can be written as an outer product of a state vector, $\rho=\ket{\psi}\bra{\psi}$
- $\rho =\rho^2$
- $tr(\rho^2)=1$

To tell how close a given density operator $\rho$ is to being pure, you can look at the trace (that is, the sum of the diagonal elements) of $\rho^2$. A density operator represents a pure state if and only if $tr(\rho ^{2})=1$.

## Q# gate sequences equivalent to quantum states

A final point worth raising about quantum notation and the Q# programming language: earlier, this article mentioned that the quantum state is the fundamental object of information in quantum computing. It may then come as a surprise that in Q# there is no notion of a quantum state. Instead, Q# describes all states only by the operations used to prepare them. The previous example is an excellent illustration of this definition. Rather than expressing a uniform superposition over every quantum bit string in a register, you can represent the result as $H^{\otimes n} \ket{0}$. This exponentially shorter description of the state not only has the advantage that you can classically reason about it, but it also concisely defines the operations it needs to be propagated through the software stack to implement the algorithm. For this reason, Q# is designed to emit gate sequences rather than quantum states; however, at a theoretical level the two perspectives are equivalent.

## Related topics

- [Pauli measurements](xref:microsoft.quantum.concepts.pauli)
- [T gates and T factories](xref:microsoft.quantum.concepts.tfactories)
- [Quantum circuits](xref:microsoft.quantum.concepts.circuits)
- [Quantum oracles](xref:microsoft.quantum.concepts.oracles)
