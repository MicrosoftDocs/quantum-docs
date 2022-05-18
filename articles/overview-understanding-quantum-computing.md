---
author: bradben
description: Learn how quantum computing works, how it compares to classical computing, and how it uses the principles of quantum mechanics.
ms.date: 05/16/2022
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Understanding quantum computing
uid: microsoft.quantum.overview.understanding
---

# Understanding quantum computing

Quantum computing holds the promise to solve some of our planet's biggest challenges - in the areas of environment, agriculture, health, energy, climate, materials science, and others we haven't encountered yet. For some of these problems, classical computing is increasingly challenged as the size of the system grows. When designed to scale, quantum systems will presumably have some capabilities that exceed our most powerful supercomputers. As the global community of quantum researchers, scientists, engineers, and business leaders continue  to collaborate to advance the quantum ecosystem, we expect to see quantum impact accelerate across every industry.

Just as bits are the fundamental units of information in classical computing, [qubits](xref:microsoft.quantum.concepts.qubit) (quantum bits) are the fundamental units of information in quantum computing. While a bit, or binary digit, can have a value either 0 or 1, a qubit can have a value that is either 0, 1 or a quantum superposition of 0 and 1.

For more information about the beginnings and motivation of quantum computing, see [quantum computing history and background](xref:microsoft.quantum.concepts.intro).

[Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) is an open ecosystem to build quantum computing solutions on a diverse selection of today’s quantum hardware, and it offers flexibility to use your preferred development tools with support for Cirq, Qiskit, and Q#. You can use the familiar and trusted Azure platform to learn how to develop quantum algorithms and how to program and run them on real hardware from multiple providers. 

