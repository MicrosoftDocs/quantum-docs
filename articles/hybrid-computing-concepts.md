---
author: bradben
description: Understand the concepts and techniques used in hybrid quantum computing.
ms.date: 02/06/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Hybrid quantum computing concepts
uid: microsoft.quantum.concepts.hybrid
---

# Hybrid quantum computing concepts

All quantum computing is hybrid in some sense. The earliest quantum systems used classical processes to send instructions to the quantum computer, and receive and process the resulting data. *Hybrid quantum computing* refers to the tight and symbiotic integration between classical and quantum processors, such that computations and results are shared back and forth in real time during the run of a program. For example, classical computing is often faster and more efficient than quantum computing for certain tasks, such as data processing and analysis, while quantum computing performs better for certain types of optimization and simulation problems.

This article describes three techniques that are necessary for hybrid quantum computing:

- Mid-circuit measurement
- Qubit re-use
- Quantum error correction

## Mid-circuit measurement

Mid-circuit measurement refers to the process of performing measurements of the state of a quantum system at various points during the execution of the program, rather than only at the end. These measurements are used to obtain information about the intermediate states of the system and are used by the classical code to make real-time decisions about the flow of the program. Mid-circuit measurements also act as error correction "sanity checks" by verifying the state of the circuit at a certain point before moving on, and are closely related to qubit re-use.  

<!--
The following diagram shows how a quantum state midway through the circuit can be measured, and then passed to the classical processor. 

TBD - ARTWORK 
-->

## Qubit re-use

Even though today's quantum computers are able to support an increasing number of qubits, we are still far from the millions of qubits needed to run fully fault-tolerant computations (learn more about the scale of quantum computers needed in the Introduction to resource estimation), and it is desirable to use as few qubits as possible

Qubit re-use is the practice of using the same qubit multiple times in a quantum computation to minimize the total qubits needed to run your program. Instead of allocating a new qubit for each step of your computation, qubit re-use allows for qubits to be used multiple times in a computation, while still preserving their quantum properties and avoiding errors.  There are various techniques for re-using qubits in quantum computing, such as quantum teleportation, quantum error correction, and measurement-based quantum computing.

<!--
The following diagram shows how qubit re-use and mid-circuit measurement are used together to make a measurement, and then reset the qubit to be used later in the program. 

TBD - ARTWORK
-->

## Error mitigation

To make current quantum hardware more robust against error and noise, *logical qubits* can be used. Logical qubits are created using multiple physical qubits to encode and protect quantum information. However, because multiple qubits must be used to create one logical qubit, this reduces the number of qubits that can be used for computations. As the ability of hardware to support more physical qubits increases, so will the fault tolerance capabilities. 

In addition to using logical qubits, errors in quantum computations can be mitigated by using techniques such as multiple measurements, designing algorithms that reduce the number of operations needed, or adjusting parameter on quantum gates to reduce the impact of noise.

## Error correction and fault tolerance

Error correction and fault tolerance are critical aspects of quantum computing, as quantum bits (qubits) are more prone to errors than classical bits due to the delicate nature of quantum states, and highly fault tolerant systems are needed to achieve the full benefits of [distributed hybrid quantum computing](xref:microsoft.quantum.hybrid.distributed). In classical computing, errors can be corrected by adding redundancy to the computation and using error-correction codes. However, traditional error-correction techniques are not directly applicable to quantum computing, as they rely on being able to repeat the computation multiple times, which is not possible in quantum computing due to the no-cloning theorem.

*Floquet codes* are a new class of error correction codes that respond to noise and errors dynamically, instead of traditional correction codes that protect against static errors. For more information, see [Error correction with Floquet codes](https://www.microsoft.com/research/blog/azure-quantum-innovation-efficient-error-correction-of-topological-qubits-with-floquet-codes/).
