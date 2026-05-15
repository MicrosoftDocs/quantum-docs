---
author: azure-quantum-content
ms.author: quantumdocwriters
description: Learn about how to view job cost reports for running quantum programs in Azure Quantum and how to manage your invoices.
ms.date: 03/16/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: faq
title: 'FAQ: Understanding Job Costs and Billing'
uid: microsoft.quantum.azure.job-cost-billing
ms.custom: sfi-image-nochange

#customer intent: As a quantum developer, I want to understand how to view the job cost report and how to manage my invoices so that I can track my spending and manage my budget.
---

# FAQ: Understanding Job Costs and Billing in Azure Quantum

This article explains the guidelines to understand the cost of running quantum programs in Azure Quantum and how to manage your invoices.

## How many usage plans are available in Azure Quantum?

Azure Quantum provides services from Microsoft and from our partner companies, so billing details depend on the provider and the pricing plan that you select.

Most providers have a pay-as-you-go billing plan, which is based on the resources that you consume when you run a job. Some providers also offer subscription plans. For more information about how each provider charges, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## How do I modify the usage plan for my Azure Quantum workspace?

To modify your current usage plans for your providers and see the different billing plans available in your local currency, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com) with the credentials for your Azure subscription.
1. Go to your Azure Quantum workspace.
1. In the workspace navigation pane, expand the **Operations** dropdown and choose **Providers**.
1. View the current usage plan for each provider in the **Plan** column.
1. Choose **Modify** to see and modify the different billing plans that are available for that provider in your local currency.

The billing plans are set by the quantum hardware providers. For more information about each provider's pricing, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## How do I view the job cost report after I run a job?

After you run a job, you can check the detailed cost estimates and use this information to understand the cost of individual jobs. This cost is the amount that the provider bills. Refer to your final bill for the exact charges including relevant taxes. For more information, see [How do I receive my invoices?](#how-do-i-receive-my-invoices)

To review job costs, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.
1. Go to your Azure Quantum workspace.
1. In the workspace navigation pane, expand the **Operations** dropdown and choose **Job Management**.
1. View the estimated costs for each job in the **Cost estimate** column.
1. To open the **Job details** pane for a job, choose the job in the **Name** column.
1. To view detailed cost estimate information, choose the **Cost Estimation** tab. The table displays the billing dimensions and associated costs for the job run.

The cost estimation table contains the following columns:

- **Dimension**: The billing item that the provider charges you for.
- **Unit Price**: The cost per one unit of the dimension.
- **Consumed Units**: The number of units of the dimension that the job consumed.
- **Billed Units**: The number of units that you're billed for. This number might be less than the consumed units when, for example, the provider's billing plan offers an amount of free usage or is credits-based.
- **Estimated Cost**: The estimated cost for this dimension, calculated as $\text{Billed Units} \times\text{Unit Price}$.

> [!NOTE]
> IonQ has a USD 1.00 minimum cost to run a job on the IonQ QPU, so the `Consumed Units` reported on the job cost estimation table might be less than the `Billed Units` for small jobs.

## Why don't I see the cost of my job?

Some Azure Quantum providers don't support reports for per-job costs, but your invoice is still available in the **Cost Management** page in the Azure portal. For more information, see [How can I view my invoices?](#how-can-i-view-my-invoices)

## How do I receive my invoices?

Invoices are sent to the email address that you used to sign up for Azure. If you need to change the email address, then contact [Azure Support](https://azure.microsoft.com/support/create-ticket/).

If you're using a custom subscription, then invoices might be sent to the email address of the person who set up the subscription.

The invoices from Azure Quantum third party providers have the **Azure Marketplace and Reservations** billing type. You receive a single invoice from Azure Marketplace and Reservations, which provides a breakdown of the charges from each quantum provider.

## What does my Azure Quantum invoice include?

The Azure Marketplace and Reservations invoices include spending against Azure 3rd party providers. Azure Quantum currently offers quantum hardware from IonQ, Quantinuum, and Rigetti. For more information, see [Azure Quantum provider list](xref:microsoft.quantum.reference.qc-target-list).

The Azure Marketplace and Reservations invoices don't include spending against first party Azure services, such as storage accounts that are attached to the Azure Quantum workspace. These first party Azure charges are typically very small amounts for QPU jobs.

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

## How are invoices billed?

The invoices are billed in arrears. For example, the invoice you receive in February corresponds to the usage you incurred in January.

You pay your invoices with the same payment method that you use for the Azure subscription of your Azure Quantum workspace. You might have different payment methods for different subscriptions.

## How can I view my invoices?

To view your past invoices in the Azure portal, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com/) with the credentials for your Azure subscription.
1. In the top search bar, enter **Cost Management + Billing**.
1. If you have more than one billing scope, then select the scope that you want to view in the **Billing scopes** pane.
1. In the navigation pane, choose **Cost Management**.
1. In the navigation pane, expand the **Billing** dropdown and choose **Invoices**.
1. To view invoice details from Azure Quantum third party providers, choose the **Invoice ID** in rows that have **Azure Marketplace and Reservations** in the **Type** column.

You can filter invoices by date, subscription, and status. You can also download the invoices as PDF files. You can see the invoice date and the billing period. The billing period isn't the same as the month that you receive the invoice in.

## Related content

- [Azure Quantum quotas](xref:microsoft.quantum.quotas)