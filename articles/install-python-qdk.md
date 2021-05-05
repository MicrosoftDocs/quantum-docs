---
author: bradben
description: Learn how to install the Quantum Development Kit (QDK) to develop Python host programs that call Q# operations.
ms.author: v-benbra
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Develop with Q# and Python
uid: microsoft.quantum.install-qdk.overview.python
---

# Use the QDK for quantum computing with Q# and Python

Learn how to install the Quantum Development Kit (QDK) to develop Python host programs that call Q# operations.

## Install the `qsharp` Python package

### [Install using conda (recommended)](#tab/tabid-conda)

1. Install [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads). **Note:** 64-bit installation required.

1. (Windows) Open an Anaconda Prompt.

   (Other) Make sure the `conda` command is available in your terminal. During installation, you may have been prompted to initialize conda for your shell. If not, navigate to your selected install location and run the `conda init` command for your shell (e.g. `conda init bash`). Close and reopen your terminal.

1. Create and activate a new conda environment named `qsharp-env` with the required packages (including Jupyter Notebook and IQ#) by running the following commands:

    ```Shell
    conda create -n qsharp-env -c quantum-engineering qsharp notebook

    conda activate qsharp-env
    ```

1. Run `python -c "import qsharp"` from the same terminal to verify your installation and populate your local package cache with all required QDK components.

> [!NOTE]
> If you would like to use PowerShell to run Q# programs, or will be using VS Code on Windows for development, it is strongly recommended that you set up your PowerShell environment to work with conda. To do so, follow the steps below:
>
> 1. Open a PowerShell window.
>
> 1. If you didn't add `conda` to your `PATH` during installation, you will first need to navigate to its install location (e.g. `C:\Users\MyUserName\Miniconda3\`).
>
> 1. (Windows only) Conda will configure a script to run automatically when opening a PowerShell window. On Windows, this requires modifying the PowerShell execution policy with the following command:
>
>     ```powershell
>     Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
>     ```
>
> 1. Now run the command:
>
>     ```powershell
>     conda init powershell
>     ```

### [Install using .NET CLI and pip (advanced)](#tab/tabid-dotnetcli)

1. Prerequisites:

    - [Python](https://www.python.org/downloads/) 3.6 or later
    - The [PIP](https://pip.pypa.io/en/stable/installing) Python package manager
    - [.NET Core SDK 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)

1. Install the `qsharp` package, a Python package that enables interop between Q# and Python.

    ```Shell
    pip install qsharp
    ```

1. Install IQ#, a kernel used by Jupyter and Python that provides the core functionality for compiling and running Q# operations.

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

***

That's it! You now have both the `qsharp` Python package and the IQ# kernel for Jupyter, which provide the core functionality for compiling and running Q# operations from Python and allows you to use Q# Jupyter Notebooks.

## Choose your IDE

While you can use Q# with Python in any IDE, we highly recommend using Visual Studio Code (VS Code) for your Q# + Python applications. With the QDK extension for VS Code you gain access to richer functionality such as warnings, syntax highlighting, project templates, and more.

If you would like to use VS Code:

- Install [VS Code](https://code.visualstudio.com/download) (Windows, Linux and Mac).
- Install the [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).

If you used the conda installation method and want to use VS Code on Windows, make sure you follow the setup instructions for using PowerShell with conda in the previous section's note box. This will allow you to run *Q# with Python* programs directly from VS Code's integrated terminal. Remember to activate your Q# environment there before running any programs, using `conda activate qsharp-env`.

If you would like to use a different editor, the instructions so far have you all set.

## Write your first Q# program

Now you are ready to verify your `qsharp` Python package installation by writing and running a simple Q# program.

1. Create a minimal Q# operation by creating a file called `Operation.qs` and adding the following code to it:

    :::code language="qsharp" source="~/quantum/samples/interoperability/qrng/Qrng.qs" range="3-14":::

1. In the same folder as `Operation.qs`, create a Python program called `host.py` to simulate the Q# `SampleQuantumRandomNumberGenerator()` operation that is defined in `Operation.qs`:

    ```python
    import qsharp
    from Qrng import SampleQuantumRandomNumberGenerator

    print(SampleQuantumRandomNumberGenerator.simulate())
    ```

1. From a terminal with access to your Python/Q# environment created during installation, navigate to your project folder and run the Python host program:

    ```Shell
    python host.py
    ```

1. You should see the result of the operation you invoked. In this case, because your operation generates a random result, you will see either `0` or `1` printed on the screen. If you run the program repeatedly, you should see each result approximately half the time.

> [!NOTE]
> The Python code is just a normal Python program. You can use any Python environment, including Python-based Jupyter Notebooks, to write the Python program and call Q# operations. The Python program can import Q# operations from any .qs files located in the same folder as the Python code itself.

## Next steps

Now that you have tested the Quantum Development Kit in your preferred environment, you can follow this tutorial to write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).
