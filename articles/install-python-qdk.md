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

# Develop with Q# and Python

Learn how to install the Quantum Development Kit (QDK) to develop Python host programs that call Q# operations.

## Install the `qsharp` Python package

The `qsharp` Python package, which includes the IQ# kernel, contains the necessary functionality for compiling and simulating Q# operations from a regular Python program.

### [Install using conda (recommended)](#tab/tabid-conda)

1. Install [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads). Consult their [installation guide](https://docs.conda.io/projects/conda/en/latest/user-guide/install/) if you are unsure about any steps. **Note:** 64-bit installation required.

1. Initialize conda for your preferred shell with the `conda init` initialization command. The steps below are tailored to your operating system:

    **(Windows)** Open an Anaconda Prompt by searching for it in the start menu. Then run the initialization command for your shell, e.g. `conda init powershell cmd.exe` will set up both the Windows PowerShell and Command Prompt for you. You can then close this prompt.

    > [!IMPORTANT]
    > To work with PowerShell, conda will configure a startup script to run whenever you launch a PowerShell instance. By default, the script's execution will be blocked on Windows, and requires modifying the PowerShell execution policy with the following command (executed from within PowerShell):
    >
    > ```powershell
    > Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
    > ```

    **(Linux)** If haven't done so during installation, you can still initialize conda now. Open a terminal and navigate to the `bin` directory inside your selected install location (e.g. `/home/ubuntu/miniconda3/bin`). Then run the appropriate command for your shell, e.g. `./conda init bash`. Close your terminal for the changes to take effect.

1. From a new terminal, create and activate a new conda environment named `qsharp-env` with the required packages (including Jupyter Notebook and IQ#) by running the following commands:

    ```shell
    conda create -n qsharp-env -c quantum-engineering qsharp notebook

    conda activate qsharp-env
    ```

1. Finally, run `python -c "import qsharp"` to verify your installation and populate your local package cache with all required QDK components.

### [Install using .NET CLI and pip (advanced)](#tab/tabid-dotnetcli)

1. Prerequisites:

    - [Python](https://www.python.org/downloads/) 3.6 or later
    - The [PIP](https://pip.pypa.io/en/stable/installing) Python package manager
    - [.NET Core SDK 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)

1. Install the `qsharp` package, a Python package that enables interop between Q# and Python.

    ```shell
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

That's it! You now have both the `qsharp` Python package and the IQ# kernel for Jupyter, allowing you to compile and run Q# operations from Python and Q# Jupyter Notebooks.

## Choose your IDE

While you can use Q# with Python in any IDE, we highly recommend using Visual Studio Code (VS Code) for your Q# + Python applications. With the QDK extension for VS Code you gain access to richer functionality such as warnings, syntax highlighting, project templates, and more.

If you would like to use VS Code:

- Install [VS Code](https://code.visualstudio.com/download) (Windows, Linux and Mac).
- Install the [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).

VS Code also offers its own terminal from which you can run code. If you are using conda, make sure you follow the procedure detailed in the installation section to initialize conda for the shell used by VS Code. On Windows, VS Code will use PowerShell unless configured differently. Doing so will allow you to run *Q# with Python* programs directly from VS Code's integrated terminal, however you can use any terminal of your choice with access to Python. Remember to activate your Q# environment there before running any programs, using `conda activate qsharp-env`.

If you would like to use a different editor, the instructions so far have you all set.

## Write your first Q# program

Now you are ready to verify your `qsharp` Python package installation by writing a simple Q# program and running it on a quantum [simulator](/azure/quantum/user-guide/machines/).

1. Create a minimal Q# operation by creating a file called `Operation.qs` and adding the following code to it:

    :::code language="qsharp" source="~/quantum/samples/interoperability/qrng/Qrng.qs" range="3-14":::

1. In the same folder as `Operation.qs`, create the following Python program called `host.py`. This program [imports the Q# operation](/azure/quantum/user-guide/host-programs?tabs=tabid-python#q-with-host-programs) `SampleQuantumRandomNumberGenerator()` defined in step 1 and runs it on the [default simulator](/azure/quantum/user-guide/machines/full-state-simulator) with a `.simulate()` call:

    ```python
    import qsharp
    from Qrng import SampleQuantumRandomNumberGenerator

    print(SampleQuantumRandomNumberGenerator.simulate())
    ```

1. From a terminal with access to your Python/Q# environment created during installation, navigate to your project folder and run the Python host program:

    ```shell
    python host.py
    ```

1. You should see the result of the operation you invoked. In this case, because your operation generates a random result, you will see either `0` or `1` printed on the screen. If you run the program repeatedly, you should see each result approximately half the time.

> [!NOTE]
> The Python code is just a normal Python program. You can use any Python environment, including Python-based Jupyter Notebooks, to write the Python program and call Q# operations. The Python program can import Q# operations from any .qs files located in the same folder as the Python code itself.

## Next steps

Now that you have tested the Quantum Development Kit in your preferred environment, you can follow this tutorial to write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).

For more information on how to run Q# programs with Python, see the following articles:

- how [Q# interacts with a Python host program](/azure/quantum/user-guide/host-programs?tabs=tabid-python#q-with-host-programs)

- how to [run Q# on a local simulator](/azure/quantum/user-guide/machines/full-state-simulator)

- how to [run Q# on quantum hardware](/azure/quantum/how-to-submit-jobs-with-python) through Azure Quantum

- how to first [estimate quantum resources](/azure/quantum/user-guide/machines/resources-estimator) required by your program
