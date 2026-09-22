---
author: azure-quantum-content
description: This article describes how to install the QDK/Chemistry Python library for different operating systems
ms.date: 09/22/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API, Windows]
title: How to install QDK for chemistry
uid: microsoft.quantum.how-to.install-qdk-chemistry
# Customer intent: As a quantum chemistry researcher and developer, I want to know how to install the QDK/Chemistry Python library on my device
---

# How to install QDK for chemistry

In this article, you learn how to install QDK for chemistry (QDK/Chemistry), a Python library for quantum chemistry calculations in the Microsoft Quantum Development Kit (QDK).

## Prerequisites

- Install the latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download).
- Install the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions in VS Code.
- Install a Python interpreter (version 3.11, 3.12, or 3.13).

## Install the `qdk-chemistry` library

QDK/Chemistry is distributed as the `qdk-chemistry` Python library through PyPI. To install the package, follow the steps for your operating system.

### [macOS / Linux](#tab/tabid-maclinux)

1. Create a local folder where you want to install QDK/Chemistry.
1. In a terminal, go to the folder that you created.
1. Run the following terminal command to create a Python virtual environment. For example, `myenv`.

    ```bash
    python3 -m venv myenv
    ```

1. Activate the virtual environment.

    ```bash
    source myenv/bin/activate
    ```

1. Install the `qdk-chemistry` library with all extras.

    ```bash
    python3 -m pip install "qdk-chemistry[all]"
    ```

### [Windows](#tab/tabid-windows)

1. Create a local folder where you want to install QDK/Chemistry.
1. In PowerShell, go to the folder that you created.
1. Run the following PowerShell command to create a Python virtual environment. For example, `myenv`.

    ```powershell
    python3 -m venv myenv
    ```

1. Activate the virtual environment.

    ```powershell
    .\myenv\Scripts\Activate.ps1
    ```

1. Install the `qdk-chemistry` library with all extras.

    ```powershell
    python -m pip install "qdk-chemistry[all]"
    ```

> [!IMPORTANT]
> The [PySCF package](https://pyscf.org/) doesn't install on native Windows. To use PySCF with QDK/Chemistry on Windows, use VS Code in Windows Subsystem for Linux (WSL). To install WSL, see [How to install Linux on Windows with WSL](/windows/wsl/install). To use WSL in VS Code, [install the WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl).

***

The `all` extra installs all optional dependencies. For other installation methods and platform-specific notes, see [Installation Instructions for QDK/Chemistry](https://github.com/microsoft/qdk-chemistry/blob/main/INSTALL.md) in the QDK/Chemistry repository on GitHub.

> [!NOTE]
> To use QDK/Chemistry with Jupyter Notebook in VS Code, make sure that your notebook uses the Python interpreter in the virtual environment where you installed `qdk-chemistry`.

## Related content

To learn more about quantum chemistry simulations and how to use QDK/Chemistry, see the following articles:

- [Build state preparation circuits for quantum chemistry calculations with sparse isometry](xref:microsoft.quantum.overview.qdk-chem-sparse-isometry)
- [Perform SCF calculations and active space selection to construct molecular orbitals](xref:microsoft.quantum.overview.qdk-chem-scf-active-space)
