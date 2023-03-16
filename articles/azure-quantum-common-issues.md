---
author: bradben
description: Troubleshoot common Azure Quantum issues.
ms.author: brbenefield
ms.date: 03/16/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: troubleshooting
title: Troubleshoot Azure Quantum
uid: microsoft.quantum.azure.common-issues
---

# Troubleshoot Azure Quantum

When working with Azure Quantum, you may run into these common issues. 

## Submitting jobs

### Issue: Missing targets

If the target where you want to run your job is missing from the available target list, you likely need to update to the latest version of the [Quantum Development Kit (Visual Studio 2022)](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) or [Quantum Development Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).


### Issue: Operation returns an invalid status code 'Unauthorized'

Steps to resolve this issue:

1. Open your Azure portal (https://portal.azure.com) and authenticate your account. 
2. Under **Navigate**, select **Subscriptions** and select your subscription.
3. Select **Access control (IAM)**.
4. Under **Check access**, search for your email address and select the account.
5. You shouldn't see an **Owner** or a **Contributor** role listed.
6. Select the **Role assignments** tab.

    > [!NOTE]
    > If you don't see the **Role assignments** tab, you may need to expand the portal to full screen or close the **\<your name\> assignments** pane. 

7. Select the **Role** dropdown, select either **Owner** or **Contributor**, then enter your email address and select your account.
8. Select **Save**.
9. You should now see your account set configured with either the **Owner** or **Contributor** role.
10. Create your Azure Quantum workspace again and then submit a job against this new Workspace.

### Issue: "Failed to compile program" when attempting to submit a Q# program through the CLI

When attempting to submit a job at the command prompt using the  `az quantum submit` command, you may encounter the following error message:

```
> az quantum job submit ...
Failed to compile program.
Command ran in 21.181 seconds (init: 0.457, invoke: 20.724)
```

This error occurs when there's a problem with the Q# program that causes the compilation to fail. To see the specific error that is causing the failure, run `dotnet build` in the same folder. 

### Issue: Compiler error "Wrong number of gate parameters"

When submitting a job to Quantinuum from a local Jupyter Notebook or command line environment, and using the legacy QASM translator (OPENQASM 2.0), you may encounter this error:

```
Job ID <jobId> failed or was cancelled with the message: 1000: Compile error: [<file, line>] Wrong number of gate parameters
```

This error occurs when a comma **","** or another non-period character is used as a decimal separator, as is common in many languages. Replace any non-period decimal separators with periods **"."**. 

```qsharp
// replace this line:
rx(1,5707963267948966) q[0];

// with this:
rx(1.5707963267948966) q[0];
```

> [!NOTE]
> This issue does not occur in hosted notebooks in the Azure Quantum portal, only in local development environments. 

### Issue: Operation returned an invalid status code 'Forbidden'

When you submit your first job you may get a ‘forbidden’ error code.

This issue may originate during the workspace creation: Azure Quantum fails to complete the role assignment linking the new workspace to the storage account that was specified.
A typical scenario for this situation happens if the tab or web browser window is closed before the workspace creation is completed.

You can verify that you're running into this role assignment issue by following these steps:

* Navigate to your new quantum workspace in Azure Portal
* Under **Overview** > **Essentials** > **Storage account**, select on the storage account link
* In the left navigation bar, select **Access Control (IAM)**
* Select **Role Assignments**
* Verify that your workspace appears as a **Contributor**
* If the workspace doesn't appear as a **Contributor** you can either:
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
* If you're a Visual Studio user, you'll need to upgrade to [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) to develop projects targeting .NET 6.0. We also have a [Q# extension](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) available for this product.

### Issue: Visual Studio 2019 extension isn't being updated

The last released version of the [QDK extension for Visual Studio 2019](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit) was `0.23.195983`. You can continue using this extension with projects targeting up to that QDK version; however, there are no plans to continue upgrading this extension regularly.

In order to use newer versions of the QDK for quantum projects with version `0.24.201332` or higher, you should use either the [extension for Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=quantum.DevKit64) or the [extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).

## Creating an Azure Quantum workspace

The following issues may occur when you use the Azure portal to create a workspace.

### Issue: You can't access the workspace creation form in the Azure portal; you are asked to sign up for a subscription instead

This issue occurs because you don't have an active subscription.

For example, you may have signed up for the [30 day free trial Azure subscription](https://azure.microsoft.com/free/), which includes $200 (USD) free Azure Credits to use on Azure services. Note that these Azure credits aren't the same as [Azure Quantum Credits](xref:microsoft.quantum.credits) and aren't eligible to use on quantum hardware providers. After 30 days of sign-up or once you've consumed the $200 of free Azure credits (whichever occurs first), you **must** upgrade to a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go) to continue using Azure Quantum services. Once you have an active subscription, the Azure portal will allow you to access the workspace creation form.

 To see a list of your subscriptions and associated roles, see [Check your subscriptions](xref:microsoft.quantum.how-to.manage-workspace-access#check-your-subscriptions).

### Issue: The **Quick create** option is unavailable

You must be an **Owner** of the subscription you select in order to use the **Quick create** option. To see a list of your subscriptions and associated roles, see [Check your subscriptions](xref:microsoft.quantum.how-to.manage-workspace-access#check-your-subscriptions). If you're a subscription **Contributor**, you can use the **Advanced create** option to create a workspace.

### Issue: You're unable to create or select a resource group or storage account

This issue occurs because you don't have the authorization required at the subscription, resource group, or storage account level. For more information on required access levels, see [Role requirements for creating a workspace](xref:microsoft.quantum.how-to.manage-workspace-access#role-requirements-for-creating-a-workspace).


### Issue: "Deployment Validation Failed" error message appears after you select **Create**

This error message may include more details such as "The client does not have authorization to perform action."

This issue occurs because you don't have the authorization required at the subscription, resource group, or storage account level. For more information on required access levels, see [Role requirements for creating a workspace](xref:microsoft.quantum.how-to.manage-workspace-access#role-requirements-for-creating-a-workspace).

If access was recently granted, you may need to refresh the page. It can sometimes take up to one hour for new role assignments to take effect over cached permissions across the stack.

### Issue: You don't see a specific quantum hardware provider on the Providers tab

This issue occurs because the provider doesn't support the billing region your subscription is set in. For example, if your subscription is set in Israel, the Providers tab won't list Rigetti as an available provider. For a list of providers and their availability by country, see [Global availability of Azure Quantum providers](xref:microsoft.quantum.provider-availability). 

## Azure Quantum portal

### Issue: Saved notebooks don't load

After selecting **Notebooks** in your workspace, the list of your saved notebooks displays a progress bar but never loads.

This can happen for two reasons:

1. If the storage account no longer exists. This can happen if the storage account linked to the workspace was deleted. To verify, select the **Overview** page for the workspace and select the link to the storage account. If the storage account has been deleted, you will see a **404 - Not found** error.

1. If the managed identity of the workspace is not a **Contributor** to the storage account. Please check that the workspace identity (which uses the same name as the workspace) still has the **Contributor** role assignment to the storage account. To verify, select the **Overview** page for the workspace and select the link to the storage account. On the **Overview** page for the storage account, select **Access control (IAM)** and verify that the workspace is listed under **Contributor**.

### Issue: "ModuleNotFoundErrorr: No module named 'qiskit_machine_learning'" when runnig Qiskit sample in Azure Quantum notebook

This error can happen if you haven't installed Qiskit when running a Qiskit Machine Learning sample on the Azure Quantum notebooks. To solve this issue add a new cell at the top of the notebook and copy: 

 ```python
 !pip install qiskit
 !pip install qiskit-machine-learning
 ``` 
 Then click on **Run all** on the top left of the notebook.
