---
author: bradben
description: This article shows you how to install the Quantum Developer Kit (QDK) and develop your own Q# notebooks.
ms.author: v-benbra
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Develop with Q# Jupyter notebooks
uid: microsoft.quantum.install-qdk.overview.jupyter
---

# Develop with Q# Jupyter Notebooks

This article shows you how to install the Quantum Developer Kit (QDK) for developing Q# operations on Q# Jupyter Notebooks. Then, learn how to start developing your own Q# notebooks.

Jupyter Notebooks allow running code in-place alongside instructions, notes, and other content. This environment is ideal for writing Q# code with embedded explanations or quantum computing interactive tutorials.

## Install the IQ# Jupyter kernel

IQ# (pronounced i-q-sharp) is an extension primarily used by Jupyter and Python to the .NET Core SDK that provides the core functionality for compiling and simulating Q# operations.

### [Install using conda (recommended)](#tab/tabid-conda)

1. Install [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads). Consult their [installation guide](https://docs.conda.io/projects/conda/en/latest/user-guide/install/) if you are unsure about any steps. **Note:** 64-bit installation required.

1. Initialize conda for your preferred shell with the `conda init` command. The steps below are tailored to your operating system:

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

### [Install using .NET CLI (advanced)](#tab/tabid-dotnetcli)

1. Prerequisites:

    - [Python](https://www.python.org/downloads/) 3.6 or later
    - [Jupyter Notebook](https://jupyter.readthedocs.io/en/latest/install.html)
    - [.NET Core SDK 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)

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

***

That's it! You now have the IQ# kernel for Jupyter, allowing you to compile and run Q# operations from Q# Jupyter Notebooks.

## Create your first Q# notebook

Now you are ready to verify your Q# Jupyter Notebook installation by writing and running a simple Q# operation.

1. From the environment you created during installation (that is, either the conda environment you created, or the Python environment where you installed Jupyter), run the following command to start the Jupyter Notebook server:

    ```shell
    jupyter notebook
    ```

    - If the Jupyter Notebook doesn't open automatically in your browser, copy and paste the URL provided by the command line into your browser.

1. Choose **New → Q#** to create a Jupyter Notebook with a Q# kernel, and add the following code to the first notebook cell:

    ```qsharp
    open Microsoft.Quantum.Intrinsic;

    operation SampleQuantumRandomNumberGenerator() : Result {
        use q = Qubit(); // Allocate a qubit.
        H(q);            // Put the qubit to superposition. It now has a 50% chance of being 0 or 1.
        let r = M(q);    // Measure the qubit value.
        Reset(q);
        return r;
    }
    ```

1. Run this cell of the notebook:

    ![Jupyter Notebook cell with Q# code](~/media/install-guide-jupyter.png)

    You should see `SampleQuantumRandomNumberGenerator` in the output of the cell. When running in Jupyter Notebook, the Q# code is compiled, and the cell outputs the name of any operations that it finds.

1. In a new cell, run the operation you just created (in a simulator) by using the `%simulate` command:

    ![Jupyter Notebook cell with %simulate magic](~/media/install-guide-jupyter-simulate.png)

    You should see the result of the operation you invoked. In this case, because your operation generates a random result, you will see either `Zero` or `One` printed on the screen. If you run the cell repeatedly, you should see each result approximately half the time.

> [!NOTE]
> In a Jupyter Notebook, Q# code is automatically wrapped in a namespace for you. Since Q# does not feature nested namespaces, you should make sure not to declare any additional namespaces inside of code cells.

## Next steps

Now that you have installed the QDK for Q# Jupyter Notebooks, you can write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number) by writing Q# code directly within the Jupyter Notebook environment.

For more examples of what you can do with Q# Jupyter Notebooks, please take a look at:

- [Intro to Q# and Jupyter Notebook](/samples/microsoft/quantum/intro-to-qsharp-jupyter/). There you will find a Q# Jupyter Notebook that provides more details on how to use Q# in the Jupyter environment.
- [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas), an open-source collection of self-paced tutorials and sets of programming exercises in the form of Q# Jupyter Notebooks. The [Quantum Katas tutorial notebooks](https://github.com/microsoft/QuantumKatas#tutorial-topics) are a good starting point. The Quantum Katas are aimed at teaching you elements of quantum computing and Q# programming at the same time. They're an excellent example of what kind of content you can create with Q# Jupyter Notebooks.
