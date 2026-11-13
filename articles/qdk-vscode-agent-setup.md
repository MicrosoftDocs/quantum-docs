---
title: How to set up and use agent mode in VS Code for the QDK
description: This document describes how to set up and use GitHub Copilot agent mode in VS Code to enhance the QDK user experience.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/03/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["Visual Studio Code", "VS Code", "Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "QDK/Chemistry", "Microsoft", "Copilot", "GitHub", "GitHub Copilot", "Azure Quantum", "Q#", "OpenQASM", "Agent Skills", "CLI", "Model Context Protocol", "MCP"]
ai-usage: ai-assisted
uid: microsoft.quantum.how-to.qdk-vscode-agent-setup
# Customer intent: I want to use GitHub Copilot's agent mode in VS Code to help me build my QDK projects.
---

# How to use agent mode in VS Code for the QDK

Use agent mode in Visual Studio Code (VS Code), powered by GitHub Copilot, to improve how you build with the Microsoft Quantum Development Kit (QDK).

Agent mode is an AI-assisted development experience that helps you write code, debug code, and perform other development tasks in VS Code. The QDK extension includes a `SKILL.md` file that GitHub Copilot agent reads to learn Agent Skills for specific tasks related to development in the QDK. The QDK skills help Copilot to perform the following tasks in agent mode:

- Write, debug, and explain Q# and OpenQASM code
- Develop with the `qdk` Python package
- Explain quantum computing concepts
- Give you information about your Azure Quantum jobs and workspaces

For more information about Agent Skills for GitHub Copilot in VS Code, see [Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills) on the VS Code website.

For instructions on the chemistry-specific command-line interface (CLI), Model Context Protocol (MCP) server, and Copilot plugin for QDK/Chemistry workflows, see [Working with AI Assistants](https://microsoft.github.io/qdk-chemistry/user/agents.html).

## Prerequisites

- Install the latest version of [VS Code](https://code.visualstudio.com/download).
- Install the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) in VS Code.

## Set up Agent Skills from the QDK

To use the QDK Agent Skills in agent mode in VS Code, follow these steps:

1. Open a Q# (`.qs`) or OpenQASM (`.qasm`) file in VS Code.
1. Open the Copilot chat window.
1. In the chat box, select the **Set Agent** icon and choose **Agent**.

    :::image type="content" source="media/set-agent-mode-vscode.png" alt-text="Screenshot that shows the Set Agent icon in the Copilot chat box in Visual Studio Code.":::

1. In the chat box, select the **Configure Tools** icon. The **Configure Tools** window opens.

    :::image type="content" source="media/vscode-copilot-configure-tools.png" alt-text="Screenshot that shows the Configure Tools icon in the Copilot chat box in Visual Studio Code.":::

1. Select all the tools in the **Microsoft Quantum Development Kit (QDK)** section, and then select **OK**.

    :::image type="content" source="media/qdk-agent-tools-list.png" alt-text="Screenshot that shows all the QDK tools selected in the Configure Tools window in Visual Studio Code.":::

1. Enter a prompt for the Copilot agent. For example, if your file already has a program, ask what the code does. If your file is empty, ask Copilot to write a teleportation algorithm.

Copilot reads the Agent Skills from the QDK and responds to your prompts with specialized knowledge about the QDK, Azure Quantum, and quantum computing.

## Try different agent models

Copilot lets you choose from different language models in agent mode. Each model has different strengths, so the best model depends on your use case.

To explore different models, select the **Pick Model** icon in the Copilot chat box, and then choose a model from the list.

:::image type="content" source="media/pick-agent-model-vscode.png" alt-text="Screenshot that shows the Pick Model icon in the Copilot chat box in Visual Studio Code.":::

### Try some prompts

Now that you're set up to use AI in your QDK projects, try some prompts in Copilot Chat.

Here are a few example prompts to get started:

> Simulate this program for 1,000 shots and show me a histogram.

> Submit this program to Azure Quantum.

> Add tests for this code.

> Show me my recent jobs on Azure Quantum.

> Hey, I've been meaning to learn a bit about quantum computing but I have no clue where to even start. Can you just help me write a very simple program, understand it, and maybe even run it on a real quantum computer?
