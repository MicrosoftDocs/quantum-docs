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

1. Install the `azure-quantum` package using pip. Use the `--upgrade` flag to make sure to get the latest version.

    ```shell
    pip install --upgrade azure-quantum[cirq]
    ```

1. Start your favorite code editor or interactive Python tool, such as [VS Code](https://code.visualstudio.com/docs/python/jupyter-support-py), [Jupyter](https://jupyter.readthedocs.io/en/latest/content-quickstart.html) or [iPython](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html).


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
Optionally, you can specify a default target, in this case the IonQ simulator:

```python
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
print(service.targets())
```

```output
[<Target name="ionq.qpu", avg. queue time=345 s, Available>,
<Target name="ionq.simulator", avg. queue time=4 s, Available>,
<Target name="honeywell.hqs-lt-s1", avg. queue time=0 s, Available>,
<Target name="honeywell.hqs-lt-s1-apival", avg. queue time=0 s, Available>,
<Target name="honeywell.hqs-lt-s2", avg. queue time=313169 s, Available>,
<Target name="honeywell.hqs-lt-s2-apival", avg. queue time=0 s, Available>,
<Target name="honeywell.hqs-lt-s1-sim", avg. queue time=1062 s, Available>]
```

## Run a simple circuit

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

You can now run the program via the Azure Quantum service and get the
result. The following cell submits a job (to the default IonQ simulator) that runs the circuit with
100 shots, waits until the job is complete, and returns the results.

```python
result = service.run(program=circuit, repetitions=100)
```

This returns a `cirq.Result` object.

```python
print(result)
```

```output
    b=1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010, 1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010
```

## Run on IonQ QPU

The previous job ran on the default simulator, `"ionq.simulator"`. However, you can also run it on IonQ's hardware processor (a [Quantum Processor Unit](xref:microsoft.quantum.target-profiles#quantum-processing-units-qpu-different-profiles) (QPU)). To run on the IonQ QPU, provide `"ionq.qpu"` as the
`target` argument:

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="ionq.qpu",
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

## Asynchronous model using Jobs

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
