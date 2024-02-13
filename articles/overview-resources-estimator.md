---
author: SoniaLopezBravo
description: Learn about the input parameters of the Resource Estimator in Azure Quantum and how to customized them.
ms.date: 12/04/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', target, targets]
title: Resource Estimator Target Parameters
uid: microsoft.quantum.overview.resources-estimator
---

# Customize the target parameters of the Resource Estimator

This article shows how to customize the target parameters of the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator) to match the machine characteristics that you're targeting. The Resource Estimator uses these parameters to estimate the resources required to run a quantum algorithm on a quantum computer.

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator).

## Prerequisites

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets 
    ```

## Target parameters

The Resource Estimator computes the estimation of resources, such the number of qubits and the run time, which would be required to implement a given quantum algorithm using a given qubit technology and with a fixed set of architectural choices.  

Therefore, the Resource Estimator takes a set of inputs, with pre-defined values to easily get you started:

- A [physical qubit model](#physical-qubit-parameters), which defines the properties of the underlying physical qubits.
- A [Quantum Error Correction (QEC) scheme](#quantum-error-correction-schemes), which is the assumed quantum error correction scheme.
- An [error budget](#error-budget), which is the overall allowed error, that is, the number of times the program is allowed to unsuccess.
- [Constraints](#constraints) on the component-level, which are the number of logical cycles and the number of T factory copies.
- [Distillation units](#distillation-units) to specify T factories distillation algorithms.
- [Pareto frontier estimation](#pareto-frontier-estimation) to run multiple estimates of number of qubits and runtime for the same algorithm.

## Physical qubit parameters

When the Resource Estimator models the physical qubit assumptions, it uses two different physical instruction sets to operate the qubits. The physical instruction set can be either *gate-based* or *Majorana*. A gate-based instruction set provides single-qubit measurement, single-qubit gates (including T gates), and two-qubit gates. A Majorana instruction set provides a physical T gate, single-qubit measurement and two-qubit joint measurement operations.

You can choose from six predefined qubit parameters, four of which have gate-based instruction sets and two with a Majorana instruction set. These qubit models cover a range of operation times and error rates, enabling sufficient exploration of the resource costs needed to enable practical quantum applications.

|Qubit model|Python identifier|Description|
|----|----|-----|
|`"qubit_gate_ns_e3"` , `"qubit_gate_ns_e4"`|`GATE_NS_E3` , `GATE_NS_E4`|Operation times and fidelities may correspond to future versions of [superconducting transmon qubits](https://arxiv.org/abs/2003.00024), or [spin qubits](https://arxiv.org/abs/2111.11937), which typically have operation times in the nanosecond regime. For these qubits, gate and measurement operations are assumed to take 50 ns and 100 ns, respectively. Single-qubit and two-qubit gate error rates are assumed to be $10^{-3}$ as a realistic target, and $10^{-4}$ as an optimistic target for a scaled up system.|
|`"qubit_gate_us_e3"` , `"qubit_gate_us_e4"`|`GATE_US_E3` , `GATE_US_E4`|Operation times and fidelities may correspond to future versions of qubits based on [ions](https://arxiv.org/abs/1701.04195), which typically have operations times in the microsecond regime. Based on typical assumptions for ion qubits, gate and measurement operations are assumed to take 100 µs. Error rate for single-qubit Clifford gates is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target, while the error rate for single-qubit non-Clifford gates (T gate) is $10^{-6}$. For two-qubit gates, the error rate is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target. |
|`"qubit_maj_ns_e4"` , `"qubit_maj_ns_e6"`|`MAJ_NS_E4` , `MAJ_NS_E6`|Operation times and fidelities may correspond to future improved versions of [Majorana qubits](https://arxiv.org/abs/1610.05289). For these qubits, gate and measurement operations are assumed to take 100 ns. To account for topological protection in the hardware, single-qubit and two-qubit joint measurement error rates (Clifford error rates) are assumed to be $10^{-4}$ as a realistic target, and $10^{-6}$ as an optimistic target. Non-Clifford operations in this architecture don't have topological protection, error rate for non-Clifford physical T gates is 5%.|

> [!NOTE]
> Unless other value is specified, the default value for the qubit model is `"qubit_gate_ns_e3"`.

For reference, the complete predefined qubit parameters are as follows:

```python
{
    "qubitParams": {
        "name": "qubit_gate_ns_e3",
        "instructionSet": "GateBased",
        "oneQubitMeasurementTime": "100 ns",
        "oneQubitGateTime": "50 ns",
        "twoQubitGateTime": "50 ns",
        "tGateTime": "50 ns",
        "oneQubitMeasurementErrorRate": 1e-3,
        "oneQubitGateErrorRate": 1e-3,
        "twoQubitGateErrorRate": 1e-3,
        "tGateErrorRate": 1e-3
    }
}

