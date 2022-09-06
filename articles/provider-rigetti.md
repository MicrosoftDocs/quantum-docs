---
author: kalzoo
ms.author: brbenefield
description: Rigetti provider technical documentation
ms.date: 08/29/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: Rigetti provider
uid: microsoft.quantum.providers.rigetti
---

# Rigetti Provider

[Rigetti quantum processors](https://qcs.rigetti.com/qpus) are universal, gate-model machines based on tunable superconducting qubits. Rigetti's latest Aspen-M family processor is based on proprietary scalable multi-chip technology. System features and device characteristics include enhanced readout capabilities, a speedup in quantum processing times, fast gate times for multiple entangling gate families, rapid sampling via active register reset, and parametric control.

The Aspen chip topology is octagonal with 3-fold (2-fold for edges) connectivity and features both CPHASE and XY entangling gates that allow developers to optimize programs for performance and minimize circuit depth. Rigetti's optimizing quilc compiler transforms abstract quantum algorithms into this set of native gates and produces optimal circuit implementations to be carried out on a Rigetti QPU. These gates offer fast (40ns and 180ns) 1Q and 2Q gate times and program execution rates within qubit coherence times measuring ~20 µs.

- Publisher: [Rigetti](https://rigetti.com)
- Provider ID: `rigetti`

## Targets

All Rigetti targets currently accept two formats:

* `rigetti.quil.v1`, which is the text of a [Quil] program. 
* `rigetti.qir.v1`, which is QIR bitcode.
 
All targets also take the optional `count` integer parameter for defining the number of shots to run. If omitted, the program will only be run once.

The Rigetti provider makes the following targets available:

### Simulators

#### QVM

[QVM is an open-source simulator][QVM] for [Quil]. The `rigetti.sim.qvm` target accepts a [Quil] program as text and runs that program on [QVM] hosted in the cloud, returning simulated results.

- Job Type: `Simulation`
- Data Format: `rigetti.quil.v1`
- Target ID: `rigetti.sim.qvm`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)
- Pricing: Free ($0)

### Quantum Computers

All of Rigetti's [publicly available QPUs](https://qcs.rigetti.com/qpus) are available through Azure Quantum. QPU targets optionally take a `skipQuilc` parameter for skipping the default compilation stage. Note that this list is subject to frequent change over time without advance notice.

#### Aspen-11

A single-chip 40-qubit processor.

- Job Type: `Quantum Program`
- Data Format: `rigetti.quil.v1`, `rigetti.qir.v1`
- Target ID: `rigetti.qpu.aspen-11`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)
- Pricing: $0.02 per 10 millisecond increment of job execution time
#### Aspen-M-2

A multi-chip 80-qubit processor.

- Job Type: `Quantum Program`
- Data Formats: `rigetti.quil.v1`, `rigetti.qir.v1`
- Target ID: `rigetti.qpu.aspen-m-2`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)
- Pricing: $0.02 per 10 millisecond increment of job execution time
### Pricing

