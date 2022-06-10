---
author: bradben
description: This document provides a basic guide to express an optimization problem that could be later used with a solver in Azure Quantum.
ms.author: brbenefield
ms.date: 10/25/2021
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
> As described in the following section, there are multiple ways to supply terms to the problem.

## Ways to supply problem terms

There are three ways to supply terms for a [`Problem`](xref:microsoft.quantum.optimization.problem): in the
constructor, individually, or as a list of `Term` objects (or, where supported, grouped term objects, for example: [`SlcTerm`](xref:microsoft.quantum.optimization.slc-term)).

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
problem = Problem(name="My Other Problem", terms=terms, problem_type=ProblemType.ising_grouped)

```
> [!NOTE]
> Only a subset of optimization solvers currently support grouped terms.
> Refer to the [`SlcTerm`](xref:microsoft.quantum.optimization.slc-term) documentation for details.

### Individually

You can supply each `Term` object individually by calling the `add_term` method on the `Problem`.

```py
problem = Problem(name="My Difficult Problem", problem_type=ProblemType.ising)
problem.add_term(c=-9, indices=[0])
problem.add_term(c=-3, indices=[1,0])
problem.add_term(c=5, indices=[2,0])
```

You can also supply grouped term objects individually by calling the particular method on the `Problem`
according to the particular grouped term type, or through an overloaded `add_terms` method.

Currently, squared linear combinations are the only enabled grouped terms and may be added via
`add_slc_term`. For more information, see [Problem.add_slc_term](xref:microsoft.quantum.optimization.problem#problemadd_slc_term) and [SlcTerm](xref:microsoft.quantum.optimization.slc-term).

```python
problem = Problem(name="My Other Difficult Problem", problem_type=ProblemType.ising)
subterms = [
    Term(c=1, indices=[0]),
    Term(c=-2, indices=[1]),
    Term(c=1, indices=[2]),
    Term(c=-1, indices=[])
]
problem.add_slc_term(terms=subterms, c=2)
```

An alternate way to supply squared linear combination (slc) grouped terms is to supply them as a list of pairs where the first entry is the coefficient, and second is the variable id. Constants are supplied as (c, None).

```python
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

## Combining term types
It is possible to use both `Term` and `SlcTerm` objects within the same `Problem`.

```python
from azure.quantum.optimization import Problem, Term, SlcTerm

# create a problem object
problem = Problem(name="My Example Problem")
```

From here, you can use the methods described in [Ways to supply problem terms](#ways-to-supply-problem-terms) to add `Term` and `SlcTerm` objects. If grouped terms are included in the cost function, the SDK will automatically adjust the problem type. For example, you would not need to update the problem type from `ProblemType.pubo` to `ProblemType.pubo_grouped`, as this will be done for you.

```python
# add regular terms to the problem
problem.add_terms([
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0])
])

# add a grouped term to the problem
subterms = [
    Term(c=1, indices=[0]),
    Term(c=-2, indices=[1]),
    Term(c=1, indices=[2]),
    Term(c=-1, indices=[])
]
problem.add_slc_term(terms=subterms, c=2)
```

You will be able to see the combination of these term types in the cost function using `to_json()`.

```python
# convert to json to show "terms" and "terms_slc" array in cost function
problem.to_json()
```

```output
> '{"metadata": {"name": "My Example Problem"}, "cost_function": {"version": "1.0", "type": "ising_grouped", "terms": [{"c": -9, "ids": [0]}, {"c": -3, "ids": [1, 0]}, {"c": 5, "ids": [2, 0]}], "terms_slc": [{"c": 2, "terms": [{"c": 1, "ids": [0]}, {"c": -2, "ids": [1]}, {"c": 1, "ids": [2]}, {"c": -1, "ids": []}]}]}}'
```

## Next steps

Now that you've created an optimization problem, learn how to solve it by [applying a solver](xref:microsoft.quantum.optimization.apply-solver). 