Learn how to create an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace) and start submitting your quantum programs on real quantum hardware. First-time users automatically get free Azure Quantum Credits for use with each participating quantum hardware provider (500 USD each) when creating your workspace. If you need more credits, you can apply to the [Azure Quantum Credits program](https://aka.ms/aq/credits).

> [!Tip]
> **Free trial.** If you don’t have an Azure subscription, you can [create an Azure free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) (check out free Azure accounts [for students](https://azure.microsoft.com/free/students/)). 


## What can quantum computing and Azure Quantum be used for?

A quantum computer isn't a supercomputer that can do everything faster. One of the goals of quantum computing research is to study which problems can be solved by a quantum computer faster than a classical computer and how large the speedup can be.

Quantum computers do exceptionally well with problems that require calculating a large number of possible combinations. These types of problems can be found in many areas, such as quantum simulation, cryptography, quantum machine learning, and search problems.

### Quantum simulation

Quantum mechanics is the underlying "operating system" of our universe. It describes how the fundamental building blocks of nature behave. Nature's behaviors, such as chemical reactions, biological reactions, and material formations, often involve many-body quantum interactions. For simulating intrinsically quantum mechanical systems, such as molecules, quantum computing is promising, because qubits can be used to represent the natural states in question. Examples of quantum systems that we can model include photosynthesis, superconductivity, and complex molecular formations.

The Quantum Development Kit (QDK) comes with the [quantum chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview) to simulate electronic structure problems and quantum dynamics on a quantum computer. An example of such simulations is the [simple molecular energy estimation of the ground state of a molecule](https://docs.microsoft.com/samples/microsoft/quantum/simple-molecular-energy-estimation-with-the-azure-quantum-service/). This and more QDK and Azure Quantum samples can be found in the [code samples](https://docs.microsoft.com/samples/browse/?expanded=azure&products=azure-quantum%2Cqdk&languages=qsharp).

### Quantum speedups

One of the goals of quantum computing research is to study which problems can be solved by a quantum computer faster than a classical computer and how large the speedup can be. Two well-known examples are Grover's algorithm and Shor's algorithm, which yield a polynomial and an exponential speedup, respectively, over their classical counterparts. 

Shor's algorithm running on a quantum computer could break classical cryptographic schemes such as the Rivest–Shamir–Adleman (RSA) scheme, which is widely used in e-commerce for secure data transmission. This scheme is based on the practical difficulty of factoring prime numbers by using classical algorithms. Quantum cryptography promises information security by harnessing basic physics rather than complexity assumptions. 

Like Shor's algorithm for factoring, the hidden shift problem is a natural source of problems for which a quantum computer has an exponential advantage over the best known classical algorithms. This may eventually help in solving deconvolution problems and enable us to efficiently find patterns in complex data sets. It turns out that a quantum computer can in principle compute convolutions at high speed, which in turn is based on the quantum computer's ability to compute Fourier transforms extremely rapidly. In the sample gallery of your Azure Quantum workspace you will find a [Hidden Shifts Jupyter notebook sample](xref:microsoft.quantum.get-started.notebooks) (an Azure account is required). 

[Grover's algorithm](xref:microsoft.quantum.concepts.grovers) speeds up the solution to unstructured data searches, running the search in fewer steps than any classical algorithm could. Indeed, any problem that allows you to check whether a given value $x$ is a valid solution (a "yes or no problem") can be formulated in terms of the search problem. The following are some examples:

- Boolean satisfiability problem: Is the set of Boolean values $x$ an interpretation (an assignment of values to variables) that satisfies the given Boolean formula?
- Traveling salesman problem: Does $x$ describe the shortest possible loop that connects all cities?
- Database search problem: Does the database table contain a record $x$?
- Integer factorization problem: Is the fixed number $N$ divisible by the number $x$?

For a practical implementation of Grover's algorithm to solve mathematical problems you can check the [Grover's Search Jupyter notebook](xref:microsoft.quantum.get-started.notebooks) in the sample gallery of your Azure Quantum workspace (an Azure account is required), or see this [tutorial to implement Grover's search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers).

For more quantum algorithm samples, see the [code samples](https://docs.microsoft.com/samples/browse/?expanded=azure&products=azure-quantum%2Cqdk&languages=qsharp).

### Quantum machine learning

Machine learning on classical computers is revolutionizing the world of science and business. However, the high computational cost of training the models hinders the development and scope of the field. The area of quantum machine learning explores how to devise and implement quantum software that enables machine learning that runs faster than classical computers.

The Quantum Development Kit (QDK) comes with the [quantum machine learning library](xref:microsoft.quantum.libraries.overview#quantum-machine-learning-library) that gives you the ability to run hybrid quantum/classical machine learning experiments. The library includes samples and tutorials, and provides the necessary tools to implement a new hybrid quantum–classical algorithm, the circuit-centric quantum classifier, to solve supervised classification problems.

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

For more information, see [the qubit in quantum computing](xref:microsoft.quantum.concepts.qubit).

### Entanglement

One of the most interesting phenomenon of quantum mechanics is the ability of two or more quantum systems to become **entangled** with each other. Entanglement is a quantum correlation between quantum systems. When qubits become entangled, they form a global system such that the quantum state of individual subsystems cannot be described independently. Two systems are entangled when the state of the global system cannot be written as a linear combination of the subsystems.

Entangled quantum systems can maintain this correlation even when separated over large distances. This means that whatever operation or process you apply to one subsystem correlates to the other subsystem as well. Because there is a correlation between the entangled qubits, measuring the state of one qubit provides information about the state of the other qubit – this particular property is very helpful in quantum computing.

> [!NOTE]
> Not every correlation between the measurements of two qubits means that the two qubits are entangled. Classical bits can also be correlated. Two qubits are entangled when they present correlations that can't be reproduced by using classical bits. This difference between classical and quantum correlations is subtle, but it's essential for the speedup provided by quantum computers. 

If you want to learn more, see the tutorial [exploring quantum entanglement with Q# and Azure Quantum](xref:microsoft.quantum.tutorial-portal.entanglement).

## Quantum computers vs quantum simulators

A quantum computer is a machine that combines the power of classical and quantum computing. The current quantum computers correspond to a hybrid model: a classical computer that controls a quantum processor. 

The development of quantum computers is still in the infancy of their development. The quantum hardware and their maintenance are expensive, and most systems are located in universities and research labs. Where classical computers use familiar silicon-based chips, quantum computers use quantum systems such as atoms, ions, photons, or electrons. The technology is advancing, though, and limited public cloud access to quantum systems is available. 

Azure Quantum allows you to create quantum algorithms for multiple platforms at once while preserving flexibility to tune the same algorithms for specific systems. You can pick from many programming languages such as Qiskit, Cirq, and Q# and run your algorithms on multiple quantum systems. On Azure Quantum, it’s easy to simultaneously explore today’s quantum systems and be ready for the scaled quantum systems of the future.

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

### Azure Quantum hardware

A quantum computer has three primary parts: 
- A device that houses the qubits 
- A method for performing quantum operations (also known as quantum gates) to the qubits and measuring them
- A classical computer to run a program and send instructions 

Qubits are fragile and highly sensitive to environmental interferences. For some methods of qubit storage, the unit that houses the qubits is kept at a temperature just above absolute zero to maximize their coherence. Other types of qubit housing use a vacuum chamber to help minimize vibrations and stabilize the qubits.  
Operations can be performed using a variety of methods including microwaves, laser, and voltage, depending on the type of qubit.

Quantum computers face a multitude of challenges to operate correctly. Error correction in quantum computers is a significant issue, and scaling up (adding more qubits) increases the error rate. Because of these limitations, a quantum PC for your desktop is far in the future, but a commercially-viable lab-based quantum computer is closer.

Azure Quantum is partnering with quantum hardware companies to provide cloud access to quantum hardware. With [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) platform and the QDK, you can explore and run quantum programs on different types of quantum hardware. These are the currently available quantum targets:

- [Quantinuum](xref:microsoft.quantum.providers.quantinuum): **Trapped-ion** system with high-fidelity, fully connected qubits, and the ability to perform mid-circuit measurements.
- [IonQ](xref:microsoft.quantum.providers.ionq): Dynamically reconfigurable **trapped-ion** quantum computer for up to 11 fully connected qubits, that lets you run a two-qubit gate between any pair.

For more information, see the full [quantum computing target list](xref:microsoft.quantum.reference.qc-target-list).

### Azure Quantum simulators

For the moment, the use of real quantum hardware is limited due to resources and budget. Quantum simulators serve to the purpose of running quantum algorithms, making it easy to test and debug an algorithm and then run it on real hardware with confidence that the result will match the expectations.

Quantum simulators are software programs that run on classical computers and make it possible to run and test quantum programs in an environment that predicts how qubits react to different operations, making it easy to test and debug an algorithm and then run it on real hardware with confidence that the result will match the expectations. 

The Quantum Development Kit (QDK) includes different classes of quantum simulators representing different ways of simulating the same quantum algorithm, such as a [sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator) for simulating large systems, a [noise simulator](xref:microsoft.quantum.machines.overview.noise-simulator) for simulating quantum algorithms under the presence of noise, and a [resource estimator](xref:microsoft.quantum.machines.overview.resources-estimator). For more information, see [quantum simulators](xref:microsoft.quantum.machines.overview).

If you have an Azure account, in the sample gallery of your Azure Quantum workspace you will find two Jupyter notebook samples that use quantum simulators. See [how to get started with Q# and an Azure Quantum notebook](xref:microsoft.quantum.get-started.notebooks).


## Next Steps

- [Quantum Computing History and Background](xref:microsoft.quantum.concepts.intro)
- [What are the Q# programming language and Quantum Development Kit (QDK)?](xref:microsoft.quantum.overview.q-sharp)
- [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
- [Creating a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quantum Simulators](xref:microsoft.quantum.machines.overview)
- [The Q# libraries](xref:microsoft.quantum.libraries.overview)
