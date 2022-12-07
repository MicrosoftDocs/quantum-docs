---
author: bradben
ms.author: brbenefield
ms.date: 09/26/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## Load the required imports

First, run the following cell to load the required imports:

```python
from azure.quantum.cirq import AzureQuantumService
```

## Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program will need the resource ID and the
location of your Azure Quantum workspace. Log in to your Azure account,
<https://portal.azure.com>, navigate to your Azure Quantum workspace, and
copy the values from the header.

![How to retrieve the resource ID and location from an Azure Quantum workspace](../media/azure-quantum-resource-id.png)

Paste the values into the following `AzureQuantumService` constructor to
create a `service` object that connects to your Azure Quantum workspace.
Optionally, specify a default target:

```python
from azure.quantum.cirq import AzureQuantumService
service = AzureQuantumService(
    resource_id="",
    location="",
    default_target="quantinuum.sim.h1-1sc"
)
```

### List all targets

[!INCLUDE [Quantinuum target name update](quantinuum-name-change.md)]

You can now list all the targets that you have access to, including the
current queue time and availability.

```python
print(service.targets())
```

```output
[<Target name="quantinuum.qpu.h1-1", avg. queue time=0 s, Degraded>,
<Target name="quantinuum.sim.h1-1sc", avg. queue time=1 s, Available>,
<Target name="quantinuum.qpu.h1-2", avg. queue time=217300 s, Unavailable>,
<Target name="quantinuum.sim.h1-2sc", avg. queue time=0 s, Available>,
<Target name="quantinuum.sim.h1-1e", avg. queue time=40 s, Available>,
<Target name="quantinuum.sim.h1-2e", avg. queue time=64 s, Available>,
<Target name="ionq.qpu", avg. queue time=229 s, Available>,
<Target name="ionq.simulator", avg. queue time=3 s, Available>,
<Target name="ionq.qpu.aria-1", avg. queue time=1136774 s, Available>]
```

## Run a simple circuit on the API validator

> [!NOTE]
> The [Quantinuum API validator](xref:microsoft.quantum.providers.quantinuum#api-validator) target will always return 0 on measurement.

Next, create a simple Cirq circuit to run.

```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.H(q0), # Hadamard
    cirq.CNOT(q0, q1), # CNOT
    cirq.measure(q0, q1, key='b') # Measure both qubits
)
print(circuit)
```

```output
0: ───H───@───M────────
          │   │
1: ───────X───M────────
```

You can now run the program via the Azure Quantum service and get the
result. The following cell submits a job that runs the circuit with
100 shots, waits until the job is complete, and returns the results.

```python
result = service.run(program=circuit, repetitions=100)
```

This returns a `cirq.Result` object.

```python
print(result)
```

```output
    b=0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

You can plot the results in a histogram:

```python
import pylab as pl

pl.hist(result.data)
pl.ylabel("Counts")
pl.xlabel("Result")
```

Looking at the histogram, you may notice that the random number generator returned 0 every time, which is not very random. This is because that, while the API Validator ensures that your code will run successfully on Quantinuum hardware, it also returns 0 for every quantum measurement. For a true random number generator, you need to run your circuit on quantum hardware.

## Estimate job cost

Before running a job on the QPU, you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the `estimate_cost` method:

```python
cost = service.estimate_cost(
    program=circuit,
    repetitions=100,
    target="quantinuum.qpu.h1-1sc"
)

print(f"Estimated cost: {cost.estimated_total}")
```

This prints the estimated cost in H-System Credits (HQCs).

For the most current pricing details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#quantinuum), or find your workspace and view pricing options in the "Provider" tab of your workspace via: [aka.ms/aq/myworkspaces](https://aka.ms/aq/myworkspaces).


## Asynchronous workflow using Jobs

For long-running circuits, it can be useful to run them asynchronously.
The `service.create_job` method returns a `Job` object, which you can use to
get the results after the job has run successfully.

```python
job = service.create_job(
    program=circuit,
    repetitions=100
)
```

To check on the job status, use `job.status()`:

```python
print(job.status())
```

```output
'Waiting'
```

To wait for the job to complete and then get the results, use the blocking
call `job.results()`:

```python
result = job.results()
print(result)
```

```output
    {'m_b': ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']}
```

Note that this does not return a `cirq.Result` object. Instead, it
returns a dictionary of bitstring measurement results indexed by measurement key.
