---
author: bradben
description: Learn about the history of quantum computing, some background describing how it works, and about Azure Quantum and the Quantum Development Kit (QDK).
ms.author: brbenefield
ms.date: 05/16/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Quantum computing history and background
uid: microsoft.quantum.concepts.intro
---

# Quantum computing history and background

A host of new computer technologies has emerged within the last few years, and quantum computing is arguably the technology requiring the greatest paradigm shift on the part of developers.  Quantum computers were proposed in the 1980s by [Richard Feynman](https://en.wikipedia.org/wiki/Richard_Feynman) and [Yuri Manin](https://en.wikipedia.org/wiki/Yuri_Manin). The intuition behind quantum computing stemmed from what was often seen as one of the greatest embarrassments of physics: remarkable scientific progress faced with an inability to model even simple systems. Quantum mechanics was developed between 1900 and 1925 and it remains the cornerstone on which chemistry, condensed matter physics, and technologies ranging from computer chips to LED lighting ultimately rests.  Yet despite these successes, even some of the simplest systems seemed to be beyond the human ability to model with quantum mechanics.  This is because simulating systems of even a few dozen interacting particles requires more computing power than any conventional computer can provide over thousands of years!

## Why use quantum computers 

There are many ways to understand why quantum mechanics is hard to simulate.  Perhaps the simplest is to see that quantum theory can be interpreted as saying that matter, at a quantum level, is in a multitude of possible configurations (known as *states*).  Unlike classical probability theory, these many configurations of the quantum state, which can be potentially observed, may interfere with each other like waves in a tide pool.  This interference prevents the use of statistical sampling to obtain the quantum state configurations.  Rather, we have to track *every possible* configuration a quantum system could be in if we want to understand the quantum evolution.  

Consider a system of electrons where electrons can be in any of say $40$ positions.  The electrons therefore may be in any of $2^{40}$ configurations (since each position can either have or not have an electron). To store the quantum state of the electrons in a conventional computer memory would require in excess of $130$ GB of memory!  This is substantial, but within the reach of some computers.  If we allowed the particles to be in any of $41$ positions, there would be twice as many configurations at $2^{41}$ which in turn would require more than $260$ GB of memory to store the quantum state. This game of increasing the number of positions cannot be played indefinitely if we want to store the state conventionally as we quickly exceed memory capacities of the world's most powerful machines.  At a few hundred electrons the memory required to store the system exceeds the number of particles in the universe; thus there is no hope with our conventional computers to ever simulate their quantum dynamics. And yet in nature, such systems readily evolve in time according to quantum mechanical laws, blissfully unaware of the inability to engineer and simulate their evolution with conventional computing power.

This observation led those with an early vision of quantum computing to ask a simple yet powerful question: can we turn this difficulty into an opportunity?  Specifically, if quantum dynamics are hard to simulate what would happen if we were to build hardware that had quantum effects as fundamental operations?  Could we simulate systems of interacting particles using a system that exploits exactly the same laws that govern them naturally? Could we investigate tasks that are entirely absent from nature, yet follow or benefit from quantum mechanical laws?  These questions led to the genesis of quantum computing.

The foundational core of quantum computing is to store information in quantum states of matter and to use quantum gate operations to compute on that information, by harnessing and learning to "program" quantum interference.  

An early example of programming interference to solve a problem thought to be hard on our conventional computers was done by [Peter Shor](https://en.wikipedia.org/wiki/Peter_Shor) in 1994 for a problem known as factoring.  Solving factoring brings with it the ability to break many of our public key cryptosystems underlying the security of e-commerce today, including RSA and Elliptic Curve Cryptography.  Since that time, fast and efficient quantum computer algorithms have been developed for many of our hard classical tasks: simulating physical systems in chemistry, physics, and materials science, searching an unordered database, solving systems of linear equations, and machine learning.

A quantum computer isn't a supercomputer that can do everything faster or that can solve any problem. The problems a quantum computer can solve more efficiently than a classical computer are called BQP (bounded-error quantum polynomial), meaning that they are solvable by a quantum computer in polynomial time. Examples of BQP problems is the factoring problem or the search problem. 


## Use Azure Quantum and the Quantum Development Kit to do quantum computing

Designing a quantum program to harness interference may sound like a daunting challenge, and while it is, many techniques and tools, including the Quantum Development Kit (QDK), have been introduced to make quantum programming and algorithm development more accessible. There are a handful of basic strategies that can be used to manipulate quantum interference in a way useful for computing, while at the same time not causing the solution to be lost in a tangle of quantum possibilities. Quantum programming is a distinct art from classical programming requiring very different tools to understand and express quantum algorithmic thinking. Indeed, without general tools to aid a quantum developer in tackling the art of quantum programming, quantum algorithmic development is not so easy.

The Quantum Development Kit empowers a growing community with tools to unlock the quantum revolution for their tasks, problems, and solutions. The high-level quantum programming language, Q#, was designed to address the challenges of quantum information processing; it is integrated in a software stack that enables a quantum algorithm to be compiled down to the primitive operations of a quantum computer.  

Before approaching the programming language, it's helpful to review the basic principles on which quantum computing is based. We will take the fundamental rules of quantum computing to be axioms, rather than detailing their foundations in quantum mechanics. Additionally, we will assume basic familiarity with linear algebra (vectors, matrices, and so on). If a deeper study of quantum computing history and principles is desired, we refer you to the [reference section](xref:microsoft.quantum.more-information) containing more information.



> [!NOTE]
> First-time users automatically get free Azure Quantum Credits for use with each participating quantum hardware provider (500 USD each) when creating a workspace. If you need more credits, you can apply to the [Azure Quantum Credits program](https://aka.ms/aq/credits).



## The process of quantum computing

Performing computations on a quantum computer or quantum simulator follows a basic process:

- Access the qubits
- Initialize the qubits to the desired state
- Perform operations to transform the states of the qubits
- Measure the new states of the qubits

Initializing and transforming qubits is done using quantum operations (also known as quantum gates). Quantum operations are similar to logic operations in classical computing, such as AND, OR, NOT, and XOR. An operation can be as basic as flipping a qubit's state from 1 to 0 or entangling a pair of qubits, to using multiple operations in series to affect the probability of a superposed qubit collapsing one way or the other.

> [!NOTE] 
> The [Q# libraries](xref:microsoft.quantum.libraries.overview) provide built-in operations that define complex combinations of lower-level quantum operations. You can use the library operations to transform qubits and to create more complex user-defined operations.  

Measuring the result of the computation tells us an answer, but for some quantum algorithms, not necessarily the correct answer. Because the result of some quantum algorithms is based on the probability that was configured by the quantum operations, these computations are run multiple times to get a probability distribution and refine the accuracy of the results.  Assurance that an operation returned a correct answer is known as quantum verification and is a significant challenge in quantum computing.

