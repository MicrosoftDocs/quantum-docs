---
title: Using a Service Principal to Authenticate
description: This document provides instructions on how to authenticate using a service principal.
author: anraman
ms.author: anraman
ms.date: 01/21/2021
ms.topic: article
uid: microsoft.quantum.optimization.authenticate-service-principal
---

# Using a Service Principal to Authenticate

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

    > You do not need to set a redirect URI
    1. Once created, write down the `Application (client) ID` and the `Directory
       (tenant) ID`

1. [Create a
   credential](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret)
   to login as the application
    1. In the settings for your application, select **Certificates & secrets**.
    1. Under **Client Secrets**, select **Create New Secret**.
    1. Provide a description and duration, then select **Add**.
    1. Copy the value of the secret to a safe place immediately - you won't be
       able to see it again!

1. Give your service principal permissions to access your workspace:
    1. Open the Azure Portal.
    1. In the search bar, enter the name of the resource group you created your
       Workspace in. Select the resource group when it comes up in the results.
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
    resource  = "https://private-preview.quantum.microsoft.com" # Do not change! This is the resource you want to authenticate against - the Azure Quantum service
)
```

That's it! Make sure you call `workspace.login()` after setting up the service
principal and you should be able to create jobs as usual.