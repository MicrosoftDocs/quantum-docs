---
author: guenp
ms.author:  v-guenp
ms.date: 09/22/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## Load the required imports

First, run the following cell for the required imports:

```python
from azure.quantum import Workspace
```

## Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program will need the resource ID and the
location of your Azure Quantum workspace. Login to your Azure account,
<https://portal.azure.com>, navigate to your Azure Quantum workspace, and
copy the values from the header.

Paste the values into the following `Workspace` constructor to
create a `workspace` object that connects to your Azure Quantum workspace.

```python
from azure.quantum import Workspace
workspace = Workspace(
    resource_id="",
    location=""
)
```

## Submit a quantum circuit to Honeywell

1. Create a quantum circuit in the [OpenQASM](https://en.wikipedia.org/wiki/OpenQASM) representation. For example, the following example creates a Teleportation circuit:

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

1. Submit the circuit to the Honeywell target. The following example uses the Honeywell API validator, which returns a `Job` object. For more information, see [Azure Quantum Job](xref:microsoft.quantum.optimization.job-reference).

    ```python
    target = workspace.get_targets(name="honeywell.hqs-lt-s1-apival")
    job = target.submit(circuit, num_shots=500)
    ```

1. Wait until the job is complete and then fetch the results. Note that the API validator only returns zeroes for qubit read-out results.

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

You can then visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing.html).

```python
%matplotlib inline
import pylab as pl
pl.hist(results["c0"])
pl.ylabel("Counts")
pl.xlabel("Bitstring")
```

![Honeywell job output](../media/honeywell-results.png)

