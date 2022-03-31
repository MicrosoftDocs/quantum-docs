---
author: bradben
ms.author: sonialopez
ms.date: 03/09/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
---

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Create a new Notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select the workspace from the previous step.
1. In the left blade, select **Notebooks**.
1. Click **My Notebooks** and click **Add New**.
1. In **Kernel Type**, select **IQ#**.
1. Type a name for the file, for example *submit-quantum-job.ipynb*, and click **Create file**. 

> [!NOTE]
> You can also upload a Notebook to your Azure Quantum workspace. For more information, see [Upload notebooks](xref:microsoft.quantum.how-to.notebooks#upload-notebooks).

When your new Notebook opens, it automatically creates the code for the first cell - a connection command based on your subscription and workspace information.

> [!NOTE]
> Unless otherwise noted, you should run each cell in order as you create it to avoid any compilation issues. 

Click the triangular "play" icon to the left of the cell to run the code. The program authenticates to your Azure account and displays the targets available in your workspace. 

## Write a Q# operation

Select **+ Code** to add a new cell and enter and run your Q# code. This example uses a `GenerateRandomBit` operation.

```qsharp
operation GenerateRandomBit() : Result {
    use q = Qubit();
    H(q);
    let r = M(q);
    Reset(q);
    return r;
}
```

## Connect to a quantum target

Add a new cell and use the `%azure.target` magic command to set the active target. Any of the targets listed previously can be used, but note that costs may be incurred for some. For more information about job costs, see [Azure Quantum job costs](xref:microsoft.quantum.azure.job-costs).  

For this example, use the free `ionq.simulator`. 

```py
%azure.target ionq.simulator
```

## Submit your job

To submit your job, run the %azure.execute magic command with the Q# operation you defined earlier. 

```py
%azure.execute GenerateRandomBit
```

After submitting a job, you can check its status with the command `%azure.status` \<*job ID*\> or view its results with the command `%azure.output`. You can view a list of all your jobs with the command `%azure.jobs`.

Some helpful tips while using Q# Jupyter Notebooks:

- Use the command `%lsmagic` to see all of the available magic commands, including
  the ones for Azure Quantum.
- Detailed usage information for any magic command can be displayed by simply
  appending a `?` to the command, for example, `%azure.connect?`.

- Documentation for magic commands is also available online:
  [%azure.connect](/qsharp/api/iqsharp-magic/azure.connect),
  [%azure.target](/qsharp/api/iqsharp-magic/azure.target),
  [%azure.submit](/qsharp/api/iqsharp-magic/azure.submit),
  [%azure.execute](/qsharp/api/iqsharp-magic/azure.execute),
  [%azure.status](/qsharp/api/iqsharp-magic/azure.status),
  [%azure.output](/qsharp/api/iqsharp-magic/azure.output),
  [%azure.jobs](/qsharp/api/iqsharp-magic/azure.jobs)
