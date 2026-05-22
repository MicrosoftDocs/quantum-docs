---
author: azure-quantum-content
description: This article describes how to install the quantum simulators in the QDK, and how to run basic programs on the simulators
ms.date: 05/12/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: ["Azure", "Microsoft", "Azure Quantum", "Microsoft Quantum", "Quantum Development Kit", "QDK", "Jupyter", "Python", "Visual Studio Code", "VS Code", "Jupyter Notebook", "GitHub", API]
title: How to install and run the QDK quantum simulators
uid: microsoft.quantum.how-to.install-qdk-neutral-atom-simulators
# Customer intent: As a quantum developer, I want to know how to install and use the quantum simulators in the QDK
---

# How to install and run the QDK quantum simulators

The Microsoft Quantum Development Kit (QDK) includes a set of quantum simulators that you can access from the Visual Studio Code (VS Code) extension and the QDK Python library. These simulators let you test how your quantum programs run on real quantum hardware. This article explains how to install the simulators and how to run basic simulations in Jupyter Notebook and VS Code.

The QDK includes four quantum simulators:

- Sparse simulator
- Clifford simulator
- GPU simulator
- CPU simulator

For more information about the QDK quantum simulators, see [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators).

## Prerequisites

To follow the steps in this article, you need to install the following tools:

- A Python environment (version 3.10 or greater), with Python and Pip
- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download)
- The latest versions of the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) in VS Code

## Install the simulators

All four simulators are available in the QDK Python library, but only the sparse simulator is available in the QDK VS Code extension.

To use the sparse simulator in the VS Code extension, install the [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).

To use the quantum simulators in Python and Jupyter Notebook, install the latest version of the `qdk` Python library with the `jupyter` extra:

```bash
pip install --upgrade "qdk[jupyter]"
```

The `jupyter` extra isn't required to use the simulators, but does install the `qdk.widgets` module. The `widgets` module lets you create visualizations from your simulation results in Jupyter Notebook.

## Run simulations using the QDK extension for VS Code

The QDK extension for VS Code offers only the sparse simulator. To run your program on the sparse simulator in VS Code, open a Q# (`.qs`) or OpenQASM (`.qasm`) program in VS Code and run the file.

For example, follow these steps to run one of the Q# sample programs that come with the QDK extension:

1. In VS Code, open the **File** menu and select **New Text File**.
1. Give the file a name that ends with the `.qs` extension.
1. In the empty file, enter **sample**. A list of included code samples opens.
1. Choose a code sample, for example **Bell Pair sample**.
1. To run the program on the sparse simulator, select the **Run** command from the code lens above the **Main** operation.

The VS Code terminal shows the output from the simulation.

> [!NOTE]
> You can add limited noise models to sparse simulations of Q# programs in the QDK extension. For more information, see [Add Pauli noise to the sparse simulator in VS Code](xref:microsoft.quantum.machines.overview.sparse-simulator#add-pauli-noise-to-the-sparse-simulator-in-vs-code).

### Run simulations using the QDK Python library

The QDK Python library offers all four simulators. How to call the simulators depends on the simulator and the quantum programming framework.

### Call the sparse simulator

You can call the sparse simulator for Q#, OpenQASM, and Qiskit programs. The following table shows how to call the sparse simulator from the `qdk` library for 10 shots in each supported quantum programming framework.

| Programming framework | Python API             | Example call                                       |
|-----------------------|------------------------|----------------------------------------------------|
| Q#                    | `qsharp.run`           | `qsharp.run("MyQsharpProgram()", shots=10)`        |
| OpenQASM              | `openqasm.run`         | `openqasm.run(my_qasm_program, shots=10)`          |
| Qiskit                | `qiskit.QSharpBackend` | `QSharpBackend().run(my_qiskit_program, shots=10)` |

> [!NOTE]
> You can add noise models to the sparse simulator with the `noise` parameter for Q# and OpenQASM programs, but you can't add noise models for Qiskit programs.

