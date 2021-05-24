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
Principal](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals).

## Prerequisite: Create a service principal and application secret

To authenticate as a service principal, you must first [create a service
principal](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

To create a service principal, assign access, and generate a credential:

1. [Create an Azure AAD application](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal):
    >[!NOTE]
    > You do not need to set a redirect URI

    1. Once created, write down the *Application (client) ID* and the *Directory (tenant) ID*.

1. [Create a
   credential](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret)
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

**Option 1: Using environment variables**:
The default credential used in the `Workspace` object creation is the [DefaultAzureCredential](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-identity/1.6.0/azure.identity.html#azure.identity.DefaultAzureCredential), which will attempt several types of authentication.
The first one is the [EnvironmentCredential](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-identity/1.6.0/azure.identity.html#azure.identity.EnvironmentCredential), and with that you pass pass the Service Principal credentials via the following environment variables:
- **AZURE_TENANT_ID**: ID of the service principal’s tenant. Also called its ‘directory’ ID.
- **AZURE_CLIENT_ID**: the service principal’s client ID
- **AZURE_CLIENT_SECRET**: one of the service principal’s client secrets

**Option 2: Using the ClientSecretCredential**: Pass a [ClientSecretCredential](https://docs.microsoft.com/en-us/python/api/azure-identity/azure.identity.clientsecretcredential?view=azure-python) during the instantiation of the `Workspace` object or set the its `credentials` property.

```python
from azure.identity import ClientSecretCredential

tenant_id = os.environ["AZURE_TENANT_ID"]
client_id = os.environ["AZURE_CLIENT_ID"]
client_secret = os.environ["AZURE_CLIENT_SECRET"]
credential = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

workspace.credentials = credential
```

> [!NOTE]
> The `workspace.login()` method has been deprecated and is no longer necessary. The first time there is a call to the service, an authentication will be attempted using the credentials passed in the `Workspace` constructor or its `credentials` property. If no credentials were passed, several authentication methods will be attempted by the [DefaultAzureCredential](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-identity/1.6.0/azure.identity.html#azure.identity.DefaultAzureCredential).


> [!NOTE]
> In order to create a role assignment on the resource group or workspace, you need to be an _owner_ or _user access administrator_ at the scope of the role assignment. If you do not have permissions to create the Service Principal in your subscription, you will need to request permission from the _owner_ or _administrator_ of the Azure subscription.

If you have permissions only at Resource Group or Workspace level, you can try to create the service principal without subscription level assignment using:

```az ad sp create-for-rbac --skip-assignment true```

Then, based on the output for the Service Principal name, you can go directly to the Resource Group or Azure Quantum Workspace in the portal to create a role assignment for that Service Principal, and assign the _contributor_ role. 
