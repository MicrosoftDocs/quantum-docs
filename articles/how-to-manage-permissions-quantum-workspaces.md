---
title: Manage quantum permissions to Azure Quantum resources 
description: This guide shows you how to set Azure Resource Manager locks on Azure Quantum resources 
author: bradben
ms.author: brbenefield
ms.service: azure-quantum
ms.topic: how-to
ms.date: 04/20/2022
ms.custom: lock-how-to
uid: microsoft.quantum.workspaces-locks
---

# Manage permissions to your Azure Quantum resources

Microsoft recommends locking all of your Azure Quantum workspaces and linked storage accounts with an Azure Resource Manager (ARM) resource lock to prevent accidental or malicious deletion. For example, professors may want to restrict students from modifying provider SKUs, but still enable them to use notebooks and submit jobs.  There are two types of ARM resource locks:

- A **CannotDelete** lock prevents users from deleting a resource, but permits reading and modifying its configuration.
- A **ReadOnly** lock prevents users from modifying a resource's configuration (including deleting it), but permits reading its configuration.
For more information about resource locks, see [Lock resources to prevent unexpected changes](/azure/azure-resource-manager/management/lock-resources?tabs=json).

> [!NOTE]
> If you already use an [ARM or Bicep template to manage your Azure Quantum workspaces](how-to-manage-quantum-workspaces-with-azure-resource-manager), you can add the procedures in this article to your existing templates.

## Recommended lock configuration

The following table shows the recommended resource lock configurations to deploy for an Azure Quantum workspace.

|Resource |Lock&nbsp;type | Y/N |Notes |
|--------|--------|--------|--------|
|Workspace |Delete |Y |Prevents the workspace from being deleted.|
|Workspace |Read-only |Y |Prevents any modifications to the workspace, including additions or deletions of providers. To modify providers when this lock is set, you need to remove the resource lock, make your changes, then redeploy the lock.|
|Storage account |Delete |Y |Prevents the storage account from being deleted. CAN NOTEBOOKS AND JOBS STILL BE DELETED?| 

These lock configurations should be avoided:

|Resource |Lock&nbsp;type | Y/N |Notes |
|--------|--------|--------|--------|
|Storage account |Read-only |N |Setting a Read-only resource lock on the storage account can cause failures with workspace creation, the Jupyter Notebooks interface, and submitting and fetching jobs. | 
|Parent subscription of the workspace or the parent resource group of the workspace or storage account |Read-only |N |When a resource lock is applied to a parent resource, all resources under that parent inherit the same lock, including resources created at a later date. For more granular control, resource locks should be applied directly at the resource level. | 

## Prerequisites

You must be an **Owner** or **User Access Administrator** of a resource to apply ARM resource locks.

### Command-line deployment

You also need either Azure PowerShell or Azure CLI to deploy the lock. If you use Azure CLI, you must have the latest version. For the installation instructions, see:

- [Install Azure PowerShell](/powershell/azure/install-az-ps)    
- [Install Azure CLI on Windows](/cli/azure/install-azure-cli-windows)
- [Install Azure CLI on Linux](/cli/azure/install-azure-cli-linux)
- [Install Azure CLI on macOS](/cli/azure/install-azure-cli-macos)

If you haven't used Azure CLI with Azure Quantum before, follow the steps in the [Environment setup](xref:microsoft.quantum.workspaces-cli#environment-setup) section to add the quantum extension and register the Azure Quantum namespace. 


## Sign in to Azure

After installing either Azure CLI or Azure Powershell, make sure you sign in for the first time. Choose one of the following tabs and run the corresponding command line commands to sign in to Azure:

# [Azure CLI](#tab/azure-cli)

```azurecli
az login
```

If you have multiple Azure subscriptions, select the subscription with the workspace that you want to lock. Replace `SubscriptionName` with your subscription name. You can also use the subscription ID instead of the subscription name.  For example 

```azurecli
az account set --subscription "Azure subscription 1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Connect-AzAccount
```

If you have multiple Azure subscriptions, select the subscription with the workspace that you want to lock. Replace `SubscriptionName` with your subscription name. You can also use the subscription ID instead of the subscription name. For example

```azurepowershell
Set-AzContext "Azure subscription 1"
```

---

## Create an ARM resource lock

When you deploy a resource lock, you specify a name for the lock, the type of lock, and additional information about the resource. This information can be copied and pasted from the resource's home page in the Azure Quantum portal.

# [Azure CLI](#tab/azure-cli)

```azurecli
az lock create \
    --name <lock> \
    --resource-group <resource-group> \
    --resource <workspace> \
    --lock-type CanNotDelete \
    --resource-type Microsoft.Quantum/workspaces

```

