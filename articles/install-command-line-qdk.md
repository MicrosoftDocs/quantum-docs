---
author: bradben
description: Learn how to set up a Q# standalone environment to develop quantum programs with the Microsoft Quantum Development Kit.
ms.author: brbenefield
ms.date: 03/30/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Set up a Q# standalone environment
uid: microsoft.quantum.install-qdk.overview.standalone
---

# Set up a Q# standalone environment

Learn how to configure a standalone Q# development environment using Jupyter Notebooks, Visual Studio Code (VS Code), Visual Studio, or any editor/IDE. Q# programs can run on their own, or can utilize a driver program in a host language like C# or F#.

## Q# and Jupyter Notebooks

Jupyter Notebooks allows running code in-place alongside instructions, notes, and other content. This environment is ideal for writing Q# code with embedded explanations or quantum computing interactive tutorials. All the necessary components can be set up with a single conda installation.

> [!NOTE]
> If you want to use Jupyter Notebooks but prefer not to install conda, you can [set up Jupyter Notebooks with the .NET CLI](#q-and-other-ides).

1. Install [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads). Consult their [installation guide](https://docs.conda.io/projects/conda/en/latest/user-guide/install/) if you are unsure about any steps. **Note:** 64-bit installation required.

1. Initialize conda for your preferred shell with the `conda init` command. The steps below are tailored to your operating system:

    **(Windows)** Open an Anaconda Prompt by searching for it in the start menu. Then run the initialization command for your shell, for example, `conda init powershell cmd.exe` will set up both the Windows PowerShell and Command Prompt for you. You can then close this prompt.

    > [!IMPORTANT]
    > To work with PowerShell, conda will configure a startup script to run whenever you launch a PowerShell instance. By default, the script's execution will be blocked on Windows, and requires modifying the PowerShell execution policy with the following command (executed from within PowerShell):
    >
    > ```powershell
    > Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
    > ```

    **(Linux)** If haven't done so during installation, you can still initialize conda now. Open a terminal and navigate to the `bin` directory inside your selected install location (for example, `/home/ubuntu/miniconda3/bin`). Then run the appropriate command for your shell, for example, `./conda init bash`. Close your terminal for the changes to take effect.

1. From a new terminal, create and activate a new conda environment named `qsharp-env` with the required packages (including Jupyter Notebook and IQ#) by running the following commands:

    ```shell
    conda create -n qsharp-env -c microsoft qsharp notebook

    conda activate qsharp-env
    ```

1. Finally, run `python -c "import qsharp"` to verify your installation and populate your local package cache with all required QDK components.

## Q# and other IDEs

While you can build Q# applications in any IDE, we recommend using Visual Studio Code (VS Code) or Visual Studio IDE for developing your Q# applications if you are running them via a .NET console. Developing in these environments leverages the rich functionality of the Quantum Development Kit (QDK) extension, which includes warnings, syntax highlighting, project templates, and more.


### Prerequisite

- [.NET SDK 6.0](https://dotnet.microsoft.com/download)

Configure the QDK for your preferred environment from one of the following options:

### VS Code

1. Download and install [VS Code](https://code.visualstudio.com/download) 1.52.0 or greater (Windows, Linux and Mac).
1. Install the [QDK for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).

### Visual Studio (Windows only)

1. Download and install [Visual Studio](https://visualstudio.microsoft.com/downloads/) 17.0 or greater, with the .NET Core cross-platform development workload enabled.
1. Download and install the [QDK](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64).

> [!NOTE]
> Although there is Visual Studio for Mac, the QDK extension is only compatible with Visual Studio for Windows.

### Jupyter Notebooks (using the .NET CLI)

If you want to run your programs in Jupyter Notebooks but don't want to install conda, you can set up the necessary components with .NET. 

1. Prerequisites:

    - [Python](https://www.python.org/downloads/) 3.6 or later
    - [Jupyter Notebook](https://jupyter.readthedocs.io/en/latest/install.html)

1. Install IQ# via the .NET `Microsoft.Quantum.IQSharp` package.

    ```dotnetcli
    dotnet tool install -g Microsoft.Quantum.IQSharp
    dotnet iqsharp install
    ```

    > [!NOTE]
    > If you encounter a permission error in Linux, install the IQ# kernel in user mode instead with `dotnet iqsharp install --user`.

    > [!NOTE]
    > If you encounter an error and you just installed .NET, you won't be able to run the `dotnet iqsharp install` command immediately. Instead, under Windows, open a new terminal window and try again. Under Linux, log out of your session and log back in to try again.
    > If this still doesn't work, try locating the installed `dotnet-iqsharp` tool (on Windows, `dotnet-iqsharp.exe`) and running:
    >
    > ```dotnetcli
    > /path/to/dotnet-iqsharp install --user --path-to-tool="/path/to/dotnet-iqsharp"
    > ```
    >
    > where `/path/to/dotnet-iqsharp` should be replaced by the absolute path to the `dotnet-iqsharp` tool in your file system. Typically this will be under `.dotnet/tools` in your user profile folder.

### .NET CLI

1. Enter the following at the command prompt

```dotnetcli
dotnet new -i Microsoft.Quantum.ProjectTemplates
```

### Azure CLI (.NET Core SDK 3.1 not required)

- Install the [Azure CLI](/cli/azure/install-azure-cli).
- Install the Azure CLI `quantum` extension. Open a command prompt and run the following command:

    ```azurecli
    az extension add -n quantum
    ```

## Next steps

Now that you have set up your standalone Q# environment, you can write and run quantum programs against [local quantum simulators](xref:microsoft.quantum.how-to.standalone-local), [cloud-hosted simulators](xref:microsoft.quantum.reference.qc-target-list), or remote [quantum hardware](xref:microsoft.quantum.quickstarts.computing).
