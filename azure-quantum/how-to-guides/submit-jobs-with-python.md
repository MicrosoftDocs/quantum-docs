---
title: Submit jobs to Azure Quantum with Python
description: This document provides a basic guide to submit and run Q# applications in Azure Quantum using Q# Jupyter Notebooks.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.azure.quantum.submit-jobs.python
---

# Submit jobs to Azure Quantum with Python

This document provides a basic guide to submit and run Q# applications in Azure
Quantum using Q# Jupyter Notebooks.

## Prerequisites 

- You need to have an Azure Quantum workspace in your subscription. To create
  one, follow the guide [Create an Azure Quantum
  workspace](xref:microsoft.azure.quantum.workspaces-portal).

## Installation

Follow these steps to install Jupyter Notebook and the current version of the
IQ# kernel, which powers the Q# Jupyter Notebook and Python experiences.

1. Install [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or
   [Anaconda](https://www.anaconda.com/products/individual#Downloads).
1. Open an Anaconda Prompt.
   - Or, if you prefer to use PowerShell or pwsh: open a shell, run `conda init
     powershell`, then close and re-open the shell.
1. Create and activate a new conda environment named `qsharp-env` with the
   required packages (including Jupyter Notebook and IQ#) by running the
   following commands:
    ```
    conda create -n qsharp-env -c quantum-engineering qsharp notebook

    conda activate qsharp-env
    ```
1. Run `python -c "import qsharp"` from the same terminal to verify your
   installation and populate your local package cache with all required QDK
   components.

Now you're set up to use Python and Q# integration to execute
quantum programs on Azure Quantum.

**NOTE:** You'll want to have the resource ID of your Azure Quantum workspace
handy, as you'll need it for the steps below. You can copy/paste this from the
top-right corner of your Quantum Workspace page in Azure Portal.

## Quantum Execution with Q# and Python

1. The Python environment in the conda environment you created above already
   includes the `qsharp` Python package. Make sure you are running your Python
   script from a terminal where this conda environment is activated.

1. If you've never used Q# with Python, read this first: [Create your first Q#
   program with
   Python](https://docs.microsoft.com/quantum/quickstarts/install-python?tabs=tabid-conda#write-your-first-q-program).

1. Write your Q# operations in a `*.qs` file. When running `import qsharp` in
   Python, the IQ# kernel will automatically detect any .qs files in the same
   folder, compile them, and report any errors. If compilation is successful,
   those Q# operations will become available for use directly from within
   Python.
    - For example, the contents of your .qs file could look something like this:

        ```
        namespace Test {
            open Microsoft.Quantum.Intrinsic;

            operation GenerateRandomBit() : Result {
                using (q = Qubit())  {
                    H(q);
                    let r = M(q);
                    Reset(q);
                    return r;
                }
            }
        }
        ```

1. Create a Python script in the same folder as your `*.qs` file. Azure Quantum
   functionality is available by running `import qsharp.azure` and then calling
   the Python commands to interact with Azure Quantum. Here you can find the
   [complete list of Python
   commands](https://docs.microsoft.com/en-us/python/qsharp/qsharp.azure).
   You'll use the resource ID of your Azure Quantum workspace in order to
   connect. For example, your Python script could look like this:

    ```
    import qsharp
    import qsharp.azure
    from Test import GenerateRandomBit

    qsharp.azure.connect(resourceId="/subscriptions/.../Microsoft.Quantum/Workspaces/WORKSPACE_NAME")
    qsharp.azure.target("ionq.simulator")
    result = qsharp.azure.execute(GenerateRandomBit)
    print(result)
    ```

    where `GenerateRandomBit` is the Q# operation in a namespace `Test` that is
    defined in your `*.qs` file.

1. Execute your Python script by running `python test.py`, where `test.py` is
   the name of your Python file. If successful, you should see your job results
   printed to the terminal.

## Next steps

Now that you know how to submit jobs to Azure Quantum you can try to run the
[different samples we have available](../samples) or try to submit your own
projects. 
