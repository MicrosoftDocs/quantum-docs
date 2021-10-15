---
author: ricardo-espinoza
description: This guide shows you how to create and delete quantum workspaces using the Azure command-line tool.
ms.author: ricardoe
ms.date: 07/26/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
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

1. 1. Install the Azure CLI `quantum` extension. Open a command prompt and run the following command:

    ```azurecli
    az extension add -n quantum
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
- A storage account in the same resource group and subscription as the quantum workspace. It's possible to [create a new storage account from the Az CLI tool](/cli/azure/storage/account?view=azure-cli-latest&preserve-view=true#az_storage_account_create), for example, **MyStorageAccount**.
- The name of the quantum workspace to create, for example, **MyQuantumWorkspace**.
- The list of Azure Quantum providers to use in the workspace. A provider offers a set of SKUs, each of them representing a plan with associated terms and conditions, costs, and quotas. To create workspaces, you'll need to specify the corresponding SKU along with the providers.

If you already know the provider and SKU names to use in your workspace, you can skip to step 4 below. Otherwise, determine which providers to use first.

1. To retrieve the list of available quantum providers, use the `list` command (this example uses **westus** as the location):

   ```azurecli
   az quantum offerings list -l westus -o table
   ```

1. Once you determine the provider and SKU to include in your workspace, you can review terms using the `show-terms` command (adding your **MyProviderID** and **MySKU** as example values):

   ```azurecli
   az quantum offerings show-terms -l westus -p MyProviderId -k MySKU
   ```

1. The output of the `show-terms` command includes a Boolean field `accepted` that shows whether the terms for this provider have been accepted already or not, as well as a link to the license terms to review. If you decide to accept those terms, use the `accept-terms` command to record your acceptance.

   ```azurecli
   az quantum offerings accept-terms -l westus -p MyProviderId -k MySKU
   ```

1. Once you have reviewed and accepted all required terms and conditions, you can create your workspace using the `create` command, specifying a list of provider and SKU combinations separated by commas, as in the following example:

   ```azurecli
   az quantum workspace create -l westus -g MyResourceGroup -w MyQuantumWorkspace -a MyStorageAccount -r "MyProvider1/MySKU1, MyProvider2/MySKU2"
   ```

Once you create a workspace, you can still add or remove providers using the Azure Portal.


## Delete a quantum workspace

If you know the name and resource group of a quantum workspace you want to delete, you can do it with the `delete` command (using the same names as the example above):

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
