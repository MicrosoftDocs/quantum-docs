---
author: SoniaLopezBravo
description: Learn about the different pricing plans for Azure Quantum providers, including IonQ, PASQAL, Quantinuum, and Rigetti.
ms.author: sonialopez
ms.date: 06/18/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [target, targets]
title: Pricing Plans for Azure Quantum Providers
uid: microsoft.quantum.providers-pricing

#customer intent: As a quantum developer, I want to understand the pricing plans for Azure Quantum providers, so that I can choose the best plan for my needs.
---

# Pricing plans for Azure Quantum providers

In Azure Quantum, hardware and software providers define and control the pricing of their offerings. The information below is subject to change by providers and some delays in reflecting latest pricing information may exist. Be sure to verify the latest pricing information from the Azure Quantum workspace you are using. 

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]
 
## IonQ 

[IonQ](https://ionq.com/) charges based on the number of gates in your program, the complexity of the gates you use, and the number of shots. These units are called *gate-shots*.

Every quantum program consists of $N$ quantum logical gates of one or more qubits, and is executed for a certain number of shots. The number of gate-shots is calculated by the following formula:

$$
QGS = N · C
$$

where:

- $N$ is the number of one- or two-qubit gates submitted
- $C$ is the number of execution shots requested

Multi-controlled two-qubit gates are billed as $6 * (N - 2)$ two-qubit gates, where $N$ is the number of qubits involved in the gate. For example, a NOT gate with three controls would be billed as $(6 * (4 - 2))$ or 12 two-qubit gates. One-qubit gates are billed as 0.225 of a two-qubit gate (rounded down). To learn more about IonQ, visit [IonQ provider page](xref:microsoft.quantum.providers.ionq).

All new Azure Quantum customers benefit of a one-time USD500 free Azure Quantum credits toward IonQ provider to use in IonQ QPUs Harmony and Aria, and quantum simulator. Besides the Azure Quantum Credits plan, IonQ offers a **pay-as-you-go** plan with access to the quantum simulator and the IonQ Harmony 11-qubit quantum computer, and a **monthly subscription** plan which expands the access to the IonQ Aria 1 25-qubit quantum computer. 

### [Azure Quantum Credits](#tab/tabid-AQcredits)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credit balance. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Includes access to  |
|---|---|  
|Use is deducted from the Azure Quantum Credits based on the number of QGSs executed| <ul><li>IonQ Harmony QPU</li><li>IonQ Aria QPU</li><li>IonQ Simulator (free)</li></ul>|
|IonQ Harmony |<ul><li>1-Qubit Gate Shot: USD0.00003 deducted from your credits</li><li>2-Qubit Gate Shot: USD0.0003 deducted from your credits</li><li>Minimum price per program execution:<ul><li> USD1.00 if error mitigation is off</li><li>USD5.00 if error mitigation is on</li></ul></ul>|
|IonQ Aria 1 |<ul><li>1-Qubit Gate Shot: USD0.000220 deducted from your credits</li><li>2-Qubit Gate Shot: USD0.000975 deducted from your credits</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|
|IonQ Forte (Private preview) |<ul><li>1-Qubit Gate Shot: USD0.000220 deducted from your credits</li><li>2-Qubit Gate Shot: USD0.000975 deducted from your credits</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to switch to a different plan to continue using IonQ. Azure Quantum won’t charge you when you reach your credit limit.

> [!IMPORTANT]
> There are no costs or charges for using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job.
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
 
### [Pay As You Go](#tab/tabid-paygo)

The Pay-as-you-go plan consists of *a la carte* access to the 11-qubit trapped ion quantum computer and the quantum simulator, charged on a resource-usage model.  

|Pricing | Includes access to|
|---|---|  
| Use is charged based on the number of QGSs executed + Azure infrastructure costs | <ul><li>IonQ Harmony QPU</li><li>IonQ Aria 1 QPU</li><li>IonQ Simulator (free)</li></ul>|
|IonQ Harmony |<ul><li>1-Qubit Gate Shot: USD0.00003</li><li>2-Qubit Gate Shot: USD0.0003</li><li>Minimum price per program execution:<ul><li> USD1.00 if error mitigation is off</li><li>USD5.00 if error mitigation is on</li></ul></ul>|
|IonQ Aria 1 |<ul><li>1-Qubit Gate Shot: USD0.000220</li><li>2-Qubit Gate Shot: USD0.000975</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|
|IonQ Forte (Private preview)|<ul><li>1-Qubit Gate Shot: USD0.000220</li><li>2-Qubit Gate Shot: USD0.000975</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Aria plan](#tab/tabid-aria)

The Aria plan is a monthly subscription plan with access to the IonQ Aria 1 25-qubit quantum computer. The subscription also includes access to the IonQ simulator and IonQ Harmony 11-qubit quantum computer.

|Pricing |  Includes access to |
|---|---|  
|USD25,000/Month + Azure infrastructure costs| <ul><li>IonQ Harmony QPU</li><li>IonQ Aria QPU</li><li>IonQ Simulator (free)</li></ul>|
|IonQ Harmony |<ul><li>1-Qubit Gate Shot: USD0.00003</li><li>2-Qubit Gate Shot: USD0.0003</li><li>Minimum price per program execution:<ul><li> USD1.00 if error mitigation is off</li><li>USD5.00 if error mitigation is on</li></ul></ul>|
|IonQ Aria 1 |<ul><li>1-Qubit Gate Shot: USD0.000220</li><li>2-Qubit Gate Shot: USD0.000975</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|  
|IonQ Forte (Private preview)|<ul><li>1-Qubit Gate Shot: USD0.000220</li><li>2-Qubit Gate Shot: USD0.000975</li><li>Minimum price per program execution:<ul><li>USD97.50 - default setting, error mitigation is on</li><li> USD12.4166 if error mitigation is off</li></ul></ul>|  

> [!NOTE]
> Once you have consumed the equivalent cost of the monthly subscription, any overspending is charged as a pay-as-you-go plan.

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

***

## PASQAL

[PASQAL](https://pasqal.io/) charges for job execution time on its quantum processor, the 100-qubit Fresnel1. There is no added charge per job or per shot. The Emu-TN simulator is free of charge for all users (subject to limit quotas depending on the plan).

All new Azure Quantum customers benefit from USD500 free Azure Quantum credits to use specifically for PASQAL targets. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

In addition to the Azure Quantum Credits plan, PASQAL offers a pay-as-you-go plan for QPUs, so you pay only for what you use.

### [Azure Quantum Credits](#tab/tabid-AQcreditsPasqal)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credit balance. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Includes access to   |
|---|---|  
|Use is deducted from the Azure Quantum Credits based on the job execution time only| <ul><li>PASQAL Fresnel1 QPU: USD3,000/QPU hour deducted from your credits</li><li>PASQAL Emu-TN (free up to 20 hours)</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to switch to a different plan to continue using PASQAL. Azure Quantum won’t charge you when you reach your credit limit.

> [!IMPORTANT]
> There are no costs or charges for using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
 
### [Pay As You Go](#tab/tabid-paygoPasqal)

In the Pay-as-you-go plan the usage is charged based on the job execution time only.

|Pricing | Includes access to  |
|---|---|  
|USD3,000/QPU hour + Azure infrastructure costs| <ul><li>PASQAL Fresnel1 QPU</li><li>PASQAL Emu-TN (free up to 100 hours)</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

***

## Quantinuum

[Quantinuum](https://www.quantinuum.com/) uses a credit system that charges each job depending on the number of operations in the job, and the number of shots you run. The usage units are *H-System Quantum Credits (HQCs)* for jobs submitted to quantum computers and emulator HQCs (eHQCs) for jobs submitted to emulators.

> [!NOTE]
> Do not confuse the Quantinuum HQCs with the Azure Quantum credits. Quantinuum HQCs are a usage unit defined by the provider to track the usage and quotas of their targets.

HQCs and eHQCs are used to calculate the cost of running a job, and they are calculated based on the following formula:

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of single-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several single-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

To learn more about Quantinuum, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.quantinuum).

All new Azure customers benefit from USD500 in free credits towards the Quantinuum provider. Besides Azure Quantum credits, Quantinuum provides four plans: **Standard**, **Premium**, **Standard H1 + H2**, and **Premium H1 + H2**.

### [Azure Quantum Credits](#tab/tabid-AQcreditsQ)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credit balance. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing |Includes access to |
|---|---|  
|Use is deducted from the Azure Quantum Credits based on the HQC equation described above  | <ul><li> 40 HQCs for use on the System Model H1 hardware</li><li>8000 eHQCs for use on the System H1 Emulator</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to explicitly switch to a different plan to continue using Quantinuum. Azure Quantum won’t charge you when you reach your credit limit.

> [!IMPORTANT]
> There are no costs or charges for using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job.
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [H1 Subscriptions](#tab/tabid-H1)

The H1 Subscriptions are monthly subscription plans available through queued access providing access to the H1-1 quantum computer.

|Standard Pricing| Includes access to |
|---|---|
|USD125,000/Month + Azure infrastructure costs | <ul><li>10k HQCs for use on the System Model H1 hardware</li><li>100k eHQCs for use on the System Model H1 Emulator</li></ul>|

|Premium Pricing| Includes access to |
|---|---|
|USD175,000/Month + Azure infrastructure costs | <ul><li>17k HQCs for use on the System Model H1 hardware</li><li>170k eHQCs for use on the System Model H1 Emulator</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [H1 + H2 Subscriptions](#tab/tabid-H2)

The Standard H1 + H2 Subscriptions are monthly subscription plans available through queued access.

|Standard Pricing|  Includes access to  |
|---|---|
|USD135,000/Month + Azure infrastructure costs | <ul><li>10k HQCs for use on the System Model H1 and H2 hardware</li><li>100k eHQCs for use on the System Model H1 or H2 emulators</li></ul>|

|Premium Pricing | Includes access to  |
|---|---|
|USD185,000/Month + Azure infrastructure costs| <ul><li>17k HQCs for use on System Model H1 and H2 hardware</li><li>170k eHQCs for use on the System Model H1 or H2 emulators</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Pay as You Go](#tab/tabid-PAYG)

The Pay as You Go plan provides queued access to either the H1 series quantum computers or H2 series quantum computers and is charged per HQC usage.

|H1 Pricing| Includes access to |
|---|---|
|Per HQC usage + Azure infrastructure costs | <ul><li>H1 series quantum computers and emulator|

|H2 Pricing| Includes access to |
|---|---|
|Per credit cost + Azure infrastructure costs | <ul><li>H2 series quantum computers and emulator|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
## Rigetti

[Rigetti](https://rigetti.com) charges for job execution time on their quantum processor, the 84-bit Ankaa-2. There is no added charge per job, per shot, or per gate. The [Quantum Virtual Machine (QVM)](https://pyquil-docs.rigetti.com/en/1.9/qvm.html) simulator is free for all users.

To learn more about Riggeti, visit the [Rigetti provider page](xref:microsoft.quantum.providers.rigetti).

All new Azure Quantum customers benefit from USD500 free Azure Quantum credits to use specifically for Rigetti targets. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

In addition to the Azure Quantum Credits plan, Rigetti offers a pay-as-you-go plan for live quantum processors, so you pay only for what you use.

### [Azure Quantum Credits](#tab/tabid-AQcreditsRigetti)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credit balance. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Includes access to  |
|---|---|  
|Use is deducted from the Azure Quantum Credits based on the job execution time only| <ul><li>Rigetti 84-bit Ankaa-2</li><li>Rigetti QVM simulator (free)</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to switch to a different plan to continue using Rigetti. Azure Quantum won’t charge you when you reach your credit limit.

> [!IMPORTANT]
> There are no costs or charges for using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
 
### [Pay As You Go](#tab/tabid-paygoRigetti)

The Pay-as-you-go plan consists of *a la carte* access to the Ankaa-2. The usage is charged based on the job execution time only

|Pricing | Includes access to   |
|---|---|  
|USD0.02 per 10-millisecond increment of job execution time| <ul><li>Rigetti 84-bit Ankaa-2</li><li>Rigetti QVM simulator (free)</li></ul>|

***

> [!NOTE]
> If you have questions or run into any issue using Azure Quantum, you can contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Azure Quantum Credits](xref:microsoft.quantum.credits)
- [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq)
- [Azure Quantum quotas](xref:microsoft.quantum.quotas)
- [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list)

 
