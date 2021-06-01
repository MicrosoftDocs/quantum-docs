---
author: anraman
description: This document provides instructions on how to authenticate using a service principal.
ms.author: anraman
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Using a service principal to authenticate
uid: microsoft.quantum.optimization.authenticate-service-principal
---

# Using a service principal to authenticate

Sometimes it is unsuitable to use interactive authentication or to authenticate
as a user account. These cases may arise when you want to submit jobs from a
web service, another worker role, or an automated system. In this case you
typically want to authenticate using a [Service
Principal](/azure/active-directory/develop/app-objects-and-service-principals).

## Prerequisite: Create a service principal and application secret

To authenticate as a service principal, you must first [create a service
principal](/azure/active-directory/develop/howto-create-service-principal-portal).

To create a service principal, assign access, and generate a credential:

1. [Create an Azure AAD application](/azure/active-directory/develop/howto-create-service-principal-portal):
    >[!NOTE]
    > You do not need to set a redirect URI

    1. Once created, write down the *Application (client) ID* and the *Directory (tenant) ID*.

1. [Create a
   credential](/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret)
   to login as the application:
    1. In the settings for your application, select **Certificates & secrets**.
    1. Under **Client Secrets**, select **Create New Secret**.
    1. Provide a description and duration, then select **Add**.
    1. Copy the value of the secret to a safe place immediately - you won't be
       able to see it again!

1. Give your service principal permissions to access your workspace:
    1. Open the Azure Portal.
    1. In the search bar, enter the name of the resource group you created your
       workspace in. Select the resource group when it comes up in the results.
    1. On the resource group overview, select **Access control (IAM)**.
    1. Click **Add Role Assignment**.
    1. Search for and select the service principal.
    1. Assign either the **Contributor** or **Owner** role.

## Authenticate as the service principal

**Step 1**: Install the `azure-common` python package:

```bash
pip3 install azure-common
```

**Step 2**: Before you call `workspace.login()`, instantiate your service
principal and provide it to the workspace:

```python
from azure.common.credentials import ServicePrincipalCredentials
workspace.credentials = ServicePrincipalCredentials(
    tenant    = "", # From service principal creation, your Directory (tenant) ID
    client_id = "", # From service principal creation, your Application (client) ID
    secret    = "", # From service principal creation, your secret
    resource  = "https://quantum.microsoft.com" # Do not change! This is the resource you want to authenticate against - the Azure Quantum service
)
```

> [!NOTE]
> The `workspace.login()` method has been deprecated and is no longer necessary. The first time there is a call to the service, an authentication will be attempted using the credentials passed in the `Workspace` constructor or its `credentials` property. If no credentials were passed, several authentication methods will be attempted by the [DefaultAzureCredential](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-identity/1.6.0/azure.identity.html#azure.identity.DefaultAzureCredential).


> [!NOTE]
> In order to create a role assignment on the resource group or workspace, you need to be an _owner_ or _user access administrator_ at the scope of the role assignment. If you do not have permissions to create the Service Principal in your subscription, you will need to request permission from the _owner_ or _administrator_ of the Azure subscription.

If you have permissions only at Resource Group or Workspace level, you can try to create the service principal without subscription level assignment using:

```az ad sp create-for-rbac --skip-assignment true```

Then, based on the output for the Service Principal name, you can go directly to the Resource Group or Azure Quantum Workspace in the portal to create a role assignment for that Service Principal, and assign the _contributor_ role. 
