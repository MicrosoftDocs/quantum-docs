---
title: IonQ provider
description: This document provides the technical details of the IonQ provider
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.azure.quantum.providers.ionq
---

# IonQ provider

IonQ’s quantum computers perform calculations by manipulating the hyperfine energy states of Ytterbium ions with lasers. Atoms are nature's qubits — every qubit is identical within and between programs. Logical operations can also be performed on any arbitrary pair of qubits, enabling complex quantum programs unhindered by physical connectivity. Want to learn more? Read IonQ’s [trapped ion quantum computer technology overview](https://ionq.com/technology).

- Publisher: [IonQ](https://ionq.com)
- Provider ID: `ionq`

## Targets

The IonQ provider makes the following targets available:

- [IonQ provider](#ionq-provider)
  - [Targets](#targets)
    - [IonQ Quantum Simulator](#quantum-simulator)
    - [IonQ Quantum Computer](#quantum-computer)

## Quantum Simulator
GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer.

- Job type: `Simulation`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.simulator`
- Q# Profile: `No Control Flow`

## Quantum Computer
Trapped ion quantum computer. Dynamically reconfigurable in software to use up to 11 qubits. All qubits are fully connected, meaning you can run a two-qubit gate between any pair.

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu`
- Q# Profile: `No Control Flow`

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `shots`   | int    | No | Number of experimental shots. Defaults to 500. |

### System timing

| Measure | Average time duration (µs) |
|---------|----------------------------|
| T1 | >10^7 |
| T2 | 200,000 | 
| Single-qubit gate | 10 | 
| Two-qubit gate | 210 | 
| Readout | 100 | 
| Register reset | 25 | 
| Coherence time / gate duration | 1667 | 

### System fidelity

| Operation | Average fidelity |
|-----------|------------------|
| Single-qubit gate | 99.35% (SPAM corrected) |
| Two-qubit gate | 96.02% (not SPAM corrected) |
| SPAM | 99.3 - 99.8% |
| Geometric mean op | 98.34% |

## Pricing

IonQ charges per **gate-shot**: the number of gates in your circuit, multiplied by the number of shots.

Multi-controlled two-qubit gates are billed as _(6N - 6)_ two-qubit gates, where N is the number of qubits involved in the gate (i.e., a NOT gate with three controls would be billed as _(6 * 4 - 6)_ or 8 two-qubit gates).

The prices are variable during the Limited Preview. To see the pricing options:

1. Go to the Azure Portal and create a new workspace.
1. In the **Providers** pane, click in the **Add** button of the IonQ tile and in the description you will find the current pricing options.

## IonQ Best Practices & Connectivity Graph

To see recommended best practices for the IonQ QPU, we recommend reading their [best practices](https://ionq.com/best-practices).