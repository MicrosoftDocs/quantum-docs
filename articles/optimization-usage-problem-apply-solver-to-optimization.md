---
author: KittyYeungQ
description: This document provides a basic guide to applying a optimization solver in Azure Quantum using Python.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: conceptual
title: Apply solvers to solve optimization problems
uid: microsoft.quantum.optimization.apply-solver
---

# Apply solvers to solve optimization problems

Once we have a `Problem`, we're ready to solve it by applying a **solver**. In this example we'll use a parameter-free version of parallel tempering. You can find documentation on this solver and the other available solvers in the [Solver overview](xref:microsoft.quantum.reference.qio-target-list).

```py
solver = ParallelTempering(workspace, timeout=100)
```

For arguments, the solver takes the `Workspace` created previously, plus a single parameter which is the maximum amount of time (in seconds) to run the solver. Detailed documentation on parameters is available in the reference for each solver.

> [!NOTE]
> See [Use the Python SDK](xref:microsoft.quantum.optimization.install-sdk) for details on connecting to a workspace and getting a `Workspace` object for it.

Solvers provide an `optimize` method that expects a `Problem`. The `optimize` method uploads the problem definition, submits a job to solve the problem, and polls the status until the job has completed running. Once the job has completed, it returns a `JobOutput` object which contains the results. See [Understand Solver results](xref:microsoft.quantum.optimization.understand-solver-results) for interpreting the results.

```py
result = solver.optimize(problem)
print(result)
```

This method will submit the problem to Azure Quantum for optimization and synchronously wait for it to be solved. You'll see output like the following in your terminal:

```output
> {'solutions':[{'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}]}
```

See [Solve long running problems](xref:microsoft.quantum.optimization.solve-long-running-problems) for solving problems asynchronously.

### Using CPU vs FPGA solvers

By default, the CPU version of a solver is used. In order to specify a different version like FPGA, specify a `platform` parameter as shown below.

```py
solver =  SimulatedAnnealing(workspace, timeout=100, platform=HardwarePlatform.FPGA)
```

### Returning multiple solutions
CPU-based solvers in the Microsoft QIO provider support the option to return more than 1 solution on a single run. 
The below example shows how to set this option.

```py
# return a maximum of 5 solutions
solver.set_number_of_solutions(5)
```

The option will have the following behavior and requirements:
- Value must be between 1 and 10 (default to 1 if not set). 
- Solvers are not guaranteed to return the exact number of solutions specified by the parameter as solvers may not find that many solutions. 
- Solvers are guaranteed to return the best solution they find in index 0. They will return the rest of the solutions (if any) in the same list and in sorted order.
- A build of the Python SDK for Optimization with version 0.17.2106 or higher is required to take advantage of the feature

This option is available on both CPU and FPGA solvers. 
