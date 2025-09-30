---
author: azure-quantum-content
description: Learn how to how to visually represent quantum algorithms with quantum circuit diagrams using VS Code, Python, and Jupyter Notebooks.
ms.date: 10/23/2024
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Visualize Quantum Circuits with Q#
uid: microsoft.quantum.how-to.visualize-circuits
#customer intent: As a quantum programmer, I want to visually represent my quantum algorithms.
---

# How to visualize quantum circuit diagrams with Q#

Quantum circuit diagrams are a visual representation of quantum operations. They show the flow of qubits through the quantum program, including the gates and measurements applied to them.

In this article, you'll learn how to visually represent quantum algorithms with quantum circuit diagrams using Visual Studio Code or Jupyter Notebooks.

For more information about quantum circuit diagram conventions, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

**VS Code**

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/).
- The latest version of the [Azure Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).
- The latest Azure Quantum `qsharp` and `azure-quantum` Python packages.

    ```bash
    python -m pip install --upgrade qsharp azure-quantum
    ```

**Jupyter Notebooks**

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages, and the `ipykernel` package.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets ipykernel
    ```

## Quantum circuits with Visual Studio Code

Follow these steps to visualize quantum circuits of Q# programs in Visual Studio Code. For more information about quantum circuit diagram conventions, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

### Viewing circuit diagrams for a Q# program

1. Open a Q# file in Visual Studio Code, or [load one of the quantum samples](xref:microsoft.quantum.submit-jobs#load-a-q-sample-program).
1. To visualize the quantum circuit of the Q# program, select **View -> Command Palette** and enter **circuit** to bring up the **QDK: Show circuit** command. You can also click on **Circuit** from the list of commands preceding `Main()`.

    :::image type="content" source="media/codelens-circuit.png" alt-text="Screenshot the Q# file in Visual Studio Code showing where to find the code lens circuit command.":::

1. The circuit is displayed in the Q# circuit window. For example, the following circuit corresponds to an operation that put a qubit in a superposition and then measures it. The circuit diagram shows one qubit register which it's initialized to the |0⟩ state. Then, a Hadamard gate, **H**, is applied to the qubit, followed by a [measurement operation](xref:microsoft.quantum.concepts.circuits#measurement-operator), which is represented by a meter symbol.

    :::image type="content" source="media/circuit-vscode-randombit.png" alt-text="Screenshot the Q# circuit window showing the resulting circuit diagram for the random bit operation.":::

### Viewing circuit diagrams for operations

You can visualize the quantum circuit for a single Q# operation. To do this, click on the **Circuit** button in the code lens that appears above the operation declaration.

:::image type="content" source="media/circuit-codelens-operation.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuits in the Q# circuits pane after debugging the program.":::

### Viewing circuit diagrams when debugging

When **debugging** a Q# program, you can visualize the quantum circuit based on the current state of the program.

1. Select the **Debug** button from the list of code lens commands preceding `Main()`.
1. In the **Run and debug** view on the left side, expand the **Quantum Circuit** section under **Variables** pane to show the circuit as you step through the program.

    :::image type="content" source="media/circuit-codelens-debug.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuit while debugging a program." lightbox="media/circuit-codelens-debug.png":::


1. You can step through the code and set breakpoints in various points to see the circuit update as the program is run. 
1. The current quantum circuit is shown in the **Q# Circuit panel**. This circuit diagram represents the current state of the simulator, that is, the gates that have been applied up until the current point of execution.


    :::image type="content" source="media/codelens-circuits-bellstates.png" alt-text="Screenshot of Visual Studio Code showing how to visualize the circuit for a single Q# operation." lightbox="media/codelens-circuits-bellstates.png":::


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

1. You can use the `dump_circuit()` function to display a quantum circuit based on the current state of the program. For example, the circuit diagram shows two qubit registers which are initialized to the |0⟩ state. Then, a Hadamard gate, **H**, is applied to the first qubit. After that, a CNOT gate is applied using the first qubit as control, which is represented as a dot, and the second qubit as target, which is represented as an X.

    ```python
    qsharp.dump_circuit()
    ```

    ```output
    q_0    ── H ──── ● ──
    q_1    ───────── X ──
    ```

1. You can visualize quantum circuits as an **SVG image** by using the `qsharp-widgets` package. In this case, the CNOT gate is represented as a line connecting the two qubits, with a dot on the control qubit and a circumscribed cross on the target qubit. For more information, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).

    ```python
    from qsharp_widgets import Circuit
    
    Circuit(qsharp.dump_circuit())
    ```

    :::image type="content" source="media/circuits-jupyter-notebook-bellstate.png" alt-text="Screenshot of a Jupyter Notebook showing how to visualize the circuit for a Q# operation.":::

### Viewing circuit diagrams for an entry expression

You can generate a circuit diagram for any program with an **entry expression** by calling `qsharp.circuit()` and passing the entry expression as an argument. 

1. For example, add a new cell and copy the following code, which prepares a GHZ state. 

    ```qsharp
    %%qsharp
    
    import Std.Diagnostics.*;
    import Std.Measurement.*;
    
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