- name: A descriptive name for the lock
- resource-group: The name of the parent resource group. 
- resource: The name of the resource to apply the lock to. 
- lock-type: The type of lock to apply, either **CanNotDelete** or **ReadOnly**.
- resource-type: The type of the target resource.

For example, to create a **CanNotDelete** lock on a workspace:

```azurecli
az lock create --name ArmLockWkspDelete --resource-group armlocks-resgrp --resource armlocks-wksp --lock-type CanNotDelete --resource-type Microsoft.Quantum/workspaces
```

If successful, Azure returns the lock configuration in JSON format:

```json
{
  "id": "/subscriptions/<ID>/resourcegroups/armlocks-resgrp/providers/Microsoft.Quantum/workspaces/armlocks-wksp/providers/Microsoft.Authorization/locks/ArmLockWkspDelete",
  "level": "CanNotDelete",
  "name": "ArmLockWkspDelete",
  "notes": null,
  "owners": null,
  "resourceGroup": "armlocks-resgrp",
  "type": "Microsoft.Authorization/locks"
}
```

To create a **ReadOnly** lock on a workspace:

```azurecli
az lock create --name ArmLockWkspRead --resource-group armlocks-resgrp --resource armlocks-wksp --lock-type ReadOnly --resource-type Microsoft.Quantum/workspaces
```

```json
{
  "id": "/subscriptions/<ID>/resourcegroups/armlocks-resgrp/providers/Microsoft.Quantum/workspaces/armlocks-wksp/providers/Microsoft.Authorization/locks/ArmLockWkspRead",
  "level": "ReadOnly",
  "name": "ArmLockWkspRead",
  "notes": null,
  "owners": null,
  "resourceGroup": "armlocks-resgrp",
  "type": "Microsoft.Authorization/locks"
}
```

To create a **CanNotDelete** lock on a storage account:

```azurecli
az lock create --name ArmLockStoreDelete --resource-group armlocks-resgrp --resource armlocksstorage --lock-type CanNotDelete --resource-type Microsoft.Storage/storageAccounts
```

```json
{
  "id": "/subscriptions/<ID>/resourcegroups/armlocks-resgrp/providers/Microsoft.Storage/storageAccounts/armlocksstorage/providers/Microsoft.Authorization/locks/ArmLockStoreDelete",
  "level": "CanNotDelete",
  "name": "ArmLockStoreDelete",
  "notes": null,
  "owners": null,
  "resourceGroup": "armlocks-resgrp",
  "type": "Microsoft.Authorization/locks"
}
```

# [PowerShell](#tab/azure-powershell)

```azurepowershell
New-AzResourceLock -LockLevel CanNotDelete `
    -LockName <lock> `
    -ResourceName <workspace> `
    -ResourceType Microsoft.Quantum/workspaces `
    -ResourceGroupName <resource-group>

```

- LockLevel: The type of lock to apply, either **CanNotDelete** or **ReadOnly**.
- LockName: A descriptive name for the lock
- ResourceName: The name of the resource to apply the lock to. 
- ResourceType: The type of the target resource.
- ResourceGroupName: The name of the parent resource group.

For example, to create a **CanNotDelete** lock on a workspace:

```azurepowershell
New-AzResourceLock -LockLevel CanNotDelete -LockName ArmLockWkspDelete -ResourceName armlocks-wksp -ResourceType Microsoft.Quantum/workspaces -ResourceGroupName armlocks-resgrp
```

If successful, Azure returns the lock configuration properties

```output
Name                  : ArmLockWkspDelete
ResourceId            : /<ID>/resourceGroups/armlocks-resgrp/providers/Mi
                        crosoft.Quantum/workspaces/armlocks-wksp/providers/Microsoft.Authorization/locks/ArmLockWkspDel
                        ete
ResourceName          : armlocks-wksp
ResourceType          : Microsoft.Quantum/workspaces
ExtensionResourceName : ArmLockWkspDelete
ExtensionResourceType : Microsoft.Authorization/locks
ResourceGroupName     : armlocks-resgrp
SubscriptionId        : <ID>
Properties            : @{level=CanNotDelete}
LockId                : /subscriptions/<ID>/resourceGroups/armlocks-resgrp/providers/Mi
                        crosoft.Quantum/workspaces/armlocks-wksp/providers/Microsoft.Authorization/locks/ArmLockWkspDel
                        ete
```

To create a **ReadOnly** lock on a workspace:

```azurepowershell
New-AzResourceLock -LockLevel ReadOnly -LockName ArmLockWkspRead -ResourceName armlocks-wksp -ResourceType Microsoft.Quantum/workspaces -ResourceGroupName armlocks-resgrp
```

