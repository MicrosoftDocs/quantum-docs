---
author: bradben
description: Understand the concepts and techniques used in hybrid quantum computing.
ms.date: 03/06/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Hybrid quantum computing concepts
uid: microsoft.quantum.concepts.hybrid
---

# Hybrid quantum computing concepts

All quantum computing is hybrid in some sense. The earliest quantum systems used classical processes to send instructions to the quantum computer, and receive and process the resulting data. The most advanced hybrid architectures bring a tighter and richer integration between classical and quantum computation, speeding up the execution time and opening the door to new generation of algorithms. For example, classical computing is often faster and more efficient than quantum computing for certain tasks, such as data processing and analysis. However, quantum computing performs better for certain types of optimization and simulation problems.

## Classical and quantum registers

In quantum computing, even though the classical and quantum processors are tightly integrated, they are still separate physical entities, and hybrid quantum computing programs can take advantage of each of their capabilities.

A classical register uses the familiar silicon chip-based architecture and is best suited for operations such as sending instructions to the quantum processor, capturing measurement results, and using those results to determine the next set of instructions. 
 
A quantum register is a system comprised of multiple [qubits](xref:microsoft.quantum.glossary-qdk#qubit). Quantum computers excel at performing complex calculations by manipulating their qubits within a quantum register.

## Mid-circuit measurement

Mid-circuit measurement is the process of performing quantum state measurements at various points during the execution of the program, rather than only at the end. These measurements are used to obtain information about the intermediate states of the system and are used by the classical code to make real-time decisions about the flow of the program. Mid-circuit measurements also act as error correction "sanity checks" by verifying the state of the circuit at a certain point before moving on, and are closely related to qubit reuse.  

## Qubit reuse

Even though today's quantum computers are able to support an increasing number of qubits, we're still far from the millions of qubits needed to run fully fault-tolerant computations and it's desirable to use as few qubits as possible. For more information about the scale of quantum computers needed, see the [Introduction to resource estimation](xref:microsoft.quantum.overview.intro-resource-estimator).

Qubit reuse is the practice of designing circuits to use the same qubit multiple times in a quantum computation to minimize the total qubits needed to run your program. For example, after performing a [mid-circuit measurement](#mid-circuit-measurement) and processing the result, that qubit can be reset and reused for another computation instead of allocating a new qubit. There are various techniques for re-using qubits in quantum computing, such as quantum teleportation, quantum error correction, and measurement-based quantum computing.

## Error mitigation

To make current quantum hardware more robust against error and noise, *logical qubits* can be used. Logical qubits are created using multiple physical qubits to encode and protect quantum information. However, because multiple qubits must be used to create one logical qubit, the overall number of qubits that can be used for computations is reduced. As the ability of hardware to support more physical qubits increases, so will the fault tolerance capabilities. 

In addition to using logical qubits, errors in quantum computations can be mitigated by using techniques such as multiple measurements, designing algorithms that reduce the number of operations needed, or adjusting parameters on quantum gates to reduce the impact of noise.

## Error correction and fault tolerance

Error correction and fault tolerance are critical aspects of quantum computing, as qubits are more prone to errors than classical bits due to the delicate nature of quantum states, and highly fault tolerant systems are needed to achieve the full benefits of [distributed hybrid quantum computing](xref:microsoft.quantum.hybrid.distributed). In classical computing, errors can be corrected by adding redundancy to the computation and using error-correction codes. However, traditional error-correction techniques aren't directly applicable to quantum computing, as they rely on being able to repeat the computation multiple times, which isn't possible in quantum computing due to the [no-cloning theorem](xref:microsoft.quantum.concepts.pauli#the-no-cloning-theorem).

*Floquet codes* are a new class of error correction codes that respond to noise and errors dynamically, instead of traditional correction codes that protect against static errors. For more information, see [Error correction with Floquet codes](https://www.microsoft.com/research/blog/azure-quantum-innovation-efficient-error-correction-of-topological-qubits-with-floquet-codes/).

## Hybrid algorithms

- **Variational quantum eigensolver (VQE)** - a quantum algorithm for quantum chemistry, quantum simulations and optimization problems and is used to find the ground state of a given physical system. The classical computer is used to define quantum circuits with certain parameters. After the quantum state is measured, the classical computer evaluates how to improve the parameters and then resubmits the circuits. VQEs are usually long-running programs that can benefit from the tighter integration of hybrid quantum computing. 
- **Quantum approximate optimization algorithm (QAOA)** - also a variational quantum algorithm, it is used for finding approximate solutions to combinatorial optimization problems - problems where the number of possible solutions grows extremely large with the size of the problem. Some examples of real-world applications are air traffic control, shipping or delivery routes, or financial optimizations.

