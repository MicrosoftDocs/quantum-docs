---
author: guenp
description: Learn how to solve a batch of problems with asyncio on Azure Quantum using Python.
ms.author: guenp
ms.date: 10/21/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Solve a batch of problems using asyncio
uid: microsoft.quantum.optimization.async-io
---

# Solve a batch of problems using asyncio

Learn how to solve a batch of problems with asyncio on Azure Quantum using Python.

The example in [Solve long-running problems](xref:microsoft.quantum.optimization.solve-long-running-problems) submits a job to Azure Quantum and fetches the results later. This can be used to a problem and check on it later, or submit many problems and compare the results. However, to solve a batch of problems and, for example, run other processing steps while waiting for them to finish, we need to use Python's [asyncio](https://docs.python.org/3/library/asyncio.html) framework. This can considerably speed up applications that run post-processing of job results or access a file or database.

## Using the azure.quantum.aio package

First, create an async `workspace`:

```python
from azure.quantum.aio import Workspace
from azure.quantum.aio.optimization import ParallelTempering
workspace = Workspace(
    resource_id="",
    location=""
)
```

To submit a problem, use the `submit` method on the `solver`. This submits a `Job` and returns the results asynchronously.

```py
# Create a solver
solver = ParallelTempering(workspace, timeout=100, seed=11)
# Construct a problem
problem = Problem(name=f"Problem", problem_type=ProblemType.ising)
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0]),
]
problem.add_terms(terms=terms)
# Solve the problem and fetch the result
result = asyncio.run(solver.optimize(problem))
```

### Submit batch of problems

You can now use the `solve_problem` function with `asyncio.gather` to submit a batch of problems asynchronously. The sample coe below generates and solves 20 problems:

```python
import asyncio
from azure.quantum.aio.optimization import Problem, ProblemType

# Create a list of problems.
problems = []
for n in range(10):
    problem = Problem(name=f"Problem-{n}", problem_type=ProblemType.ising)
    terms = [
        Term(c=n-9, indices=[0]),
        Term(c=n-3, indices=[1,0]),
        Term(c=n+5, indices=[2,0]),
    ]
    problem.add_terms(terms=terms)
    problems.append(problem)

async def get_cost(problem):
    # Run a problem against the solver and return the cost.
    result = solver.optimize(problem)
    return result["cost"]

async def solve_problems(problems):
    # Asynchronously solve a list of problems and get the costs.
    results = await asyncio.gather(*[get_cost(problem) for problem in problems])

results = asyncio.run(solve_problems(problems))
results
```

```output
[-17.0, -16.0, -15.0, -14.0, -15.0, -16.0, -17.0, -18.0, -19.0, -20.0]
```

## Next steps

The `azure.quantum.aio` package covers all solvers provided by the `azure.quantum` package. To use the below samples and documentation with `asyncio`, change the imports to use the `azure.quantum.aio` library instead and use the `await` keyword with asynchronous methods.

### Documentation

- [Solver overview](xref:microsoft.quantum.reference.qio-target-list)
- [Expressing problems & supplying terms](xref:microsoft.quantum.optimization.express-problem)
- [Interpreting solver results](xref:microsoft.quantum.optimization.understand-solver-results)
- [Reuse problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions)

### Samples and end-to-end learning

- [QIO samples repo](https://github.com/microsoft/qio-samples/)
- Getting started
  - [1QBit](https://github.com/microsoft/qio-samples/tree/main/samples/getting-started/1qbit)
  - [Microsoft QIO](https://github.com/microsoft/qio-samples/tree/main/samples/getting-started/microsoft-qio/)
- Ship loading sample problem
  - [End-to-end Microsoft Learn Module](/learn/modules/solve-quantum-inspired-optimization-problems/)
  - [Sample code](https://github.com/microsoft/qio-samples/tree/main/samples/ship-loading/)
- Job shop scheduling sample problem
  - [End-to-end Microsoft Learn Module](/learn/modules/solve-job-shop-optimization-azure-quantum/)
  - [Sample code](https://github.com/microsoft/qio-samples/tree/main/samples/job-shop-scheduling/)
