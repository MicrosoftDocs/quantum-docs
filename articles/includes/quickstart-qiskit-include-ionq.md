---
author: bradben
ms.author: brbenefield
ms.date: 01/21/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## Load the required imports

In Jupyter Notebooks, create a new notebook that uses the **Python 3** kernel. In the first cell, run the following code to load the required imports:

```python
from qiskit import QuantumCircuit
from qiskit.visualization import plot_histogram
from qiskit.tools.monitor import job_monitor
from azure.quantum.qiskit import AzureQuantumProvider
```

## Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program will need the resource ID and the
location of your Azure Quantum workspace. Log in to your Azure account,
<https://portal.azure.com>, navigate to your Azure Quantum workspace, and
copy the values from the header.

![How to retrieve the resource ID and location from an Azure Quantum workspace](../media/azure-quantum-resource-id.png)

Paste the values into the following `AzureQuantumProvider` constructor to
create a `provider` object that connects to your Azure Quantum workspace.

```python
provider = AzureQuantumProvider(
  resource_id="",
  location=""
)
```

### List all backends

You can now print all of the quantum computing backends that are
available on your workspace:

```python
print("This workspace's targets:")
for backend in provider.backends():
    print("- " + backend.name())
```

```output
This workspace's targets:
- ionq.qpu
- ionq.qpu.aria-1
- ionq.simulator
- microsoft.estimator
- quantinuum.hqs-lt-s1
- quantinuum.hqs-lt-s1-apival
- quantinuum.hqs-lt-s2
- quantinuum.hqs-lt-s2-apival
- quantinuum.hqs-lt-s1-sim
- quantinuum.hqs-lt-s2-sim
- quantinuum.qpu.h1-1
- quantinuum.sim.h1-1sc
- quantinuum.qpu.h1-2
- quantinuum.sim.h1-2sc
- quantinuum.sim.h1-1e
- quantinuum.sim.h1-2e
- rigetti.sim.qvm
- rigetti.qpu.aspen-11
- rigetti.qpu.aspen-m-2
- rigetti.qpu.aspen-m-3
```

## Run a simple circuit

First, create a simple Qiskit circuit to run.

```python
# Create a Quantum Circuit acting on the q register
circuit = QuantumCircuit(3, 3)
circuit.name = "Qiskit Sample - 3-qubit GHZ circuit"
circuit.h(0)
circuit.cx(0, 1)
circuit.cx(1, 2)
circuit.measure([0,1,2], [0, 1, 2])

# Print out the circuit
circuit.draw()
```

```html
     ┌───┐          ┌─┐      
q_0: ┤ H ├──■───────┤M├──────
     └───┘┌─┴─┐     └╥┘┌─┐   
q_1: ─────┤ X ├──■───╫─┤M├───
          └───┘┌─┴─┐ ║ └╥┘┌─┐
q_2: ──────────┤ X ├─╫──╫─┤M├
               └───┘ ║  ║ └╥┘
c: 3/════════════════╩══╩══╩═
                     0  1  2 
```

To get a result back quickly, use `provider.get_backend` to create a
`Backend` object to connect to the IonQ Simulator backend:

```python
simulator_backend = provider.get_backend("ionq.simulator")
```

