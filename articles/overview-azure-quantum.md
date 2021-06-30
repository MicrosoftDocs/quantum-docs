---
author: KittyYeungQ
description: Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
title: Introduction to Azure Quantum
uid: microsoft.quantum.azure-quantum-overview
---

# Introduction to Azure Quantum (preview)

Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud. Using the Azure Quantum tools and SDKs, you can create quantum programs and run them against different quantum simulators and machines.



## Quantum computing

Azure Quantum offers you access to different providers of quantum computing devices and enables you to run your Q# quantum programs on real hardware. [Q#](xref:microsoft.quantum.overview.q-sharp) is a Microsoft’s open-source programming language for developing and running your quantum algorithms. Azure Quantum also offers the option to run algorithms on simulated quantum computers to test your code. To learn more about quantum computers and quantum algorithms see [Introduction to quantum computing](xref:microsoft.quantum.overview.qdk-overview).

Azure Quantum provides access to trapped ion devices through the providers **IonQ** and **Honeywell.** For more information, see [Quantum computing targets](xref:microsoft.quantum.reference.qc-target-list)

## Optimization

Azure Quantum gives you access to a broad set of state-of-the-art optimization algorithms developed by Microsoft and its partners. You can use classic optimization algorithms, included some inspired by standard physics, as well as [quantum-inspired optimization](xref:microsoft.quantum.optimization.overview.what-is-qio) algorithms (QIO). 


QIO uses algorithms that are based on quantum principles for increased speed and accuracy. Azure Quantum supports QIO to help developers leverage the power of new quantum techniques today without waiting for quantum hardware.

Optimization algorithms are available to run on a variety of classical computing silicon solutions, such as CPU, FPGA, GPU or custom silicon. For more information about optimization problems, see [Introduction to optimization](xref:microsoft.quantum.optimization.concepts.overview.introduction).

## Quantum workspace

You use the Azure Quantum service by adding an Azure Quantum workspace resource to your Azure subscription in the Azure portal. A Quantum workspace resource, or workspace for short, is a collection of assets associated with running quantum or optimization applications. One of the properties configured in a workspace is an Azure Storage Account resource, where Azure Quantum stores your quantum programs and optimization problems for access.

## Providers and targets


Another property configured in the workspace is the **provider** that you want to use to run programs in that workspace. A single provider may expose one or more **targets**, which can be quantum hardware or simulators, and are ultimately responsible for running your program. For more information, see [Optimization targets](xref:microsoft.quantum.reference.qio-target-list) and [Quantum computing targets](xref:microsoft.quantum.reference.qc-target-list).


By default, Azure Quantum adds the Microsoft QIO provider to every workspace, and you can add other providers when you create the workspace or any time afterward. For more information, see the [Microsoft QIO provider](xref:microsoft.quantum.optimization.providers.microsoft.qio).

The Microsoft Quantum Development Kit also provides quantum simulators to run your Q# programs offline. For more information, see [Quantum simulators](xref:microsoft.quantum.machines.overview).

### Provider billing

Each additional provider you add to a workspace in Azure Quantum requires a billing plan, which defines how that provider bills for usage. Each provider may have different billing plans and methods available. For more information, see the documentation on the provider you would like to add. Also, when you add a provider to a new workspace you can find more information about current pricing options in the provider description .

You can only select one billing plan for each provider in a single workspace; however, you can add multiple workspaces to your Azure subscription.

