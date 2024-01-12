---
author: SoniaLopezBravo
description: Learn how to adapt any Qiskit sample to run on Azure Quantum service. 
ms.date: 01/05/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Adapting Qiskit samples
uid: microsoft.quantum.how-to.adapting-qiskit
---

# Adapting Qiskit samples to run on Azure Quantum


If you have some experience with quantum computing or are just starting, it is likely that you use some samples from [Qiskit.org](https://qiskit.org/). This article shows you how to adapt a Qiskit sample to run against any of the Azure Quantum backends. You can either download the sample or copy the code to a new notebook. 

## Prerequisites

- An Azure account with an active subscription. If you don't have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Open the Qiskit sample in Azure Quantum

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. In the left blade, select **Notebooks** and click **My Notebooks**.
1. Click **Upload New** if you've downloaded a sample, or click **Add New** to copy the code to a new notebook.

## Locate the default backend

Most samples are configured to run by default against the `aer_simulator`, which is a great way to get started. 

1. Locate the cell that has a line that defines the backend, for example, `backend = Aer.get_backend('aer_simulator')`.
1. Comment out that line.

## Create an Azure Quantum backend

1. Click **+ Code** to add a new code cell *before* the code sample.
1. Replace the existing backend with an Azure Quantum backend. The following code configures an Azure Quantum backend from one of the providers available in your Azure Quantum workspace. For example, if you want to run the sample against a Quantinuum processor, use `backend = quantinuum_qpu_backend`. 

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

    # Create Rigetti simulator and QPU backends
    rigetti_simulator_backend = provider.get_backend("rigetti.sim.qvm")
    rigetti_qpu_backend = provider.get_backend("rigetti.qpu.aspen-m-3")

    # Create Quantinuum simulator and QPU backends
    quantinuum_simulator_backend = provider.get_backend("quantinuum.sim.h1-1e")
    quantinuum_qpu_backend = provider.get_backend("quantinuum.qpu.h1-1")

    # Set your backend of choice
    backend = ionq_simulator_backend
    ```

    > [!NOTE]
    > The location and resource ID of your workspace can be found in the **Overview** tab of your Azure Quantum workspace. 
    >  :::image type="content" source="media/azure-quantum-resource-id.png" alt-text="Screenshot of the overview blade of a workspace in Azure portal. Location and resource ID are marked inside a red rectangle.":::

## Verify the update

Click on **Run all** on the top left of the notebook and verify that you have jobs being queued under *Job management*.

## Next steps

- [Quickstart: Submit a circuit with Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit)
- [How to perform long running experiments on Azure Quantum](xref:microsoft.quantum.long-running-experiments)
