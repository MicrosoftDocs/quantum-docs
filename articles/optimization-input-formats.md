---
author: KittyYeungQ
description: This document gives an overview of the valid input formats when submitting optimization problems.
ms.author: kitty
ms.date: 09/09/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Input format for optimization problems
uid: microsoft.quantum.optimization.input-format
---

# Input format for optimization problems

This document explains how the parameters to optimization problems may be specified for all the different solvers. 
All solvers set default values for their parameters but we strongly recommend setting them to values appropriate for your problem. Where there is a parameter-free solver available not setting any parameters will call the parameter-free version of that solver which will complete when there is sufficient convergence on a solution.

## Parallel Tempering

|Property Name (case sensitive)|Type|Description|
|--- |--- |--- |
|all_betas|a list of floats|Specifies the list of inverse temperatures. This list should be equal in length to the number of replicas.|
|replicas|integer|Specifies the number of iterations of the solver to run.|
|sweeps|integer|Specifies the number of Monte Carlo steps to perform in each iteration of a solver.|
|seed|A random integer.|Specifies a random value to start the simulation.|
|timeout|integer|Specifies the maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified.|

## Simulated Annealing

|Property Name (case sensitive)|Type|Description|
|--- |--- |--- |
|beta_start|float|Specifies the list of inverse temperatures. This list should be equal in length to the number of replicas.|
|beta_stop|float|Specifies the number of iterations of solver to run.|
|sweeps|integer|Specifies the number of Monte Carlo steps to perform in each iteration of a solver.|
|seed|A random integer.|Specifies a random value to start the simulation.|
|timeout|integer|Specifies the maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified.|
|restarts|integers|Specifies the number of iterations of the simulation to run.|
|platform|enum|Defaults to `HardwarePlatform.CPU`. Specifies the hardware platform that the solver should use. The options are `HardwarePlatform.FPGA` and `HardwarePlatform.CPU`.|

## Population Annealing

|Property Name (case sensitive)|Type|Description|
|--- |--- |--- |
|sweeps|integer|Number of sweeps. More sweeps will usually improve the solution if it has not yet found a global minimum.|
|beta|RangeSchedule|Specifies a range from the initial temperature value to the final value. This schedule must increase over time.|
|population|integer|The number of walkers in the population that the algorithm should use.|
|seed|A random integer|Used to initialize the algorithm. Use the same seed to reproduce results.|

## Tabu
|Property Name (case sensitive)|Type|Description|
|--- |--- |--- |
|tabu_tenure|integer|Specifies the Tabu tenure.|
|timeout|integer|Specifies the maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified.|
|seed|A random integer between 0 and 101|Specifies a random value to start the simulation.|
|sweep|integer|Specifies the number of Monte Carlo steps to perform in each iteration of the simulation.|

## Quantum Monte Carlo
 
|Property Name (case sensitive)|Type|Description|
|--- |--- |--- |
|beta_start|float|Specifies the inverse of the starting temperature for the algorithm.|
|transverse_field_start|float|Specifies the starting value of the external field supplied to the simulation.|
|transverse_field_end|float|Specifies the ending value of the external field supplied to the simulation.|
|sweep|integer|Specifies the number of Monte Carlo steps to perform in each iteration of the simulation.|
|trotter_number|integer|Specifies the number of copies of each variable to create in a simulation.|
|seed|A random integer|Specifies a random value to start the simulation.|


## Substochastic Monte Carlo
 
|Property Name (case sensitive)|Type|Description|
|--- |--- |--- |
|step_limit|integer|Number of Monte Carlo steps. More steps will usually improve the solution if it has not yet found a global minimum.|
|target_population|integer|Specifies the number of walkers in the population. Should be greater than or equal to 8.|
|alpha|RangeSchedule|Specifies a range from the initial value to the final value. This is the schedule for the stepping chance and should decrease over time.|
|beta|RangeSchedule|Specifies a range from the initial value to the final value. This is the schedule for the resampling factor that will increase over time.|
|seed|A random integer|Used to initialize the algorithm. Use the same seed to reproduce results.|
