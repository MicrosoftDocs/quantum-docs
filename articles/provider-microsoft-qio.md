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

## FPGA vs. CPU

For some solvers we offer two versions: an unlabeled version that runs on traditional CPUs and a labeled FPGA version. In the following table you can see the pros and cons of using FPGA solvers:

| Pros/Cons  | FPGA solvers                                                                                                                                                                                                                                                                                                                                                                                           |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pros       | <ul><li>FPGA solvers run on highly-optimized hardware that enables algorithms to parallelize very efficiently. This efficiency can provide a significant performance gain when comparing CPU and FPGA solvers.</li><li>FPGA solvers use very condensed memory representation. This means that problems with a large number of terms may fail on a CPU solver due to a lack of memory, but still run on an FPGA implementation of that solver.</li></ul> |
| Cons       | <ul><li>Microsoft FPGA solvers support up to 65535 variables. This is a hard limitation.</li><li>To achieve the best performance, FPGA solvers use 32-bit floating point operations. As a result, the accuracy of FPGA solvers is a little lower than for other CPU solvers.</li></ul>                                                                                                                                  |

### FPGA Regional Availability

FPGA-based solvers are only available in a limited set of Azure regions. When creating your Azure Quantum workspace, you can see if FPGA targets are available in the region that you selected by accessing the Microsoft QIO provider blade on the **Create** screen. Regions that offer access to FPGA solvers will display **FPGA simulated annealing** in their list of available targets. 

For existing workspaces, you can check the **Providers** blade. Select **Modify** to view your Microsoft QIO plan. If your workspace is in a region where FPGA solvers are available, **FPGA simulated annealing** will be available in the list of targets. 

### Recommendations for FPGA solvers

FPGA solvers use the same parameters as their corresponding CPU solvers. However, for the best performance you should tune the parameters of FPGA solvers instead of directly using the CPU solvers' parameters. For example, FPGA solvers build about 200 parallel pipelines, and each pipeline can handle one restart, so the restarts of FPGA solver should be no less than 200.

FPGA solvers have an initialization time that may take a large percentage of the total runtime for small problems. If your problem can be solved on a CPU solver within a number of seconds, then you will likely not see a performance gain by switching to FPGA. We recommend using FPGA solvers when the execution timing on CPU is at least several minutes.

## Pricing

For the most up-to-date pricing information on Microsoft's QIO offering, please refer to the Providers tab of your workspace on the [Azure portal](https://portal.azure.com/) or visit the [Microsoft optimization pricing page](https://azure.microsoft.com/pricing/details/azure-quantum/).

## Limits & Quotas

Microsoft QIO'S quotas are tracked based on the number of computing hours per month. 

- FPGA Job Hours: The amount of FPGA solver time you may use. Tracked both at workspace level and “region x subscription” level. 
- CPU Solver Hours: The amount of CPU solver time you may use. Tracked both at workspace level and “region x subscription” level.

Microsoft QIO also have quotas for job concurrency – separate for CPU and FPGA jobs.  

Up to date information on the various usage limits for each Microsoft QIO plan are available via the general [Azure subscription limits, quotas, and constraints](/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-quantum-limits) article. 

Quotas are based on plan selection and can be increased with a support ticket. To see your current limits and quotas, go to the “Credits and quotas” blade and select the “Quotas” tab of your workspace on the [Azure portal](https://portal.azure.com).

For more information, see [Azure Quantum quotas](xref:microsoft.quantum.providers-quotas).

## General advice for Microsoft QIO solvers

Here are some things to keep in mind when using our QIO solvers, and steps you can take to improve performance in certain cases. Be aware that other providers may have different requirements and recommendations specific to their solutions. The advice here applies to the terms that [represent your problem](xref:microsoft.quantum.optimization.express-problem) and [cost function](xref:microsoft.quantum.optimization.concepts.cost-function). Remember that a term is composed of a coefficient $c$ and a set of indices $\{i\}$.

1. Remove coefficients that exceed the computational precision:

   If the ratio of largest to smallest coefficient is greater than $2^{64}$, the term with the small coefficient will likely not be taken into account and should be removed. In other words, you should remove any terms with coefficients $|c_i| < \frac{\max{|c_j|}}{2^{64}}$.

1. Merge duplicate terms:

   If you automatically generate your terms, you may encounter some that are duplicates of each other, that is, they contain the same set of decision variables/indices. Avoiding duplicate terms will increase the performance of the solver as it has to handle fewer terms.

   Multiple terms with the same set of variables should be merged into a single term by adding up the coefficients. For example, $3 \cdot x_2 x_4 x_1$ and $2 \cdot x_1 x_4 x_2$ can be merged into the single term $5 \cdot x_1 x_2 x_4$.

1. Use integer coefficients:

   Whenever possible, you should use integers for your coefficients over floating point numbers, as these will provide greater precision.
