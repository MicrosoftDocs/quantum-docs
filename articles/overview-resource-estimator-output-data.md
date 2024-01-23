---
author: SoniaLopezBravo
description: This article shows how to interpret the report data of the Resource Estimator and access the output parameters.
ms.date: 01/12/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', target, targets]
title: Resource Estimator Output Parameters
uid: microsoft.quantum.overview.resources-estimator-output.data
---

# Understand the result data of the Resource Estimator

This article shows how to interpret and retrieve the output data of the Resource Estimator. The output data of the Resource Estimator is a report that is printed in the console and can be accessed programmatically.

For more information, see [How the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works).

## Prerequisites

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets 
    ```

## Report data

When you calculate the resource estimates of a Q# operation, the Resource Estimator prints a report of the results in the form of a table.

The report table is printed in groups of output data: physical qubits, breakdown, logical qubit parameters, T factory parameters, pre-layout logical resources, and assumed error budget. You can inspect the details by collapsing the groups, which have more information.

### Physical qubits

The physical qubits report contains the following entries:

|Report data name|Description|
|---|----|
|Runtime|This is a runtime estimate in nanoseconds for the execution time of the algorithm. In general, the execution time corresponds to the duration of one logical cycle multiplied by the logical depth, that is, the number of logical cycles to run the algorithm. If however the duration of a single T-factory (T factory runtime) is larger than the algorithm runtime, the number of logical cycles is extended artificially in order to exceed the runtime of a single T-factory.|
|Quantum operations per second (rQOPS)| The number of reliable quantum operations, that is, operations that are implemented using quantum error correction in order to achieve operational error rates. rQOPS is normalized to seconds to quantify the capability of a machine without being tied to the runtime of any particular algorithm. This number is computed as $\text{Logical qubits}*\text{Clock frequency}$, where $\text{Clock frequency}$ is the number of logical cycles per second.|
|Physical qubits |Total number of physical qubits, which is the sum of the number of physical qubits to implement the algorithm logic, and the number of physical qubits for running the T factories that are responsible to produce the required T states that are consumed by the algorithm.|

The quantity rQOPS provides a simple way to capture the overall system capability by combining several aspects of the system. The number of logical qubits captures the size of the largest application that can be run. The clock frequency distills the underlying physical qubit's gate speeds and the performance of the error correction scheme that runs on top of the physical qubits.

### Resource estimates breakdown

The breakdown of the resource estimates report contains the following entries:

|Report data name|Description|
|---|----|
|Logical algorithmic qubits|Laying out the logical qubits in the presence of nearest-neighbor constraints requires extra logical qubits. In particular, to lay out the number of logical qubits in the input algorithm, we require in total $2 \cdot \text{Logical qubit count (pre-layout)} + \cdot \lceil \sqrt{8 \cdot \text{Logical qubit count (pre-layout)}}\rceil + 1$ logical qubits.|
|Algorithmic depth |  To execute the algorithm using multi-qubit measurements, one multi-qubit measurement is required for the total single-qubit measurements, the arbitrary single-qubit rotations, and the  T gates in the input quantum program (pre-layout); three multi-qubit measurements for each of the CCZ gates, and CCiX gates in the input program, as well as the number of T gates per rotation for multi-qubit measurements for each of the non-Clifford layers, *Rotation depth*, in which there is at least one single-qubit rotation with an arbitrary angle rotation.|
|Logical depth | This number is usually equal to the logical depth of the algorithm. However, in the case in which a single T factory is slower than the execution time of the algorithm, we adjust the logical cycle depth to exceed the T factory's execution time.|
|Number of T states |  To execute the algorithm, we require one T state for each of the T gates, four T states for each of the CCZ gates and CCiX gates, as well as the same number of T gates per rotation for each of the single-qubit rotation gates with arbitrary angle rotation. |
|Number of T factories | The total number of T factories that are executed in parallel is computed as $\dfrac{\text{number of T states} \cdot \text{T factory duration}}{\text{number of T states per T factory} \cdot \text{Algorithm runtime}}$|
|Number of T factory invocations| In order to prepare the required number of T states, the number of T factories copies are repeatedly *T factory runs* times.|
|Physical algorithmic qubits | The physical algorithmic qubits are the product of the logical algorithmic qubits required after layout and the number of physical qubits that encode a single logical qubit.|
|Physical T factory qubits |  Each T factory requires the number of physical qubits described in *T factory parameters* and the total number of T factories are run in parallel, therefore $\text{Physical T factory qubits} = \text{Physical qubits for a single T factory} \cdot \text{Number of T factories}$ qubits are needed.|
| Required logical qubit error rate | The required logical qubit error rate is obtained by dividing the logical error probability by the product of the number of logical qubits required for the algorithm after layout and the total cycle count, *Logical depth*, required for the algorithm. |
| Required logical T state error rate | The required T state error rate is obtained by dividing the T distillation error probability by the total number of T states.|
|Number of T states per rotation| The number of T states required to implement a rotation with an arbitrary angle is $\lceil 0.53 \log_2(\text{Number of rotation gates (pre-layout)} / \text{Rotation synthesis error probability}) + 5.3\rceil$ [[arXiv:2203.10064](https://arxiv.org/abs/2203.10064)]. For simplicity, this formula is used for all single-qubit arbitrary angle rotations, and doesn't distinguish between best, worst, and average cases. |

### Logical qubit parameters

The logical qubit parameters report contains the following entries:

|Report data name|Description|
|---|----|
|QEC scheme|You can load pre-defined QEC schemes by using the name `surface_code` or `floquet_code`. The latter only works with Majorana qubits. |
|Code distance | The code distance is the smallest odd integer greater or equal to $\dfrac{2\log(\text{Crossing prefactor} / \text{Required logical qubit error rate})}{\log(\text{Error correction threshold}/\text{Single-qubit measurement error rate})} - 1$|
|Physical qubits| The number of physical qubits per logical qubit are evaluated using the physical qubits formula for the QEC scheme, that can be user-specified.|
|Logical cycle time | The runtime of one logical cycle in nanoseconds is evaluated using the physical qubits formula for the QEC scheme, that can be user-specified.|
|Logical qubit error rate |  The logical qubit error rate is computed as $\text{crossing prefactor} \cdot \left(\dfrac{\text{Single-qubit measurement error rate}}{\text{Error correction threshold}}\right)^\frac{\text{Code distance} + 1}{1}$|
|Crossing prefactor | The crossing prefactor is extracted numerically from simulations when fitting an exponential curve to model the relationship between logical and physical error rate.|
|Error correction threshold | The error correction threshold is the physical error rate below which the error rate of the logical qubit is less than the error rate of the physical qubit that constitute it. This value is usually extracted numerically from simulations of the logical error rate.|
|Logical cycle time formula| The formula that is used to compute the logical cycle time.|
|Physical qubits formula | The formula that is used to compute the number of physical qubits per logical qubits.|

### T factory parameters

The T factory report contains the following entries:

|Report data name|Description|
|---|----|
|Physical qubits|This corresponds to the maximum number of physical qubits over all rounds of T distillation units in a T factory. A round of distillation contains of multiple copies of distillation units to achieve the required success probability of producing a T state with the expected logical T state error rate.|
|Runtime |The runtime of a single T factory is the accumulated runtime of executing each round in a T factory.|
|Number of output T states per run|  The T factory takes as input the number of input T states per run with a T gate error rate set in the physical qubit parameters and produces this number of T states with the error rate described in "logical T state error rate".|
|Number of input T states per run |  This value includes the physical input T states of all copies of the distillation unit in the first round.|
|Distillation rounds|This is the number of distillation rounds. In each round one or multiple copies of some distillation unit is executed.|
|Distillation units per round|  Te number of copies for the distillation units per round.|
|Distillation units|The types of distillation units that are executed in each round. The units can be either physical or logical, depending on what type of qubit they are operating. Space-efficient units require fewer qubits for the cost of longer runtime compared to Reed-Muller preparation units.|
|Distillation code distances|The code distance used for the units in each round. If the code distance is 1, then the distillation unit operates on physical qubits instead of error-corrected logical qubits.|
|Number of physical qubits per round| The maximum number of physical qubits over all rounds is the number of physical qubits required for the T factory, since qubits are reused by different rounds.|
|Runtime per round|The runtime of the T factory is the sum of the runtime in all rounds.|
|Logical T state error rate |  The logical T state error rate achieved by the T factory which is equal or smaller than the required error rate $\frac{\text{physicalCountsFormatted}}{\text{requiredLogicalTstateErrorRate}}$.|

### Pre-layout logical resources

The pre-layout logical resources report contains the following entries:

|Report data name|Description|
|---|----|
|Logical qubits (pre-layout)|The number of logical algorithmic qubits is determined from this number by assuming to align them in a 2D grid. Auxiliary qubits are added to allow for sufficient space to execute multi-qubit Pauli measurements on all or a subset of the logical qubits.|
|T gates |This includes all T gates and adjoint T gates, but not T gates required to implement rotation gates with arbitrary angle, CCZ gates, or CCiX gates.|
|Rotation gates| Number of all rotation gates. If an angle corresponds to a Pauli, Clifford, or T gate, it is not accounted for in this number.|
|Rotation depth | Number of all non-Clifford layers that include at least one single-qubit rotation gate with an arbitrary angle.|
|CCZ gates  | Number of CCZ gates in the input quantum program. |
|CCiX gates  | Number of CCiX gates in the input quantum program, which applies $-iX$ controlled on two control qubits.|
|Measurement operations | Number of single qubit measurements in Pauli basis that are used in the input program. Note that all measurements are counted, however, the measurement result is is determined randomly (with a fixed seed) to be 0 or 1 with a probability of 50%.|

### Assumed error budget

The assumed error budget report contains the following entries:

|Report data name|Description|
|---|----|
|Total error budget | The total error budget sets the overall tolerated error for the algorithm, that is, the allowed failure probability of the algorithm. Its value must be between 0 and 1. The default value is 0.001 (corresponding to 0.1%), which means that the algorithm is allowed to fail a maximum of once in 1000 executions. If there are no rotation gates in the input algorithm, the error budget is uniformly distributed to logical errors and T state errors.|
|Logical error probability | Probability of at least one logical error. It's one third of the total error budget if the input algorithm contains rotation gates with arbitrary angles, or one half of it, otherwise.|
|T distillation error probability | Probability of at least one faulty T distillation, which  is one third of the total error budget if the input algorithm contains rotation with gates with arbitrary angles, or one half of it, otherwise.|
|Rotation synthesis error probability | Probability of at least one failed rotation synthesis, which is one third of the total error budget.|

## Output parameters

In Jupyter Notebook in VS Code, you can programmatically access the output data of the resource estimation report. For example, the following code snippet shows how to access the resource estimation parameters.

```python
result['job_params']
```

The following output data constitutes the possible entries that can be access programmatically.

|Top-level output parameter|Data type|Description|
|---|----|----|
|`status`|string| The status of the job, it's always `Succeeded`.|
|`job_params`| dictionary| The target parameters of the job that are passed as input.|
|`physical_counts`| dictionary| The physical resource estimates. For more information, see [Physical counts](#physical-counts).|
|`physical_counts_formatted`| dictionary| The physical resource estimates formatted for display in report data. For more information, see [Physical counts formatted](#physical-counts-formatted).|
|`logical_qubit`| dictionary| The logical qubit properties. For more information, see [Logical qubit](#logical-qubit).|
|`tfactory`| dictionary| The T factory properties.|
|`logical_counts`| dictionary| The pre-layout logical resource estimates. For more information, see [Logical counts](#logical-counts).|
|`report_data`| dictionary| Generation data for resource estimation report.|

### Physical counts

The `physical_counts` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`physical_qubits`|number| The total number of physical qubits.|
|`runtime`|number| The total runtime to execute the algorithm in nanoseconds.|
|`rqops`| number| The number of reliable quantum operations per second (QOPS).|
| `breakdown` |dictionary |Breakdown of estimates. For more information, see [Physical counts breakdown](#physical-counts-breakdown).|

#### Physical counts breakdown

The `breakdown` dictionary of `physical_counts` contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`algorithmic_logical_qubits`| number| The logical qubits required for running the algorithm and do not include resources for T factories. |
|`algorithmic_logical_depth`|  number | The logical cycles required for running the algorithm and do not include resources for T factories. |
|`logical_depth`| number |The possibly adjusted number of cycles that is computed whenever the T factory execution time is faster then algorithm execution. |
|`num_tstates`| number |The number of T states consumed by the algorithm.|
|`clock_frequency`| number |The number of logical cycles per second.|
|`num_tfactories`| number | The number of T factories (assuming uniform T factory design).|
|`num_tfactory_runs`| number | The number of how often all parallel T factories should run.|
|`physical_qubits_for_tfactories`| number| The number of physical qubits for all T factories.|
|`physical_qubits_for_algorithm`| number| The number of physical qubits for algorithm layout.|
|`required_logical_qubit_error_rate`| number| The required logical error rate.|
|`required_logical_tstate_error_rate`| number| The required logical T state error rate.|
|`num_ts_per_rotation`| number | The number of T gates per rotation.|
|`clifford_error_rate`| number | The Clifford error rate based on the qubit parameters.|

### Physical counts formatted

The `physical_counts_formatted` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`runtime`|string| Total runtime as human friendly string.|
|`rqops`|string | The number of reliable quantum operations per second (QOPS) formatted with metric suffix.|
|`physical_qubits`|string| Total number of physical qubits with metric suffix.|
|`algorithmic_logical_qubits`|string|Algorithmic logical qubits with metric suffix.|
|`algorithmic_logical_depth`|string| Algorithmic logical depth with metric suffix.|
|`logical_depth`|string|Possibly adjusted algorithmic logical depth with metric suffix.|
|`num_tstates`|string|Number of T states with metric suffix.|
|`num_tfactories`|string|Number of T factory copies with metric suffix.|
|`num_tfactory_runs`|string|Number of T factory runs with metric suffix.|
|`physical_qubits_for_algorithm`|string|Number of physical qubits for algorithm with metric suffix.|
|`physical_qubits_for_tfactories`|string|Number of physical qubits for T factories with metric suffix.|
|`physical_qubits_for_tfactories_percentage`|string|The number of physical qubits for all T factories in percentage to total.|
|`required_logical_qubit_error_rate`|string|Truncated required logical qubit error rate.|
|`required_logical_tstate_error_rate`|string|Truncated required T state error rate.|
|`physical_qubits_per_logical_qubit`|string|Number of physical qubits per logical qubit with metric suffix.|
|`logical_cycle_time`|string|The logical cycle time of a logical qubit as human friendly string.|
|`clock_frequency`|string|The number of logical cycles per second as a human friendly string.|
|`logical_error_rate`|string|Truncated logical error rate.|
|`tfactory_physical_qubits`|string|Number of physical qubits in T factory with metric suffix (or message that there is no T factory).|
|`tfactory_runtime`|string|The runtime of a single T factory as human friendly string (or message that there is no T factory).|
|`num_input_tstates`|string|The number of input T states (or message that there is no T factory).|
|`num_units_per_round`|string|The number of units per distillation round, comma separated in a string (or message that there is no T factory).|
|`unit_name_per_round`|string|The unit names of each distillation round, comma separated in a string (or message that there is no T factory).|
|`code_distance_per_round`|string|The code distances per distillation round, comma separated in a string (or message that there is no T factory).|
|`physical_qubits_per_round`|string|The number of physical qubits per distillation round, comma separated in a string (or message that there is no T factory).|
|`tfactory_runtime_per_round`|string|The runtime of each distillation round, displayed as comma separated human friendly strings (or message that there is no T factory).|
|`tstate_logical_error_rate`|string|Truncated logical T state error rate (or message that there is no T factory).|
|`logical_counts_num_qubits`|string|Number of qubits (pre-layout) with metric suffix.|
|`logical_counts_t_count`|string|Number of T gates (pre-layout) with metric suffix.|
|`logical_counts_rotation_count`|string|Number of rotation gates (pre-layout) with metric suffix.|
|`logical_counts_rotation_depth`|string|Rotation depth (pre-layout) with metric suffix.|
|`logical_counts_ccz_count`|string|Number of CCZ gates (pre-layout) with metric suffix.|
|`logical_counts_ccix_count`|string|Number of CCiX gates (pre-layout) with metric suffix.|
|`logical_counts_measurement_count`|string|Number of single-qubit measurements (pre-layout) with metric suffix.|
|`error_budget`|string|Truncated total error budget.|
|`error_budget_logical`|string|Truncated error budget for logical error.|
|`error_budget_tstates`|string|Truncated error budget for faulty T state distillation.|
|`error_budget_rotations`|string|Truncated error budget for faulty rotation synthesis.|
|`num_ts_per_rotation`|string|Formatted number of Ts per rotation (might be None).|

### Logical qubit

The `logical_qubit` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`code_distance`|number|The computed code distance for the logical qubit.|
|`physical_qubits`|number| The number of physical qubits for each logical qubit.|
|`logical_cycle_time`|number| The time to execute one logical operation.|
|`logical_error_rate`|number| The logical error rate of the logical qubit.|


### Logical counts

The `logical_counts` dictionary contains the following entries:

|Output parameter|Data type|Description|
|---|----|----|
|`num_qubits`|number| Pre-layout number of qubits.|
|`t_count`|number| Pre-layout number of T gates.|
|`rotation_count`|number| Pre-layout number of rotation gates.|
|`rotation_depth`|number| Pre-layout rotation depth.|
|`ccz_count`|number| Pre-layout number of CCZ gates.|
|`ccix_count`|number| Pre-layout number of CCiX gates.|
|`measurement_count`|number| Pre-layout number of single-qubit measurements.|

## Space diagram

The overall physical resource estimation consists of total number of physical qubits used for both the algorithm and T factory copies. You can inspect the distribution between these two using the space diagram.

The space diagram shows the proportion of the physical qubits used for the algorithm and the [T factories](xref:microsoft.quantum.concepts.tfactories). Note that the number of T factory copies contributes to the number of physical qubits for T factories.

In Jupyter Notebook, you can access the space diagram using the `SpaceChart` widget from the `qsharp-widgets` package.

```python
import qsharp

