---
description: Learn about the key concepts of optimization, including cost functions, search spaces, and landscapes. 
author: frtibble
ms.author: frtibble
ms.date: 07/26/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: conceptual
title: Key concepts for optimization
uid: microsoft.quantum.optimization.concepts.overview.key-concepts
---

# Key concepts for optimization

To understand optimization problems, you first need to learn some basic terms and concepts.

## Cost function

The *cost function* is the way that the cost varies as a function of the system configuration. It is a mathematical function to be minimized. 

## Search space 

The *search space* contains all the feasible solutions to an optimization problem. Each point in this search space is a valid solution to the problem. The lowest point, which corresponds to the lowest cost solution, is called the *global minimum*.

## Optimization landscapes

Together, the search space and the cost function are often referred to as an optimization landscape. In the case of a problem that involves two continuous variables, the analogy to a landscape is quite direct.

Let's explore a few different optimization landscapes and see which are good candidates for Azure Quantum optimization.

### Smooth landscape

Consider the following plot of a cost function of two continuous variables, which looks like a single, smooth valley:

![Smooth landspace](./media/smooth-landscape.png)

This kind of problem is easily solved with techniques such as gradient descent, where you begin from an initial starting point and greedily move to any solution with a lower cost. After a few moves, the solution converges to the global minimum, the lowest point in the optimization landscape. Azure Quantum optimization solvers offer no advantages over other techniques with these straightforward problems.

## Structured landscape

Consider the following plot of a cost function of two continuous variables where the landscape is rugged, with many hills and valleys:

![Structured landspace](./media/structured-landscape.png)

In this scenario, one of the greatest challenges is to avoid getting stuck at any of the sub-optimal local minima. A rugged landscape can have multiple valleys. Each of these valleys has a lowest point, which is called a *local minimum*. One of these points will be the lowest of them all, and that point is the global minimum.

Such rugged landscapes present situations where quantum-inspired optimization can outperform other techniques.

### Scattered landscape

The following plot corresponds to a random, unstructured landscape: 

![Scattered landspace](./media/scattered-landscape.png)

In these cases, where the solutions are completely random, there is no optimization algorithm that can improve on a brute force search.

## Problem configuration

Usually, an optimization problem involves a lot of variables that can interact in many ways to influence the final cost. A particular arrangement of the variables is called the *configuration* of the problem.

Because there are so many possible configurations to choose from, it is sometimes difficult to identify the best solution, particularly when the problem space is very large. It can be easy to get stuck in a local optimum. Some examples of local optima are shown on the following graph, along with the global optimum - the lowest cost configuration our system can adopt.

The goal of the optimization is to find the minimum point on the cost function (or as close to the minimum point as possible, given a reasonable amount of time).

Consider the following example of traffic minimization. The aim of this optimization task is to reduce congestion in a road system, thereby reducing the amount of time drivers and passengers spend waiting in traffic.

Each configuration represents a different combination of routes assigned to the vehicles in the system. The cost to minimize is the overall traffic level (or congestion level).

![Graph showing a cost function with local optima corresponding to different traffic levels in a vehicle routing simulation](./media/optimization-intro-traffic-optima.png)

This graph highlights some examples of different system configurations, each of which has a different cost value. The costs are visualized here cost using color: the redder the road segment, the higher the traffic level and, therefore, the greater the cost. Conversely, greener road segments have fewer vehicles simultaneously occupying them and, therefore, lower traffic and cost values.

## Defining a cost function

As previously mentioned, the cost function represents the quantity that you want to minimize. Its main purpose is to map each configuration of a problem to a single number. This allows the optimizer to easily compare potential solutions and determine which is better. The key to generating a cost function for your problem is in recognizing what parameters of your system affect the chosen cost.

In principle, the cost function could be any mathematical function $f = f(x_0, x_1, \dots)$, where the function variables $x_1, x_2, \dots$ encode the different configurations. The smooth landscape shown above could for example be generated using a quadratic function of two continuous variables $f(x, y) = x^2 + y^2$. However, certain optimization methods may expect the cost function to be in a particular form. For instance, the Azure Quantum solvers expect a [Binary Optimization](xref:microsoft.quantum.optimization.concepts.binary-optimization) Problem. For this problem type, configurations must be expressed via binary variables with $x_i \in {0, 1}$, and many problems are naturally suited to be expressed in this form.

### Variables

Let's take a look at how to define the cost function for a simple problem.
Firstly, we have a number of variables. We can name these variables *x*, and if we have *i* variables, then we can index them individually as follows:

$$
x_{i}
$$

For example, if we had five variables, we could index them like so:

$$
x_{0}, x_{1}, x_{2}, x_{3}, x_{4}
$$

These variables can take specific values. In the case of a binary optimization problem they can only take two. In particular, if your problem is considering these variables as spins, as in the [Ising model](xref:microsoft.quantum.optimization.concepts.ising-model), then the values of the variables can be either +1 or -1.

For example:

$$
x_{0} = 1, x_{1} = 1, x_{2} = -1, x_{3} = -1, x_{4} = 1
$$

