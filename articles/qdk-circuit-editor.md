---
author: azure-quantum-content
description: This document introduces the Circuit Editor feature in the QDK that allows users to build quantum circuits through a graphical interface and use the circuits in their Q# programs.
ms.author: quantumdocwriters
ms.date: 06/09/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: ['Circuit Editor', 'Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: How to use the Circuit Editor in the Quantum Development Kit
uid: microsoft.quantum.get-started.qdk-circuit-editor

#Customer intent: I want to learn how to use the Circuit Editor from the QDK to build quantum circuits and use them in my Q# program.
---

# Create and visualize circuits with the Circuit Editor

The Circuit Editor is a feature in the Quantum Development Kit (QDK) that provides a graphical interface where you can create, edit, and visualize quantum circuit diagrams inside your Q# projects. You can call the circuits that you build directly in your Q# programs.

Here's the Circuit Editor in action:

:::image type="content" source="media/qdk-circuit-editor-example.gif" alt-text="Example of building a quantum circuit with the QDK Circuit Editor.":::

## How to access the Circuit Editor

To get started with the Circuit Editor, follow these steps:

1. [Create a new Q# project](https://learn.microsoft.com/en-us/azure/quantum/qsharp-quickstart), or open an existing project.
2. Create a new circuit file with the extension `.qsc`.
3. Open the circuit file in VS Code. The Circuit Editor is the default view for `.qsc` files.

## Circuit Editor features

Here's what you can do with the Circuit Editor:

- **Insert quantum operations from the toolbox**: To insert unitary or measurement operations into into your circuit, click-and-drag the operation icons from the toolbox.
- **Remove operations**: To remove operations from your circuit, click-and-drag the operation out of the circuit diagram. Or, right-click on the operation icon to bring up the context menu, and then choose **Delete**.
- **Move operations within the circuit**: To rearrange the operations in your circuit, click-and-drag an operation icon to a new location in the diagram.
- **Add or remove qubits**: To add or remove qubits, use the **Add/Remove Qubit Line**" buttons.<span style="color:orange"> [NOTE TO SCOTT: I don't see these buttons]</span>
- **Add or remove controls on operations**: To add or remove operation controls, right-click the operation icon to bring up the context menu. Then, choose either **Add control** or **Remove control** and select the corresponding qubit line. Alternatively, to remove a control right-click on the control icon and choose **Remove control** from the context menu, or by click-and-drag the control icon off of the circuit diagram. Note that you can't add controls to measurement or reset gates.<span style="color:orange"> [NOTE TO SCOTT: Do "operation" and "gate" always mean the same thing for qunatum circuit diagrams?]</span>
- **Convert an operation to its adjoint**: To convert an operation between its standard form and its adjoint form, right-click on the operation icon and choose **Toggle Adjoint** from the context menu.
- **Copy operations**: To copy an existing operation, click-and-drag the icon for the operation that you want to copy, and then hold down the **Ctrl** key when you place the operation at a new location in the circuit diagram. Instead of moving the original operation, a copy appears at the new location.
- **Define arguments for operations**: When you place an operation that requires an argument, the Circuit Editors prompts you to enter a number or simple math expression to be used as the first-most argument to the operation. To change the argument value, right-click on the operation icon and choose **Edit Argument** from the context menu. Or, left-click on the argument text in the operation icon.

## How to use Circuit Editor circuits in your Q# projects

Circuit files with the `.qsc` extesntion define operations that you can reference from Q# code within the same Q# project. They will appear like any other operation and are supported by the language service with features like completions, signature help, and go-to definition.<span style="color:orange"> [NOTE TO SCOTT: What is "they" referring to here?]</span>

The circuit file defines a namespace that comes from the file name, similar to how Q# files work. The circuit in your circuit file defines an operation of the same name under that same namespace.<span style="color:orange"> [NOTE TO SCOTT: In this case, is "operation" referring to a an a qunatum operation (like a gate in a circuit)?]</span> For example, to reference a circuit from the file `Foo.qsc` in your Q# code, use the following import statement: `import Foo.Foo;`.

<span style="color:orange"> [NOTE TO SCOTT: I'm still unclear on how exactly we use them. Could we add a Q# code block that shows a circuit file being imported and then called, and then doing something with the output we get from calling it? Or does it not work that way? Do qubits need to be set up before we call the circuit file, or is all that info contained within the file itself?]</span>

## Tutorial: Create a joint distribution circuit

<span style="color:orange">[NOTE TO SCOTT: I think the Joint Distribution tutorial would be cool. But I think it's better as it's own page in a tutorial sexction. We'll have to do some reaarranging and/or renaming of the Quantum Programming section of our docs to make space for QDK features that aren't Q#.]</span>

## Related content

- [Visualize quantum circuit diagrams with Q#](xref:microsoft.quantum.how-to.visualize-circuits)