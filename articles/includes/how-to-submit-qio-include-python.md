---
author: SoniaLopezBravo
ms.author: v-sonialopez
ms.date: 09/10/2021
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: include
---

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
