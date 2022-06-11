---
author: SoniaLopezBravo
description: This document provides the technical details of the IonQ provider
ms.author: sonialopez
ms.date: 12/01/2021
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: IonQ provider
uid: microsoft.quantum.providers.ionq
---

# IonQ provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

IonQ’s quantum computers perform calculations by manipulating the hyperfine energy states of Ytterbium ions with lasers. Atoms are nature's qubits — every qubit is identical within and between programs. Logical operations can also be performed on any arbitrary pair of qubits, enabling complex quantum programs unhindered by physical connectivity. Want to learn more? Read IonQ’s [trapped ion quantum computer technology overview](https://ionq.com/technology).

- Publisher: [IonQ](https://ionq.com)
- Provider ID: `ionq`

## Targets

### Quantum simulator
GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer.

- Job type: `Simulation`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.simulator`
- Q# Profile: `No Control Flow`

### Quantum computer
The IonQ QPU is a trapped ion quantum computer and is dynamically reconfigurable in software to use up to 11 qubits. All qubits are fully connected, meaning you can run a two-qubit gate between any pair.

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu`
- Q# Profile: `No Control Flow`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `shots`   | int    | No | Number of experimental shots. Defaults to 500. |

#### System timing

| Measure | Average time duration (µs) |
|---------|----------------------------|
| T1 | >10^7 |
| T2 | 200,000 | 
| Single-qubit gate | 10 | 
| Two-qubit gate | 210 | 
| Readout | 100 | 
| Register reset | 25 | 
| Coherence time / gate duration | 1667 | 

#### System fidelity

| Operation | Average fidelity |
|-----------|------------------|
| Single-qubit gate | 99.35% (SPAM corrected) |
| Two-qubit gate | 96.02% (not SPAM corrected) |
| SPAM | 99.3 - 99.8% |
| Geometric mean op | 98.34% |

## Pricing

To see IonQ billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## Limits & Quotas

IonQ quotas are tracked based on the QPU usage unit, which is *qubit-gate-shot* or *QGS*. The resource usage is credited against your account.

If you are using an Azure Quantum Credits plan, the quotas map to your allocated credits. 

Approx. value is 0.000015 USD per QPU Credit 

Quotas are based on plan selection and can be increased with a support ticket. For more information, see [Azure Quantum quotas](xref:microsoft.quantum.providers-quotas).


## IonQ best practices and connectivity graph

To see recommended best practices for the IonQ QPU, we recommend reading their [best practices](https://ionq.com/best-practices).
