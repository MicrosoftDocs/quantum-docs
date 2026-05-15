---
author: azure-quantum-content
description: This article explains how to add or remove a provider to an existing Azure Quantum workspace
ms.author: quantumdocwriters
ms.date: 03/18/2026
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Add or remove a provider to an existing workspace
uid: microsoft.quantum.add-provider
---

# Add or remove a provider in an existing workspace

When you create an Azure Quantum workspace, you choose the providers and plans that are available in the workspace. However, you can add new providers or remove existing providers at any time. If you submit a quantum job to a provider that isn't in your workspace, then you receive an error message that prompts you to add that provider to your workspace.

## Add a provider or plan

To add a provider to your workspace, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com) with the credentials for your Azure subscription.
1. Go to your Azure Quantum workspace.
1. In the workspace navigation pane, expand the **Operations** dropdown and choose **Providers**.
1. Above the list of your existing providers, choose **+ Add a Provider**. The **Add additional providers** pane opens and shows all the providers that you can add to your workspace.

    > [!NOTE]
    > If the provider that you want to add isn't in the list of available providers, then your billing account might be located in a country or region that the provider doesn't support. For more information, see [Global availability of Azure Quantum providers](xref:microsoft.quantum.provider-availability).

1. Choose **+ Add** next to the provider that you want to add, and then choose a pricing plan.
1. Select the **I accept this provider's terms and conditions** box, and then choose the **Add** button to begin deployment.

When the deployment finishes, the provider is the list on the **Providers** page. If the deployment succeeds, then you see a green checkmark for the provider **Status**. If the deployment fails, then review the notification or check the **Activity log**.

## Remove a provider or plan

To remove a provider from your workspace, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com) with the credentials for your Azure subscription.
1. Go to your Azure Quantum workspace.
1. In the workspace navigation pane, expand the **Operations** dropdown and choose **Providers**.
1. For the provider that you want to remove, choose **Remove** in the last column of the providers list.
1. Choose the **Yes** button to remove the provider.