{
    "qubitParams": {
        "name": "qubit_gate_ns_e4",
        "instructionSet": "GateBased",
        "oneQubitMeasurementTime": "100 ns",
        "oneQubitGateTime": "50 ns",
        "twoQubitGateTime": "50 ns",
        "tGateTime": "50 ns",
        "oneQubitMeasurementErrorRate": 1e-4,
        "oneQubitGateErrorRate": 1e-4,
        "twoQubitGateErrorRate": 1e-4,
        "tGateErrorRate": 1e-4
    }
}

{
    "qubitParams": {
        "name": "qubit_gate_us_e3",
        "instructionSet": "GateBased",
        "oneQubitMeasurementTime": "100 µs",
        "oneQubitGateTime": "100 µs",
        "twoQubitGateTime": "100 µs",
        "tGateTime": "100 µs",
        "oneQubitMeasurementErrorRate": 1e-3,
        "oneQubitGateErrorRate": 1e-3,
        "twoQubitGateErrorRate": 1e-3,
        "tGateErrorRate": 1e-6
    }
}

{
    "qubitParams": {
        "name": "qubit_gate_us_e4",
        "instructionSet": "GateBased",
        "oneQubitMeasurementTime": "100 µs",
        "oneQubitGateTime": "100 µs",
        "twoQubitGateTime": "100 µs",
        "tGateTime": "100 µs",
        "oneQubitMeasurementErrorRate": 1e-4,
        "oneQubitGateErrorRate": 1e-4,
        "twoQubitGateErrorRate": 1e-4,
        "tGateErrorRate": 1e-6
    }
}

{
    "qubitParams": {
        "name": "qubit_maj_ns_e4",
        "instructionSet": "Majorana",
        "oneQubitMeasurementTime": "100 ns",
        "twoQubitJointMeasurementTime": "100 ns",
        "tGateTime": "100 ns",
        "oneQubitMeasurementErrorRate": 1e-4,
        "twoQubitJointMeasurementErrorRate": 1e-4,
        "tGateErrorRate": 0.05
    }
}

{
    "qubitParams": {
        "name": "qubit_maj_ns_e6",
        "instructionSet": "Majorana",
        "oneQubitMeasurementTime": "100 ns",
        "twoQubitJointMeasurementTime": "100 ns",
        "tGateTime": "100 ns",
        "oneQubitMeasurementErrorRate": 1e-6,
        "twoQubitJointMeasurementErrorRate": 1e-6,
        "tGateErrorRate": 0.01
    }
}
```

### Passing predefined qubit parameters

There are two ways to programmatically specify predefined qubit parameters. You can select the qubit model name for the `qubitParams` class when running `qsharp.estimate`. For example, to select `"qubit_maj_ns_e6"` qubit parameter, write:

```python
qsharp.estimate("RunProgram()", params=
                {"qubitParams": {
                        "name": "qubit_maj_ns_e6"
                    },
                })
