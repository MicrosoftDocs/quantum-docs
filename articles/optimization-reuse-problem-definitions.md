---
author: tedhudek
description: This document provides a basic guide to reusing a problem definition when solving problems in Azure Quantum using Python.
ms.author: tedhudek
ms.date: 10/25/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Reuse problem definitions
uid: microsoft.quantum.optimization.reuse-problem-definitions
---

# Reusing problem definitions

Sometimes it's more efficient to upload a problem definition once and find its solution using different solvers or different parameters. You can upload a problem definition using the `upload` method, which returns a URL, and then provide that URL to a solver using the `submit` or `optimize` methods:

```py
url = problem.upload(workspace)
job = solver.submit(url)
print(job.id)
```

```output
> 9228ea88-6832-11ea-8271-c49dede60d7c
```

You can also create an online problem from the submitted URL and assign it a name. This `OnlineProblem` object also allows you to download the problem and get the terms of the problem to run any client-side analysis, such as set_fixed_variables, evaluate the cost function for a configuration, or get specific terms from variable IDs:

```py
online_problem = OnlineProblem(name = "o_prob", blob_uri = url)
job = solver.submit(online_problem)
problem = online_problem.download(workspace)
```

## Next steps

- [Understand Solver results](xref:microsoft.quantum.optimization.understand-solver-results)
- [Solve long-running problems](xref:microsoft.quantum.optimization.solve-long-running-problems)
- [Solver overview](xref:microsoft.quantum.reference.qio-target-list)
- [Expressing problems & supplying terms](xref:microsoft.quantum.optimization.express-problem)
