---
author: bradben
description: This document provides the technical details of the Quantinuum quantum provider
ms.author: brbenefield
ms.date: 03/01/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: Quantinuum provider
uid: microsoft.quantum.providers.quantinuum
---

# Quantinuum provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Quantinuum provides access to trapped-ion systems with high-fidelity, fully connected qubits, and the ability to perform mid-circuit measurement.

- Publisher: [Quantinuum]
- Provider ID: `quantinuum`

## Targets

The following targets are available from this provider:

|Target name|	Target ID| Number of qubits| Integrated support |Description|
|---|---|---|---|
|[H1-1 Syntax Checker](#syntax-checkers) | quantinuum.sim.h1-1sc| 20 qubits| Yes | Use this to validate quantum programs against the H1-1 compiler before submitting to hardware or emulators on Quantinuum's platform. Free of cost.|
|[H1-2 Syntax Checker](#syntax-checkers) | quantinuum.sim.h1-2sc | 12 qubits| Yes | Use this to validate quantum programs against the H1-2 compiler before submitting to hardware or emulators on Quantinuum's platform. Free of cost.|
|[H1-1 Emulator](#system-model-h1-emulators) | quantinuum.sim.h1-1e | 20 qubits| Yes | Uses a realistic physical model and noise model of H1-1.|
|[H1-2 Emulator](#system-model-h1-emulators)|quantinuum.sim.h1-2e | 12 qubits| Yes | Uses a realistic physical model and noise model of H1-2.|
|[H1-1](#system-model-h1)| quantinuum.qpu.h1-1 | 20 qubits| Yes | Quantinuum's H1-1 trapped ion device.|
|[H1-2](#system-model-h1)| quantinuum.qpu.h1-2 |12 qubits| Yes | Quantinuum's H1-2 trapped ion device.|

Quantinuum's targets correspond to a **Basic Measurement Feedback** profile. For more information about this target profile and its limitations, see [Understanding target profile types in Azure Quantum](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-basic-measurement-feedback-profile-targets).

To get started using the Quantinuum provider on Azure Quantum, see [Get started with Q# and an Azure Quantum notebook](xref:microsoft.quantum.get-started.notebooks).

## Syntax Checkers

We recommend that users first validate their code using a Syntax Checker. This is a tool to verify proper syntax, compilation completion, and machine compatibility. Syntax Checkers use the same compiler as the quantum computer they target. For example, the H1-2 syntax checker uses the same compiler as H1-2. The full compilation stack is executed with the exception of the actual quantum operations. If the code compiles, the syntax checker will return a `success` status and a result of all 0s. If the code does not compile, the syntax checker will return a failed status and give the error returned to help users debug their circuit syntax. Syntax Checkers allow developers to validate their code at any time, even when machines are offline.

- Job type: `Simulation`
- Data Formats: `honeywell.openqasm.v1`, `honeywell.qir.v1`
- Target ID:
  - H1-1 Syntax Checker: `quantinuum.sim.h1-1sc`
  - H1-2 Syntax Checker: `quantinuum.sim.h1-2sc`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

Syntax Checkers usage is offered free-of-charge.

## System Model H1 Emulators

After validating the syntax of their code with a Syntax Checker, users can take advantage of Quantinuum's System Model H1 Emulators, emulation tools which contain a detailed physical model and realistic noise model of the actual System Model H1 hardware. The noise models are derived from a detailed characterization of the hardware. The System Model H1 Emulators use an identical API for job submission as the System Model H1 hardware, enabling seamless transition from emulation to hardware. To help maximize productivity and shorten development time, the System Model H1 Emulators are available even while the hardware is offline.

More information can be found in the *System Model H1 Emulator Product Data Sheet* found on the [System Model H1] page.

- Job type: `Simulation`
- Data Format: `honeywell.openqasm.v1`, `honeywell.qir.v1`
- Target ID: 
  - H1-1 Emulator: `quantinuum.sim.h1-1e` 
  - H1-2 Emulator: `quantinuum.sim.h1-2e`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

System Model H1 Emulator usage is offered free-of-charge with a hardware subscription. For details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## System Model H1

The System Model H1 generation of quantum computers, Powered by Honeywell, are comprised of a Quantum charge-coupled device (QCCD) with one linear section and currently includes two machine targets: H1-1 and H1-2. Both quantum computers have fundamentally the same design and both meet a nominal set of technical requirements. However, they may have system-to-system variability in exact performance and features, such as the maximum number of available qubits. Users are encouraged to test compatibility of their code by submitting jobs to a [syntax checker](#syntax-checkers) and [System Model H1 Emulator](#system-model-h1-emulators) prior to submitting them to the target machines.

Both System Model H1 machines, H1-1 and H1-2, are continuously upgraded throughout their product lifecycle. Users are given access to the most up-to-date, advanced, and capable hardware available.

More information can be found in the *System Model H1 Product Data Sheet* found on the [System Model H1] page.

- Job type: `Quantum Program`
- Data Format: `honeywell.openqasm.v1`, `honeywell.qir.v1`
- Target ID:
  - H1-1: `quantinuum.qpu.h1-1`
  - H1-2: `quantinuum.qpu.h1-2`
- Target Execution Profile: [Basic Measurement Feedback](xref:microsoft.quantum.target-profiles)

## Additional Capabilities

Additional capabilities available via the Quantinuum API are listed here.

| Capability | Description |
| ---- | ---- |
| [Mid-Circuit Measurement and Qubit Reuse (MCMR)](#mid-circuit-measurement-and-qubit-reuse) | Measure qubits in the middle of a circuit and reuse them |
| [Arbitrary Angle ZZ Gates](#arbitrary-angle-zz-gates) | Directly perform 2-qubit arbitrary angle gate rotations |
| [Emulator Noise Parameters](#emulator-noise-parameters) | Experiment with the noise parameters used in the Quantinuum H-Series emulators |
| [TKET Optimizations in H-Series Stack](#tket-compilation-in-h-series-stack) | Experiment with turning on different levels of TKET optimizations in the H-Series stack |

Users can take advantage of these additional capabilities via circuit functions or pass-through parameters in the Azure Quantum Q# and Qiskit providers.

### Mid-circuit Measurement and Qubit Reuse

Mid-circuit Measurement and Qubit Reuse (MCMR) enables users to measure qubits in the middle of a circuit and re-use them.

Due to the internal level structure of trapped-ion qubits, a mid-circuit measurement may leave the qubit in a non-computational state. All mid-circuit measurements should be followed by initialization if the qubit is to be used again in that circuit. The code examples below demonstrate this.

When a subset of qubits is measured in the middle of the circuit, the classical information from these measurements can be used to condition future elements of the circuit. The examples also highlight this usage. 

For information on Mid-circuit Measurement and Qubit Reuse (MCMR) in Quantinuum systems, see the *System Model H1 Product Data Sheet* on the [System Model H1] page.

#### [MCMR with Q# Provider](#tab/tabid-mcmr-with-q-provider)

In Q#, the `MResetZ` function can be used both to measure a qubit and reset it. For more information on this function, see [`MResetZ`] in the Q# documentation.

```python
%%qsharp
open Microsoft.Quantum.Intrinsic;
open Microsoft.Quantum.Measurement;

operation ContinueComputationAfterReset() : Result[] {
    // Set up circuit with 2 qubits
    use qubits = Qubit[2];

    // Perform Bell Test
    H(qubits[0]);
    CNOT(qubits[0], qubits[1]);

    // Measure Qubit 1 and reset it
    let res1 = MResetZ(qubits[1]);

    // Continue additional computation, conditioned on qubits[1] measurement outcome
    if res1 == One {
         X(qubits[0]);
    }
    CNOT(qubits[0], qubits[1]);

    // Measure qubits and return results
    let res2 = Measure([PauliZ, PauliZ], qubits);
    return [res1, res2];
}
```

#### [MCMR with Qiskit Provider](#tab/tabid-mcmr-with-qiskit-provider)

In Qiskit, qubits are explicitly measured and reset. Conditional operations can be specified using the `c_if` function following a gate.

```python
from qiskit import QuantumRegister, ClassicalRegister, QuantumCircuit

# Set up quantum circuit
q = QuantumRegister(2)
c = ClassicalRegister(2)
circuit = QuantumCircuit(q, c)
circuit.name = "MCMR Example with Conditional Logic"

# Perform Bell Test
circuit.h(q[0])
circuit.cnot(q[0], q[1])

# Measure and reset Qubit 1
circuit.measure(q[1], c[1])
circuit.reset(q[1])

# Continue additional computation, conditioned on Qubit 1's measurement outcome
circuit.x(q[0]).c_if(c, 1)
circuit.cnot(q[0], q[1])

# Measure all qubits
circuit.measure(q, c)

# Print out the circuit
circuit.draw()
```

***

### Arbitrary Angle ZZ Gates

Quantinuum's native gate set includes arbitrary angle ZZ gates. This is beneficial for reducing the 2-qubit gate count for many quantum algorithms and gate sequences. For information on Arbitrary Angle ZZ gates in Quantinuum systems, see the *System Model H1 Product Data Sheet* on the [System Model H1] page.

#### [Arbitrary Angle ZZ Gates with Q# Provider](#tab/tabid-arbitrary-angle-zz-gates-with-q-provider)

In Q\#, the arbitrary angle ZZ gate is implemented with the [Rzz](xref:Microsoft.Quantum.Intrinsic.Rzz) operation.

```python
%%qsharp
open Microsoft.Quantum.Intrinsic;
open Microsoft.Quantum.Measurement;
open Microsoft.Quantum.Arrays;

operation ContinueComputationAfterReset(theta : Double) : Result[] {
    
    // Set up circuit with 2 qubits
    use qubits = Qubit[2];

    // Create array for measurement results
    mutable resultArray = [Zero, size = 2];

    H(qubits[0]);
    Rz(theta, qubits[0]);
    Rz(theta, qubits[1]);
    X(qubits[1]);

    // Add Arbitrary Angle ZZ gate
    Rzz(theta, qubits[0], qubits[1]);  

    // Measure qubits and return results
    for i in IndexRange(qubits) {
        set resultArray w/= i <- M(qubits[i]);  
    }
    
    return resultArray;
}
```

#### [Arbitrary Angle ZZ Gates with Qiskit Provider](#tab/tabid-arbitrary-angle-zz-gates-with-qiskit-provider)

In Qiskit, the arbitrary angle ZZ gate is implemented with the [`rzz`] function.

```python
from qiskit import QuantumCircuit

theta = 0.25

# Set up quantum circuit
circuit = QuantumCircuit(2, 2)
circuit.name = "Arbitrary Angle ZZ Gate Example"

circuit.h(0)
circuit.rz(theta, 0)
circuit.rz(theta, 1)
circuit.x(1)

# Add arbitrary angle ZZ gate
circuit.rzz(theta, 0, 1)

circuit.measure_all()
```

***

### Emulator Noise Parameters

Users have the option of experimenting with the noise parameters of the Quantinuum emulators. **Only a few of the available noise parameters are highlighted** here demonstrating how to pass through the parameters in the Azure Quantum providers.

For more information on the full set of noise parameters available, see the *System Model H1 Emulator Product Data Sheet* on the [System Model H1] page.

#### [Emulator Noise Parameters with Q# Provider](#tab/tabid-emulator-noise-parameters-with-q-provider)

First, declare the function we will define in Q# as a callable so that Python recognizes the symbol.

```python
GenerateRandomBit: any = None
```

Next, define the function.

```python
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

```

Now, configure the noise parameters for the emulator and submit the job. 

```python
# Set the emulator target to submit to
qsharp.azure.target("quantinuum.sim.h1-1e")

# Update the parameter names desired
# Note: This is not the full set of options available. 
# For the full set, see the System Model H1 Emulator Product Data Sheet
option_params = {
    "error-params": {
        "p1": 4e-5,
        "p2": 3e-3,
        "p_meas": 3e-3,
        "p_init": 4e-5,
        "p_crosstalk_meas": 1e-5,
        "p_crosstalk_init": 3e-5,
        "p1_emission_ratio": 6e-6,
        "p2_emission_ratio": 2e-4
    }
}

# Pass in the options when submitting the job
result = qsharp.azure.execute(GenerateRandomBit, 
                              shots = 100, 
                              jobName = "Experiment with Emulator Noise Parameters", 
                              timeout = 240,
                              jobParams = option_params)
```

#### [Emulator Noise Parameters with Qiskit Provider](#tab/tabid-emulator-noise-parameters-with-qiskit-provider)

```python
# Specify the emulator backend target to submit to
backend = provider.get_backend("quantinuum.sim.h1-2e")

# Update the parameter names desired
# Note: This is not the full set of options available. 
# For the full set, see the System Model H1 Emulator Product Data Sheet
option_params = {
    "error-params": {
        "p1": 4e-5,
        "p2": 3e-3,
        "p_meas": 3e-3,
        "p_init": 4e-5,
        "p_crosstalk_meas": 1e-5,
        "p_crosstalk_init": 3e-5,
        "p1_emission_ratio": 6e-6,
        "p2_emission_ratio": 2e-4
    }
}
backend.options.update_options(**option_params)

# Submit the job
job = backend.run(circuit, count=100)
print("Job id:", job.id())
```

***

### TKET Compilation in H-Series Stack

Circuits submitted to Quantinuum H-Series systems are automatically run through TKET compilation passes for H-Series hardware. This enables circuits to be automatically optimized for H-Series systems and run more efficiently.

More information on the specific compilation passes applied can be found in the [`pytket-quantinuum`] documentation, specifically the [`pytket-quantinuum` Compilation Passes] section. 

In the H-Series software stack, the optimization level applied is set with the `tket-opt-level` parameter. *The default compilation setting for all circuits submitted to H-Series systems is optimization level 2.*

Users who would like to experiment with the TKET compilation passes and see what optimizations would apply to their circuits *before* submitting any jobs can see the *Quantinuum_compile_without_api.ipynb* notebook in the [`pytket-quantinuum` Examples] folder.

For more information on `pytket`, see the following links:

- [`pytket`]
- [`pytket` User Manual]

#### [TKET Compilation with Q# Provider](#tab/tabid-tket-compilation-with-q-provider)

First, declare the function we will define in Q# as a callable so that Python recognizes the symbol.

```python
GenerateRandomBit: any = None
```

Next, define the function.

```python
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

```

Now, configure the TKET optimization level parameter and submit the job. 

```python
# Set the target to submit to
qsharp.azure.target("quantinuum.sim.h1-1e")

# Update TKET optimization level desired
option_params = {
    "tket-opt-level": 1
}

# Pass in the options when submitting the job
result = qsharp.azure.execute(GenerateRandomBit, 
                              shots = 100, 
                              jobName = "Experiment with TKET Compilation", 
                              timeout = 240,
                              jobParams = option_params)
```

#### [TKET Compilation with Qiskit Provider](#tab/tabid-tket-compilation-with-qiskit-provider)

```python
# Specify the backend target to submit to
backend = provider.get_backend("quantinuum.sim.h1-2e")

# Update TKET optimization level desired
option_params = {
    "tket-opt-level": 1
}
backend.options.update_options(**option_params)

# Submit the job
job = backend.run(circuit, count=100)
print("Job id:", job.id())
```

***

## Technical Specifications

Technical details for the System Model H1 and System Model H1 Emulators can be found in Quantinuum's product data sheets on the [System Model H1] page alongside links to Quantinuum specification and quantum volume data repositories and how to cite usage of Quantinuum systems.

## Target Availability

The Quantinuum H-Series quantum computers are designed to be continuously upgraded, which allows customers to have access to the latest hardware capabilities as Quantinuum continually improves gate fidelities, memory errors, and system speed. 

Quantinuum hardware cycles through commercial periods and development periods. During commercial periods, the hardware is available to process jobs via a queue system. During development periods, the hardware is offline as upgrades are applied.

Every month, a calendar is sent to Quantinuum users with information on the commercial and development periods. If you have not received this calendar, please email QCsupport@quantinuum.com.

A target's status indicates its current ability to process jobs. The possible states of a target include:

- **Available**: The target is online, processing submitted jobs and accepting new ones.
- **Degraded**: The target is accepting jobs, but not currently processing them.
- **Unavailable**: The target is offline, not accepting new job submissions.

For the Quantinuum quantum computer targets, **Available** and **Degraded** correspond to commercial periods, while **Unavailable** corresponds to development periods where the machine is offline for upgrades.

Current status information may be retrieved from the *Providers* tab of a workspace on the [Azure portal].

## Pricing

To see Quantinuum's billing plans, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## Limits & Quotas

Quantinuum's quotas are tracked based on the QPU usage credit unit, *H-System Quantum Credit (HQC)*, for jobs submitted to System Model H1 quantum computers, and emulator HQCs (eHQCs) for jobs submitted to System Model H1 emulators.

HQCs and eHQCs are used to calculate the cost of running a job, and they are calculated based on the following formula:

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

Quotas are based on plan selection and can be increased with a support ticket. To see your current limits and quotas, go to the **Credits and quotas** blade and select the **Quotas** tab of your workspace on the [Azure portal]. For more information, see [Azure Quantum quotas](xref:microsoft.quantum.quotas).

> [!NOTE]
> If you are using an [Azure Quantum Credits](xref:microsoft.quantum.credits) plan, and not a billing plan, the quotas information maps to your allocated credits. In that case, the quota lists the total number of credits you have received.

[Quantinuum]: https://www.quantinuum.com
[System Model H1]: https://www.quantinuum.com/products/h1
[`MResetZ`]: /qsharp/api/qsharp/microsoft.quantum.measurement.mresetz
[`rzz`]: https://qiskit.org/documentation/stubs/qiskit.circuit.QuantumCircuit.rzz.html
[`pytket-quantinuum`]: https://github.com/CQCL/pytket-quantinuum
[`pytket`]: https://cqcl.github.io/tket/pytket/api/#
[`pytket` User Manual]: https://cqcl.github.io/pytket/manual/index.html
[`pytket-quantinuum` Compilation Passes]: https://cqcl.github.io/pytket-quantinuum/api/#default-compilation
[`pytket-quantinuum` Examples]: https://github.com/CQCL/pytket-quantinuum/tree/develop/examples
[Azure portal]: https://portal.azure.com
