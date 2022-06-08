---
author: danielstocker
description: Reference for azure.quantum.optimization.SlcTerm
ms.author: dasto
ms.date: 09/02/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Quantum optimization grouped term
uid: microsoft.quantum.optimization.slc-term
---

# Azure Quantum Optimization squared linear combination terms

## SlcTerm
```py
from azure.quantum.optimization import Term, SlcTerm, GroupType
```
Some optimization problems bear cost functions with *grouped terms*, which are represented by objects composed of multiple [Terms](xref:microsoft.quantum.optimization.term). Currently, the *azure-quantum* Python package supports squared linear combination terms as grouped term objects using the `SlcTerm` class.
### Constructor


To create an `SlcTerm` object, specify the following parameters:

- `terms`: The list of monomial terms that make up the squared linear combination term argument. Each element of this list should be a `Term` object.
- `c`: The lead coefficient.

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

For squared linear combination terms there are two main constraints on input:

- In the `terms` list, *each term must be linear or constant*. That is, each `Term` must have an `indices` argument with a length of at most 1.
- Among the `terms` list, *like-terms must be combined* before input. That is, there may not be multiple terms having the same `indices` argument within a given squared linear combination term.

For more information on cost functions and how terms relate to a problem definition, see the following topics:
- [Cost functions](xref:microsoft.quantum.optimization.concepts.cost-function)
- [Term](xref:microsoft.quantum.optimization.term)
- [Problem](xref:microsoft.quantum.optimization.problem)

#### Availability

`SlcTerm` objects are currently supported by the following Microsoft QIO solvers:

- [Parallel Tempering (CPU)](xref:microsoft.quantum.optimization.parallel-tempering)
- [Population Annealing (CPU)](xref:microsoft.quantum.optimization.population-annealing)
- [Quantum Monte Carlo (CPU)](xref:microsoft.quantum.optimization.quantum-monte-carlo)
- [Simulated Annealing (CPU)](xref:microsoft.quantum.optimization.simulated-annealing)
- [Substochastic Monte Carlo (CPU)](xref:microsoft.quantum.optimization.substochastic-monte-carlo)
- [Tabu Search (CPU)](xref:microsoft.quantum.optimization.tabu)

If you submit problems with grouped term objects to a solver that doesn't support them, a client error will appear in the SDK and the submission will fail.


If you discover any bugs or issues while working with SlcTerms, please reach out to [Azure Support](https://support.microsoft.com/topic/contact-microsoft-azure-support-2315e669-8b1f-493b-5fb1-d88a8736ffe4).
