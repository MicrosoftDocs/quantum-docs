---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 03/01/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites



## Create a new Notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select the workspace from the previous step.
1. In the left blade, select **Notebooks**.
1. Click **My Notebooks** and click **Add New**.
1. In **Kernel Type**, select **IPython**.
1. Type a name for the file, and click **Create file**. 

When your new Notebook opens, it automatically creates the code for the first cell, based on your subscription and workspace information.

```py
from azure.quantum import Workspace
workspace = Workspace ( 
    resource_id = "", # Add your resource_id 
    location = ""  # Add your workspace location (for example, "westus") 
)
```

## List all targets

Use the `get_targets()`method to list all the targets in your workspace that can run your circuit, including the
current queue time and availability.

> [!NOTE]
> All the targets in your workspace may not be listed - only the targets that can accept a Cirq or OpenQASM circuit will be listed here. 

In a new cell, run:

```python
print("This workspace's targets:")
for target in workspace.get_targets():
     print(target)
```

```output
This workspace's targets:
<Target name="quantinuum.qpu.h1-1", avg. queue time=0 s, Degraded>
<Target name="quantinuum.sim.h1-1sc", avg. queue time=1 s, Available>
<Target name="quantinuum.sim.h1-1e", avg. queue time=40 s, Available>
<Target name="quantinuum.qpu.h1", avg. queue time=0 s, Unavailable>
<Target name="ionq.qpu", avg. queue time=229 s, Available>
<Target name="ionq.simulator", avg. queue time=3 s, Available>
<Target name="ionq.qpu.aria-1", avg. queue time=1136774 s, Available>
```

> [!NOTE]
> Unless otherwise noted, you should run each cell in order as you create it to avoid any compilation issues. Click the triangular "play" icon to the left of the cell to run the code.


## Select a target to run your program

### [IonQ](#tab/tabid-ionq)

#### Create a quantum circuit

Open a new cell and create a quantum circuit using the the language-agnostic JSON format supported by the [IonQ targets](xref:microsoft.quantum.providers.ionq), as described in the [IonQ API documentation](https://docs.ionq.com/#tag/quantum_programs). For example, the following sample creates a superposition between three qubits:

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

To check your circuit before running it on actual quantum hardware, you can use the IonQ simulator, `ionq.simulator`, which returns a `Job` object. For more information, see the [Azure Quantum Python libraries](xref:microsoft.quantum.apiref-intro).

Run the following code to set the target to the IonQ simulator and submit your circuit:

```python
target = workspace.get_targets(name="ionq.simulator")
job = target.submit(circuit, shots=500)
```

Wait until the job is complete and then fetch the results.

```python
results = job.get_results()
print(results)
```

```output
.....
{'histogram': {'0': 0.5, '7': 0.5}}
```

You can then visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing/index.html).

```python
import pylab as pl

pl.rcParams["font.size"] = 16
hist = {format(n, "03b"): 0 for n in range(8)}
hist.update({format(int(k), "03b"): v for k, v in results["histogram"].items()})
pl.bar(hist.keys(), hist.values())
pl.ylabel("Probabilities")
```

![IonQ job output](../media/ionq-results.png)


#### Estimate job cost

Before running a job on actual quantum hardware, or a [quantum processing unit](xref:microsoft.quantum.target-profiles) (QPU), you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the `estimate_cost` method.

The following code changes the target to the IonQ QPU, `ionq.qpu`, and uses the `estimate_cost` method to estimate the cost of running the job:

```python
target = workspace.get_targets(name="ionq.qpu")
cost = target.estimate_cost(circuit, shots=500)

print(f"Estimated cost: {cost.estimated_total}")
```

```output
Estimated cost: 1.0
```

This prints the estimated cost in USD.

