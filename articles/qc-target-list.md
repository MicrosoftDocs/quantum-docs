---
author: SoniaLopezBravo
description: This document provides a list of the available quantum computing providers on Azure Quantum.
ms.date: 04/21/2022
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: List of quantum computing targets on Azure Quantum
uid: microsoft.quantum.reference.qc-target-list
---

# Quantum computing providers on Azure Quantum

Azure Quantum offers a variety of quantum solutions, such as different hardware devices and quantum simulators that you can use to run Q# quantum computing programs.

| Provider | Description |
|---|---|
|<img src="~/media/logo-ionq.png" alt="logo of IonQ" title="logo of IonQ" width="150" height="150"/>|IonQ trapped-ion gate-based quantum computers are universal and dynamically reconfigurable in software to use up to 11 qubits. All qubits are fully connected, meaning you can run a two-qubit gate between any pair. The implementation of quantum gate operations is done by manipulating Ytterbium ions with lasers pulses. IonQ provides a GPU-accelerated quantum simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware. For more information, go to the [IonQ provider page](xref:microsoft.quantum.providers.ionq#quantum-simulator).|
|<img src="~/media/logo-quantinuum.png" alt="logo of Quantinuum" title="logo of Quantinuum" width="100" height="100"/>| Quantinuum trapped-ion quantum computer have 10 physical high-fidelity fully connected qubits, allowing qubit reuse. Quantum operations are laser based gates with low error rates, and it has the ability to perform mid-circuit measurements. It uses a QCCD architecture with linear trap and two parallel operation zones. Quantinuum provides a simulator tool which contains detailed, realistic noise models of the actual quantum hardware. The For more information, go to the [Quantinuum provider page](xref:microsoft.quantum.providers.quantinuum#api-validator). |



## Coming soon to Azure Quantum

| Provider | Description  |
|---|---|
|<img src="~/media/logo-pasqal.png" alt="logo of Pasqal" title="logo of Pasqal" width="100" height="100"/>|Pasqal neutral atom-based quantum processors operating at room temperature have long coherence times and impressive qubit connectivity. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of Pasqal.|
|![logo of Rigetti](~/media/logo-rigetti.png) | Rigetti gate-based superconducting processors utilize Quantum Intermediate Representation (QIR) to enable low latency and parallel execution. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of Rigetti.|
|![logo of QCI](~/media/logo-qci.png) | Quantum Circuits full-stack superconducting circuits have real-time feedback that enables error correction, encoding-agnostic entangling gates. You can pre-register today for Azure Quantum’s [private preview](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxm1OO5DJVRBs-fh9Rmd-nRURVRKVUJDM05WV1hDRlU2OFFZUlhUN1Q4SCQlQCN0PWcu) of QCI. |


