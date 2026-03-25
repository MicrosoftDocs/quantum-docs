---
author: azure-quantum-content
description: Learn how to visually represent Q# and OpenQASM quantum algorithms with circuit diagrams in VS Code, Python, and Jupyter Notebook.
ms.date: 12/08/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["Microsoft Quantum Development Kit", "Quantum Development Kit", "QDK", "Azure Quantum", "Visual Studio Code", "VS Code", "qdk", "azure-quantum", "qdk[jupyter]", "Jupyter", "Jupyter Notebook"]
title: Visualize Quantum Circuits with the QDK
uid: microsoft.quantum.how-to.visualize-circuits
#customer intent: As a quantum programmer, I want to visually represent my quantum algorithms as circuit diagrams.
---

# How to visualize quantum circuit diagrams with the QDK

Quantum circuit diagrams are a visual representation of quantum algorithms. Circuit diagrams show the flow of qubits through a quantum program, including the gates and measurements that the program applies to the qubits.

In this article, you learn how to create circuit diagrams for Q# and OpenQASM programs with the Microsoft Quantum Development Kit (QDK) using Visual Studio Code (VS Code) and Jupyter Notebook.

For more information about quantum circuit diagrams, see [Quantum circuit diagram conventions](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

- The latest version of [VS Code](https://code.visualstudio.com/download), or open [VS Code for the Web](https://vscode.dev/).
- The latest version of the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) installed in VS Code.
- The latest version of the `qdk` Python library with the `jupyter` extra.

    ```bash
    python -m pip install --upgrade "qdk[jupyter]"
    ```

## Visualize quantum circuits in VS Code

With the QDK extension in VS Code, you can create circuit diagrams for Q# (`.qs`) and OpenQASM (`.qasm`) files.

To view a circuit diagram in VS Code, follow these steps:

1. Open a Q# or OpenQASM file in VS Code, or [load one of the quantum samples from the QDK](xref:microsoft.quantum.submit-jobs#load-a-q-sample-program).
1. Choose the **Circuit** command from the code lens that precedes your program.

    :::image type="content" source="media/codelens-circuit.png" alt-text="Screenshot of a Q# file in Visual Studio Code that shows where to find the code lens circuit command.":::

The **QDK Circuit** window opens and displays the circuit diagram for your program. For example, the following Q# circuit corresponds to a program that puts a qubit in a superposition state and then measures the qubit. The circuit diagram has one qubit that starts in the $\ket{0}$ state. A Hadamard gate is applied to the qubit, followed by a [measurement operation](xref:microsoft.quantum.concepts.circuits#measurement-operator), which is represented by a meter symbol. In this case, the measurement result is zero.

:::image type="content" source="media/circuit-vscode-randombit.png" alt-text="Screenshot of the QDK Circuit window that shows the circuit diagram for a random bit program.":::

> [!TIP]
> Select an element in the circuit diagram to highlight the code that creates the circuit element.

### View circuit diagrams for individual Q# operations [ENTIRE PROGRAM VS INDIVIDUAL OPERATIONS]

To visualize the quantum circuit for an individual operation in a Q# file, choose the **Circuit** command from the code lens that precedes the operation.

:::image type="content" source="media/circuit-codelens-operation.png" alt-text="Screenshot of Visual Studio Code that shows how to visualize the circuit of a single Q# operation in a Q# program.":::

### View circuit diagrams when you're debugging

When you use the VS Code debugger in a Q# program, you can visualize the quantum circuit based on the state of the program at the current debugger breakpoint.

1. Choose the **Debug** command from the code lens that precedes your entry point operation.
1. In the **Run and Debug** pane, expand the **Quantum Circuit** dropdown in the **VARIABLES** menu. The **QDK Circuit** panel opens, which shows the circuit while you step through the program.
1. Set breakpoints and step through your code to see how the circuit updates as your program runs.

## Quantum circuits in Jupyter Notebook

In Jupyter Notebook, you can visualize quantum circuits for Q# and OpenQASM prgorams with the `qdk.qsharp` and `qdk.widgets` Python modules. The `widgets` module provides a widget that renders a quantum circuit diagram as an SVG image.

### View circuit diagrams for Q# programs

To view a circuit diagram for a Q# program in Jupyter Notebook, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of the notebook, run the following code to import the `qsharp` module.

    ```python
    from qdk import qsharp
    ```

1. Create a new cell and enter your Q# code. For example, the following code prepares a Bell State:

    ```qsharp
    %%qsharp
    
    // Prepare a Bell State.
    operation BellState() : Unit {
        use register = Qubit[2];
        H(register[0]);
        CNOT(register[0], register[1]);
    }
    ```

1. To display a quantum circuit diagram, pass the Q# operation to the `qsharp.circuit` function. Run the following code in a new cell:

    ```python
    qsharp.circuit("BellState()")
    ```

    The output looks like this:

    ```output
    q_0    ── H ──── ● ──
    q_1    ───────── X ──
    ```

1. To render an SVG image of the quantum circuit, use the `widgets` module. Create a new cell, then run the following code to visualize the same circuit that you created in the previous cell.

    ```python
    from qdk.widgets import Circuit
    
    Circuit(qsharp.circuit("BellState()"))
    ```

    The circuit diagram looks like this:

    :::image type="content" source="media/circuits-jupyter-notebook-bellstate.png" alt-text="Screenshot of a Jupyter Notebook that shows how to visualize the circuit for a Q# program.":::

#### View circuit diagrams for operations that take qubits as input

In the previous Bell state example, the operation `BellState` doesn't take qubits as input. If the operation takes qubits or qubit arrays as input, then you must omit the parentheses when you pass the operation to draw circuit diagrams.

For example, follow these steps to draw circuit diagrams for an operation that takes qubits:

1. In a new cell, run the following Q# code. This code prepares a cat state.

    ```qsharp
    %%qsharp
    
    operation PrepareCatState(register : Qubit[]) : Unit {
        H(register[0]);
        ApplyToEach(CNOT(register[0], _), register[1...]);
    }
    ```

1. To draw the circuit as a text diagram, run the following code:

    ```python
    Circuit(qsharp.circuit(operation="PrepareCatState"))
    ```

1. To render the circuit diagram as an SVG image, run the following code:

    ```python
    Circuit(qsharp.circuit(operation="PrepareCatState"))
    ```

When the operation takes an array of qubits `(Qubit[])`, the circuit shows the array as a register of two qubits.

### View circuit diagrams for OpenQASM programs

To view a circuit diagram for an OpenQASM program in Jupyter Notebook, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of the notebook, run the following code to import the necessary objects to create and call OpenQASM functions with the QDK Python library:

    ```python
    from qsharp.openqasm import import_openqasm, ProgramType
    ```

1. In a new cell, write your OpenQASM program in a Python string pass the string to the `import_openqasm` function. To call the program in your Python code, give the function a name and set `program_type` to `ProgramType.File`.

    ```python
    source = """
        include "stdgates.inc";
        bit[2] c;
        qubit[2] q;
        h q[0];
        cx q[0], q[1];
        c = measure q;
    """

    import_openqasm(source, name="bell", program_type=ProgramType.File)
    ```

1. In a new cell, import the OpenQASM program as a Python function and call the program to get the measurement results.

    ```python
    from qsharp.code.qasm_import import bell

    bell()
    ```

1. To draw the circuit as a text diagram, run the following code in a new cell:

    ```python
    from qdk.qsharp import circuit

    circuit(bell)
    ```

    The output looks like this:

    ```output
    q_0    ── H ──── ● ──── M ──
                 │      ╘═══
    q_1    ───────── X ──── M ──
                        ╘═══
    ```

1. To render the circuit diagram as an SVG image, run the following code in a new cell:

    ```python
    from qsharp_widgets import Circuit

    Circuit(qsharp.circuit(bell))
    ```

    The circuit diagram looks like this:

    :::image type="content" source="media/circuits-jupyter-openqasm-bellstate.png" alt-text="Screenshot of a Jupyter Notebook that shows how to visualize the circuit for an OpenQASM program.":::
