---
author: SoniaLopezBravo
description: Learn about the input and output parameters of the Resource Estimator in Azure Quantum and how to customized them
ms.date: 12/26/2022
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Resource Estimator input and output parameters
uid: microsoft.quantum.overview.resources-estimator
---

# Customize resource estimates to machine characteristics

In this article, you'll learn how to customize the input parameters of the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator) to match the machine characteristics that you're targeting. You'll also see the output data of resource estimates and their definitions. 

## Input parameters

The Resource Estimator computes the estimation of resources, such the number of qubits, the run time
and the power consumption, which would be required to implement a given quantum algorithm using a given qubit technology and with a fixed set of architectural choices.  
Therefore, the Resource Estimator takes a set of inputs, with pre-defined values to easily get you started:

- A physical qubit model, `qubitParams`, which are the properties of the underlying physical qubits
- A Quantum Error Correction (QEC) scheme, `qecScheme`, which is the assumed quantum error correction scheme
- An error budget, `errorBudget`, which is the overall allowed error, that is, the number of times the program is allowed to unsuccess

### Physical qubit parameters

When the Resource Estimator models the physical qubit assumptions, it uses two different physical instruction sets to operate the qubits. The physical instruction set can be either *gate-based* or *Majorana*. A gate-based instruction set provides single-qubit measurement, single-qubit gates (including T gates), and two-qubit gates. A Majorana instruction set provides a physical T gate, single-qubit measurement and two-qubit joint measurement operations.

You can choose from six pre-defined qubit parameters, four of which have gate-based instruction sets and two with a Majorana instruction set. These qubit models cover a range of operation times and error rates, enabling sufficient exploration of the resource costs needed to enable practical quantum applications.

