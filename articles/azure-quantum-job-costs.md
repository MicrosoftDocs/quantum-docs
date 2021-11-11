---
author: mobius5150
description: Documentation about the job cost reporting functionality
ms.author: mblouin
ms.date: 11/11/2021
ms.service: azure-quantum
ms.subservice: computing
ms.topic: conceptual
title: Azure Quantum Job Costs
uid: microsoft.quantum.azure.job-costs
---

# Azure Quantum Job Costs
This article provides documentation on understanding the cost of jobs in Azure Quantum. 

## Before you start: Understanding job pricing
Azure Quantum makes solutions available from a number of our partner companies, and the billing details can vary depending on which Provider you would like to use and the pricing plan you select with that provider. Below are some general information on pricing in Azure Quantum, as well as details for each provider.

General pricing guidance
- You can only use general-purpose Azure Credits with the Microsoft providers. 3rd-party providers (providers that aren't Microsoft) are not eligible. For these providers, you may consider applying to the [Azure Quantum Credits Program](https://aka.ms/aq/credits).
- Most providers bill based on the resources you consume by running a job, though some also offer subscription plans. For more information, please review the subscription plans available to you in the Azure Portal.

### Honeywell Pricing
Honeywell uses a credit system called *Honeywell Quantum Credits*, where each job you run consumes a number of credits from your balance based on the number of operations in the job and the number of shots you run. You can find more information on Honeywell Quantum Credits on the [Honeywell Provider page](xref:microsoft.quantum.providers.honeywell).

You may purchase Honeywell Quantum Credits through various plans - please see the Azure Portal for the most up to date list of subscription plans available.

### IonQ Pricing
IonQ charges based on the number of gates in your program, the complexity of the gates you use, and the number of shots. These units are called `qubit-gate-shots` and you can find more information about how these are calculated on the [IonQ Provider Page](xref:microsoft.quantum.providers.ionq).

IonQ pricing is based on a pay-as-you-go model with no monthly subscription fees. To see the current service costs, please see the Azure Portal.

### 1QBit Pricing
1QBit charges through either a subscription model or on a pay-as-you-go model based on the runtime of your optimization problem, in seconds. You can find more information about 1QBit's offering on the [1QBit Provider Page](xref:microsoft.quantum.providers.optimization.1qbit).

### Microsoft Optimization Pricing
Microsoft Optimization Solutions charges based on the runtime of your optimization problem, in seconds. Per-second rates are based on the plan you select and the volume of optimization jobs you run within a month. Please see the [Microsoft Optimization Pricing Page](https://azure.microsoft.com/pricing/details/azure-quantum/) for more information.

## After you run: Job Cost Reporting
After you run a job, Azure Quantum makes available detailed pricing information for supported providers. You can use this information to understand the cost of individual jobs.

To review job costs, navigate to the **Job Management** blade within your Azure Quantum Workspace. In the job list, you will see estimated costs reported for each job you've run (where supported). To see more information, click on a job that shows pricing information.

> Note: Some Azure Quantum providers do not support reporting per-job costs, however you can still see your current bill **TODO: Link to section with instructions for reviewing customers total bill for providers.**

Within the Job Details pane, you will see a job cost table with a breakdown of the charges for the job.