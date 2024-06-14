---
author: bradben
description: Learn about the features that are included with the Azure Quantum Development Kit extension for VS Code. 
ms.date: 06/12/2024
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Q# features in Visual Studio Code
uid: microsoft.quantum.reference.vscode
#customer intent: As a quantum programmer, I want to know how to access the Q# related features in VS Code.  
---

# Reference: Azure Quantum Development Kit extension for Visual Studio Code

The Azure Quantum Development Kit leverages all the standard functionality of Visual Studio Code, along with Q#-specific features when working with *.qs* files. This article is a reference guide to all Q# related settings and features, with links to additional content as needed. For general VS Code guidance, see the [VS Code documentation](https://code.visualstudio.com/docs).

> [!TIP]
> Most Q# related commands can be accessed from the **View > Command Palette** menu. While in a *.qs* file, select **Ctrl-Shift-P** and enter **Q#** to view a filtered list of commands. 

## Q# settings

To open the VS Code configuration settings, select **File > Preferences > Settings**. All of the Q# related settings are under **User > Extensions > Q#**. 


| Setting | ID | Action  | Notes |
|--------------| ---|-----------|----------------| 
|  **Qir: Enable Adaptive Profile**| *Q#.qir.targetProfile* | Enables the Adaptive RI profile as the target. | This setting enables programs to take advantage of the latest capabilities of quantum hardware, such as the ability to perform mid-circuit measurement of qubits, branch based on the results, and perform some classical computations at runtime. For more information, see [QIR target profile types](xref:microsoft.quantum.target-profiles) in the documentation and [QIR](https://github.com/microsoft/qsharp/wiki/QIR) in the developer Wiki.<br><br> This setting is also configurable in the command palette or from the bottom task bar in VS Code. |   
|  **Qir: Experimental Code Generation** | *Q#.qir.experimentalCodeGeneration*|Enables the QIR code generation functionality. | This is required if you are generating code targeting the Adaptive Profile.  | 
|  **Qir: Target profile** | *Q#.qir.targetProfile* | Enables the selected target profile for your program. | Select `unrestricted`, `base`, or `adaptive_ri`, depending on the processing requirements of your program. For more information, see  [Target profiles](xref:microsoft.quantum.target-profiles#target-profiles-and-their-limitations). | 

### Other helpful settings

These settings may also be useful when configuring your VS Code environment for Q#.

| Setting | ID | Action  | Notes |
|----------| -------|-----------|----------------| 
| **User > Text Editor > Code Lens** | *editor.codeLens* | Enables the code lens options for your Q# program. The code lens options appear after the `@EntryPoint()` in each program and provide quick access to run or debug your program, display a histogram, show resource estimates, or display the circuit diagram for program. The circuit diagram option is also available for every user-defined operation in the program. | For more info, see [Visualize quantum circuit diagrams](xref:microsoft.quantum.how-to.visualize-circuits).  |
| **User > Text Editor > Files: Default Language** | *files.defaultLanguage* | Sets the default language that is assigned to new files. | Optional value: **qsharp** |
| **User > Text Editor > Default Formatter** | *editor.defaultFormatter* | Defines a default formatter which takes precedence over all other formatter settings. | Optional value: **Azure Quantum Developement Kit (QDK)** | 
| **User > Text Editor > Default Folding Range Provider** | *editor.defaultFoldingRangeProvider* | Defines a default folding range provider which takes precedence over all other folding range providers. | Optional value: **Azure Quantum Developement Kit (QDK)** | 

## Commands

Most Q# related commands can be accessed from the **View > Command Palette** menu. Select **Ctrl-Shift-P** and enter **Q#** to view a filtered list of commands. Note that some commands are only available when a *.qs* file is open. 

TBD - Add column for alternate method...
 
| Command | Action | Notes  |  
|---------|--------|--------|
| **Q#: Create Q# Project** | Creates a Q# project in the active folder, including:<br>- a *qsharp.json* manifest file<br>- a *src* subfolder with a default *main.qs* file.  | For more information about Q# projects, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects). ALSO FROM FOLDER RIGHT CLICK |
| **Q#: Create an Azure Quantum notebook**   | Opens a sample Jupyter Notebook that runs a Q# + Python program and submits a job to Azure Quantum.  | For more information about Azure Quantum notebooks, see [Work with Azure Quantum notebooks](xref:microsoft.quantum.how-to.notebooks).  |
| **Q#: Connect to an Azure Quantum workspace** | Connect to an Azure Quantum workspace using your Azure account or a connection string. Once you are authenticated, your workspace appears in **Explorer > Quantum Workspaces**.    | For more information about Azure Quantum connections, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace). ALSO FROM THE QUANTUM WORKSPACES IN EXPLORER "+"|
| **Q#: Open Q# playground** | Opens an online folder of Q# sample programs in File Explorer. You can edit and run the programs in the local quantum simulator, and also set breakpoints and step through the code with the built-in debugger.   | For more information, see the *README* file in the sample folder.  |
| **Q#: Refresh Azure Quantum workspaces** | Syncs the latest changes from your connected quantum workspaces.  | ALSO FROM THE QUANTUM WORKSPACES IN EXPLORER  |
| **Explorer: Focus on Quantum Workspaces View** | Opens File Explorer and focuses on your connected quantum workspaces, if configured. If no workspaces are configured, you are prompted to add an existing workspace. | For more information about Azure Quantum connections, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace).  |


