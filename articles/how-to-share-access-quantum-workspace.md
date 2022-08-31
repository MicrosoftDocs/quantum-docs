---
author: sonialopezbravo
description: Learn how to share access to your Azure Quantum workspace.
ms.author: sonialopez
ms.date: 08/29/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Share access to your Azure Quantum workspace
uid: microsoft.quantum.how-to.share-access-workspace
---

# Share access to your Azure Quantum workspace

Learn how to share access to your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace) with individual users. For example, a professor may need to grant students access to their workspace.

> [!NOTE]
> If you need to add a large group of users to your workspace, you or your IT department can create a group in the Azure Active Directory and add it to your workspace. See [Bulk add users to an Azure Quantum workspace](xref:microsoft.quantum.how-to.bulk-add-users).

## Prerequisites

You need the following prerequisites to share access to your Azure Quantum workspacee:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).


## Add users to the Azure Active Directory

First, you must add each user to your Azure Active Directory organization. For instructions, see [Add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory#add-a-new-user).

## Add users as contributors to your Azure Quantum workspace

1. Navigate to your Azure Quantum workspace.

1. Select **Access control (IAM)** from the left-side menu. Select **Add**, and then **Add role assignment**.
    :::image type="content" source="media/bulk-invite-users-add-assignment.png" alt-text="Screen shot showing how to add a new role assignment to your Azure Quantum workspace.":::

1. The **Add role assignment** page opens. On the **Role** pane, select **Contributor** and then select **Next**. 

    :::image type="content" source="media/bulk-invite-users-add-contributor.png" alt-text="Screen shot showing how to create a contributor to your Azure Quantum workspace.":::

1. On the **Members** pane, select **Assign access to User, group, or service principal**. Then select **+Select members**. The **Select members** blade opens. Search for and select each of your users. Then select **Select**. 

    :::image type="content" source="media/bulk-invite-users-add-group-contributor.png" alt-text="Screen shot showing how to select your group to add to your Azure Quantum workspace.":::

1. A list of your users will appear under **Members**. Select **Review + assign**. On the **Review + assign** pane, Select **Review + assign** again. You should get a notification that your users were added to your workspace.

    :::image type="content" source="media/bulk-invite-users-assign-group-contributor.png" alt-text="Screen shot showing how to assign your group as a contributor to your Azure Quantum workspace.":::