```

You can also pass a list of estimation parameters to the `EstimatorParams` class. For example, to select `MAJ_NS_E6` qubit parameter, write:

```python
from qsharp.estimator import EstimatorParams, QubitParams

params = EstimatorParams()
params.qubit_params.name = QubitParams.MAJ_NS_E6 # qubit_maj_ns_e6 qubit parameter

qsharp.estimate("RunProgram()", params=params)
```

### Customize predefined qubit parameters

You can customize predefined qubit parameters by specifying the name and then updating any of the other values. For example, to decrease the error rate of two-qubit joint measurement in "qubit_maj_ns_e4", write:

```python
qsharp.estimate("RunProgram()", params=
                {"qubitParams": {
                        "name": "qubit_maj_ns_e4",
                        "twoQubitJointMeasurementErrorRate": 1e-5,
                    },
                })
```

Or, you can pass the instructions in the form of a list.

```python
from qsharp.estimator import EstimatorParams, QubitParams

params = MicrosoftEstimatorParams()
params.qubit_params.name = QubitParams.MAJ_NS_E4
params.qubit_params.two_qubit_joint_measurement_error_rate = 1e-5
```

#### Qubit parameters for Gate-based qubits

| Python identifier                   |Data type  | Description                                                        |
|----------------------------- |----| ------------------------------------------------------------------|
| `name`                       | string|  Name for the qubit model                          |
| `instruction_set`              | "gate_based"| Underlying qubit technology |
| `one_qubit_measurement_time`     | time string|   Operation time for single-qubit measurement ($t_{\rm meas}$) in ns |
| `one_qubit_gate_time`             | time string|  Operation time for single-qubit gate ($t_{\rm gate}$) in ns        |
| `two_qubit_gate_time`             | time string|  Operation time for two-qubit gate in ns                            |
| `t_gate_time`             | time string| Operation time for single-qubit non-Clifford gate in ns|
| `one_qubit_measurement_error_rate` | float| Error rate for single-qubit measurement   |
| `one_qubit_gate_error_rate`        | float| Error rate for single-qubit Clifford gate ($p$)                    |
| `two_qubit_gate_error_rate`        |float|  Error rate for two-qubit Clifford gate                             |
| `t_gate_error_rate`              | float|Error rate to prepare single-qubit non-Clifford state ($p_T$)      |
| `idle_error_rate`                 | float|Error rate corresponding to idling                                   |

The following code shows how to specify custom qubit parameters for a gate-based instruction set:

```python
from qsharp.estimator import EstimatorParams, QubitParams,

params = EstimatorParams()

params.qubit_params.name = "your_custom_name"
params.qubit_params.instruction_set = "gate_based"
params.qubit_params.t_gate_error_rate = 0.03
params.qubit_params.t_gate_time = "10 ns"
params.qubit_params.idle_error_rate = 0.02
```

> [!NOTE]
> When not specified, the values for `two_qubit_gate_time` and `t_gate_time` default to `one_qubit_gate_time`, the values for `two_qubit_gate_error_rate` and `t_gate_error_rate` default to `one_qubit_gate_error_rate`, and the value for `idle_error_rate` defaults to `one_qubit_measurement_error_rate`.

#### Qubit parameters for Majorana qubits

| Python identifier             | Data type  | Description                                                        |
|----------------------------- |----| ------------------------------------------------------------------|
| `name`                       | string|  Name for the qubit model                          |
| `instruction_set`            | "majorana"| Underlying qubit technology  |
| `one_qubit_measurement_time` | time string|  Operation time for single-qubit measurement ($t_{\rm meas}$) in ns |
| `two-qubit_joint_measurement_time` |time string|  Operation time for two-qubit measurement in ns                     |
| `t_gate_time`                | time string|  Operation time for single-qubit non-Clifford gate in ns|
| `one_qubit_measurement_error_rate`  | float| Error rate for single-qubit measurement   |
| `two_qubit_joint_measurement_error_rate`  | float| Error rate for two-qubit measurement                               |
| `t_gate_error_rate`           | float| Error rate to prepare single-qubit non-Clifford state ($p_T$)      |
| `idle_error_rate`             | float| Error rate corresponding to idling                                  |

A minimum template for Majorana based instruction set with all required values is:

```python
from qsharp.estimator import EstimatorParams, QubitParams,

