---
author: azure-quantum-content
description: Describes how to update your Q# programming language projects and the Quantum Development Kit (QDK) to the current version.
ms.author: quantumdocwriters
ms.date: 12/20/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.custom: devx-track-azurecli
ms.topic: install-set-up-deploy
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Update the Quantum Development Kit (QDK)
uid: microsoft.quantum.update-qdk
#customer intent: as an admin, I want to install the latest components of Azure Quantum
---

# Update the Azure Quantum Development Kit to the latest version

Learn how to update the Azure Quantum Development Kit (QDK) to the latest version.

## Prerequisites

- This article assumes that you already have the Azure QDK extension installed in Visual Studio Code (VS Code). If you're installing for the first time, then refer to the [installation guide](xref:microsoft.quantum.install-qdk.overview).

## Update the VS Code extension

By default, VS Code automatically updates extensions. After an extension is updated, you're prompted to reload VS Code. To disable auto-updates and update your extensions manually, see [Extension auto-update](https://code.visualstudio.com/docs/editor/extension-marketplace#_extension-autoupdate) in the VS Code documentation.

## Update the Azure Quantum Python packages

> [!IMPORTANT]
> If you're updating from a previous Qiskit environment, then see [Update the azure-quantum package with Qiskit support in a virtual Python environment (recommended)](#update-the-azure-quantum-package-with-qiskit-support-in-a-virtual-python-environment-recommended).

1. Update to the latest `qdk` and `azure-quantum` Python packages with the package installer for Python (pip).
  
    ```cmd
    pip install --upgrade qdk
    ```

    To add support for the analysis, transformation, code generation, and simulation of Qiskit circuits, install the optional `qiskit` and `widget` packages.

    ```cmd
    pip install --upgrade qdk[qiskit,jupyter]
    ```

    ```cmd
    pip install --upgrade azure-quantum
    ```

### Update the azure-quantum package with Qiskit support in a virtual Python environment (recommended)

The `azure-quantum` Python package includes optional support for creating and submitting Qiskit circuits to Azure Quantum. When you install the `azure-quantum` package with Qiskit support, the package installs the latest version of Qiskit, which might cause issues with an existing Qiskit environment. To ensure a stable development environment, create a virtual Python environment and install `azure-quantum` there.

To create a virtual Python environment and install azure-quantum with Qiskit support, follow these steps:

1. Create a local folder, for example `~/qiskit10-env`.
1. Run `venv` with the path to the folder.

    ```bash
    python -m venv ~/qiskit10-env
    ```

1. Activate the environment.

    ```bash
    ~/qiskit10-env/bin/activate
    ```

1. Run `pip list` to see that only the core packages are installed in the new environment.
1. To install the `azure-quantum` package, run the following command:

    ```bash
    pip install azure-quantum[qiskit]
    ```

1. Install other packages that you used in your previous environment as needed. You can run `pip list` in each environment to compare packages and versions.

> [!NOTE]
> See [Qiskit 1.0 packaging changes](https://docs.quantum.ibm.com/api/migration-guides/qiskit-1.0-installation#qiskit-10-packaging-changes) for more information on package compatibility.

> [!NOTE]
> You can also open your virtual environment in VS Code. From the **View** menu, choose **Command Palette**, and then enter **Python: Create Environment** and choose **venv**. Then, choose **Open Folder...** and select the environment folder that you created earlier. For more information on using environments in VS Code, see [Python environments in VS Code](https://code.visualstudio.com/docs/python/environments).

### Update the `azure-quantum` package with Qiskit support in the current environment

You can also update the `azure-quantum` package with Qiskit support without using a virtual environment. However, updates to the `qiskit` packages in an existing environment might cause dependency conflicts with other packages. See [Qiskit 1.0 packaging changes](https://docs.quantum.ibm.com/api/migration-guides/qiskit-1.0-installation#qiskit-10-packaging-changes) for more information on package compatibility.

To update the `azure-quantum` package, complete the following steps:

1. Uninstall the existing `azure-quantum` and `qiskit` packages:

    ```cmd
    pip uninstall -y azure-quantum qiskit qiskit-terra qiskit-qir
    ```

1. Reinstall `azure-quantum` with the optional `qiskit` extra:

    ```cmd
    pip install azure-quantum[qiskit]
    ```

## Update the Azure CLI `quantum` extension

Update or install the latest Azure CLI `quantum` extension.

1. Open a Windows command prompt.
1. From the command prompt, run the following command:

    ```azurecli
    az extension add \
        --upgrade \
        --name quantum
    ```
