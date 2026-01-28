---
author: azure-quantum-content
description: Learn how to connect and access to your Azure Quantum workspace using connection string and workspace parameters.
ms.author: quantumdocwriters
ms.date: 01/13/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Connect to your Azure Quantum workspace
uid: microsoft.quantum.how-to.connect-workspace
ms.custom:
  - sfi-image-nochange
  - sfi-ropc-nochange

#customer intent: As a quantum developer, I want to connect to my Azure Quantum workspace so I can submit my quantum programs to the Azure Quantum service.
---

# Connect to your Azure Quantum workspace with the QDK or Azure CLI

If you have an Azure Quantum workspace, then you can connect to your workspace and submit your code with the `qdk.azure` Python module. The `qdk.azure` module provides a [`Workspace` class](xref:azure.quantum.Workspace) that represents an Azure Quantum workspace.

## Prerequisites

To connect to your workspace with the `qdk.azure` module, you must have the following:

- An Azure account with an active subscription. If you don’t have an Azure account, then you can register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. If you don't have a workspace, then see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of the `qdk` python library with the `azure` extra.

    ```bash
    pip install --upgrade "qdk[azure]"
    ```

If you use Azure CLI, then you must have the latest version. For installation instructions, see:

- [Install Azure CLI on Windows](/cli/azure/install-azure-cli-windows)
- [Install Azure CLI on Linux](/cli/azure/install-azure-cli-linux)
- [Install Azure CLI on macOS](/cli/azure/install-azure-cli-macos)

## Connect with a connection string

You can use a connection string to specify the connection parameters to an Azure Quantum workspace. Connection strings are useful in the following scenarios:

- You want to share access to your workspace with others who don't have an Azure account.
- You want to share access to your workspace with others for a limited time.
- You can't use Microsoft Entra ID because of company policies.

> [!TIP]
> Every Azure Quantum workspace has a primary key and a secondary key, and each key has its own connection string. To allow others to access your workspace, share the secondary key and use the primary key only for your own services. You can replace the secondary key without causing downtime in your own services. For more information about sharing access to your workspace, see [Share your workspace access](xref:microsoft.quantum.how-to.share-access-workspace).

### Copy the connection string

