---
author: SoniaLopezBravo
description: This document provides the technical details of the IonQ quantum computing provider
ms.author: sonialopez
ms.date: 08/09/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: [QIR Base, target, targets]
title: IonQ quantum computing provider
uid: microsoft.quantum.providers.ionq
---

# IonQ provider

> [!IMPORTANT]
> IonQ is retiring their Harmony quantum computer effective September 1, 2024. They will stop taking job submissions for the Harmony platform from the Azure Quantum service on August 15, 2024. Any jobs in the queue as of August 15th will be processed by September 1st. 

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

IonQ’s quantum computers perform calculations by manipulating the hyperfine energy states of Ytterbium ions with lasers. Atoms are nature's qubits — every qubit is identical within and between programs. Logical operations can also be performed on any arbitrary pair of qubits, enabling complex quantum programs unhindered by physical connectivity. Want to learn more? Read IonQ’s [trapped ion quantum computer technology overview](https://ionq.com/technology).

- Publisher: [IonQ](https://ionq.com)
- Provider ID: `ionq`

The following targets are available from this provider:

|Target name |	Target ID|	Number of qubits|	Description|
|---|---|---|---|
|[Quantum simulator](#quantum-simulator)	|ionq.simulator|	29 qubits|	IonQ's cloud-based idealized simulator. Free of cost.|
|[IonQ Aria 1](#ionq-aria-quantum-computer) |	ionq.qpu.aria-1	|25 qubits	|IonQ's Aria trapped-ion quantum computer.|
|[IonQ Aria 2](#ionq-aria-quantum-computer) |	ionq.qpu.aria-2	|25 qubits	|IonQ's Aria trapped-ion quantum computer.|
|[IonQ Forte](#ionq-forte-quantum-computer) |	ionq.qpu.forte	|32 qubits	|IonQ's Forte trapped-ion quantum computer. Available in Private Preview only.|

IonQ's targets correspond to a **:::no-loc text="QIR Base":::** profile. For more information about this target profile and its limitations, see [Understanding target profile types in Azure Quantum](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-base-qir-profile-targets). 

## Quantum simulator

GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer.

- Job type: `Simulation`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.simulator`
- Target Execution Profile: [:::no-loc text="QIR Base":::](xref:microsoft.quantum.target-profiles)

## IonQ Aria quantum computer

IonQ Aria is the flagship of IonQ's trapped-ion quantum computers, with a 25-qubit dynamically reconfigurable system. For more information, see [IonQ Aria (ionq.com)](https://ionq.com/quantum-systems/aria).

> [!IMPORTANT]
> *Debiasing* is enabled on Aria systems by default, and submitted jobs are subject to debiasing-based pricing. For more information about debiasing and how to disable/enable the service, see [Error mitigation](#error-mitigation).

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu.aria-1`, `ionq.qpu.aria-2`
- Target Execution Profile: [:::no-loc text="QIR Base":::](xref:microsoft.quantum.target-profiles)

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `shots`   | int    | No | Number of experimental shots.  |

### System timing

| Measure | Average time duration  |
|---------|----------------------------|
| T1 | 10-100 s  |
| T2 | 1 s| 
| Single-qubit gate | 135 µs | 
| Two-qubit gate | 600 µs | 

### System fidelity

| Operation | Average fidelity |
|-----------|------------------|
| Single-qubit gate | 99.95% (SPAM corrected) |
| Two-qubit gate | 99.6% (not SPAM corrected) |
| SPAM* | 99.61% |

\* State Preparation and Measurement (SPAM): This measurement determines how accurately a quantum computer can set a qubit into its initial state and then measure the result at the end.

IonQ Aria is available through Azure Quantum Credits plan and a separate billing plan. For more information, see [Azure Quantum pricing](/azure/quantum/pricing?tabs=tabid-aria%2Ctabid-AQcreditsQ%2Ctabid-payasgo%2Ctabid-learndevelop&pivots=ide-computing#ionq).

## IonQ Forte quantum computer

IonQ Forte is IonQ's highest-performing, commercially available trapped-ion quantum computer. With a 32-qubit software-configurable system, IonQ Forte is available in Private Preview on Azure Quantum. For more information, see [IonQ Forte (ionq.com)](https://ionq.com/quantum-systems/forte).

> [!IMPORTANT]
> *Debiasing* is enabled on the Forte system by default, and submitted jobs are subject to debiasing-based pricing. For more information about debiasing and how to disable/enable the service, see [Error mitigation](#error-mitigation).

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu.forte`
- Target Execution Profile: [:::no-loc text="QIR Base":::](xref:microsoft.quantum.target-profiles)

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `shots`   | int    | No | Number of experimental shots.  |

## Input format

In Q#, the output of a quantum measurement is a value of type `Result`, which can only take the values `Zero` and `One`. When you define a Q# operation, it can only be submitted to IonQ hardware if the return type is a collection of `Result`s, that is, if the output of the operation is the result of a quantum measurement. The reason for this is because IonQ builds a histogram from the returned values, so it restricts the return type to `Result` to simplify creating this histogram.

IonQ's targets correspond to the [:::no-loc text="QIR Base"::: profile](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-no-control-flow-profile-targets). This profile can't run quantum operations that require the use of the results from qubit measurements to control the program flow. 

## Output format

When you submit a quantum program to the IonQ simulator, it returns the histogram created by the measurements. The IonQ simulator doesn't sample the probability distribution created by a quantum program but instead returns the distribution scaled to the number of shots. This is most apparent when you submit a single shot circuit. You will see multiple measurement results in the histogram for one shot. This behavior is inherent to IonQ simulator, while IonQ QPU actually runs the program and aggregates the results.

## Additional Capabilities

Additional capabilities supported by IonQ hardware are listed here.

| Capability | Description |
| ---- | ---- |
| [Error mitigation](#error-mitigation) | Use debiasing to minimize noise and maximize algorithmic performance on IonQ hardware |
| [Native gates support](#native-gates-support-and-usage) | Define and execute circuits directly on IonQ hardware-native gates |
| [Noise model simulation](#noise-model-simulation)|  Simulate the noise profile that circuits will encounter when you run them on different IonQ hardware.  |

Users can take advantage of these additional capabilities via pass-through parameters in the Azure Quantum Q# and Qiskit providers.

### Error mitigation

IonQ provides the option to enable *quantum error mitigation* when submitting jobs to IonQ hardware. Error mitigation is a compiler-level process that runs and executes multiple symmetric variations of a circuit, and then aggregates the outcomes while mitigating the impact of hardware errors and qubit decoherence. Unlike *quantum error correction* techniques, error mitigation does not require large gate and qubit overhead. 

*Debiasing* is the process of creating slight variations of a given circuit that *should* be identical on an ideal noiseless machine, using techniques such as different qubit assignments, gate decompositions, and pulse solutions, and then executing those variations. 

*Sharpening* and *Averaging* are options for aggregating the results of the variations. Averaging is based equally on all the variation results, whereas Sharpening filters out the erroneous results, and can be more reliable for certain types of algorithms. 

For more information, see [Debiasing and Sharpening](https://ionq.com/resources/debiasing-and-sharpening). For error mitigation pricing, see [IonQ pricing](xref:microsoft.quantum.providers-pricing#ionq).

#### Enabling error mitigation

> [!NOTE]
> *Debiasing* is enabled by default on Aria and Forte systems.

On Azure Quantum, error mitigation can be enabled or disabled for jobs submitted with Q# or with Qiskit.

To enable error mitigation, add an optional parameter for the target machine:

```python

option_params = {
    "error-mitigation": {
        "debias": True
    }
}
```

To disable error mitigation, set the parameter to `False`:

```python

option_params = {
    "error-mitigation": {
        "debias": False
    }
}
```

> [!NOTE]
> If you are also using IonQ's noise model simulation, those parameters can be included here, for example:
> 
> ```python
> option_params = {
>     "error-mitigation": {
>         "debias": False
>     },
>     "noise": {
>     "model": "aria-1",
>     "seed": 100
>     }
> }
> ```
>
> For more information, see [Noise model simulation](#noise-model-simulation).

#### Running a job on Azure Quantum with error mitigation

This example uses a simple random number generator. 

First, import the required packages and initiate the base profile:

```python
import qsharp
import azure.quantum
qsharp.init(target_profile=qsharp.TargetProfile.Base)
```

Next, define the function.

```qsharp
%%qsharp
open Microsoft.Quantum.Measurement;
open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Convert;

operation GenerateRandomBit() : Result {
    use target = Qubit();

    // Apply an H-gate and measure.
    H(target);
    return M(target);
}

and compile the operation:

```python
MyProgram = qsharp.compile("GenerateRandomBit()")
```

Connect to Azure Quantum, select the target machine, and configure the noise parameters for the emulator:

```python
MyWorkspace = azure.quantum.Workspace(
    resource_id = "",
    location = ""
)

MyTarget = MyWorkspace.get_targets("ionq.qpu")

```

Specify the `error-mitigation` configuration

```python

option_params = {
    "error-mitigation": {
        "debias": True
    }
}
```

Pass in the error mitigation configuration when submitting the job:

```python
job = MyTarget.submit(MyProgram, "Experiment with error mitigation", shots = 10, input_params = option_params)
job.get_results()

```

In Qiskit, you pass the optional parameters to the target machine configuration before submitting the job:

```python
circuit.name = "Single qubit random - Debias: True"
backend.options.update_options(**option_params)
job = backend.run(circuit, shots=500)

```

> [!NOTE]
> If you do not pass in the `error-mitigation` parameter, the target machine will use its default setting, which is *enabled* for Aria and Forte systems.
<!--
When you run a job with error mitigation enabled, IonQ makes both aggregate results, Sharpened and Averaged, available. The Average result is returned by default. To view the Sharpened result, pass `sharpen=True` with the `job_result()` call:

```python
result = job.result(sharpen=True)
print(result)
``` 
-->
### Native gates support and usage

By default IonQ allows you to specify a quantum circuit using an abstract set of quantum gates, called `qis`, which allows flexibility and portability when writing an algorithm without worrying about optimization for the hardware.

However, in some advanced usage cases, you might want to define a circuit directly on native gates in order to be closer to the hardware and bypass optimization. The native gate set is the set of quantum gates that are physically executed in the quantum processor, and they map the circuit to those as part of the execution.

For more information, see [Getting Started With Native Gates (ionq.com)](https://ionq.com/docs/getting-started-with-native-gates).

In order to use the native gate set when submitting Qiskit jobs to Azure Quantum, you specify the `gateset` parameter when initializing the backend as in the example below:

```python
# Here 'provider' is an instance of AzureQuantumProvider
backend = provider.get_backend("ionq.qpu", gateset="native")
```

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `gateset`   | string    | No | Specifies the set of gates that will be used to define a circuit. A value of `qis` corresponds to the abstract gates (default behavior) and `native` to the [IonQ hardware native gates](https://ionq.com/docs/getting-started-with-native-gates#introducing-the-native-gates).|

For more information about Qiskit jobs, see [Submit a circuit with Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit).

### Noise model simulation

Even the best of today's quantum hardware has inherent noise, and knowing the noise characteristics of your target system can help you refine your algorithms and get a more realistic prediction of results when running the circuit on hardware. IonQ provides a *noise model simulation* that introduces noise into the circuit using a "noise fingerprint" specific to the target hardware. For more information, see [Get Started with Hardware Noise Model Simulation](https://ionq.com/docs/get-started-with-hardware-noise-model-simulation).

#### Noise model parameters

| Parameter Name | Values     | Description |
|----------------|------------|-------------|
| `noise`        | `model`, `seed` |  Enables the noise model simulation  |
| `model`        | `ideal`, `aria-1` | Specifies the noise model for the target hardware.<ul><li>`ideal` - No noise is introduced into the circuit. This is the same as not enabling the noise simulation.</li><li>`aria-1` - Uses the noise model for the IonQ Aria quantum computer. |
| `seed`        | Integer between 1 and $2^{31}$ (2,147,483,648) | Allows you to specify a seed value for pseudo-random noise and shot-sampling, creating reproducible noisy results. If the parameter is not specified, a random `seed` value is created. |

#### Shot awareness

Noise model simulation is *shot-aware*; that is, it samples measurements from the output state based on the number of shots provided. In Azure Quantum, the `shots` parameter is submitted with the job, and is required for `aria-1` noise models. If no `shot` value is specified, a default value of `1000` is used. If the `ideal` noise model is used, the `shots` parameter is ignored.

#### Qubit capacity

While the `ideal` noise model allows you to simulate up to 29 qubits with the IonQ quantum simulator, the hardware specific noise models are limited to the actual qubit capacity of the target hardware, which is 25 qubits for the `aria-1` noise model.

#### Enabling noise model simulation

On Azure Quantum, noise model simulation can be enabled or disabled for jobs submitted with Q# or with Qiskit.

To enable noise model simulation, add an optional parameter for the target machine, for example:

```python

option_params = {
    "noise": {
        "model": "aria-1",   # targets the Aria quantum computer
        "seed" : 1000         # If seed isn't specified, a random value is used  
    }
}

```

> [!NOTE]
> If you are also using IonQ's error mitigation, those parameters can be included here, for example:
> 
> ```python
> option_params = {
>     "error-mitigation": {
>         "debias": False
>     },
>     "noise": {
>     "model": "aria-1",
>     "seed": 1000
>     }
> }
> ```
>
> For more information, see [Error mitigation](#error-mitigation).

#### Running a job with noise model simulation

You can use the same example program shown previously in [error mitigation](#running-a-job-on-azure-quantum-with-error-mitigation) and add or replace the noise model configuration in `option_params`;

 ```python
 option_params = {
     "error-mitigation": {
         "debias": True
     },
     "noise": {
     "model": "aria",
     "seed": 1000
     }
 }
 ```

Then pass the optional parameters when you submit the job: 

```python
job = MyTarget.submit(MyProgram, "Experiment with noise model simulation", shots = 10, input_params = option_params)
job.get_results()
```

In Qiskit, you pass the optional parameters to the target machine configuration before submitting the job:

```python
circuit.name = "Single qubit random - Debias: True"
backend.options.update_options(**option_params)
job = backend.run(circuit, shots=500)

```


## Pricing

To see IonQ billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#ionq).

## Limits and quotas

IonQ quotas are tracked based on the QPU usage unit, which is *qubit-gate-shot (QGS)*. The resource usage is credited against your account.

Every quantum program consists of $N$ quantum logical gates of one or more qubits, and is executed for a certain number of shots. The number of gate-shots is calculated by the following formula:

$$
QGS = N · C
$$

where:

- $N$ is the number of one- or two-qubit gates submitted
- $C$ is the number of execution shots requested

Quotas are based on plan selection and can be increased with a support ticket. To see your current limits and quotas, go to the **Credits and quotas** blade and select the **Quotas** tab of your workspace on the [Azure portal](https://portal.azure.com). For more information, see [Azure Quantum quotas](xref:microsoft.quantum.quotas).

> [!NOTE]
> If you are using an [Azure Quantum Credits](xref:microsoft.quantum.credits) plan, and not a billing plan, the quotas information maps to your allocated credits. In that case, the quota lists the total number of credits you have received.

## IonQ status

For information about IonQ QPU job processing delays, see [IonQ status page](https://status.ionq.co/). 

## IonQ best practices and connectivity graph

To see recommended best practices for the IonQ QPU, see [IonQ Best Practices (ionq.com)](https://ionq.com/best-practices).
