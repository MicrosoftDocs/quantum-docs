---
author: SoniaLopezBravo
description: This document provides a list of the available quantum computing providers on Azure Quantum.
ms.date: 09/07/2022
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: List of quantum computing targets on Azure Quantum
uid: microsoft.quantum.reference.qc-target-list
---

# Quantum computing providers on Azure Quantum

Azure Quantum offers various quantum solutions, such as different quantum hardware devices and quantum simulators that you can use to run your quantum computing programs. This topic has the latest capabilities available through Azure Quantum.

| Provider | Description |
|---|---|
|<img src="~/media/logo-ionq2.png" alt="logo of IonQ" title="logo of IonQ" width="200" height="200"/>|IonQ's trapped-ion gate-based quantum computers are universal and dynamically reconfigurable in software, providing up to 11 qubits to use in IonQ Harmony QPU and up to 23 qubits to use in Ionq Aria QPU. All qubits are fully connected, meaning you can run a two-qubit gate between any pair. The implementation of quantum gate operations is done by manipulating Ytterbium ions with laser pulses. IonQ provides a GPU-accelerated quantum simulator supporting up to 29 qubits, using the same set of gates IonQ provides on its quantum hardware. For more information, see the [IonQ provider page](xref:microsoft.quantum.providers.ionq).|
|<img src="~/media/logo-quantinuum.svg" alt="logo of Quantinuum" title="logo of Quantinuum" width="200" height="200"/>| Quantinuum's trapped-ion quantum computers have high-fidelity, fully-connected qubits, and qubit reuse. Quantum operations are laser-based gates with low error rates, and have the ability to perform mid-circuit measurements. The System Model H1 generation of hardware, Powered by Honeywell, uses a Quantum Charge-Coupled Device (QCCD) architecture. Quantinuum provides an emulation tool, the System Model H1 Emulator, which contains detailed physical models and noise models of the actual quantum hardware. For more information, see the [Quantinuum provider page](xref:microsoft.quantum.providers.quantinuum). |
|<img src="~/media/logo-rigetti.png" alt="logo of Rigetti" title="logo of Rigetti" width="200" height="200"/> | Rigetti's quantum processors are universal, gate-model machines based on tunable superconducting qubits that utilize [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir) to enable low latency and parallel execution. Their latest Aspen-M family processor is based on proprietary scalable multi-chip technology. System features and device characteristics include enhanced readout capabilities, a speedup in quantum processing times, fast gate times for multiple entangling gate families, rapid sampling via active register reset, and parametric control. For more information, see the [Rigetti provider page](xref:microsoft.quantum.providers.rigetti).|

> [!IMPORTANT]
> Quantum hardware devices are still an emerging technology. These devices have some limitations and requirements for quantum programs that run on them. For more information, see the [target profile types in Azure Quantum](xref:microsoft.quantum.target-profiles). 

For information on which quantum computing providers are available in your region, see [Global availability of Azure Quantum providers](xref:microsoft.quantum.provider-availability).

## Coming soon to Azure Quantum

Azure Quantum is a platform for innovation. As the quantum hardware partners across the Azure Quantum ecosystem keep growing, you can explore these upcoming quantum hardware solutions.

| Provider | Description  |
|---|---|
|<img src="~/media/logo-pasqal.png" alt="logo of Pasqal" title="logo of Pasqal" width="200" height="200"/>|Pasqal's neutral atom-based quantum processors operating at room temperature have long coherence times and impressive qubit connectivity. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of Pasqal.|
|<img src="~/media/logo-qci.png" alt="logo of Quantum Circuits" title="logo of Quantum Circuits" width="200" height="200"/>| Quantum Circuits’ full-stack superconducting circuits have real-time feedback that enables error-correcting, encoding-agnostic entangling gates. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of QCI. |



