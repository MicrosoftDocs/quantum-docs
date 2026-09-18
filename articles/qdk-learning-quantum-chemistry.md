---
author: azure-quantum-content
description: Learn how to set up and use the Ground-State Molecular Energies with QPE notebook course in QDK Learning.
ms.date: 09/17/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["Microsoft", "Azure", "Azure Quantum", "Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "QDK/Chemistry", "QDK Learning", "Visual Studio Code", "VS Code", "GitHub", "GitHub Copilot", "Copilot", "Python", "Jupyter", "Jupyter Notebook", "Q#", "PySCF", "Hartree-Fock", "QPE", "qdk-chemistry", "Ground-State Molecular Energies with QPE"]
ai-usage: ai-assisted
title: Learn quantum chemistry with QDK Learning
uid: microsoft.quantum.how-to.qdk-learning-ground-state-energy
# Customer intent: As a quantum chemistry and quantum computing learner, I want to know how to use the QDK/Chemistry ground state energy course in QDK Learning.
---

# Learn quantum chemistry with QDK Learning

The **Ground-State Molecular Energies with QPE** course in QDK Learning shows how classical computational chemistry and quantum algorithms work together to estimate the ground-state electronic energy of a molecule. The Microsoft Quantum Development Kit (QDK) extension for Visual Studio Code (VS Code) includes QDK Learning.

In this course, you use the QDK for chemistry (QDK/Chemistry) library and quantum phase estimation (QPE) to estimate the energy of a stretched nitrogen molecule. The course uses Python notebooks to build and run Q# circuits on a local QDK simulator.

The course is appropriate for people with introductory knowledge of quantum computing and quantum chemistry.

## What you learn

The course has seven units that guide you through the workflow.

| Unit                                   | What you learn                                                                            |
|----------------------------------------|-------------------------------------------------------------------------------------------|
| **Tutorial Overview**                  | Review the course workflow, required environment, and quantum chemistry background.       |
| **Energy and Accuracy**                | Define the target energy and the accuracy comparisons used in the course.                 |
| **Describing the Molecule**            | Define the stretched nitrogen molecule and construct a Hartree-Fock starting point.       |
| **Choosing the Active Space**          | Select the electrons and molecular orbitals for the correlated model.                     |
| **Mapping the Problem to Qubits**      | Map the active-space Hamiltonian to qubits.                                               |
| **Preparing the Trial State**          | Prepare an approximation of the target ground state.                                      |
| **Iterative Quantum Phase Estimation** | Estimate the energy with iterative QPE and compare the result with a classical reference. |

The course uses a compact molecular model that also has a classical solution. This approach lets you compare each quantum step's output with the corresponding classical result.

## Prerequisites

To work through the quantum chemistry course, you need:

- The latest version of [VS Code](https://code.visualstudio.com/download).
- The [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) for VS Code.
- The [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for VS Code.
- The [Python Environments extension](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-python-envs) for VS Code.
- The [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) for VS Code.
- Python 3.11, 3.12, or 3.13.
- QDK/Chemistry version 2.2.0 or later.
- A folder where QDK Learning can store your notebooks and progress.

To use the AI-assisted learning features, sign in to GitHub Copilot in VS Code.

You don't need an Azure subscription or an Azure Quantum workspace. The course runs locally on the QDK quantum simulators.

## Create a Python environment

The QDK extension includes a command to create a Python virtual environment and install the packages required to run the quantum notebooks in this course. Install the Python Environments extension in VS Code to use the command.

To create the environment, follow these steps:

1. In VS Code, open the folder where you want to complete the course.
1. Select **View** > **Command Palette**.
1. Enter and select **QDK: Create a Microsoft Quantum Python virtual environment**.
1. Keep the default package selections, and select **qdk-chemistry**.
1. Confirm the package selection.

The command creates a virtual environment named `.venv` in the current workspace. If the workspace already has a virtual environment, the command offers to update it.

> [!NOTE]
> The course requires `qdk-chemistry>=2.2.0`. The command installs an appropriate version in the new virtual environment.

:::image type="content" source="media/qdk-chem-create-virtual-environment.png" alt-text="Screenshot of the QDK package list in Visual Studio Code with qdk-chemistry selected.":::

## Start the quantum chemistry course

To start the course, follow these steps:

1. On the **Activity Bar**, select the **Microsoft Quantum** icon.
1. If the workspace isn't set up for QDK Learning, select **Start learning**.
1. In the **Learning** view, find **Ground-State Molecular Energies with QPE** and select the **Switch Course** icon.
1. Expand the course to see its units.
1. Select **Tutorial Overview**.

QDK Learning creates an editable Jupyter notebook and opens it in the Jupyter notebook editor. The QDK attempts to set the notebook kernel to your Python virtual environment for the course.

## Complete a notebook unit

Each unit uses a separate Jupyter notebook. To complete a unit, follow these steps:

1. Run the environment check near the beginning of the notebook. If the check reports missing packages, see [Troubleshoot the Python environment](#troubleshoot-the-python-environment).
1. Read the notebook and run the code cells in order.
1. Complete each exercise in the indicated code cell and run the cell to check your solution.
1. At the end of the notebook, select the link to the next unit or select another unit in the **Learning** view.

The exercise code includes automatic validation. If your solution is correct, the cell runs successfully, and QDK Learning marks the exercise as complete. If your solution is incorrect, the cell output explains that your solution doesn't work.

QDK Learning tracks the code cells that you successfully run, including cells that aren't exercises. The course and unit progress indicators update as you work.

> [!NOTE]
> The final circuit simulation in the **Iterative Quantum Phase Estimation** unit takes longer than the other required examples.

## Get help from Copilot

The quantum chemistry notebooks include actions that send the current cell and course context to the QDK Learning agent.

- For an exercise cell, select **Ask for a Hint** in the cell status bar.

  :::image type="content" source="media/qdk-learning-chemistry-hint.png" alt-text="Screenshot of a Jupyter notebook in VS Code that shows the Hint button in an exercise cell from the QDK Learning ground state molecular energy course.":::

- To learn more about a notebook concept, select **Explain** in the cell toolbar.

  :::image type="content" source="media/qdk-learning-chemistry-explain.png" alt-text="Screenshot of a Jupyter notebook in VS Code that shows the Explain button in an exercise cell from the QDK Learning ground state molecular energy course.":::

- Enter your own question in Copilot Chat while the QDK Learning agent is active.

Try these example prompts:

> Why does the active-space selection affect the number of qubits?

> Give me a hint for this exercise without showing the complete solution.

> Explain how the trial state affects quantum phase estimation.

## Reset a notebook unit

QDK Learning gives you an editable working copy of each notebook. The original course notebook remains available so that you can reset your work.

To reset a unit, follow these steps:

1. In the **Learning** view, open the shortcut menu for the unit that you want to reset.
1. Select **Reset Unit**.
1. In the confirmation message, select **Reset**.

You can select **Reset Unit** on the notebook toolbar instead.

Resetting a unit replaces the working notebook with a new copy, resets the unit's completion status, and deletes all your changes to the notebook.

## Troubleshoot the Python environment

Use the following table to resolve issues with your Python environment.

| Problem | Resolution |
|---------|------------|
| The environment check can't import `qdk_chemistry`. | Run **QDK: Create a Microsoft Quantum Python virtual environment** again. Choose **Update existing environment**, and select **qdk-chemistry**. |
| The notebook uses the wrong Python kernel. | In the notebook toolbar, select the kernel name, and then choose the Python interpreter from the workspace `.venv` environment. |
| VS Code can't open or run the notebook. | Install and enable the Python and Jupyter extensions. |
| The installed QDK/Chemistry version is too old. | Update the workspace environment and confirm that it contains `qdk-chemistry` version 2.2.0 or later. |

For more information about QDK/Chemistry requirements, see [Install QDK for chemistry](install-qdk-chemistry.md).

## Save and resume your progress

QDK Learning stores your editable notebooks in the `qdk-learning/courses` folder and saves your progress in the `qdk-learning.json` file in the workspace root.

To resume the course, follow these steps:

1. Open the same workspace folder.
1. Select the **Microsoft Quantum** icon.
1. Select the unit where you want to continue.

## Related content

- [QDK Learning overview](xref:microsoft.quantum.overview.qdk-learning)
- [Welcome to QDK for chemistry](xref:microsoft.quantum.overview.qdk-chemistry)
- [QDK/Chemistry documentation](https://microsoft.github.io/qdk-chemistry/)