```output
Name                  : ArmLockWkspRead
ResourceId            : /subscriptions/<ID>/resourceGroups/armlocks-resgrp/providers/Mi
                        crosoft.Quantum/workspaces/armlocks-wksp/providers/Microsoft.Authorization/locks/ArmLockWkspRea
                        d
ResourceName          : armlocks-wksp
ResourceType          : Microsoft.Quantum/workspaces
ExtensionResourceName : ArmLockWkspRead
ExtensionResourceType : Microsoft.Authorization/locks
ResourceGroupName     : armlocks-resgrp
SubscriptionId        : <ID>
Properties            : @{level=ReadOnly}
LockId                : /subscriptions/<ID>/resourceGroups/armlocks-resgrp/providers/Mi
                        crosoft.Quantum/workspaces/armlocks-wksp/providers/Microsoft.Authorization/locks/ArmLockWkspRea
                        d
```

To create a **CanNotDelete** lock on a storage account:

```azurepowershell
New-AzResourceLock -LockLevel CanNotDelete -LockName ArmLockStoreDelete -ResourceName armlocksstorage -ResourceType Microsoft.Storage/storageAccounts -ResourceGroupName armlocks-resgrp 
```

```output
Name                  : ArmLockStoreDelete
ResourceId            : /subscriptions/<ID>/resourceGroups/armlocks-resgrp/providers/Mi
                        crosoft.Storage/storageAccounts/armlocksstorage/providers/Microsoft.Authorization/locks/ArmLock
                        StoreDelete
ResourceName          : armlocksstorage
ResourceType          : Microsoft.Storage/storageAccounts
ExtensionResourceName : ArmLockStoreDelete
ExtensionResourceType : Microsoft.Authorization/locks
ResourceGroupName     : armlocks-resgrp
SubscriptionId        : <ID>
Properties            : @{level=CanNotDelete}
LockId                : /subscriptions/<ID>/resourceGroups/armlocks-resgrp/providers/Mi
                        crosoft.Storage/storageAccounts/armlocksstorage/providers/Microsoft.Authorization/locks/ArmLock
                        StoreDelete
```

---

## Viewing and deleting locks

To view or delete locks:

# [Azure CLI](#tab/azure-cli)

For more information, see the [az lock reference](cli/azure/lock).

View all locks in a subscription

```azurecli
az lock list
```

View all locks in a workspace

```azurecli
az lock list --resource-group armlocks-resgrp --resource-name armlocks-wksp  --resource-type Microsoft.Quantum/workspaces
```

View all locks for all resources in a resource group

```azurecli
az lock list --resource-group armlocks-resgrp
```

View the properties of a single lock

```azcli
az lock show --name ArmLockStoreDelete --resource-group armlocks-resgrp --resource-name armlocksstorage --resource-type  Microsoft.Storage/storageAccounts
```

Delete a lock

```azcli
az lock delete --name ArmLockStoreDelete --resource-group armlocks-resgrp --resource armlocksstorage --resource-type  Microsoft.Storage/storageAccounts
```

If the delete is successful, Azure does not return a message. To verify the deletion, you can run `az lock list`. 


# [PowerShell](#tab/azure-powershell)

For more information, see the [Get-AzResourceLock reference](powershell/module/az.resources/get-azresourcelock).

View all locks in a subscription

```azurepowershell
Get-AzResourceLock
```

View all locks in a workspace

```azurepowershell
Get-AzResourceLock -ResourceName armlocks-wksp -ResourceType Microsoft.Quantum/workspaces -ResourceGroupName armlocks-resgrp
```

View all locks for all resources in a resource group

```azurepowershell
Get-AzResourceLock -ResourceGroupName armlocks-resgrp
```

View the properties of a single lock

```azurepowershell
Get-AzResourceLock -ResourceName armlocksstorage -ResourceGroupName armlocks-resgrp -ResourceType Microsoft.Storage/storageAccounts -LockName ArmLockStoreDelete
```

Delete a lock

To delete a lock, use the `Remove-AzResourceLock` command. For more information, see the [Remove-AzResourceLock reference](powershell/module/az.resources/remove-azresourcelock). 

```azurepowershell
Remove-AzResourceLock -LockName ArmLockStoreDelete -ResourceGroupName armlocks-resgrp -ResourceName armlocksstorage -ResourceType Microsoft.Storage/storageAccounts
```

If the delete is successful, Powershell displays `True`.  To verify the deletion, you can run `Get-AzResourceLock`. 

---

## Next steps

- [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli)
- [Manage quantum workspaces with the Azure Resource Manager](xref:microsoft.quantum.workspaces-arm)
