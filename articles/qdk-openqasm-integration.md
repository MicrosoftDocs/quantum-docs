---
author: azure-quantum-content
description: This document explains how to run OpenQASM programs in the Microsoft Quantum Development Kit in VS Code and Jupyter Notebook
ms.author: quantumdocwriters
ms.date: 06/22/2026
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [target, targets, OpenQASM, "Microsoft Quantum Development Kit", "QDK", "Azure Quantum", "Visual Studio Code", "VS Code", ".qasm"]
title: How to run OpenQASM programs in with Microsoft Quantum Development Kit
uid: microsoft.quantum.how-to.openqasm-development-qdk
# Customer intent: I want to write and run OpenQASM code in the Microsoft Quantum Development Kit
---

# Develop OpenQASM programs in the Microsoft Quantum Development Kit

The Microsoft Quantum Development Kit (QDK) provides different development environments for OpenQASM programs with Azure Quantum integration. In this article, you learn how to develop and run OpenQASM code in:

- The QDK extension in Visual Studio Code (VS Code)
- The QDK Python library in Jupyter Notebook.

Developer tools like CodeLends, IntelliSense, code completion, and breakpoint debugging are available only in the VS Code extension. Other features are available only in the Python library. For example, you can pass Q# and OpenQASM callables as Python objects, and compile OpenQASM programs that take inputs into QIR.

## Prerequisites

- Install the latest version of [VS Code](https://code.visualstudio.com/download)
- To work directly with OpenQASM files, install the latest version of the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) in VS Code.
- To work with OpenQASM in Python and Jupyter Notebook, install the latest version of the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) in VS Code.
- Install the latest version of the `qdk` Python library with the `jupyter` extra:

    ```bash
    pip install --upgrade "qdk[jupyter]"
    ```

## Work with OpenQASM in VS Code using the QDK extension

To write OpenQASM code in VS Code, open a Q# project and create an OpenQASM file with a `.qasm` extension. The QDK automatically recognizes the `.qasm` file as OpenQASM, and the QDK features for OpenQASM are available as you write your code.

The following QDK features are available for OpenQASM programs in VS Code:

- Code completion
- Code lenses (**Run**, **Histogram**, **Estimate**, **Debug**, and **Circuit**)
- Syntax highlighting and basic syntax features, such as brace matching
- Error checking in OpenQASM source files
- Breakpoint debugging and script execution for OpenQASM source files
- Debugging with live circuit generation
- Integration with Azure Quantum for quantum job submission

To run your OpenQASM program from VS Code, you can use either the QDK's local simulator or you can submit the code as a job to Azure Quantum.

### Run your code on the QDK local simulator

To run your OpenQASM code on the local sparse quantum simulator in VS Code, open a `.qasm` file and then select the **Run** command from the code lens at the beginning of the file. The output from your program displays in the VS Code terminal.

> [!NOTE]
> The QDK automatically attempts to set a QIR target profile that supports your program. If the QIR target profile doesn't support operations in your program, you get compiler errors when you run your OpenQASM code. For more information about target profiles, see [Different types of target profiles in Azure Quantum](xref:microsoft.quantum.target-profiles).

#### Built-in sample programs

The QDK comes with several built-in quantum algorithm samples for OpenQASM. To try out the sample algorithms, enter `sample` in an empty `.qasm` file. A completion list appears that contains the sample algorithms. Choose a sample and then run the generated code.

#### Debug locally in VS Code

The QDK includes a debugger for OpenQASM. The debugger supports breakpoint-style debugging and can render the program state.

To start the debugger, select the **Debug** command from the code lens.

In debug mode, you can set breakpoints in your code to help you debug. The state of your program is displayed in the **RUN AND DEBUG** pane. For example, you can view your local variable states and qubit states.

### Run your code on Azure Quantum

To run OpenQASM programs on Azure Quantum targets, you need to have an Azure Quantum workspace. To create an Azure Quantum workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

