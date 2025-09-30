---
author: azure-quantum-content
description: Learn how to adapt any Qiskit sample so you can run your quantum programs on the Azure Quantum service.
ms.date: 11/18/2024
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Adapting Qiskit Samples
uid: microsoft.quantum.how-to.adapting-qiskit

#customer intent: As a quantum developer, I want to adapt a my own Qiskit samples so I can run my quantum programs on the Azure Quantum service.
---

# How to adapt Qiskit samples to run on Azure Quantum

If you have some experience with quantum computing or are just starting, it's likely that you use some samples from [Qiskit.org](https://qiskit.org/). This article shows you how to adapt any Qiskit sample to run against any of the Azure Quantum backends.

> [!WARNING]
> On October 15, 2025, Azure Quantum will discontinue support for hosted Jupyter notebooks. To retain your notebooks, see [Download your hosted Jupyter notebooks from your Quantum workspace](xref:microsoft.quantum.how-to.download-notebooks-from-portal).

## Prerequisites

- An Azure account with an active subscription. If you don't have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Copy the Qiskit sample in Azure Quantum portal

First, you need to copy the Qiskit sample to an Azure Quantum notebook.

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. In the left blade, select **Notebooks** and click **My Notebooks**.
1. Click **Upload New** if you want to upload a sample, or click **Add New** to copy the code to a new notebook.

## Locate the default backend

Most samples are configured to run by default against the `aer_simulator`, which is a great way to get started.

1. Locate the cell that has a line that defines the backend, for example, `backend = Aer.get_backend('aer_simulator')`.
1. Comment out that line, that is, `# backend = Aer.get_backend('aer_simulator')`.

## Create an Azure Quantum backend

Now you need to create a backend that points to an Azure Quantum provider.

1. Click **+ Code** to add a new code cell **before** the code sample cell.
1. Create a list of Azure Quantum backends. The following code creates a `workspace` object with the information of your Azure Quantum workspace and configures a list of Azure Quantum backends from all the providers available in your Azure Quantum workspace.

    ```python
    import azure.quantum
    from azure.quantum.qiskit import AzureQuantumProvider

    workspace = Workspace(  
        resource_id = "", # Add the resourceID of your workspace
        location = "" # Add the location of your workspace (for example "westus")
        )

    provider = AzureQuantumProvider(workspace)

    # Create IonQ simulator and QPU backends
    ionq_simulator_backend = provider.get_backend("ionq.simulator")
    ionq_qpu_backend = provider.get_backend("ionq.qpu.aria-1")

    # Create Rigetti simulator backend
    rigetti_simulator_backend = provider.get_backend("rigetti.sim.qvm")

    # Create Quantinuum simulator and QPU backends
    quantinuum_simulator_backend = provider.get_backend("quantinuum.sim.h1-1e")
    quantinuum_qpu_backend = provider.get_backend("quantinuum.qpu.h1-1")
    ```

    > [!NOTE]
    > The location and resource ID of your workspace can be found in the **Overview** tab of your Azure Quantum workspace.
    > :::image type="content" source="media/azure-portal-workspace-overview.png" alt-text="Screenshot of the overview blade of a workspace in Azure portal. Location and resource ID are marked inside a red rectangle.":::

    1. Click **+ Code** to add a new code and add the backend to the sample. Replace the `backend` variable with the Azure Quantum backend you want to use. For example, to use the IonQ simulator, use `backend = ionq_simulator_backend`.

    ```python1
    # Set your backend of choice
    backend = ionq_simulator_backend
    ```

    > [!NOTE]
    > Azure Quantum defaults to QIR for the backends. If you need to use a passthrough backend, use the `gateset` parameter with the `get_backend` method. For more information, see [Native gates support and usage](xref:microsoft.quantum.providers.ionq#native-gates-support-and-usage).

## Run the sample on Azure Quantum

Click on **Run all** on the top left of the notebook and verify that you have jobs being queued under *Job management*.

## Next steps

- [Quickstart: Submit a circuit with Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit)
- [How to perform long running experiments on Azure Quantum](xref:microsoft.quantum.long-running-experiments)
