---
author: SoniaLopezBravo
description: Learn the basics of how to work with vectors and matrices in quantum computing.
ms.author: sonialopez
ms.date: 11/15/2023
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', '\mathbb{I}']
title: Vectors & Matrices in Quantum Computing
uid: microsoft.quantum.concepts.vectors
---

# Work with vectors and matrices in quantum computing

Some familiarity with vectors and matrices is essential to understand quantum computing. The article [Linear algebra for quantum computing](xref:microsoft.quantum.overview.algebra) provides a brief refresher, and readers who want to dive deeper are recommended to read a standard reference on linear algebra such as *Strang, G. (1993). Introduction to linear algebra (Vol. 3). Wellesley, MA: Wellesley-Cambridge Press* or an online reference such as [Linear Algebra](http://joshua.smcvt.edu/linearalgebra/).

## Vectors

A column vector (or simply [*vector*](https://en.wikipedia.org/wiki/Vector_(mathematics_and_physics))) $v$ of dimension (or size) $n$ is a collection of $n$ complex numbers $(v_1,v_2,\ldots,v_n)$ arranged as a column:

$$v =\begin{bmatrix}
v_1\\\\
v_2\\\\
\vdots\\\\
v_n
\end{bmatrix}$$

The norm of a vector $v$ is defined as $\sqrt{\sum\_i |v\_i|^2}$. A vector is said to be of unit norm (or alternatively it is called a [*unit vector*](https://en.wikipedia.org/wiki/Unit_vector)) if its norm is $1$. The [*adjoint of a vector*](https://en.wikipedia.org/wiki/Adjoint_matrix) $v$ is denoted $v^\dagger$ and is defined to be the following row vector where $\*$ denotes the complex conjugate,

$$\begin{bmatrix}v_1 \\\\ \vdots \\\\ v_n \end{bmatrix}^\dagger = \begin{bmatrix}v_1^* & \cdots & v_n^* \end{bmatrix}$$

Notice that there is a distinction between a column vector $v$ and a row vector $v^\dagger$. 

## Inner product

Two vectors can be multiplied together through the [*inner product*](https://en.wikipedia.org/wiki/Dot_product), also known as a *dot product* or *scalar product*. As the name implies, the result of the inner product of two vectors is a scalar. The inner product gives the projection of one vector onto another and is invaluable in describing how to express one vector as a sum of other simpler vectors. The inner product between two column vectors $u=(u_1 , u_2 , \ldots , u_n)$ and $v=(v_1 , v_2 , \ldots , v_n)$, denoted $\left\langle u, v\right\rangle$ is defined as

<!-- the next formula displays "\langleu" in some langs, or "missing \begin{matrix}.." in some others. I added the \left and \right prefixes     -->
<!--  Portuguese now displays "Missing or unrecognized delimiter for \left" Remove the \left, \right and make a single $, as below -->

$$
\left\langle u, v\right\rangle = u^\dagger v= \begin{bmatrix}u_1^* & \cdots & u_n^* \end{bmatrix} \begin{bmatrix}v_1\\\\ \vdots\\\\ v_n \end{bmatrix} =  u\_1^{\*} v_1 + \cdots + \_n^{\*} v\_n.
$$

This notation also allows the norm of a vector $v$ to be written as $\sqrt{\langle v, v\rangle}$.

A vector can be multiplied with a number $c$ to form a new vector whose entries are multiplied by $c$. You can also add two vectors $u$ and $v$ to form a new vector whose entries are the sum of the entries of $u$ and $v$. These operations are the following:

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
\end{bmatrix}.
$$

A [*matrix*](https://en.wikipedia.org/wiki/Matrix_(mathematics)) of size $m \times n$ is a collection of $mn$ complex numbers arranged in $m$ rows and $n$ columns as shown below:

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


$M = \begin{bmatrix} M_{11} ~~ M_{12} ~~ \cdots ~~ M_{1n}\\\\ M_{21} ~~ M_{22} ~~ \cdots ~~ M_{2n}\\\\ \ddots\\\\ M_{m1} ~~ M_{m2} ~~ \cdots ~~ M_{mn}\\\\ \end{bmatrix}.$

Note that a vector of dimension $n$ is simply a matrix of size $n \times 1$. As with vectors, a matrix can be multiplied with a number $c$ to obtain a new matrix where every entry is multiplied with $c$, and two matrices of the same size can be added to produce a new matrix whose entries are the sum of the respective entries of the two matrices. 

## Matrix multiplication

You can also multiply two matrices $M$ of dimension $m\times n$ and $N$ of dimension $n \times p$ to get a new matrix $P$ of dimension $m \times p$ as follows:

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

where the entries of $P$ are $P_{ik} = \sum_j M_{ij}N_{jk}$. For example, the entry $P_{11}$ is the inner product of the first row of $M$ with the first column of $N$. Note that since a vector is simply a special case of a matrix, this definition extends to matrix-vector multiplication. 

All the matrices we consider will either be square matrices, where the number of rows and columns are equal, or vectors, which corresponds to only $1$ column. One special square matrix is the [*identity matrix*](https://en.wikipedia.org/wiki/Identity_matrix), denoted $\mathbb{I}$, which has all its diagonal elements equal to $1$ and the remaining elements equal to $0$:

<!-- this displays almost correctly in all langs, but the alignment is off. Set to single $ to test -->
<!-- Port still out of alignment and doesn't recognize the \mathbb{I} (raw code)-->

$\mathbb{I}=\begin{bmatrix} 1 ~~ 0 ~~ \cdots ~~ 0\\\\ 0 ~~ 1 ~~ \cdots ~~ 0\\\\ ~~ \ddots\\\\ 0 ~~ 0 ~~ \cdots ~~ 1 \end{bmatrix}.$

<!-- Port chokes on this next one now-->

For a square matrix $A$, a matrix $B$ is its [*inverse*](https://en.wikipedia.org/wiki/Invertible_matrix) if $AB = BA = \mathbb{I}$. The inverse of a matrix need not exist, but when it exists it is unique and we denote it $A^{-1}$. 

<!-- German  resolves "A matrix $U$" as "Ein Matrix-U $$"-->
<!-- French chokes on $UU^\dagger = U^\dagger U = \mathbb{I}$, extra close brace or missing opening brace, Added \mathbb{I} to metadata -->
<!-- Port adds and extra brace to $U{-1} and swaps the dagger and = in $UU^\dagger -->

For any matrix $M$, the adjoint or conjugate transpose of $M$ is a matrix $N$ such that $N_{ij} = M_{ji}^\*$. The adjoint of $M$ is usually denoted $M^\dagger$. A matrix $U$ is [*unitary*](https://en.wikipedia.org/wiki/Unitary_matrix) if $UU^\dagger = U^\dagger U = \mathbb{I}$ or equivalently, $U^{-1} = U^\dagger$. One important property of unitary matrices is that they preserve the norm of a vector. This happens because 

<!-- doesn't resolve in any lang. making this a single $. Compare to inner product example where I added the \left and \right -->
<!-- Port works now! Try fix in Inner Product -->

$\langle v,v \rangle=v^\dagger v = v^\dagger U^{-1} U v = v^\dagger U^\dagger U v = \langle U v, U v\rangle.$

A matrix $M$ is said to be [*Hermitian*](https://en.wikipedia.org/wiki/Hermitian_matrix) if $M=M^\dagger$.

## Tensor product

Another important operation is the [*Kronecker product*](https://en.wikipedia.org/wiki/Kronecker_product), also called the *matrix direct product* or *tensor product*.  Note that the Kronecker product is distinguished from matrix multiplication, which is an entirely different operation. In quantum computing theory, *tensor product* is commonly used to denote the Kronecker product.

Consider the two vectors $v=\begin{bmatrix}a \\\\ b  \end{bmatrix} $ and $u =\begin{bmatrix} c \\\\ d \\\\ e \end{bmatrix} $.  Their tensor product is denoted as $v \otimes u$ and results in a block matrix.

<!-- this works in all languages. Indentation? -->
<!-- Try it in Algebra, representation of two-qubit states... -->

$$
	\begin{bmatrix}
		a \\\\ b  \end{bmatrix} \otimes \begin{bmatrix} c \\\\ d \\\\ e
	\end{bmatrix} =
	\begin{bmatrix}
		a \begin{bmatrix} c \\\\ d \\\\ e \end{bmatrix}
		\\\\[1.5em]
		b \begin{bmatrix} c \\\\ d \\\\ e\end{bmatrix}
	\end{bmatrix}
	= \begin{bmatrix} a c \\\\ a d \\\\ a e \\\\ b c \\\\ b d \\\\ be\end{bmatrix}
$$

Notice that tensor product is an operation on two matrices or vectors of arbitrary size. The tensor product of two matrices $M$ of size $m\times n$ and $N$ of size $p \times q$ is a larger matrix $P=M\otimes N$ of size $mp \times nq$, and is obtained from $M$ and $N$ as follows:

<!-- doesn't work in any language except english, although non-english shows mostly code but renders the very last sub-matrix ( M_{mn} ). Adding double $$ and indentation -->
<!-- Port still not working -->

$$
    \begin{align}
    	M \otimes N &=
    	\begin{bmatrix}
    		M_{11} ~~ \cdots ~~ M_{1n} \\\\
    		\ddots\\\\
    		M_{m1}  ~~ \cdots ~~ M_{mn}
    	\end{bmatrix}
    	\otimes
    	\begin{bmatrix}
    		N_{11}  ~~ \cdots ~~ N_{1q}\\\\
    		\ddots\\\\
    		N_{p1} ~~ \cdots ~~ N_{pq}
    	\end{bmatrix}\\\\
    	&=
    	\begin{bmatrix}
    		M_{11} \begin{bmatrix} N_{11}  ~~ \cdots ~~ N_{1q}\\\\ \ddots\\\\ N_{p1} ~~ \cdots ~~ N_{pq} \end{bmatrix}~~ \cdots ~~ 
    		M_{1n} \begin{bmatrix} N_{11}  ~~ \cdots ~~ N_{1q}\\\\ \ddots\\\\ N_{p1} ~~ \cdots ~~ N_{pq} \end{bmatrix}\\\\
    		\ddots\\\\
    		M_{m1} \begin{bmatrix} N_{11}  ~~ \cdots ~~ N_{1q}\\\\ \ddots\\\\ N_{p1} ~~ \cdots ~~ N_{pq} \end{bmatrix}~~ \cdots ~~ 
    		M_{mn} \begin{bmatrix} N_{11}  ~~ \cdots ~~ N_{1q}\\\\ \ddots\\\\ N_{p1} ~~ \cdots ~~ N_{pq} \end{bmatrix}
    	\end{bmatrix}.
    \end{align}
$$

<!-- this works in all langs -->

This is better demonstrated with an example:
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

A final useful notational convention surrounding tensor products is that, for any vector $v$ or matrix $M$, $v^{\otimes n}$ or $M^{\otimes n}$ is short hand for an $n$-fold repeated tensor product. For example:

<!-- all non-english langs show "extra close brace or missing opening brace". zh-cn shows some of the matrices, but each on a separate line -->
<!-- Compare to tensor product exameple that works, these are the same element types and structure -->

\begin{align}
&\begin{bmatrix} 1 \\\\ 0 \end{bmatrix}^{\otimes 1} = \begin{bmatrix} 1 \\\\ 0 \end{bmatrix}, \qquad\begin{bmatrix} 1 \\\\ 0 \end{bmatrix}^{\otimes 2} = \begin{bmatrix} 1 \\\\ 0 \\\\0 \\\\0 \end{bmatrix}, \qquad\begin{bmatrix} 1 \\\\ -1 \end{bmatrix}^{\otimes 2} = \begin{bmatrix} 1 \\\\ -1 \\\\-1 \\\\1 \end{bmatrix},
\\\\
  &\begin{bmatrix}	0 & 1 \\\\ 1& 0 	\end{bmatrix}^{\otimes 1}= \begin{bmatrix}	0& 1 \\\\ 1& 0 	\end{bmatrix},	\qquad\begin{bmatrix}	0 & 1 \\\\ 1& 0 	\end{bmatrix}^{\otimes 2}= \begin{bmatrix} 0 &0&0&1 \\\\ 0 &0&1&0 \\\\ 0 &1&0&0\\\\ 1 &0&0&0\end{bmatrix}.
\end{align}

## Next Steps 

- [Advanced matrix concepts](xref:microsoft.quantum.concepts.matrix-advanced)
- [The qubit](xref:microsoft.quantum.concepts.qubit)
- [Multiple qubits](xref:microsoft.quantum.concepts.multiple-qubits)
- [Dirac notation](xref:microsoft.quantum.concepts.dirac)
- [Pauli measurements](xref:microsoft.quantum.concepts.pauli)

