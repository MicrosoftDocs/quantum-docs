---
author: bradben
ms.author: brbenefield
ms.date: 12/06/2022
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

[!INCLUDE [Quantinuum target name update](quantinuum-name-change.md)]

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

## Run on the syntax checker 

To test the program before running it on the hardware, first run it on the Quantinuum syntax checker. 

> [!NOTE]
> The [Quantinuum syntax checker](xref:microsoft.quantum.providers.quantinuum#api-validator) backend will always return 0 on measurement.

```python
# Get Quantinuum's syntax checker backend:
syntax_backend = provider.get_backend("quantinuum.sim.h1-1sc")
```

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

You can now run the program via the Azure Quantum service and get the
result. The following cell submits a job that runs the circuit with
1024 shots:

```python
# Submit the circuit to run on Azure Quantum
job = syntax_backend.run(circuit, shots=1024)
job_id = job.id()
print("Job id", job_id)

# Monitor job progress and wait until complete:
job_monitor(job)

# Get the job results (this method also waits for the Job to complete):
result = job.result()
print(result)
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print(counts)
plot_histogram(counts)
```

```output
Job id 00000000-0000-0000-0000-000000000000
Job Status: job has successfully run
Result(backend_name='quantinuum.qpu.h1-1sc', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='00000000-0000-0000-0000-000000000000', success=True, results=[ExperimentResult(shots=1024, success=True, meas_level=2, data=ExperimentResultData(counts={'000': 1024}, probabilities={'000': 1.0}), header=QobjExperimentHeader(name='Qiskit Sample - 3-qubit GHZ circuit'))])
{'000': 1024, '001': 0, '010': 0, '011': 0, '100': 0, '101': 0, '110': 0, '111': 0}
```

![Qiskit circuit result on Quantinuum API validator](../media/azure-quantum-qiskit-hw-result-1.png)

Looking at the histogram, you may notice that the random number generator returned 0 every time, which isn't very random. This is because that, while the API Validator ensures that your code will run successfully on Quantinuum hardware, it also returns 0 for every quantum measurement. For a true random number generator, you need to run your circuit on quantum hardware.

## Estimate job cost

Before running a job on the QPU, you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the `estimate_cost` method:

```python
qpu_backend = provider.get_backend("quantinuum.qpu.h1-1")
cost = qpu_backend.estimate_cost(circuit, shots=1024)

print(f"Estimated cost: {cost.estimated_total}")
```

This prints the estimated cost in H-System Quantum Credits (HQCs).

For the most current pricing details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#quantinuum), or find your workspace and view pricing options in the **Provider** tab of your workspace via: [aka.ms/aq/myworkspaces](https://aka.ms/aq/myworkspaces).


## Run on a Quantinuum QPU 

After running successfully on the API validator, you can run your job on one of Quantinuum's hardware processors (a [Quantum Processor Unit](xref:microsoft.quantum.target-profiles#quantum-processing-units-qpu-different-profiles) (QPU)).

> [!NOTE] 
> The time required to run a circuit on the QPU may vary depending on current queue times.

```python
# Get Quantinuum's QPU backend:
qpu_backend = provider.get_backend("quantinuum.qpu.h1-1")
```

```python
# Submit the circuit to run on Azure Quantum
job = qpu_backend.run(circuit, shots=1024)
job_id = job.id()
print("Job id", job_id)

# Monitor job progress and wait until complete:
job_monitor(job)
```

```output
Job id 00000000-0000-0000-0000-000000000000
Job Status: job has successfully run
```

```python
# Get the job results (this method also waits for the Job to complete):
result = job.result()
print(result)
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print(counts)
plot_histogram(counts)
```

```output
Result(backend_name='quantinuum.qpu.h1-1', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='00000000-0000-0000-0000-000000000000', success=True, results=[ExperimentResult(shots=1024, success=True, meas_level=2, data=ExperimentResultData(counts={'011': 16, '010': 5, '001': 1, '000': 500, '111': 471, '101': 6, '100': 17, '110': 8}, probabilities={'011': 0.015625, '010': 0.0048828125, '001': 0.0009765625, '000': 0.48828125, '111': 0.4599609375, '101': 0.005859375, '100': 0.0166015625, '110': 0.0078125}), header=QobjExperimentHeader(name='Qiskit Sample - 3-qubit GHZ circuit'))])
{'000': 500, '001': 1, '010': 5, '011': 16, '100': 17, '101': 6, '110': 8, '111': 471}
```

![Qiskit circuit result on Quantinuum QPU](../media/azure-quantum-qiskit-hw-result-2.png)

