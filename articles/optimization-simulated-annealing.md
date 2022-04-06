---
author: bradben
description: This document provides a basic guide about how to use the simulated annealing solver in Azure Quantum.
ms.author: brbenefield
ms.date: 04/05/2022
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Simulated annealing
uid: microsoft.quantum.optimization.simulated-annealing
---

# Simulated annealing 

[Simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing) is a Monte Carlo search method named from the heating-cooling methodology of metal annealing. The algorithm simulates a state of varying temperatures where the temperature of a state influences the decision-making probability at each step. In the implementation of this solver, the temperature of a state is represented by parameter beta - the inverse of temperature with the Boltzmann constant set to 1 ($\beta = 1 / T$).
In the context of optimization problems, the algorithm starts at an initial high-temperature state where "bad" moves in the system are accepted with a higher probability (low beta, or `beta_start`), and then slowly "cools" on each sweep until the state reaches the lowest specified temperature (high beta, or `beta_stop`). At lower temperatures, moves that don't improve the objective value are less likely to be accepted.

When the solver is sweeping for a binary problem, each decision variable is "flipped" based on the objective value impact of that flip. Flips that improve the objective value are accepted automatically. Flips that don't improve the objective value are accepted on a probabilistic basis, calculated via the [Metropolis Criterion](https://aip.scitation.org/doi/10.1063/1.4904889).

## Features of simulated annealing on Azure Quantum

Simulated annealing in Azure Quantum supports:

