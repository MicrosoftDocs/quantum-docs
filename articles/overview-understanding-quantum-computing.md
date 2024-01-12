---
author: SoniaLopezBravo
description: Learn how quantum computing works, how it compares to classical computing, and how it uses the principles of quantum mechanics.
ms.date: 11/27/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', Quantum Development Kit, Quantum machine learning, Quantum Intermediate Representation, target, targets]
title: Understanding quantum computing
uid: microsoft.quantum.overview.understanding
---

# Understanding quantum computing

Quantum computing holds the promise of solving some of our planet's biggest challenges - in the areas of environment, agriculture, health, energy, climate, materials science, and more. For some of these problems, classical computing is increasingly challenged as the size of the system grows. When designed to scale, quantum systems will likely have capabilities that exceed those of today's most powerful supercomputers. As the global community of quantum researchers, scientists, engineers, and business leaders collaborate to advance the quantum ecosystem, we expect to see quantum impact accelerate across every industry.

[!INCLUDE [Copilot in Azure Quantum banner](includes/copilot-banner.md)]

## Why use quantum computers?

The idea of a quantum computer was born out of the difficulty of simulating quantum systems on a classical computer. In the 1980s, Richard Feynman and Yuri Manin independently suggested that hardware based on quantum phenomena might be more efficient for the simulation of quantum systems than conventional computers.

There are many ways to understand why quantum mechanics is hard to simulate. The simplest is to see that matter, at a quantum level, is in a multitude of possible configurations (known as states).

### Quantum computing grows exponentially

Consider a system of electrons where there are $40$ possible locations. The system therefore might be in any of $2^{40}$ configurations (since each location can either have or not have an electron). To store the quantum state of the electrons in a conventional computer memory would require in excess of $130$ GB of memory! If we allowed the particles to be in any of $41$ positions, there would be twice as many configurations at $2^{41}$ which in turn would require more than $260$ GB of memory to store the quantum state.

This game of increasing the number of locations can't be played indefinitely. If we want to store the state conventionally, we would quickly exceed the memory capacities of the world's most powerful machines. At a few hundred electrons the memory required to store the system exceeds the number of particles in the universe; thus there is no hope with our conventional computers to ever simulate their quantum dynamics.

### Turning difficulty into opportunity

The observation of this exponential growth led us to ask a powerful question: can we turn this difficulty into an opportunity? Specifically, if quantum dynamics are hard to simulate what would happen if we were to build hardware that had quantum effects as fundamental operations? Could we simulate quantum systems of interacting particles using a machine that exploits exactly the same laws of physics? And could we use those that machine to investigate other tasks that are absent from quantum particles, but are crucial for us? These questions led to the genesis of Quantum Computing.

In 1985, David Deutsch showed that a quantum computer could efficiently simulate the behavior of any physical system. This discovery was the first indication that quantum computers could be used to solve problems that are intractable on classical computers.

In 1994, Peter Shor discovered a quantum algorithm for factoring integers that runs exponentially faster than the best known classical algorithm. Solving factoring makes possible the ability to break many of our public key cryptosystems underlying the security of e-commerce today, including RSA and Elliptic Curve Cryptography. This discovery sparked a huge interest in quantum computing and led to the development of quantum algorithms for many other problems.

Since that time, fast and efficient quantum computer algorithms were developed for many of our hard classical tasks: simulating physical systems in chemistry, physics, and materials science, searching an unordered database, solving systems of linear equations, and machine learning.

## What is a qubit?

Just as bits are the fundamental object of information in classical computing, *qubits* (quantum bits) are the fundamental object of information in quantum computing.

A qubit is the basic unit of information in quantum computing. Qubits play a similar role in quantum computing as bits play in classical computing, but they behave very differently. Classical bits are binary and can hold only a position of $0$ or $1$, but qubits can hold a superposition of all possible states. This means that a qubit can be in a state of $0$, $1$, or any quantum superposition of the two. There are infinite possible superpositions of $0$ and $1$, and each of them is a valid qubit state.

In quantum computing, the information is encoded in the superposition of the states $0$ and $1$. For example, with $8$ bits, we could encode $256$ different values, but we have to choose one of them to encode it. With $8$ qubits, we could encode the $256$ values at the same time. This behavior is because a qubit can be in a superposition of all possible states.

For more information, see [The qubit in quantum computing](xref:microsoft.quantum.concepts.qubit).

## How to build a quantum computer

A quantum computer is a computer that takes advantage of quantum mechanical phenomena. Quantum computers use quantum states of matter to store and compute information. They can "program" quantum interference to do things faster or better than classical computers.

When building a quantum computer, we need to think about how to create the qubits and how to store them. We also need to think about how to manipulate them and how to read the results of our computations.

Most used qubit technologies are trapped-ion qubits, superconducting qubits, and topological qubits. For some methods of qubit storage, the unit that houses the qubits is kept at a temperature near to absolute zero to maximize their coherence and reduce interference. Other types of qubit housing use a vacuum chamber to help minimize vibrations and stabilize the qubits. Signals can be sent to the qubits using a variety of methods, including microwaves, laser, and voltage.