|Qubit model|Physical instruction|Description|
|----|----|-----|
|`qubit_gate_ns_e3` , `qubit_gate_ns_e4`|gate-based |Operation times and fidelities may correspond to future versions of [superconducting transmon qubits](https://arxiv.org/abs/2003.00024), or [spin qubits](https://arxiv.org/abs/2111.11937), which typically have operation times in the nanosecond regime. For these qubits, gate and measurement operations are assumed to take 50 ns and 100 ns, respectively. Single-qubit and two-qubit gate error rates are assumed to be $10^{-3}$ as a realistic target, and $10^{-4}$ as an optimistic target for a scaled up system.|
|`qubit_gate_us_e3` , `qubit_gate_us_e4`|gate-based|Operation times and fidelities may correspond to future versions of qubits based on [ions](https://arxiv.org/abs/1701.04195), which typically have operations times in the microsecond regime. Based on typical assumptions for ion qubits, gate and measurement operations are assumed to take 100 µs. Error rate for single-qubit Clifford gates is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target, while the error rate for single-qubit non-Clifford gates (T gate) is $10^{-6}$. For two-qubit gates, the error rate is $10^{-3}$ as a realistic target and $10^{-4}$ as an optimistic target. |
|`qubit_maj_ns_e4` , `qubit_maj_ns_e6`|Majorana|Operation times and fidelities may correspond to future improved versions of [Majorana qubits](https://arxiv.org/abs/1610.05289). For these qubits, gate and measurement operations are assumed to take 100 ns. To account for topological protection in the hardware, single-qubit and two-qubit joint measurement error rates (Clifford error rates) are assumed to be $10^{-4}$ as a realistic target, and $10^{-6}$ as an optimistic target. Non-Clifford operations in this architecture don't have topological protection, error rate for non-Clifford physical T gates is 5%.|

You can specify pre-defined qubit parameters by selecting the qubit model name for the `qubitParams` parameter in the top-level parameters, for example: 

```JSON
{
    "qubitParams": { "name": "qubit_gate_ns_e3" }
}
```
> [!NOTE]
> If no value is provided for the `qubitParams` parameter, `qubit_gate_ns_e3` is chosen as the default qubit parameters.



For reference, the complete pre-defined qubit parameters are as follows:

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

#### Custom pre-defined qubit parameters

Pre-defined qubit parameters can be customized by specifying the name and then updating any of the other values. For example, to decrease the error rate of two-qubit joint measurement in `qubit_maj_ns_e4`, write:

```JSON
{
    "qubitParams": {
        "name": "qubit_maj_ns_e4",
        "twoQubitJointMeasurementErrorRate": 1e-5
    }
}
```

**Qubit parameters for Gate-based qubits**

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

When not specified, the values for `twoQubitGateTime` and `tGateTime` default to `oneQubitGateTime` and the values for `twoQubitGateErrorRate` and `tGateErrorRate` default to `oneQubitGateErrorRate`.

**Qubit parameters for Majorana qubits**

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

When not specified, the values for `twoQubitJointMeasurementTime` and `tGateTime` default to `oneQubitGateTime` and the value for `twoQubitJointMeasurementErrorRate` defaults to `oneQubitMeasurementErrorRate`.

> [!IMPORTANT]
> All values that aren't specified will take a default value, for example, specifying `"qubit": {"oneQubitGateTime":"200 ns"}` will model a gate-based qubit in which both the two-qubit gate time and the one-qubit gate time are 200 ns. For units, you need to specify time strings, which are double-precision floating point numbers, followed by a space and the time unit for such values, where possible time suffixes are `ns`, `µs` (or `us`), `ms`, and `s`.  

### Quantum error correction schemes 

To execute practical-scale quantum applications, quantum operations should have low error rates. These error rate targets are typically beyond the capabilities of raw physical qubits. To overcome this limitation, quantum error correction (QEC) and fault-tolerant computation are two crucial techniques that form the building blocks of large-scale quantum computers. First, QEC allows us to compose multiple error-prone physical qubits and build a more reliable logical qubit that preserves quantum information better than the underlying physical qubits. 

The error correction code distance (or just code distance in short) is a parameter that controls the number of errors that can be corrected, and thus the error rate of the logical qubits and the number of physical qubits required to encode them. Both accuracy and the number of physical qubits increase with code distance. The goal is to find the minimum code distance that can achieve the required error rate set for a particular application. Later, we explain how a global error budget is provided as input and how it's distributed throughout the estimation, including the logical error rate of logical qubits.

The Resource Estimator uses the following formula for modeling logical error rates using an exponential model, 

$$ P = a\left(\frac{p}{p^\*}\right)^{\frac{d+1}{2}} $$

where $d$ is the code distance, $p$ is the physical error rate, and $p^\*$ is the quantum error correction threshold. The physical error rate $p$ is extracted from the qubit parameters as the worst-case error rate any physical Clifford operation in the device. 

In particular, $p = {}$ max(`oneQubitMeasurementErrorRate`, `oneQubitGateErrorRate`, `twoQubitGateErrorRate`) for qubit parameters with a gate-based instruction set, and $p = {}$ max(`oneQubitMeasurementErrorRate`, `twoQubitJointMeasurementErrorRate`) for qubit parameters with a Majorana instruction set. QEC schemes typically have an error rate threshold $p^\*$ below which error correction suppresses errors.

|QEC protocol|Physical qubit instruction|Description|
|----|----|-----|
|`surface_code`|GateBased and Majorana| The gate-based surface code is based on [Fowler et al. (arXiv:1208.0928)](https://arxiv.org/abs/1208.0928) and [Wang et al. (arXiv:1009.3686)](https://arxiv.org/abs/1009.3686). The Majorana surface code is based on [Tran et al. (arXiv:1909.03002)](https://arxiv.org/abs/1909.03002) and [Chao et al. (arXiv:2007.00307)](https://arxiv.org/abs/2007.00307).|
|`floquet_code`| Majorana|The floquet code is based on [Paetznick et al. (arXiv:2202.11829)](https://arxiv.org/abs/2202.11829).|


You can specify pre-defined QEC schemes by selecting the QEC scheme name for the `qecScheme` parameter in the top-level parameters, for example: 

```JSON
{
    "qecScheme": { "name": "surface_code" }
}
```

> [!NOTE]
> If no value is provided for the `qecScheme` parameter, `surface_code` for the gate-based qubit is chosen as the default QEC.


The exact parameters for each pre-defined QEC scheme (including a crossing pre-factor $a$, which can be extracted numerically for simulations) are listed below.

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

#### Custom pre-defined QEC schemes

Pre-defined QEC schemes can be customized by specifying the name and then updating any of the other values. For example, to increase the crossing pre-factor in the floquet code, write:

```JSON
{
    "qecScheme": {
        "name": "floquet_code",
        // only override this value
        "crossingPrefactor": 0.08
    }
}
```

#### Custom your QEC schemes

The Estimator can abstract a customized QEC scheme based on the above formula by providing values for the `crossingPrefactor` $a$ and the `errorCorrectionThreshold` $p^\*$. Further, you need to specify the `logicalCycleTime`, that is, the time to execute a single logical operation, which depends on the code distance and the physical operation time assumptions of the underlying physical qubits. Finally, a second formula computes the `physicalQubitsPerLogicalQubit`, that is, the number of physical qubits required to encode one logical qubit based on the code distance. 

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

Inside the formulas, you can use the variables `oneQubitGateTime`, `twoQubitGateTime`, `oneQubitMeasurementTime`, and `twoQubitJointMeasurementTime`, whose values are taken from the corresponding field from the [physical qubit parameters](#custom-pre-defined-qubit-parameters), as well as the variable `eccDistance` for the code distance computed for the logical qubit, based on the physical qubit properties, the error correction threshold, and the crossing prefactor. The time variables and `eccDistance` can be used to describe the `logicalCycleTime` formula. For the formula `physicalQubitsPerLogicalQubit` only the `eccDistance` can be used.


### Error budget 

The total error budget $\epsilon$ sets the overall allowed error for the algorithm, that is, the number of times it's allowed to unsuccess. Its value must be between 0 and 1 and the default value is 0.001, which corresponds to 0.1%. In other words, the algorithm is allowed to fail once in 1000 executions. This parameter is highly application specific. 

For example, if you're running Shor’s algorithm for factoring integers, a large value for the error budget may be tolerated as one can check that the outputs are indeed the prime factors of the input. On the other hand, a much smaller error budget may be needed for an algorithm solving a problem with a solution, which can't be efficiently verified. 

This budget

$$ \epsilon = \epsilon_{\log} + \epsilon_{\rm dis} + \epsilon_{\rm syn} $$

is uniformly distributed and applies to errors $\epsilon_{\log}$ to implement logical qubits, an error budget $\epsilon_{\rm dis}$ to produce T states through distillation, and an error budget $\epsilon_{\rm syn}$ to synthesize rotation gates with arbitrary angles. 

Note that for distillation and rotation synthesis, the respective error budgets $\epsilon_{\rm dis}$ and $\epsilon_{\rm syn}$ are uniformly distributed among all required T states and all required rotation gates, respectively. If there aren't rotation gates in the input algorithm, the error budget is uniformly distributed to logical errors and T state errors.

## Output data

The Resource Estimator takes the job parameters `{qubitParams, qecScheme, errorBudget}` to evaluate the resource estimates of the requested QIR quantum algorithm. The result of the resource estimation job is printed in groups of output data: physical qubits, breakdown, logical qubit parameters, T factory parameters, pre-layout logical resources, and assumed error budget.

For more information, see [How the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works).

### Physical qubits

|Output data name|Description|
|---|----|
|Physical qubits |Total number of physical qubits, which is the sum of the number of physical qubits to implement the algorithm logic, and the number of physical qubits for running the T factories that are responsible to produce the required T states that are consumed by the algorithm.|
|Runtime|This is a runtime estimate in nanoseconds for the execution time of the algorithm. In general, the execution time corresponds to the duration of one logical cycle multiplied by the logical depth, that is, the number of logical cycles to run the algorithm. If however the duration of a single T-factory (T factory runtime) is larger than the algorithm runtime, the number of logical cycles is extended artificially in order to exceed the runtime of a single T-factory.|

### Resource estimates breakdown

|Output data name|Description|
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

|Output data name|Description|
|---|----|
|QEC scheme|You can load pre-defined QEC schemes by using the name surface_code or floquet_code. The latter only works with Majorana qubits.
|Code distance | The code distance is the smallest odd integer greater or equal to $\dfrac{2\log(\text{Crossing prefactor} / \text{Required logical qubit error rate})}{\log(\text{Error correction threshold}/\text{Single-qubit measurement error rate})} - 1$|
|Physical qubits| The number of physical qubits per logical qubit are evaluated using the physical qubits formula for the QEC scheme, that can be user-specified.|
|Logical cycle time | The runtime of one logical cycle in nanoseconds is evaluated using the physical qubits formula for the QEC scheme, that can be user-specified.|
|Logical qubit error rate |  The logical qubit error rate is computed as $\text{crossing prefactor} \cdot \left(\dfrac{\text{Single-qubit measurement error rate}}{\text{Error correction threshold}}\right)^\frac{\text{Code distance} + 1}{1}$|
|Crossing prefactor | The crossing prefactor is extracted numerically from simulations when fitting an exponential curve to model the relationship between logical and physical error rate.|
|Error correction threshold | The error correction threshold is the physical error rate below which the error rate of the logical qubit is less than the error rate of the physical qubit that constitute it. This value is usually extracted numerically from simulations of the logical error rate.|
|Logical cycle time formula| This is the formula that is used to compute the logical cycle time.|
|Physical qubits formula | This is the formula that is used to compute the number of physical qubits per logical qubits.|

### T factory parameters

|Output data name|Description|
|---|----|
|Physical qubits|This corresponds to the maximum number of physical qubits over all rounds of T distillation units in a T factory. A round of distillation contains of multiple copies of distillation units to achieve the required success probability of producing a T state with the expected logical T state error rate.|
|Runtime |The runtime of a single T factory is the accumulated runtime of executing each round in a T factory.|
|Number of output T states per run|  The T factory takes as input the number of input T states per run with a T gate error rate set in the physical qubit parameters and produces this number of T states with the error rate described in "logical T state error rate".|
|Number of input T states per run |  This value includes the physical input T states of all copies of the distillation unit in the first round.|
|Distillation rounds|This is the number of distillation rounds. In each round one or multiple copies of some distillation unit is executed.|
|Distillation units per round|  This is the number of copies for the distillation units per round.|
|Distillation units|These are the types of distillation units that are executed in each round. The units can be either physical or logical, depending on what type of qubit they are operating. Space-efficient units require fewer qubits for the cost of longer runtime compared to Reed-Muller preparation units.|
|Distillation code distances|This is the code distance used for the units in each round. If the code distance is 1, then the distillation unit operates on physical qubits instead of error-corrected logical qubits.|
|Number of physical qubits per round| The maximum number of physical qubits over all rounds is the number of physical qubits required for the T factory, since qubits are reused by different rounds.|
|Runtime per round|The runtime of the T factory is the sum of the runtimes in all rounds.|
|Logical T state error rate |  This is the logical T state error rate achieved by the T factory which is equal or smaller than the required error rate physicalCountsFormatted/requiredLogicalTstateErrorRate.|

### Pre-layout logical resources

|Output data name|Description|
|---|----|
|Logical qubits (pre-layout)|The number of logical algorithmic qubits is determined from this number by assuming to align them in a 2D grid. Auxiliary qubits are added to allow for sufficient space to execute multi-qubit Pauli measurements on all or a subset of the logical qubits.|
|T gates |This includes all T gates and adjoint T gates, but not T gates required to implement rotation gates with arbitrary angle, CCZ gates, or CCiX gates.|
|Rotation gates| Number of all rotation gates. If an angle corresponds to a Pauli, Clifford, or T gate, it is not accounted for in this number.|
|Rotation depth | Number of all non-Clifford layers that include at least one single-qubit rotation gate with an arbitrary angle.|
|CCZ gates  | Number of CCZ gates in the input quantum program. | 
|CCiX gates  | Number of CCiX gates in the input quantum program, which applies $-iX$ controlled on two control qubits.|
|Measurement operations | Number of single qubit measurements in Pauli basis that are used in the input program. Note that all measurements are counted, however, the measurement result is is determined randomly (with a fixed seed) to be 0 or 1 with a probability of 50%.|

### Assumed error budget

|Output data name|Description|
|---|----|
|Total error budget | The total error budget sets the overall allowed error for the algorithm, that is, the number of times it is allowed to fail. Its value must be between 0 and 1 and the default value is 0.001 (corresponding to 0.1%), which means that the algorithm is allowed to fail once in 1000 executions. If there are no rotation gates in the input algorithm, the error budget is uniformly distributed to logical errors and T state errors.|
|Logical error probability | Probability of at least one logical error, which is one third of the total error budget if the input algorithm contains rotation with gates with arbitrary angles, or one half of it, otherwise.|
|T distillation error probability | Probability of at least one faulty T distillation, which  is one third of the total error budget if the input algorithm contains rotation with gates with arbitrary angles, or one half of it, otherwise.|
|Rotation synthesis error probability | Probability of at least one failed rotation synthesis, which is one third of the total error budget.|

## Next steps

- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Tutorial: Submit a QIR program to the Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
- [Sample: Resource estimation with Q# and VS Code](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/integer-factorization-with-cli)

