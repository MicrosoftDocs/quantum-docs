---
author: KittyYeungQ
description: This document provides the information about how to install the necessary tools on your computer to submit Q# programs to Azure Quantum from the command line.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: Prepare your environment to use Azure Quantum
uid: microsoft.quantum.setup.cli
---

# Prepare your environment to use Azure Quantum from the command prompt

Azure Quantum uses the Azure CLI `quantum` extension to enable submitting Q# programs from the command line. This guide provides the steps to install and configure the Azure CLI extension on your system for use with Azure Quantum.

## Prerequisites

Before installing the Azure CLI `quantum` extension, ensure that the following packages are installed:

- The Microsoft [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview.standalone)
- The latest version of [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&preserve-view=true)
  (version 2.5.0 or higher)

## Installation

To install the Azure CLI `quantum` extension, open a command prompt, and then run the following command:

```bash
az extension add -n quantum
```

## Uninstall the extension

To uninstall the Azure CLI `quantum` extension, run the following command:

```bash
az extension remove -n quantum
```

## Update the extension

If you need to update an existing installation of the the Azure CLI `quantum` extension, you can run:

```bash
az extension update -n quantum
```

> [!NOTE]
> If you have previously installed a pre-release version of this extension, or you are not sure about your current installation you can uninstall it and then install it again using the instructions above.

## Next steps

Now that you have installed the tools to use Azure Quantum you can learn to submit jobs.

### For optimization users

Learn how to [submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs.python) to solve optimization problems.

### For quantum computing users

Learn how to [create Q# applications and run them on Azure Quantum](xref:microsoft.quantum.create-applications).