1. Log in to the [Azure portal](https://portal.azure.com/).
1. Go to your Azure Quantum workspace.
1. In the workspace panel, expand the **Operations** dropdown and choose **Access Keys**.
1. You must enable access keys for you workspace. If the **Access Keys** slider is set to **Disabled**, then set the slider to **Enabled**.
1. Choose the **Copy** icon for that connection string that you want to copy. You can choose either the primary or secondary connection string.

> [!WARNING]
> It's a security risk to store your account access keys or connection strings in clear text. It's a best practice to store your account keys in an encrypted format, or migrate your applications to use Microsoft Entra authorization for access to your Azure Quantum workspace.

### Use the connection string to access your Azure Quantum workspace

You can use the connection string that you just copied to connect to your Azure Quantum workspace with the `qdk.azure` module or with Visual Studio Code (VS Code).

#### [Python](#tab/tabid-python1)

Create a `Workspace` object to connect to your Azure Quantum workspace. There are two options to identify your Azure Quantum workspace when you create a `Workspace` object.

- Call the `from_connection_string` function when you create a `Workspace` object.

    ```python
    # Create a new Workspace object from a connection string 
    from qdk.azure import Workspace 
    
    connection_string = "[Copy connection string]" 
    workspace = Workspace.from_connection_string(connection_string) 
    
    print(workspace.get_targets()) 
    ```

- If you don't want to copy your connection string in your code, then store your connection string in an environment variable and use `Workspace()`.

    ```python
    # Use an environment variable to connect with your connection string
    
    connection_string = "[Copy connection string]" 
    
    import os 
    
    os.environ["AZURE_QUANTUM_CONNECTION_STRING"] = connection_string 
    
    from qdk.azure import Workspace 
    
    workspace = Workspace() 
    print(workspace.get_targets()) 
    ```

#### [VS Code](#tab/tabid-vscode1)

1. Open VS Code.
1. Open the **View** menu and choose **Command Palette**.
1. Enter and select **QDK: Connect to an Azure Quantum workspace**.
1. Choose **Connection string**.
1. Paste the connection string that you copied from the Azure portal and press **Enter**.

Your Azure Quantum workspace appears in the **Explorer** pane, under **QUANTUM WORKSPACES**. Expand the workspace to see the targets that are available in your workspace and the list of jobs.

:::image type="content" source="media/quantum-workspace-explorer-vscode.png" alt-text="Screenshot of Visual Studio Code showing how to expand the Quantum Workspace pane.":::

***

For more information about how to work with keys, see [Manage your Access Keys](xref:microsoft.quantum.how-to.manage-access-keys).

> [!IMPORTANT]
> If you disable access keys for your workspace, then you can't use connection strings to connect to your workspace. But you can still use workspace parameters to connect to your workspace.

## Connect to your workspace with workspace parameters

Every Azure Quantum workspace has a unique set of parameters that you can use to connect to the workspace. You can use the following parameters to connect to your Azure workspace:

| Parameter         | Description                                           |
|-------------------|-------------------------------------------------------|
| `subscription_id` | The Azure subscription ID.                            |
| `resource_group`  | The Azure resource group name.                        |
| `name`            | The name of your Azure Quantum workspace.             |
| `location`        | The Azure region that your workspace is in.           |
| `resource_id`     | The Azure resource ID of the Azure Quantum workspace. |

To find your workspace parameters, follow these steps:

1. Log in to the [Azure portal](https://portal.azure.com/).
1. Go to your Azure Quantum workspace.
1. From your workspace panel, choose **Overview**.
1. Expand the **Essentials** dropdown.
1. Copy the parameters in their corresponding fields.

> [!NOTE]
> Make sure that you log into the correct tenant before you connect to your workspace. For more information about tenants, see [How to manage Azure subscriptions with the Azure CLI](https://learn.microsoft.com/cli/azure/manage-azure-subscriptions-azure-cli?view=azure-cli-latest&tabs=bash).

### Use workspace parameters to connect to your Azure Quantum workspace

To stay logged in when you run your Python scripts, before you use workspace parameters to connect to your workspace, open a terminal and run the following Azure CLI command to set the subscription for your workspace. Replace `<subscriptionId>` with your subscription ID.

```azurecli
az account set --subscription <subscriptionId>
```

You can use your workspace parameters to connect to your Azure Quantum workspace with the `qdk.azure` module or with Azure CLI.

#### [Python](#tab/tabid-python)

Create a `Workspace` object to connect to your Azure Quantum workspace. There are three options to identify your Azure Quantum workspace when you create a `Workspace` object.

- Specify the resource ID (recommended):

    ```python
    from qdk.azure import Workspace 
    
    workspace = Workspace(resource_id="") # Add the resource ID of your workspace
    ```

- Specify the subscription ID, resource group, and workspace name:

    ```python
    from qdk.azure import Workspace 
    
    workspace = Workspace(  
        subscription_id="", # Add the subscription ID of your workspace
        resource_group="", # Add the resource group of your workspace
        name="" # Add the name of your workspace
        )
    ```

- Specify just the workspace name. This option might fail when you have multiple workspaces that have the same name in the same tenant.

    ```python
    from qdk.azure import Workspace 
    workspace = Workspace(name="") # Add the name of your workspace
    ```

#### [Azure CLI](#tab/tabid-azurecli)

You can use Azure CLI to connect to your workspace. For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

1. To log in to your Azure account, run the `az login` command.

    ```azurecli
    az login
    ```

1. Set the subscription that you want to use. Replace `SubscriptionName` with your subscription name. You can also use the subscription ID instead of the subscription name.

    ```azurecli
    az account set --subscription SubscriptionName
    ```

1. Set the workspace that you want to use. Replace `ResourceGroupName`, `WorkspaceName`, and `Location` with your workspace's resource group name, workspace name, and Azure region respectively.

    ```azurecli
    az quantum workspace set --resource-group ResourceGroupName --workspace-name WorkspaceName --location Location
    ```

***

## Related content

- [Manage quantum workspaces with Azure CLI](xref:microsoft.quantum.workspaces-cli)
- [Share access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.share-access-workspace)
- [Manage quantum workspaces with the Azure Resource Manager](xref:microsoft.quantum.workspaces-arm)
- [Authenticate using a service principal](xref:microsoft.quantum.optimization.authenticate-service-principal)
- [Authenticate using a managed identity](xref:microsoft.quantum.optimization.authenticate-managed-identity)