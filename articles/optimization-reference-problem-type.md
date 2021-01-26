---
title: Tabu Search
description: This document provides a basic guide about how to use the Tabu Search solver in Azure Quantum.
author: adelebai
ms.author: adbai
ms.date: 01/13/2021
ms.topic: article
uid: azure.quantum.optimization.tabu
---

# Tabu Search 

Tabu Search is a neighbourhood search algorithm that employs a tabu list. A tabu list represents a set of potential solutions that the search is forbidden to visit for a number of steps (tabu tenure). The decision making process per step is similar to that of a greedy algorithm, but with a list of forbidden moves (usually moves that were recently visited). On every sweep, the move that results in the best objective function improvement and is not on the tabu list, is performed.

In Azure Quantum, the core algorithmic approach to our tabu search implementation is described in [Beasley 1999 - Heuristic Algorithms for the Unconstrained Binary Quadratic Programming Problem](https://www.researchgate.net/publication/2661228_Heuristic_Algorithms_for_the_Unconstrained_Binary_Quadratic_Programming_Problem), and we have extended this approach with various improvements in computational efficiency. For multi-threading, we borrow the multistart approach described in [Palubeckis et al. 2004 - Multistart Tabu Search Strategies](https://link.springer.com/article/10.1023/B:ANOR.0000039522.58036.68).

## Features of Tabu Search on Azure Quantum

Tabu search in Azure Quantum supports:

- Parameter-free mode and parametrized mode (with parameters)
- Ising and PUBO input formats
- CPU only

## When To Use Tabu Search

In the context of binary programming problems, Tabu search is most commonly used for QUBO problems (decision variables with value 0 and 1, with quadratic locality).

Tabu is expected to perform very well on problem landscapes with the following features:

- High term density (anywhere from densities of 5%-100%)
- Highly convex "simple" problems that will suit a greedy algorithm
- 0,1 decision variables and quadratic locality (QUBO problems)
- Smaller problems (although there is no limit on the number of variables accepted). Because only one move is made per sweep, this algorithm will naturally take longer for larger problems.

> [!NOTE]
> For further information on choosing which solver to use, please refer to [this document](xref:microsoft.azure.quantum.optimization.choose-solver).

## Parameter Free Tabu Search

The parameter free version of Tabu Search is recommended for new users, those who don't want to manually tune parameters, and even as a starting point for further manual tuning. The main parameters to be tuned for this solver are the number of `sweeps` and the `tabu_tenure` (described in the next section).

The parameter free solver will halt either on `timeout` (specified in seconds) or when there is sufficient convergence on a solution.

| Parameter Name | Description |
|----------------|-------------|
| `timeout` | Max execution time for the solver (in seconds). This is a best effort mechnism, so the solver may not stop immediately when the timeout is reached.|
| `seed (optional)` | Seed value - used for reproducing results. |

To create a parameter free Tabu solver using the SDK:

```python
from azure.quantum.optimization import Tabu
# Requires a workspace already created.
solver = Tabu(workspace, timeout=100, seed=22)
```

The parameter-free solver will return the parameters used in the result JSON. You can then use these parameters to solve similar problems (similar numer of variables, terms, locality and similar coefficient scale) using the parametrized Tabu Search solver.

## Parametrized Tabu Search

Tabu Search with specified parameters is best used if you are already familiar with tabu search terminology (iterations, tenure etc.) and/or have an idea of which parameters you intend to use. If this is your first time using Tabu Search for a problem, the parameter free version (described below) is recommended.

Tabu Search supports the following parameters:

| Parameter Name | Description |
|----------------|-------------|
| `sweeps`       | Number of sets of iterations to run over the variables of a problem. The more sweeps will usually always improve the solution (unless it is already at the global min).|
| `tabu_tenure`  | Tenure of the tabu list in moves. Describes how many moves a variable stays on the tabu list once it has been made. This value is recommended to be between 1 and the number of variables to have any impact. This will be the main tuneable parameter that will determine the quality of the solution. A good starting point is 20. |
| `replicas (optional)`  | The number of concurrent instances of a solver to run. Each instance will start with a random configuration **unless an initial configuration is supplied in the problem file**. This parameter will usually default to the number of available threads on the machine, so it is recommended to leave it blank unless you have a clear idea of how many replicas you need. |
| `seed (optional)` | Seed value - used for reproducing results |

To create a parametrized Tabu solver using the SDK:

```python
from azure.quantum.optimization import Tabu
# Requires a workspace already created.
solver = Tabu(workspace, sweeps=2, tabu_tenure=5, replicas=72, seed=22)
```
