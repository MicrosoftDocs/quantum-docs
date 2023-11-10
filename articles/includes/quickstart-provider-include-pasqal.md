---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 11/10/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [target, targets]
---





## Install the pulser packages

To submit the pulse sequences, install the pulser packages:

```python
    !pip -q install pulser
    !pip -q install pulser-core
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
from azure.quantum import Workspace

workspace = Workspace(
    resource_id="",
    location=""
)
```

## Write a pulse sequence

1. First, load the required imports:

    ```python
    import numpy as np
    import pulser
    from pprint import pprint
    from pulser import Pulse, Sequence, Register
    ```

1. 

    ```python
    L = 4
    square = np.array([[i, j] for i in range(L) for j in range(L)], dtype=float)
    square -= np.mean(square, axis=0)
    square *= 5
    
    qubits = dict(enumerate(square))
    reg = Register(qubits)
    reg.draw()
    ```
1. 

    ```python
    from pulser.devices import Chadoq2
    
    seq = Sequence(reg, Chadoq2)
    
    seq.declare_channel("ch0", "raman_local")
    print("Available channels after declaring 'ch0':")
    pprint(seq.available_channels)
    
    seq.declare_channel("ch1", "rydberg_local", initial_target=4)
    print("\nAvailable channels after declaring 'ch1':")
    pprint(seq.available_channels)
    ```	

1. Convert the sequence to a JSON string

```python
import json

# Convert the sequence to a JSON string
def prepare_input_data(seq):
    input_data = {}
    input_data["sequence_builder"] = json.loads(seq.to_abstract_repr())
    to_send = json.dumps(input_data)
    #print(json.dumps(input_data, indent=4, sort_keys=True))
    return to_send

# Submit the job with proper input and output data formats
def submit_job(target, seq):
    job = target.submit(
        input_data=prepare_input_data(seq), 
        input_data_format="pasqal.pulser.v1", 
        output_data_format="pasqal.pulser-results.v1",
        content_type="text/plain",
        name="Pasqal sequence",
        input_params={
            "count": 10
        }
    )

    print(f"Queued job: {job.id}")
    job.wait_until_completed()
    print(f"Job completed with state: {job.details.status}")
    result = job.get_results()

    return result
```

## Submit a quantum circuit to PASQAL

Submit the program to the PASQAL target.

```python
target = workspace.get_targets(name="pasqal.sim.emu_tn")

submit_job(target, seq)
```