In other cases, the variables can simply be assigned 1 or 0, as in the [Quadratic Unconstrained Binary Optimization (QUBO)](xref:microsoft.quantum.optimization.concepts.binary-optimization#quadratic-unconstrained-binary-optimization-qubo) or [Polynomial Unconstrained Binary Optimization (PUBO)](xref:microsoft.quantum.optimization.concepts.binary-optimization#polynomial-unconstrained-binary-optimization-pubo) model.

For example:

$$
x_{0} = 1, x_{1} = 1, x_{2} = 0, x_{3} = 0, x_{4} = 1
$$

> [!NOTE]
> More information about cost functions and binary optimization models such as Ising and PUBO can be found in the article [Cost functions](xref:microsoft.quantum.optimization.concepts.cost-function).

### Weights

Let us consider some variables. Each of these variables has an associated *weight*, which determines their influence on the overall cost function.

We can write these weights as *w*, and again, if we have *i* variables, then the associated weight for those individual variables can be indexed like this

$$
w_{i}
$$

If we had five weights, we could index them like this:

$$
w_{0}, w_{1}, w_{2}, w_{3}, w_{4}
$$

A *weight* can be any real-valued number. For example, we may give these weights the following values:

$$
w_{0} = 50, w_{1} = -2, w_{2} = 7, w_{3} = 24, w_{4} = -10
$$

### Terms

Terms are the combination of weights and variables, and look like this:

$$
w_{i}x_{i}
$$

As an example of evaluating the cost of a term, let's consider a term with index 0, a weight of 50, and a variable assignment of 1:

$$
w_{0}x_{0} = 50(1) = 50
$$

### Cost function formulation

Returning to our definition of a cost function, it is a mathematical description of a problem that, when evaluated, tells you the value of that solution.

To write a cost function, we write a sum of terms, that is, the sum of these weights and variables.

$$
\Large\sum_{i}w_{i}x_{i}
$$

With five variables, this would be expanded to:

$$
w_{0}x_{0} + w_{1}x_{1} + w_{2}x_{2} + w_{3}x_{3} + w_{4}x_{4}
$$

## Degree and "k-local"

The cost functions you will be working with will be *polynomial* functions of varying *degree*. The variables themselves will be binary ($x_i \in \\{\pm1\\}$ for Ising and $x_i \in \\{0, 1\\}$ for QUBO/PUBO problems), which makes these binary optimization problems.

In some cases, the cost function will be linear. This means that the highest power any of the terms is raised to is *1*. $x + y + 1$ is an example of a linear function. Linear terms are said to have a *degree* of *1*.

In other cases, you may have a *quadratic* cost function. In this case, the highest power any of the terms is raised to is *2*. For example, $x^2 + y^2 + x + 1$ is a quadratic function and has a degree of *2* You may also see quadratic functions referred to as *Quadratic Unconstrained Binary Optimization (QUBO)* problems.

When a cost function has terms raised to higher powers than *2*, we refer to them as *Polynomial Unconstrained Binary Optimization (PUBO)* or *Higher Order Binary Optimization (HOBO)* problems. These cost functions have degrees higher than *2*. $x^3 + xy + x^2 + y^2 + x + 1$ is an example of a higher order polynomial function.

In general, we often talk about the maximum degree, *k*, and describe them as *k-local problems*. For instance, we might also refer to a QUBO as a 2-local problem. You can reduce a higher order polynomial function into a lower order one by introducing further variables, which will increase the problem size. This process is known as *degree reduction*.

In Azure Quantum, we use the term *PUBO* to describe problems with a maximum degree of *k*. This includes QUBO problems, as QUBOs are just PUBOs with degree *2*.

## Heuristic

A *heuristic* is a technique for finding an approximate solution, when finding the exact solution may take too long. When we think about this in terms of our optimization landscape above, it may take a very long time to find the lowest cost solution, however we may be able to find a solution that is close to optimal in a reasonable amount of time. Heuristics often come with experimentation: trying different techniques with different parameters and run times to find what gives good results.

## Walker

We can imagine a person or a particle in our *search space*, and each step taken creates a path, or walk, through the optimization landscape. Often, this will be referred to as a *walker*. Walkers can be used in various ways: for example, you may choose to have many walkers begin from the same starting point, or have them begin from different locations, and so on.

## Convert your problem to an Ising or QUBO model

Professor Andrew Lucas' paper [Ising formulations of many NP problems](https://arxiv.org/abs/1302.5843) is a good summary of how to convert a *nondeterministic polynomial time (NP)* problem to a [quantum-inspired optimization](xref:microsoft.quantum.optimization.overview.what-is-qio) QUBO or Ising model. You can download the paper from the link provided.
After converting your field problem into the Ising or QUBO model, it is recommended to merge terms with the same variable list into a single term. For example:

$$
w_{0}x_{0}x_{1}, w_{1}x_{1}x_{0}
$$

can be merged into

$$
(w_{0} + w_{1})x_{0}x_{1}
$$

Expressed in terms of code:

```py
term1 = Term(c=2, indices=[0,1])
term2 = Term(c=3, indices=[1,0])
```

can be merged into

```py
merged_term = Term(c=5, indices=[0,1])
```

where the Python SDK is used to [express the terms of an optimization problem](/azure/quantum/optimization-express-optimization-problem).

Merging terms may significantly improve the performance of QIO, if your problem has many such terms. You can either use a hash map or sort algorithm to do the merging.
