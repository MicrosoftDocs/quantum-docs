---
author: bradben
description: Learn how to set up Azure Quantum for different workflows.
ms.author: v-benbra
ms.date: 07/21/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Set up Azure Quantum
uid: microsoft.quantum.install-qdk.overview
---

# Set up Azure Quantum

Learn how to set up Azure Quantum to develop quantum computing and optimization applications in your environment.

## Select your platform

You can use the Quantum Development Kit (QDK) to develop quantum computing and optimization applications using the Azure Quantum service, or to develop quantum computing applications locally using a variety of environments.

The QDK consists of:

- The Q# programming language
- A set of libraries that abstract complex functionality in Q#
- APIs for Python and .NET languages (C#, F#, and VB.NET) for running quantum programs written in Q#
- A Python SDK to use optimization solvers on Azure Quantum
- Tools to facilitate your development

### [Use the Azure Quantum service](#tab/tabid-aq)

## Set up the Azure Quantum service

With the Azure Quantum service, you can use the Azure Quantum python SDK to solve optimization problems using solvers from Microsoft and other providers, or use Q# to develop quantum computing applications and run them on quantum hardware from our partner providers. 

To set up optimization, follow the steps in the [Optimization quickstart](xref:microsoft.quantum.quickstarts.optimization.qio).

To set up quantum computing, follow the steps in the [Quantum computing quickstart](xref:microsoft.quantum.quickstarts.computing).

### [Use the QDK locally](#tab/tabid-local)

## Install the QDK and develop quantum applications locally

Q# programs can run as standalone applications using Visual Studio Code or Visual Studio, through Jupyter Notebooks with the IQ# Jupyter kernel, or paired with a host program written in Python or a .NET language (C#, F#). You can also run Q# programs online using [MyBinder.org](https://mybinder.org/), or [Docker](#use-the-qdk-for-quantum-computing-with-docker).

You can use the QDK for quantum computing in three ways:

- [Install the QDK for quantum computing locally](#install-options-for-the-qdk)
- [Use the QDK for quantum computing with Binder](#use-the-qdk-for-quantum-computing-with-binder)
- [Use a QDK for quantum computing Docker image](#use-the-qdk-for-quantum-computing-with-docker)

### Install options for the QDK

You can develop Q# code in most of your favorites IDEs, as well as integrate Q# with other languages such as Python and .NET (C#, F#).

<table>
    <tr>
        <th width=10%>&nbsp;</th>
        <th>&nbsp;</th>
        <th align="center" width=18%><img src="~/media/vs_code.png" alt="VS Code" width="50"/><br><b>VS Code<br>(2019 or later)</b></th>
        <th align="center" width=18%><img src="~/media/visualstudio-1.png" alt="Visual Studio" width="50"/><br><b>Visual Studio<br>(2019 or later)</b></th>
        <th align="center" width=18%><img src="~/media/Jupyter_logo.svg.png" alt="jupyter install" width="65"/><br><b>Jupyter Notebooks</b></th>
        <th align="center" width=18%><img src="~/media/blank.png" alt="blank spacer" width="65"/><br><b>Command line</b></th>
    </tr>
    <tr>
        <th>&nbsp;</th>
        <td align="left"><b>OS support:</b></td>
        <td align="center">Windows, macOS, Linux</td>
        <td align="center">Windows only</td>
        <td align="center">Windows, macOS, Linux</td>
        <td align="center">Windows, macOS, Linux</td>
    </tr>
    <tr>
        <td align="right"><img src="~/media/azure-quantum-logo-trans.png" alt="QDK" width="60"/></td>
        <td align="left"><b>Q# standalone</b></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.standalone">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.standalone">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.jupyter">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.standalone">Install</a></td>
    </tr>
    <tr>
        <td align="right"><img src="~/media/python.png" alt="python install" width="50"/></td>
        <td align="left"><b>Q# and Python</b></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.python">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.python">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.python">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.python">Install</a></td>
    </tr>
    <tr>
        <td align="right"><img src="~/media/dotnet-logo.png" alt="dotnet install" width="50"/></td>
        <td align="left"><b>Q# and .NET (C#, F#)</b></td> 
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.cs">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.cs">Install</a></td>
        <td align="center">&#10006;</td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.cs">Install</a></td>
   </tr>
</table>

### Use the QDK for quantum computing with Binder

You can also develop Q# code without installing anything locally with these options:

|Resource|Advantages|Limitations|
|---|---|---|
|[**Binder**](xref:microsoft.quantum.install-qdk.overview.binder) | Free online notebook experience |No persistence |

### Use the QDK for quantum computing with Docker

You can use our QDK Docker image in your local Docker installation or in the cloud via any service that supports Docker images, such as ACI.

You can download the IQ# Docker image from <https://github.com/microsoft/iqsharp/#using-iq-as-a-container>. 

You can also use Docker with a Visual Studio Code Remote Development Container to quickly define development environments. For more information about VS Code Development Containers, see <https://github.com/microsoft/Quantum/tree/master/.devcontainer>.

The workflows for each of these setups are described and compared in [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

