---
title: Manage quantum workspaces with the Azure Resource Manager
description: This guide shows you how to create and delete quantum workspaces using the Azure Resource Manager. 
author: bradben
ms.author: brbenefield
ms.service: azure-quantum
ms.topic: how-to
ms.date: 04/20/2022
ms.custom: template-how-to
uid: microsoft.quantum.workspaces-arm
---

# Manage quantum workspaces with the Azure Resource Manager

In this guide, learn to use an Azure Resource Manager template (ARM template) or a Bicep template to create Azure Quantum workspaces and the required resource groups and storage accounts. After template deployment, you can start running your quantum applications in Azure Quantum. Treating your infrastructure as code enables you to track changes to your infrastructure requirements and makes your deployments more consistent and repeatable.

An ARM template is a JavaScript Object Notation (JSON) file that defines the infrastructure and configuration for your project. The template uses declarative syntax. In declarative syntax, you describe your intended deployment without writing the sequence of programming commands to create the deployment. Bicep uses a declarative syntax that you treat like application code. If you're familiar with the JSON syntax for writing Azure Resource Manager templates (ARM templates), you'll find that Bicep provides a more concise syntax and improved type safety. In fact, Bicep files compile to standard ARM templates.

## Prerequisites

### Azure account

Before you begin, you must have an Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).

### Editor

To create ARM or Bicep templates, you need a good editor. We recommend Visual Studio Code with the Resource Manager Tools extension. If you need to install these tools, see [Quickstart: Create ARM templates with Visual Studio Code](/azure/azure-resource-manager/templates/quickstart-create-templates-use-visual-studio-code).

### Command-line deployment

You also need either Azure PowerShell or Azure CLI to deploy the template. If you use Azure CLI, you must have the latest version. For the installation instructions, see:

- [Install Azure PowerShell](/powershell/azure/install-az-ps)
- [Install Azure CLI on Windows](/cli/azure/install-azure-cli-windows)
- [Install Azure CLI on Linux](/cli/azure/install-azure-cli-linux)
- [Install Azure CLI on macOS](/cli/azure/install-azure-cli-macos)

## Sign in to Azure

After installing either Azure PowerShell or Azure CLI, make sure you sign in for the first time. Choose one of the following tabs and run the corresponding command line commands to sign in to Azure:

# [Azure CLI](#tab/azure-cli)

```azurecli
az login
```

If you have multiple Azure subscriptions, select the subscription you want to use. Replace `SubscriptionName` with your subscription name. You can also use the subscription ID instead of the subscription name.

```azurecli
az account set --subscription SubscriptionName
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Connect-AzAccount
```

If you have multiple Azure subscriptions, select the subscription you want to use. Replace `SubscriptionName` with your subscription name. You can also use the subscription ID instead of the subscription name.

```azurepowershell
Set-AzContext SubscriptionName
```

---

## Create an empty resource group

When you deploy a template, you specify a resource group that will contain the quantum workspace with its associated resources. Before running the deployment command, create the resource group with either Azure CLI or Azure PowerShell.

# [Azure CLI](#tab/azure-cli)

```azurecli
az group create --name myResourceGroup --location "East US"
```

# [PowerShell](#tab/azure-powershell)

```azurepowershell
New-AzResourceGroup -Name myResourceGroup -Location "East US"
```

---

## Review the template



# [Azure Bicep](#tab/bicep-template)

