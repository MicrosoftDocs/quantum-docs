---
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 01/13/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites

For installation details, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- VS Code with the [Microsoft Quantum Development Kit (QDK)](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extensions installed.
- The `qdk` Python package with the `qiskit` and `jupyter` extras.

    ```bash
    python pip install "qdk[qiskit,jupyter]"
    ```

## Run a basic circuit

In VS Code, open a new Python file to create and run a basic circuit with the built-in sparse simulator from the `qsharp` module.  

```python
# load the required imports 
from qdk import qsharp
from qsharp.interop.qiskit import QSharpBackend
from qiskit.circuit.random import random_circuit

# define and display the circuit
circuit = random_circuit(2, 2, measure=True)
print(circuit)

# run the circuit using the built-in sparse simulator
backend = QSharpBackend()
job = backend.run(circuit)
counts = job.result().get_counts()

print(counts)
```

To run the program, select the Run icon in the upper right, and select **Run Python file**. The output displays in a new terminal window.

## Generate QIR for the circuit

From that same circuit, you can generate QIR that's used to run on quantum hardware.

> [!NOTE]
> To generate QIR, all registers must be measured into. If there are any unused registers, then an error is raised. Additionally, you get an error when you attempt to generate QIR with an `Unrestricted` target profile. The `Unrestricted` profile is only valid for simulation. You must use `TargetProfile.Base`, `TargetProfile.Adaptive_RI`, or `TargetProfile.Adaptive_RIF`. You can override the `target_profile` in the `backend.qir(...)` call to switch profiles.

1. Import `QSharpError` and `TargetProfile`

    ```python
    from qdk.qsharp import QSharpError, TargetProfile
    ```

1. To generate QIR, modify the output:

    ```python
    print(backend.qir(circuit, target_profile=TargetProfile.Adaptive_RI))
    ```

Your code should now look like this:

```python
# load the required imports 
from qdk import qsharp
from qsharp import QSharpError, TargetProfile
from qsharp.interop.qiskit import QSharpBackend
from qiskit.circuit.random import random_circuit

# define and display the circuit
circuit = random_circuit(2, 2, measure=True)
print(circuit)

# generate QIR for the circuit
print(backend.qir(circuit, target_profile=TargetProfile.Adaptive_RI))
```

Not all programs can run on all hardware. Here, if you try to target the `Base` profile, then you get detailed errors about which parts of the program aren't supported.

```python
try:
    backend.qir(qc, target_profile=TargetProfile.Base)
except QSharpError as e:
    print(e)
```
