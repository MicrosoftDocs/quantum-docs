---
author: SoniaLopezBravo
ms.author: sonialopez
description: This document provides the technical details of the simulators and QPU of the PASQAL quantum provider.
ms.date: 11/13/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: PASQAL quantum computing provider    
uid: microsoft.quantum.providers.pasqal     
---

# PASQAL provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

PASQAL's quantum computers control neutral atoms with optical tweezers, using laser light to manipulate quantum registers with up to a few hundred qubits.

- Publisher: [PASQAL](https://www.pasqal.com/)
- Provider ID: `pasqal`

The following targets available from this provider:

|Target name| Target ID|Number of qubits | Description |
|---|---|---|---|
|[Emu-TN](#emulator) | pasqal.sim.emu_tn| 100 qubits 1D network / 30-50 qubits 2D network| Simulates the time-evolution of a quantum state using the Schrodinger equation corresponding to the actions that the lasers perform. |
|[Fresnel1](#fresnel1) | pasqal.qpu.fresnel | 100 qubits | PASQAL's neutral atoms quantum computer. |

> [!NOTE]
> PASQAL quantum provider is currently available in Private Preview. You can request access to the Private Preview by following [this link](https://aka.ms/AQ/PrivatePreviewRequest). 

## Emulator

PASQAL's Emu-TN emulator run on cluster of 10 DGX nodes, each equipped with 8 NVIDIA A100 GPUs, allow the emulation of PASQAL’s quantum processors. A key tool to gain flexibility. Up to 100 qubits in 2D and 3D arrays can be emulated to develop industrial applications and to advance scientific discovery.

Emu-TN emulator simulates the time-evolution of a quantum state using the Schrodinger's equation corresponding to the actions that the lasers perform.

- Job Type: `Simulation`
- Data Format: `json`
- Target ID: `pasqal.sim.emu_tn`
- Target Execution Profile: N/A

## Fresnel1

Fresnel1 is PASQAL's quantum computer based on neutral atoms. With 100 qubits, control neutral atoms with optimal tweezers and engineer full-stack processor with high connectivity and scalability. 

- Job Type: `Quantum program`
- Data Format: `json`
- Target ID: `pasqal.qpu.fresnel`
- Target Execution Profile: N/A

## Pulser SDK

The QPU of PASQAL is made of neutral atoms controlled by lasers. Individual atoms are trapped at well-defined positions in 1, 2, or 3D lattices.[Pulser](https://github.com/pasqal-io/Pulser) is a  framework for composing, simulating and executing pulse sequences for neutral-atom quantum devices. For more information, see [Pulser documentation](https://pulser.readthedocs.io/en/latest/).

The Pulser SDK allows you to create pulse sequences to apply to the array of atoms. To run quantum circuits on PASQAL's quantum computers, you need to install the Pulser SDK.

To install Pulser SDK packages, run the following code:

```python
    !pip -q install pulser
    !pip -q install pulser-core
```

## Input data format

PASQAL targets accept plain text as input formats. To submit the pulse sequences, you need to convert the Pulser objects into a JSON string that can be used as input data.

```python
# Convert the sequence to a JSON string
def prepare_input_data(seq):
    input_data = {}
    input_data["sequence_builder"] = json.loads(seq.to_abstract_repr())
    to_send = json.dumps(input_data)
    #print(json.dumps(input_data, indent=4, sort_keys=True))
    return to_send
```

Before submitting your quantum job to PASQAL, you need to set proper input and output data format parameters. For example, the following code sets the input data format to `pasqal.pulser.v1` and the output data format to `pasqal.pulser-results.v1`.

```python
# Submit the job with proper input and output data formats
def submit_job(target, seq):
    job = target.submit(
        input_data=prepare_input_data(seq), # Take the JSON string previously defined as input data
        input_data_format="pasqal.pulser.v1",
        output_data_format="pasqal.pulser-results.v1",
        content_type="text/plain",
        name="PASQAL sequence",
        input_params={"count": 10} # Number of shots
    )
```

For more information about how to submit jobs to the PASQAL provider, see [Submit a circuit with a provider-specific format to PASQAL](xref:microsoft.quantum.quickstarts.computing.provider#platform-pasqal).

## Pricing

To see the PASQAL billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#pasqal).
