---
author: anraman
description: This document provides a basic installation and usage overview of the Python SDK for optimization.
ms.author: anraman
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: article
title: Install and use the Python SDK for optimization
uid: microsoft.quantum.optimization.install-sdk
---

# Install and use the Python SDK for optimization

This guide provides a basic overview of how to install and use the Python SDK for optimization.

## Prerequisites

- An Azure Quantum workspace created in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.workspaces-portal).

## Python SDK for optimization installation

The Python SDK is distributed as the `azure-quantum` [PyPI](https://pypi.org)
package. To install the package you will need to follow the steps below:

1. Install [Python](https://www.python.org/downloads/) 3.6 or later.
2. Install [PIP](https://pip.pypa.io/en/stable/), the Python Package Installer, and ensure you have **version 19.2 or higher**
3. Install the `azure-quantum` Python package:

   ```bash
   pip install azure-quantum
   ```

## Jupyter Notebooks installation

You can also choose to interact with Azure Quantum optimization using Jupyter Notebooks. In order to do this, you will need to:

1. Install the Python SDK for optimization (as described in the previous section)
2. [Install Jupyter Notebooks](https://jupyter.org/install)
3. In your terminal of choice, use the following command to launch a new Jupyter Notebook:

    ```bash
    jupyter notebook
    ```

    This will launch a new browser window (or a new tab) showing the Notebook Dashboard, a sort of control panel that allows you (among other things) to select which notebook to open.

4. In the browser view, select the dropdown button on the right hand top corner and select ```Python 3``` from the list. This should create a new notebook.

## Usage example

Whether you choose to solve optimization problems using Jupyter Notebooks or a Python script, once you have installed the prerequisites from the previous sections you can follow the instructions below to run a test problem.

## Connecting to an Azure Quantum workspace

A `Workspace` represents the Azure Quantum workspace you [previously created](xref:microsoft.quantum.workspaces-portal) and is the main interface for interacting with the service.

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

workspace.login()
```

When you run the command `workspace.login()` for the first time, you will see the following displayed in your console:

```output
To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code [RANDOM-CODE] to authenticate.
```

Once you sign into your Azure account, your credentials will be cached so that you do not have to repeat this process for future runs.

## Expressing and solving a simple problem

To express a simple problem to be solved, create an instance of a `Problem` and set the `problem_type` to either `ProblemType.ising` or `ProblemType.pubo`. For more information, see [`ProblemType`](xref:microsoft.quantum.optimization.problem-type).

```py
from azure.quantum.optimization import Problem, ProblemType, Term, ParallelTempering

problem = Problem(name="My First Problem", problem_type=ProblemType.ising)
```

Next, create an array of terms and add them to the `problem`:

```py
terms = [
    term(c=-9, indices=[0]),
    term(c=-3, indices=[1,0]),
    term(c=5, indices=[2,0]),
    term(c=9, indices=[2,1]),
    term(c=2, indices=[3,0]),
    term(c=-4, indices=[3,1]),
    term(c=4, indices=[3,2])
]

problem.add_terms(terms=terms)
```

> [!NOTE]
> There are [multiple ways](xref:microsoft.quantum.optimization.express-problem#Ways-to-supply-problem-terms) to supply terms to the problem, and not all terms must be added at once.

Next, we're ready to apply a **solver**. In this example we'll use a parameter-free version of parallel tempering. You can find documentation on this solver and the other available solvers in the [Microsoft QIO provider reference](xref:microsoft.quantum.optimization.providers.microsoft.qio).

```py
solver = ParallelTempering(workspace, timeout=100)

result = solver.optimize(problem)
print(result)
```

This method will submit the problem to Azure Quantum for optimization and synchronously wait for it to be solved. You'll see output like the following in your terminal window or Jupyter Notebook:

```output
{'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}
```

## Next steps

### Documentation

- [Solver overview](xref:microsoft.quantum.optimization.solver-overview)
- [Expressing problems & supplying terms](xref:microsoft.quantum.optimization.express-problem)
- [Interpreting solver results](xref:microsoft.quantum.optimization.understand-solver-results)
- [Job management](xref:microsoft.quantum.optimization.job-management)
- [Solve long-running problems (async problem submission)](xref:microsoft.quantum.optimization.solve-long-running-problems)
- [Reuse problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions)
- [Authenticating with a service principal](xref:microsoft.quantum.optimization.authenticate-service-principal)
- [Solvers reference for Microsoft QIO solvers](xref:microsoft.quantum.optimization.providers.microsoft.qio)

### Samples and end-to-end learning

- [QIO samples repo](https://github.com/microsoft/qio-samples/)
- Getting started
  - [1QBit](https://github.com/microsoft/qio-samples/tree/main/samples/getting-started/1qbit)
  - [Microsoft QIO](https://github.com/microsoft/qio-samples/tree/main/samples/getting-started/microsoft-qio/)
- Ship loading sample problem
  - [End-to-end Microsoft Learn Module](https://docs.microsoft.com/learn/modules/solve-quantum-inspired-optimization-problems/)
  - [Sample code](https://github.com/microsoft/qio-samples/tree/main/samples/ship-loading/)
- Job shop scheduling sample problem
  - [End-to-end Microsoft Learn Module](https://docs.microsoft.com/learn/modules/solve-job-shop-optimization-azure-quantum/)
  - [Sample code](https://github.com/microsoft/qio-samples/tree/main/samples/job-shop-scheduling/)