- Parameter-free mode and parameterized mode
- [Ising](xref:microsoft.quantum.optimization.concepts.ising-model) and [PUBO](xref:microsoft.quantum.optimization.concepts.binary-optimization#polynomial-unconstrained-binary-optimization-pubo) input formats 
- CPU hardware ([parameter-free](#parameter-free-simulated-annealing-cpu) and [parameterized](#parameterized-simulated-annealing-cpu))
- [FPGA](#simulated-annealing-fpga) hardware

## When to use simulated annealing

Simulated annealing is a standard jack-of-all-trades algorithm that performs well on many types of problems. It's recommended to start with this algorithm as it will reliably and quickly produce quality solutions to most problems.

It's also a good algorithm for larger problems, such as those containing thousands of variables.

> [!NOTE]
> For more information on determining which solver to use, see [Which optimization solver should I use?](xref:microsoft.quantum.optimization.choose-solver).

## Parameter-free simulated annealing (CPU)

The parameter-free version of simulated annealing is recommended for 

- new users
- users who don't want to manually tune parameters (especially betas) 
- users who want a starting point for further manual tuning. 

The parameter-free solver will halt either on `timeout` (specified in seconds) or when there's sufficient convergence on a solution. A seed can be supplied to reproduce results. 

| Parameter Name | Description |
|----------------|-------------|
| `timeout` | Max execution time for the solver (in seconds). This parameter is a best-effort mechanism, so the solver may not stop immediately when the timeout is reached.|
| `seed` (optional) | Seed value, used for reproducing results. |
| `platform` (optional) | Defaults to CPU. Sets the hardware platform to either `HardwarePlatform.FPGA` or `HardwarePlatform.CPU`. |

To create a parameter-free simulated annealing solver for the CPU platform using the SDK:

```python
from azure.quantum.optimization import SimulatedAnnealing
# Requires a workspace already created.
solver = SimulatedAnnealing(workspace, timeout=100, seed=22)
```

The parameter-free solver returns the parameters that it used in the result JSON. You can then use these parameters to solve similar problems using the parameterized simulated annealing solver. These could be problems using a similar number of variables, terms, locality or a similar coefficient scale.

Running the solver without any parameters defaults to the parameter-free version:

```python
from azure.quantum.optimization import SimulatedAnnealing
# Requires a workspace already created.
# Not specifying any parameters runs the parameter-free version of the solver.
solver = SimulatedAnnealing(workspace)
```

## Parameterized simulated annealing (CPU)

Simulated annealing with specified parameters is best used if you're already familiar with simulated annealing terminology (sweeps, betas) or have an idea of which parameter values you intend to use. **If this is your first time using simulated annealing for a problem, the parameter-free version is recommended.** Some of the parameters like `beta_start` and `beta_stop` are difficult to estimate without a good starting point.

Simulated annealing supports the following parameters:

| Parameter Name | Description |
|----------------|-------------|
| `sweeps`       | Number of sets of iterations to run over the variables of a problem. More sweeps will usually improve the solution (unless it's already at the global min).|
| `beta_start/beta_stop`  | Represents the starting and stopping betas of the annealing schedule. A suitable value for these parameters depends entirely on the problem and the magnitude of its changing moves. A non-zero and declining acceptance probability is usually sufficient. |
| `restarts`              | The number of repeats of the annealing schedule to run. Each restart starts with a random configuration **unless an initial configuration is supplied in the problem file.** The restarts are run in parallel and split amongst the threads of the VM. The recommended value is 72 or greater.|
| `seed` (optional)                 | Seed value, used for reproducing results |
| `platform` (optional) | Defaults to CPU. Sets the hardware platform to either `HardwarePlatform.FPGA` or `HardwarePlatform.CPU`. |

To create a parameterized simulated annealing solver for the CPU platform using the SDK:

```python
from azure.quantum.optimization import SimulatedAnnealing
# Requires a workspace already created.
solver = SimulatedAnnealing(workspace, sweeps=2, beta_start=0.1, beta_stop=1, restarts=72, seed=22)
```

## Simulated annealing (FPGA)

The simulated annealing solver is also available on FPGA hardware for both parameter and parameter-free modes. The parameters are the same as in the CPU versions.

This section will describe the advantages and disadvantages of using the FPGA solver. Users are encouraged to make an informed decision based on their own problem features.

### When to use FPGA simulated annealing

FPGA solvers have some built-in costs like PCIe transfers, FPGA device initialization etc. If an optimization problem is too small (for example, the CPU execution takes seconds), then the built-in cost of FPGA hardware will be the bulk of the cost, with minimal solution benefits. Thus, it's recommended to use FPGA solvers when the execution time on the CPU is minutes or higher.

### Advantages of FPGA simulated annealing

- Highly optimized for parallelization. Compared to the equivalent CPU simulated annealing solver with the same parameters, the FPGA simulated annealing solver is on average 10 times faster.
- Highly condensed memory representation. A problem with a large number of terms may fail on a CPU solver due to memory limits, but may fit on FPGA hardware.

The performance gain may not be obvious for the parameter-free mode because both algorithms are gated by a `timeout` setting (which halts most problems). However on FPGA hardware, the solver most likely will run many more sweeps in the same amount of time than on the CPU.

### Limitations of FPGA simulated annealing

- The FPGA solver supports up to **65535 variables**, which is a hard limitation. This number is limited by the available DRAM, but it usually is not an issue for FPGA (since most problems are smaller than 65535).
- For best performance, FPGA solvers on Azure Quantum use 32-bit floating-point operations. Because of this, the computation accuracy of FPGA solvers is a somewhat lower than that of the CPU solvers.

### Parameter guide for FPGA simulated annealing

Although FPGA simulated annealing uses the same parameters as the corresponding CPU solver, it's still recommended to tune the parameters of FPGA solvers separately instead of using pre-tuned parameters from CPU solvers.

The number of restarts should be at least 216, as the FPGA solver can support a higher degree of parallelization.

To create a simulated annealing solver for the FPGA platform using the SDK, specify the platform option as follows:

```python
from azure.quantum.optimization import SimulatedAnnealing, HardwarePlatform
# Requires a workspace already created.
solver = SimulatedAnnealing(workspace, timeout=100, seed=22, platform=HardwarePlatform.FPGA)
```

The `timeout` and `seed` parameters are optional.

For the parameterized version:

```python
from azure.quantum.optimization import SimulatedAnnealing, HardwarePlatform
# Requires a workspace already created.
solver = SimulatedAnnealing(workspace, sweeps=2, beta_start=0.1, beta_stop=1, restarts=72, seed=22, platform=HardwarePlatform.FPGA)
```
