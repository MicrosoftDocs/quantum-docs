---
title: Azure Quantum common issues
description: List of common issues of the Azure Quantum service.
author: geduardo
ms.author: v-edsanc@microsoft.com
ms.date: 06/25/2020
ms.topic: article
uid: microsoft.azure.quantum.common-issues
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

## Creating a Quantum Workspace

### Issue: The resource type could not be found in the namespace 'Microsoft.Quantum' for api version '2019-11-04-preview'

Documentation for this issue is under construction.
