---
author: KittyYeungQ
description: This document provides a basic guide to managing jobs submitted for solving optimization problems in Azure Quantum using Python.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Manage optimization jobs
uid: microsoft.quantum.optimization.job-management
---

# Job management

When a problem is submitted to a solver, a `Job` is created in Azure Quantum. The `Workspace` provides the following methods for managing jobs:

- **get_job**: Returns the `Job` metadata and results for a specific job
    (based on job `id`).
- **list_jobs**: Returns a list of all jobs in the workspace.
- **job.details**: Returns a list of the job's details.
- **cancel_job**: Cancels a specific job.

See [Job Cancellation](xref:microsoft.quantum.azure-quantum-overview#job-cancellation) for more information on how cancellation requests are processed.

You can use the `list_jobs` method to get a list of all jobs in the workspace:

```py
jobs = [job.id for job in workspace.list_jobs()]
print(jobs)
```

```output
['5d2f9cd70f55f149e3ed3aef', '23as12fs5d2f9cd70f55f', '1644428ea8507edb7361']
```

The next piece of code shows how to submit a job asynchronously and obtain its job id:

```py
from azure.quantum.optimization import Problem, ProblemType, Term, ParallelTempering, SimulatedAnnealing

problem = Problem(name="MyOptimizationJob", problem_type=ProblemType.ising)
problem.add_term(c=-9, indices=[0])
problem.add_term(c=-3, indices=[1,0])
problem.add_term(c=5, indices=[2,0])

solver = SimulatedAnnealing(workspace)
job = solver.submit(problem)
print(job.id)
```

```output
5d2f9cd70f55f149e3ed3aef
```

The function `get_job` can be called to get the metadata (including results) for a previously submitted job, using the job `id`:

```py
job = workspace.get_job('5d2f9cd70f55f149e3ed3aef')
results = job.get_results()
print(results)
```

```output
{'solutions': [{'configuration': {'0': 1, '1': 1, '2': -1}, 'cost': -17.0}]}
```

You can get full details about the job submission, such as the name of the job, the date of creation or the status using `job.details`:

```py
job = workspace.get_job(jobId)
print(job.details)
```

```output
{
    "additional_properties": json object, e.g. if the job is being cancelled
    "id": string, the job id
    "name": string, the name of the job
    "container_uri": string, where the job data is stored
    "input_data_uri": string, where the input data is stored
    "input_data_format": string, e.g. "microsoft.qio.v2"
    "input_params": json object, includes solver specific parameter information, such as beta values, or population size
    "provider_id": string, e.g. "microsoft"
    "target": string, the name of the target, e.g."microsoft.substochasticmontecarlo.cpu"
    "metadata":  e.g. None
    "output_data_uri":  string, where the output data is stored
    "output_data_format": string, e.g. "microsoft.qio-results.v2"
    "status": string, status of the Job e.g. "Succeeded"
    "creation_time": datetime, when the job was created
    "begin_execution_time": datetime, when the job began execution
    "end_execution_time": datetime, when the job completed
    "cancellation_time":  e.g. None, when the job was cancelled (if applicable)
    "error_data": e.g None, any error details during job submission
}
```

In order to cancel a job, use the function `cancel_job` as shown in this next piece of code:

```py
job = workspace.get_job('5d2f9cd70f55f149e3ed3aef')
workspace.cancel_job(job)

print(job.details.status)
```

```output
Cancelled
```
