---
author: bradben
description: Learn how to set up the Quantum Development Kit for different environments.
ms.author: v-benbra
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Set up the Quantum Development Kit (QDK)
uid: microsoft.quantum.install-qdk.overview
---

# Set up the Quantum Development Kit (QDK)

Learn how to set up the Quantum Development Kit (QDK) to develop quantum computing and optimization applications on your environment.

The QDK consists of:

- The Q# programming language
- A set of libraries that abstract complex functionality in Q#
- APIs for Python and .NET languages (C#, F#, and VB.NET) for running quantum programs written in Q#
- A Python SDK to use optimization solvers on Azure Quantum
- Tools to facilitate your development

## Set up the Quantum Development Kit to develop quantum computing applications in Q#

Q# programs can run as standalone applications using Visual Studio Code or Visual Studio, through Jupyter Notebooks with the IQ# Jupyter kernel, or paired with a host program written in Python or a .NET language (C#, F#). You can also run Q# programs online using [MyBinder.org](https://mybinder.org/), or [Docker](#use-the-qdk-for-quantum-computing-with-docker).

### Options for setting up the QDK for quantum computing

You can use the QDK in three ways:

- [Install the QDK for quantum computing locally](#install-the-qdk-for-quantum-computing-locally)
- [Use the QDK for quantum computing online](#use-the-qdk-for-quantum-computing-online)
- [Use a QDK for quantum computing Docker image](#use-the-qdk-for-quantum-computing-with-docker)

### Install the QDK for quantum computing locally

You can develop Q# code in most of your favorites IDEs, as well as integrate Q# with other languages such as Python and .NET (C#, F#).

<table>
    <tr>
        <th width=10%>&nbsp;</th>
        <th>&nbsp;</th>
        <th align="center" width=18%><img src="~/media/vs_code.png" alt="VS Code" width="50"/><br><b>VS Code<br>(2019 or later)</b></th>
        <th align="center" width=18%><img src="~/media/vs_studio.png" alt="Visual Studio" width="50"/><br><b>Visual Studio<br>(2019 or later)</b></th>
        <th align="center" width=18%><img src="~/media/jupyter-wht.png" alt="jupyter install" width="65"/><br><b>Jupyter Notebooks</b></th>
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
        <td align="right"><img src="~/media/quantum-wht.png" alt="QDK" width="60"/></td>
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
        <td align="right"><img src="~/media/dot_net.png" alt="dotnet install" width="50"/></td>
        <td align="left"><b>Q# and .NET (C#, F#)</b></td> 
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.cs">Install</a></td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.cs">Install</a></td>
        <td align="center">&#10006;</td>
        <td align="center"><a href="xref:microsoft.quantum.install-qdk.overview.cs">Install</a></td>
   </tr>
</table>

### Use the QDK for quantum computing Online

You can also develop Q# code without installing anything locally with these options:

|Resource|Advantages|Limitations|
|---|---|---|
|[**Binder**](xref:microsoft.quantum.install-qdk.overview.binder) | Free online notebook experience |No persistence |

### Use the QDK for quantum computing with Docker

You can use our QDK Docker image in your local Docker installation or in the cloud via any service that supports Docker images, such as ACI.

You can download the IQ# Docker image from <https://github.com/microsoft/iqsharp/#using-iq-as-a-container>. 

You can also use Docker with a Visual Studio Code Remote Development Container to quickly define development environments. For more information about VS Code Development Containers, see <https://github.com/microsoft/Quantum/tree/master/.devcontainer>.

The workflows for each of these setups are described and compared in [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs).

## Set up the Quantum Development Kit to manage optimization solvers in Azure Quantum

You can use the Python SDK of the Quantum Development Kit to solve optimization problems using Azure Quantum solvers. 

To set up the Python SDK, follow the steps in [Install and use the Python SDK for Azure Quantum](xref:microsoft.quantum.optimization.install-sdk).
