---
title: Quantum Optimization Job
description: Reference for azure.quantum.optimization.Job
author: george-moussa
ms.author: georgenm
ms.date: 1/8/2021
ms.topic: article
uid: azure.quantum.reference.job.python
---

# Quantum Optimization Job

```py
from azure.quantum.optimization import Job
```

## Job.get_results

Retrieves the job result (that is, the computed solution and cost). If the job has not
yet finished, blocks until it has.

```py
results = job.get_results()
print(results)

> {'version': '1.0', 'configuration': {'1': 1, '0': 1, '2': -1, '3': 1}, 'cost': -23.0}
```

## Job.refresh

Refreshes the job's details by querying the Workspace.

```py
job = workspace.get_job(jobId)
job.refresh()
print(job.id)

> 5d2f9cd70f55f149e3ed3aef
```

## Job.has_completed

Returns a boolean value indicating whether the job has finished (for example, the job is in a
[final state](xref:microsoft.azure.quantum.overview#Job-Lifecycle)).

```py
job = workspace.get_job(jobId)
job.refresh()
print(job.has_completed())

> False
```

## Job.wait_until_completed

Keeps refreshing the job's details until it reaches a final state. For more information on job states, see [Azure Quantum Overview](xref:microsoft.azure.quantum.overview).

```py
job = workspace.get_job(jobId)
job.wait_until_completed()
print(job.has_completed())

> True
```