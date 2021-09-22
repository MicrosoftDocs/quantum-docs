---
author: bradben
description: Learn how to create an Azure Quantum workspace.
ms.author: v-benbra
ms.date: 09/20/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Create an Azure Quantum workspace
uid: microsoft.quantum.how-to.workspace
---

# Create an Azure Quantum workspace

You use the Azure Quantum service by adding an Azure Quantum workspace resource to your Azure subscription in the Azure portal. An Azure Quantum workspace resource, or workspace for short, is a collection of assets associated with running quantum or optimization applications.

To open the Azure Portal, go to <https://portal.azure.com> and then follow these steps:

1. Click **Create a resource** and then search for **Azure Quantum**. On the results page, you should see a tile for the **Azure Quantum (preview)** service.

   ![Tile for the Azure Quantum (preview)
   service](./media/azure-quantum-preview-search.png)

1. Click **Azure Quantum (preview)** and then click  **Create**. This opens a form to create a workspace.

   ![Create resource for the Azure Quantum (preview)
   service](./media/azure-quantum-preview-create.png)

1. Fill out the details of your workspace:
   - **Subscription:** The subscription that you want to associate with this
     workspace.
   - **Resource group:** The resource group that you want to assign this workspace to.
   - **Name:** The name of your workspace.
   - **Region:** The region for the workspace.
   - **Storage Account**: The Azure storage account to store your jobs and results. If you don't have an existing storage account, click **Create a new storage account** and complete the necessary fields. For this preview, we recommend using the default values.

   ![Properties for the Azure Quantum workspace](./media/azure-quantum-preview-properties.png)

   > [!NOTE]
   > You must be an Owner of the selected resource group to create a new storage account. For more information about how resource groups work in Azure, see [Control and organize Azure resources with Azure Resource Manager](/learn/modules/control-and-organize-with-azure-resource-manager/).

1. After completing the information, click the **Providers** tab to add providers to your workspace. A provider gives you access to a quantum service, which can be quantum hardware, a quantum simulator, or an optimization service.

   ![Providers for Azure Quantum](./media/azure-quantum-preview-providers-ms.png)

   > [!NOTE]
   > By default, the Azure Quantum service adds the Microsoft QIO provider to every workspace.

1. Click **Review + create**.

1. Review the setting you've selected and if everything is correct, click **Create** to create your workspace.

    > [!NOTE]
    > Pricing for Azure Quantum varies by provider. Please consult the information in the Providers tab of your Azure Quantum workspace in the Azure portal for the most up-to-date pricing information, or visit the [Azure Quantum pricing page](https://azure.microsoft.com/pricing/details/azure-quantum/).