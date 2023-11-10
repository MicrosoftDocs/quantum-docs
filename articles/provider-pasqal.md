---
author: SoniaLopezBravo
ms.author: sonialopez
description: This document provides the technical details of the simulators and QPU of the PASQAL quantum provider.
ms.date: 11/07/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: PASQAL quantum computing provider    
uid: microsoft.quantum.providers.pasqal     
---

# PASQAL provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

PASQAL's quantum computers control neutral atoms with optical tweezers, using laser light to manipulate quantum registers with up to a few hundred qubits.

- Publisher: [PASQAL](https://www.pasqal.com/)
- Provider ID: `pasqal`

The following targets available from this provider:

|Target name| Target ID|Number of qubits | Description |
|---|---|---|---|
|[Emu-TN](#emulator) | pasqal.sim.emu_tn| 100 qubits 1D network / 30-50 qubits 2D network| Simulates the time-evolution of a quantum state using the Schrodinger equation corresponding to the actions that the lasers perform. |
|[Fresnel1](#fresnel1) | pasqal.qpu.fresnel | 100 qubits | PASQAL's neutral atoms quantum computer. |

> [!NOTE]
> PASQAL quantum provider is currently available in Private Preview. You can request access to the Private Preview by following [this link](https://aka.ms/AQ/PrivatePreviewRequest). 

## Emulator

PASQAL's Emu-TN emulator run on cluster of 10 DGX nodes, each equipped with 8 NVIDIA A100 GPUs, allow the emulation of PASQAL’s quantum processors. A key tool to gain flexibility. Up to 100 qubits in 2D and 3D arrays can be emulated to develop industrial applications and to advance scientific discovery.

Emu-TN emulator simulates the time-evolution of a quantum state using the Schrodinger's equation corresponding to the actions that the lasers perform.

- Job Type: `Simulation`
- Data Format: `json`
- Target ID: `pasqal.sim.emu_tn`
- Target Execution Profile: 

## Fresnel1

Fresnel1 is PASQAL's quantum computer based on neutral atoms. With 100 qubits, control neutral atoms with optimal tweezers and engineer full-stack processor with high connectivity and scalability. 

- Job Type: `Quantum program`
- Data Format: `json`
- Target ID: `pasqal.qpu.fresnel`
- Target Execution Profile:

## Pricing

To see the PASQAL billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#pasqal).
