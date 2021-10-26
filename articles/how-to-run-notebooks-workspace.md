---
author: dphansen
description: Learn how to run Q# or Python in a Jupyter notebook in an Azure Quantum workspace.
ms.author: davidph
ms.date: 10/26/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Run Jupyter notebooks in a workspace
uid: microsoft.quantum.how-to.notebooks
---

# Run Jupyter notebooks in an Azure Quantum workspace

Learn how to run Q# or Python in a Jupyter notebook in an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Prerequisites

You need the following prerequisites to use Jupyter notebooks in an Azure Quantum workspace.

- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/) before you begin.
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

> [!NOTE]
> When notebooks are used in a workspace, [Cross-Origin Resource Sharing (CORS)](/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) in enabled on your linked [Azure Storage](/azure/storage/) account.
> 
> If you do not want to enable CORS for your Azure Storage account, please do not visit the **Jupyter Notebooks** blade in the portal. If you have visited the blade previously and now no longer want to enable CORS, you can directly edit your storage account to remove any existing CORS rules.

## Create a new notebook

Follow these steps to create a new Jupyter notebook using Q# or Python.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Jupyter Notebooks**.
1. Select **My Notebooks** and select **Add new**

    :::image type="content" source="media/how-to-run-notebooks-workspace/create-new-notebook.png" alt-text="Create a new Jupyter notebook.":::

1. Select either **Q#** or **Python 3** as the **Kernel Type**, type a **File Name** and select **Create file**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/create-new-notebook-kernel-name.png" alt-text="Select notebook kernel and file name for a new Jypter notebook.":::

The first cell of the notebook is populated automatically with the connection string to the Azure Quantum workspace.

For Q#, the first cell will look like this.

:::image type="content" source="media/how-to-run-notebooks-workspace/new-qsharp-notebook-snippet.png" alt-text="New Q# notebook in Azure Quantum.":::

For Python, the first cell will look like this.

:::image type="content" source="media/how-to-run-notebooks-workspace/new-python-notebook-snippet.png" alt-text="New Python notebook in Azure Quantum.":::

Select **+ Code** or **+ Markdown** to add a code or markdown text cell.

## Run notebook

To run Q# or Python in a Jupyter notebook, follow these steps.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Jupyter Notebooks**.
1. Select your notebook in **My Notebooks**.
1. Select the cell you want to run and select the run icon to execute the code.

    :::image type="content" source="media/how-to-run-notebooks-workspace/run-notebook.png" alt-text="Run a Jupyter notebook.":::

You can also select **Run all** to run all cells in the notebook.

## Upload notebooks

You can upload one or more existing Jupyter notebooks to an Azure Quantum workspace.

> [!CAUTION]
> You should only upload and run Jupyter notebooks from trusted sources and only install packages from trusted sources. While notebooks in Azure Quantum protects you by sandboxing outputs, Jupyter Notebooks is built for arbitrary code execution, so there are inherent risks to uploading or running notebooks from an untrusted source.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Jupyter Notebooks**.
1. Select **Upload notebooks**.
1. Select **Choose Files** and select the notebook files you want to upload.
1. If you want to overwrite already existing files, select **Overwrite if already exists**.
1. Select **Upload files**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/upload-notebook.png" alt-text="Upload notebook in Azure Quantum.":::

After the notebooks have been uploaded, you can find them under **My Notebooks**.

## Manage notebooks

You can rename, delete, duplicate, and download existing notebooks.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Jupyter Notebooks**.
1. Select your notebook in **My Notebooks** and select the context pane (**...**).
1. Select **Rename Notebook**, **Delete Notebook**, **Duplicate Notebook**, or **Download Notebook**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/notebook-context-pane.png" alt-text="Notebook context pane in Azure Quantum.":::

## Notebook gallery

To use a notebook sample from the gallery, follow these steps.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Jupyter Notebooks**.
1. Select **Notebook Gallery**.
1. Select the sample you want to use, and select **Copy to My Notebooks**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/notebook-gallery.png" alt-text="Notebook gallery in Azure Quantum.":::

The sample notebook is under **My Notebooks** and you can run or edit the notebook.

## Isolation

Jupyter notebooks in an Azure Quantum workspace are isolated from other users' notebooks.

- Your Jupyter Notebook instance is hosted by Azure Quantum with hypervisor-level isolation from other user's instances.
- Notebooks are stored in your linked storage account in your subscription.
- A Jupyter Notebook instance is scoped to you and a specific workspace. If you visit another workspace, you will get a different instance. If another user visits the same workspace, they will get a different Jupyter Notebook instance from you.
- Notebooks are scoped to a workspace, so if visiting another workspace, the same notebooks will not appear under My Notebooks.
- Notebooks are also currently scoped to you, meaning if another user visits the same workspace, they will not see your notebooks.

## Limitations

The following are limitations with Jupyter notebooks in an Azure Quantum workspace.

- As it is free, the Jupyter Notebook instance will live up to a max of 12 hours (after that time, your instance will be deleted/recreated, and you will need to reinstall any custom packages).
  - Azure Quantum may need to delete your Jupyter Notebook instance to apply security patches or roll out emergency changes. When possible, it will not interrupt your workflow.
- Notebook instances have pre-allocated 2 vCPU and 4 GB of memory.
- Idle kernels are terminated after 30 minutes. After that time, you will need to rerun the cells.
- The location of your storage account and workspace will affect the performance of Jupyter notebooks in an Azure Quantum workspace. When possible, try to create the storage account and workspace in a region close to where you will be using your notebooks.

## Next steps

- [Quickstart: Create a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quickstart: Solve an optimization problem in Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio)
- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)