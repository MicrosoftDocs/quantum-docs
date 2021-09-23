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





# Getting started with Cirq and IonQ on Azure Quantum

This notebooks shows how to send a basic quantum circuit to an IonQ
target via Azure Quantum.

First, install `azure-quantum` with the Cirq dependencies:

```python
!pip install azure-quantum[cirq]==0.18.2109.165000a1 --quiet --extra-index-url=https://pkgs.dev.azure.com/ms-quantum-public/9af4e09e-a436-4aca-9559-2094cfe8d80c/_packaging/alpha/pypi/simple/
!pip install matplotlib --quiet
```

## Connecting to the Azure Quantum service

To connect to the Azure Quantum service, find the resource ID and
location of your Workspace from the Azure Quantum portal here:
<https://portal.azure.com>. Navigate to your Azure Quantum workspace and
copy the values from the header.

Paste the values into the `AzureQuantumProvider` constructor below to
create a `provider` that connects to your Azure Quantum Workspace.
Optionally, specify a default target:

```python
from azure.quantum.cirq import AzureQuantumService
service = AzureQuantumService(
    resource_id="",
    location="",
    default_target="ionq.simulator"
)
```

### List all targets

You can now list all the targets that you have access to, including the
current queue time and availability.

```python
service.targets()
```

    [<Target name="ionq.qpu", avg. queue time=345 s, Available>,
     <Target name="ionq.simulator", avg. queue time=4 s, Available>,
     <Target name="honeywell.hqs-lt-s1", avg. queue time=0 s, Unavailable>,
     <Target name="honeywell.hqs-lt-s1-apival", avg. queue time=0 s, Available>,
     <Target name="honeywell.hqs-lt-s2", avg. queue time=313169 s, Available>,
     <Target name="honeywell.hqs-lt-s2-apival", avg. queue time=0 s, Available>,
     <Target name="honeywell.hqs-lt-s1-sim", avg. queue time=1062 s, Available>]

## Run a simple circuit

Let\'s create a simple Cirq circuit to run. This circuit uses the square
root of X gate, native to the IonQ hardware system.

```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.X(q0)**0.5,             # Square root of X
    cirq.CX(q0, q1),              # CNOT
    cirq.measure(q0, q1, key='b') # Measure both qubits
)
circuit
```

```{=html}
<pre style="overflow: auto; white-space: pre;">0: ───X^0.5───@───M(&#x27;b&#x27;)───
              │   │
1: ───────────X───M────────</pre>
```

You can now run the program via the Azure Quantum service and get the
result. The following cell will submit a job that runs the circuit with
100 shots, wait until the job is completed and return the results.

```python
%%time
result = service.run(program=circuit, repetitions=100)
```

    CPU times: user 74.9 ms, sys: 0 ns, total: 74.9 ms
    Wall time: 12.5 s

This returns a `cirq.Result` object.

```python
print(result)
```

    b=1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010, 1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010

The previous job ran on the default simulator we specified,
`"ionq.simulator"`. To run on the QPU, provide `"ionq.qpu"` as the
`target` argument:

```python
%%time
result = service.run(
    program=circuit,
    repetitions=100,
    target="ionq.qpu",
    timeout_seconds=500 # Set timeout to 500 seconds to accomodate current queue time on QPU
)
```

Again, this returns a `cirq.Result` object.

```python
print(result)
```

    b=0101011011011111100001011101101011011110100010000000011110111000100100110110101100110001001111101111, 0101011011011111100001011101101011011110100010000000011110111000100100110110101100110001001111101111

## Asynchronous model using Jobs

For long-running circuits, it can be useful to run them asynchronously.
The `service.create_job` method returns a `Job`, which you can use to
get the results after the job has run successfully.

```python
%%time
job = service.create_job(
    program=circuit,
    repetitions=100,
    target="ionq.simulator"
)
```

    CPU times: user 20.3 ms, sys: 12 ms, total: 32.3 ms
    Wall time: 961 ms

To check on the job status, use `job.status()`:

```python
job.status()
```

    'completed'

To wait for the job to be done and get the results, use the blocking
call `job.results()`:

```python
%%time
result = job.results()
print(result)
```

    00: 0.5
    11: 0.5
    CPU times: user 276 µs, sys: 143 µs, total: 419 µs
    Wall time: 314 µs

Note that this does not return a `cirq.Result` object. Instead it
returns a result object that is specific to the IonQ simulator and uses
state probabilities instead of shot data.

```python
type(result)
```

    cirq_ionq.results.SimulatorResult

To convert this to a `cirq.Result` object, use
`result.to_cirq_result()`:

```python
result.to_cirq_result()
```

    b=1110101111111110111000011101011111001100010000001011011101001111001111001101100111010000001100011100, 1110101111111110111000011101011111001100010000001011011101001111001111001101100111010000001100011100





## [Qiskit](#tab/tabid-qiskit)


