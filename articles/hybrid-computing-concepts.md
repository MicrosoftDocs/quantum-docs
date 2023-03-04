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

All quantum computing is hybrid in some sense. The earliest quantum systems used classical processes to send instructions to the quantum computer, and receive and process the resulting data. *Hybrid quantum computing* is the tight and symbiotic integration between classical and quantum processors, such that they share computations and results back and forth in real time during the run of a program. For example, classical computing is often faster and more efficient than quantum computing for certain tasks, such as data processing and analysis. However, quantum computing performs better for certain types of optimization and simulation problems.

This article describes four techniques that are necessary for hybrid quantum computing:

- Mid-circuit measurement
- Qubit reuse
- Error mitigation
- Quantum error correction

## Mid-circuit measurement

Mid-circuit measurement is the process of performing quantum state measurements at various points during the execution of the program, rather than only at the end. These measurements are used to obtain information about the intermediate states of the system and are used by the classical code to make real-time decisions about the flow of the program. Mid-circuit measurements also act as error correction "sanity checks" by verifying the state of the circuit at a certain point before moving on, and are closely related to qubit reuse.  

## Qubit reuse

Even though today's quantum computers are able to support an increasing number of qubits, we're still far from the millions of qubits needed to run fully fault-tolerant computations and it's desirable to use as few qubits as possible. For more information about the scale of quantum computers needed, see the [Introduction to resource estimation](xref:microsoft.quantum.overview.intro-resource-estimator).

Qubit reuse is the practice of designing circuits to use the same qubit multiple times in a quantum computation to minimize the total qubits needed to run your program. For example, after performing a [mid-circuit measurement](#mid-circuit-measurement) and processing the result, that qubit can be reset and reused for another computation instead of allocating a new qubit. There are various techniques for re-using qubits in quantum computing, such as quantum teleportation, quantum error correction, and measurement-based quantum computing.

## Error mitigation

To make current quantum hardware more robust against error and noise, *logical qubits* can be used. Logical qubits are created using multiple physical qubits to encode and protect quantum information. However, because multiple qubits must be used to create one logical qubit, the overall number of qubits that can be used for computations is reduced. As the ability of hardware to support more physical qubits increases, so will the fault tolerance capabilities. 

In addition to using logical qubits, errors in quantum computations can be mitigated by using techniques such as multiple measurements, designing algorithms that reduce the number of operations needed, or adjusting parameter on quantum gates to reduce the impact of noise.

## Error correction and fault tolerance

Error correction and fault tolerance are critical aspects of quantum computing, as qubits are more prone to errors than classical bits due to the delicate nature of quantum states, and highly fault tolerant systems are needed to achieve the full benefits of [distributed hybrid quantum computing](xref:microsoft.quantum.hybrid.distributed). In classical computing, errors can be corrected by adding redundancy to the computation and using error-correction codes. However, traditional error-correction techniques aren't directly applicable to quantum computing, as they rely on being able to repeat the computation multiple times, which isn't possible in quantum computing due to the no-cloning theorem.

*Floquet codes* are a new class of error correction codes that respond to noise and errors dynamically, instead of traditional correction codes that protect against static errors. For more information, see [Error correction with Floquet codes](https://www.microsoft.com/research/blog/azure-quantum-innovation-efficient-error-correction-of-topological-qubits-with-floquet-codes/).