```bicep
@description('Application name used as prefix for the Azure Quantum workspace and its associated Storage account.')
param appName string

@description('Location of the Azure Quantum workspace and its associated Storage account.')
@allowed([
  'eastus'
  'japaneast'
  'japanwest'
  'northeurope'
  'uksouth'
  'ukwest'
  'westcentralus'
  'westeurope'
  'westus'
  'westus2'
])
param location string

var quantumWorkspaceName = '${appName}-ws'
var storageAccountName = '${appName}${substring(uniqueString(resourceGroup().id), 0, 5)}'


resource storageAccount 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}

resource quantumWorkspace 'Microsoft.Quantum/Workspaces@2019-11-04-preview' = {
  name: quantumWorkspaceName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    providers: [
      {
        providerId: 'Microsoft'
        providerSku: 'DZH3178M639F'
        applicationName: '${quantumWorkspaceName}-Microsoft'
      }
    ]
    storageAccount: storageAccount.id
  }
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  scope: storageAccount
  name: guid(quantumWorkspace.id, '/subscriptions/${subscription().subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c', storageAccount.id)
  properties: {
    roleDefinitionId: '/subscriptions/${subscription().subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c'
    principalId: reference(quantumWorkspace.id, '2019-11-04-preview', 'full').identity.principalId
  }
}

output subscription_id string = subscription().subscriptionId
output resource_group string = resourceGroup().name
output name string = quantumWorkspace.name
output location string = quantumWorkspace.location
output tenant_id string = subscription().tenantId

```

# [ARM Template](#tab/arm-template)

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "metadata": {
    "_generator": {
      "name": "bicep",
      "version": "0.4.1124.51302",
      "templateHash": "7692970140494302547"
    }
  },
  "parameters": {
    "appName": {
      "type": "string",
      "metadata": {
        "description": "Application name used as prefix for the Azure Quantum workspace and its associated Storage account."
      }
    },
    "location": {
      "type": "string",
      "allowedValues": [
        "eastus",
        "japaneast",
        "japanwest",
        "northeurope",
        "uksouth",
        "ukwest",
        "westcentralus",
        "westeurope",
        "westus",
        "westus2"
      ],
      "metadata": {
        "description": "Location of the Azure Quantum workspace and its associated Storage account."
      }
    }
  },
  "variables": {
    "quantumWorkspaceName": "[format('{0}-ws', parameters('appName'))]",
    "storageAccountName": "[format('{0}{1}', parameters('appName'), substring(uniqueString(resourceGroup().id), 0, 5))]"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2021-06-01",
      "name": "[variables('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "Standard_LRS"
      },
      "kind": "StorageV2"
    },
    {
      "type": "Microsoft.Quantum/workspaces",
      "apiVersion": "2019-11-04-preview",
      "name": "[variables('quantumWorkspaceName')]",
      "location": "[parameters('location')]",
      "identity": {
        "type": "SystemAssigned"
      },
      "properties": {
        "providers": [
          {
            "providerId": "Microsoft",
            "providerSku": "DZH3178M639F",
            "applicationName": "[format('{0}-Microsoft', variables('quantumWorkspaceName'))]"
          }
        ],
        "storageAccount": "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]"
      },
      "dependsOn": [
          "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]"
      ]
    },
    {
      "type": "Microsoft.Authorization/roleAssignments",
      "apiVersion": "2020-04-01-preview",
      "scope": "[format('Microsoft.Storage/storageAccounts/{0}', variables('storageAccountName'))]",
      "name": "[guid(resourceId('Microsoft.Quantum/workspaces', variables('quantumWorkspaceName')), format('/subscriptions/{0}/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c', subscription().subscriptionId), resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName')))]",
      "properties": {
        "roleDefinitionId": "[format('/subscriptions/{0}/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c', subscription().subscriptionId)]",
        "principalId": "[reference(resourceId('Microsoft.Quantum/workspaces', variables('quantumWorkspaceName')), '2019-11-04-preview', 'full').identity.principalId]"
      },
      "dependsOn": [
        "[resourceId('Microsoft.Quantum/workspaces', variables('quantumWorkspaceName'))]",
        "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]"
      ]
    }
  ],
  "outputs": {
    "subscription_id": {
      "type": "string",
      "value": "[subscription().subscriptionId]"
    },
    "resource_group": {
      "type": "string",
      "value": "[resourceGroup().name]"
    },
    "name": {
      "type": "string",
      "value": "[variables('quantumWorkspaceName')]"
    },
    "location": {
      "type": "string",
      "value": "[reference(resourceId('Microsoft.Quantum/workspaces', variables('quantumWorkspaceName')), '2019-11-04-preview', 'full').location]"
    },
    "tenant_id": {
      "type": "string",
      "value": "[subscription().tenantId]"
    }
  }
}
```

---

The following Azure resources are created by both templates:

+ [**Azure Storage Account**](/azure/storage/blobs/): storage account for storing input and output data for quantum jobs.
+ [**Azure Quantum workspace**](/azure/quantum/how-to-create-workspace): a collection of assets associated with running quantum or optimization applications.

The templates also grant the quantum workspace **Contributor**-permissions to the storage account. This step is needed so that the workspace can read and write job data.

Both templates generate following output. You can use these values later to identify the generated quantum workspace and authenticate to it:

- **Subscription ID** hosting all the deployed resources.
- **Resource Group** containing all deployed resources.
- **Name** of the quantum workspace.
- **Location** of the datacenter that hosts the workspace.
- **Tenant ID** holding credentials used at the deployment.

## Deploy the template

To deploy the template, use either Azure CLI or Azure PowerShell. Use the resource group you created. Give a name to the deployment so you can easily identify it in the deployment history. Replace `{provide-the-path-to-the-template-file}` and the curly braces `{}` with the path to your template file. Furthermore, replace `{provide-app-name}` and `{provide-location}` with values for the overall application name and the location where the workspace should reside. The app name should only contain letters.

# [Azure CLI](#tab/azure-cli)

To run this deployment command, you must have the [latest version](/cli/azure/install-azure-cli) of Azure CLI.

```azurecli
templateFile="{provide-the-path-to-the-template-file}"
az deployment group create \
  --name myDeployment \
  --resource-group myResourceGroup \
  --template-file $templateFile \
  --parameters appName="{provide-app-name}" location="{provide-location}"
