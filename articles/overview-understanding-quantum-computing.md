---
author: SoniaLopezBravo
description: Learn how quantum computing works, how it compares to classical computing, and how it uses the principles of quantum mechanics.
ms.author: v-sonialopez
ms.date: 10/21/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Understanding quantum computing
uid: microsoft.quantum.overview.understanding
---

# Understanding quantum computing

Quantum computing holds the promise to solve some of our planet's biggest challenges - in the areas of environment, agriculture, health, energy, climate, materials science, and others we haven't encountered yet. For some of these problems, even our most powerful computers run into problems.

Classical computing, which uses binary states, is increasingly challenged as the size of the system grows. Quantum computing makes use of quantum mechanical phenomena such as superposition, interference, and entanglement to address some of these challenges. For simulating intrinsically quantum mechanical problems, quantum computing is promising, because quantum states can be used to represent the natural states in question.

Quantum computing uses the principles of quantum mechanics to process information. Because of this, quantum computing requires a different approach than classical computing. One example of this difference is the processor used in quantum computers. Where classical computers use familiar silicon-based chips, quantum computers use quantum systems such as atoms, ions, photons, or electrons. They use their quantum properties to represent bits that can be prepared in different quantum superpositions of 1 and 0.  

The quantum material behaves according to the laws of quantum mechanics, leveraging concepts such as probabilistic computation, superposition, and entanglement. These concepts provide the basis for quantum algorithms that harness the power of quantum computing to solve complex problems.


## Where can quantum computing be applied?

### Quantum simulation

Quantum mechanics is the underlying "operating system" of our universe. It describes how the fundamental building blocks of nature behave. Nature's behaviors, such as chemical reactions, biological reactions, and material formations, often involve many-body quantum interactions. 

To simulate quantum mechanical systems, such as molecules, quantum computing provides significant speed increases as qubits can be used to simulate the quantum states in question.

### Cryptography

### Quantum Machine Learning

Machine learning on classical computers is revolutionizing the world of science and business. However, the high computational cost of training the models hinders the development and scope of the field. The area of quantum machine learning explores how to devise and implement quantum software that enables machine learning that runs faster than classical computers.

The Quantum Development Kit comes with the [quantum machine learning library](xref:microsoft.quantum.libraries-machine-learning.overview) that gives you the ability to run hybrid quantum/classical machine learning experiments. The library includes samples and tutorials, and provides the necessary tools to implement a new hybrid quantum–classical algorithm, the circuit-centric quantum classifier, to solve supervised classification problems.


## How does quantum computing solve problems? 

For some computational tasks, quantum computing provides exponential speedups. These speedups are possible thanks to three phenomena from quantum mechanics: superposition, interference, and entanglement.

### Superposition vs. binary computing

Imagine that you are exercising in your living room. You turn all the way to your left and then all the way to your right. Now turn to your left and your right at the same time. You can’t do it (not without splitting yourself in two, at least).  Obviously, you can’t be in both of those states at once – you can’t be facing left and facing right at the same time.

However, if you are a quantum particle, then you can have a certain probability of *facing left* AND a certain probability of *facing right* due to a phenomenon known as **superposition** (also known as **coherence**).

A quantum particle such as an electron has its own “facing left or facing right” properties, for example **spin**, referred to as either up or down, or to make it more relatable to classical binary computing, let’s just say 1 or 0. When a quantum particle is in a superposition state, it’s a linear combination of an infinite number of states between 1 and 0, but you don’t know which one it will be until you actually look at it, which brings up our next phenomenon, **quantum measurement**.

### Quantum measurement

Now, let’s say your friend comes over and wants to take a picture of you exercising. Most likely, they’ll get a blurry image of you turning somewhere between all the way left and all the way right.

But if you’re a quantum particle, an interesting thing happens. No matter where you are when they take the picture, it will always show you either all the way left or all the way right – nothing in-between.

This is because the act of observing or measuring a quantum particle **collapses** the superposition state (also known as **decoherence**) and the particle takes on a classical binary state of either 1 or 0.

This binary state is helpful to us, because in computing you can do lots of things with 1’s and 0’s. However, once a quantum particle has been measured and collapsed, it stays in that state forever (just like your picture) and will always be a 1 or 0. As you’ll see later, though, in quantum computing there are operations that can “reset” a particle back to a superposition state so it can be used for quantum calculations again.

### Entanglement

Possibly the most interesting phenomenon of quantum mechanics is the ability of two or more quantum particles to become **entangled** with each other. When particles become entangled, they form a single system such that the quantum state of any one particle cannot be described independently of the quantum state of the other particles. This means that whatever operation or process you apply to one particle correlates to the other particles as well.

In addition to this interdependency, particles can maintain this connection even when separated over incredibly large distances, even light-years. The effects of quantum measurement also apply to entangled particles, such that when one particle is measured and collapses, the other particle collapses as well. Because there is a correlation between the entangled qubits, measuring the state of one qubit provides information about the state of the other qubit – this particular property is very helpful in quantum computing.

### Qubits and probability

Classical computers store and process information in bits, which can have a state of either 1 or 0, but never both. The equivalent in quantum computing is the **qubit**, which represents the state of a quantum particle. Because of superposition, qubits can either be 1 or 0 or anything in between. Depending on its configuration, a qubit has a certain *probability* of collapsing to 1 or 0. The qubit's probability of collapsing one way or the other is determined by **quantum interference**. 

Remember your friend that was taking your picture? Suppose they have special filters on their camera called *Interference* filters. If they select the *70/30* filter and start taking pictures, in 70% of them you will be facing left, and in 30% you will be facing right. The filter has interfered with the regular state of the camera to influence the probability of its behavior.

Similarly, quantum interference affects the state of a qubit in order to influence the probability of a certain outcome during measurement, and this probabilistic state is where the power of quantum computing excels.

For example, with two bits in a classical computer, each bit can store 1 or 0, so together you can store four possible values – **00**, **01**, **10**, and **11** – but only one of those at a time. With two qubits in superposition, however, each qubit can be 1 or 0 or *both*, so you can represent the same four values simultaneously. With three qubits, you can represent eight values, with four qubits, you can represent 16 values, and so on.


## Azure Quantum computing harware partners

Microsoft is partnering with quantum hardware companies to provide developers with cloud access to quantum hardware. Leveraging the [Azure Quantum](https://azure.microsoft.com/services/quantum/) platform and the Q# language, developers will be able to explore quantum algorithms and run their quantum programs on different types of quantum hardware.

[IonQ](https://ionq.com/news/november-4-2019-microsoft-partnership) and [Honeywell](https://www.honeywell.com/newsroom/news/2019/11/the-future-of-quantum-computing) both use **trapped ion-based** processors, utilizing individual ions trapped in an electronic field, whereas [QCI](https://quantumcircuits.com/news-and-publications/quantum-circuits-partners-with-microsoft-on-azure-quantum) uses superconducting circuits.


## Next Steps

- [Quantum computers and quantum simulators](xref:microsoft.quantum.overview.simulators)
- []()
- [Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
