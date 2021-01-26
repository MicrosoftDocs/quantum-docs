---
title: 1QBit provider
description: This document provides the technical details of the 1QBit provider
author: Mobius5150
ms.author: mblouin
ms.date: 1/12/2021
ms.topic: article
uid: microsoft.azure.quantum.providers.1qbit
---

# 1QBit provider

- Publisher: [1QBit](https://1qbit.com)
- Provider ID: `1qbit`

## Targets

### Tabu Search Solver 
An iterative heuristic algorithm that uses local search techniques to solve a QUBO problem. It starts from a random solution and looks for an improved solution in the solution's neighborhood which includes all possible single flips. The algorithm stops when it reaches a stopping criterion, such as a specified number of consecutive iterations without improvement.

****** 
Please note for the parameters values, they are required to be of JSON string type.  The types listed below are the types the solvers expect within the string value.  For example, 'improvement_cutoff' is listed as type int, it is expected to be passed in in the format:

improvement_cutoff: "5"
******

For more information please visit: https://portal.1qbit-prod.com/docs/model/tabusolver

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `1qbit.tabu`
- Python Solver class name: `TabuSearch`

| Parameter Name            | Type     | Required | Description |
|---------------------------|----------|----------|-------------|
| `improvement_cutoff`      | int      | Optional | The number of iterations that the solver attempts with no improvement before stopping. Default: 0 |
| `improvement_tolerance`   | double   | Optional | The tolerance value that determines if a solution is an improvement over the previous iteration. Default: 1e-9 |
| `tabu_tenure`             | int      | Optional | The tenure prevents a flipped variable from being flipped again during the iterations. Default: 0 |
| `tabu_tenure_rand_max`    | int      | Optional | The upper limit of the exclusive range of random integers. Valid value range:  1 to 200,000.  Default: 0 |
| `timeout`                 | int      | Optional | The duration in ms the solver runs before exiting. If the value is set to 0, it does not time out.  Default: 0 |


### PTICM Solver
The parallel tempering with isoenergetic cluster moves (PTICM) solver is a Monte Carlo approach to solving QUBO problems. In this algorithm, multiple replicas of the original system, each with a different initial state, are simulated at different temperatures simultaneously. The replicas at neighboring temperatures are periodically swapped based on a Metropolis criterion. These swaps allow different replicas to do a random walk in the temperature space, thereby, efficiently overcoming energy barriers.

For more information please visit: https://portal.1qbit-prod.com/docs/model/pticmsolver

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `1qbit.pticm`
- Python Solver class name: `PticmSolver`

| Parameter Name            | Type     | Required | Description |
|---------------------------|----------|----------|-------------|
| auto_set_temperatures|boolean|Optional|This defines whether the temperature parameters are auto-calculated or not. Set it to True for auto-calculating and False for customizing the temperature parameters. Default: True |
| elite_threshold|double|Optional|The fraction of the best solutions used for the var_fixing_type parameter with value SPVAR. Default: 0.3 |
| frac_icm_thermal_layers|double|Optional|The fraction of temperatures for the iso-energetic cluster moves. To change this value, set the perform_icm parameter to True. Default: 0.5 |
| frac_sweeps_fixing|double|Optional|The fraction of sweeps used for fixing the QUBO variables. Default: 0.15 |
| frac_sweeps_idle|double|Optional|The fraction of sweeps to wait before fixing the QUBO variables. Default: 1.0 |
| frac_sweeps_stagnation|double|Optional|The fraction of sweeps without improvement that triggers a restart. Default: 1.0 |
| goal|string|Optional|This defines whether the solver is used for optimizing or sampling. Valid values: "OPTIMIZE" or "SAMPLE" Default: OPTIMIZE |
| high_temp|double|Optional|The highest temperature of a replica. Set the auto_set_temperatures parameter to False to use this feature. Default: 2 |
| low_temp|double|Optional|The lowest temperature of a replica. Set the auto_set_temperatures parameter to False to use this feature. Default: 0.2 |
| max_samples_per_layer|int|Optional|The maximum number of samples collected per replica. Default: 10 |
| max_total_sweeps|int|Optional|The total number of sweeps before termination. Default: num_sweeps_per_run * 10 |
| manual_temperatures|array[double]|Optional|An array of a custom temperature schedule which includes the high, intermediate, and low temperature values for the replicas. Set the auto_set_temperatures parameter to False to use this feature.  |
| num_elite_temps|int|Optional|The number of elite temperatures used for fixing the variables with persistency. Default = 4 |
| num_replicas|int|Optional|The number of replicas at each temperature. Default: 2 |
| num_sweeps_per_run|int|Optional|The number of Monte Carlo sweeps. Default: 100 |
| num_temps|int|Optional|The number of temperatures including the highest and the lowest temperatures. Set the auto_set_temperatures parameter to False to use this feature. Default: 30 |
| perform_icm|boolean|Optional|This defines whether or not to perform the isoenergetic cluster moves. Default: true |
| scaling_type|string|Optional|This defines whether the QUBO problem is automatically scaled or not. MEDIAN means it's automatically scaled, and NO_SCALING means it's not. Valid values: "MEDIAN" or "NO_SCALING" |
| var_fixing_type|string|Optional|This decides whether the values of QUBO variables are fixed or not. You can fix them with PERSISTENCY or SPVAR types. NO_FIXING means the variables are not fixed. If you choose PERSISTENCY or SPVAR, also set the solver.frac_sweeps_fixing and solver.frac_sweeps_idle parameters to a number less than one. Valid values: "PERSISTENCY", "SPVAR" or "NO_FIXING" Default: NO_FIXING |

### Path-Relinking Solver
The path-relinking algorithm is a heuristic algorithm that uses the tabu search as a subroutine to solve a QUBO problem. The algorithm starts from a set of elite solutions found by the tabu search. It then constructs a path between each pair of elite solutions, selects one of the solutions along the path, and repeats the tabu search. If the tabu search finds a distinct solution that is better than the current worst elite solution, the elite solutions set is updated with the new improved solution. This whole procedure is repeated until the algorithm meets a stopping condition.

For more information please visit: https://portal.1qbit-prod.com/docs/model/pathrelinkingsolver

- Job type: `Quantum-Inspired Optimization Problem`
- Data Format: `microsoft.qio.v2`
- Target ID: `1qbit.pathrelinking`
- Python Solver class name: `PathRelinkingSolver`

| Parameter Name            | Type     | Required | Description |
|---------------------------|----------|----------|-------------|
| distance_scale|double|Optional|The minimum distance from the initiating and guiding solutions for constructing the candidate solution list. The highest quality solution in the candidate solution list is then selected for improvement. Valid values: 0.0 to 0.5 Default 0.33 | 
| greedy_path_relinking|boolean|Optional|When you use the path-relinking solver there are two ways you can generate a path that leads to the solution: one is the greedy function and the other operates in a random matter. If you set the this parameter to true, the solver will use the greedy function. If you set it to false, it will use the random method. Default: false |
| ref_set_count|int|Optional|The number of initial elite solutions to be generated by the tabu search algorithm.  Valid values: Greater than 1 Default: 10 |
| timeout|int|Optional|The duration in ms the solver runs before exiting. If the value is set to 0, it does not time out. If a value is not specified, the solver uses the default value or estimates a new one based on the input problem. Estimated values are marked as "(COMPUTED)". Default: 0 |
