---
author: bradben
description: Learn how to run your Q# programs on the backend simulators available from quantum providers, such as IonQ, PASQAL, Quantinuum, and Rigetti.
ms.author: brbenefield
ms.date: 09/16/2024
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: concept-article
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_', Quantum Development Kit]
title: Simulators from Quantum Providers
uid: microsoft.quantum.machines.overview.backend-simulators

#customer intent: As a quantum developer, I want to understand the backend simulators available from quantum providers, so that I can test my Q# programs before running them on a real quantum computer.
---

# Backend quantum simulators from quantum providers

This article describes the backend simulators available from quantum providers. These simulators are available to all Azure Quantum users, and are a great way to test your Q# programs before running them on a real quantum computer.

## IonQ

IonQ provides a GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates that IonQ provides on its quantum hardware. The simulator is a great place to preflight jobs before running them on an actual quantum computer.

- Job type: `Simulation`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.simulator`
- Target Execution Profile: QIR Base (Quantum Intermediate Representation)

For more information, see the [IonQ provider](xref:microsoft.quantum.providers.ionq) page.

## PASQAL

PASQAL's Emu-TN emulator simulates the time-evolution of a quantum state using the Schrödinger's equation corresponding to the actions that the lasers perform.

Emu-TN emulator runs on a cluster of NVIDIA DGX nodes, each equipped with NVIDIA A100 GPUs, enabling the emulation of PASQAL’s quantum processors. It's a key tool to prototype and validate quantum programs before running them on the QPU (quantum processing unit). Up to 100 qubits in 2D arrays can be emulated to develop industrial applications and to advance scientific discovery.

- Job Type: `Simulation`
- Data Format: `application/json`
- Target ID: `pasqal.sim.emu-tn`
- Target Execution Profile: N/A

For more information, see the [PASQAL provider](xref:microsoft.quantum.providers.pasqal) page.

## Quantinuum

Quantinuum provides two emulator tools:

**Syntax Checkers** - These tools verify proper syntax, compilation completion, and machine compatibility, using the same compiler as the quantum computer they target. There are Syntax Checkers for System Model H1 and H2.

- Job type: `Simulation`
- Data Formats: `honeywell.openqasm.v1`, `honeywell.qir.v1`
- Target ID:
  - H1-1 Syntax Checker: `quantinuum.sim.h1-1sc`
  - H2-1 Syntax Checker: `quantinuum.sim.h2-1sc`
- Target Execution Profile: QIR Adaptive RI
- Pricing: Free ($0)

**Emulators** - These tools contain a detailed physical model and realistic noise model of the actual System Model H1 and H2 hardware. There are emulators for each machine - the H1-1 and H2-1 - along with cloud-based H-Series Emulator.
 
- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1, honeywell.qir.v1`
- Target ID:
  - H1-1 Emulator: `quantinuum.sim.h1-1e`
  - H2-1 Emulator: `quantinuum.sim.h2-1e`
- Target Execution Profile: QIR Adaptive RI

The H-Series Emulator is a System Model H1-based emulator available free-of-charge on the [Code with Azure Quantum](https://quantum.microsoft.com/tools/quantum-coding) page. For more information, see the [H-Series Emulator](xref:microsoft.quantum.providers.quantinuum#h-series-emulator-cloud-based) page.

For more information about all the Quantinuum emulators, see the [Quantinuum provider](xref:microsoft.quantum.providers.quantinuum) page.

## Rigetti

Rigetti provides their Quantum Virtual Machine (QVM), an open-source simulator for Quil. The QVM target accepts a Quil program as text and runs that program on QVM hosted in the cloud, returning simulated results.

- Job Type: `Simulation`
- Data Formats: `rigetti.quil.v1`, `rigetti.qir.v1`
- Target ID: `rigetti.sim.qvm`
- Target Execution Profile: QIR Base
- Pricing: Free ($0)

For more information, see the [Rigetti provider](xref:microsoft.quantum.providers.rigetti) page.