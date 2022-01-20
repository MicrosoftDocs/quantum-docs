---
author: dphansen
description: Learn how to run a Q# or Python sample Jupyter notebook in an Azure Quantum workspace.
ms.author: davidph
ms.date: 01/18/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Get started with a Jupyter and Q# notebook
uid: microsoft.quantum.get-started.notebooks
---

# Get started with a Jupyter notebook and Q# in Azure Quantum

[!INCLUDE [Azure Quantum credits banner](~/includes/azure-quantum-credits.md)]

Learn how to run Q# code in a Jupyter notebook with [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview). A [Jupyter](https://jupyter.org/) notebook is a document that contains both rich text and code and can run in your browser, and can run Q# and Python code with Azure Quantum.

In this article, you will run a sample notebook that executes a Q# program on Azure Quantum.

For more information about Jupyter notebooks, see [Run Jupyter notebooks in an Azure Quantum workspace](xref:microsoft.quantum.how-to.notebooks).

## Prerequisites

Before you begin, you need the following prerequisites to use Jupyter notebooks in an Azure Quantum workspace.

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Get sample notebook

To get started, copy the sample notebook from the notebook gallery.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Notebooks**.
1. Select **Notebook Gallery**.
1. Select the **Parallel QRNG** notebook , and select **Copy to My Notebooks**.

    :::image type="content" source="media/how-to-run-notebooks-workspace/notebook-gallery.gif" alt-text="Notebook gallery in Azure Quantum.":::

The sample notebook can be found under **My Notebooks** and you can now run the notebook.

## Run notebook

To run the Jupyter notebook, follow these steps.

1. Select your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Select **Notebooks**.
1. Select the **parallel-qrng** notebook in **My Notebooks**.
1. Select the cell you want to run and select the **run icon** to execute the code in the cell, or select **Run all** to run all cells in the notebook.

    :::image type="content" source="media/how-to-run-notebooks-workspace/run-notebook.png" alt-text="Run a Jupyter notebook.":::

    The notebook first imports the required packages for the sample, then connects to the Azure Quantum service, and then runs a Q# program.

> [!NOTE]
> If you have any questions regarding the workspace creation process or run into any issue at any point using Azure Quantum, bookmark [Azure Quantum office hours](https://aka.ms/AQ/OfficeHours) and join our open office hours every Thursday 8∶30 AM Pacific Standard Time zone (PST).

## Next steps

- [Quickstart: Create a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quickstart: Solve an optimization problem in Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio)
- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)
