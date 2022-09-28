---
author: bradben
description: This document provides the technical details of the Quantinuum quantum provider
ms.author: brbenefield
ms.date: 09/26/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: Quantinuum provider
uid: microsoft.quantum.providers.quantinuum
---

# Quantinuum provider

> [!NOTE]
> The Quantinuum provider replaces the old Honeywell provider. New customers must use the Quantinuum provider in their workspaces. All previously available targets and systems are available with the Quantinuum provider. If you previously used the Honeywell provider, see the [Honeywell to Quantinuum migration guide](xref:microsoft.quantum.providers.honeywell.migration).

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

> [!IMPORTANT]
> Quantinuum target IDs were updated as of \<TBD - DATE\>. Both the old and new IDs will be valid until \<TBD - DATE\>, when the old IDs will expire. Please update any code or job scripts to reflect the new IDs.

| Old target name | New target name |
| ---- | ---- |
| quantinuum.hqs-lt-s1 | quantinuum.qpu.h1-1 |
| quantinuum.hqs-lt-s1-apival | quantinuum.sim.h1-1sc |
| quantinuum.hqs-lt-s2 | quantinuum.qpu.h1-2 |
| quantinuum.hqs-lt-s2-apival | quantinuum.sim.h1-2sc |
| quantinuum.hqs-lt-s1-sim | quantinuum.sim.h1-1e |
| quantinuum.hqs-lt-s2-sim | quantinuum.sim.h1-2e |
| quantinuum.hqs-lt | quantinuum.qpu.h1 |

Quantinuum provides access to trapped-ion systems with high-fidelity, fully connected qubits, and the ability to perform mid-circuit measurement.

