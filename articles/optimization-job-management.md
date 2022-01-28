---
author: cjgronlund
description: This article provides a basic guide to managing jobs submitted for solving optimization problems in Azure Quantum using Python.
ms.author: kitty
ms.date: 08/12/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Manage optimization jobs
uid: microsoft.quantum.optimization.job-management
---

# Job management

When a problem is submitted to a solver, a `Job` is created in Azure Quantum. The `Workspace` provides the following methods for managing jobs:

- **list_jobs**: Returns a list of all jobs in the workspace.
- **get_job**: Returns the `Job` metadata and results for a specific job
    (based on job `id`).
- **job.details**: Returns a list of the job's details.
- **cancel_job**: Cancels a specific job.

## List jobs

You can use the `list_jobs` method to get a list of all jobs in the workspace:

```py
jobs = [job.id for job in workspace.list_jobs()]
print(jobs)
```

```output
['5d2f9cd70f55f149e3ed3aef', '23as12fs5d2f9cd70f55f', '1644428ea8507edb7361']
```


## Get jobs

The function `get_job` can be called to get the metadata (including results) for a previously submitted job, using the job `id`:

```py
job = workspace.get_job('5d2f9cd70f55f149e3ed3aef')
results = job.get_results()
print(results)
```

```output
{'solutions': [{'configuration': {'0': 1, '1': 1, '2': -1}, 'cost': -17.0}]}
```
## Job details

You can get full details about the job submission, such as the name of the job, the date of creation or the current status, using `job.details`:

```py
job = workspace.get_job(jobId)
print(job.details)
```

|Property|Data Type| Description|
|-----|----|----|
|**ID**|String|The unique identifier for the job. |
|**Name**|String| The job name. It is not required for the name to be unique. |
|**Container_uri**|String| The blob container SAS uri, where the host job data is stored.|
|**Input_data_uri**|String| The input blob SAS uri, where the input data is stored.|
|**Input_data_format**|String| The format of the input data, for example, _microsoft.qio.v2_.|
|**Input_params**|json object| The input parameters for the job. It is expected that the size of this object is small and only used to specify parameters for the execution target, such as beta values, or population size, not the input data.|
|**Provider_id**|String| The unique identifier for the provider, for example, _microsoft_.|
|**Target**|String| The name of the target to run the job, for example, _microsoft.substochasticmontecarlo.cpu_.|
|**Metadata**|String| The job metadata. Metadata provides client the ability to store client-specific information.|
|**Output_data_uri**|String| The output blob SAS uri, where the output data is stored. When a job finishes successfully, results will be uploaded to this blob.|
|**Output_data_format**|String| The format of the output data, for example, _microsoft.qio.v2_.|
|**Status**|String| The current status of the job, for example _Succeeded_.|
|**Creation_time**|Datetime| The time when the job was created.|
|**Begin_execution_time**|Datetime| The time when the job began the execution.|
|**End_execution_time**|Datetime| The time when the job completed.|
|**Cancellation_time**|Datetime| The time when the job was cancelled (if applicable).|
|**Error_data**|String| Error details during job submission (only applicable if job fails).|

If you are only interested in getting the ID of the job, you can use `job.id`. The next piece of code shows how to submit a job asynchronously and obtain its job ID:

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

## Cancel a job

In order to cancel a job, use the function `cancel_job` as shown in this next piece of code:

```py
job = workspace.get_job('5d2f9cd70f55f149e3ed3aef')
workspace.cancel_job(job)

print(job.details.status)
```

```output
Cancelled
```
See [Job Cancellation](xref:microsoft.quantum.azure-quantum-overview#job-cancellation) for more information on how cancellation requests are processed.
