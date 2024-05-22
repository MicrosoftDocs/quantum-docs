---
author: SoniaLopezBravo
description: Learn how quantum error correction works, the types of quantum errors and codes, and how to correct errors using the three-qubit code as an example. 
ms.author: sonialopez
ms.date: 05/22/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: concept
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Quantum Error Correction Codes
uid: microsoft.quantum.concepts.qec
---

# Introduction to quantum error correction codes

This article explains the basics of quantum error correction, the types of quantum errors, and some common quantum error correction codes. It also provides an example of how to correct errors using the three-qubit code.

## What is quantum error correction?

Quantum error correction (QEC) is a technique that allows us to protect quantum information from errors. Error correction is especially important in quantum computers, because efficient quantum algorithms make use of large-scale quantum computers, which are sensitive to noise.

The basic principle behind quantum error correction is that the number of bits used to encode a given amount of information is increased. This redundancy allows the code to detect and correct errors.

The error rates for quantum computers are typically higher than classical computer's errors due to the challenges associated with building and operating quantum systems. Noise, decoherence, and imperfections in quantum gates can cause errors in quantum computations. Current quantum computers have error rates in the range of 1% to 0.1%. In other words, this means that on average one out of every 100 to 1000 quantum gate operations result in an error.

## Types of quantum errors

There are two fundamental types of quantum errors: bit flips and phase flips.

Bit flip errors occur when a qubit changes from $\ket{0}$ to $\ket{1}$ or vice versa. Bit flip errors are also known as $\sigma_x$-errors, because they map the qubit states $\sigma_x \ket{0} = \ket{1}$ and $\sigma_x \ket{1} = \ket{0}$. This error is analogous to a classical bit flip error.

Phase flip errors occur when a qubit changes its phase. They are also known as $\sigma_z$-errors, because they map the qubit states $\sigma_z \ket{0} = \ket{0}$ and $\sigma_z \ket{1} = -\ket{1}$. This type of error has no classical analog.

In quantum computing, quantum errors can manifest as bit flips, phase flips, or a combination of both.

## How does quantum error correction work?

Quantum error correction codes work by encoding the quantum information into a larger set of qubits, called the *physical qubits*. The joint state of the physical qubits represents a *logical qubit*.

The physical qubits are then sent through a noisy channel, where they are subject to errors. The code is designed so that errors can be detected and corrected by measuring some of the qubits in the code.

For example, imagine you want to send the single-qubit message $\ket{0}$. You could use three physical qubits to encode the message, sending $\ket{000}$. This error-correcting code is a *repetition code*, because the message is repeated three times.

Now, imagine that a single bit-flip error occurs during transmission so that what the recipient receives is the state $\ket{010}$. In this scenario, the recipient may be able to infer that the intended message is $\ket{000}$. However, if the message is subject to two bit-flip errors, the recipient may infer an incorrect message. Finally, if all three bits are flipped so that the original message $\ket{000}$ becomes $\ket{111}$, the recipient has no way of knowing an error occurred.

The code distance of a QEC code is the minimum number of errors that change one codeword for another, that is, the number of errors that can't be detected. The code distance $d$ can be defined as

$$d = 2t + 1$$

where $t$ is the number of errors the code can correct. For example, for the three-bit code $t = 1$ and $d = 3$, because the code can detect and correct one error. 

Note that repetition codes, such as the three-bit code used in this example, can only correct bit-flip errors, and not phase flip errors.  To correct both types of errors, more sophisticated quantum error correction codes are needed.

## Types of QEC codes

There are many different types of QEC codes, each with its own properties and advantages. Some common QEC codes are:

- **Repetition code:** The simplest quantum error correction code, where a single qubit is encoded into multiple qubits by repeating it multiple times. The repetition code can correct bit flip errors, but not phase flip errors.

- **Shor code:**  The first quantum error correction code, developed by Peter Shor. It encodes one logical qubit into nine physical qubits. Shor code can correct one-bit flip error or one phase flip error, but it can't correct both types of errors at the same time.

- **Steane code:** This is a seven-qubit code that can correct both bit flip and phase flip errors. It has the advantage of being fault-tolerant, meaning that the error correction process itself doesn't introduce extra errors.

- **Surface code:** This is a topological error correction code that uses a two-dimensional lattice of qubits to encode logical qubits. It has a high error correction threshold and is considered one of the most promising techniques for large-scale, fault-tolerant quantum computing. The surface code is used by the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator#quantum-error-correction-schemes).

- **Hastings-Haah code:** This quantum error correction code offers better space-time costs than surface codes on Majorana qubits in many regimes. For gate-based instruction sets, the overhead is larger, and makes it less interesting compared to the surface code.

## Example: The three-qubit code

The three-qubit error correction code is a simple repetition code that can correct bit flips errors. It encodes a single logical qubit into three physical qubits by repeating the qubit three times.

