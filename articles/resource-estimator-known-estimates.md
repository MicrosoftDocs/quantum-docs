---
author: SoniaLopezBravo
description: Learn how to use pre-calculated estimates for your Q# programs with the Azure Quantum Resource Estimator.
ms.date: 06/03/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Use Known Estimates with the Resource Estimator
uid: microsoft.quantum.resource-estimator-known-estimates
#customer intent: As a quantum programmer, I want to use pre-calculated estimates. 
---

# How to use known estimates with the Resource Estimator

In this article, you learn how to use pre-calculated estimates and optimize the execution of the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator).

For information about how to run the Resource Estimator, see [Different ways to run the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Prerequisites

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension. For installation details, see [Installing the QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-qdk-on-vs-code).

If you want to use Python in VS Code, you also need the following:

- Install the latest version of the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
- The latest Azure Quantum `qsharp` package.  

    ```bash
    python -m pip install --upgrade qsharp 
    ```

## Use known estimates for an operation

If you already know some estimates for an operation, for example from a published paper, one way to reduce the execution time is taking the known estimates and incorporate them into the overall program cost.

Some scenarios where you may want to perform estimation from pre-calculated estimates:

- You want to try a novel algorithm described in a paper to check if it improves the performance of your program. You can take estimates from the paper and incorporated them into the program.
- You want to develop [program top-down](https://en.wikipedia.org/wiki/Top-down_and_bottom-up_design#Programming), that is, start developing from main function and then implement lower levels. You can use the known estimates at the top level with expected estimates for the entire program. As development process progresses, new components start calling to the known estimates and expected estimates are replaced by the actual implementation. In this way, estimates for the entire program are known upfront and get more precise as development progresses.

### [Use Q#](#tab/tabid-known-estimates-qsharp)

You can use the `AccountForEstimates` Q# operation to pass known estimates to the Resource Estimator.

> [!NOTE]
> The special operation `AccountForEstimates` is an intrinsic operation for the Resource Estimator. It's not supported by other execution targets.

For example, consider the following Q# operation called `FactoringFromLogicalCounts` that takes a list of known estimates and a list of qubits.

```qsharp
open Microsoft.Quantum.ResourceEstimation;

operation FactoringFromLogicalCounts() : Unit {
    use qubits = Qubit[12581];

    AccountForEstimates(
        [TCount(12), RotationCount(12), RotationDepth(12),
         CczCount(3731607428), MeasurementCount(1078154040)],
        PSSPCLayout(), qubits);
}
```

The `AccountForEstimates` operation can take the following parameters:

|Functions with `AccountForEstimates`| Description|
|---|---|
|`AuxQubitCount(amount : Int)`| Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of auxiliary qubits is equal to the `amount`.|
|`TCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of T gates is equal to the `amount`.|
|`MeasurementCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of measurements is equal to the `amount`.|
|`RotationCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of rotations is equal to the `amount`.|
|`RotationDepth(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the rotation depth is equal to the `amount`.|
|`CczCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of CCZ gates is equal to the `amount`.|
|`PSSPCLayout()`| Indicate Parallel Synthesis Sequential Pauli Computation (PSSPC) layout. For more information, see [arXiv:2211.0769](https://arxiv.org/pdf/2211.07629.pdf).|

### [Use Python](#tab/tabid-known-estimates-python)

You can use the `LogicalCounts` operation to pass known estimates to the Resource Estimator.

> [!NOTE]
> The special operation `LogicalCounts` is an intrinsic operation for the Resource Estimator. It's not supported by other execution targets.

For example, consider the following code that takes a list of known estimates.

```python
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
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Different ways to run the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)