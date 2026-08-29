---
author: azure-quantum-content
description: Compare the available options for submitting quantum computing jobs to Azure Quantum.
ms.author: quantumdocwriters
ms.date: 08/25/2026
ms.service: azure-quantum
ms.subservice: core
ms.custom: devx-track-azurecli
ms.topic: overview
title: Submit jobs to Azure Quantum
uid: microsoft.quantum.submit-jobs
no-loc: ["Microsoft Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Azure Quantum", "Q#", "OpenQASM", "Qiskit", "Cirq", "PennyLane", "Python", "Azure CLI", "QIR", target, targets]
# Customer intent: As a quantum developer, I want to understand the available job submission methods so I can choose the method that fits my program and workflow.
---

# How to submit jobs to Azure Quantum

An Azure Quantum job runs a quantum program on a provider target, such as a quantum hardware system or simulator. Use the Microsoft Quantum Development Kit (QDK) to submit jobs interactively from Visual Studio Code (VS Code) or programmatically with Python.

## Before you submit a job

To submit a job, you need:

- An Azure account with an active subscription.
- An Azure Quantum workspace. To create one, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A provider and target in your workspace that accept the input format and Quantum Intermediate Representation (QIR) target profile of your program.

## Compare job submission methods

Choose a method based on how you develop your program and how much control or automation you need.

| Method | Languages and inputs | Use this method when | Consider another method when |
|--------|----------------------|----------------------|------------------------------|
| [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) | Q# and OpenQASM source files | You want an interactive workflow in VS Code with code completion, local simulation, debugging, circuit visualization, and job submission in one interface. | You use a Python quantum framework, need to generate jobs programmatically, or want to automate submissions. |
| [QDK Python package](https://pypi.org/project/qdk/) | Q#, OpenQASM, Qiskit, Cirq, PennyLane, and compiled QIR | You work in a Python script or Jupyter notebook, want framework-native APIs, or need to generate, submit, and process jobs in code. | You only need to submit a Q# or OpenQASM file interactively, or you already have a compiled input file for an automation workflow. |

## Submit jobs with the QDK extension for VS Code

Use the QDK extension when you write Q# or OpenQASM directly in VS Code and want a visual, interactive workflow. The extension can:

- Run and debug your program on a local simulator.
- Display circuit diagrams and result histograms.
- Connect to an Azure Quantum workspace.
- List providers, targets, and submitted jobs.
- Submit the active Q# or OpenQASM program and download the results.

This method is good for exploration and interactive development. You don't need to write connection or submission code.

For instructions, see [Submit jobs with the QDK extension for VS Code](xref:microsoft.quantum.how-to.submit-jobs-vscode).

## Submit jobs with the QDK Python package

Use the QDK Python package when your workflow starts in Python or a Jupyter notebook. The Python package provides:

- The `qdk.azure` module to connect to a workspace and submit jobs.
- Q# and OpenQASM compilation to QIR.
- Job submission APIs for Qiskit and Cirq.
- A QIR submission path for PennyLane programs.
- APIs to inspect job status, and retrieve and visualize results.

This method is good for parameterized experiments, repeated submissions, and application integration.

For instructions, see [Submit jobs with the QDK Python package](xref:microsoft.quantum.how-to.submit-jobs-python).

## Use provider-specific formats

Requirements for job input formats and parameters can vary by provider and target, and can have different job submission workflows. For more information, see [Submit formatted quantum circuits to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.provider).

Use provider-specific formats only when your workflow or target requires them.

## What happens after submission

All submission methods create an Azure Quantum job. The job moves through states such as **Waiting**, **Executing**, and a final state such as **Succeeded**, **Failed**, or **Cancelled**. You can monitor and manage all jobs from VS Code, Python, Azure CLI, or the Azure portal.

For information about job properties and output, see [Work with Azure Quantum jobs](xref:microsoft.quantum.work-with-jobs).

## Related content

- [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace)
- [Azure Quantum computing provider targets](xref:microsoft.quantum.reference.qc-target-list)
- [Quantum computing target profiles](xref:microsoft.quantum.target-profiles)
- [Submit jobs to Azure Quantum with Azure CLI](xref:microsoft.quantum.how-to.submit-jobs-azure-cli)