[**Rigetti's**](https://rigetti.com) pricing model is simple.

Rigetti's simulator, [**Quantum Virtual Machine (QVM)**] ([https://pyquil-docs.rigetti.com/en/1.9/qvm.html]) is free for all users.

Rigetti's live quantum processors, Aspen-11 and Aspen-M-2, are billed by job execution time only: $0.02 per 10 millisecond increment. There is no added charge per job, per shot, or per gate.

All new Azure Quantum customers benefit from $500 (USD) free Azure Quantum credits to use specifically for Rigetti target(s). To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

In addition to the Azure Quantum Credits plan, Rigetti offers a pay-as-you-go plan for live quantum processors, so you pay only for what you use.

## Input Format

### Quil

All Rigetti targets accept the `rigetti.quil.v1` input format, which is the text of a [Quil] program. By default, the program will be compiled using [quilc] before running. However, [quilc] does not support the pulse level control features ([Quil-T]), so if you want to use those features you must provide a [Native Quil] program (also containing [Quil-T]) as input and specify the `skipQuilc` input parameter.

To make constructing a [Quil] program easier, you can use [`pyQuil`] along with the [`pyquil-for-azure-quantum`] package. Without this package, [`pyQuil`] can be used to _construct_ Quil programs but not submit them to Microsoft Azure.

### QIR

All Rigetti **hardware** (i.e. live) targets support execution of QIR compliant with the [QIR Base Profile, v1](https://github.com/qir-alliance/qir-spec) as `rigetti.qir.v1`.

### Selecting the Right Input Format

Should you use Quil or QIR? It comes down to your end use case. QIR is more accessible for many users; Quil is more powerful today.

If you're using Qiskit, Q#, or another toolkit that supports QIR generation, and your application works on Rigetti targets via Azure Quantum, then QIR is right for you! QIR has a rapidly evolving specification, and Rigetti will continue to increase support for more advanced QIR programs as time passes. What can't be compiled today may well compile tomorrow.

On the other hand, Quil programs express the full set of functionality available to users of Rigetti systems from any platform including Microsoft Azure. If you're looking to tailor the decomposition of your quantum gates or write programs at the pulse level, then you'll want to work in Quil, because those capabilities are not yet available through QIR.

## Example Using [`pyquil-for-azure-quantum`]

The easiest way to submit Quil jobs is using the [`pyquil-for-azure-quantum`] package, as it allows you to leverage the tools and documentation of the [`pyQuil`] library.

```python
from pyquil.gates import CNOT, MEASURE, H
from pyquil.quil import Program
from pyquil.quilbase import Declare
from pyquil_for_azure_quantum import get_qpu, get_qvm

# Note that some environment variables must be set to authenticate with Azure Quantum
qc = get_qvm()  # For simulation
# qc = get_qpu("Aspen-M-2")  # For QPU

program = Program(
    Declare("ro", "BIT", 2),
    H(0),
    CNOT(0, 1),
    MEASURE(0, ("ro", 0)),
    MEASURE(1, ("ro", 1)),
).wrap_in_numshots_loop(5)

# Optionally pass to_native_gates=False to .compile() to skip the compilation stage
result = qc.run(qc.compile(program))
data_per_shot = result.readout_data["ro"]
# Here, data_per_shot is a numpy array, so you can use numpy methods
assert data_per_shot.shape == (5, 2)
ro_data_first_shot = data_per_shot[0]
assert ro_data_first_shot[0] == 1 or ro_data_first_shot[0] == 0

# Let's print out all the data
print("Data from 'ro' register:")
for i, shot in enumerate(data_per_shot):
    print(f"Shot {i}: {shot}")
```

## Example Using `azure-quantum` Python SDK

You can also construct Quil programs manually and submit them using the `azure-quantum` package directly.

```python
from azure.quantum import Workspace
from azure.quantum.target.rigetti import Result, Rigetti, RigettiTarget, InputParams

workspace = Workspace(
    # TODO: Fill in your details here
    subscription_id="",
    resource_group="",
    name="",
    location=""
)

target = Rigetti(
    workspace=workspace,
    name=RigettiTarget.ASPEN_11,  # Defaults to RigettiTarget.QVM for simulation
)

# Any valid Quil program is accepted, but the readout must be named `ro`
readout = "ro"
bell_state_quil = f"""
DECLARE {readout} BIT[2]

H 0
CNOT 0 1

MEASURE 0 {readout}[0]
MEASURE 1 {readout}[1]
"""

num_shots = 5
job = target.submit(
    input_data=bell_state_quil, 
    name="bell state", 
    input_params=InputParams(count=num_shots, skip_quilc=False)
)

print(f"Queued job: {job.id}")
job.wait_until_completed()

print(f"Job completed with state: {job.details.status}")
result = Result(job)  # This throws an exception if the job failed
# You can index a Result with the name of the readout. In this case, `ro`
data_per_shot = result[readout]
# Here, data_per_shot is a list of length num_shots, each entry is a list containing the data for the register for that shot
ro_data_first_shot = data_per_shot[0]
# In this case, because the type of the register is BIT, the type will be integer and the value either 0 or 1
assert isinstance(ro_data_first_shot[0], int)
assert ro_data_first_shot[0] == 1 or ro_data_first_shot[0] == 0

# Let's print out all the data
print(f"Data from '{readout}' register:")
for i, shot in enumerate(data_per_shot):
    print(f"Shot {i}: {shot}")
```

[Quil]: https://github.com/quil-lang/quil
[QVM]: https://github.com/quil-lang/qvm
[quilc]: https://github.com/quil-lang/quilc
[`pyQuil`]: https://pyquil-docs.rigetti.com/en/stable/ 
[Quil-T]: https://pyquil-docs.rigetti.com/en/latest/quilt.html
[Native Quil]: https://pyquil-docs.rigetti.com/en/latest/compiler.html#legal-compiler-input
[`pyquil-for-azure-quantum`]: https://pypi.org/project/pyquil-for-azure-quantum/