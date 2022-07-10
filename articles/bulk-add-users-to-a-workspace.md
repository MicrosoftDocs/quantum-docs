---
author: sonialopezbravo
description: Learn how bulk add users to an Azure Quantum workspace from a CSV file.
ms.author: sonialopez
ms.date: 07/01/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: How to bulk add users to an Azure Quantum workspace
uid: microsoft.quantum.how-to.bulk-add-users
---

# Bulk add users to an Azure Quantum workspace

Learn how to bulk add users to an Azure Quantum workspace.

In this article you'll add a group as a contributor to a Quantum workspace, invite users to the Azure Active Directory, and then add the users to the group.

## Prerequisites

You need the following prerequisites to bulk add users to an Azure Quantum workspace:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A group created in the Azure Active Directory. See [Create a basic group and add members using Azure Active Directory](/azure/active-directory/fundamentals/active-directory-groups-create-azure-portal). You'll bulk add the group members in this tutorial.
- An aka.ms shortlink for your Quantum Workspace (for example, aka.ms/aq/hackathon-notebooks). To create the link, use the [Aka link manager tool](https://redirectiontool.trafficmanager.net/).

## Add your group as a contributor to your Quantum workspace

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.

1. Select **Home** and navigate to your Azure Quantum workspace.

1. Allow your group to access your workspace. Select **Access control (IAM)** from the left-side menu. Select **Add**, and then **Add role assignment**.
:::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-3.png" alt-text="Screen shot showing how to create a new role assignment on your Azure Quantum workspace.":::

1. The role assignment pane opens. Provide the following information:

    - **Role**: Select ``Contributor``.
    - **Assign access to**: Select [Group name].
    - **Select**: Select [Workspace name].


## Bulk invite users to the Azure Active Directory

1. Go to [Users - Microsoft Azure](https://portal.azure.com/#blade/Microsoft_AAD_IAM/UsersManagementMenuBlade/MsGraphUsers). On the left-side menu, go to **All users**.

1. Select **Bulk Operations**, and then **Bulk invite**.

1. On the **Bulk invite users** pane, select **Download** to get a valid CSV template with invitation properties.
 
    :::image type="content" source="media/bulk-invite-users-download-csv.png" alt-text="Screen shot showing how to download the bulk invite users CSV template.":::

1. Open the CSV template and add a line for each user. Required values are:

    - **Email address to invite** - the user who will receive an invitation

    - **Redirection url** - the aka.ms shortlink to which the invited user is forwarded after accepting the invitation

    :::image type="content" source="media/bulk-invite-users-CSV.png" alt-text="Screen shot showing the template CSV and how to list the users' email addresses and a custom invitation message.":::

1. Save the file. 

1. On the **Bulk invite users** pane, under **Upload your csv file**, browse to the file. When you select the file, validation of the CSV file starts. Once the **File uploaded successfully** message appears, select **Submit** to start the bulk invite operation.

    :::image type="content" source="media/bulk-invite-users-upload-csv-successful.png" alt-text="Screen shot showing that the CSV uploaded successfully.":::

## Bulk import members to your group

1. After the bulk invite is complete, download all Azure Active Directory users into a CSV file. Go to **All users**, and select **Bulk operations**, and then **Download users**. 

1. In the **Download users** pane, select **Start**.

    :::image type="content" source="media/bulk-invite-users-download-users.png" alt-text="Screen shot showing how to download users into a CSV.":::
    
1. After the bulk users export is complete, click on **Download results** to download the CSV file with all the Azure Active Directory users.

1. After the download is complete, import your group members. Go to [Groups - Microsoft Azure](https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupsManagementMenuBlade/AllGroups). Select your group, on the left-side menu, go to **Members**. In this blade, select **Bulk operations**, and then **Import members**.

1. On the **Bulk import group** pane, select **Download** to get a valid CSV template.

1. Open the CSV template and add a line for each user you want to invite to the group. Copy and paste their User Principal Names from the CSV that you downloaded in step 1.

    :::image type="content" source="media/bulk-invite-users-CSV-user-principal-names.png" alt-text="Screen shot showing the group import members template CSV.":::

1. Save the file.

1. On the **Bulk import group** pane, under **Upload your csv file**, browse to the file and upload it.

1. Once the **File uploaded successfully** message appears, select **Submit** to start the bulk import operation.

1. After the bulk import group operation completes, your group members will receive an invitation email. They want to accept the invitation.

1. On the **Review permissions** page, users must select **Accept** before they can continue.

1. After permissions are accepted, your group members will be added to the group succesfully. 

