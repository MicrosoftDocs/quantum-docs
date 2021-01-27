---
title: Microsoft QIO 
description: This document provides the technical details of the Microsoft QIO provider
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.quantum.optimization.providers.microsoft.qio
---

# Microsoft QIO provider

The Microsoft QIO provider is enabled in every Quantum Workspace.

- Publisher: [Microsoft](https://microsoft.com)
- Provider ID: `microsoft`

## Targets

The Microsoft QIO provider makes the following targets available:

- [Solver: Simulated Annealing (Parameter
  Free)](#parameter-free-simulated-annealing)
- [Solver: Simulated Annealing (Parameter Free - FPGA)](#parameter-free-simulated-annealing-fpga)
- [Solver: Simulated Annealing](#simulated-annealing)
- [Solver: Simulated Annealing (FPGA)](#simulated-annealing-fpga)
- [Solver: Parallel Tempering (Parameter
  Free)](#parameter-free-parallel-tempering)
- [Solver: Parallel Tempering](#parallel-tempering)
- [Solver: Tabu Search (Parameter Free)](#parameter-free-tabu-search)
- [Solver: Tabu Search](#tabu-search)

In the following table you can find a brief comparision between them:

| **Name**                     | **Description**                                                                                                                                                                                                                                                                | **Best applicable scenario**                                                                                                                        |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Parallel Tempering           | Rephrases the optimization problem as a thermodynamic system and runs multiple copies of a system, randomly initialized, at different temperatures. Then, based on a specific protocol, exchanges configurations at different temperatures to find the optimal configuration.  |  <ul><li>Generally outperforms Simulated Annealing on hard problems with rugged landscapes</li><li> Very good at solving Ising problems</li></ul>   |
| Simulated Annealing          | Rephrases the optimization problem as a thermodynamic system and considers the energy of a single system. Changes to the system are accepted  if they decrease the energy or meet a criterion based on decreasing temperature.                                                 | <ul><li>Convex landscapes</li></ul>                                                                    |
| Simulated Quantum Annealing  |  Similar to Simulated Annealing but the changes are by simulating quantum-tunneling through barriers rather  than using thermal energy jumps.                                                                                                                                  |  <ul><li>Optimization landscape has tall and thin barriers</li><li>Due to its large overhead, is useful for small hard problems</li></ul>           |
| Tabu Search                  | Tabu Search looks at neighboring configurations.  It can accept worsening moves if no improving moves are available  and prohibit moves to previously-visited solutions                                                                                                        |   <ul><li>Convex landscapes, high density problems, QUBO problems.</li></ul>                                         |           |

### FPGA vs. CPU

For some solvers we offer two versions: an unlabeled version that runs on traditional CPUs and a labeled FPGA version. In the following table you can see the pros and cons of using FPGA solvers:

|      | FPGA solvers                                                                                                                                                                                                                                                                                                                                                                        |
|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pros | <ul><li>Highly parallel optimized, compared with CPU solvers, we witnessed about 100-200 times performance gain when the simulated annealing parameters settings are the same (restarts and sweeps).</li><li>FPGA solver use very condensed memory representation, so for problem with a large number of terms may fail CPU solver for OOM, but not for FPGA solver.</li></ul> |
| Cons | <ul><li>FPGA solver support upto 8192 variables, this is a hard limitation.</li><li>For best performance, FPGA solvers use 32 bits float point operations, because of this, the computation accuracy of FPGA solvers is a little lower than CPU solvers'.</li></ul>                                                                                                                 |

#### Recommendations for FPGA solvers 

FPGA solvers use the same parameters as their corresponding CPU solvers, but for the best performance, please tune the parameters of FPGA solvers, instead of just directly using CPU solvers' parameters. For example, in FPGA solvers, we build about 200 parallel pipelines, and each pipeline can handle one restart, so the restarts of FPGA shall be no less than 200.

FPGA solvers have an initialization time that may take a large percentage of the total runtime for small problems. If your problem can be solved on a CPU solver within a number of seconds, then you will likely not see a performance gain by switching to an FPGA. We recommend using FPGA solvers when the execution timing on CPU is at least a couple minutes.

### Parameter-free simulated annealing

A parameter-free (up to a time out) solver for binary optimization problems with
k-local interactions on an all-to-all graph topology with double precision
support for the coupler weights. To use the parameter-free simulated annealing
solver, specify only the `timeout` and/or `seed` parameters when instantiating
the `SimulatedAnnealing` class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.simulatedannealing-parameterfree.cpu`
- Python Solver class name: `SimulatedAnnealing`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `timeout`      | int      | Required | Maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified. |
| `seed`         | int      | Optional | Seed value  |

### Parameter-free simulated annealing (FPGA)

A parameter-free (up to a time out) solver for binary optimization problems with
k-local interactions on an all-to-all graph topology with double precision
support for the coupler weights. To use the parameter-free simulated annealing
solver, specify only the `timeout` and/or `seed` parameters when instantiating
the `SimulatedAnnealing` class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.simulatedannealing-parameterfree.fpga`
- Python Solver class name: `SimulatedAnnealing`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `timeout`      | int      | Required | Maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified. |
| `seed`         | int      | Optional | Seed value  |

### Simulated annealing

A solver for binary optimization problems with k-local interactions on an
all-to-all graph topology with double precision support for the coupler weights.
To use the parameterized simulated annealing solver, specify one or more of the
below parameters when instantiating the `SimulatedAnnealing` class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.simulatedannealing.cpu`
- Python Solver class name: `SimulatedAnnealing`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `beta_start`   | float    | Required | Inverse starting temperature. |
| `beta_stop`    | float    | Required | Inverse stopping temperature. |
| `sweeps`       | int      | Required | Number of sweeps to run. |
| `restarts`     | int      | Required | Number of restarts. |

### Simulated annealing (FPGA)

A solver for binary optimization problems with k-local interactions on an
all-to-all graph topology with double precision support for the coupler weights.
To use the parameterized simulated annealing solver, specify one or more of the
below parameters when instantiating the `SimulatedAnnealing` class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.simulatedannealing.fpga`
- Python Solver class name: `SimulatedAnnealing`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `beta_start`   | float    | Required | Inverse starting temperature. |
| `beta_stop`    | float    | Required | Inverse stopping temperature. |
| `sweeps`       | int      | Required | Number of sweeps to run. |
| `restarts`     | int      | Required | Number of restarts. |

### Parameter-free parallel tempering

A parameter-free solver for binary optimization problems with k-local interactions
on an all-to-all graph topology with double precision support for the coupler
weights. To use the parameter-free parallel tempering solver, specify only the
`timeout` and/or `seed` parameters when instantiating the `ParallelTempering`
class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.paralleltempering-parameterfree.cpu`
- Python Solver class name: `ParallelTempering`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `timeout`      | int      | Required | Maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified. |
| `seed`         | int      | Optional | Seed value  |

### Parallel tempering

A solver for binary optimization problems with k-local interactions on an
all-to-all graph topology with double precision support for the coupler weights.
To use the parameterized parallel tempering solver, specify one or more of the
below parameters when instantiating the `ParallelTempering` class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.paralleltempering.cpu`
- Python Solver class name: `ParallelTempering`

| Parameter Name | Type        | Required | Description |
|----------------|-------------|----------|-------------|
| `sweeps`       | int         | Required | Number of sweeps to run. |
| `replicas`     | int         | Required | Number of replicas. |
| `all_betas`    | List[float] | Required | List of inverse temperatures. Must be equal in length to the `replicas` parameter. |

### Parameter-free Tabu Search

A parameter-free (up to a time out) version of the tabu search algorithm described below. To use the parameter-free tabu search
solver, specify only the `timeout` and/or `seed` parameters when instantiating
the `Tabu` class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.tabu-parameterfree.cpu`
- Python Solver class name: `Tabu`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `timeout`      | int      | Required | Maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified. |
| `seed`         | int      | Optional | Seed value  |

### Tabu Search

Uses a variant of the tabu search algorithm for binary optimization problems with k-local interactions on an
all-to-all graph topology. To use the parameterized tabu search solver, specify one or more of the
below parameters when instantiating the `Tabu` class.

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `microsoft.tabu.cpu`
- Python Solver class name: `Tabu`

| Parameter Name | Type        | Required | Description |
|----------------|-------------|----------|-------------|
| `sweeps`       | int         | Required | Number of meaningful iterations to run. This is recommended to be at least the number of variables times 100|
| `tabu_tenure`  | int         | Required | Tenure of the tabu list in moves. Describes how many moves a variable stays on the tabu list once it has been made. Recommended to be between 1 and number of variables for any impact. |
| `seed`         | int | Optional | Seed value |
