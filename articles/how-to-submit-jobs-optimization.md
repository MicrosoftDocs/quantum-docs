---
author: SoniaLopezBravo
description: This document provides a basic guide to submit and run optimization jobs Azure Quantum using Python SDK and Jupyter Notebooks. 
ms.author: v-sonialopez
ms.date: 08/12/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Submit optimization jobs to Azure Quantum
uid: microsoft.quantum.submit-jobs-optimization
---

# Submit optimization jobs to Azure Quantum

In this article you will find the steps for how to submit optimization jobs to Azure Quantum using Python SDK, Jupyter Notebooks, or the Azure CLI.

As an example, this article follows a sample shipping company that has a difficult business problem: Balancing the loads of container ships at port. If you are interested in the problem details, see the [shipping-loading sample](https://github.com/microsoft/qio-samples/tree/main/samples/ship-loading) .

## Select your environment

Select the option for your development environment:

### [Python SDK](#tab/tabid-python)

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.quickstarts.optimization.qio).
- The latest version of the [Python SDK for Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio#install-the-python-sdk-for-azure-quantum).

## Set up

First, you must instantiate a `Workspace` object, which allows you to connect to the workspace you've previously deployed in Azure. Be sure to fill in the following settings, which can be retrieved from the [Azure Portal](https://portal.azure.com/) or by opening a command prompt and running `az quantum workspace show` through the Azure CLI. Open a new python file and run the following lines:

```python
from azure.quantum import Workspace

# Copy the following settings for your workspace
workspace = Workspace ( 
	subscription_id = "", # Add your subscription_id 
	resource_group = "", # Add your resource_group 
	name = "", # Add your workspace name 
	location = ""  # Add your workspace location (for example, "westus") 
)
```
## Problem instantiation

To submit a problem to the Azure Quantum services, you first need to create a `Problem` instance. This is a Python object that stores all the required information, such as the cost function details and the kind of problem you are modeling.

```python
from typing import List
from azure.quantum.optimization import Problem, ProblemType, Term

def createProblemForContainerWeights(containerWeights: List[int]) -> Problem:
    terms: List[Term] = []

    # Expand the squared summation
    for i in range(len(containerWeights)):
        for j in range(len(containerWeights)):
            if i == j:
                # Skip the terms where i == j as they form constant terms in an Ising problem and can be disregarded.
                continue

            terms.append(
                Term(
                    c = containerWeights[i] * containerWeights[j],
                    indices = [i, j]
                )
            )

    # Return an Ising-type problem
    return Problem(name="Freight Balancing Problem", problem_type=ProblemType.ising, terms=terms)
```
Before submitting the problem to Azure Quantum, you instantiate it by defining a list of containers via their weights:

```python
# This array contains the weights of all the containers
containerWeights = [1, 5, 9, 21, 35, 5, 3, 5, 10, 11]

# Create a problem for the given list of containers:
problem = createProblemForContainerWeights(containerWeights)
```
## Submit the job to Azure Quantum

Now, submit the problem to Azure Quantum:
```python
from azure.quantum.optimization import ParallelTempering
import time

# Instantiate a solver to solve the problem.
solver = ParallelTempering(workspace, timeout=100)

# Optimize the problem
print('Submitting problem...')
start = time.time()
result = solver.optimize(problem)
timeElapsed = time.time() - start
print(f'Result in {timeElapsed} seconds: ', result)
```
> [!NOTE]
> This guide uses **Parameter-Free Parallel Tempering** solver with a timeout of 100 seconds as an example of a QIO solver. For more information about available solvers, you can visit the [Microsoft QIO provider](xref:microsoft.quantum.optimization.providers.microsoft.qio) documentation page.

Notice that the solver returns the results in the form of a Python dictionary, along with some metadata. For a more human-readable format, use the following function to print a summary of what the solution means:

```python
def printResultSummary(result):
    # Print a summary of the result
    containerAWeight = 0
    containerBWeight = 0
    for chunk in result['configuration']:
        chunkAssignment = result['configuration'][chunk]
        chunkWeight = containerWeights[int(chunk)]
        container = ''
        if chunkAssignment == 1:
            container = 'A'
            containerAWeight += chunkWeight
        else:
            container = 'B'
            containerBWeight += chunkWeight

        print(f'Container {container} with weight {container_weight} was placed on Ship {ship}')

    print(f'\nTotal weights: \n\tShip A: {ship_a_weight} tonnes \n\tShip B: {ship_b_weight} tonnes\n')

print_result_summary(result)
```
```output
Container 0 with weight 1 was placed on Ship A
Container 1 with weight 5 was placed on Ship B
Container 2 with weight 9 was placed on Ship A
Container 3 with weight 21 was placed on Ship A
Container 4 with weight 35 was placed on Ship B
Container 5 with weight 5 was placed on Ship B
Container 6 with weight 3 was placed on Ship B
Container 7 with weight 5 was placed on Ship B
Container 8 with weight 10 was placed on Ship A
Container 9 with weight 11 was placed on Ship A

Total weights: 
	Ship A: 52 tonnes 
	Ship B: 53 tonnes
```


### [Jupyter Notebooks](#tab/tabid-jupyter)

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.quickstarts.optimization.qio).
- The latest version of the [Python SDK for Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio#install-the-python-sdk-for-azure-quantum).
- [Jupyter Notebook](xref:microsoft.quantum.quickstarts.optimization.qio#jupyter-notebooks-installation).

##  Set up

1. Run `jupyter notebook` from the terminal of your choice. This starts the notebook server and opens Jupyter in a browser. In the browser view, select the dropdown button on the right hand top corner and select  `Python 3`  from the list. This should create a new notebook. 
2. Instantiate a `Workspace` object which allows you to connect to the Workspace you've previously deployed in Azure. Be sure to fill in the settings below which can be retrieved by running `az quantum workspace show`.

```python
# This allows you to connect to the Workspace you've previously deployed in Azure. 
from  azure.quantum  import  Workspace  

# Copy the settings for your workspace below  
workspace = Workspace ( 
	subscription_id = "", # Add your subscription_id 
	resource_group = "", # Add your resource_group 
	name = "", # Add your workspace name 
	location = ""  # Add your workspace location (for example, "westus") )
```
## Problem instantiation

To submit a problem to the Azure Quantum services, you first need to create a `Problem` instance. This is a Python object that stores all the required information, such as the cost function details and the kind of problem we are modeling.

Next, define a function that takes an array of container weights and returns a `Problem` object that represents the cost function. The following function generalizes the `Term` creation for any number of weights by using some for loops. It takes an array of weights and returns a `Problem` object.

```python
from typing import List
from azure.quantum.optimization import Problem, ProblemType, Term

def create_problem_for_container_weights(container_weights: List[int]) -> Problem:
    terms: List[Term] = []

    # Expand the squared summation
    for i in range(len(container_weights)):
        for j in range(len(container_weights)):
            if i == j:
                # Skip the terms where i == j as they form constant terms in an Ising problem and can be disregarded:
                # w_i∗w_j∗x_i∗x_j = w_i​*w_j∗(x_i)^2 = w_i∗w_j​​
                # for x_i = x_j, x_i ∈ {1, -1}
                continue
            
            terms.append(
                Term(
                    c = container_weights[i] * container_weights[j],
                    indices = [i, j]
                )
            )

    # Return an Ising-type problem
    return Problem(name="Ship Sample Problem", problem_type=ProblemType.ising, terms=terms)
```
  
Next, define the list of containers and their weights and instantiate a problem:

```python
# This array contains a list of the weights of the containers
container_weights = [1, 5, 9, 21, 35, 5, 3, 5, 10, 11]

# Create a problem for the list of containers:
problem = create_problem_for_container_weights(container_weights)
```
## Submit the job to Azure Quantum

Now, submit the problem to Azure Quantum:
```python
from azure.quantum.optimization import ParallelTempering
import time

# Instantiate a solver to solve the problem. 
solver = ParallelTempering(workspace, timeout=100)

# Optimize the problem
print('Submitting problem...')
start = time.time()
result = solver.optimize(problem)
time_elapsed = time.time() - start
print(f'Result in {time_elapsed} seconds: ', result)
```
> [!NOTE]
> This guide uses **Parameter-Free Parallel Tempering** solver with a timeout of 100 seconds as an example of a QIO solver. For more information about available solvers, you can visit the [Microsoft QIO provider](xref:microsoft.quantum.optimization.providers.microsoft.qio) documentation page.

Notice that the solver returns the results in the form of a Python dictionary, along with some metadata. For a more human-readable format, use the following function to print a summary of what the solution means:

```python
def print_result_summary(result):
    # Print a summary of the result
    ship_a_weight = 0
    ship_b_weight = 0
    for container in result['configuration']:
        container_assignment = result['configuration'][container]
        container_weight = container_weights[int(container)]
        ship = ''
        if container_assignment == 1:
            ship = 'A'
            ship_a_weight += container_weight
        else:
            ship = 'B'
            ship_b_weight += container_weight

        print(f'Container {container} with weight {container_weight} was placed on Ship {ship}')

    print(f'\nTotal weights: \n\tShip A: {ship_a_weight} tonnes \n\tShip B: {ship_b_weight} tonnes\n')

print_result_summary(result)
```
```output
Container 0 with weight 1 was placed on Ship A
Container 1 with weight 5 was placed on Ship B
Container 2 with weight 9 was placed on Ship A
Container 3 with weight 21 was placed on Ship A
Container 4 with weight 35 was placed on Ship B
Container 5 with weight 5 was placed on Ship B
Container 6 with weight 3 was placed on Ship B
Container 7 with weight 5 was placed on Ship B
Container 8 with weight 10 was placed on Ship A
Container 9 with weight 11 was placed on Ship A

Total weights: 
	Ship A: 52 tonnes 
	Ship B: 53 tonnes
```
***

## Next steps

Now that you know how to submit jobs to Azure quantum, you can try to run the
different available [samples](https://github.com/microsoft/qio-samples/tree/main/samples) or try to submit your own projects.
