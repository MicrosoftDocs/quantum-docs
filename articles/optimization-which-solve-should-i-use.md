---
title: Which optimization solver should I use?
description: This document provides a basic guide on which solvers to use.
author: quantumrandom
ms.author: dasteige
ms.date: 11/27/2020
ms.topic: article
uid: azure.quantum.optimization.choose-solver
---

# Which optimization solver should I use?

It is unfortunately not possible to determine *a priori* which solver will perform best for a new optimization problem. In the following, we describe our suggested strategy to find a suitable solver by benchmarking.

## Benchmarking objective

The benchmarking objective will have a large influence on the selection of a suitable solver. This objective for the solvers is dictated by the application. For example, one benchmarking objective is to find the closest solution to the global minimum. Another objective might be to find the closest solution to the global minimum but in a given time interval or for a specified runtime cost. 
If one is interested in solving many problems from a similar domain, a benchmarking objective might be to find a solver which produces good results for most instances, rather than returning very good results for some instances but failing to give a good enough solution for the remaining instances.

## Benchmarking strategy

Optimization problems from the same field of domain might share common features. We therefore suggest that you start with the solver which worked best for previous problems of the same domain and use this as a baseline. Nevertheless even in such a case it makes sense to benchmark the other solvers again from time to time.

We recommend that you to start with the parameter-free solvers as they don't require parameter tuning:

1. Parameter-free simulated annealing (SA):
   This provides a solid baseline for the runtime and possible minima.

2. Parameter-free parallel tempering (PT)

Automatically determining parameters for solvers is convenient but also creates a runtime overhead. If one has to solve many similar problems or wants to achieve better performance, parameterized solvers should be considered. We suggest to start with parametrized SA if the parameter-free SA solver provided better results than the parameter-free PT and otherwise start with parametrized PT.

Afterwards we recommend to benchmark the remaining solvers.
