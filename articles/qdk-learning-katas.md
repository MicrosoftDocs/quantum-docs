---
author: azure-quantum-content
description: Learn how to use the Quantum Katas course in QDK Learning to study quantum computing and practice Q# programming.
ms.date: 09/17/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["Microsoft", "Microsoft Quantum", "Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "QDK Learning", "Quantum Katas", "Katas", "kata", "Q#", "GitHub Copilot", "Copilot", "Copilot Chat", "Jupyter", "Grover's algorithm"]
ai-usage: ai-assisted
title: Learn quantum computing and Q# with the Quantum Katas
uid: microsoft.quantum.how-to.qdk-learning-katas
# Customer intent: As someone who wants to learn quantum computing, I want to know how to use the Katas course in QDK Learning to learn about quantum computing and Q#.
---

# Learn quantum computing and Q# with the Quantum Katas

The Quantum Katas in QDK Learning are a self-paced course. QDK Learning is available in The Microsoft Quantum Development Kit (QDK) extension for Visual Studio Code (VS Code). The Katas course teaches quantum computing concepts and programming in Q#. Each kata includes explanations, examples, and coding exercises to help you apply what you learn.

*Kata* means "form" in Japanese and refers to a pattern for learning and practicing new skills.

Work through the Quantum Katas to:

- Learn the fundamentals of quantum computing and Q#.
- Run examples and check your solutions in VS Code.
- Choose the units that match your interests and experience.
- Save your progress and Q# exercise files in your workspace.
- Ask the QDK Learning agent for hints and explanations.

## Prerequisites

To use the Quantum Katas, you need:

- The latest version of [VS Code](https://code.visualstudio.com/download).
- The [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) for VS Code.
- A folder where QDK Learning can store your course files and progress.

To use the AI-assisted learning features, sign in to GitHub Copilot in VS Code.

If you haven't used QDK Learning before, see [QDK Learning overview](xref:microsoft.quantum.overview.qdk-learning).

## Start the Quantum Katas

To start the Quantum Katas, follow these steps.

1. In VS Code, open the folder where you want to save your course files.
1. On the **Activity Bar**, select the **Microsoft Quantum** icon.
1. If the workspace isn't set up for QDK Learning, select **Start learning**.
1. In the **Learning** view, find **Quantum Katas** and then select **Switch Course**.
1. Expand the **Quantum Katas** course.
1. Select **Getting Started** to open the first lesson.

:::image type="content" source="media/qdk-learning-katas-expanded.png" alt-text="Screenshot of Visual Studio Code that shows the expanded Quantum Katas course and its units. A yellow box highlights the Switch Course icon.":::

If you previously started the Quantum Katas in this workspace, QDK Learning returns to your saved position. To continue directly from that position, select **Up next** under the **Quantum Katas** course.

## Go through the Quantum Katas

The Quantum Katas use two main areas in VS Code.

- The **Learning** view shows the course structure and your progress.
- The **Lesson** tab shows the current lesson or exercise and its available actions.

When an activity includes Q# code, QDK Learning also opens a `.qs` file in the editor. Edit and save the file like any other Q# file.

You don't have to complete the units in order. Select any unit in the **Learning** view to go to that unit.

### Work with lessons and examples

Lessons explain quantum computing concepts and can include runnable Q# examples. The available actions depend on the lesson.

| Action      | Description                                                                                     |
|-------------|-------------------------------------------------------------------------------------------------|
| **Next**    | Mark the lesson as complete and go to the next activity.                                        |
| **Run**     | Run the Q# example for the lesson. After the example runs, **Next** becomes the primary action. |
| **Explain** | Ask the QDK Learning agent to explain the current concept in more detail.                       |
| **Back**    | Go to the previous activity.                                                                    |

### Complete coding exercises

Exercise activities open a Q# file with placeholder code. To complete an exercise, follow these steps.

1. Read the exercise instructions in the **Lesson** tab.
1. Complete the code in the `.qs` file.
1. Select **Check** in the **Lesson** tab, or select **Check Solution** above the exercise code.
1. If the solution is correct, select **Next** to continue.

Exercise activities include the following actions.

| Action    | Description                                                                     |
|-----------|---------------------------------------------------------------------------------|
| **Check** | Check your code against the expected result.                                    |
| **Hint**  | Ask the QDK Learning agent for a hint about the current exercise.               |
| **Reset** | Restore the original placeholder code and discard your changes to the exercise. |
| **Back**  | Go to the previous activity.                                                    |

If your solution isn't correct, a **Check failed** message provides more information. Select **What went wrong?** to ask the QDK Learning agent for help without revealing the full solution.

After you complete an exercise, **Next** becomes the primary action. To run the validation again, select **Check**. You can ask Copilot to show alternative solutions to some problems.

## Use Copilot to support your learning

The QDK Learning agent uses your current kata, lesson, and code as context. Use the buttons in the **Lesson** tab or enter your own prompt in Copilot Chat.

For example, try the following prompts.

### Navigate the course

> I'm interested in learning about Grover's algorithm. Take me to the relevant unit.

### Get help with an exercise

> Help me understand why my solution doesn't work, but don't show me the complete answer.

### Explore a concept

> Explain the difference between relative phase and global phase.

## Save and reset your progress

QDK Learning automatically saves your place in the course and completed activities in the `qdk-learning.json` file at the root of your workspace. QDK Learning saves the Q# files that you edit in the `qdk-learning` folder.

To continue later:

1. In Visual Studio Code, open the same workspace folder.
1. Select the **Microsoft Quantum** icon.
1. Expand the **Learning** view and then the **Quantum Katas** course.
1. Select **Up next** to return to your current activity.

To reset an individual exercise:

1. Select **Reset** in the **Lesson** tab or **Reset Exercise** in the Q# code editor.
1. Confirm the reset. QDK Learning replaces your code.

You can also ask Copilot to reset a lesson for you.

## Next steps

- [QDK Learning overview](xref:microsoft.quantum.overview.qdk-learning)
- [Learn quantum chemistry with QDK Learning](xref:microsoft.quantum.how-to.qdk-learning-ground-state-energy)
- [Introduction to Q#](xref:microsoft.quantum.qsharp-overview)
- [Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart)