For the most current pricing details, see [IonQ Pricing](xref:microsoft.quantum.providers.ionq#pricing), or view pricing options in the **Providers** blade of your workspace. To see your current credit status and usage, select **Credits and quotas**.

#### Run on IonQ hardware

After running successfully on the IonQ simulator and estimating the QPU cost, it's time to run your circuit on the hardware. 

> [!NOTE] 
> The time required to run a circuit on the QPU depends on current queue times. You can view the average queue time for a target by selecting the **Providers** blade of your workspace.

Use the same `submit` method and operations that you used previously with the IonQ simulator to submit your job and display the results:

```python
target = workspace.get_targets(name="ionq.qpu")
job = target.submit(circuit, shots=500)
```

```python
results = job.get_results()
print(results)

pl.rcParams["font.size"] = 16
hist = {format(n, "03b"): 0 for n in range(8)}
hist.update({format(int(k), "03b"): v for k, v in results["histogram"].items()})
pl.bar(hist.keys(), hist.values())
pl.ylabel("Probabilities")
```

```output
{'histogram': {'0': 0.464, '1': 0.014, '2': 0.018, '3': 0.012, '4': 0.01, '5': 0.016, '7': 0.466}}
```

![IonQ job output qpu](../media/ionq-results-qpu.png)


### [PASQAL](#tab/tabid-pasqal)

#### Install the Pulser SDK 

[Pulser](https://github.com/pasqal-io/Pulser) is a framework for composing, simulating and executing pulse sequences for neutral-atom quantum devices. To submit the pulse sequences, install the Pulser SDK packages.

Click **+ Add** to add a new cell to the notebook, and then run the following code to install the Pulser SDK packages:

```python
try:
    import pulser
except ImportError:
    !pip -q install pulser
    !pip -q install pulser-core
```

#### Create a quantum register

1. First, load the required imports. In a new cell, copy and run the following code:

    ```python
    import numpy as np
    import pulser
    from pprint import pprint
    from pulser import Pulse, Sequence, Register
    ```

1. PASQAL's QPU is made of neutral atoms trapped at well-defined positions in a lattice. To define your quantum registers you create an array of qubits on a lattice. For example, the following code creates a 4x4 square lattice of qubits:

    ```python
    L = 4
    square = np.array([[i, j] for i in range(L) for j in range(L)], dtype=float)
    square -= np.mean(square, axis=0)
    square *= 5
    
    qubits = dict(enumerate(square))
    reg = Register(qubits)
    reg.draw()
    ```

    :::image type="content" source="../media/provider-format-pasqal-array.png" alt-text="Plot of a 4x4 square lattice with 16 qubits.":::

#### Write a pulse sequence

The neutral atoms are controlled with laser pulses. The Pulser SDK allows you to create pulse sequences to apply to the quantum register.

1. First, you need to set up a pulse sequence, and declare the channels that will be used to control the atoms. For example, the following code declares two channels: `ch0` and `ch1`.

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

    A few things to consider:
    - A `Sequence` in Pulser is a series of operations that are to be executed on a quantum register.
    - The code sets up a sequence of operations to be executed on a `AnalogDevice` device. `AnalogDevice` is a predefined device in Pulser that represents a Fresnel1-equivalent quantum computer.

1. Create a pulser sequence. To do so, you create and add pulses to the channels you declared. For example, the following code creates a simple pulse and adds it to channel `ch0`, and then creates a complex pulse and adds it to channel `ch1`.

    ```python
    seq.target(1, "ch0") # Target qubit 1 with channel "ch0"
    simple_pulse = Pulse.ConstantPulse(200, 2, -10, 0)
    seq.add(simple_pulse, "ch0") # Add the pulse to channel "ch0"
    seq.delay(100, "ch1")
    from pulser.waveforms import RampWaveform, BlackmanWaveform
    
    duration = 1000
    # Create a Blackman waveform with a duration of 1000 ns and an area of pi/2 rad
    amp_wf = BlackmanWaveform(duration, np.pi / 2)  
    # Create a ramp waveform with a duration of 1000 ns and a linear sweep from -20 to 20 rad/µs
    detuning_wf = RampWaveform(duration, -20, 20) 

    # Create a pulse with the amplitude waveform amp_wf, the detuning waveform detuning_wf, and a phase of 0 rad.
    complex_pulse = Pulse(amp_wf, detuning_wf, phase=0) 
    complex_pulse.draw()
    seq.add(complex_pulse, "ch1") # Add the pulse to channel "ch1"
    ```

The image shows the simple and the complex pulse.

:::image type="content" source="../media/provider-format-pasqal-pulser.png" alt-text="Plot of the ":::

#### Convert the sequence to a JSON string

To submit the pulse sequences, you need to convert the Pulser objects into a JSON string that can be used as input data. Add a new cell and run the following code:

```python
import json

# Convert the sequence to a JSON string
def prepare_input_data(seq):
    input_data = {}
    input_data["sequence_builder"] = json.loads(seq.to_abstract_repr())
    to_send = json.dumps(input_data)
    #print(json.dumps(input_data, indent=4, sort_keys=True))
    return to_send
```

#### Submit the pulse sequence to PASQAL target

1. First, you need to set the proper input and output data formats. For example, the following code sets the input data format to `pasqal.pulser.v1` and the output data format to `pasqal.pulser-results.v1`.

    ```python
    # Submit the job with proper input and output data formats
    def submit_job(target, seq):
        job = target.submit(
            input_data=prepare_input_data(seq), # Take the JSON string previously defined as input data
            input_data_format="pasqal.pulser.v1", 
            output_data_format="pasqal.pulser-results.v1",
            name="PASQAL sequence",
            shots=100 # Number of shots
        )
    
        print(f"Queued job: {job.id}")
        job.wait_until_completed()
        print(f"Job completed with state: {job.details.status}")
        result = job.get_results()
    
        return result
    ```

    > [!NOTE] 
    > The time required to run a circuit on the QPU depends on current queue times. You can view the average queue time for a target by selecting the **Providers** blade of your workspace.

1. Submit the program to PASQAL. For example, add a new cell and submit the program to [PASQAL Emu-TN target](xref:microsoft.quantum.providers.pasqal#emu-tn).

    ```python
    target = workspace.get_targets(name="pasqal.sim.emu-tn")
    submit_job(target, seq)
    ```

    ```ouput
    {'0000000000000000': 59,
     '0000100000000000': 39,
     '0100000000000000': 1,
     '0100100000000000': 1}
    ```

### [Quantinuum](#tab/tabid-quantinuum)


#### Create a quantum circuit

Open a new cell and create a quantum circuit in the [OpenQASM](https://en.wikipedia.org/wiki/OpenQASM) representation. For example, the following example creates a Teleportation circuit:

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

#### Select a target and run your program

To check your circuit before running it on actual quantum hardware, you can use the [Quantinuum API validator](xref:microsoft.quantum.providers.quantinuum#api-validator), `quantinuum.sim.h1-1sc`, which returns a `Job` object. For more information, see the [Azure Quantum Python libraries](xref:microsoft.quantum.apiref-intro).

Run the following code to set the target to the API Validator and submit your circuit with 500 shots:

```python
target = workspace.get_targets(name="quantinuum.sim.h1-1sc")
job = target.submit(circuit, shots=500)
```

Wait until the job is complete and then fetch the results.

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

You can also visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing/index.html).

```python
import pylab as pl

pl.hist(results["c0"])
pl.ylabel("Counts")
pl.xlabel("Bitstring")
```

![Quantinuum job output](../media/quantinuum-results.png)

Looking at the histogram, you may notice that all the measurements are 0.  This is because that, while the Quantinuum API validator target ensures that your code will run successfully on Quantinuum hardware, it also returns 0 for every quantum measurement. For an accurate measurement of your circuit, you need to run it on quantum hardware.

#### Estimate job cost to run on quantum hardware

Before running a job on actual quantum hardware, or a [quantum processing unit](xref:microsoft.quantum.target-profiles) (QPU), you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the `estimate_cost` method.

The following code changes the target to the System Model H1, `quantinuum.qpu.h1-1`, and uses the `estimate_cost` method to estimate the cost of running the job:

```python
target = workspace.get_targets(name="quantinuum.qpu.h1-1")
cost = target.estimate_cost(circuit, shots=500)

print(f"Estimated cost: {cost.estimated_total}")
```

```output
Estimated cost: 8.6
```

This prints the estimated cost in H-System Quantum Credits (HQCs).

For the most current pricing details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#quantinuum), or view pricing options in the **Providers** blade of your workspace. To see your current credit status and usage, select **Credits and quotas**.

#### Run on a Quantinuum QPU 

After running successfully on the API validator and estimating the QPU cost, it's time to run your circuit on the hardware. 

> [!NOTE] 
> The time required to run a circuit on the QPU depends on current queue times. You can view the average queue time for a target by selecting the **Providers** blade of your workspace.

Use the same `submit` method and operations that you used previously with the API Validator to submit your job and display the results:

```python
target = workspace.get_targets(name="quantinuum.qpu.h1-1")
job = target.submit(circuit, shots=500)
```

```python
results = job.get_results()
print(results)

pl.hist(results["c0"])
pl.ylabel("Counts")
pl.xlabel("Bitstring")
```

![Quantinuum job output qpu](../media/quantinuum-results-qpu.png)

Note that the measurements now are roughly split between 0 and 1.



***