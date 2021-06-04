---
title: Population Annealing
description: This document provides a basic guide about how to use the Population Annealing solver in Azure Quantum.
author: andrist
ms.author: ruandris
ms.date: 05/25/2021
ms.topic: article
uid: microsoft.quantum.optimization.population-annealing
---

# Population Annealing

> [!NOTE]
> This solver is available to a subset of customers in private preview and will
> be available to all our customers soon.

[Population Annealing](https://arxiv.org/abs/1006.0252) is a sequential Monte
Carlo method which aims to alleviate the susceptibility of the Metropolis
Algorithm to rough cost landscapes (i.e., with many local minima) by simulating
a population of metropolis walkers. Akin to
[Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing),
the algorithm proceeds over a set of decreasing temperatures $T$ (or increasing
$\beta = 1/T$), but the population is resampled at each temperature step.
During resampling, some walkers are removed and some are duplicated
(with a bias towards retaining lower cost walkers). This has the effect of
continuously consolidating search efforts around favorable states. In this
sense, Population Annealing shares many features with evolutionary-type
algorithms.

Intuitively, one can picture Population Annealing as a set of
walkers spread across the configuration space of the problem. Each walker is
free to explore its own neighborhood. Once a walker finds a better state, the
rest of the population is gravitated toward that state.  Therefore, the
algorithm is designed to take advantage of the "collective knowledge" of the
walkers to find its way toward the solution.

In the context of optimization problems, the algorithm starts with an initial
population of random states at high temperature. In this regime, "bad" transitions
are still accepted with a high probability and the bias towards lower-cost walkers
in the resampling is weak. At lower temperatures, the
[Metropolis Criterion](https://aip.scitation.org/doi/10.1063/1.4904889)
strongly favors transitions which decrease the cost and resampling progressively
weeds out non-competitive states. The removal rate during resampling
depends on the size of the individual temperature steps. Therefore, the temperature
schedule must be slow enough such that a reasonable number of walkers (about 10%-20%)
are dropped while roughly the same number of them are copied to keep the population
size stable.

Eventually, all walkers are resampled into the same lowest-cost state discovered
("population collapse"). At this stage it is more efficient to restart the process
with a new set of random walkers (`restarts`).

## Features of Population Annealing on Azure Quantum

Population Annealing in Azure Quantum supports:

- Parameterized mode
- Ising and PUBO input formats

## When to use Population Annealing

Generally speaking, given enough resources, Population Annealing can solve any
problem that
[Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing)
is used for more efficiently. However, due to
the memory footprint of multiple walkers, Population Annealing is most suitable
for very hard moderately-sized problems.  We recommend Population Annealing for
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
| `sweeps`             |10000      | Number of sweeps. More sweeps will usually improve the solution (unless it is already at the global minimum). |
| `beta`                   | linear `0`..`5` | Annealing schedule (beta must be increasing) |
| `population`             | _number of threads_ | The number of walkers in the population (must be positive). |
| `seed`                   | _time based_    | Seed value - used for reproducing results. |

To create a parameterized Population Annealing solver for the CPU using the SDK:

```python
from azure.quantum.optimization import PopulationAnnealing, RangeSchedule
# Requires a workspace already created.
solver = PopulationAnnealing(workspace, sweeps=200, beta=RangeSchedule("linear", 0, 5), population=128, seed=42)
```

Running the solver without parameters will apply the default parameters shown in the table above. These default values are subject to change and we strongly recommend setting the values based on your problem rather than using the defaults.
