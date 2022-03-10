---
author: SoniaLopezBravo
description: Frequently Asked Questions regarding the Azure Quantum Credits Program
ms.author: sonialopez
ms.date: 03/10/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: faq
title: Azure Quantum providers pricing
uid: microsoft.quantum.providers-pricing
---

# Azure Quantum providers pricing 

> [!NOTE]
> First-time users automatically get free Azure Quantum Credits for use with each participating quantum hardware provider (500 USD each) when creating your workspace.
If you need more credits, you can apply to the [Azure Quantum Credits program](https://aka.ms/aq/credits).

In Azure Quantum, hardware and software providers define and control the pricing of their offerings. The information below is subject to change by providers and some delays 
in reflecting latest pricing information may exist. Be sure to verify the latest pricing information from the Azure Quantum workspace you are using. 

 
To see the different pricing plans in your local currency: 

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.
2. Create a new [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 
3. Go to the **Providers** tab in your Quantum workspace and click on **Add a Provider**. Then, select the provider you want to add.

 :::image type="content" source="media/add-provider-1.png" alt-text="Screen shot showing how to select a provider to add to a Quantum Workspace.":::
 
4. In the description of the provider pane, you will find the current pricing options in your local currency. 

 :::image type="content" source="media/add-provider-2.png" alt-text="Screen shot showing how to select a provider SKU (Stock-keeping-Unit) to add to a Quantum Workspace.":::



## 1Qbit 

[1QBit](https://1qbit.com/) provides two plans: a Pay-as-you-go by CPU usage and a fixed monthly plan. 

 
### [Pay as you go by CPU Usage](#tab/tabid-payasgo)

Pay as you go metered plan providing access to all 1QBit quantum inspired optimization solvers. 

|Pricing | $0.00/month + Azure infrastructure costs  |
|---|---|

Plus: CPU Usage by minute (minimum 1 second): $0.075 minute 

### [Fixed Monthly Plan](#tab/tabid-fixed)

This plan provides access to all 1QBit quantum inspired optimization solvers with a flat monthly fee. 

|Pricing | $7,500.00/month + Azure infrastructure costs  |
|---|---|

***

## IonQ Pricing 

[IONQ](https://ionq.com/) offers a Pay-as-you-go plan. It consist of *a la carte* access to trapped ion quantum computers and simulators, charged on a resource-usage model.  
Every quantum program consists of $N$ logical gates of one or more qubits, and is executed for a certain number of shots. We bill based on gate-shots, calculated by 
multiplying the number of one- or two-qubit gates submitted with the number of execution shots requested.  

Gates involving more than two qubits are billed as $6(N-2)$ two-qubit gates, where N is the number of qubits in the gate. For example, a NOT gate with three controls would 
be billed as 6(4-2) or 12 two-qubit gates.  

|Pay as you go|  |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
|Pricing | $0 per month + Azure infrastructure costs |
|Plus |<ul><li>1Q Gate Shot: $0.00003 1q gate shot</li><li>2Q Gate Shot: $0.0003 2q gate shot</li></ul>|

Minimum of $1 USD per program execution.  

If you want to learn more about how IonQ Qubit-Gate-Shots are calculated, visit the [IonQ provider page](xref:microsoft.quantum.providers.ionq).
 
## Microsoft 

Please refer to [Azure Pricing page](https://aka.ms/AQ/Pricing) for detailed Microsoft QIO pricing in your region. 

## Quantinuum 

The following equation defines how circuits are translated into H1 Quantum Credits (HQCs):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

Quantinuum provides two plans: Standard Subscription and Premium Subscription.

### [Standard Subscription](#tab/tabid-standard)

The Standard Subcription is a monthly subscription plan with 10k H1 Quantum Credits (HQCs) for use on the System Model H1 hardware, 
powered by Honeywell and 40k emulator credits (eHQCs) for use on the H1 Emulator / month, available through queued access. 

|Pricing| $ 125,000 USD / Month + Azure infrastructure costs |
|---|---|

If you want to learn more about how H1 Quantum Credits are calculated, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.honeywell).
### [Premium Subscription](#tab/tabid-premium)
 
The Premium Subscription is a monthly subscription plan with 17k H1 Quantum Credits (HQCs) for use on System Model H1 hardware, 
powered by Honeywell and 100k emulator credits (eHQCs) for use on the H1 Emulator / month, available through queued access.

| Pricing |$ 175,000 USD / Month + Azure infrastructure costs |
|---|---| 

***

If you want to learn more about how H1 Quantum Credits are calculated, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.honeywell).



 
