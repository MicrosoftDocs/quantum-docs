---
title: Use the Python SDK for optimization
description: This documents provides a basic usage overview of the Python SDK for optimization.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.quantum.optimization.python-sdk
---

# Use the Python SDK for optimization

This guide provides a basic overview of how to use the Python SDK for optimization. It assumes you have already completed the [Creating an
Azure Quantum Workspace guide](xref:microsoft.quantum.workspaces-portal).

## Installation

The Python SDK is distributed as the `azure-quantum` [PyPI](https://pypi.org)
package.

1. Install [Python](https://www.python.org/downloads/) 3.6 or later.
1. Install [PIP](https://pip.pypa.io/en/stable/), the Python Package Installer,
   and ensure you have **version 19.2 or higher**
1. Install the `azure-quantum` python package.

   ```bash
   pip install --upgrade azure-quantum
   ```

## Connecting to a Quantum Workspace

A `Workspace` represents the Quantum Workspace you [previously created](xref:microsoft.quantum.workspaces-portal) and is the main interface for interacting with the service. The value for `resource_id` can be found on the Azure Portal page for the [Quantum Workspace you created](xref:microsoft.quantum.workspaces-portal).

```python
from azure.quantum import Workspace

workspace = Workspace(
    resource_id = "", # The Resource ID for your Azure Quantum Workspace
    location    = ""  # The Azure region in which the Azure Quantum Workspace was created (optional, defaults to "West US")
)
workspace.login()
```

> [!TIP]
> Alternatively, you can create the `Workspace` using `subscription_id`, `resource_group`, and `name`. These values may be obtained by running `az quantum workspace show`.
>
> workspace = Workspace(
>     subscription_id = "", # The Subscription ID for your Azure Subscription
>     resource_group  = "", # The resource group your Quantum Workspace is deployed in
>     name            = "", # The name of the Quantum Workspace
>     location        = ""  # The Azure region in which the Quantum Workspace was created (optional, defaults to "West US")
> )

When you call the command `workspace.login()`, the SDK will see the following displayed in your console:

```output
To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code [RANDOM-CODE] to authenticate.
```

Once you complete signing into your Azure account, your credentials will be
cached so that you do not have to repeat this process for future runs.

## Expressing and solving a simple problem

To express a simple problem to be solved, create an instance of a `Problem` and
set the `problem_type` to either `ProblemType.ising` or
`ProblemType.pubo`. For more information, see [`ProblemType`](xref:microsoft.quantum.optimization.problem-type).

```py
from azure.quantum.optimization import Problem, ProblemType, Term, ParallelTempering

problem = Problem(name="My First Problem", problem_type=ProblemType.ising)
```

Next, create an array of terms and add them to the `problem`:

```py
terms = [
    Term(w=-9, indices=[0]),
    Term(w=-3, indices=[1,0]),
    Term(w=5, indices=[2,0]),
    Term(w=9, indices=[2,1]),
    Term(w=2, indices=[3,0]),
    Term(w=-4, indices=[3,1]),
    Term(w=4, indices=[3,2])
]

problem.add_terms(terms=terms)
```

>![NOTE]
> There are [multiple ways](xref:microsoft.quantum.optimization.python-sdk.advanced#ways-to-supply-problem-terms)
> to supply terms to the problem, and not all terms must be added at once.

Next, we're ready to solve by applying a **solver**. In this example we'll use a
parameter-free version of parallel tempering. You can find documentation on this
solver and the other available solvers in the [Microsoft QIO provider
reference](xref:microsoft.quantum.optimization.providers.microsoft.qio).

```py
solver = ParallelTempering(workspace, timeout=100)
```

For arguments, the solver takes the `workspace` created previously, plus a single
parameter which is the maximum amount of time (in seconds) to run the solver.
Detailed documentation on parameters is available in the [Azure Quantum Provider
reference](xref:microsoft.quantum.optimization.providers.microsoft.qio).

Solvers provide an `optimize` method that expects a `Problem` which uploads the
problem definition, submits a job, and polls the status until the job has completed
running. This is a blocking method that waits for the job to complete
running. It returns a `JobOutput` object with the job ID and results.

```py
result = solver.optimize(problem)
print(result)
```

> [!NOTE] 
> If you receive an `Unauthorized` error when calling `solver.optimize()`, please see [Azure Quantum common issues](xref:microsoft.quantum.azure.common-issues#issue-operation-returns-an-invalid-status-code-unauthorized).

This method will submit the problem to Azure Quantum for optimization and
synchronously wait for it to be solved. You'll see output like the following in
your terminal:

```
> {'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}
```

## Next Steps

Ready to learn more about creating and solving optimization problems? Check out our samples:
- [Solving a simple shipping optimization problem](https://github.com/MicrosoftDocs/quantum-docs-private/blob/feature/onboarding-azure-quantum/azure-quantum/samples/shipping-sample/shipping-sample.ipynb) (Jupyter Notebook)
- [Job shop scheduling sample problem](https://github.com/MicrosoftDocs/quantum-docs-private/blob/feature/onboarding-azure-quantum/azure-quantum/samples/job-shop-sample/) (Jupyter Notebook)

This guide provides an overview of a simple use case. `Problem` also provides
individual methods for `upload` and `submit`; `submit` returns an instance of
the `Job` which exposes the job metadata and `fetch`, `get_output` and `cancel`
methods. These provide more fine-grain control for the run, and are
covered in [Advanced Usage of the Python SDK](xref:microsoft.quantum.optimization.python-sdk.advanced).

You may also want to review the [solvers reference for Microsoft Optimization Solvers](xref:microsoft.quantum.optimization.providers.microsoft.qio).

## Common issues

Refer to this document for common issues you may run into during the preview: [Common
issues](xref:microsoft.quantum.azure.common-issues)
