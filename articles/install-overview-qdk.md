---
author: bradben
description: Learn how to set up Azure Quantum for different languages and platforms.
ms.author: v-benbra
ms.date: 10/25/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Set up Azure Quantum
uid: microsoft.quantum.install-qdk.overview
---

# Set up a local development environment for Azure Quantum

Learn how to set up and install the tools necessary to develop quantum computing and optimization applications for [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) in your preferred local environment.

## Azure Quantum service and the Quantum Development Kit (QDK)

With the ability to run [Jupyter notebooks on Azure Quantum](xref:microsoft.quantum.how-to.notebooks), you can develop and run quantum programs in the Azure Quantum portal without installing any additional tools.

However, with the [Quantum Development Kit (QDK)](xref:microsoft.quantum.overview.q-sharp), you can customize your environment to develop and run quantum computing applications locally, or develop quantum computing and optimization applications to run on quantum simulators or hardware using the Azure Quantum service.

The QDK provides:

- The Q# programming language and libraries
- The IQ# kernel for running Q# on Jupyter Notebooks
- APIs for Python and .NET languages (C#, F#, and VB.NET)
- Extensions for Visual Studio Code and Visual Studio
- Ability to submit Qiskit, Cirq, and provider-specific formatted applications to the Azure Quantum service

## Sign up for the Azure subscription

To access remote quantum hardware and utilize all the features in the Azure Quantum service, you will need an Azure subscription. If you don't have an Azure subscription already, create a [free account](https://azure.microsoft.com/free/).

Once you have a subscription, use the following section to configure your preferred development environment. 

## Language and platform options

You can develop Q# code in most of your favorite IDEs, as well as integrate Q# with other languages such as Python and .NET (C#, F#).

| Preferred language | Use case |
| ----| ---- |
| [Python](xref:microsoft.quantum.install-qdk.overview.python) | With the `qsharp` Python package and the IQ# kernel, you can call Q# operations and develop with Jupyter Notebooks, Visual Studio, Visual Studio Code, or any standard Python environment. |
| [Q# standalone or Q# + .NET languages](xref:microsoft.quantum.install-qdk.overview.standalone) | You can develop and run Q# programs with Juptyer Notebooks, Visual Studio, Visual Studio Code, or the command line, or use C# or F# to develop a host program that calls Q# operations. |

## Cloud options

You can also run Q# programs online, with no installation involved, using the Azure Quantum portal, Binder, or Docker.

### Use Jupyter notebooks in the Azure Quantum portal

You can create, upload, store, and run Jupyter notebooks directly in the Azure Quantum portal. A gallery of sample Jupyter notebooks is provided to get you started. For more information, see [Run Jupyter notebooks on Azure Quantum](xref:microsoft.quantum.how-to.notebooks). 

### Use the QDK for quantum computing with Binder

Binder offers a free online Notebook experience to run and share Jupyter Notebooks and Q# console applications online, allowing you to try Q# without installing the QDK. For more information, see [Using Binder online](xref:microsoft.quantum.install-qdk.overview.binder).

### Use the QDK for quantum computing with Docker

You can use our QDK Docker image in your local Docker installation or in the cloud via any service that supports Docker images, such as ACI.

You can download the IQ# Docker image from <https://github.com/microsoft/iqsharp/#using-iq-as-a-container>. 

You can also use Docker with a Visual Studio Code Remote Development Container to quickly define development environments. For more information about VS Code Development Containers, see <https://github.com/microsoft/Quantum/tree/master/.devcontainer>.

## Next steps

- [Run Jupyter notebooks on Azure Quantum](xref:microsoft.quantum.how-to.notebooks)
- [Create and submit a quantum program](xref:microsoft.quantum.quickstarts.computing) to quantum hardware.
- [Create and submit an optimization problem](xref:microsoft.quantum.quickstarts.optimization.qio) to Azure Quantum. 
