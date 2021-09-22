---
author: guenp
ms.author:  v-guenp
ms.date: 09/22/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## [Native quantum](#tab/tabid-native)

## Submit a quantum circuit to Honeywell

1. Create a quantum circuit in the [OpenQASM](https://en.wikipedia.org/wiki/OpenQASM) representation. For instance, the below example creates a Teleportation circuit:

    ```py
    circuit = """OPENQASM 2.0;
    include "qelib1.inc";
    qreg q[3];
    creg c0[3];
    h q[0];
    cx q[0], q[1];
    cx q[1], q[2];
    measure q[0] -> c0[0];
    measure q[1] -> c0[1];
    measure q[2] -> c0[2];
    """
    ```

    Optionally, you can load the circuit from a file:

    ```py
    with open("my_teleport.qasm", "r") as f:
        circuit = f.read()
    ```

1. Submit the circuit to the Honeywell target. In the below example we are using the Honeywell API validator. This returns a `Job` (for more info, see [Azure Quantum Job](xref:microsoft.quantum.optimization.job-reference)).

    ```python
    target = Honeywell(workspace=workspace, target="honeywell.hqs-lt-s1-apival")
    job = target.submit(circuit, num_shots=500)
    ```

1. Wait until the job is complete and fetch the results. Note that the API validator only returns zeroes for qubit read-out results.

    ```python
    results = job.get_results()
    results
    ```

    ```output
    ........
    {'c0': ['000',
    '000',
    '000',
    '000',
    '000',
    '000',
    '000',
    ...
    ]}
    ```

1. Visualize the results

We can then visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing.html).

```python
%matplotlib inline
import pylab as pl
pl.hist(results["c0"])
pl.ylabel("Counts")
pl.xlabel("Bitstring")
```

![alt_text=Honeywell job output](../media/honeywell-results.png)

## [Cirq](#tab/tabid-cirq)



    ADD CIRQ HONEYWELL INSTRUCTIONS



## [Qiskit](#tab/tabid-qiskit)



    ADD QISKIT HONEYWELL INSTRUCTIONS



***