---
author: SoniaLopezBravo
description: This document provides instructions on how to authenticate in your Azure Quantum workspace using a managed identity.
ms.author: sonialopez
ms.date: 06/18/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Authenticate Using a Managed Identity 
uid: microsoft.quantum.optimization.authenticate-managed-identity

#customer intent: As a quantum developer, I want to understand how to authenticate using a managed identity to submit jobs to Azure Quantum.
---

# How to use a managed identity to authenticate in your Azure Quantum workspace

There are several scenarios where it is unsuitable to use interactive authentication or to authenticate
as a user account. For example, you may want to submit jobs from a virtual machine (VM), or from a Function App. One option is to [authenticate using a service principal](xref:microsoft.quantum.optimization.authenticate-service-principal), another option is to configure a managed identity, which this article will explain.

## Configure a managed identity

A managed identity allows an application to access other Azure resources (such as your Azure Quantum workspace) and authenticate with these resources. 

To configure a managed identity:

1. Via the Azure portal, locate the resource that you wish to give access to. This resource may be a VM, a Function App, or other application.
2. Select the resource, and view the overview page.
3. Under **Settings**, select **Identity**.
4. Configure the **Status** setting to **On**.
5. Select **Save** to persist your configuration and confirm the opening dialog with **Yes**.

## Grant access to your Azure Quantum workspace

In order to allow the resource to access your Azure Quantum workspace:

1. Navigate to your Azure Quantum workspace and select **Access control (IAM)** from the left-side menu.
1. Select **Add** and **Add role assignment**.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-3.png" alt-text="Screenshot showing how to create a new role assignment on your Azure Quantum workspace.":::

1. On the **Add role assignment** page, select **Contributor** and select **Next**.
1. On the **Members** tab, in **Assign access to**, select **Managed Identity**, and then select **+ Select members**.
1. In the **Select managed identities** popup, select a category from the **Managed identity** dropdown.
1. Select the desired resource from the list and click **Select**.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-4.png" alt-text="Screenshot showing how to add your Function App as a Contributor to your Azure Quantum workspace":::

1. Select **Next** and then select **Review and assign**.

## Logging in to your Azure Quantum workspace

You should now be able to use your quantum workspace from your chosen resource. For example when using your workspace from within a VM, you will no longer need to authenticate each time. 

In some cases, you may also want to specify explicitly within the code to use a Managed Identity Credential:

```python

from azure.identity import ManagedIdentityCredential

from azure.quantum import Workspace
workspace = Workspace (
    resource_id = "",
    location = "" ,
    credential=ManagedIdentityCredential()
)

```