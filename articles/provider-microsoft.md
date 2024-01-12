---
author: bradben
description: This document provides information about the Microsfot quantum computing Resource Estimation provider
ms.author: brbenefield
ms.date: 10/01/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: conceptual
no-loc: [No control flow, target, targets]
title: Microsoft quantum computing provider
uid: microsoft.quantum.providers.microsoft
---

# Microsoft provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Microsoft provides the Azure Quantum Resource Estimator target, along with several in-memory quantum simulators, as part of the [Quantum Development Kit](xref:microsoft.quantum.overview.q-sharp).

## Resource estimator

The Azure Quantum Resource Estimator allows you to understand the resources required to run a particular algorithm. By incorporating the Resource Estimator in your development workflow and continuously evaluating your quantum program, you can understand how implementation changes to the program impact resource consumption.

- Publisher: [Microsoft](https://quantum.microsoft.com)
- Provider ID: `microsoft`
- Job type: `Simulation`
- Target ID: `microsoft.estimator`

For more information, see [An introduction to resource estimation](xref:microsoft.quantum.overview.intro-resource-estimator) or [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

## Quantum simulators

The Quantum Development Kit includes an in-memory quantum simulator, the [Sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator). The sparse simulator simulates quantum algorithms with sparse states,that is, small number of states in superposition.

In-memory simulators have the advantage of being able to run locally and thus faster, as well as running jobs as often as needed free of charge.
