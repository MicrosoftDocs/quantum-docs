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

IonQ is a quantum computing hardware and software company. They are developing a
general-purpose trapped ion quantum computer and are a provider of the
Azure Quantum ecosystem.

- Publisher: [Microsoft](https://microsoft.com)
- Provider ID: `ionq`

Billing information: **Free in Private Preview** 

## Targets

The IonQ provider makes the following targets available:

- [IonQ provider](#ionq-provider)
  - [Targets](#targets)
    - [IonQ trapped ion quantum device](#ionq-trapped-ion-quantum-device)
    - [IonQ quantum simulator](#ionq-quantum-simulator)

### IonQ trapped ion quantum device

IonQ’s QPU trapped ion quantum computers perform calculations by manipulating
charged atoms held in a vacuum with lasers. This target operates in a **No
control flow** profile, meaning that it can't use results from qubit
measurements to control the run flow. For more information, see [Targets in Azure Quantum](xref:microsoft.azure.quantum.concepts.targets).

- Job type: `Q# Quantum Application`
- Data Format: ``
- Target ID: `ionq.qpu`

### IonQ quantum simulator

GPU-accelerated idealized simulator using the same gates IonQ provides on its
quantum devices.

- Job type: `Q# Quantum Application`
- Data Format: ``
- Target ID: `ionq.simulator`
