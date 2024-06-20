---
author: haileytap
description: This article describes the environment options for developing quantum programs with Q# and the Quantum Development Kit.
ms.author: t-htapia
ms.date: 06/17/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: []
title: Environment Options for Quantum Programming with Q#
uid: microsoft.quantum.qsharp-ways-to-work
# Customer intent: As a new quantum programmer, I want to understand the pros and cons of each Q# environment so that I can choose the best one for my needs.
---

# Different ways to work with Q#

Learn the different...

## Visual Studio Code

In VS Code, you can...

### Q# standalone program in VS Code

.qs file

### Q# + Python in VS Code

1 .qs + 1 .py files. The Python program is a host program that at some point in its routine calls the Q# program and use the results. To use Python and Q#, you need to install the qsharp and azure-quantum Python packages. Usually this is for very complex projects, users who have more experience and background. 

### Jupyter Notebook in VS Code

.ipynb file. The kernel is Python and it has cells, which can be code or text. Code cells are python unless you use the magic command %%qsharp, then it's a Q# code cell. This means you can have, python code, Q# code, and text with explanations in the same file. To use Python and Q#, you need to install the qsharp and azure-quantum Python packages.

#### The %%qsharp command

By default, Q# programs in Jupyter Notebooks use the *ipykernel* Python kernel. To add Q# code to a notebook cell, you must use the `%%qsharp` command, which is enabled with the `qsharp` Python package. For example, our sample code in a Jupyter Notebook looks like this:

```python
import qsharp
```

```qsharp
%%qsharp

    operation MeasureOneQubit() : Result {
        // Allocate a qubit. By default, it's in the zero state.    
        use q = Qubit();  
        // Apply the Hadamard operation, H, to the state.
        // It now has a 50% chance of being measured as 0 or 1.
        H(q);      
        // Now we measure the qubit in Z-basis.
        let result = M(q);
        // Reset the qubit before releasing it.
        Reset(q);
        // Display the result.
        Message($"Result is {result}");
        // Finally, return the result of the measurement.
        return result;
    }
    MeasureOneQubit();
```

Note the absence of a namespace and `@EntryPoint()`, which are not needed for Jupyter Notebooks. Instead of an entry point, the operation is called directly in the last line. Also note that a `Message` statement was added to the Jupyter Notebook code to display the result. When you run the earlier Q# program in VS Code, the built-in simulator displays the result by default.

When using the `%%qsharp` command:

- You must first run `import qsharp` to enable the `%%qsharp` command.
- The `%%qsharp` command is scoped to the entire cell in which it appears. Note that it changes the notebook cell type from *Python* to *Q#*. 
- The Q# code that follows the command must adhere to standard Q# coding syntax. For example, you denote comments using `//` instead of `#` within `%%qsharp` cells, and code lines must end with a semi-colon (`;`).
- In a notebook cell, you cannot put a Python statement before or after the `%%qsharp` command.

For an example of working with a Jupyter Notebook program, see [Get started with Q# programs and VS Code](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter).

## Azure Portal

Azure notebook: Notebook tab in Azure portal. They're basically Jupyter Notebooks in the browser, you don't need to install anything extra. See Run a Q# and Python notebook - Azure Quantum | Microsoft Learn

## Azure Quantum website (Copilot)

Running a Q# file in the browser, but you cannot save the file and the functionality is limited to Run, you cannot do all the things available in VS Code.

## Q# learning resources

To learn Q#, use the following resources:

- **Quantum Katas:** Interactive coding exercises ...
- **Training modules:** 
- **Q# code samples:**

## Next steps

- ...