```

# [PowerShell](#tab/azure-powershell)

```azurepowershell
$templateFile = "{provide-the-path-to-the-template-file}"
New-AzResourceGroupDeployment `
  -Name myDeployment `
  -ResourceGroupName myResourceGroup `
  -TemplateFile $templateFile `
  -appName="{provide-app-name}" `
  -location="{provide-location}"
```

---

The deployment command returns results. Look for `ProvisioningState` to see whether the deployment succeeded.

> [!IMPORTANT]
> In some cases you might get a deployment error (Code: PrincipalNotFound). Reason for this is that the workspace principal was not created yet when the resource manager tried to configure the role assignment. If this is the case, just repeat the deployment. It should succeed in the second run.

## Validate the deployment

You can verify the deployment by exploring the resource group from the Azure portal.

1. Sign in to the [Azure portal](https://portal.azure.com).

1. From the left menu, select **Resource groups**.

1. Select the resource group deploy in the last procedure. The default name is **myResourceGroup**. You should see two resources deployed within the resource group - the storage account and the quantum workspace.

1. Verify that the quantum workspace has necessary access rights for the storage account. Select the storage account. In the left menu pane, select **Access Control (IAM)** and verify that under **Role assignments** the quantum workspace resource is listed under **Contributor**.

## Clean up resources

If you no longer need the quantum workspace, you might want to delete the resource group.

# [Azure CLI](#tab/azure-cli)

```azurecli
az group delete --name myResourceGroup
```

# [PowerShell](#tab/azure-powershell)

```azurepowershell
Remove-AzResourceGroup -Name myResourceGroup
```

---

## Next steps

Now that you can create and delete workspaces, learn about the different [targets to run quantum algorithms in Azure Quantum](xref:microsoft.quantum.reference.qio-target-list).
You now also have the tools to do workspace deployments from within [Azure Pipelines](/azure/azure-resource-manager/templates/add-template-to-azure-pipelines) or [GitHub Actions](/azure/azure-resource-manager/templates/deploy-github-actions).
