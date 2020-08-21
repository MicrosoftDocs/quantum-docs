---
title: Submit jobs to Azure Quantum with Q# Jupyter Notebooks
description: This document provides a basic guide to submit and run Q# applications in Azure Quantum using Q# Jupyter Notebooks.
author: KittyYeungQ
ms.author: kitty
ms.date: 06/29/2020
ms.topic: article
uid: microsoft.azure.quantum.submit-jobs.jupyter
---

# Submit jobs to Azure Quantum with Q# Jupyter Notebooks

This document provides a basic guide to submit and run Q# applications in Azure
Quantum using Q# Jupyter Notebooks.

## Prerequisites 

- An Azure Quantum Workspace in your Azure subscription. To create
  a Workspace, see [Create an Azure Quantum
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

    ```bash
    conda create -n qsharp-env -c quantum-engineering qsharp notebook

    conda activate qsharp-env
    ```

1. Run `python -c "import qsharp"` from the same terminal to verify your
   installation and populate your local package cache with all of the required QDK
   components.

You are now set up to use Q# Jupyter Notebooks and Q# integration to run
quantum programs on Azure Quantum.

## Quantum Execution with Q# Jupyter Notebooks

1. Run `jupyter notebook` from the terminal where your conda environment is
   activated. This starts the notebook server and opens Jupyter in a browser.
1. Create your Q# notebook (via **New** → **Q#**) and write your Q# program.
1. If you've never used Q# with Jupyter, follow the steps in [Create your first Q#
    notebook](xref:microsoft.quantum.install.jupyter).
1. Write your Q# operations directly in the notebook. Running the cells will
   compile the Q# code and report whether there are any errors.
    - For example, you could write a Q# operation that looks like this:

        ```qsharp
        operation GenerateRandomBit() : Result {
            using (q = Qubit())  {
                H(q);
                let r = M(q);
                Reset(q);
                return r;
            }
        }
        ```

1. Once you have your Q# operations defined, use the `%azure.*` magic commands
   to connect and submit jobs to Azure Quantum. You'll use the resource ID of
   your Azure Quantum Workspace in order to connect. (The resource ID can be found
   on your Quantum Workspace page in Azure Portal.)

    - For example, the following commands will connect to an Azure Quantum
      Workspace and run an operation on the `ionq.simulator` target:

        ```py
        %azure.connect "/subscriptions/.../Microsoft.Quantum/Workspaces/WORKSPACE_NAME"

        %azure.target ionq.simulator

        %azure.execute GenerateRandomBit
        ```

        where `GenerateRandomBit` is the Q# operation that you have already
        defined in the notebook.

1. After submitting a job, you can check its status with the command `%azure.status` or view
   its results with the command `%azure.output`. You can view a list of all your jobs with the command `%azure.jobs`.

Some helpful tips while using Q# Jupyter Notebooks:

- Use the command `%lsmagic` to see all of the available magic commands, including
  the ones for Azure Quantum.
- Detailed usage information for any magic command can be displayed by simply
  appending a `?` to the command, e.g. `%azure.connect?`.

- Documentation for magic commands is also available online:
  [%azure.connect](https://docs.microsoft.com/qsharp/api/iqsharp-magic/azure.connect),
  [%azure.target](https://docs.microsoft.com/qsharp/api/iqsharp-magic/azure.target),
  [%azure.submit](https://docs.microsoft.com/qsharp/api/iqsharp-magic/azure.submit),
  [%azure.execute](https://docs.microsoft.com/qsharp/api/iqsharp-magic/azure.execute),
  [%azure.status](https://docs.microsoft.com/qsharp/api/iqsharp-magic/azure.status),
  [%azure.output](https://docs.microsoft.com/qsharp/api/iqsharp-magic/azure.output),
  [%azure.jobs](https://docs.microsoft.com/qsharp/api/iqsharp-magic/azure.jobs)

## Next steps

Now that you know how to submit jobs to Azure Quantum, you can try to run the
different [samples](https://github.com/MicrosoftDocs/quantum-docs-private/tree/feature/onboarding-azure-quantum/azure-quantum/samples) we have
available or try to submit your own projects. In particular, you can view a [sample written entirely in a Q# Jupyter notebook](https://github.com/MicrosoftDocs/quantum-docs-private/blob/feature/onboarding-azure-quantum/azure-quantum/samples/qsharp/parallel-qrng/ParallelQrng.ipynb).