IonQ backends support gates from a defined [gateset](https://docs.ionq.com/#section/Supported-Gates), which are compiled to run optimally on the hardware. If your circuit contains gates that are not in this list, you'll need to transpile into the supported gateset using the `transpile` function provided by Qiskit:

```python
from qiskit import transpile
circuit = transpile(circuit, simulator_backend)
```

This will return a new circuit object where gates are decomposed into gates that are supported by the specified backend.

You can now run the program via the Azure Quantum service and get the
result. The following cell submits a job that runs the circuit with
100 shots:

```python
job = simulator_backend.run(circuit, shots=100)
job_id = job.id()
print("Job id", job_id)
```

```output
Job id 00000000-0000-0000-0000-000000000000
```

To monitor job progress, you can use the Qiskit `job_monitor` imported
earlier to keep track of the Job\'s status. This call will
block until the job completes:

```python
job_monitor(job)
```

```output
Job Status: job has successfully run
```

To wait until the job is complete and return the results, run:

```python
result = job.result()
```

This returns a `qiskit.Result` object.

```python
type(result)
```

```output
qiskit.result.result.Result
```

```python
print(result)
```

```output
Result(backend_name='ionq.simulator', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='00000000-0000-0000-0000-000000000000', success=True, results=[ExperimentResult(shots=100, success=True, meas_level=2, data=ExperimentResultData(counts={'000': 50, '111': 50}, probabilities={'000': 0.5, '111': 0.5}), header=QobjExperimentHeader(meas_map='[0, 1, 2]', name='Qiskit Sample - 3-qubit GHZ circuit', num_qubits='3', qiskit='True'))])
```

Because the result is an object native to the Qiskit package, you can use
Qiskit\'s `result.get_counts` and `plot_histogram` to visualize the
results. To make sure that all possible bitstring labels are represented,
add them to `counts`.

```python
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print(counts)
plot_histogram(counts)
```

```output
{'000': 50, '001': 0, '010': 0, '011': 0, '100': 0, '101': 0, '110': 0, '111': 50}
```

![Qiskit circuit result on IonQ Simulator](../media/azure-quantum-qiskit-ionq-result-1.png)


## Estimate job cost

Before running a job on the QPU, you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the `estimate_cost` method:

```python
backend = provider.get_backend("ionq.qpu")
cost = backend.estimate_cost(circuit, shots=1024)

print(f"Estimated cost: {cost.estimated_total}")
```

This prints the estimated cost in USD.

For the most current pricing details, see [IonQ Pricing](xref:microsoft.quantum.providers.ionq#pricing), or find your workspace and view pricing options in the "Provider" tab of your workspace via: [aka.ms/aq/myworkspaces](https://aka.ms/aq/myworkspaces).


## Run on IonQ QPU

To connect to real hardware (a [Quantum Processor Unit](xref:microsoft.quantum.target-profiles#quantum-processing-units-qpu-different-profiles) (QPU)), simply
provide the name of the target `"ionq.qpu"` to the `provider.get_backend` method:

```python
qpu_backend = provider.get_backend("ionq.qpu")
```

Submit the circuit to run on Azure Quantum. 

> [!NOTE] 
> The time required to run a circuit on the QPU may vary depending on current queue times.

As before, use `job_monitor` to keep track of the job
status, and `plot_histogram` to plot the results.

```python
# Submit the circuit to run on Azure Quantum
qpu_job = qpu_backend.run(circuit, shots=1024)
job_id = qpu_job.id()
print("Job id", job_id)

# Monitor job progress and wait until complete:
job_monitor(qpu_job)

# Get the job results (this method also waits for the Job to complete):
result = qpu_job.result()
print(result)
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print(counts)
plot_histogram(counts)
```

```output
Job id 00000000-0000-0000-0000-000000000000
Job Status: job has successfully run
Result(backend_name='ionq.simulator', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='00000000-0000-0000-0000-000000000000', success=True, results=[ExperimentResult(shots=1024, success=True, meas_level=2, data=ExperimentResultData(counts={'0': 505, '1': 6, '2': 1, '3': 1, '4': 1, '5': 10, '6': 11, '7': 488}, probabilities={'0': 0.4932, '1': 0.0059, '2': 0.001, '3': 0.001, '4': 0.001, '5': 0.0098, '6': 0.0117, '7': 0.4766}), header=QobjExperimentHeader(name='Qiskit Sample - 3-qubit GHZ circuit', num_qubits='3', qiskit='True'))])
{'000': 505, '001': 6, '010': 1, '011': 1, '100': 1, '101': 10, '110': 11, '111': 488}
```

![Qiskit circuit result on IonQ QPU](../media/azure-quantum-qiskit-ionq-result-2.png)

