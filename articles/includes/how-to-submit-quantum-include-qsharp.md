---
author: bradben
ms.author: brbenefield
ms.date: 12/07/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [Quantum Development Kit, target, targets]
---

## Submitting Q# jobs to Azure Quantum

Learn how to use VS Code to run, debug, and submit a Q# program to Azure Quantum.

## Prerequisites

For installation details, see [Installing the Modern QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-modern-qdk-on-vs-code).

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/).
- The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension.

## Open and run a Q# file

Open your preferred Q# file, or create a new file from one of the built-in Q# samples. This procedure uses a built-in sample to avoid conflicts with the compiler. If you run an older Q# program and run into errors, see [Testing and debugging](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging) or [Migrating your programs to the Modern QDK](/azure/quantum).

1. In VS Code, select **File > New Text File** and save the file as **RandomNum.qs**. 
1. Open **RandomNum.qs** and type `sample`, then select **Random Bit sample** and save the file. 
1. To test run your program locally on the built-in simulator, select **Run Q# File** from the play icon drop-down in the top-right, or press **Ctrl+F5**. Your output will appear in the debug console. 
1. To debug your program before submitting it to Azure Quantum, select **Debug Q# file** from the play icon, or press **F5**. Use the debugging controls at the top to step over, into, and out of the code. For more information about debugging Q# programs, see [Testing and debugging](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging).

> [!TIP]
> The Modern QDK includes a set of built-in Q# samples that you can use to learn more about Q# and quantum computing. To view the samples, open a new Q# file and type `sample`, then select the sample you want to view from the list of options. 

## Connect to Azure Quantum and submit your job

Use the built-in **Quantum Workspaces** to connect and submit jobs directly from VS Code. For this example, you'll submit a job to the Rigetti simulator. 

1. In the **Explorer** pane, expand **Quantum Workspaces**.
1. Select **Add an existing workspace** and follow the prompts to connect to your preferred directory, subscription, and workspace. 
1. Once you are connected, expand your workspace and expand the **Rigetti** provider.
1. Select **rigetti.sim.qvm** as your target. 
1. Select the play icon to start submitting the current Q# program. If you get a popup, select **Change the QIR target profile and continue**. 
1. Add a name to identify the job.
1. Add the number of shots, or number of times that the program is run.
1. Press **Enter** to submit the job. The job status will display at the bottom of the screen.
1. Expand **Jobs** and hover over your job, which displays the times and status of your job. 
1. To view the results, select the cloud icon next to the job name to download the results from your workspace storage and display it in VS Code. 