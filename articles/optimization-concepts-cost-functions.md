---
title: Cost Functions
description: This document describes the definition and purpose of the cost function for optimization problems.
author: andrist
ms.author: ruandris
ms.date: 1/13/2021
ms.topic: article
uid: microsoft.quantum.optimization.concepts.cost-function
---

# Cost Functions

An *optimization problem* is described by a set of *variables*, each having a set
(or range) of possible values. They describe the decisions that the optimizer
must make.

A *solution* assigns a value to each of these variables. These describe the choice
for each of the aforementioned decisions.

The *cost function* associates a numerical value ("score") with each possible
solution in order to compare them and select the most favorable one (typically
identified by the lowest cost value).

> [!NOTE]
> In physics, the *Hamiltonian* takes the role of the cost function and its
> cost value is referred to as the *energy* of the system. Each choice of
> variable values is called a *state* and the lowest-energy state is the
> *ground state*.

## Implementation

In general, the cost function implementation could defer to a full reference
table, a black box implementation or even external input. However, a
frequent approach is to define it as a *mathematical expression* of the
problem's variables and parameters.

**Example**: Find a fraction of integers $x$, $y$ which is close to $\pi$.

*   Two variables: $x$, $y$ (integers $\in [1..100]$)
*   Cost function: 
    $$ \mathrm{cost} = \left| \frac{x}{y} - \pi \right| $$
    (we want the cost to be minimal when $x/y \approx \pi$).
*   Possible solutions: $[1..100] \times [1..100]$ (independent choices of $x$,
    $y$)
*   Simple approximation:
    $$ x=3\text{, }y=1 \quad\Rightarrow\quad \mathrm{cost}=\left|\frac31-\pi\right|=0.14159 $$
*   Best solution in this value range:
    $$ x=22\text{, }y=7 \quad\Rightarrow\quad \frac{22}{7}\approx 3.14286\text{, }\mathrm{cost}\approx 0.00126 $$

> [!NOTE]
> It is not required for the optimal solution of the cost function to have a
> $\mathrm{cost}=0$.

## Constraints

A *constraint* is a relation between multiple variables which must hold for a
solution to be deemed valid.

Solutions which violate constraints can either be assigned a very high cost
("penalty") by the cost function or be excluded from sampling explicitly by
the optimizer.

**Example**: In the above problem of finding a fraction close to $\pi$, multiplying
both $x$ and $y$ with the same number yields an equally optimal solution (e.g., $44/14$).
We can avoid this by adding a penalty term for non-simplified fractions:

$$ \mathrm{cost} = \left| \frac{x}{y} - \pi \right| + \underbrace{100(\gcd(x,y)-1)}_{\mathrm{penalty}}, $$

where $\gcd(x,y)$ is the greatest common divisor of $x$ and $y$, such that
the term in parentheses vanishes for simplified fractions. With this addition,
the optimal solution, $22/7$, is unique.

> [!NOTE]
> Constraints on individual variables are typically incorporated into their
> respective set of allowed values rather than a constraint.

## Parameterized Models

Typical optimization problems consist of many variables and several terms
constituting the cost function. It is therefore pertinent to select a
specific structure for the mathematical expression, while denoting merely
the parameters and variable locations required to construct the cost
function.

**Example**: Divide a set of $N$ numbers into two groups of equal sum.

*   Input Parameters: $w_0..w_{N-1}$ the numbers in the set
*   $N$ Variables: $x_0..x_{N-1}$ denoting whether the $i$-th number is in the
    first ($x_i=+1$) or second group ($x_i=-1$).
*   Model cost function:
    $$ \mathrm{cost} = \left| \sum_i w_i x_i \right| $$

That is, we always construct a cost function of the form in the third bullet,
but we adjust the parameters $w_i$ according to the specific problem instance
we are solving.

For instance, the numbers $[18, 19, 36, 84, 163, 165, 243]$ would result in
the cost function

$$ \mathrm{cost} = \left| 18x_0 + 19x_1 + 36x_2 + 84x_3 + 163x_4 + 165x_5 + 243x_6 \right|$$

> [!NOTE]
> This instance has only two solutions with $\mathrm{cost}=0$ (one mirroring
> the other). Can you find them?

## Supported Models

Models implemented in our optimizers include the
[Ising Model](xref:microsoft.quantum.optimization.concepts.ising-model),
and Quadratic/Polynomial unconstrained
[binary optimization](xref:microsoft.quantum.optimization.concepts.binary-optimization)
problems. These support versatile applications because several other
optimization problems can be mapped to them.

**Example**: For the above number set division problem, one can substitute the
absolute value with the square operator (which also has its lowest value at 0)
to obtain:

$$ \mathrm{cost}' = \left(\sum_i w_ix_i\right)^2 = \sum_{ij} w_iw_jx_ix_j\text{ .} $$

When multiplied out, this cost function has more terms than the previous one,
but it happens to be in the (polynomial) form supported by our optimizers
(namely, an Ising cost function).

### Ising Cost Function

Ising variables take the values $x_i\in\\{\pm1\\}$ and the parameterized Ising
cost function has the form:

$$ \mathrm{cost} = \sum_k \mathrm{term}_k = \sum_k c_k\prod_i x_i\text{ .} $$

The parameters `c` and the `ids` of the variables $x_i$ participating in each
term $k$ are listed as part of the input:

For instance, the input:
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
describes the an Ising cost function with 3 terms:
$$ \mathrm{cost} = 3x_0x_1x_2 -2x_0x_3 + x_2x_3\text{ .} $$

> [!NOTE]
> An empty `ids` array (constant term) or with a single value ("local field")
> is allowed, but the same variable `id` cannot be repeated within a term.

> [!CAUTION]
> The definition of the Ising cost function differs from the canonical Ising
> model Hamiltonian $ \mathcal{H}=-\sum_{ij}J_{ij}\sigma_i\sigma_j $
> typically employed in statistical mechanics (by a global sign). As a result
> *negative* term constants $c_k$ result in *ferromagnetic* interaction between
> two variables.

### PUBO Cost Function

For binary optimization problems, variables take the values $x_i\in\\{0,1\\}$ and the cost function has the form:

$$ \mathrm{cost} = \sum_k \mathrm{term}_k = \sum_k c_k\prod_i x_i\text{ .} $$

For instance, the input:
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
describes a PUBO cost function with 3 terms:
$$ \mathrm{cost} = 3x_0x_1x_2 -2x_0x_3 + x_2x_3\text{ .} $$

Though the form of the cost function is identical to the Ising case, this
describes a different optimization problem (the set of allowed variable
values is different: $\\{0,1\\}$ vs $\\{\pm1\\}$).

> [!NOTE]
> PUBO and QUBO are handled by the same cost function; there is no separate
> `"qubo"` identifier. Quadratic binary optimization problems are a special
> case of a PUBO where each `ids` array has length at most 2.