Imagine you want to send an arbitrary single qubit $\ket{\phi}= \alpha\ket{0} + \beta \ket{1}$. To avoid errors, you encode the basis states $\ket{0}$ and $\ket{1}$ into a joint state of three qubits. The two logical basis states are $\ket{0_L} = \ket{000}$ and $\ket{1_L} = \ket{111}$.

Therefore, the single qubit $\ket{\phi}= \alpha \ket{0} + \beta\ket{1}$ is encoded as:

$$\ket{\phi_L} = \alpha \ket{000} + \beta\ket{111} = \alpha \ket{0_L} + \beta \ket{1_L}$$

Let's break down the steps of the three-qubit code.

### Preparing  the qubits

First, you encode your single qubit $\ket{\phi}=\alpha\ket{0} +\beta\ket{1}$ into a joint state of three qubits.

You prepare two further qubits in the state $\ket{0}$. So, the global state of all three qubits is $(\alpha\ket{0} +\beta\ket{1})\ket{0}\ket{0}= \alpha\ket{000} + \beta\ket{100} $.

You encode the single qubit into a joint state of three qubits, by applying two CNOT operations. The first CNOT uses the first qubit as control and acts on the second qubit, producing $\alpha \ket{000} + \beta \ket{110}$. The second CNOT uses the first qubit as control and acts on the third qubit. The state of the three qubits is now $\alpha\ket{000} + \beta\ket{111}$.

### Sending the qubits

You send all three qubits down the channel. Assuming the channel can only produce one-bit flip errors, the received qubits are in one of the following states:

|State | Error |
|---|---|
|$\alpha \ket{000} + \beta \ket{111}$ | No error|
|$\alpha \ket{100} + \beta\ket{011}$ | Qubit 1|
|$\alpha \ket{010} + \beta\ket{101}$ | Qubit 2|
|$\alpha \ket{001} + \beta\ket{110}$ | Qubit 3|

### Adding *ancilla* qubits

You introduce two more qubits, prepared in the state $\ket{00}$. This extra pair of qubits, referred to as an *ancilla*, are used to extract information of the error without directly measuring or obtaining information about the logical state. 

Next, you carry out four CNOT operations: the first two operations use the first and second received qubits as control and act on the first ancilla qubit, and last two operations use the first and third received qubits as control and act on the second ancilla bit. The total state of all five qubits is now:

|State | Error |
|---|---|
|$(\alpha \ket{000} + \beta \ket{111})\ket{00}$ | No error|
|$(\alpha \ket{100} + \beta\ket{011})\ket{11}$ | Qubit 1|
|$(\alpha \ket{010} + \beta\ket{101})\ket{10}$ | Qubit 2|
|$(\alpha \ket{001} + \beta\ket{110})\ket{01}$ | Qubit 3|

### Retrieving the error syndrome

You measure the two *ancilla* qubits in the computational basis states $\ket{0}$ and $\ket{1}$. By doing this, you recover the joint state by extracting information. This information is called the *error syndrome*, because it helps to diagnose the errors in the received qubits.

Now you know which of the four possible states the three received qubits are in. You can correct the error by applying the correction operation. In this case you're dealing with bit flip errors, so the correction is a $\sigma_x$ operation applied to one (or none) of the qubits. 

For example, if the error syndrome is $\ket{00}$, then the received qubits are in the state $\alpha \ket{000} + \beta\ket{111}$, which is the state you originally sent. If the error syndrome is $\ket{11}$, then the received qubits are in the state $\alpha \ket{100} + b\ket{011}$. There's a bit flip error on the first qubit, which you can correct by applying a $\sigma_x$ operation to the first qubit.

|Error syndrome| Collapse state| Correction|
|---|---|---|
|$\ket{00}$|$ \alpha \ket{000} + \beta\ket{111}$| Do nothing|
|$\ket{01}$|$\alpha \ket{100} + \beta\ket{011}$| Apply $\sigma_x$ to qubit 3|
|$\ket{10}$|$\alpha \ket{010} + \beta\ket{101}$| Apply $\sigma_x$ to qubit 2|
|$\ket{11}$|$\alpha \ket{001} + \beta\ket{110}$| Apply $\sigma_x$ to qubit 1|

### Extracting the original qubit

Finally, to extract the single qubit you wanted to transmit in the first place, you apply two CNOT operations: one uses the first qubit as control and acts on the second qubit, and other uses the first qubit as control and acts on the third one. 

The state of the first qubit is now $\alpha \ket{0} + \beta \ket{1}$, which is the original qubit you wanted to transmit.

> [!IMPORTANT]
> The QEC code doesn't gain any information regarding the coefficients $\alpha$ and $\beta$, hence superpositions of the computational state remain in-tact during correction.
