---
title: QIO Optimization Troubleshooting
description: This document provides a basic guide for users on how to troubleshoot common errors when using the service. 
author: adelebai
ms.author: adbai
ms.date: 03/16/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
uid: azure.quantum.optimization.troubleshooting
---

# Troubleshooting User Errors

This document lists the common user errors return by the azure quantum solvers, and troubleshooting steps for each error. The error messages returned by solvers should have an error code (in the form _\<code\>) attached that the user should use to find their specific issue. 

# Insufficient Resources (Range 001-100)

Errors in this category are due to lack of resources to carry out a specific job. This could be caused by factors such as problem size, or parameter settings. 

## 001 - Memory Limited

**Cause**: This error happens when the submitted problem is too large (usually, due to too many terms) and cannot fit into memory. Users can *estimate* how much memory their problem will use with the following formula (although not 100% precise, it is quite close to real usage):


<center>memory_bytes = sum_coefficient_degrees_total*num_variables/8</center>

Where  
- num_variables = number of variables in problem  
- sum_coefficient_degrees_total = total sum of #variables in each term


An example with this formulation:
```json
"terms": [
    {
        "c": 1.0,
        "ids": [0, 1, 2]
    },
    {
        "c": 1.0,
        "ids": [2, 3, 4]
    }
]
```

Here num_variables = 5 ({0,1,2,3,4}) and sum_coefficient_degrees_total = 6 (3 + 3). Total bytes of memory estimated is 6*5/8 = 3.75 bytes. 


**Possible actions to take**: This error is hard to "fix" because some problems will unavoidably have large expanded term expressions, especially higher order problems. If you see this error then most likely at this time, our solvers are not capable of solving your problem. However, Azure Quantum is continuously developing support for more complex term expressions that can reduce the problem size in the future. Be sure to communicate the need for this feature to our support team!  

In the mean time, consider:  
- Removing constant terms (i.e. terms without variables, ising terms with even variable power etc.)
  

## 002 - Timeout Insufficient
**Cause**: This error happens when using parameter-free solvers specifically. It means that the "timeout" parameter (in seconds) is set too low for any meaningful exploration.

**Possible actions to take**:
- Increase the timeout value. This will depend on the solver that is being called, but in general 10s is sufficient for most problems. 
- If the problem is particularly large (10k+ variables) and/or with many terms, a larger timeout might be needed. 
  


# Invalid Input Data (Range 101-200)

Errors in this category are due to mistakes in the user inputs - either there was an issue with the cost function expression, or parameters are invalid. 

## 101 Duplicated Variable
**Cause**: This error happens when using the ising cost function. Azure Quantum solvers will only accept single-degree variables so if the user is submitting higher power variables, an error will be thrown. 

**Possible actions to take**:
- Condense all higher power variables into either a single variable, or a constant (1). See example below:

```json
"terms": [
    {
        "c": 1.0,
        "ids": [0, 0, 0, 1, 1]
    },
    {
        "c": 1.0,
        "ids": [2, 2]
    }
]
```

If pubo/hobo, this should get condensed to:
```json
"terms": [
    {
        "c": 1.0,
        "ids": [0, 1]
    },
    {
        "c": 1.0,
        "ids": [2]
    }
]
```

If ising, even-powered terms are 1 so this should get condensed to:
```json
"terms": [
    {
        "c": 1.0,
        "ids": [0]
    },
    {
        "c": 1.0,
        "ids": []
    }
]
```



## 102 Missing sections in Input Data

## 103 Invalid Types in Input Data

## 104 Initial Config Error

## 105 Couldn't Parse Input

## 106 Feature Enable Error

## 107 Invalid Values in Input Data