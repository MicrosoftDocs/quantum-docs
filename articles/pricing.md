---
author: SoniaLopezBravo
description: Azure Quantum providers pricing and billing plans
ms.author: sonialopez
ms.date: 05/01/2023
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
no-loc: [target, targets]
title: Pricing & billing plans
uid: microsoft.quantum.providers-pricing
---

# Azure Quantum pricing 

In Azure Quantum, hardware and software providers define and control the pricing of their offerings. The information below is subject to change by providers and some delays in reflecting latest pricing information may exist. Be sure to verify the latest pricing information from the Azure Quantum workspace you are using. 

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]
 
To see the different pricing plans in your local currency: 

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
2. Create a new [**Azure Quantum workspace**](xref:microsoft.quantum.how-to.workspace). 
3. Go to the **Providers** tab in your Quantum workspace and click on **Add a Provider**. Then, select the provider you want to add.

 :::image type="content" source="media/add-providers-portal.png" alt-text="Screen shot showing how to select a provider to add to an Azure Quantum workspace.":::
 
4. In the description of the provider pane, you will find the current pricing options in your local currency. 

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


All new Azure Quantum customers benefit of a one-time $500 (USD) free Azure Quantum credits toward IonQ provider to use in IonQ QPUs Harmony and Aria, and quantum simulator. Besides the Azure Quantum Credits plan, IonQ offers a **pay-as-you-go** plan with access to the quantum simulator and the IonQ Harmony 11-qubit quantum computer, and a **monthly subscription** plan which expands the access to the IonQ Aria 1 25-qubit quantum computer. 

### [Azure Quantum Credits](#tab/tabid-AQcredits)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Use is deducted from the Azure Quantum Credits based on the number of QGSs executed |
|---|---|  
|Includes access to | <ul><li>IonQ Harmony QPU</li><li>IonQ Aria QPU</li><li>IonQ Simulator (free)</li></ul>|
| IonQ Harmony |<ul><li>1-Qubit Gate Shot: $0.00003 (USD) deducted from your credits</li><li>2-Qubit Gate Shot: $0.0003 (USD) deducted from your credits</li><li>Minimum price per program execution: $1 (USD)</ul>|
| IonQ Aria 1 |<ul><li>1-Qubit Gate Shot: $0.0002196 (USD) deducted from your credits</li><li>2-Qubit Gate Shot: $0.000975 (USD) deducted from your credits</li><li>Minimum price per program execution: $97.50 (USD)</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to switch to a different plan to continue using IonQ. Azure Quantum won’t start charging you once you reach your credit limit. 

> [!IMPORTANT]
> There are no costs or charges to using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
 
### [Pay As You Go](#tab/tabid-paygo)

The Pay-as-you-go plan consists of *a la carte* access to the 11-qubit trapped ion quantum computer and the quantum simulator, charged on a resource-usage model.  

