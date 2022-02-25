---
author: Mobius5150
description: This document provides the technical details of the Honeywell quantum provider
ms.author: mblouin
ms.date: 01/27/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: Honeywell provider
uid: microsoft.quantum.providers.honeywell
---

# Honeywell provider

- Publisher: [Quantinuum](https://www.quantinuum.com)
- Provider ID: `honeywell`

> [!Note]
> The Honeywell provider has been replaced by the Quantinuum Provider. New customers must use the [Quantinuum provider](xref:microsoft.quantum.providers.quantinuum). Existing customers may continue using the Honeywell provider or may follow the [migration guide to switch to the Quantinuum provider](xref:microsoft.quantum.providers.honeywell.migration).

## Targets

The following targets are available from this provider:

- [API Validator](#api-validator)
- [System Model H1 Emulator, Powered by Honeywell](#system-model-h1-emulator-powered-by-honeywell)
- [System Model H1, Powered by Honeywell](#system-model-h1-powered-by-honeywell)

### Target Availability

A target's status indicates its current ability to process jobs. The possible states of a target include:

- **Available**: The target is processing jobs at a normal rate.
- **Degraded**: The target is currently processing jobs at a slower rate than usual.
- **Unavailable**: The target currently does not process jobs.

Current status information may be retrieved from the *Providers* tab of a workspace on the [Azure Portal](https://portal.azure.com).

### API Validator

We recommend that users first validate their code using our API Validator. This is a tool to verify proper syntax, compilation completion, and machine compatibility. Full stack is exercised with the exception of the actual quantum operations. Assuming no bugs, all zeros are returned in the proper data structure. The API Validator allows developers to validate their code at any time, even when the machine is offline.

- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1`
- Target ID: `honeywell.hqs-lt-s1-apival` or `honeywell.hqs-lt-s2-apival`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

Billing information:  No charge for usage.

### System Model H1 Emulator, Powered by Honeywell

After validating the syntax of their code with the API Validator,  users can run Quantinuum's H1 Emulator, a simulator tool which contains detailed, realistic noise models of the actual System Model H1 hardware. The H1 Emulator noise model is derived from a detailed characterization of the H1-1 hardware, and is also representative of  H1-2 hardware performance. The H1 Emulator uses an identical API for job submission as the System Model H1 hardware, enabling seamless transition from emulation to hardware. To help maximize productivity and shorten development time, the H1 Emulator is available even while the hardware is offline.     
- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1`
- Target ID:  `honeywell.hqs-lt-s1-sim` or `honeywell.hqs-lt-s2-sim`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

Billing information:  H1 Emulator usage is offered free-of-charge with a hardware subscription. For details, see Billing information for the [System Model H1](#system-model-h1-powered-by-honeywell).


### System Model H1, Powered by Honeywell

Quantinuum's quantum computer, the System Model H1, Powered by Honeywell, includes two hardware machine targets: H1-1 and H1-2.  Both machines have fundamentally the same design and both meet a nominal set of technical requirements. However, they may have system-to-system variability in exact performance and features, such as the maximum number of available qubits. Users are encouraged to test compatibility of their code by submitting jobs to the [API Validator](#api-validator) prior to submitting them to the target machines.  

Users may submit jobs to a specific machine (H1-1 or H1-2), or submit them to the *machine family*.  Submission to the machine family enables the submitted job to run on the first available, compatible machine. The only condition for compatibility is the number of qubits. If a user submits a job to a specific machine that is not available, the job will remain in that machine's queue until the machine becomes available.   

Both System Model H1 hardware H1-1 and H1-2 are continuously upgraded throughout their product lifecycle. Users are given access to the most up-to-date, advanced, and capable hardware available.


- Job type: `Quantum Program`
- Data Format: `honeywell.openqasm.v1`
- Target ID:
    - H1-1: `honeywell.hqs-lt-s1` 
    - H1-2: `honeywell.hqs-lt-s2`
    - H1 machine family: `honeywell.hqs-lt`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)


Billing information:

- **Standard Subscription:**
Monthly subscription plan with 10k H1 Quantum Credits (HQCs) for use on the System Model H1 hardware, Powered by Honeywell and 40k emulator credits (eHQCs) for use on the H1 Emulator / month, available through queued access.
- **Premium Subscription:**
Monthly subscription plan with 17k H1 Quantum Credits (HQCs) for use on System Model H1 hardware, Powered by Honeywell and 100k emulator credits (eHQCs) for use on the H1 Emulator / month, available through queued access.

The following equation defines how circuits are translated into H1 Quantum Credits (HQCs):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

#### Technical Specifications

- Trapped-ion based quantum computer with laser based gates
- QCCD architecture with linear trap and three parallel operational zones
- 10 physical qubits, fully connected
- Typical limiting fidelity >99.5% (two-qubit fidelity)
- Coherence Time ($T_2$) ~3 sec
- Ability to perform mid-circuit measurement and qubit reuse
- High-resolution rotations (> $\pi$/500)
- Native Gate set:
  - single-qubit rotations
  - two-qubit ZZ-gates

More details available under NDA.