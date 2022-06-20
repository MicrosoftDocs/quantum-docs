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

> [!Tip]
> **Free trial.** If you don’t have an Azure subscription, you can [create an Azure free account](https://azure.microsoft.com/free/) (check out free Azure accounts [for students](https://azure.microsoft.com/free/students/)). With Azure you can create, deploy, and manage applications across multiple clouds, on-premises, and at the edge. You will get $200 (USD) Azure credit to use in other Azure services. 

Azure Quantum Credits can be used to run programs on quantum hardware. 

First-time users automatically get **free $500 (USD) Azure Quantum Credits** for use with each participating quantum hardware provider. When you [create a new quantum workspace](xref:microsoft.quantum.how-to.workspace) you get your free Azure Quantum Credits.

Credits are shared for all workspaces within a single subscription and region. That is, you will get free USD 500 Azure Quantum credits for each quantum hardware provider when you create your first Azure Quantum workspace, but the following workspaces you create within the same subscription and region will share the credits grant.

Azure Quantum Credit plan will be free to add to your workspace. Once you have consumed all the credits, you will get error messages when submitting new jobs, and you can then upgrade to a new plan to keep using the selected quantum hardware providers.

> [!NOTE]
> Please notice that Azure credits are not the same as Azure Quantum Credits. When you create a [new Azure account](https://azure.microsoft.com/free/), you get 200 USD free Azure Credits to use on Microsoft services. You can only use general-purpose Azure Credits with the Microsoft providers. 3rd-party providers (providers that aren't owned by Microsoft) aren't eligible.

## How to use Azure Quantum Credits

Credits may be used with any programming language or framework that is supported by Azure Quantum. 

To use your credits, you submit a job in a workspace that uses a Azure Quantum Credits plan for that provider. All jobs submitted from a workspace that use a credit plan will be free. If your job happens to go over the current credit allocation, it will be rejected.


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

You can see your credit bakance by using the Azure CLI and the `az quantum workspace quotas` command, as shown in the following example. If you are using an Azure Quantum Credits plan, and not a billing plan, the quotas information maps to your allocated credits. In that case, the quota lists the total number of credits you have received.

In this example, the `qgs` row shows that the account has a limit of `8333334 qgs` with IonQ, of which `33334 qgs` have been used. The account also has a limit of`800` HQCs with Quantinuum, of which `0` have been used.

```bash
$ az quantum workspace quotas -o table
|Dimension | Holds | Limit   |   Period |   ProviderId | Scope | Utilization|
|--------- | ----- | --------- | -------- | ----------|  ------------ | -----------|
|qgs      |  0.0  |  8333334.0 | Infinite | ionq      |  Subscription | 33334.0|
|hqc      |  0.0  |  800.0     | Infinite | quantinuum  | Subscription | 0.0|
```

The "Scope" column indicates whether the quota refers to the current workspace or the subscription.

- *Workspace*: tracked for an individual workspace.
- *Subscription*: tracked together for all workspaces within the same subscription/region.

The "Period" column indicates the period when your quota is renewed. For Azure Quantum Credits, the period is infinite, meaning that your credits are never reset.
***

## How credit consumption is calculated

Azure Quantum Credits consumption is based on a resource-usage model defined by each provider and cost of use is deducted from your credits. To see the offering of each quantum hardware provider and how they track the credits usage, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

> [!TIP]
> If you have consumed all the credits and you need more, you can apply to the [**Azure Quantum Credits Program**](https://aka.ms/aq/credits). Microsoft offers up to $10,000 (USD) extra Azure Quantum Credits for use on quantum hardware. For more information, see [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq).

## Next Steps

- [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq)
- [Azure Quantum quotas](xref:microsoft.quantum.quotas)
- [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing)
- [Azure Quantum job cost](xref:microsoft.quantum.azure.job-costs)
