---
title: Troubleshooting user errors in optimization solvers
description: This document provides a basic guide for users on how to troubleshoot common errors when using optimization solvers with Azure Quantum. 
author: bradben
ms.author: brbenefield
ms.date: 10/25/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
uid: microsoft.quantum.optimization.troubleshooting
---

# Troubleshooting user errors in optimization solvers

This document lists the common user errors returned by the Azure Quantum optimization solvers, and troubleshooting steps for each error. The error messages returned by solvers have an error code in the form _\<code\> that you can use to find the specific issue. The code is prefixed with "AZQ".

## Insufficient Resources (Range 001-100)

Errors in this category are due to lack of resources to carry out a specific job. This can be caused by factors such as problem size, or parameter settings.

### AZQ001 - Memory Limited

**Cause**: This error happens when the submitted problem is too large (usually, due to too many terms) and can't fit into memory. Users can *estimate* how much memory their problem will use with the following formula (although not 100% precise, it's close to real usage): 

```
memory_bytes = sum_coefficient_degrees_total*num_variables/8
```

Where

- `num_variables` is the number of variables in the problem
- `sum_coefficient_degrees_total` is the total sum of  the number of variables in each term

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

Here, `num_variables = 5` (${0,1,2,3,4}$) and `sum_coefficient_degrees_total = 6` ($3 + 3$). The total bytes of memory estimated is $6*5/8 = 3.75 \text{bytes}$. 

**Possible actions to take**: This error is hard to resolve because some problems unavoidably have large expanded term expressions, especially higher-order problems. If you see this error, then, most likely at this time, our solvers are not capable of solving your problem. However, Azure Quantum is continuously developing support for more complex term expressions that can reduce the problem size in the future. Be sure to communicate the need for this feature to our support team!  

In the meantime, consider:  

- Removing constant terms (such as terms without variables or Ising terms with even variable power) 
  

### AZQ002 - Timeout Insufficient

**Cause**: This error happens when using parameter-free solvers specifically. It means that the "timeout" parameter (in seconds) is set too low for any meaningful exploration. Each solver has a different search process and some solvers take longer than others.

The table below shows the **bare minimum** timeout needed for a particular problem size to get a result (note: not necessarily a good one). Based on the size of your problem, you can adjust the numbers accordingly. 

| Problem | Simulated Annealing | Parallel Tempering | Tabu Search |
|-|-|-|-|
|Variables: 1024, Terms: 195k| 5s | 100s | 1s |


**Possible actions to take**:

- Increase the timeout value. This depends on the solver that is being called (see table above for starting point).
- If the problem is particularly large (10k+ variables) and/or with many terms, a larger timeout might be needed. 
  
## Invalid Input Data (Range 101-200)

Errors in this category are due to mistakes in the user inputs - either there was an issue with the cost function expression, or parameters are invalid.

### AZQ101 - Duplicated Variable

**Cause**: This error happens when using the Ising cost function. Azure Quantum solvers only accept single-degree variables, so if the user is submitting higher power variables, an error will be thrown. 

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

If PUBO/HOBO, this should get condensed to:

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

If Ising, even-powered terms are 1 so this should get condensed to:

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



### AZQ102 - Missing sections in Input Data

**Cause**: This error happens when there are missing fields in the input data. This usually only happens when submitting to the API directly, and not via the SDK. The SDK automatically formats the submitted terms in the correct structure.

The solver usually returns a more specific error with which fields are missing in the input. 

**Possible actions to take**:

- Look at the specific error message and determine which field is missing from the input. Ensure field is present and has a value of the correct type.
- Ensure all fields are present and have values in the input expression. **Avoid empty strings "" and null values**. 

```json
{
	"cost_function": {
		"type": "pubo",
		"version": "1.0",
		"terms": [{
			"c": 1.0,
			"ids": [0, 1]
		}, {
			"c": 0.36,
			"ids": [1, 2]
		}]
	}
}
```

### AZQ103 - Invalid Types in Input Data

**Cause**: This error happens when there are fields in the data with invalid types. For more information, see [How to express problem terms correctly](xref:microsoft.quantum.optimization.express-problem). The table below shows the expected types for each field. 

|Field Name| Expected Type| Common errors |
|-|-|-|
|c|double| Submitting this field in string form, for example "2.0" or null form. |
|indices|list of integers| Submitting this field in string form "[0,1]" or individual items as string form ["0", "1"]. Empty lists are allowed and are treated as constants. |

This could also happen in the parameters supplied to the solver. 

**Possible actions to take**:

- Ensure all types are converted correctly when using the SDK, especially if you are parsing these values from strings or existing files. 
- Ensure parameters that are lists are not supplied as strings of lists - for example, [0,1] instead of "[0,1]" or ["0", "1"]

### AZQ104 - Initial Config Error

**Cause**: This is a group of errors related to using the initial configuration setting. The error message returned from the solver should contain the specific message. Possible causes can include:

- Variable values are invalid and do not match the given problem type (Ising/PUBO). For example, this error appears if the original problem type is Ising and the initial configuration variables are found with values outside of 1 and -1. 
- Variable dimensions supplied in the initial configuration do not match the variable size of the original problem.

**Possible actions to take**:

- Ensure that initial configuration settings for variables are valid and only take two values (either (0|1) or (-1|1)).
- Ensure the variables in the configuration map are part of the initial problem and that you did not include any new variable IDs. 

### AZQ105 - Couldn't Parse Input

**Cause**: This error happens when the solver is unable to parse the input data. This usually only happens when submitting to the API directly, and not via the SDK. The SDK automatically formats the submitted terms in the correct JSON structure.

This happens when there's a syntax error in the input data JSON, or parameter file JSON. 

**Possible actions to take**:

- Use a JSON lint or formatter tool on the invalid JSON and correct the syntax errors. 
- Formulate problems with the SDK (which automatically submits problems in the correct form)

### AZQ106 - Feature Switch Error

**Cause**: This error happens when the feature switch functionality is used and an invalid feature ID is supplied. 

**Possible actions to take**:

- Reference the documentation and disable only the supported feature IDs. 

### AZQ107 - Invalid Values in Input

**Cause**: This error happens when there are forbidden or invalid values being inputted. This mostly happens if the parameters you set for the solver are not valid. 

**Possible actions to take**:

- Look at the specific error message and determine which field is invalid and the range of allowed values for that field. 
- Run the parameter-free solver version to obtain a starting point for parameter values.
- Most parameters require a value of >0 (such as restarts, replicas, and sweeps).
