---
author: SoniaLopezBravo
description: Learn the basics concepts of linear algebra and how to work with vectors and matrices in quantum computing.
ms.author: sonialopez
ms.date: 06/15/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', '\mathbb{I}']
title: Vectors & Matrices in Quantum Computing
uid: microsoft.quantum.concepts.vectors

#customer intent: As a quantum developer, I want to learn how to work with vectors and matrices in quantum computing so that I can better understand quantum algorithms and quantum operations.
---

# Vectors and matrices in quantum computing

Some familiarity with linear algebra is essential to understand quantum computing. This article introduces the basic concepts of linear algebra and how to work with vectors and matrices in quantum computing.


## Vectors

A column vector, or vector for short, $v$ of dimension (or size) $n$ is a collection of $n$ complex numbers $(v_1,v_2,\ldots,v_n)$ arranged as a column:

$$v =\begin{bmatrix}
v_1\\\\
v_2\\\\
\vdots\\\\
v_n
\end{bmatrix}$$

The norm of a vector $v$ is defined as $\sqrt{\sum_i |v_i|^2}$. A vector is called a *unit vector* if its norm is $1$. 

The *adjoint* of a column vector $v$ is a row vector denoted as $v^\dagger$ and is defined as the conjugate transpose of $v$. For a column vector $v$ of dimension $n$, the adjoint is a row vector of dimension $1 \times n$:

$$\begin{bmatrix}v_1 \\\\ \vdots \\\\ v_n \end{bmatrix}^\dagger = \begin{bmatrix}v_1^* & \cdots & v_n^* \end{bmatrix}$$

where $v_i^*$ denotes the complex conjugate of $v_i$.

Using linear algebra, the state of a qubit $ \psi = a \ket{0} + b \ket{1}$ is described as a **quantum state vector** $\begin{bmatrix} a \\\\  b \end{bmatrix}$, where $|a|^2 + |b|^2 = 1$. For more information, see [The qubit](xref:microsoft.quantum.concepts.qubit).

## Scalar product

Two vectors can be multiplied together through the *scalar product*, also known as *dot product* or *inner product*. As the name implies, the result of the scalar product of two vectors is a scalar. The scalar product gives the projection of one vector onto another and is used to express one vector as a sum of other simpler vectors. The scalar product between two column vectors $u$ and $v$ is denoted as $\left\langle u, v\right\rangle = u^\dagger v $ and is defined as 

<!-- the next formula displays "\langleu" in some langs, or "missing \begin{matrix}.." in some others. I added the \left and \right prefixes     -->
<!--  Portuguese now displays "Missing or unrecognized delimiter for \left" Remove the \left, \right and make a single $, as below -->
<!-- Portugues now works, fr-fr and zn-ch still show "Missing or unrecognized delimiter for \left" -->

$$
\left\langle u, v\right\rangle = u^\dagger v= \begin{bmatrix}u_1^* & \cdots & u_n^* \end{bmatrix} \begin{bmatrix}v_1\\\\ \vdots\\\\ v_n \end{bmatrix} =  u_1^* v_1 + \cdots + u_n^* v_n.
$$

With the scalar product, the norm of a vector $v$ can be written as $\sqrt{\langle v, v\rangle}$.

You can multiply a vector with a number $a$ to form a new vector whose entries are multiplied by $a$. You can also add two vectors $u$ and $v$ to form a new vector whose entries are the sum of the entries of $u$ and $v$. These operations are the following:

<!-- this formula displays okay in all langs so far   -->

$$\mathrm{If}~u =\begin{bmatrix}
u_1\\\\
u_2\\\\
\vdots\\\\
u_n
\end{bmatrix}~\mathrm{and}~
v =\begin{bmatrix}
	v_1\\\\
	v_2\\\\
	\vdots\\\\
	v_n
\end{bmatrix},~\mathrm{then}~
au+bv =\begin{bmatrix}
au_1+bv_1\\\\
au_2+bv_2\\\\
\vdots\\\\
au_n+bv_n
\end{bmatrix}
$$

## Matrices

A *matrix* of size $m \times n$ is a collection of $m\cdot n$ complex numbers arranged in $m$ rows and $n$ columns as shown below:

<!-- this formula displays as raw LaTeX in non-english langs.  Reformatted as single line

