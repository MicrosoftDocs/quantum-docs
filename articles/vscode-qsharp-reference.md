---
author: bradben
description: Learn about the features that are included with the Azure Quantum Development Kit extension for VS Code. 
ms.date: 05/20/2024
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Q# features in Visual Studio Code
uid: microsoft.quantum.reference.vscode
#customer intent: As a quantum programmer, I want to know how to access the Q# related features in VS Code.  
---

# Command and setting reference for the Azure Quantum Development Kit extension for Visual Studio Code

The Azure Quantum Development Kit leverages all the standard functionality of Visual Studio Code, along with Q#-specific features when working with *.qs* files. This article is a reference guide to all Q# related settings and features, with links to additional content as needed. For general VS Code guidance, see the [VS Code documentation](https://code.visualstudio.com/docs).

> [!TIP]
> Most Q# related commands can be accessed from the **View > Command Palette** menu. While in a *.qs* file, select **Ctrl-Shift-P** and type **Q#** to view a filtered list of commands. 

## Q# settings

To open the VS Code configuration settings, select **File > Preferences > Settings** or **Ctrl** + **,**. All of the Q# related settings are under **User > Extensions > Q#**. 


| Setting | ID | Action  | Notes |
|--------------| ---|-----------|----------------| 
|  Qir: Enable Adaptive Profile| Enables the adaptive profile as the target. | Q#.qir.targetProfile | This setting enables programs to take advantage of the latest capabilities of quantum hardware, such as the ability to perform mid-circuit measurement of qubits, branch based on the results, and perform some classical computations at runtime. For more information, see [QIR target profile types](xref:microsoft.quantum.target-profiles) in the documentation and [QIR](https://github.com/microsoft/qsharp/wiki/QIR) in the developer Wiki.<br><br> This setting is also configurable in the Command Palette. |   
|  Qir: Experimental Code Generation | Q#.qir.experimentalCodeGeneration |Enables the QIR code generation functionality. | This is required if you are generating code targeting the Adaptive Profile.  | 
|  Qir: Target profile | Q#.qir.targetProfile |Enables the selected target profile for your program. | Select `unrestricted`, `base`, or `adaptive_ri`, depending on the processing requirements of your program. For more information, see  [Target profiles](xref:microsoft.quantum.target-profiles#target-profiles-and-their-limitations). | 

## Other helpful settings

These settings may also be useful when configuring your VS Code environment for Q#.

| Setting | ID | Action  | Notes |
|-----------------|-----------|----------------| 
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

Also helpful, `User > Text Editor > Files: Default Language = qsharp` [files.defaultLanguage] Sets new text file language to qsharp - type `sample` or any q# code and it recognizes it. Still have to save file as .qs, though. 
|  editor.defaultFormatter |   | | optional - set to AQDK 
|  editor.defaultFoldingRangeProvider | | | no idea what this does, AQDK is in the dropdown, though.
|  files.defaultLanguage | | | sets default language for new text file


## Commands

Most Q# related commands can be accessed from the **View > Command Palette** menu. While in a *.qs* file, select **Ctrl-Shift-P** and type **Q#** to view a filtered list of commands. 

View > Command Palette (Ctrl + Shift + P)
Note: full list only seen when you're in a q# file

Add parameters for each

Q#: Create Q# Project
Q#: Create an Azure Quantum notebook
Q#: Show circuit
Q#: Connect to an Azure Quantum workspace
Q#: Run file and show histogram
Q#: Get QIR for current Q# program
Debug: Debug Q# file
Debug: Run Q# file
Q#: Calculate Resourece Estimates
Q#: Help 
Q#: Open Q# Playground
Q#: Refresh Azure Quantum workspaces
Q#: Run file and show circuit diagram
Q#: Set the Azure Quantum QIR target profile (unrestricted or Adaptive RI [qubit **R**eset and **I**nteger support])
Q#: Show API documentation (opens in the preview window, not scoped to anything)
Explorer: Focus on Quantum workspaces view



## Working with Q# files and projects

| Task | Action  | Notes |
|-----------------|-----------|----------------| 
| New Q# file    | | |   
| Create a Q# project |  |  |
| Sample files   | | | in a blank .qs file, type *samples*

1. Text to "Select a language" can be turned on/off with `Workbench.editor.empty:hint`. If Copilot extension is installed, it overwrites this. Turn off with `github.copilot.chat.welcomeMessage = Never`, but you have to refresh with *Reload window*. Also, see `Files: Default Language = qsharp` for opening a new q# file by default. 

## Editing Q# code

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Hover def |  |  |    // if valid
| Error checking  |  |  |  // redlined, hover with error
| Linting  | | https://learn.microsoft.com/en-us/azure/quantum/user-guide/how-to-work-with-qsharp-projects?tabs=tabid-qsharp%2Ctabid-qsharp-run#manifest-file-examples |
| Go-to def  |  |  |    F12, Peek Alt+F12
| Function signature  |  |  | as you type a function or operation, popup help shows you the required parameters.
| Completion  |  |  |  shows possible completions as you type

    
## Connecting to Azure Quantum 

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Explorer -> Quantum workspaces |  |  |  

Explorer > workspace : open workspace in the Azure portal


## Running programs

If the selection items (run, histogram, circuit, debug, estimate) aren't displaying under EntryPoint or circuit doesn't display before an operation, ensure that the `editor.codeLens` setting is selected. 

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Local simulator |  |  | 
| Debugging |  |  |  
| Viewing providers | | | 
| Submit a job to Azure Quantum |  |  |   
| Circuit rendering |  |  |  
| View results |  |  |          

 
## Terminals

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Output for Q# programs |  |  |   
| Debug console for Q# programs |  |  |       

<!-- 
## Azure Quantum workspaces

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Submit a job |  |  |   
| View providers |  |  |   
| View job results |  |  |  

## Explorer (duplicate stuff? Do we need it?)

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Open folder |  |  |  
| New project |  |  | 
| Workspace |  |  |  

-->
 