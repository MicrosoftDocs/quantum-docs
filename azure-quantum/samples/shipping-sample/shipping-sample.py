#!/usr/bin/env python
# coding: utf-8

# Instantiate Workspace object which allows you to connect to the Workspace you've previously deployed in Azure. 
# Be sure to fill in the settings below which can be retrieved by running 'az quantum workspace show' in the terminal.
from azure.quantum import Workspace

# Copy the settings for your workspace below
workspace = Workspace(
    subscription_id=    "", # add your subscription_id
    resource_group=     "", # add your resource_group
    name=               "", # add your workspace name
)

workspace.login()

# Take an array of container weights and return a Problem object that represents the cost function
from typing import List
from azure.quantum.optimization import Problem, ProblemType, Term

def createProblemForContainerWeights(containerWeights: List[int]) -> Problem:
    terms: List[Term] = []

    # Expand the squared summation
    for i in range(len(containerWeights)):
        for j in range(len(containerWeights)):
            if i == j:
                # Skip the terms where i == j as they form constant terms in an Ising problem and can be disregarded:
                # w_i∗w_j∗x_i∗x_j = w_i​*w_j∗(x_i)^2 = w_i∗w_j​​
                # for x_i = x_j, x_i ∈ {1, -1}
                continue
            
            terms.append(
                Term(
                    w = containerWeights[i] * containerWeights[j],
                    indices = [i, j]
                )
            )

    # Return an Ising-type problem
    return Problem(name="Ship Sample Problem", problem_type=ProblemType.ising, terms=terms)

# This array contains a list of the weights of the containers
containerWeights = [1, 5, 9, 21, 35, 5, 3, 5, 10, 11]

# Create a problem for the list of containers:
problem = createProblemForContainerWeights(containerWeights)

# Submit problem to Azure Quantum using the ParallelTempering solver:
from azure.quantum.optimization import ParallelTempering
import time

# Instantiate a solver to solve the problem. 
solver = ParallelTempering(workspace, timeout=100)

# Optimize the problem
print('Submitting problem...')
start = time.time()
result = solver.optimize(problem)
timeElapsed = time.time() - start
print(f'\nResult in {timeElapsed} seconds:\n{result}\n')

# Print out a summary of the results:
def printResultSummary(result):
    # Print a summary of the result
    shipAWeight = 0
    shipBWeight = 0
    for container in result['configuration']:
        containerAssignment = result['configuration'][container]
        containerWeight = containerWeights[int(container)]
        ship = ''
        if containerAssignment == 1:
            ship = 'A'
            shipAWeight += containerWeight
        else:
            ship = 'B'
            shipBWeight += containerWeight

        print(f'Container {container} with weight {containerWeight} was placed on Ship {ship}')

    print(f'\nTotal weights: \n\tShip A: {shipAWeight} tonnes \n\tShip B: {shipBWeight} tonnes\n')

printResultSummary(result)

# Improving the Cost Function
# The cost function we've built works well so far, but let's take a closer look at the `Problem` that was generated:
print(f'\nThe original problem has {len(problem.terms)} terms for {len(containerWeights)} containers:')
print(problem.terms)

# We can reduce the number of terms by removing duplicates (see associated Jupyter notebook for details) 
# In code, this means a small modification to the createProblemForContainerWeights function:
def createSimplifiedProblemForContainerWeights(containerWeights: List[int]) -> Problem:
    terms: List[Term] = []

    # Expand the squared summation
    for i in range(len(containerWeights)-1):
        for j in range(i+1, len(containerWeights)):
            terms.append(
                Term(
                    w = containerWeights[i] * containerWeights[j],
                    indices = [i, j]
                )
            )

    # Return an Ising-type problem
    return Problem(name="Ship Sample Problem (Simplified)", problem_type=ProblemType.ising, terms=terms)

# Check that this creates a smaller problem
# Create the simplified problem
simplifiedProblem = createSimplifiedProblemForContainerWeights(containerWeights)
print(f'\nThe simplified problem has {len(simplifiedProblem.terms)} terms')

# Optimize the problem
print('\nSubmitting simplified problem...')
start = time.time()
simplifiedResult = solver.optimize(simplifiedProblem)
timeElapsedSimplified = time.time() - start
print(f'\nResult in {timeElapsedSimplified} seconds:\n{simplifiedResult}\n')
printResultSummary(simplifiedResult)