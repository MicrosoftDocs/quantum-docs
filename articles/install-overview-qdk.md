---
author: bradben
description: Learn how to set up Azure Quantum for different languages and platforms2.
ms.author: v-benbra
ms.date: 10/01/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Set up Azure Quantum2
uid: microsoft.quantum.install-qdk.overview2
---

# Set up and configure Azure Quantum (2)

Learn how to set up Azure Quantum and install the tools necessary to develop quantum computing and optimization applications in your preferred environment.

## Azure Quantum service and the Quantum Development Kit (QDK)

With the Azure Quantum service and the Quantum Development Kit (QDK), you can develop and run quantum computing applications locally, or develop quantum computing and optimization applications to run on quantum simulators or hardware using the Azure Quantum service.

The QDK provides:

- The Q# programming language and libraries
- The IQ# kernel for running Q# on Jupyter Notebooks
- APIs for Python and .NET languages (C#, F#, and VB.NET)
- Extensions for Visual Studio Code and Visual Studio
- Ability to submit Qiskit, Cirq, and provider-specific formatted applications to the Azure Quantum service


The Azure Quantum service provides:

- Access to quantum computing and optimization simulators
- Access to third-party quantum hardware and simulators
- Support for Azure CLI management

## Sign up for the Azure subscription

To access and work in the Azure Quantum service, you need an Azure subscription. If you don't have an Azure subscription already, create a [free account](https://azure.microsoft.com/free/).

Once you have a subscription, use the following section to configure your preferred development environment. 

## Language and platform options

You can develop Q# code in most of your favorite IDEs, as well as integrate Q# with other languages such as Python and .NET (C#, F#).

| Preferred language | Use case |
| ----| ---- |
| Python |[Use Python and Q# with Jupyter Notebook](xref:microsoft.quantum.install-qdk.overview.python) |
| &nbsp; |[Use Python and Q# with other IDEs](/azure/quantum/install-python-qdk) (Visual Studio, Visual Studio Code, command line) |
| &nbsp; |[Run optimization problems on Azure Quantum](/azure/quantum/install-python-qdk?tabs=tabid-aq#select-your-install-method)|
| &nbsp; |Run [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit), [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq), or [provider-specific formatted](xref:microsoft.quantum.quickstarts.computing.provider) applications on Azure Quantum|
| Q# standalone |[Use Q# with Jupyter Notebook](xref:microsoft.quantum.install-qdk.overview.standalone)|
| &nbsp; |[Use Q# with other IDEs](xref:microsoft.quantum.install-qdk.overview.standalone#q-and-other-ides) (Visual Studio, Visual Studio Code, command line)|
| .NET languages| [Use C# or F#](xref:microsoft.quantum.install-qdk.overview.cs) (Visual Studio or Visual Studio Code)|

## Cloud options

You can also run Q# programs online using Binder or Docker.

### Use the QDK for quantum computing with Binder

Binder offers a free online Notebook experience to run and share Jupyter Notebooks and Q# console applications online, allowing you to try Q# without installing the QDK. For more information, see [Using Binder online](xref:microsoft.quantum.install-qdk.overview.binder).

### Use the QDK for quantum computing with Docker

You can use our QDK Docker image in your local Docker installation or in the cloud via any service that supports Docker images, such as ACI.

You can download the IQ# Docker image from <https://github.com/microsoft/iqsharp/#using-iq-as-a-container>. 

You can also use Docker with a Visual Studio Code Remote Development Container to quickly define development environments. For more information about VS Code Development Containers, see <https://github.com/microsoft/Quantum/tree/master/.devcontainer>.