---
author: mobius5150
description: Understand the job cost reporting functionality in Azure Quantum.
ms.author: mblouin
ms.date: 02/17/2021
ms.service: azure-quantum
ms.subservice: computing
ms.topic: conceptual
title: Azure Quantum job costs
uid: microsoft.quantum.azure.job-costs
---

# Azure Quantum job costs
This article helps you understand the cost of jobs in Azure Quantum. 

[!INCLUDE [Azure Quantum credits banner](~/includes/azure-quantum-credits.md)]

## Before you start: Understanding job pricing

Azure Quantum makes solutions available from our partner companies, so the billing details can between providers and the pricing plans you select.

General pricing guidance:

- When you create a new Azure account, you get 200 USD free **Azure Credits** to use on Microsoft services. You can only use general-purpose Azure Credits with the Microsoft providers. 3rd-party providers (providers that aren't owned by Microsoft) aren't eligible. 
- When you create a new Azure Quantum workspace, you get 500 USD free **Azure Quantum credits** for use with each participating quantum hardware provider. 
- If you have consumed all the credits and you need more, you can apply to the [Azure Quantum Credits program](https://aka.ms/aq/credits). Microsoft offers up to $10,000 USD extra Azure Quantum Credits for use on quantum hardware. For more information see [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq).
- Most providers bill based on the resources you consume by running a job, though some also offer subscription plans. For more information about how each each provider charges, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## After you run: Job cost reporting
After you run a job, Azure Quantum makes available detailed cost estimates for supported providers. You can use this information to understand the cost of individual jobs. This cost is the cost billed by the provider; refer to your final bill for the exact charges including relevant taxes.

To review job costs, navigate to the **Job Management** blade within your Azure Quantum workspace. In the job list, you will see estimated costs reported for each job you've run (where supported). To see more information, click on a job that shows pricing information.

_Prices below are shown for example purposes only._

> [!div class="mx-imgBorder"]
> [ ![The Job Management blade, with the Cost Estimate column highlighted](./media/job-costs/job-table-with-costs.png) ](./media/job-costs/job-table-with-costs.png#lightbox)

> [!NOTE]
> Some Azure Quantum providers do not support reporting per-job costs, however you can still see your bill under Cost Management in the Azure portal.

To review detailed cost estimate information for a job, select the job in the Job Management pane and then open the "Cost Estimation" tab. The table displays the billing dimensions used by the job and their associated cost.

_Prices below are shown for example purposes only._

> [!div class="mx-imgBorder"]
> ![The Job Details pane for a quantum job, with the Cost Estimation tab selected](./media/job-costs/job-cost-details.png)

How to interpret the Cost Estimation table columns:
- `Dimension`: The name of the dimension you're charged for by the provider.
- `Unit Price`: The cost of one unit of the dimension.
- `Consumed Units`: How many units of the dimension the job consumed.
- `Billed Units`: How many units you were billed for. In some cases, this column may be less than _Consumed Units_ if the providers billing plan offers an amount of included free usage or is credits-based. This column may also be less than _Consumed Units_ in the event that a provider has a minimum job cost and the actual units consumed were less than required to satisfy the requirement.
- `Estimated Cost`: The estimated cost for this dimension, and equals `[Billed Units] * [Unit Price]`

The total row at the bottom shows the total cost of all dimensions for processing the job.

## Next steps

- [Submit a job with Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit)
- [Submit a job with Q#](xref:microsoft.quantum.quickstarts.computing)