### Viewing circuit diagrams for operations with qubits

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

## Conditions that affect circuit diagrams

When visualizing quantum circuits, the following conditions can affect the visualization of the circuit diagram.

### Dynamic circuits

Circuit diagrams are generated by executing all the classical logic within a Q# program and keeping track of any qubits that have been allocated or gates that have been applied. Loops and conditionals are supported as long as they only deal with classical values.

However, programs that contain loops and conditional expressions that use qubit measurement results are trickier to represent with a circuit diagram. For example, an expression like the following

```qsharp
if (M(q) == One) {
   X(q)
}
```

cannot be represented with a straightforward circuit diagram, since the gates are conditional on a measurement result. Such a circuit is called a _dynamic_ circuit.

Circuit diagrams can be generated for dynamic circuits by running the program in the quantum simulator, and tracing the gates as they are applied. This is called _trace_ mode, as the qubits and gates are being traced as simulation is being performed.

The downside of traced circuits is that they only capture the measurement outcome, and the consequent gate applications, for a single simulation. In the above example, if the measurement outcome is `Zero`, you don't see the `X` gate in the diagram. Another run of the simulation may show a slightly different circuit.

### Target profile

The currently selected target profile influences how circuit diagrams are generated. Target profiles are used to specify the capabilities of the target hardware, and the restrictions that are imposed on the quantum program.

When the target profile is set to **Unrestricted**, **Adaptive RI**, or **Adaptive RIF**, the circuit diagrams show the quantum operations that are invoked in the Q# program. When the target profile is set to **Base**, the circuit diagrams show the quantum operations that would be run on hardware if the program is submitted to Azure Quantum with this target profile.

> [!NOTE]
> You can choose from four target profiles: `Base`, `Unrestricted`, `Adaptive_RI`, and `Adaptive_RIF`. If you don't specify a target profile, then the Q# compiler automatically sets an appropriate target profile for you. To manually set a target profile, pass the target profile name as an argument to `@Entrypoint()`. For example, `@Entrypoint(Unrestricted)` sets the target profile to **Unrestricted**.

Specifically, gate decompositions are applied that would make the resulting circuit compatible with the capabilities of the target hardware. These are the same decompositions that would get applied during code generation and submission to Azure Quantum.

1. For example, consider the following Q# program that measures a qubit and an array of qubits.

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

1. When target profile is set to **Unrestricted**, **Adaptive RI**, or **Adaptive RIF**, the gates displayed on the circuit correspond exactly to the quantum operations that are invoked in the Q# program.

    :::image type="content" source="media/circuits-target-unrestricted.png" alt-text="Screenshot of quantum circuits when target profile is Unrestricted." lightbox="media/circuits-target-unrestricted.png":::

1. When the target profile is **Base**, the circuit looks different. Since Base profile targets don't allow qubit reuse after measurement, the measurement is now performed on an entangled qubit instead. Since `Reset` operation isn't a supported gate in Base Profile, it's dropped. The resulting circuit matches what would be run on hardware if this program is submitted to Azure Quantum with this target profile.

    :::image type="content" source="media/circuits-target-base.png" alt-text="Screenshot of quantum circuits when the target profile is set to base." lightbox="media/circuits-target-base.png":::


