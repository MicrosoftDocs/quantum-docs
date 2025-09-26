---
author: azure-quantum-content
description: Learn how quantum computing works, how it compares to classical computing, and how it uses the principles of quantum mechanics.
ms.date: 05/19/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, target, targets]
title: What Is Quantum Computing?
uid: microsoft.quantum.overview.understanding
ai-usage: ai-assisted
#customer intent: As a quantum developer, I want to know how quantum computing works
---

# What is quantum computing?

Quantum computing holds the promise of solving some of our planet's biggest challenges - in the areas of environment, agriculture, health, energy, climate, materials science, and more. For some of these problems, classical computing is increasingly challenged as the size of the system grows. When designed to scale, quantum systems will likely have capabilities that exceed those of today's most powerful supercomputers.

This article explains the principles of quantum computing, how it compares to classical computing, and how it uses the principles of quantum mechanics.

## History of quantum computing

Quantum systems, such as atoms and molecules, can be difficult or impossible to simulate on a classical computer. In the 1980s, Richard Feynman and Yuri Manin suggested that hardware based on quantum phenomena might be more efficient for the simulation of quantum systems than conventional computers.

There are several reasons why quantum systems are difficult to simulate on regular computers. One main reason is that matter, at a quantum level, is described as a combination of multiple configurations (known as states) at the same time.

### Quantum states grow exponentially

Consider a system of particles, and 40 possible locations where those particle can exist. The system could be in any of unique states because each location can either have or not have a particle. If these are classical particles, then the system is always in only one of the states, so a classical computer needs only 40 bits to describe the state of the system. But if these are quantum particles, then the system exists in a combination of all states. A classical computer needs to store numbers to describe the quantum system, which requires over 130 GB of memory. However, a quantum computer needs only 40 quantum bits to describe this quantum system.

If we add another location to the system so that the electrons can exist in 41 locations, then the number of unique configurations of the system doubles to. It would take more than 260 GB of memory to store that quantum state on a classical computer. We can't play this game of increasing the number of locations forever. To store a quantum state on a conventional computer, you quickly exceed the memory capacities of the world's most powerful machines. At a few hundred electrons, the memory required to store the system exceeds the number of particles in the universe. There's no hope with our conventional computers to completely simulate quantum dynamics for larger systems!

### Turning difficulty into opportunity

The observation of this exponential growth posed a powerful question: is it possible to turn this difficulty into an opportunity? If quantum systems are difficult to simulate on regular computers, what would happen if we build a machine that uses quantum effects for its fundamental operations? Could we simulate quantum systems with a machine that exploits exactly the same laws of physics? And could we use that machine to investigate other important problems outside of quantum mechanics? These are the kinds of questions that gave rise to the fields of quantum information and quantum computing.

In 1985, David Deutsch showed that a quantum computer could efficiently simulate the behavior of any physical system. This discovery was the first indication that quantum computers could be used to solve problems that are too difficult to solve on classical computers.

In 1994, Peter Shor discovered a quantum algorithm to find the prime factors of large integers. Shor's algorithm runs exponentially faster than the best known classical algorithm for this factoring problem. Such a fast algorithm could potentially break many of our modern public key cryptosystems that we use to secure transactions in e-commerce, such as Rivest–Shamir–Adleman (RSA) and Elliptic Curve Cryptography. This discovery sparked a huge interest in quantum computing and led to the development of quantum algorithms for many other problems.

Since that time, fast and efficient quantum computer algorithms were developed for other problems that are difficult to solve on classical computers. For example, we now have quantum algorithms to search an unordered database, to solve systems of linear equations, to perform machine learning, and to simulate physical systems in chemistry, physics, and materials science.

## What is a qubit?

Just as bits are the fundamental object of information in classical computing, qubits (quantum bits) are the fundamental object of information in quantum computing.

Qubits play a similar role in quantum computing as bits play in classical computing, but qubits behave differently than bits. Classical bits are binary and, at any given time, can be in only one of two states, 0 or 1. But qubits can be in a superposition of both the 0 and 1 states at the same time. In fact, there are infinite possible superpositions of 0 and 1, and each of them is a valid qubit state.

In quantum computing, information is encoded in superpositions of the states 0 and 1. For example, 8 regular bits can encode up to 256 unique values, but these 8 bits can only represent one of the 256 values at a time. With 8 qubits, we could encode all 256 values at the same time, because the qubits can be in a superposition of all 256 possible states.

For more information, see [The qubit in quantum computing](xref:microsoft.quantum.concepts.qubit).

## What are the requirements to build a quantum computer?

A quantum computer uses quantum systems and the properties of quantum mechanics to solve computational problems. The systems in a quantum computer consist of the qubits, the interactions between qubits, and operations on the qubits to store and compute information. We can use quantum computers to program effects like quantum entanglement and quantum interference to accurately solve certain problems faster than on classical computers.

