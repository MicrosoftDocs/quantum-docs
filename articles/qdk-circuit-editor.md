---
author: azure-quantum-content
description: This document introduces the Circuit Editor feature in the QDK that allows users to build quantum circuits through a graphical interface and use the circuits in their Q# programs.
ms.author: quantumdocwriters
ms.date: 06/10/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: ['Circuit Editor', 'Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: How to use the Circuit Editor in the Quantum Development Kit
uid: microsoft.quantum.get-started.qdk-circuit-editor

#Customer intent: I want to learn how to use the Circuit Editor from the QDK to build quantum circuits and use them in my Q# program.
---

# Create and visualize circuits with the Circuit Editor

The Circuit Editor is a feature in the Quantum Development Kit (QDK) that provides a graphical interface where you can create, edit, and visualize quantum circuit diagrams inside your Q# projects. You can use the circuits that you build directly in your Q# programs as callable operations.

Here's the Circuit Editor in action:

:::image type="content" source="media/qdk-circuit-editor-example.gif" alt-text="Example of building a quantum circuit with the QDK Circuit Editor.":::

## How to access the Circuit Editor

To get started with the Circuit Editor, follow these steps:

1. [Create a new Q# project](https://learn.microsoft.com/en-us/azure/quantum/qsharp-quickstart), or open an existing project.
2. Create a new circuit file with the extension `.qsc`.
3. Open the circuit file in VS Code.

The Circuit Editor is the default view for `.qsc` files.

## Circuit Editor features

Here's what you can do with the Circuit Editor:

- **Insert quantum operations**: To insert quantum gates and measurement operations into your circuit, click-and-drag the icons from the toolbox into the circuit diagram.
- **Remove operations**: To remove operations from your circuit, click-and-drag the operation out of the circuit diagram. Or, right-click on the operation icon to bring up the context menu, and then choose **Delete**.
- **Move operations within the circuit**: To rearrange the operations in your circuit, click-and-drag an operation icon to a new location in the diagram.
- **Add or remove qubits**: To create a new qubit, drag an operation to a new line in the circuit diagram. To remove a qubit, move the qubit to the bottom of the diagram, and then remove all operations on the qubit. Click-and-drag the qubit icons to rearrange the order of the qubits.
- **Add or remove controls on gates**: To add or remove controls on a gate, right-click the gate icon, choose either **Add control** or **Remove control** from the context menu, and then select the corresponding qubit line. Alternatively, right-click on the control icon and choose **Remove control** from the context menu, or click-and-drag the control icon off of the circuit diagram.
- **Convert a gate to its adjoint**: To convert a gate between its standard form and its adjoint form, right-click on the gate icon and choose **Toggle Adjoint** from the context menu.
- **Copy operations**: To copy an existing operation, click-and-drag the icon for the operation that you want to copy, and hold down the **Ctrl** key when you place the operation at a new location in the circuit diagram.
- **Define arguments for gates**: When you place a gate that requires an argument, the Circuit Editor prompts you to enter a number or simple math expression that's used as the first-most argument to the gate. To change the argument value, right-click on the gate icon and choose **Edit Argument** from the context menu. Or, left-click on the argument text in the gate icon.

## How to use Circuit Editor circuits in your Q# projects

Circuit files with the `.qsc` extension define operations that you can reference from Q# code within the same Q# project. The circuits from the `.qsc` files appear like any other Q# operation and are supported by the Q# language service with features like completions, signature help, and go-to definition.

The circuit file defines a namespace that comes from the file name, similar to how Q# files work. The circuit in your `.qsc` file defines a Q# operation that has the same name as your file under that same namespace. For example, to reference a circuit from the file `Foo.qsc` in your Q# code, use the following import statement: `import Foo.Foo;`.

The following Q# program imports a circuit from the file `JointMeasurement.qsc`, and then calls the `JointMeasurement()` operation to apply the circuit to a system of qubits.

```qsharp
    import JointMeasurement.JointMeasurement;

    operation Main() : Result[] {
        use qs = Qubit[4];
        ApplyToEach(H, qs[0..2]);
        let results = JointMeasurement(qs);
        ResetAll(qs);
        results
}
```

## Related content

- [Visualize quantum circuit diagrams with Q#](xref:microsoft.quantum.how-to.visualize-circuits)