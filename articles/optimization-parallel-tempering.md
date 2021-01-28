---
title: Parallel Tempering
description: This document provides a basic guide about how to use Parallel Tempering solver in Azure Quantum.
author: haohaiyu
ms.author: hay
ms.date: 01/12/2021
ms.topic: article
uid: microsoft.quantum.optimization.parallel-tempering
---

# Parallel Tempering

Parallel Tempering can be regarded as a variant of the [Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing) algorithm, or more generally Monte Carlo Markov Chain methods. Azure Quantum's Parallel Tempering solvers are designed to solve binary optimization problems through random sampling.

As with Simulated Annealing, the cost function is explored through thermal jumps. Unlike simulated annealing, a cooling temperature is not used.

Instead of running a single copy of the system, Parallel Tempering creates multiple copies of a system, called replicas, that are randomly initialized and run at different temperatures. Then the same process is followed as in Simulated Annealing, but based on a specific protocol two replicas can be exchanged between different temperatures. This change can enable walkers that were previously stuck in local optima to be bumped out of them, and thus encourages a wider exploration of the problem space.

> [!NOTE]
> You can find further information on the Parallel Tempering algorithm in [Marinari and Parisi 1992 - Simulated Tempering: A New Monte Carlo Scheme](https://iopscience.iop.org/article/10.1209/0295-5075/19/6/002/pdf)

## Features of Parallel Tempering on Azure Quantum

Parallel Tempering in Azure Quantum supports:

- Parameter-free mode and parametrized mode (with parameters)
- Ising and PUBO input formats
- CPU only

## When To Use Parallel Tempering

Parallel Tempering generally outperforms [Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing) on hard problems with rugged landscapes.

It is also very good at solving Ising problems, or problems that are equivalent (such as min-cut problems).

> [!NOTE]
> For further information on determining which solver to use, please to [Which optimization solver should I use?](xref:microsoft.quantum.optimization.choose-solver).

## Parameter Free Parallel Tempering

The parameter free version of Parallel Tempering is recommended for new users, those who don't want to manually tune parameters, and even as a starting point for further manual tuning. The main parameters to be tuned for this solver are the number of `sweeps`, `replicas` and `all_betas` (described in the next section).

The parameter free solver will halt either on `timeout` (specified in seconds) or when there is sufficient convergence on a solution.

| Parameter Name | Description |
|----------------|-------------|
| `timeout` | Max execution time for the solver (in seconds). This is a best effort mechnism, so the solver may not stop immediately when the timeout is reached.|
| `seed (optional)` | Seed value - used for reproducing results. |

To create a parameter free Parallel Tempering solver using the SDK:

```python
from azure.quantum.optimization import ParallelTempering
# Requires a workspace already created.
solver = ParallelTempering(workspace, timeout=100, seed=22)
```

The parameter-free solver will return the parameters used in the result JSON. You can then use these parameters to solve similar problems (similar numer of variables, terms, locality and similar coefficient scale) using the parametrized Parallel Tempering solver.

## Parametrized Parallel Tempering

Parallel Tempering with specified parameters is best used if you are already familiar with Parallel Tempering terminology (sweeps, betas) and/or have an idea of which parameter values you intend to use. **If this is your first time using Parallel Tempering for a problem, the parameter free version is recommended.** Some of the parameters like `beta_start` and `beta_stop` are hard to estimate without a good starting point.

Parallel Tempering supports the following parameters:

| Parameter Name | Description |
|----------------|-------------|
| `sweeps` | Number of sets of iterations to run over the variables of a problem. More sweeps will usually improve the solution (unless it is already at the global min).|
| `replicas`  | The number of concurrent running copies for sampling. Each instance will start with a random configuration. We recommend this value to be no less than the number of cores available on the machine, in order to fully utilize the available compute power. Currently on Azure Quantum this should be no less than 72.|
| `all_betas` | The list of beta values used in each replica for sampling. The number of beta values must equal the number of replicas, as each replica will be assigned one beta value from the list. These beta values control how the solver escapes optimization saddle points - the larger the beta values, the less likely the sampling process will be to jump out of a local optimum.|
| `seed (optional)` | Seed value - used for reproducing results |

The larger the number of sweeps and replicas, the more likely the Parallel Tempering solver will be to find an optimal or near-optimal solution, however the solver will take longer to run.

To create a parametrized Parallel Tempering solver using the SDK:

```python
from azure.quantum.optimization import ParallelTempering
# Requires a workspace already created.
solver = ParallelTempering(workspace, sweeps=2, all_betas=[1.15, 3.14], replicas=2, seed=22)
```
