---
title: Key concepts
description: Learn some key optimization concepts
author: frtibble
ms.author: frtibble
ms.date: 08/18/2020
ms.topic: article
uid: azure.quantum.overview.key-concepts
---

# Key Concepts

To understand optimization problems, you first need to learn some some key terms and concepts.

## Cost function
A **cost function** is a mathematical description of a problem which, when evaluated, tells you the value of that solution. Typically in optimization problems, we are looking to find the lowest value solution to a problem. In other words, we are trying to minimize the cost.

## Search space
The **search space** contains all the feasible solutions to an optimization problem. Each point in this search space is a valid solution to the problem but it may not necessarily be the lowest point, which corresponds to the lowest cost solution.

## Optimization landscape
Together, the search space and the cost function are often referred to as an **optimization landscape**. In the case of a problem that involves two continuous variables, the analogy to a landscape is quite direct.

Let's explore a few different optimization landscapes and see which are good candidates for the Azure Quantum Optimization service.

### A smooth, convex landscape

Consider the following plot of a cost function that looks like a single smooth valley:

![An optimization landscape showing a smooth valley](./media/key-concepts/plot_simple.png)

This kind of problem is easily solved with techniques such as gradient descent, where you begin from an initial starting point and greedily move to any solution with a lower cost. After a few moves, the solution converges to the *global minimum*. The global minimum is the lowest point in the optimization landscape. Azure Quantum optimization solvers offer no advantages over other techniques with these straightforward problems.

### A structured, rugged landscape
Azure Quantum works best with problems where the landscape is rugged, with many hills and valleys. Here's an example that considers two continuous variables.

![An optimization landscape showing many hills and valleys](./media/key-concepts/plot_rugged.png)

In this scenario, one of the greatest challenges is to avoid getting stuck at any of the sub-optimal *local minima*. A rugged landscape can have multiple valleys. Each of these valleys will have a lowest point, which is the local minimum. One of these points will be the lowest overall, and that point is the global minimum. These rugged landscapes present situations where Azure Quantum optimization solvers can outperform other techniques.

### A scattered, random landscape

So far we have discussed smooth and rugged cost functions, but what if there is no structure at all? The following diagram shows such a landscape:

![An optimization landscape showing scattered points with no pattern](./media/key-concepts/plot_random.png)

In these cases, where the solutions are completely random, then no algorithm can improve on a brute force search.

## Defining a cost function
As mentioned above, the cost function represents the quantity that you want to minimize. Its main purpose is to map each configuration of a problem to a single number. This allows the optimizer to easily compare potential solutions and determine which is better. The key to generating a cost function for your problem is in recognizing what parameters of your system affect the chosen cost.

In principle, the cost function could be any mathematical function $f = f(x_0, x_1, \dots)$, where the function variables $x_1, x_2, \dots$ encode the different configurations. The smooth landscape shown above could for example be generated using a quadratic function of two continuous variables $f(x, y) = x^2 + y^2$. However, certain optimization methods may expect the cost function to be in a particular form. For instance, the Azure Quantum solvers expect a Binary Optimization Problem. For this problem type, configurations must be expressed via binary variables with $x_i \in {0, 1}$, and many problems are naturally suited to be expressed in this form.

### Variables
Let's take a look at how to define the cost function for a simple problem.
Firstly, we have a number of variables. We can name these variables *x*, and if we have *i* variables, then we can index them individually as follows:

$$
x_{i}
$$

For example, if we had 5 variables, we could index like so:

$$
x_{0}, x_{1}, x_{2}, x_{3}, x_{4}
$$

These variables can take specific values, and in the case of a binary optimization problem they can only take two. In particular, if your problem is considering these variables as spins, as in the Ising model, then the values of the variables can be either +1 or -1.

For example:

$$
x_{0} = 1, x_{1} = 1, x_{2} = -1, x_{3} = -1, x_{4} = 1
$$

In other cases, the variables can simply be assigned 1 or 0, as in the Quadratic Unconstrained Binary Optimization (QUBO) or Polynomial Unconstrained Binary Optimization (PUBO) model.

