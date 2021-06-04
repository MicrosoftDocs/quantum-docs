---
author: KittyYeungQ
description: This document gives an overview of the valid input formats when submitting optimization problems.
ms.author: kitty
ms.date: 02/01/2021
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
<table>
    <thead>
        <tr class = "header">
        <th>Property Name (case sensitive)</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
    <tr>
        <td>all_betas</td>
        <td>a list of floats</td>
        <td>Specifies the list of inverse temperatures. This list should be equal in length to the number of replicas.</td>
    </tr>
    <tr>
        <td>replicas</td>
        <td>integer</td>
        <td>Specifies the number of iterations of the solver to run.</td>
    </tr>
    <tr>
        <td>sweeps</td>
        <td>integer</td>
        <td>Specifies the number of Monte Carlo steps to perform in each iteration of a solver.</td>
    </tr>
    <tr>
        <td>seed</td>
        <td>A random integer.</td>
        <td>Specifies a random value to start the simulation.</td>
    </tr>
    <tr>
        <td>timeout</td>
        <td>integer</td>
        <td>Specifies the maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified.
        </td>
    </tr>
    </tbody>
</table>

## Simulated Annealing
<table>
    <thead>
        <tr class = "header">
        <th>Property Name (case sensitive)</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
    <tr>
        <td>beta_start</td>
        <td>float</td>
        <td>Specifies the list of inverse temperatures. This list should be equal in length to the number of replicas.</td>
    </tr>
    <tr>
        <td>beta_stop</td>
        <td>float</td>
        <td>Specifies the number of iterations of solver to run.</td>
    </tr>
    <tr>
        <td>sweeps</td>
        <td>integer</td>
        <td>Specifies the number of Monte Carlo steps to perform in each iteration of a solver.</td>
    </tr>
    <tr>
        <td>seed</td>
        <td>A random integer.</td>
        <td>Specifies a random value to start the simulation.</td>
    </tr>
    <tr>
        <td>timeout</td>
        <td>integer</td>
        <td>Specifies the maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified.
        </td>
    </tr>
    <tr>
        <td>restarts</td>
        <td>integers</td>
        <td>Specifies the number of iterations of the simulation to run.</td>
    </tr>
    </tbody>
</table>



## Population Annealing

<table>
    <thead>
        <tr class = "header">
        <th>Property Name (case sensitive)</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
    <tr>
        <td>sweeps</td>
        <td>integer</td>
        <td>Number of sweeps. More sweeps will usually improve the solution if it has not yet found a global minimum.</td>
    </tr>
    <tr>
        <td>beta</td>
        <td>RangeSchedule</td>
        <td>Specifies a range from the initial temperature value to the final value. This schedule must increase over time.</td>
    </tr>
    <tr>
        <td>population</td>
        <td>integer</td>
        <td>The number of walkers in the population that the algorithm should use.</td>
    </tr>
    <tr>
        <td>seed</td>
        <td>A random integer</td>
        <td>Used to initialize the algorithm. Use the same seed to reproduce results.</td>
    </tr>
    </tbody>
</table>




## Tabu

<table>
    <thead>
        <tr class = "header">
        <th>Property Name (case sensitive)</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
    <tr>
        <td>tabu_tenure</td>
        <td>integer</td>
        <td>Specifies the Tabu tenure.</td>
    </tr>
    <tr>
        <td>timeout</td>
        <td>integer</td>
        <td>Specifies the maximum number of seconds to run the core solver loop. Initialization time does not respect this value, so the solver may run longer than the value specified.
        </td>
    </tr>
    <tr>
        <td>seed</td>
        <td>A random integer between 0 and 101</td>
        <td>Specifies a random value to start the simulation.</td>
    </tr>
    <tr>
         <td>sweep</td>
        <td>integer</td>
        <td>Specifies the number of Monte Carlo steps to perform in each iteration of the simulation.</td>
    </tr>
    </tbody>
</table>

## Quantum Monte Carlo
 
<table>
    <thead>
        <tr class = "header">
        <th>Property Name (case sensitive)</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
    <tr>
        <td>beta_start</td>
        <td>float</td>
        <td>Specifies the inverse of the starting temperature for the algorithm.</td>
    </tr>
    <tr>
        <td>transverse_field_start</td>
        <td>float</td>
        <td>Specifies the starting value of the external field supplied to the simulation.</td>
    </tr>
    <tr>
        <td>transverse_field_end</td>
        <td>float</td>
        <td>Specifies the ending value of the external field supplied to the simulation.</td>
    </tr>
    <tr>
        <td>seed</td>
        <td>A random integer</td>
        <td>Specifies a random value to start the simulation.</td>
    </tr>
    <tr>
         <td>sweep</td>
        <td>integer</td>
        <td>Specifies the number of Monte Carlo steps to perform in each iteration of the simulation.</td>
    </tr>
     <tr>
         <td>trotter_number</td>
        <td>integer</td>
        <td>Specifies the number of copies of each variable to create in a simulation.</td>
    </tr>
    </tbody>
</table>

## Substochastic Monte Carlo
 
<table>
    <thead>
        <tr class = "header">
        <th>Property Name (case sensitive)</th>
        <th>Type</th>
        <th>Description</th>
    </thead>
    <tbody>
    <tr>
        <td>step_limit</td>
        <td>integer</td>
        <td>Number of Monte Carlo steps. More steps will usually improve the solution if it has not yet found a global minimum.</td>
    </tr>
    <tr>
        <td>target_population</td>
        <td>integer</td>
        <td>Specifies the number of walkers in the population. Should be greater than or equal to 8.</td>
    </tr>
    <tr>
        <td>alpha</td>
        <td>RangeSchedule</td>
        <td>Specifies a range from the initial value to the final value. This is the schedule for the stepping chance and should decrease over time.</td>
    </tr>
    <tr>
        <td>beta</td>
        <td>RangeSchedule</td>
        <td>Specifies a range from the initial value to the final value. This is the schedule for the resampling factor that will increase over time.</td>
    </tr>
    <tr>
         <td>seed</td>
        <td>A random integer</td>
        <td>Used to initialize the algorithm. Use the same seed to reproduce results.</td>
    </tr>
    </tbody>
</table>