$$M = 
\begin{bmatrix}
M_{11} ~~ M_{12} ~~ \cdots ~~ M_{1n}\\\\
M_{21} ~~ M_{22} ~~ \cdots ~~ M_{2n}\\\\
\ddots\\\\
M_{m1} ~~ M_{m2} ~~ \cdots ~~ M_{mn}\\\\
\end{bmatrix}.$$

-->
<!-- Still raw LaTeX in Portuguese -->


$M = \begin{bmatrix} M_{11} ~~ M_{12} ~~ \cdots ~~ M_{1n}\\\\ M_{21} ~~ M_{22} ~~ \cdots ~~ M_{2n}\\\\ \ddots\\\\ M_{m1} ~~ M_{m2} ~~ \cdots ~~ M_{mn}\\\\ \end{bmatrix}$

> [!NOTE]
> Note that a vector of dimension $n$ is simply a matrix of size $n \times 1$.

Quantum operations are represented by *squared matrices*, that is, the number of rows and columns are equal. For example, single-qubit operations are represented by $2 \times 2$ matrices, like the Pauli $X$ operation

$$X = \begin{bmatrix}
        0 & 1 \\\\
        1 & 0
    \end{bmatrix}$$

> [!TIP]
> In Q#, the Pauli $X$ operation is represented by the `X` operation.

As with vectors, you can multiply a matrix with a number $c$ to obtain a new matrix where every entry is multiplied with $c$, and two matrices of the same size can be added to produce a new matrix whose entries are the sum of the respective entries of the two matrices.

## Matrix multiplication

You can also multiply a matrix $M$ of dimension $m\times n$ and a matrix $N$ of dimension $n \times p$ to get a new matrix $P$ of dimension $m \times p$ as follows:

<!-- for some reason this works without any $$ in english... other langs is either raw code (with different translations), "double subscripts, use braces to clarify", or "missing \begin{matrix}.."  I'm adding the dollar signs -->
<!--  Portuguese still raw code, english is okay -->


$$
\begin{align}
&\begin{bmatrix}
	M_{11} ~~ M_{12} ~~ \cdots ~~ M_{1n}\\\\
	M_{21} ~~ M_{22} ~~ \cdots ~~ M_{2n}\\\\
	\ddots\\\\
	M_{m1} ~~ M_{m2} ~~ \cdots ~~ M_{mn}
\end{bmatrix}
\begin{bmatrix}
N_{11} ~~ N_{12} ~~ \cdots ~~ N_{1p}\\\\
N_{21} ~~ N_{22} ~~ \cdots ~~ N_{2p}\\\\
\ddots\\\\
N_{n1} ~~ N_{n2} ~~ \cdots ~~ N_{np}
\end{bmatrix}=\begin{bmatrix}
P_{11} ~~ P_{12} ~~ \cdots ~~ P_{1p}\\\\
P_{21} ~~ P_{22} ~~ \cdots ~~ P_{2p}\\\\
\ddots\\\\
P_{m1} ~~ P_{m2} ~~ \cdots ~~ P_{mp}
\end{bmatrix}
\end{align}
$$

where the entries of $P$ are $P_{ik} = \sum_j M_{ij}N_{jk}$. For example, the entry $P_{11}$ is the scalar product of the first row of $M$ with the first column of $N$. Note that since a vector is simply a special case of a matrix, this definition extends to matrix-vector multiplication.

## Special types of matrices

One special square matrix is the *identity matrix*, denoted $\mathbb{I}$, which has all its diagonal elements equal to $1$ and the remaining elements equal to $0$:

<!-- this displays almost correctly in all langs, but the alignment is off. Set to single $ to test -->
<!-- Port aligns now but doesn't recognize the \mathbb{I} (raw code)-->

$\mathbb{I}=\begin{bmatrix} 1 ~~ 0 ~~ \cdots ~~ 0\\\\ 0 ~~ 1 ~~ \cdots ~~ 0\\\\ ~~ \ddots\\\\ 0 ~~ 0 ~~ \cdots ~~ 1 \end{bmatrix}.$

<!-- Port chokes on this next one now-->

For a square matrix $A$, a matrix $B$ is its *inverse* if $AB = BA = \mathbb{I}$. If a matrix $A$ has an inverse, the inverse matrix is unique and is written as $A^{-1}$.

