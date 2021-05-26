---
title: Population Annealing
description: This document provides a basic guide about how to use the Population Annealing solver in Azure Quantum.
author: andrist
ms.author: ruandris
ms.date: 05/25/2021
ms.date: 05/14/2021
ms.topic: article
uid: quantum.optimization.population-annealing
---

> [!NOTE]
> This solver is available to a subset of customers in private preview and will
> be available to all our customers soon.

# Population Annealing

[Population Annealing](https://arxiv.org/abs/1006.0252) is a sequential Monte
Carlo method which aims to alleviate the susceptibility of the Metropolis
Algorithm to rough cost landscapes (i.e., with many local minima) by simulating
a population of metropolis walkers. Akin to
[Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing),
the algorithm proceeds over a set of decreasing temperatures $T$ (or increasing
$\beta = 1/T$), but the population is resampled at each temperature step.
During resampling, some walkers are removed and some are duplicated
according to appropriate weights such that lower energy walkers are given a
higher chance of surviving. This has the effect of continuously consolidating
search efforts around favorable states. In this sense, population annealing
shares many features with evolutionary-type algorithms. Intuitively, one can
picture population annealing as a set of walkers spread across the
configurational space of the problem.  Each walker is free to explore its own
neighborhood. Once a walker finds a better state, the rest of the population is
gravitated toward that state.  Therefore, the algorithm is designed to take
advantage of the "collective knowledge" of the walkers to find its way toward
the solution among exponentially many configurations.

In the context of optimization problems, the algorithm starts with an initial
population of random states at high temperature. In this regime, "bad" transitions
are still accepted with a high probability and walkers with "worse" states are not
yet penalized heavily in the resampling. At lower temperatures, the
[Metropolis Criterion](https://aip.scitation.org/doi/10.1063/1.4904889)
strongly favors transitions which decrease the cost and resampling progressively
weeds out non-competitive states. The removal rate of the walkers is strongly
dependent upon the size of temperature steps. Therefore, the temperature
schedule must be slow enough such that a reasonable number of walkers (about 10%-20%)
are dropped while a relatively equal percentage of them are copied on to balance out the
population size throughout the algorithm.

Eventually, all walkers are resampled into the same lowest-cost state discovered
("population collapse"). At this stage it is more efficient to restart the process
with a new set of random walkers (`restarts`).

## Features of Population Annealing on Azure Quantum

Population Annealing in Azure Quantum supports:

- Parameterized mode
- Ising and PUBO input formats

## When To Use Population Annealing

Generally speaking, given enough resources, population annealing can solve any
problem that
[Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing)
is used for more efficiently.However, due to
the memory footprint of multiple walkers, population annealing is most suitable
for very hard moderately-sized problems.  We recommend population annealing for
both sparse and dense graphs. The algorithm might struggle for constraint
problems with large penalty terms.

> [!NOTE]
> For further information on choosing which solver to use, please refer to
> [this document](xref:microsoft.quantum.optimization.choose-solver).

## Parameterized Population Annealing

Suitable values for the `population` size and the annealing schedule `beta`,
will depend entirely on the problem and the magnitude (cost difference) of its
variable changes.

A good starting point for Population Annealing is to use the beta range from
[Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing)
(`beta_start` and `beta_stop`) for the annealing schedule while renaming the
`restarts` parameter to `population`.

Population Annealing supports the following parameters:

| Parameter Name           | Default Value   | Description |
|--------------------------|-----------------|-------------|
| `step_limit`             | _required_      | Number of Monte Carlo steps. More steps will usually improve the solution (unless it is already at the global minimum). |
| `beta`                   | linear `0`..`5` | Annealing schedule (beta must be increasing) |
| `population`             | _number of threads_ | The number of walkers in the population (must be positive). |
| `seed` (optional)        | _time based_    | Seed value - used for reproducing results. |

To create a parameterized Population Annealing solver for the CPU using the SDK:

```python
from azure.quantum.optimization import PopulationAnnealing, RangeSchedule
# Requires a workspace already created.
solver = PopulationAnnealing(workspace, step_limit=200, beta=RangeSchedule("linear", 0, 5), population=128, seed=42)
```
