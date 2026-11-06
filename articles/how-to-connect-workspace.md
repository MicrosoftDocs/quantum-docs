---
title: Connect to your Azure Quantum workspace
description: Learn how to connect and access to your Azure Quantum workspace using connection string and workspace parameters.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 08/20/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["Azure Quantum", "Microsoft Quantum", "Microsoft Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Python", "Azure CLI", "Microsoft Entra ID", "Q#", "$$v"]
uid: microsoft.quantum.how-to.connect-workspace
# Customer intent: As a quantum developer, I want to connect to my Azure Quantum workspace so I can submit my quantum programs to the Azure Quantum service.
ms.custom:
  - sfi-image-nochange
  - sfi-ropc-nochange
---

# Connect to your Azure Quantum workspace with the QDK or Azure CLI

If you have an Azure Quantum workspace, you can use the `qdk.azure` Python module the connect to the workspace and submit your code to run on Azure Quantum. The `qdk.azure` module provides a [`Workspace` class](xref:azure.quantum.Workspace) that represents an Azure Quantum workspace.

> [!WARNING]
> Starting January 11, 2027, Azure Quantum requires users in a Quantum workspace to have the **Quantum Workspace Data Reader** or **Quantum Workspace Data Contributor** role to view job results. The **Quantum Workspace Data Contributor** role will be required to submit jobs. To avoid interruptions to your Azure Quantum workflows, assign these roles to the appropriate users before the deadline. For more information, see [Assign data access roles for users in the workspace](xref:microsoft.quantum.how-to.workspace#assign-data-access-roles-for-users-in-the-workspace).

## Prerequisites

To connect to your workspace with the `qdk.azure` module, you need:

- An Azure account with an active subscription. If you don't have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. If you don't have a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of the `qdk` Python package with the `azure` extra.

    ```bash
    pip install --upgrade "qdk[azure]"
    ```

If you use the Azure CLI, update to the latest version. For installation instructions, see:

- [Install Azure CLI on Windows](/cli/azure/install-azure-cli-windows)
- [Install Azure CLI on Linux](/cli/azure/install-azure-cli-linux)
- [Install Azure CLI on macOS](/cli/azure/install-azure-cli-macos)

## Connect with an Azure account

Use an Azure account to connect to your Azure Quantum workspace with the Microsoft Quantum Development Kit (QDK) extension in Visual Studio Code (VS Code).

1. Open VS Code.
1. Select **View** > **Command Palette**.
1. Enter and select **QDK: Connect to an Azure Quantum workspace**.
1. Choose **Azure account**.
1. When a VS Code message says that QDK wants to sign in, select **Allow**.
1. Select the account to use.
1. Select a tenant and subscription.

To view your Azure Quantum workspace, select the **Microsoft Quantum** icon on the Activity Bar.

:::image type="content" source="media/vscode-microsoft-quantum-panel-icon.png" alt-text="Screenshot of the Microsoft Quantum panel icon on the Activity Bar in Visual Studio Code.":::

## Connect with a connection string

> [!NOTE]
> Connection strings are less secure than an Azure account.

Use a connection string to specify the connection parameters for an Azure Quantum workspace. Connection strings are useful when:

- You want to share access to your workspace with others who don't have an Azure account.
- You want to share access to your workspace with others for a limited time.
- You can't use Microsoft Entra ID because of company policies.

> [!TIP]
> Every Azure Quantum workspace has a primary key and a secondary key, and each key has its own connection string. To let others use your workspace, share the secondary key and keep the primary key for your own services. That way, you can replace the secondary key without causing downtime in your services. For more information about sharing access to your workspace, see [Share your workspace access](xref:microsoft.quantum.how-to.share-access-workspace).

### Copy the connection string

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. Go to your Azure Quantum workspace.
1. In the workspace panel, expand the **Operations** dropdown and select **Access Keys**.
1. If the **Access Keys** slider is set to **Disabled**, set it to **Enabled**.
1. Select the **Copy** icon for the connection string that you want to copy. You can choose either the primary or secondary connection string.

> [!WARNING]
> Storing your account access keys or connection strings in clear text is a security risk. Store your account keys in an encrypted format, or migrate your apps to use Microsoft Entra authorization for your Azure Quantum workspace.

### Use the connection string to access your Azure Quantum workspace

Use the connection string you copied to connect to your Azure Quantum workspace with the `qdk.azure` module or the QDK extension in VS Code.

#### [Python](#tab/tabid-python1)

To connect to your Azure Quantum workspace, choose one of the following methods.

- Use the `from_connection_string` function to create a `Workspace` object.

    ```python
    from qdk.azure import Workspace 
    
    connection_string = "<ConnectionString>" # Replace with your connection string
    workspace = Workspace.from_connection_string(connection_string) 
    
    print(workspace.get_targets())
    ```

- Store your connection string in an environment variable.

    ```python
    import os
    from qdk.azure import Workspace 
    
    connection_string = "<ConnectionString>" # Replace with your connection string
    os.environ["AZURE_QUANTUM_CONNECTION_STRING"] = connection_string 
    
    workspace = Workspace() 
    print(workspace.get_targets()) 
    ```

#### [VS Code](#tab/tabid-vscode1)

1. Open VS Code.
1. Select **View** > **Command Palette**.
1. Enter and select **QDK: Connect to an Azure Quantum workspace**.
1. Choose **Connection string**.
1. Enter the connection string that you copied from the Azure portal.

To view your Azure Quantum workspace, select the **Microsoft Quantum** icon on the Activity Bar.

:::image type="content" source="media/vscode-microsoft-quantum-panel-icon.png" alt-text="Screenshot of Microsoft Quantum panel icon.":::

***

For more information about how to work with keys, see [Authenticate in your workspace using an access key](xref:microsoft.quantum.how-to.manage-access-keys).

> [!IMPORTANT]
> If you disable access keys for your workspace, you can't connect with connection strings. Use workspace parameters instead.

## Connect to your workspace with workspace parameters

Every Azure Quantum workspace has a unique set of parameters that you use to connect to the workspace.

| Parameter         | Description                                           | Use when you connect with |
|-------------------|-------------------------------------------------------|---------------------------|
| `subscription_id` | The Azure subscription ID.                            | Azure CLI                 |
| `resource_group`  | The Azure resource group name.                        | Azure CLI                 |
| `name`            | The name of your Azure Quantum workspace.             | Azure CLI                 |
| `resource_id`     | The Azure resource ID of the Azure Quantum workspace. | Python                    |

To find your workspace parameters, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. Go to your Azure Quantum workspace.
1. From your workspace panel, select **Overview**.
1. Expand the **Essentials** dropdown.
1. Copy the parameters from their corresponding fields.

> [!NOTE]
> Ensure that you sign in to the correct tenant before you connect to your workspace. For more information about tenants, see [How to manage Azure subscriptions with the Azure CLI](/cli/azure/manage-azure-subscriptions-azure-cli#change-the-active-tenant).

### Use workspace parameters to connect to your Azure Quantum workspace

To stay signed in when you run your Python scripts, open a terminal and run the following Azure CLI command to set the subscription for your workspace. Replace *`<subscriptionId>`* with your subscription ID.

```azurecli
az account set --subscription <subscriptionId>
```

Use your workspace parameters to connect to your Azure Quantum workspace through the `qdk.azure` module or the Azure CLI.

#### [Python](#tab/tabid-python)

To connect to your Azure Quantum workspace, choose one of the following options.

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

- Specify only the workspace name. This option might fail if you have multiple workspaces with the same name in the same tenant.

    ```python
    from qdk.azure import Workspace 
    workspace = Workspace(name="") # Add the name of your workspace
    ```

#### [Azure CLI](#tab/tabid-azurecli)

Use the Azure CLI to connect to your workspace. For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

1. To sign in to your Azure account, run the `az login` command.

    ```azurecli
    az login
    ```

1. Set the subscription that you want to use. Replace `SubscriptionName` with your subscription name. You can also use the subscription ID instead of the subscription name.

    ```azurecli
    az account set --subscription <SubscriptionName>
    ```

1. Set the workspace that you want to use. Replace *`<ResourceGroupName>`* and *`<WorkspaceName>`* with your workspace's resource group name and workspace name.

    ```azurecli
    az quantum workspace set --resource-group <ResourceGroupName> --workspace-name <WorkspaceName>
    ```

***

## Related content

- [Manage quantum workspaces with Azure CLI](xref:microsoft.quantum.workspaces-cli)
- [Share access to your Azure Quantum workspace](xref:microsoft.quantum.how-to.share-access-workspace)
- [Manage quantum workspaces with the Azure Resource Manager](xref:microsoft.quantum.workspaces-arm)
- [Authenticate using a service principal](xref:microsoft.quantum.optimization.authenticate-service-principal)
- [Authenticate using a managed identity](xref:microsoft.quantum.optimization.authenticate-managed-identity)
