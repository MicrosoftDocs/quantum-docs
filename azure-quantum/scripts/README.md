---
title: Azure Quantum Scripts
description: Article explaining the repository containing the scripts for Azure Quantum limited preview.
author: geduardo
ms.author: v-edsanc@microsoft.com
ms.date: 06/25/2020
ms.topic: article
---

# Azure Quantum Scripts

This repository contains scripts for
 the limited preview of Azure Quantum that facilitate workspace management. Scripts are available for linux POSIX-compliant shells (e.g. `bash`) and [Windows PowerShell](https://docs.microsoft.com/powershell/scripting/getting-started/getting-started-with-windows-powershell).

The scripts allow you to do the following operations:

- Create a Quantum Workspace
- Show the details for a Quantum Workspace
- Delete a Quantum Workspace

You must supply the following information to the script:

- Resource Group: The resource group to deploy the Azure Quantum workspace in. If it does not exist, it will be created.
- Workspace Name: The name of the Azure Quantum Workspace you would like to create.

You may also supply a subscription id and a name for the storage account to be used. Please see the instructions below for how to supply the arguments to the script. Note that you must always supply the same arguments to the `show` command as you used when running the `create` command.

## Bash

The bash script can be invoked by running
[`quantum-workspace.sh`](./quantum-workspace.sh). If you downloaded the script
from your browser you may need to make it executable by running `chmod +x
quantum-workspace.sh` from most shells.

```dotnetcli
USAGE: quantum-workspace show|create|delete|delete-storage [OPTIONS]
  -g | --resource-group   [group]   The resource group to deploy in
  -n | --name             [name]    The name of the workspace to create
  -s | --subscription     [id]      [optional] The subscription ID to deploy in. Defaults to the default subscription set for the az cli.
  --storage-account       [name]    [optional] The name of the storage account to create. If ommited defaults to 'st<WorkspaceName>'.
```

Note that when you run the `delete` command, the script will not delete the associated storage account. To delete the storage account you must run the `delete-storage` command.

### Running on Windows 10

The bash script should function on Windows 10 using either [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/install-win10) or [Git Bash](https://gitforwindows.org/).

## PowerShell Script on Windows 10

The PowerShell script can be invoked by running
[`quantum-workspace.ps1`](./quantum-workspace.ps1).

```dotnetcli
USAGE: quantum-workspace show|create|delete|delete-storage [OPTIONS]
  -g  | --group            [group]   The resource group to deploy in
  -n  | --name             [name]    The name of the workspace to create
  -s  | --subscription     [id]      The subscription ID to deploy in.
  -st | --storage-account  [name]    [optional] The name of the storage account to create. If ommited defaults to 'st<group>'.
```

Note that when you run the `delete` command, the script will not delete the associated storage account. To delete the storage account you must run the `delete-storage` command.

## Common Errors

### ERROR: the `az` cli is not installed

This error occurs if the script cannot find the `az` command in your path. If you have not previously installed the `az` CLI, you will find instructions here: [https://aka.ms/az-cli](https://aka.ms/az-cli).

### ERROR: Resource provider registration failed

The first time the script runs, it registers the Azure Quantum resource provider in your subscription which allows you to access it. If you receive this error, please wait several minutes and try again.

### ERROR: The subscription '<...>' does not have access to the private preview. Please contact the Azure Quantum team to ensure your subscription is correctly registered.

If you receive this error, please confirm that you are attempting to deploy the resource in the same subscription that you supplied to the Azure Quantum team while signing up. To confirm which subscription you are using, you may run `az account show --query id` which will output the ID. Alternatively, you may supply the `--subscription <enter-your-id>` parameter to the script.

If you have confirmed the subscription ID, please reach out to the Azure Quantum team per the [instructions here](https://dev.azure.com/AzureQuantum-PreviewCustomers/PrivatePreview/_wiki/wikis/Documentation/32/Table-of-Contents?anchor=bugs%2C-feedback%2C-and-support)

### The storage account named <name> is already taken

Azure Quantum deploys a storage account which is used to store your job input and output data. The name of this account is automatically generated based off the name of your workspace however its possible an account with this name has already been created by someone else. If this occurs, you can specify a new name to use using the `--storage-account <name>` parameter.

### Storage account not found or accessible when running `show`

You might receive the `Storage account not found or accessible` error when running `quantum-workspace show` because you did not specify the same value for `--storage-account` as you did when you ran `create`. If you receive this error please ensure you pass the `show` command the same parameters as you used for `create`.