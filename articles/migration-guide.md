---
author: azure-quantum-content
description: This document gives instructions on how to migrate a Quantum Workspace to a new Azure region
ms.author: quantumdocwriters
ms.date: 06/30/2025
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [target, targets, "Azure Quantum", Azure, AzCopy, azcopy, Jupyter, "Jupyter Notebook", "Jupyter Notebooks", "Azure Support"]
title: How to migrate your Azure Quantum workspace to a new Azure region
uid: microsoft.quantum.how-to.migrate-quantum-workspace-new-region

# Customer intent: I want to migrate my Azure Quantum Workspace data to a new Azure region because Azure Quantum will be retired in my current region.
---

# Migrate your Azure Quantum workspace job data to a new Azure region

As of September 30th, 2025, the Azure Quantum service will be available in only the following Azure regions:

- East US
- West US
- North Europe
- West Europe

Azure Quantum will discontinue support for the following Azure regions:

- UK South
- UK West
- Japan East
- Japan West
- West US 2
- Germany West Central
- West Central US

If your Azure Quantum workspace is deployed and hosted in any of the discontinued regions, then you'll lose access to your workspace on September 30th, 2025. You'll still be able to access and use Azure Quantum from all currently supported Azure geographies, and you'll still be able to associate storage accounts from any Azure region with your Quantum workspace. To continue using Azure Quantum, create a new Quantum workspace in one of the supported regions.

To retain your Azure Quantum job information, migrate all the job data from your old workspace to your new workspace. When you do the migration, your job input and output data are available in your new workspace. But you can't see the job history for those jobs anymore in the Azure portal, Azure Quantum SDK, or the Azure CLI.

Migration instructions depend on whether your old workspace's storage account is managed or unmanaged.

> [!IMPORTANT]
> Before you migrate your job data, make sure that you don't have open jobs in the queue. To remove an open job from the queue, either wait for the job to finish running or cancel the job. Also, don't start any new jobs in your old Quantum workspace.

## [Unmanaged storage](#tab/tabid-unmanaged)

If your old workspace uses an unmanaged storage account, then link that storage account to your new workspace. Your old job data will be available in your new workspace because the linked storage account already contains your old job data.

> [!NOTE]
> To link a storage account to a Quantum workspace, you must have a role assignment that allows you to perform role assignments on that storage account, such as Owner or User Access Administrator.

To create a new Quantum workspace and link your storage account, follow these steps:

1. Log in to the Azure portal, go to **Quantum Workspaces**, and then choose **Create**.
1. Choose your subscription in the **Subscription** dropdown list, and then select **Advanced create**.
1. In the **Project details** section, open the **Resource group** dropdown list and choose the resource group that contains the storage account for your old workspace.
1. In the **Instance details** section, enter a name for your new workspace in the **Workspace name** field, and then choose one of the supported regions from the **Region** dropdown list (East US, West US, North Europe, or West Europe).
1. For **Data Storage**, choose **Customize storage account settings (advanced)**. A **Storage Account** dropdown list appears that contains all the storage accounts in your selected resource group. Choose the storage account ID for your old workspace's storage account.
1. To review your workspace settings, choose **Review + create**. Or, choose **Next: Providers >** to customize your provider and plan options, and then choose **Next: Tags >** to add tags to your workspace.
1. Verify that all your workspace settings are correct, and then choose **Create**.

The storage account for your old workspace is now associated with your new workspace, and all job history is retained in that storage account.

## [Managed storage](#tab/tabid-managed)

If your old workspace uses a managed storage account, then create a new workspace with a managed storage account and use AzCopy to migrate your data from the old managed storage account to the new managed storage account. For information about how to install and use AzCopy, see [Get started with AzCopy](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10?tabs=dnf).

> [!NOTE]
> To use AzCopy to migrate your job data to a new managed storage account, you must have a role assignment in each storage account that allows you to generate a shared access signature (SAS), such as Contributor or Storage Account Contributor.

