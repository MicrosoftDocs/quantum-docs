---
author: azure-quantum-content
ms.author: quantumdocwriters
description: This document provides the technical details of the simulators and QPU of the Pasqal quantum provider.
ms.date: 03/10/2025
ms.service: azure-quantum
ms.subservice: computing
ms.topic: concept-article
title: Pasqal quantum computing provider
uid: microsoft.quantum.providers.pasqal
---

# Pasqal provider

Pasqal's quantum computers control neutral atoms with optical tweezers, using laser light to manipulate quantum registers with up to a hundred qubits.

- Publisher: [Pasqal](https://www.pasqal.com/)
- Provider ID: `pasqal`

The following targets available from this provider:

| Target name                   | Target ID               | Number of qubits              | Description                                                                                                   |
| ----------------------------- | ----------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [EMU_SV](#emu_sv)             | pasqal.sim.emu-sv       | 25 qubits 1D and 2D networks  | Emulators are backends designed to emulate the dynamics of programmable arrays of neutral atoms.              |
| [EMU_MPS](#emu_mps)           | pasqal.sim.emu-mps      | 80 qubits 1D and 2D networks  | Emulators are backends designed to emulate the dynamics of programmable arrays of neutral atoms.              |
| [EMU_FREE](#emu_free)         | pasqal.sim.emu-free     | 12 qubits 1D and 2D networks  | Emulators are backends designed to emulate the dynamics of programmable arrays of neutral atoms.              |
| [FRESNEL](#fresnel)           | pasqal.qpu.fresnel      | 100 qubits                    | FRESNEL is a hardware neutral atoms QPU - Orion Beta generation.                                              |
| [FRESNEL_CAN1](#fresnel_can1) | pasqal.qpu.fresnel-can1 | 100 qubits                    | FRESNEL_CAN1 is a hardware neutral atoms QPU - Orion Beta generation.                                         |

## EMU_SV

Emulators are backends designed to emulate the dynamics of programmable arrays of neutral atoms.

EMU_SV is a Pulser backend emulating these dynamics using state vectors (SV). State vector representation provides a complete description of the quantum state, enabling highly accurate simulations with GPU acceleration if enabled.

For more information, see the [Pasqal EMU_MPS documentation](https://docs.pasqal.com/emulationtools/emusv/)

- Job Type: `Simulation`
- Data Format: `application/json`
- Target ID: `pasqal.sim.emu-sv`

## EMU_MPS

Emulators are backends designed to emulate the dynamics of programmable arrays of neutral atoms.

EMU_MPS is a Pulser backend emulating this dynamic with matrix product states (MPS). Matrix Product States (MPS) or tensor train (TT) are a specific class of tensor networks that provide a tractable parametrization of quantum states.

For more information, see the [Pasqal EMU_MPS documentation](https://docs.pasqal.com/emulationtools/emumps/)

- Job Type: `Simulation`
- Data Format: `application/json`
- Target ID: `pasqal.sim.emu-mps`

## EMU_FREE

Emulators are backends designed to emulate the dynamics of programmable arrays of neutral atoms.

EMU_FREE is a small Pulser backend on which you can emulate small systems (not more than 12 qubits).

- Job Type: `Simulation`
- Data Format: `application/json`
- Target ID: `pasqal.sim.emu-free`

## FRESNEL

FRESNEL is a hardware neutral atoms QPU (Quantum Processing Unit) - Orion Beta generation. It is an optical machine at heart, utilizing light to trap and manipulate arrays of Rubidium atoms.

By making use of optical tweezers we can assemble an adjustable quantum register for the atoms which will serve as our computational basis. For the Pasqal machine one single trapped atom corresponds to one qubit.

- Job Type: `Quantum program`
- Data Format: `application/json`
- Target ID: `pasqal.qpu.fresnel`

## FRESNEL_CAN1

FRESNEL_CAN1 is a hardware neutral atoms QPU (Quantum Processing Unit) - Orion Beta generation.

It is an optical machine at heart, utilizing light to trap and manipulate arrays of Rubidium atoms.

By making use of optical tweezers we can assemble an adjustable quantum register for the atoms which will serve as our computational basis. For the Pasqal machine one single trapped atom corresponds to one qubit.

- Job Type: `Quantum program`
- Data Format: `application/json`
- Target ID: `pasqal.qpu.fresnel-can1`

## Pulser SDK

In Pasqal QPU, individual atoms are trapped at well-defined positions in 1D or 2D lattices. [Pulser](https://github.com/pasqal-io/Pulser) is a  framework for composing, simulating and executing pulse sequences on neutral atoms quantum devices. For more information, see [Pulser documentation](https://pulser.readthedocs.io/en/latest/).

To install Pulser SDK packages, run the following code:

```python
!pip -q install pulser-simulation #Only for using the local Qutip emulator included in Pulser
!pip -q install pulser-core
```

## Input data format

Pasqal targets accept JSON files as input data format. To submit the pulse sequences, you need to convert the Pulser objects into a JSON string that can be used as input data.

```python
# Convert the sequence to a JSON string
def prepare_input_data(seq):
    input_data = {}
    input_data["sequence_builder"] = json.loads(seq.to_abstract_repr())
    to_send = json.dumps(input_data)
    #print(json.dumps(input_data, indent=4, sort_keys=True))
    return to_send
```

Before submitting your quantum job to Pasqal, you need to set proper input and output data format parameters. For example, the following code sets the input data format to `pasqal.pulser.v1` and the output data format to `pasqal.pulser-results.v1`.

```python
# Submit the job with proper input and output data formats
def submit_job(target, seq):
    job = target.submit(
        input_data=prepare_input_data(seq), # Take the JSON string previously defined as input data
        input_data_format="pasqal.pulser.v1",
        output_data_format="pasqal.pulser-results.v1",
        name="Pasqal sequence",
        shots=100 # Number of shots
    )
```

For more information about how to submit jobs to the Pasqal provider, see [Submit a circuit to Pasqal using Pulser SDK](xref:microsoft.quantum.quickstarts.computing.provider#submit-a-circuit-to-pasqal-using-pulser-sdk).

## Pricing

To see the Pasqal billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#pasqal).

## Limits and quotas

Pasqal quotas apply to the usage of the emulator and QPU and can be increased with a support ticket. To see your current limits and quotas, go to the **Operations** section and select the **Quotas** blade of your workspace on the [Azure portal](https://portal.azure.com). Refer to [Azure Quantum quotas](xref:microsoft.quantum.quotas) for more information.
