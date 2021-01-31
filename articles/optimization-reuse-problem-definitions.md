---
author: KittyYeungQ
description: This document provides a basic guide to re-using a problem definition when solving problems in Azure Quantum using Python.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: article
title: Re-use problem definitions
uid: microsoft.quantum.optimization.reuse-problem-definitions
---

# Reusing problem definitions

Sometimes it is more efficient to upload a problem definition once and find its solution using different algorithms (solvers) or with different parameters. You can upload a problem definition using the `upload` method, which returns a URL, then provide this URL to a solver's `submit` or optimize` methods:

```py
url = problem.upload(workspace)
job = solver.submit(url)
print(job.id)

> 9228ea88-6832-11ea-8271-c49dede60d7c
```