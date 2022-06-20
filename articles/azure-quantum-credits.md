---
author: SoniaLopezBravo
description: Azure Quantum credits
ms.author: sonialopez
ms.date: 06/14/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Azure Quantum credits
uid: microsoft.quantum.credits
---

# Azure Quantum Credits

Azure Quantum Credits can be used to run programs on quantum hardware. 

First-time users automatically get **free 500 USD Azure Quantum Credits** for use with each participating quantum hardware provider. To obtain your free Azure Quantum Credits, you have to [create a quantum workspace](xref:microsoft.quantum.how-to.workspace).
Credits are shared for all workspaces within a single subscription and region. That is, you will get free USD 500 Azure Quantum credits for each quantum hardware provider when you create your first Azure Quantum workspace, but the following workspaces you create within the same subscription and region will share the credits grant.

Once you have consumed all available credits for a given quantum hardware provider, you need to switch to a different plan to continue using it. Azure Quantum won’t automatically start charging you once you reach your credit limit.

> [!NOTE]
> Please notice that Azure Credits are not the same as Azure Quantum Credits. When you create a new Azure account, you get 200 USD free Azure Credits to use on Microsoft services. You can only use general-purpose Azure Credits with the Microsoft providers. 3rd-party providers (providers that aren't owned by Microsoft) aren't eligible.

> [!Tip]
> **Free trial.** If you don’t have an Azure subscription, you can [create an Azure free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) (check out free Azure accounts [for students](https://azure.microsoft.com/free/students/)). With Azure you can create, deploy, and manage applications across multiple clouds, on-premises, and at the edge. You will get 200 USD Azure credit to use in other Azure services. 

## How to use Azure Quantum Credits

Credits may be used with any programming language or framework that is supported by Azure Quantum. 

To use credits, you just have to submit a job in a workspace that uses a credits plan for that provider. The workspace will not spend any money on jobs submitted to providers that use a credits plan in that workspace (if your job happens to go over the credit allocation, it will either be rejected or completed for free, and then subsequent jobs will be rejected).


> [!IMPORTANT]
> There are no costs or charges to using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

## How to view credit balance 

### [Using portal](#tab/tabid-portal)

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select your Azure Quantum workspace.
3. In the left panel, under "Operations", go to the “Credits and quotas” blade and select the “Credits” tab. 
4. See the consumed and the remaing credits for each selected provider. Credits are expressed in US dollars. 


### [Using Azure CLI](#tab/tabid-cli)


***

## How credit consumption is calculated

Azure Quantum Credits consumption is based on a resource-usage model defined by each provider and cost of use is deducted from your credits. To see the offering of each quantum hardware provider and how they track the credits usage, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

> [!TIP]
> If you have consumed all the credits and you need more, you can apply to the [**Azure Quantum Credits Program**](https://aka.ms/aq/credits). Microsoft offers up to 10,000 USD extra Azure Quantum Credits for use on quantum hardware For more information see [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq).

## Next Steps

- [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq)
- [Azure Quantum quotas](xref:microsoft.quantum.quotas)
- [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing)
- [Azure Quantum job cost](xref:microsoft.quantum.azure.job-costs)
