---
author: SoniaLopezBravo
description: This document provides a list of the available quantum computing providers on Azure Quantum.
ms.date: 10/03/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: concept-article
no-loc: [Quantum Intermediate Representation, target, targets]
title: List of quantum computing providers on Azure Quantum
uid: microsoft.quantum.reference.qc-target-list
---

# Quantum computing providers on Azure Quantum

Azure Quantum offers various quantum solutions, such as different quantum hardware devices and quantum simulators that you can use to run your quantum computing programs. This article lists the providers that you can access with Azure Quantum, and provides a description of what each provider offers.

| Provider | Description |
|---|---|
|<img src="~/media/logo-ionq2.png" alt="logo of IonQ" title="logo of IonQ" width="200" height="200"/>|IonQ's trapped-ion gate-based quantum computers are universal and dynamically reconfigurable in software, providing up to 25 qubits in the Ionq Aria QPU and 32 qubits in the IonQ Forte QPU. All qubits are fully connected, meaning you can run a two-qubit gate between any pair. The implementation of quantum gate operations is done by manipulating Ytterbium ions with laser pulses. IonQ provides a GPU-accelerated quantum simulator supporting up to 29 qubits, using the same set of gates IonQ provides on its quantum hardware. For more information, see the [IonQ provider page](xref:microsoft.quantum.providers.ionq).|
|<img src="~/media/logo-microsoft2.png" alt="logo of Microsoft" title="logo of Microsoft" width="200" height="200"/>| Microsoft's Azure Quantum offers a first-party resource estimation target that computes and outputs wall clock execution time and physical resource estimates for a program, assuming that you execute it on a fault-tolerant, error-corrected quantum computer. You can choose from predefined qubit parameters and quantum error correction schemes and define custom characteristics of the underlying physical qubit model. The resource estimator tool enables quantum innovators to prepare and refine solutions to run on tomorrow's scaled quantum computers. For more information, see the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator) page.|
|<img src="~/media/logo-pasqal.png" alt="logo of Pasqal" title="logo of Pasqal" width="200" height="200"/>|PASQAL's neutral atom-based quantum processors operating at room temperature have long coherence times and impressive qubit connectivity. The operations are performed with optical tweezers, using laser light to manipulate 1D and 2D quantum registers with up to a hundred qubits. PASQAL is currently available in Private Preview, you can request access by following [this link](https://aka.ms/AQ/PrivatePreviewRequest). For more information, see the [PASQAL provider page](xref:microsoft.quantum.providers.pasqal).|
|<img src="~/media/logo-quantinuum.svg" alt="logo of Quantinuum" title="logo of Quantinuum" width="200" height="200"/>| Quantinuum's trapped-ion quantum computers have high-fidelity, fully connected qubits, and qubit reuse. Quantum operations are laser-based gates with low error rates, and have the ability to perform mid-circuit measurements. Both the System Model H1 and H2 generations of hardware, Powered by Honeywell, use a Quantum Charge-Coupled Device (QCCD) architecture. Quantinuum provides emulation tools, the System Model H1 and H2 Emulators, which contain detailed physical models and noise models of the actual quantum hardware. For more information, see the [Quantinuum provider page](xref:microsoft.quantum.providers.quantinuum). |
|<img src="~/media/logo-rigetti.png" alt="logo of Rigetti" title="logo of Rigetti" width="200" height="200"/> | Rigetti's systems are powered by superconducting qubit-based quantum processors. They offer fast gate times, low-latency conditional logic, and fast program execution times. At the chip level, each superconducting qubit consists of a non-linear Josephson inductance in parallel with an ultra-low-loss capacitor to create a resonant structure in the 3-6GHz range. Qubits are coupled to a linear superconducting resonator for readout. The combination of the qubit, the linear readout resonator, and the associated wiring provides a general-purpose quantum circuit element capable of reliably encoding, manipulating, and reading out quantum information. Rigetti's processors use arrays of qubits coupled to one another with on-chip capacitances. Single and multi-qubit logic operations are implemented through the application of microwave or DC pulses.  For more information, see the [Rigetti provider](xref:microsoft.quantum.providers.rigetti) page.|


> [!IMPORTANT]
> Quantum hardware devices are still an emerging technology. These devices have some limitations and requirements for quantum programs that run on them. For more information, see the [target profile types in Azure Quantum](xref:microsoft.quantum.target-profiles). 

For information on which quantum computing providers are available in your region, see [Global availability of Azure Quantum providers](xref:microsoft.quantum.provider-availability).

## Qubit availability for quantum computing providers

Microsoft's provider partners offer a wide-range of qubit availability for their hardware processors and simulators. 

|Target name |	Number of qubits|
|---|---|
|[IonQ Quantum simulator](xref:microsoft.quantum.providers.ionq#quantum-simulator)	|29 qubits|	
|[IonQ Aria 1](xref:microsoft.quantum.providers.ionq#ionq-aria-quantum-computer) |25 qubits	|
|[IonQ Aria 2](xref:microsoft.quantum.providers.ionq#ionq-aria-quantum-computer) |25 qubits	|
|[PASQAL Emu-TN](xref:microsoft.quantum.providers.pasqal#emulator)|100 qubits|
|[PASQAL Fresnel1](xref:microsoft.quantum.providers.pasqal#fresnel1)|100 qubits|
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
|[Rigetti Ankaa-9Q-3](xref:microsoft.quantum.providers.rigetti#ankaa-9q-3) |9 qubits|


## Coming soon to Azure Quantum

Azure Quantum is a platform for innovation. As the quantum hardware partners across the Azure Quantum ecosystem keep growing, you can explore these upcoming quantum hardware solutions.

| Provider | Description  |
|---|---|
|<img src="~/media/logo-qci.png" alt="logo of Quantum Circuits" title="logo of Quantum Circuits" width="200" height="200"/>| Quantum Circuits’ full-stack superconducting circuits have real-time feedback that enables error-correcting, encoding-agnostic entangling gates. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of QCI. |

