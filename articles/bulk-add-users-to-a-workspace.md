---
author: aviviano
description: Learn how to add a group of users to your Azure Quantum workspace from a CSV file.
ms.author: amvivian
ms.date: 09/22/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Add a group to your workspace
uid: microsoft.quantum.how-to.bulk-add-users
---

# Add a group to your Azure Quantum workspace

Learn how to grant a group of users access to your Azure Quantum workspace. For example, you may need to grant your team members or students access to your workspace.

We recommend using the instructions in this article if you need to grant access to more than 10 users. For a smaller number of users, see [Share access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.share-access-workspace).

In this article you'll:

1. [Create a group using the Azure Active Directory portal.](#create-a-group-in-the-azure-active-directory)
1. [Add the group as a contributor to your Quantum workspace.](#add-your-group-as-a-contributor-to-your-quantum-workspace)
1. [Bulk invite your users to the Azure Active Directory.](#bulk-invite-users-to-the-azure-active-directory)
1. [Bulk import those users to your group.](#bulk-import-members-to-your-group)

## Prerequisites

You need the following prerequisites to bulk add users to an Azure Quantum workspace:

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- An aka.ms shortlink for your Quantum Workspace (for example, aka.ms/aq/hackathon-notebooks). To create the link, use the [Aka link manager tool](https://redirectiontool.trafficmanager.net/).

## Create a group in the Azure Active Directory

1. Sign in to the [Azure portal](https://portal.azure.com). You must be an **Owner** of the workspace in order to add the group in the next step.

1. Search for and select **Azure Active Directory**.

1. On the **Active Directory** page, select **Groups** from the left menu and then select **New group**.

    :::image type="content" source="media/bulk-invite-users-new-group.png" alt-text="Screen shot showing how to select new group.":::

1. Fill out the required information on the **New Group** page.

    - Select **Microsoft 365** as the **Group type**.
    - Create and add a **Group name.** 
    - Add a **Group email address** for the group, or keep the email address that is filled in automatically.
    - **Group description**. Add an optional description to your group.
    - Select **Assigned** as the **Membership type**.

    :::image type="content" source="media/bulk-invite-users-new-group-create.png" alt-text="Screen shot showing how to fill out new group information.":::

1. Select **Create**. You should get a notification that you've successfully created your group.

## Add your group as a contributor to your Quantum workspace

1. Sign in to the [Azure portal](https://portal.azure.com). You must be an **Owner** of the workspace in order to add the group as a contributor.

1. Navigate to your Azure Quantum workspace.

1. Allow your group to access your workspace. Select **Access control (IAM)** from the left-side menu. Select **Add**, and then **Add role assignment**.
    :::image type="content" source="media/bulk-invite-users-add-assignment.png" alt-text="Screen shot showing how to add a new role assignment to your Azure Quantum workspace.":::

1. The **Add role assignment** page opens. On the **Role** pane, select **Contributor** and then select **Next**. 

    :::image type="content" source="media/bulk-invite-users-add-contributor.png" alt-text="Screen shot showing how to create a contributor to your Azure Quantum workspace.":::

1. On the **Members** pane, select Assign access to **User, group, or service principal**. Then select **+Select members**. The **Select members** blade opens. Search for your group name and select your group. Then select **Select**.


    :::image type="content" source="media/bulk-invite-users-add-group-contributor.png" alt-text="Screen shot showing how to select your group to add to your Azure Quantum workspace.":::

1. Your group name will appear under **Members**. Select **Review + assign**. On the **Review + assign** pane, Select **Review + assign** again. You should get a notification that your group was added as Contributor for your workspace.

    :::image type="content" source="media/bulk-invite-users-assign-group-contributor.png" alt-text="Screen shot showing how to assign your group as a contributor to your Azure Quantum workspace.":::

## Bulk invite users to the Azure Active Directory

1. Go to [Users - Microsoft Azure](https://portal.azure.com/#blade/Microsoft_AAD_IAM/UsersManagementMenuBlade/MsGraphUsers). On the left-side menu, go to **All users**.

1. Select **Bulk Operations**, and then **Bulk invite**.

1. On the **Bulk invite users** pane, select **Download** to get a valid CSV template with invitation properties.
 
    :::image type="content" source="media/bulk-invite-users-download-csv.png" alt-text="Screen shot showing how to download the bulk invite users CSV template.":::

1. Open the CSV template and add a line for each user. The first two rows of the upload template must not be removed or modified, or the upload can't be processed. The third row provides examples of values for each column. You must remove the examples row and replace it with your own entries. Required values are:

    - **Email address to invite** - the user who will receive an invitation

    - **Redirection url** - the aka.ms shortlink to which the invited user is forwarded after accepting the invitation

    :::image type="content" source="media/bulk-invite-users-CSV.png" alt-text="Screen shot showing the template CSV and how to list the users' email addresses and a custom invitation message.":::

1. Save the file. 

1. On the **Bulk invite users** pane, under **Upload your csv file**, browse to the file. When you select the file, validation of the CSV file starts. Once the **File uploaded successfully** message appears, select **Submit** to start the bulk invite operation.

    :::image type="content" source="media/bulk-invite-users-upload-csv-successful.png" alt-text="Screen shot showing that the CSV uploaded successfully.":::

1. After the bulk invite users operation completes, your users will receive an invitation email. They want to accept the invitation.

1. On the **Review permissions** page, users must select **Accept** before they can continue.

1. After permissions are accepted, your users will be added to the Azure Active Directory.

## Bulk import members to your group

1. After the bulk invite is complete, download all Azure Active Directory users into a CSV file. Go to **All users**, and select **Download users**. 

1. In the **Download users** pane, select **Start**.

    :::image type="content" source="media/bulk-invite-users-download-users.png" alt-text="Screen shot showing how to download users into a CSV.":::
    
1. After the bulk users export is complete, click on **Download results** to download the CSV file with all your Azure Active Directory users.

1. After the download is complete, import your group members. Go to [Groups - Microsoft Azure](https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupsManagementMenuBlade/AllGroups). Select your group, on the left-side menu, go to **Members**. In this blade, select **Bulk operations**, and then **Import members**.

1. On the **Bulk import group** pane, select **Download** to get a valid CSV template.

1. Open the CSV template and add a line for each user you want to invite to the group. Copy and paste your users' User Principal Names from the CSV that you downloaded in step 1. The third row provides an example value. You must remove the example row and replace it with your own entry.

    :::image type="content" source="media/bulk-invite-users-CSV-user-principal-names.png" alt-text="Screen shot showing the group import members template CSV.":::

1. Save the file.

1. On the **Bulk import group** pane, under **Upload your csv file**, browse to the file and upload it.

1. Once the **File uploaded successfully** message appears, select **Submit** to start the bulk import operation.

1. After the bulk import group operation completes, your group members will be added to the group successfully.

