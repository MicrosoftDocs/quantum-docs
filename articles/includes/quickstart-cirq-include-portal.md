---
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 08/09/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Create a new notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select the workspace from the previous step.
1. In the left blade, select **Notebooks**.
1. Click **My Notebooks** and click **Add New**.
1. Type a name for the file, for example *Cirq.ipynb*, and click **Create file**. 

When your new notebook opens, it automatically creates the code for the first cell, based on your subscription and workspace information.

```py
from azure.quantum import Workspace
workspace = Workspace ( 
  resource_id = "", # Add your resource_id 
  location = ""  # Add your workspace location (for example, "westus") 
)
```

> [!NOTE]
> Unless otherwise noted, you should run each cell in order as you create it to avoid any compilation issues. 

Click the triangular "play" icon to the left of the cell to run the code. 

## Load the required imports

First, you'll need to import an additional module. 

Click **+ Code** to add a new cell, then add and run the following code:

```python
from azure.quantum.cirq import AzureQuantumService
```

## Connect to the Azure Quantum service

Next, create an `AzureQuantumService` object using the `workspace` object from the previous cell to connect to your Azure Quantum workspace.  Add a new cell with the following code:

```python
service = AzureQuantumService(workspace)
```

## Define a simple circuit

Next, create a simple Cirq circuit to run. This circuit uses the square
root of X gate, native to the IonQ hardware system.

```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.X(q0)**0.5,             # Square root of X
    cirq.CX(q0, q1),              # CNOT
    cirq.measure(q0, q1, key='b') # Measure both qubits
)
print(circuit)
```

```output
0: ───X^0.5───@───M────────
              │   │
1: ───────────X───M────────
```

## List all targets

Use the `targets()`method to list all the targets in your workspace that can run your circuit, including the
current queue time and availability.

> [!NOTE]
> All the targets in your workspace may not be listed - only the targets that can accept a Cirq or OpenQASM circuit will be listed here. 

```python
print("This workspace's targets:")
for target in service.targets():
     print(target)
```

```output
This workspace's targets:
<Target name="quantinuum.qpu.h2-1", avg. queue time=0 s, Degraded>
<Target name="quantinuum.sim.h2-1sc", avg. queue time=1 s, Available>
<Target name="quantinuum.sim.h2-1e", avg. queue time=40 s, Available>
<Target name="ionq.simulator", avg. queue time=3 s, Available>
<Target name="ionq.qpu.aria-1", avg. queue time=1136774 s, Available>
```

> [!NOTE]
> The full list of target may be different for your workspace.


## Select a target to run your program

### [IonQ](#tab/tabid-ionq)

#### Run on the IonQ simulator

To check your circuit before running it on actual quantum hardware, you can use the IonQ simulator, `ionq.simulator`.  

The following cell submits a job that runs the circuit with
100 shots, waits until the job is complete, and returns the results.

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="ionq.simulator"
)
```

This returns a `cirq.Result` object.

```python
print(result)
```

```output
    b=1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010, 1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010
```

You can plot the results in a histogram:

```python
import pylab as pl

pl.hist(result.data)
pl.ylabel("Counts")
pl.xlabel("Result")
```

#### Estimate job cost

Before running a job on actual quantum hardware, or a [quantum processing unit](xref:microsoft.quantum.target-profiles) (QPU), you should estimate how much it will cost to run.

For the most current pricing details, see [IonQ Pricing](xref:microsoft.quantum.providers.ionq#pricing), or view pricing options in the **Providers** blade of your workspace.

#### Run on IonQ QPU

The previous job ran on the default simulator, `ionq.simulator`. However, you can also run it on IonQ's hardware processor, or [Quantum Processor Unit](xref:microsoft.quantum.target-profiles#quantum-processing-units-qpu-different-profiles) (QPU). To run on the IonQ QPU, provide `ionq.qpu.aria-1` as the
`target` argument:

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="ionq.qpu.aria-1",
    timeout_seconds=500 # Set timeout to accommodate queue time on QPU
)
```

