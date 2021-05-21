---
author: KittyYeungQ
description: This document provides the technical details of the Microsoft QIO provider
ms.author: kitty
ms.date: 02/01/2021
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

The Microsoft QIO provider makes the following targets available:

- [Solver: Simulated Annealing (Parameter-free)](xref:microsoft.quantum.optimization.simulated-annealing#parameter-free-simulated-annealing-cpu)
- [Solver: Simulated Annealing (Parameter-free - FPGA)](xref:microsoft.quantum.optimization.simulated-annealing#simulated-annealing-fpga)
- [Solver: Simulated Annealing (Parametrized)](xref:microsoft.quantum.optimization.simulated-annealing#parametrized-simulated-annealing-cpu)
- [Solver: Simulated Annealing (Parametrized - FPGA)](xref:microsoft.quantum.optimization.simulated-annealing#simulated-annealing-fpga)
- [Solver: Parallel Tempering (Parameter-free)](xref:microsoft.quantum.optimization.parallel-tempering#parameter-free-parallel-tempering)
- [Solver: Parallel Tempering (Parametrized)](xref:microsoft.quantum.optimization.parallel-tempering#parametrized-parallel-tempering)
- [Solver: Tabu Search (Parameter-free)](xref:azure.quantum.optimization.tabu#parameter-free-tabu-search)
- [Solver: Tabu Search (Parametrized)](xref:azure.quantum.optimization.tabu#parametrized-tabu-search)
- [Solver: Quantum Monte Carlo (Parametrized)](xref:microsoft.quantum.optimization.quantum-monte-carlo#parameterized-quantum-monte-carlo-cpu)

## Target Comparison

In the following table you can find a brief comparison between the available targets:

| **Name**                     | **Description**                                                                                                                                                                                                                                                                | **Best applicable scenario**                                                                                                                        |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Parallel Tempering           | Rephrases the optimization problem as a thermodynamic system and runs multiple copies of a system, randomly initialized, at different temperatures. Then, based on a specific protocol, exchanges configurations at different temperatures to find the optimal configuration.  |  <ul><li>Generally outperforms Simulated Annealing on hard problems with rugged landscapes</li><li> Very good at solving Ising problems</li></ul>   |
| Simulated Annealing          | Rephrases the optimization problem as a thermodynamic system and considers the energy of a single system. Changes to the system are accepted  if they decrease the energy or meet a criterion based on decreasing temperature.                                                 | <ul><li>Convex landscapes</li></ul>                                                                    |
| Quantum Monte Carlo  |  Similar to Simulated Annealing but the changes are by simulating quantum-tunneling through barriers rather  than using thermal energy jumps.                                                                                                                                  |  <ul><li>Optimization landscape has tall and thin barriers</li><li>Due to its large overhead, is useful for small hard problems</li></ul>           |
| Tabu Search                  | Tabu Search looks at neighboring configurations.  It can accept worsening moves if no improving moves are available  and prohibit moves to previously-visited solutions                                                                                                        |   <ul><li>Convex landscapes, high density problems, QUBO problems.</li></ul>                                         |           |

### FPGA vs. CPU

For some solvers we offer two versions: an unlabeled version that runs on traditional CPUs and a labeled FPGA version. In the following table you can see the pros and cons of using FPGA solvers:

| Pros/Cons  | FPGA solvers                                                                                                                                                                                                                                                                                                                                                                        |
|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pros | <ul><li>Highly parallel optimized, compared with CPU solvers, we witnessed up to 18 times performance gain (compared with 72 cpu cores) when the simulated annealing parameters settings are the same (restarts and sweeps).</li><li>FPGA solver use very condensed memory representation, so for problem with a large number of terms may fail CPU solver for OOM, but not for FPGA solver.</li></ul> |
| Cons | <ul><li>FPGA solver support up to 65535 variables, this is a hard limitation.</li><li>For best performance, FPGA solvers use 32 bits float point operations, because of this, the computation accuracy of FPGA solvers is a little lower than CPU solvers'.</li></ul>                                                                                                                 |

#### FPGA Regional Availability

FPGA-based solvers are only available to workspaces deployed in the following Azure Regions:

| Region |
|--------|
| West US |
| East US |

#### Recommendations for FPGA solvers

FPGA solvers use the same parameters as their corresponding CPU solvers, but for the best performance, please tune the parameters of FPGA solvers, instead of just directly using CPU solvers' parameters. For example, in FPGA solvers, we build about 200 parallel pipelines, and each pipeline can handle one restart, so the restarts of FPGA shall be no less than 200.

FPGA solvers have an initialization time that may take a large percentage of the total runtime for small problems. If your problem can be solved on a CPU solver within a number of seconds, then you will likely not see a performance gain by switching to an FPGA. We recommend using FPGA solvers when the execution timing on CPU is at least a couple minutes.

## Pricing

For the most up-to-date pricing information on Microsoft's QIO offering, please refer to the Providers tab of your workspace on the [Azure portal](https://portal.azure.com/) or visit the [Azure Quantum pricing page](https://azure.microsoft.com/pricing/details/azure-quantum/).

## General advice for Microsoft QIO solvers

Here are some things to keep in mind when using our QIO solvers, and steps you can take to improve performance in certain cases. Note that other providers might have different requirements and recommendations specific to their solutions. The advice below applies to the terms that [represent your problem](xref:microsoft.quantum.optimization.express-problem) and [cost function](xref:microsoft.quantum.optimization.concepts.cost-function). Remember that a term is composed of a coefficient $c$ and a set of indices $\{i\}$.

1. Remove coefficients that exceed the computational precision:

   If the ratio of largest to smallest coefficient is greater than $2^{64}$, the term with the small coefficient will likely not be taken into account and should be removed. In other words, you should remove any terms with coefficients $|c_i| < \frac{\max{|c_j|}}{2^{64}}$.

1. Merge duplicate terms:

   If you automatically generate your terms, you may encounter some that are duplicates of each other, that is, they contain the same set of decision variables/indices. Avoiding duplicate terms will increase the performance of the solver as it has to handle fewer terms.

   Multiple terms with the same set of variables should be merged into a single term by adding up the coefficients. For example, $3 \cdot x_2 x_4 x_1$ and $2 \cdot x_1 x_4 x_2$ can be merged into the single term $5 \cdot x_1 x_2 x_4$.

1. Use integer coefficients:

   Whenever possible, you should use integers for your coefficients over floating point numbers, as these will provide greater precision.
