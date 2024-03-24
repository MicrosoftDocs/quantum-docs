---
author: SoniaLopezBravo
description: Learn how to how to visually represent quantum operations with quantum circuit diagrams. 
ms.date: 03/22/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Visualize Quantum Circuits with Q#
uid: microsoft.quantum.how-to.visualize-circuits
---

# How to represent quantum circuit diagrams

Quantum circuit diagrams are a visual representation of quantum operations. They show the flow of qubits through the quantum program, including the gates and measurements applied to them.


For more information about quantum circuit diagram conventions, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).



> [!TIP]
> Check out [quantum-viz.js](https://github.com/microsoft/quantum-viz.js/), a configurable tool for rendering quantum circuits. You can integrate the library *quantum-viz.js* (or *qviz*) into any project. It aims to be easily configurable while allowing complex user interactions, such as toggling between different measurement outcomes.

## Prerequisites

If you want to use Visual Studio Code to visualize quantum circuits, you need:

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/).
- The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension.

If you want to use Python to visualize quantum circuits, you need:

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest Azure Quantum `qsharp` package.

    ```bash
    python -m pip install --upgrade qsharp 
    ```

If you want to use Jupyter Notebooks to visualize quantum circuits, you need:

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets 
    ```

## Quantum circuits with Visual Studio Code


- If the target profile is *Base Profile*, quantum circuits can be generated for any Q# program.
- If the target profile is *Unrestricted*, quantum circuits can be generated as long as the program isn’t comparing any `Result` values.

1. Select **View -> Command Palette** and type “circuit” which should bring up the **Q#: Show circuit** option. You can also click on **Circuit** from the list of commands below `@EntryPoint()`.

    :::image type="content" source="../media/codelens-circuit.png" alt-text="Screenshot the Q# file in Visual Studio Code showing where to find the code lens circuit command.":::

1. The circuit is displayed in the Q# circuit window. For more information about quantum circuit diagram conventions, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

    :::image type="content" source="../media/circuit-vscode-randombit.png" alt-text="Screenshot the Q# circuit window showing the resulting circuit diagram for the random bit operation.":::



## Quantum circuits with Python

In Python, there are three distinct ways of generating a circuit: 

1. You can use `qsharp.circuit(entry_expr)` to generate a circuit for a given entry expression. This method disregards the current state of the runtime and evaluates a quantum program from scratch.
1. You can use `qsharp.circuit(operation)` to generate a circuit for a given operation.
1. You can use `qsharp.get_circuit()` to dump the current state of the program in the form of a circuit. This method it doesn’t run the code from scratch.



## Quantum circuits with Jupyter Notebooks

In a Jupyter Notebook, you can visualize quantum circuits by using the `qsharp widget` package. 

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets 
    ```

***
