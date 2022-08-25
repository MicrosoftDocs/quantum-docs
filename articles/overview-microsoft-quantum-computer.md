---
author: bradben
description: Learn how quantum computing works, how it compares to classical computing, and how it uses the principles of quantum mechanics.
ms.date: 08/24/2022
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Microsoft's quantum computing
uid: microsoft.quantum.overview.ms-computing
---

# Microsoft's quantum computing

Recently, Microsoft had a major scientific breakthrough that cleared a significant hurdle toward building a scaled quantum machine with topological qubits. While engineering challenges remain, this new discovery proves out a fundamental building block for its approach to scaled quantum computing.

Microsoft is on the path to deliver a quantum machine as part of the Azure Quantum service. This is part of a comprehensive plan to empower innovators with quantum solutions for breakthrough impact. For more information about this scientific discovery, see the [Microsoft Research blog](https://www.microsoft.com/research/blog/microsoft-has-demonstrated-the-underlying-physics-required-to-create-a-new-kind-of-qubit/) or read the [preprint](https://arxiv.org/abs/2207.02472) of the paper.

The Azure Quantum team has created a Jupyter Notebook, written with the `azure-quantum` Python package, which performs all the analysis and generates the plots that appear in the paper. All you need to load and run the notebook is a free Azure account.

## Create an Azure account

To start, you'll need an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) and run the Jupyter Notebook without incurring any charges. 

> [!NOTE]
> If you have any questions regarding the workspace creation process or run into any issue at any point using Azure Quantum, bookmark [Azure Quantum office hours](https://aka.ms/AQ/OfficeHours) and join our open office hours every Thursday 8∶30 AM Pacific Standard Time zone (PST).
> TBD - WHERE ELSE CAN THEY POST IF THEY HAVE QUESTIONS?

## Create an Azure Quantum workspace

To create an Azure Quantum workspace, follow these steps.

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.

1. Select **Create a resource** and then search for **Azure Quantum**. On the results page, you should see a tile for the **Azure Quantum** service.

1. Select **Azure Quantum** and then select  **Create**. This opens a form to create a workspace.

1. Select a subscription to associate with the new workspace.

1. Select **Quick create**
1. Enter a name for the workspace.
1. Select the region for the workspace.
1. Click **Create**.
1. Deployment of your workspace may take a few minutes. When the deployment is complete, select **Go to resource**. 

## View the Jupyter Notebook

To view and run the notebook: 

1. In your new workspace, select **Notebooks** and then select **Microsoft's quantum computer**. 
1. In **Microsoft's Device Data**, select **Copy to my notebooks**.

    :::image type="content" source="media/mscomputer-copy-notebook.png" alt-text="Copy sample notebook.":::

1. To run all the cells in the notebook, select **Run all** (or **Alt-R**) at the top of the notebook. To step through the notebook cell-by-cell, select **Run cell** (or **Ctrl+Enter**) next to each notebook cell. 


## Next Steps

- [What is Azure Quantum?](xref:microsoft.quantum.azure-quantum-overview)
- [What are the Q# programming language and Quantum Development Kit (QDK)?](xref:microsoft.quantum.overview.q-sharp)
- [Quickstart: Submit a circuit with Qiskit using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.computing.qiskit.portal)
- [Quickstart: Solve an optimization problem using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.optimization.qio.portal)

