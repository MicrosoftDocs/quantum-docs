---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 10/17/2022
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: include
---

## Prerequisites

To complete this tutorial, you need

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/offers/ms-azr-0003p/).
- An Azure Quantum workspace with the **Toshiba SQBM+** provider enabled. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Create a new Notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select the workspace you created in the previous step.
1. In the left blade, select **Notebooks**.
1. Click **My Notebooks** and click **Add New**.
1. In **Kernel Type**, select **IPython**.
1. Type a name for the file, for example *SimpleOptimization.ipynb*, and click **Create file**. 

When your new Notebook opens, it automatically creates the code for the first cell, based on your subscription and workspace information.

```py
from azure.quantum import Workspace
workspace = Workspace (
    subscription_id = <your subscription ID>, 
    resource_group = <your resource group>,   
    name = <your workspace name>,          
    location = <your location>        
    )
```

You'll need to import two additional modules. Click **+ Code** to add a new cell and add the following lines:


```py
from typing import List
from azure.quantum.optimization import Term
```

## Express a simple problem

Click **+ Code** to add another new cell and add the following lines:

```py
from azure.quantum.optimization import Problem, ProblemType, Term

problem = Problem(name="My First Problem", problem_type=ProblemType.pubo)
```

This code creates an instance of a `Problem` and sets the `problem_type` to  `ProblemType.pubo`. For more information, see [`ProblemType`](xref:microsoft.quantum.optimization.problem-type).

Next, add another cell to create an array of `Term` objects and add them to the `Problem`:

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
> There are [multiple ways](xref:microsoft.quantum.optimization.express-problem#Ways-to-supply-problem-terms) to supply terms to a problem, and not all terms must be added at once.

## Apply an optimization solver

For the Toshiba SQBM+ provider, we'll use the Ising solver, namely `SimulatedBifurcationMachine`. You can find documentation on this solver in the [Toshiba SQBM+ provider reference](xref:microsoft.quantum.providers.optimization.toshiba).

Add another cell with the following code that opens the solver, submits the problem, and displays the result:

```py
from azure.quantum.target.toshiba import SimulatedBifurcationMachine

solver = SimulatedBifurcationMachine(workspace)

result = solver.optimize(problem)
print(result)
```

This method will submit the problem to Azure Quantum for optimization and synchronously wait for it to be solved. You'll see output like the following in your Notebook:

```output
{... 'solutions': [{'cost': -14.0, 'configuration': {'0': 1, '1': 1, '2': 0, '3': 1}...}
```