The following commands are available when you are in a *.qs* file.

| Command | Action | Notes  |  
|---------|--------|--------|
| **Q#: Set the Azure Quantum QIR target profile** |  Sets the QIR, or quantum intermediate representation, target profile for your Q# programs. | For more information about target profiles, see [Target profiles](xref:microsoft.quantum.target-profiles#target-profiles-and-their-limitations).|
| **Q#: Show circuit** | Displays a circuit diagram for the Q# program before it runs. You can also view the diagrams for individual circuits by selecting the code lens option **circuit** above each user-define operation.  | For more information, see [Visualize quantum circuit diagrams](xref:microsoft.quantum.how-to.visualize-circuits). |
| **Q#: Run file and show histogram** | Runs the current Q# program and displays a histogram of the results in the right pane.  | Select the filter icon in the histogram pane to access sort and filter options for the historgram display. |
| **Q#: Get QIR for current Q# program** | Opens the QIR source for the current Q# code in a new edit window. Your program must use the Base or Adaptive RI target profile to export QIR source. | For more information about QIR, see [Quantum intermediate representation](xref:microsoft.quantum.concepts.qir), and the Q# [developer blog](https://github.com/microsoft/qsharp/wiki/QIR). |
| **Debug: Debug Q# file** | Opens the current Q# program in the debugger. | For more information, see [Debugging and testing your quantum code](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging).  |
| **Debug: Run Q# file** | Runs the current Q# program in the default quantum simulator. | For more information, see [Get started with Q# programs](xref:microsoft.quantum.submit-jobs).| 
| **Q#: Calculate Resource Estimates** | Invokes the built-in version of the Resource Estimator. | For more information, see [Introduction to the Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). |
| **Q#: Help** | A brief overview of the QDK extension in VS Code. | For complete Azure Quantum documentation, see [Azure Quantum documentation](/azure/quantum/). |
| **Q#: Run file and show circuit diagram** | Runs the current Q# program and displays a circuit of the program with outputs. | For more information, see [Visualize quantum circuit diagrams](xref:microsoft.quantum.how-to.visualize-circuits). |
| **Q#: Show API documentation** | Opens the API documentation in a new pane. Search this pane using **Ctrl-F**.  |  For more information, see the [Azure Quantum API reference](xref:microsoft.quantum.apiref-intro). |

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
- Linting - In Q# files, linting is configured per project. For more information, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects#manifest-file-examples).


## Common tasks

### Working with Q# files and projects

| Task | Action  | Notes |
|-----------------|-----------|----------------| 
| **New Q# file**    | Select **File > New file > Text file**. Save the file with a *.qs* extension. | If you set `Files: Default Language = qsharp`, a new file defaults to Q# formatting automatically. 
| **Create a Q# project** | From an open folder in File Explorer, select **Create Q# Project** from the command palette, or right-click the folder in File Explorer and select **Create Q# project**.| For more information about Q# projects, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects).  |
| **Sample files**  | In a blank *.qs* file, enter **samples** and select a sample program from the list.| You can also select **Open Q# playground** in the command palette to open an online folder of Q# sample programs in File Explorer. |

### Connecting to Azure Quantum 

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| **Connect to an Azure Quantum workspace** | Open **File Explorer**, expand **Quantum workspaces** and select **Add an existing workspace**. Follow the prompts to select a subscription and workspace. | - You can also connect using **Command palette > Connect to an Azure Quantum workspace**.<br> - You can connect to multiple workspaces. Select **"+"** next to **Quantum workspaces** to connect another workspace.<br>Workspace connections will persist between your VS Code sessions.<br>* To remove a workspace connection, right-click the workspace and select **Remove workspace connection**.  |  
| **Connect programmatically with a Python program** | Right-click an existing workspace connection and select **Copy Python code to connect to workspace**. Paste the resulting code into your Python program. | For more information, see [Submitting Python with Q# jobs to Azure Quantum](/azure/quantum/how-to-submit-jobs?tabs=tabid-python&pivots=ide-python#submitting-python-with-q-jobs-to-azure-quantum).  |


### Running programs

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| **Run a Q# program on the local quantum simulator** | In a Q# program, select the **Run** icon in the upper right, and select **Run Q# file** (**Ctrl-F5**).  | Optionally, from the Command palette, select:<br>* **Q#: Run file and show histogram**<br>* **Q#: Run file and show circuit diagram** | 
| **Debug a program** | In a Q# program, select the **Run** icon in the upper right, and select **Debug Q# file** (**F5**). | For more information about the Q# debugger in VS Code, see [Debugging and testing your quantum code](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging). |  
| **View providers and targets in your workspaces** | In **File Explorer > Quantum workspaces**, expand the workspace and then expand **Providers** to see the avalable providers in the workspace. Expand an individual provider to view the available targets. | **Note**: Hover over a target name to view its **Status** and **Queue time** before submitting a job.| 
| **Submit a job to Azure Quantum** | In a Q# program, select a workspace, provider, and target. Select the arrow next to the target to submit the current Q# program.  | For more information, see [Submitting  Q# jobs to Azure Quantum](/azure/quantum/how-to-submit-jobs#submitting-q-jobs-to-azure-quantum). |   
| **View job results** | Expand the workspace and then expand **Jobs**.  Select the cloud icon next to the job name to open the job output from Azure Storage. | Jobs are listed with the most recent on top.  |          
