---
title: Solve long-running problems
description: This document provides a basic guide to solving long-running problems in Azure Quantum using Python.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.quantum.optimization.solve-long-running-problems
---

# Solve long running problems

In the example in [Apply Solver](xref:microsoft.azure.quantum.apply-solver.python), a problem was submitted to Azure Quantum and solved synchronously. This is convenient for certain environments, but unsuitable for others where there is a need to either submit a problem and check on it later, or submit many problems and compare the results.

### Submit the problem

To submit a problem asynchronously, use the `submit` method on the `solver`. This submits a `Job` which is returned by the method:

```py
solver = ParallelTempering(workspace, timeout=100, seed=11)
job = solver.submit(problem)
print(job.id)

> ea81bb40-682f-11ea-8271-c49dede60d7c
```

### Refresh job status

After submitting the job, you can check on the status of the job by calling the
`refresh` method. Each time `refresh` is called, the job metadata gets refreshed.

```py
job.refresh()
print(job.details.status)

> Succeeded
```

### Get the job output

Once the job is in a final state, such as `Succeeded`, you may download the job output using `get_results`:

```py
jobId = "ea81bb40-682f-11ea-8271-c49dede60d7c"
job = workspace.get_job(jobId)
result = job.get_results()
print(result)

> {'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}
```