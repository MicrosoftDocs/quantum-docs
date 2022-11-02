---
author: bradben
description: List of common issues of the Azure Quantum service.
author: aviviano
ms.date: 03/30/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: troubleshooting
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
10. Create your Azure Quantum workspace again and then submit a job against this new Workspace.

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

### Issue: .NET SDK version mismatch

In version `0.24.201332` of the Quantum Development Kit (QDK), the target framework was updated from .NETCore 3.1 to .NET 6.0, so it's possible to encounter some issues while going from older to newer versions or when using projects from versions before and after this change.

Some recommendations to avoid those problems are:

* Install the latest version of [.NET 6.0](https://dotnet.microsoft.com/download) even if you have .NETCore 3.1 already. Multiple versions can coexist side-by-side in the same environment, so you don't have to uninstall older ones.
* If you're upgrading an application or test project to a QDK version equal or greater than `0.24.201332`, update the target framework from `netcoreapp3.1` to `net6.0`. Leave the framework as is if you want to keep using older versions of the QDK.
* If you are a Visual Studio user, you will need to upgrade to [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) to develop projects targeting .NET 6.0. We also have a [Q# extension](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) available for this product.

### Issue: Visual Studio 2019 extension is not being updated

The last released version of the [QDK extension for Visual Studio 2019](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit) was `0.23.195983`. You can continue using this extension with projects targeting up to that QDK version; however, there are no plans to continue upgrading this extension regularly.

In order to use newer versions of the QDK for quantum projects with version `0.24.201332` or higher, you should use either the [extension for Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) or the [extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).
