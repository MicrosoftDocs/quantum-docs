---
author: azure-quantum-content
description: Learn how to install and run the sparse, stabilizer, GPU, and CPU simulators in the QDK Python package.
ms.date: 10/06/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
ai-usage: ai-assisted
no-loc: ["Q#", "OpenQASM", "QIR", "Qiskit", "Microsoft", "Quantum Development Kit", "QDK", "Clifford", "Pauli", "Hadamard", "GPU", "CPU", "Azure Quantum", "Python"]
title: Run quantum simulations with the QDK Python package
uid: microsoft.quantum.how-to.install-qdk-neutral-atom-simulators
# Customer intent: As a quantum developer, I want to know how to install and use the quantum simulators in the QDK
---

# Run quantum simulations with the QDK Python package

The Microsoft Quantum Development Kit (QDK) Python package includes local quantum simulators that you can use to test and develop quantum programs. This article explains how to install the simulators and run Q#, OpenQASM, Qiskit, and QIR programs in Python or Jupyter Notebook.

The QDK Python package includes four primary simulators:

- Sparse simulator
- Stabilizer simulator
- GPU simulator
- CPU simulator

For more information about the QDK quantum simulators, see [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators).

To run Q# or OpenQASM programs directly in the QDK extension for Visual Studio Code (VS Code), see [Run quantum simulations in the QDK extension for Visual Studio Code](xref:microsoft.quantum.machines.overview.sparse-simulator).

## Prerequisites

To follow the Jupyter Notebook examples in this article, install these tools:

- A Python environment with Python 3.10 or later and pip
- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download)
- The latest versions of the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) in VS Code

## Install the simulators

To use the quantum simulators in Python and Jupyter Notebook, install the latest version of the `qdk` Python package with the `jupyter` extra:

```bash
pip install --upgrade "qdk[jupyter]"
```

The simulators don't require the `jupyter` extra, but the extra adds the `qdk.widgets` module to visualize simulation results in Jupyter Notebook.

Select a simulator based on the quantum programming framework and Python API you use.

### Call the sparse simulator

The sparse simulator supports Q#, OpenQASM, and Qiskit programs. This table shows how to run 10 shots with the `qdk` package in each framework.

| Programming framework | Python API             | Example call                                       |
|-----------------------|------------------------|----------------------------------------------------|
| Q#                    | `qsharp.run`           | `qsharp.run("MyQsharpProgram()", shots=10)`        |
| OpenQASM              | `openqasm.run`         | `openqasm.run(my_qasm_program, shots=10)`          |
| Qiskit                | `qiskit.QSharpBackend` | `QSharpBackend().run(my_qiskit_program, shots=10)` |

> [!NOTE]
> The sparse simulator supports noise models through the `noise` parameter for Q# and OpenQASM programs, but not for Qiskit programs.

For example, follow these steps to run the Bell pair Q# program in a Jupyter notebook in VS Code:

1. In VS Code, select **View** > **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty notebook file opens in a new tab.
1. In the first cell, import the `qsharp` module from the `qdk` package.

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

### Call the stabilizer simulator

The stabilizer simulator efficiently runs wide, Clifford-dominated circuits. Stabilizer branching also supports a limited number of non-Clifford operations, such as $T$ and $T^\dagger$ gates and arbitrary-angle Pauli rotations. Because the number of branches can grow exponentially with the number of non-Clifford operations, use a full-state simulator for circuits with substantial non-Clifford evolution.

The stabilizer simulator supports Q#, OpenQASM, Qiskit, and QIR programs. This table shows how to run 10 shots in each framework.

| Programming framework | Python API                      | Example call                                                                         |
|-----------------------|---------------------------------|--------------------------------------------------------------------------------------|
| Q#                    | `qsharp.run`                    | `qsharp.run("MyQsharpProgram()", type="stabilizer", shots=10)`                       |
| OpenQASM              | `openqasm.run`                  | `openqasm.run(my_qasm_program, type="stabilizer", shots=10)`                         |
| Qiskit                | `qiskit.NeutralAtomBackend`     | `NeutralAtomBackend().run(my_qiskit_program, simulator_type="stabilizer", shots=10)` |
| QIR                   | `simulation.NeutralAtomDevice`  | `simulation.NeutralAtomDevice().simulate(my_qir, type="stabilizer", shots=10)`       |
| QIR                   | `simulation.run_qir`            | `simulation.run_qir(my_qir, type="stabilizer", shots=10)`                            |

> The `NeutralAtomDevice` and `NeutralAtomBackend` APIs are for simulations on neutral atom quantum computers specifically. For more information, see [Neutral atom device simulator overview](xref:microsoft.quantum.overview.qdk-neutral-atom-simulators).

For example, this Python code runs an OpenQASM program with a non-Clifford $T$ gate on the stabilizer simulator:

```python
from qdk.openqasm import run

qasm_code = """
include "stdgates.inc";
qubit[1] q;
bit[1] result;

h q[0];
t q[0];
h q[0];
result = measure q;
"""

run(qasm_code, type="stabilizer", shots=1000)
```

> [!NOTE]
> Both `"stabilizer"` and `"clifford"` select the stabilizer simulator. The API determines whether the parameter is `type` or `simulator_type`.

The $T$ gate creates stabilizer branches. The final measurement samples the interference between those branches.

### Call the GPU and CPU simulators

The GPU and CPU simulators support Qiskit and QIR programs. This table shows how to run 10 shots on the GPU simulator with the `qdk` package in each framework. To use the CPU simulator, replace `gpu` with `cpu` in the simulator type parameter.

| Programming framework | Python API                      | Example call                                                                             |
|-----------------------|---------------------------------|------------------------------------------------------------------------------------------|
| Qiskit                | `qiskit.NeutralAtomBackend`     | `NeutralAtomBackend().run(my_qiskit_program, simulator_type="gpu", shots=10)`             |
| QIR                   | `simulation.NeutralAtomDevice`  | `simulation.NeutralAtomDevice().simulate(my_qir, type="gpu", shots=10)`                  |
| QIR                   | `simulation.run_qir`            | `simulation.run_qir(my_qir, type="gpu", shots=10)`                                       |

For example, this Python code converts a simple OpenQASM program to QIR and runs the QIR on the GPU simulator:

```python
from qdk.openqasm import compile
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
run_qir(qir, type="gpu", shots=10)
```
