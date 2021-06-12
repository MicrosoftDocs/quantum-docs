---
author: george-moussa
description: Reference for azure.quantum.optimization.Problem
ms.author: georgenm
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Quantum optimization problem
uid: microsoft.quantum.optimization.problem
---

# Quantum optimization problem

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
- [optional] `init_config`: A dictionary of variable ids to value if user wants to specify an initial configuration for the problem.

```py
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0])
]

problem = Problem(name="My Difficult Problem", terms=terms)

# with initial configuration set
config = {'0': 1, '1': 1, '2': 0}
problem2 = Problem(name="Problem with Initial Configuration", terms=terms, init_config=config)
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


### Problem.evaluate

Once a problem has been defined, the user can evaluate the problem on any configuration they supply. The configuration should be supplied as a dictionary of variable ids to values. 

```py
problem = Problem("My Problem", [Term(c=1, indices=[0,1])])
problem.evaluate({0:1, 1:1}) 
> 1

problem.evaluate({0:1, 1:0})
> 0
```

### Problem.set_fixed_variables

During experimentation, the user may want to set a variable (or a group of variables) to a particular value. Calling set_fixed_variables will return a new Problem object representing the modified problem after such variables have been fixed.

```py
fixed_var = {'1': 1, '2': 1}
problem = Problem("My Problem", [Term(c=1, indices=[0,1]), Term(c=11, indices=[1,2]), Term(c=5, indices=[])])
new_problem = problem.set_fixed_variables(fixed_var)
new_problem.terms

> [{'c': 1, 'ids': [0]}, {'c': 16, 'ids': []}]
```

To piece back the fixed variables with the solution on the reduced problem:

```py
result = solver.optimize(new_problem)
result_config = json.loads(result)['solutions'][0]['configuration']
result_config.update(fixed_var) # join the fixed variables with the result
```

### Problem.get_terms

The user can get the terms in which a variable exists using this function.

```py
problem = Problem("My problem" ,  [Term(c=1, indices=[0,1]), Term(c=11, indices=[1,2]), Term(c=5, indices=[1])])
terms = problem.get_terms(id = 1)
terms

> [{'c': 11, 'ids': [1,2]}, {'c': 5, 'ids': [1]}]
```

## StreamingProblem

The StreamingProblem class can handle large problems that exceeds local memory limits. Unlike with the Problem class, terms in the StreamingProblem are uploaded directly to blob and are not kept in memory.

The StreamingProblem class uses the same interface as the Problem class. See [StreamingProblem](xref:microsoft.quantum.optimization.streaming-problem) usage documentation. 

There are some features that are not yet supported on the StreamingProblem class due to its streaming nature:

- Problem.set_fixed_variables()
- Problem.evaluate()

## OnlineProblem

The OnlineProblem class creates a problem from the url of the blob storage where an optimization problem has been uploaded. It is essentially used to reuse already submitted problems.
It does not support client side analysis, e.g. the `evaluate` and `set_fixed_variables` functions. It allows you to download the problem from the blob storage as an instance of the Problem class to do any of the client side operations.
For an example of how to use the OnlineProblem class, have a look at [reusing problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions).
