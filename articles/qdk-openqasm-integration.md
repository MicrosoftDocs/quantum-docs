---
author: azure-quantum-content
description: This document provides on who to run OpenQASM code in the Quantum Development Kit
ms.author: quantumdocwriters
ms.date: 07/07/2025
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [target, targets, OpenQASM, "Quantum Development Kit", "QDK", "Azure Quantum", "Visual Studio Code", "VS Code", ".qasm"]
title: How to run OpenQASM code in the Quantum Development Kit
uid: microsoft.quantum.how-to.openqasm-development-qdk

# Customer intent: I want to write and run OpenQASM code in the Quantum Development Kit
---

# Write and run OpenQASM code in the Quantum Development Kit

The Quantum Development Kit (QDK) provides a development environment for OpenQASM programs with Azure Quantum integration. In this article, you learn how to write, debug, and run OpenQASM code in the QDK.

The following QDK features are available in OpenQASM programs:

- Code completion
- Code lenses (**Run**, **Histogram**, **Estimate**, **Debug**, and **Circuit**)
- Syntax highlighting and basic syntax features, such as brace matching
- Error checking in OpenQASM source files
- Breakpoint debugging and script execution for OpenQASM source files
- Debugging with live circuit generation
- Integration with Azure Quantum for quantum job submission

## Work with OpenQASM in Visual Studio Code and Azure Quantum

To write OpenQASM code in Visual Studio Code, open a Q# project and create an OpenQASM file with a `.qasm` extension. The QDK automatically recognizes the `.qasm` file as OpenQASM, and the QDK features for OpenQASM are available as you write your OpenQASM code in VS Code.

To run your OpenQASM program from VS Code, you can use either a local quantum simulator or you can submit the code as a job to Azure Quantum. The local quantum simulator is a feature of the QDK and has no cost. Azure Quantum jobs have a cost according to the provider and plan that you choose for your job submission.

### Run your code locally on a quantum simulator

To run your OpenQASM code on a local quantum simulator in VS Code, open and select a `.qasm` file, and then choose one of the following methods:

- Press **Ctrl + F5**.
- Press **Ctrl + Shift + P** (or **Cmd + Shift + P**) to open the Command Palette, and then enter **Debug: Run**.
- Choose the **Run** code lens.
- Choose the **Run** button Editor Action, represented by a play icon.

The output from your code appears in the **DEBUG CONSOLE** tab on the output Panel.

> [!NOTE]
> If you don't choose an appropriate Q# target profile for your simulation, then you get compiler errors when you run your OpenQASM code. For more information about target profiles, see [Different types of target profiles in Azure Quantum](xref:microsoft.quantum.target-profiles).

#### Built-in sample programs

The QDK comes with several built-in quantum algorithm samples for OpenQASM. To try out the sample algorithms, write `sample` in an empty `.qasm` file. A completion list appears that contains the sample algorithms. Choose a sample and then run the generated code.

#### Debug locally in VS Code

The QDK includes a debugger for OpenQASM. The debugger handles typical breakpoint-style debugging (step into, over, out of, and such), and can render the program state.

To start the debugger, choose one of the following methods:

- Choose the dropdown list on the **Run** button, and then select **Start Debugging**.
- Choose the **Debug** code lens.

In debug mode, you can set breakpoints in your code to help you debug. The state of your program is visible in the **Run and Debug** view on the Side Bar. For example, you can view your local variable states and qubit states.

### Run your code on Azure Quantum

For instructions on how to submit a job to Azure Quantum from VS Code, see [Connect to Azure Quantum and submit your job](xref:microsoft.quantum.submit-jobs#connect-to-azure-quantum-and-submit-your-job).

## Work with OpenQASM in Python and Jupyter Notebook

The QDK includes two Python packages, `qsharp` and `qsharp-widgets`, that let you work with Q# and OpenQASM code in a Python environment in Jupyter Notebook. You write your OpenQASM code as a Python string, and then use that string to run, import, or compile your OpenQASM code in the Python environment.

### Prerequisites

To run OpenQASM code in a Jupyter notebook with VS Code, set up VS Code with extensions for the QDK, Python, and Jupyter Notebook. For more information on how to install these extensions and run Jupyter notebooks with VS Code, see [Tutorial: Q# in Jupyter Notebooks and VS Code](https://github.com/microsoft/qdk/wiki/Working-with-Jupyter-Notebooks#tutorial-q-in-jupyter-notebooks-and-vs-code).

### Run OpenQASM directly in a Python notebook cell

To run OpenQASM code directly in a Python cell, use the `run()` function from the `qsharp.openqasm` library. For example, the following cell calls the `run()` function with an OpenQASM code string, and arguments for the number of shots and noise:

```python
import qsharp
from qsharp import BitFlipNoise, TargetProfile
from qsharp.openqasm import run

qsharp.init(target_profile=TargetProfile.Base)

results = run(
    """
    include "stdgates.inc";
    qubit[2] q;
    reset q;
    h q[0];
    cx q[0], q[1];
    bit c = measure q[1];
    """,
    shots=10,
    noise=BitFlipNoise(0.1),
)
print(results)
```

### Call an OpenQASM program from Python

You can use the `import_openqasm()` function to store an OpenQASM program as a Python object and then call that object later in your Python code. For example, the following cell stores an OpenQASM circuit in a Python object called `bell`:

```python
import qsharp
from qsharp import init, TargetProfile
from qsharp.openqasm import import_openqasm

qsharp.init(target_profile=TargetProfile.Base)

import_openqasm(
    """
    include "stdgates.inc";
    qubit[2] q;
    reset q;
    h q[0];
    cx q[0], q[1];
    bit c = measure q[1];
    """,
    name="bell",
)
```

This next cell imports and calls the `bell` circuit:

```python
from qsharp.code import bell
bell()
```

After `bell` is part of your environment, you can run it directly from a Q# cell:

```qsharp
%%qsharp
bell()
```

You can also use all the QDK package functionality with `bell`, such as noisy simulation, circuit rendering, and code generation.

#### Parameterized OpenQASM programs

The following cell creates an OpenQASM circuit that takes an angle `theta` as input, then calls the circuit as a Python function:

```python
import_openqasm(
    """
    include "stdgates.inc";
    input float theta;
    qubit[2] q;
    rx(theta) q[0];
    rx(-theta) q[1];
    bit[2] c;
    c = measure q;
    """,
    name="parameterized_circuit",
)

from qsharp.code import parameterized_circuit

parameterized_circuit(1.57)
```

### Compile OpenQASM programs into QIR

You can compile OpenQASM code into Quantum Intermediate Representation (QIR) with the `compile()` function.

For example, the following cell compiles OpenQASM code for a parameterized circuit into QIR:

```python
import_openqasm(
    """
    include "stdgates.inc";
    input float theta;
    qubit[2] q;
    rx(theta) q[0];
    rx(-theta) q[1];
    bit[2] c;
    c = measure q;
    """,
    name="parameterized_circuit",
)

from qsharp.code import parameterized_circuit

bound_compilation = qsharp.compile(parameterized_circuit, 1.57)
print(bound_compilation)
```

> [!NOTE]
> The Python API is required to compile OpenQASM programs that take input variables.

## OpenQASM language features that aren't supported

Support for OpenQASM in the QDK is ongoing.

For a list of OpenQASM language limitations and features that are under development in the QDK, see [Unsupported or unimplemented OpenQASM language features](https://github.com/microsoft/qdk/wiki/OpenQASM#unsupported-or-unimplemented-openqasm-language-features).
