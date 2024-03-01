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


    ```



## Create a new Jupyter Notebook

1. In VS Code, select **View > Command palette** and select **Create: New Jupyter Notebook**.
1. In the top-right, VS Code will detect and display the version of Python and the virtual Python environment that was selected for the notebook. If you have multiple Python environments, you may need to select a kernel using the kernel picker in the top right. If no environment was detected, see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information.

## Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program will need the resource ID and the
location of your Azure Quantum workspace. Log in to your Azure account,
<https://portal.azure.com>, navigate to your Azure Quantum workspace, and
copy the values from the header.

![How to retrieve the resource ID and location from an Azure Quantum workspace](../media/azure-quantum-resource-id.png)

In the first cell of your notebook, paste the values into the following `Workspace` constructor to
create a `workspace` object that connects to your Azure Quantum workspace.

```python
from azure.quantum import Workspace

workspace = Workspace(
    resource_id="",
    location=""
)
```

## Select a target to run your program

### [IonQ](#tab/tabid-ionq)

1. Create a quantum circuit using the the language-agnostic JSON format supported by the [IonQ targets](xref:microsoft.quantum.providers.ionq), as described in the [IonQ API documentation](https://docs.ionq.com/#tag/quantum_programs). For example, the following sample creates a superposition between three qubits:

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

1. Submit the circuit to the IonQ target. The following example uses the IonQ simulator, which returns a `Job` object. For more information, see the [Azure Quantum Python libraries](xref:microsoft.quantum.apiref-intro).

    ```python
    target = workspace.get_targets(name="ionq.simulator")
    job = target.submit(circuit)
    ```

1. Wait until the job is complete and then fetch the results.

    ```python
    results = job.get_results()
    print(results)
    ```

    ```output
    .....
    {'duration': 8240356, 'histogram': {'0': 0.5, '7': 0.5}}
    ```

1. You can then visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing/index.html).

    ```python
    import pylab as pl
    pl.rcParams["font.size"] = 16
    hist = {format(n, "03b"): 0 for n in range(8)}
    hist.update({format(int(k), "03b"): v for k, v in results["histogram"].items()})
    pl.bar(hist.keys(), hist.values())
    pl.ylabel("Probabilities")
    ```

    ![IonQ job output](../media/ionq-results.png)


1. Before running a job on the QPU, you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU,you can use the `estimate_cost` method:

    ```python
    target = workspace.get_targets(name="ionq.qpu")
    cost = target.estimate_cost(circuit, shots=500)
    
    print(f"Estimated cost: {cost.estimated_total}")
    ```
    
    This prints the estimated cost in USD.

For the most current pricing details, see [IonQ Pricing](xref:microsoft.quantum.providers.ionq#pricing), or find your workspace and view pricing options in the "Provider" tab of your workspace via: [aka.ms/aq/myworkspaces](https://aka.ms/aq/myworkspaces).

### [PASQAL](#tab/tabid-pasqal)


#### Install the Pulser SDK 

[Pulser](https://github.com/pasqal-io/Pulser) is a framework for composing, simulating and executing pulse sequences for neutral-atom quantum devices. It's designed by PASQAL as a pass-through to submit quantum experiments to their quantum processors. For more information, see [Pulser documentation](https://pulser.readthedocs.io/en/latest/).

To submit the pulse sequences, first install the Pulser SDK packages:

```python
try:
    import pulser
except ImportError:
    !pip -q install pulser
    !pip -q install pulser-core
```

#### Create a quantum register

1. First, load the required imports:

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

1. Create a pulse sequence. To do so, you create and add pulses to the channels you declared. For example, the following code creates a simple pulse and adds it to channel `ch0`, and then creates a complex pulse and adds it to channel `ch1`.

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

To submit the pulse sequences, you need to convert the Pulser objects into a JSON string that can be used as input data.

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

1. Submit the program to PASQAL. For example, you can submit the program to [PASQAL Emu-TN target](xref:microsoft.quantum.providers.pasqal#emu-tn).

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

1. Create a quantum circuit in the [OpenQASM](https://en.wikipedia.org/wiki/OpenQASM) representation. For example, the following example creates a Teleportation circuit:

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

    Optionally, you can load the circuit from a file:

    ```py
    with open("my_teleport.qasm", "r") as f:
        circuit = f.read()
    ```

1. Submit the circuit to the Quantinuum target. The following example uses the Quantinuum API validator, which returns a `Job` object. For more information, see the [Azure Quantum Python libraries](xref:microsoft.quantum.apiref-intro).

    ```python
    target = workspace.get_targets(name="quantinuum.sim.h1-1sc")
    job = target.submit(circuit, shots=500)
    ```

1. Wait until the job is complete and then fetch the results.

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

1. You can then visualize the results using [Matplotlib](https://matplotlib.org/stable/users/installing/index.html).

    ```python
    import pylab as pl
    pl.hist(results["c0"])
    pl.ylabel("Counts")
    pl.xlabel("Bitstring")
    ```

    ![Quantinuum job output](../media/quantinuum-results.png)

    Looking at the histogram, you may notice that the random number generator returned 0 every time, which is not very random. This is because that, while the API Validator ensures that your code will run successfully on Quantinuum hardware, it also returns 0 for every quantum measurement. For a true random number generator, you need to run your circuit on quantum hardware.

1. Before running a job on the QPU, you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the `estimate_cost` method.

    ```python
    target = workspace.get_targets(name="quantinuum.qpu.h1-1")
    cost = target.estimate_cost(circuit, shots=500)
    
    print(f"Estimated cost: {cost.estimated_total}")
    ```

    This prints the estimated cost in H-System Quantum Credits (HQCs).

    > [!NOTE]
    > To run a cost estimate against a Quantinuum target, you must first reload the *azure-quantum* Python package with the *\[qiskit\]* parameter. For more information, see [Update the azure-quantum Python package](xref:microsoft.quantum.update-qdk#update-the-azure-quantum-python-package).

For the most current pricing details, see [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing#quantinuum), or find your workspace and view pricing options in the "Provider" tab of your workspace via: [aka.ms/aq/myworkspaces](https://aka.ms/aq/myworkspaces).


