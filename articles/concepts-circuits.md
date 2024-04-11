---
author: SoniaLopezBravo
description: Learn  and their conventions.
ms.author: sonialopez
ms.date: 03/24/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', target, targets]
title: Quantum Circuit Diagram Conventions
uid: microsoft.quantum.concepts.circuits
---

# Quantum circuit diagram conventions

Sometimes quantum algorithms are easier to understand in a circuit diagram than in the equivalent written matrix representation. This article explains how to read quantum circuit diagrams and their conventions.

For more information, see [How to visualize quantum circuits diagrams](xref:microsoft.quantum.how-to.visualize-circuits).

## Reading quantum circuit diagrams

In a circuit diagram, qubit registers are displayed as horizontal lines, with each line representing a qubit. By convention, the top line is qubit register $0$ and the remainder are labeled sequentially.

Quantum operations are represented by *quantum gates*. The term quantum gate is analogous to classical logic gates. Gates acting on one or more qubit registers are denoted as a box. For example, the following symbol represents a Hadamard operation acting on a single-qubit register.

:::image type="content" source="media\2.svg" alt-text="Symbol for a Hadamard operation acting on a single-qubit register.":::

In a quantum circuit, time flows from left to right. Quantum gates are ordered in chronological order with the left-most gate as the gate first applied to the qubits.
In other words, if you picture the wires as holding the quantum state, the wires bring the quantum state through each of the gates in the diagram from left to right.
For example, the action of the following quantum circuit is the unitary matrix $CBA$.

:::image type="content" source="media\3.svg" alt-text="Diagram of quantum gates being applied left-to-right in a quantum circuit.":::

> [!NOTE]
> Matrix multiplication obeys the opposite convention: the right-most matrix is applied first. In quantum circuit diagrams, however, the left-most gate is applied first. This difference can at times lead to confusion, so it is important to note this significant difference between the linear algebraic notation and quantum circuit diagrams.


### Inputs and outputs of quantum circuits

In a quantum circuit diagram, the wires entering a quantum gate represent the qubits that are input to the quantum gate, and the wires exiting the quantum gate represent the qubits that are output from the quantum gate.

The number of inputs of a quantum gate are equal to the number of outputs of a quantum gate. This is because quantum operations are unitary and hence reversible. If a quantum gate had more outputs than inputs, it would not be reversible and hence not unitary, which is a contradiction.

For this reason any box drawn in a circuit diagram must have precisely the same number of wires entering it as exiting it.


## Multi-qubit operations

Multi-qubit circuit diagrams follow similar conventions to single-qubit ones.
For example, a two-qubit unitary operation $B$ can be defined to be $(H S\otimes X)$, so the equivalent quantum circuit is the following:

:::image type="content" source="media\4.svg" alt-text="Circuit diagram of a two-qubit unitary operation.":::

You can also view $B$ as having an action on a single two-qubit register rather than two one-qubit registers depending on the context in which the circuit is used. 

Perhaps the most useful property of such abstract circuit diagrams is that they allow complicated quantum algorithms to be described at a high level without having to compile them down to fundamental gates. This means that you can get an intuition about the data flow for a large quantum algorithm without needing to understand all the details of how each of the subroutines within the algorithm work.

### Controlled gates

Quantum controlled gates are two-qubit gates that apply a single-qubit gate to a target qubit if a control qubit is in a specific state.

For example, consider a quantum controlled gate, denoted $\Lambda(G)$, where a single qubit's value controls the application of the $G$ operation,. The controlled gate $\Lambda(G)$ can be understood by looking at the following example of a product state input:

$\Lambda(G) (\alpha \ket{0} + \beta \ket{1}) \ket{\psi} = \alpha \ket{0} \ket{\psi} + \beta \ket{1} G\ket{\psi}$

That is to say, the controlled gate applies $G$ to the register containing $\psi$ if and only if the control qubit takes the value $1$. In general, such controlled operations are described in circuit diagrams by the following symbol:

:::image type="content" source="media\5.svg" alt-text="Circuit diagram of a singly controlled gate.":::

Here the black circle denotes the quantum bit on which the gate is controlled and a vertical wire denotes the unitary that is applied when the control qubit takes the value $1$.

For the special cases where $G=X$ and $G=Z$, the following notation is used to describe the controlled version of the gates (note that the controlled-X gate is the CNOT gate):

:::image type="content" source="media\6.svg" alt-text="Circuit diagram for special cases of controlled gates.":::

Q# provides methods to automatically generate the controlled version of an operation, which saves the programmer from having to hand code these operations. An example of this is shown below:

```qsharp
operation PrepareSuperposition(qubit : Qubit) : Unit
is Ctl { // Auto-generate the controlled specialization of the operation
    H(qubit);
}
```

## Measurement operator

Measurement operations take a qubit register, measures it, and outputs the result as classical information.

A measurement operation is denoted by a meter symbol and always takes as input a qubit register (denoted by a solid line) and outputs classical information (denoted by a double line).
Specifically, the symbol of the measurement operation looks like:

:::image type="content" source="media\7.svg" alt-text="Symbol representing a measurement operation.":::

In Q#, the `Measure` operator implements the measurement operation.

Similarly, the subcircuit

:::image type="content" source="media\8.svg" alt-text="Circuit diagram representing a controlled operation.":::

gives a classically controlled gate, where $G$ is applied conditioned on the classical control bit being value $1$.

## Example: Unitary transformation

Consider the unitary transformation $\text{ CNOT}_{01}(H\otimes 1)$.
This gate sequence is of fundamental significance to quantum computing because it creates a maximally entangled two-qubit state:

$\mathrm{CNOT}_{01}(H\otimes 1)\ket{00} = \frac{1}{\sqrt{2}} \left(\ket{00} + \ket{11} \right),$

Operations with this or greater complexity are ubiquitous in quantum algorithms and quantum error correction.

The circuit diagram for preparing this maximally entangled quantum state is:

:::image type="content" source="media\1.svg" alt-text="Circuit diagram for a maximally entangled two-qubit state.":::

The symbol behind the Hadamard gate represents a CNOT gate, where the black circle indicates the control qubit and the cross within a circle indicates the target qubit. This quantum circuit is depicted as acting on two qubits (or equivalently two registers consisting of one qubit).

## Example: Teleportation circuit diagram

Quantum teleportation is perhaps the best quantum algorithm for illustrating these components.

Quantum teleportation is a method for moving data within a quantum computer (or even between distant quantum computers in a quantum network) through the use of entanglement and measurement.
Interestingly, it is actually capable of moving a quantum state, say the value in a given qubit, from one qubit to another, without even knowing what the qubit's value is.
This is necessary for the protocol to work according to the laws of quantum mechanics.

The quantum teleportation circuit is shown here along with an annotated version of the circuit to illustrate how to read the quantum circuit.

:::image type="content" source="media\tp2.svg" alt-text="Diagram of a quantum teleportation circuit.":::

## Next steps

- [Quantum oracles](xref:microsoft.quantum.concepts.oracles)
- [Grover's algorithm](xref:microsoft.quantum.concepts.grovers)
- [Quantum Intermediate Representation](xref:microsoft.quantum.concepts.qir)
- [Vectors and matrices](xref:microsoft.quantum.concepts.vectors)