For example, follow these steps to run the Bell pair Q# program in a Jupyter notebook in VS Code:

1. In VS Code, open the **View** menu and select **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty notebook file opens in a new tab.
1. In the first cell, import the `qsharp` module from the `qdk` library.

```python
from qdk import qsharp
```

1. In a new cell, use the `%%qsharp` magic command to write the Q# code.

```qsharp
%%qsharp

operation Main() : (Result, Result) {
    use (q1, q2) = (Qubit(), Qubit());
    PrepareBellPair(q1, q2);
    (MResetZ(q1), MResetZ(q2))
}

operation PrepareBellPair(q1 : Qubit, q2 : Qubit) : Unit {
    H(q1);
    CNOT(q1, q2);
}
```

1. Create a new cell. To run the Q# program on the sparse simulator, call the `run` function from the `qsharp` module and specify the number of shots.

```python
qsharp.run("Main()", shots=10)
```

### Call the Clifford simulator

You can call the Clifford simulator for Q#, OpenQASM, Qiskit, and QIR programs. The following table shows how to call the Clifford simulator from the `qdk` library for 10 shots in each supported quantum programming framework.

| Programming framework | Python API                      | Example call                                                                                   |
|-----------------------|---------------------------------|------------------------------------------------------------------------------------------------|
| Q#                    | `qsharp.run`                    | `qsharp.run("MyQsharpProgram()", type='clifford', shots=10)`                                  |
| OpenQASM              | `openqasm.run`                  | `openqasm.run(my_qasm_program, type='clifford', shots=10)`                                    |
| Qiskit                | `simulation.NeutralAtomBackend` | `simulation.NeutralAtomBackend().run(my_qiskit_program, simulator_type='clifford', shots=10)` |
| QIR                   | `simulation.NeutralAtomDevice`  | `simulation.NeutralAtomDevice().simulate(my_qir, type='clifford', shots=10)`                  |
| QIR                   | `simulation.run_qir`            | `simulation.run_qir(my_qir, type='clifford', shots=10)`                                       |

> [!NOTE]
> The `NeutralAtomDevice` and `NeutralAtomBackend` APIs are for simulations on neutral atom quantum computers specifically. For more information, see [Neutral atom device simulator overview](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).

For example, the following Python code creates a simple OpenQASM program and runs the program on the Clifford simulator:

```python
from qdk.openqasm import run

qasm_code = """
    include "stdgates.inc";
    qubit[2] q;
    reset q;
    h q[0];
    cx q[0], q[1];
    bit c = measure q[1];
    """

run(qasm_code, type='clifford', shots=10)
```

### Call the GPU and CPU simulators

You can call the GPU and CPU simulators for Qiskit and QIR programs. The following table shows how to call the GPU simulator from the `qdk` library for 10 shots in each of the supported quantum programming frameworks. To call the CPU simulator, replace `'gpu'` with `'cpu'` for the simulator type parameters.

| Programming framework | Python API                      | Example call                                                                             |
|-----------------------|---------------------------------|------------------------------------------------------------------------------------------|
| Qiskit                | `simulation.NeutralAtomBackend` | `simulation.NeutralAtomBackend().run(my_qiskit_program, simulator_type='gpu', shots=10)` |
| QIR                   | `simulation.NeutralAtomDevice`  | `simulation.NeutralAtomDevice().simulate(my_qir, type='gpu', shots=10)`                  |
| QIR                   | `simulation.run_qir`            | `simulation.run_qir(my_qir, type='gpu', shots=10)`                                       |

For example, the following Python code converts a simple OpenQASM program to QIR and runs the QIR on the GPU simulator:

```python
from qdk.openqasm import compile#, ProgramType
from qdk.simulation import run_qir

qasm_code = """
    include "stdgates.inc";
    qubit[2] q;
    reset q;
    h q[0];
    cx q[0], q[1];
    bit c = measure q[1];
    """

qir = compile(qasm_code)
run_qir(qir, type='gpu', shots=10)
```
