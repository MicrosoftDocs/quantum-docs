---
author: george-moussa
description: Reference for azure.quantum.optimization.Problem
ms.author: georgenm
ms.date: 07/26/2021
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
- `terms` (optional): A list of `Term` objects and grouped term objects, where supported, to add to the problem.
- `problem_type`(optional): The type of problem. Must be one of
  `ProblemType.ising`, `ProblemType.pubo`, `ProblemType.ising_grouped`, or
  `ProblemType.pubo_grouped`. The default is `ProblemType.ising`.
- `init_config`(optional): A dictionary of variable IDs to value if user wants to specify an initial configuration for the problem.

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

Adds a single monomial term to the problem. It takes a coefficient for the term and the indices
of variables that appear in the term.

```py
coefficient = 0.13
problem.add_term(c=coefficient, indices=[2,0])
```

### Problem.add_slc_term

Adds a single squared linear combination (SLC) term to
the problem. It accepts a list of composite terms and a
lead coefficient. The list of terms may be given as either
a list of `Term` objects or as a list of tuples, with each
tuple containing a monomial term coefficient followed by the
variable index for the monomial (or `None` if a constant). For more information, see [SlcTerm](xref:microsoft.quantum.optimization.slc-term).

```py
subterms_Term = [
    Term(c=1, indices=[0]),
    Term(c=-2, indices=[1]),
    Term(c=1, indices=[2]),
    Term(c=-1, indices=[])
]
subterms_tuple = [
    (1, 0),
    (-2, 1),
    (1, 2),
    (-1, None)
]
coefficient = 2
problem.add_slc_term(terms=subterms_Term, c=coefficient)
problem.add_slc_term(terms=subterms_tuple, c=coefficient)
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

This function also has an overload that serves as a wrapper for grouped terms as shown in the following example.
The overload can be used by specifying a list of `Term` objects along with the grouped term type.

```py
problem.add_terms([
        Term(c=1, indices=[0]),
        Term(c=-2, indices=[1]),
        Term(c=1, indices=[2]),
        Term(c=-1, indices=[])
    ],
    term_type = GroupType.squared_linear_combination,
    c = 2
)
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

Once a problem is explicitly uploaded, it won't be uploaded automatically 
during submission unless its terms change.


### Problem.evaluate

Once a problem has been defined, you can evaluate the problem on any configuration they supply. The configuration should be supplied as a dictionary of variable IDs to values. 

```py
problem = Problem("My Problem", [Term(c=1, indices=[0,1])])
problem.evaluate({0:1, 1:1}) 
> 1

problem.evaluate({0:1, 1:0})
> 0
```

### Problem.set_fixed_variables

During experimentation, you may want to set a variable (or a group of variables) to a particular value. Calling set_fixed_variables will return a new Problem object representing the modified problem after the selected variables have been fixed.

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

You can get the terms in which a variable exists using this function.

```py
problem = Problem("My problem" ,  [Term(c=1, indices=[0,1]), Term(c=11, indices=[1,2]), Term(c=5, indices=[1])])
terms = problem.get_terms(id = 1)
terms

> [{'c': 11, 'ids': [1,2]}, {'c': 5, 'ids': [1]}]
```

## StreamingProblem

The StreamingProblem class can handle large problems that exceed local memory limits. Unlike with the Problem class, terms in the StreamingProblem are uploaded directly to blob and are not kept in memory.

The StreamingProblem class uses the same interface as the Problem class. See [StreamingProblem](xref:microsoft.quantum.optimization.streaming-problem) usage documentation. 
There are some features that are not yet supported on the StreamingProblem class because of its streaming nature:

- Problem.set_fixed_variables()
- Problem.evaluate()

## OnlineProblem

The OnlineProblem class creates a problem from the url of the blob storage where an optimization problem has been uploaded. It allows you to reuse already submitted problems.
It does not support client-side analysis, for example, the `evaluate` and `set_fixed_variables` functions. It allows you to download the problem from the blob storage as an instance of the `Problem` class to do any of the client-side operations.
For an example of how to use the `OnlineProblem` class, have a look at [reusing problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions).
