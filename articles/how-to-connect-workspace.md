---
author: SoniaLopezBravo
description: Learn how to connect and access to your Azure Quantum workspace using connection string and workspace parameters.
ms.author: sonialopez
ms.date: 03/04/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Connect to your Azure Quantum workspace
uid: microsoft.quantum.how-to.connect-workspace
---

# Connect to your Azure Quantum workspace

Once you have created an Azure Quantum workspace, you can connect to it using the `azure-quantum` package. The `azure-quantum` package provides a [`Workspace` class](/python/azure-quantum/azure.quantum.workspace) that represents an Azure Quantum workspace.

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- Install the Azure Quantum `azure-quantum` package.
- If you use Azure CLI, you must have the latest version. For the installation instructions, see:

    - [Install Azure CLI on Windows](/cli/azure/install-azure-cli-windows)
    - [Install Azure CLI on Linux](/cli/azure/install-azure-cli-linux)
    - [Install Azure CLI on macOS](/cli/azure/install-azure-cli-macos)

## Use the workspace parameters to connect to your Azure Quantum workspace

1. Log in to your Azure account, <https://portal.azure.com>, navigate to your Azure Quantum workspace, and copy the values from the header.

    ![How to retrieve the resource ID and location from an Azure Quantum workspace](media/azure-quantum-resource-id.png)

1. Use your account information to create a `Workspace` object to connect to your Azure Quantum workspace. When creating a `Workspace` object, you have two options for identifying your Azure Quantum workspace:

    - Specify the location and resource ID;

    ```python
    from azure.quantum import Workspace 

    workspace = Workspace(  
        resource_id = "", # Add the resource ID of your workspace
        location = "" # Add the location of your workspace (for example "westus")
        )
    ```

    - Specify the location, subscription ID, resource group, and workspace name.
    
    ```python
    from azure.quantum import Workspace 

    workspace = Workspace(  
        subscription_id = "", # Add the subscription ID of your workspace
        resource_group = "", # Add the resource group of your workspace
        workspace_name = "", # Add the name of your workspace
        location = "" # Add the location of your workspace (for example "westus")
        )
    ```

## Use a connection string to access your Azure Quantum workspace

You can also use a connection string to specify the connection parameters to an Azure Quantum Workspace. Some user scenarios when you want to use a connection string are:

- You wan to share the workspace access with others who don't have an azure account.
- You want to share the workspace access with others for a limited time.
- You cannot use Azure Active Directory (AAD) due to company policies.

You can create a `Workspace` object by calling `from_connection_string`.

```python
from azure.quantum import Workspace 

connection_string = "[Copy connection string]" 
workspace = Workspace.from_connection_string(connection_string) 

print(workspace.get_targets()) 
```

> [!TIP]
> Every Azure Quantum workspace has a **primary and secondary** keys and connection strings. If you want to allow access to your workspace to others, you can share your secondary key and you use your primary for your own services. This way, if one of your partners would abuse the key you could replace it without having downtime in your own services.

## Manage keys and connection strings

You can enable or disable **Access Keys** for your Azure Quantum workspace. Access keys are used to authenticate and authorize access to your Azure Quantum workspace. You can also regenerate new Access Keys to ensure the security of your workspace.

### [Azure portal](#tab/portal)

#### Enable and disable access keys

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. On the left panel, navigate to **Operations > Access keys**.
1. Switch the toggle under Access Keys to **Enabled** or **Disabled**.
1. Click on **Save** to save the changes.

    :::image type="content" source="media/connection-string-enable.png" alt-text="Screenshot of Azure portal showing how to enable Access Keys to use connection strings.":::

    > [!NOTE]
    > Creation of a new workspace should by default enable Access Keys and see keys and connection strings.

#### Regenerate new access keys

If you suspect that your Access Keys have been compromised, or you want to stop sharing your workspace access with others, you can regenerate new Access Keys to ensure the security of your workspace.

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. On the left panel, navigate to **Operations > Access keys**.
1. Access Keys have to be enabled to regenerate new keys. If Access Keys are disabled, you need to enable them first.
1. Click on the **circular arrow icon** to regenerate the primary or secondary key.

    :::image type="content" source="media/connection-string-regenerate.png" alt-text="Screenshot of Azure portal showing how to regenerate primary and secondary Access Keys.":::

### [Azure CLI](#tab/azurecli)

You can use the Azure Command-Line Interface (Azure CLI) to manage access keys. For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

1. Log in to your Azure account using the Azure CLI.

    ```azurecli
    az login
    ```

1. Select the subscription you want to use. Replace `SubscriptionName` with your subscription name. You can also use the subscription ID instead of the subscription name.

    ```azurecli
    az account set --subscription SubscriptionName
    ```

1. Set the workspace you want to use. Replace `WorkspaceLocation`, `ResourceGroupName`, and `WorkspaceName` with your workspace location, resource group name, and workspace name, respectively.

    ```azurecli	
    az quantum workspace set --location WorkspaceLocation --resource-group ResourceGroupName --workspace-name WorkspaceName
    ```

1. Show the **access keys** for the workspace.

    ```azurecli
    az quantum workspace keys list 
    ```

1. If you suspect that your Access Keys have been compromised, or you want to stop sharing your workspace access with others, you can **regenerate** the primary and secondary access keys to ensure the security of your workspace.

    ```azurecli
    az quantum workspace keys regenerate --key-type Primary 
    az quantum workspace keys regenerate --key-type Secondary 
    az quantum workspace keys regenerate --key-type Primary,Secondary 
    ```

1. You can **enable and disable** the access keys for the workspace.

    ```azurecli
    az quantum workspace update --enable-api-key true 
    az quantum workspace update --enable-api-key false 
    ```

***