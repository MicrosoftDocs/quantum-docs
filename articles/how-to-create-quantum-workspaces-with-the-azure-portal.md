---
title: Create quantum workspaces with the Azure portal
description: This guide shows you how to create quantum workspaces with the Azure portal to start running your quantum applications in Azure Quantum.
author: KittyYeungQ
ms.author: kitty
ms.date: 8/7/2020
ms.topic: article
uid: microsoft.azure.quantum.workspaces-portal
---

# Create quantum workspaces with the Azure portal

In this guide, learn to create Quantum Workspaces and the required Resource Groups and Storage Accounts using
the Azure portal, and start running your quantum applications in Azure Quantum.

## Prerequisites

In order to use the Azure Quantum service, you will need an active Azure subscription.

> [!NOTE]
> For more information about creating an Azure account and subscription, see the Microsoft Learn module [Create an Azure account](https://docs.microsoft.com/learn/modules/create-an-azure-account/).

## Create a quantum workspace

You use the Azure Quantum service by adding a **Quantum Workspace** resource to your Azure subscription in the Azure portal. A Quantum Workspace resource, or Workspace for short, is a collection of assets associated with running quantum or optimization applications.

To open the Azure Portal, go to https://portal.azure.com and then follow these steps:

1. Click **Create a resource** and then search for **Azure Quantum**. On the results page, you should see a tile for the **Azure Quantum (preview)** service.

   ![Tile for the Azure Quantum (preview)
   service](../media/azure-quantum-preview-search.png)

1. Click **Azure Quantum (preview)** and then click  **Create**. This opens a form to create a Quantum Workspace.

   ![Create resource for the Azure Quantum (preview)
   service](../media/azure-quantum-preview-create.png)

1. Fill out the details of your Workspace:
   - **Subscription:** The subscription that you want to associate with this
     Workspace. 
   - **Resource group:** The resource group that you want to assign this Workspace to.
   - **Name:** The name of your Quantum Workspace.
   - **Region:** The region for the Workspace.
   - **Storage Account**: The Azure storage account to store your jobs and results. If you don't have an existing storage account, click **Create a new storage account** and complete the necessary fields. For this preview, we recommend using the default values.

   ![Properties for the Azure Quantum Workspace](../media/azure-quantum-preview-properties.png)


   > [!NOTE]
   > You must be an Owner of the selected resource group to create a new storage account. For more information about how resource groups work in Azure, see [Control and organize Azure resources with Azure Resource Manager](https://docs.microsoft.com/learn/modules/control-and-organize-with-azure-resource-manager/).

1. After completing the information, click the **Providers** tab to add providers to your Workspace. A provider gives you access to a quantum service, which can be quantum hardware, a quantum simulator, or an optimization service.

   ![Providers for Azure Quantum](../media/azure-quantum-preview-providers.png)

   > [!NOTE]
   > By default, Azure Quantum adds the Microsoft QIO provider to every Workspace.

1. After adding the providers that you want to use, click **Review + create**.

1. Review the settings and approve the *Terms and Conditions of Use* of
   the selected providers. If everything is correct, click on **Create** to create your Quantum Workspace.

   ![Review and create the Workspace](../media/azure-quantum-preview-terms.png)

> [!NOTE] 
> While we are not charging for usage of Azure Quantum during the private
> preview, your jobs will be uploaded to the Azure storage account created above and will be subject to storage charges.

## Next steps

Now that you created a Workspace, learn about the different [targets to run
quantum algorithms in Azure
Quantum](xref:microsoft.azure.quantum.concepts.targets).
