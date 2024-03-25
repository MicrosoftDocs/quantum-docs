---
author: SoniaLopezBravo
description: Learn how to how to visually represent quantum algorithms with quantum circuit diagrams using VS Code, Python, and Jupyter Notebooks.
ms.date: 03/22/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Visualize Quantum Circuits with Q#
uid: microsoft.quantum.how-to.visualize-circuits
---

# Visualize quantum circuit diagrams with Q#

Quantum circuit diagrams are a visual representation of quantum operations. They show the flow of qubits through the quantum program, including the gates and measurements applied to them.

In this article, you'll learn how to visually represent quantum algorithms with quantum circuit diagrams using Visual Studio Code, Python, and Jupyter Notebooks.

For more information about quantum circuit diagram conventions, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).


> [!NOTE]
> If the target profile is `Unrestricted`, you can visualize quantum circuits for any Q# program as long as it isn’t comparing any `Result` values. If the target profile is `Base Profile`, there're no restrictions on the Q# program.

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

1. Open a Q# file in Visual Studio Code. 
1. Select **View -> Command Palette** and type “circuit” which should bring up the **Q#: Show circuit** option. You can also click on **Circuit** from the list of commands below `@EntryPoint()`.

    :::image type="content" source="media/codelens-circuit.png" alt-text="Screenshot the Q# file in Visual Studio Code showing where to find the code lens circuit command.":::

1. The circuit is displayed in the Q# circuit window. For example, the following circuit corresponds to an operation that put a qubit in a superposition and then measures it. The circuit diagram shows one qubit register which it's initialized to the |0⟩ state. Then, a Hadamard gate, **H**, is applied to the qubit, followed by a [measurement operation](xref:microsoft.quantum.concepts.circuits#measurement-operator), which is represented by a meter symbol.

    :::image type="content" source="media/circuit-vscode-randombit.png" alt-text="Screenshot the Q# circuit window showing the resulting circuit diagram for the random bit operation.":::

1. When **debugging** a Q# program, you can visualize the quantum circuit based on the current state of the program, even if the program contains a `Result` comparison with an `Unrestricted` target profile. This is because debugging uses the current state of the actual simulator, so the position in the control flow and the result of the measurement are known.

For more information about quantum circuit diagram conventions, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

## Quantum circuits with Python

In Python, there're three distinct ways of generating a circuit: 

- You can use `qsharp.circuit(entry_expr)` to generate a circuit for a given entry expression. This method disregards the current state of the runtime and evaluates a quantum program from scratch.
- You can use `qsharp.circuit(operation)` to generate a circuit for a given operation.
- You can use `qsharp.get_circuit()` to dump the current state of the program in the form of a circuit. When using `qsharp.get_circuit()`, you can visualize the quantum circuit based on the current state of the program, even if the program contains a `Result` comparison with an `Unrestricted` target profile. This is because `qsharp.get_circuit()` uses the current state of the actual simulator, so the position in the control flow and the result of the measurement are known.

## Quantum circuits with Jupyter Notebooks

In a Jupyter Notebook, you can visualize quantum circuits by using the `qsharp widget` package.

1. 
***
