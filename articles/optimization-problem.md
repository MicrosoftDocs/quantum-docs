---
title: Quantum Optimization Problem
description: Reference for azure.quantum.optimization.Problem
author: george-moussa
ms.author: georgenm
ms.date: 1/8/2021
ms.topic: article
uid: microsoft.quantum.optimization.problem
---

# Quantum Optimization Problem

## Problem

```py
from azure.quantum.optimization import Problem
```

### Constructor

To create a `Problem` object, you specify the following information:

- `name`: A friendly name for your problem. No uniqueness constraints.
- [optional] `terms`: A list of `Term` objects to add to the problem.
- [optional] `problem_type`: The type of problem. Must be either
  `ProblemType.ising` or `ProblemType.pubo`. Default is `ProblemType.ising`.

```py
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0])
]

problem = Problem(name="My Difficult Problem", terms=terms)
```

### Problem.add_term

Adds a single term to the problem. It takes a coefficient for the term and the indices
of variables that appear in the term.

```py
coefficient = 0.13
problem.add_term(c=coefficient, indices=[2,0])
```

### Problem.add_terms

Adds multiple terms to the problem using a list of `Terms`.

```py
problem.add_terms([
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0]),
    Term(c=9, indices=[2,1]),
    Term(c=2, indices=[3,0]),
    Term(c=-4, indices=[3,1]),
    Term(c=4, indices=[3,2])
])
```

### Problem.serialize

Serializes a problem to a json string.

```py
problem = Problem("My Problem", [Term(c=1, indices=[0,1])])
problem.serialize()

> {"cost_function": {"version": "1.0", "type": "ising", "terms": [{"c": 1, "ids": [0, 1]}]}}
```

### Problem.upload

Problem data can be explicitly uploaded to an Azure storage account using its
`upload` method that receives as a parameter the `Workspace` instance:

```py
problem.upload(workspace=workspace)
```

Once a problem is explicitly uploaded, it will not be automatically uploaded
during submission unless its terms change.
