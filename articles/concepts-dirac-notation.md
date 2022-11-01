---
author: bradben
description: Learn about using Dirac notation to represent quantum states and to simulate quantum operations.
ms.author: brbenefield
ms.date: 11/18/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Dirac notation
uid: microsoft.quantum.concepts.dirac
---

# Dirac notation

[*Dirac notation*](https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation) is a language designed to fit the precise needs of expressing states in quantum mechanics.  The examples in this article are suggestions that can be used to concisely express quantum ideas.

## Limitations of column vector notation

While column vector notation is common in linear algebra, it's often cumbersome in quantum computing, especially when dealing with multiple qubits.  For example, when you define $\psi$ to be a vector it's not explicitly clear whether $\psi$ is a row or a column vector.  Thus, if $\phi$ and $\psi$ are vectors, then it's equally unclear if $\phi \psi$ is even defined, because the shapes of $\phi$ and $\psi$ may be unclear in the context.  Beyond the ambiguity about the shapes of vectors, expressing even simple vectors using linear algebraic notation can be cumbersome. For example, if you wish to describe an $n$-qubit state where each qubit takes the value $0$, then you would formally express the state as 

$$\begin{bmatrix}1 \\\\  0 \end{bmatrix}\otimes \cdots \otimes\begin{bmatrix}1 \\\\  0 \end{bmatrix}. $$  

Evaluating this tensor product is impractical because the vector lies in an exponentially large space. As such, this notation is, in fact, the best description of the state that can be given using the previous notation.  

## Types of vectors in Dirac notation

There are two types of vectors in Dirac notation: the *bra* vector and the *ket* vector, so named because when put together they form a *braket* or inner product.  If $\psi$ is a column vector, then you can write it in Dirac notation as $\ket{\psi}$, where the $\ket{\cdot}$ denotes that it's a unit column vector, for example, a *ket* vector.  Similarly, the row vector $\psi^\dagger$ is expressed as $\bra{\psi}$. In other words, $\psi^\dagger$ is obtained by applying entry-wise complex conjugation to the elements of the transpose of $\psi$. The bra-ket notation directly implies that $\braket{\psi|\psi}$ is the inner product of vector $\psi$ with itself, which is by definition $1$.  

More generally, if $\psi$ and $\phi$ are quantum state vectors, then their inner product is $\braket{\phi|\psi}$. This inner product implies that the probability of measuring the state $\ket{\psi}$ to be $\ket{\phi}$ is $|\braket{\phi|\psi}|^2$.  

The following convention is used to describe the quantum states that encode the values of zero and one (the single-qubit computational basis states):

$$
\begin{bmatrix} 1 \\\\  0 \end{bmatrix} = \ket{0},\qquad
\begin{bmatrix} 0 \\\\  1 \end{bmatrix} = \ket{1}.
$$

## Example: Represent the Hadamard operation with Dirac notation

The following notation is often used to describe the states that result from applying the Hadamard gate to $\ket{0}$ and $\ket{1}$. These states correspond to the unit vectors in the $+x$ and $-x$ directions on the Bloch sphere:

$$
\frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\\\  1 \end{bmatrix}=H\ket{0} = \ket{+},\qquad
\frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\\\  -1 \end{bmatrix} =H\ket{1} = \ket{-} .
$$

These states can also be expanded using Dirac notation as sums of $\ket{0}$ and $\ket{1}$:

$$
\ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}),\qquad \ket{-} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1}).
$$

## Computational basis vectors

This demonstrates why these states are often called a *computational basis*: every quantum state can always be expressed as sums of computational basis vectors and such sums are easily expressed using Dirac notation.  The converse is also true in that the states $\ket{+}$ and $\ket{-}$ also form a basis for quantum states.  You can see this from the fact that

$$
\ket{0} = \frac{1}{\sqrt{2}}(\ket{+} + \ket{-}),\qquad \ket{1} = \frac{1}{\sqrt{2}}(\ket{+} - \ket{-}).
$$

As an example of Dirac notation, consider the braket $\braket{0 | 1}$, which is the inner product between $0$ and $1$.  It can be written as 

$$
\braket{0 | 1}=\begin{bmatrix} 1 & 0 \end{bmatrix}\begin{bmatrix}0\\\\ 1\end{bmatrix}=0.
$$

This example says that $\ket{0}$ and $\ket{1}$ are orthogonal vectors, meaning that $\braket{0 | 1} = \braket{1 | 0} =0$.  Also, by definition $\braket{0 | 0} = \braket{1 | 1}=1$, which means that the two computational basis vectors can also be called *orthonormal*.

These orthonormal properties will be useful in the following example. If you have a state $\ket{\psi} = {\frac{3}{5}} \ket{1} + {\frac{4}{5}} \ket{0}$, then because $\braket{1 | 0} =0$ the probability of measuring $1$ is 

