---
author: bradben
description: Learn how to run your Q# programs on the backend simulators from Microsoft partners.
ms.author: sonialopez
ms.date: 06/01/2023
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', Quantum Development Kit]
title: Partner simulators 
uid: microsoft.quantum.machines.overview.backend-simulators
---

# Backend quantum simulators

Backend quantum simulators are provided by third-party Microsoft partners as part of the Azure Quantum service, and represent the state-of-the-art of quantum processing. 

## IonQ

IonQ provides a GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates that IonQ provides on its quantum hardware — a great place to preflight jobs before running them on an actual quantum computer.

- Job type: `Simulation`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.simulator`
- Target Execution Profile: No Control Flow

For more information, see the [IonQ provider](xref:microsoft.quantum.providers.ionq) page.

## QCI

Quantum Circuits, Inc. (QCI) is building full-stack quantum computing systems
based on superconducting circuit technology. Unique to QCI hardware is the use
of resonators as the core of their quantum computing resource. These elements
provide an efficient means of encoding quantum information in superpositions of
microwave photons, which unlocks powerful error correction capability.

Measurement-based feedback and real-time classical calculations are key features
of QCI's control paradigm. They are integrated into its advanced Quantum
Intermediate Representation (QIR) profile.  This enables users to unlock new
classes of quantum applications.

The QCI simulator is designed to model QCI hardware. Although the simulator is
ideal with regard to quantum noise, it reflects precision and accuracy of
classical arithmetic on 18-bit signed integer and Q2.16 fixed-point registers.
These registers have ranges of `[-131072, 131071]` and `[-2, 2 - 2^-16]`
respectively. They are implemented as 2's complement and would underflow or wrap
around without warning at run-time. Before simulating, it completes a full
compilation and thereby validates the program against hardware constraints.

The QCI simulator currently supports eight qubits in a ring topology and lets
you simulate up to 1,000,000 shots. The simulator is always available.

Please contact support@quantumcircuits.com for support and visit
www.quantumcircuits.com for more information.

- Job type: `Simulation`
- Data Format: `microsoft.qir.v1`
- Target ID: `qci.simulator`
- Publisher: [QCI](https://quantumcircuits.com/)
- Provider ID: qci
- Target Execution Profile: Adaptive Execution
- Pricing: Free ($0)

## Quantinuum

Quantinuum provides two emulator tools:

**Syntax Checkers** - These tools verify proper syntax, compilation completion, and machine compatibility, using the same compiler as the quantum computer they target. There are Syntax Checkers for System Model H1 and H2.

- Job type: `Simulation`
- Data Formats: `honeywell.openqasm.v1`, `honeywell.qir.v1`
- Target ID:
  - H1-1 Syntax Checker: `quantinuum.sim.h1-1sc`
  - H1-2 Syntax Checker: `quantinuum.sim.h1-2sc`
  - H2-1 Syntax Checker: `quantinuum.sim.h2-1sc`
- Target Execution Profile: Basic Measurement Feedback
- Pricing: Free ($0)

**Emulators** - These tools contain a detailed physical model and realistic noise model of the actual System Model H1 and H2 hardware. There are emulators for each machine, H1-1, H1-2, and H2-1.
 
- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1, honeywell.qir.v1`
- Target ID:
  - H1-1 Emulator: `quantinuum.sim.h1-1e`
  - H1-2 Emulator: `quantinuum.sim.h1-2e`
  - H2-1 Emulator: `quantinuum.sim.h2-1e`
- Target Execution Profile: Basic Measurement Feedback

For more information, see the [Quantinuum provider](xref:microsoft.quantum.providers.quantinuum) page.

## Rigetti

Riggeti provides their Quantum Virtual Machine (QVM), an open-source simulator for Quil. The QVM target accepts a Quil program as text and runs that program on QVM hosted in the cloud, returning simulated results.

- Job Type: `Simulation`
- Data Formats: `rigetti.quil.v1`, `rigetti.qir.v1`
- Target ID: `rigetti.sim.qvm`
- Target Execution Profile: No Control Flow
- Pricing: Free ($0)

For more information, see the [Rigetti provider](xref:microsoft.quantum.providers.rigetti) page.
