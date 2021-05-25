---
title: Substochastic Monte Carlo
description: This document provides a basic guide about how to use the Substochastic Monte Carlo solver in Azure Quantum.
author: andrist
ms.author: ruandris
ms.date: 05/25/2021
ms.topic: article
uid: azure.quantum.optimization.substochastic-monte-carlo
---

# Substochastic Monte Carlo 

[Substochastic Monte Carlo](https://arxiv.org/pdf/1607.03389.pdf) is a
diffusion Monte Carlo algorithm inspired by adiabatic quantum computation.
It simulates the diffusion of a population of walkers in search space, while
the cost function governs the rate at which walkers are removed or duplicated.

The initial set of walkers consists of random starting points
(`population` = number of walkers), which are subjected to *random* transitions
and a cost-based birth-death process parametrized by `alpha` and `beta`:

  * `alpha`: The probability of making a random transition (single spin flip
    in the context of binary models)
  * `beta`: The probability of applying birth/death dynamics according to the
    state's cost.

`alpha` and `beta` are typically chosen in a time-dependent form, with `alpha`
decreasing over time and `beta` increasing. This has the effect that the
simulation focuses on exploration initially, followed by a transition to an
optimization regime.

> [!NOTE]
> The beta parameter in SSMC is not an inverse Temperature as seen in other
> Monte Carlo based optimization methods.

For best optimization results, SSMC is typically restarted multiple times with
a fresh set of randomly placed walkers. This can be controlled with the
`restarts` parameter.

## Features of substochastic Monte Carlo on Azure Quantum

Substochastic Monte Carlo in Azure Quantum supports:

- Parameter-free mode and parametrized mode (with parameters)
- Ising and PUBO input formats

## When to use substochastic Monte Carlo

> [!TODO]
> TODO(ruandris): Fill this section on what we recommend the algorithm for.

> [!NOTE]
> For further information on choosing which solver to use, please refer to
> [this document](xref:microsoft.quantum.optimization.choose-solver).

## Parameter-free substochastic Monte Carlo

The parameter free version of Substochastic Monte Carlo is recommended for new
users, those who don't want to manually tune parameters (especially `alpha` and `beta`), and
even as a starting point for further manual tuning. The main parameters to be
tuned for this solver are the number of `population`, `alpha`, `beta` and `restarts`
(described in the next section).

The parameter free solver will halt on `timeout` (specified in seconds)

| Parameter Name | Description |
|----------------|-------------|
| `timeout` | Max execution time for the solver (in seconds). This is a best effort mechanism, so the solver may not stop immediately when the timeout is reached.|
| `seed (optional)` | Seed value - used for reproducing results. |

To create a parameter free Substochastic Monte Carlo solver for the CPU using the SDK:

```python
from azure.quantum.optimization import SubstochasticMonteCarlo
# Requires a workspace already created.
solver = SubstochasticMonteCarlo(workspace, timeout=100, seed=22)
```

The parameter-free solver will return the parameters used in the result JSON.
You can then use these parameters to solve similar problems (similar number of
variables, terms, locality and similar coefficient scale) using the
parametrized Substochastic Monte Carlo solver.

## Parametrized substochastic Monte Carlo

Substochastic Monte Carlo with specified parameters is best used if you are
already familiar with Substochastic Monte Carlo terminology (`population`,
`alpha`, `beta`, `restarts`) and/or have an idea of which parameter values you
intend to use. **If this is your first time using Substochastic Monte Carlo for
a problem, the parameter free version is recommended.**

Substochastic Monte Carlo supports the following parameters:

| Parameter Name | Description |
|----------------|-------------|
| `timeout`      | |
| `population`   | |
| `alpha`        | |
| `beta`         | |
| `restarts`     | The number of repeats of the annealing schedule to run. Each restart will start with a random configuration **unless an initial configuration is supplied in the problem file.** |
| `seed (optional)`                 | Seed value - used for reproducing results |

To create a parametrized Substochastic Monte Carlo solver for the CPU using the SDK:

```python
from azure.quantum.optimization import SubstochasticMonteCarlo
# Requires a workspace already created.
solver = SubstochasticMonteCarlo(workspace, population=128, restarts=100, seed=42)
```