from qsharp_widgets import SpaceChart
SpaceChart(result)
```

:::image type="content" source="media/resource-estimator-space-diagram.png" alt-text="Pie diagram showing the distribution of total physical qubits between algorithm qubits and T factory qubits. There's a table with the breakdown of number of T factory copies and number of physical qubits per T factory.":::

When running multiple configurations of target parameters with the the [Pareto frontier estimation](xref:microsoft.quantum.overview.resources-estimator#pareto-frontier-estimation), you can plot the space diagram for a specific solution of the. For example, the following code shows how to plot the space diagram for the first configuration of parameters and the third shortest runtime.

```python
SpaceChart(result[0], 2) # First (estimate index=0) run and third (point index=2) shortest runtime
```

## Space-time diagram

In quantum computing, there's a tradeoff between the number of physical qubits and the runtime of the algorithm. You could consider allocation of as many physical qubits as possible to reduce the runtime of the algorithm. However, the number of physical qubits is limited by the number of physical qubits available in the quantum hardware. Understanding the tradeoff between runtime and system scale is one of the more important aspects of resource estimation. 

When estimating the resources of an algorithm, you can use the space-time diagram to visualize the tradeoffs between the number of physical qubits and the runtime of the algorithm.

> [!NOTE]
> To see multiple optimal combinations in the space-time diagram, you need to set the estimation type to [Pareto frontier estimation](xref:microsoft.quantum.overview.resources-estimator#pareto-frontier-estimation).

The space-time diagram allows you to find the optimal combination of $\text{\{number of qubits, runtime\}}$ pairs that satisfy the constraints of the quantum hardware. The diagram shows the number of physical qubits and the runtime of the algorithm for each $\text{\{number of qubits, runtime\}}$ pair.

```python
import qsharp

from qsharp_widgets import EstimatesOverview

EstimatesOverview(result, colors=["#1f77b4", "#ff7f0e"], runNames=["e4 Surface Code", "e6 Floquet Code"])
```

:::image type="content" source="media/qubit-time-diagram-shorRE.png" alt-text="Screenshot showing the qubit-time diagram of the Resource Estimator.":::

> [!TIP]
> To see the estimation details, you can hover over each point in the diagram.

## Next steps

- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Tutorial: Submit a QIR program to the Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)