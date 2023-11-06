---
author: SoniaLopezBravo
description: This document provides a basic guide of what Azure Quantum Credits are, how to use them, and how to review credit balance.
ms.author: sonialopez
ms.date: 10/26/2023
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: [target, targets]
title: Azure Quantum Credits
uid: microsoft.quantum.credits
---

# Azure Quantum Credits

In this article, you'll find the guidelines to understand Azure Quantum Credits and how to use them to run your programs on quantum hardware.

> [!Tip]
> If you don’t have an Azure account, register for **free** and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go). If you are a student, you can take advantage of a [free Azure account for students](https://azure.microsoft.com/free/students/).

## How can I get Azure Quantum Credits?

The first time you create a new [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace), you get **$500 (USD) free Azure Quantum Credits** for use with each participating quantum hardware provider. When you've consumed all your credits, you'll only pay for the services you use, and you can cancel anytime.

> [!NOTE]
> Note that Azure credits and Azure Quantum credits are different grants and shouldn't be confused. When you create a [free trial Azure account](https://azure.microsoft.com/free/), you get $200 (USD) free Azure Credits to use on Azure services. Azure credits aren't eligible to use on quantum hardware providers.

## Are my credits tied to a single workspace?

No, Azure Quantum Credits are shared for all workspaces within a single subscription and region. Your $500 (USD) free Azure Quantum Credits are available when you create your first Azure Quantum workspace, but the following workspaces you create within the same subscription and region share the credits plan.

## How long are credits valid for?

Azure Quantum Credits are valid six (6) months from the creation of your first Azure Quantum workspace. 

## How can I use my Azure Quantum Credits?

Azure Quantum Credits may be used with any programming language or framework that is supported by Azure Quantum. You can use your $500 (USD) free Azure Quantum Credits for each participating [quantum hardware provider](xref:microsoft.quantum.reference.qc-target-list), that is, you have $500 (USD) to spend at each of the providers.  

To use your Azure Quantum Credits with a provider, submit a job in a workspace that uses an Azure Quantum Credits plan for that provider. All jobs submitted from a workspace targeting a provider that uses an Azure Quantum Credits plan will be free. If a job happens to go over the current credit allocation, it will be rejected.

> [!IMPORTANT]
> There are no costs or charges to use your free Azure Quantum Credits. However, there might be some small storage costs, as the input and output of your jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more information, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

## How is credit consumption calculated?

Azure Quantum Credits consumption is based on a resource-usage model defined by each quantum provider and cost of use is deducted from your credits. To see the offering of each quantum hardware provider and how they track the credits usage, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing).

## How can I get more credits?

If your Azure Quantum credits have expired, or you consumed all and need more, you can apply to the [**Azure Quantum Credits program**](https://aka.ms/aq/credits). Microsoft offers up to $10,000 (USD) extra Azure Quantum Credits for use on quantum hardware. For more information about applications and terms of use, see [FAQ: Azure Quantum Credits program](xref:microsoft.quantum.credits.credits-faq).

## How can I view my credit balance?

### [Using the Azure portal](#tab/tabid-portal)

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select your **Azure Quantum workspace**.
3. In the left panel, under **Operations**, go to the **Credits and quotas** blade and select the **Credits** tab. 
4. See the consumed and the remaining credits for each selected provider. Credits are expressed in US dollars. 

     :::image type="content" source="media/portal-credits-blade.png" alt-text="Screenshot of the credits blade in Azure portal.":::
     
> [!NOTE]
> When using Azure Quantum Credits, the cost estimation in the **Job Management** blade within your Azure Quantum workspace is equal to $0. In this case, the estimated cost isn't reflected in the Job details because there’s no effective charge against your Azure bill.
 
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
   az quantum workspace set \
       -g MyResourceGroup \
       -w MyWorkspace \
       -l MyLocation \
       -o table
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

> [!NOTE]
> If you have any questions regarding the workspace creation process, or any issue using Azure Quantum, you can contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next Steps

- [FAQ: Applications to the Azure Quantum Credits program](xref:microsoft.quantum.credits.credits-faq)
- [Azure Quantum quotas](xref:microsoft.quantum.quotas)
- [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing)
- [Azure Quantum job cost](xref:microsoft.quantum.azure.job-costs)
