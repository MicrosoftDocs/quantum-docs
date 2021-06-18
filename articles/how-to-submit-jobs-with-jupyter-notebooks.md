---
author: KittyYeungQ
description: This document provides a basic guide to submit and run Q# applications in Azure Quantum using Q# Jupyter Notebooks.
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: Submit jobs to Azure Quantum with Q# Jupyter Notebooks
uid: microsoft.quantum.submit-jobs.jupyter
---

# Submit jobs to Azure Quantum with Q# Jupyter Notebooks

This document provides a basic guide to submit and run Q# applications in Azure
Quantum using Q# Jupyter Notebooks.

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.workspaces-portal).
- The latest version of the [Quantum Development Kit for Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview.jupyter#install-the-iq-jupyter-kernel).

Follow the installation steps in the provided link to install Jupyter Notebook and
the current version of the IQ# kernel, which powers the Q# Jupyter Notebook and
Python experiences.

## Quantum computing with Q# Jupyter Notebooks

1. Run `jupyter notebook` from the terminal where your conda environment is
   activated. This starts the notebook server and opens Jupyter in a browser.
1. Create your Q# notebook (via **New** → **Q#**) and write your Q# program.
1. If you've never used Q# with Jupyter, follow the steps in [Create your first Q#
    notebook](xref:microsoft.quantum.install-qdk.overview.jupyter).
1. Write your Q# operations directly in the notebook. Running the cells will
   compile the Q# code and report whether there are any errors.
    - For example, you could write a Q# operation that looks like this:

        ```qsharp
        operation GenerateRandomBit() : Result {
            use q = Qubit();
            H(q);
            let r = M(q);
            Reset(q);
            return r;
        }
        ```

1. Once you have your Q# operations defined, use the `%azure.*` magic commands
   to connect and submit jobs to Azure Quantum. You'll use the resource ID of
   your Azure Quantum workspace in order to connect. (The resource ID can be found
   on your workspace page in the Azure Portal.)

   If your workspace was created in an Azure region other than \"West US\", you also
   need to specify this as the `location` parameter to `%azure.connect`.

    - For example, the following commands will connect to an Azure Quantum
      workspace and run an operation on the `ionq.simulator` target:

        ```py
        %azure.connect "/subscriptions/.../Microsoft.Quantum/Workspaces/WORKSPACE_NAME" location="West US"

        %azure.target ionq.simulator

        %azure.execute GenerateRandomBit
        ```

        where `GenerateRandomBit` is the Q# operation that you have already
        defined in the notebook.

1. After submitting a job, you can check its status with the command `%azure.status` or view
   its results with the command `%azure.output`. You can view a list of all your jobs with the command `%azure.jobs`.


## Autentication

The `%azure.connect` magic takes an optional `credential` parameter
that allows you to specify what type of credentials to use to authenticate with Azure.
The possible values for this parameter are:
* **Environment**: Authenticates a service principal or user via credential information specified in environment variables.
  For information about the specific environment variable needed see the [EnvironmentCredential online documentation](https://docs.microsoft.com/dotnet/api/azure.identity.environmentcredential?view=azure-dotnet)
* **ManagedIdentity**: Authenticates the managed identity of an Azure resource.
* **CLI**: Authenticates in a development environment using data from the Azure CLI.
* **SharedToken**: Authenticates in a development environment using tokens in the local cache shared between Microsoft applications.
* **VisualStudio**: Authenticates in a development environment using data from Visual Studio.
* **VisualStudioCode**: Authenticates in a development environment using data from Visual Studio Code.
* **Interactive**: Opens a new browser window to interactively authenticate and obtain an access token.
* **DeviceCode**: Authenticates using the device code flow.

If the `credential` parameter is not provided, then by default all the different mechanisms listed above are tried in order until one succeeds.

The following example shows how to use the `credential` parameter to explicitly open a new browser window to login to Azure:
```
%azure.connect
/subscriptions/SUBSCRIPTION_ID/resourceGroups/RESOURCE_GROUP/providers/Microsoft.Quantum/Workspaces/WORKSPACE
location=LOCATION
credential=interactive
```

## Getting inline help

Some helpful tips while using Q# Jupyter Notebooks:

- Use the command `%lsmagic` to see all of the available magic commands, including
  the ones for Azure Quantum.
- Detailed usage information for any magic command can be displayed by simply
  appending a `?` to the command, for example, `%azure.connect?`.

- Documentation for magic commands is also available online:
  [%azure.connect](/qsharp/api/iqsharp-magic/azure.connect),
  [%azure.target](/qsharp/api/iqsharp-magic/azure.target),
  [%azure.submit](/qsharp/api/iqsharp-magic/azure.submit),
  [%azure.execute](/qsharp/api/iqsharp-magic/azure.execute),
  [%azure.status](/qsharp/api/iqsharp-magic/azure.status),
  [%azure.output](/qsharp/api/iqsharp-magic/azure.output),
  [%azure.jobs](/qsharp/api/iqsharp-magic/azure.jobs)

## Next steps

Now that you know how to submit jobs to Azure Quantum, you can try to run the
different [samples](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum) we have
available or try to submit your own projects. In particular, you can view a sample written entirely in a Q# Jupyter notebook.
