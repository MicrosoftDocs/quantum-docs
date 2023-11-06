---
author: SoniaLopezBravo
description: Azure Quantum providers invoicing and billing information.
ms.author: sonialopez
ms.date: 10/31/2023
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: [target, targets]
title: Invoicing & Billing
uid: microsoft.quantum.providers-invoicing
---

# Invoicing and billing

Azure Quantum partners with third party quantum hardware providers to offer a variety of quantum hardware and software solutions. This article is an overview of the invoicing and billing process for these providers.

For more information about the billing plans and pricing offer, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing) page. 

## How to get your invoices

The invoices are sent to the email address you used to sign up for Azure. If you need to change the email address, contact [Azure Support](https://azure.microsoft.com/support/create-ticket/).

If you're using a custom subscription, invoices might be sent to the the email address of the person who setup the subscription.

The invoices from Azure Quantum third party providers are of type **Azure Marketplace and Reservations**. You receive a single invoice from Azure Marketplace and Reservation, which provides a breakdown of the charges from each quantum provider.

## What includes your Azure Quantum invoice

The Azure Marketplace and Reservations invoices include spending against Azure 3rd party providers. Azure Quantum currently offers quantum hardware from IonQ, Quantinuum and Rigetti. For more information, see [Azure Quantum provider list](xref:microsoft.quantum.reference.qc-target-list).

The Azure Marketplace and Reservations invoices **don't** include spending against first party Azure services, such as storage accounts attached to the Azure Quantum workspace. These typically represent very small amounts.

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

## How invoices are billed

The invoices are paid using the same payment method you use for the Azure subscription of your Azure Quantum workspace. You may have different payment methods for different subscriptions.

The invoices are billed in arrears. For example, the invoice you receive in February is for the usage you incurred in January.

## How to view your invoices

You can view your invoices in the Azure portal. 

1. Sign in to the [Azure portal](https://portal.azure.com/), using the credentials for your Azure subscription.
1. In the top search bar, type **Cost Management + Billing**. 
1. If you have more than one billing scope, select the scope you want to view in the **Billing scope** pane. If not, skip this step.
1. In the left navigation pane, select **Invoices**.

 :::image type="content" source="media/cost-management-invoice-portal.png" alt-text="Screen shot of Azure prtal showing the Invoices view and how to select and download the invoices.":::

In the Invoices view, you can see all your invoices. The invoices from Azure Quantum third party providers are of type **Azure Marketplace and Reservations**.

You can filter by date, subscription, and status. You can also download the invoices as PDF files. You can see the invoice date and the billing period. The billing period isn't the same as the month in which you receive the invoice.
