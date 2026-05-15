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
- [Pasqal quota](xref:microsoft.quantum.providers.pasqal#limits-and-quotas)
- [Quantinuum quota](xref:microsoft.quantum.providers.quantinuum#limits-and-quotas)

> [!NOTE]
> Providers that aren't in this list don't define quotas for their targets.

## How can I view my remaining quota?

Azure Quantum usage and quotas are measured in terms of each provider's unit of usage. Some providers don't define quotas and don't display usage information.

### Track quotas in the Azure portal

1. Sign in to the [Azure portal](https://portal.azure.com) with the credentials for your Azure subscription.
1. Go to your Azure Quantum workspace.
1. In the workspace navigation pane, expand the **Operations** dropdown and choose **Quotas**.
1. See the consumed and the remaining quotas for each of your workspace's providers.

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

1. If you're prompted to select a subscription, then enter the number that corresponds to your subscription. Or, press **Enter** and then set the subscription that you want to use. Replace `MySubscription` with your subscription ID.

   ```azurecli
   az account set -s MySubscription
   ```

1. Set the workspace that you want to use. Replace `MyResourceGroup` and `MyWorkspace` with your resource group and workspace name.

   ```azurecli
   az quantum workspace set -g MyResourceGroup -w MyWorkspace -o table
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
- `Infinite`: The usage is never reset (also referred as **One-Time** in the [Azure portal](https://portal.azure.com) view).

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

## How do I request a quota increase?

To request a quota increase, submit a support ticket.

### Create a support request

1. Sign in to the [Azure portal](https://portal.azure.com) with the credentials for your Azure subscription.
1. Go to your Azure Quantum workspace.
1. In the workspace navigation pane, under the **Operations** dropdown, go to the **Quotas** blade.
1. Choose the **Increase** button on the quota page.

   Or, under the **Help** dropdown, got to the **Support + Troubleshooting** blade.

1. In the issue description box, enter **Azure Quantum quota override request**.
1. For the service issue, choose **None of the above**.
1. In the **Select a service** menu, choose **Service and subscription limits (quotas)**.
1. Choose the **Next** button.
1. Choose the **Create a support request** button. A **New support request** ticket opens on the **1. Problem description** tab.

### Fill out the support request

 To fill out the support request, follow these steps:

1. For **Issue type**, choose **Service and subscription limits (quotas)**.
1. For **Subscription**, choose the subscription that contains the workspace that you want a quota increase for.
1. For **Quota type**, choose **Azure Quantum**.
1. Choose the **Next** button to go to the **3. Additional details** tab.
1. In the **Description** box of the **Problem details** section, enter the following information:

    - The name of the provider that you want to increase quotas for
    - Whether you want to increase quotas at the subscription level or workspace level
    - The quotas that you want to increase, and what you want the increased quota to be
    - Reasons why you want to increase the quotas

1. Choose your preferred options for **Advanced diagnostic information** and **Support method** sections.
1. Fill out the **Contact info** section.
1. Choose the **Next** button to go to the **4. Review + create** tab.
1. If all the information is correct, then choose the **Create** button.

> [!NOTE]
>
> To submit a support ticket for a quota increase in a workspace, you must be the owner of the workspace.

## Related content

- [FAQ: Understanding Job Costs and Billing in Azure Quantum](xref:microsoft.quantum.azure.job-cost-billing)