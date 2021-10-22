---
author: guenp
description: Learn how to submit a batch of jobs concurrently to Azure Quantum using Python.
ms.author: guenp
ms.date: 10/21/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Solve a batch of problems
uid: microsoft.quantum.optimization.async-io
---

# Solve a batch of problems

Learn how to solve a batch of problems by submitting a batch of jobs asynchronously to Azure Quantum using Python.

The example in [Solve long-running problems](xref:microsoft.quantum.optimization.solve-long-running-problems) submits a job to Azure Quantum and fetches the results later. This is convenient for being able to submit a problem and check on it later, or submit many problems and compare the results. However, to achieve concurrency and utilize all CPU time while waiting for a job to finish we need to use Python's `asyncio` framework. This can considerably speed up applications that run post-processing of job results or access a file or database.

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

To submit a problem concurrently, use the `submit` method on the `solver`. This submits a `Job` and returns the results synchronously.

```py
solver = ParallelTempering(workspace, timeout=100, seed=11)
problem = Problem(name=f"Problem", problem_type=ProblemType.ising)
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0]),
]
problem.add_terms(terms=terms)
asyncio.run(solver.optimize(problem))
```

### Submit batch of problems

You can now use the `solve_problem` function with `asyncio.gather` to submit a batch of problems concurrently. The sample coe below generates and solves 20 problems:

```python
import asyncio
from azure.quantum.aio.optimization import Problem, ProblemType

problems = []
for n in range(5):
    problem = Problem(name=f"Problem-{n}", problem_type=ProblemType.ising)
    terms = [
        Term(c=n-9, indices=[0]),
        Term(c=n-3, indices=[1,0]),
        Term(c=n+5, indices=[2,0]),
    ]
    problem.add_terms(terms=terms)
    problems.append(problem)

async def get_cost(problem):
    result = solver.optimize(problem)
    return result["cost"]

async def solve_problems(problems):
    results = await asyncio.gather(*[get_cost(problem) for problem in problems])

results = asyncio.run(solve_problems(problems))
```

```output
[-17.0, -16.0, -15.0, -14.0, -15.0, -16.0, -17.0, -18.0, -19.0, -20.0]
```
