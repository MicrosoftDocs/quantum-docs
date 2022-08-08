---
author: SoniaLopezBravo
description: This document provides the technical details of the IonQ quantum computing provider
ms.author: sonialopez
ms.date: 07/26/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: reference
title: IonQ quantum computing provider for Azure Quantum
uid: microsoft.quantum.providers.ionq
---

# IonQ provider

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

IonQ’s quantum computers perform calculations by manipulating the hyperfine energy states of Ytterbium ions with lasers. Atoms are nature's qubits — every qubit is identical within and between programs. Logical operations can also be performed on any arbitrary pair of qubits, enabling complex quantum programs unhindered by physical connectivity. Want to learn more? Read IonQ’s [trapped ion quantum computer technology overview](https://ionq.com/technology).

- Publisher: [IonQ](https://ionq.com)
- Provider ID: `ionq`

## Targets

### Quantum simulator
GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer.

- Job type: `Simulation`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.simulator`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)

### IonQ Harmony quantum computer
The IonQ Harmony is a trapped ion quantum computer and is dynamically reconfigurable in software to use up to 11 qubits. All qubits are fully connected, meaning you can run a two-qubit gate between any pair.

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `shots`   | int    | No | Number of experimental shots. Defaults to 500. |

#### System timing

| Measure | Average time duration (µs) |
|---------|----------------------------|
| T1 | >10^7 |
| T2 | 200,000 | 
| Single-qubit gate | 10 | 
| Two-qubit gate | 210 | 
| Readout | 100 | 
| Register reset | 25 | 
| Coherence time / gate duration | 1667 | 

#### System fidelity

| Operation | Average fidelity |
|-----------|------------------|
| Single-qubit gate | 99.35% (SPAM corrected) |
| Two-qubit gate | 96.02% (not SPAM corrected) |
| SPAM | 99.3 - 99.8% |
| Geometric mean op | 98.34% |

*State Preparation and Measurement (SPAM): This measurement determines how accurately a quantum computer can set a qubit into its initial state and then measure the result at the end.*

### IonQ Aria quantum computer

IonQ Aria is IonQ’s most advanced commercially available quantum computer. Featuring [20 Algorithmic Qubits (#AQ)](https://ionq.com/posts/february-23-2022-algorithmic-qubits), it is also the industry’s most powerful quantum computer based on standard application-oriented industry benchmarks. IonQ Aria can run hundreds of accurate quantum gates in a single algorithm, compared to other quantum systems capable of running only dozens of gates at a time. For more information, see [IonQ Aria (ionq.com)](https://ionq.com/news/february-23-2022-ionq-aria-furthers-lead).

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu.aria-1`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)

IonQ Aria is available through a separate billing plan. For more information, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## Native gates support and usage

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

For more information about Qiskit jobs, see [Submit a circuit with Qiskit using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.computing.qiskit).

## Pricing

To see IonQ billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## Limits & Quotas

IonQ quotas are tracked based on the QPU usage unit, which is *qubit-gate-shot (QGS)*. The resource usage is credited against your account.

Every quantum program consists of $N$ quantum logical gates of one or more qubits, and is executed for a certain number of shots. The number of gate-shots is calculated by the following formula:

$$
QGS = N · C
$$

where:

- $N$ is the number of one- or two-qubit gates submitted
- $C$ is the number of execution shots requested

Quotas are based on plan selection and can be increased with a support ticket. To see your current limits and quotas, go to the “Credits and quotas” blade and select the “Quotas” tab of your workspace on the [Azure portal](https://portal.azure.com). For more information, see [Azure Quantum quotas](xref:microsoft.quantum.quotas).

> [!NOTE]
> If you are using an [Azure Quantum Credits](xref:microsoft.quantum.credits) plan, and not a billing plan, the quotas information maps to your allocated credits. In that case, the quota lists the total number of credits you have received.

## IonQ best practices and connectivity graph

To see recommended best practices for the IonQ QPU, see [IonQ Best Practices (ionq.com)](https://ionq.com/best-practices).
