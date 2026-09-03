---
title: Azure Quantum preview API lifecycle
author: azure-quantum-content
description: Learn about the Azure Quantum preview API lifecycle.
ms.author: quantumdocwriters
ms.date: 09/02/2026
ms.service: azure-quantum
ms.subservice: core
ms.topic: concept-article
no-loc: ["API", "APIs", "Azure Quantum", "Azure Quantum Development Kit"]
uid: microsoft.quantum.preview-api-lifecycle
# Customer intent: As a cloud developer, I want to stay informed about the lifecycle and deprecation schedule of Azure Quantum preview APIs, so that I can ensure my applications are using up-to-date versions and avoid disruptions in service.
---

# Azure Quantum preview API life cycle

The Azure Quantum service preview APIs (APIs that end in `-preview`) have a lifespan of approximately 90 days after a new preview API version is released. For example, the `2026-01-15-preview` Data Plane API will be deprecated about 90 days after the next Date Plane API is released.

After an API version is deprecated, that version no longer functions. To avoid issues with deprecated APIs, routinely do the following:

- Update your ARM/BICEP templates that use preview API versions to use the latest version of the preview API.
- Update your Azure Quantum preview CLI extension to the latest version.
- Update preview SDKs or other tools that are built on preview APIs to the latest version of the preview API.

Perform these updates at least every 6-9 months. If you don't update your preview API versions, then you receive a notification that you're using a soon-to-be deprecated version as the deprecation date approaches.

## How to check what preview API versions you're using

If you're unsure what client or tool is using a specific API version, then check the [activity logs](/azure/azure-monitor/essentials/activity-log)
using the following commands. Set the API version that you want to inspect for recent usage in the activity log. These examples checks for the `2024-10-01-preview` API version.

### Bash

```bash
export API_VERSION="2024-10-01-preview"
az monitor activity-log list --offset 30d --max-events 10000 --namespace microsoft.quantum --query "[?eventName.value == 'EndRequest' && contains(not_null(httpRequest.uri,''), '$API_VERSION')]"
```

### Windows PowerShell

```powershell
$env:API_VERSION = "2024-10-01-preview"
az monitor activity-log list --offset 30d --max-events 10000 --namespace microsoft.quantum --query "[?eventName.value == 'EndRequest' && contains(not_null(httpRequest.uri,''), '$API_VERSION')]"
```

## How to update to a newer version of the Data Plane API

Use the following table to update your Data Plane APIs.

| Tool        | How to update                                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------------------------|
| Azure SDKs  | Update to a [newer version of the SDK](https://azure.github.io/azure-sdk/releases/latest/index.html?search=containerservice). |
| Azure CLI   | Run `az upgrade` and `az extension update --name "quantum"` to update the CLI and the `quantum` extension.                    |
| Other tools | Update the tool to the latest version.                                                                                        |

## Upcoming deprecation schedule

| API type         | API version        | Announce Date | Deprecation Date |
|------------------|--------------------|---------------|------------------|
| Data Plane       | 2026-01-15-preview |               |                  |
| Resource Manager | 2026-06-15-preview |               |                  |

## Past deprecations

| API type         | API version        | Announce Date | Deprecation Date |
|------------------|--------------------|---------------|------------------|
| Data Plane       | 2019-11-04-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2021-05-06-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2021-11-01-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2022-09-12-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2023-11-13-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2024-03-01-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2024-10-01-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2025-09-01-preview | June 1, 2026  | August 1, 2026   |
| Data Plane       | 2025-12-01-preview | June 1, 2026  | August 1, 2026   |
| Resource Manager | 2019-11-04-preview | June 1, 2026  | August 1, 2026   |
| Resource Manager | 2022-01-10-preview | June 1, 2026  | August 1, 2026   |
| Resource Manager | 2023-11-13-preview | June 1, 2026  | August 1, 2026   |
| Resource Manager | 2025-01-01-preview | June 1, 2026  | August 1, 2026   |
| Resource Manager | 2025-08-11-preview | June 1, 2026  | August 1, 2026   |
| Resource Manager | 2025-11-01-preview | June 1, 2026  | August 1, 2026   |
| Resource Manager | 2025-12-15-preview | June 1, 2026  | August 1, 2026   |
