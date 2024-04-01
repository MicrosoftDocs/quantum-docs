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

### [VS Code](#tab/tabid-vscode)

If you want to use Visual Studio Code to visualize quantum circuits, you need:

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/).
- The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension.

### [Python](#tab/tabid-python)

If you want to use Python to visualize quantum circuits, you need:

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest Azure Quantum `qsharp` package.

    ```bash
    python -m pip install --upgrade qsharp 
    ```

### [Jupyter Notebooks](#tab/tabid-notebooks)

If you want to use Jupyter Notebooks to visualize quantum circuits, you need:

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages, and the `ipykernel` package.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets ipykernel
    ```

***

## Quantum circuits with Visual Studio Code

Follow these steps to visualize quantum circuits of Q# programs in Visual Studio Code. For more information about quantum circuit diagram conventions, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

### Circuit diagram from entry point

1. Open a Q# file in Visual Studio Code.
1. To visualize the quantum circuit of the Q# program, select **View -> Command Palette** and type “circuit” which should bring up the **Q#: Show circuit** option. You can also click on **Circuit** from the list of commands below `@EntryPoint()`.

    :::image type="content" source="media/codelens-circuit.png" alt-text="Screenshot the Q# file in Visual Studio Code showing where to find the code lens circuit command.":::

1. The circuit is displayed in the Q# circuit window. For example, the following circuit corresponds to an operation that put a qubit in a superposition and then measures it. The circuit diagram shows one qubit register which it's initialized to the |0⟩ state. Then, a Hadamard gate, **H**, is applied to the qubit, followed by a [measurement operation](xref:microsoft.quantum.concepts.circuits#measurement-operator), which is represented by a meter symbol.

    :::image type="content" source="media/circuit-vscode-randombit.png" alt-text="Screenshot the Q# circuit window showing the resulting circuit diagram for the random bit operation.":::

### Circuit diagram from debugging

When **debugging** a Q# program, you can visualize the quantum circuit based on the current state of the program, even if the program contains a `Result` comparison with an `Unrestricted` target profile. This is because debugging uses the current state of the actual simulator, so the position in the control flow and the result of the measurement are known.

1. Click on the **Debug** button from the list of code lens commands below `@EntryPoint()`.
1. In the **Run and debug** view on the left side, expand the **Quantum Circuit** section under **Variables** pane to show the circuit as you step through the program.
1. Click on **Circuit: See Q# Circuit panel** to open the circuit window.

    :::image type="content" source="media/circuit-codelens-debug.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuit while debugging a program.":::


1. You can step through the code and set breakpoints in various points to see the circuit update as the program is run.

### Circuit diagram from operations

You can visualize the quantum circuit for a single Q# operation. To do this, click on the **Circuit** button in the code lens that appears above the operation declaration.

:::image type="content" source="media/circuit-codelens-operation.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuit for a single Q# operation.":::

## Quantum circuits with Python

You can visualize quantum circuits in Python by using the `qsharp` package. The `qsharp` package provides a set of functions to generate quantum circuits for Q# programs.

1. You can use `qsharp.get_circuit()` to dump the current state of the program in the form of a circuit.




1. If you want to visualize a circuit for a specific entry expression, you can use `qsharp.circuit(entry_expr)` and pass the entry expression as an argument. This method disregards the current state of the runtime and evaluates a quantum program from scratch. For example, the `GHZSample` operation takes an integer `n` and prepares a GHZ state with `n` qubits. Then, you can visualize the circuit for this operation by running the following code.

    ```python
    qsharp.circuit("GHZSample(3)")
    ```

1. If you want to visualize the circuit for a specific operation, you can use `qsharp.circuit(operation)`. For example, the `PrepareCatState` operation prepares a cat state with two qubits. You can visualize the circuit for this operation by running the following code.

    ```python
    qsharp.circuit("PrepareCatState")
    ```

For more information about quantum circuit diagram conventions, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

> [!NOTE]
> When using `qsharp.get_circuit()`, you can visualize the quantum circuit based on the current state of the program, even if the program contains a `Result` comparison with an `Unrestricted` target profile. This is because `qsharp.get_circuit()` uses the current state of the actual simulator, so the position in the control flow and the result of the measurement are known.

## Quantum circuits with Jupyter Notebooks

In Jupyter Notebooks, you can visualize quantum circuits using the `qsharp-widgets` package. This package provides a widget that renders a quantum circuit diagram as an SVG image.

1. In Visual Studio Code, select **View > Command palette** and select **Create: New Jupyter Notebook**.
1. In the first cell of the notebook, run the following code to **import the Q# module**.

    ```python
    import qsharp
    ```

1. **Add a new cell** and enter the Q# code. For example, the following code prepares a Bell State.

    ```qsharp
    %%qsharp
    
    // Prepare a Bell State.
    use register = Qubit[2];
    H(register[0]);
    CNOT(register[0], register[1]);
    ```

1. You can use the `dump_circuit()` function displays a quantum circuit based on the current state of the program. For example, the circuit diagram shows two qubit registers which are initialized to the |0⟩ state. Then, a Hadamard gate, **H**, is applied to the first qubit. After that, a CNOT gate is applied using the first qubit as control, which is represented as a dot, and the second qubit as target, which is represented as an X.

    ```python
    qsharp.dump_circuit()
    ```

    ```output
    q_0    ── H ──── ● ──
    q_1    ───────── X ──
    ```

1. You can visualize quantum circuits as an **SVG image** by using the `qsharp-widgets` package. In this case, the CNOT gate is represented as a line connecting the two qubits, with a dot on the control qubit and a circumscribed cross on the target qubit.

    ```python
    from qsharp_widgets import Circuit
    
    Circuit(qsharp.dump_circuit())
    ```

    :::image type="content" source="media/circuits-jupyter-notebook-bellstate.png" alt-text="Screenshot of a Jupyter Notebook showing how to visualize the circuit for a Q# operation.":::

For more information, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

### Quantum circuits from entry expressions

You can generate a circuit diagram for any program with an **entry expression** by calling `qsharp.circuit()` and passing the entry expression as an argument. 

1. For example, add a new cell and copy the following code, which prepares a GHZ state. 

    ```qsharp
    %%qsharp
    
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Measurement;
    
    operation GHZSample(n: Int) : Result[] {
        use qs = Qubit[n];
    
        H(qs[0]);
        ApplyToEach(CNOT(qs[0], _), qs[1...]);
    
        let results = MeasureEachZ(qs);
        ResetAll(qs);
        return results;
    }
    ```

1. Add a new cell and run the following code to visualize the circuit. For example, prepare a GHZ state with 3 qubits.
   
    ```python
    Circuit(qsharp.circuit("GHZSample(3)"))
    ```

### Quantum circuits from operations with qubits

You can generate circuit diagrams for any **operation that takes qubits** or arrays of qubits. The diagram shows as many wires as there are input qubit, plus any additional qubits that are allocated within the operation. When the operation takes an array of qubits `(Qubit[])`, the circuit shows the array as a register of 2 qubits. 

1. Add a new cell and copy the following example. This code prepares a cat state.

    ```qsharp
    %%qsharp
    
    operation PrepareCatState(register : Qubit[]) : Unit {
        H(register[0]);
        ApplyToEach(CNOT(register[0], _), register[1...]);
    }
    ```

1. Add a new cell and run the following code to visualize the circuit of the `PrepareCatState` operation.

    ```python
    Circuit(qsharp.circuit(operation="PrepareCatState"))
    ```
