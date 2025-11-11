---
author: azure-quantum-content
description: Learn how to how to visually represent quantum algorithms with quantum circuit diagrams using VS Code, Python, and Jupyter Notebooks.
ms.date: 10/23/2024
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["Azure Quantum Development Kit", "Quantum Development Kit", "QDK", "Azure Quantum", "Visual Studio Code", "VS Code", "qdk", "azure-quantum", "qdk[azure]"]
title: Visualize Quantum Circuits with Q#
uid: microsoft.quantum.how-to.visualize-circuits
#customer intent: As a quantum programmer, I want to visually represent my quantum algorithms.
---

# How to visualize quantum circuit diagrams with Q#

Quantum circuit diagrams are a visual representation of quantum operations. Circuit diagrams show the flow of qubits through the quantum program, including the gates and measurements that are applied to the qubits.

In this article, you learn how to visually represent quantum algorithms with quantum circuit diagrams in Visual Studio Code (VS Code) and Jupyter Notebook.

For more information about quantum circuit diagrams, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

### VS Code

- The latest version of [VS Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/).
- The latest version of the [Azure Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).
- The latest `qdk` Python library with the optional `azure` extra.

    ```bash
    python -m pip install --upgrade qdk[azure]
    ```

### Jupyter Notebook

- The latest version of [VS Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest `qdk` Python library with the optional `jupyter` extra, and the `ipykernel` package.

    ```bash
    python -m pip install --upgrade qdk[jupyter] ipykernel
    ```

## Quantum circuits with VS Code

To visualize quantum circuits of Q# programs in VS Code, complete the following steps.

For more information about quantum circuit diagrams, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

### View circuit diagrams for a Q# program

1. Open a Q# file in VS Code, or [load one of the quantum samples](xref:microsoft.quantum.submit-jobs#load-a-q-sample-program).
1. Open the **View** menu and choose **Command Palette**.
1. Enter **circuit** to bring up the **QDK: Show circuit** command. Or, choose the **Circuit** code lens from the list of commands above your entry point operation.

    :::image type="content" source="media/codelens-circuit.png" alt-text="Screenshot the Q# file in Visual Studio Code showing where to find the code lens circuit command.":::

The circuit is displayed in the Q# circuit window. For example, the following circuit corresponds to an operation that puts a qubit in a superposition state and then measures the qubit. The circuit diagram shows one qubit register that's initialized to the $\ket{0}$ state. Then, a Hadamard gate is applied to the qubit, followed by a [measurement operation](xref:microsoft.quantum.concepts.circuits#measurement-operator), which is represented by a meter symbol.

:::image type="content" source="media/circuit-vscode-randombit.png" alt-text="Screenshot the Q# circuit window showing the resulting circuit diagram for the random bit operation.":::

### View circuit diagrams for operations

To visualize the quantum circuit for a single Q# operation, choose the **Circuit** code lens above the operation declaration.

:::image type="content" source="media/circuit-codelens-operation.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuits in the Q# circuits pane after debugging the program.":::

### View circuit diagrams when you're debugging

When you use the VS Code debugger in a Q# program, you can visualize the quantum circuit based on the current state of the program.

1. Choose the **Debug** command from the code lens above your entry point operation.
1. In the **Run and Debug** pane, expand the **Quantum Circuit** dropdown in the **VARIABLES** menu to show the circuit while you step through the program.

    :::image type="content" source="media/circuit-codelens-debug.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuit while debugging a program." lightbox="media/circuit-codelens-debug.png":::

1. Set breakpoints and step through your code to see how the circuit updates as your program runs.
1. The current quantum circuit is shown in the **QDK Circuit** panel. This circuit diagram represents the current state of the simulator, which is the gates that have been applied up until the current point in your program.

    :::image type="content" source="media/codelens-circuits-bellstates.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuit for a single Q# operation." lightbox="media/codelens-circuits-bellstates.png":::

## Quantum circuits in Jupyter Notebook

In Jupyter Notebook, you can visualize quantum circuits with the `qdk.qsharp` and `qdk.widgets` packages. The `widgets` package provides a widget that renders a quantum circuit diagram as an SVG image.

### View circuit diagrams for an entry expression

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**.
1. In the first cell of the notebook, run the following code to import the `qsharp` package.

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

1. To display a simple quantum circuit based on the current state of your program, pass an entry point expression to the `qsharp.circuit` function. For example, the circuit diagram of the preceding code shows two qubit registers that are initialized to the $\ket{0}$ state. Then, a Hadamard gate is applied to the first qubit. Finally, a CNOT gate is applied where the first qubit is the control, represented by a dot, and the second qubit is the target, represented by an X.

    ```python
    qsharp.circuit("BellState()")
    ```

    ```output
    q_0    ── H ──── ● ──
    q_1    ───────── X ──
    ```

1. To visualize a quantum circuit as an SVG image, use the `widgets` package. Create a new cell, then run the following code to visualize the circuit that you created in the previous cell.

    ```python
    from qdk.widgets import Circuit
    
    Circuit(qsharp.circuit("PrepareBellState()"))
    ```

    :::image type="content" source="media/circuits-jupyter-notebook-bellstate.png" alt-text="Screenshot of a Jupyter Notebook that shows how to visualize the circuit for a Q# operation.":::

### View circuit diagrams for operations with qubits

You can generate circuit diagrams of operations that take qubits, or arrays of qubits, as input. The diagram shows a wire for each input qubit, along with wires for additional qubits that you allocate within the operation. When the operation takes an array of qubits `(Qubit[])`, the circuit shows the array as a register of 2 qubits.

1. Add a new cell, and then copy and run the following Q# code. This code prepares a cat state.

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

## Conditions that affect circuit diagrams

When you visualize quantum circuits, the following conditions can affect the appearance of your circuit diagrams.

### Dynamic circuits

Circuit diagrams are generated by executing the classical logic within a Q# program and keeping track of all allocated and applied gates. Loops and conditionals are supported as long as they deal only with classical values.

However, programs that contain loops and conditional expressions that use qubit measurement results are trickier to represent with a circuit diagram. For example, consider the following expression:

```qsharp
if (M(q) == One) {
   X(q)
}
```

This expression can't be represented with a straightforward circuit diagram because the gates are conditional on a measurement result. Circuits with gates that depend on measurement results are called dynamic circuits.

You can generate diagrams for dynamic circuits by running the program in the quantum simulator, and tracing the gates as they're applied. This is called trace mode, because the qubits and gates are traced as the simulation is performed.

The downside of traced circuits is that they only capture the measurement outcome and the consequent gate applications for a single simulation. In the above example, if the measurement outcome is `Zero`, then the `X` gate isn't in the diagram. If you run the simulation again, then you might get a different circuit.

### Target profile

The QIR target profile that you select affects how circuit diagrams are generated. Target profiles are used to specify the capabilities of the target hardware, and the restrictions that are imposed on the quantum program.

When the target profile is set to **Unrestricted**, **Adaptive RI**, or **Adaptive RIF**, the circuit diagrams show the quantum operations that are invoked in the Q# program. When the target profile is set to **Base**, the circuit diagrams show the quantum operations that would be run on hardware if the program is submitted to Azure Quantum with this target profile.

> [!NOTE]
> You can choose from four target profiles: `Base`, `Unrestricted`, `Adaptive_RI`, and `Adaptive_RIF`. If you don't specify a target profile, then the Q# compiler automatically sets an appropriate target profile for you. To manually set a target profile, pass the target profile name as an argument to `@Entrypoint()`. For example, `@Entrypoint(Unrestricted)` sets the target profile to **Unrestricted**.

Specifically, gate decompositions are applied such that the resulting circuit is compatible with the capabilities of the target hardware. These decompositions are the same ones that get applied during code generation and submission to Azure Quantum.

1. For example, consider the following Q# program that measures a single qubit and an array of qubits.

    ```qsharp
    import Std.Measurement.*;

    operation Main() : (Result, Result[]) {
        // The `M` operation performs a measurement of a single qubit in the
        // computational basis, also known as the Pauli Z basis.
        use q = Qubit();
        let result = M(q);
        Reset(q);

        // The `MeasureEachZ` operation measures each qubit in an array in the
        // computational basis and returns an array of `Result` values.
        use qs = Qubit[2];
        let results = MeasureEachZ(qs);

        return (result, results);
    }
    ```

1. When the target profile is set to **Unrestricted**, **Adaptive RI**, or **Adaptive RIF**, the gates in the circuit diagram correspond exactly to the quantum operations that are invoked in the Q# program.

    :::image type="content" source="media/circuits-target-unrestricted.png" alt-text="Screenshot of quantum circuits when target profile is Unrestricted." lightbox="media/circuits-target-unrestricted.png":::

1. When the target profile is set to **Base**, the circuit looks different. Because **Base** profile targets don't allow qubit reuse after measurement, the measurement is now performed on an entangled qubit instead. The `Reset` operation isn't a supported gate in the **Base** profile, so the operation is dropped. The resulting circuit matches what would be run on hardware if this program is submitted to Azure Quantum with this target profile.

    :::image type="content" source="media/circuits-target-base.png" alt-text="Screenshot of quantum circuits when the target profile is set to base." lightbox="media/circuits-target-base.png":::
