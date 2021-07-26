---
author: geduardo
description: This document provides a list of the available optimization providers on Azure Quantum.
ms.author: kitty
ms.date: 07/26/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: List of optimization targets on Azure Quantum
uid: microsoft.quantum.reference.qio-target-list
---

# List of targets on Azure Quantum

Azure Quantum offers optimization targets to solve binary optimization problems on classical CPUs, or hardware accelerated on field-programmable gate arrays (FPGA), GPUs, or hardware annealers.

> [!NOTE]
> Optimization targets can't run Q# applications or any other type of quantum computing program. Optimization solvers are optimization algorithms that run on specialized classical hardware.

## Provider: 1QBit

![alt_text=logo of 1qbit](~/media/logo-1qbit.png)

### 1QBit Tabu Search Solver


An iterative heuristic algorithm that uses local search techniques to solve a QUBO problem. It starts from a random solution and looks for an improved solution in the solution's neighborhood that includes all possible single flips. The algorithm stops when it reaches a stopping criterion, such as a specified number of consecutive iterations without improvement.


For more information, see the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit#tabu-search-solver).

### 1QBit PTICM Solver

The parallel tempering with isoenergetic cluster moves (PTICM) solver is a Monte Carlo approach to solving QUBO problems. In this algorithm, multiple replicas of the original system, each with a different initial state, are simulated at different temperatures simultaneously. The replicas at neighboring temperatures are periodically swapped based on a Metropolis criterion. These swaps allow different replicas to do a random walk in the temperature space, thereby, efficiently overcoming energy barriers.

For more information, see the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit#pticm-solver).

### 1QBit Path-Relinking Solver

The path-relinking algorithm is a heuristic algorithm that uses the tabu search as a subroutine to solve a QUBO problem. The algorithm starts from a set of elite solutions found by the tabu search. It then constructs a path between each pair of elite solutions, selects one of the solutions along the path, and repeats the tabu search. If the tabu search finds a distinct solution that is better than the current worst elite solution, the elite solutions set is updated with the new improved solution. This whole procedure is repeated until the algorithm meets a stopping condition.

For more information, see the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit#path-relinking-solver).

## Provider: Microsoft QIO

![alt_text=logo of Microsoft](~/media/logo-microsoft.png)


For an overview of the available Microsoft QIO solvers, see the [Microsoft QIO provider](xref:microsoft.quantum.optimization.providers.microsoft.qio) overview page.


### Simulated Annealing

Rephrases the optimization problem as a thermodynamic system and considers the energy of a single system. Changes to the system are accepted if they decrease the energy or meet a criterion based on decreasing temperature. This target can be run on CPU or FPGA hardware. For more information, see the [Simulated annealing](xref:microsoft.quantum.optimization.simulated-annealing) reference page.

### Population Annealing

Aims to alleviate the susceptibility of the Metropolis Algorithm to rough cost landscapes by simulating a population of metropolis walkers, which continuously consolidates search efforts around favorable states. This target is available on CPUs. For more information, see the [Population annealing](xref:microsoft.quantum.optimization.population-annealing) reference page.

### Parallel Tempering

Rephrases the optimization problem as a thermodynamic system and runs multiple copies of a system, randomly initialized, at different temperatures. Then, based on a specific protocol, exchanges configurations at different temperatures to find the optimal configuration. This target is available on CPUs only. For more information, see the [Parallel tempering](xref:microsoft.quantum.optimization.parallel-tempering) reference page.

### Tabu search

Tabu Search looks at neighboring configurations. It can accept worsening moves if no improving moves are available, and prohibit moves to previously visited solutions. For more information, see the [Tabu search optimization solver](xref:microsoft.quantum.optimization.tabu) reference page.

### Quantum Monte Carlo

Quantum Monte Carlo is a Metropolis annealing algorithm, similar in concept to simulated annealing that starts at a low temperature and improves the solution by searching across barriers with some probability as an external perturbation is applied to the system. As this external field is varied over every Monte Carlo step, the configuration may be able to tunnel through energy barriers and evolve towards a desired ground state (without possessing the thermal energy needed to climb the barriers, as would be required in simulated annealing). For more information, see the [Quantum Monte Carlo](xref:microsoft.quantum.optimization.quantum-monte-carlo) reference page.

### Substochastic Monte Carlo

Substochastic Monte Carlo is a diffusion Monte Carlo algorithm inspired by adiabatic quantum computation. It simulates the diffusion of a population of walkers in search space, while walkers are removed or duplicated based on how they perform according to the cost function. This target is available on CPUs. For more information, see the [Substochastic Monte Carlo](xref:microsoft.quantum.optimization.substochastic-monte-carlo) reference page.

