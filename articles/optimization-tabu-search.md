---
title: Tabu search optimization solver
description: This document provides a basic guide about how to use the Tabu  search optimization solver in Azure Quantum.
author: bradben
ms.author: brbenefield
ms.date: 02/01/2022
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
uid: microsoft.quantum.optimization.tabu
---

# Tabu search optimization solver

Tabu search is a neighborhood search algorithm that employs a tabu list. A tabu list represents a set of potential solutions that the search is forbidden to visit for a number of steps, called the *tabu tenure*. The decision-making process per step is similar to that of a greedy algorithm, but with a list of forbidden moves (usually moves that were recently visited). On every sweep, the move that results in the best objective function improvement and isn't on the tabu list is performed.

In Azure Quantum, the core algorithmic approach to the tabu search implementation is described in [Beasley 1999 - Heuristic Algorithms for the Unconstrained Binary Quadratic Programming Problem](https://www.researchgate.net/publication/2661228_Heuristic_Algorithms_for_the_Unconstrained_Binary_Quadratic_Programming_Problem), and is extended with various improvements in computational efficiency. For multi-threading, Azure Quantum borrows the multistart approach described in [Palubeckis et al. 2004 - Multi-start Tabu Search Strategies](https://link.springer.com/article/10.1023/B:ANOR.0000039522.58036.68).

## Features of tabu search on Azure Quantum

Tabu search in Azure Quantum supports:

- Parameter-free mode and parameterized mode (with parameters)
- [Ising](xref:microsoft.quantum.optimization.concepts.ising-model) and [PUBO](xref:microsoft.quantum.optimization.concepts.binary-optimization) input formats
- CPU only

## When to use tabu search

In the context of binary programming problems, tabu search is most commonly used for [QUBO](xref:microsoft.quantum.optimization.concepts.binary-optimization) problems (decision variables with value 0 and 1, with quadratic locality).

Tabu search is expected to perform very well on problem landscapes with the following features:

- High term density (densities from 5% to 100%).
- Highly convex "simple" problems that suit a greedy algorithm.
- 0, 1 decision variables and quadratic locality (QUBO problems).
- Smaller problems (although there is no limit on the number of variables accepted). Because only one move is made per sweep, this algorithm naturally takes longer for larger problems.

> [!NOTE]
> For more information on determining which solver to use, see [Which optimization solver should I use?](xref:microsoft.quantum.optimization.choose-solver).

## Parameter-free tabu search

The parameter-free version of tabu search is recommended for new users, users who don't want to manually tune parameters, or even as a starting point for further manual tuning. The main parameters to be tuned for this solver are the number of `sweeps` and the `tabu_tenure` (described in the next section).

The parameter-free solver will halt either on `timeout` (specified in seconds) or when there is sufficient convergence on a solution.

| Parameter Name | Description |
|----------------|-------------|
| `timeout` | Max execution time for the solver (in seconds). This is a best effort mechanism, so the solver may not stop immediately when the timeout is reached.|
| `seed` (optional) | This is a seed value used for reproducing results. |

To create a parameter-free tabu solver using the SDK:

```python
from azure.quantum.optimization import Tabu
# Requires a workspace already created.
solver = Tabu(workspace, timeout=100, seed=22)
```

The parameter-free solver returns the parameters used in the result JSON. You can then use these parameters to solve similar problems using the parameterized tabu search solver. For example, problems with a similar number of variables, terms, locality, or coefficient scale. 

Running the solver without any parameters also triggers the parameter-free version:

```python
from azure.quantum.optimization import Tabu
# Requires a workspace already created.
# Not specifying any parameters runs the parameter-free version of the solver.
solver = Tabu(workspace)
```

## Parameterized tabu search

Tabu search with specified parameters is best used if you're already familiar with tabu search terminology, for example, iterations, tenure, and so on, or have an idea of which parameters you intend to use. If this is your first time using tabu search for a problem, the parameter-free version (described in the previous section) is recommended.

Tabu search supports the following parameters:

| Parameter Name | Description |
|----------------|-------------|
| `sweeps`       | Number of sets of iterations to run over the variables of a problem. More sweeps usually improve the solution, unless it's already at the global minimum.|
| `tabu_tenure`  | Tenure of the tabu list in moves. Describes how many moves a variable stays on the tabu list once it has been made. The value is recommended to be between 1 and the number of variables to have any impact. This is the main tuneable parameter that determines the quality of the solution. A good starting point is 20. <br> **Note:** If the value of `tabu_tenure` is **larger** than the number of variables, the search time may be increased significantly. In this scenario, you can accelerate the search time by adding the parameter `[solver].set_one_param("disabled_features", [2])`. |
| `restarts`  | The number of repeated instances to run the solver. Each instance starts with a random configuration **unless an initial configuration is supplied in the problem file**. This is recommended to be at least 72 to fully utilize machine capabilities. |
| `replicas` (deprecated)  | The number of concurrent solvers to initialize. This parameter defaults to the number of available processors on the machine, and is no longer accepting input. |
| `seed` (optional) | This is a seed value used for reproducing results. |

To create a parameterized tabu solver using the SDK:

```python
from azure.quantum.optimization import Tabu
# Requires a workspace already created.
solver = Tabu(workspace, sweeps=2, tabu_tenure=5, restarts=72, seed=22)
```