### The five criteria for a quantum computer

A good quantum computer should have these five features:

1. **Scalable:** It can have many qubits.
1. **Initializable:** It can set the qubits to a specific state (usually the $0$ state).
1. **Resilient:** It can keep the qubits in superposition state for a long time.
1. **Universal:** A quantum computer doesn't need to perform every possible operation, only a set of operations called *universal set*. A set of universal quantum operations is such that any other operation can be decomposed into a sequence of them.
1. **Reliable:** It can measure the qubits accurately.

These five criteria are often known as the Di Vincenzo criteria for quantum computation.

Building devices that meet these five criteria is one of the most demanding engineering challenges ever faced by humankind. Microsoft is partnering with some of the best-in-class quantum-computer manufacturers around the world to give you access to the latest quantum computing solutions through Azure Quantum. For more information, see the full list of [Azure Quantum providers](xref:microsoft.quantum.reference.qc-target-list).

## What can quantum computing and Azure Quantum be used for?

A quantum computer isn't a supercomputer that can do everything faster. In fact, one of the goals of quantum computing research is to study which problems can be solved by a quantum computer faster than a classical computer and how large the speedup can be.

Quantum computers do exceptionally well with problems that require calculating a large number of possible combinations. These types of problems can be found in many areas, such as quantum simulation, cryptography, quantum machine learning, and search problems.

For the latest information about Microsoft's quantum computing research, see the [Microsoft Research Quantum Computing](https://www.microsoft.com/research/research-area/quantum-computing/?) page.

### Resource estimation

The quantum computers available today are enabling interesting experimentation and research but they are unable to accelerate computations necessary to solve real-world problems. While the industry awaits hardware advances, quantum software innovators are eager to make progress and prepare for a quantum future. Creating algorithms today that will eventually run on tomorrow's fault-tolerant scaled quantum computers is a daunting task. These innovators are faced with questions such as what hardware resources are required? How many physical and logical qubits are needed and what type? How long is the run time?

You can use the Azure Quantum Resource Estimator to help answer these questions. As a result, you'll be able to refine your algorithms and build solutions that take advantage of scaled quantum computers when they become available.

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