params = EstimatorParams()

params.qubit_params.name = "your_custom_name"
params.qubit_params.instruction_set = "majorana"
params.qubit_params.one_qubit_measurement_time = "10 ns"
params.qubit_params.one_qubit_measurement_error_rate = 0.01
```

> [!NOTE]
> When not specified, the values for `two_qubitJointMeasurementTime` and `t_gate_time` default to `one_qubit_measurement_time`, the values for `two_qubit_joint_measurement_error_rate` and `t_gate_error_rate` default to `one_qubit_measurement_error_rate`, and the value for `idle_error_rate` defaults to `one_qubit_measurement_error_rate`.

For `one_qubit_measurement_error_rate` and `two_qubit_joint_measurement_error_rate`, you can specify the error rates corresponding to measurement readouts, `readout`, and measurement processing, `process`. These values can be either `<double>` numbers or pairs of numbers. For example:

```python
params.qubit_params.two_qubit_joint_measurement_error_rate = \
    MeasurementErrorRate(process=0.00005, readout=0.00007)
```

> [!NOTE]
> If you specify a single numeric value for single-qubit and two-qubit error rates in Majorana qubit measurement, both readout and process error rates may be equal.

> [!IMPORTANT]
> All values that aren't specified will take a default value, for example, specifying `"qubit": {"oneQubitGateTime":"200 ns"}` will model a gate-based qubit in which both the two-qubit gate time and the one-qubit gate time are 200 ns. For units, you need to specify time strings, which are double-precision floating point numbers, followed by a space and the time unit for such values, where possible time suffixes are `ns`, `µs` (or `us`), `ms`, and `s`.  

## Quantum error correction schemes

To execute practical-scale quantum applications, quantum operations should have low error rates. These error rate targets are typically beyond the capabilities of raw physical qubits. To overcome this limitation, quantum error correction (QEC) and fault-tolerant computation are two crucial techniques that form the building blocks of large-scale quantum computers. First, QEC allows us to compose multiple error-prone physical qubits and build a more reliable logical qubit that preserves quantum information better than the underlying physical qubits.

The error correction code distance (or just code distance for short) is a parameter that controls the number of errors that can be corrected. Thus, the error rate of the logical qubits and the number of physical qubits that are required to encode them. Both accuracy and the number of physical qubits increase with code distance. The goal is to find the minimum code distance that can achieve the required error rate set for a particular application.

The Resource Estimator uses the following formula for modeling logical error rates using an exponential model,

$$ P = a\left(\frac{p}{p^\*}\right)^{\frac{d+1}{2}} $$

where $d$ is the code distance, $p$ is the physical error rate, and $p^\*$ is the quantum error correction threshold. The physical error rate $p$ is extracted from the qubit parameters as the worst-case error rate any physical Clifford operation in the device.

In particular, $p = {}$ max(`one_qubit_measurement_error_rate`, `one_qubit_gate_error_rate`, `two_qubit_gate_error_rate`) for qubit parameters with a gate-based instruction set, and $p = {}$ max(`one_qubit_measurement_error_rate`, `two_qubit_joint_measurement_error_rate`) for qubit parameters with a Majorana instruction set. QEC schemes typically have an error rate threshold $p^\*$ below which error correction suppresses errors.

|QEC protocol|Python identifier|Description|
|----|----|-----|
|"`surface_code`"|`SURFACE_CODE`| The gate-based surface code is based on [arXiv:1208.0928](https://arxiv.org/abs/1208.0928) and [arXiv:1009.3686](https://arxiv.org/abs/1009.3686). The Majorana surface code is based on [arXiv:1909.03002](https://arxiv.org/abs/1909.03002) and [arXiv:2007.00307](https://arxiv.org/abs/2007.00307).|
|"`floquet_code`"| `FLOQUET_CODE`|Only for Majorana qubits. The floquet code is based on [arXiv:2202.11829](https://arxiv.org/abs/2202.11829).|

> [!NOTE]
> Unless other value is specified, the default value for the QEC scheme is "surface_code".

The exact parameters for each predefined QEC scheme (including a crossing pre-factor $a$, which can be extracted numerically for simulations) are the following.

```python
{
    "qubitParams": {
        "instructionSet": "GateBased",
    }
    "qecScheme": {
        "name": "surface_code",
        "errorCorrectionThreshold": 0.01,
        "crossingPrefactor": 0.03,
        "logicalCycleTime": "(4 * twoQubitGateTime + 2 * oneQubitMeasurementTime) * codeDistance",
        "physicalQubitsPerLogicalQubit": "2 * codeDistance * codeDistance"
    }
}

