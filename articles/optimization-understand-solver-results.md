---
title: Understand solver results
description: This document provides a basic guide to interpreting results of optimizations problems solved in Azure Quantum using Python.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: azure.quantum.understand-solver-results.python
---

# Understand solver results

The result of a solver job is a `JobOutput` object which can be examined to obtain useful information. 

Some of the useful properties in the result are: 
1. `configuration`: The dictionary describes the assignment of variables, where for each key-value pair in the dictionary the key is the index of a variable and value is the value assigned to that variable by the solver.
2. `cost`: The optimized solution to the problem when the `configuration` is applied to the variables
3. `parameters`: Different solvers take different parameters to solve the problem. In this example, we get: 
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
> {'version': '1.0', 'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0, 'parameters': {'all_betas': [0.1,0.5,1,2,4], 'replicas': 70, 'sweeps': 600}}
```