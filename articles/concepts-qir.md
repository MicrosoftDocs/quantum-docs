---
author: SoniaLopezBravo
description: 
ms.author: sonialopez
ms.date: 08/18/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '\Bigg' ,'|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', '\rho', '\quad', '\sim', '\left\','\right\', '\%', '%']
title: Quantum Intermediate Representation
uid: microsoft.quantum.concepts.qir
---

# Quantum Intermediate Representation

Quantum Intermediate Representation (QIR)is a  Microsoft-developed intermediate representation to serve as a common interface between programming languages for gate-based quantum computing and target quantum computation platforms.


## What is an Intermediate Representation

An intermediate representation is – as its name indicates – an intermediary step in the workflow between the source code and the hardware itself. A common pattern in compilers is to start by compiling the source language into an intermediate representation. 
The intermediate representation is typically designed to allow many different source languages to be represented. Moreover, at this intermediate level it is also possible to perform some optimization and circuit rearrangement that makes the final implementation more efficient. 
Finally, once the actual target execution platform is known, the intermediate representation can be compiled to actual executable code.

This approach allows many source languages to share a common set of optimizers and executable generators. It also makes it easy to compile a single source language for many different targets. The intermediate representation provides a common platform that can be shared across many sources and targets and allows a great deal of re-use in compiler machinery.



## What is Quantum Intermediate Representation

Quantum Intermediate Representation, is based on the popular open source [LLVM](https://llvm.org/) compiler toolchain. QIR specifies a set of rules for representing quantum programs within the LLVM IR

QIR is intended to serve as a common interface between many languages and target quantum computation platforms. 
Thus, while it supports Q#, QIR is not specific to Q#: any programming language for gate-based quantum computing can be represented in QIR. 
Similarly, QIR is hardware-agnostic: it does not specify a quantum instruction or gate set, leaving that to the target computing environment.

For more information, see [QIR Specification](https://github.com/qir-alliance/qir-spec).

The fact that LLVM is the underlying toolchain means that QIR is naturally able to process both classical and quantum logic. This feature is essential for hybrid quantum–classical algorithms, which have become increasing important for applications of quantum computing.


## What does Quantum Intermediate Representation look like

Since QIR is based on LLVM, QIR looks like LLVM.

For example, consider the following Q# code to generate a Bell pair:

```qsharp
operation BellPair(q1 : Qubit, q2 : Qubit) : Unit
{
    H(q1);
    CNOT(q1, q2);
}
```

When compiled to QIR, this becomes:

```
define void @BellPair__body(%Qubit* %q1, %Qubit* %q2) {
entry:
  call void @__quantum__qis__h(%Qubit* %q1)
  call void @__quantum__qis__cnot(%Qubit* %q1, %Qubit* %q2)
  ret void
}
```
In this snippet, a few QIR features are apparent:

- Operations in Q# (or any other quantum programming language) are represented by LLVM functions.
- LLVM functions whose names start with __quantum__qis__ are reserved to represent operations in the quantum instruction set being used.
- Qubits are represented as pointers to a named opaque structure type, %Qubit.

While the QIR for this trivial sample is very simple, QIR inherits all of the capabilities of LLVM to express loops, conditionals, and other complex control flow. QIR also inherits LLVM’s ability to express arbitrary classical computation.



## What is the Quantum Intermediate Representation Alliance

The [Quantum Intermediate Representation Alliance](https://qir-alliance.org) is a joint effort to develop a forward-looking quantum intermediate representation with the goal to enable full interoperability within the quantum ecosystem and reduce development effort from all parties.

The QIR Alliance is part of the [Linux Foundation’s Joint Development Foundation](https://linuxfoundation.org/press-release/new-quantum-intermediate-representation-alliance-serves-as-common-interface-for-quantum-computing-development/#:~:text=%E2%80%9CThe%20Quantum-Intermediate%20Representation%20Alliance%2C%20also%20known%20as%20QIRA%2C,said%20Alex%20Chernoguzov%2C%20Honeywell%20Quantum%20Chief%20Engineer%2C%20Honeywell) 
work on open standards. Founding members include Microsoft, as well as Honeywell, Oak Ridge National Laboratory, Quantum Circuits Inc. and Rigetti Computing. 



