---
author: SoniaLopezBravo
description: Learn about the input parameters of the Resource Estimator in Azure Quantum and how to customized them.
ms.date: 08/07/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', target, targets]
title: Resource Estimator target parameters
uid: microsoft.quantum.overview.resources-estimator
---

# Customize resource estimates to machine characteristics

This article shows how to customize the target parameters of the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator) to match the machine characteristics that you're targeting. The Resource Estimator uses these parameters to estimate the resources required to run a quantum algorithm on a quantum computer.

## Target parameters

The Resource Estimator computes the estimation of resources, such the number of qubits and the run time, which would be required to implement a given quantum algorithm using a given qubit technology and with a fixed set of architectural choices.  

Therefore, the Resource Estimator takes a set of inputs, with pre-defined values to easily get you started:

- A [physical qubit model](#physical-qubit-parameters), `qubitParams`, which are the properties of the underlying physical qubits.
- A [Quantum Error Correction (QEC) scheme](#quantum-error-correction-schemes), `qecScheme`, which is the assumed quantum error correction scheme.
- An [error budget](#error-budget), `errorBudget`, which is the overall allowed error, that is, the number of times the program is allowed to unsuccess.
- [Constraints](#constraints) on the component-level, `constraints`, which are the number of logical cycles and the number of T factory copies.
- [Distillation units](#distillation-units), `distillationUnitSpecifications`, to specify T factories distillation algorithms.

> [!NOTE]
> In addition to the target parameters, if the quantum program contains arguments the Resource Estimator can take operation arguments as input. For more information, see [Get the most out of the Azure Quantum Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator#how-to-run-multiple-configurations-as-a-single-job).

## Physical qubit parameters

When the Resource Estimator models the physical qubit assumptions, it uses two different physical instruction sets to operate the qubits. The physical instruction set can be either *gate-based* or *Majorana*. A gate-based instruction set provides single-qubit measurement, single-qubit gates (including T gates), and two-qubit gates. A Majorana instruction set provides a physical T gate, single-qubit measurement and two-qubit joint measurement operations.

You can choose from six predefined qubit parameters, four of which have gate-based instruction sets and two with a Majorana instruction set. These qubit models cover a range of operation times and error rates, enabling sufficient exploration of the resource costs needed to enable practical quantum applications.

|Qubit model|Physical instruction|Description|
|----|----|-----|
|`qubit_gate_ns_e3` , `qubit_gate_ns_e4`|gate-based |Operation times and fidelities may correspond to future versions of [superconducting transmon qubits](https://arxiv.org/abs/2003.00024), or [spin qubits](https://arxiv.org/abs/2111.11937), which typically have operation times in the nanosecond regime. For these qubits, gate and measurement operations are assumed to take 50 ns and 100 ns, respectively. Single-qubit and two-qubit gate error rates are assumed to be $10^{-3}$ as a realistic target, and $10^{-4}$ as an optimistic target for a scaled up system.|
|`qubit_gate_us_e3` , `qubit_gate_us_e4`|gate-based|Operation times and fidelities may correspond to future versions of qubits based on [ions](https://arxiv.org/abs/1701.04195), which typically have operations times in the microsecond regime. Based on typical assumptions for ion qubits, gate and measurement operations are assumed to take 100 µs. Error rate for single-qubit Clifford gates is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target, while the error rate for single-qubit non-Clifford gates (T gate) is $10^{-6}$. For two-qubit gates, the error rate is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target. |
|`qubit_maj_ns_e4` , `qubit_maj_ns_e6`|Majorana|Operation times and fidelities may correspond to future improved versions of [Majorana qubits](https://arxiv.org/abs/1610.05289). For these qubits, gate and measurement operations are assumed to take 100 ns. To account for topological protection in the hardware, single-qubit and two-qubit joint measurement error rates (Clifford error rates) are assumed to be $10^{-4}$ as a realistic target, and $10^{-6}$ as an optimistic target. Non-Clifford operations in this architecture don't have topological protection, error rate for non-Clifford physical T gates is 5%.|

You can specify predefined qubit parameters by selecting the qubit model name for the `qubitParams` parameter in the top-level parameters, for example: 

```JSON
{
    "qubitParams": { "name": "qubit_gate_ns_e3" }
}
```

> [!NOTE]
> If no value is provided for the `qubitParams` parameter, `qubit_gate_ns_e3` is chosen as the default qubit parameters.

For reference, the complete predefined qubit parameters are as follows:

```JSON
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

### Customize predefined qubit parameters

You can customize predefined qubit parameters by specifying the name and then updating any of the other values. For example, to decrease the error rate of two-qubit joint measurement in `qubit_maj_ns_e4`, write:

```JSON
{
    "qubitParams": {
        "name": "qubit_maj_ns_e4",
        "twoQubitJointMeasurementErrorRate": 1e-5
    }
}
```

#### Qubit parameters for Gate-based qubits

| Field                        | Description                                                        |
|----------------------------- | ------------------------------------------------------------------|
| `name`                       |  Name for the qubit model                          |
| `instructionSet`              |  Underlying qubit technology (gate-based or Majorana) |
| `oneQubitMeasurementTime`     |  Operation time for single-qubit measurement ($t_{\rm meas}$) in ns |
| `oneQubitGateTime`             |  Operation time for single-qubit gate ($t_{\rm gate}$) in ns        |
| `twoQubitGateTime`             |  Operation time for two-qubit gate in ns                            |
| `tGateTime`             |  Operation time for single-qubit non-Clifford gate in ns|
| `oneQubitMeasurementErrorRate` |Error rate for single-qubit measurement   |
| `oneQubitGateErrorRate`        |  Error rate for single-qubit Clifford gate ($p$)                    |
| `twoQubitGateErrorRate`        |  Error rate for two-qubit Clifford gate                             |
| `tGateErrorRate`              | Error rate to prepare single-qubit non-Clifford state ($p_T$)      |
| `idleErrorRate`                 | Error rate corresponding to idling                                   |

A minimum template for gate-based instruction set with all required values is:

```json
{
    "qubitParams": {
        "instructionSet": "GateBased",
        "oneQubitMeasurementTime": <time string>,
        "oneQubitGateTime": <time string>,
        "oneQubitMeasurementErrorRate": <double>,
        "oneQubitGateErrorRate": <double>
    }
}
```

When not specified, the values for `twoQubitGateTime` and `tGateTime` default to `oneQubitGateTime`, the values for `twoQubitGateErrorRate` and `tGateErrorRate` default to `oneQubitGateErrorRate`, and the value for `idleErrorRate` defaults to `oneQubitMeasurementErrorRate`.

#### Qubit parameters for Majorana qubits

| Field                        | Description                                                        |
|----------------------------- | ------------------------------------------------------------------|
| `name`                       |  Name for the qubit model                          |
| `instructionSet`              | Underlying qubit technology (gate-based or Majorana) |
| `oneQubitMeasurementTime`     | Operation time for single-qubit measurement ($t_{\rm meas}$) in ns |
| `twoQubitJointMeasurementTime`           | Operation time for two-qubit measurement in ns                     |
| `tGateTime`       | Operation time for single-qubit non-Clifford gate in ns|
| `oneQubitMeasurementErrorRate`  | Error rate for single-qubit measurement   |
| `twoQubitJointMeasurementErrorRate`  | Error rate for two-qubit measurement                               |
| `tGateErrorRate`              | Error rate to prepare single-qubit non-Clifford state ($p_T$)      |
| `idleErrorRate`                     | Error rate corresponding to idling                                  |

A minimum template for Majorana based instruction set with all required values is:

```json
{
    "qubitParams": {
        "instructionSet": "Majorana",
        "oneQubitMeasurementTime": <time string>,
        "oneQubitMeasurementErrorRate": <double>,
        "tGateErrorRate": <double>
    }
}
```

For `oneQubitMeasurementErrorRate` and `twoQubitJointMeasurementErrorRate`, you can specify the error rates corresponding to measurement readouts, `readout`, and measurement processing, `process`. These values can be either `<double>` numbers or pairs of numbers.

```json
{
    "oneQubitMeasurementErrorRate": {
        "process": <double>,
        "readout": <double>
    }
}
```

and

```json
{
    "twoQubitJointMeasurementErrorRate": {
        "process": <double>,
        "readout": <double>
    }
}
```

> [|NOTE]
> If you specify a single numeric value for single-qubit and two-qubit error rates in Majorana qubit measurement, both readout and process error rates may be equal.

When not specified, the values for `twoQubitJointMeasurementTime` and `tGateTime` default to `oneQubitGateTime`, and the value for `twoQubitJointMeasurementErrorRate` (both `readout` and `process`) and `idleErrorRate` default to `oneQubitMeasurementErrorRate`.

> [!IMPORTANT]
> All values that aren't specified will take a default value, for example, specifying `"qubit": {"oneQubitGateTime":"200 ns"}` will model a gate-based qubit in which both the two-qubit gate time and the one-qubit gate time are 200 ns. For units, you need to specify time strings, which are double-precision floating point numbers, followed by a space and the time unit for such values, where possible time suffixes are `ns`, `µs` (or `us`), `ms`, and `s`.  

## Quantum error correction schemes

To execute practical-scale quantum applications, quantum operations should have low error rates. These error rate targets are typically beyond the capabilities of raw physical qubits. To overcome this limitation, quantum error correction (QEC) and fault-tolerant computation are two crucial techniques that form the building blocks of large-scale quantum computers. First, QEC allows us to compose multiple error-prone physical qubits and build a more reliable logical qubit that preserves quantum information better than the underlying physical qubits.

The error correction code distance (or just code distance for short) is a parameter that controls the number of errors that can be corrected. Thus, the error rate of the logical qubits and the number of physical qubits that are required to encode them. Both accuracy and the number of physical qubits increase with code distance. The goal is to find the minimum code distance that can achieve the required error rate set for a particular application.

The Resource Estimator uses the following formula for modeling logical error rates using an exponential model,

$$ P = a\left(\frac{p}{p^\*}\right)^{\frac{d+1}{2}} $$

where $d$ is the code distance, $p$ is the physical error rate, and $p^\*$ is the quantum error correction threshold. The physical error rate $p$ is extracted from the qubit parameters as the worst-case error rate any physical Clifford operation in the device.

In particular, $p = {}$ max(`oneQubitMeasurementErrorRate`, `oneQubitGateErrorRate`, `twoQubitGateErrorRate`) for qubit parameters with a gate-based instruction set, and $p = {}$ max(`oneQubitMeasurementErrorRate`, `twoQubitJointMeasurementErrorRate`) for qubit parameters with a Majorana instruction set. QEC schemes typically have an error rate threshold $p^\*$ below which error correction suppresses errors.

|QEC protocol|Physical qubit instruction|Description|
|----|----|-----|
|`surface_code`|GateBased and Majorana| The gate-based surface code is based on [arXiv:1208.0928](https://arxiv.org/abs/1208.0928) and [arXiv:1009.3686](https://arxiv.org/abs/1009.3686). The Majorana surface code is based on [arXiv:1909.03002](https://arxiv.org/abs/1909.03002) and [arXiv:2007.00307](https://arxiv.org/abs/2007.00307).|
|`floquet_code`| Majorana|The floquet code is based on [arXiv:2202.11829](https://arxiv.org/abs/2202.11829).|

You can specify predefined QEC schemes by selecting the QEC scheme name for the `qecScheme` parameter in the top-level parameters, for example:

```JSON
{
    "qecScheme": { "name": "surface_code" }
}
```

> [!NOTE]
> If no value is provided for the `qecScheme` parameter, `surface_code` for the gate-based qubit is chosen as the default QEC.

The exact parameters for each predefined QEC scheme (including a crossing pre-factor $a$, which can be extracted numerically for simulations) are the following.

```JSON
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

### Customize predefined QEC schemes

You can customize predefined QEC schemes by specifying the name and then updating any of the other values. For example, to increase the crossing pre-factor in the floquet code, write:

```JSON
{
    "qecScheme": {
        "name": "floquet_code",
        // only override this value
        "crossingPrefactor": 0.08
    }
}
```

### Customize your QEC schemes

The Resource Estimator can abstract a customized QEC scheme based on the above formula by providing values for the `crossingPrefactor` $a$ and the `errorCorrectionThreshold` $p^\*$. Further, you need to specify the `logicalCycleTime`, that is, the time to execute a single logical operation, which depends on the code distance and the physical operation time assumptions of the underlying physical qubits. Finally, a second formula computes the `physicalQubitsPerLogicalQubit`, that is, the number of physical qubits required to encode one logical qubit based on the code distance.

You can use the following code as a template for QEC schemes:

```JSON
{
    "qecScheme": {
        "crossingPrefactor": <double>,
        "errorCorrectionThreshold": <double>,
        "logicalCycleTime": <formula string>,
        "physicalQubitsPerLogicalQubit": <formula string>
    }
}
```

Inside the formulas, you can use the variables `oneQubitGateTime`, `twoQubitGateTime`, `oneQubitMeasurementTime`, and `twoQubitJointMeasurementTime`, whose values are taken from the corresponding field from the [physical qubit parameters](#customize-predefined-qubit-parameters), as well as the variable `eccDistance` for the code distance computed for the logical qubit, based on the physical qubit properties, the error correction threshold, and the crossing prefactor. The time variables and `eccDistance` can be used to describe the `logicalCycleTime` formula. For the formula `physicalQubitsPerLogicalQubit` only the `eccDistance` can be used.

## Error budget

The total error budget $\epsilon$ sets the overall tolerated error for the algorithm, that is, the allowed failure probability of the algorithm. Its global value must be between 0 and 1, and the default value is 0.001, which corresponds to 0.1%. In other words, the algorithm is allowed to fail a maximum of once in 1000 executions. This parameter is highly application specific. 

For example, if you're running Shor’s algorithm for factoring integers, a large value for the error budget may be tolerated as one can check that the outputs are indeed the prime factors of the input. On the other hand, a smaller error budget may be needed for an algorithm solving a problem with a solution, which can't be efficiently verified. 

You can specify the error budget by setting a number between 0 and 1, for example: 

```JSON
{
    "errorBudget": 0.1
}
```

The error budget corresponds to the sum of three parts:

$$ \epsilon = \epsilon_{\log} + \epsilon_{\rm dis} + \epsilon_{\rm syn} $$

If no further specified, the error budget $\epsilon$ is uniformly distributed and applies to errors $\epsilon_{\log}$ to implement logical qubits, the error budget $\epsilon_{\rm dis}$ produces T states through distillation, and an error budget $\epsilon_{\rm syn}$ to synthesize rotation gates with arbitrary angles.

Note that for distillation and rotation synthesis, the respective error budgets $\epsilon_{\rm dis}$ and $\epsilon_{\rm syn}$ are uniformly distributed among all required T states and all required rotation gates, respectively. If there aren't rotation gates in the input algorithm, the error budget is uniformly distributed to logical errors and T state errors.

Also, you can individually specify each component of the error bugdet. The sum of all values must be 1. 

```JSON
{
    "errorBudget": {
        "logical": <double>, // Required
        "tStates": <double>, // Optional
        "rotations": <double> // Optional
    }
}
```

If a quantum algorithm doesn't contain T states or rotations, then the values of `tstates` and `rotations` may be 0 respectively. 

## Constraints

You can use `constraints` parameters to apply constraints on the [T factory](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-azure-quantum-resource-estimator) component-level. By adjusting constraints, you can optimize the estimates toward reducing the number of qubits or toward reducing the runtime.

```JSON
{
    "constraints": {
        "logicalDepthFactor": <double>, // control execution time 
        "maxTFactories": <int> // control number of qubits
    }
}
```

- Logical depth:  If `logicalDepthFactor` has a value greater than 1, the initial number of logical cycles, also called *logical depth*, is multiplied by this number. By reducing the logical depth, you can increase the number of invocation of the T factory in a given time, resulting in fewer T factory copies needed to produce the same number of T states. When you reduce the number of T factory copies, the algorithm runtime increases accordingly. The scaling factor for the total runtime may be larger, because the required logical error rate increases due to the additional number of cycles.

- Maximum number of T factory copies: You can set a limit on the number of T factory copies using `maxTFactories`. The Resource Estimator determines the resources required by selecting the optimal number of T factory copies that minimizes the number of physical qubits used, without considering the time overhead. The `maxTFactories` parameter limits the maximum number of copies, and therefore adjust the number of logical cycles accordingly.

For more information, see [T factory physical estimation](xref:microsoft.quantum.learn-how-resource-estimator-works#t-factory-physical-estimation).

## Distillation units

You can provide custom specifications for T factories distillation algorithms with the `distillationUnitSpecifications` parameter. The specification can be either predefined or custom. You can specify a predefined specification by selecting the distillation unit name: `15-1 RM` or `15-1 space-efficient`.

```JSON
{
    "distillationUnitSpecifications": [
        "name": <string>,
    ]
}
```

In both cases, notation *15-1* stands for 15 input T states and 1 output T state. The `15-1 space-efficient` distillation unit uses fewer qubits than `15-1 RM` but requires more runtime. For more information, see [Table VI](https://arxiv.org/pdf/2211.07629.pdf#page=24).

> [!NOTE]
> Using predefined distillation units provides better performance comparing with custom ones.

### Customize your distillation units

You can defined your custom distillation units as follows:

```JSON
{
    "distillationUnitSpecifications": [
        "displayName": <string>, 
        "numInputTs": <int>,
        "numOutputTs": <int>,
        "failureProbabilityFormula": <string>,
        "outputErrorRateFormula": <string>,
        "physicalQubitSpecification": <protocol specific parameters>, 
        "logicalQubitSpecification": <protocol specific parameters>, 
        "logicalQubitSpecificationFirstRoundOverride": <protocol specific parameters>, // Only if "logicalQubitSpecification"
    ]
}
```

All numeric parameters are expected to be positive. The `displayName` specifies how the distillation unit will be displayed in output results.

At least one of the parameters `physicalQubitSpecification` or `logicalQubitSpecification` should be provided. If only the former is provided, the distillation unit can be applied to physical qubits. If only the latter is provided, the distillation unit can be applied to logical qubits. If both are provided, the distillation unit can be applied to both types of qubits.

The parameter `logicalQubitSpecificationFirstRoundOverride` can be provided only if `logicalQubitSpecification` is specified. If so, it overrides values of `logicalQubitSpecification` in case if applied at the first round of distillation. The value `<protocol specific parameters> ` that is required for `logicalQubitSpecificationFirstRoundOverride` should follow the scheme:

```JSON
{
    "numUnitQubits": <int>,
    "durationInQubitCycleTime": <double>
}
```

The formulas for `failureProbabilityFormula` and `outputErrorRateFormula` are custom formulas with basic arithmetic operations, constants and only three parameters:

- `cliffordErrorRate`, also denoted as `c`.
- `readoutErrorRate`, also denoted as `r`.
- `inputErrorRate`, also denoted as `z`.
  
See the following examples of custom formulas using long and short notation. These examples illustrate formulas used by default within the standard implementation.

|Parameter|Long formula|Short formula|
|---|---|---|
|`failureProbabilityFormula`| `{"Custom": "15.0 * inputErrorRate + 356.0 * cliffordErrorRate"}` | `{"Custom": "15.0 * z + 356.0 * c"}` |
|`outputErrorRateFormula`| `{"Custom": "35.0 * inputErrorRate ^ 3 + 7.1 * cliffordErrorRate"}` | `{"Custom": "35.0 * z ^ 3 + 7.1 * c"}` |

## Next steps

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Tutorial: Submit a QIR program to the Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
- [Sample: Resource estimation with Q# and VS Code](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/integer-factorization-with-cli)