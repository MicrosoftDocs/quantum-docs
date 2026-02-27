---
author: azure-quantum-content
description: Learn how to run multiple configurations of target parameters and compare them using the resource estimator.
ms.date: 02/12/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Compare Multiple Configurations with the resource estimator
uid: microsoft.quantum.resource-estimator-batching
#customer intent: As a quantum programmer, I want to compare target parameters using the resource estimator.
---

# How to compare multiple configurations of target parameters with the resource estimator

In this article, you learn how to use the [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator) to run estimates for multiple configurations of [target parameters](xref:microsoft.quantum.overview.resources-estimator) at the same time and compare the results for each configuration.

To compare resource estimates for different configurations of target parameters, you can run one estimate at a time or you can run a batch job that estimates the resource requirements for all configurations. Batch estimates are useful because they display the results for all configurations together in tables and visual charts.

For information about how to run the resource estimator, see [Different ways to use the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Prerequisites

- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download) or open [VS Code for the Web](https://vscode.dev/quantum).
- The latest version of the [Microsoft Quantum Development Kit (QDK) extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).
- The latest versions of the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
- The latest version of the `qdk` Python library.  

    ```bash
    python -m pip install --upgrade qdk
    ```

## Run multiple configurations with the resource estimator

You can run multiple configurations of target parameters as a single batch job in Q# with [Jupyter Notebook in VS Code](xref:microsoft.quantum.submit-resource-estimation-jobs). To run a batch estimate, pass a list of target parameters dictionaries to the `params` parameter of the `qsharp.estimate` function.

The following example shows how to run two configurations of target parameters as a single batch job for a Q# algorithm that puts a qubit into an equal superposition state. The first configuration uses the default target parameters, and the second configuration uses the `qubit_maj_ns_e6` qubit parameter and the `floquet_code` quantum error correction (QEC) scheme.

To compare estimates for the Q# program, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**.
1. To import the `qsharp` Python module, run the following code in the first cell:

    ```python
    from qdk import qsharp
    ```

1. Write your Q# program in a new `%%qsharp` cell:

    ```python
    %%qsharp

    operation Main() : Result {
        use qubit = Qubit();
        H(qubit);
        MResetZ(qubit)
    }
    ```

1. Create a list of parameter set dictionaries and then pass the list as the `params` argument to the `qsharp.estimate` function. Run the following code in a new cell:

    ```python
    defaultParams = {} # Use an empty dictionary for the default input parameter set
    customParams = {"qubitParams": {"name": "qubit_maj_ns_e6"},
                    "qecScheme": {"name": "floquet_code"}
                    }

    result_batch = qsharp.estimate("Main()", params=[defaultParams, customParams])

    result_batch.summary_data_frame(labels=["Gate-based ns, 10⁻³", "Majorana ns, 10⁻⁶"])
    ```

A summary of resource estimation results appears in a table so that you can easily compare how the algorithm runs with different qubit types and error correction schemes.

### Run a batch job with the `EstimatorParams` class

You can also construct a list of estimation target parameters as attributes of the [`EstimatorParams` class](xref:qsharp.estimator.EstimatorParams). The following code shows how to batch six configurations of target parameters as a single job.

```python
from qdk import qsharp
from qdk.estimator import EstimatorParams, QubitParams, QECScheme

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

qsharp.estimate("Main()", params=params).summary_data_frame(labels=labels)
```

> [!NOTE]
> If you experience issues when you work with the resource estimator, then see the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator) or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Understand the results of the resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Use different SDKs and IDEs with resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)