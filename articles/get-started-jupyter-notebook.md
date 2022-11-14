---
author: bradben
description: Learn how to run a Q# and Python sample notebook in an Azure Quantum workspace.
ms.author: brbenefield
ms.date: 11/09/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: 'Quickstart: Run a Q# and Python notebook'
uid: microsoft.quantum.get-started.notebooks
---

# Get started with Q# and an Azure Quantum notebook

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Learn how to run Q# code in a Jupyter Notebook in the [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) portal. A [Jupyter](https://jupyter.org/) Notebook is a document that contains both rich text and code and can run in your browser, and can run Q# and Python code in Azure Quantum.  Notebooks can be created directly in the Azure Quantum portal, and offer features such as preloaded connection information and standard Q# libraries. 

In this article, you will run a sample notebook on Azure Quantum that executes a simple quantum random number generator written in Q# and Python. 

For more information about using Jupyter Notebooks with Azure Quantum, see [Work with Jupyter Notebooks in an Azure Quantum workspace](xref:microsoft.quantum.how-to.notebooks).

## Prerequisites

Before you begin, you need the following prerequisites to use Jupyter Notebooks in an Azure Quantum workspace.

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Copy a sample notebook

To get started, copy a sample notebook from the notebook gallery.

1. Log in to the [Azure portal](https://portal.azure.com) and select your Azure Quantum workspace.
1. Select **Notebooks**.
1. In the **Sample gallery**, locate the **Hello, world: Q#** notebook tile, select either the **IonQ** or **Quantinuum** provider (the sample code is identical) and select **Copy to my notebooks**.
1. The sample notebook can be found under **My notebooks** and you can now run the notebook.

    :::image type="content" source="media/create_notebook_steps.png" alt-text="Screenshot of the sample Jupyter Notebook gallery showing how to copy a notebook in your gallery.":::

## Run the notebook

To run the sample notebook, follow these steps for your selected provider.

### [IonQ](#tab/tabid-ionq)

1. In **My notebooks**, select the **hello-world-qsharp-ionq** notebook. 
1. To run the full program from top to bottom, select **Run all**. 
1. To walk through the example and run each cell individually from top to bottom, select the cell you want to run and select the **run icon**.

    :::image type="content" source="media/run_or_run_all.png" alt-text="Screenshot of the Jupyter Notebook showing how to run it.":::

### Stepping through the program on IonQ

The *hello world* program runs a simple quantum random number generator and displays a histogram of the results. 

Some things to note:

- **The kernel**: In the upper right of the notebook, you can see that the notebook is running the **Python 3 (ipykernel)** kernel, which is the default Python shell for Jupyter Notebooks. When you create a notebook in Azure Quantum, you can select either the **Python 3 (ipykernel)** or the **Azure Quantum Q#** kernel. Both kernels are fully compatible with Q# code. 
- **1st cell**: Preloads your subscription information to connect to the Azure Quantum service. 
- **2nd cell**: Retrieves the available targets (quantum computers and simulators) in your workspace. 
- **3rd and 4th cells**: The Q# code that defines the program. Note the `%%qsharp` magic command which allows you to enter Q# code directly into the notebook when using the **Python 3 (ipykernel)** kernel. 
- **5th cell**: Sets the target and submits the job. 
- **6th and 7th cells**: Plot and display the result. The results should be roughly split between 0 and 1. 

### [Quantinuum](#tab/tabid-qunatinuum)

1. In **My notebooks**, select the **hello-world-qsharp-quantinuum** notebook. 
1. To run the full program from top to bottom, select **Run all**. 
1. To walk through the example and run each cell individually from top to bottom, select the cell you want to run and select the **run icon**.

    :::image type="content" source="media/run_or_run_all.png" alt-text="Screenshot of the Jupyter Notebook showing how to run it":::

### Stepping through the program on Quantinuum

The *hello world* program runs a simple quantum random number generator and displays a histogram of the results. 

Some things to note:

- **The kernel**: In the upper right of the notebook, you can see that the notebook is running the **Python 3 (ipykernel)** kernel, which is the default Python shell for Juptyer Notebooks. When you create a notebook in Azure Quantum, you can select either the **Python 3 (ipykernel)** or the **Azure Quantum Q#** kernel. Both kernels are fully compatible with Q# code. 
- **1st cell**: Preloads your subscription information to connect to the Azure Quantum service. 
- **2nd cell**: Retrieves the available targets (quantum computers and simulators) in your workspace. 
- **3rd and 4th cells**: The Q# code that defines the program. Note the `%%qsharp` magic command which allows you to enter Q# code directly into the notebook when using the **Python 3 (ipykernel)**. 
- **5th cell**: Sets the target and submits the job. 
- **6th and 7th cells**: Plot and display the result.

[!INCLUDE [Quantinuum target name update](includes/quantinuum-name-change.md)]

Looking at the histogram, you may notice that the program returned 0 every time, which is not very random. This is because the notebook was pre-populated to use the **Quantinuum Syntax Checker**, *quantinuum.sim.h1-1sc*. Using the Syntax Checker ensures that your code will run successfully on Quantinuum hardware, but also returns 0 for every quantum measurement. 

To create a true random number generator, modify the code in the 5th cell to use the **System Model H1 Emulator** target, *quantinuum.sim.h1-1e*

> [!NOTE]
> Running the program against the H1 Emulator or the System Model H1 computer will use H-System Quantum Credits (HQC) from your account. A single run of this example program costs approximately 5.3 HQC.

```python
qsharp.azure.target("quantinuum.sim.h1-1e")
```

Re-run that cell and the following cells. Now, the results should be roughly split between 0 and 1. 

***

> [!NOTE]
> If you have any questions or run into any issue using Azure Quantum, bookmark [Azure Quantum office hours](https://aka.ms/AQ/OfficeHours) and join our open office hours every Thursday 8∶30 AM Pacific Time zone (PT).

## Next steps

- [Quickstart: Solve an optimization problem in the Azure Quantum portal](xref:microsoft.quantum.quickstarts.optimization.qio.portal)
- [Quickstart: Submit a circuit with Qiskit using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.computing.qiskit.portal)
