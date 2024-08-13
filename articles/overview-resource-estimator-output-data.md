---
author: SoniaLopezBravo
description: This article shows how to interpret the report data of the Resource Estimator and access the output parameters.
ms.date: 08/01/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', target, targets]
title: Output Parameters of the Resource Estimator
uid: microsoft.quantum.overview.resources-estimator-output.data
---

# Understanding the result data of the Resource Estimator

Learn how to interpret and retrieve the output parameters and diagrams of the Resource Estimator. This article explains how to programmatically access the results of the Resource Estimator in Jupyter Notebooks. If you run the Resource Estimator in Visual Studio Code from the command palette, the following commands doesn't apply.

## Prerequisites

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets 
    ```

## Output parameters

The output data of the Resource Estimator is a report that is printed in the console and can be accessed programmatically. For example, the following code snippet shows how to access the resource estimation parameters.

```python
result['jobParams']
```

The following output data constitutes the possible entries that can be access programmatically.

|Top-level output parameter|Data type|Description|
|---|----|----|
|`status`|string| The status of the job, it's always `Succeeded`.|
|`jobParams`| dictionary| The target parameters of the job that are passed as input.|
|`physicalCounts`| dictionary| The physical resource estimates. For more information, see [Physical counts](#physical-counts).|
|`physicalCountsFormatted`| dictionary| The physical resource estimates formatted for display in report data. For more information, see [Physical counts formatted](#physical-counts-formatted).|
|`logicalQubit`| dictionary| The logical qubit properties. For more information, see [Logical qubit](#logical-qubit).|
|`tfactory`| dictionary| The T factory properties.|
|`logicalCounts`| dictionary| The pre-layout logical resource estimates. For more information, see [Logical counts](#logical-counts).|
|`reportData`| dictionary| Generation data for resource estimation report.|

### Physical counts

The `physicalCounts` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`physicalQubits`|number| The total number of physical qubits.|
|`runtime`|number| The total runtime to execute the algorithm in nanoseconds.|
|`rqops`| number| The number of reliable quantum operations per second (QOPS).|
| `breakdown` |dictionary |Breakdown of estimates. For more information, see [Physical counts breakdown](#physical-counts-breakdown).|

#### Physical counts breakdown

The `breakdown` dictionary of `physicalCounts` contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`algorithmicLogicalQubits`| number| The logical qubits required for running the algorithm and do not include resources for T factories. |
|`algorithmicLogicalDepth`|  number | The logical cycles required for running the algorithm and do not include resources for T factories. |
|`logicalDepth`| number |The possibly adjusted number of cycles that is computed whenever the T factory execution time is faster then algorithm execution. |
|`numTstates`| number |The number of T states consumed by the algorithm.|
|`clockFrequency`| number |The number of logical cycles per second.|
|`numTfactories`| number | The number of T factories (assuming uniform T factory design).|
|`numTfactoryRuns`| number | The number of how often all parallel T factories should run.|
|`physicalQubitsForTfactories`| number| The number of physical qubits for all T factories.|
|`physicalQubitsForAlgorithm`| number| The number of physical qubits for algorithm layout.|
|`requiredLogicalQubitErrorRate`| number| The required logical error rate.|
|`requiredLogicalTstateErrorRate`| number| The required logical T state error rate.|
|`numTsPerRotation`| number | The number of T gates per rotation.|
|`cliffordErrorRate`| number | The Clifford error rate based on the qubit parameters.|

### Physical counts formatted

The `physicalCountsFormatted` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`runtime`|string| Total runtime as human friendly string.|
|`rqops`|string | The number of reliable quantum operations per second (QOPS) formatted with metric suffix.|
|`physicalQubits`|string| Total number of physical qubits with metric suffix.|
|`algorithmicLogicalQubits`|string|Algorithmic logical qubits with metric suffix.|
|`algorithmicLogicalDepth`|string| Algorithmic logical depth with metric suffix.|
|`logicalDepth`|string|Possibly adjusted algorithmic logical depth with metric suffix.|
|`numTstates`|string|Number of T states with metric suffix.|
|`numTfactories`|string|Number of T factory copies with metric suffix.|
|`numTfactoryRuns`|string|Number of T factory runs with metric suffix.|
|`physicalQubitsForAlgorithm`|string|Number of physical qubits for algorithm with metric suffix.|
|`physicalQubitsForTfactories`|string|Number of physical qubits for T factories with metric suffix.|
|`physicalQubitsForTfactoriesPercentage`|string|The number of physical qubits for all T factories in percentage to total.|
|`requiredLogicalQubitErrorRate`|string|Truncated required logical qubit error rate.|
|`requiredLogicalTstateErrorRate`|string|Truncated required T state error rate.|
|`physicalQubitsPerLogicalQubit`|string|Number of physical qubits per logical qubit with metric suffix.|
|`logicalCycleTime`|string|The logical cycle time of a logical qubit as human friendly string.|
|`clockFrequency`|string|The number of logical cycles per second as a human friendly string.|
|`logicalErrorRate`|string|Truncated logical error rate.|
|`tfactoryPhysicalQubits`|string|Number of physical qubits in T factory with metric suffix (or message that there is no T factory).|
|`tfactoryRuntime`|string|The runtime of a single T factory as human friendly string (or message that there is no T factory).|
|`numInputTstates`|string|The number of input T states (or message that there is no T factory).|
|`numUnitsPerRound`|string|The number of units per distillation round, comma separated in a string (or message that there is no T factory).|
|`unitNamePerRound`|string|The unit names of each distillation round, comma separated in a string (or message that there is no T factory).|
|`codeDistancePerRound`|string|The code distances per distillation round, comma separated in a string (or message that there is no T factory).|
|`physicalQubitsPerRound`|string|The number of physical qubits per distillation round, comma separated in a string (or message that there is no T factory).|
|`tfactoryRuntimePerRound`|string|The runtime of each distillation round, displayed as comma separated human friendly strings (or message that there is no T factory).|
|`tstateLogicalErrorRate`|string|Truncated logical T state error rate (or message that there is no T factory).|
|`logicalCountsNumQubits`|string|Number of qubits (pre-layout) with metric suffix.|
|`logicalCountsTCount`|string|Number of T gates (pre-layout) with metric suffix.|
|`logicalCountsRotationCount`|string|Number of rotation gates (pre-layout) with metric suffix.|
|`logicalCountsRotationDepth`|string|Rotation depth (pre-layout) with metric suffix.|
|`logicalCountsCczCount`|string|Number of CCZ gates (pre-layout) with metric suffix.|
|`logicalCountsCcixCount`|string|Number of CCiX gates (pre-layout) with metric suffix.|
|`logicalCountsMeasurementCount`|string|Number of single-qubit measurements (pre-layout) with metric suffix.|
|`errorBudget`|string|Truncated total error budget.|
|`errorBudgetLogical`|string|Truncated error budget for logical error.|
|`errorBudgetTstates`|string|Truncated error budget for faulty T state distillation.|
|`errorBudgetRotations`|string|Truncated error budget for faulty rotation synthesis.|
|`numTsPerRotation`|string|Formatted number of Ts per rotation (might be None).|

### Logical qubit

The `logicalQubit` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`codeDistance`|number|The computed code distance for the logical qubit.|
|`physicalQubits`|number| The number of physical qubits for each logical qubit.|
|`logicalCycleTime`|number| The time to execute one logical operation.|
|`logicalErrorRate`|number| The logical error rate of the logical qubit.|


### Logical counts

The `logicalCounts` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`numQubits`|number| Pre-layout number of qubits.|
|`tCount`|number| Pre-layout number of T gates.|
|`rotationCount`|number| Pre-layout number of rotation gates.|
|`rotationDepth`|number| Pre-layout rotation depth.|
|`cczCount`|number| Pre-layout number of CCZ gates.|
|`ccixCount`|number| Pre-layout number of CCiX gates.|
|`measurementCount`|number| Pre-layout number of single-qubit measurements.|

> [!TIP]
> If you want to use a pre-calculated set of logical counts for a resource estimation job, you can use the `LogicalCounts` Python operation to pass the known estimates to the Resource Estimator. For more information, see [How to use known estimates with the Resource Estimator](xref:microsoft.quantum.resource-estimator-known-estimates).

## Space diagram

The overall physical resource estimation consists of total number of physical qubits used for both the algorithm and T factory copies. You can inspect the distribution between these two using the space diagram.

The space diagram shows the proportion of the physical qubits used for the algorithm and the [T factories](xref:microsoft.quantum.concepts.tfactories). Note that the number of T factory copies contributes to the number of physical qubits for T factories.

In Jupyter Notebook, you can access the space diagram using the `SpaceChart` widget from the `qsharp-widgets` package.

```python
import qsharp

