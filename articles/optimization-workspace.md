---
author: SoniaLopezBravo
description: Reference for azure.quantum.Workspace
ms.author: sonialopez
ms.date: 07/26/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Azure Quantum workspace
uid: microsoft.quantum.optimization.workspace
---

# Azure Quantum workspace

```python
from azure.quantum import Workspace
```

## Constructor

To create a `Workspace` object, you must supply the following arguments in order
to connect. If you have not already created a workspace, follow the steps in
[Creating an Azure Quantum workspace
guide](xref:microsoft.quantum.quickstarts.optimization.qio.portal) using the following values:

- `subscription_id`: The subscription ID where the workspace is deployed.
- `resource_group`: The name of the resource group where the workspace is deployed.
- `name`: The name of the workspace.
- `location`: The location where the workspace is deployed, for example **West US**,
with either the `create` or `show` commands.
- `credential`: (Optional) The credential to use to connect to the Azure Quantum and Storage services.
   Normally one of the [credential types from Azure.Identity](/python/api/overview/azure/identity-readme#credential-classes).
   Defaults to `DefaultAzureCredential`, which will attempt [multiple forms of authentication](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-identity/1.6.0/azure.identity.html#azure.identity.DefaultAzureCredential).

You can find these values by viewing your Azure Quantum workspace details through the Azure portal.

In case you have not specified any credentials, the first time you run a method which interacts with the Azure service, a window might prompt in your default browser asking for your credentials.

```py
workspace = Workspace (
    subscription_id = "",  # Add your subscription_id
    resource_group = "",   # Add your resource_group
    name = "",             # Add your workspace name
    location= ""        # Add the workspace location, for example, westus
)
```

## Workspace.get_job

Retrieves information about a job.

```py
from azure.quantum import Workspace

workspace = Workspace(...)
job = workspace.get_job("285cfcb4-6822-11ea-a05f-2a16a847b8a3")
print(job.details.status)
```

```output
Succeeded
```


## Workspace.list_jobs

Returns the list of existing jobs in the workspace.

```py
from azure.quantum import Workspace

workspace = Workspace(...)
jobs = workspace.list_jobs()
for job in jobs:
    print(job.id, job.details.status)
```
```output
08ea8792-68f2-11ea-acc5-2a16a847b8a3 Succeeded
0ab1863a-68f2-11ea-82b3-2a16a847b8a3 Succeeded
0c5c507e-68f2-11ea-ba75-2a16a847b8a3 Cancelled
f0c8de58-68f1-11ea-a565-2a16a847b8a3 Executing
```

The `Workspace.list_jobs` method also allows the user to filter on the creation date, status and name properties of a job when listing. Filters can be combined. 

> [!NOTE]
> To use the filter feature, you must have **version 0.18.2107** or newer of the [*azure-quantum* Python package](xref:microsoft.quantum.update-qdk#update-the-azure-quantum-python-package). 

### Filtering by creation time on list_jobs

To filter by jobs created after a certain time, set the `created_after` filter. This parameter accepts a `datetime` object.

- A datetime without timezone information is assumed to be in the local time of the user.

```py
from azure.quantum import Workspace
from datetime import datetime, timedelta, timezone

# filter jobs created within the last day (in local time).
creation_time = datetime.now() - timedelta(days=1)

workspace = Workspace(...)
jobs = workspace.list_jobs(created_after=creation_time)
```

### Filtering by job name on list_jobs

To filter by jobs by a certain name, set the `name_match` filter. This parameter accepts a regex string.

```py
from azure.quantum import Workspace

workspace = Workspace(...)

# filter job name on any regex expression
jobs1 = workspace.list_jobs(name_match="job_.+")
jobs2 = workspace.list_jobs(name_match=".*test.*")
jobs3 = workspace.list_jobs(name_match="regular_string_job_name")
```

### Filtering by job status on list_jobs

To filter by jobs by status, set the `status` filter. This parameter accepts a `JobStatus` enumeration.

```py
from azure.quantum import Workspace
from azure.quantum import JobStatus

workspace = Workspace(...)

# list succeeded jobs
jobs1 = workspace.list_jobs(status=JobStatus.SUCCEEDED)

# list pending jobs
jobs2 = workspace.list_jobs(status=JobStatus.EXECUTING)

# list failed jobs
jobs3 = workspace.list_jobs(status=JobStatus.FAILED)
```

## Workspace.cancel_job

Cancels a job that was previously submitted.

```py
from azure.quantum import Workspace

workspace = Workspace(...)
job = workspace.get_job("285cfcb4-6822-11ea-a05f-2a16a847b8a3")

workspace.cancel_job(job)
print(job.details.status)
```

```output
Succeeded
```

## Workspace.get_targets

Lists instances of all targets available on the Workspace and can be filtered by provider ID or target name. This method returns a list or a single instance. This includes all of the QIO Solvers, since Solver is a subclass of Target.
Each target can be used to submit a job as an alternative to creating a Solver instance directly as described in [Job management](xref:microsoft.quantum.optimization.job-management). `Workspace.get_targets` takes optional keyword parameters. If no keyword parameters are passed, it defaults to using the parameter-free target. Note that there is an exception for the Population Annealing and Substochastic Monte Carlo solvers, as they requrie a `timeout` parameter to resolve to the parameter-free version. The QMC solver does not have a parameter-free option.

The following example shows how to get all targets associated with your workspace:

```py
from azure.quantum import Workspace

workspace = Workspace(...)
targets = workspace.get_targets()
targets
```

```output
[<Target name="microsoft.paralleltempering-parameterfree.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.simulatedannealing-parameterfree.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.tabu-parameterfree.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.qmc.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.populationannealing.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.substochasticmontecarlo.cpu", avg. queue time=0 s, Available>,
 <Target name="ionq.qpu", avg. queue time=669 s, Available>,
 <Target name="ionq.simulator", avg. queue time=1 s, Available>,
 <Target name="1qbit.tabu", avg. queue time=0 s, Available>,
 <Target name="1qbit.pathrelinking", avg. queue time=0 s, Available>,
 <Target name="1qbit.pticm", avg. queue time=0 s, Available>,
 <Target name="toshiba.sbm.ising", avg. queue time=5 s, Available>,
 <Target name="quantinuum.hqs-lt-s1", avg. queue time=0 s, Unavailable>,
 <Target name="quantinuum.hqs-lt-s1-apival", avg. queue time=1 s, Available>,
 <Target name="quantinuum.hqs-lt-s1-sim", avg. queue time=6 s, Available>]
```

To filter by provider, specify the `provider_id` input argument:

```py
targets = workspace.get_targets(provider_id="microsoft")
targets
```

```output
[<Target name="microsoft.paralleltempering-parameterfree.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.simulatedannealing-parameterfree.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.tabu-parameterfree.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.qmc.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.populationannealing.cpu", avg. queue time=0 s, Available>,
 <Target name="microsoft.substochasticmontecarlo.cpu", avg. queue time=0 s, Available>]
```

To get a single target, for instance, the Simulated Annealing solver, specify the `name` input argument:

```py
solver = workspace.get_targets(name="microsoft.simulatedannealing.cpu")
solver
```

Since no keyword arguments were given, the workspace defaults to the parameter-free version:

```output
<Target name="microsoft.simulatedannealing-parameterfree.cpu", avg. queue time=0 s, Available>
```

To specify input arguments, use:

```py
solver = workspace.get_targets(name="microsoft.simulatedannealing.cpu", timeout=100, seed=22)
solver
```

```output
<Target name="microsoft.simulatedannealing.cpu", avg. queue time=0 s, Available>
```


This target can then be used to submit a problem and get the resulting job:

```py
from azure.quantum.optimization import Problem, ProblemType

problem = Problem(name="MyOptimizationJob", problem_type=ProblemType.ising)
problem.add_term(c=-9, indices=[0])
problem.add_term(c=-3, indices=[1,0])
problem.add_term(c=5, indices=[2,0])
problem = 
job = solver.submit(problem)
results = job.get_results()
results
```

```output
{'solutions': [{'configuration': {'0': 1, '1': 1, '2': -1}, 'cost': -17.0}]}
```
