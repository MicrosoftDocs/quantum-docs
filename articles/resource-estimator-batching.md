---
author: SoniaLopezBravo
description: Learn how to run multiple configurations of target parameters and compare them using the Resource Estimator.
ms.date: 10/16/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Batching with the Resource Estimator
uid: microsoft.quantum.resource-estimator-batching
#customer intent: As a quantum programmer, I want to compare target parameters using the resource esitmator.
---

# How to run multiple configurations of target parameters with the Resource Estimator

In this article, you learn how to run multiple configurations of target parameters and compare them using the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator).

For information about how to run the Resource Estimator, see [Different ways to use the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Prerequisites

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- The latest version of the [Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Installing the QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-qdk-on-vs-code).
- Install the latest version of the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
- The latest Azure Quantum `qsharp` package.  

    ```bash
    python -m pip install --upgrade qsharp 
    ```

## Batching with the Resource Estimator

The Azure Quantum Resource Estimator allows you to run jobs with multiple configurations of target parameters, also known as *batching*, as a single job to avoid rerunning multiple jobs on the same quantum program. 

A resource estimation job consist of two types of job parameters:

- [Target parameters](xref:microsoft.quantum.overview.resources-estimator): qubit model, QEC schemes, error budget, constraints on the component-level, and distillation units.
- **Operation arguments**: arguments that can be passed to the program (if the QIR entry point contains arguments).

One item consists of one configuration of job parameters, that is one configuration of target parameters and operation arguments. Several items are represented as an array of job parameters.

Some scenarios where you may want to batch multiple items as a single job:

- Run multiple target parameters with *same* operation arguments in all items.
- Run multiple target parameters with *different* operation arguments in all items.
- Easily compare multiple results in a tabular format.
- Easily compare multiple results in a chart.

## How to run batch estimation 

Batching with Q# can be done in a [Jupyter Notebook in VS Code](xref:microsoft.quantum.submit-resource-estimation-jobs). You can perform a batch estimation by passing a list of target parameters to the `params` parameter of the `qsharp.estimate` function. 

The following example shows how to run two configurations of target parameters as a single job. The first configuration uses the default target parameters, and the second configuration uses the `qubit_maj_ns_e6` qubit parameter and the `floquet_code` QEC scheme.

In the same Jupyter Notebook of your Q# program, add a new cell and run the following code:

```python
result_batch = qsharp.estimate("RunProgram()", params=
                [{}, # Default parameters
                {
                    "qubitParams": {
                        "name": "qubit_maj_ns_e6"
                    },
                    "qecScheme": {
                        "name": "floquet_code"
                    }
                }])
result_batch.summary_data_frame(labels=["Gate-based ns, 10⁻³", "Majorana ns, 10⁻⁶"])
```

You can also construct a list of estimation target parameters using the [`EstimatorParams` class](xref:qsharp.estimator.EstimatorParams). The following code shows how to batch six configurations of target parameters as a single job.

```python
from qsharp.estimator import EstimatorParams, QubitParams, QECScheme

labels = ["Gate-based µs, 10⁻³", "Gate-based µs, 10⁻⁴", "Gate-based ns, 10⁻³", "Gate-based ns, 10⁻⁴", "Majorana ns, 10⁻⁴", "Majorana ns, 10⁻⁶"]

params = EstimatorParams(num_items=6)
params.error_budget = 0.333
params.items[0].qubit_params.name = QubitParams.GATE_US_E3
params.items[1].qubit_params.name = QubitParams.GATE_US_E4
params.items[2].qubit_params.name = QubitParams.GATE_NS_E3
params.items[3].qubit_params.name = QubitParams.GATE_NS_E4
params.items[4].qubit_params.name = QubitParams.MAJ_NS_E4
params.items[4].qec_scheme.name = QECScheme.FLOQUET_CODE
params.items[5].qubit_params.name = QubitParams.MAJ_NS_E6
params.items[5].qec_scheme.name = QECScheme.FLOQUET_CODE

qsharp.estimate("RunProgram()", params=params).summary_data_frame(labels=labels)
```

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)