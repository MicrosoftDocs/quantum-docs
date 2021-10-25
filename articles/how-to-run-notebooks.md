---
author: dphansen
description: This article shows you how to install the Quantum Developer Kit (QDK) and develop your own Q# notebooks.
ms.author: davidph
ms.date: 10/22/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Develop with Q# Jupyter notebooks
uid: microsoft.quantum.install-qdk.overview.jupyter
---

# Run Azure Quantum notebooks in a workspace

Learn how to run Q# or Python in a Jupyter notebook directly in a workspace in Azure Azure.

## Prerequisites

- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/) before you begin.
- A Machine Learning workspace. See [Create an Azure Quantum workspace](how-to-create-workspace.md).

## Create a new notebook

Follow these steps to create a new Q# or Python notebook in Azure Quantum.

1. Click on your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Click on **Jupyter Notebooks**.
1. Click on **My Notebooks** and click **Add new**
1. Select either **Q#** or **Python 3** as the **Kernel Type**, type a **File Name** and click **Create file**.

The first cell of the notebook is populated automatically with the connection string to the Azure Quantum workspace.

For Q#, the first cell will look like this.

IMG

For Python, the first cell will look like this.

IMG

## Upload notebooks

You can upload one or more existing Jupyter notebook to Azure Quantum notebooks.

1. Click on your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).
1. Click on **Jupyter Notebooks**.
1. Click on **My Notebooks** and click **Upload notebooks**.
1. Click **Choose Files** and select the notebook files you want to upload.
1. If you would like to overwrite already existing files, select **Overwrite if already exists**.
1. Click **Upload files**.

IMG

After the notebooks have been uploaded, you can find them under **My Notebooks**.

## Next steps

- [Quickstart: Create a quantum-based random number generator in Azure Quantum](xref:microsoft.quantum.quickstarts.computing)
- [Quickstart: Solve an optimization problem in Azure Quantum](xref:microsoft.quantum.quickstarts.optimization.qio)
- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit)