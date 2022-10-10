---
author: bradben
ms.author: brbenefield
description: This document provides the technical details of the NEW provider
ms.date: 09/07/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: Rigetti provider
uid: microsoft.quantum.providers.rigetti
---

# NEW provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

[Rigetti quantum processors](https://qcs.rigetti.com/qpus) are universal, gate-model machines based on tunable superconducting qubits. Rigetti's latest Aspen-M family processor is based on proprietary scalable multi-chip technology. System features and device characteristics include enhanced readout capabilities, a speedup in quantum processing times, fast gate times for multiple entangling gate families, rapid sampling via active register reset, and parametric control.

The Aspen chip topology is octagonal with 3-fold (2-fold for edges) connectivity. It features both CPHASE and XY entangling gates that allow developers to optimize programs for performance and minimize circuit depth. Rigetti's optimizing quilc compiler transforms abstract quantum algorithms into a set of native gates and produces optimal circuit implementations to be carried out on a Rigetti QPU. These gates offer fast (40 ns and 180 ns) 1Q and 2Q gate times and program execution rates within qubit coherence times measuring ~20 µs.

- Publisher: [Rigetti](https://rigetti.com)
- Provider ID: `rigetti`


The Rigetti provider makes the following targets available:

|Target name|	Target ID|	Number of qubits|	Description|
|---|---|---|---|
|[Quantum Virtual Machine (QVM)](#simulators) |	rigetti.sim.qvm	|-| Open-source simulator for Quil programs. Free of cost.|
|[Aspen-11](#aspen-11) |	rigetti.qpu.aspen-11 | 40 qubits | Rigetti's single-chip quantum processor.	|
|[Aspen-M-2](#aspen-m-2) |	rigetti.qpu.aspen-m-2|	80 qubits	| Rigetti's multi-chip quantum processor. |

Rigetti's targets correspond to a **No Control Flow** profile. For more information about this target profile and its limitations, see [Understanding target profile types in Azure Quantum](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-no-control-flow-profile-targets). 


## Simulators

The [Quantum Virtual Machine (QVM)](https://pyquil-docs.rigetti.com/en/1.9/qvm.html) is an open-source simulator for [Quil]. The `rigetti.sim.qvm` target accepts a [Quil program](#quil) as text and runs that program on QVM hosted in the cloud, returning simulated results.

- Job Type: `Simulation`
- Data Format: `rigetti.quil.v1`
- Target ID: `rigetti.sim.qvm`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-no-control-flow-profile-targets)
- Pricing: Free ($0)

## Quantum computers

All of Rigetti's publicly available [QPUs](https://qcs.rigetti.com/qpus) are available through Azure Quantum. This list is subject to change without advance notice.

### Aspen-11

A single-chip 40-qubit processor.

- Job Type: `Quantum Program`
- Data Format: `rigetti.quil.v1`, `rigetti.qir.v1`
- Target ID: `rigetti.qpu.aspen-11`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-no-control-flow-profile-targets)


### Aspen-M-2

A multi-chip 80-qubit processor.

- Job Type: `Quantum Program`
- Data Formats: `rigetti.quil.v1`, `rigetti.qir.v1`
- Target ID: `rigetti.qpu.aspen-m-2`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-no-control-flow-profile-targets)

> [!IMPORTANT]
>  To submit your quantum program to Rigetti's Aspen-M-2 quantum processor, verify that you have the lastest version of QDK installed. If you are running a [Qiskit circuit in an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.computing.qiskit.portal), copy and run the following code in a cell in your notebook to install the lastest version of QDK and `azure-quantum` package.
>  
> ```python
> !pip install azure-quantum[qiskit]==0.25.228311
> ````
> 
## Pricing

To see Rigetti's billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#rigetti).

## Input format

All Rigetti targets currently accept two formats:

* `rigetti.quil.v1`, which is the text of a [Quil] program. 
* `rigetti.qir.v1`, which is QIR bitcode.
 
All targets also take the optional `count` integer parameter for defining the number of shots to run. If omitted, the program will only run once.

### Quil

All Rigetti targets accept the `rigetti.quil.v1` input format, which is the text of a [Quil] program, which stands for Quantum Instruction Language. By default, the program will be compiled using [quilc] before running. However, quilc doesn't support the pulse level control features ([Quil-T]), so if you want to use those features you must provide a [Native Quil] program (also containing Quil-T) as input and specify the input parameter `skipQuilc: true`.

To make constructing a Quil program easier, you can use [`pyQuil`] along with the [`pyquil-for-azure-quantum`] package. Without this package, `pyQuil` can be used to _construct_ Quil programs but not to submit them to Azure Quantum.

### QIR

All Rigetti **hardware**, that is, live QPU targets, support the execution of Quantum Intermediate Representation (QIR) compliant jobs with the [QIR Base Profile, v1](https://github.com/qir-alliance/qir-spec) as `rigetti.qir.v1`. For more information, see [Quantum Intermediate Representation](xref:microsoft.quantum.concepts.qir).

### Selecting the right input format

Should you use Quil or QIR? It comes down to your end use case. QIR is more accessible for many users, while Quil is more powerful today.

If you're using Qiskit, Q#, or another toolkit that supports QIR generation, and your application works on Rigetti targets via Azure Quantum, then QIR is right for you! QIR has a rapidly evolving specification, and Rigetti will continue to increase support for more advanced QIR programs as time passes - what can't be compiled today may well compile tomorrow.

On the other hand, Quil programs express the full set of functionality available to users of Rigetti systems from any platform including Azure Quantum. If you're looking to tailor the decomposition of your quantum gates or write programs at the pulse level, then you'll want to work in Quil, because those capabilities aren't yet available through QIR.

## Examples

The easiest way to submit Quil jobs is using the [`pyquil-for-azure-quantum`] package, as it allows you to use the tools and documentation of the [`pyQuil`] library.

You can also construct Quil programs manually and submit them using the `azure-quantum` package directly.

### [Use pyquil-for-azure-quantum](#tab/tabid-pyquil)
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

### [Use azure-quantum Python SDK](#tab/tabid-azquantum) 


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
***

[Quil]: https://github.com/quil-lang/quil
[QVM]: https://github.com/quil-lang/qvm
[quilc]: https://github.com/quil-lang/quilc
[`pyQuil`]: https://pyquil-docs.rigetti.com/en/stable/ 
[Quil-T]: https://pyquil-docs.rigetti.com/en/latest/quilt.html
[Native Quil]: https://pyquil-docs.rigetti.com/en/latest/compiler.html#legal-compiler-input
[`pyquil-for-azure-quantum`]: https://pypi.org/project/pyquil-for-azure-quantum/
