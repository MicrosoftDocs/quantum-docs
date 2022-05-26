---
author: bradben
description: This document provides the technical details of the Quantinuum quantum provider
ms.author: brbenefield
ms.date: 02/24/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: Quantinuum provider
uid: microsoft.quantum.providers.quantinuum
---

# Quantinuum provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Quantinuum provides access to a trapped-ion system with high-fidelity, fully connected qubits, and the ability to perform mid-circuit measurement.

- Publisher: [Quantinuum](https://www.quantinuum.com)
- Provider ID: `quantinuum`

> [!Note]
> The Quantinuum provider replaces the old Honeywell provider. New customers must use the Quantinuum provider in their workspaces. All previously available targets and systems are available with the Quantinuum provider. If you previously used the Honeywell provider you may follow the [migration guide to switch to the Quantinuum provider](xref:microsoft.quantum.providers.honeywell.migration).

The following targets are available from this provider:

- [Syntax Checker](#syntax-checker)
- [System Model H1 Emulator](#system-model-h1-emulator)
- [System Model H1](#system-model-h1)

## Target Availability

A target's status indicates its current ability to process jobs. The possible states of a target include:

- **Available**: The target is processing jobs at a normal rate.
- **Degraded**: The target is currently processing jobs at a slower rate than usual.
- **Unavailable**: The target currently does not process jobs.

Current status information may be retrieved from the *Providers* tab of a workspace on the [Azure portal](https://portal.azure.com).

## Syntax Checker

We recommend that users first validate their code using our Syntax Checker. This is a tool to verify proper syntax, compilation completion, and machine compatibility. The full compilation stack is executed with the exception of the actual quantum operations. If the code compiles, the syntax checker will return a `completed` status, the cost of the circuit in H-System Quantum Credits (HQCs), and a result of all `00`. If the code does not compile, the syntax checker will return a `failed` status and give the error returned to help users debug their circuit syntax. The Syntax Checker allows developers to validate their code at any time, even when  machines are offline.

- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1`
- Target ID: `quantinuum.hqs-lt-s1-apival` or `quantinuum.hqs-lt-s2-apival`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

Billing information:  No charge for usage.

## System Model H1 Emulator

After validating the syntax of their code with the Syntax Checker, users can utilize Quantinuum's H1 Emulator, an emulation tool which contains a detailed physical model and realistic noise models of the actual System Model H1 hardware. The System Model H1 Emulator noise model is derived from a detailed characterization of the H1-1 hardware and is also representative of  H1-2 hardware performance. The System Model H1 Emulator uses an identical API for job submission as the System Model H1 hardware, enabling seamless transition from emulation to hardware. To help maximize productivity and shorten development time, the H1 Emulator is available even while the hardware is offline.

- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1`
- Target ID:  `quantinuum.hqs-lt-s1-sim` or `quantinuum.hqs-lt-s2-sim`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

Billing information: H1 Emulator usage is offered free-of-charge with a hardware subscription. For details, see Billing information for the [System Model H1](#system-model-h1).

## System Model H1

Quantinuum's quantum computer, the System Model H1, Powered by Honeywell, includes two hardware machine targets: H1-1 and H1-2.  Both machines have fundamentally the same design and both meet a nominal set of technical requirements. However, they may have system-to-system variability in exact performance and features, such as the maximum number of available qubits. Users are encouraged to test compatibility of their code by submitting jobs to the [Syntax Checker](#syntax-checker) prior to submitting them to the target machines.  

Users may submit jobs to a specific machine (H1-1 or H1-2), or submit them to the *machine family*.  Submission to the machine family enables the submitted job to run on the first available, compatible machine. The only condition for compatibility is the number of qubits. If a user submits a job to a specific machine that is not available, the job will remain in that machine's queue until the machine becomes available.

Both System Model H1 hardware H1-1 and H1-2 are continuously upgraded throughout their product lifecycle. Users are given access to the most up-to-date, advanced, and capable hardware available.

- Job type: `Quantum Program`
- Data Format: `honeywell.openqasm.v1`
- Target ID:
  - H1-1: `quantinuum.hqs-lt-s1` 
  - H1-2: `quantinuum.hqs-lt-s2`
  - H1 machine family: `quantinuum.hqs-lt`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)


### Technical Specifications

- Trapped-ion based quantum computer with laser based gates
- Quantum Charge-Coupled Device (QCCD) architecture with linear trap and three parallel operational zones
- 10 physical qubits, fully connected
- Typical limiting fidelity >99.5% (two-qubit fidelity)
- Coherence Time ($T_2$) ~3 sec
- Ability to perform mid-circuit measurement and qubit reuse
- High-resolution rotations (> $\pi$/500)
- Native Gate set:
  - single-qubit rotations
  - two-qubit ZZ-gates

More details available under NDA.

## Pricing

To see Quantinuum billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).
