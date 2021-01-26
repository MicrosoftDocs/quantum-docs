---
title: Express an optimization problem
description: This document provides a basic guide to express an optimization problem that could be later used with a solver in Azure Quantum.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: azure.quantum.usage.express-problem.python
---

# Express an optimization problem

To express a simple problem to be solved, create an instance of a `Problem` and set the `problem_type` to either `ProblemType.ising` or
`ProblemType.pubo`. For more information, see [`ProblemType`](xref:microsoft.azure.quantum.reference.problemtype.python).

```py
from azure.quantum.optimization import Problem, ProblemType, Term, ParallelTempering

problem = Problem(name="My First Problem", problem_type=ProblemType.ising)
```

Next, create an array of terms and add them to the `problem`:

```py
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0]),
    Term(c=9, indices=[2,1]),
    Term(c=2, indices=[3,0]),
    Term(c=-4, indices=[3,1]),
    Term(c=4, indices=[3,2])
]

problem.add_terms(terms=terms)
```

>![NOTE]
> As descrbed below, there are multiple ways to supply terms to the problem.

## Ways to supply problem terms

There are three ways to supply terms for a [`Problem`](xref:microsoft.azure.quantum.reference.problem.python): in the
constructor, individually, and as a list of `Term` objects.

### In the constructor

You can supply an array of `Term` objects in the constructor of a `Problem`.

```py
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0])
]

problem = Problem(name="My Difficult Problem", terms=terms)
```

### Individually

You can supply each term individually by calling the `add_term` method on the `Problem`.

```py
problem = Problem(name="My Difficult Problem", problem_type=ProblemType.ising)
problem.add_term(c=-9, indices=[0])
problem.add_term(c=-3, indices=[1,0])
problem.add_term(c=5, indices=[2,0])
```

### Add a list of terms

You can also supply a list of `Term` objects using the `add-terms` method on the `Problem`.

```py
problem = Problem(name="My Difficult Problem")
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0]),
    Term(c=9, indices=[2,1]),
    Term(c=2, indices=[3,0]),
    Term(c=-4, indices=[3,1]),
    Term(c=4, indices=[3,2])
]

problem.add_terms(terms=terms)
```