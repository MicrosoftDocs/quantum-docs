---
author: azure-quantum-content
description: Learn about the features that are included with the Azure Quantum Development Kit extension for VS Code. 
ms.date: 09/25/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: QDK features in Visual Studio Code
uid: microsoft.quantum.reference.vscode
#customer intent: As a quantum programmer, I want to know how to access the QDK related features in VS Code.  
---

# Reference: Azure Quantum Development Kit extension for Visual Studio Code

The Azure Quantum Development Kit (QDK) uses all the standard functionality of Visual Studio Code (VS Code), along with Q#-specific features when you work with `.qs` files. This reference guide describes all the QDK commands that you can access in the VS Code Command Palette, along with other features and links to additional content. For general VS Code guidance, see the [VS Code documentation](https://code.visualstudio.com/docs).

> [!TIP]
> Most commands from the QDK extension are accessible from the **View > Command Palette** menu. While in a `.qs` file, open the Command Palette and enter **QDK:** to view a filtered list of commands.

## Commands

Most of the QDK commands are related to writing and running Q# programs, and are only available when a `.qs` file is active. Other commands work in the background and aren't accessible in the Command Palette.

The following table describes the commands from the QDK extension that appear in the Command Palette.

> [!TIP]
> You can create custom keyboard shortcuts for VS Code commands using **Keyboard Shortcuts**, or **Ctrl + K + S**. For more information, see [Key Bindings for VS Code](https://code.visualstudio.com/docs/getstarted/keybindings).

| Command | Action | Notes | Alternate user action |
|---------|--------|-------|--------------|
| **QDK: Create Q# Project** | Creates a Q# project in the active folder, including  a `qsharp.json` manifest file and a `src` subfolder with a default `main.qs` file. | For more information about Q# projects, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects). | In File Explorer, right-click the target folder and select **Create Q# project**. |
| **QDK: Create an Azure Quantum notebook**  | Opens a sample Jupyter Notebook that runs a Q# + Python program and submits a job to Azure Quantum. | For more information about Azure Quantum notebooks, see [Work with Azure Quantum notebooks](xref:microsoft.quantum.how-to.notebooks). | N/A |
| **QDK: Connect to an Azure Quantum workspace** | Connect to an Azure Quantum workspace using your Azure account or a connection string. Once you're authenticated, your workspace appears in File Explorer in **Quantum Workspaces**. | For more information about Azure Quantum connections, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace). | In File Explorer, hover over **Quantum workspaces** and select the **＋ icon**. |
| **QDK: Open QDK playground** | Opens an online folder of Q# sample programs in File Explorer. You can edit and run the programs in the local quantum simulator, and also set breakpoints and step through the code with the built-in debugger. | For more information, see the **README** file in the sample folder. | N/A |
| **QDK: Refresh Azure Quantum workspaces** | Syncs the latest changes from your connected quantum workspaces. | If there's a connection issue, an alert icon appears next to the workspace name. | In File Explorer, hover over **Quantum Workspaces** and select the refresh icon. |
| **Explorer: Focus on Quantum Workspaces View** | Opens File Explorer and focuses on your connected quantum workspaces, if configured. If no workspaces are configured, you're prompted to add an existing workspace. | For more information about Azure Quantum connections, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace). | N/A |

The following commands are available when a `.qs` file is active.

| Command | Action | Notes | Alternate user action |
|---------|--------|-------|--------------|
| **QDK: Show circuit** | Displays a circuit diagram for the Q# program before it runs. | For more information, see [Visualize quantum circuit diagrams](xref:microsoft.quantum.how-to.visualize-circuits). | Select the code lens option **Circuit** from the menu next to the entry point operation or above each user-defined operation in the program. |
| **QDK: Run file and show histogram** | Runs the current Q# program and displays a histogram of the results in a new pane. | To access the sort and filter options for the histogram display, select the filter icon in the histogram pane. | Select the code lens option **Histogram** from the menu next to the entry point operation. |
| **QDK: Get QIR for current QDK program** | Opens the QIR source for the current Q# code in a new edit window. Your program must use the Base or Adaptive RI target profile to export QIR source. | For more information about QIR, see [Quantum intermediate representation](xref:microsoft.quantum.concepts.qir), and the Q# [developer blog](https://github.com/microsoft/qdk/wiki/QIR). | N/A |
| **QDK: Calculate Resource Estimates** | Invokes the built-in version of the Resource Estimator. | For more information, see [Introduction to the Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). | N/A |
| **QDK: Help** | A brief overview of the QDK extension in VS Code. | For complete Azure Quantum documentation, see [Azure Quantum documentation](/azure/quantum/). | N/A  |
| **QDK: Run file and show circuit diagram** | Runs the current Q# program and displays a circuit of the program with outputs. | For more information, see [Visualize quantum circuit diagrams](xref:microsoft.quantum.how-to.visualize-circuits). | N/A |
| **QDK: Add Copilot instructions file for Q# and OpenQASM** | Opens a prompt that gives you the option to add Copilot instructions to help you write and run Q# anf OpenQASM code. | For more information, see [Set up agent mode in VS Code for the Quantum Development Kit](xref:microsoft.quantum.how-to.qdk-vscode-agent-setup). | N/A |
| **QDK: Show API documentation** | Opens the API documentation in a new pane. To search this pane, press **Ctrl + F**. | For more information, see the [Azure Quantum API reference](xref:microsoft.quantum.apiref-intro). | N/A  |
| **QDK: Show Changelog** | Opens a changelog in a new tab that shows the QDK updates for the current and all previous release versions.| The changelog is also available on the open-source [QDK GitHub repository](https://github.com/microsoft/qdk). | N/A |
| **Debug: Start Debugging** | Opens the current Q# program in the debugger. | For more information, see [Debugging and testing your quantum code](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging). | Press **F5**, or select the code lens option **Debug** from the menu next to the entry point operation, or select the **Run** icon in the upper right and choose **Start Debugging**. |
| **Debug: Run** | Runs the current Q# program in the default quantum simulator. | For more information, see [Get started with Q# programs](xref:microsoft.quantum.submit-jobs).| Press **Ctrl + F5**, or select the code lens option **Run** from the menu next to the entry point operation, or select the **Run** icon in the upper right, and choose **Run**. |

## Terminals

Q# programs make use of two terminal windows in VS Code:

| Terminal | Action |
|-----------------|-----------|
| **Debug console** | Displays run output or debug output |  
| **Problems** | Displays pre-compile error checks |

## Edit Q# code

Most of the common code editing features in VS Code are also available when you work with Q# programs:

- Precompile error checking
- Go-to definition
- References
- Function signatures
- Parameter information
- Completion suggestions, including context aware, namespace member, and type member completions.
- Linting - In Q# files, you configure linting per-project in the manifest file. For more information, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects#manifest-file-examples).

For more information, see [Intellisense](https://code.visualstudio.com/docs/editor/intellisense) in the VS Code documentation.

## Common tasks

### Work with Q# files and projects

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| **New Q# file** | Select **File > New file > Text file**. Save the file with a `.qs` extension. | If you set `Files: Default Language = qsharp`, a new file automatically defaults to Q# formatting. |
| **Create a Q# project** | From an open folder in File Explorer, select **Create Q# Project** from the Command Palette, or right-click the folder in File Explorer and select **Create Q# project**.| For more information about Q# projects, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects). |
| **Sample files** | In a blank `.qs` file, enter **samples**, and then select a sample program from the list of options. | You can also select **Open QDK playground** in the Command Palette to open an online folder of Q# sample programs in File Explorer. |

### Connect to Azure Quantum

| Task | Action  | Notes | Alternate user action |
|-----------------|-----------|----------------|--------------|
| **Connect to an Azure Quantum workspace** | In File Explorer, expand **Quantum Workspaces** and select **Add an existing workspace**. Follow the prompts to select a subscription and workspace. | You can connect to multiple workspaces. Select **＋** next to **Quantum Workspaces** to connect another workspace. Workspace connections persist between your VS Code sessions. | From the Command Palette, select **QDK: Connect to an Azure Quantum workspace**. |
| **Connect programmatically with a Python program** | Right-click an existing workspace connection and select **Copy Python code to connect to workspace**. Paste the resulting code into your Python program. | For more information, see [Submitting Python with Q# jobs to Azure Quantum](/azure/quantum/how-to-submit-jobs?tabs=tabid-python&pivots=ide-python#submitting-python-with-q-jobs-to-azure-quantum). | N/A |

### Run programs

| Task | Action  | Notes | Alternate user action |
|-----------------|-----------|----------------|--------------|
| **Run a Q# program on the local quantum simulator** | In a Q# program, select the **Run** icon in the upper right, and select **Run**. | For more information on the quantum simulator, see the [Sparse quantum simulator](xref:microsoft.quantum.machines.overview.sparse-simulator). | Press **Ctrl-F5**, choose either **QDK: Run file and show histogram**  or **QDK: Run file and show circuit diagram** in the Command Palette, or choose the **Run** code lens option **Run** above the entry point operation. |
| **Debug a program** | In a Q# program, select the **Run** icon in the upper right, and that choose **Start Debugging**. | For more information about the Q# debugger in VS Code, see [Debugging and testing your quantum code](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging). | Press **F5**, or choose the code **Debug** code lens from the menu above the entry point operation. |  
| **View providers and targets in your workspaces** | In File Explorer, select **Quantum Workspaces**, expand the workspace, and then expand **Providers** to see the available providers in the workspace. Expand an individual provider to view the available targets. | Hover over a target name to view its **Status** and **Queue time** before you submit a job. | N/A |
| **Submit a job to Azure Quantum** | In a Q# program, select a workspace, provider, and target. To submit the current Q# program, select the arrow next to the target. | For more information, see [Submitting  Q# jobs to Azure Quantum](/azure/quantum/how-to-submit-jobs#submitting-q-jobs-to-azure-quantum). | N/A |
| **View job results** | Expand the workspace and then expand **Jobs**. To open the job output from Azure Storage, select the cloud icon next to the job name. | Jobs are listed from newest to oldest. |N/A |
