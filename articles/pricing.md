---
author: azure-quantum-content
description: Learn about the different pricing plans for Azure Quantum providers, including IonQ, PASQAL, Quantinuum, and Rigetti.
ms.author: quantumdocwriters
ms.date: 09/17/2025
ms.service: azure-quantum
ms.subservice: core
ms.topic: concept-article
no-loc: [target, targets]
title: Pricing Plans for Azure Quantum Providers
uid: microsoft.quantum.providers-pricing

#customer intent: As a quantum developer, I want to understand the pricing plans for Azure Quantum providers, so that I can choose the best plan for my needs.
---

# Pricing plans for Azure Quantum providers

In Azure Quantum, hardware and software providers define and control the pricing of their offerings. The information below is subject to change by providers and some delays in reflecting latest pricing information may exist. Be sure to verify the latest pricing information from the Azure Quantum workspace you are using. 

## IonQ 

[IonQ](xref:microsoft.quantum.providers.ionq) charges based on a token pricing model which billing unit is the *Azure Quantum Token (AQT)*. This model is specific to Azure Quantum. The number of Azure Quantum Tokens is calculated by the following formula:

$$
AQT = m + 0.000220 · (N_{1q} · C) + 0.000975 ·(N_{2q}· C)
$$

where:

- $AQT$ is the number of Azure Quantum Tokens consumed by the program
- $m$ is the minimum price per program execution, which is USD97.50 if error mitigation is on and USD12.4166 if error mitigation is off
- The units $N_{1q} · C$ and $N_{2q} · C$ are called *gate-shots*, where $N_{1q}$ and $N_{2q}$ are the number of one- and two-qubit gates submitted, respectively, and $C$ is the number of execution shots

Multi-controlled two-qubit gates are billed as $6 * (N - 2)$ two-qubit gates, where $N$ is the number of qubits involved in the gate. For example, a NOT gate with three controls would be billed as $(6 * (4 - 2))$ or 12 two-qubit gates. One-qubit gates are billed as 0.225 of a two-qubit gate (rounded down). To learn more about IonQ, visit [IonQ provider page](xref:microsoft.quantum.providers.ionq).

IonQ offers a **pay-as-you-go** plan and a **monthly subscription** plan with access to the quantum simulator, the Aria 1 and Aria 2 25-qubit quantum computers, and IonQ Forte and Forte Enterprise 1 36-qubit quantum computers.

### [Azure Quantum Credits](#tab/tabid-AQcredits)

Azure Quantum Credits consumption is based on a resource-usage model. The cost of use is deducted from your Azure Quantum Credits based on the number of Azure Quantum Tokens (AQTs). To learn more about credits, see [FAQ: Azure Quantum Credits](xref:microsoft.quantum.credits).

|Includes access to| Pricing |
|---|---|  
|IonQ simulator| Free of charge|
|IonQ Aria 1 |<ul><li>USD0.000220 / 1-qubit-gate shot (deducted from your credits)</li><li> USD0.000975 / 2-qubit-gate shot (deducted from your credits)</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|
|IonQ Aria 2 |<ul><li>USD0.000220 / 1-qubit-gate shot (deducted from your credits)</li><li> USD0.000975 / 2-qubit-gate shot (deducted from your credits)</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|
|IonQ Forte 1 |<ul><li>USD0.0001645 / 1-qubit-gate shot (deducted from your credits)</li><li> USD0.001121 / 2-qubit-gate shot (deducted from your credits)</li><li>Minimum price per program execution:<ul><li>USD168.195 - default setting, error mitigation is on</li><li> USD25.7899 if error mitigation is off</li></ul></ul>|
|IonQ Forte Enterprise 1 |<ul><li>USD0.0001645 / 1-qubit-gate shot (deducted from your credits)</li><li> USD0.001121 / 2-qubit-gate shot (deducted from your credits)</li><li>Minimum price per program execution:<ul><li>USD168.195 - default setting, error mitigation is on</li><li> USD25.7899 if error mitigation is off</li></ul></ul>|


> [!IMPORTANT]
> There are no costs or charges for using simulator. However, there may be some small storage costs, as the input and output of your jobs are stored in a storage account that you pay for. Job data is typically <1MB per job.
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
 
### [Pay As You Go](#tab/tabid-paygo)

The Pay-as-you-go plan consists of *a la carte* access to the IonQ Aria 1 and Aria 2 25-qubit, IonQ Forte and Forte Enterprise 36-qubit quantum computers, and the IonQ simulator. The use of the quantum computers is charged based on the number of AQTs + Azure infrastructure costs.

|Includes access to| Pricing|
|---|---|  
|IonQ simulator| Free of charge|
|IonQ Aria 1 |<ul><li>USD0.000220 / 1-qubit-gate shot</li><li>USD0.000975 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|
|IonQ Aria 2 |<ul><li>USD0.000220 / 1-qubit-gate shot</li><li>USD0.000975 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|
|IonQ Forte 1 |<ul><li>USD0.0001645 / 1-qubit-gate shot</li><li>USD0.001121 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD168.195 - default setting, error mitigation is on</li><li> USD25.7899 if error mitigation is off</li></ul></ul>|
|IonQ Forte Enterprise 1 |<ul><li>USD0.0001645 / 1-qubit-gate shot</li><li>USD0.001121 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD168.195 - default setting, error mitigation is on</li><li> USD25.7899 if error mitigation is off</li></ul></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

