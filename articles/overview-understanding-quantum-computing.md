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

The idea of a quantum computer was born out of the difficulty of simulating quantum systems on a classical computer. In the 1980s, Richard Feynman and Yuri Manin independently suggested that hardware based on quantum phenomena might be more efficient for the simulation of quantum systems than conventional computers.

There are many ways to understand why quantum mechanics is hard to simulate. The simplest is to see that matter, at a quantum level, is in a multitude of possible configurations (known as states).

### Quantum states grows exponentially

Consider a system of electrons where there are 40 possible locations, where each location can either have or not have an electron. The system therefore might be in any of $2^{40}$ configurations (since each location has two possible configurations, either having an electron or being empty). To store the quantum state of the electrons in a conventional computer memory would require in excess of 130 GB of memory! If you increase the number of possible locations to 41, there would be twice as many configurations at $2^{41}$ which in turn would require more than 260 GB of memory to store the quantum state.

This game of increasing the number of locations can't be played indefinitely. At a few hundred electrons the memory required to store the system exceeds the number of particles in the universe; thus there is no hope with conventional computers to ever simulate quantum dynamics.

### Turning difficulty into opportunity

The observation of this exponential growth led scientists to ask a powerful question: could we simulate quantum systems using a machine that exploits exactly the same laws of physics? And could we use that machine to investigate other tasks that are crucial for us? These questions led to the genesis of **Quantum Computing**.

In 1985, David Deutsch showed that a quantum computer could efficiently simulate the behavior of any physical system. This discovery was the first indication that quantum computers could be used to solve problems that are intractable on classical computers.

In 1994, Peter Shor discovered a quantum algorithm for factoring integers that runs exponentially faster than the best known classical algorithm. Solving factoring makes possible the ability to break many of our public key cryptosystems underlying the security of e-commerce today, including RSA and Elliptic Curve Cryptography. This discovery sparked a huge interest in quantum computing and led to the development of quantum algorithms for many other problems.

## What is a qubit?

Just as bits are the fundamental object of information in classical computing, *qubits* (quantum bits) are the fundamental object of information in quantum computing.

A qubit is the basic unit of information in quantum computing. Qubits play a similar role in quantum computing as bits play in classical computing, but they behave very differently. Classical bits are binary and can hold only a position of $0$ or $1$, but qubits can hold a superposition of all possible states. This means that a qubit can be in a state of 0, 1, or any quantum superposition of the two. There are infinite possible superpositions of 0 and 1, and each of them is a valid qubit state.

In quantum computing, the information is encoded in the superposition of the states 0 and 1. For example, with 8 bits, you could encode $256$ different values, but you have to choose one of them to encode it because the 256 values can't coexist. With 8 qubits, you could encode the 256 values at the same time. This behavior is because a qubit can be in a superposition of all possible states.

For more information, see [The qubit in quantum computing](xref:microsoft.quantum.concepts.qubit).

## What are the requirements to build a quantum computer?

A quantum computer is a computer that takes advantage of quantum mechanical phenomena. Quantum computers use quantum states of matter to store and compute information. They can "program" quantum phenomena to do things faster or better than classical computers.

Building a quantum computer is a complex engineering challenge that requires a deep understanding of quantum mechanics and the ability to control quantum systems at the smallest scales. When building a quantum computer, it's essential to think about how to create the qubits, and also how to store them, manipulate them and read the results of the computations. 

This is why scientists and engineers are working on different qubit technologies to build quantum computers, because each technology has its own advantages and disadvantages. Most used qubit technologies are trapped-ion qubits, superconducting qubits, and topological qubits. For some methods of qubit storage, the unit that houses the qubits is kept at a temperature near to absolute zero to maximize their coherence and reduce interference. Other types of qubit housing use a vacuum chamber to help minimize vibrations and stabilize the qubits. Signals can be sent to the qubits using a variety of methods, including microwaves, laser, and voltage.

### The five criteria for a quantum computer

A good quantum computer should have these five features:

1. **Scalable:** It can have many qubits.
1. **Initializable:** It can set the qubits to a specific state (usually the 0 state).
1. **Resilient:** It can keep the qubits in superposition state for a long time.
1. **Universal:** A quantum computer doesn't need to perform every possible operation, only a set of operations called *universal set*. A [set of universal quantum operations](xref:microsoft.quantum.concepts.tfactories#universal-set-of-quantum-gates) is such that any other operation can be decomposed into a sequence of them.
1. **Reliable:** It can measure the qubits accurately.

These five criteria are often known as the [Di Vincenzo criteria](https://en.wikipedia.org/wiki/DiVincenzo%27s_criteria) for quantum computation.

Building devices that meet these five criteria is one of the most demanding engineering challenges ever faced by humankind. Azure Quantum offers a variety of quantum computing solutions with different qubit technologies. For more information, see [the full list of Azure Quantum providers](xref:microsoft.quantum.reference.qc-target-list).

## Understand quantum phenomena

Quantum phenomena are the fundamental principles that differentiate quantum computing from classical computing. Understanding these phenomena is crucial for grasping how quantum computers operate and why they hold such potential. The two most important quantum phenomena are superposition and entanglement.

### Superposition

Imagine that you are exercising in your living room. You turn all the way to your left and then all the way to your right. Now turn to your left and your right at the same time. You can’t do it (not without splitting yourself in two, at least). Obviously, you can’t be in both of those states at once – you can’t be facing left and facing right at the same time.

However, if you are a quantum particle, then you can have a certain probability of *facing left* AND a certain probability of *facing right* due to a phenomenon known as *superposition* (also known as *coherence*).

Only quantum systems like ions, electrons or superconducting circuits can exist in the superposition states that enable the power of quantum computing. A quantum particle such as an electron has its own “facing left or facing right” property, namely *spin*, referred to as either up or down, so the quantum state of an electron is a superposition of "spin up" and "spin down".

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


