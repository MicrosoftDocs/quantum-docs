---
author: george-moussa
description: Reference for azure.quantum.optimization.Problem
ms.author: georgenm
ms.date: 11/26/2021
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
  `ProblemType.pubo_grouped`. The default is `ProblemType.ising`. A grouped problem type is picked automatically if grouped terms are used in the problem formulation.
- `init_config`(optional): A dictionary of variable IDs to value if user wants to specify an initial configuration for the problem.
- `content_type`(optional): The default is `ContentType.json`. Can be set to `ContentType.protobuf`.

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
the problem. It accepts a list of monomial terms that make up the squared linear combination term and a
lead coefficient. 

```py
subterms_Term = [
    Term(c=1, indices=[0]),
    Term(c=-2, indices=[1]),
    Term(c=1, indices=[2]),
    Term(c=-1, indices=[])
]
coefficient = 2
problem.add_slc_term(terms=subterms_Term, c=coefficient)
```
In addition to using a list of `Term` objects, a list of tuples, with each
tuple containing a monomial term coefficient followed by the
variable index for the monomial (or `None` if a constant) can be used instead. 

```py
subterms_tuple = [
    (1, 0),
    (-2, 1),
    (1, 2),
    (-1, None)
]
coefficient = 2
problem.add_slc_term(terms=subterms_tuple, c=coefficient)
```

For more information, see [SlcTerm](xref:microsoft.quantum.optimization.slc-term).

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

Serializes a problem to a JSON string or Protobuf. 
For more information about the usage of Protobuf, see [Handling large input with Protobuf](#handling-large-input-with-protobuf).

```py
problem = Problem("My Problem", [Term(c=1, indices=[0,1])])
problem.serialize()

> {"cost_function": {"version": "1.0", "type": "ising", "terms": [{"c": 1, "ids": [0, 1]}]}}
```

To serialize to Protobuf you need to specify the optional `content_type` parameter. 
Protobuf is supported on a [subset of optimization solvers](#protobuf-availability).

```py
from azure.quantum.job.base_job import ContentType

problem = Problem(name = "protobuf_problem", terms = [Term(c=1, indices=[0,1])], content_type=ContentType.protobuf)
problem.serialize()
```

### Problem.deserialize

Deserilaizes a problem from the uploaded input data to an instance of Problem. 

```py

deserialized_problem = Problem.deserialize(input_poblem = "your_problem")
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

The StreamingProblem class uses the same interface as the Problem class. For details, see the [StreamingProblem](xref:microsoft.quantum.optimization.streaming-problem) documentation. 
There are some features that are not yet supported on the StreamingProblem class because of its streaming nature:

- Problem.set_fixed_variables()
- Problem.evaluate()

## OnlineProblem

The OnlineProblem class creates a problem from the url of the blob storage where an optimization problem has been uploaded. It allows you to reuse already submitted problems.
It does not support client-side analysis, for example, the `evaluate` and `set_fixed_variables` functions. It allows you to download the problem from the blob storage as an instance of the `Problem` class to do any of the client-side operations.
For an example of how to use the `OnlineProblem` class, have a look at [reusing problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions).

## Handling large input with Protobuf

Protobuf is Google's Data Interchange Format. It is a binary format with a static schema.
For a detailed introduction to Protobuf, have a look at Google's [Protocol Buffers](https://developers.google.com/protocol-buffers/) page.

In Azure Quantum, we've added support for Protobuf as it is useful for encoding input problems that are large in size. Using a binary encoding method rather than the default JSON format can reduce payload sizes, improve upload speeds, and reduce processing speeds.

With this feature, you can specify the problem type, terms, initial configuration and problem metadata (for example, problem name) exactly as is supported currently in JSON.

> [!NOTE]
> This feature is available for a subset of solvers in the Microsoft QIO provider. Usage and availability are detailed below.

### Usage

To submit a problem with Protobuf serialization, specify the optional parameter `content_type` in the `Problem` object definition and set it to `Content.protobuf`.
If you do not set this parameter explicitly, then it will be set to `ContentType.json`.

```py
problem = Problem(name = "protobuf_problem", terms = [Term(c=1, indices=[0,1])], content_type=ContentType.protobuf)
```

For more information on cost functions and how terms relate to a problem definition, see the following topics:

- [Cost functions](xref:microsoft.quantum.optimization.concepts.cost-function)
- [Term](xref:microsoft.quantum.optimization.term)

### Protobuf serialization availability

Protobuf serialization is currently supported by the following Microsoft QIO solvers:

- [Parallel Tempering (CPU)](xref:microsoft.quantum.optimization.parallel-tempering)
- [Population Annealing (CPU)](xref:microsoft.quantum.optimization.population-annealing)
- [Quantum Monte Carlo (CPU)](xref:microsoft.quantum.optimization.quantum-monte-carlo)
- [Simulated Annealing (CPU)](xref:microsoft.quantum.optimization.simulated-annealing)
- [Substochastic Monte Carlo (CPU)](xref:microsoft.quantum.optimization.substochastic-monte-carlo)
- [Tabu Search (CPU)](xref:microsoft.quantum.optimization.tabu)

If you submit problems as Protobuf to a solver that doesn't support them, a client error will appear in the SDK and the submission will fail.

If you discover any bugs or issues while working with Protobuf, please reach out to [Azure Support](https://support.microsoft.com/topic/contact-microsoft-azure-support-2315e669-8b1f-493b-5fb1-d88a8736ffe4).