[!WARNING]
> Don't delete your old workspace until after you migrate your data to your new workspace.

### Create a new Quantum workspace with a managed storage account

To create a new workspace with a managed storage account, follow these steps:

1. Log in to the Azure portal, go to **Quantum Workspaces**, and then choose **Create**.
1. Choose your subscription in the **Subscription** dropdown list, and then select **Advanced create**.
1. In the **Project details** section, open the **Resource group** dropdown list and choose a resource group for your new workspace.
1. In the **Instance details** section, enter a name for your new workspace in the **Workspace name** field, and then choose one of the supported regions from the **Region** dropdown list (East US, West US, North Europe, or West Europe).
1. For **Data Storage**, choose **Use a managed storage account with default settings (recommended)**.
1. To review your workspace settings, choose **Review + create**. Or, choose **Next: Providers >** to customize your provider and plan options, and then choose **Next: Tags >** to add tags to your workspace.
1. Verify that all the workspace settings are correct, and then choose **Create**.

### Use AzCopy to migrate your data

You can't link your old workspace's managed storage account to your new workspace, but you can use AzCopy to copy the job data from your old managed storage account to your new managed storage account. To use AzCopy to migrate your job data, generate a SAS for each storage account.

To generate a SAS for each storage account, follow these steps:

1. Log in to the Azure portal, go to **Quantum Workspaces**, and then choose your old workspace.
1. In the **Overview** menu, choose the **Storage account** link.
1. In the **Security + networking** dropdown on the Storage account blade, choose **Shared access signature**.
1. For **Allowed services**, select only **Blob**.
   For **Allowed resource types**, select **Service**, **Container**, and **Object**.
   For **Allowed permissions**, make sure that you select **Read** and **List**.
1. To generate a SAS for your old workspace's storage account, choose **Generate SAS and connection string**. Copy and save the **Blob service SAS URL** text. You need this URL when you use AzCopy.
1. To generate a SAS for you new workspace's storage account, go to **Quantum Workspaces** again, choose your new workspace, and then repeat the preceding steps. The only difference for the new workspace SAS is the allowed permissions.
   For **Allowed permissions**, make sure that you select **Write**, **Add**, and **Create**.
   Copy and save the URL for this SAS too.
1. Open a terminal and run the following AzCopy command:
   ```azcopy
   azcopy copy <old storage account blob service SAS URL> <new storage account blob service SAS URL> --recursive
   ```

If the copy is successful, then you get a job summary output in the terminal. The contents of your old managed storage account are now also in your new managed storage account.

***

## Migrate your Jupyter Notebook files

If you have Jupyter notebooks in your old workspace that you want to retain, then download those notebooks from the Azure portal before you delete your old workspace. To migrate your notebooks to your new workspace, follow these steps:

1. Log in to the Azure portal, go to **Quantum Workspaces**, and then choose your old workspace.
1. In the **Operations** dropdown on the Quantum Workspace blade, choose **Notebooks**.
1. In the Jupyter Notebooks blade, open the **My notebooks** dropdown. A list of all your Jupyter notebooks appears. For each notebook that you want to migrate, choose the **ellipsis button** (...), and then choose **Download Notebook** to download the notebook to your device.
1. Go to **Quantum Workspaces** again, and then choose your new workspace.
1. Go to the **Notebooks** menu again.
1. On the **My notebooks** dropdown, choose (...), and then choose **Upload Notebooks**.
1. Select all the notebook files that you want to upload from your device, and then choose **Upload files**.

The notebooks from your old workspace are now available in your new workspace.

## Delete your old Quantum workspace

After you set up your new workspace and migrate all your data, delete your old workspace. Note that all workspaces in discontinued regions will be automatically deleted on September 30th, 2025.

> [!NOTE]
> For questions about migration issues, contact [Azure Support](https://azure.microsoft.com/en-us/support/).