- Publisher: [Quantinuum](https://www.quantinuum.com)
- Provider ID: `quantinuum`

## Targets

The following targets are available from this provider:

|Target name|	Target ID|	Number of qubits|	Description|
|---|---|---|---|
|[H1-1 Syntax Checker](#syntax-checkers) |	quantinuum.sim.h1-1sc	|20 qubits| Use this to validate quantum programs against the H1-1 compiler before submitting to hardware or emulators on Quantinuum's platform. Free of cost.|
|[H1-2 Syntax Checker](#syntax-checkers) |	quantinuum.sim.h1-2sc |	12 qubits	|Use this to validate quantum programs against the H1-2 compiler before submitting to hardware or emulators on Quantinuum's platform. Free of cost.|
|[H1-1 Emulator](#system-model-h1-emulators) |	quantinuum.sim.h1-1e | 20 qubits	| Uses a realistic physical model and noise model of H1-1.|
|[H1-2 Emulator](#system-model-h1-emulators)|	quantinuum.sim.h1-2e | 12 qubits	|Uses a realistic physical model and noise model of H1-2.|
|[H1-1](#system-model-h1)|	quantinuum.qpu.h1-1 |	20 qubits|	Quantinuum's H1-1 trapped ion device.|
|[H1-2](#system-model-h1)|	quantinuum.qpu.h1-2	| 12 qubits	|Quantinuum's H1-2 trapped ion device.|

## Syntax Checkers

We recommend that users first validate their code using a Syntax Checker. This is a tool to verify proper syntax, compilation completion, and machine compatibility. Syntax Checkers use the same compiler as the quantum computer they target. For example, the H1-2 syntax checker uses the same compiler as H1-2. The full compilation stack is executed with the exception of the actual quantum operations. If the code compiles, the syntax checker will return a `success` status and a result of all 0s. If the code does not compile, the syntax checker will return a failed status and give the error returned to help users debug their circuit syntax. Syntax Checkers allow developers to validate their code at any time, even when machines are offline.

- Job type: `Simulation`
- Data Format: `quantinuum.openqasm.v1`
- Target ID:
  - H1-1 Syntax Checker: `quantinuum.sim.h1-1sc` 
  - H1-2 Syntax Checker: `quantinuum.sim.h1-2sc`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

Syntax Checkers usage is offered free-of-charge.

## System Model H1 Emulators

After validating the syntax of their code with a Syntax Checker, users can take advantage of Quantinuum's H1 Emulators, emulation tools which contains a detailed physical model and realistic noise model of the actual System Model H1 hardware. The noise model is derived from a detailed characterization of the H1-1 hardware and is also representative of H1-2 hardware performance. The System Model H1 Emulator uses an identical API for job submission as the System Model H1 hardware, enabling seamless transition from emulation to hardware. To help maximize productivity and shorten development time, the H1 Emulator is available even while the hardware is offline.

- Job type: `Simulation`
- Data Format: `quantinuum.openqasm.v1`
- Target ID: 
  - H1-1 Emulator: `quantinuum.sim.h1-1e` 
  - H1-2 Emulator: `quantinuum.sim.h1-2e`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

H1 Emulator usage is offered free-of-charge with a hardware subscription. For details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## System Model H1

The System Model H1 generation of quantum computers, Powered by Honeywell, includes two machine targets: H1-1 and H1-2. Both quantum computers have fundamentally the same design and both meet a nominal set of technical requirements. However, they may have system-to-system variability in exact performance and features, such as the maximum number of available qubits. Users are encouraged to test compatibility of their code by submitting jobs to the [syntax checker](#syntax-checkers) and [System Model H1 Emulator](#system-model-h1-emulators) prior to submitting them to the target machines.  

Users may submit jobs to a specific machine (H1-1 or H1-2), or submit them to the *machine family*.  Submission to the machine family enables the submitted job to run on the first available, compatible machine. The only condition for compatibility is the number of qubits. If a user submits a job to a specific machine that is not available, the job will remain in that machine's queue until the machine becomes available.

Both System Model H1 hardware H1-1 and H1-2 are continuously upgraded throughout their product lifecycle. Users are given access to the most up-to-date, advanced, and capable hardware available.

- Job type: `Quantum Program`
- Data Format: `quantinuum.openqasm.v1`
- Target ID:
  - H1-1: `quantinuum.qpu.h1-1` 
  - H1-2: `quantinuum.qpu.h1-2`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

### Technical Specifications

Technical details for the System Model H1 and System Model H1 Emulators can be found in Quantinuum's [product data sheets](https://www.quantinuum.com/products/h1).

## Target Availability

The Quantinuum H-Series quantum computers are designed to be continuously upgraded, which allows customers to have access to the latest hardware capabilities as Quantinuum continually improves gate fidelities, memory errors, and system speed. 

Quantinuum hardware cycles through commercial periods and development periods. During commercial periods, the hardware is available to process jobs via a queue system. During development periods, the hardware is offline as upgrades are applied.

Every month, a calendar is sent to Quantinuum users with information on the commercial and development periods. If you have not received this calendar, please email QCsupport@quantinuum.com.

A target's status indicates its current ability to process jobs. The possible states of a target include:

- **Available**: The target is online, processing submitted jobs and accepting new ones.
- **Degraded**: The target is accepting jobs, but not currently processing them.
- **Unavailable**: The target is offline, not accepting new job submissions.

For the Quantinuum quantum computer targets, **Available** and **Degraded** correspond to commercial periods, while **Unavailable** corresponds to development periods where the machine is offline for upgrades.

Current status information may be retrieved from the *Providers* tab of a workspace on the [Azure portal](https://portal.azure.com).

## Pricing

To see Quantinuum's billing plans, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## Limits & Quotas

Quantinuum's quotas are tracked based on the QPU usage credit unit, *H-System Quantum Credit (HQC)*, for jobs submitted to System Model H1 quantum computers, and emulator HQCs (eHQCs) for jobs submitted to System Model H1 emulators.

HQCs and eHQCs are used to calculate the cost of running a job, and they are calculated based on the following formula:

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

Quotas are based on plan selection and can be increased with a support ticket. To see your current limits and quotas, go to the **Credits and quotas** blade and select the **Quotas** tab of your workspace on the [Azure portal](https://portal.azure.com). For more information, see [Azure Quantum quotas](xref:microsoft.quantum.quotas).

> [!NOTE]
> If you are using an [Azure Quantum Credits](xref:microsoft.quantum.credits) plan, and not a billing plan, the quotas information maps to your allocated credits. In that case, the quota lists the total number of credits you have received.