# Getting started with Qiskit and IonQ on Azure Quantum

This example notebook shows how to send a basic quantum circuit built
with Qiskit to the IonQ Quantum Computing target on Azure Quantum.

First, install `azure-quantum` with the `qiskit` dependencies:

```python
!pip install azure-quantum[qiskit]==0.18.2109.165000a1 --quiet --extra-index-url=https://pkgs.dev.azure.com/ms-quantum-public/9af4e09e-a436-4aca-9559-2094cfe8d80c/_packaging/alpha/pypi/simple/
!pip install matplotlib --quiet
```

And import the required packages for this sample:

```python
from qiskit import QuantumCircuit
from qiskit.visualization import plot_histogram
from qiskit.tools.monitor import job_monitor
from azure.quantum.qiskit import AzureQuantumProvider
```

## Connecting to the Azure Quantum service

To connect to the Azure Quantum service, find the resource ID and
location of your Workspace from the Azure Quantum portal here:
<https://portal.azure.com>. Navigate to your Azure Quantum workspace and
copy the values from the header.

Paste the values into the `AzureQuantumProvider` constructor below to
create a `provider` that connects to your Azure Quantum Workspace:

```python
provider = AzureQuantumProvider(
  resource_id="",
  location=""
)
```

### List all backends

You can now print all of the Quantum Computing backends that are
available on your Workspace:

```python
print([backend.name() for backend in provider.backends()])
```
    ['ionq.qpu', 'ionq.simulator', 'honeywell.hqs-lt-s1', 'honeywell.hqs-lt-s1-apival', 'honeywell.hqs-lt-s2', 'honeywell.hqs-lt-s2-apival', 'honeywell.hqs-lt-s1-sim']

## Run a simple circuit

Let\'s create a simple Qiskit circuit to run.

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
<pre style="word-wrap: normal;white-space: pre;background: #fff0;line-height: 1.1;font-family: &quot;Courier New&quot;,Courier,monospace">     ┌───┐          ┌─┐      
q_0: ┤ H ├──■───────┤M├──────
     └───┘┌─┴─┐     └╥┘┌─┐   
q_1: ─────┤ X ├──■───╫─┤M├───
          └───┘┌─┴─┐ ║ └╥┘┌─┐
q_2: ──────────┤ X ├─╫──╫─┤M├
               └───┘ ║  ║ └╥┘
c: 3/════════════════╩══╩══╩═
                     0  1  2 </pre>
```

To get a result back quickly, use `provider.get_backend` to create a
`Backend` object to connect to the IonQ Simulator back-end:

```python
simulator_backend = provider.get_backend("ionq.simulator")
```

You can now run the program via the Azure Quantum service and get the
result. The following cell will submit a job that runs the circuit with
100 shots:

```python
job = simulator_backend.run(circuit, shots=100)
job_id = job.id()
print("Job id", job_id)
```
    Job id 6255e7ce-1ca0-11ec-9d4c-00155dd132ce

To monitor job progress, we can use the Qiskit `job_monitor` we imported
earlier to keep track of the Job\'s status. Note that this call will
block until the job completes:

```python
job_monitor(job)
```
    Job Status: job has successfully run

To wait until the job is completed and return the results, run:

```python
result = job.result()
```

This returns a `qiskit.Result` object.

```python
type(result)
```
    qiskit.result.result.Result

```python
print(result)
```
    Result(backend_name='ionq.simulator', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='6255e7ce-1ca0-11ec-9d4c-00155dd132ce', success=True, results=[ExperimentResult(shots=100, success=True, meas_level=2, data=ExperimentResultData(counts={'000': 50, '111': 50}, probabilities={'000': 0.5, '111': 0.5}), header=QobjExperimentHeader(meas_map='[0, 1, 2]', name='Qiskit Sample - 3-qubit GHZ circuit', num_qubits='3', qiskit='True'))])

Because this is an object native to the Qiskit package, we can use
Qiskit\'s `result.get_counts` and `plot_histogram` to visualize the
results. To make sure all possible bitstring lables are represented we
add them to `counts`.

```python
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print(counts)
plot_histogram(counts);
```
    {'000': 50, '001': 0, '010': 0, '011': 0, '100': 0, '101': 0, '110': 0, '111': 50}
![](0fd9147b17ddae64a3c6ead2a3dc76cd0e9a7867.png)

### Run on IonQ QPU

To connect to real hardware (Quantum Processing Unit or QPU), simply
provide the name of the target `"ionq.qpu"` to the
`provider.get_backend` method:

```python
qpu_backend = provider.get_backend("ionq.qpu")
```

Submit the circuit to run on Azure Quantum. Note that depending on queue
times this may take a while to run!

Here we will again use the `job_monitor` to keep track of the job
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
    Job id 614da722-fa72-11eb-9e14-00155df1914a
    Job Status: job has successfully run
    Result(backend_name='ionq.simulator', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='614da722-fa72-11eb-9e14-00155df1914a', success=True, results=[ExperimentResult(shots=1024, success=True, meas_level=2, data=ExperimentResultData(counts={'0': 505, '1': 6, '2': 1, '3': 1, '4': 1, '5': 10, '6': 11, '7': 488}, probabilities={'0': 0.4932, '1': 0.0059, '2': 0.001, '3': 0.001, '4': 0.001, '5': 0.0098, '6': 0.0117, '7': 0.4766}), header=QobjExperimentHeader(name='Qiskit Sample - 3-qubit GHZ circuit', num_qubits='3', qiskit='True'))])
    {'000': 505, '001': 6, '010': 1, '011': 1, '100': 1, '101': 10, '110': 11, '111': 488}
![](43ac66a2f89cbb6c1983455be0da3d258b2708f4.png)

# Quantum Phase Estimation (QPE)

The `azure-quantum[qiskit]` also supports more advanced examples. Let\'s
go with the QPE example from Qiskit textbook:
<https://qiskit.org/textbook/ch-algorithms/quantum-phase-estimation.html>

Below, all cells from the example notebook are copy-pasted. Feel free to
give it a try yourself!

```python
#initialization
import matplotlib.pyplot as plt
import numpy as np
import math

