---
author: SoniaLopezBravo
description: Learn how quantum computing works, how it compares to classical computing, and how it uses the principles of quantum mechanics.
ms.author: v-sonialopez
ms.date: 12/08/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Understanding quantum computing
uid: microsoft.quantum.overview.understanding
---

# Understanding quantum computing

Quantum computing holds the promise to solve some of our planet's biggest challenges - in the areas of environment, agriculture, health, energy, climate, materials science, and others we haven't encountered yet. For some of these problems, classical computing is increasingly challenged as the size of the system grows.

Quantum computers are controllable quantum mechanical devices that exploit the properties of quantum physics to perform computations. For some computational tasks, quantum computing provides exponential speedups. These speedups are possible thanks to three phenomena from quantum mechanics: superposition, interference, and entanglement.

Just as bits are the fundamental object of information in classical computing, [qubits](xref:microsoft.quantum.concepts.qubit) (quantum bits) are the fundamental object of information in quantum computing. While a bit, or binary digit, can have a value either 0 or 1, a qubit can have a value that is either 0, 1 or a quantum superposition of 0 and 1.

A fundamental difference between classical computers and quantum computers is that programs in quantum computers are intrinsically probabilistic, whereas classical computers are usually deterministic. In quantum algorithms each possible result has an associated probability amplitude. After a measurement, one of the possible states is obtained with a certain probability. This fact contrasts with classical computing, where a bit can only be deterministically 0 or 1.

For more information about the beginnings and motivation of quantum computing, see [quantum computing history and background](xref:microsoft.quantum.concepts.intro).

## What can quantum computing be used for?

A quantum computer isn't a supercomputer that can do everything faster. One of the goals of quantum computing research is to study which problems can be solved by a quantum computer faster than a classical computer and how large the speedup can be.

Quantum computers do exceptionally well in problems that require calculation of many possible different combinations. These type of problems can be found across many areas. 

### Quantum simulation

Quantum mechanics is the underlying "operating system" of our universe. It describes how the fundamental building blocks of nature behave. Nature's behaviors, such as chemical reactions, biological reactions, and material formations, often involve many-body quantum interactions. For simulating intrinsically quantum mechanical systems, such as molecules, quantum computing is promising, because qubits can be used to represent the natural states in question.

### Quantum cryptography

Cryptography is the technique of concealing confidential information by using physical or mathematical means, such as using a computational difficulty of solving a particular task. Classical cryptography relies on the intractability of problems such as integer factorization or discrete logarithms, many of which can be solved more efficiently using quantum computers.

In 1994, Peter Shor showed that a scalable quantum computer could break classical cryptographic schemes such as the Rivest–Shamir–Adleman (RSA) scheme, which is widely used in e-commerce for secure data transmission. This scheme is based on the practical difficulty of factoring prime numbers by using classical algorithms.

Quantum cryptography promises information security by harnessing basic physics rather than complexity assumptions. RSA is safe today because a scalable quantum computer is not yet available. But after quantum computers are built at large scale, polynomial time quantum algorithms might attack the underlying math problems for these cryptosystems.

With the anticipation of a sufficiently large and fault-tolerant quantum computer, active research is underway to:

- Estimate the security for cryptosystems of a given bit length in a post-quantum environment.
- Estimate how long it will take to migrate current cryptosystems to new ones.

### Search algorithms

In 1996, Lov Grover developed a quantum algorithm that dramatically sped up the solution to unstructured data searches, running the search in fewer steps than any classical algorithm could.

The search problem is by design generic. Indeed, any problem that allows you to check whether a given value $x$ is a valid solution (a "yes or no problem") can be formulated in terms of the search problem. The following are some examples:

- Boolean satisfiability problem: Is the set of Boolean values $x$ an interpretation (an assignment of values to variables) that satisfies the given Boolean formula?
- Traveling salesman problem: Does $x$ describe the shortest possible loop that connects all cities?
- Database search problem: Does the database table contain a record $x$?
- Integer factorization problem: Is the fixed number $N$ divisible by the number $x$?

Some of these problems are better suited to benefit from using Grover's algorithm than the others. For more information, see the [theory of Grover's search algorithm](xref:microsoft.quantum.concepts.grovers). For a practical implementation of Grover's algorithm to solve mathematical problems you can see this [tutorial to implement Grover's search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers).

### Quantum machine learning

Machine learning on classical computers is revolutionizing the world of science and business. However, the high computational cost of training the models hinders the development and scope of the field. The area of quantum machine learning explores how to devise and implement quantum software that enables machine learning that runs faster than classical computers.

