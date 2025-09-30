---
author: azure-quantum-content
description: This document introduces the Circuit Editor feature in the QDK that allows users to build quantum circuits through a graphical interface and use the circuits in their Q# programs.
ms.author: quantumdocwriters
ms.date: 06/12/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Circuit Editor', 'Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: How to use the Circuit Editor in the Quantum Development Kit
uid: microsoft.quantum.how-to.qdk-circuit-editor

#Customer intent: I want to learn how to use the Circuit Editor from the QDK to build quantum circuits and use them in my Q# program.
---

# Create and visualize circuits with the Circuit Editor

The Circuit Editor is a feature in the Quantum Development Kit (QDK) that provides a graphical interface where you can create, edit, and visualize quantum circuit diagrams inside your Q# projects. You can use the circuits that you build directly in your Q# programs as callable operations.

## How to access the Circuit Editor

To get started with the Circuit Editor, follow these steps:

1. Create a new Q# project in VS Code, or open an existing project.
2. Create a new circuit file with the extension `.qsc`.
3. Open the circuit file in VS Code.

The Circuit Editor is the default view for `.qsc` files.

## Circuit Editor features

Here's what you can do with the Circuit Editor:

| **Feature** | **How to Use** |
|-------------|----------------|
| **Insert a circuit element** | Click-and-drag the element from the toolbox into the circuit diagram. |
| **Remove a circuit element** | Click-and-drag the element out of the circuit diagram. Or, right-click the element and choose **Delete** from the context menu. |
| **Move a circuit element** | Click-and-drag the element to a new location in the circuit diagram. |
| **Copy a circuit element** | Hold down the **Ctrl** key while you click-and-drag the element to a new location in the circuit diagram. |
| **Add a qubit** | Place an element from the toolbox on a new wire in the circuit diagram. Or, move an existing element to a new wire in the diagram. |
| **Remove a qubit** | Click-and-drag the qubit icon out of the circuit diagram. The bottom-most qubit is automatically deleted when you remove all circuit elements from that qubit. |
| **Rearrange the qubit order** | Click-and-drag the qubit icons in the circuit diagram. |
| **Add a control to a gate** | Right-click the gate icon, choose **Add Control** from the context menu, and then choose the control qubit wire. |
| **Remove a control from a gate** | Right-click the gate icon, choose **Remove Control** from the context menu, and then select the icon for the control that you want to remove. You can also right-click the control icon directly and choose **Remove Control**, or drag the control icon off the diagram. |
| **Convert a gate to its adjoint** | Right-click the gate icon and choose **Toggle Adjoint** from the context menu. |
| **Define an argument for a gate** | When you place a gate that requires an argument, a prompt box appears. Enter a number or expression in the prompt box. To update the argument, right-click the gate and choose **Edit Argument**. Or, left-click the argument text on the gate icon. |

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