---
title: Binary Optimization
description: This document describes Binary Optimization and its use in formulating optimization problems.
author: aminbarzegar
ms.author: ambarzeg
ms.date: 1/21/2021
ms.topic: article
uid: microsoft.quantum.optimization.concepts.binary-optimization
---

# Binary Optimization

Binary optimization is a subclass of more general combinatorial optimization
problems in which the variables are restricted to a finite set of values, in
this particular case just two. Therefore, a binary optimization problem can be
stated as the effort of minimizing an objective function $H(\vec{x})$ of $N$
variables with values $x_i\in\\{0,1\\}$ subject to some equality and/or inequality
constraints. These constraints restrict the values that the variables can take,
in order to ensure only feasible solutions are proposed. Some example constraints
$f(\vec{x})$ and $g(\vec{x})$ are included below.

$$
\min_{\vec{x}}\left\\{H(\vec{x}) \quad | \quad \vec{x}\in\\{0,1\\}^N\right\\},$$
$$f(\vec{x}) = 0, \\\ g(\vec{x}) > 0.$$                           

Binary optimization constitutes a broad range of important problems of both 
scientific and industrial nature such as social network analysis, portfolio
optimization in finance, traffic management and scheduling in transportation, 
lead optimization in pharmaceutical drug discovery, and many more.


## Polynomial Unconstrained Binary Optimization (PUBO)

PUBOs are a subset of binary optimization problems with no constraints where
the objective function  is a polynomial of the variables. The degree $k$ of such
a polynomial is often referred to as the *locality* of PUBO. For instance, the
objective function of a $k$-local PUBO can be expressed in the following way:

$$H(\vec{x})= \sum_{i_1}^N J_{i_1}x_{i_1} + \frac{1}{2!}\sum_{i_1,i_2}^NJ_{i_1i_2}x_{i_1}x_{i_2}+\cdots +\frac{1}{k!}\sum_{i_1,\ldots i_k}^NJ_{i_1i_2\ldots i_k}x_{i_1}\ldots x_{i_k},$$

in which $J_{i_1i_2\ldots i_n}$ represents the $n$-point interactions
between variables $x_{i_1},x_{i_2},\ldots,x_{i_n}$. We can interpret 
the variables to be (on) the nodes and their interactions as the edges of
an underlying graph. Note that each of $J_{i_1i_2\ldots i_n}$ is a
symmetric tensor since any permutaion of the indices will leave the 
corresponding term in the above objective function unchanged, the reason
being that such a permutation is equivalent to a reshuffling of the $x_i$
values. In terms with an even number of variables, the diagonal terms 
can be ignored owing to the fact that $x_i^2=1$.

## Quadratic Unconstrained Binary Optimization (QUBO)

QUBOs are special cases of PUBOs where the order of the polynomial is $2$, 
namely,

$$
\min_{\vec{x}}\left\\{H(\vec{x})=\sum_{i}^N h_ix_i 
+\frac{1}{2}\sum_{i,j}^N J_{ij}x_i x_j\quad|\quad
\vec{x}\in\\{-1,1\\}^N\right\\}.
$$

If the elements of the adjacency matrix $J_{ij}$ are drawn from a random
distribution, the above objective function is equivalent to the *Hamiltonian*
of so-called *spin glass*. Spin glasses are well-known in physics for their 
rugged energy landscape with exponentially many local minima which makes 
finding their ground state an NP-hard problem.
Many non-trivial optimization problems such as max-cut, network flows, 
satisfiability, geometrical packing, graph coloring, and integer linear
programming can be formulated as QUBOs although in some cases, doing so 
might increase the hardness of the problem. 

### Example of a QUBO problem

Here we show the QUBO mapping for the famous Travelling Salesperson Problem (TSP).

![The travelling salesperson problem.](../../.././media/travelling-salesperson.png)

The TSP is a simple yet important problem with applications in transportation. 
It consists of trying to find the shortest closed path between a set of $N$
sites $\mathcal{S}$ such that each site is visited exactly once except for the
initial site. In other words, the path must not cross itself. Assuming that 
the distance between sites $\alpha$ and $\beta$ is $w_{\alpha\beta}$,
the QUBO objective function can be expressed as follows:

$$
H(\vec{x})=\sum_{\alpha,\beta\in\mathcal{S}}
\sum_{i=1}^N w_{\alpha\beta}x_{\alpha, i}x_{\beta, i+1} +
\lambda\sum_{i=1}^N\left(1-\sum_{\alpha\in\mathcal{S}}x_{\alpha,i}\right)^2 +
\lambda\sum_{\alpha\in\mathcal{S}}\left(1-\sum_{i=1}^N x_{\alpha,i}\right)^2,
$$

in which the binary variable $x_{\alpha,i}$ is equal to $1$ if site $\alpha$ 
appears $j$th in the path, otherwise it is $0$.  The first term in the 
above expression is simply the length of the path, whereas the last two terms 
enforce the requirements that every site in $\mathcal{S}$ appears in the
path and no site is visited more than once, respectively. 
Note that the penalty coefficient $\lambda$ must be a large positive number
so that any deviation form the constraints is heavily supressed.
