---
title: Population Annealing
description: This document provides a basic guide about how to use the Population Annealing solver in Azure Quantum.
author: andrist
ms.author: ruandris
ms.date: 05/25/2021
ms.topic: article
uid: azure.quantum.optimization.population-annealing
---

> [!NOTE]
> This solver is available to a subset of customers in private preview and will
> be available to all our customers soon.

# Population annealing 

[Population annealing](https://arxiv.org/abs/1006.0252) is a sequential Monte
Carlo method which aims to alleviate the susceptibility of the Metropolis
Algorithm to rough cost landscapes (for example, with many local minima) by simulating
a population of metropolis walkers. Akin to [Simulated
Annealing](xref:microsoft.zaure.quantum.optimization.simulatedannealing), the
algorithm proceeds over a set of decreasing temperatures $T$ (or increasing
$\beta = 1/T$), but the population is resampled at each temperature step.
During resampling, some walkers are eliminated and some are multiplied according
to appropriate weights such that lower energy walkers are given a higher chance of
surviving. This has the effect of continuously consolidating search efforts around favorable
states. In this sense, population annealing shares many features with
evolutionary-type algorithms. Intuitively, one can picture population annealing
as a set of walkers spread across the configurational space of the problem. 
Each walker is free to explore its own neighborhood. Once a walker finds a 
better state, the rest of the population is gravitated toward that state.
Therefore, the algorithm is designed to take advantage of the "collective
knowledge" of the walkers to find its way toward the solution among
exponentially many configurations.  


In the context of optimization problems, the algorithm starts with an initial
population of random states at high temperature. In this regime, "bad" transitions
are still accepted with a high probability and walkers with "worse" states are not
yet penalized heavily in the resampling. At lower temperatures, the 
[Metropolis Criterion](https://aip.scitation.org/doi/10.1063/1.4904889)
strongly favors transitions which decrease the cost and resampling progressively
weeds out non-competitive states. The elimination rate of the walkers is strongly
dependent upon the size of temperature steps. Therefore, the temperature 
schedule must be slow enough such that a reasonable number of walkers (about 10%-20%)
are dropped while a relatively equal percentage of them are copied on to balance out the 
population size throughout the algorithm.

Eventually, all walkers are resampled into the same lowest-cost state discovered
("population collapse"). At this stage it is more efficient to restart the process
with a new set of random walkers (`restarts`).

## Features of population annealing on Azure Quantum

Population Annealing in Azure Quantum supports:

- Parameter-free mode and parametrized mode (with parameters)
- Ising and PUBO input formats

## When to use population annealing

Generally speaking, given enough resources, population annealing can solve
any problem that simulated annealing is used for more efficiently. 
However, due to the memory footprint of multiple walkers, 
population annealing is most suitable for very hard moderately-sized problems. 
We recommend population annealing for both sparse and dense graphs. The
algorithm might struggle for constraint problems with large penalty
terms. 

> [!NOTE]
> For further information on choosing which solver to use, please refer to
> [this document](xref:microsoft.azure.quantum.optimization.choose-solver).

## Parameter free population annealing

The parameter free version of Population Annealing is recommended for new
users, those who don't want to manually tune parameters (especially
`population`), and even as a starting point for further manual tuning. The main
parameters to be tuned for this solver are the number of `sweeps`,
`population`, `beta_start` and `beta_stop` (described in the next section).

The parameter free solver will halt on `timeout` (specified in seconds).

| Parameter Name | Description |
|----------------|-------------|
| `timeout` | Max execution time for the solver (in seconds). This is a best effort mechanism, so the solver may not stop immediately when the timeout is reached.|
| `seed (optional)` | Seed value - used for reproducing results. |

To create a parameter free Population Annealing solver for the CPU using the SDK:

```python
from azure.quantum.optimization import PopulationAnnealing
# Requires a workspace already created.
solver = PopulationAnnealing(workspace, timeout=100, seed=22)
```

The parameter-free solver will return the parameters used in the result JSON.
You can then use these parameters to solve similar problems (similar number of
variables, terms, locality and similar coefficient scale) using the
parametrized PopulationAnnealing solver.

## Parametrized population annealing

Population Annealing with specified parameters is best used if you are already
familiar with Population Annealing terminology (population, sweeps, betas)
and/or have an idea of which parameter values you intend to use. **If this is
your first time using Population Annealing for a problem, the parameter free
version is recommended.** Some of the parameters like `beta_start` and
`beta_stop` are hard to estimate without a good starting point.

Population Annealing supports the following parameters:

| Parameter Name | Description |
|----------------|-------------|
| `sweeps`       | Number of sets of iterations to run over the variables of a problem. More sweeps will usually improve the solution (unless it is already at the global min). |
| `population`   | The number of walkers in the population |
| `beta_start/beta_stop`  | Represents the starting and stopping betas of the annealing schedule. A suitable value for these parameters will depend entirely on the problem and the magnitude of its changing moves. In general a non-zero and declining acceptance probability is sufficient. |
| `restarts`              | The number of repeats of the annealing schedule to run. Each restart will start with a set of random walkers |
| `seed (optional)`                 | Seed value - used for reproducing results |

To create a parametrized Population Annealing solver for the CPU using the SDK:

```python
from azure.quantum.optimization import PopulationAnnealing
# Requires a workspace already created.
solver = PopulationAnnealing(workspace, sweeps=2, population=128, beta_start=0.1, beta_stop=1, restarts=72, seed=22)
```