---
author: azure-quantum-content
description: Learn how to use pre-calculated estimates for your Q# programs with the Microsoft Quantum resource estimator.
ms.date: 01/13/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Use Known Estimates with the resource estimator
uid: microsoft.quantum.resource-estimator-known-estimates
#customer intent: As a quantum programmer, I want to use pre-calculated estimates. 
---

# How to use known estimates with the resource estimator

In this article, you learn how to use pre-calculated estimates to optimize the run time of the [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator). If you already know estimates for some resource requirements for an operation, for example from a published paper, then you can pass the known estimates as input to the resource estimator and reduce the run time. The resource estimator takes the known estimates and incorporates them into the overall program cost.

For information about how to run the resource estimator, see [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Prerequisites

- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download) or open [VS Code for the Web](https://vscode.dev/quantum).
- The latest version of the [Microsoft Quantum Development Kit (QDK) extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

If you want to use Python in VS Code, then you also need to do the following:

- Install the latest versions of the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions in VS Code.
- Install the latest version of the `qdk` Python library.

    ```bash
    python -m pip install --upgrade qdk
    ```

## Use known estimates for an operation

It's useful to pass pre-calculated estimates to the resource estimator in the following scenarios:

- You want to try an algorithm from a published paper to check whether the algorithm improves the performance of your program. You can take estimates from the paper and incorporate them into the estimation run.
- You want to [develop your program top-down](https://en.wikipedia.org/wiki/Top-down_and_bottom-up_design#Programming). You can use the known estimates at the top level and pass them to the entire program. As development progresses, you can iterate and refine the pre-calculated values.

### [Use Q#](#tab/tabid-known-estimates-qsharp)

To pass known estimates to the resource estimator in a Q# program, use the `AccountForEstimates` operation.

> [!NOTE]
> The special operation `AccountForEstimates` is an intrinsic operation for only the resource estimator. If your Q# program contains the `AccountForEstimates` operation, then your program can't run on other simulator or hardware targets.

For example, the following Q# operation, called `FactoringFromLogicalCounts`, takes a list of known estimates and a list of qubits:

```qsharp
import Std.ResourceEstimation.*;

operation FactoringFromLogicalCounts() : Unit {
    use qubits = Qubit[12581];

    let knownEstimates = [
        TCount(12),
        RotationCount(12),
        RotationDepth(12),
        CczCount(3731607428),
        MeasurementCount(1078154040)
    ];

    AccountForEstimates(knownEstimates, PSSPCLayout(), qubits);
}
```

The `AccountForEstimates` operation can take the following parameters:

| Function that you can pass to `AccountForEstimates`                                  | Description |
|--------------------------------------------------------------------------------------|-------------|
| [`AuxQubitCount(amount : Int)`](xref:Qdk.Std.ResourceEstimation.AuxQubitCount)       | Returns a tuple that you can pass to the `AccountForEstimates` operation to specify that the number of auxiliary qubits is equal to the `amount`. |
| [`TCount(amount : Int)`](xref:Qdk.Std.ResourceEstimation.TCount)                     | Returns a tuple that you can pass to the `AccountForEstimates` operation to specify that the number of T gates is equal to the `amount`. |
| [`MeasurementCount(amount : Int)`](xref:Qdk.Std.ResourceEstimation.MeasurementCount) | Returns a tuple that you can pass to the `AccountForEstimates` operation to specify that the number of measurements is equal to the `amount`.|
| [`RotationCount(amount : Int)`](xref:Qdk.Std.ResourceEstimation.RotationCount)       | Returns a tuple that you can pass to the `AccountForEstimates` operation to specify that the number of rotations is equal to the `amount`. |
| [`RotationDepth(amount : Int)`](xref:Qdk.Std.ResourceEstimation.RotationDepth)       | Returns a tuple that you can pass to the `AccountForEstimates` operation to specify that the rotation depth is equal to the `amount`. |
| [`CczCount(amount : Int)`](xref:Qdk.Std.ResourceEstimation.CczCount)                 | Returns a tuple that you can pass to the `AccountForEstimates` operation to specify that the number of CCZ gates is equal to the `amount`. |
| [`PSSPCLayout()`](xref:Qdk.Std.ResourceEstimation.PSSPCLayout)                       | Indicate Parallel Synthesis Sequential Pauli Computation (PSSPC) layout. For more information, see [arXiv:2211.0769](https://arxiv.org/pdf/2211.07629.pdf). |

### [Use Python](#tab/tabid-known-estimates-python)

To pass known estimates to the resource estimator in a Python program, use the `LogicalCounts` operation.

> [!NOTE]
> The special operation `LogicalCounts` is an intrinsic operation for the resource estimator. If your Python program contains the `LogicalCounts` operation, then your program can't run on other simulator or hardware targets.

For example, the following takes a list of known estimates and incorporates them into a resource estimate for the default target parameter set:

```python
from qdk.estimator import LogicalCounts

params = {}; # Use default parameter set

logical_counts = LogicalCounts({
    'numQubits': 12581,
    'tCount': 12,
    'rotationCount': 12,
    'rotationDepth': 12,
    'cczCount': 3731607428,
    'measurementCount': 1078154040})

logical_counts.estimate(params)
```

***

> [!NOTE]
> If you experience issues when you work with the resource estimator, then see the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Understand the results of the resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)