---
author: bradben
description: Learn how to work with Q# or Python in a Jupyter notebook in an Azure Quantum workspace.
ms.author: brbenefield
ms.date: 10/05/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Work with Jupyter notebooks in a workspace
uid: microsoft.quantum.how-to.notebooks
---

# Work with Jupyter Notebooks in an Azure Quantum workspace

Learn how to run Q# or Python code in a Jupyter Notebook in an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). A Jupyter Notebook is a document that contains both rich text and code and can run in your browser.

## Prerequisites

You need the following prerequisites to use Jupyter Notebooks in an Azure Quantum workspace.

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/offers/ms-azr-0003p/).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Get a sample notebook

To get started, you can use use a sample notebook from the sample gallery.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Notebooks**.
1. Select **Sample gallery**.
1. Select the sample you want to use, and select **Copy to my notebooks**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/notebook-gallery.gif" alt-text="GIF showing how to select a sample Jupyter notebook in the sample notebookgallery in Azure portal.":::

The sample notebook can be found under **My notebooks** and you can now run the notebook.

## Run a notebook

To run Q# or Python code in a Jupyter Notebook, follow these steps.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Notebooks**.
1. Select your notebook in **My notebooks**.
1. Select the cell you want to run and select the **run icon** to run the code in the cell, or select **Run all** to run all cells in the notebook.

    :::image type="content" source="media/how-to-run-notebooks-workspace/run-notebook.png" alt-text="Screenshot of a Jupyter notebook showing how to run it.":::

## Create a new notebook

Follow these steps to create a new Jupyter Notebook using Q# or Python.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Notebooks**.
1. Select **My notebooks** and select **Add new**

    :::image type="content" source="media/how-to-run-notebooks-workspace/create-new-notebook.png" alt-text="Screenshot showing how to create a new Jupyter notebook in Azure portal.":::

1. Select either **IQ#** or **IPython** as the **Kernel Type**, type a **File Name** and select **Create file**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/create-new-notebook-kernel-name.png" alt-text="Screenshot of the kernel type and file name for a new Jypter notebook.":::

The first cell of the notebook is populated automatically with the connection string to the Azure Quantum workspace.

For Q#, the first cell will look like this:

:::image type="content" source="media/how-to-run-notebooks-workspace/new-qsharp-notebook-snippet.png" alt-text="Screenshot of the fisrt cell in a new Q# notebook in Azure Quantum.":::

For Python, the first cell will look like this:

:::image type="content" source="media/how-to-run-notebooks-workspace/new-python-notebook-snippet.png" alt-text="Screenshot of the fisrt cell in a new Python notebook in Azure Quantum.":::

Select **+ Code** or **+ Markdown** to add a code or markdown text cell.

> [!TIP]
> A notebook auto-saves every 30 seconds. You can also manually save by pressing **CTRL + S**.

## Upload notebooks

You can upload one or more existing Jupyter Notebooks to an Azure Quantum workspace.

> [!CAUTION]
> You should only upload and run Jupyter Notebooks from trusted sources, and only install packages from trusted sources. While notebooks in Azure Quantum protects you by sandboxing outputs, Jupyter Notebooks is built for arbitrary code execution, so there are inherent risks to uploading or running notebooks from an untrusted source.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Notebooks**.
1. Select **My notebooks**.
1. Select **Upload new**.
1. Drag and drop your notebook files, or select **Browse for Files** and select the notebook files you want to upload.
1. If you want to overwrite already existing files, select **Overwrite if already exists**.
1. Select **Upload files**.

    :::image type="content" source="media/upload-notebook.png" alt-text="Screenshot showing how to upload a notebook to Azure Quantum.":::

After the notebooks have been uploaded, you can find them under **My notebooks**.

> [!NOTE]
> If you are uploading a notebook that was saved from another Azure Quantum workspace, you may need to update the connection information, such as Subscription, Resource group, workspace name, Location, or Resource ID, before running the notebook. 

## Manage notebooks

You can rename, delete, duplicate, and download existing notebooks.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Notebooks**.
1. Select your notebook in **My notebooks** and select the context pane (**...**).
1. Select **Rename Notebook**, **Delete Notebook**, **Duplicate Notebook**, or **Download Notebook**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/notebook-context-pane.png" alt-text="Screenshot of the notebook context pane in Azure Quantum.":::

## Isolation

Jupyter notebooks in an Azure Quantum workspace are isolated from other users' notebooks.

- Your Jupyter Notebook instance is hosted by Azure Quantum with hypervisor-level isolation from other users' instances.
- Notebooks are stored in your linked storage account in your subscription.
- A Jupyter Notebook instance is scoped to a combination of you and a specific workspace. If you visit another workspace, you will get a different Jupyter Notebook instance. If another user visits the same workspace, they will get a different Jupyter Notebook instance than you.
- Notebooks are scoped to you and a specific workspace. If you visit another workspace, the same notebooks will not appear under **My notebooks**. If another user visits that workspace, they will not see your notebooks.

## Storage of notebooks

Jupyter Notebooks are stored in an [Azure Storage](/azure/storage/) account linked to your Azure Quantum workspace.

> [!NOTE]
> When an Azure Quantum workspace is created, [Cross-Origin Resource Sharing (CORS)](/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) in enabled on the linked Azure Storage account. This is required for using Jupyter Notebooks in the portal. If you do not plan to use Jupyter Notebooks in the portal and you do not want to enable CORS for your Azure Storage account, you can directly edit your storage account to remove the CORS rule. In the storage account properties, under **Settings**, select **Resource Sharing (CORS)** and remove the rule under **File Service**.  Be aware that if you open the **Notebooks** blade again in your workspace, the rule will be recreated automatically. 

## Limitations

The following are limitations with Jupyter Notebooks in an Azure Quantum workspace.

- As it is free, the Jupyter Notebook instance will live up to a maximum of 12 hours (after that time, your instance will be deleted or recreated, and you will need to reinstall any custom packages).
  - Azure Quantum may need to delete your Jupyter Notebook instance to apply security patches or roll out emergency changes. When possible, it will not interrupt your workflow.
- Notebook instances have pre-allocated 2 vCPU and 4 GB of memory.
- Idle kernels are terminated after 30 minutes. After that time, you will need to rerun the cells.
- The location of your storage account and workspace will affect the performance of Jupyter Notebooks in an Azure Quantum workspace. When possible, try to create the storage account and workspace in a region close to where you will be using your notebooks.

## Next steps

- [Get started with Q# and an Azure Quantum notebook](xref:microsoft.quantum.get-started.notebooks)
- [Quickstart: Solve an optimization problem using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.optimization.qio.portal)
- [Quickstart: Submit a circuit with Qiskit using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.computing.qiskit.portal)
