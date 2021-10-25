---
author: guenp
description: Learn how to solve a batch of problems using Azure Quantum and the Python asyncio library.
ms.author: guenp
ms.date: 10/21/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Solve a batch of problems using asyncio
uid: microsoft.quantum.optimization.async-io
---

# Solve a batch of optimization problems using asyncio

Learn how to solve a batch of optimization problems using Azure Quantum and the Python asyncio library.

The example in [Solve long-running problems](xref:microsoft.quantum.optimization.solve-long-running-problems) submits a job to Azure Quantum and fetches the results later. This can be used to submit a problem and check on it later, or submit many problems and compare the results. However, to solve a batch of problems and, for example, run other processing steps while waiting for them to finish, you need to use Python's [asyncio](https://docs.python.org/3/library/asyncio.html) framework. This can considerably speed up applications that run post-processing on job results or access a file or database.

## Submit a problem and process the results asynchronously

First, create an async `workspace`:

```python
from azure.quantum.aio import Workspace
workspace = Workspace(
    resource_id="",
    location=""
)
```

To submit a problem and get a `Job`, use the `submit` method on the `solver`. You can now create an asynchronous function `get_cost` that fetches the results and processes them asynchronously. The following example implements a very simple post-processing step that returns the `"cost"` value from the result dictionary.

To learn more about the types of data returned by the solvers, see [Interpreting solver results](xref:microsoft.quantum.optimization.understand-solver-results).

```py
import asyncio
from azure.quantum.aio.optimization import ParallelTempering, Problem, ProblemType
from azure.quantum.optimization import Term

async def get_cost(job):
    result = await job.get_results()
    return result["cost"]

async def main():
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
    
    # Submit a job
    job = await solver.submit(problem)
    
    # Fetch the result and process it
    return await get_cost(job)    
    
result = asyncio.run(main())
print(result)
```

```output
-17.0
```

## Submit a batch of problems and process the results asynchronously

You can now use the `get_cost` function with `asyncio.gather` to fetch the results for a batch of problems and process them asynchronously. The following sample code generates and solves ten problems.

```python
async def main():
    # Create a solver
    solver = ParallelTempering(workspace, timeout=100, seed=11)
    
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
    
    # Create a job for each problem
    jobs = [await solver.submit(problem) for problem in problems]

    # Fetch the job results and post-process them asynchronously
    return await asyncio.gather(*[get_cost(job) for job in jobs])

# Asynchronously solve a list of problems and get the costs.
results = asyncio.run(main())
print(results)
```

```output
[-17.0, -16.0, -15.0, -14.0, -15.0, -16.0, -17.0, -18.0, -19.0, -20.0]
```

## Next steps

The `azure.quantum.aio.optimization` package contains asyncio-compatible versions of all the solvers provided by the `azure.quantum.optimization` package. To use the following samples and documentation with `asyncio`, change the imports to use the `azure.quantum.aio` library instead and use the `await` keyword when calling asynchronous methods.

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