For example:

$$
x_{0} = 1, x_{1} = 1, x_{2} = 0, x_{3} = 0, x_{4} = 1
$$

> [!NOTE]
> More information about cost functions and binary optimization models such as Ising and PUBO can be found [here](xref:microsoft.azure.quantum.how-to-guides.optimization.concepts.problem-formulation.cost-functions).

### Weights

Let us consider some variables. Each of these variables has an associated **weight**, which determines their influence on the overall cost function.

We can write these weights as *w*, and again, if we have *i* variables, then the associated weight for those individual variables can be indexed like this

$$
w_{i}
$$

If we had 5 weights, we could index them like this:

$$
w_{0}, w_{1}, w_{2}, w_{3}, w_{4}
$$

A **weight** can be any real-valued number. For example, we may give these weights the following values:

$$
w_{0} = 50, w_{1} = -2, w_{2} = 7, w_{3} = 24, w_{4} = -10
$$

### Terms
Terms are the combination of weights and variables, they look like this:

$$
w_{i}x_{i}
$$

As an example, let's consider a term with index 0, a weight of 50, and a variable assignment of 1:

$$
w_{0}x_{0} = 50(1) = 50
$$

This was an example of evaluating the cost of a term.

### Cost function formulation

Returning to our definition of a cost function, it is a mathematical description of a problem which, when evaluated, tells you the value of that solution.

So to write a cost function, we write a sum of terms. That is, the sum of these weights and variables.

That looks like this:

$$
\Large\sum_{i}w_{i}x_{i}
$$

With 5 variables, this would be expanded to:

$$
w_{0}x_{0} + w_{1}x_{1} + w_{2}x_{2} + w_{3}x_{3} + w_{4}x_{4}
$$

## Degree and "k-local"

The cost functions you will be working with will be **polynomial** functions of varying **degree**. The variables themselves will be binary ($x_i \in \\{\pm1\\}$ for Ising and $x_i \in \\{0, 1\\}$ for QUBO/PUBO problems), which makes these binary optimization problems.

In some cases, the cost function will be linear. This means that the highest power any of the terms is raised to is 1. $x + y + 1$ is an example of a linear function. Linear terms are said to have a **degree** of 1.

In other cases, you may have a **quadratic** cost function. In this case, the highest power any of the terms is raised to is 2. $x^2 + y^2 + x + 1$ is an example of a quadratic function. These function therefore has a degree of 2 (you may see these referred to as **Quadratic Unconstrained Binary Optimization (QUBO)** problems).

When a cost function has terms raised to higher powers than 2, we refer to them as **Polynomial Unconstrained Binary Optimization (PUBO)** or **Higher Order Binary Optimization (HOBO)** problems. These cost functions have degrees higher than 2. $x^3 + xy + x^2 + y^2 + x + 1$ is an example of a higher order polynomial function.

In general, we often talk about the maximum degree, *k*, and describe them as **k-local problems**. For instance, we might also refer to a QUBO as a 2-local problem. You can reduce a higher order polynomial function into a lower order one by introducing further variables, which will increase the problem size. This process is known as **degree reduction**.

In Azure Quantum, we use the term PUBO to describe problems with a maximum degree of *k*. This includes QUBO problems, as QUBOs are just PUBOs with degree 2.

## Heuristic

A **heuristic** is a technique for finding an approximate solution, when finding the exact solution may take too long. When we think about this in terms of our optimization landscape above, it may take a very long time to find the lowest cost solution, however we may be able to find a solution that is close to optimal in a reasonable amount of time. This often comes with experimentation: trying different techniques with different parameters and run times to find what gives good results.

## Walker

We can imagine a person or a particle in our **search space**, and each step taken creates a path, or walk, through the optimization landscape. Often, this will be referred to as a **walker**. Walkers can be used in a variety of ways, for example you may choose to have many walkers starting from the same starting point, or have them starting from different locations, and so on.
