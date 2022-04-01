---
author: bradben
ms.author: brbenefield
ms.date: 02-17-2022
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: include
---

## Prerequisites

To complete this procedure, you need

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- An Azure Quantum workspace with the **Microsoft QIO** provider enabled. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

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

problem = Problem(name="My First Problem", problem_type=ProblemType.ising)
```

This code creates an instance of a `Problem` and sets the `problem_type` to  `ProblemType.ising`. For more information, see [`ProblemType`](xref:microsoft.quantum.optimization.problem-type).

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

 For the Microsoft QIO provider, you'll use the parameter-free version of parallel tempering. For more information about the parallel tempering solver and other Microsoft QIO solvers, see the [Microsoft QIO provider reference](xref:microsoft.quantum.optimization.providers.microsoft.qio).

Add another cell with the following code that opens the solver, submits the problem, and displays the result:

```py
from azure.quantum.optimization import ParallelTempering

solver = ParallelTempering(workspace, timeout=100)

result = solver.optimize(problem)
print(result)
```

This method submits the problem to Azure Quantum for optimization and synchronously wait for it to be solved. 

Click **Run all** and you'll see output like the following in your Notebook:

```output
......{'version': '1.0', 'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0, 'parameters': {'all_betas': [0.05263157894736842, 0.08483446830185856, 0.13674085322912188, 0.22040641399786567, 0.05263157894736842, 0.06507156662728714, 0.0804518668832599, 0.09946745130748995, 0.12297755481503365, 0.15204450088433905, 0.18798170352254984, 0.2324130149640922, 0.2873461007774075, 0.05263157894736842, 0.06032292374035997, 0.0691382474431204, 0.0792418033330163, 0.09082184793061673, 0.1040941487268661, 0.11930600451390022, 0.13674085322912186, 0.1567235531691094, 0.1796264359766303, 0.20587624418424752, 0.23596208257968374, 0.27044453154834486, 0.3099660921991755, 0.05263157894736842, 0.05819611133264724, 0.06434896011059557, 0.07115232568798963, 0.07867498467898539, 0.08699298518197843, 0.09619041556538521, 0.10636025453415848, 0.11760531107053311, 0.13003926375105576, 0.14378780994656645, 0.1589899365226302, 0.17579932488618855, 0.19438590458233618, 0.2149375711468486, 0.23766208558058496, 0.2627891746479403, 0.29057285323169424, 0.32129399222141625, 0.05263157894736842, 0.05699027110239624, 0.061709929006167785, 0.06682044609165143, 0.0723541914209791, 0.07834621470504914, 0.08483446830185858, 0.09186004759966065, 0.09946745130749, 0.10770486330168681, 0.1166244578135835, 0.1262827298913559, 0.1367408532291219, 0.14806506762971203, 0.16032709855522653, 0.17360461142273625, 0.18798170352255, 0.20354943667476758, 0.22040641399786576, 0.23865940444246173, 0.25842401904593415, 0.27982544319117336, 0.3029992295074498, 0.3280921564354881], 'replicas': 70, 'sweeps': 600}, 'solutions': [{'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}]}
```
