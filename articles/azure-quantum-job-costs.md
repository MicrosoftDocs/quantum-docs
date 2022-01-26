---
author: mobius5150
description: Understand the job cost reporting functionality in Azure Quantum.
ms.author: mblouin
ms.date: 11/11/2021
ms.service: azure-quantum
ms.subservice: computing
ms.topic: conceptual
title: Azure Quantum job costs
uid: microsoft.quantum.azure.job-costs
---

# Azure Quantum job costs
This article helps you understand the cost of jobs in Azure Quantum. 

## Before you start: Understanding job pricing
Azure Quantum makes solutions available from a number of our partner companies, so the billing details can vary depending on which Provider you would like to use and the pricing plan you select with that provider. Below is some general information on pricing in Azure Quantum, as well as details for each provider.

General pricing guidance:

- You can only use general-purpose Azure Credits with the Microsoft providers. 3rd-party providers (providers that aren't Microsoft) are not eligible. For these providers, you may consider applying to the [Azure Quantum Credits Program](https://aka.ms/aq/credits).

- Most providers bill based on the resources you consume by running a job, though some also offer subscription plans. For more information, please review the subscription plans available to you in the Azure Portal.

### Honeywell pricing
Honeywell uses a credit system called *Honeywell Quantum Credits*, where each job you run consumes a number of credits from your balance based on the number of operations in the job and the number of shots you run. You can find more information on Honeywell Quantum Credits on the [Honeywell Provider page](xref:microsoft.quantum.providers.honeywell).

You may purchase Honeywell Quantum Credits through various plans. Go to the [Azure Portal](https://aka.ms/AQ/CreateWorkspace) and select the Honeywell provider for the most up to date list of subscription plans available.

### IonQ pricing
IonQ charges based on the number of gates in your program, the complexity of the gates you use, and the number of shots. These units are called `qubit-gate-shots` and you can find more information about how these are calculated on the [IonQ Provider Page](xref:microsoft.quantum.providers.ionq).

IonQ pricing is based on a pay-as-you-go model with no monthly subscription fees. To see the current service costs, please go to the [Azure Portal](https://aka.ms/AQ/CreateWorkspace) and select the IonQ provider for the most up to date list of subscription plans available.

### 1QBit pricing
1QBit charges through either a subscription model or on a pay-as-you-go model based on the runtime of your optimization problem, in seconds. You can find more information about 1QBit's offering on the [1QBit Provider Page](xref:microsoft.quantum.providers.optimization.1qbit).

### Microsoft Optimization pricing
Microsoft Optimization Solutions charges based on the runtime of your optimization problem, in seconds. Per-second rates are based on the plan you select and the volume of optimization jobs you run within a month. Please see the [Microsoft Optimization Pricing Page](https://azure.microsoft.com/pricing/details/azure-quantum/) for more information.

## After you run: Job cost reporting
After you run a job, Azure Quantum makes available detailed cost estimates for supported providers. You can use this information to understand the cost of individual jobs. This is the cost billed by the provider, please refer to your final bill for the exact charges including relevant taxes.

To review job costs, navigate to the **Job Management** blade within your Azure Quantum Workspace. In the job list, you will see estimated costs reported for each job you've run (where supported). To see more information, click on a job that shows pricing information.

![The Job Management blade, with the Cost Estimate column highlighted](./media/job-costs/job-table-with-costs.png)

> Note: Some Azure Quantum providers do not support reporting per-job costs, however you can still see your current bill **TODO: Link to section with instructions for reviewing customers total bill for providers.**

To review detailed cost estimate information for a job, select the job in the Job Management pane and then open the "Cost Estimation" tab. The table displays all of the billing dimension used by the job provider and the associated cost with each.

![The Job Details pane for a quantum job, with the Cost Estimation tab selected](./media/job-costs/job-cost-details.png)

How to interpret the Cost Estimation table columns:
- `Dimension`: This is the name of the dimension you are charged for by the provider. This represents an aspect of the job that you run that you are billed for.
- `Unit Price`: This is the cost of one unit of the dimension.
- `Consumed Units`: This is how many units of the dimension the job consumed.
- `Billed Units`: This is how many units you were actually billed for. In some cases, this column may be less than _Consumed Units_ if the providers billing plan offers an amount of included free usage or is credits-based.
- `Estimated Cost`: This is the estimated cost for this dimension, and equals `[Billed Units] * [Unit Price]`

The total row at the bottom shows the total cost of all dimensions for processing the job.