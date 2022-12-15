---
author: aviviano
description: Learn how to manage access to your Azure Quantum workspace.
ms.author: amvivian
ms.date: 12/14/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Manage workspace access
uid: microsoft.quantum.how-to.manage-workspace-access
---


# Manage Azure Quantum workspace access

Learn how to manage access (authorization) to an Azure Quantum workspace.
 
## Azure role-based access control
[Azure role-based access control (Azure RBAC)](/azure/role-based-access-control/overview) is the authorization system you use to manage access to Azure resources. To grant access, you assign roles to a security principal. 

### Security principal

A security principal is an object that represents a user, group, service principal, or managed identity.

|Security principal|Definition|
|--|--|
|User|An individual user account that signs in to Azure to create, manage, and use resources.|
|Group|A defined group of users.|
|[Service principal](xref:microsoft.quantum.optimization.authenticate-managed-identity)|A user identity for an application, service, or platform that needs to access resources.|
|[Managed identity](xref:microsoft.quantum.optimization.authenticate-service-principal)| An automatically managed identity in Azure Active Directory for applications to use when connecting to resources that support Azure Active Directory (Azure AD) authentication.|

### Built-in roles

Azure provides both [built-in roles](/azure/role-based-access-control/built-in-roles) and the ability to create [custom roles](/azure/role-based-access-control/custom-roles). The most commonly used built-in roles are **Owner**, **Contributor**, and **Reader**.

|Role|Access level|
|--|--|
|Owner|Grants full access to manage all resources, including the ability to assign roles in Azure RBAC.|
|Contributor|Grants full access to manage all resources, but does not allow you to assign roles in Azure RBAC..|
|Reader|View all resources, but does not allow you to make any changes.|

### Scope

Roles are assigned at a particular scope. Scope is the set of resources that the access applies to. Scopes are structured in a parent-child relationship. Each level of hierarchy makes the scope more specific. The level you select determines how widely the role is applied. Lower levels inherit role permissions from higher levels. You can assign roles at any of these four levels of scope: 

- [Management group](/azure/governance/management-groups/overview): Helps you manage access, policy, and compliance for multiple subscriptions. All subscriptions in a management group automatically inherit the conditions that are applied to the management group. You may need a management group if your organization has multiple subscriptions.
- Subscription: Logically associates [Azure accounts](/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-account-and-azure-subscriptions) with the resources that they create. An Azure account is a user identity and one or more Azure subscriptions. A subscription represents a grouping of Azure resources. An invoice is generated at the subscription scope. You must have an Azure account with an active subscription to create Azure resources. For subscription options, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace#prerequisites).
- [Resource group](/azure/azure-resource-manager/management/manage-resource-groups-portal): A container that holds related resources for an Azure solution. The resource group includes those resources that you want to manage as a group. For example, the following resources are required to run applications in Azure Quantum and live in a single resource group:
  - [Azure storage account](/azure/storage/blobs/): stores input and output data for quantum jobs.
  - [Azure Quantum workspace](/azure/quantum/how-to-create-workspace): a collection of assets associated with running quantum or optimization applications.
- Resource: An instance of a service that you can create, such as a workspace or storage account.

:::image type="content" source="media/manage-workspace-access-scope.png" alt-text="Diagram showing the four levels of scope.":::

**Note:** Because access can be scoped to multiple levels in Azure, a user may have different roles at each level. For example, someone with owner access to a workspace may not have owner access to the resource group that contains the workspace.
 
## Role requirements for creating a workspace

When you [create a workspace](xref:microsoft.quantum.how-to.workspace), you first select a subscription, resource group, and storage account to associate with the workspace. Starting at the subscription scope, you must have the following levels of access to create a workspace. 

### Subscription Owner

Subscription owners can create workspaces using either the **Quick create** or **Advanced create** options. You can either choose a resource group and storage account that already exist under the subscription or create new ones. You also have the ability to [assign roles](#assign-roles) to other users.

### Subscription Contributor

Subscription contributors can create workspaces using the **Advanced create** option. 

- To create a new storage account, you must select an existing resource group that you're an owner of.

- To select an existing storage account, you must be an owner of the storage account. You must also select the existing resource group that the storage account belongs to.

To view your authorization for various resources, see [Check your role assignments](#check-your-role-assignments). 

Subscription contributors can't assign roles to others.

### Subscription Reader

Subscription readers can't create workspaces. You can view all resources created under the subscription, but can't make any changes or assign roles.

## Check your role assignments

### Check your subscriptions

To see a list of your subscriptions and associated roles:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Under the Azure services heading, select **Subscriptions**. If you don't see **Subscriptions** here, use the search box to find it. 
1. The Subscriptions filter beside the search box may default to Subscriptions == **global filter**. To see a list of all your subscriptions, select the Subscriptions filter and **deselect** the "Select only subscriptions selected in the..." box. Then select **Apply**. The filter should then show Subscriptions == **all**.
    :::image type="content" source="media/find-subs.png" alt-text="Screenshot of the Azure portal that shows how to change the subscriptions filter in order to list all of your subscriptions.":::

### Check your resources

To check the role assignment you or another user has for a particular resource, see [Check access for a user to Azure resources](/azure/role-based-access-control/check-access).

## Assign roles

To grant access to 10 or less users to your workspace, see [Share access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.share-access-workspace). To grant access to more than 10 users, see [Add a group to your Azure Quantum workspace](xref:microsoft.quantum.how-to.bulk-add-users).


To assign roles for any resource at any scope, including the subscription level, see [Assign Azure roles using the Azure portal](/azure/role-based-access-control/role-assignments-portal).

## Workspace roles and access levels

When adding users to a workspace, workspace owners can assign new users one of the following built-in roles:

|Role|Access level|
|--|--|
|Owner|Full access to the workspace, including the ability to view, create, edit, or delete (where applicable) assets in the workspace. Additionally, you can change role assignments.|
|Contributor|Grants full access to view, create, edit, or delete (where applicable) assets in the workspace. Doesn't allow you to assign roles.|
|Reader|Readers can list and view assets in the workspace. Readers can't create or update these assets.|

## Troubleshooting

- When you create a resource in Azure, such as a workspace, you're not directly the owner of the resource. Your role is inherited from the highest scope role that you're authorized against in that subscription. 

- It can sometimes take up to one hour for new role assignments to take effect over cached permissions across the stack.

- For solutions to common issues, see [Troubleshoot Azure Quantum: Creating an Azure Quantum workspace](xref:microsoft.quantum.azure.common-issues#creating-an-azure-quantum-workspace).
