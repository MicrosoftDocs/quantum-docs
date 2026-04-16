---
author: azure-quantum-content
description: This document describes how to set up and use GitHub Copilot's agent mode in VS Code to enhance the QDK user experience.
ms.author: quantumdocwriters
ms.date: 04/16/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["Visual Studio Code", "VS Code", "Quantum Development Kit", "QDK", "Microsoft", "Copilot", "GitHub", "Q#", "OpenQASM", "Agent Skills"]
title: How to set up and use agent mode in VS Code for the QDK
uid: microsoft.quantum.how-to.qdk-vscode-agent-setup

#Customer intent: I want to use GitHub Copilot's agent mode in VS Code to help me build my QDK projects.
---

# How to use agent mode in VS Code for the QDK

Use agent mode in Visual Studio Code (VS Code), powered by GitHub Copilot, to enhance your builder experience with the Microsoft Quantum Development Kit (QDK).

Agent mode is an AI-assisted development experience that helps you write and debug code, and complete other development tasks in VS Code. The QDK extension includes a `SKILL.md` file that GitHub Copilot agent reads to learn Agent Skills for specific tasks related to development in the QDK. The QDK skills help Copilot to perform the following tasks in agent mode:

- Write, debug, and explain Q# and OpenQASM code
- Develop with the `qdk` Python library
- Explain quantum computing concepts
- Give you information about your Azure Quantum jobs and workspaces

------OLD------
Although you can use agent mode for the QDK without any setup, follow these tips to get the most out of agent mode in your QDK projects:

1. [Add Copilot instructions for Q# and OpenQASM](#add-copilot-instructions-for-q-and-openqasm)
1. [Activate the QDK tools for agent mode](#activate-the-qdk-tools-for-agent-mode)
1. [Try different agent models](#try-different-agent-models)
------OLD------

## Prerequisites

- Install the latest version of [VS Code](https://code.visualstudio.com/download).
- Install the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) in VS Code.

## Set up Agent Skills from the QDK

To get started with the QDK Agent Skills for agent mode in VS Code, follow these steps:

1. Open a Q# (`.qs`) or (`.qasm`) file in VS Code.
1. Open the Copilot Chat window in VS Code.
1. In the chat box, select the **Set Agent** icon and choose **Agent**.

    :::image type="content" source="media/set-agent-mode-vscode.png" alt-text="Screenshot that shows the Set Agent icon in the Copilot chat box in Visual Studio Code.":::

1. In the chat box, select the **Configure Tools** icon. The **Configure Tools** window opens.

    :::image type="content" source="media/vscode-copilot-configure-tools.png" alt-text="Screenshot that shows the Configure Tools icon in the Copilot chat box in Visual Studio Code.":::

1. Select all the tools in the **Microsoft Quantum Development Kit (QDK)** dropdown section, and then select the **OK** button.

    :::image type="content" source="media/qdk-agent-tools-list.png" alt-text="Screenshot that shows the all the QDK tools selected in the Configure Tools window in Visual Studio Code.":::

1. Enter a prompt for Copilot agent. For example, if your file already contains a program, ask what the code does. Or, if your file is empty, tell Copilot to write a teleportation algorithm.

Copilot reads the Agent Skills from the QDK and responds to your prompts with specialized knowledge about the QDK, Azure Quantum, and quantum computing.

## Try different agent models

Copilot lets you choose from a set of different language models to use in agent mode. Different models have different strengths, so the best model for you depends on your use case.

To explore different models, select the **Pick Model** icon in the Copilot chat box and choose one of the available models from the list.

:::image type="content" source="media/pick-agent-model-vscode.png" alt-text="Screenshot that shows the Pick Model icon in the Copilot chat box in Visual Studio Code.":::

### Try some prompts

Now that you're set up to leverage AI in your QDK projects, try out some prompts in the Copilot Chat.

To get started, here are a few example prompts:

> Simulate this program for 1,000 shots and show me a histogram.

> Submit this program to Azure Quantum.

> Add tests for this code.

> Show me my recent jobs on Azure Quantum.

> Hey, I've been meaning to learn a bit about quantum computing but I have no clue where to even start. Can you just help me write a very simple program, understand it, and maybe even run it on a real quantum computer?