from qsharp_widgets import SpaceChart
SpaceChart(result)
```

:::image type="content" source="media/vscode-estimates-local-diagram-shorRE.png" alt-text="Pie diagram showing the distribution of total physical qubits between algorithm qubits and T factory qubits. There's a table with the breakdown of number of T factory copies and number of physical qubits per T factory.":::

When running multiple configurations of target parameters with the [Pareto frontier estimation](xref:microsoft.quantum.overview.resources-estimator#pareto-frontier-estimation), you can plot the space diagram for a specific solution of the. For example, the following code shows how to plot the space diagram for the first configuration of parameters and the third shortest runtime.

```python
SpaceChart(result[0], 2) # First (estimate index=0) run and third (point index=2) shortest runtime
```

## Space-time diagram

In quantum computing, there's a tradeoff between the number of physical qubits and the runtime of the algorithm. You could consider allocation of as many physical qubits as possible to reduce the runtime of the algorithm. However, the number of physical qubits is limited by the number of physical qubits available in the quantum hardware. Understanding the tradeoff between runtime and system scale is one of the more important aspects of resource estimation. 

When estimating the resources of an algorithm, you can use the space-time diagram to visualize the tradeoffs between the number of physical qubits and the runtime of the algorithm.

> [!NOTE]
> To see multiple optimal combinations in the space-time diagram, you need to set the estimation type to [Pareto frontier estimation](xref:microsoft.quantum.overview.resources-estimator#pareto-frontier-estimation). If you run the Resource Estimator in Visual Studio Code using the **Q#: Calculate Resource Estimates** option, the Pareto frontier estimation is enabled by default.

The space-time diagram allows you to find the optimal combination of {number of qubits, runtime} pairs that satisfy the constraints of the quantum hardware. The diagram shows the number of physical qubits and the runtime of the algorithm for each {number of qubits, runtime} pair.

To run the space-time diagram in Jupyter Notebook, you can use the `EstimatesOverview` widget from the `qsharp-widgets` package.

```python
import qsharp

from qsharp_widgets import EstimatesOverview

EstimatesOverview(result, colors=["#1f77b4", "#ff7f0e"], runNames=["e4 Surface Code", "e6 Floquet Code"])
```

:::image type="content" source="media/qubit-time-diagram-shorRE.png" alt-text="Screenshot showing the qubit-time diagram of the Resource Estimator.":::

> [!TIP]
> To see the estimation details, you can hover over each point in the diagram.

The space-time diagram is specially useful when comparing multiple configurations of target parameters for the same algorithm.

:::image type="content" source="media/multiple-configurations-frontier-shorRE.png" alt-text="Screenshot showing the space-time diagram and the table of results when running multiple configurations of parameter in the Resource Estimator.":::


> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next steps

- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Different ways to run the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Handle large programs with the Resource Estimator](xref:microsoft.quantum.resource-estimator-caching)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
