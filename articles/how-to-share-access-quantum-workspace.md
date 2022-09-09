---
author: sonialopezbravo
description: Learn how to share access to your Azure Quantum workspace.
ms.author: sonialopez
ms.date: 09/09/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Share access to your Azure Quantum workspace
uid: microsoft.quantum.how-to.share-access-workspace
---

# Share access to your Azure Quantum workspace

Learn how to share access to your [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). For example, a professor may need to grant students access to their workspace. 

We recommend using the instructions in this article if you need to grant access to 10 or less users. For a larger number of users, it may be easier for you or your IT department to create a group of users and then grant it access to your workspace. For instructions, see [Add a group to your Azure Quantum workspace](xref:microsoft.quantum.how-to.bulk-add-users).

## Prerequisites

You need the following prerequisites to share access to your Azure Quantum workspace:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).


## Azure Active Directory

Each user must have an account in your organization's Azure Active Directory before you can grant them access to your workspace. For instructions, see [Add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory#add-a-new-user).

## Add users as contributors to your Azure Quantum workspace

1. Navigate to your Azure Quantum workspace.

1. Select **Access control (IAM)** from the left-side menu. Select **Add**, and then **Add role assignment**.
    :::image type="content" source="media/bulk-invite-users-add-assignment.png" alt-text="Screen shot showing how to add a new role assignment to your Azure Quantum workspace.":::

1. The **Add role assignment** page opens. On the **Role** pane, select **Contributor** and then select **Next**. 

    :::image type="content" source="media/bulk-invite-users-add-contributor.png" alt-text="Screen shot showing how to create a contributor to your Azure Quantum workspace.":::

1. On the **Members** pane, select **Assign access to User, group, or service principal**. Then select **+Select members**. The **Select members** blade opens. Search for and select each of your users. Then select the blue **Select** button. 

    :::image type="content" source="media/add-contributors.png" alt-text="Screen shot showing how to select your users to add to your Azure Quantum workspace.":::

1. A list of your users will appear under **Members**. Select **Review + assign**. On the **Review + assign** pane, Select **Review + assign** again. You should get a notification that your users were added to your workspace.

    :::image type="content" source="media/assign-contributors.png" alt-text="Screen shot showing how to assign your users as a contributor to your Azure Quantum workspace.":::