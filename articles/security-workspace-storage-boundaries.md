---
title: Understand Azure Quantum workspace and storage security boundaries
description: Learn how workspace access applies to job data in an associated Azure Storage account and how to create separate security boundaries.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 10/20/2026
ms.topic: concept-article
ms.service: azure-quantum
ms.subservice: core
no-loc: ["Azure Quantum", "Azure Storage"]
ai-usage: ai-assisted
uid: microsoft.quantum.security.workspace-storage-boundaries
# Customer intent: As an Azure administrator, I want to understand how workspace access applies to stored job data so that I can create the required security boundaries.
---

# Understand Azure Quantum workspace and storage security boundaries

An Azure Quantum workspace stores job inputs and outputs in an associated Azure Storage account that's either managed or customer provided. Either way, treat the storage account as part of the workspace security boundary.

> [!IMPORTANT]
> Anyone with permission to access workspace data can access all jobs in the workspace and all data in its associated storage account. Azure Quantum doesn't support access control lists for individual jobs.

## Understand the effective security boundary

Azure Quantum uses the workspace's system-assigned identity to read and write data in the associated storage account. Users and apps with the required workspace data permissions can access that data through the workspace.

Azure roles can grant resource management permissions, workspace data permissions, or both. A role that lets a user or app view or manage the workspace resource doesn't always grant access to job data. Review the role definition before you assign it.

 For more information, see [Understanding role-based access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.manage-workspace-access).

A principal with workspace data access can:

- View all jobs in the workspace.
- Access job inputs and outputs.
- Access the contents of the associated storage account through the workspace authorization model.

Direct Azure Storage authorization is a separate access path. Storage role assignments, account keys, and shared access signatures can grant more access outside the Azure Quantum workspace.

## Compare storage options

Azure Quantum supports two storage options, managed storage and customer-provided storage.

| Consideration | Managed storage account | Customer-provided storage account |
|---------------|-------------------------|-----------------------------------|
| Creation | Azure Quantum creates the account when you create the workspace. | You select an existing account when you create the workspace. |
| Location | Azure creates the account in a managed resource group in your subscription. | The account remains in the resource group that you manage. |
| Intended use | By default, Azure Quantum dedicates the account to one workspace. | The account can have other data or support more than one workspace. |
| Direct access | Azure restricts your direct use of the account. | You control direct use through Azure Storage authorization. |
| Workspace deletion | Azure deletes the account when you delete the workspace. | Azure doesn't delete the account when you delete the workspace. |
| Recommended use | Use this option for the simplest dedicated boundary. | Use a dedicated account that doesn't have data with different access requirements. |

The workspace security boundary applies to both options. A customer-provided account doesn't separate workspace users from data that's already in that account.

## Create separate security boundaries

Use separate workspaces and storage accounts when users, teams, applications, or data require different access permissions.

:::image type="content" source="media/workspace-storage-security-boundaries.png" alt-text="Diagram that shows each authorized user group connected to a separate Azure Quantum workspace and storage account security boundary.":::

For example:

- Grant Group A access to Workspace A, and associate Workspace A with Storage A.
- Grant Group B access to Workspace B, and associate Workspace B with Storage B.
- Don't grant either group access to the other group's workspace or storage account.

Don't share a storage account between Workspace A and Workspace B if the workspaces have different authorized users. A user who can access either workspace's data can access all data in the shared account.

## Don't use logical separation as a security boundary

Azure Quantum controls access to the whole workspace, not individual jobs. Folders, blob paths, job IDs, and similar naming conventions help organize data, but they don't restrict access through Azure Quantum.

Don't depend on logical separation within one storage account when the data requires different authorization. If your organization needs to share an account, set up an independent Azure Storage authorization model for the required resources. Validate the complete access path for every user, application, and workspace identity before you treat that configuration as a security boundary.

## Plan the resource lifecycle

Managed and customer-provided storage accounts have different lifecycle behavior:

- When you delete a workspace that uses managed storage, Azure also deletes the managed storage account and its data.
- When you delete a workspace that uses customer-provided storage, the storage account and its data remain.
- When you link a customer-provided storage account to multiple workspaces, each workspace can give access to the account's data.

Before you delete or migrate a workspace, review your data retention requirements and the access assignments on the linked storage account. To prevent accidental deletion, see [Protect Azure Quantum resources with ARM locks](xref:microsoft.quantum.workspaces-locks).

## Related content

- [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace)
- [Understand workspace access](xref:microsoft.quantum.how-to.manage-workspace-access)
- [Share access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.share-access-workspace)
- [Work with Azure Quantum jobs](xref:microsoft.quantum.work-with-jobs)