{
    "qubitParams": {
        "instructionSet": "Majorana",
    }
    "qecScheme": {
        "name": "surface_code",
        "errorCorrectionThreshold": 0.0015,
        "crossingPrefactor": 0.08,
        "logicalCycleTime": "20 * oneQubitMeasurementTime * codeDistance",
        "physicalQubitsPerLogicalQubit": "2 * codeDistance * codeDistance"
    }
}

{
    "qubitParams": {
        "instructionSet": "Majorana",
    }
    "qecScheme": {
        "name": "floquet_code",
        "errorCorrectionThreshold": 0.01,
        "crossingPrefactor": 0.07,
        "logicalCycleTime": "3 * oneQubitMeasurementTime * codeDistance",
        "physicalQubitsPerLogicalQubit": "4 * codeDistance * codeDistance + 8 * (codeDistance - 1)"
    }
}
```

### Passing predefined QEC schemes

There are two ways to specify predefined QEC schemes. You can select the QEC model name for the `"qecScheme"` class when running `qsharp.estimate`. For example, to select the floquet code, write:

```python
qsharp.estimate("RunProgram()", params=
                {"qecScheme": {
                        "name": "floquet_code"
                    }
                })
```

You can also pass a list of estimation parameters to the `EstimatorParams` class. For example, to select the floquet code, write:

```python
from qsharp.estimator import EstimatorParams, QubitParams, QECScheme,

params = EstimatorParams()
params.items.qec_scheme.name = QECScheme.FLOQUET_CODE # floquet code QEC scheme

qsharp.estimate("RunProgram()", params=params)
```

### Customize predefined QEC schemes

You can customize predefined QEC schemes by specifying the name and then updating any of the other values. For example, to increase the crossing pre-factor in the floquet code, write:

```python
qsharp.estimate("RunProgram()", params=
                {"qecScheme": {
                        "name": "floquet_code",
                        "crossingPrefactor": 0.07,
                    }
                })
```

> [!NOTE]
> When not specified, the values for `"logicalCycleTime"` and `"physicalQubitsPerLogicalQubit"` default to `"oneQubitMeasurementTime"`, the value for `"errorCorrectionThreshold"` defaults to `0.01`, and the value for `"crossingPrefactor"` defaults to `0.03`.

### Customize your QEC schemes

The Resource Estimator can abstract a customized QEC scheme based on the above formula by providing values for the `"crossingPrefactor"` $a$ and the `"errorCorrectionThreshold"` $p^\*$. Further, you need to specify the `"logicalCycleTime"`, that is, the time to execute a single logical operation, which depends on the code distance and the physical operation time assumptions of the underlying physical qubits. Finally, a second formula computes the `"physicalQubitsPerLogicalQubit"`, that is, the number of physical qubits required to encode one logical qubit based on the code distance.

You can use the following code as a template for QEC schemes:

```python
qsharp.estimate("RunProgram()", params=
                {"qecScheme": {
                        "crossingPrefactor": <double>,
                        "errorCorrectionThreshold": <double>,
                        "logicalCycleTime": <formula string>,
                        "physicalQubitsPerLogicalQubit": <formula string>
                    }
                })                
