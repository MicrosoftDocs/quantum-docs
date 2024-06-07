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

# Quick reference for the Azure Quantum Development Kit extension for Visual Studio Code

The Azure Quantum Development Kit leverages all the standard functionality of Visual Studio Code, along with Q#-specific features when working with *.qs* files. This article is a quick reference guide to all Q# related settings and features, with links to additional content as needed. For general VS Code guidance, see the [VS Code documentation](https://code.visualstudio.com/docs).

> [!TIP]
> Most Q# related commands can be accessed from the **View > Command Palette** menu. While in a *.qs* file, select **Ctrl-Shift-P** and type **Q#** to view a filtered list of commands. 

## Q# settings

VS Code configuration settings under `File > Preferences > Settings`, `User > Extensions > Q#`. 


| Task | Action  | Notes |
|-----------------|-----------|----------------| 
|  Qir: Experimental Code Generation |  |  |   
|  Qir: Target Profile |  |  | 
|  Qir: Enable Adaptive Profile |  |  | 


Also helpful, `User > Text Editor > Files: Default Language = qsharp` [files.defaultLanguage] Sets new text file language to qsharp - type `sample` or any q# code and it recognizes it. Still have to save file as .qs, though. 
|  editor.defaultFormatter |   | | optional - set to AQDK 
|  editor.defaultFoldingRangeProvider | | | no idea what this does, AQDK is in the dropdown, though.
|  files.defaultLanguage | | | sets default language for new text file


## Commands

View > Command Palette (Ctrl + Shift + P)
Note: full list only seen when you're in a q# file

Add parameters for each

Q#: Create Q# Project
Q#: Create an Azure Quantum notebook
SQ#: how circuit
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


## Q# files and projects

| Task | Action  | Notes |
|-----------------|-----------|----------------| 
| New Q# file    | | |   
| Create a Q# project |  |  |
| Sample files   | | | in a blank .qs file, type *samples*

1. Text to "Select a language" can be turned on/off with `Workbench.editor.empty:hint`. If Copilot extension is installed, it overwrites this. Turn off with `github.copilot.chat.welcomeMessage = Never`, but you have to refresh with *Reload window*. Also, see `Files: Default Language = qsharp` for opening a new q# file by default. 

## Editing

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Hover def |  |  |    // if valid
| Error checking  |  |  |  // redlined, hover with error
| Go-to def  |  |  |    F12, Peek Alt+F12
| Function signature  |  |  | as you type a function or operation, popup help shows you the required parameters.
| Completion  |  |  |  shows possible completions as you type

    
## Connecting to Azure Quantum 

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| •	Explorer -> Quantum workspaces |  |  |  
 Explorer > workspace : open workspace in the Azure portal

 

## Running programs

If the selection items (run, histogram, circuit, debug, estimate) aren't displaying under EntryPoint or circuit doesn't before an operation, ensure that the `editor.codeLens` setting is selected. 

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Local simulator |  |  | 
| Debugging |  |  |  
| Viewing providers | | | 
| Submit a job to Azure Quantum |  |  |   
| Circuit rendering |  |  |  
| View results |  |  |          

 

## Terminals ????

| Task | Action  | Notes |
|-----------------|-----------|----------------|
| Output for Q# programs |  |  |   
| Debug console for Q# programs |  |  |       


 
## Azure Quantum workspaces ????

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
 
