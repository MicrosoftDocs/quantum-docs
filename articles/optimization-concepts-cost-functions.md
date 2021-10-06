---
author: andrist
description: This document describes the definition and purpose of the cost function for optimization problems.
ms.author: ruandris

ms.date: 10/05/2021

ms.service: azure-quantum
ms.subservice: optimization
ms.topic: conceptual
title: Cost Functions
uid: microsoft.quantum.optimization.concepts.cost-function
---

# Cost functions

An *optimization problem* is described by a set of *variables*, each having a set, or range, of possible values. They describe the decisions that the optimization solver must make.

A *solution* assigns a value to each of these variables. The variables describe the choice
for each of the aforementioned decisions.


The *cost function* associates a numerical value, or *score*, with each possible
solution in order to compare them and select the most favorable one, the *optimal solution*, which is typically
identified by the lowest cost value.

> [!NOTE]
> In physics, the *Hamiltonian* takes the role of the cost function and its
> cost value is referred to as the *energy* of the system. Each choice of
> variable values is called a *state* and the lowest-energy state is the
> *ground state*.

## Implementation

In general, the cost function implementation could defer to a full reference
table, a black box implementation, or even external input. However, a
frequent approach is to define it as a *mathematical expression* of the
problem's variables and parameters.

**Example**: Find a fraction of integers $x$, $y$ which is close to $\pi$.

* Two variables: $x$, $y$ (integers $\in [1..100]$)
* Cost function: 
  $$ \mathrm{cost} = \left| \frac{x}{y} - \pi \right| $$
  (you want the cost to be minimal when $x/y \approx \pi$).
* Possible solutions: $[1..100] \times [1..100]$ (independent choices of $x$,
  $y$)
* Simple approximation:
  $$ x=3\text{, }y=1 \quad\Rightarrow\quad \mathrm{cost}=\left|\frac31-\pi\right|=0.14159 $$
* Best solution in this value range:
  $$ x=22\text{, }y=7 \quad\Rightarrow\quad \frac{22}{7}\approx 3.14286\text{, }\mathrm{cost}\approx 0.00126 $$

> [!NOTE]
> The optimal solution of the cost function is the solution with the lowest score; it is not required for the cost function to have a
> $\mathrm{cost}=0$.

## Constraints

A *constraint* is a relation between multiple variables that must hold for a
solution to be considered valid.

Solutions which violate constraints can either be assigned a very high cost, or *penalty*, by the cost function or be excluded from sampling explicitly by
the solver.

**Example**: In the previous problem of finding a fraction close to $\pi$, multiplying
both $x$ and $y$ with the same number yields an equally optimal solution (for example, $44/14$).
You can avoid this by adding a penalty term for non-simplified fractions:

$$ \mathrm{cost} = \left| \frac{x}{y} - \pi \right| + \underbrace{100(\gcd(x,y)-1)}_{\mathrm{penalty}}, $$

where $\gcd(x,y)$ is the greatest common divisor of $x$ and $y$, such that
the term in parentheses vanishes for simplified fractions. With this addition,
the optimal solution, $22/7$, is unique.

> [!NOTE]
> Constraints on individual variables are typically incorporated into their
> respective set of allowed values rather than a constraint.

## Parameterized models

Typically, optimization problems consist of many variables and several terms that make up the cost function. 
It is useful to select a specific mathematical structure to represent these cost functions which allows you to simply denote the parameters and variable locations required to construct the cost function for your specific problem.

**Example**: Divide a set of $N$ numbers into two groups of equal sum.

* Input Parameters: $w_0..w_{N-1}$ the numbers in the set
* $N$ Variables: $x_0..x_{N-1}$ denoting whether the $i$-th number is in the
    first ($x_i=+1$) or second group ($x_i=-1$).
* Model cost function:
  $$ \mathrm{cost} = \left| \sum_i w_i x_i \right| $$


That is, you always construct a cost function of the form in the last bullet,
but you adjust the parameters $w_i$ according to the specific problem instance
you are solving.

For example, the numbers $[18, 19, 36, 84, 163, 165, 243]$ result in
the cost function

$$ \mathrm{cost} = \left| 18x_0 + 19x_1 + 36x_2 + 84x_3 + 163x_4 + 165x_5 + 243x_6 \right|$$

> [!NOTE]
> This example has only two solutions with $\mathrm{cost}=0$ (one mirrors
> the other). Can you find them?

## Supported models

Models implemented in the Microsoft QIO solvers include the
[Ising Model](xref:microsoft.quantum.optimization.concepts.ising-model),
and the [quadratic and polynomial unconstrained binary optimization](xref:microsoft.quantum.optimization.concepts.binary-optimization) (QUBO and PUBO)
problems. These support versatile applications because several other
optimization problems can be mapped to them.


**Example**: For the previous number set division problem, you can substitute the

absolute value with the square operator (which also has its lowest value at 0)
to obtain

$$ \mathrm{cost}' = \left(\sum_i w_ix_i\right)^2 = \sum_{ij} w_iw_jx_ix_j\text{ .} $$


When multiplied out, this cost function has more terms than the previous example,
but it happens to be in the polynomial (PUBO) form supported by the Microsoft QIO solvers
(namely, an Ising cost function).


### Ising cost function

Ising variables take the values $x_i\in\\{\pm1\\}$ and the parameterized Ising
cost function has the form

$$ \mathrm{cost} = \sum_k \mathrm{term}_k = \sum_k c_k\prod_i x_i\text{ .} $$

The parameters $c$ and the *ids* of the variables $x_i$ participating in each
term $k$ are listed as part of the input.

For instance, the input

```json
"cost_function": {
  "type": "ising",
  "version": "2.0",
  "terms": [
    { "c":  3, "ids": [0, 1, 2] },
    { "c": -2, "ids": [0, 3] },
    { "c":  1, "ids": [2, 3] }
  ]
}
```

describes an Ising cost function with three terms:
$$ \mathrm{cost} = 3x_0x_1x_2 -2x_0x_3 + x_2x_3\text{ .} $$

> [!NOTE]
> An empty `ids` array (constant term) or with a single value ("local field")
> is allowed, but the same variable `id` cannot be repeated within a term.

> [!CAUTION]
> The definition of the Ising cost function differs from the canonical Ising
> model Hamiltonian $ \mathcal{H}=-\sum_{ij}J_{ij}\sigma_i\sigma_j $
> that is typically employed in statistical mechanics by a global sign. As a result,
> *negative* term constants $c_k$ result in *ferromagnetic* interaction between
> two variables.

### PUBO cost function

For binary optimization problems, variables take the values $x_i\in\\{0,1\\}$ and the cost function has the form

$$ \mathrm{cost} = \sum_k \mathrm{term}_k = \sum_k c_k\prod_i x_i\text{ .} $$

For example, the input

```json
"cost_function" {
  "type": "pubo",
  "version": "2.0",
  "terms": [
    { "c":  3, "ids": [0, 1, 2] },
    { "c": -2, "ids": [0, 3] },
    { "c":  1, "ids": [2, 3] }
  ]
}
```

describes a PUBO cost function with three terms:
$$ \mathrm{cost} = 3x_0x_1x_2 -2x_0x_3 + x_2x_3\text{ .} $$

Although the form of the PUBO cost function is identical to the previous Ising example, the PUBO cost function describes a different optimization problem, that is, the set of allowed variable values is different: $\\{0,1\\}$ vs $\\{\pm1\\}$.

> [!NOTE]
> PUBO and QUBO are handled by the same cost function; there is no separate
> **qubo** identifier. Quadratic binary optimization problems are a special
> case of a PUBO where each `ids` array has length at most 2.
