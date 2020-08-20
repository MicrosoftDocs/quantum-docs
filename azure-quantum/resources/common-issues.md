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

When submitting jobs for the first time to Azure Quantum, you may run into common issues

## Submitting jobs

### ERROR: Operation returned an invalid status code 'Unauthorized'
When calling an Azure Quantum API like submitting an Optimization job or a Q# program you may encounter an `Unauthorized` error if you have a classical administrator account. To correct, create an RBAC role assignment for yourself against the resource.

Steps to resolve this issue:

1. Open the Azure Portal: https://portal.azure.com
2. Click Subscriptions and select your subscription
    > This will create a role assignment for your whole subscription. You may also do this for a single resource group or for the workspace itself.
3. Click Access control (IAM)
4. Under 'Check access', enter your email address and select the account
5. Notice that an 'Owner' or 'Contributor' role is missing
6. Click on ‘Role assignments’ tab
7. Select Role > 'Owner' (or 'Contributor'), enter your email address and select your account
8. Click Save
9. You should see your account set with the 'Owner' (or 'Contributor') role
10. Wait up to 15 minutes and try again

### "Failed to compile program" when attempting to submit a Q# program through the CLI

When attempting to submit a job with `az quantum submit` you may encounter the following error message:
```
> az quantum job submit ...
Failed to compile program.
Command ran in 21.181 seconds (init: 0.457, invoke: 20.724)
```

This occurs when there is a problem with the Q# program that causes compilation to fail. To see the specific error that is causing the failure, run `dotnet build` in the same folder.

## Creating workspace

### ERROR: The resource type could not be found in the namespace 'Microsoft.Quantum' for api version '2019-11-04-preview'

Documentation under construction for this issue.
