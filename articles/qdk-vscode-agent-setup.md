---
author: azure-quantum-content
description: This document describes how to set up and use GitHub Copilot's agent mode in VS Code to enhance the Quantum Development Kit user experience.
ms.author: quantumdocwriters
ms.date: 06/12/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['VS Code', 'Quantum Development Kid', 'QDK', 'GitHub', 'Copilot', 'Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: How to set up and use agent mode in VS Code for the Quantum Development Kit
uid: microsoft.quantum.how-to.qdk-vscode-agent-setup

#Customer intent: I want to use GitHub Copilot's agent mode in VS Code to help me build my Quantum Development Kit projects.
---

# Set up agent mode in VS Code for the Quantum Development Kit

Use agent mode in VS Code, powered by GitHub Copilot, to enhance your builder experience with The Quantum Development Kit (QDK) extension.

Agent mode is an AI-assisted development experience that helps you write and debug code, and complete other development tasks in VS Code. Although you can use agent mode for the QDK without any setup, follow these tips to get the most out of agent mode in your QDK projects:

1. [Add Copilot instructions for Q# and OpenQASM](#add-copilot-instructions-for-q-and-openqasm)
2. [Activate the QDK tools for agent mode](#activate-the-qdk-tools-for-agent-mode)
3. [Try different agent models](#try-different-agent-models)

## Add Copilot instructions for Q# and OpenQASM

The QDK comes with a set of instructions for Copilot that include best practices for building projects with Q#, OpenQASM, and Azure Quantum.

To add the QDK Copilot instructions to your settings, follow these steps:

1. Press **Ctrl+Shift+P** to open the command palette.
1. Enter and choose **QDK: Add Copilot instructions file for Q# and OpenQASM**.
1. In the confirmation box that opens, choose **Yes**.

The QDK instructions are added to your context when you use GitHub Copilot Chat in Q# and OpenQASM files. You can manually configure this setting in `chat.instructionsFilesLocations`.

## Activate the QDK tools for agent mode

The QDK extension includes a set of tools that tailors Copilot Chat to work with Q# and Azure Quantum. For example, you can simulate Q# code, visualize quantum circuit diagrams, and perform resource estimation directly from the Copilot Chat view. You can also do things like connect to your Azure Quantum workspace, submit jobs, and view job status and job results.

To activate the QDK tools for agent mode, follow these steps:

1. Open Copilot Chat in VS Code.
1. If the chat is in **Ask** mode or **Edit** mode, then select the mode dropdown at the bottom of the chat input box and choose **Agent**.
1. Select the Tools icon at the bottom of the chat input box.

A list pops up that contains all your available agent tools. Select all the tools under **Azure Quantum Development Kit (QDK)** to activate the QDK tools.

:::image type="content" source="media\qdk-agent-tools-list.png" alt-text="Screenshot of the list of available QDK tools for agent mode in VS Code.":::

## Try different agent models

Copilot lets you choose from a set of different language models to use in agent mode. Different models have different strengths, so the best model for you depends on your use case.

To explore different models, select the model dropdown menu at the bottom of the chat input box and choose one of the available models from the list.

### Try some prompts

Now that you're set up to leverage AI in your Q# projects, try out some prompts in the Copilot Chat.

To get started, here are a few example prompts:

> Simulate this program for 1,000 shots and show me a histogram.
> Submit this Q# program to Azure Quantum.
> Add tests for this Q# code.
> Show me my recent jobs on Azure Quantum.
> Hey, I've been meaning to learn a bit about quantum computing but I have no clue where to even start. Can you just help me write a very simple program, understand it, and maybe even run it on a real quantum computer?