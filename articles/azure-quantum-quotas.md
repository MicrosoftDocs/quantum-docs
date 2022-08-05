---
author: SoniaLopezBravo
description: This document provides a basic guide of what Azure Quantum quotas are, how to review remaining quotas and how to apply to get more. 
ms.author: sonialopez
ms.date: 06/22/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Azure Quantum usage quotas
uid: microsoft.quantum.quotas
---

# Azure Quantum quotas 

Azure Quantum quotas are limits of usage of the QPUs and optimization targets that help you to prevent accidental cost overages while also preserving the integrity of their systems. Quotas are based on plan selection and can usually be increased with a support ticket.  
The usage tracked by quotas is not necessarily tied to a cost or credit, but it might be correlated.


[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

## How quotas are calculated

In Azure Quantum, hardware and software providers define and control the quotas of their offerings. For obtaining detailed quota information, see each provider reference page. If a provider doesn't appear in the following table, then that provider doesn't define any quotas.  

|Quantum Computing providers | Optimization providers|
|---|---|  
|[IonQ quota](xref:microsoft.quantum.providers.ionq#limits--quotas) | [Microsoft QIO quota](xref:microsoft.quantum.optimization.providers.microsoft.qio#limits--quotas)|
|[Quantinuum quota](xref:microsoft.quantum.providers.quantinuum#limits--quotas) |[Toshiba SQBM+ quota](xref:microsoft.quantum.providers.optimization.toshiba#limits--quotas)|

## Viewing remaining quota

The Azure Quantum usage and quotas are measured in terms of each provider's unit of usage. Some providers don't define any quotas. In that case, those providers will not have usage information to display.

> [!NOTE]
> If you are using an Azure Quantum Credits plan, and not a billing plan, the quotas information maps to your allocated credits. In that case, the quota lists the total number of credits you have received.

### [Using portal](#tab/tabid-portal)

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select your **Azure Quantum workspace**.
3. In the left panel, under **Operations**, go to the **Credits and quotas** blade and select the **Quotas** tab. 
4. See the consumed and the remaing quotas for each selected provider. Notice that quotas information is displayed in three columns.
  - *Workspace usage*: The usage limit for the current workspace. Azure Quantum workspace have a usage limit
  - *Azure subscription usage*: The usage for all workspaces within the current region and subscription. Not all quotas are tracked at this level. 
  - *Cadence*: The period when your quota is renewed. If monthly, the usage is reset on the 1st of every month. If one-time, usage is never reset.

 :::image type="content" source="media/portal-quotas-blade.png" alt-text="Quotas blade in Azure portal":::

In this view, [Azure Quantum Credits](xref:microsoft.quantum.credits) are included as quotas. This enables the user to see the credit information expressed in terms of the units that the provider tracks, as well as the interval associated.

### [Using Azure CLI](#tab/tabid-cli)

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

The "Scope" column indicates whether the quota refers to the current workspace or the subscription.

- *Workspace*: Quota is tracked for an individual workspace.
- *Subscription*: Quota is tracked together for all workspaces within the same subscription/region.

The "Period" column indicates the period when your quota is renewed. 
- *Monthly*: The usage is reset on the 1st of every month.
- *Infinite*: The usage is never reset (also referred as *one-time* in the [Azure Portal](https://portal.azure.com) view).

### [Using Python SDK](#tab/tabid-python)

1. Install the latest version of the [`azure-quantum` Python package](xref:microsoft.quantum.install-qdk.overview.python-only).

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

     {'dimension': 'combined_job_hours', 'scope': 'Subscription', 'provider_id': 'Microsoft', 'utilization': 0.011701412083333333, 'holds': 0.0, 'limit': 1000.0,               'period': 'Monthly'}, 

     {'dimension': 'concurrent_cpu_jobs', 'scope': 'Workspace', 'provider_id': 'Microsoft', 'utilization': 0.0, 'holds': 0.0, 'limit': 5.0, 'period': 'None'}]
    ```

See the above output as an example. In this case, the `qgs` row shows that the account has a limit of `8333334 qgs` with IonQ, of which `33334 qgs` have been used. The account also has a limit of `5` concurrent CPU jobs with Microsoft QIO, of which `0` have been used.

The characteristic `scope` indicates whether the quota refers to the current workspace or the subscription.

- *Workspace*: Quota is tracked for an individual workspace.
- *Subscription*: Quota is tracked together for all workspaces within the same subscription/region.

The characteristic `period' indicates the period when your quota is renewed. 
- *Monthly*: The usage is reset on the 1st of every month.
- *Infinite*: The usage is never reset (also referred as *one-time* in the [Azure Portal](https://portal.azure.com) view).

***



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

