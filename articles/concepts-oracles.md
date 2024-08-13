---
author: SoniaLopezBravo
description: Learn how to work with and define quantum oracles, black box operations that are used as input to another algorithm.
ms.author: sonialopez
ms.date: 06/18/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Define Quantum Oracles 
uid: microsoft.quantum.concepts.oracles

#customer intent: As a quantum computing student, I want to learn how to work with and define quantum oracles, so that I can understand how to use them in quantum algorithms.
---

# Understanding quantum oracles

An oracle, $O$, is an unexposed operation that is used as input to another algorithm.
Often, such operations are defined using a classical function $f : \\{0, 1\\}^n \to \\{0, 1\\}^m$, which takes an $n$-bit binary input and produces an $m$-bit binary output.
To do so, consider a particular binary input $x = (x_{0}, x_{1}, \dots, x_{n-1})$.
You can label qubit states as $\ket{\vec{x}} = \ket{x_{0}} \otimes \ket{x_{1}} \otimes \cdots \otimes \ket{x_{n-1}}$.

You may first attempt to define $O$ so that $O\ket{x} = \ket{f(x)}$, but this method has a couple of problems.
First, $f$ may have a different size of input and output ($n \ne m$), such that applying $O$ would change the number of qubits in the register.
Second, even if $n = m$, the function may not be invertible:
if $f(x) = f(y)$ for some $x \ne y$, then $O\ket{x} = O\ket{y}$ but $O^\dagger O\ket{x} \ne O^\dagger O\ket{y}$.
This means you won't be able to construct the adjoint operation $O^\dagger$, and oracles have to have an adjoint defined for them.

## Define an oracle by its effect on computational basis states

You can deal with both of these problems by introducing a second register of $m$ qubits to hold the answer. 
Then, define the effect of the oracle on all computational basis states: for all $x \in \\{0, 1\\}^n$ and $y \in \\{0, 1\\}^m$,

$$
\begin{align}
    O(\ket{x} \otimes \ket{y}) = \ket{x} \otimes \ket{y \oplus f(x)}.
\end{align}
$$

Now $O = O^\dagger$ by construction and you've resolved both of the earlier problems.

> [!TIP]
> To see that $O = O^{\dagger}$, note that $O^2 = \mathbf{1}$ since $a \oplus b \oplus b = a$ for all $a, b \in \{0, 1\}$.
> As a result, $O \ket{x} \ket{y \oplus f(x)} = \ket{x} \ket{y \oplus f(x) \oplus f(x)} = \ket{x} \ket{y}$.

Importantly, defining an oracle this way for each computational basis state $\ket{x}\ket{y}$ also defines how $O$ acts for any other state.
This behavior follows immediately from the fact that $O$, like all quantum operations, is linear in the state that it acts on.
Consider the Hadamard operation, for example, which is defined by $H \ket{0} = \ket{+}$ and $H \ket{1} = \ket{-}$.
If you wish to know how $H$ acts on $\ket{+}$, you can use that $H$ is linear,

$$
\begin{align}
H\ket{+} & = \frac{1}{\sqrt{2}} H(\ket{0} + \ket{1}) = \frac{1}{\sqrt{2}} (H\ket{0} + H\ket{1}) \\\\
           & = \frac{1}{\sqrt{2}} (\ket{+} + \ket{-}) = \frac12 (\ket{0} + \ket{1} + \ket{0} - \ket{1}) = \ket{0}.
\end{align}
$$

When defining the oracle $O$, you can similarly use that any state $\ket{\psi}$ on $n + m$ qubits can be written as

$$
\begin{align}
\ket{\psi} & = \sum_{x \in \\{0, 1\\}^n, y \in \\{0, 1\\}^m} \alpha(x, y) \ket{x} \ket{y}
\end{align}
$$

where $\alpha : \\{0, 1\\}^n \times \\{0, 1\\}^m \to \mathbb{C}$ represents the coefficients of the state $\ket{\psi}$. Thus,

$$
\begin{align}
O \ket{\psi} & = O \sum_{x \in \\{0, 1\\}^n, y \in \\{0, 1\\}^m} \alpha(x, y) \ket{x} \ket{y} \\\\
             & = \sum_{x \in \\{0, 1\\}^n, y \in \\{0, 1\\}^m} \alpha(x, y) O \ket{x} \ket{y} \\\\
             & = \sum_{x \in \\{0, 1\\}^n, y \in \\{0, 1\\}^m} \alpha(x, y) \ket{x} \ket{y \oplus f(x)}.
\end{align}
$$

## Phase oracles

Alternatively, you can encode $f$ into an oracle $O$ by applying a _phase_ based on the input to $O$.
For example, you might define $O$ such that
$$
\begin{align}
    O \ket{x} = (-1)^{f(x)} \ket{x}.
\end{align}
$$

If a phase oracle acts on a register initially in a computational basis state $\ket{x}$, then this phase is a global phase and hence not observable.
But such an oracle can be a powerful resource if applied to a superposition or as a controlled operation.
For example, consider a phase oracle $O_f$ for a single-qubit function $f$.
Then,
$$
\begin{align}
    O_f \ket{+}
        & = O_f (\ket{0} + \ket{1}) / \sqrt{2} \\\\
        & = ((-1)^{f(0)} \ket{0} + (-1)^{f(1)} \ket{1}) / \sqrt{2} \\\\
        & = (-1)^{f(0)} (\ket{0} + (-1)^{f(1) - f(0)} \ket{1}) / \sqrt{2} \\\\
        & = (-1)^{f(0)} Z^{f(0) - f(1)} \ket{+}.
\end{align}
$$

> [!NOTE]
> Note that $Z^{-1}=Z^{\dagger}=Z$ and therefore $Z^{f(0)-f(1)}=Z^{f(1)-f(0)}.$

More generally, both views of oracles can be broadened to represent classical functions, which return real numbers instead of only a single bit.

Choosing the best way to implement an oracle depends heavily on how this oracle is to be used within a given algorithm.
For example, [Deutsch-Jozsa algorithm](https://en.wikipedia.org/wiki/Deutsch%E2%80%93Jozsa_algorithm) relies on the oracle implemented in the first way, while [Grover's algorithm](https://en.wikipedia.org/wiki/Grover's_algorithm) relies on the oracle implemented in the second way.

For more information, see the discussion in [Gilyén *et al*. 1711.00465](https://arxiv.org/abs/1711.00465).

## Related content

- [Grover's algorithm](xref:microsoft.quantum.concepts.grovers)
- [Quantum Intermediate Representation](xref:microsoft.quantum.concepts.qir)
- [Vectors and matrices](xref:microsoft.quantum.concepts.vectors)
- [T gates and T factories](xref:microsoft.quantum.concepts.tfactories)
