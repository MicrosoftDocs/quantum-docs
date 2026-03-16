---
author: azure-quantum-content
description: This document answers common questions about Azure Quantum quotas, including how to review remaining quotas and how to apply to get more. 
ms.author: quantumdocwriters
ms.date: 03/16/2026
ms.service: azure-quantum
ms.subservice: core
ms.topic: faq
no-loc: [target, targets]
title: "FAQ: Limits & Quotas"
uid: microsoft.quantum.quotas

#customer intent: As a quantum developer, I want to understand the limits and quotas of Azure Quantum, how to review my remaining quotas, and how to apply to get more.
---

# FAQ: Limits and quotas in Azure Quantum

In this article, you find answers to questions about limits and quotas for usage of Azure Quantum providers.

## What are quotas in Azure Quantum?

Quotas are limits on the usage of quantum processing unit (QPU) targets. Each Azure Quantum provider sets their own quotas. Quotas help prevent accidental cost overages for the user and preserve the integrity of the provider's systems.

Quotas are based on your provider plan selection. If you want to increase your quotas, then submit a support ticket. The usage tracked by quotas isn't necessarily tied to a cost or credit, but might be correlated.

## How are quotas defined in Azure Quantum?

In Azure Quantum, hardware and software providers define and control the quotas of their offerings. For detailed quota information, see each provider reference page.  

