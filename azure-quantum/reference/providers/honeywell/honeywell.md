---
title: Honeywell provider
description: This document provides the technical details of the Honeywell provider
author: Mobius5150
ms.author: mblouin
ms.date: 1/12/2021
ms.topic: article
uid: microsoft.azure.quantum.providers.honeywell
---

# Honeywell provider

- Publisher: [Honeywell](https://www.honeywell.com)
- Provider ID: `honeywell`

# Targets
The following targets are available from this provider:

- [API Validator](#API-Validator)
- [Honeywell System Model H0](#Honeywell-System-Model-H0)
- [Honeywell System Model H1](#Honeywell-System-Model-H1)

## API Validator
Tool to verify proper syntax and compilation completion.  Full stack is exercised with the exception of the actual quantum operations.  Assuming no bugs, all zeros are returned in the proper data structure.

- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1`
- Target ID: `honeywell.hqs-lt-1.0-apival`

Billing information:
    No charge for usage. 

## Honeywell System Model H0
Honeywell Quantum Solutions' Quantum Computer, System Model H0

- Job type: `Quantum Program`
- Data Format: `honeywell.openqasm.v1`
- Target ID: `honeywell.hqs-lt-1.0`

Billing information:

> ⚠⚠⚠ TBD Need a Link to billing information

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `count`   | int    | No | Number of experimental shots. Defaults to 1. |
| `options` | list | No | Compiler options. Only one option currently supported: `no-opt` to disable all optimization |

The following equation defines how circuits are translated into Honeywell Quantum Credits (HQCs):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:
- $N_{1q}$ is the number of one-qubit operations in a circuit  
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.  
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.  
- $C$ is the shot count. 

### Technical Specifications

- Trapped-ion based quantum computer with laser based gates
- QCCD architecture with linear trap and two parallel operation zones
- 6 physical qubits, fully connected  
- Typical limiting fidelity >99\.2% (two-qubit fidelity)  
- Coherence Time (T2) &geq;2 sec
- Ability to perform mid-circuit measurement and qubit reuse
- High-resolution rotations (> $\pi$/500)
- Native Gate set: 
    - single-qubit rotations
    - two-qubit ZZ-gates   

## Honeywell System Model H1
Honeywell Quantum Solutions' Quantum Computer, System Model H1   

- Job type: `Quantum Program`
- Data Format: `honeywell.openqasm.v1`
- Target ID: `honeywell.hqs-lt-s1`

Billing information:

> ⚠⚠⚠ TBD Need a Link to billing information
> ⚠⚠⚠ TBD Need a Link to request access

### Technical Specifications
- Trapped-ion based quantum computer with laser based gates
- QCCD architecture with linear trap and three parallel operational zones
- 10 physical qubits, fully connected
- Typical limiting fidelity >99.5% (two-qubit fidelity)
- Coherence Time (T2) >2 sec
- Ability to perform mid-circuit measurement and qubit reuse
- High-resolution rotations (> $\pi$/500)
- Native Gate set: 
    - single-qubit rotations
    - two-qubit ZZ-gates   

More details available under NDA.