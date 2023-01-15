---
author: SoniaLopezBravo
description: This document provides a basic guide of what Azure Quantum quotas are, how to review remaining quotas and how to apply to get more. 
ms.author: sonialopez
ms.date: 01/15/2023
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: Limits & quotas
uid: microsoft.quantum.quotas
---

# Azure Quantum quotas 

Azure Quantum quotas are provider-defined limits on the usage of QPUs and optimization targets. Quotas help prevent accidental cost overages for the user while also preserving the integrity of the provider's systems. Quotas are based on your provider plan selection and can usually be increased with a support ticket.  
The usage tracked by quotas is not necessarily tied to a cost or credit, but it might be correlated.

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

## How quotas are calculated

In Azure Quantum, hardware and software providers define and control the quotas of their offerings. For detailed quota information, see each provider reference page. If a provider doesn't appear in the following table, then that provider doesn't define any quotas.  

|Quantum Computing providers | Optimization providers|
|---|---|  
|[IonQ quota](xref:microsoft.quantum.providers.ionq#limits--quotas) | [Microsoft QIO quota](xref:microsoft.quantum.optimization.providers.microsoft.qio#limits--quotas)|
|[Quantinuum quota](xref:microsoft.quantum.providers.quantinuum#limits--quotas) |[Toshiba SQBM+ quota](xref:microsoft.quantum.providers.optimization.toshiba#limits--quotas)|

## Viewing remaining quota

The Azure Quantum usage and quotas are measured in terms of each provider's unit of usage. Some providers don't define any quotas and will not have usage information to display.

> [!NOTE]
> If you are using an Azure Quantum Credits plan, and not a billing plan, the quota information maps to your allocated credits. In that case, the quota lists the total number of credits you have received.

### Track quota using Azure portal

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select your **Azure Quantum workspace**.
3. In the left panel, under **Operations**, go to the **Credits and quotas** blade and select the **Quotas** tab. 
4. See the consumed and the remaing quotas for each selected provider. Notice that quota information is displayed in three columns.
  - *Workspace usage*: The usage limit for the current workspace. Each Azure Quantum workspace has a usage limit.
  - *Azure subscription usage*: The usage for all workspaces within the current region and subscription. Not all quotas are tracked at this level. 
  - *Cadence*: The period when your quota is renewed. If monthly, the usage is reset on the 1st of every month. If one-time, usage is never reset.

 :::image type="content" source="media/portal-quotas-blade.png" alt-text="Quotas blade in Azure portal":::

In this view, [Azure Quantum Credits](xref:microsoft.quantum.credits) are included as quotas. This enables the user to see the credit information expressed in terms of the units that the provider tracks, as well as the interval associated.

### Track quota using Azure CLI

You can see your quotas by using the Azure Command-Line Interface (Azure CLI). For more information, see [How to manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

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

- *Workspace*: Quota is tracked for an individual workspace.
- *Subscription*: Quota is tracked together for all workspaces within the same subscription/region.

The **Period** column indicates the period when your quota is renewed. 

- *Monthly*: The usage is reset on the 1st of every month.
- *Infinite*: The usage is never reset (also referred as *one-time* in the [Azure Portal](https://portal.azure.com) view).

### Track quota using Python SDK

1. Install the latest version of the [`azure-quantum` Python package](xref:microsoft.quantum.install-qdk.overview).

1. Open a new Python file. Instantiate a **`Workspace` object**, which allows you to connect to the workspace you've previously deployed in Azure.

    ```python
    from azure.quantum import Workspace

    # Copy the following settings for your workspace
    workspace = Workspace ( 
      subscription_id = "", # Add your subscription_id 
      resource_group = "", # Add your resource_group 
      name = "", # Add your workspace name 
      location = ""  # Add your workspace location (for example, "westus") 
    )
    ```
1. Use the **`get_quotas`** method to display the quotas information for the selected workspace.

    ```python
    quotas = workspace.get_quotas() 
    ```

    ```output
    [{'dimension': 'qgs', 'scope': 'Subscription', 'provider_id': 'ionq', 'utilization': 33334.0, 'holds': 0.0, 'limit': 16666667.0, 'period': 'Infinite'}, 

     {'dimension': 'hqc', 'scope': 'Subscription', 'provider_id': 'quantinuum', 'utilization': 0.0, 'holds': 0.0, 'limit': 40.0, 'period': 'Infinite'}, 

     {'dimension': 'ehqc', 'scope': 'Subscription', 'provider_id': 'quantinuum', 'utilization': 0.0, 'holds': 0.0, 'limit': 160.0, 'period': 'Infinite'}, 

     {'dimension': 'combined_job_hours', 'scope': 'Workspace', 'provider_id': 'Microsoft', 'utilization': 0.0, 'holds': 0.0, 'limit': 20.0, 'period': 'Monthly'}, 

     {'dimension': 'combined_job_hours', 'scope': 'Subscription', 'provider_id': 'Microsoft', 'utilization': 0.011701412083333333, 'holds': 0.0, 'limit': 1000.0, 'period': 'Monthly'}, 

     {'dimension': 'concurrent_cpu_jobs', 'scope': 'Workspace', 'provider_id': 'Microsoft', 'utilization': 0.0, 'holds': 0.0, 'limit': 5.0, 'period': 'None'}]
    ```

See the above output as an example. In this case, the `qgs` row shows that the account has a limit of `8333334 qgs` with IonQ, of which `33334 qgs` have been used. The account also has a limit of `5` concurrent CPU jobs with Microsoft QIO, of which `0` have been used. The number of concurrent jobs is the number of jobs that can be queued per workspace at any one time.

The `scope` item indicates whether the quota refers to the current workspace or the subscription.

- *Workspace*: Quota is tracked for an individual workspace.
- *Subscription*: Quota is tracked together for all workspaces within the same subscription/region.

The `period` item indicates the period when your quota is renewed. 

- *Monthly*: The usage is reset on the 1st of every month.
- *Infinite*: The usage is never reset (also referred as *one-time* in the [Azure Portal](https://portal.azure.com) view).

> [!TIP]
> The `get_quotas` method return the results in the form of a Python dictionary. For a more human-readable format, use the following code samples to print a summary of > the remaining quotas at subscription and workspace level.
> 
> Copy the following code to track quota at **subscription level**.
> 
> ```python
> # This gathers usage against quota for the various providers (quota is set at the subscription level).
> # Note that a provider may have mutiple quotas, such as Quantinuum that limits usage of their Emulator.
> 
> rigetti_quota = 0
> ionq_quota = 0
> quantinuum_hqc_quota = 0
> quantinuum_ehqc_quota = 0
>
> rigetti_quota_utilization = 0
> ionq_quota_utilization = 0
> quantinuum_hqc_quota_utilization = 0
> quantinuum_ehqc_quota_utilization = 0
>
> for quota in workspace.get_quotas():
>     if (quota['provider_id'] == 'rigetti'):
>         rigetti_quota = quota['limit']
>         rigetti_quota_utilization = quota['utilization']
>     if (quota['provider_id'] == 'ionq'):
>         ionq_quota = quota['limit']
>         ionq_quota_utilization = quota['utilization']
>     if (quota['dimension'] == 'hqc'):
>         quantinuum_hqc_quota = quota['limit']
>         quantinuum_hqc_quota_utilization = quota['utilization']
>     if (quota['dimension'] == 'ehqc'):
>         quantinuum_ehqc_quota = quota['limit']
>         quantinuum_ehqc_quota_utilization = quota['utilization']
> 
> print('Rigetti quota use: ', "{:,}".format(rigetti_quota_utilization), '/', "{:,}".format(rigetti_quota))
> print('IonQ quota use:', "{:,}".format(ionq_quota_utilization), '/', "{:,}".format(ionq_quota))
> print('Quantinuum HQC quota use:', "{:,}".format(quantinuum_hqc_quota_utilization), '/', "{:,}".format(quantinuum_hqc_quota))
> print('Quantinuum eHQC quota use:', "{:,}".format(quantinuum_ehqc_quota_utilization), '/', "{:,}".format(quantinuum_ehqc_quota))
> ```
>
> Copy the following code to track quota at **workspace level**.
>
> ```python
> # This gathers usage against quota for the various providers for the current workspace
> # As there can be multiple workspaces in a subscription, the quota usage for the workspace is less or equal to usage against quota at the subscription level
> 
> amount_utilized_rigetti = 0
> amount_utilized_ionq = 0
> amount_utilized_quantinuum_hqc = 0
> amount_utilized_quantinuum_ehqc = 0
>
> for job in workspace.list_jobs():
>     if (job.details.cost_estimate != None):
>         for event in job.details.cost_estimate.events:
>             if (event.amount_consumed > 0):
>                 #print(event.amount_consumed, event.dimension_name, 'on', job.details.provider_id)
>                 if (job.details.provider_id == 'rigetti'):
>                     amount_utilized_rigetti += event.amount_consumed
>                 if (job.details.provider_id == 'ionq'):
>                     amount_utilized_ionq += event.amount_consumed
> 
>                 if (job.details.provider_id == 'quantinuum'):
>                     #print(event.amount_consumed, event.dimension_name, 'on', job.details.provider_id)
>                     #print(event)
>                     if (event.dimension_id == 'hqc'):
>                         amount_utilized_quantinuum_hqc += event.amount_consumed
>                     else:
>                         amount_utilized_quantinuum_ehqc += event.amount_consumed
>                         print(job.id, event)
>
>
> print('Rigetti quota use in current workspace: ', "{:,}".format(amount_utilized_rigetti), '/', "{:,}".format(rigetti_quota))
> print('IonQ quota use in current workspace:', "{:,}".format(amount_utilized_ionq), '/', "{:,}".format(ionq_quota))
> print('Quantinuum HQC quota use in current workspace:', "{:,}".format(amount_utilized_quantinuum_hqc), '/', "{:,}".format(quantinuum_hqc_quota))
> print('Quantinuum eHQC quota use in current workspace:', "{:,}".format(amount_utilized_quantinuum_ehqc), '/', "{:,}".format(quantinuum_ehqc_quota))
> ```

## Requesting additional quota

If you are not using an Azure Quantum Credits plan, then you can request quota increases by raising a support ticket.

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select your **Azure Quantum workspace**.
3. In the left panel, under **Operations**, go to the **Credits and quotas** blade and select the **Quotas** tab. 
4. Either press the **Increase** button on the quota page or select the **New support request** button on the side panel in the portal.
5. A support ticket will open. Follow these steps to fill out the request.
    1. Describe the issue as **Azure Quantum Quota Override Request**
    1. Select **Technical** for “Issue Type” 
    1. Select the subscription that the workspace is in 
    1. Select **All services** 
    1. Choose **Azure Quantum – Preview** as “Service Type” 
    1. Choose the workspace you want to change quota for under **Resource**
    1. Choose **Other** for problem type 
    1. Advance to **Solutions** and then again to **Details**
    1. Fill out all fields. For **Description** include the following: 

      - Name of the provider you want to change quotas for 
      - Whether you want to change quotas for the subscription scope or workspace scope 
      - Which quotas you want to change, and by how much 
      - Any justification for why you are increasing your quota can help us to decide in some cases. 


## Next Steps

- [Azure Quantum Credits](xref:microsoft.quantum.credits)
- [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq)

