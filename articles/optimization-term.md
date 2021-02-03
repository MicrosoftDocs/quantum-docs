---
author: frtibble
description: Reference for azure.quantum.optimization.Term
ms.author: frtibble
ms.date: 03/02/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Quantum optimization term
uid: microsoft.quantum.optimization.term
---

# Quantum optimization term

## Term

```py
from azure.quantum.optimization import Term
```

### Constructor

An optimization problem consists of a sum of terms, each of which we can represent with the `Term` object.
To create a `Term` object, you specify the following parameters:

- `c`: This corresponds to the coefficient.
- `indices`: This corresponds to the product. More specifically, it is populated with the indices of all variables appearing in the term.

 For instance, the term $2 \cdot (x_1 \cdot x_2)$ translates to the following object: 
 
 ```py
 Term(c=2, indices=[1,2]).
```

 Or, the term $3 \cdot (x_0 \cdot x_1 \cdot x_2)$ translates to the following object:
  ```py
 Term(c=3, indices=[0,1,2]).
```

For more information on cost functions and how terms relate to a problem definition, see [Cost functions](https://docs.microsoft.com/azure/quantum/optimization-concepts-cost-functions).
Terms can be supplied to a `Problem` object, see [Problem](https://docs.microsoft.com/azure/quantum/optimization-problem).
