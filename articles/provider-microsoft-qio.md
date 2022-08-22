---
author: SoniaLopezBravo
description: This document provides the technical details of the Microsoft QIO provider
ms.author: sonialopez
ms.date: 10/25/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Microsoft QIO provider overview
uid: microsoft.quantum.optimization.providers.microsoft.qio
---

# Microsoft QIO provider

The Microsoft QIO provider is enabled in every Quantum workspace.

- Publisher: [Microsoft](https://microsoft.com)
- Provider ID: `microsoft`


## Targets 

In the following table you can find a brief description and a comparison between the available targets:

| Name                     | Description                                                                                                                                                                                                                                                                    | Best applicable scenario                                                                                                                         |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| [Parallel Tempering](xref:microsoft.quantum.optimization.parallel-tempering)| Rephrases the optimization problem as a thermodynamic system and runs multiple copies of a system, randomly initialized, at different temperatures. Then, based on a specific protocol, exchanges configurations at different temperatures to find the optimal configuration.  | <ul><li>Generally outperforms Simulated Annealing on hard problems with rugged landscapes</li><li> Very good at solving Ising problems</li></ul> |
| [Simulated Annealing](xref:microsoft.quantum.optimization.simulated-annealing)| Rephrases the optimization problem as a thermodynamic system and considers the energy of a single system. Changes to the system are accepted  if they decrease the energy or meet a criterion based on decreasing temperature.                                                 | <ul><li>Convex landscapes</li></ul>                                                                                                              |
| [Population Annealing](xref:microsoft.quantum.optimization.population-annealing)| Aims to alleviate the susceptibility of the Metropolis Algorithm to rough cost landscapes by simulating a population of metropolis walkers, which continuously consolidates search efforts around favorable states.                                                 | <ul><li>We recommend Population Annealing for both sparse and dense graphs.</li><li>The algorithm might not be suitable for constraint problems with large penalty terms.</li></ul>                                                                                                              |
| [Quantum Monte Carlo](xref:microsoft.quantum.optimization.quantum-monte-carlo) | Similar to Simulated Annealing but the changes are by simulating quantum-tunneling through barriers rather  than using thermal energy jumps.                                                                                                                                   | <ul><li>Optimization landscape has tall and thin barriers</li><li>Due to its large overhead, is useful for small hard problems</li></ul>         |
| [Substochastic Monte Carlo](xref:microsoft.quantum.optimization.substochastic-monte-carlo)| Substochastic Monte Carlo is a diffusion Monte Carlo algorithm inspired by adiabatic quantum computation. It simulates the diffusion of a population of walkers in search space, while walkers are removed or duplicated based on how they perform according to the cost function.                                                                                                                                   | <ul><li>The algorithm is suitable for rough optimization landscapes where Simulated Annealing or Tabu Search might return a diverse set of solutions.</li></ul>         |
| [Tabu Search](xref:microsoft.quantum.optimization.tabu)| Tabu Search looks at neighboring configurations.  It can accept worsening moves if no improving moves are available and prohibit moves to previously visited solutions                                                                                                        | <ul><li>Convex landscapes, high-density problems, QUBO problems.</li></ul>                                                                       |

## Pricing

For the most up-to-date pricing information on Microsoft's QIO offering, please refer to the **Providers** tab of your workspace in the [Azure portal](https://portal.azure.com/) or visit the [Microsoft optimization pricing page](https://azure.microsoft.com/pricing/details/azure-quantum/).

## Limits & Quotas

Microsoft QIO quotas are tracked based on the number of computing hours per month.

- CPU Solver Hours: The amount of CPU solver time you may use. Tracked both at workspace level and “region x subscription” level.

Microsoft QIO also has quotas for job concurrency.  

Up to date information on the various usage limits for each Microsoft QIO plan are available via the general [Azure subscription limits, quotas, and constraints](/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-quantum-limits) article. 

Quotas are based on plan selection and can be increased with a support ticket. For more information, see [Azure Quantum quotas](xref:microsoft.quantum.quotas).

To see your current limits and quotas, go to the “Credits and quotas” blade and select the “Quotas” tab of your workspace on the [Azure portal](https://portal.azure.com).


## General advice for Microsoft QIO solvers

Here are some things to keep in mind when using our QIO solvers, and steps you can take to improve performance in certain cases. Be aware that other providers may have different requirements and recommendations specific to their solutions. The advice here applies to the terms that [represent your problem](xref:microsoft.quantum.optimization.express-problem) and [cost function](xref:microsoft.quantum.optimization.concepts.cost-function). Remember that a term is composed of a coefficient $c$ and a set of indices $\{i\}$.

1. Remove coefficients that exceed the computational precision:

   If the ratio of largest to smallest coefficient is greater than $2^{64}$, the term with the small coefficient will likely not be taken into account and should be removed. In other words, you should remove any terms with coefficients $|c_i| < \frac{\max{|c_j|}}{2^{64}}$.

1. Merge duplicate terms:

   If you automatically generate your terms, you may encounter some that are duplicates of each other, that is, they contain the same set of decision variables/indices. Avoiding duplicate terms will increase the performance of the solver as it has to handle fewer terms.

   Multiple terms with the same set of variables should be merged into a single term by adding up the coefficients. For example, $3 \cdot x_2 x_4 x_1$ and $2 \cdot x_1 x_4 x_2$ can be merged into the single term $5 \cdot x_1 x_2 x_4$.

1. Use integer coefficients:

   Whenever possible, you should use integers for your coefficients over floating point numbers, as these will provide greater precision.