- [IonQ quota](xref:microsoft.quantum.providers.ionq#limits-and-quotas)
- [PASQAL quota](xref:microsoft.quantum.providers.pasqal#limits-and-quotas)
- [Quantinuum quota](xref:microsoft.quantum.providers.quantinuum#limits-and-quotas)

> [!NOTE]
> Providers that aren't in this list don't define quotas for their targets.

## How can I view my remaining quota?

Azure Quantum usage and quotas are measured in terms of each provider's unit of usage. Some providers don't define quotas and don't display usage information.

### Track quotas in the Azure portal

1. Sign in to the [**Azure portal**](https://portal.azure.com) with the credentials for your Azure subscription.
1. Go to your **Azure Quantum workspace**.
1. In the left panel, under the **Operations** dropdown, go to the **Quotas** blade.
1. See the consumed and the remaining quotas for each selected provider.

Quota information is displayed in three columns:

- **Workspace usage**: The usage limit for the current workspace. Each Azure Quantum workspace has a usage limit.
- **Azure subscription usage**: The usage for all workspaces within the current region and subscription. Not all quotas are tracked at this level.
- **Cadence**: The period when your quota is renewed. If monthly, the usage is reset on the 1st of each month. If one-time, usage is never reset.

### Track quotas with Azure CLI

You can see your quotas by using the Azure Command-Line Interface (Azure CLI). For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

1. Install the Azure CLI `quantum` extension. Open a command prompt and run the following command, which also upgrades the extension when you already have a previous version installed.

    ```azurecli
    az extension add --upgrade -n quantum
    ```

1. Sign in to Azure by using your credentials. You see a list of subscriptions associated with your account.

   ```azurecli
   az login
   ```

1. If you're prompted to select a subscription, then enter the number that corresponds to your subscription. Or, press **Enter** and then set the subscription that you want to use.

   ```azurecli
   az account set -s <Your subscription ID>
   ```

1. Set the workspace that you want to use. Replace `MyResourceGroup`, `MyWorkspace`, and `MyLocation` with your resource group, workspace name, and workspace location.

   ```azurecli
   az quantum workspace set \
       -g MyResourceGroup \
       -w MyWorkspace \
       -l MyLocation \
       -o table
   ```

1. Display your quota information in a table for the selected workspace.

    ```azurecli
    az quantum workspace quotas -o table
    ```

Your output looks like the following example:

```output
| Dimension | Holds | Limit      | Period   | ProviderId | Scope        | Utilization |
| --------- | ----- | ---------  | -------- | ---------- | ------------ | ----------- |
| qgs       |  0.0  |  8333334.0 | Infinite | ionq       | Subscription | 33334.0     |
| hqc       |  0.0  |  800.0     | Infinite | quantinuum | Subscription | 0.0         |
```

In this example, the `qgs` row shows that the account has a limit of `8333334 qgs` with IonQ, of which `33334 qgs` have already been used. The account also has a limit of `800` HQCs with Quantinuum, of which `0` have been used.

The `Scope` column indicates whether the quota refers to the current workspace or to the subscription.

- `Workspace`: Quota is tracked for an individual workspace.
- `Subscription`: Quota is tracked together for all workspaces within the same subscription/region.

The `Period` column indicates the period when your quota is renewed.

- `Monthly`: The usage is reset on the 1st of every month.
- `Infinite`: The usage is never reset (also referred as **one-time** in the [Azure portal](https://portal.azure.com) view).

### Track quotas with the QDK Python library

1. Install the latest version of the [`qdk` Python library](xref:microsoft.quantum.install-qdk.overview).
1. Open a new Python file.
1. Create a `Workspace` object to connect to the workspace that you previously deployed in Azure.

    ```python
    from qdk.azure import Workspace

    # Add your resource_id 
    workspace = Workspace (resource_id = "")
    ```

1. Use the `get_quotas` method to display the quotas information for the selected workspace.

    ```python
    quotas = workspace.get_quotas()

    for quota in quotas:
        print(quota)
    ```

> [!TIP]
> The `get_quotas` method returns the results in the form of a Python dictionary. For a more human-readable format, use the following code samples to print a summary of the remaining quotas at the subscription and workspace level.
>
> To track quotas at the subscription level, run the following code:
>
> ```python
> # This gathers usage against quotas for the various providers (quota is set at the subscription level).
> # Note that a provider might have multiple quotas, such as Quantinuum that limits usage of their Emulator.
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
>     if (quota['providerId'] == 'rigetti'):
>         rigetti_quota = quota['limit']
>         rigetti_quota_utilization = quota['utilization']
>     if (quota['providerId'] == 'ionq'):
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
> # This gathers usage against quotas for the various providers for the current workspace
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
>                 if (job.details.provider_id == 'rigetti'):
>                     amount_utilized_rigetti += event.amount_consumed
>                 if (job.details.provider_id == 'ionq'):
>                     amount_utilized_ionq += event.amount_consumed
>                 if (job.details.provider_id == 'quantinuum'):
>                     if (event.dimension_id == 'hqc'):
>                         amount_utilized_quantinuum_hqc += event.amount_consumed
>                     else:
>                         amount_utilized_quantinuum_ehqc += event.amount_consumed
>                         print(job.id, event)
>
> print('Rigetti quota use in current workspace: ', "{:,}".format(amount_utilized_rigetti), '/', "{:,}".format(rigetti_quota))
> print('IonQ quota use in current workspace:', "{:,}".format(amount_utilized_ionq), '/', "{:,}".format(ionq_quota))
> print('Quantinuum HQC quota use in current workspace:', "{:,}".format(amount_utilized_quantinuum_hqc), '/', "{:,}".format(quantinuum_hqc_quota))
> print('Quantinuum eHQC quota use in current workspace:', "{:,}".format(amount_utilized_quantinuum_ehqc), '/', "{:,}".format(quantinuum_ehqc_quota))
> ```

## How do I request more quotas?

To request a quota increase, submit a support ticket.

1. Sign in to the [**Azure portal**](https://portal.azure.com), using the credentials for your Azure subscription.
1. Select your **Azure Quantum workspace**.
1. In the left panel, under **Operations**, go to the **Quotas** blade.
1. Either press the **Increase** button on the quota page or select the **New support request** button on the side panel in the portal.

A support ticket opens. Follow these steps to fill out the request.

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

## Related content

- [FAQ: Understanding Job Costs and Billing in Azure Quantum](xref:microsoft.quantum.azure.job-cost-billing)
