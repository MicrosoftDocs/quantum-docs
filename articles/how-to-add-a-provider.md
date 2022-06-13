---
author: bradben
description: Add or remove a provider in an existing Azure Quantum workspace
ms.author: brbenefield
ms.date: 04/27/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Add or remove a provider
uid: microsoft.quantum.add-provider
---

# Add or remove a provider

Providers are usually added to an Azure Quantum workspace when the workspace is created. However, additional providers can be added (or existing providers removed) anytime after that. If you submit a quantum job to a provider that is not yet in your workspace, you will receive an error message prompting you to install the necessary provider.
 
To add a provider to an existing workspace: 

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select **Home** and navigate to your Azure Quantum workspace.
3. Select **Providers** and then select **Add a Provider**. All the available providers are displayed, along with pricing information. 

    :::image type="content" source="media/add-providers-portal.png" alt-text="Screen shot showing how to select a provider to add to an Azure Quantum workspace.":::

    > [!NOTE]
    > If the provider you want to add is not in the list of available providers, then your billing account may be located in a country that is not supported by that provider. 

4. Select **+Add** next to the desired provider, select a pricing option, and then click **Add**. 
5. Once the provider is deployed, it appears in your provider list. To ensure that the deployment is complete, wait until the **Status** for the provider displays a green checkmark. 
6. If the deployment fails, review the notification or check the Activity log. 

To remove a provider from a workspace:

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select **Home** and navigate to your Azure Quantum workspace.
3. Select **Providers**. 
4. In the displayed list of providers, select **Remove** for the desired provider. 
1. Select **Yes** to remove the provider. 
