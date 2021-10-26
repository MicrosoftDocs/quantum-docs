---
author: dphansen
description: Learn how to run Q# or Python in a Jupyter notebook directly in a workspace in Azure Quantum.
ms.author: davidph
ms.date: 10/26/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Run Azure Quantum notebooks in a workspace
uid: microsoft.quantum.how-to.notebooks
---

# Run Azure Quantum notebooks in a workspace

Learn how to run Q# or Python in a Jupyter notebook directly in a workspace in Azure Quantum.

## Prerequisites

You need the following prerequisites to use Azure Quantum notebooks.

- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/) before you begin.
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](how-to-create-workspace.md).
- When Azure Quantum notebooks are used, [Cross-Origin Resource Sharing (CORS)](/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) in enabled on your linked [Azure Storage](/azure/storage/) account. 
    - If you do not want to enable CORS for your Azure Storage account, please do not visit the **Jupyter Notebooks** blade in the portal. If you have visited the blade previously and now no longer want to enable CORS, you can directly edit your storage account to remove any existing CORS rules.

## Create a new notebook

Follow these steps to create a new Q# or Python notebook in Azure Quantum.

1. Click on your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Click on **Jupyter Notebooks**.
1. Click on **My Notebooks** and click **Add new**

    :::image type="content" source="media/how-to-run-notebooks-workspace/create-new-notebook.png" alt-text="Create a new Azure Quantum notebook.":::

1. Select either **Q#** or **Python 3** as the **Kernel Type**, type a **File Name** and click **Create file**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/create-new-notebook-kernel-name.png" alt-text="Select notebook kernel and file name for a new Azure Quantum notebook.":::

The first cell of the notebook is populated automatically with the connection string to the Azure Quantum workspace.

For Q#, the first cell will look like this.

:::image type="content" source="media/how-to-run-notebooks-workspace/new-qsharp-notebook-snippet.png" alt-text="New Q# notebook in Azure Quantum.":::

For Python, the first cell will look like this.

:::image type="content" source="media/how-to-run-notebooks-workspace/new-python-notebook-snippet.png" alt-text="New Python notebook in Azure Quantum.":::

Click **+ Code** or **+ Markdown** to add a code or markdown text cell.

## Upload notebooks

You can upload one or more existing Jupyter notebook to Azure Quantum notebooks.

> [!CAUTION]
> Only upload and run notebooks from trusted sources and only install packages from trusted sources. While Azure Quantum notebooks sandbox outputs and protect you, Jupyter Notebooks is built for arbitrary code execution, so there are inherent risks to uploading or running notebooks from an untrusted source.

1. Click on your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Click **Jupyter Notebooks**.
1. Click **Upload notebooks**.
1. Click **Choose Files** and select the notebook files you want to upload.
1. If you would like to overwrite already existing files, select **Overwrite if already exists**.
1. Click **Upload files**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/upload-notebook.png" alt-text="Upload notebook in Azure Quantum.":::


After the notebooks have been uploaded, you can find them under **My Notebooks**.

## Manage notebooks

You can rename, delete, duplicate, and download en existing notebook in Azure Quantum.

1. Click on your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Click on **Jupyter Notebooks**.
1. Click on your notebook in **My Notebooks** and click on the context pane (**...**).
1. Select **Rename Notebook**, **Delete Notebook**, **Duplicate Notebook**, or **Download Notebook**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/notebook-context-pane.png" alt-text="Notebook context pane in Azure Quantum.":::

## Notebook gallery

To use a notebook sample from the galley, follow these steps.

1. Click on your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Click **Jupyter Notebooks**.
1. Click **Notebook Gallery**.
1. Select the sample you would like to use, and click **Copy to My Notebooks**.

IMG

You will now see the sample notebook under **My Notebooks** and you can run or edit the notebook.

IMG

## Isolation

Azure Quantum notebooks are isolated from other users' notebooks.

- Your compute is hosted by Azure Quantum with hypervisor-level isolation from other user's compute.
- Your notebooks are stored in your linked storage account in your subscription.
- Your compute is scoped to you and a specific workspace. If you visit another workspace, you will get a different compute instance. If another user visits the same workspace, they will get a different compute instance from you.
- Your files are scoped to a workspace, so if visiting another workspace, the same files will not appear under My Files.
- Your files are also currently scoped to you, meaning if another user visits the same workspace, they will not see your files.

## Limitations

The following are limitations with Azure Quantum Notebooks.

- Since it is free compute, your compute instance will live up to a max of 12 hours (after that time, your compute will be deleted/recreated, and you will need to re-install any custom packages).
    - Azure Quantum may need to delete your compute to apply security patches or rollout emergency changes. When possible, it will not interrupt your workflow.
- Notebooks compute has pre-allocated 2 vCPU and 4 GB of memory. This may change this in the future.
- Idle kernels are terminated after 30 minutes (after that time, you will need to re-run cells).
- The location of your storage account and workspace will impact the performance of notebooks. When possible, try to create the storage account and workspace in a region close to where you will be using notebooks.

## Next steps

- [Quickstart: Create a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quickstart: Solve an optimization problem in Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio)
- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)