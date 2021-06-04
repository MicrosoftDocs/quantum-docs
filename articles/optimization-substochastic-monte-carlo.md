---
title: Substochastic Monte Carlo
description: This document provides a basic guide about how to use the Substochastic Monte Carlo solver in Azure Quantum.
author: andrist
ms.author: ruandris
ms.date: 05/25/2021
ms.topic: article
uid: microsoft.quantum.optimization.substochastic-monte-carlo
---

# Substochastic Monte Carlo

> [!NOTE]
> This solver is available to a subset of customers in private preview and will
> be available to all our customers soon.

[Substochastic Monte Carlo](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.94.042318) is a
diffusion Monte Carlo algorithm inspired by adiabatic quantum computation. It
simulates the diffusion of a population of walkers in search space, while
walkers are removed or duplicated based on how they perform according the cost
function.

The initial set of walkers consists of random starting points (`target_population` =
number of walkers), which are subjected to *random* transitions and a
resampling process parameterized by `alpha` and `beta`:

  * `alpha`: The probability of making a random transition (single variable
    change in the context of binary models)
  * `beta`: The factor to apply when resampling the population (higher values
    for `beta` favor low-cost states more heavily)

Like
[Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing) or
[Population Annealing](xref:microsoft.quantum.optimization.population-annealing),
the parameters `alpha` and `beta` are typically chosen in a time-dependent
form, with `alpha` decreasing over time and `beta` increasing. This has the
effect that the simulation focuses on exploration initially, and optimization
later. Note that `beta` is not the same as inverse temperature in other
annealing-based optimization methods, although it does govern roughly the same
effect: when `beta` is small walkers are free to explore the space, but when
`beta` gets large walkers in poor configurations are likely to be removed while
those in good regimes will duplicate.

## Features of Substochastic Monte Carlo on Azure Quantum

Substochastic Monte Carlo in Azure Quantum supports:

- Parameterized mode
- Ising and PUBO input formats

## When to use Substochastic Monte Carlo

Substochastic Monte Carlo exhibits a tunneling-like property, akin to quantum
adiabatic evolution, through the combination of diffusion and resampling.
Hence it is likely to find best use in problems obtained from constrained
optimization where the constraints cause severe nonconvexity that traps
sequential methods such as
[Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing)
or
[Tabu Search](xref:microsoft.quantum.optimization.tabu).
If long runs of Simulated Annealing or Tabu Search are returning diverse
values, then it is likely they are being trapped by a rough optimization
landscape. In this case Substochastic Monte Carlo with a modest population size
would be a good alternative to try.

> [!NOTE]
> For further information on choosing which solver to use, please refer to
> [this document](xref:microsoft.quantum.optimization.choose-solver).

## Parameterized Substochastic Monte Carlo

Suitable values for the `target_population`, `step_limit` and the resampling
schedule depend on the problem and the magnitude (cost difference) of its
variable changes.

  * Modest `target_population` sizes (10-100) tend to work best. While some problems
    can benefit from larger populations, often one sees diminishing returns on
    effort to success.

  * The `beta_start`, `beta_stop` range from
    [Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing)
    can be a helpful guidance for the resampling parameter schedule.

  * Substochastic Monte Carlo performs individual variable updates between
    resampling (rather than full sweeps). As a result the `step_limit` should
    be higher as compared to, e.g., Simulated Annealing.


Substochastic Monte Carlo supports the following parameters:

| Parameter Name           | Default Value   | Description |
|--------------------------|-----------------|-------------|
| `step_limit`             | 10000      | Number of monte carlo steps. More steps will usually improve the solution (unless it is already at the global minimum). |
| `target_population`      | _number of threads_ | The number of walkers in the population (should be greater-equal 8). |
| `alpha`                  | linear `1`..`0` | Schedule for the stepping chance (must be decreasing, i.e. `alpha.initial > alpha.final`). |
| `beta`                   | linear `0`..`5` | Schedule for the resampling factor (must be increasing, i.e. `beta.initial < beta.final`). |
| `seed (optional)`        | _time based_    | Seed value - used for reproducing results. |

To create a parameterized Substochastic Monte Carlo solver for the CPU using the SDK:

```python
from azure.quantum.optimization import SubstochasticMonteCarlo, RangeSchedule
# Requires a workspace already created.
solver = SubstochasticMonteCarlo(workspace, step_limit=10000, target_population=64, beta=RangeSchedule("linear", 0, 5), seed=42)
```

Running the solver without parameters will apply the default parameters shown in the table above. These default values are subject to change and we strongly recommend setting the values based on your problem rather than using the defaults.