> [!NOTE]
>  If you're an existing research grant or a Pay-as-you-go customer, you may see another billing unit in addition to AQT, called *Quantum Gate-Shots (QGS)*. The QGS units are equivalent to AQT units. The number of QGS is calculated by the following formula:
> 
> $$
> QGS = N · C
> $$
> where:
> 
> - $QGS$ is the number of quantum gate-shots
> - $N$ is the number of one- or two-qubit gates submitted
> - $C$ is the number of execution shots 

### [Aria-Forte plan](#tab/tabid-aria)

The Aria plan is a monthly subscription plan with access to the IonQ Aria 1 and Aria 2 25-qubit, IonQ Forte and Forte Enterprise 1 36-qubit quantum computers, and the IonQ simulator. The Aria-Forte plan consists of USD25,000/Month + Azure infrastructure costs.

|Includes access to | Pricing |
|---|---|  
|IonQ simulator| Free of charge|
|IonQ Aria 1 |<ul><li>USD0.000220 / 1-qubit-gate shot</li><li>USD0.000975 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|
|IonQ Aria 2 |<ul><li>USD0.000220 / 1-qubit-gate shot</li><li>USD0.000975 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|  
|IonQ Forte 1 |<ul><li>USD0.0001645 / 1-qubit-gate shot</li><li>USD0.001121 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD168.195 - default setting, error mitigation is on</li><li> USD25.7899 if error mitigation is off</li></ul></ul>| 
|IonQ Forte Enterprise 1 |<ul><li>USD0.0001645 / 1-qubit-gate shot</li><li>USD0.001121 / 2-qubit-gate shot</li><li>Minimum price per program execution:<ul><li>USD168.195 - default setting, error mitigation is on</li><li> USD25.7899 if error mitigation is off</li></ul></ul>|   

> [!NOTE]
> Once you have consumed the equivalent cost of the monthly subscription, any overspending is charged as a pay-as-you-go plan.

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

***

## PASQAL

[PASQAL](xref:microsoft.quantum.providers.pasqal) charges for job execution time on its quantum processor - the 100-qubit Fresnel - and its state of the art tensor networks emulator - EMU-TN.

PASQAL offers one billing plan: **Pay As You Go**.


### [Pay As You Go](#tab/tabid-paygoPasqal)

In the Pay-as-you-go plan the usage is charged based on the job execution time only.

|Pricing | Includes access to  |
|---|---|  
|<ul><li>USD 300/QPU hour + Azure infrastructure costs</li><li>USD 15/EMU-TN hour + Azure infrastructure costs </li></ul> | <ul><li>PASQAL Fresnel QPU</li><li>PASQAL EMU-TN </li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

***

## Quantinuum

> [!WARNING]
> Quantinuum will retire the H1-1 hardware on October 15, 2025. If you're on a plan that uses the H1 system, then switch to a plan that supports the H2 hardware.

[Quantinuum](xref:microsoft.quantum.providers.quantinuum) uses a system that charges each job depending on the number of operations in the job, and the number of shots you run. The usage units defined by Quantinuum are*Hardware Quantum Credits (HQCs)* for jobs submitted to quantum computers and emulator HQCs (eHQCs) for jobs submitted to emulators.


HQCs and eHQCs are used to calculate the cost of running a job, and they're calculated based on the following formula:

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of single-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several single-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

To learn more about Quantinuum, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.quantinuum).

Quantinuum provides four subscription plans: **Standard**, **Premium**, **Standard H1 + H2**, and **Premium H1 + H2**. Quantinuum also offers a **Pay as You Go** offering.

### [Subscriptions](#tab/tabid-H2)

Subscriptions are monthly subscription plans available through queued access.

|Plans and Pricing|  Includes access to  |
|---|---|
|**Standard Plan**: USD135,000/Month + Azure infrastructure costs | <ul><li>10k HQCs for use on currently available Quantinuum hardware</li><li>100k eHQCs for use on the Quantinuum emulators</li></ul>|
|**Premium Plan**: USD185,000/Month + Azure infrastructure costs  | <ul><li>17k HQCs for use on currently available Quantinuum hardware</li><li>170k eHQCs for use on the Quantinuum emulators</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Pay as You Go](#tab/tabid-PAYG)

The Pay as You Go plan provides queued access to either the H1 series quantum computers or H2 series quantum computers and is charged per HQC usage. To get additional information on Pay as You Go pricing please contact Quantinuum sales at Sales@Quantinuum.com.

|PAYG Pricing| Includes access to |
|---|---|
|**System Model H1** Per HQC usage + Azure infrastructure costs | <ul><li>System Model H1 quantum computers and emulator|
|**System Model H2** Per HQC usage + Azure infrastructure costs | <ul><li>System Model H2 quantum computers and emulator|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

***
## Rigetti

[Rigetti](xref:microsoft.quantum.providers.rigetti) charges for job execution time on their quantum processors. There's no added charge per job, per shot, or per gate. The [Quantum Virtual Machine (QVM)](https://github.com/quil-lang/qvm) simulator is free for all users under all plans.

Rigetti offers one billing plan:  **Pay As You Go**.

### Pay As You Go

The Pay-as-you-go plan consists of *a la carte* access to Rigetti QPUs. The usage is charged based on the job execution time only.

|Pricing | Includes access to   |
|---|---|  
|USD 0.02 per 10-millisecond increment of job execution time | Rigetti Ankaa-3<br />Rigetti Cepheus-1-36Q |

> [!NOTE]
> If you have questions or run into any issue using Azure Quantum, you can contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Azure Quantum quotas](xref:microsoft.quantum.quotas)
- [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list)

 