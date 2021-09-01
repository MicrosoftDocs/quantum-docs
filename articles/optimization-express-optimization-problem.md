---
author: KittyYeungQ
description: This document provides a basic guide to express an optimization problem that could be later used with a solver in Azure Quantum.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Express an optimization problem
uid: microsoft.quantum.optimization.express-problem
---

# Express an optimization problem

To express a problem to be solved, create an instance of a `Problem` and set the `problem_type`
to one of `ProblemType.ising`, `ProblemType.pubo`, or their grouped analogues,
see [`ProblemType`](xref:microsoft.quantum.optimization.problem-type).

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

> [!NOTE]
> As described below, there are multiple ways to supply terms to the problem.

## Ways to supply problem terms

There are three ways to supply terms for a [`Problem`](xref:microsoft.quantum.optimization.problem): in the
constructor, individually, and as a list of `Term` objects or - where supported - grouped term (for example: `SlcTerm`) objects.

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

> [!NOTE]
> Only a subset of optimization solvers currently support grouped terms.
> Refer to the [`SlcTerm`](xref:microsoft.quantum.optimization.slc-term) documentation for details.

If grouped terms are included in the terms list, the problem type should reflect the grouped
nature via either `ProblemType.ising_grouped` or `ProblemType.pubo_grouped`.
When grouped terms are added to a problem, the problem type will automatically be converted to the
appropriate grouped version as needed.

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
problem = Problem(name="My Other Problem", terms=terms, problem_type=ProblemType.ising_grouped)
```

### Individually

You can supply each `Term` object individually by calling the `add_term` method on the `Problem`.

```py
problem = Problem(name="My Difficult Problem", problem_type=ProblemType.ising)
problem.add_term(c=-9, indices=[0])
problem.add_term(c=-3, indices=[1,0])
problem.add_term(c=5, indices=[2,0])
```

You can supply each grouped term individually by calling the particular method on the `Problem`
according to the particular grouped term type, or through an overloaded `add_terms` method.
When grouped terms are added to a problem, the problem type will automatically be converted to the
appropriate grouped version as needed.

Currently, squared linear combinations are the only enabled grouped terms and may be added via
`add_slc_term`.

```python
problem = Problem(name="My Other Difficult Problem", problem_type=ProblemType.ising)
subterms = [
    Term(c=1, indices=[0]),
    Term(c=-2, indices=[1]),
    Term(c=1, indices=[2]),
    Term(c=-1, indices=[])
]
problem.add_slc_term(terms=subterms, c=2)
problem.add_slc_term(
    terms=[(1,0), (-2,1), (1,2), (-1,None)],
    c=2
)
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
