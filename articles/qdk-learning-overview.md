---
author: azure-quantum-content
description: Learn about interactive QDK Learning courses and how to start a course, move through course content, and track your progress in Visual Studio Code.
ms.date: 09/17/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ["Microsoft", "Microsoft Quantum", "Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "QDK Learning", "Katas", "Quantum Katas", "Ground-State Molecular Energies with QPE", "QPE", "Q#", "Python", "Jupyter", "QDK/Chemistry", "GitHub Copilot", "Copilot", "Copilot Chat", "Grover's algorithm"]
ai-usage: ai-assisted
title: QDK Learning overview
uid: microsoft.quantum.overview.qdk-learning
# Customer intent: As someone interested in quantum computing and the QDK, I want to learn about the courses in QDK Learning.
---

# QDK Learning overview

The Microsoft Quantum Development Kit (QDK) extension for Visual Studio Code (VS Code) includes QDK Learning, a collection of self-paced courses for quantum computing and quantum development. Each course combines explanations with interactive programming activities that you complete in VS Code.

Use QDK Learning to:

- Choose a course based on your interests and experience.
- Work through course units and activities at your own pace.
- Track and save your progress for each course.
- Ask the QDK Learning agent in GitHub Copilot for hints, explanations, and guidance.
- Keep your course code and notebooks.

## Available courses

QDK Learning includes these courses.

| Course | What you learn | Course format |
|--------|----------------|---------------|
| [Quantum Katas](xref:microsoft.quantum.how-to.qdk-learning-katas) | Quantum computing fundamentals and quantum programming with Q# | Guided lessons and Q# coding exercises |
| [Ground-State Molecular Energies with QPE](xref:microsoft.quantum.how-to.qdk-learning-ground-state-energy) | How to estimate the ground-state energy of a molecule from classical chemistry methods and quantum phase estimation (QPE) | Python activities in Jupyter notebooks that use QDK/Chemistry and Q# |

Start with the Quantum Katas if you're new to quantum computing or the Q# language. Choose the quantum chemistry course if you already know the basics of quantum chemistry and quantum computing.

## Prerequisites

To use QDK Learning, you need:

- The latest version of [VS Code](https://code.visualstudio.com/download).
- The [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) for VS Code.
- A folder where QDK Learning can store your course files and progress.

To use AI-assisted learning, sign in to GitHub Copilot in VS Code. Check the prerequisites for each course for additional software requirements.

## Start QDK Learning

To start QDK Learning for the first time, follow these steps.

1. Open VS Code.
1. Open the folder where you want to save your learning progress and course files.
1. On the **Activity Bar**, select the **Microsoft Quantum** icon.
1. In the **QDK Learning** view, select **Start learning**.
1. In the **Learning** view, select **Switch Course** for the course that you want to start. Or, tell the QDK Learning agent what course you want to open.

:::image type="content" source="media/qdk-learning-switch-course-button.png" alt-text="Screenshot of Visual Studio Code that shows the QDK Learning view with the Quantum Katas and Ground-State Molecular Energies with QPE courses. The Switch Courses button is indicated by a yellow box.":::

QDK Learning creates these items in your workspace.

- A `qdk-learning` folder that contains the files you use in the courses.
- A `qdk-learning.json` file that stores your current position and course progress.

To continue your progress in a later VS Code session, open the same workspace folder.

## Move through QDK Learning

The **Learning** view organizes content into three levels:

- **Course:** A full learning experience, like the Quantum Katas or the quantum chemistry course.
- **Unit:** A group of related lessons and exercises.
- **Activity:** An single lesson, example, exercise, or notebook code cell.

Expand a course or unit to see its contents. The progress indicator for each course shows the number of completed units. Completed activities and units have a check mark.

Select a unit or activity to open it. Each course opens activities differently.

- The Quantum Katas open lessons in a **Lesson** tab and exercises in Q# files.
- Notebook courses open an editable Jupyter notebook for the selected unit.

## Switch courses

QDK Learning saves your progress when you switch courses.

1. In the **Learning** view, find the course that you want to open.
1. Select **Switch Course** for the course.

QDK Learning opens your current position in that course. For a new course, QDK Learning opens the first unit.

## Use Copilot to support your learning

When you start QDK Learning, the QDK Learning agent opens in Copilot Chat. The agent uses the context of your active course and activity to help you learn.

Ask the agent to:

- Explain a concept in more detail.
- Give you a hint for an exercise.
- Help you understand why a solution doesn't work.
- Answer questions about quantum computing, Q#, or QDK/Chemistry.

For example, try these prompts.

> What courses are available?

> Take me to the content about Grover's algorithm.

> Explain quantum phase estimation in a different way.

Course activities also include buttons that send the relevant lesson or exercise context to the QDK Learning agent.

## Related content

- [Learn quantum computing and Q# with the Quantum Katas](xref:microsoft.quantum.how-to.qdk-learning-katas)
- [Learn quantum chemistry with QDK Learning](xref:microsoft.quantum.how-to.qdk-learning-ground-state-energy)
