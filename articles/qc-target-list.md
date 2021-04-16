---
author: geduardo
description: This document provides a list of the available quantum computing providers on Azure Quantum.
ms.author: kitty
ms.date: 04/03/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: List of targets on Azure Quantum
uid: microsoft.quantum.reference.qc-target-list
---

# List of quantum computing targets on Azure Quantum

Azure Quantum also offers a variety of quantum solutions, such as
different hardware devices and quantum simulators that you can use to run Q# quantum computing programs.

## Provider: IonQ

![alt_text=logo of IonQ-2](~/media/logo-ionq.png)

### IonQ Quantum Simulator

GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer. For more information, go to the [IonQ provider reference page](xref:microsoft.quantum.providers.ionq#quantum-simulator).

### IonQ Quantum Computer

Trapped ion quantum computer. Dynamically reconfigurable in software to use up to 11 qubits. All qubits are fully connected, meaning you can run a two-qubit gate between any pair. For more information, go to the [IonQ provider reference page](xref:microsoft.quantum.providers.ionq#quantum-computer).

## Provider: Honeywell

![alt_text=logo of Honeywell](~/media/logo-honeywell.png)

### API Validator

Tool to verify proper syntax and compilation completion. Full stack is exercised with the exception of the actual quantum operations. Assuming no bugs, all zeros are returned in the proper data structure. For more information, go to the [Honeywell provider reference page](xref:microsoft.quantum.providers.honeywell#api-validator).

### Honeywell System Model H0

Trapped ion quantum computer with 6 physical fully connected qubits and laser based gates. It uses a QCCD architecture with linear trap and two parallel operation zones. For more information, go to the [Honeywell provider reference page](xref:microsoft.quantum.providers.honeywell#honeywell-system-model-h1).

### Honeywell System Model H1

Trapped ion quantum computer with 10 physical fully connected qubits and laser based gates. It uses a QCCD architecture with linear trap and two parallel operation zones. For more information, go to the [Honeywell provider reference page](xref:microsoft.quantum.providers.honeywell#honeywell-system-model-h1)
