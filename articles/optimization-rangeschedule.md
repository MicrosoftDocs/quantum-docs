---
author: danielstocker
description: Reference for azure.quantum.optimization.RangeSchedule
ms.author: dasto
ms.date: 03/02/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Quantum optimization range schedule
uid: microsoft.quantum.optimization.rangeschedule
---

# Quantum optimization range schedule

## RangeSchedule

```py
from azure.quantum.optimization import RangeSchedule
```

Some solvers allow you to specify an instance of the RangeSchedule class as an input. 
A RangeSchedule can be created with two different types of schedules (either linear or geometric).
We recommend reviewing our [Solver Inputs](/azure/quantum/optimization-input-formats) documentation for more details.

### Constructor

- `schedule_type`: This is a string indicating the type of schedule. The accepted values are `linear` and `geometric`.
- `initial`: A floating point value indicating the initial value of the schedule.
- `final`: A floating point value indicating the final value of the schedule.

For instance, if you want to create a linear range schedule that increases from 0 to 5 over time:
 
```py
RangeSchedule("linear", 0, 5)
```

 Or, if you want to create a geometric range schedule that decreases from 1 to 0:
  ```py
 RangeSchedule("geometric", 1, 0)
```
