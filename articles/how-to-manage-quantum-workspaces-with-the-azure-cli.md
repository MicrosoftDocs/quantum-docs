---
author: bradben
description: This guide shows you how to create and delete quantum workspaces using the Azure command-line tool.
ms.author: brbenefield
ms.date: 07/26/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Manage quantum workspaces with the Azure CLI
uid: microsoft.quantum.workspaces-cli
---

# Manage quantum workspaces with the Azure CLI

In this guide, learn to use the Azure Command-Line Interface (Azure CLI) to create Azure Quantum workspaces and the required resource groups and storage accounts, and start running your quantum applications in Azure Quantum.

## Prerequisites

To use the Azure Quantum service, you will need:

- An active Azure account and subscription. For more information, see the Microsoft Learn module [Create an Azure account](/learn/modules/create-an-azure-account/).
- An Azure resource group where the quantum workspace will live.
- A storage account in the resource group to be associated with the quantum workspace. Multiple workspaces can be associated with the same account.
- The [Azure CLI](/cli/azure/install-azure-cli).
- The [Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).

## Environment setup

1. Install the Azure CLI `quantum` extension. Open a command prompt and run the following command, which will also upgrade the extension if a previous version is already installed:

    ```azurecli
    az extension add --upgrade -n quantum
    ```

1. Log in to Azure using your credentials. You will see list of subscriptions associated with your account.

   ```azurecli
   az login
   ```

1. Specify the subscription you want to use.

   ```azurecli
   az account set -s <Your subscription ID>
   ```

1. If this is the first time creating quantum workspaces in your subscription, register the resource provider with this command:

   ```azurecli
   az provider register --namespace Microsoft.Quantum
   ```


## Create an Azure Quantum workspace

To create a new Azure Quantum workspace, you'll need to know:

- The location or Azure region name where the resource will live. You can use the [list of regions and their resource manager codes](https://github.com/Azure/azure-extensions-cli#regions) supported by the Azure CLI tool, for example, **westus**.
- The resource group associated with the new workspace, for example, **MyResourceGroup**.
- A storage account in the same resource group and subscription as the quantum workspace. It's possible to [create a new storage account from the Az CLI tool](/cli/azure/storage/account#az_storage_account_create), for example, **MyStorageAccount**.
- The name of the quantum workspace to create, for example, **MyQuantumWorkspace**.
- The list of Azure Quantum providers to use in the workspace. A provider offers a set of plans, each of them representing a plan with associated terms and conditions, costs, and quotas. To create workspaces, you'll need to specify the corresponding plan along with the providers, unless you want to start with the providers that offer free credit – they are automatically added to your workspace.

If you already know the provider and plan names to use in your workspace, you can skip to step four, below. If you want to start with the providers that offer free credit, you can enter the following command:

   ```azurecli
   az quantum workspace create -l MyLocation -g MyResourceGroup -w MyQuantumWorkspace -a MyStorageAccount
   ```
You may be prompted to accept terms of use.  Enter `Y` to accept the terms.  Note that the `-r` parameter shown in step four, below, was not required. 

If you need to determine which providers and plans to use, proceed as follows:

1. To retrieve the list of available quantum providers, use the `list` command (this example uses **westus** as the location):

   ```azurecli
   az quantum offerings list -l westus -o table
   ```

   > [!TIP]
   > If want to see which providers give free credit, use the `--autoadd-only` parameter, for example:<br />
   > `az quantum offerings list --autoadd-only -l westus -o table`<br />
   > As mentioned previously, those providers are automatically added to your workspace. You do not need to specify them with the `-r` parameter.

1. Once you determine the provider and plan to include in your workspace, you can review terms using the `show-terms` command (adding your **MyProviderID** and **MyPlan** as example values):

   ```azurecli
   az quantum offerings show-terms -l westus -p MyProviderId -k MyPlan
   ```

1. The output of the `show-terms` command includes a Boolean field `accepted` that shows whether the terms for this provider have been accepted already or not, as well as a link to the license terms to review. If you decide to accept those terms, use the `accept-terms` command to record your acceptance.

   ```azurecli
   az quantum offerings accept-terms -l westus -p MyProviderId -k MyPlan
   ```

1. Once you have reviewed and accepted all required terms and conditions, you can create your workspace using the `create` command, specifying a list of provider and plan combinations separated by commas, as in the following example:

   ```azurecli
   az quantum workspace create -l westus -g MyResourceGroup -w MyQuantumWorkspace -a MyStorageAccount -r "MyProvider1/MyPlan1, MyProvider2/MyPlan2"
   ```

Once you create a workspace, you can still add or remove providers using the Azure Portal.

## Change the default storage account for a quantum workspace

If you need to change the default storage account for an existing workspace, you can use the `create` command, specifying all the current properties along with the new storage account. The following example uses the same settings as the workspace created in the previous example:

   ```azurecli
   az quantum workspace create -l westus -g MyResourceGroup -w MyQuantumWorkspace -a MyNEWStorageAccount -r "MyProvider1/MyPlan1, MyProvider2/MyPlan2"
   ```

> [!IMPORTANT]
> This procedure actually re-creates the workspace with the new storage account. Ensure that all properties other than the storage account are exactly the same as the original, otherwise a second workspace will be created.

## Delete a quantum workspace

If you know the name and resource group of a quantum workspace you want to delete, you can do it with the `delete` command (using the same names as the previous example):

   ```azurecli
   az quantum workspace delete -g MyResourceGroup -w MyQuantumWorkspace
   ```

> [!TIP]
> If you don't remember the exact name, you can view the entire list of quantum workspaces in your subscription using  `az quantum workspace list -o table`.

After you delete a workspace, you will still see it listed while it's being deleted in the cloud. However, the `provisioningState` property of the workspace changes immediately to indicate that it's being deleted. You can see this information by using the `show` command:

   ```azurecli
   az quantum workspace show -g MyResourceGroup -w MyQuantumWorkspace
   ```

> [!NOTE]
> In case you used the `az quantum workspace set` command previously to specify a default quantum workspace, then you can call the `delete` command without parameters to delete (and clear) the default workspace.

   ```azurecli
   az quantum workspace delete
   ```

## Next steps

Now that you can create and delete workspaces, learn about the different [targets to run quantum algorithms in Azure Quantum](xref:microsoft.quantum.reference.qio-target-list).