The Microsoft’s Quantum Development Kit (QDK) comes with the [quantum machine learning library](xref:microsoft.quantum.libraries.overview#quantum-machine-learning-library) that gives you the ability to run hybrid quantum/classical machine learning experiments. The library includes samples and tutorials, and provides the necessary tools to implement a new hybrid quantum–classical algorithm, the circuit-centric quantum classifier, to solve supervised classification problems.

## How does quantum computing solve problems? 

For some computational tasks, quantum computing provides exponential speedups. These speedups are possible thanks to three phenomena from quantum mechanics: superposition, interference, and entanglement.

### Superposition

Imagine that you are exercising in your living room. You turn all the way to your left and then all the way to your right. Now turn to your left and your right at the same time. You can’t do it (not without splitting yourself in two, at least). Obviously, you can’t be in both of those states at once – you can’t be facing left and facing right at the same time.

However, if you are a quantum particle, then you can have a certain probability of *facing left* AND a certain probability of *facing right* due to a phenomenon known as **superposition** (also known as **coherence**).

Unlike classical particles, if two states $A$ and $B$ are valid quantum states of a quantum particle, then any linear combination of the states is also a valid
quantum state: $\text{qubit state}=\alpha A + \beta B$. This linear combination of quantum states $A$ and $B$ is called superposition. Here, $\alpha$ and $\beta$ are the probability amplitudes of $A$ and $B$, respectively, such that $|\alpha|^{2} + |\beta|^{2} = 1$. 

Only quantum systems like ions, electrons or superconducting circuits can exist in the superposition states that enable the power of quantum computing. A quantum particle such as an electron has its own “facing left or facing right” property, for example **spin**, referred to as either up or down, so the quantum state of an electron is a superposition of "spin up" and "spin down". 

Generally, and to make it more relatable to classical binary computing, if a quantum system can be in two quantum states, these states are referred as 0 state and 1 state.

### Qubits and probability

Classical computers store and process information in bits, which can have a state of either 1 or 0, but never both. The equivalent in quantum computing is the **qubit**. A qubit is any quantum system that can be in a superposition of two quantum states, 0 and 1. Each possible quantum state has an associated probability amplitude. Only after measuring a qubit, its state collapses to either the 0 state or the 1 state depending on the associated probability, thus, one of the possible states is obtained with a certain probability. 

The qubit's probability of collapsing one way or the other is determined by **quantum interference**. Quantum interference affects the state of a qubit in order to influence the probability of a certain outcome during measurement, and this probabilistic state is where the power of quantum computing excels.

For example, with two bits in a classical computer, each bit can store 1 or 0, so together you can store four possible values – **00**, **01**, **10**, and **11** – but only one of those at a time. With two qubits in superposition, however, each qubit can be 1 or 0 or *both*, so you can represent the same four values simultaneously. With three qubits, you can represent eight values, with four qubits, you can represent 16 values, and so on.

For more information, see [the qubit in quantum computing](xref:microsoft.quantum.concepts.qubit).

### Entanglement

One of the most interesting phenomenon of quantum mechanics is the ability of two or more quantum systems to become **entangled** with each other. Entanglement is a quantum correlation between quantum systems. When qubits become entangled, they form a global system such that the quantum state of individual subsystems cannot be described independently. Two systems are entangled when the state of the global system cannot be written as a linear combination of the subsystem.

Entangled quantum systems can maintain this correlation even when separated over large distances. This means that whatever operation or process you apply to one subsystem correlates to the other subsystem as well. Because there is a correlation between the entangled qubits, measuring the state of one qubit provides information about the state of the other qubit – this particular property is very helpful in quantum computing.

> [!NOTE]
> Not every correlation between the measurements of two qubits means that the two qubits are entangled. Classical bits can also be correlated. Two qubits are entangled when they present correlations that can't be reproduced by using classical bits. This difference between classical and quantum correlations is subtle, but it's essential for the speedup provided by quantum computers. 

If you want to learn more, see the tutorial [exploring quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement).

## Quantum computers vs quantum simulators

A quantum computer is a machine that combines the power of classical and quantum computing. The current quantum computers correspond to a hybrid model: a classical computer that controls a quantum processor. 

The development of quantum computers is still in the infancy of their development. The quantum hardware and their maintenance are expensive, and most systems are located in universities and research labs. Where classical computers use familiar silicon-based chips, quantum computers use quantum systems such as atoms, ions, photons, or electrons. They use their quantum properties to represent bits that can be prepared in different quantum superpositions of 1 and 0. The technology is advancing, though, and limited public access to some systems is available.

### Quantum hardware

A quantum computer has three primary parts: a device that houses the qubits, a method for performing quantum operations (also known as quantum gates) to the qubits and measuring them, and a classical computer to run a program and send instructions. The type of qubit chosen to build a quantum computer will determine the implementation of these.

- The quantum material used for qubits is fragile and highly sensitive to environmental interferences. For example, for superconducting qubits, the unit that houses the qubits is kept at a temperature just above absolute zero to maximize their coherence. Other types of qubit housing use a vacuum chamber to help minimize vibrations and stabilize the qubits.  
- Operations or quantum gates can be performed using a variety of methods including microwaves, laser, and voltage, depending on the type of qubit.

Quantum computers face a multitude of challenges to operate correctly. Error correction in quantum computers is a significant issue, and scaling up (adding more qubits) increases the error rate. Because of these limitations, a quantum PC for your desktop is far in the future, but a commercially-viable lab-based quantum computer is closer.

Microsoft is developing a quantum computer based on topological qubits. A topological qubit is less impacted by changes in its environment, therefore reducing the degree of external error correction required. Topological qubits feature increased stability and resistance to environmental noise, which means they can more readily scale and remain reliable longer.

### Quantum simulators

For the moment, the use of real quantum hardware is limited due to resources and budget. In the meantime, quantum simulators serve to the purpose of running quantum algorithms, making it easy to test and debug an algorithm and then run it on real hardware with confidence that the result will match the expectations.

Quantum simulators are software programs that run on classical computers and make it possible to run and test quantum programs in an environment that predicts how qubits react to different operations. The Microsoft’s Quantum Development Kit (QDK) includes different classes of quantum simulators representing different ways of simulating the same quantum algorithm, including a [noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator) for simulating quantum algorithms under the presence of noise, and a [resource estimator](xref:microsoft.quantum.machines.overview.resources-estimator).

For more information, see [Quantum Simulators](xref:microsoft.quantum.machines.overview).

### The process of quantum computing

Performing computations on a quantum computer or quantum simulator follows a basic process:

- Access the qubits
- Initialize the qubits to the desired state
- Perform operations to transform the states of the qubits
- Measure the new states of the qubits

Initializing and transforming qubits is done using quantum operations (also known as quantum gates). Quantum operations are similar to logic operations in classical computing, such as AND, OR, NOT, and XOR. An operation can be as basic as flipping a qubit's state from 1 to 0 or entangling a pair of qubits, to using multiple operations in series to affect the probability of a superposed qubit collapsing one way or the other.

> [!NOTE] 
> The [Q# libraries](xref:microsoft.quantum.libraries.overview) provide built-in operations that define complex combinations of lower-level quantum operations. You can use the library operations to transform qubits and to create more complex user-defined operations.  

Measuring the result of the computation tells us an answer, but for some quantum algorithms, not necessarily the correct answer. Because the result of some quantum algorithms is based on the probability that was configured by the quantum operations, these computations are run multiple times to get a probability distribution and refine the accuracy of the results.  Assurance that an operation returned a correct answer is known as quantum verification and is a significant challenge in quantum computing.

## Azure Quantum computing hardware partners

Microsoft is partnering with quantum hardware companies to provide developers with cloud access to quantum hardware. Leveraging the [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) platform and the Q# language, developers will be able to explore quantum algorithms and run their quantum programs on different types of quantum hardware.

- [Honeywell Quantum Solutions](https://www.honeywell.com/us/en/company/quantum): **Trapped-ion** system with high-fidelity, fully connected qubits, and the ability to perform mid-circuit measurements.
- [IONQ](https://ionq.com/): Dynamically reconfigurable **trapped-ion** quantum computer for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.
- [Quantum Circuits, Inc](https://quantumcircuits.com/): Fast and high-fidelity **superconducting circuits** with powerful real-time feedback to enable error correction.

For more information, see the full [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list).

## Next Steps

- [Quantum Computing History and Background](xref:microsoft.quantum.concepts.intro)
- [What are the Q# programming language and Quantum Development Kit (QDK)?](xref:microsoft.quantum.overview.q-sharp)
- [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
- [Creating a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quantum Simulators](xref:microsoft.quantum.machines.overview)
- [The Q# libraries](xref:microsoft.quantum.libraries.overview)
