---
author: bradben
description: Learn about the different subscription plans available in Azure and how to create an Azure Quantum workspace.
ms.author: brbenefield
ms.date: 06/18/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Create an Azure Quantum workspace
uid: microsoft.quantum.how-to.workspace

#customer intent: As a quantum developer, I want to create an Azure Quantum workspace so that I can run quantum programs on quantum hardware.
---

# Create an Azure Quantum workspace

Learn how to create an [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) workspace in the Azure portal. An Azure Quantum workspace resource, or workspace for short, is a collection of assets associated with running quantum applications.

A workspace is needed to [get started with Jupyter Notebooks in the Azure portal](xref:microsoft.quantum.get-started.notebooks) or quantum programs on quantum hardware.

> [!TIP]
> You can also create an Azure Quantum workspace using the Azure command-line interface (CLI). For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

## Free Azure Quantum Credits

First-time users automatically get USD500 free [Azure Quantum Credits](xref:microsoft.quantum.credits) for use with each participating quantum hardware provider (see the [full quantum provider list](xref:microsoft.quantum.reference.qc-target-list)). Your free Azure Quantum Credits become available once you create a new Azure Quantum workspace. If you need more credits, you can apply to the [Azure Quantum Credits program](xref:microsoft.quantum.credits.credits-faq).

## Prerequisites

You need to have an Azure account with an active subscription to create an Azure Quantum workspace. If you don't have one, you can choose from one of the following subscriptions, or for a full list see [Microsoft Azure Offer Details](https://azure.microsoft.com/support/legal/offer-details/).

|Azure subscription | Description|
|------|-------|
|Pay-as-you-go (recommended) | You pay for the services you use, and you can cancel anytime. With the Azure Quantum Credits, you have USD500 to use in each quantum hardware provider. Sign up for free [here](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).|
|Free trial for 30 days| After 30 days of sign-up or once you've consumed all your Azure Quantum Credits (whichever occurs first), you **must** upgrade to a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go) to continue using the Azure Quantum services. After the exhaustion of your Azure Quantum Credits, you'll only pay for the services you use and you can cancel anytime. Sign up [here](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).|
|Azure for Students| With the Azure Quantum Credits you'll have USD500 to use in each quantum hardware provider. Once you've consumed all your credits, you must upgrade to a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go), and you can cancel anytime. Sign up [here](https://azure.microsoft.com/offers/ms-azr-0170p/). With Azure for Students you don't need a credit card to sign-up.|
|Enterprise Agreement| If your organization has an Enterprise Agreement (EA) purchasing contract with Microsoft, your organization's Account Owners can create [Enterprise Dev/Test subscriptions](https://azure.microsoft.com/offers/ms-azr-0148p/) for active Visual Studio subscribers under the EA.|

> [!NOTE]
> The free Azure trial gets you started with USD200 in Azure credits to be used in Azure 1st-party services (Azure Quantum isn't eligible) within the first 30 days of sign-up. Note that Azure Credits and Azure Quantum Credits are different grants and shouldn't be confused. You can't use general-purpose Azure Credits with Microsoft third-party quantum providers (providers that aren't owned by Microsoft).

If you have any questions or run into any issue using Azure Quantum, you can contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Create the workspace

To create an Azure Quantum workspace, follow these steps.

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.

1. Select **Create a resource** and then search for **Azure Quantum**. On the results page, you should see a tile for the **Azure Quantum** service.

1. Select **Azure Quantum** and then select  **Create**. This opens a form to create a workspace.

1. Select a subscription to associate with the new workspace.

1. Select **Quick create** or **Advanced create**.

### [Quick create](#tab/tabid-quick)

This option is the easiest path to creating a workspace. It automatically creates the necessary resource group and storage account, adds the IonQ, Quantinuum, Rigetti, and Microsoft Quantum Computing providers, and includes free Azure Quantum Credits for IonQ, Quantinuum, and Rigetti hardware (USD500 each). Your workspace can still be customized after creation, if needed. 

> [!NOTE]
> To use **Quick create**, you must be an **Owner** of the subscription you selected in the previous step. To see a list of your subscriptions and access, see [Check your role assignments](xref:microsoft.quantum.how-to.manage-workspace-access#check-your-role-assignments). 

1. Enter a name for the workspace.
1. Select the region for the workspace.
1. Select **Create**.

> [!NOTE]
> If you encounter issues during deployment, see [Azure Quantum common issues: Creating an Azure Quantum workspace](xref:microsoft.quantum.azure.common-issues#creating-an-azure-quantum-workspace).

### [Advanced create](#tab/tabid-advanced)

Use this option to manually configure your resource group and storage account, select other payment options for your providers, and set tags to categorize resources. By default, this option also adds the IonQ, Quantinuum, Rigetti, and Microsoft Quantum Computing, and includes free Azure Quantum Credits for IonQ, Quantinuum, and Rigetti hardware (USD500 each). 

> [!NOTE]
> If you're unable to create or select a resource group or storage account as described in the following steps, then you may not have the access required at the subscription, resource group, or storage account level. For more information on authorization, see [Role requirements for creating a workspace](xref:microsoft.quantum.how-to.manage-workspace-access#role-requirements-for-creating-a-workspace).

1. Select an existing [resource group](/azure/azure-resource-manager/management/manage-resource-groups-portal) or create a new one.

1. Enter a name for the workspace.

1. Select the region for the workspace.

1. Select or create a storage account for the workspace:

   - To have Azure automatically create a storage account, select **Create a new storage account with default settings**.
   - To use an existing storage account in your subscription or to create a new one manually, select **Customize storage account settings**. 
   > [!NOTE]
   >The storage account you select must be enabled for public internet access. For more information, see [Authorization failure](xref:microsoft.quantum.azure.common-issues#issue-authorizationfailure---this-request-is-not-authorized-to-perform-this-operation).

1. Select **Next**.

1. The IonQ, Quantinuum, Rigetti, and Microsoft Quantum Computing providers are automatically added to the workspace. To add another available provider, select **Add** on that provider's tile. To modify the pricing plan for any of the selected providers, select **Modify**.

   > [!NOTE]
   > Pricing for Azure Quantum varies by provider. Please consult the information in the Providers tab of your Azure Quantum workspace in the Azure portal for the most up-to-date pricing information, or visit the [Azure Quantum pricing page](https://azure.microsoft.com/pricing/details/azure-quantum/).

1. Select **Next**.

1. To add optional tags to your workspace, enter a name/value pair, or select **Next**.

1. Review the settings you've selected and if everything is correct, select **Create** to create your workspace.

***

Deployment of your workspace may take a few minutes. The status and deployment details will be updated in the portal.

> [!NOTE]
> If you run into any issues, see [Azure Quantum common issues: Creating an Azure Quantum workspace](xref:microsoft.quantum.azure.common-issues#creating-an-azure-quantum-workspace).

## Next steps

- [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum)
- [Get started with Jupyter Notebooks in Azure Quantum](xref:microsoft.quantum.get-started.notebooks)
- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)

