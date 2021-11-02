---
author: dphansen
description: Learn how to run a Q# or Python sample Jupyter notebook in an Azure Quantum workspace.
ms.author: davidph
ms.date: 11/02/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Get started with Jupyter notebooks in a workspace
uid: microsoft.quantum.get-started.notebooks
---

# Get started with Jupyter notebooks in an Azure Quantum workspace

Learn how to run Q# or Python code in a Jupyter notebook in an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace). A Jupyter notebook is a document that contains both rich text and code and can run in your browser.

For more information about Jupyter notebooks, see [Run Jupyter notebooks in an Azure Quantum workspace](xref:microsoft.quantum.how-to.notebooks)

## Prerequisites

Before you begin, you need the following prerequisites to use Jupyter notebooks in an Azure Quantum workspace.

- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/) before you begin.
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Get a sample notebook

To get started, you can use use a sample from the notebook gallery.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Jupyter Notebooks**.
1. Select **Notebook Gallery**.
1. Select the sample you want to use, and select **Copy to My Notebooks**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/notebook-gallery.png" alt-text="Notebook gallery in Azure Quantum.":::

The sample notebook can be found under **My Notebooks** and you can now run the notebook.

## Run notebook

To run Q# or Python in a Jupyter notebook, follow these steps.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Jupyter Notebooks**.
1. Select your notebook in **My Notebooks**.
1. Select the cell you want to run and select the **run icon** to execute the code in the cell, or select **Run all** to run all cells in the notebook.

    :::image type="content" source="media/how-to-run-notebooks-workspace/run-notebook.png" alt-text="Run a Jupyter notebook.":::

## Next steps

- [Quickstart: Create a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quickstart: Solve an optimization problem in Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio)
- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)