---
author: azure-quantum-content
description: This article describes how to install the QDK/Chemistry Python library for different operating systems
ms.date: 01/23/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API, Windows]
title: How to install QDK for chemistry
uid: microsoft.quantum.how-to.install-qdk-chemistry
#customer intent: As a quantum chemistry researcher and developer, I want to know how to install the QDK/Chemistry Python library on my device
---
# How to install QDK for chemistry

In this article, you learn how to install QDK for chemistry (QDK/Chemistry), a Python library for quantum chemistry calculations in the Microsoft Quantum Development Kit (QDK).

## Prerequisites

- Install the latest version of [Visual Studio (VS) Code](https://code.visualstudio.com/download).
- Install a Python interpreter (version 3.11, 3.12 or 3.13).

> [!IMPORTANT]
> Windows support for QDK/Chemistry is provided through the Windows Subsystem for Linux (WSL). To use QDK/Chemistry on Windows machines, you must [install WSL](https://learn.microsoft.com/windows/wsl/install).

## Install the `qdk-chemistry` library

QDK/Chemistry is distributed as the `qdk-chemistry` Python library through PyPI. To install the package, run the following command in a terminal:

```bash
python -m pip install qdk-chemistry
```

To optimize your build, see [Installation Instructions for QDK/Chemistry](https://github.com/microsoft/qdk-chemistry/blob/main/INSTALL.md) on GitHub for detailed manual installation instructions.

## Related content

To learn more about quantum chemistry simulations and how to use QDK/Chemistry, see the following articles:

- [Tutorial: Simulate quantum chemistry calculations for *p*-benzyne with the QDK in VS Code](xref:microsoft.quantum.tutorial.qdk-chem-benzene-sim)
- [Build state preparation circuits for quantum chemistry calculations with sparse isometry](microsoft.quantum.overview.qdk-chem-sparse-isometry)
- [Perform SCF calculations and active space selection to construct molecular orbitals](xref:microsoft.quantum.overview.qdk-chem-scf-active-space)
