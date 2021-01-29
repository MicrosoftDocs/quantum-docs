---
title: Simulated annealing
description: This document provides a basic guide about how to use the simulated annealing solver in Azure Quantum.
author: adelebai
ms.author: adbai
ms.date: 01/13/2021
ms.topic: article
uid: microsoft.quantum.optimization.simulated-annealing
---

# Simulated annealing 

[Simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing) is a Monte Carlo search method named from the the heating-cooling methodology of metal annealing. The algorithm simulates a state of varying temperatures where the temperature of a state (in our implementation, represented by parameter beta - the inverse of temperature with the Boltzmann constant set to 1 ($\beta = 1 / T$)) influences the decision making probability at each step.

In the context of optimization problems, the algorithm starts at an initial high temperature state (low beta, or `beta_start`) where "bad" moves in the system are accepted with a higher probability, and slowly "cools" on each sweep until the state reaches the lowest specified temperature (high beta, or `beta_stop`). At lower temperatures, moves that do not improve the objective value are less likely to be accepted.

When sweeping for a binary problem, each decision variable is "flipped" based on the objective value impact of that flip. Flips that improve the objective value will be accepted automatically, while moves that do not improve the objective value are accepted on a probabilistic basis, calculated via the [Metropolis Criterion](https://aip.scitation.org/doi/10.1063/1.4904889).

## Features of simulated annealing on Azure Quantum

Simulated annealing in Azure Quantum supports:

- Parameter-free mode and parametrized mode (with parameters)
- Ising and PUBO input formats
- CPU & FPGA hardware (see below for instructions on how to use both)

## When to use simulated annealing

Simulated annealing is a standard jack-of-all-trades algorithm that performs well on many kinds of problems. It is recommended to start with this algorithm as it will reliably produce good quality and fast solution to most problems.

It is also a good algorithm for larger problems (thousands of variables).

> [!NOTE]
> For further information on determining which solver to use, refer to [Which optimization solver should I use?](xref:microsoft.quantum.optimization.choose-solver).

## Parameter-free simulated annealing (CPU)

The parameter-free version of simulated annealing is recommended for new users, those who don't want to manually tune parameters (especially betas), and even as a starting point for further manual tuning. The main parameters to be tuned for this solver are the number of `sweeps`, `beta_start` and `beta_stop` (described in the next section).

The parameter-free solver will halt either on `timeout` (specified in seconds) or when there is sufficient convergence on a solution.

| Parameter Name | Description |
|----------------|-------------|
| `timeout` | Max execution time for the solver (in seconds). This is a best effort mechanism, so the solver may not stop immediately when the timeout is reached.|
| `seed (optional)` | Seed value - used for reproducing results. |

To create a parameter-free simulated annealing solver for the CPU using the SDK:

```python
from azure.quantum.optimization import SimulatedAnnealing
# Requires a workspace already created.
solver = SimulatedAnnealing(workspace, timeout=100, seed=22)
```

The parameter-free solver will return the parameters used in the result JSON. You can then use these parameters to solve similar problems (similar numer of variables, terms, locality and similar coefficient scale) using the parametrized simulated annealing solver.

## Parametrized simulated annealing (CPU)

Simulated annealing with specified parameters is best used if you are already familiar with simulated annealing terminology (sweeps, betas) and/or have an idea of which parameter values you intend to use. **If this is your first time using simulated annealing for a problem, the parameter-free version is recommended.** Some of the parameters like `beta_start` and `beta_stop` are hard to estimate without a good starting point.

Simulated annealing supports the following parameters:

| Parameter Name | Description |
|----------------|-------------|
| `sweeps`       | Number of sets of iterations to run over the variables of a problem. More sweeps will usually improve the solution (unless it is already at the global min).|
| `beta_start/beta_stop`  | Represents the starting and stopping betas of the annealing schedule. A suitable value for these parameters will depend entirely on the problem and the magnitude of its changing moves. In general a non-zero and declining acceptance probability is sufficient. |
| `restarts`              | The number of repeats of the annealing schedule to run. Each restart will start with a random configuration **unless an initial configuration is supplied in the problem file.** The restarts will be executed in parallel and split amongst the threads of the VM. Recommended to set this value to at least 72.|
| `seed (optional)`                 | Seed value - used for reproducing results |

To create a parametrized simulated annealing solver for the CPU using the SDK:

```python
from azure.quantum.optimization import SimulatedAnnealing
# Requires a workspace already created.
solver = SimulatedAnnealing(workspace, sweeps=2, beta_start=0.1, beta_stop=1, restarts=72, seed=22)
```

## Simulated annealing (FPGA)

The simulated annealing solver is also available on FPGA hardware for both parameter and parameter-free modes. The parameters are the same as in the CPU versions.

This section will describe the advantages and disadvantages of using the FPGA solver. Users are encouraged to make an informed decision based on their own problem features.

### When to use FPGA simulated annealing

FPGA solvers have some built-in costs like PCIe transfers, FPGA device initialization etc. If an optimization problem is too small (for example, the CPU execution takes seconds), then the built-in cost of FPGA hardware will be the bulk of the cost, with minimal solution benefits. Thus, it is recommended to use FPGA solvers when the execution time on the CPU is minutes or higher.

### Advantages of FPGA simulated annealing

- Highly optimized for parallelization. Compared to the equivalent CPU simulated annealing solver with the same parameters, the FPGA simulated annealing solver is on average 10 times faster.
- Highly condensed memory representation. A problem with a large number of terms may fail on a CPU solver due to memory limits, but may fit on FPGA hardware.

The performance gain may not be obvious for the parameter-free mode because both algorithms are gated by a `timeout` setting (which halts most problems). However on FPGA hardware, the solver most likely will run many more sweeps in the same amount of time than on the CPU.

### Limitations of FPGA simulated annealing

- the FPGA solver supports up to **65535 variables**, and this is a hard limitation. This number is limited by the available DRAM, and this is generally not a issue for FPGA (since most problems are smaller than 65535).
- For best performance, FPGA solvers on Azure Quantum use 32 bit floating-point operations. Because of this, the computation accuracy of FPGA solvers is a little lower than that of the CPU solvers.

### Parameter guide for FPGA simulated annealing

FPGA simulated annealing uses the same parameters as the corresponding CPU solver, but it is still recommended to tune the parameters of FPGA solvers separately instead of using pre-tuned parameters from CPU solvers.

It is also recommended to set the number of restarts to at least 216 if using the FPGA solver, as it can support a higher degree of parallelization.

To create a simulated annealing solver for the FPGA using the SDK, simply specify the platform option as follows:

```python
solver = SimulatedAnnealing(workspace, timeout=100, seed=22, platform=HardwarePlatform.FPGA)
```

For the parametrized version:

```python
from azure.quantum.optimization import SimulatedAnnealing
# Requires a workspace already created.
solver = SimulatedAnnealing(workspace, sweeps=2, beta_start=0.1, beta_stop=1, restarts=72, seed=22, platform=HardwarePlatform.FPGA)
```