```

Inside the formulas, you can use the variables `one_qubit_gate_time`, `two_qubit_gate_time`, `one_qubit_measurement_time`, and `two_qubit_joint_measurement_time`, whose values are taken from the corresponding field from the [physical qubit parameters](#customize-predefined-qubit-parameters), as well as the variable `eccDistance` for the code distance computed for the logical qubit, based on the physical qubit properties, the error correction threshold, and the crossing prefactor. The time variables and `eccDistance` can be used to describe the `logicalCycleTime` formula. For the formula `physicalQubitsPerLogicalQubit` only the `eccDistance` can be used.

## Error budget

The total error budget $\epsilon$ sets the overall tolerated error for the algorithm, that is, the allowed failure probability of the algorithm. Its global value must be between 0 and 1, and the default value is 0.001, which corresponds to 0.1%. In other words, the algorithm is allowed to fail a maximum of once in 1000 executions. This parameter is highly application specific.

For example, if you're running Shor’s algorithm for factoring integers, a large value for the error budget may be tolerated as one can check that the outputs are indeed the prime factors of the input. On the other hand, a smaller error budget may be needed for an algorithm solving a problem with a solution, which can't be efficiently verified.

The error budget corresponds to the sum of three parts:

$$ \epsilon = \epsilon_{\log} + \epsilon_{\rm dis} + \epsilon_{\rm syn} $$

If no further specified, the error budget $\epsilon$ is uniformly distributed and applies to errors $\epsilon_{\log}$ to implement logical qubits, the error budget $\epsilon_{\rm dis}$ produces T states through distillation, and an error budget $\epsilon_{\rm syn}$ to synthesize rotation gates with arbitrary angles.

Note that for distillation and rotation synthesis, the respective error budgets $\epsilon_{\rm dis}$ and $\epsilon_{\rm syn}$ are uniformly distributed among all required T states and all required rotation gates, respectively. If there aren't rotation gates in the input algorithm, the error budget is uniformly distributed to logical errors and T state errors.

### Passing error budget

There are two ways to specify the error budget by setting a number between 0 and 1. You can pass the error budget when running `qsharp.estimate`. For example, to select an error budget of 1/3, write:

```python
qsharp.estimate("RunProgram()", params=
                {'errorBudget': 0.333
                })
```

You can also pass the error budget parameters to the `EstimatorParams` class.

```python
from qsharp.estimator import EstimatorParams, QubitParams, QECScheme,

params = EstimatorParams()
params.items.error_budget = 0.333 # error budget of 1/3

qsharp.estimate("RunProgram()", params=params)
```

Also, you can individually specify each component of the error budget. The sum of all values must be 1. If a quantum algorithm doesn't contain T states or rotations, then the values of `t_states` and `rotations` may be 0 respectively.

The following code shows how to specify the error budget parameter with T states and rotations:

```python
from qsharp.estimator import EstimatorParams, QubitParams,

