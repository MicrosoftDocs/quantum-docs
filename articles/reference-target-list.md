---
author: geduardo
description: This document provides a list of the available providers on Azure Quantum.
ms.author: kitty
ms.date: 04/03/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: List of targets on Azure Quantum
uid: microsoft.quantum.reference.target-list
---

# List of targets on Azure Quantum

## Optimization targets

Azure Quantum offers optimization targets to solve binary optimization problems on classical CPUs, or hardware accelerated on field-programmable gate arrays (FPGA), GPUs or hardware annealers.

> [!NOTE]
> Optimization targets can't run Q# applications or any other type of quantum computing program. Optimization solvers are optimization algorithms that run on specialized classical hardware.

### Provider: 1Qbit

![alt_text=logo of 1qbit](~/media/logo-1qbit.png)

#### 1QBit Tabu Search Solver

An iterative heuristic algorithm that uses local search techniques to solve a QUBO problem. It starts from a random solution and looks for an improved solution in the solution's neighborhood which includes all possible single flips. The algorithm stops when it reaches a stopping criterion, such as a specified number of consecutive iterations without improvement.

For more information, go to the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit#:pticm-solver).

#### 1QBit PTICM Solver

The parallel tempering with isoenergetic cluster moves (PTICM) solver is a Monte Carlo approach to solving QUBO problems. In this algorithm, multiple replicas of the original system, each with a different initial state, are simulated at different temperatures simultaneously. The replicas at neighboring temperatures are periodically swapped based on a Metropolis criterion. These swaps allow different replicas to do a random walk in the temperature space, thereby, efficiently overcoming energy barriers.

For more information, go to the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit).

#### 1QBit Path-Relinking Solver

The parallel tempering with isoenergetic cluster moves (PTICM) solver is a Monte Carlo approach to solving QUBO problems. In this algorithm, multiple replicas of the original system, each with a different initial state, are simulated at different temperatures simultaneously. The replicas at neighboring temperatures are periodically swapped based on a Metropolis criterion. These swaps allow different replicas to do a random walk in the temperature space, thereby, efficiently overcoming energy barriers.

For more information, go to the [1QBit provider reference page](xref:microsoft.quantum.providers.optimization.1qbit#path-relinking-solver).

### Provider: Microsoft QIO

![alt_text=logo of Microsoft](~/media/logo-microsoft.png)

#### Simulated Annealing

Rephrases the optimization problem as a thermodynamic system and considers the energy of a single system. Changes to the system are accepted if they decrease the energy or meet a criterion based on decreasing temperature. This target can be run on CPU or FPGA hardware. For more information, go to the [Microsoft QIO provider reference page](xref:microsoft.quantum.optimization.simulated-annealing).

#### Parallel Tempering

Rephrases the optimization problem as a thermodynamic system and runs multiple copies of a system, randomly initialized, at different temperatures. Then, based on a specific protocol, exchanges configurations at different temperatures to find the optimal configuration. This target can be run on CPU or FPGA hardware. For more information, go to the [Microsoft QIO provider reference page](xref:microsoft.quantum.optimization.parallel-tempering).

#### Tabu search

Tabu Search looks at neighboring configurations. It can accept worsening moves if no improving moves are available and prohibit moves to previously-visited solutions. For more information, go to the [Microsoft QIO provider reference page](xref:microsoft.quantum.optimization.providers.microsoft.qio).

#### Quantum Monte Carlo

Quantum Monte Carlo is a Metropolis annealing algorithm, similar in concept to simulated annealing that starts at a low temperature and improves the solution by searching across barriers with some probability as an external perturbation is applied to the system. As this external field is varied over every Monte Carlo step, the configuration may be able to tunnel through energy barriers and evolve towards a desired ground state (without possessing the thermal energy needed to climb the barriers, as would be required in simulated annealing). For more information, go to the [Microsoft QIO provider reference page](xref:microsoft.quantum.optimization.quantum-monte-carlo).

## Quantum computing targets

Azure Quantum also offers a variety of quantum solutions, such as
different hardware devices and quantum simulators that you can use to run Q# quantum computing programs.

### Provider: IonQ

![alt_text=logo of IonQ-2](~/media/logo-ionq.png)

#### IonQ Quantum Simulator

GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer. For more information, go to the [IonQ provider reference page](xref:microsoft.quantum.providers.ionq#quantum-simulator).

#### IonQ Quantum Computer

Trapped ion quantum computer. Dynamically reconfigurable in software to use up to 11 qubits. All qubits are fully connected, meaning you can run a two-qubit gate between any pair. For more information, go to the [IonQ provider reference page](xref:microsoft.quantum.providers.ionq#quantum-computer).

### Provider: Honeywell

![alt_text=logo of Honeywell](~/media/logo-honeywell.png)

#### API Validator

Tool to verify proper syntax and compilation completion. Full stack is exercised with the exception of the actual quantum operations. Assuming no bugs, all zeros are returned in the proper data structure. For more information, go to the [Honeywell provider reference page](xref:microsoft.quantum.providers.honeywell#api-validator).

#### Honeywell System Model H0

Trapped ion quantum computer with 6 physical fully connected qubits and laser based gates. It uses a QCCD architecture with linear trap and two parallel operation zones. For more information, go to the [Honeywell provider reference page](xref:microsoft.quantum.providers.honeywell#honeywell-system-model-h1).

#### Honeywell System Model H1

Trapped ion quantum computer with 10 physical fully connected qubits and laser based gates. It uses a QCCD architecture with linear trap and two parallel operation zones. For more information, go to the [Honeywell provider reference page](xref:microsoft.quantum.providers.honeywell#honeywell-system-model-h1)
