---
author: azure-quantum-content
description: This document provides instructions on how to authenticate in your Azure Quantum workspace using a service principal.
ms.author: quantumdocwriters
ms.date: 03/17/2026
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Authenticate Using a Service Principal
uid: microsoft.quantum.optimization.authenticate-service-principal

#customer intent: As a quantum developer, I want to understand how to authenticate using a service principal to submit jobs to Azure Quantum.
---

# Authenticate in your workspace using a service principal

In this article, you learn how to use a a [service principal](/entra/identity-platform/app-objects-and-service-principals) to authenticate in your Azure Quantum workspace. Service principles are a good option for authentication when you can't use interactive authentication or can't authenticate a user account. For example, when you want to submit jobs to Azure Quantum from a web service, from another worker role, or from an automated system.

## Prerequisites: Create a service principal and application secret

### Create a service principal

--To create a service principal, assign access, and generate a credential:

To create a service principal, follow the steps to create a Microsoft Entra application in [Register a Microsoft Entra app and create a service principal](/entra/identity-platform/howto-create-service-principal-portal).

>[!NOTE]
> You don't need to set a redirect URI.

After you create the application, write down the **Application (client) ID** and the **Directory (tenant) ID**.

### Generate a credential

To generate a credential, 

1. [Create a credential](/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret)
   to sign in as the application:
    1. In the settings for your application, select **Certificates & secrets**.
    1. Under **Client Secrets**, select **Create New Secret**.
    1. Provide a description and duration, then select **Add**.
    1. Copy the value of the secret to a safe place immediately - you won't be
       able to see it again!

1. Give your service principal permissions to access your workspace:
    1. Open the Azure portal.
    1. In the search bar, enter the name of the resource group you created your
       workspace in. Select the resource group when it comes up in the results.
    1. On the resource group overview, select **Access control (IAM)**.
    1. Select **Add Role Assignment**.
    1. Search for and select the service principal.
    1. Assign either the **Contributor** or **Owner** role.

> [!NOTE]
> In order to create a role assignment on the resource group or workspace, you need to be an _owner_ or _user access administrator_ at the scope of the role assignment. If you don't have permissions to create the Service Principal in your subscription, you'll need to request permission from the _owner_ or _administrator_ of the Azure subscription.
>
> If you have permissions only at the resource group or workspace level, you can to create the service principal under the Contributor role using:
>
> `az ad sp create-for-rbac --role Contributor --scopes /subscriptions/<SUBSCRIPTION-ID>`

## Authenticate as the service principal

**Option 1: Using environment variables**:
The default credential used in the `Workspace` object creation is the [DefaultAzureCredential](/python/api/azure-identity/azure.identity.defaultazurecredential), which will attempt several types of authentication.
The first one is the [EnvironmentCredential](/python/api/azure-identity/azure.identity.environmentcredential), and with that you pass the Service Principal credentials via the following environment variables:
- **AZURE_TENANT_ID**: ID of the service principal’s tenant. Also called its ‘directory’ ID.
- **AZURE_CLIENT_ID**: the service principal’s client ID.
- **AZURE_CLIENT_SECRET**: one of the service principal’s client secrets.

**Option 2: Using the ClientSecretCredential**: Pass a [ClientSecretCredential](/python/api/azure-identity/azure.identity.clientsecretcredential) during the instantiation of the `Workspace` object or set the `credentials` property.

```python
from azure.identity import ClientSecretCredential

tenant_id = os.environ["AZURE_TENANT_ID"]
client_id = os.environ["AZURE_CLIENT_ID"]
client_secret = os.environ["AZURE_CLIENT_SECRET"]
credential = ClientSecretCredential(tenant_id=tenant_id, client_id=client_id, client_secret=client_secret)

workspace.credentials = credential
```

> [!NOTE]
> The `workspace.login()` method has been deprecated and is no longer necessary. The first time there's a call to the service, an authentication will be attempted using the credentials passed in the `Workspace` constructor or its `credentials` property. If no credentials were passed, several authentication methods will be attempted by the [DefaultAzureCredential](/python/api/azure-identity/azure.identity.defaultazurecredential).