> [!NOTE] 
> The time required to run a circuit on the QPU depends on current queue times. You can view the average queue time for a target by selecting the **Providers** blade of your workspace.

Again, this returns a `cirq.Result` object.

```python
print(result)
```

```output
    b=1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010, 1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010
```

#### Asynchronous model using Jobs

For long-running circuits, it can be useful to run them asynchronously.
The `service.create_job` method returns a `Job` object, which you can use to
get the results after the job has run successfully.

```python
job = service.create_job(
    program=circuit,
    repetitions=100,
    target="ionq.simulator"
)
```

To check on the job status, use `job.status()`:

```python
print(job.status())
```

```output
'completed'
```

To wait for the job to complete and then get the results, use the blocking
call `job.results()`:

```python
result = job.results()
print(result)
```

```output
00: 0.5
11: 0.5
```

> [!NOTE]
> The `job.results()` function does not return a `cirq.Result` object. Instead it returns a result object that is specific to the IonQ simulator and uses
state probabilities instead of shot data.

```python
type(result)
```

```output
cirq_ionq.results.SimulatorResult
```

To convert this to a `cirq.Result` object, use `result.to_cirq_result()`:

```python
print(result.to_cirq_result())
```

```output
b=1110101111111110111000011101011111001100010000001011011101001111001111001101100111010000001100011100, 1110101111111110111000011101011111001100010000001011011101001111001111001101100111010000001100011100
```

### [Quantinuum](#tab/tabid-quantinuum)

#### Run on the API Validator

To check your circuit before running it on actual quantum hardware, you can use the Quantinuum API Validator, `quantinuum.sim.h2-1sc`.

Add the following cell that submits a job to run the circuit with
100 shots, or repetitions, waits until the job is complete, and returns the results:

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="quantinuum.sim.h2-1sc"
)
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

#### Estimate job cost

Before running a job on actual quantum hardware, or a [quantum processing unit](xref:microsoft.quantum.target-profiles) (QPU), you should estimate how much it will cost to run.

For the most current pricing details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#quantinuum), or view pricing options in the **Providers** blade of your workspace.

#### Run on a Quantinuum QPU

After running successfully on the API validator and estimating the QPU cost, it's time to run your circuit on the hardware. 

> [!NOTE]
> The time required to run a circuit on the QPU depends on current queue times. You can view the average queue time for a target by selecting the **Providers** blade of your workspace.

Use the same `run` method and operations that you used previously with the API Validator to submit your job and display the results:

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="quantinuum.qpu.h2-1"
)
```

```python
pl.hist(result.data)
pl.ylabel("Counts")
pl.xlabel("Result")
```

You can see that the results now are roughly divided between 0 and 1.

![Cirq circuit result on Quantinuum QPU](../media/azure-quantum-qiskit-hw-result-2.png)

#### Asynchronous workflow using Jobs

For long-running circuits, it can be useful to run them asynchronously.
The `service.create_job` method returns a `Job` object, which you can use to
get the results after the job has run successfully.

```python
job = service.create_job(
    program=circuit,
    repetitions=100,
    target="quantinuum.qpu.h2-1"
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
{'m_b': ['11', '11', '00', '11', '00', '00', '00', '00', '11', '00', '00', '11', '00', '00', '00', '00', '11', '11', '11', '00', '11', '00', '00', '11', '11', '11', '11', '00', '00', '00', '00', '00', '00', '11', '11', '00', '11', '00', '11', '11', '00', '00', '00', '11', '11', '00', '00', '11', '11', '11', '00', '00', '11', '11', '11', '11', '00', '00', '11', '11', '00', '11', '11', '00', '00', '00', '11', '11', '11', '11', '11', '00', '00', '11', '00', '11', '11', '11', '11', '00', '11', '00', '00', '00', '01', '11', '11', '00', '00', '11', '11', '11', '11', '00', '00', '00', '11', '00', '11', '00']}
```

> [!NOTE]
> The `job.results()` function does not return a `cirq.Result` object. Instead, it returns a dictionary of bitstring measurement results indexed by measurement key.

***
