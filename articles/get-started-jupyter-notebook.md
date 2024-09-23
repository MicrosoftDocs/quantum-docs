---
author: bradben
description: Learn how to run a Q# and Python sample notebook in an Azure Quantum workspace.
ms.author: brbenefield
ms.date: 09/16/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: ['Q#', '$$v', target, targets]
title: Run a Q# and Python notebook
uid: microsoft.quantum.get-started.notebooks
---

# Get started with Q# and an Azure Quantum notebook

[!INCLUDE [Azure Quantum credits banner](includes/azure-quantum-credits.md)]

Learn how to run Q# code in a Jupyter Notebook in the [Azure Quantum](xref:microsoft.quantum.azure-quantum-overview) portal. A [Jupyter](https://jupyter.org/) Notebook is a document that contains both rich text and code and can run in your browser using Q# and Python code.  Notebooks can be created directly in the Azure Quantum portal, and offer features such as preloaded connection information and a preconfigured Q# and Python development environment. 

In this article, you will run a sample notebook in the Azure portal that executes a simple quantum random number generator written in Q# and Python. 

For more information about using Jupyter Notebooks with the Azure Quantum service, see [Work with Jupyter Notebooks in an Azure Quantum workspace](xref:microsoft.quantum.how-to.notebooks).

## Prerequisites

Before you begin, you need the following prerequisites to use Jupyter Notebooks in an Azure Quantum workspace.

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. See [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Copy a sample notebook

To get started, copy a sample notebook from the notebook gallery.

1. Log in to the [Azure portal](https://portal.azure.com) and select your Azure Quantum workspace.
1. Select **Notebooks**.
1. In the **Sample gallery**, locate the **Hello, world: Q#** notebook tile, select either the **IonQ**, **Quantinuum**, or **Rigetti** provider (the sample code is identical) and select **Copy to my notebooks**.

    :::image type="content" source="media/azure-portal-sample-gallery.png" alt-text="Screenshot of the sample Jupyter Notebook gallery showing how to copy a notebook in your gallery." lightbox="media/azure-portal-sample-gallery.png" :::

1. The sample notebook can be found under **My notebooks** and you can now run the notebook.

## Run the notebook

To run the sample notebook, follow these steps for your selected provider.

> [!NOTE]
> Jupyter Notebooks don't display program results by default, so you must use the `Message` statement. For more information, see [Structure of a Q# program](xref:microsoft.quantum.qsharp-overview#structure-of-a-q-program).

### [IonQ](#tab/tabid-ionq)

1. In **My notebooks**, select the **hello-world-qsharp-ionq** notebook. 
1. To run the full program from top to bottom, select **Run all**. 
1. To walk through the example and run each cell individually from top to bottom, select the cell you want to run and select the **run icon**.

    :::image type="content" source="media/run_or_run_all.png" alt-text="Screenshot of the Jupyter Notebook showing how to run it.":::

### Stepping through the program on IonQ

The *hello world* program runs a simple quantum random number generator and displays a histogram of the results. 

Some things to note:

- **1st cell**: Preloads your subscription information to connect to the Azure Quantum service. 
- **2nd cell**: Retrieves the available targets (quantum computers and simulators) in your workspace. 
- **3rd cell**: Imports the `qsharp` package and sets the base profile for the compiler. 
- **4th cell**: The Q# code that defines the program. Note the `%%qsharp` magic command which allows you to enter Q# code directly into the Python notebook cell. 
- **5th cell**: Compiles the qsharp operation using the base profile to submit to Azure Quantum.
- **6th and 7th cells**: Sets the target, submits the job, and plots and displays the result. The results should be roughly split between 0 and 1. 

### [Quantinuum](#tab/tabid-qunatinuum)

1. In **My notebooks**, select the **hello-world-qsharp-quantinuum** notebook. 
1. To run the full program from top to bottom, select **Run all**. 
1. To walk through the example and run each cell individually from top to bottom, select the cell you want to run and select the **run icon**.

    :::image type="content" source="media/run_or_run_all.png" alt-text="Screenshot of the Jupyter Notebook showing how to run it":::

### Stepping through the program on Quantinuum

The *hello world* program runs a simple quantum random number generator and displays a histogram of the results. 

Some things to note:

- **1st cell**: Preloads your subscription information to connect to the Azure Quantum service. 
- **2nd cell**: Retrieves the available targets (quantum computers and simulators) in your workspace. 
- **3rd cell**: Imports the `qsharp` package and sets the base profile for the compiler. 
- **4th cell**: The Q# code that defines the program. Note the `%%qsharp` magic command which allows you to enter Q# code directly into the Python notebook cell. 
- **5th cell**: Compiles the qsharp operation using the base profile to submit to Azure Quantum.
- **6th and 7th cells**: Sets the target, submits the job, and plots and displays the result. The results should be roughly split between 0 and 1. 

Looking at the histogram, you may notice that the program returned 0 every time, which is not very random. This is because the notebook was pre-populated to use the **Quantinuum Syntax Checker**, *quantinuum.sim.h1-1sc*. Using the Syntax Checker ensures that your code will run successfully on Quantinuum hardware, but also returns 0 for every quantum measurement. 

To create a true random number generator, modify the code in the 5th cell to use the **System Model H1 Emulator** target, *quantinuum.sim.h1-1e*.

> [!NOTE]
> Running the program against the System Model H1 Emulator or the System Model H1 computer will use H-System Quantum Credits (HQCs) from your account. A single run of this example program costs approximately 5.3 HQCs.

```python
qsharp.azure.target("quantinuum.sim.h1-1e")
```

Re-run that cell and the following cells. Now, the results should be roughly split between 0 and 1.

### [Rigetti](#tab/tabid-rigetti)

1. In **My notebooks**, select the **hello-world-qsharp-rigetti** notebook. 
1. To run the full program from top to bottom, select **Run all**. 
1. To walk through the example and run each cell individually from top to bottom, select the cell you want to run and select the **run icon**.

    :::image type="content" source="media/run_or_run_all.png" alt-text="Screenshot of the Jupyter Notebook showing how to run it":::

### Stepping through the program on Rigetti

The *hello world* program runs a simple quantum random number generator and displays a histogram of the results. 

Some things to note:

- **1st cell**: Preloads your subscription information to connect to the Azure Quantum service. 
- **2nd cell**: Retrieves the available targets (quantum computers and simulators) in your workspace. 
- **3rd cell**: Imports the `qsharp` package and sets the base profile for the compiler. 
- **4th cell**: The Q# code that defines the program. Note the `%%qsharp` magic command which allows you to enter Q# code directly into the Python notebook cell. 
- **5th cell**: Compiles the qsharp operation using the base profile to submit to Azure Quantum.
- **6th and 7th cells**: Sets the target, submits the job, and plots and displays the result. The results should be roughly split between 0 and 1. 

***

> [!NOTE]
> If you have any questions or run into any issue using Azure Quantum, you can contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next steps

- [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum)
- [Quickstart: Submit a circuit with Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit)
