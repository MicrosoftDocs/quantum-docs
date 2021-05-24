---
author: KittyYeungQ
description: This document provides a basic guide to interpreting results of optimizations problems solved in Azure Quantum using Python.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Understand solver results
uid: microsoft.quantum.optimization.understand-solver-results
---

# Understand solver results

The result of a solver job is a `JobOutput` object which can be examined to obtain useful information. 

Some of the useful properties in the result are: 
1. `configuration`: The dictionary describes the assignment of variables, where for each key-value pair in the dictionary the key is the index of a variable and value is the value assigned to that variable by the solver.
2. `cost`: The optimized solution to the problem when the `configuration` is applied to the variables
3. `parameters`: This field will be present if a parameter-free solver was used. It will contain the optimal parameters found by the solver for the specific problem submitted. Different solvers take different parameters to solve the problem. In this example, we get: 
   1. `all_betas`: An array of the starting temperatures for the parallel tempering solver
   2. `replicas`: The number of runs of the solver before evaluating the best configuration from all these runs
   3. `sweeps`: The number of Monte Carlo steps performed in each iteration of the solver.

The example below shows how to print the result if a solver job was submitted synchronously.
```py
result = solver.optimize(problem)
print(result)
```

The example below shows the asynchronous version.
```py
job = solver.submit(problem)
result = job.get_results()
print(result)
```

In both cases, the result should look like the following:
```output
> {'version': '1.0', 'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0, 'parameters': {'all_betas': [0.1,0.5,1,2,4], 'replicas': 70, 'sweeps': 600}, 'solutions':[{'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}]}
```
It should be noted that for now, the solution appears in both the root of the payload ('configurations' and 'cost') as well as in the 'solutions' field. It is recommended to consume solutions from the 'solutions' field (as the root 'configuration' and 'cost' fields will be deprecated in the future). 

The best solution found by the solver will always appear in index 0 of the 'solutions' list (if multiple solutions are specified).  
