---
author: bradben
description: Learn how to run a Q# and Python sample notebook in an Azure Quantum workspace.
ms.author: brbenefield
ms.date: 02/21/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v', target, targets]
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
1. In the **Sample gallery**, locate the **Hello, world: Q#** notebook tile, select either the **IonQ**, **Quantinuum**, or **Rigetti** provider (the sample code is identical) and select **Copy to my notebooks**.
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
- **6th cell**: Plots and displays the result. The results should be roughly split between 0 and 1. 

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
- **6th cell**: Plots and displays the result.

[!INCLUDE [Quantinuum target name update](includes/quantinuum-name-change.md)]

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

- **The kernel**: In the upper right of the notebook, you can see that the notebook is running the **Python 3 (ipykernel)** kernel, which is the default Python shell for Juptyer Notebooks. When you create a notebook in Azure Quantum, you can select either the **Python 3 (ipykernel)** or the **Azure Quantum Q#** kernel. Both kernels are fully compatible with Q# code. 
- **1st cell**: Preloads your subscription information to connect to the Azure Quantum service. 
- **2nd cell**: Retrieves the available targets (quantum computers and simulators) in your workspace. 
- **3rd cell**: Sets the target to the Rigetti simulator. 
- **4th and 5th cells**: The Q# code that defines the program. Note the `%%qsharp` magic command which allows you to enter Q# code directly into the notebook when using the **Python 3 (ipykernel)**. 
- **6th cell**: Submits the job. 
- **7th cell**: Plots and displays the results. The results should be roughly split between 0 and 1. 

***

## Load and run other sample notebooks

You'll find more sample notebooks in the **Getting started** tab of the sample gallery of your Azure Quantum workspace.

|Notebook| SDK| Description |
|--------|----|--------|
|Parallel QRNG|Q#|This sample runs a quantum random number generator that draws several bits with a single measurement. |
|Grover's Search|Q# | This sample prepares a register of qubits in a state marked by a given quantum operation known as an oracle. Grover's algorithm is a data search algorithm that uses a quantum development technique known as amplitude amplification. |
|Quantum Signal Processing| Python + Qiskit| This sample runs the single-qubit quantum circuits used to illustrate quantum signal processing in [arXiv:2110.11327](https://arxiv.org/abs/2110.11327) and [arXiv:2105.02859](https://arxiv.org/abs/2105.02859). Quantum signal processing is a systematic framework to transform quantum systems with respect to almost arbitrary polynomial functions. |
|Hidden shifts| Python + Qiskit | In this sample you'll learn about quantum deconvolution by solving different *hidden shift* problems.|
|Noisy Deutsch–Jozsa| Python + Q#|This sample evaluates how noise in quantum devices may affect quantum algorithms such as the Deutsch–Jozsa algorithm, using the [open systems simulator](xref:microsoft.quantum.machines.overview.noise-simulator) against different kinds of noise.|
|Large Simulation| Q# | This samples uses the [sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator) to run programs requiring large number of qubits. |
|Data Management| Python | This sample shows you how to connect to your workspace's linked storage account and upload or download data for persistence. You can use this notebook to upload and download data between your local computer and Azure portal.|

> [!NOTE]
> If you have any questions or run into any issue using Azure Quantum, bookmark [Azure Quantum office hours](https://aka.ms/AQ/OfficeHours) and join our open office hours every Thursday 8∶30 AM Pacific Time zone (PT).
## Next steps

- [Quickstart: Solve an optimization problem in the Azure Quantum portal](xref:microsoft.quantum.quickstarts.optimization.qio.portal)
- [Quickstart: Submit a circuit with Qiskit using an Azure Quantum notebook](xref:microsoft.quantum.quickstarts.computing.qiskit.portal)
