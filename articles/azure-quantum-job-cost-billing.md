---
author: azure-quantum-content
ms.author: quantumdocwriters
description: Learn about how to view job cost reports for running quantum programs in Azure Quantum and how to manage your invoices.
ms.date: 09/25/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: faq
title: 'FAQ: Understanding Job Costs and Billing'
uid: microsoft.quantum.azure.job-cost-billing
ms.custom: sfi-image-nochange

#customer intent: As a quantum developer, I want to understand how to view the job cost report, and how to manage my invoices so that I can track my spending and manage my budget.
---

# FAQ: Understanding Job Costs and Billing in Azure Quantum

In this article, you'll find the guidelines to understand the cost of running quantum programs in Azure Quantum and how to manage your invoices.

## How many usage plans are available in Azure Quantum?

Azure Quantum makes solutions available from Microsoft and from our partner companies, so the billing details will depend on the provider and the pricing plan you select. In the following table you can see the general pricing guidance for using Azure Quantum.

|Plan|Description|
|---|---|
|Billing plans| Most providers bill based on the resources you consume by running a job (pay-as-you-go), though some also offer subscription plans. For more information about how each provider charges, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).|

## How can I modify the usage plan for my Azure Quantum workspace?

You can modify your current usage plan for each provider and see the different billing plans available in your local currency.

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
1. Select your **Azure Quantum workspace**.
1. In the left panel, under **Operations**, go to the **Providers** tab.
1. You can check the current usage plan for each provider under **Plan** column.
1. Click on **Modify** to see and modify the different billing plans available for that provider in your local currency.

     :::image type="content" source="media/azure-portal-billing-plans.png" alt-text="Screen shot showing how to select a provider to add to an Azure Quantum workspace." lightbox="media/azure-portal-billing-plans.png":::

The billing plans are set by the quantum hardware providers. For more information about the pricing offer, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing) page.

## How can I view the job cost report after running?

After you run a job, you can check the detailed cost estimates and use this information to understand the cost of individual jobs. This cost is the cost billed by the provider; refer to your final bill for the exact charges including relevant taxes. For more information, see [How do I receive my invoices?](#how-do-i-receive-my-invoices).

To review job costs:

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
1. Select your **Azure Quantum workspace**.
1. Navigate to the **Job Management** blade within your Azure Quantum workspace.
1. In the job list, you see estimated costs reported for each job you run.

_Prices below are shown for example purposes only._

:::image type="content" source="./media/job-costs/job-table-with-costs.png" alt-text="Screenshot of the Job Management blade, with the Cost Estimate column highlighted." lightbox="./media/job-costs/job-table-with-costs.png":::

To review detailed cost estimate information for a job, select the job in the **Job Management** pane and then open the **Cost Estimation** tab. The table displays the billing dimensions used by the job and their associated cost.

_Prices below are shown for example purposes only._

:::image type="content" source="./media/job-costs/job-cost-details.png" alt-text="Screenshot of the Job Details pane for a quantum job, with the Cost Estimation tab selected.":::

The following definitions help you understand the cost estimation table:

- **Dimension**: The name of the dimension you're charged for by the provider.
- **Unit Price**: The cost per one unit of the dimension.
- **Consumed Units**: The number of units of the dimension the job consumed.
- **Billed Units**: The number of units you're billed for. In some cases, this column may be less than consumed units if the providers billing plan offers an amount of included free usage or is credits-based. This column may also be less than consumed units in the event that a provider has a minimum job cost and the actual units consumed were less than required to satisfy the requirement.
- **Estimated Cost**: The estimated cost for this dimension. It equals [Billed Units] * [Unit Price].

> [!NOTE]
> IonQ has USD1.00 minimum cost to run a job on the IonQ QPU. For small jobs, you may notice that `Consumed Units` reported on the job cost estimation table are less than the `Billed Units` for this reason.

## Why I don't see the cost of my job?

Some Azure Quantum providers don't support reporting per-job costs, however you can still see your invoice under **Cost Management** in the Azure portal. For more information, see [How can I view my invoices?](#how-can-i-view-my-invoices).

## How do I receive my invoices?

The invoices are sent to the email address you used to sign up for Azure. If you need to change the email address, contact [Azure Support](https://azure.microsoft.com/support/create-ticket/).

If you're using a custom subscription, invoices might be sent to the email address of the person who setup the subscription.

The invoices from Azure Quantum third party providers are of type **Azure Marketplace and Reservations**. You receive a single invoice from Azure Marketplace and Reservation, which provides a breakdown of the charges from each quantum provider.

## What does my Azure Quantum invoice include?

The Azure Marketplace and Reservations invoices include spending against Azure 3rd party providers. Azure Quantum currently offers quantum hardware from IonQ, Quantinuum and Rigetti. For more information, see [Azure Quantum provider list](xref:microsoft.quantum.reference.qc-target-list).

The Azure Marketplace and Reservations invoices **don't** include spending against first party Azure services, such as storage accounts attached to the Azure Quantum workspace. These typically represent very small amounts.

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

## How are invoices billed?

The invoices are paid using the same payment method you use for the Azure subscription of your Azure Quantum workspace. You may have different payment methods for different subscriptions.

The invoices are billed in arrears. For example, the invoice you receive in February corresponds to the usage you incurred in January.

## How can I view my invoices?

You can view your past invoices in Azure portal.

1. Sign in to the [Azure portal](https://portal.azure.com/), using the credentials for your Azure subscription.
1. In the top search bar, type **Cost Management + Billing**.
1. If you have more than one billing scope, select the scope you want to view in the **Billing scope** pane. If not, skip this step.
1. In the left navigation pane, select **Invoices**.

     :::image type="content" source="media/cost-management-invoice-portal.png" alt-text="Screen shot of Azure portal showing the Invoices view and how to select and download the invoices." lightbox="media/cost-management-invoice-portal.png":::

In the **Invoices** view, you can see all your invoices. The invoices from Azure Quantum third party providers are of type **Azure Marketplace and Reservations**.

You can filter by date, subscription, and status. You can also download the invoices as PDF files. You can see the invoice date and the billing period. The billing period isn't the same as the month in which you receive the invoice.

## Related content

- [Azure Quantum quotas](xref:microsoft.quantum.quotas)