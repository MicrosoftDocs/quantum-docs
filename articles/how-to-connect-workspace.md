---
author: SoniaLopezBravo
description: Learn how to connect and access to your Azure Quantum workspace using connection string and workspace parameters.
ms.author: sonialopez
ms.date: 01/13/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Connect to your Azure Quantum workspace
uid: microsoft.quantum.how-to.connect-workspace

#customer intent: As a quantum developer, I want to connect to my Azure Quantum workspace so I can submit my quantum programs to the Azure Quantum service.
---

# Connect to your Azure Quantum workspace with the azure-quantum Python package

Once you have created an Azure Quantum workspace, you can connect to it and submit your code using the `azure-quantum` Python package. The `azure-quantum` package provides a [`Workspace` class](xref:azure.quantum.Workspace) that represents an Azure Quantum workspace.

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of the Azure Quantum `azure-quantum` package.

    ```bash
    !pip install --upgrade azure-quantum
    ```

- If you use Azure CLI, you must have the latest version. For the installation instructions, see:

    - [Install Azure CLI on Windows](/cli/azure/install-azure-cli-windows)
    - [Install Azure CLI on Linux](/cli/azure/install-azure-cli-linux)
    - [Install Azure CLI on macOS](/cli/azure/install-azure-cli-macos)

## Connect using a connection string

You can use a connection string to specify the connection parameters to an Azure Quantum Workspace. You might use a connection string in the following scenarios:

- You want to share the workspace access with others who don't have an Azure account.
- You want to share the workspace access with others for a limited time.
- You cannot use Microsoft Entra ID due to company policies.

> [!TIP]
> Every Azure Quantum workspace has **primary and secondary** keys, and their corresponding connection strings. If you want to allow access to your workspace to others, you can share your secondary key and you use your primary for your own services. This way, you can replace the secondary key as needed without having downtime in your own services. For more information about sharing your workspace access, see [Share your workspace access](xref:microsoft.quantum.how-to.share-access-workspace).

### Copy the connection string

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. On the left panel, navigate to **Operations > Access keys**.
1. **Access Keys** have to be enabled. If Access Keys are disabled, you need to enable them first. See how to do it in [Manage your Access Keys](xref:microsoft.quantum.how-to.manage-access-keys).
1. Click on the **Copy** icon to copy the connection string. You can select either the primary or secondary connection string.

    :::image type="content" source="media/connection-string-copy.png" alt-text="Screenshot of Azure portal showing how to copy the connection strings.":::

> [!WARNING]
> Storing your account access keys or connection string in clear text presents a security risk and is **not** recommended. Store your account keys in an encrypted format, or migrate your applications to use Microsoft Entra authorization for access to your Azure Quantum workspace.

### Use the connection string to access your Azure Quantum workspace

Once you copied the connection string, you can use it to connect to your Azure Quantum workspace. 

#### [Python](#tab/tabid-python1)

If you're working with a Python environment, you can create a `Workspace` object to connect to your Azure Quantum workspace. When creating a `Workspace` object, you have two options for identifying your Azure Quantum workspace.

- You can create a `Workspace` object by calling `from_connection_string`.

    ```python
    # Creating a new Workspace object from a connection string 
    from azure.quantum import Workspace 
    
    connection_string = "[Copy connection string]" 
    workspace = Workspace.from_connection_string(connection_string) 
    
    print(workspace.get_targets()) 
    ```

- If you don't want to copy your connection string in the code, you can also store your connection string in an environment variable and use `Workspace()`.

    ```python
    # Using environment variable to connect with  connection string
    
    connection_string = "[Copy connection string]" 
    
    import os 
    
    os.environ["AZURE_QUANTUM_CONNECTION_STRING"] = connection_string 
    
    from azure.quantum import Workspace 
    
    workspace = Workspace() 
    print(workspace.get_targets()) 
    ```

#### [VS Code](#tab/tabid-vscode1)

1. Open Visual Studio Code.
1. Select **View -> Command Palette** and type **Q#: Connect to an Azure Quantum workspace**. Press **Enter**.
1. Select **Connection string**.
1. **Paste** the connection string you copied from the Azure portal and press **Enter**.
1. Your Azure Quantum workspace appears in the **Explorer** pane, under **Quantum Workspaces**. You can expand the workspace to see the targets available in your workspace and the list of jobs.

    :::image type="content" source="media/quantum-workspace-explorer-vscode.png" alt-text="Screenshot of Visual Studio Code showing how to expand the Quantum Workspace pane.":::

***

For more information about how to enable/disable and regenerate your keys, see [Manage your Access Keys](xref:microsoft.quantum.how-to.manage-access-keys).

> [!IMPORTANT]
> When Access Keys are disabled, all request using connection strings or access keys are unauthorized. You can still use the workspace parameters to connect to your workspace.

## Connect using the workspace parameters

Every Azure Quantum workspace has a unique set of parameters that you can use to connect to it. You can use the following parameters to connect to your Azure Quantum workspace:

|Parameter|Description|
|---------|-----------|
|`subscription_id`|The Azure subscription ID.|
|`resource_group`|The Azure resource group name.|
|`name`|The name of your Azure Quantum workspace.|
|`location`|The Azure region where the Azure Quantum workspace is provisioned. This may be specified as a region name such as "East US" or a location name such as "eastus".|
|`resource_id`|The Azure resource ID of the Azure Quantum workspace.|

You can find the workspace parameters in the overview of your Azure Quantum workspace in Azure portal.

1. Log in to your Azure account, <https://portal.azure.com>,
1. Select your Azure Quantum workspace, and navigate to **Overview**.
1. Copy the parameters in the fields.

    :::image type="content" source="media/azure-portal-workspace-overview.png" alt-text="Screenshot of Visual Studio Code showing how to expand the overview pane of your Quantum Workspace.":::


### Use the workspace parameters to connect to your Azure Quantum workspace

#### [Python](#tab/tabid-python)

Create a `Workspace` object to connect to your Azure Quantum workspace. When creating a `Workspace` object, you have two options for identifying your Azure Quantum workspace.

- You can specify the location and resource ID (recommended): 

    ```python
    from azure.quantum import Workspace 
    
    workspace = Workspace(  
        resource_id = "", # Add the resource ID of your workspace
        location = "" # Add the location of your workspace (for example "westus")
        )
    ```

- You can specify the location, subscription ID, resource group, and workspace name: 

    ```python
    from azure.quantum import Workspace 
    
    workspace = Workspace(  
        subscription_id = "", # Add the subscription ID of your workspace
        resource_group = "", # Add the resource group of your workspace
        workspace_name = "", # Add the name of your workspace
        location = "" # Add the location of your workspace (for example "westus")
        )
    ```

#### [Azure CLI](#tab/tabid-azurecli)

You can use the Azure Command-Line Interface (Azure CLI) to connect t your workspace. For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

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

***


## Related content

- [Manage quantum workspaces with Azure CLI](xref:microsoft.quantum.workspaces-cli)
- [Share access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.share-access-workspace)
- [Manage quantum workspaces with the Azure Resource Manager](xref:microsoft.quantum.workspaces-arm)
- [Authenticate using a service principal](xref:microsoft.quantum.optimization.authenticate-service-principal)
- [Authenticate using a managed identity](xref:microsoft.quantum.optimization.authenticate-managed-identity)