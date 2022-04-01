---
author: bradben
description: This document provides a basic guide to applying a optimization solver in Azure Quantum using Python.
ms.author: brbenefield
ms.date: 10/25/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: conceptual
title: Apply solvers to solve optimization problems
uid: microsoft.quantum.optimization.apply-solver
---

# Apply solvers to solve optimization problems

Once you have [expressed an optimization `Problem`](xref:microsoft.quantum.optimization.express-problem), you're ready to solve it by applying a **solver**. 

## Configure and run the solver

In this example, you'll use a parameter-free version of parallel tempering. For more information, see [Optimization providers on Azure Quantum](xref:microsoft.quantum.reference.qio-target-list).

```py
solver = ParallelTempering(workspace, timeout=100)
```

For arguments, the solver takes a previously created `Workspace` object and a `timeout` value, which is the maximum amount of time (in seconds) to run the solver. Detailed documentation on parameters is available in the reference for each solver.

> [!NOTE]
> For more information on creating and managing workspaces, see [Manage quantum workspaces](xref:microsoft.quantum.workspaces-cli).

Solvers provide an `optimize` method that expects a `Problem` object. The `optimize` method uploads the problem definition, submits a job to solve the problem, and polls the status until the job has completed running. Once the job has completed, it returns a `JobOutput` object which contains the results. For more information, see [Understand Solver results](xref:microsoft.quantum.optimization.understand-solver-results).

```py
result = solver.optimize(problem)
print(result)
```

This method will submit the problem to Azure Quantum for optimization and synchronously wait for it to be solved. You'll see output like the following in your terminal:

```output
> {'solutions':[{'configuration': {'0': 1, '1': 1, '2': -1, '3': 1}, 'cost': -32.0}]}
```

See [Solve long running problems](xref:microsoft.quantum.optimization.solve-long-running-problems) for solving problems asynchronously.

## Using CPU vs FPGA solvers

By default, the CPU version of a solver is used. In order to specify a different version, such as FPGA, specify a `platform` parameter:

```py
solver =  SimulatedAnnealing(workspace, timeout=100, platform=HardwarePlatform.FPGA)
```

For more information about FPGA, see [FPGA vs. CPU](xref:microsoft.quantum.optimization.providers.microsoft.qio#fpga-vs-cpu)

## Returning multiple solutions

Both FPGA and CPU solvers in the Microsoft QIO provider support the option to return more than one solution during a single run. 
Use `set_number_of_solutions` to set this option.

```py
# return a maximum of 5 solutions
solver.set_number_of_solutions(5)
```

This option has the following behavior and requirements:

- Value must be between 1 and 10 (default = 1). 
- Solvers are not guaranteed to return the exact number of solutions specified by the parameter, as solvers may not find that many solutions. 
- Solvers are guaranteed to return the best solution they find in index 0. They will return the rest of the solutions (if any) in the same list and in sorted order.
- A build of the *azure-quantum* Python package with version 0.17.2106 or higher is required to use the feature. For more information, see [Update the QDK](xref:microsoft.quantum.update-qdk#update-the-azure-quantum-python-package)

## Next steps

- [Understand Solver results](xref:microsoft.quantum.optimization.understand-solver-results)
- [Solve long-running problems](xref:microsoft.quantum.optimization.solve-long-running-problems)
- [Re-use problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions)
- [Solver overview](xref:microsoft.quantum.reference.qio-target-list)
- [Expressing problems & supplying terms](xref:microsoft.quantum.optimization.express-problem)