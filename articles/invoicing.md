---
author: SoniaLopezBravo
description: Learn about how to view the billing plans and manage your invoices in Azure Quantum and what they include.
ms.author: sonialopez
ms.date: 06/16/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: faq
no-loc: [target, targets]
title: Invoicing & Billing
uid: microsoft.quantum.providers-invoicing

#customer intent: As a quantum developer, I want to understand how to view and manage my invoices and billing in Azure Quantum so that I can track my spending and manage my budget.
---

# FAQ: Invoices and billing plans in Azure Quantum

Azure Quantum partners with third party quantum hardware providers to offer a variety of quantum hardware and software solutions. This article is an overview of the invoicing and billing process for these providers.

## How can I see the billing plans for my Azure Quantum workspace?

To see the different billing plans available in your local currency:

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
1. Select your **Azure Quantum workspace**.
1. In the left panel, under **Operations**, go to the **Providers** tab. 
1. You can check the current billing plan for each provider under **Plan** column.
1. Click on **Modify** to see and modify the different billing plans available for that provider in your local currency.

     :::image type="content" source="media/azure-portal-billing-plans.png" alt-text="Screen shot showing how to select a provider to add to an Azure Quantum workspace." lightbox="media/azure-portal-billing-plans.png":::

The billing plans are set by the quantum hardware providers. For more information about the pricing offer, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing) page.

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

You can view your invoices in Azure portal. 

1. Sign in to the [Azure portal](https://portal.azure.com/), using the credentials for your Azure subscription.
1. In the top search bar, type **Cost Management + Billing**. 
1. If you have more than one billing scope, select the scope you want to view in the **Billing scope** pane. If not, skip this step.
1. In the left navigation pane, select **Invoices**.

     :::image type="content" source="media/cost-management-invoice-portal.png" alt-text="Screen shot of Azure portal showing the Invoices view and how to select and download the invoices." lightbox="media/cost-management-invoice-portal.png":::

In the **Invoices** view, you can see all your invoices. The invoices from Azure Quantum third party providers are of type **Azure Marketplace and Reservations**.

You can filter by date, subscription, and status. You can also download the invoices as PDF files. You can see the invoice date and the billing period. The billing period isn't the same as the month in which you receive the invoice.