To submit OpenQASM jobs to Azure Quantum from VS Code, you need to connect to your Azure Quantum workspace. To connect to your workspace from VS Code, see [Connect with a connection string](xref:microsoft.quantum.how-to.connect-workspace#connect-with-a-connection-string).

To submit an OpenQASM job to Azure Quantum from VS Code, follow these steps:

1. Open the `qasm` file that contains your program in VS Code.
1. Select the **Microsoft Quantum** icon to open the Microsoft Quantum panel.
1. Expand the **QUANTUM WORKSPACES** dropdown and select your workspace.
1. Expand the **Providers** dropdown and choose a provider, and then choose the target that you want to run your job on. For example, submit your job to the `rigetti.svm.sim` target to run your program on Rigetti's backend simulator. For more information on provider and target availability, see [Add or remove a provider in an existing workspace](xref:microsoft.quantum.add-provider).
1. Select the play icon next to the target name.
1. To submit the job, enter values for the **Job name** prompt and the **Number of shots** prompt.

To view the times and status of a job, expand the **Jobs** dropdown and hover over the job name. To download the job results, select the histogram or text icons next to the job name.

## Work with OpenQASM in Python and Jupyter Notebook

With the QDK Python library, you can run OpenQASM code directly and pass OpenQASM circuits as operations to Q# programs. Write your OpenQASM code as a Python string, and then use that string to run, import, or compile your OpenQASM code in the Python environment.

### Run OpenQASM directly in Python

To run OpenQASM code directly, use the `run` function from the `qdk.openqasm` module. For example, the following code runs 10 shots on the local simulator of a simple OpenQASM program with noise:

```python
from qdk import BitFlipNoise
from qdk.openqasm import run

qasm_code = """
    include "stdgates.inc";
    qubit[2] q;
    reset q;
    h q[0];
    cx q[0], q[1];
    bit c = measure q[1];
    """

results = run(qasm_code, shots=10, noise=BitFlipNoise(0.1))
print(results)
```

### Call an OpenQASM program in Q\#

You can use the `import_openqasm` function to store an OpenQASM program as a Python object and then call that object later in your Python code. For example, the following cell stores an OpenQASM circuit in a Python object called `bell`:

```python
from qdk import qsharp
from qdk.openqasm import import_openqasm

qasm_code = """
    include "stdgates.inc";
    qubit[2] q;
    reset q;
    h q[0];
    cx q[0], q[1];
    bit c = measure q[1];
    """

import_openqasm(qasm_code, name="bell")
```

When `bell` is part of your environment, you can run it directly from a Q# cell:

```qsharp
%%qsharp

use qs = Qubit[2];
bell(qs)
```

You can also use the QDK package functionality with `bell`, such as noisy simulation, circuit rendering, and code generation.

#### Parameterized OpenQASM programs

The following cell creates an OpenQASM circuit that takes an angle `theta` as input, then calls the circuit as a Python function:

```python
from qdk.openqasm import import_openqasm, ProgramType

qasm_code = """
    include "stdgates.inc";
    input float theta;
    qubit[2] q;
    rx(theta) q[0];
    rx(-theta) q[1];
    bit[2] c;
    c = measure q;
    """

import_openqasm(qasm_code, name="parameterized_circuit", program_type=ProgramType.File)

from qdk.code.qasm_import import parameterized_circuit

parameterized_circuit(1.57)
```

### Pass an OpenQASM program to Q\#

With the QDK Python library, you can directly pass an OpenQASM program to a Q# program. For example, the following code creates an OpenQASM program called `Entangle` and then uses `Entangle` as an operation in a Q# program:

```python
from qdk.openqasm import import_openqasm
from qdk import qsharp

qasm_code = """
    include "stdgates.inc";
    qubit[2] qs;
    h qs[0];
    cx qs[0], qs[1];
    """

import_openqasm(qasm_code, name="Entangle")

qsharp.eval("{ use qs = Qubit[2]; Entangle(qs); MResetEachZ(qs) }")
```

When you import Q# and import OpenQASM programs in a Python environment with `qsharp.eval` and `import_openqasm`, these programs become Python objects that you can call in your Python code. For example, the following code creates a Q# program called `TestAntiCorrelation` and passes the `Entangle` OpenQASM program to `TestAntiCorrelation`:

```python
qsharp.eval("""
    operation TestAntiCorrelation(entangler : Qubit[] => Unit) : Result[] {
        use qs = Qubit[2];
        X(qs[1]);
        entangler(qs);
        MResetEachZ(qs)
    }
    """)

from qdk.code import Entangle, TestAntiCorrelation

TestAntiCorrelation(Entangle)
```

### Compile OpenQASM programs into QIR

You can compile OpenQASM code into Quantum Intermediate Representation (QIR) with the `compile` function.

For example, the following cell compiles OpenQASM code for a parameterized circuit into QIR:

```python
from qdk import TargetProfile
from qdk.openqasm import import_openqasm, ProgramType
from qdk import qsharp

qsharp.init(target_profile=TargetProfile.Base)

qasm_code = """
    include "stdgates.inc";
    input float theta;
    qubit[2] q;
    rx(theta) q[0];
    rx(-theta) q[1];
    bit[2] c;
    c = measure q;
    """

import_openqasm(qasm_code, name="parameterized_circuit", program_type=ProgramType.File)

from qdk.code.qasm_import import parameterized_circuit

bound_compilation = qsharp.compile(parameterized_circuit, 1.57)
print(bound_compilation)
```

> [!NOTE]
> To compile OpenQASM programs that take input variables into QIR, you need to use the QDK Python library. You can't compile parameterized OpenQASM programs into QIR using the QDK extension in VS Code.

### Submit OpenQASM programs to Azure Quantum

To submit an OpenQASM program to run on an Azure Quantum target, compile the OpenQASM code into QIR and then submit the QIR to run on Azure Quantum.

For example, compile a simple entanglement circuit into QIR.

```python
from qdk.openqasm import compile

qasm_code = """
    include "stdgates.inc";
    bit[2] c;
    qubit[2] q;
    h q[0];
    cx q[0], q[1];
    c = measure q;
"""

qir_compilation = compile(qasm_code)
```

To run a QIR job to Azure Quantum, connect to your quantum workspace and submit the job to one of the available targets in your workspace. For example, submit the entanglement QIR to run on the IonQ backend simulator.

```python
from qdk.azure import Workspace 

workspace = Workspace(resource_id="") # Add the resource ID of your workspace

target = workspace.get_targets('ionq.simulator')
job = target.submit(qir_compilation, shots=100)

print("Job submitted. Waiting for results...")

results = job.get_results()
print(results)
```

## Ongoing OpenQASM development in the QDK

Support for OpenQASM in the QDK is ongoing.

For a list of OpenQASM features that are under development in the QDK, see [Known limitations and issues](https://github.com/microsoft/qdk/wiki/OpenQASM#known-limitations-and-issues) on the QDK GitHub repository wiki.
