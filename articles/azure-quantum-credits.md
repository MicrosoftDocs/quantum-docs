---
author: SoniaLopezBravo
description: This document provides a basic guide of what Azure Quantum Credits are, how to use them, and how to review credit balance 
ms.author: sonialopez
ms.date: 10/19/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Azure Quantum Credits
uid: microsoft.quantum.credits
---

# Azure Quantum Credits

> [!Tip]
> If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/offers/ms-azr-0003p/). With the Azure Quantum Credits, you'll have $500 (USD) to use in each quantum hardware provider. If you are a students, you can take advantage of a [free Azure account for students](https://azure.microsoft.com/free/students/).

Azure Quantum Credits can be used to run programs on quantum hardware.

First-time users automatically get **$500 (USD) free Azure Quantum Credits** for use with each participating quantum hardware provider. Your free Azure Quantum Credits become available once you [create a new Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). Once you've consumed all your credits, you'll only pay for the services you use and you can cancel anytime.

Credits are shared for all workspaces within a single subscription and region. That is, you will get $500 (USD) free Azure Quantum credits for each quantum hardware provider when you create your first Azure Quantum workspace, but the following workspaces you create within the same subscription and region will share the credits plan.


> [!NOTE]
> Note that Azure credits and Azure Quantum Credits are different grants and shouldn't be confused. When you create a [new Azure account](https://azure.microsoft.com/free/), you get $200 (USD) free Azure Credits to use on all Azure services. You can only use general-purpose Azure Credits with the Microsoft quantum providers - third-party providers (providers that aren't owned by Microsoft) aren't eligible.

## How to use your Azure Quantum Credits

Azure Quantum Credits may be used with any programming language or framework that is supported by Azure Quantum. 

To use your Azure Quantum Credits with a provider, submit a job in a workspace that uses an Azure Quantum Credits plan for that provider. All jobs submitted from a workspace targeting a provider that uses an Azure Quantum Credits plan will be free. If a job happens to go over the current credit allocation, it will be rejected.

> [!IMPORTANT]
> There are no costs or charges to use your free Azure Quantum Credits. However, there may be some small storage costs, as the input and output of your jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

## How to view your credit balance 

### [Using the Azure portal](#tab/tabid-portal)

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select your **Azure Quantum workspace**.
3. In the left panel, under **Operations**, go to the **Credits and quotas** blade and select the **Credits** tab. 
4. See the consumed and the remaining credits for each selected provider. Credits are expressed in US dollars. 

 :::image type="content" source="media/portal-credits-blade.png" alt-text="Screenshot of the credits blade in Azure portal.":::
 
### [Using the Azure CLI](#tab/tabid-cli)

You can see your credit balance by using the Azure Command-Line Interface (Azure CLI) with the `az quantum workspace quotas` command. For more information, see [How to manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

If you are using an Azure Quantum Credits plan, and not a billing plan, the quota information maps to your allocated credits. In that case, the quota lists the total number of credits you have received. 

1. Install the **Azure CLI `quantum`** extension. Open a command prompt and run the following command, which will also upgrade the extension if a previous version is already installed.

    ```azurecli
    az extension add --upgrade -n quantum
    ```

1. **Log in** to Azure using your credentials. You will see list of subscriptions associated with your account.

   ```azurecli
   az login
   ```

1. Specify the **Subscription** that you want to use.

   ```azurecli
   az account set -s <Your subscription ID>
   ```
1. Select the **Workspace** that you want to use. Note that you also need to specify the resource group and the location.

   ```azurecli
   az quantum workspace set -g MyResourceGroup -w MyWorkspace -l MyLocation -o table
   ```
1. Use the **`az quantum workspace quotas` command** to display quotas information for the selected workspace.

    ```azurecli
    az quantum workspace quotas -o table
    ```

    ```output
    |Dimension | Holds | Limit   |   Period |   ProviderId | Scope | Utilization|
    |--------- | ----- | --------- | -------- | ----------|  ------------ | -----------|
    |qgs      |  0.0  |  8333334.0 | Infinite | ionq      |  Subscription | 33334.0|
    |hqc      |  0.0  |  800.0     | Infinite | quantinuum  | Subscription | 0.0|
    ```

See the above output as an example. In this case, the `qgs` row shows that the account has a limit of `8333334 qgs` with IonQ, of which `33334 qgs` have been used. The account also has a limit of `800` HQCs with Quantinuum, of which `0` have been used.

The **Scope** column indicates whether the quota refers to the current workspace or the subscription.

- **Workspace**: tracked for an individual workspace.
- **Subscription**: tracked together for all workspaces within the same subscription or region.

The **Period** column indicates the period when your quota is renewed. For Azure Quantum Credits, the period is infinite, meaning that your credits are never reset.
***

## How credit consumption is calculated

Azure Quantum Credits consumption is based on a resource-usage model defined by each provider and cost of use is deducted from your credits. To see the offering of each quantum hardware provider and how they track the credits usage, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

> [!TIP]
> If you have consumed all the credits and you need more, you can apply to the [**Azure Quantum Credits program**](https://aka.ms/aq/credits). Microsoft offers up to $10,000 (USD) extra Azure Quantum Credits for use on quantum hardware. For more information, see [Applications to the Azure Quantum Credits program](xref:microsoft.quantum.credits.credits-faq).

## Next Steps

- [FAQ: Applications to the Azure Quantum Credits program](xref:microsoft.quantum.credits.credits-faq)
- [Azure Quantum quotas](xref:microsoft.quantum.quotas)
- [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing)
- [Azure Quantum job cost](xref:microsoft.quantum.azure.job-costs)
