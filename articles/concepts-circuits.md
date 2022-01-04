---
author: QuantumWriter
description: Learn how to visually represent simple and complex quantum operations with quantum circuit diagrams.
ms.author: v-benbra
ms.date: 10/04/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Quantum circuit diagrams
uid: microsoft.quantum.concepts.circuits
---

# Quantum circuit diagrams 

This article covers conventions for quantum circuit diagrams. Some quantum algorithms are easier to understand in a circuit diagram than in the equivalent written matrix representation once you understand the visual conventions.

With Azure Quantum, you can use the `azure-quantum` Python package to submit quantum circuits with [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit), [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq), and also [provider-specific formatted circuits](xref:microsoft.quantum.quickstarts.computing.provider).

## Quantum circuit diagram conventions

In a circuit diagram, each solid line depicts a qubit, or more generally, a qubit register. By convention, the top line is qubit register $0$ and the remaining registers are labeled sequentially. 

Operations are represented by *quantum gates*. The term quantum gate is analogous to classical logic gates. Gates acting on one or more qubit registers are denoted as a box.
For example, the symbol

<!--- ![](.\media\2.svg) --->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Symbol for a Hadamard operation acting on a single-qubit register](~/media/2.svg)

is a [Hadamard](xref:Microsoft.Quantum.Intrinsic.H) operation acting on a single-qubit register.

In a quantum circuit, time flows from left to right. Quantum gates are ordered in chronological order with the left-most gate as the gate first applied to the qubits.
In other words, if you picture the wires as holding the quantum state, the wires bring the quantum state through each of the gates in the diagram from left to right.
That is to say 

<!--- ![](.\media\3.svg) --->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Diagram of quantum gates being applied left-to-right](~/media/3.svg)

is the unitary matrix $CBA$.

> [!NOTE]
> Matrix multiplication obeys the opposite convention: the right-most matrix is applied first. In quantum circuit diagrams, however, the left-most gate is applied first.
>This difference can at times lead to confusion, so it is important to note this significant difference between the linear algebraic notation and quantum circuit diagrams.

### Example: Unitary transformation

Consider the unitary transformation $\text{ CNOT}_{01}(H\otimes 1)$.
This gate sequence is of fundamental significance to quantum computing because it creates a maximally entangled two-qubit state:

$$\mathrm{CNOT}_{01}(H\otimes 1)\ket{00} = \frac{1}{\sqrt{2}} \left(\ket{00} + \ket{11} \right),$$

Operations with this or greater complexity are ubiquitous in quantum algorithms and quantum error correction.

The circuit diagram for preparing this maximally entangled quantum state is:

<!--- ![](.\media\1.svg) --->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Circuit diagram for a maximally entangled two-qubit state](~/media/1.svg)

The symbol behind the Hadamard gate represents a [CNOT gate](xref:Microsoft.Quantum.Intrinsic.CNOT), where the black circle indicates the control qubit and the cross within a circle indicates the target qubit. This quantum circuit is depicted as acting on two qubits (or equivalently two registers consisting of one qubit).

### Inputs and outputs of quantum circuits

The previous examples have had precisely the same number of wires (qubits) input to a quantum gate as the number of wires out from the quantum gate.
It may at first seem reasonable that quantum circuits could have more, or fewer, outputs than inputs in general.
This is impossible, however, because all quantum operations, save measurement, are unitary and hence reversible.
If they did not have the same number of outputs as inputs they would not be reversible and hence not unitary, which is a contradiction.
For this reason any box drawn in a circuit diagram must have precisely the same number of wires entering it as exiting it.

Multi-qubit circuit diagrams follow similar conventions to single-qubit ones.
As a clarifying example, a two-qubit unitary operation $B$ can be defined to be $(H S\otimes X)$, so the equivalent quantum circuit is:

<!--- ![](.\media\4.svg) --->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Circuit diagram of a two-qubit unitary operation](~/media/4.svg)

You can also view $B$ as having an action on a single two-qubit register rather than two one-qubit registers depending on the context in which the circuit is used. 

Perhaps the most useful property of such abstract circuit diagrams is that they allow complicated quantum algorithms to be described at a high level without having to compile them down to fundamental gates.
This means that you can get an intuition about the data flow for a large quantum algorithm without needing to understand all the details of how each of the subroutines within the algorithm work.

### Controlled gates

The action of a quantum singly controlled gate, denoted $\Lambda(G)$, where a single qubit's value controls the application of $G$, can be understood by looking at the following example of a product state input:

$$\Lambda(G) (\alpha \ket{0} + \beta \ket{1}) \ket{\psi} = \alpha \ket{0} \ket{\psi} + \beta \ket{1} G\ket{\psi}$$

That is to say, the controlled gate applies $G$ to the register containing $\psi$ if and only if the control qubit takes the value $1$. In general, such controlled operations are described in circuit diagrams as

<!--- ![](.\media\5.svg) --->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Circuit diagram of a singly controlled gate](~/media/5.svg)

Here the black circle denotes the quantum bit on which the gate is controlled and a vertical wire denotes the unitary that is applied when the control qubit takes the value $1$.
For the special cases where $G=X$ and $G=Z$, the following notation is used to describe the controlled version of the gates (note that the controlled-X gate is the [CNOT gate](xref:Microsoft.Quantum.Intrinsic.CNOT)):

<!--- ![](.\media\6.svg) --->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Circuit diagram for special cases of controlled gates](~/media/6.svg)

Q# provides methods to automatically generate the controlled version of an operation, which saves the programmer from having to hand code these operations. An example of this is shown below:

```qsharp
operation PrepareSuperposition(qubit : Qubit) : Unit
is Ctl { // Auto-generate the controlled specialization of the operation
    H(qubit);
}
```

### Measurement operator
The remaining operation to visualize in circuit diagrams is measurement. Measurement takes a qubit register, measures it, and outputs the result as classical information.

A measurement operation is denoted by a meter symbol and always takes as input a qubit register (denoted by a solid line) and outputs classical information (denoted by a double line).
Specifically, such a subcircuit looks like:

<!--- ![](.\media\7.svg) ---->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Symbol representing a measurement operation](~/media/7.svg)

Q# implements a [Measure operator](xref:Microsoft.Quantum.Intrinsic.Measure) for this purpose.
See the [section on measurements](xref:microsoft.quantum.libraries.overview.standard.prelude#measurements) for more information.

Similarly, the subcircuit

<!--- ![](.\media\8.svg) --->
<!-- Can't find a way to easily center this... probably an extension needed:  -->
![Circuit diagram representing a controlled operation](~/media/8.svg)

gives a classically controlled gate, where $G$ is applied conditioned on the classical control bit being value $1$.

## Teleportation circuit diagram

Quantum teleportation is perhaps the best quantum algorithm for illustrating these components.
You can learn hands-on with the corresponding [Quantum Kata](xref:microsoft.quantum.tutorial-qdk.katas).

Quantum teleportation is a method for moving data within a quantum computer (or even between distant quantum computers in a quantum network) through the use of entanglement and measurement.
Interestingly, it is actually capable of moving a quantum state, say the value in a given qubit, from one qubit to another, without even knowing what the qubit's value is.
This is necessary for the protocol to work according to the laws of quantum mechanics.

The quantum teleportation circuit is shown here along with an annotated version of the circuit to illustrate how to read the quantum circuit.

<!--- ![](.\media\tp2.svg){ width=50% } --->
![Quantum teleportation circuit](~/media/tp2.svg)
