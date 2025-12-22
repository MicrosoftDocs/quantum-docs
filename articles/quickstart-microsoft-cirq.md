---
author: azure-quantum-content
description: Learn how to submit Cirq quantum circuits to the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 10/16/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: Submit Cirq quantum circuits to Azure Quantum
uid: microsoft.quantum.quickstarts.computing.cirq
--- 

# How to submit a circuit with Cirq to Azure Quantum

Learn how to submit a Cirq quantum circuit using the `azure-quantum` Python package. You can submit Cirq circuits to Azure Quantum using the Azure Quantum Development Kit (QDK) and Jupyter Notebook in Visual Studio Code (VS Code) from your local machine.

For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

For installation details, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).

- An Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The Azure Quantum `azure-quantum` package with the `cirq` extra, and the `qdk` and the `ipykernel` packages.

    ```bash
    python -m pip install --upgrade azure-quantum[cirq] qdk ipykernel 
    ```

    > [!NOTE]
    > If the Jupyter Python kernel `ipykernel` isn't detected, then VS Code will prompt you to install it.  

## Create a new Jupyter Notebook

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**.
1. VS Code detects and displays the version of Python and the virtual Python environment that was selected for the notebook. If you have multiple Python environments, then you might need to select a kernel using the kernel picker in the top right. If no environment was detected, see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information.

## Load the required imports

In the first cell of your notebook, run the following code to load the required imports:

```python
import azure.quantum
from azure.quantum.cirq import AzureQuantumService
```

## Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program will need the resource ID and the
location of your Azure Quantum workspace.

1. Log in to your Azure account, <https://portal.azure.com>,
1. Select your Azure Quantum workspace, and navigate to **Overview**.
1. Copy the parameters in the fields.

Add a new cell and use your account information to create `Workspace` and  `AzureQuantumService` objects to connect to your Azure Quantum workspace.

```python
workspace = Workspace(  
    resource_id = "", # Add the resourceID of your workspace
    location = "" # Add the location of your workspace (for example "westus")
    )

service = AzureQuantumService(workspace)
```

### List all targets

Use the `targets()`method to list all the targets in your workspace that can run your circuit, including the
current queue time and availability.

> [!NOTE]
> All the targets in your workspace may not be listed - only the targets that can accept a Cirq or OpenQASM circuit will be listed here.

```python
print(service.targets())
```

```output
[<Target name="quantinuum.qpu.h2-1", avg. queue time=0 s, Degraded>,
<Target name="quantinuum.sim.h2-1sc", avg. queue time=1 s, Available>,
<Target name="quantinuum.sim.h2-1e", avg. queue time=40 s, Available>,
<Target name="ionq.simulator", avg. queue time=3 s, Available>,
<Target name="ionq.qpu.aria-1", avg. queue time=1136774 s, Available>]
```

## Create a simple circuit

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

## Select a target to run your program

### [IonQ](#tab/tabid-ionq)

#### Run on IonQ simulator

You can now run the program via the Azure Quantum service and get the
result. The following cell submits a job (to the default IonQ simulator) that runs the circuit with
100 shots, waits until the job is complete, and returns the results.

```python
result = service.run(program=circuit, repetitions=100, target="ionq.simulator")
```

This returns a `cirq.Result` object.

```python
print(result)
```

```output
    b=1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010, 1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010
```

#### Estimate job cost

Before running a job on the QPU, you should estimate how much it will cost to run.

For the most current pricing details, see [IonQ Pricing](xref:microsoft.quantum.providers.ionq#pricing), or find your workspace and view pricing options in the "Provider" tab of your workspace via: [aka.ms/aq/myworkspaces](https://aka.ms/aq/myworkspaces).


#### Run on IonQ QPU

The previous job ran on the default simulator, `"ionq.simulator"`. However, you can also run it on IonQ's hardware processor (a [Quantum Processor Unit](xref:microsoft.quantum.target-profiles#quantum-processing-units-qpu-different-profiles) (QPU)). To run on the IonQ QPU, provide `"ionq.qpu.aria-1"` as the
`target` argument:

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="ionq.qpu.aria-1",
    timeout_seconds=500 # Set timeout to accommodate queue time on QPU
)
```

Again, this returns a `cirq.Result` object.

```python
print(result)
```

```output
b=0101011011011111100001011101101011011110100010000000011110111000100100110110101100110001001111101111, 0101011011011111100001011101101011011110100010000000011110111000100100110110101100110001001111101111
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

Note that this does not return a `cirq.Result` object. Instead it
returns a result object that is specific to the IonQ simulator and uses
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

#### Run on Quantinuum simulator

You can now run the program via the Azure Quantum service and get the
result. The following cell submits a job that runs the circuit with
100 shots, waits until the job is complete, and returns the results.

```python
result = service.run(program=circuit, repetitions=100, target="quantinuum.sim.h2-1sc")
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

Before running a job on the QPU, you should estimate how much it will cost to run.

For the most current pricing details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#quantinuum), or find your workspace and view pricing options in the "Provider" tab of your workspace via: [aka.ms/aq/myworkspaces](https://aka.ms/aq/myworkspaces).

#### Asynchronous workflow using Jobs

For long-running circuits, it can be useful to run them asynchronously.
The `service.create_job` method returns a `Job` object, which you can use to
get the results after the job has run successfully.

```python
job = service.create_job(
    program=circuit,
    repetitions=100,
    target="quantinuum.sim.h2-1sc"
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
returns a dictionary of bit string measurement results indexed by measurement key.

> [!IMPORTANT]
> Submitting multiple circuits on a single job is currently not supported. As a workaround you can call the `backend.run` method to submit each circuit asynchronously, then fetch the results of each job. For example:
>
> ```python
> jobs = []
> for circuit in circuits:
>     jobs.append(backend.run(circuit, shots=N))
> 
> results = []
> for job in jobs:
>     results.append(job.result())
>```

## Related content

- [Quickstart: Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit).
- [Quickstart: Submit a circuit with a provider-specific format to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.provider).
