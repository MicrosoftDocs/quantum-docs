---
title: Prepare your environment to use Azure Quantum
description: This document provides the information about how to install the necessary tools on your computer to submit Q# programs to Azure Quantum from the command line.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.quantum.setup.cli
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

### For Optimization users

Learn how to [submit jobs to Azure Quantum](xref:microsoft.quantum.optimization.python-sdk) to solve optimization problems.

### For Quantum Computing users

Learn how to [create Q# applications and run them on Azure Quantum](xref:microsoft.quantum.create-applications).

