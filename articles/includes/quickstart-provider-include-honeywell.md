---
author: guenp
ms.author:  v-guenp
ms.date: 11/09/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## Load the required imports

First, run the following cell to load the required imports:

```python
from azure.quantum import Workspace
```

## Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program will need the resource ID and the
location of your Azure Quantum workspace. Log in to your Azure account,
<https://portal.azure.com>, navigate to your Azure Quantum workspace, and
copy the values from the header.

![How to retrieve the resource ID and location from an Azure Quantum workspace](../media/azure-quantum-resource-id.png)

Paste the values into the following `Workspace` constructor to
create a `workspace` object that connects to your Azure Quantum workspace.

```python
workspace = Workspace(
    resource_id="",
    location=""
)
```

## Submit a quantum circuit to the Honeywell API validator

> [!NOTE]
> The [Honeywell API validator](xref:microsoft.quantum.providers.honeywell#api-validator) target will always return 0 on measurement.

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

1. Wait until the job is complete and then fetch the results.

    ```python
    results = job.get_results()
    print(results)
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

1. You can then visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing/index.html).

    ```python
    import pylab as pl
    pl.hist(results["c0"])
    pl.ylabel("Counts")
    pl.xlabel("Bitstring")
    ```

![Honeywell job output](../media/honeywell-results.png)


## Calculate job cost

Before running a job on the QPU, you may want to estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the following script:

```python
HQC = 5 + num_shots * (N_1q + 10 * N_2q + 5 * N_m) / 5000
```

this returns the cost in HQC, or "Honeywell Quantum Credits". Here, `N_1q` is the number of one-qubit gates, `N_2q` is the number of two-qubit gates, `N_m` is the number of measurement operators, and `num_shots` is the number of shots.

For the most current pricing details, see [Honeywell System Model H1](xref:microsoft.quantum.providers.honeywell#honeywell-system-model-h1), or find your workspace and view pricing options in the "Provider" tab of your workspace via: [aka.ms/aq/myworkspaces](http://aka.ms/aq/myworkspaces).
