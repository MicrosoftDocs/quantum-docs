---
author: bradben
ms.author: brbenefield
ms.date: 11/15/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites

For installation details, see [Installing the Quantum Development Kit on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-qdk-on-vs-code).

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extensions installed.
- The Azure Quantum `qsharp` Python package with the `qiskit` and `widget` tags. 

    ```cmd
    python pip install "qsharp[qiskit,widgets]>=1.9" 
    ```
    > [!IMPORTANT]
    > Ensure that you have the latest version of Qiskit. For more information, see [Update the azure-quantum Python package](xref:microsoft.quantum.update-qdk#update-the-azure-quantum-python-packages).


## Run a basic circuit

In VS Code, open a new Python file to define and run a basic circuit using the built-in sparse simulator in the Qsharp package.  

```python
# load the required imports 
from qiskit.circuit.random import random_circuit
from qsharp.interop.qiskit import QSharpBackend

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


```html
                  ┌─────────────────────────┐┌─┐
q_0: ─■───────────┤0                        ├┤M├───
      │P(0.79983) │  (XX-YY)(1.9337,1.7385) │└╥┘┌─┐
q_1: ─■───────────┤1                        ├─╫─┤M├
                  └─────────────────────────┘ ║ └╥┘
c: 2/═════════════════════════════════════════╩══╩═
                                              0  1
{'11': 680, '00': 344}
```
