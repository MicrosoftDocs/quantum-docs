---
author: SoniaLopezBravo
description: This article describes the Quantum Intermediate Representation developed by the QIR Alliance for quantum computing, its relevance, and use cases
ms.author: sonialopez
ms.date: 08/24/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '\Bigg' ,'|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', '\rho', '\quad', '\sim', '\left\','\right\', '\%', '%']
title: Microsoft Quantum Intermediate Representation | Microsoft Docs
uid: microsoft.quantum.concepts.qir
---

# Quantum Intermediate Representation

Quantum Intermediate Representation (QIR) is an intermediate representation which serves as a common interface between programming languages for gate-based quantum computing and target quantum computation platforms. QIR is based on the popular open source [LLVM](https://llvm.org/) compiler toolchain. QIR specifies a set of rules for representing quantum programs using a language and hardware agnostic format within the LLVM IR. The QIR is a project developed by the QIR Alliance of which Microsoft is one of its members.

## What is an intermediate representation?

A common pattern in classical compilers is to start by compiling the source language into an intermediate representation. An intermediate representation is – as its name indicates – an intermediary step in the conversion of instructions from source code to machine language. 

An intermediate representation acts as an abstract representation of a program. All programs, irrespective of the language they are written in, are translated into this intermediate representation by a so-called front-end compiler, while a back-end component is responsible for translating that intermediate representation into a machine representation. The intermediate representation allows thus to decouple source languages from hardware platforms and makes it possible to build a compiler in a modular way, where each new language only requires a new front-end to be supported on all platforms for which a back-end is available.

The intermediate representation is typically designed to allow many different source languages to be represented. Moreover, at this intermediate level it is also possible to perform some optimization and circuit rearrangement that makes the final implementation more efficient. 
Once the final target execution platform is known, the intermediate representation can be compiled to actual executable code.

This approach allows many source languages to share a common set of optimizers and executable generators. It also makes it easy to compile a single source language for many different targets. The intermediate representation provides a common platform that can be shared across many sources and targets and allows a great deal of reuse in compiler machinery.

## What is Quantum Intermediate Representation?

QIR is an intermediate representation for quantum programs developed by the QIR Alliance, to which Microsoft belongs. QIR is intended to serve as a common interface between many languages and target quantum computation platforms. Thus, while it supports Q#, QIR is not specific to Q#: any programming language for gate-based quantum computing can be represented in QIR. It is hardware-agnostic, which means that it does not specify a quantum instruction or gate set, leaving that to the target computing environment. 

QIR is based on the popular open-source [LLVM](https://llvm.org/) compiler. LLVM  is a collection of modular and reusable compiler and toolchain technologies that has been adapted by a wide set of languages. QIR specifies a set of rules for representing quantum constructs in LLVM, however it does not require any extensions or modifications to LLVM. For more information about LLVM-based compilers, see [this Gitbook about mapping to LLVM IR](https://mapping-high-level-constructs-to-llvm-ir.readthedocs.io/en/latest/README.html).

The fact that LLVM is the underlying toolchain means that QIR is naturally able to process both classical and quantum logic. This feature is essential for hybrid quantum–classical algorithms, which have become increasing important for applications of quantum computing.

For more information, see [QIR Specification](https://github.com/qir-alliance/qir-spec). If you are interested in compiler tools and projects leveraging QIR, please take a look at these [QIR repositories](https://github.com/qir-alliance#contributing).

Quantum SDKs and languages appear and evolve at a fast pace, along with new quantum processors with unique and distinct capabilities from each other. To provide interoperability between new languages and new hardware capabilities it is imperative for the ecosystem to develop and share a forward-looking intermediate representation that works with present and future quantum hardware. In an attempt to meet these objectives the Quantum Intermediate Representation Alliance has been created.

### What is the Quantum Intermediate Representation Alliance?

The [Quantum Intermediate Representation Alliance](https://qir-alliance.org) is a joint effort to develop a forward-looking quantum intermediate representation with the goal to enable full interoperability within the quantum ecosystem, reduce development effort from all parties, and provide a representation suitable for current and future heterogenous quantum processors.

With their collective work and partnership, the QIR Alliance aim to:

- Reduce the required development effort for all parties by promoting interoperability between different frameworks and languages.
- Enable the development of shared libraries both for quantum application development, and for quantum compiler development.
- Build on state-of-the-art compiler technology and leverage existing tools, libraries and learnings from high-performance computing.
- Allow for incremental and progressive evolution in how classical and quantum computations can interact at the hardware level.
- Provide the flexibility to easily connect emerging technologies in a way that permits to experiment with distinct and differentiated hardware capabilities.

The QIR Alliance is part of the [Linux Foundation’s Joint Development Foundation](https://linuxfoundation.org/press-release/new-quantum-intermediate-representation-alliance-serves-as-common-interface-for-quantum-computing-development/#:~:text=%E2%80%9CThe%20Quantum-Intermediate%20Representation%20Alliance%2C%20also%20known%20as%20QIRA%2C,said%20Alex%20Chernoguzov%2C%20Honeywell%20Quantum%20Chief%20Engineer%2C%20Honeywell) 
work on open standards. Founding members include Microsoft, as well as Honeywell, Oak Ridge National Laboratory, Quantum Circuits Inc. and Rigetti Computing.

## What does Quantum Intermediate Representation look like?

Since QIR is based on LLVM, QIR looks like LLVM.

For example, consider the following Q# code to generate a Bell pair:

```qsharp
operation CreateBellPair(q1 : Qubit, q2 : Qubit) : Unit {
    H(q1);
    CNOT(q1, q2);
}
```

When compiled to QIR, this becomes:

```
define void @CreateBellPair__body(%Qubit* %q1, %Qubit* %q2) {
entry:
  call void @__quantum__qis__h(%Qubit* %q1)
  call void @__quantum__qis__cnot(%Qubit* %q1, %Qubit* %q2)
  ret void
}
```
In this snippet, you can see a few QIR features:

- Operations in Q# (or any other quantum programming language) are represented by LLVM functionsn starting with the prefix __quantum__qis__.
- Qubits are represented as pointers to a named opaque structure type called %Qubit.

While the QIR for the `CreateBellPair` operation is very simple, QIR inherits all of the capabilities of LLVM to express loops, conditionals, and other complex control flow. QIR also inherits LLVM’s ability to express arbitrary classical computation.

For more information, watch Microsoft’s developer session from [the 2021 Q2B event](https://www.youtube.com/watch?v=nVy5BBDKxOU).

## Why is Quantum Intermediate Representation important?

QIR is an essential tool when running quantum algorithms on real hardware. But intermediate representations can play an important role even if you just want to develop algorithms at a more theoretical level,

For example, one application enabled by QIR is to use [the Clang compiler](https://clang.llvm.org/), a C language front end for LLVM, to compile QIR into executable machine code for a classical target. This provides an easy path to building a simulator in C or C++ by implementing the quantum instructions,  which could simplify the creation of quantum simulators. 

Moreover, you could use the intermediate representation to generate code that is later provided as input into a quantum simulator – instead of a real device – which could potentially use a different language than the source code. In this way, you can easily compare and benchmark different languages or simulators using a common framework.

In terms of optimization, there are optimization steps that can be performed at the intermediate level that can make the overall algorithm implementation more efficient. Investigating this optimization of your input code can help you get a better understanding of where to make algorithms more efficient and how to improve the quantum programming languages.

Another application is to use the standard LLVM “pass” infrastructure to create quantum optimizers that operate on QIR. The language- and hardware-independent approach of QIR enables reusing those optimizers for different computation languages and computing platforms with almost no effort. 
