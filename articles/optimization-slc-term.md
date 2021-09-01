---
author: danielstocker
description: Reference for azure.quantum.optimization.SlcTerm
ms.author: dasto
ms.date: 08/31/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Quantum optimization grouped term
uid: microsoft.quantum.optimization.slc-term
---

# Azure Quantum Optimization Squared Linear Combination terms

## SlcTerm
```py
from azure.quantum.optimization import Term, SlcTerm, GroupType
```

### Constructor

Some optimization problems bear cost functions with grouped terms, which we can represent with a grouped term object. 
Right now the Python SDK for Optimization supports `SlcTerm` objects and we are considering adding more in future.

To create a `SlcTerm` object, specify the following parameters:

- `terms`: This corresponds to the list of monomial terms comprising the grouped term argument; each element of this list should be a `Term` object.
- `c`: This corresponds to the lead coefficient.

 For instance, the squared linear combination term $2 (x_1 + 3x_2 - x_3 - 1)^2$ translates to the following object: 

 ```py
SlcTerm(
    terms=[
        Term(c=1, indices=[1]),
        Term(c=3, indices=[2]),
        Term(c=-1, indices=[3]),
        Term(c=-1, indices=[]),
    ],
    c=2
)
```

 Or, the term $3 (x_0 - 1)^2$ translates to the following object:
```py
SlcTerm(
    terms=[
        Term(c=1, indices=[0]),
        Term(c=-1, indices=[]),
    ],
    c=3
)
```

#### Constraints on Input

For squared linear comibnation terms there are two main constraints on input:

- In the `terms` list, *each term must be linear or constant*. That is, each `Term` must have an `indices` argument with a length of at most 1.
- Among the `terms` list, *like-terms must be combined* before input. That is, there may not be multiple terms having the same `indices` argument within a given SLC term.

For more information on cost functions and how terms relate to a problem definition, see [Cost functions](xref:microsoft.quantum.optimization.concepts.cost-function).
Grouped terms are comprised of `Term` objects, see [Term](xref:microsoft.quantum.optimization.term).
Terms can be supplied to a `Problem` object, see [Problem](xref:microsoft.quantum.optimization.problem).

#### Availability

`SlcTerm` objects are a new "Early Access" feature in the Python SDK for Optimization. 
The terms can currently be handled by two solvers in Microsoft QIO:

- Substochastic Monte Carlo
- Population Annealing

When submitting grouped problem types to a solver that does not support them via the SDK a client error will appear and the problem submission will fail. 
We are closely monitoring the use of grouped terms in solvers that support them, and are considering expanding the feature to more solvers in future.

If you discover any bugs or issues while working with SlcTerms, please reach out to [Azure Support](https://support.microsoft.com/topic/contact-microsoft-azure-support-2315e669-8b1f-493b-5fb1-d88a8736ffe4).
