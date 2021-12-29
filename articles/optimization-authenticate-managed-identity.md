---
author: frtibble
description: This document provides instructions on how to authenticate using a managed identity.
ms.author: frtibble
ms.date: 10/20/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Using a managed identity to authenticate
uid: microsoft.quantum.optimization.authenticate-managed-identity
---

# Using a managed identity to authenticate

There are several scenarios where it is unsuitable to use interactive authentication or to authenticate
as a user account. For example, you may want to submit jobs from a virtual machine (VM), or from a Function App. One option is to [authenticate using a service principal](articles/optimization-authenticate-service-principal), another option is to configure a managed identity, which this article will explain.

## Configure a managed identity

A managed identity allows an application to access other Azure resources (such as your Quantum Workspace) and authenticate with these resources. 

To configure a managed identity:
1. Via the Azure portal, locate the resource that you wish to give access to. This resource may be a VM, a Function App, or other application.
2. Select the resource, and view the overview page.
3. Under **Settings**, select **Identity**.

:::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-2.png" alt-text="Create a managed identity for the Function App":::

4. Configure the **Status** setting to **On**.
5. Select **Save** to persist your configuration and confirm the opening dialog with **Yes**.

## Grant access to your Quantum Workspace

In order to allow the resource to access your Quantum Workspace:
1. Navigate to your Quantum Workspace and select **Access control (IAM)** from the left-side menu.
2. Select **Add** and **Add role assignment**.


:::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-3.png" alt-text="Create a new role assignment on your Quantum Workspace":::

3. The role assignment dialog opens. Provide the following information:

    - **Role**: Select ``Contributor``.
    - **Assign access to**: Select ``Function App`` (or whichever resource you are granting access to).
    - **Subscription**: Select your subscription.
    - **Select**: Enter your Function App name (or the name of your resource).

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-4.png" alt-text="Add your Function App as a Contributor to your Quantum Workspace":::

4. Select your Function App (or resource) and confirm your selection with **Save**.

## Logging in to your Quantum Workspace

You should now be able to use your quantum workspace from your chosen resource. For example when using your workspace from within a VM, you will no longer need to authenticate each time. 

In some cases, you may also want to specify explicitly within the code to use a Managed Identity Credential:

```python

from azure.identity import ManagedIdentityCredential

from azure.quantum import Workspace
workspace = Workspace (
subscription_id = "",
resource_group = "",
name = "",
location = "" ,
credential=ManagedIdentityCredential())

```

## Next steps

- Now that you know how to configure a managed identity, see how it can be used in [Publish a QIO job as an Azure Function](articles/how-to-publish-qio-job-as-azurefunction).
