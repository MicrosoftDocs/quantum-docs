---
title: Manage quantum workspaces with the Azure CLI
description: This guide shows you how to create and delete quantum workspaces using the Azure command line tool.
author: ricardo-espinoza
ms.author: ricardoe
ms.date: 11/01/2020
ms.topic: article
uid: microsoft.quantum.workspaces-cli
---

# Manage quantum workspaces with the Azure CLI

In this guide, learn to create Azure Quantum workspaces and the required Resource Groups and Storage Accounts using the Azure Command-Line Interface (Azure CLI) and start running your quantum applications in Azure Quantum.

## Prerequisites

In order to use the Azure Quantum service, you will need:

- An active Azure account and subscription. For more information, see the Microsoft Learn module [Create an Azure account](https://docs.microsoft.com/learn/modules/create-an-azure-account/).
- The [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli).
- The [necessary utilities to use Azure Quantum](xref:microsoft.quantum.setup.cli) (includes the `quantum` extension for the Azure CLI).
- An Azure resource group where the quantum workspace will live.
- A storage account in the resource group to be associated with the quantum workspace. Multiple workspaces can be associated with the same account.

## Environment setup

1. Log in to Azure using your credentials.

   ```dotnetcli
   az login
   ```

1. In case you have more than one subscription associated with your Azure account, specify the subscription you want to use.

   ```dotnetcli
   az account set -s <Your subscription ID>
   ```

1. If this is the first time you will be creating quantum workspaces in your subscription, register the resource provider with this command:

   ```dotnetcli
   az provider register --namespace Microsoft.Quantum
   ```


## Create an Azure Quantum workspace

In order to create a new Azure Quantum workspace, you'll need to know:

- The location or Azure region name where the resource will live. You can use the [list of regions and their resource manager codes](https://github.com/Azure/azure-extensions-cli#regions) supported by the Azure CLI tool (for example, **westus**).
- The resource group associated with the new workspace. (for example, **MyResourceGroup**).
- An storage account on the same resource group and subscription than the quantum workspace. It's possible to [create a new storage account from the Az CLI tool](https://docs.microsoft.com/cli/azure/storage/account?view=azure-cli-latest&preserve-view=true#az_storage_account_create). (for example, **MyStorageAccount**)
- The name of the quantum workspace to create. (for example, **MyQuantumWorkspace**)

And then you can create it using the following command, using the previous examples:

```dotnetcli
az quantum workspace create -l westus -g MyResourceGroup -w MyQuantumWorkspace -sa MyStorageAccount
```

> [!NOTE]
> Adding or removing providers from a workspace using the Az CLI is not currenly supported. For now, you'll need to [use the Azure portal](xref:microsoft.quantum.workspaces-portal) to modify a workspace.

## Delete a quantum workspace

If you know the name and resource group of a quantum workspace you want to delete, you can do it with the following command (using the same names as the example above):

   ```dotnetcli
   az quantum workspace delete -g MyResourceGroup -w MyQuantumWorkspace
   ```

> [!TIP]
> If you don't remember the exact name, you can view the entire list of quantum workspaces in your subscription using  `az quantum workspace list -o table`.

After you delete a workspace, you will still see it listed while it's being deleted in the cloud, however, the `provisioningState` property of the workspace will immediately change to indicate it's being deleted. You can see this information by using the following command:

   ```dotnetcli
   az quantum workspace show -g MyResourceGroup -w MyQuantumWorkspace
   ```

> [!NOTE]
> In case you used the `az quantum workspace set` command previously to specify a default quantum workspace, then calling the command without parameters will delete (and clear) the default workspace.

   ```dotnetcli
   az quantum workspace delete
   ```

## Next steps

Now that you can created and delete workspaces, you can learn about the different [targets to run quantum algorithms in Azure
Quantum](xref:microsoft.quantum.concepts.targets).
