---
author: azure-quantum-content
description: Learn about the input parameters of the Microsoft Quantum resource estimator in the QDK, and how to customize them.
ms.date: 03/07/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', target, targets, QDK]
title: Resource Estimator Target Parameters
uid: microsoft.quantum.overview.resources-estimator
---

# Customize the target parameters of the resource estimator

This article shows how to customize the target input parameters of the [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator) to match the machine characteristics that you're targeting. The resource estimator uses these parameters to estimate the resources required to run a quantum algorithm on a quantum computer.

> [!NOTE]
> If you experience issues when you work with the resource estimator, then see the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator).

## Prerequisites

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download) or open [VS Code for the Web](https://vscode.dev/quantum).
- VS Code with the [Microsoft Quantum Development Kit (QDK)](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest `qdk` Python library with the `jupyter` extra.  

    ```bash
    python -m pip install --upgrade "qdk[jupyter]"
    ```

## Target parameters

The resource estimator computes the estimation of resources, such as the number of qubits and the run time, that would be required to implement a given quantum algorithm on a quantum computer with a given qubit technology and fixed set of architectural choices.  

The resource estimator takes a set of inputs, with pre-defined values to easily get you started:

- A [physical qubit model](#physical-qubit-parameters), which defines the properties of the underlying physical qubits.
- A [Quantum Error Correction (QEC) scheme](#quantum-error-correction-schemes), which is the assumed quantum error correction scheme.
- An [error budget](#error-budget), which is the overall allowed error, defined as the number of times the program is allowed to fail.
- [Constraints](#constraints) on the component level, which are the number of logical cycles and the number of T factory copies.
- [Distillation units](#distillation-units) to specify T factory distillation algorithms.
- [Pareto frontier estimation](#pareto-frontier-estimation) to run multiple estimates for the number of qubits and run time for the same algorithm.

> [!TIP]
> If you already know some pre-calculated estimates for an operation, you can incorporate them to optimize the run time of the resource estimator. For more information, see [How to use known estimates with the resource estimator](xref:microsoft.quantum.resource-estimator-known-estimates).

## Physical qubit parameters

When the resource estimator models the physical qubit assumptions, it uses two different physical instruction sets to operate on the qubits. The physical instruction set can be either gate-based or Majorana. A gate-based instruction set provides single-qubit measurement, single-qubit gates (including T gates), and two-qubit gates. A Majorana instruction set provides a physical T gate, single-qubit measurement, and two-qubit joint measurement operations.

You can choose from six predefined qubit parameters, four of which have a gate-based instruction set and two with a Majorana instruction set. These qubit models cover a range of operation times and error rates so that you can sufficiently explore the resource costs needed to run practical quantum applications.

| Qubit parameter                             | Python API class            | Description |
|---------------------------------------------|-----------------------------|-------------|
| `"qubit_gate_ns_e3"` , `"qubit_gate_ns_e4"` | `GATE_NS_E3` , `GATE_NS_E4` | Operation times and fidelities may correspond to future versions of [superconducting transmon qubits](https://arxiv.org/abs/2003.00024), or [spin qubits](https://arxiv.org/abs/2111.11937), which typically have operation times in the nanosecond regime. For these qubits, gate and measurement operations are assumed to take 50 ns and 100 ns, respectively. Single-qubit and two-qubit gate error rates are assumed to be $10^{-3}$ as a realistic target, and $10^{-4}$ as an optimistic target for a scaled up system. |
| `"qubit_gate_us_e3"` , `"qubit_gate_us_e4"` | `GATE_US_E3` , `GATE_US_E4` | Operation times and fidelities may correspond to future versions of qubits based on [ions](https://arxiv.org/abs/1701.04195), which typically have operations times in the microsecond regime. Based on typical assumptions for ion qubits, gate and measurement operations are assumed to take 100 µs. Error rate for single-qubit Clifford gates is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target, while the error rate for single-qubit non-Clifford gates (T gate) is $10^{-6}$. For two-qubit gates, the error rate is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target. |
| `"qubit_maj_ns_e4"` , `"qubit_maj_ns_e6"`   | `MAJ_NS_E4` , `MAJ_NS_E6`   | Operation times and fidelities may correspond to future improved versions of [Majorana qubits](https://arxiv.org/abs/1610.05289). For these qubits, gate and measurement operations are assumed to take 100 ns. To account for topological protection in the hardware, single-qubit and two-qubit joint measurement error rates (Clifford error rates) are assumed to be $10^{-4}$ as a realistic target, and $10^{-6}$ as an optimistic target. Non-Clifford operations in this architecture don't have topological protection, error rate for non-Clifford physical T gates is 5%. |

> [!NOTE]
> The default value for the qubit model is `"qubit_gate_ns_e3"`.

### Parameters for predefined qubit parameters

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

### Pass predefined qubit parameters

There are two ways to programmatically specify predefined qubit parameters. One way is to select the qubit model name for the `qubitParams` class when you run `qsharp.estimate`. For example, to select the `"qubit_maj_ns_e6"` qubit parameter for a Q# program that uses the `RunProgram()` operation to run your algorithm, run the following Python code:

```python
from qdk import qsharp

qsharp.estimate("RunProgram()", params=
                {"qubitParams": {
                        "name": "qubit_maj_ns_e6"
                    },
                })
```

Another way is to pass the qubit parameters to the [`EstimatorParams` class](xref:qsharp.estimator.EstimatorParams) with [`QubitParams`](xref:qsharp.estimator.QubitParams). For example, to select the `MAJ_NS_E6` qubit parameter, run the following code:

```python
from qdk import qsharp
from qdk.estimator import EstimatorParams, QubitParams

params = EstimatorParams()
params.qubit_params.name = QubitParams.MAJ_NS_E6 # qubit_maj_ns_e6 qubit parameter

qsharp.estimate("RunProgram()", params=params)
```

### Customize predefined qubit parameters

To customize the predefined qubit parameters. specify the name and other values that you want to change. For example, to decrease the error rate of two-qubit joint measurements in `qubit_maj_ns_e4`, run the following code:

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

params = EstimatorParams()
params.qubit_params.name = QubitParams.MAJ_NS_E4
params.qubit_params.two_qubit_joint_measurement_error_rate = 1e-5
```

#### Qubit parameters for gate-based qubits

| Python identifier                  | Data type    | Description                                                        |
|------------------------------------|--------------|--------------------------------------------------------------------|
| `name`                             | string       | Name for the qubit model                                           |
| `instruction_set`                  | "gate_based" | Underlying qubit technology                                        |
| `one_qubit_measurement_time`       | time string  | Operation time for single-qubit measurement ($t_{\rm meas}$) in ns |
| `one_qubit_gate_time`              | time string  | Operation time for single-qubit gate ($t_{\rm gate}$) in ns        |
| `two_qubit_gate_time`              | time string  | Operation time for two-qubit gate in ns                            |
| `t_gate_time`                      | time string  | Operation time for single-qubit non-Clifford gate in ns            |
| `one_qubit_measurement_error_rate` | float        | Error rate for single-qubit measurement                            |
| `one_qubit_gate_error_rate`        | float        | Error rate for single-qubit Clifford gate ($p$)                    |
| `two_qubit_gate_error_rate`        | float        | Error rate for two-qubit Clifford gate                             |
| `t_gate_error_rate`                | float        | Error rate to prepare single-qubit non-Clifford state ($p_T$)      |
| `idle_error_rate`                  | float        | Error rate corresponding to idling                                 |

The following code shows how to specify custom qubit parameters for a gate-based instruction set:

```python
from qdk.estimator import EstimatorParams, QubitParams

params = EstimatorParams()

params.qubit_params.name = "your_custom_name"
params.qubit_params.instruction_set = "gate_based"
params.qubit_params.t_gate_error_rate = 0.03
params.qubit_params.t_gate_time = "10 ns"
params.qubit_params.idle_error_rate = 0.02
```

> [!NOTE]
> The default value for `two_qubit_gate_time` and `t_gate_time` is the value of `one_qubit_gate_time`. The default value for `two_qubit_gate_error_rate` and `t_gate_error_rate` is the value of `one_qubit_gate_error_rate`. The default value for `idle_error_rate` is the value of `one_qubit_measurement_error_rate`.

#### Qubit parameters for Majorana qubits

| Python identifier                        | Data type   | Description                                                        |
|------------------------------------------|-------------|--------------------------------------------------------------------|
| `name`                                   | string      | Name for the qubit model                                           |
| `instruction_set`                        | "majorana"  | Underlying qubit technology                                        |
| `one_qubit_measurement_time`             | time string | Operation time for single-qubit measurement ($t_{\rm meas}$) in ns |
| `two-qubit_joint_measurement_time`       | time string | Operation time for two-qubit measurement in ns                     |
| `t_gate_time`                            | time string | Operation time for single-qubit non-Clifford gate in ns            |
| `one_qubit_measurement_error_rate`       | float       | Error rate for single-qubit measurement                            |
| `two_qubit_joint_measurement_error_rate` | float       | Error rate for two-qubit measurement                               |
| `t_gate_error_rate`                      | float       | Error rate to prepare single-qubit non-Clifford state ($p_T$)      |
| `idle_error_rate`                        | float       | Error rate corresponding to idling                                 |

A minimum template for a Majorana instruction set with all required values is:

```python
from qdk.estimator import EstimatorParams, QubitParams

params = EstimatorParams()

params.qubit_params.name = "your_custom_name"
params.qubit_params.instruction_set = "majorana"
params.qubit_params.one_qubit_measurement_time = "10 ns"
params.qubit_params.one_qubit_measurement_error_rate = 0.01
```

> [!NOTE]
> The default value for `two_qubitJointMeasurementTime` and `t_gate_time` is the value of `one_qubit_measurement_time`. The default value for `two_qubit_joint_measurement_error_rate` and `t_gate_error_rate` is the value of `one_qubit_measurement_error_rate`. The default value for `idle_error_rate` is the value of `one_qubit_measurement_error_rate`.

For `one_qubit_measurement_error_rate` and `two_qubit_joint_measurement_error_rate`, you can specify the error rates that correspond to measurement readouts, `readout`, and measurement processing, `process`. These values can be either `<double>` numbers or pairs of numbers. For example:

```python
params.qubit_params.two_qubit_joint_measurement_error_rate = \
    MeasurementErrorRate(process=0.00005, readout=0.00007)
```

> [!NOTE]
> If you specify a single numeric value for single-qubit and two-qubit error rates in Majorana qubit measurement, then both the readout and process error rates might be equal.

All values that you don't specify take a default value. For example, if you specify `"qubit": {"oneQubitGateTime":"200 ns"}`, then the resource estimator models a gate-based qubit in which both the two-qubit gate time and the one-qubit gate time are 200 ns. For units, you need to specify time strings, which are double-precision floating point numbers followed by a space and the time unit for such values. The supported time suffixes are `ns`, `µs` (or `us`), `ms`, and `s`.

## Quantum error correction schemes

To run practical-scale quantum applications, quantum operations should have low error rates. These error rate targets are typically beyond the capabilities of raw physical qubits. To overcome this limitation, quantum error correction (QEC) and fault-tolerant computation are two crucial techniques that form the building blocks of large-scale quantum computers. QEC schemes build error-tolerant logical qubits from larger groups of individual error-prone physical qubits. Logical qubits preserve quantum information better than the underlying physical qubits.

The resource estimator uses the following exponential formula to model logical error rates,

$$ P = ad^k\left(\frac{p}{p^\*}\right)^{\frac{d+1}{2}} $$

where $a$ is a crossing pre-factor, $d$ is the code distance, $k$ is a distance coefficient power (typically set to 0), $p$ is the physical error rate, and $p^\*$ is the quantum error correction threshold. You can numerically extract the crossing pre-factor $a$ for use in simulations.

The code distance $d$ is a parameter that controls the number of errors that can be corrected. The code distance defines the error rate of the logical qubits and the number of physical qubits that are required to encode the logical qubits. Both accuracy and the number of physical qubits increase with code distance. The goal of a QEC scheme is to find the minimum code distance that can achieve the required error rate that you set for a particular application.

The physical error rate $p$ is extracted from the qubit parameters as the worst-case error rate of any physical Clifford operation performed in the device. In particular, $p = {}$ max(`one_qubit_measurement_error_rate`, `one_qubit_gate_error_rate`, `two_qubit_gate_error_rate`) for qubit parameters with a gate-based instruction set, and $p = {}$ max(`one_qubit_measurement_error_rate`, `two_qubit_joint_measurement_error_rate`) for qubit parameters with a Majorana instruction set. QEC schemes typically have an error rate threshold $p^\*$ below which error correction suppresses errors.

The Microsoft Quantum resource estimator supports two predefined QEC schemes: a surface code and a floquet code.

|QEC protocol|Python API class|Description|
|----|----|-----|
|"`surface_code`"|`SURFACE_CODE`| The gate-based surface code is based on [arXiv:1208.0928](https://arxiv.org/abs/1208.0928) and [arXiv:1009.3686](https://arxiv.org/abs/1009.3686). The Majorana surface code is based on [arXiv:1909.03002](https://arxiv.org/abs/1909.03002) and [arXiv:2007.00307](https://arxiv.org/abs/2007.00307).|
|"`floquet_code`"| `FLOQUET_CODE`|Only for Majorana qubits. The floquet code is based on [arXiv:2202.11829](https://arxiv.org/abs/2202.11829).|

> [!NOTE]
> The default value for the QEC scheme is `"surface_code"`.

### Parameters for predefined QEC schemes

The exact parameters for each predefined QEC scheme are the following:

```python
{
    "qubitParams": {
        "instructionSet": "GateBased",
    }
    "qecScheme": {
        "name": "surface_code",
        "errorCorrectionThreshold": 0.01,
        "crossingPrefactor": 0.03,
        "distanceCoefficientPower": 0,
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
        "distanceCoefficientPower": 0,
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
        "distanceCoefficientPower": 0,
        "logicalCycleTime": "3 * oneQubitMeasurementTime * codeDistance",
        "physicalQubitsPerLogicalQubit": "4 * codeDistance * codeDistance + 8 * (codeDistance - 1)"
    }
}
```

### Passing predefined QEC schemes

There are two ways to specify predefined QEC schemes. You can select the QEC model name for the `"qecScheme"` class when you run `qsharp.estimate`. For example, to select the floquet code, run the following code:

```python
qsharp.estimate("RunProgram()", params=
                {"qecScheme": {
                        "name": "floquet_code"
                    }
                })
```

You can also pass a list of estimation parameters to the [`EstimatorParams` class](xref:qsharp.estimator.EstimatorParams) with the [`QECScheme` class](xref:qsharp.estimator.QECScheme). For example, to select the floquet code, run the following code:

```python
from qdk import qsharp
from qsharp.estimator import EstimatorParams, QubitParams, QECScheme

params = EstimatorParams()
params.items.qec_scheme.name = QECScheme.FLOQUET_CODE # floquet code QEC scheme

qsharp.estimate("RunProgram()", params=params)
```

### Customize predefined QEC schemes

To customize predefined QEC schemes, specify the name and other values that you want to change. For example, to increase the crossing pre-factor in the floquet code, run the following code:

```python
qsharp.estimate("RunProgram()", params=
                {"qecScheme": {
                        "name": "floquet_code",
                        "crossingPrefactor": 0.07,
                    }
                })
```

> [!NOTE]
> The default value for `"logicalCycleTime"` and `"physicalQubitsPerLogicalQubit"` is the value of `"oneQubitMeasurementTime"`. The default value for `"errorCorrectionThreshold"` is `0.01`. The default value for `"crossingPrefactor"` is `0.03`.

### Customize your QEC schemes

The resource estimator can abstract a customized QEC scheme based on the above formula by providing values for the `"crossingPrefactor"` $a$, the `distanceCoefficientPower` $k$, and the `"errorCorrectionThreshold"` $p^\*$. You also need to specify the `"logicalCycleTime"`, which is the time it takes to run a single logical operation, and which depends on the code distance and the physical operation time assumptions of the underlying physical qubits. Another formula computes the `"physicalQubitsPerLogicalQubit"`, which is the number of physical qubits required to encode one logical qubit based on the code distance.

You can use the following code as a template for QEC schemes:

```python
qsharp.estimate("RunProgram()", params=
                {"qecScheme": {
                        "crossingPrefactor": <double>,
                        "errorCorrectionThreshold": <double>,
                        "distanceCoefficientPower": <integer>,
                        "logicalCycleTime": <formula string>,
                        "physicalQubitsPerLogicalQubit": <formula string>
                    }
                })                
```

Inside the formulas, you can use the variables `one_qubit_gate_time`, `two_qubit_gate_time`, `one_qubit_measurement_time`, and `two_qubit_joint_measurement_time`. The values of these variables come from the corresponding fields from the [physical qubit parameters](#customize-predefined-qubit-parameters), as well as the variable `eccDistance` for the code distance computed for the logical qubit, the error correction threshold, and the crossing prefactor. The time variables and `eccDistance` can be used to describe the `logicalCycleTime` formula. For the formula `physicalQubitsPerLogicalQubit`, only the `eccDistance` can be used.

## Error budget

The total error budget $\epsilon$ sets the overall tolerated error for the algorithm, which is the allowed failure probability of the algorithm. Its global value must be between 0 and 1, and the default value is 0.001, which corresponds to 0.1%. In other words, the algorithm is allowed to fail a maximum of once in 1000 executions. This parameter is highly application specific.

For example, if you're running Shor’s algorithm to factor large integers, then you might be able to tolerate a large value for the error budget because you can check whether the outputs are the prime factors of the input. On the other hand, you might need a smaller error budget for an algorithm that solves a problem with a solution that you can't efficiently verify.

The error budget corresponds to the sum of three parts:

$$ \epsilon = \epsilon_{\log} + \epsilon_{\rm dis} + \epsilon_{\rm syn} $$

The logical errors $\epsilon_{\log}$ is the error of implementing logical qubits, the T state error $\epsilon_{\rm dis}$ is the error of producing T states through distillation, and the rotation gate error $\epsilon_{\rm syn}$ is the error of synthesizing rotation gates with arbitrary angles.

> [!NOTE]
> Unless you specify a different value, the error budget $\epsilon$ is uniformly distributed among the logical error, T state error, and rotation gate error.

For distillation and rotation synthesis, the respective error budgets $\epsilon_{\rm dis}$ and $\epsilon_{\rm syn}$ are uniformly distributed among all required T states and all required rotation gates, respectively. If there aren't rotation gates in the input algorithm, then the error budget is uniformly distributed to logical errors and T state errors.

### Pass the error budget

There are two ways to specify the error budget. One way is to pass the error budget when you run `qsharp.estimate`. For example, to select an error budget of 1/3, run the following code:

```python
qsharp.estimate("RunProgram()", params=
                {'errorBudget': 0.333
                })
```

You can also pass the error budget parameters to the [`EstimatorParams` class](xref:qsharp.estimator.EstimatorParams).

```python
from qdk import qsharp
from qdk.estimator import EstimatorParams, QubitParams, QECScheme

params = EstimatorParams()
params.items.error_budget = 0.333 # error budget of 1/3

qsharp.estimate("RunProgram()", params=params)
```

Also, you can individually specify each component of the error budget. The sum of all values is the total error budget and must be between 0 and 1. If a quantum algorithm doesn't contain T states or rotations, then the values of `t_states` and `rotations` can be 0 respectively.

The following code shows how to specify the error budget parameter with T states and rotations:

```python
from qdk.estimator import EstimatorParams, QubitParams

params = EstimatorParams()
params.error_budget.logical = 0.01
params.error_budget.t_states = 0.02
params.error_budget.rotations = 0.03
```

## Constraints

You can use the `constraints` attribute of the `EstimatorParams` class to apply constraints on the [T factory](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-azure-quantum-resource-estimator) component level. When you adjust the constraints, you can optimize the estimates to reduce the number of qubits but increase the run time, or to reduce the run time but increase the number of qubits.

| Parameter              | Data type   | Description |
|------------------------|-------------|-------------|
| `logical_depth_factor` | float       | Control the execution time. If it has a value greater than 1, the initial number of logical cycles, also called *logical depth*, is multiplied by this number. By reducing `logical_depth_factor`, you can increase the number of invocation of the T factory in a given time, resulting in fewer T factory copies needed to produce the same number of T states. When you reduce the number of T factory copies, the algorithm run time increases accordingly. The scaling factor for the total run time may be larger, because the required logical error rate increases due to the additional number of cycles.|
| `max_t_factories`      | integer     | Maximum number of T factory copies. The resource estimator determines the resources required by selecting the optimal number of T factory copies that minimizes the number of physical qubits used, without considering the time overhead. The `max_t_factories` parameter limits the maximum number of copies, and therefore adjust the number of logical cycles accordingly. For more information, see [T factory physical estimation](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-azure-quantum-resource-estimator).|
| `max_duration`         | time string | Maximum run time for the algorithm. The resource estimator accepts only one of `max_duration` or `max_physical_qubits` constraints at the time but not two. If `max_duration` is specified, the resource estimator tries to find the best estimate for `max_physical_qubits` among solutions constrained by the maximal number specified.|
| `max_physical_qubits` | integer      | Maximum number of physical qubits for the algorithm. The resource estimator accepts only one of `max_duration` or `max_physical_qubits` constraints at the time but not two. If `max_physical_qubits` is specified, the resource estimator tries to find the best estimate for `max_duration` among solutions constrained by the maximal number specified. |

The following code shows how to specify the constraints for a quantum algorithm:

```python
from qdk.estimator import EstimatorParams

params = EstimatorParams()

params.constraints.max_duration = "1 s"
params.constraints.logical_depth_factor = 1.5
params.constraints.max_t_factories = 10
```

If the value that you provide for `max_duration` or `max_physical_qubits` is too small to find a feasible solution, then the resource estimator returns an error. If you don't provide a value for `max_duration` or `max_physical_qubits`, then the resource estimator prioritizes estimates that are optimized for the shortest run time.

> [!NOTE]
> There's a trade-off between run time and the number of qubits. For some algorithms, you can manage this trade-off with `max_duration` and `max_physical_qubits`. Table IV in [[arXiv:2211.07629](https://arxiv.org/abs/2211.07629)] illustrates the effective utilization of the trade-off between the number of qubits and run time for quantum dynamics algorithms. For more information, see [Quantum resource estimation with time or number of qubits constraints](https://github.com/microsoft/Quantum/blob/main/samples/azure-quantum/resource-estimation/estimation-time-qubits-constraints.ipynb) sample.

## Distillation units

You can provide specifications for T factory distillation algorithms with the [`DistillationUnitSpecification` class](xref:qsharp.estimator.DistillationUnitSpecification). The specification can be either predefined or custom. To specify a predefined specification, use the distillation unit name `15-1 RM` or `15-1 space-efficient`. For example, see the following code:

```python
from qdk.estimator import EstimatorParams, DistillationUnitSpecification

params = EstimatorParams()
unit = DistillationUnitSpecification()
unit.name = "15-1 RM" # predefined distillation unit

params.distillation_unit_specifications.append(unit)
```

In both cases, `15-1` means 15 input T states and 1 output T state. The `15-1 space-efficient` distillation unit uses fewer qubits than `15-1 RM` but requires a longer run time. For more information, see [Table VI](https://arxiv.org/pdf/2211.07629.pdf#page=24).

> [!TIP]
> You get better performance when you use predefined distillation units instead of custom units.

### Customize your distillation units

You can customize your own distillation units. The exact parameters for the distillation units are the following:

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

All numeric parameters must be positive. The `displayName` specifies how the distillation unit is displayed in the output results.

The following code shows how to specify the distillation unit parameters for a quantum algorithm with the [`DistillationUnitSpecification` class](xref:qsharp.estimator.DistillationUnitSpecification) and the [`ProtocolSpecificDistillationUnitSpecification` class](xref:qsharp.estimator.ProtocolSpecificDistillationUnitSpecification).

```python
from qdk.estimator import EstimatorParams, DistillationUnitSpecification, ProtocolSpecificDistillationUnitSpecification

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

The formulas for `failure_probability_formula` and `output_error_rate_formula` are custom formulas with basic arithmetic operations and constants. These formulas have the only the following parameters:

- `clifford_error_rate`, also denoted as `c`.
- `readout_error_rate`, also denoted as `r`.
- `input_error_rate`, also denoted as `z`.
  
See the following examples of custom formulas in long and short notation. These examples are the default formulas that are used by the standard implementation.

| Parameter                     | Long formula                                               | Short formula               |
|-------------------------------|------------------------------------------------------------|-----------------------------|
| `failure_probability_formula` | `"15.0 * input_error_rate + 356.0 * clifford_error_rate"`  | `"15.0 \* z + 356.0 * c"`   |
| `output_error_rate_formula`   | `"35.0 * input_error_rate ^ 3 + 7.1 * clifford_error_rate"`| `"35.0 \* z ^ 3 + 7.1 * c"` |

Provide values for at least one of the parameters, `physical_qubit_specification` or `logical_qubit_specification`. If you only provide `failure_probability_formula`, then the distillation unit is applied to the physical qubits. If you only provide `output_error_rate_formula`, then the distillation is applied to  the logical qubits. If you provide both parameters, then the distillation unit is applied to both types of qubits.

You can only provide a value for the `logical_qubit_specification_first_round_override` parameter when you also provide a value for the `logical_qubit_specification` parameter. The `logical_qubit_specification_first_round_override` parameter overrides the value of `logical_qubit_specification` when applied at the first round of distillation. The value `<protocol specific parameters>` is required for `logical_qubit_specification_first_round_override`, and must have the following scheme:

```python
{
    "numUnitQubits": <int>,
    "durationInQubitCycleTime": <double>
}
```

## Pareto frontier estimation

## Run a Pareto frontier estimation

When you estimate the resources required to run an algorithm, it's important to consider the tradeoff between the number of physical qubits and the runtime of the algorithm. If you use more qubits, then you can probably reduce the runtime of your algorithm. However, the number of physical qubits that you can use is limited by the the hardware design.

The Pareto frontier estimation provides multiple estimates for the same algorithm. Each estimate shows the tradeoffs between the number of qubits and the run time.

> [!NOTE]
> If you run the resource estimator in VS Code with the **QDK: Calculate Resource Estimates** command, then the Pareto frontier estimation is enabled by default.

To run the resource estimator in Python, you must specify the `"estimateType"` parameter as `"frontier"`.

```python
result = qsharp.estimate("RunProgram()", params=
                    {"qubitParams": { "name": "qubit_maj_ns_e4" },
                    "qecScheme": { "name": "surface_code" },
                    "estimateType": "frontier", # Pareto frontier estimation
                    }
                )
```

To visualize the results of Pareto frontier estimation, you can use the `EstimatesOverview` function. This functions displays the results of frontier estimation in a table and in a space-time diagram. For more information, see [Space-time diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagram).

```python
from qdk.widgets import EstimatesOverview

EstimatesOverview(result)
```

> [!NOTE]
> If you experience issues when you work with the resource estimator, then see the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next steps

- [Understand the results of the resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Handle large programs with the resource estimator](xref:microsoft.quantum.resource-estimator-caching)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
