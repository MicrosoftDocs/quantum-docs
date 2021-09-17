---
author: george-moussa
description: Reference for azure.quantum.Job
ms.author: georgenm
ms.date: 07/26/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Quantum optimization job
uid: microsoft.quantum.optimization.job-reference
---

# Azure Quantum Job

```py
from azure.quantum import Job
```

## Job.get_results

Retrieves the job result (that is, the computed solution and cost). If the job has not
yet finished, blocks until it has.

```py
results = job.get_results()
print(results)

> {'version': '1.0', 'solutions': [{'configuration': {'1': 1, '0': 1, '2': -1, '3': 1}, 'cost': -23.0}]}
```

## Job.details

Retrieves the full list of the job's details.

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


## Job.refresh

Refreshes the job's details by querying the workspace.

```py
job = workspace.get_job(jobId)
job.refresh()
print(job.id)

> 5d2f9cd70f55f149e3ed3aef
```

## Job.has_completed

Returns a boolean value indicating whether the job has finished (for example, the job is in a
[final state](xref:microsoft.quantum.azure-quantum-overview#monitoring-jobs)).

```py
job = workspace.get_job(jobId)
job.refresh()
print(job.has_completed())

> False
```

## Job.wait_until_completed

Keeps refreshing the job's details until it reaches a final state. For more information on job states, see [Azure Quantum Overview](xref:microsoft.quantum.azure-quantum-overview).

```py
job = workspace.get_job(jobId)
job.wait_until_completed()
print(job.has_completed())

> True
```
