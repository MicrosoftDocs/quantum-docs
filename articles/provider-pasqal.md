---
author: azure-quantum-content
ms.author: quantumdocwriters
description: This document provides the technical details of the simulators and QPU of the PASQAL quantum provider.
ms.date: 03/10/2025
ms.service: azure-quantum
ms.subservice: computing
ms.topic: concept-article
title: PASQAL quantum computing provider    
uid: microsoft.quantum.providers.pasqal     
---

# PASQAL provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

PASQAL's quantum computers control neutral atoms with optical tweezers, using laser light to manipulate quantum registers with up to a hundred qubits.

- Publisher: [PASQAL](https://www.pasqal.com/)
- Provider ID: `pasqal`

The following targets available from this provider:

|Target name| Target ID|Number of qubits | Description |
|---|---|---|---|
|[Emu-TN](#emulator) | pasqal.sim.emu-tn| 100 qubits 1D and 2D networks| Simulates the time-evolution of a quantum state using the Schrödinger equation corresponding to the actions that the lasers perform. |
|[Fresnel](#fresnel) | pasqal.qpu.fresnel | 100 qubits | PASQAL's neutral atoms quantum computer. |

<!--  -->
### Emulator

PASQAL's Emu-TN emulator simulates the time-evolution of a quantum state using the Schrödinger's equation corresponding to the actions that the lasers perform.

Emu-TN emulator runs on a cluster of DGX nodes, each equipped with NVIDIA A100 GPUs, enabling the emulation of PASQAL’s quantum processors. It's a key tool to prototype and validate quantum programs before running them on the QPU . Up to 100 qubits in 2D arrays can be emulated to develop industrial applications and to advance scientific discovery.

- Job Type: `Simulation`
- Data Format: `application/json`
- Target ID: `pasqal.sim.emu-tn`
- Target Execution Profile: N/A

## Fresnel

Fresnel is PASQAL's quantum computer based on neutral atoms. The neutral atoms, controlled by optical tweezers, compose an array of 100 qubits.

Neutral atoms quantum devices use highly focused lasers, so-called optical tweezers, to trap and manipulate neutral atoms individually to create 1D or 2D  qubit arrays  in arbitrary configurations. Current PASQAL generation of devices use around 100 rubidium atoms for computations. Each qubit is represented by a two-level energy state in a Rubidium atom, usually a ground state and a Rydberg state which is a high energy state.  

- Job Type: `Quantum program`
- Data Format: `application/json`
- Target ID: `pasqal.qpu.fresnel`
- Target Execution Profile: N/A

## Pulser SDK

In PASQAL QPU, individual atoms are trapped at well-defined positions in 1D or 2D lattices. [Pulser](https://github.com/pasqal-io/Pulser) is a  framework for composing, simulating and executing pulse sequences on neutral atoms quantum devices. For more information, see [Pulser documentation](https://pulser.readthedocs.io/en/latest/).

To install Pulser SDK packages, run the following code:

```python
    !pip -q install pulser-simulation #Only for using the local Qutip emulator included in Pulser
    !pip -q install pulser-core
```

## Input data format

PASQAL targets accept JSON files as input data format. To submit the pulse sequences, you need to convert the Pulser objects into a JSON string that can be used as input data.

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
        name="PASQAL sequence",
        shots=100 # Number of shots
    )
```

For more information about how to submit jobs to the PASQAL provider, see [Submit a circuit to PASQAL using Pulser SDK](xref:microsoft.quantum.quickstarts.computing.provider#submit-a-circuit-to-pasqal-using-pulser-sdk).

## Pricing

To see the PASQAL billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#pasqal).

## Limits and quotas

PASQAL quotas apply to the usage of the emulator and QPU and can be increased with a support ticket. 
To check your current limits and quotas, navigate to the Credits and quotas section, then select the Quotas tab in your workspace on the [Azure portal](https://portal.azure.com). Refer to [Azure Quantum quotas](xref:microsoft.quantum.quotas) for more information.
