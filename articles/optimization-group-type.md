---
author: danielstocker
description: Reference for azure.quantum.optimization.GroupType
ms.author: dasto
ms.date: 03/02/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Quantum optimization group type
uid: microsoft.quantum.optimization.grouptype
---

# Quantum optimization group type

## GroupType

```py
from azure.quantum.optimization import GroupType
```

Some solvers allow you to use grouped terms. 
When specifying the type of grouped term that you want to add to a problem formulation, you can use the GroupType enum. 

The Python SDK for Optimization currently only supports the squared linear combination term. 
We recommend reviewing our documentation for further details on the usage of `GroupType`.
- Optimization [`Problem`](xref:microsoft.quantum.optimization.problem) 
- [`SlcTerm`](xref:microsoft.quantum.optimization.slc-term) 

### Options

- `GroupType`.`squared_linear_combination`: Used to indicate that the group term specified is a squared linear combination term.
- `GroupType`.`combination`: Not in use. Placeholder for future grouped term types.

### Usage

As part of the `add_terms` function in `Problem`. 

```py
problem.add_terms([
        Term(c=1, indices=[0]),
        Term(c=-2, indices=[1]),
        Term(c=1, indices=[2]),
        Term(c=-1, indices=[])
    ],
    term_type = GroupType.squared_linear_combination,
    c = 2
)
```
