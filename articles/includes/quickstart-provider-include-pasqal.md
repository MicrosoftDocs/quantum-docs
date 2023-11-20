---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 11/10/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [target, targets]
---

## Install the Pulser SDK 

[Pulser](https://github.com/pasqal-io/Pulser) is a framework for composing, simulating and executing pulse sequences for neutral-atom quantum devices. It's designed by PASQAL as a pass-through to submit quantum experiments to their quantum processors. For more information, see [Pulser documentation](https://pulser.readthedocs.io/en/latest/).

To submit the pulse sequences, first install the Pulser SDK packages:

```python
try:
    import pulser
except ImportError:
    !pip -q install pulser
    !pip -q install pulser-core
```

## Create a quantum register

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

## Write a pulse sequence

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

## Convert the sequence to a JSON string

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

## Submit the pulse sequence to PASQAL target

1. First, you need to set the proper input and output data formats. For example, the following code sets the input data format to `pasqal.pulser.v1` and the output data format to `pasqal.pulser-results.v1`.

    ```python
    # Submit the job with proper input and output data formats
    def submit_job(target, seq):
        job = target.submit(
            input_data=prepare_input_data(seq), # Take the JSON string previously defined as input data
            input_data_format="pasqal.pulser.v1", 
            output_data_format="pasqal.pulser-results.v1",
            name="PASQAL sequence",
            input_params={"count": 10} # Number of shots
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
