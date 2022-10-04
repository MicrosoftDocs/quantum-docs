---
author: SoniaLopezBravo
description: This document provides the technical details of the IonQ quantum computing provider
ms.author: sonialopez
ms.date: 09/21/2022
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

The following targets are available from this provider:

|Target name |	Target ID|	Number of qubits|	Description|
|---|---|---|---|
|[Quantum simulator](#quantum-simulator)	|ionq.simulator|	29 qubits|	IonQ's cloud-based idealized simulator. Free of cost.|
|[IonQ Harmony](#ionq-harmony-quantum-computer) |	ionq.qpu	|11 qubits	|IonQ's trapped-ion quantum computer.|
|[IonQ Aria](#ionq-aria-quantum-computer) |	ionq.qpu.aria-1	|23 qubits	|IonQ's Aria trapped-ion quantum computer.|

IonQ's targets correspond to a **No Control Flow** profile. For more information about this target profile and its limitations, see [Understanding target profile types in Azure Quantum](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-no-control-flow-profile-targets). 


## Quantum simulator
GPU-accelerated idealized simulator supporting up to 29 qubits, using the same set of gates IonQ provide on its quantum hardware—a great place to preflight jobs before running them on an actual quantum computer.

- Job type: `Simulation`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.simulator`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)

## IonQ Harmony quantum computer
The IonQ Harmony is a trapped ion quantum computer and is dynamically reconfigurable in software to use up to 11 qubits. All qubits are fully connected, meaning you can run a two-qubit gate between any pair.

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)

| Parameter Name | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `shots`   | int    | No | Number of experimental shots. Defaults to 500. |

### System timing

| Measure | Average time duration (µs) |
|---------|----------------------------|
| T1 | >10^7 |
| T2 | 200,000 | 
| Single-qubit gate | 10 | 
| Two-qubit gate | 210 | 
| Readout | 100 | 
| Register reset | 25 | 
| Coherence time / gate duration | 1667 | 

### System fidelity

| Operation | Average fidelity |
|-----------|------------------|
| Single-qubit gate | 99.35% (SPAM corrected) |
| Two-qubit gate | 96.02% (not SPAM corrected) |
| SPAM* | 99.3 - 99.8% |
| Geometric mean op | 98.34% |

\* State Preparation and Measurement (SPAM): This measurement determines how accurately a quantum computer can set a qubit into its initial state and then measure the result at the end.

## IonQ Aria quantum computer

IonQ Aria is IonQ's latest generation of trapped-ion quantum computer. With a 23-qubit dynamically reconfigurable sytem, IonQ Aria is available exclusively on Azure Quantum. For more information, see [IonQ Aria (ionq.com)](https://ionq.com/news/february-23-2022-ionq-aria-furthers-lead) .

- Job type: `Quantum Program`
- Data Format: `ionq.circuit.v1`
- Target ID: `ionq.qpu.aria-1`
- Target Execution Profile: [No Control Flow](xref:microsoft.quantum.target-profiles)

IonQ Aria is available through Azure Quantum Credits plan and a separate billing plan. For more information, see [Azure Quantum pricing](/azure/quantum/pricing?tabs=tabid-aria%2Ctabid-AQcreditsQ%2Ctabid-payasgo%2Ctabid-learndevelop&pivots=ide-computing#ionq).

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

## Input format

In Q#, the output of a quantum measurement is a value of type `Result`, which can only take the values `Zero` and `One`. When you define a Q# operation, it can only be submitted to IonQ hardware if the return type is a collection of `Result`s, that is, if the output of the operation is the result of a quantum measurement. The reason for this is because IonQ builds a histogram from the returned values, so it restricts the return type to `Result`s to simplify creating this histogram.

IonQ's targets correspond to [No Control Flow profile](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-no-control-flow-profile-targets). This profile can't run quantum operations that require the use of the results from qubit measurements to control the program flow. 

> [!NOTE]
> Currently, you can't submit quantum programs that apply operations on qubits that have been measured in No Control Flow targets, even
> if you don't use the results to control the program flow. This limitation is
> not inherent to this profile type but is circumstantial to the current situation of the hardware.

## Output format

When you submit a quantum program to the IonQ simulator, it returns the probability histogram created by the measurement. The IonQ simulator doesn't sample the distribution created by a quantum program but instead returns the distribution scaled to the number of shots. This is most apparent when you submit a single shot circuit. You will see multiple measurement results in the probability histogram for one shot. This behavior is inherent to IonQ simulator, while IonQ QPU actually runs the program and aggregates the results.

## Pricing

To see IonQ billing plan, visit [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#ionq).

## Limits & Quotas

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

## IonQ best practices and connectivity graph

To see recommended best practices for the IonQ QPU, see [IonQ Best Practices (ionq.com)](https://ionq.com/best-practices).
