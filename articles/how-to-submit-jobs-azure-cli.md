---
author: azure-quantum-content
description: Learn how to submit QIR programs to Azure Quantum with Azure CLI.
ms.author: quantumdocwriters
ms.date: 08/25/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
ai-usage: ai-assisted
no-loc: ["Microsoft Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Azure Quantum", "Q#", "OpenQASM", "QIR", target, targets]
title: Submit jobs to Azure Quantum with Azure CLI
uid: microsoft.quantum.how-to.submit-jobs-azure-cli
# Customer intent: As a quantum developer, I want to know how to use Azure CLI to submit QIR as a job to Azure Quantum.
---

# Submit jobs to Azure Quantum with Azure CLI

Use Azure CLI when you already have an input file that's compiled to QIR and you want to submit the job from a terminal, shell script, or CI/CD workflow. Azure CLI manages the Azure Quantum workspace, target, job metadata, and input file, but doesn't compile programs into QIR for you.

The exact method to submit a job with Azure CLI depends on the Azure Quantum target. The following steps are a general example of how to submit a QIR job with Azure CLI.

### Install Azure CLI support

1. Install [Azure CLI](/cli/azure/install-azure-cli).
1. Install or update the Azure Quantum extension.

    ```azurecli
    az extension add --upgrade --name quantum
    ```

### Connect to your workspace

1. Sign in to Azure.

    ```azurecli
    az login
    ```

1. Set the subscription that contains your Azure Quantum workspace.

    ```azurecli
    az account set --subscription <subscription-id>
    ```

1. Set the default workspace for subsequent commands.

    ```azurecli
    az quantum workspace set \
        --resource-group <resource-group-name> \
        --workspace-name <workspace-name>
    ```

1. List the targets that are available in the workspace.

    ```azurecli
    az quantum target list --output table
    ```

### Submit a compiled input file

For a QIR job, specify the target, job name, QIR input format, input file, and QIR entry point.

```azurecli
az quantum job submit \
    --target-id <target-id> \
    --job-name <job-name> \
    --job-input-format qir.v1 \
    --job-input-file <path-to-qir-file> \
    --entry-point ENTRYPOINT__main
```

The command returns the job ID. Save the ID so that you can monitor the job and retrieve its output.

> [!NOTE]
> This example shows common QIR parameters. A provider-native job can require different input and output formats or additional parameters. See the documentation for the selected target and the [`az quantum job` command reference](/cli/azure/quantum/job).

### Monitor the job and get the output

To check the job status, run the following command.

```azurecli
az quantum job show --job-id <job-id> --output table
```

To get the output from a successful job, run the following command:

```azurecli
az quantum job output --job-id <job-id> --output table
```

For workspace setup and other Azure Quantum commands, see [Manage quantum workspaces with Azure CLI](xref:microsoft.quantum.workspaces-cli).

## Related content

- [How to submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs)
- [Submit jobs with the QDK extension for VS Code](xref:microsoft.quantum.how-to.submit-jobs-vscode)
- [Submit jobs with the QDK Python package](xref:microsoft.quantum.how-to.submit-jobs-python)
- [Work with Azure Quantum jobs](xref:microsoft.quantum.work-with-jobs)
