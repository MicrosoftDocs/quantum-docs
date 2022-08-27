---
author: bradben
description: Learn about the Quantum Katas - hands-on training exercises and tutorials for programming in Q# with the Azure Quantum service and the Microsoft Quantum Development Kit.
ms.author: brbenefield
ms.date: 08/26/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v']
title: Introduction to the Quantum Katas
uid: microsoft.quantum.tutorial-qdk.katas
---

# Learn quantum computing with the Quantum Katas

**ka·​ta** | *kah-tuh* 

*A pattern for learning, practicing and implementing new skills, methods and processes.*

The Quantum Katas are open-source, self-paced tutorials and programming exercises that teach the elements of quantum computing and the Q# programming language at the same time.

## Learning by doing

The tutorials and exercises collected in the [Quantum Katas](https://github.com/Microsoft/QuantumKatas/) emphasize hands-on experience to reinforce learning the concepts. The programming tasks cover a variety of quantum concepts which progress from very simple to quite challenging. For each task, you need to fill in some missing code; the first katas might require just one line, while later exercises might require a sizable fragment of code.

Most importantly, the katas include testing frameworks that run and validate your solutions to the exercises. This allows you to get immediate feedback on your solutions and to reconsider your approach if it is incorrect. And if you get stuck, most katas have an accompanying workbook with the correct solutions and explanations.

You can use the katas in your choice of environments:

* Jupyter Notebooks in a pre-configured online Binder environment, with no setup needed
* Jupyter Notebooks running on your local machine
* Visual Studio on your local machine
* Visual Studio Code on your local machine

## What concepts do the Quantum Katas cover?

Each kata explores a fundamental concept of quantum computing, with some covering the basics and some diving deeper into quantum algorithms and protocols. The following learning path is recommended to get started and to make sure you have a solid grasp on the fundamental concepts of quantum computing. Of course, you can skip the topics you're comfortable with and explore the katas in any order you want.

### Introduction to quantum computing

| Kata | Description |
|:-----|-------------|
|[Complex arithmetic](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/ComplexArithmetic)|This tutorial explains some of the mathematical background required to work with quantum computing, such as imaginary and complex numbers.|
|[Linear algebra](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/LinearAlgebra)|Linear algebra is used to represent quantum states and operations in quantum computing. This tutorial covers the basics, including matrices and vectors.|
|[The concept of a qubit](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/Qubit)|Learn about qubits - one of the core concepts of quantum computing. |
|[Single-qubit quantum gates](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/SingleQubitGates)|This tutorial introduces single-qubit quantum gates, which act as the building blocks of quantum algorithms and transform quantum qubit states in various ways.|
|[Multi-qubit systems](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/MultiQubitSystems)|This tutorial introduces multi-qubit systems, their representation in mathematical notation and in Q# code, and the concept of entanglement.|
|[Multi-qubit quantum gates](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/MultiQubitGates)|This tutorial follows the [Single-qubit quantum gates](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/SingleQubitGates) tutorial, and focuses on applying quantum gates to multi-qubit systems.|

### Quantum computing fundamentals

| Kata | Description |
|:-----|-------------|
|[Recognizing quantum gates](https://github.com/microsoft/QuantumKatas/tree/main/BasicGates)|A series of exercises designed to get you familiar with the basic quantum gates in Q#. Includes exercises for basic single-qubit and multi-qubit gates, adjoint and controlled gates, and how to use gates to modify the state of a qubit.|
|[Creating quantum superposition](https://github.com/microsoft/QuantumKatas/tree/main/Superposition)|Use these exercises to get familiar with the concept of superposition and programming in Q#. Includes exercises for basic single-qubit and multi-qubit gates, superposition, and flow control and recursion in Q#.|
|[Distinguishing quantum states using measurements](https://github.com/microsoft/QuantumKatas/tree/main/Measurements)|Solve these exercises while learning about quantum measurement and orthogonal and non-orthogonal states. |
|[Joint measurements](https://github.com/microsoft/QuantumKatas/tree/main/JointMeasurements)|Learn about joint parity measurements and how to use the [Measure](xref:Microsoft.Quantum.Intrinsic.Measure) operation to distinguish quantum states.|

### Quantum algorithms

| Kata | Description |
|:-----|-------------|
|[Quantum teleportation](https://github.com/microsoft/QuantumKatas/tree/main/Teleportation)|This kata explores quantum teleportation - a protocol which allows communicating a quantum state using only classical communication and previously shared quantum entanglement.|
|[Superdense coding](https://github.com/microsoft/QuantumKatas/tree/main/SuperdenseCoding)|Superdense coding is a protocol that allows transmission of two bits of classical information by sending just one qubit using previously shared quantum entanglement.  |
|[Deutsch–Jozsa algorithm](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/ExploringDeutschJozsaAlgorithm)|This algorithm is famous for being one of the first examples of a quantum algorithm that is exponentially faster than any deterministic classical algorithm.|
|[Exploring high-level properties of Grover's search algorithm](https://github.com/microsoft/QuantumKatas/tree/main/tutorials/ExploringGroversAlgorithm)|A high-level introduction to one of the most famous algorithms in quantum computing. It solves the problem of finding an input to a black box (oracle) that produces a particular output. |
|[Implementing Grover's search algorithm](https://github.com/microsoft/QuantumKatas/tree/main/GroversAlgorithm)|This kata dives deeper into Grover's search algorithm, and covers writing oracles, performing steps of the algorithm, and finally putting it all together.|
|[Solving real problems using Grover's algorithm: SAT problems](https://github.com/microsoft/QuantumKatas/tree/main/SolveSATWithGrover)|A series of exercises that uses Grover's algorithm to solve realistic problems, using [boolean satisfiability problems](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem) (SAT) as an example.  |
|[Solving real problems using Grover's algorithm: Graph coloring problems](https://github.com/microsoft/QuantumKatas/tree/main/GraphColoring)| This kata further explores Grover's algorithm, this time to solve [constraint satisfaction problems](https://en.wikipedia.org/wiki/Constraint_satisfaction_problem), using a graph coloring problem as an example. |

### Quantum protocols and libraries

| Kata | Description |
|:-----|-------------|
|[BB84 protocol for quantum key distribution](https://github.com/microsoft/QuantumKatas/tree/main/KeyDistribution_BB84)|Learn about and implement a quantum key distribution protocol, [BB84](https://en.wikipedia.org/wiki/BB84), using qubits to exchange cryptographic keys. |
|[Bit-flip error correcting code](https://github.com/microsoft/QuantumKatas/tree/main/QEC_BitFlipCode)|Explore quantum error correction with the simplest of the quantum error-correction (QEC) codes - the three-qubit bit-flip code.|
|[Phase estimation](https://github.com/microsoft/QuantumKatas/blob/main/PhaseEstimation)|Phase estimation algorithms are some of the most fundamental building blocks of quantum computing. Learn about phase estimation with these exercises that cover quantum phase estimation and how to prepare and run phase estimation routines in Q#.|
|[Quantum arithmetic: Building ripple-carry adders](https://github.com/microsoft/QuantumKatas/blob/main/RippleCarryAdder)|An in-depth series of exercises that explores [ripple carry](https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder) addition on a quantum computer. Build an in-place quantum adder, expand on it with a different algorithm, and finally, build an in-place quantum subtractor.   |

### Quantum entanglement games

| Kata | Description |
|:-----|-------------|
|[CHSH game](https://github.com/microsoft/QuantumKatas/tree/main/CHSHGame)|Explore quantum entanglement with an implementation of the [CHSH](https://en.wikipedia.org/wiki/CHSH_inequality) game. This [nonlocal](https://en.wikipedia.org/wiki/Quantum_refereed_game) game shows how quantum entanglement can be used to increase the players' chance of winning beyond what would be possible with a purely classical strategy.|
|[GHZ game](https://github.com/microsoft/QuantumKatas/tree/main/GHZGame)|The GHZ game is another nonlocal game, but involves three players.|
|[Mermin-Peres magic square game](https://github.com/microsoft/QuantumKatas/tree/main/MagicSquareGame)|A series of exercises that explores [quantum pseudo-telepathy](https://en.wikipedia.org/wiki/Quantum_pseudo-telepathy#The_Mermin%E2%80%93Peres_magic_square_game) to solve a magic square game.  |

## Next steps

* Explore the full series of [Quantum Katas](https://github.com/microsoft/QuantumKatas)
* Run the Quantum Katas [online](https://aka.ms/try-quantum-katas)