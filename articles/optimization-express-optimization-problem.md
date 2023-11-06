---
author: bradben
description: This document provides a basic guide to express an optimization problem that could be later used with a solver in Azure Quantum.
ms.author: brbenefield
ms.date: 05/01/2023
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Express an optimization problem
uid: microsoft.quantum.optimization.express-problem
---

# Express an optimization problem

[!INCLUDE [QIO deprecation warning](includes/qio-deprecate-warning.md)]

To express a problem to be solved, create an instance of a `Problem` and set the `problem_type`
to one of `ProblemType.ising`, `ProblemType.pubo`, or their grouped analogues,
see [`ProblemType`](xref:microsoft.quantum.optimization.problem-type).

```py
from azure.quantum.optimization import Problem, ProblemType, Term

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

> [!NOTE]
> As described in the following section, there are multiple ways to supply terms to the problem.

## Ways to supply problem terms

There are three ways to supply terms for a [`Problem`](xref:microsoft.quantum.optimization.problem): in the
constructor, individually, or as a list of `Term` objects.

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

Grouped term objects can be included in the terms list just like monomial terms.

```py
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0]),
    SlcTerm(
        terms=[
            Term(c=1, indices=[0]),
            Term(c=-1, indices=[1]),
        ],
        c=2
    )
]
problem = Problem(name="My Other Problem", terms=terms, problem_type=ProblemType.ising)

```

### Individually

You can supply each `Term` object individually by calling the `add_term` method on the `Problem`.

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
