---
author: SoniaLopezBravo
description: This document provides a basic guide about how to use the Quantum Monte Carlo QIO solver.
ms.author: sonialopez
ms.date: 10/11/2022
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: how-to
title: Quantum Monte Carlo
uid: microsoft.quantum.optimization.quantum-monte-carlo
---

# Quantum Monte Carlo

[Quantum Monte Carlo](https://en.wikipedia.org/wiki/Quantum_Monte_Carlo) is a Metropolis annealing algorithm, similar in concept to [simulated annealing](xref:microsoft.quantum.optimization.simulated-annealing) that starts at a low temperature and improves the solution by searching across barriers with some probability as an external perturbation is applied to the system.
As this external field is varied over every Monte Carlo step, the configuration may be able to tunnel through energy barriers and evolve towards a desired ground state (without possessing the thermal energy needed to climb the barriers, as would be required in simulated annealing).

In Azure Quantum, the core of algorithmic approach to the Quantum Monte Carlo implementation is based on the [Wolff algorithm](https://en.wikipedia.org/wiki/Wolff_algorithm) for annealing and this approach is extended with various improvement for computational efficiency.

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of the [`azure-quantum` Python package](xref:microsoft.quantum.install-qdk.overview.python-only) (if you are working on Azure Quantum notebook, this is not required).

## Features of Quantum Monte Carlo on Azure Quantum

- Parameterized mode (with parameters)
- Ising and PUBO input formats
- CPU only
  
## When to use Quantum Monte Carlo

This algorithm should perform best in the following two scenarios:

- When there are tall, narrow barriers in the energy landscape (cost function).
- If the solution is already at a feasible configuration at a low temperature and the user wishes to improve the solution.

> [!NOTE]
> For further information on determining which solver to use, refer to [Which optimization solver should I use?](xref:microsoft.quantum.optimization.choose-solver).
  
## Apply Quantum Monte Carlo

First, import `QuantumMonteCarlo` solver. The solver takes a previously created `workspace` object and various input parameters. 

```python
from azure.quantum.optimization import QuantumMonteCarlo

solver = QuantumMonteCarlo(workspace, sweeps = 2, trotter_number = 10, restarts = 72, beta_start = 0.1, transverse_field_start = 10, transverse_field_stop = 0.1, seed = 22)
```

### Parameterized Quantum Monte Carlo 

Quantum Monte Carlo supports the following input parameters:

| Parameter Name | Description |
|----------------|-------------|
| `sweeps`       |   Number of sets of iterations to run over the variables of a problem. More sweeps will usually always improve the solution (unless it is already at the global min).|
| `trotter_number`| The number of copies of every variable to generate for running the simulation. |
|`restarts`| The number of repeats of the annealing schedule to run. Each restart will start with a random configuration unless an initial configuration is supplied in the problem file. The restarts will be executed in parallel and split amongst the threads of the virtual machine. Recommended to set this value to at least 72.|
|`beta_start`| Represents the temperature at which the annealing schedule is executed. This should be a value low enough to produce a feasible configuration. |
|`transverse_field_start` & `transverse_field_stop`| Represents the starting and stopping values of the external field applied to the annealing schedule. A suitable value for these parameters will depend entirely on the problem and the magnitude of its changing moves. In general a non-zero and declining acceptance probability is sufficient.|
|`seed` (optional)| Seed value - used for reproducing results. |