Learn more about assessing requirements to scale to practical quantum advantage using the Azure Quantum Resource Estimator in [arXiv:2211.07629](https://aka.ms/AQ/RE/Paper).

### Quantum simulation

Quantum mechanics is the underlying "operating system" of our universe. It describes how the fundamental building blocks of nature behave. Nature's behaviors, such as chemical reactions, biological reactions, and material formations, often involve many-body quantum interactions. For simulating intrinsically quantum mechanical systems, such as molecules, quantum computing is promising, because [qubits](xref:microsoft.quantum.concepts.qubit) (quantum bits) can be used to represent the natural states in question. Examples of quantum systems that we can model include photosynthesis, superconductivity, and complex molecular formations.

[Azure Quantum Elements](https://quantum.microsoft.com/en-us/our-story/quantum-elements-overview) is purpose-built to accelerate scientific discovery. Reinvent your research and development productivity with simulation workflows optimized for scaling on Azure High-Performance Computing (HPC) clusters, AI-accelerated computing, augmented reasoning using AI, integration with quantum tools to start experimenting with existing quantum hardware, and access in the future to Microsoft’s quantum supercomputer. For more information, see [Unlocking the power of Azure for Molecular Dynamics](https://cloudblogs.microsoft.com/quantum/2023/06/01/unlocking-the-power-of-azure-for-molecular-dynamics/).

### Quantum speedups

One of the goals of quantum computing research is to study which problems can be solved by a quantum computer faster than a classical computer and how large the speedup can be. Two well-known examples are Grover's algorithm and Shor's algorithm, which yield a polynomial and an exponential speedup, respectively, over their classical counterparts. 

Shor's algorithm running on a quantum computer could break classical cryptographic schemes such as the Rivest–Shamir–Adleman (RSA) scheme, which is widely used in e-commerce for secure data transmission. This scheme is based on the practical difficulty of factoring prime numbers by using classical algorithms. Quantum cryptography promises information security by harnessing basic physics rather than complexity assumptions. 

Like Shor's algorithm for factoring, the hidden shift problem is a natural source of problems for which a quantum computer has an exponential advantage over the best known classical algorithms. This may eventually help in solving deconvolution problems and enable us to efficiently find patterns in complex data sets. It turns out that a quantum computer can in principle compute convolutions at high speed, which in turn is based on the quantum computer's ability to compute Fourier transforms extremely rapidly. In the sample gallery of your Azure Quantum workspace you will find a [Hidden Shifts Jupyter notebook sample](xref:microsoft.quantum.get-started.notebooks) (an Azure account is required). 

[Grover's algorithm](xref:microsoft.quantum.concepts.grovers) speeds up the solution to unstructured data searches, running the search in fewer steps than any classical algorithm could. Indeed, any problem that allows you to check whether a given value $x$ is a valid solution (a "yes or no problem") can be formulated in terms of the search problem. The following are some examples:

- Boolean satisfiability problem: Is the set of Boolean values $x$ an interpretation (an assignment of values to variables) that satisfies the given Boolean formula?
- Traveling salesman problem: Does $x$ describe the shortest possible loop that connects all cities?
- Database search problem: Does the database table contain a record $x$?
- Integer factorization problem: Is the fixed number $N$ divisible by the number $x$?

For a more in-depth examination of Grover's algorithm, see the tutorial [Implement Grover's algorithm in Q#](xref:microsoft.quantum.tutorial-qdk.grovers).


## How does quantum computing solve problems?

Quantum computers are controllable quantum mechanical devices that exploit the properties of quantum physics to perform computations. For some computational tasks, quantum computing provides exponential speedups. These speedups are possible thanks to three phenomena from quantum mechanics: superposition, interference, and entanglement.

### Superposition

Imagine that you are exercising in your living room. You turn all the way to your left and then all the way to your right. Now turn to your left and your right at the same time. You can’t do it (not without splitting yourself in two, at least). Obviously, you can’t be in both of those states at once – you can’t be facing left and facing right at the same time.

However, if you are a quantum particle, then you can have a certain probability of *facing left* AND a certain probability of *facing right* due to a phenomenon known as **superposition** (also known as **coherence**).

Unlike classical particles, if two states $A$ and $B$ are valid quantum states of a quantum particle, then any linear combination of the states is also a valid
quantum state: $\text{qubit state}=\alpha A + \beta B$. This linear combination of quantum states $A$ and $B$ is called superposition. Here, $\alpha$ and $\beta$ are the probability amplitudes of $A$ and $B$, respectively, such that $|\alpha|^{2} + |\beta|^{2} = 1$. 

Only quantum systems like ions, electrons or superconducting circuits can exist in the superposition states that enable the power of quantum computing. A quantum particle such as an electron has its own “facing left or facing right” property, namely *spin*, referred to as either up or down, so the quantum state of an electron is a superposition of "spin up" and "spin down".

Generally, and to make it more relatable to classical binary computing, if a quantum system can be in two quantum states, these states are referred as 0 state and 1 state.

### Qubits and probability

Classical computers store and process information in bits, which can have a state of either 1 or 0, but never both. The equivalent in quantum computing is the **qubit**. A qubit is any quantum system that can be in a superposition of two quantum states, 0 and 1. Each possible quantum state has an associated probability amplitude. Only after measuring a qubit, its state collapses to either the 0 state or the 1 state depending on the associated probability, thus, one of the possible states is obtained with a certain probability.

The qubit's probability of collapsing one way or the other is determined by **quantum interference**. Quantum interference affects the state of a qubit in order to influence the probability of a certain outcome during measurement, and this probabilistic state is where the power of quantum computing excels.

For example, with two bits in a classical computer, each bit can store 1 or 0, so together you can store four possible values – **00**, **01**, **10**, and **11** – but only one of those at a time. With two qubits in superposition, however, each qubit can be 1 or 0 or *both*, so you can represent the same four values simultaneously. With three qubits, you can represent eight values, with four qubits, you can represent 16 values, and so on.

For more information, see [The qubit in quantum computing](xref:microsoft.quantum.concepts.qubit).

### Entanglement

One of the most interesting phenomenon of quantum mechanics is the ability of two or more quantum systems to become **entangled** with each other. Entanglement is a quantum correlation between quantum systems. When qubits become entangled, they form a global system such that the quantum state of individual subsystems cannot be described independently. Two systems are entangled when the state of the global system cannot be written as a combination of the state of the subsystems, in particular, two systems are entangled when the state of the global system cannot be written as the [tensor product](xref:microsoft.quantum.concepts.vectors#tensor-product) of states of the subsystems. A product state contains no correlations. 

Entangled quantum systems maintain this correlation even when separated over large distances. This means that whatever operation or process you apply to one subsystem correlates to the other subsystem as well. Because there is a correlation between the entangled qubits, measuring the state of one qubit provides information about the state of the other qubit – this particular property is very helpful in quantum computing.

> [!NOTE]
> Not every correlation between the measurements of two qubits means that the two qubits are entangled. Besides quantum correlations, there exist also classical correlations. The difference between classical and quantum correlations is subtle, but it's essential for the speedup provided by quantum computers. For more information, see [Understanding classical correlations](xref:microsoft.quantum.concepts.multiple-qubits#understanding-classical-correlations).

If you want to learn more, see the tutorial [Exploring quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement).

## Next Steps

- [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum)
- [What are the Q# programming language and Quantum Development Kit (QDK)?](xref:microsoft.quantum.overview.q-sharp)
- [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
- [Tutorial: Implement a quantum random number generator in Q#](xref:microsoft.quantum.tutorial-qdk.random-number)
- [The Q# libraries](xref:microsoft.quantum.libraries.overview)
