---
author: geduardo
description: List of common issues of the Azure Quantum service.
ms.author: v-edsanc
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: computing
ms.topic: conceptual
title: Azure Quantum common issues
uid: microsoft.quantum.azure.common-issues
---

# Azure Quantum common issues

When you first start working with Azure Quantum, you may run into these common issues. 

## Submitting jobs

### Issue: Operation returns an invalid status code 'Unauthorized'

Steps to resolve this issue:

1. Open your Azure portal (https://portal.azure.com) and authenticate your account. 
2. Under **Navigate**, click **Subscriptions** and select your subscription.
3. Click **Access control (IAM)**.
4. Under **Check access**, search for your email address and select the account.
5. You should not see an **Owner** or a **Contributor** role listed.
6. Click the **Role assignments** tab.

    > [!NOTE]
    > If you don't see the **Role assignments** tab, you may need to expand the portal to full screen or close the **\<your name\> assignments** pane. 

7. Click the **Role** dropdown, select either **Owner** or **Contributor**, then enter your email address and select your account.
8. Click **Save**.
9. You should now see your account set configured with either the **Owner** or **Contributor** role.
10. Create your Quantum Workspace again and then submit a job against this new Quantum Workspace.

### Issue: "Failed to compile program" when attempting to submit a Q# program through the CLI

When attempting to submit a job at the command prompt using the  `az quantum submit` command, you may encounter the following error message:

```
> az quantum job submit ...
Failed to compile program.
Command ran in 21.181 seconds (init: 0.457, invoke: 20.724)
```

This error occurs when there is a problem with the Q# program that causes the compilation to fail. To see the specific error that is causing the failure, run `dotnet build` in the same folder.

### Issue: Operation returned an invalid status code 'Forbidden'

When you submit your first job you may get a ‘forbidden’ error code.

This issue may originate during the workspace creation: Azure Quantum fails to complete the role assignment linking the new workspace to the storage account that was specified.
A typical scenario for this situation happens if the tab or web browser window is closed before the workspace creation is completed.

You can verify that you are running into this role assignment issue by following these steps:

* Navigate to your new quantum workspace in Azure Portal
* Under **Overview** > **Essentials** > **Storage account**, click on the storage account link
* In the left navigation bar, select **Access Control (IAM)**
* Select **Role Assignments**
* Verify that your workspace appears as a **Contributor**
* If the workspace does not appear as a **Contributor** you can either:
  * Create a new workspace and make sure to wait for the workspace creation to be completed before closing the web browser tab or window.
  * Add the proper role assignment under the storage account     
    * Access Control (IAM) > Add role assignments
    * Role > Contributor
    * Assign access to > User, group, or service principal
    * Select > [Workspace name]
    * Save