params = EstimatorParams()
params.error_budget.logical = 0.01
params.error_budget.t_states = 0.02
params.error_budget.rotations = 0.03
```

## Constraints

You can use the `"constraints"` class to apply constraints on the [T factory](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-azure-quantum-resource-estimator) component-level. By adjusting constraints, you can optimize the estimates toward reducing the number of qubits or toward reducing the runtime.

|Parameter|Data type|Description|
|----|----|-----|
|`logical_depth_factor`|float| Control the execution time. If it has a value greater than 1, the initial number of logical cycles, also called *logical depth*, is multiplied by this number. By reducing `logical_depth_factor`, you can increase the number of invocation of the T factory in a given time, resulting in fewer T factory copies needed to produce the same number of T states. When you reduce the number of T factory copies, the algorithm runtime increases accordingly. The scaling factor for the total runtime may be larger, because the required logical error rate increases due to the additional number of cycles.|
|`max_t_factories`|integer| Maximum number of T factory copies. The Resource Estimator determines the resources required by selecting the optimal number of T factory copies that minimizes the number of physical qubits used, without considering the time overhead. The `max_t_factories` parameter limits the maximum number of copies, and therefore adjust the number of logical cycles accordingly. For more information, see [T factory physical estimation](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-azure-quantum-resource-estimator).|
|`max_duration`|time string| Maximum runtime for the algorithm. The Resource Estimator accepts only one of `max_duration` or `max_physical_qubits` constraints at the time but not two. If `max_duration` is specified, the Resource Estimator tries to find the best estimate for `max_physical_qubits` among solutions constrained by the maximal number specified.|
|`max_physical_qubits`|integer| Maximum number of physical qubits for the algorithm. The Resource Estimator accepts only one of `max_duration` or `max_physical_qubits` constraints at the time but not two. If `max_physical_qubits` is specified, the Resource Estimator tries to find the best estimate for `max_duration` among solutions constrained by the maximal number specified. |

The following code shows how to specify the constraints for a quantum algorithm:

```python
from qsharp.estimator import EstimatorParams

params = EstimatorParams()

params.constraints.max_duration = "1 s"
params.constraints.logical_depth_factor = 1.5
params.constraints.max_t_factories = 10
```

> [!NOTE]
> If the value provided to `max_duration` or `max_physical_qubits` is too small to find a feasible solution, the Resource Estimator returns an error. If neither `max_duration` nor `max_physical_qubits` constraints are specified, the Resource Estimator aims to find a solution with the shortest time.

> [!TIP]
> You can use `max_duration` and `max_physical_qubits` to influence the solution space, potentially finding solutions with longer runtime but a smaller number of qubits compared to solutions without these constraints. There exists a trade-off between runtime and the number of qubits, and this trade-off can be efficiently managed for some algorithms, with varying effects on different algorithms. Table IV in [[arXiv:2211.07629](https://arxiv.org/abs/2211.07629)] illustrates the effective utilization of the trade-off between the number of qubits and runtime for quantum dynamics algorithms. For more information, see [Quantum resource estimation with time or number of qubits constraints](https://github.com/microsoft/Quantum/blob/main/samples/azure-quantum/resource-estimation/estimation-time-qubits-constraints.ipynb) sample.

## Distillation units

You can provide specifications for T factories distillation algorithms with the `DistillationUnitSpecification` class. The specification can be either predefined or custom. You can specify a predefined specification by selecting the distillation unit name: `15-1 RM` or `15-1 space-efficient`.

```python
from qsharp.estimator import EstimatorParams, DistillationUnitSpecification

params = EstimatorParams()
unit = DistillationUnitSpecification()
unit.name = "15-1 RM" # predefined distillation unit

params.distillation_unit_specifications.append(unit)
```

In both cases, notation *15-1* stands for 15 input T states and 1 output T state. The `15-1 space-efficient` distillation unit uses fewer qubits than `15-1 RM` but requires more runtime. For more information, see [Table VI](https://arxiv.org/pdf/2211.07629.pdf#page=24).

> [!TIP]
> Using predefined distillation units provides better performance comparing with custom ones.

### Customize your distillation units

You can customize your own distillation units. The exact parameters for the distillation units are the following.

```python
qsharp.estimate("RunProgram()", params=
                    {"distillationUnitSpecifications": {
                        "displayName": <string>, 
                        "numInputTs": <int>,
                        "numOutputTs": <int>,
                        "failureProbabilityFormula": <string>,
                        "outputErrorRateFormula": <string>,
                        "physicalQubitSpecification": <protocol specific parameters>, 
                        "logicalQubitSpecification": <protocol specific parameters>, 
                        "logicalQubitSpecificationFirstRoundOverride": <protocol specific parameters>, # Only if "logicalQubitSpecification"
                        }
                })
