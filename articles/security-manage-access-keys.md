---
author: SoniaLopezBravo
description: Learn how to manage, regenerate, enable, and disable the access keys and connection strings for your Azure Quantum workspace.
ms.author: sonialopez
ms.date: 03/04/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Authenticate with Access Keys
uid: microsoft.quantum.how-to.manage-access-keys
---

# Using an access key to authenticate

Access keys are used to authenticate and authorize access to your Azure Quantum workspace. You can use access keys to connect and grant access to your workspace using connection strings.

In this article, you learn how to enable or disable the access keys for your Azure Quantum workspace. You can also regenerate new keys to ensure the security of your workspace.

> [!WARNING]
> Storing your account access keys or connection string in clear text presents a security risk and is not recommended. Store your account keys in an encrypted format, or migrate your applications to use Microsoft Entra authorization for access to your Azure Quantum workspace.

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of the Azure Quantum `azure-quantum` package.

    ```bash
    python -m pip install --upgrade azure-quantum
    ```

- If you use Azure CLI, you must have the latest version. For the installation instructions, see:

    - [Install Azure CLI on Windows](/cli/azure/install-azure-cli-windows)
    - [Install Azure CLI on Linux](/cli/azure/install-azure-cli-linux)
    - [Install Azure CLI on macOS](/cli/azure/install-azure-cli-macos)

### Connect with a connection string

The `azure-quantum` package provides a [`Workspace` class](xref:azure.quantum.Workspace) that represents an Azure Quantum workspace. To connect to your Azure Quantum workspace, you create `Workspace` object using the connection string as authenticator. For more information, see [how to copy a connection string](xref:microsoft.quantum.how-to.connect-workspace#copy-the-connection-string).

When creating a `Workspace` object, you have two options for identifying your Azure Quantum workspace.

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

## Manage your keys and connection strings

### [Azure portal](#tab/tabid-portal)

You can manage access keys and connection strings for your Azure Quantum workspace in the Azure portal.

#### Enable and disable access keys

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. On the left panel, navigate to **Operations > Access keys**.
1. Switch the toggle under Access Keys to **Enabled** or **Disabled**.
1. Click on **Save** to save the changes.

    :::image type="content" source="media/connection-string-enable.png" alt-text="Screenshot of Azure portal showing how to enable Access Keys to use connection strings.":::

> [!IMPORTANT]
> When Access Keys are **disabled**, all request using connection strings or access keys are unauthorized. You can still use the workspace parameters to connect to your workspace.

#### Regenerate new access keys

If you suspect that your Access Keys have been compromised, or you want to stop sharing your workspace access with others, you can regenerate either the primary or secondary access keys, or both, to ensure the security of your workspace.

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. On the left panel, navigate to **Operations > Access keys**.
1. **Access Keys** have to be enabled to regenerate new keys. If Access Keys are disabled, you need to enable them first.
1. Click on the **circular arrow icon** to regenerate the primary or secondary key.

    :::image type="content" source="media/connection-string-regenerate.png" alt-text="Screenshot of Azure portal showing how to regenerate primary and secondary Access Keys.":::

    > [!TIP]
    > Every Azure Quantum workspace has **primary and secondary** keys, and their corresponding connection strings. If you want to allow access to your workspace to others, you can share your secondary key and you use your primary for your own services. This way, you can replace the secondary key as needed without having downtime in your own services. For more information about sharing your workspace access, see [Share your workspace access](xref:microsoft.quantum.how-to.share-access-workspace).

### [Azure CLI](#tab/tabid-azurecli)

You can use the Azure Command-Line Interface (Azure CLI) to manage access keys. For more information, see [Manage quantum workspaces with the Azure CLI](xref:microsoft.quantum.workspaces-cli).

1. Show the **access keys** for the workspace.

    ```azurecli
    az quantum workspace keys list 
    ```

1. If you suspect that your access keys have been compromised, or you want to stop sharing your workspace access with others, you can **regenerate** either the primary or secondary access keys, or both, to ensure the security of your workspace.

    ```azurecli
    az quantum workspace keys regenerate --key-type Primary 
    az quantum workspace keys regenerate --key-type Secondary 
    az quantum workspace keys regenerate --key-type Primary,Secondary 
    ```

    > [!TIP]
    > Every Azure Quantum workspace has **primary and secondary** keys, and their corresponding connection strings. If you want to allow access to your workspace to others, you can share your secondary key and you use your primary for your own services. This way, you can replace the secondary key as needed without having downtime in your own services. For more information about sharing your workspace access, see [Share your workspace access](xref:microsoft.quantum.how-to.share-access-workspace).

1. You can **enable and disable** the access keys for the workspace.

    ```azurecli
    az quantum workspace update --enable-api-key true 
    az quantum workspace update --enable-api-key false 
    ```

    > [!IMPORTANT]
    > When Access Keys is disabled, all request using connection strings or access keys are unauthorized. You can still use the workspace parameters to connect to your workspace.
  
***


