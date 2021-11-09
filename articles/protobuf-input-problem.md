---
author: sanjgupt
description: Reference for submitting input problems as protobuf binary
ms.author: sanjgupt
ms.date: 11/09/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: reference
title: Protobuf binary input problem
uid: microsoft.quantum.optimization.protobuf
---

# Input problem serialized to protobuf binary

Azure Quantum now provides support for submitting optimization problems in protobuf in place of json. This is an optional feature.
JSON will continue to be supported at this time.
This feature is only for encoding input problems which maybe significantly large in size and performance can benefit from a binary encoded data format.
Note that no change is made to the format itself but rather only its encoding. The format matches the json format exactly and supports version "1.1".  
The user can specify the problem type, the terms, initial configuration and problem metadata (eg: problem name) exactly as is supported currently in json.

To submit a problem with protobuf serialization in the problem object definition specify the newly added optional parameter **content_type** to **Content.protobuf**.
The default is assumed to **ContentType.json**.

```py
problem = Problem(name = "sample_problem", content_type = ContentType.protobuf)
job = solver.submit(problem)
```

The result will be returned back as a json.
You may continue to serialize, download and deserialize problems as before.
One breaking change has been introduced in the deserialize method of the Problem class.
The parameter **problem_as_json** has been renamed to **input_problem**.

```py
deserialized_problem = Problem.deserialize(input_problem = your_problem)

```

For more information on cost functions and how terms relate to a problem definition, see the following topics:

- [Cost functions](xref:microsoft.quantum.optimization.concepts.cost-function)
- [Term](xref:microsoft.quantum.optimization.term)
- [Problem](xref:microsoft.quantum.optimization.problem)

## Availability

Protobuf serialization is a new "Early Access" feature in the *azure-quantum* Python package, and is currently supported by two Microsoft QIO solvers:

- [Substochastic Monte Carlo](xref:microsoft.quantum.reference.qio-target-list#substochastic-monte-carlo)
- [Population Annealing](xref:microsoft.quantum.reference.qio-target-list#population-annealing)

If you submit problems as protobuf to a solver that doesn't support them, a client error will appear in the SDK and the submission will fail.

If you discover any bugs or issues while working with protobuf, please reach out to [Azure Support](https://support.microsoft.com/topic/contact-microsoft-azure-support-2315e669-8b1f-493b-5fb1-d88a8736ffe4).
