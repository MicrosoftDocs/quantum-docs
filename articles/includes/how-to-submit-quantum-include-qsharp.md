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

## Load a Q# sample program

1. In VS Code, select **File > New Text File** and save the file as **RandomNum.qs**.
1. Open **RandomNum.qs** and type `sample`, then select **Random Bit sample** from the list of options and save the file.

> [!NOTE]
> You can also open your own Q# file. If you run an older Q# program and run into errors, see [Testing and debugging](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging) or [Migrating your programs to the Modern QDK](/azure/quantum).

## Run a Q# program


1. To test run your program locally on the built-in simulator, select **Run Q# File** from the play icon drop-down in the top-right, or press **Ctrl+F5**. Your output will appear in the debug console. 
1. To debug your program before submitting it to Azure Quantum, select **Debug Q# file** from the play icon, or press **F5**. Use the debugging controls at the top to step over, into, and out of the code. For more information about debugging Q# programs, see [Testing and debugging](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging).

## Plot the frequency histogram

The frequency histogram represents the distribution of results obtained from running a quantum program multiple times, or "shots". Each bar in the histogram corresponds to a possible outcome, and its height represents the number of times that outcome is observed. The frequency histogram helps visualize the probability distribution of these outcomes.

1. Select **View -> Command Palette**, or press **Ctrl+Shift+P**, and type “histogram” which should bring up the **Q#: Run file and show histogram** option. Select this option to open the Q# histogram window.
1. Enter a number of **shots** to execute the program, for example, 100 shots, and press **Enter**. The histogram will display in the Q# histogram window.
1. Click the top-left **settings icon** to display options.

    :::image type="content" source="../media/histogram-vscode-random-bit-tab.png" alt-text="Screenshot the Q# histogram window in Visual Studio Code showing how to display settings.":::

1. Click on a bar to display the **percentage** of the total shots. In this case there are two possible outcomes, 0 and 1, and the percentage of each outcome is close to 50%.

    :::image type="content" source="../media/histogram-vscode-random-bit.png" alt-text="Screenshot the Q# histogram window in Visual Studio Code.":::

> [!TIP]
> You can zoom the histogram using the mouse scroll wheel or a trackpad gesture. When zoomed in, you can pan the chart by pressing 'Alt' while scrolling.

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