$$
\big|\braket{1 | \psi}\big|^2= \left|\frac{3}{5}\braket{1 | 1} +\frac{4}{5}\braket{1 | 0}\right|^2=\frac{9}{25}.
$$

## Tensor product notation

Dirac notation also includes an implicit tensor product structure.  This structure is important because in quantum computing, the state vector described by two uncorrelated quantum registers is the tensor products of the two state vectors.  Concisely describing the tensor product structure, or lack thereof, is vital if you want to explain a quantum computation.  The tensor product structure implies that you can write $\psi \otimes \phi$ for any two quantum state vectors $\phi$ and $\psi$ as $\ket{\psi} \otimes \ket{\phi}$. However, by convention writing $\otimes$ in between the vectors is unnecessary, and you can write $\ket{\psi} \ket{\phi} = \ket{\psi \phi} $. For more information about vectors and tensor products, see [Vectors and Matrices in Quantum Computing](xref:microsoft.quantum.concepts.vectors). For example, the state with two qubits initialized to the zero state is given by

$$
\ket{0} \otimes \ket{0} = \ket{0} \ket{0} = \ket{00} = \begin{bmatrix} 1 \\\\  0 \end{bmatrix} \otimes \begin{bmatrix} 1 \\\\  0 \end{bmatrix} = \begin{bmatrix} 1 \\\\  0 \\\\  0 \\\\  0 \end{bmatrix}.
$$

Similarly,  the state $\ket{p}$ for integer $p$ represents a quantum state that encodes the integer $p$ in binary representation.  For example, if you wish to express the number $5$ using an unsigned binary encoding, you could equally express it as

$$
\ket{1}\ket{0}\ket{1} = \ket{101} = \ket{5}.
$$

Within this notation, $\ket{0}$ need not refer to a single-qubit state but rather to a *qubit register* that stores a binary encoding of $0$.  The differences between these two notations is usually clear from the context.  This convention is useful for simplifying the first example which can be written in any of the following ways:

$$
\begin{bmatrix}1 \\\\  0 \end{bmatrix}\otimes \cdots \otimes\begin{bmatrix}1 \\\\  0 \end{bmatrix} = \ket{0} \otimes \cdots \otimes \ket{0}= |0\cdots 0\rangle = \ket{0}^{\otimes n}
$$

where $\ket{0}^{\otimes n}$ represents the tensor product of $n$ $\ket{0}$ quantum states. 

## Example: Describe superposition with Dirac notation

As another example of how you can use Dirac notation to describe a quantum state, consider the following equivalent ways of writing a quantum state that is an equal superposition over every possible bit string of length $n$

$$
H^{\otimes n} \ket{0} = \frac{1}{2^{n/2}} \sum_{j=0}^{2^n-1} \ket{j} = \ket{+}^{\otimes n}.
$$

Here you may wonder why the sum goes from $0$ to $2^{n}-1$ for $n$ bits.  First, note that there are $2^{n}$ different configurations that $n$ bits can take.  You can see this by noting that one bit can take $2$ values but two bits can take $4$ values and so forth. In general, this means that there are $2^n$ different possible bit strings but the largest value encoded in any of them $1\cdots 1=2^n-1$ and hence it is the upper limit for the sum.
As a side note, in this example you did not use $\ket{+}^{\otimes n}=\ket{+}$ in analogy to $\ket{0}^{\otimes n} = \ket{0}$. This notational convention is usually reserved for the computational basis state with every qubit initialized to zero.  While such a convention would be sensible in this case, it's not employed in the quantum computing literature.

## Express linearity with Dirac notation

Another feature of Dirac notation is the fact that it's linear. For example, for two complex numbers $\alpha$ and $\beta$, you can write

$$ \ket{\psi} \otimes ( \alpha\ket{\phi} + \beta\ket{\chi})= \alpha\ket{\psi}\ket{\phi} + \beta\ket{\psi}\ket{\chi}.$$

That is to say, you can distribute the tensor product notation in Dirac notation so that taking tensor products between state vectors ends up looking just like ordinary multiplication.

Bra vectors follow a similar convention to ket vectors.  For example, the vector $\bra{\psi}\bra{\phi}$ is equivalent to the state vector $\psi^\dagger \otimes \phi^\dagger=(\psi\otimes \phi)^\dagger$. If the ket vector $\ket{\psi}$ is $\alpha \ket{0} + \beta \ket{1}$, then the bra vector version of the vector is $\bra{\psi}=\ket{\psi}^\dagger = (\bra{0}\alpha^* +\bra{1}\beta^*)$.

As an example, imagine that you wish to calculate the probability of measuring the state $\ket{\psi} = \frac{3}{5} \ket{1} + \frac{4}{5} \ket{0}$ using a quantum program for measuring states to be either $\ket{+}$ or $\ket{-}$. Then the probability that the device would output that the state is $\ket{-}$ is 

