---
title: Theory of Grover's search algorithm
description: Learn about the theory behind Grover's algorithm.
author: geduardo
uid: microsoft.quantum.concepts.grovers
ms.author: v-edsanc
ms.date: 12/11/2017
ms.topic: article
ms.prod: azure-quantum
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
---

# Theory of Grover's search algorithm

In this article you'll find a detailed theoretical explanation of the
mathematical principles that make Grover's algorithm work.

For a practical implementation of Grover's algorithm to solve mathematical
problems you can read our [guide to implement Grover's search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers).

## Statement of the problem

Any searching task can be expressed with an abstract function $f(x)$ that accepts search items $x$. If the item $x$ is a solution for the search task, then $f(x)=1$. If the item $x$ isn't a solution, then $f(x)=0$. The search problem consists on finding any item $x_0$ such that $f(x_0)=1$. This is, an item $x_0$ that is a solution of the search problem.

The task that Grover's algorithm aims to solve is, given a classical function $f(x):\\{0,1\\}^n \rightarrow\\{0,1\\}$, find an input $x_0$ for which $f(x_0)=1$.

## Outline of the algorithm

Suppose we have $N=2^n$ eligible items for the search task and we index them by assigning each item a integer from $0$ to
$N-1$. The steps of the algorithm are:

1. Start with a register of $n$ qubits initialized in the state $\ket{0}$ by applying $H$ to each qubit of the register.
1. Prepare the register into a uniform superposition: $$|\text{register}\rangle=\frac{1}{N^{1 / 2}} \sum_{x=0}^{N-1}|x\rangle$$
1. Apply $N_{\text{optimal}}$ times the following operations to the register:
   1. The phase oracle $O_f$ that applies a conditional phase shift of $-1$ for the solution items.
   1. Apply $H$ to each qubit of the register.
   1. A conditional phase shift of $-1$ to every computational basis state except $\ket{0}$. This can be represented by the unitary operation $O_0$.
   1. Apply $H$ to each qubit of the register.
1. Measure the register to obtain the index of a item that's a solution with very high probability.
1. Check if it's a valid solution. If not, start again.

$N_{\text{optimal}} is the optimal number of iterations that maximizes the likelihood of obtaining the correct item by measuring the register.

The overall unitary operation applied to the register is:

$$(-H^{\otimes n}O_0H^{\otimes n}O_f)^{N_{\text{optimal}}}H^{\otimes n}$$

## Following the register's state step by step

To illustrate the process, let's follow the mathematical transformations of the state of the register for a simple case in which we have only two qubits and the valid element is $\ket{01}.$

1. We start with the register in the state:
  $$|\text{register}=|00\rangle$$

1. After applying $H$ to each qubit the register's state transforms to:
  $$|\text{register}\rangle = \frac{1}{\sqrt{4}} \sum_{i \in \\{0,1\\}^2}|i\rangle=\frac12(\ket{00}+\ket{01}+\ket{10}+\ket{11})$$

1. Then we apply the phase oracle to get:
  $$|\text{register}\rangle = \frac12(\ket{00}-\ket{01}+\ket{10}+\ket{11})

1. Then $H$ acts on each qubit again to give:

  $$|\text{register}\rangle = \frac12(\ket{00}+\ket{01}-\ket{10}+\ket{11})

1. Now we apply the conditional phase shift on every state except $\ket{00}$:

  $$|\text{register}\rangle = \frac12(\ket{00}-\ket{01}+\ket{10}-\ket{11})

1. Now we end the first Grover iteration by applying $H$ again to get:

   $$|\text{register}\rangle = \ket{01}

   We found the valid item in a single iteration. As we will see later, this is because for N=4 and a single valid item, $N_\text{optimal}=1$.

## Geometrical explanation

To see why Grover's algorithm works let's study the algorithm from a geometrical perspective. Let be $\ket{bad}$ the superposition of all states that aren't a solution of the search problem. Supposing there are $M$ valid solutions, this is:

$$\ket{\text{bad}}=\frac{1}{\sqrt{N-M}}\sum_{x:f(x)=0}\ket{x}$$

Then, we define the state $\ket{good}$ as the superposition of all states that are a solution of the search problem:

$$\ket{\text{good}}=\frac{1}{\sqrt{M}}\sum_{x:f(x)=1}\ket{x}$$

Since *good* and *bad* are mutually exclusive sets because an item cannot be
valid and not valid, the states $\ket{good}$ and $\ket{bad}$ are orthogonal. Both states form the orthogonal basis of a plane in the ket space. We can use this plane to visualize the algorithm.

![](./media/plane-grovers.png)

Now, suppose $\ket{\psi}$ is an arbitrary state that lives in the plane spanned by $\ket{\text{good}}$ and $\ket{\text{bad}}$. This property is true for any state of the form:

$$\ket{\psi} = \alpha \ket{\text{good}} + \beta \ket{\text{bad}}$$

Now, let's introduce the reflection operator $R_{\ket{\psi}}$, where $\ket{\psi}$ is any qubit state. The operator is defined as:

$$R_{\ket{\psi}}=2\ket{\psi}\bra{\psi}-\mathcal{I}$$

It is called the reflection operator about $\ket{\psi}$ because it can be geometrically interpreted as reflection about the direction of $\ket{\psi}$. To see it, take the orthogonal basis of the plane formed by $\ket{\psi}$ and its orthogonal complement $\ket{\psi^{\perp}}$. Any state $\ket{\xi}$ of the plane can be decomposed in such basis:

$$\ket{\xi}=\mu \ket{\psi} + \nu {\ket{\psi^{\perp}}}$$

If we apply the operator $R_{\ket{\psi}}$ to $\ket{\xi}$ we get:

$$R_{\ket{\psi}}\ket{\xi}=\mu \ket{\psi} - \nu {\ket{\psi^{\perp}}}$$

The operator $R_\ket{\psi}$ inverts the component orthogonal to $\ket{\psi}$ but leaving the $\ket{\psi}$ component unchanged. Therefore $R_\ket{\psi}$ is a reflection about $\ket{\psi}$.

![](./media/reflection-operator.png)

In Grover's algorithm, after the first application of $H$ to every qubit, we start with an uniform superposition of all states. This can be written as:

$$\ket{\text{all}} = \sqrt{\frac{M}{N}}\ket{\text{good}} + \sqrt{\frac{N-M}{N}}\ket{\text{bad}}$$

![](./media/starting-state.png)

And therefore the state lives in the plane. Note that the probability of obtaining a correct result when measuring from the equal superposition is just $|\braket{\text{good}|{\text{all}}}|^2=M/N$, that is what we should expect from guessing at random.

The oracle $O_f$ adds a negative phase to any solution of the search problem. Therefore, it can be written as a reflection about the $\ket{\text{bad}}$ axis. This is:

$$O_f = R_{\ket{\text{bad}}} = 2\ket{\text{bad}}\bra{\text{bad}} - \mathcal{I}$$

Analogously, the conditional phase shift $O_0$ is just an inverted reflection about the state $\ket{0}$:

$$O_0 = R_{\ket{0}}=  -2\ket{0}\bra{0} + \mathcal{I}$$

Knowing this, it's easy to check that the Grover's diffusion operation $-H^{\otimes n} O_0 H^{\otimes n}$ is also a reflection about the state $\ket{all}$. Just do:

$$H^{\otimes n} O_0 H^{\otimes n}=2H^{\otimes n}\ket{0}\bra{0}H^{\otimes n}
-H^{\otimes n}\mathcal{I}H^{\otimes n} = 2\ket{\text{all}}\bra{\text{all}} - \mathcal{I} = R_{\ket{\text{all}}}$$

We just demonstrated that each iteration of the Grover's algorithm is a composition of two rotations $R_\ket{\text{bad}}$ and $R_\ket{\text{all}}$.

![](./media/grovers-iteration.png)

The resulting operation after each Grover's iteration is a counterclockwise
rotation of an angle $2\theta$. Fortunately, the angle $\theta$ is easy to find.
Since $\theta$ is just the angle between $\ket{\text{all}}$ and $\ket{\text{bad}}$ we can use
the scalar product to find the angle. We know that
$\cos{\theta}=\braket{\text{all}|\text{bad}}$, so we need to calculate $\braket{\text{all}|\text{bad}}$. From the decomposition of $\ket{\text{all}}$ in terms of $\ket{\text{bad}}$ and $\ket{\text{good}}$, we get that:

$$\theta = \arccos{\left(\braket{\text{all}|\text{bad}}\right)}= \arccos{\left(\sqrt{\frac{N-M}{N}}\right)} $$

The angle between the state of the register and the $\ket{\text{good}}$ state will decrease in each iteration, resulting in a higher probability of measuring a valid result. To calculate this probability we just need to calculate $|\braket{\text{good}|\text{register}}|^2$. The angle $\gamma (k)$ between $\ket{\text{good}}$ and $\ket{\text{register}}$ for each iteration $k$ is just 
$$\gamma (k) = \frac{\pi}{2}-\theta -k2\theta = \frac{\pi}{2} -(2k + 1)  \theta $$.

Therefore, the probability is just:

$P(\text{success}) = \cos^2(\gamma(k)) = \sin^2\left[(2k +1)\arccos \left( \sqrt{\frac{N-M}{N}}\right)\right]$

## Optimal number of iterations

If the probability of success as a function of the number of iterations. To find the optimal number of iterations $N_{\text{optimal}}$, we need to find the integer that maximizes it in the first cycle of the function.

![](./media/success-probability-grovers.png)

We know that $\sin^2{x}$ reaches it's first maximum for $\frac{pi}{2}$, so we just need to find the first integer for $\k$ that makes the argument to be $\frac{pi}{2}$. We make:

$$\frac{\pi}{2}=(2k_\text{optimal} + 1)\arccos \left( \sqrt{\frac{N-M}{N}}\right)\right)$$

So:

$$k_\text{optimal} = \frac{\pi}{4 \arcsin (\sqrt{\frac{N-M}{N}})}-\frac{1}{2} \$$ 

## Complexity analysis

## Limitations and oportunities