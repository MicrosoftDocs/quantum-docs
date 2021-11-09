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

This feature is available for Microsoft's **Population Annealing** and **Substochastic Monte Carlo** solvers only.

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
