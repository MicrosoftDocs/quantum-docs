---
author: bradben
description: Learn how to create an Azure Quantum workspace.
ms.author: brbenefield
ms.date: 09/14/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Create an Azure Quantum workspace
uid: microsoft.quantum.how-to.workspace
---

# Create an Azure Quantum workspace

Learn how to create an [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) workspace. An Azure Quantum workspace resource, or workspace for short, is a collection of assets associated with running quantum or optimization applications.

A workspace is needed to [get started with Jupyter Notebooks in Azure Quantum](xref:microsoft.quantum.get-started.notebooks), submit optimization problems, or quantum programs on quantum hardware.

> [!TIP]
> You can also create an Azure Quantum workspace using the Azure command-line interface (CLI). For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

## Free Azure Quantum credits

First-time users automatically get free Azure Quantum Credits for use with each participating quantum hardware provider (500 USD each) when creating your workspace. If you need more credits, you can apply to the [Azure Quantum Credits program](https://aka.ms/aq/credits).

## Prerequisites

You need the following prerequisites to create a workspace.

- An Azure account with an active subscription. When you sign up for an Azure account, a subscription is created by default. Choose from one of the following subscriptions, or for a full list see [Microsoft Azure Offer Details](https://azure.microsoft.com/support/legal/offer-details/).

### [Free Trial](#tab/free)

[Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F). We offer eligible customers $200 in Azure credits to be used within the first 30 days of sign-up and 12 months of select free services. Within 30 days of sign-up or upon exhaustion of the credits (whichever occurs first), you must upgrade to a [pay-as-you-go subscription](https://azure.microsoft.com/offers/ms-azr-0003p/).

### [Students](#tab/student)

[Sign up for an Azure for Students subscription](https://azure.microsoft.com/free/?WT.mc_id=A261C142F). Azure for Students gets you started with $100 in Azure credits to be used within the first 12 months, plus select free services without requiring a credit card at sign-up. If you exhaust your available credits, your Azure subscription will be disabled. You may then upgrade to a [pay-as-you-go subscription](https://azure.microsoft.com/offers/ms-azr-0003p/).

### [Enterprise Agreement](#tab/EA)

If your organization has an Enterprise Agreement (EA) purchasing contract with Microsoft, your organization's Account Owners can create [Enterprise Dev/Test subscriptions](https://azure.microsoft.com/offers/ms-azr-0148p/) for active Visual Studio subscribers under the EA.

---

> [!NOTE]
> If you have any questions regarding the workspace creation process or run into any issue at any point using Azure Quantum, bookmark [Azure Quantum office hours](https://aka.ms/AQ/OfficeHours) and join our open office hours every Thursday 8∶30 AM Pacific Standard Time zone (PST).

## Create the workspace

To create an Azure Quantum workspace, follow these steps.

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.

1. Select **Create a resource** and then search for **Azure Quantum**. On the results page, you should see a tile for the **Azure Quantum** service.

1. Select **Azure Quantum** and then select  **Create**. This opens a form to create a workspace.

1. Select a subscription to associate with the new workspace.

1. Select **Quick create** or **Advanced create**:

   |Option | Description |
   |--- | --- |
   | Quick create | This option is the easiest path to creating a workspace. It automatically creates the necessary resource group and storage account, adds the Quantinuum, IonQ, and Microsoft QIO providers, and includes free Azure Quantum Credits for Quantinuum and IonQ hardware (USD 500 each). You workspace can still be customized after creation, if needed. |
   |Advanced create | Use this option to manually configure your resource group and storage account, select other payment options for your providers, and set tags to categorize resources. By default, this option also adds the Quantinuum, IonQ, and Microsoft QIO providers, and includes free Azure Quantum Credits for Quantinuum and IonQ hardware (USD 500 each). |
   

### [Quick create](#tab/tabid-quick)

1. Enter a name for the workspace.
1. Select the region for the workspace.
1. Click **Create**.

### [Advanced create](#tab/tabid-advanced)

1. Select an existing [resource group](/azure/azure-resource-manager/management/manage-resource-groups-portal) or create a new one.

1. Enter a name for the workspace.

1. Select the region for the workspace.

1. Select or create a storage account for the workspace:

   - To have Azure automatically create a storage account, select **Create a new storage account with default settings**.
   - To use an existing storage account in your subscription or to create a new one manually, select **Customize storage account settings**.

   > [!IMPORTANT]
   > You must be an **Owner** of the resource group you use to create a new storage account. For more information about how resource groups work in Azure, see [Manage Azure resource groups by using the Azure portal](/azure/azure-resource-manager/management/manage-resource-groups-portal).

1. Click **Next**.

1. The Quantinuum, IonQ, and Microsoft QIO providers are automatically added to the workspace. To add another available provider, click **Add** on that provider's tile. To modify the pricing plan for any of the selected providers, click **Modify**.

   > [!NOTE]
   > Pricing for Azure Quantum varies by provider. Please consult the information in the Providers tab of your Azure Quantum workspace in the Azure portal for the most up-to-date pricing information, or visit the [Azure Quantum pricing page](https://azure.microsoft.com/pricing/details/azure-quantum/).

1. Click **Next**.

1. To add optional tags to your workspace, enter a name/value pair, or click **Next**.

1. Review the settings you've selected and if everything is correct, select **Create** to create your workspace.

***

Deployment of your workspace may take a few minutes. The status and deployment details will be updated in the portal.

## Next steps

- [Get started with Jupyter Notebooks in Azure Quantum](xref:microsoft.quantum.get-started.notebooks)
- [Quickstart: Create a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quickstart: Solve an optimization problem in Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio)
- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)
