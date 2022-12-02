---
author: aviviano
description: Learn how to manage access to your Azure Quantum workspace.
ms.author: amvivian
ms.date: 12/01/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Manage workspace access
uid: microsoft.quantum.how-to.manage-workspace-access
---


# Manage Azure Quantum workspace access
 
## Azure role-based access control
[Azure role-based access control (Azure RBAC)](/azure/role-based-access-control/overview) is the authorization system you use to manage access to Azure resources. To grant access, you assign roles to users, groups, service principals, or managed identities at a particular scope.

Scope is the set of resources that the access applies to. In Azure, you can specify a scope at four levels: 

- [Management group](/azure/governance/management-groups/overview): If your organization has many Azure subscriptions, you may need a management group to efficiently manage access, policies, and compliance for those subscriptions. 
- Subscription: Logically associates user accounts with the resources that they create. Each subscription has limits or quotas on the amount of resources that it can create and use. You must have an Azure account with an active subscription to create Azure resources. For more information on choosing a subscription, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace#prerequisites).
- [Resource group](/azure/azure-resource-manager/management/overview#resource-groups): A container that holds related resources for an Azure solution. The resource group includes those resources that you want to manage as a group.
- Resource: An instance of a service that you can create. Your Azure Quantum workspace and the associated storage account are examples of resources that live in a single Azure resource group. 

Scopes are structured in a parent-child relationship. You can assign roles at any of these levels of scope.

:::image type="content" source="media/manage-workspace-access-scope.png" alt-text="Diagram showing the four levels of scope.":::

Because access can be scoped to multiple levels in Azure, a user may have different roles at each level. For example, someone with owner access to a workspace may not have owner access to the resource group that contains the workspace. 

 
## Role requirements for creating a workspace
o	Breakdown role requirements for the various scope levels (I’ve done a lot of testing to figure this out)
o	When you create a resource in Azure, such as a workspace, you may not be the owner of the resource. Your role is inherited from the highest scope role that you're authorized against in that subscription.
 
## Check your access/role assignment
o	Instructions for how to check your access for subscriptions/resources
 
## Assign roles

To grant access to 10 or less users access to your Azure Quantum workspace, see [Share access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.share-access-workspace). For more than 10 users, see see [Add a group to your Azure Quantum workspace](xref:microsoft.quantum.how-to.bulk-add-users).


To learn how to add a role assignment for any resource or level of scope, such as the subscription level, see [Assign Azure roles using the Azure portal](/azure/role-based-access-control/role-assignments-portal).
 
## Workspace roles and access levels

The three most common built-in roles for workspaces are reader, contributor, and owner. Workspace owners assign new users one of the following roles:

|Role|Access level|
|--|--|
|Owner|Full access to the workspace, including the ability to view, create, edit, or delete (where applicable) assets in a workspace. Additionally, you can change role assignments.|
|Contributor|Grants full access to view, create, edit, or delete (where applicable) assets in a workspace. For example, contributors can run quantum or optimization applications. Does not allow you to assign roles in Azure RBAC.
Reader|Readers can list and view assets in a workspace. Readers can't create or update these assets.|

* Help with the main actions ^