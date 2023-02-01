---
author: SoniaLopezBravo
description: Learn how to adapt any Qiskit sample to run on Azure Quantum service. 
ms.date: 01/28/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Adapting Qiskit samples
uid: microsoft.quantum.how-to.adapting-qiskit
---

# Adapting Qiskit samples to run on Azure Quantum

If you have some experience with quantum computing or just starting, it is likely that you use some samples from [Qiskit.org](https://qiskit.org/). This article shows you how to adapt a Qiskit sample to run against any of the Azure Quantum backends. You can either download the sample or copy the code of it. 

## Prerequisistes

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Create an Azure Quantum backend

If you want to run a Qiskit sample, first you need to replace the existing backend for an Azure Quantum backend. The following code creates an Azure Quantum backend from your Azure Quantum workspace. You can copy this code everytime you want to run a Qiskit sample using Azure Quantum providers, and replace the `backend` object by one of the Azure Quantum backends available. For example, if you want to run the sample against Quantinuum quantum procesor, write `backend = quantinuum_qpu_backend`. 


```python
from azure.quantum.qiskit import AzureQuantumProvider
provider = AzureQuantumProvider (
    resource_id = "", # The resourceID of your workspace
    location = "" # The location of your workspace (for example "westus")
)

# Create IonQ simulator and QPU backends
ionq_simulator_backend = provider.get_backend("ionq.simulator")
ionq_qpu_backend = provider.get_backend("ionq.qpu.aria-1")

# Create Rigetti simulator and QPU backends
rigetti_simulator_backend = provider.get_backend("rigetti.sim.qvm")
rigetti_qpu_backend = provider.get_backend("rigetti.qpu.aspen-m-3")

# Create Quantinuum simulator and QPU backends
quantinuum_simulator_backend = provider.get_backend("quantinuum.sim.h1-2sc")
quantinuum_qpu_backend = provider.get_backend("quantinuum.qpu.h1-2")

# Set your backend of choice
backend = ionq_simulator_backend
```
> [!NOTE]
> The location and resource ID of your workspace can be found in the **Overview** tab of your Azure Quantum workspace. 
>  :::image type="content" source="media/azure-quantum-resource-id.png" alt-text="Screenshot of the overview blade of a workspace in Azure portal. Location and resource ID are marked inside a red rectangle.":::


## Adapt a downloaded sample from Qiskit.org

As an example, consider you want to try the [Solving combinatorial optimization problems using QAOA](https://qiskit.org/textbook/ch-applications/qaoa.html) Qiskit sample.

### Download the sample 

1. Open the sample and locate the **Download as Jupyter Notebook** hyperlink on the right side of the page.
1. Download the Jupyter Notebook. 
1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. In the left blade, select **Notebooks** and click **My Notebooks**.
1. Click **Upload New** and select the notebook you've downloaded.
1. Open the newly imported notebook. 

### Locate the default backend

Most samples are configured to run by default against the `aer_simulator`, which is a great way to get started. 

1. Locate the cell that has a line like the following: `backend = Aer.get_backend('aer_simulator')`, or other backend.
1. Comment out that line.

### Replace the *aer_simulator* with an Azure Quantum backend

1. Click **+ Code** to add a new code cell *prior* to the cell that contains `backend = Aer.get_backend('aer_simulator')`, or other backend.
1. Add the code for the [Azure Quantum backend](#create-an-azure-quantum-backend). Remember to update the `backend` object with the corresponding provider. 

### Verify the update

Click on **Run all** on the top left of the notebook and verify that you have jobs being queued under *Job management*.

## Adapt the code copied from a sample

If the Qiskit sample doesn't have a backend defined, you have to copy and adapt the code. 

### Create a new Notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. In the left blade, select **Notebooks** .
1. Click **My Notebooks** and click **Add New**.
1. In **Kernel Type**, select **IPython**.
1. Type a name for the file, for example *qiskitQMLsample.ipynb*, and click **Create file**. 

### Load the required imports

1. To run a Qiskit code sample on Azure Quantum, you need to import the `QuantumInstance` method that will call the Azure Quantum backend. Copy the following code and paste it before the Qiskit code sample. 

    ```python
    from qiskit import *
    from qiskit.utils import QuantumInstance
    ```
### Add the Azure Quantum backend

1. Click **+ Code** to add a new code cell
1. Copy the code for the [**Azure Quantum backend**](#create-an-azure-quantum-backend). Remember to update the `backend` object with the corresponding provider. 

### Copy and adapt the Qiskit sample

1. Click **+ Code** to add a new code cell and copy the Qiskit sample you want to run on Azure Quantum.
1. Add a `QuantumInstance` with the Azure Quantum backend to the code.  

As an example, consider the following Qiskit sample uses a Variational Quantum Classifier (VQC) algorithm to train and test samples from a data set. This code can be found in [Qiskit/qiskit-machine-learning](https://github.com/Qiskit/qiskit-machine-learning#creating-your-first-machine-learning-programming-experiment-in-qiskit). The only addition to the original code is the `QuantumInstance` when creating the VQC object: `quantum_instance=QuantumInstance(backend)`. 

[!code-qsharp[](includes/qiskit-qml-sample.py?highlight=28)]


## Next steps
- [Quickstart: Submit a circuit with Qiskit using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.computing.qiskit.portal)
- [How to perform long running experiments on Azure Quantum](xref:microsoft.quantum.long-running-experiments)