```

All numeric parameters are expected to be positive. The `displayName` specifies how the distillation unit will be displayed in output results.

The following code shows how to specify the distillation unit parameters for a quantum algorithm using the `DistillationUnitSpecification` class.

```python
from qsharp.estimator import EstimatorParams, DistillationUnitSpecification, ProtocolSpecificDistillationUnitSpecification

params = EstimatorParams()
unit = DistillationUnitSpecification()
unit.display_name = "T"
unit.failure_probability_formula = "c"
unit.output_error_rate_formula = "r"
unit.num_input_ts = 1
unit.num_output_ts = 2

physical_qubit_specification = ProtocolSpecificDistillationUnitSpecification()
physical_qubit_specification.num_unit_qubits = 1
physical_qubit_specification.duration_in_qubit_cycle_time = 2
unit.physical_qubit_specification = physical_qubit_specification
```

The formulas for `failure_probability_formula` and `output_error_rate_formula` are custom formulas with basic arithmetic operations, constants and only three parameters:

- `clifford_error_rate`, also denoted as `c`.
- `readout_error_rate`, also denoted as `r`.
- `input_error_rate`, also denoted as `z`.
  
See the following examples of custom formulas using long and short notation. These examples illustrate formulas used by default within the standard implementation.

|Parameter|Long formula|Short formula|
|---|---|---|
|`failure_probability_formula`| "15.0 * input_error_rate + 356.0 * clifford_error_rate" | "15.0 * z + 356.0 * c" |
|`output_error_rate_formula`| "35.0 * input_error_rate ^ 3 + 7.1 * clifford_error_rate" | "35.0 * z ^ 3 + 7.1 * c" |

At least one of the parameters `physical_qubit_specification` or `logical_qubit_specification` should be provided. If only the former is provided, the distillation unit can be applied to physical qubits. If only the latter is provided, the distillation unit can be applied to logical qubits. If both are provided, the distillation unit can be applied to both types of qubits.

The parameter `logical_qubit_specification_first_round_override` can be provided only if `logical_qubit_specification` is specified. If so, it overrides values of `logical_qubit_specification` in case if applied at the first round of distillation. The value `<protocol specific parameters> ` that is required for `logical_qubit_specification_first_round_override` should follow the scheme:

```python
{
    "numUnitQubits": <int>,
    "durationInQubitCycleTime": <double>
}
```

## Pareto frontier estimation

When estimating the resources of an algorithm, it's important to consider the tradeoff between the number of physical qubits and the runtime of the algorithm. You could consider allocation of as many physical qubits as possible to reduce the runtime of the algorithm. However, the number of physical qubits is limited by the number of physical qubits available in the quantum hardware. Understanding the tradeoff between runtime and system scale is one of the more important aspects of resource estimation. 

The Pareto frontier estimation provides multiple estimates for the same algorithm, each showing tradeoffs between the number of qubits and the runtime.

> [!NOTE]
> If you run the Resource Estimator in Visual Studio Code using the **Q#: Calculate Resource Estimates** option, the Pareto frontier estimation is enabled by default.

If you run the Resource Estimator in Python, you need to specify the `"estimateType"` parameter as `"frontier"`.

```python
result = qsharp.estimate("RunProgram()", params=
                    {"qubitParams": { "name": "qubit_maj_ns_e4" },
                    "qecScheme": { "name": "surface_code" },
                    "estimateType": "frontier", # Pareto frontier estimation
                    }
                )
```

If you want to visualize the results of Pareto frontier estimation, you can use the `EstimatesOverview` function. This functions displays the results of frontier estimation in table and a space-time diagram. For more information, see [Space-time diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagram).

```python
from qsharp_widgets import EstimatesOverview

EstimatesOverview(result)
```

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).


## Next steps

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Different ways to run the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Handle large programs with the Resource Estimator](xref:microsoft.quantum.resource-estimator-caching)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)