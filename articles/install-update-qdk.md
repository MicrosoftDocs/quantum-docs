---
author: bradben
description: Describes how to update your Q# programming language projects and the Quantum Development Kit (QDK) to the current version.
ms.author: brbenefield
ms.date: 12/12/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Update the Quantum Development Kit (QDK)
uid: microsoft.quantum.update-qdk
---

# Update the Azure Quantum Development Kit (Modern QDK) to the latest version

Learn how to update the Modern QDK to the latest version.

This article assumes that you already have the Modern QDK installed. If you are installing for the first time, then please refer to the [installation guide](xref:microsoft.quantum.install-qdk.overview).

If you are working with programs that require the Microsoft Quantum Development Kit (Classic QDK), such as hybrid integrated computing, see [Continue working with the Classic QDK](xref:microsoft.quantum.install-qdk.overview#compatibility-with-the-classic-qdk).


## Update the Visual Studio Code extension

By default, Visual Studio Code updates extensions automatically. After any updates, you will be prompted to reload VS Code. If you prefer to disable auto-updates and update extensions manually, see [Extension auto-update](https://code.visualstudio.com/docs/editor/extension-marketplace#_extension-autoupdate) in the VS Code documentation.


## Update the Azure Quantum Python packages

1. Update to the latest `qsharp` or `azure-quantum` Python packages by using the package installer for Python (pip).
  
    ```Bash
    pip install --upgrade qsharp>=1.0
    ```
    
    ```Bash
    pip install --upgrade azure-quantum
    ```
