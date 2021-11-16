---
author: anraman
ms.author: anraman
ms.date: 11/12/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: include
---

## Prerequisites

To complete this tutorial, you need

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- An Azure Quantum workspace with the **1Qbit** provider enabled. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest [azure-quantum Python package](xref:microsoft.quantum.install-qdk.overview.python-only).

## Jupyter Notebooks installation

Optionally, you can choose to interact with Azure Quantum optimization using Jupyter Notebooks. In order to do this, you need to:

1. Install the *azure-quantum* Python package (as described in [Prerequisites](#prerequisites))
2. [Install Jupyter Notebooks](https://jupyter.org/install)
3. In your terminal of choice, use the following command to launch a new Jupyter Notebook:

    ```Shell
    jupyter notebook
    ```

    This launches a new browser window (or a new tab) showing the Notebook Dashboard, a control panel that allows you to create and manage your notebooks.

4. In the browser view, select the dropdown button on the right hand top corner and select ```Python 3``` from the list to create a new notebook.

## Create and connect to an Azure Quantum workspace

A `Workspace` represents a Azure Quantum workspace and is the main interface for interacting with the service.

```py
from typing import List
from azure.quantum.optimization import Term
from azure.quantum import Workspace

workspace = Workspace (
    subscription_id = "",  # Add your subscription_id
    resource_group = "",   # Add your resource_group
    name = "",             # Add your workspace name
    location = ""          # Add your workspace location (for example, "westus")
    )
```

The first time you run a method which interacts with the Azure service, a window might prompt in your default browser asking for your credentials.
You can optionally pass a credential to be used in the authentication in the construction of the `Workspace` object or via its `credentials` property.
See more at [Azure.Quantum.Workspace](xref:microsoft.quantum.optimization.workspace)

> [!NOTE]
> The `workspace.login()` method has been deprecated and is no longer necessary. The first time there is a call to the service, an authentication will be attempted using the credentials passed in the `Workspace` constructor or its `credentials` property. If no credentials were passed, several authentication methods will be attempted by the [DefaultAzureCredential](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-identity/1.6.0/azure.identity.html#azure.identity.DefaultAzureCredential).

## Express a simple problem

To express a simple problem to be solved, create an instance of a `Problem` and set the `problem_type` to either `ProblemType.ising` or `ProblemType.pubo`. For more information, see [`ProblemType`](xref:microsoft.quantum.optimization.problem-type).

```py
from azure.quantum.optimization import Problem, ProblemType, Term

problem = Problem(name="My First Problem", problem_type=ProblemType.ising)
```

Next, create an array of `Term` objects and add them to the `Problem`:

```py
terms = [
    Term(c=-9, indices=[0]),
    Term(c=-3, indices=[1,0]),
    Term(c=5, indices=[2,0]),
    Term(c=9, indices=[2,1]),
    Term(c=2, indices=[3,0]),
    Term(c=-4, indices=[3,1]),
    Term(c=4, indices=[3,2])
]

problem.add_terms(terms=terms)
```

> [!NOTE]
> There are [multiple ways](xref:microsoft.quantum.optimization.express-problem#Ways-to-supply-problem-terms) to supply terms to the problem, and not all terms must be added at once.

## Apply an optimization solver

 For the 1QBit provider, we'll use the path-relinking solver. You can find documentation on this solver and the other available solvers in the [1QBit provider reference](xref:microsoft.quantum.providers.optimization.1qbit).

```py

from azure.quantum.optimization.oneqbit import PathRelinkingSolver

solver = PathRelinkingSolver(workspace)

result = solver.optimize(problem)
print(result)
```

This method will submit the problem to Azure Quantum for optimization and synchronously wait for it to be solved. You'll see output like the following in your terminal window or Jupyter Notebook:

```output
{'solutions': [{'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}]}
```