<!-- German  resolves "A matrix $U$" as "Ein Matrix-U $$"-->
<!-- French chokes on $UU^\dagger = U^\dagger U = \mathbb{I}$, extra close brace or missing opening brace, Added \mathbb{I} to metadata -->
<!-- Port adds and extra brace to $U{-1} and swaps the dagger and = in $UU^\dagger -->

For any matrix $M$, the adjoint or conjugate transpose of $M$ is a matrix $N$ such that $N_{ij} = M_{ji}^*$. The adjoint of $M$ is denoted $M^\dagger$. 

A matrix $U$ is *unitary* if $UU^\dagger = U^\dagger U = \mathbb{I}$ or equivalently, $U^{-1} = U^\dagger$. One important property of unitary matrices is that they preserve the norm of a vector. This happens because 

<!-- doesn't resolve in any lang. making this a single $. Compare to inner product example where I added the \left and \right -->
<!-- Port works now! Try fix in Inner Product -->

$\langle v,v \rangle=v^\dagger v = v^\dagger U^{-1} U v = v^\dagger U^\dagger U v = \langle U v, U v\rangle.$

> [!NOTE]
> Quantum operations are represented by unitary matrices, which are squared matrices whose adjoint is equal to their inverse.

A matrix $M$ is called *Hermitian* if $M=M^\dagger$.

In quantum computing, there are essentially only two matrices that you encounter: Hermitian and unitary.

## Tensor product

Another important operation is the *tensor product*, also called the *matrix direct product* or *Kronecker product*.

Consider the two vectors $v=\begin{bmatrix}a \\\\ b  \end{bmatrix} $ and $u =\begin{bmatrix} c \\\\ d  \end{bmatrix} $. Their tensor product is denoted as $v \otimes u$ and results in a block matrix.

<!-- this works in all languages. Indentation? -->
<!-- Try it in Algebra, representation of two-qubit states... -->

$$
	\begin{bmatrix}
		a \\\\ b  \end{bmatrix} \otimes \begin{bmatrix} c \\\\ d 
	\end{bmatrix} =
	\begin{bmatrix}
		a \begin{bmatrix} c \\\\ d  \end{bmatrix}
		\\\\[1.5em]
		b \begin{bmatrix} c \\\\ d \end{bmatrix}
	\end{bmatrix}
	= \begin{bmatrix} a c \\\\ a d \\\\  b c \\\\ b d \end{bmatrix}
$$

> [!NOTE]
> Note that the tensor product is distinguished from matrix multiplication, which is an entirely different operation.

The tensor product is used to represent the combined state of multiple qubits. The real power of quantum computing comes from leveraging multiple qubits to perform computations. For more, see [Operations on multiple qubits](xref:microsoft.quantum.concepts.multiple-qubits).

The tensor product of two square matrices $M$ and $N$ of size $n\times n$ is a larger matrix $P=M\otimes N$ of size $n^2 \times n^2$. For example:

<!-- this works in portuguese, not fr-fr or zn-ch  -->

$$
	\begin{bmatrix}
		a\ b \\\\ c\ d
	\end{bmatrix}
	\otimes 
	\begin{bmatrix}
		e\ f\\\\ g\ h
	\end{bmatrix}
	 =
	\begin{bmatrix}
	a\begin{bmatrix}
	e\ f\\\\ g\ h
	\end{bmatrix}
	b\begin{bmatrix}
	e\ f\\\\ g\ h
	\end{bmatrix}
	\\\\[1em]
	c\begin{bmatrix}
	e\ f\\\\ g\ h
	\end{bmatrix}
	d\begin{bmatrix}
	e\ f\\\\ g\ h
	\end{bmatrix}
	\end{bmatrix}
	=
	\begin{bmatrix}
	ae\ af\ be\ bf \\\\
	ag\ ah\ bg\ bh \\\\
	ce\ cf\ de\ df \\\\
	cg\ ch\ dg\ dh
	\end{bmatrix}.
$$

## Related content

- [Advanced matrix concepts](xref:microsoft.quantum.concepts.matrix-advanced)
- [The qubit](xref:microsoft.quantum.concepts.qubit)
- [Multiple qubits](xref:microsoft.quantum.concepts.multiple-qubits)
- [Dirac notation](xref:microsoft.quantum.concepts.dirac)
- [Pauli measurements](xref:microsoft.quantum.concepts.pauli)