---
author: contributor-provider-id (DO NOT USE A GITHUB ALIAS THAT IS CONNECTED TO AN MS ACCOUNT IN THE PUBLIC REPO - PRMERGER WILL CLOSE THE PR AUTOMATICALLY)
description: This document provides a list of the available quantum computing providers on Azure Quantum.
ms.date: 11/02/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: [Quantum Intermediate Representation, target, targets]
title: List of quantum computing providers on Azure Quantum
uid: microsoft.quantum.reference.qc-target-list
---

# Quantum computing providers on Azure Quantum

Azure Quantum offers various quantum solutions, such as different quantum hardware devices and quantum simulators that you can use to run your quantum computing programs. This article lists the providers that you can access with Azure Quantum, and provides a description of what each provider offers.

| Provider | Description |
|---|---|
|<img src="~/media/logo-ionq2.png" alt="logo of IonQ" title="logo of IonQ" width="200" height="200"/>|IonQ's trapped-ion gate-based quantum computers are universal and dynamically reconfigurable in software, providing up to 11 qubits to use in IonQ Harmony QPU and up to 23 qubits to use in Ionq Aria QPU. All qubits are fully connected, meaning you can run a two-qubit gate between any pair. The implementation of quantum gate operations is done by manipulating Ytterbium ions with laser pulses. IonQ provides a GPU-accelerated quantum simulator supporting up to 29 qubits, using the same set of gates IonQ provides on its quantum hardware. For more information, see the [IonQ provider page](xref:microsoft.quantum.providers.ionq).|
|<img src="~/media/logo-quantinuum.svg" alt="logo of Quantinuum" title="logo of Quantinuum" width="200" height="200"/>| Quantinuum's trapped-ion quantum computers have high-fidelity, fully-connected qubits, and qubit reuse. Quantum operations are laser-based gates with low error rates, and have the ability to perform mid-circuit measurements. The System Model H1 generation of hardware, Powered by Quantinuum, uses a Quantum Charge-Coupled Device (QCCD) architecture. Quantinuum provides an emulation tool, the System Model H1 Emulator, which contains detailed physical models and noise models of the actual quantum hardware. For more information, see the [Quantinuum provider page](xref:microsoft.quantum.providers.quantinuum). |
|<img src="~/media/logo-rigetti.png" alt="logo of Rigetti" title="logo of Rigetti" width="200" height="200"/> | Rigetti's quantum processors are universal, gate-model machines based on tunable superconducting qubits that utilize [quantum intermediate representation (QIR)](xref:microsoft.quantum.concepts.qir) to enable low latency and parallel execution. Their latest Aspen-M family processor is based on proprietary scalable multi-chip technology. System features and device characteristics include enhanced readout capabilities, a speedup in quantum processing times, fast gate times for multiple entangling gate families, rapid sampling via active register reset, and parametric control. For more information, see the [Rigetti provider](xref:microsoft.quantum.providers.rigetti) page.|
|<img src="~/media/logo-pasqal.png" alt="logo of Pasqal" title="logo of Pasqal" width="200" height="200"/>|PASQAL's neutral atom-based quantum processors operating at room temperature have long coherence times and impressive qubit connectivity. For more information, see the [PASQAL provider page](xref:microsoft.quantum.providers.rigetti).|
|<img src="~/media/logo-microsoft2.png" alt="logo of Microsoft" title="logo of Microsoft" width="200" height="200"/>| Microsoft's Azure Quantum offers a first-party resource estimation target that computes and outputs wall clock execution time and physical resource estimates for a program, assuming it is executed on a fault-tolerant error-corrected quantum computer. You can choose from pre-defined qubit parameters and quantum error correction schemes and define custom characteristics of the underlying physical qubit model. The resource estimator tool enables quantum innovators to prepare and refine solutions to run on tomorrow's scaled quantum computers. For more information, see the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) page.|

> [!IMPORTANT]
> Quantum hardware devices are still an emerging technology. These devices have some limitations and requirements for quantum programs that run on them. For more information, see the [target profile types in Azure Quantum](xref:microsoft.quantum.target-profiles). 

For information on which quantum computing providers are available in your region, see [Global availability of Azure Quantum providers](xref:microsoft.quantum.provider-availability).

## Qubit availability for quantum computing providers

Microsoft's provider partners offer a wide-range of qubit availability for their hardware processors and simulators. 

|Target name | Number of qubits|
|---|---|
|[IonQ Quantum simulator](xref:microsoft.quantum.providers.ionq#quantum-simulator)	|29 qubits|	
|[IonQ Harmony](xref:microsoft.quantum.providers.ionq#ionq-harmony-quantum-computer) |11 qubits	|
|[IonQ Aria 1](xref:microsoft.quantum.providers.ionq#ionq-aria-quantum-computer) |25 qubits	|
|[IonQ Aria 2](xref:microsoft.quantum.providers.ionq#ionq-aria-quantum-computer) |25 qubits	|
|[Quantinuum H1-1 Syntax Checker](xref:microsoft.quantum.providers.quantinuum#syntax-checkers) |20 qubits| 
|[Quantinuum H1-2 Syntax Checker](xref:microsoft.quantum.providers.quantinuum#syntax-checkers) |20 qubits|
|[Quantinuum H2-1 Syntax Checker](xref:microsoft.quantum.providers.quantinuum#syntax-checkers) |32 qubits|
|[Quantinuum H1-1 Emulator](xref:microsoft.quantum.providers.quantinuum#system-model-h1-emulators) | 20 qubits| 
|[Quantinuum H1-2 Emulator](xref:microsoft.quantum.providers.quantinuum#system-model-h1-emulators)| 20 qubits|
|[Quantinuum H2-1 Emulator](xref:microsoft.quantum.providers.quantinuum#system-model-h2-emulator)| 32 qubits|
|[Quantinuum H1-1](xref:microsoft.quantum.providers.quantinuum#system-model-h1)|20 qubits|
|[Quantinuum H1-2](xref:microsoft.quantum.providers.quantinuum#system-model-h1)| 20 qubits|
|[Quantinuum H2-1](xref:microsoft.quantum.providers.quantinuum#system-model-h2)| 32 qubits|
|[Rigetti Quantum Virtual Machine (QVM)](xref:microsoft.quantum.providers.rigetti#simulators) |30 qubits|  
|[Rigetti Aspen-M-3](xref:microsoft.quantum.providers.rigetti#aspen-m-3) |80 qubits|
|[PASQAL Emu-free](xref:microsoft.quantum.providers.pasqal#emu-free)|20 qubits|
|[PASQAL Emu-TN](xref:microsoft.quantum.providers.pasqal#emu-tn)|100 qubits|
|[PASQAL Fresnel1](xref:microsoft.quantum.providers.pasqal#fresnel1)|100 qubits|



## Coming soon to Azure Quantum

Azure Quantum is a platform for innovation. As the quantum hardware partners across the Azure Quantum ecosystem keep growing, you can explore these upcoming quantum hardware solutions.

| Provider | Description  |
|---|---|
|<img src="~/media/logo-qci.png" alt="logo of Quantum Circuits" title="logo of Quantum Circuits" width="200" height="200"/>| Quantum Circuits’ full-stack superconducting circuits have real-time feedback that enables error-correcting, encoding-agnostic entangling gates. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of QCI. |




