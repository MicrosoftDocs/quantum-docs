---
author: SoniaLopezBravo
description: Azure Quantum providers pricing and billing plans
ms.author: sonialopez
ms.date: 03/10/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Azure Quantum providers pricing
uid: microsoft.quantum.providers-pricing
---

# Azure Quantum providers pricing 

> [!NOTE]
> First-time users automatically get free Azure Quantum Credits for use with each participating quantum hardware provider (500 USD each) when creating your workspace.
If you need more credits, you can apply to the [Azure Quantum Credits program](https://aka.ms/aq/credits).

In Azure Quantum, hardware and software providers define and control the pricing of their offerings. The information below is subject to change by providers and some delays 
in reflecting latest pricing information may exist. Be sure to verify the latest pricing information from the Azure Quantum workspace you are using. 

 
To see the different pricing plans in your local currency: 

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.
2. Create a new [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). 
3. Go to the **Providers** tab in your Quantum workspace and click on **Add a Provider**. Then, select the provider you want to add.

 :::image type="content" source="media/add-provider-1.png" alt-text="Screen shot showing how to select a provider to add to a Quantum Workspace.":::
 
4. In the description of the provider pane, you will find the current pricing options in your local currency. 

 :::image type="content" source="media/add-provider-2.png" alt-text="Screen shot showing how to select a provider SKU (Stock-keeping-Unit) to add to a Quantum Workspace.":::


::: zone pivot="ide-pricing.computing"

[!INCLUDE [pricing-computing](includes/pricing-qc.md)]

::: zone-end

::: zone pivot="ide-pricing.optimization"

[!INCLUDE [pricing-optimization](includes/pricing-optimization.md)]

::: zone-end



## Next Steps

- [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq)
- [Quantum computing target list](xref:microsoft.quantum.reference.qc-target-list)
- [Optimization target list](xref:microsoft.quantum.reference.qio-target-list)





 
