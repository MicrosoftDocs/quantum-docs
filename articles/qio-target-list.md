---
author: geduardo
description: This document provides a list of the available optimization providers on Azure Quantum.
ms.author: kitty
ms.date: 04/03/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: List of optimization targets on Azure Quantum
uid: microsoft.quantum.reference.qio-target-list
---

# List of targets on Azure Quantum

Azure Quantum offers optimization targets to solve binary optimization problems on classical CPUs, or hardware accelerated on field-programmable gate arrays (FPGA), GPUs or hardware annealers.

> [!NOTE]
> Optimization targets can't run Q# applications or any other type of quantum computing program. Optimization solvers are optimization algorithms that run on specialized classical hardware.

## Provider: 1Qbit

![alt_text=logo of 1qbit](~/media/logo-1qbit.png)

### 1QBit Tabu Search Solver

An iterative heuristic algorithm that uses local search techniques to solve a QUBO problem. It starts from a random solution and looks for an improved solution in the solution's neighborhood which includes all possible single flips. The algorithm stops when it reaches a stopping criterion, such as a specified number of consecutive iterations without improvement.

For more information, go to the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit#:pticm-solver).

### 1QBit PTICM Solver

The parallel tempering with isoenergetic cluster moves (PTICM) solver is a Monte Carlo approach to solving QUBO problems. In this algorithm, multiple replicas of the original system, each with a different initial state, are simulated at different temperatures simultaneously. The replicas at neighboring temperatures are periodically swapped based on a Metropolis criterion. These swaps allow different replicas to do a random walk in the temperature space, thereby, efficiently overcoming energy barriers.

For more information, go to the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit).

### 1QBit Path-Relinking Solver

The parallel tempering with isoenergetic cluster moves (PTICM) solver is a Monte Carlo approach to solving QUBO problems. In this algorithm, multiple replicas of the original system, each with a different initial state, are simulated at different temperatures simultaneously. The replicas at neighboring temperatures are periodically swapped based on a Metropolis criterion. These swaps allow different replicas to do a random walk in the temperature space, thereby, efficiently overcoming energy barriers.

For more information, go to the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit#path-relinking-solver).

## Provider: Microsoft QIO

![alt_text=logo of Microsoft](~/media/logo-microsoft.png)

For an overview of the Microsoft QIO solvers available, please refer to the [Microsoft QIO overview page](xref:microsoft.quantum.optimization.providers.microsoft.qio).
### Simulated Annealing

Rephrases the optimization problem as a thermodynamic system and considers the energy of a single system. Changes to the system are accepted if they decrease the energy or meet a criterion based on decreasing temperature. This target can be run on CPU or FPGA hardware. For more information, go to the [Microsoft QIO provider reference page](xref:microsoft.quantum.optimization.simulated-annealing).

### Parallel Tempering

Rephrases the optimization problem as a thermodynamic system and runs multiple copies of a system, randomly initialized, at different temperatures. Then, based on a specific protocol, exchanges configurations at different temperatures to find the optimal configuration. This target is available on CPUs only. For more information, go to the [Microsoft QIO provider reference page](xref:microsoft.quantum.optimization.parallel-tempering).

### Tabu search

Tabu Search looks at neighboring configurations. It can accept worsening moves if no improving moves are available and prohibit moves to previously-visited solutions. For more information, go to the [Microsoft QIO provider reference page](xref:azure.quantum.optimization.tabu).

### Quantum Monte Carlo

Quantum Monte Carlo is a Metropolis annealing algorithm, similar in concept to simulated annealing that starts at a low temperature and improves the solution by searching across barriers with some probability as an external perturbation is applied to the system. As this external field is varied over every Monte Carlo step, the configuration may be able to tunnel through energy barriers and evolve towards a desired ground state (without possessing the thermal energy needed to climb the barriers, as would be required in simulated annealing). For more information, go to the [Microsoft QIO provider reference page](xref:microsoft.quantum.optimization.quantum-monte-carlo).