|Pricing | Use is charged based on the number of QGSs executed + Azure infrastructure costs |
|---|---|  
| Includes access to | <ul><li>IonQ Harmony QPU</li><li>IonQ Aria 1 QPU</li><li>IonQ Simulator (free)</li></ul>|
| IonQ Harmony |<ul><li>1-Qubit Gate Shot: $0.00003 (USD)</li><li>2-Qubit Gate Shot: $0.0003 (USD)</li><li>Minimum price per program execution: $1 (USD)</li></ul>|
| IonQ Aria 1 |<ul><li>1-Qubit Gate Shot: $0.0002196 (USD)</li><li>2-Qubit Gate Shot: $0.000975 (USD)</li><li>Minimum price per program execution: $97.50 (USD)</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Aria plan](#tab/tabid-aria)

The Aria plan is a monthly subscription plan with access to the IonQ Aria 1 25-qubit quantum computer. The subscription also includes access to the IonQ simulator and IonQ Harmony 11-qubit quantum computer.

|Pricing | $25,000 (USD)/Month + Azure infrastructure costs |
|---|---|  
|Includes access to | <ul><li>IonQ Harmony QPU</li><li>IonQ Aria QPU</li><li>IonQ Simulator (free)</li></ul>|
| IonQ Harmony |<ul><li>1-Qubit Gate Shot: $0.00003 (USD)</li><li>2-Qubit Gate Shot: $0.0003 (USD)</li><li>Minimum price per program execution: $1 (USD)</li></ul>|
| IonQ Aria 1 |<ul><li>1-Qubit Gate Shot: $0.0002196 (USD)</li><li>2-Qubit Gate Shot: $0.000975 (USD)</li><li>Minimum price per program execution: $97.50 (USD)</li></ul>|  

> [!NOTE]
> Once you have consumed the equivalent cost of the monthly subscription, any overspending is charged as a pay-as-you-go plan.

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

***

## Quantinuum

[Quantinuum](https://www.quantinuum.com/) uses a credit system that charges each job depending on the number of operations in the job, and the number of shots you run. The usage units are *H-System Quantum Credits (HQCs)* for jobs submitted to System Model H1 quantum computers, Powered by Quantinuum, and emulator HQCs (eHQCs) for jobs submitted to System Model H1 emulators.

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

All new Azure customers benefit from $500 (USD) in free credits towards the Quantinuum provider. Besides Azure Quantum credits, Quantinuum provides two plans: **Standard Subscription** and **Premium Subscription**.

### [Azure Quantum Credits](#tab/tabid-AQcreditsQ)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Use is deducted from the Azure Quantum Credits based on the HQC equation described above |
|---|---|  
|Includes access to | <ul><li> 40 HQCs for use on the System Model H1 hardware</li><li>400 eHQCs for use on the System H1 Emulator</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to explicitly switch to a different plan to continue using Quantinuum. Azure Quantum won’t start charging you once you reach your credit limit.

> [!IMPORTANT]
> There are no costs or charges to use your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job.
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Standard Subscription](#tab/tabid-standard)

The Standard Subscription is a monthly subscription plan available through queued access.

|Pricing|  $125,000 (USD)/Month + Azure infrastructure costs |
|---|---|
|Includes access to | <ul><li>10k HQCs for use on the System Model H1 hardware</li><li>100k eHQCs for use on the System Model H1 Emulator</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Premium Subscription](#tab/tabid-premium)

The Premium Subscription is a monthly subscription plan available through queued access.

| Pricing | $175,000 (USD)/Month + Azure infrastructure costs |
|---|---|
|Includes access to | <ul><li>17k HQCs for use on System Model H1 hardware</li><li>170k eHQCs for use on the System Model H1 Emulator</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
***

## Rigetti

[Rigetti](https://rigetti.com) charges for job execution time on their quantum processors, the 80-qubit Aspen-M-2 and Aspen-M-3. There is no added charge per job, per shot, or per gate. The [Quantum Virtual Machine (QVM)](https://pyquil-docs.rigetti.com/en/1.9/qvm.html) simulator is free for all users.

To learn more about Riggeti, visit the [Rigetti provider page](xref:microsoft.quantum.providers.rigetti).

All new Azure Quantum customers benefit from $500 (USD) free Azure Quantum credits to use specifically for Rigetti targets. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

In addition to the Azure Quantum Credits plan, Rigetti offers a pay-as-you-go plan for live quantum processors, so you pay only for what you use.

### [Azure Quantum Credits](#tab/tabid-AQcreditsRigetti)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Use is deducted from the Azure Quantum Credits based on the job execution time only |
|---|---|  
|Includes access to | <ul><li>Rigetti Aspen-M-3 QPU</li><li>Rigetti Aspen-M-2 QPU</li><li>Rigetti QVM simulator (free)</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to switch to a different plan to continue using Rigetti. Azure Quantum won’t start charging you once you reach your credit limit. 

> [!IMPORTANT]
> There are no costs or charges to using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
 
### [Pay As You Go](#tab/tabid-paygoRigetti)

The Pay-as-you-go plan consists of *a la carte* access to the Aspen-M-3 and Aspen-M-2 quantum processors.

|Pricing | Use is charged based on the job execution time only |
|---|---|  
|Includes access to | <ul><li>Rigetti Aspen-M-3 QPU</li><li>Rigetti Aspen-M-2 QPU</li><li>Rigetti QVM simulator (free)</li></ul>|
|  | $0.02 (USD) per 10-millisecond increment of job execution time|

***

## Toshiba SQBM+

Toshiba SQBM+ offers two plans: Learn & Develop model and Performace at Scale model, both based on the runtime of your optimization problem.

### [Learn & Develop](#tab/tabid-learndevelop)

Learn and develop with SQBM+ (not for operational use).

|Pricing | $0.00 (USD)/month + Azure infrastructure costs  |
|---|---|
|Targets available | toshiba.sbm.ising |
|Plus| 0-0.1 hour: \\$0 (USD)/hour<br />0.1-1 hour: \\ $200 (USD)/hour |


### [Performance at Scale](#tab/tabid-perfscale)

Deploy world-class SQBM+ solutions.

|Pricing | $0.00 (USD)/month + Azure infrastructure costs  |
|---|---|
|Targets available | toshiba.sbm.ising |
|Plus| 0-5 hours: \\$1800 (USD)/hour<br />5-25 hours: \\$1600 (USD)/hour<br />25-50 hours: \\$1400 (USD)/hour<br />50-2,500 hours: \\$1000 (USD)/hour |


***
For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

You can find more information about Toshiba's offering on the [Toshiba SQBM+ Provider Page](xref:microsoft.quantum.providers.optimization.toshiba).



## Next Steps

- [Azure Quantum Credits](xref:microsoft.quantum.credits)
- [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq)
- [Azure Quantum quotas](xref:microsoft.quantum.quotas)
- [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list)






 