To build a quantum computer, we need to consider how to create and store the qubits. We also need to think about how to manipulate the qubits and how to measure the results of our computations.

Popular qubit technologies include trapped-ion qubits, superconducting qubits, and topological qubits. For some methods of qubit storage, the unit that houses the qubits must be kept at a temperature near absolute zero to maximize their coherence and reduce interference. Other types of qubit housing use a vacuum chamber to help minimize vibrations and stabilize the qubits. Signals can be sent to the qubits through various methods, such as microwaves, lasers, or voltages.

### The five criteria for a quantum computer

A good quantum computer should have these five features:

1. **Scalable:** It can have many qubits.
1. **Initializable:** It can set the qubits to a specific state (usually the 0 state).
1. **Resilient:** It can keep the qubits in superposition state for a long time.
1. **Universal:** A quantum computer doesn't need to perform every possible operation, only a set of operations called *universal set*. A [set of universal quantum operations](xref:microsoft.quantum.concepts.tfactories#universal-set-of-quantum-gates) is such that any other operation can be decomposed into a sequence of them.
1. **Reliable:** It can measure the qubits accurately.

These five criteria are often known as the [Di Vincenzo criteria](https://en.wikipedia.org/wiki/DiVincenzo%27s_criteria) for quantum computation.

Building devices that meet these five criteria is one of the most demanding engineering challenges ever faced by humankind. Azure Quantum offers a variety of quantum computing solutions with different qubit technologies. For more information, see [the full list of Azure Quantum providers](xref:microsoft.quantum.reference.qc-target-list).

---
A good quantum computer should have these five features:

Scalable: It can have many qubits.
Initializable: It can always set the qubits to a specific initial state (usually the 0 state).
Resilient: It can keep the qubits in superposition states for a long time.
Universal: It can perform a [set of universal quantum operations](xref:microsoft.quantum.concepts.tfactories#universal-set-of-quantum-gates) such that any other operation can be decomposed into a sequence of universal operations.
Reliable: It can measure the qubits accurately and consistently.
These five criteria are often known as the [DiVincenzo criteria](https://en.wikipedia.org/wiki/DiVincenzo%27s_criteria) criteria for quantum computation.

Building a device that meets all five criteria is one of the most demanding engineering challenges of our time. Microsoft is partnering with some of the best-in-class quantum computer manufacturers around the world to give you access to the latest quantum computing solutions through Azure Quantum.

## Understand quantum phenomena

Quantum phenomena are the fundamental principles that differentiate quantum computing from classical computing. Understanding these phenomena is crucial for grasping how quantum computers operate and why they hold such potential. The two most important quantum phenomena are superposition and entanglement.

### Superposition

Imagine that you are exercising in your living room. You turn all the way to your left and then all the way to your right. Now turn to your left and your right at the same time. You can’t do it (not without splitting yourself in two, at least). Obviously, you can’t be in both of those states at once – you can’t be facing left and facing right at the same time.

However, if you are a quantum particle, then you can have a certain probability of *facing left* AND a certain probability of *facing right* due to a phenomenon known as *superposition* (also known as *coherence*).

Only quantum systems like ions, electrons, or superconducting circuits can exist in the superposition states that enable the power of quantum computing. For example, electrons are quantum particles that have their own "facing left or facing right" property called spin. The two spin states are called spin up and spin down, and the quantum state of an electron is a superposition of the spin up and spin down states.

If you want to learn more and practice with superposition, see [Training module: Explore superposition with Q#](/training/modules/explore-superposition/).

### Entanglement

[Entanglement](xref:microsoft.quantum.concepts.entanglement) is a quantum correlation between two or more quantum systems. When two qubits are entangled, they're correlated and sharing the information of their states such that the quantum state of individual qubits can't be described independently. With quantum entanglement you can only know the quantum state of the global system, not the individual states.

Entangled quantum systems maintain this correlation even when separated over large distances. This means that whatever operation or process you apply to one subsystem correlates to the other subsystem as well. Thus, measuring the state of one qubit provides information about the state of the other qubit – this particular property is very helpful in quantum computing.

If you want to learn more, see [Tutorial: Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) and, for a practical implementation check out [Training module: Teleport a qubit using entanglement](/training/modules/explore-entanglement/).

## Related content

- [Vectors and matrices in quantum computing](xref:microsoft.quantum.concepts.vectors)
- [The qubit](xref:microsoft.quantum.concepts.qubit)
- [Quantum circuit diagram conventions](xref:microsoft.quantum.concepts.circuits)
- [Entanglement in quantum computing](xref:microsoft.quantum.concepts.entanglement)
- [Introduction to the quantum programming language Q#](xref:microsoft.quantum.qsharp-overview)


