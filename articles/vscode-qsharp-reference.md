---
author: bradben
description: Learn about the features that are included with the Azure Quantum Development Kit extension for VS Code. 
ms.date: 09/16/2024
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: Q# features in Visual Studio Code
uid: microsoft.quantum.reference.vscode
#customer intent: As a quantum programmer, I want to know how to access the Q# related features in VS Code.  
---

# Reference: Azure Quantum Development Kit extension for Visual Studio Code

The Azure Quantum Development Kit (QDK) uses all the standard functionality of Visual Studio (VS) Code, along with Q#-specific features when working with .qs files. This article is a reference guide to all Q# related commands and features, with links to additional content as needed. For general VS Code guidance, see the [VS Code documentation](https://code.visualstudio.com/docs).

> [!TIP]
> Most Q# related commands can be accessed from the **View > Command Palette** menu. While in a .qs file, select **Ctrl-Shift-P** (**Cmd-Shift-P** on macOS) and enter **Q#** to view a filtered list of commands. 
>
> For all macOS keyboard shortcuts, see [Keyboard shortcuts for macOS](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf).

## Commands

Most Q# related commands can be accessed from the **View > Command Palette** menu. Select **Ctrl-Shift-P** and enter **Q#** to view a filtered list of commands. Some commands are only available when a .qs file is active. 

