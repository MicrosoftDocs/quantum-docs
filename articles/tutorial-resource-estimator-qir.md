---
author: SoniaLopezBravo
description: In this tutorial, learn how to create and submit a QIR program to the Azure Quantum Resource Estimator target.
ms.author: sonialopez
ms.date: 03/15/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: tutorial
no-loc: [Quantum Intermediate Representation, target, targets]
title: 'Tutorial: Resource Estimation with QIR'
uid: microsoft.quantum.tutorial.resource-estimator.qir
---

# Tutorial: Submit a QIR program to the Azure Quantum Resource Estimator

The Azure Quantum Resource Estimator is built on [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir), a fully interoperable specification for quantum programs. QIR serves as a common interface between quantum programming languages and frameworks, and targeted quantum computation platforms. Because the Resource Estimator takes a QIR program as input, it supports any language that translates to QIR. For example, it can be used by popular quantum SDKs and languages such as Q# and Qiskit.  

This tutorial shows how to write and submit a QIR program to the Resource Estimator. This tutorial uses [PyQIR](https://github.com/qir-alliance/pyqir) to generate QIR, however, you can use any other source of QIR.

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

In this tutorial, you'll learn how to:

> [!div class="checklist"]
> * Connect to the Azure Quantum service.
> * Define a function to create a resource estimation job from QIR bitcode
> * Create a QIR bitcode using PyQIR generator
> * Submit a QIR job to the Resource Estimator

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The **Microsoft Quantum Computing** provider added to your workspace. 

## Create a new notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. Under **Operations**, select **Notebooks**
1. Click on **My notebooks** and click **Add New**
1. In **Kernel Type**, select **IPython**.
1. Type a name for the file, and click **Create file**.

When your new notebook opens, it automatically creates the code for the first cell, based on your subscription and workspace information.

```python
from azure.quantum import Workspace
workspace = Workspace ( 
    resource_id = "", # Your resource_id 
    location = ""  # Your workspace location (for example, "westus") 
)
```

> [!NOTE]
> Unless otherwise noted, you should run each cell in order as you create it to avoid any compilation issues. 

Click the triangular "play" icon to the left of the cell to run the code. 

## Load the required imports

First, you need to import some Python classes and functions from `azure.quantum`, `qiskit`, and `pyqir`.  You won't use Qiskit to build quantum circuits directly, but you'll use `AzureQuantumJob`, which is built on top of the Qiskit ecosystem.

```python
from azure.quantum.qiskit import AzureQuantumProvider
from azure.quantum.qiskit.job import AzureQuantumJob
from pyqir.generator import BasicQisBuilder, SimpleModule
```

## Connect to the Azure Quantum service

Next, create an `AzureQuantumProvider` object using the `workspace` object from the previous cell to connect to your Azure Quantum workspace.

```python
provider = AzureQuantumProvider(workspace)
```

## Define a function to create a resource estimation job from QIR

The Resource Estimator is a target of the Microsoft Quantum Computing provider. Using the Resource Estimator is exactly the same as submitting a job against other software and hardware provider targets in Azure Quantum - define your program, set a target, and submit your job for computation. 

When submitting a resource estimate request for your program, you can specify some target parameters.

* `errorBudget` - the overall allowed error budget
* `qecScheme` - the quantum error correction (QEC) scheme
* `qubitParams` - the physical qubit parameters
* `constraints` - the constraints on the component-level

For more information about the input parameters, see [Target parameters of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator).

For this example, you will implement a generic function that takes as input the `provider` object that connects to your Azure Quantum workspace and the QIR bitcode of the quantum program.  It returns as result an Azure Quantum job.
The Resource Estimator target parameters can be passed via keyword arguments to the function.

```python
def resource_estimation_job_from_qir(provider: AzureQuantumProvider, bitcode: bytes, **kwargs):
    """A generic function to create a resource estimation job from QIR bitcode"""

    # Find the Resource Estimator target from the provider
    backend = provider.get_backend('microsoft.estimator')

    # You can provide a name for the job via keyword arguments; if not,
    # use QIR job as a default name
    name = kwargs.pop("name", "QIR job")

    # Wxtract some job specific arguments from the backend's configuration
    config = backend.configuration()
    blob_name = config.azure["blob_name"]
    content_type = config.azure["content_type"]
    provider_id = config.azure["provider_id"]
    output_data_format = config.azure["output_data_format"]

    # Finally, create the Azure Quantum jon object and return it
    return AzureQuantumJob(
        backend=backend,
        target=backend.name(),
        name=name,
        input_data=bitcode,
        blob_name=blob_name,
        content_type=content_type,
        provider_id=provider_id,
        input_data_format="qir.v1",
        output_data_format=output_data_format,
        input_params = kwargs,
        metadata={}
    )
  ```
  
## Run a sample quantum program

Next, create some QIR bitcode using the PyQIR generator.  This example builds a controlled S gate using three T gates and two CNOT gates.

```python
module = SimpleModule("Controlled S", num_qubits=2, num_results=0)
qis = BasicQisBuilder(module.builder)

[a, b] = module.qubits[0:2]
qis.t(a)
qis.t(b)
qis.cx(a, b)
qis.t_adj(b)
qis.cx(a, b)
```
  
You can use the function you defined above together with the `bitcode()` function from PyQIR to generate a resource estimation job. You can also pass Resource Estimator specific arguments. This example uses `errorBudget` to set the error rate to 5%. For more information about the target parameters, see [Target parameters of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator).

```python
job = resource_estimation_job_from_qir(provider, module.bitcode(), errorBudget=0.05)
result = job.result()
result
```

This function creates a table that shows the overall physical resource counts. You can further inspect cost details by collapsing the groups that have more information. For example, if you collapse the *Logical qubit parameters* group, you can more easily see that the error correction code distance is 15.

|Logical qubit parameter | Value |
|----|---|
|QEC scheme                                                    |                       surface_code |
|Code distance                                                                       |            5 |
|Physical qubits                                                                   |            50 |
|Logical cycle time                                                                   |         2us |
|Logical qubit error rate                                                            |     3.00E-5 |
|Crossing prefactor                                                                    |       0.03|
|Error correction threshold                                                             |      0.01|
|Logical cycle time formula    | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
|Physical qubits formula	      |                                      2 * `codeDistance` * `codeDistance`|

In the *Physical qubit parameters* group, you can see the physical qubit properties that were assumed for this estimation. 
For example, the time to perform a single-qubit measurement and a single-qubit gate are assumed to be 100 ns and 50 ns, respectively.

|Physical qubit parameter | Value |
|---|---|
|Qubit name     |                    qubit_gate_ns_e3 |
|Instruction set                      |     GateBased  |
|Single-qubit measurement time         |       100 ns |
|T gate time	                            |      50 ns|
|T gate error rate                       |      0.001 |
|Single-qubit measurement error rate      |     0.001 |
|Single-qubit gate time                    |    50 ns |
|Single-qubit error rate                   |    0.001 |
|Two-qubit gate time                       |    50 ns |
|Two-qubit error rate                        |  0.001 |


For more information, see [the full list of output data](xref:microsoft.quantum.overview.resources-estimator-output.data) for the Resource Estimator.

## Related content

Continue to explore other quantum algorithms and techniques:

- The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
- The tutorial [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
- The tutorial [Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to operate on qubits with Q# to change their state, and demonstrates the effects of superposition and entanglement.
- The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are Jupyter Notebook-based, self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