$$|\braket{- | \psi}|^2= \left|\frac{1}{\sqrt{2}}(\bra{0} - \bra{1})(\frac{3}{5} \ket{1} + \frac{4}{5} \ket{0}) \right|^2=\left|-\frac{3}{5\sqrt{2}} + \frac{4}{5\sqrt{2}}\right|^2=\frac{1}{50}.$$

The fact that the negative sign appears in the calculation of the probability is a manifestation of quantum interference, which is one of the mechanisms by which quantum computing gains advantages over classical computing.

## ketbra or outer product

The final item worth discussing in Dirac notation is the *ketbra* or outer product.  The outer product is represented within Dirac notations as $\ket{\psi} \bra{\phi}$, and sometimes called ketbras because the bras and kets occur in the opposite order as brakets.  The outer product is defined via matrix multiplication as $\ket{\psi} \bra{\phi} = \psi \phi^\dagger$ for quantum state vectors $\psi$ and $\phi$.  The simplest, and arguably most common example of this notation, is

$$
\ket{0} \bra{0} = \begin{bmatrix}1\\\\ 0 \end{bmatrix}\begin{bmatrix}1&0 \end{bmatrix}= \begin{bmatrix}1 &0\\\\ 0 &0\end{bmatrix} \qquad \ket{1} \bra{1} = \begin{bmatrix}0\\\\ 1 \end{bmatrix}\begin{bmatrix}0&1 \end{bmatrix}= \begin{bmatrix}0 &0\\\\ 0 &1\end{bmatrix}.
$$

Ketbras are often called projectors because they project a quantum state onto a fixed value.  Since these operations aren't unitary (and do not even preserve the norm of a vector), a quantum computer cannot deterministically apply a projector.  However projectors do a beautiful job of describing the action that measurement has on a quantum state.  For example, if you measure a state $\ket{\psi}$ to be $0$, then the resulting transformation that the state experiences as a result of the measurement is

  $$\ket{\psi} \rightarrow \frac{(\ket{0} \bra{0})\ket{\psi}}{|\braket{0 | \psi}|}= \ket{0},$$

as you would expect if you were to measure the state and find it to be $\ket{0}$.  To reiterate, such projectors cannot be applied on a state in a quantum computer deterministically.  Instead, they can at best be applied randomly with the result $\ket{0}$ appearing with some fixed probability.  The probability of such a measurement succeeding can be written as the expectation value of the quantum projector in the state

$$
\bra{\psi} (\ket{0} \bra{0})\ket{\psi} = |\braket{\psi | 0}|^2,
$$

which illustrates that projectors give a new way of expressing the measurement process.

If instead you consider measuring the first qubit of a multi-qubit state to be $1$, then you can also describe this process conveniently using projectors and Dirac notation:

$$
P(\text{first qubit = 1})= \bra{\psi}\left(\ket{1}\bra{1}\otimes \boldone^{\otimes n-1}\right) \ket{\psi}.
$$

Here the identity matrix can be conveniently written in Dirac notation as

$$
\boldone = \ket{0} \bra{0}+\ket{1} \bra{1}= \begin{bmatrix}1&0\\\\ 0&1 \end{bmatrix}.
$$

For the case where there are two-qubits the projector can be expanded as 

$$
\ket{1} \bra{1} \otimes \id = \ket{1}\bra{1} \otimes (\ket{0} \bra{0}+\ket{1} \bra{1})= \ket{10}\bra{10} + \ket{11}\bra{11}.
$$

you can then see that this is consistent with the discussion about measurement likelihoods for multiqubit states using column-vector notation:

$$
P(\text{first qubit = 1})= \psi^\dagger (e\_{10}e\_{10}^\dagger + e\_{11}e\_{11}^\dagger)\psi = |e\_{10}^\dagger \psi|^2 + |e\_{11}^\dagger \psi|^2,
$$

which matches the multi-qubit measurement discussion.  The generalization of this result to the multi-qubit case, however, is slightly more straightforward to express using Dirac notation than column-vector notation, and is entirely equivalent to the previous treatment.

## Density operators

Another useful operator to express using Dirac notation is the *density operator*, sometimes also known as a *state operator*. As the quantum state vector, the density operator describes the quantum state of a system. However, while quantum state vectors can only represent *pure states*, density operators can also represent *mixed states*.

More generally, a given matrix $\rho$ is a valid density operator if the following conditions are fulfilled:

- $\rho$ is a matrix of complex numbers
- $\rho = \rho^{\dagger}$ (that is, $\rho$ is Hermitian)
- Every eigenvalue $p$ of $\rho$ is $0 &lt;= p &lt;= 1$
- All the eigenvalues of $\rho$ sum to 1