> [!TIP] 
> You can create custom keyboard shortcuts for any VS Code command using **Keyboard Shortcuts**, or **Ctrl+K+S**. For more information, see [Key Bindings for VS Code](https://code.visualstudio.com/docs/getstarted/keybindings).

 
| Command | Action | Notes  | Alternate user action |
|---------|--------|--------|--------------|
| **Q#: Create Q# Project** | Creates a Q# project in the active folder, including:<br>* a qsharp.json manifest file<br>* a src subfolder with a default main.qs file.  | For more information about Q# projects, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects).  | In File Explorer, right-click the target folder and select **Create Q# project**.  |
| **Q#: Create an Azure Quantum notebook**   | Opens a sample Jupyter Notebook that runs a Q# + Python program and submits a job to Azure Quantum.  | For more information about Azure Quantum notebooks, see [Work with Azure Quantum notebooks](xref:microsoft.quantum.how-to.notebooks).  | N/A  |
| **Q#: Connect to an Azure Quantum workspace** | Connect to an Azure Quantum workspace using your Azure account or a connection string. Once you're authenticated, your workspace appears in File Explorer in  **Quantum Workspaces**.    | For more information about Azure Quantum connections, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace). | In File Explorer, hover over **Quantum workspaces** and select the **"+"** icon.   |
| **Q#: Open Q# playground** | Opens an online folder of Q# sample programs in File Explorer. You can edit and run the programs in the local quantum simulator, and also set breakpoints and step through the code with the built-in debugger.   | For more information, see the **README** file in the sample folder.  | N/A  |
| **Q#: Refresh Azure Quantum workspaces** | Syncs the latest changes from your connected quantum workspaces.  | If there is a connection issue, an alert icon appears next to the workspace name.  | In File Explorer, hover over **Quantum workspaces** and select the refresh icon.  |
| **Explorer: Focus on Quantum Workspaces View** | Opens File Explorer and focuses on your connected quantum workspaces, if configured. If no workspaces are configured, you're prompted to add an existing workspace. | For more information about Azure Quantum connections, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace).  | N/A  |


The following commands are available when a .qs file is active.

| Command | Action | Notes  | Alternate user action |
|---------|--------|--------|--------------|
| **Q#: Set the Azure Quantum QIR target profile** |  Sets the QIR, or quantum intermediate representation, target profile for your Q# programs. | For more information about target profiles, see [Target profiles](xref:microsoft.quantum.target-profiles#target-profiles-and-their-limitations).| The current target profile is displayed in the bottom toolbar. Select the target profile on the toolbar to open the selection dropdown.  |
| **Q#: Show circuit** | Displays a circuit diagram for the Q# program before it runs.  | For more information, see [Visualize quantum circuit diagrams](xref:microsoft.quantum.how-to.visualize-circuits). | Select the code lens option **Circuit** below the `@EntryPoint()` operation or above each user-defined operation in the program. |
| **Q#: Run file and show histogram** | Runs the current Q# program and displays a histogram of the results in the right pane.  | To access sort and filter options for the histogram display, select the filter icon in the histogram pane. | Select the code lens option **Histogram** below the `@EntryPoint()` operation.  |
| **Q#: Get QIR for current Q# program** | Opens the QIR source for the current Q# code in a new edit window. Your program must use the Base or Adaptive RI target profile to export QIR source. | For more information about QIR, see [Quantum intermediate representation](xref:microsoft.quantum.concepts.qir), and the Q# [developer blog](https://github.com/microsoft/qsharp/wiki/QIR). | N/A  |
| **Debug: Debug Q# file** | Opens the current Q# program in the debugger. | For more information, see [Debugging and testing your quantum code](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging).  | * Select **F5**<br>* Select the code lens option **Debug** below the `@EntryPoint()` operation.<br>* Select the **Run** icon in the upper right, and select **Debug Q# file**.  |
| **Debug: Run Q# file** | Runs the current Q# program in the default quantum simulator. | For more information, see [Get started with Q# programs](xref:microsoft.quantum.submit-jobs).| * Select **Ctrl+F5**<br>* Select the code lens option **Run** below the `@EntryPoint()` operation.<br>* Select the **Run** icon in the upper right, and select **Run Q# file**. | 
| **Q#: Calculate Resource Estimates** | Invokes the built-in version of the Resource Estimator. | For more information, see [Introduction to the Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). | N/A  |
| **Q#: Help** | A brief overview of the QDK extension in VS Code. | For complete Azure Quantum documentation, see [Azure Quantum documentation](/azure/quantum/). | N/A  |
| **Q#: Run file and show circuit diagram** | Runs the current Q# program and displays a circuit of the program with outputs. | For more information, see [Visualize quantum circuit diagrams](xref:microsoft.quantum.how-to.visualize-circuits). | N/A |
| **Q#: Show API documentation** | Opens the API documentation in a new pane. Search this pane using **Ctrl-F**.  |  For more information, see the [Azure Quantum API reference](xref:microsoft.quantum.apiref-intro). | N/A  |

## Terminals

Q# programs make use of two terminal windows in VS Code:

| Terminal | Action  |
|-----------------|-----------|
| **Debug console** | Displays run output or debug output  |  
| **Problems** | Displays pre-compile error checks |

## Editing Q# code

Most of the common code editing features in VS Code are available when working with Q# programs. For more information, see [Intellisense](https://code.visualstudio.com/docs/editor/intellisense) in the VS Code documentation.

- Precompile error checking
- Go-to definition
- References
- Function signatures
- Parameter information
- Completion suggestions
- Linting - In Q# files, you configure linting per-project in the manifest file. For more information, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects#manifest-file-examples).


## Common tasks

### Working with Q# files and projects

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| **New Q# file**    | Select **File > New file > Text file**. Save the file with a .qs extension. | If you set `Files: Default Language = qsharp`, a new file defaults to Q# formatting automatically. |
| **Create a Q# project** | From an open folder in File Explorer, select **Create Q# Project** from the Command Palette, or right-click the folder in File Explorer and select **Create Q# project**.| For more information about Q# projects, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects).  | 
| **Sample files**  | In a blank .qs file, enter **samples**, then select a sample program from the list.| You can also select **Open Q# playground** in the Command Palette to open an online folder of Q# sample programs in File Explorer. | 

### Connecting to Azure Quantum 

| Task | Action  | Notes | Alernate user action |
|-----------------|-----------|----------------|--------------| 
| **Connect to an Azure Quantum workspace** | In File Explorer, expand **Quantum workspaces** and select **Add an existing workspace**. Follow the prompts to select a subscription and workspace. | * You can connect to multiple workspaces. Select **"+"** next to **Quantum workspaces** to connect another workspace.<br>Workspace connections persist between your VS Code sessions.<br>* To remove a workspace connection, right-click the workspace and select **Remove workspace connection**.  | From the Command Palette, select **Connect to an Azure Quantum workspace**. |
| **Connect programmatically with a Python program** | Right-click an existing workspace connection and select **Copy Python code to connect to workspace**. Paste the resulting code into your Python program. | For more information, see [Submitting Python with Q# jobs to Azure Quantum](/azure/quantum/how-to-submit-jobs?tabs=tabid-python&pivots=ide-python#submitting-python-with-q-jobs-to-azure-quantum). | N/A |



### Running programs

| Task | Action  | Notes | Alernate user action |
|-----------------|-----------|----------------|--------------| 
| **Run a Q# program on the local quantum simulator** | In a Q# program, select the **Run** icon in the upper right, and select **Run Q# file**.  | For more information on the quantum simulator, see the [Sparse quantum simulator](xref:microsoft.quantum.machines.overview.sparse-simulator).  | * Select **Ctrl-F5**<br>* From the Command Palette, select **Q#: Run file and show histogram** or **Q#: Run file and show circuit diagram**<br>* Select the code lens option **Run** below the `@EntryPoint()` operation.  | 
| **Debug a program** | In a Q# program, select the **Run** icon in the upper right, and select **Debug Q# file**. | For more information about the Q# debugger in VS Code, see [Debugging and testing your quantum code](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging). | * Select **F5**<br>* Select the code lens option **Debug** below the `@EntryPoint()` operation.  |  
| **View providers and targets in your workspaces** | In File Explorer, select **Quantum workspaces**, expand the workspace and then expand **Providers** to see the available providers in the workspace. Expand an individual provider to view the available targets. | **Note**: Hover over a target name to view its **Status** and **Queue time** before submitting a job.| N/A | 
| **Submit a job to Azure Quantum** | In a Q# program, select a workspace, provider, and target. To submit the current Q# program, select the arrow next to the target. | For more information, see [Submitting  Q# jobs to Azure Quantum](/azure/quantum/how-to-submit-jobs#submitting-q-jobs-to-azure-quantum). | N/A |   
| **View job results** | Expand the workspace and then expand **Jobs**.  To open the job output from Azure Storage, select the cloud icon next to the job name. | Jobs are listed with the most recent on top.  |N/A  |          
