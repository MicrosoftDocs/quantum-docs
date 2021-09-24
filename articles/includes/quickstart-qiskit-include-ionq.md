---
author: guenp
ms.author:  v-guenp
ms.date: 09/22/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## Install the `azure-quantum` Python package

The `azure-quantum` Python package contains the necessary functionality for connecting to an Azure Quantum workspace and submitting quantum circuits to the quantum computing targets such as [IonQ](xref:microsoft.quantum.providers.ionq) and [Honeywell](xref:microsoft.quantum.providers.honeywell).

1. Install [Python](https://www.python.org/downloads/) 3.6 or later in case you haven't already.
1. Install [PIP](https://pip.pypa.io/en/stable/) and ensure you have **version 19.2 or higher**.
    > Optionally, if you are using [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual#Downloads), create a new environment by downloading the [environment.yml](https://github.com/microsoft/qdk-python/blob/main/azure-quantum/environment.yml) file and running the following:

    >```shell
    >conda env create -f environment.yml
    >```

    > This creates a new conda environment that you can activate with the following:

    >```shell
    >conda activate azurequantum
    >```

1. Install the `azure-quantum` package using pip.

    ```shell
    pip install azure-quantum[qiskit]
    ```

1. Start your favorite code editor or interactive Python tool, such as [VS Code](https://code.visualstudio.com/docs/python/jupyter-support-py), [Jupyter](https://jupyter.readthedocs.io/en/latest/content-quickstart.html) or [iPython](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html).

## Load the required imports

First, run the following cell to load the required imports:

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
print([backend.name() for backend in provider.backends()])
```

```output
['ionq.qpu', 'ionq.simulator', 'honeywell.hqs-lt-s1', 'honeywell.hqs-lt-s1-apival', 'honeywell.hqs-lt-s2', 'honeywell.hqs-lt-s2-apival', 'honeywell.hqs-lt-s1-sim']
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
earlier to keep track of the Job\'s status. Note that this call will
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

Because this is an object native to the Qiskit package, you can use
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
![Qiskit circuit result on IonQ Simulator](../media/azure-quantum-qiskit-ionq-result-1.png)
```

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
![Qiskit circuit result on IonQ QPU](../media/azure-quantum-qiskit-ionq-result-2.png)
```