# importing Qiskit
from qiskit import IBMQ, Aer, transpile, assemble
from qiskit import QuantumCircuit, ClassicalRegister, QuantumRegister

# import basic plot tools
from qiskit.visualization import plot_histogram
```

```python
def qft_dagger(qc, n):
    """n-qubit QFTdagger the first n qubits in circ"""
    # Don't forget the Swaps!
    for qubit in range(n//2):
        qc.swap(qubit, n-qubit-1)
    for j in range(n):
        for m in range(j):
            qc.cp(-math.pi/float(2**(j-m)), m, j)
        qc.h(j)
```

```python
# Create and set up circuit
qpe2 = QuantumCircuit(4, 3)

# Apply H-Gates to counting qubits:
for qubit in range(3):
    qpe2.h(qubit)

# Prepare our eigenstate |psi>:
qpe2.x(3)

# Do the controlled-U operations:
angle = 2*math.pi/3
repetitions = 1
for counting_qubit in range(3):
    for i in range(repetitions):
        qpe2.cp(angle, counting_qubit, 3);
    repetitions *= 2

# Do the inverse QFT:
qft_dagger(qpe2, 3)

# Measure of course!
for n in range(3):
    qpe2.measure(n,n)

qpe2.draw()
```
```html
<pre style="word-wrap: normal;white-space: pre;background: #fff0;line-height: 1.1;font-family: &quot;Courier New&quot;,Courier,monospace">     ┌───┐                                                            »
q_0: ┤ H ├─■──────────────────────────────────────────────────────────»
     ├───┤ │                                                          »
q_1: ┤ H ├─┼─────────■─────────■──────────────────────────────────────»
     ├───┤ │         │         │                                      »
q_2: ┤ H ├─┼─────────┼─────────┼─────────■─────────■─────────■────────»
     ├───┤ │P(2π/3)  │P(2π/3)  │P(2π/3)  │P(2π/3)  │P(2π/3)  │P(2π/3) »
q_3: ┤ X ├─■─────────■─────────■─────────■─────────■─────────■────────»
     └───┘                                                            »
c: 3/═════════════════════════════════════════════════════════════════»
                                                                      »
«                  ┌───┐                                   ┌─┐           
«q_0: ───────────X─┤ H ├─■──────────────■──────────────────┤M├───────────
«                │ └───┘ │P(-π/2) ┌───┐ │                  └╥┘     ┌─┐   
«q_1: ───────────┼───────■────────┤ H ├─┼─────────■─────────╫──────┤M├───
«                │                └───┘ │P(-π/4)  │P(-π/2)  ║ ┌───┐└╥┘┌─┐
«q_2: ─■─────────X──────────────────────■─────────■─────────╫─┤ H ├─╫─┤M├
«      │P(2π/3)                                             ║ └───┘ ║ └╥┘
«q_3: ─■────────────────────────────────────────────────────╫───────╫──╫─
«                                                           ║       ║  ║ 
«c: 3/══════════════════════════════════════════════════════╩═══════╩══╩═
«                                                           0       1  2 </pre>
```

The below cell is copied from the notebook, and runs the circuit on the
simulator. We\'ve replaced the simulator now with the IonQ simulator
backend, and commented out the `transpile` step:

```python
# Let's see the results!
# aer_sim = Aer.get_backend('aer_simulator')

shots = 4096
# t_qpe2 = transpile(qpe2, aer_sim)
qobj = assemble(qpe2, shots=shots)
# results = aer_sim.run(qobj).result()
results = simulator_backend.run(qobj).result()

answer = results.get_counts()

plot_histogram(answer);
```
    .....
![](2701507d294396f486ef69860cb68cd998339f56.png)



***
