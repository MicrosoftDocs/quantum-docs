---
title: Prepare your environment to use Azure Quantum
description: This document provides the information about how to install the necessary tools on your computer to submit Q# programs to Azure Quantum from the command line.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.azure.quantum.setup.cli
---

# Prepare your environment to use Azure Quantum from the command prompt

Azure Quantum uses the Azure CLI `quantum` extension to enable submitting Q# programs from the command line. This guide provides the steps to install and configure the Azure CLI extension on your system for use with Azure Quantum.

## Prerequisites

Before installing the Azure CLI `quantum` extension, ensure that the following packages are installed:

- The Microsoft [Quantum Development
  Kit](https://docs.microsoft.com/quantum/install-guide/standalone)
- The latest version of [Azure
  CLI](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest)
  (version 2.5.0 or higher)

## Installation

To install the Azure CLI `quantum` extension, open a command prompt, and then run the following command:

```bash
    az extension add --source https://msquantumpublic.blob.core.windows.net/az-quantum-cli/quantum-latest-py3-none-any.whl
```

## Update the extension

If you need to update the Azure CLI `quantum` extension:

1. Remove the existing version:

    ```bash
    az extension remove -n quantum
    ```

1. Run the previous [installation](#installation) command.

## Enable access to the pre-release feed (private review only)

The Q# samples in this repository require access to the packages
in the [public Microsoft Quantum pre-release feed](https://dev.azure.com/ms-quantum-public/Microsoft%20Quantum%20(public)/_packaging?_a=feed&feed=alpha).

To enable access:
1. Copy the [NuGet.config](~/samples/qsharp/NuGet.Config) file from the **qsharp** sample folder to your Q# project folder, or one of its parents. 

## Next steps

Now that you have installed the tools to use Azure Quantum you can learn to submit jobs. Depending on your private preview status, you only will have access to certain targets of the Azure Quantum platform.

### For Optimization users

Learn how to [submit jobs to Azure Quantum](Use-the-Python-SDK-for-Quantum-Inspired-Optimization) to solve optimization problems.

### For Quantum Execution users

Learn how to [submit jobs to Azure Quantum](Submit-jobs-to-Azure-Quantum-with-the-Comand-Line-Interface) to quantum hardware and quantum simulators.
