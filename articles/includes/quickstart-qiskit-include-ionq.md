---
author: guenp
ms.author:  v-guenp
ms.date: 09/22/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## [Native quantum](#tab/tabid-native)

## Submit a quantum circuit to IonQ

1. Create a quantum circuit using the the language-agnostic JSON format supported by the [IonQ targets](xref:microsoft.quantum.providers.ionq) as described in the [IonQ API documentation](https://docs.ionq.com/#tag/quantum_programs). For instance, the below example creates a superposition between three qubits:

    ```python
    circuit = {
        "qubits": 3,
        "circuit": [
            {
            "gate": "h",
            "target": 0
            },
            {
            "gate": "cnot",
            "control": 0,
            "target": 1
            },
            {
            "gate": "cnot",
            "control": 0,
            "target": 2
            },
        ]
    }
    ```

1. Submit the circuit to the IonQ target. In the below example we are using the IonQ simulator. This returns a `Job` (for more info, see [Azure Quantum Job](xref:microsoft.quantum.optimization.job-reference)).

    ```python
    target = IonQ(workspace=workspace, target="ionq.simulator")
    job = target.submit(circuit)
    ```

1. Wait until the job is complete and fetch the results.

    ```python
    results = job.get_results()
    results
    ```

    ```output
    .....
    {'duration': 8240356, 'histogram': {'0': 0.5, '7': 0.5}}
    ```

1. Visualize the results

We can then visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing.html).

```python
%matplotlib inline
import pylab as pl
pl.rcParams["font.size"] = 16
hist = {format(n, "03b"): 0 for n in range(8)}
hist.update({format(int(k), "03b"): v for k, v in results["histogram"].items()})
pl.bar(hist.keys(), hist.values())
pl.ylabel("Probabilities")
```

![alt_text=IonQ job output](../media/ionq-results.png)

## [Cirq](#tab/tabid-cirq)



    ADD CIRQ IONQ INSTRUCTIONS





## [Qiskit](#tab/tabid-qiskit)


    ADD QISKIT IONQ INSTRUCTIONS

***