Together, these conditions guarantee that $\rho$ can be thought of as an ensemble. A density operator for a quantum state vector $\ket{\psi}$ takes the form $\rho = \sum_i p_i \ket{\psi_i} \bra{\psi_i}$ is an eigenvalue decomposition of $\rho$, then $\rho$ describes the ensemble $\rho = \{ \ket{\psi_i} \text{with probability} p_i \}$.

Pure quantum states are those that are characterized by a single ket vector or wavefunction, and cannot be written as a statistical mixture (or *convex combination*) of other quantum states. A mixed quantum state is a statistical ensemble of pure states. 

This concept of representing the state as a matrix, rather than a vector, is often convenient because it gives a convenient way of representing probability calculations, and also allows one to describe both statistical uncertainty as well as quantum uncertainty within the same formalism.

>[!TIP]
> The QuTiP library is a helpful Python library when working with quantum states. You can write quantum states in QuTiP notation, using qt.basis(2, i) to represent $\ket{i}$ on a single qubit. To learn more about QuTiP methods and features, see the [QuTiP user guide](https://qutip.org/docs/latest/guide/guide.html).

A density operator $\rho$ represents a pure state if and only if: 

- $\rho$ can be written as an outer product of a state vector, $\rho=\ket{\psi}\bra{\psi}$
- $\rho =\rho^2$
- $tr(\rho^2)=1$

To tell how close a given density operator $\rho$ is to being pure, you can look at the trace (that is, the sum of the diagonal elements) of $\rho^2$. A density operator represents a pure state if and only if $tr(\rho ^{2})=1$.

Consider the mixed state $\rho_{\text{mixed}} = \frac{1}{2}\left( \ket{0}\bra{0} + \ket{1}\bra{1} \right)$,

```python
import qutip as qt

ket0 = qt.basis(2, 0)
ket1 = qt.basis(2, 1)

rho_mixed = (ket0 * ket0.dag() + ket1 * ket1.dag()) / 2
print(rho_mixed)
```
```output
Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
Qobj data =
[[0.5  0.0]
 [0.0  0.5]]
```
The trace of $\rho$ is written as $Tr(\rho)$ and can be calculated using QuTiP's `.tr()` method:

```python
print((rho_mixed ** 2).tr())
```
```output
0.5
```
Now, consider the pure quantum state $\rho_{\text{pure}}=\ket{+}\bra{+}$,
```python
ket_plus = (1 / np.sqrt(2)) * (ket0 + ket1)
rho_pure = ket_plus * ket_plus.dag()
print(rho_pure)
```
```output
Quantum object: dims = [[2], [2]], shape = (2, 2), type = oper, isherm = True
Qobj data =
[[0.5  0.5]
 [0.5  0.5]]
```
The trace of $\rho_{\text{pure}}^2$ is

```python
print((rho_pure ** 2).tr())
```
```output
0.9999999999999996
```

For single qubit systems, mixed states can be plotted on the Bloch sphere in the same way as state vectors — doing so, pure states are those states that lie on the surface of the Bloch sphere, while mixed states in general can be "inside" the Bloch sphere.

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(6, 6))
bloch = qt.bloch.Bloch()
bloch.add_states([rho_pure], kind='point')
print(bloch.show())
```
:::image type="content" source="media/bloch-rho-pure.png" alt-text="Plot of a pure quantum state in the Bloch sphere, where the quantum state is in the X-axis.":::

```python
plt.figure(figsize=(6, 6))
bloch = qt.bloch.Bloch()
bloch.add_states([rho_mixed], kind='point')
bloch.show()
```

:::image type="content" source="media/bloch-rho-mixed.png" alt-text="Plot of a mixed quantum state in the Bloch sphere, where the quantm state is in the center of the sphere.":::

The state at the center of the Bloch sphere is the *maximally mixed state*. Unlike pure states, the maximally mixed state returns 50/50 outcomes for any ideal Pauli measurement.

If you are interested in learning more about density operators and pure and mixed states, you can read one of the reference books provided in [For more information](xref:microsoft.quantum.more-information).

## Q# gate sequences equivalent to quantum states

A final point worth raising about quantum notation and the Q# programming language: the beginning of this document mentioned that the quantum state is the fundamental object of information in quantum computing.  It may then come as a surprise that in Q# there is no notion of a quantum state.  Instead, all states are described only by the operations used to prepare them.  The previous example is an excellent illustration of this.  Rather than expressing a uniform superposition over every quantum bit string in a register, you can represent the result as $H^{\otimes n} \ket{0}$.  This exponentially shorter description of the state not only has the advantage that you can classically reason about it, but it also concisely defines the operations needed to be propagated through the software stack to implement the algorithm.  For this reason, Q# is designed to emit gate sequences rather than quantum states; however, at a theoretical level the two perspectives are equivalent.
