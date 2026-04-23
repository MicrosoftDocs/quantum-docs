---
author: azure-quantum-content
description: Learn how to submit specific formatted quantum circuits with QIR, OpenQASM, or Pulser SDK to the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 03/23/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: Submit formatted quantum circuits
uid: microsoft.quantum.quickstarts.computing.provider
#customer intent: As quantum developer, I want to learn how to submit QIR, OpenQASM, or Pulser SDK to the Azure Quantum service.
--- 

# How to submit specific formatted circuits to Azure Quantum

Learn how to use the `qdk.azure` Python module to submit circuits in specific formats to the Azure Quantum service. This article shows you how to submit circuits in the following formats:

- [Submit QIR circuits](#submit-qir-formatted-circuits)
- [Submit provider-specific circuits](#submit-a-circuit-with-a-provider-specific-format-to-azure-quantum)

For more information, see [Quantum circuits](xref:microsoft.quantum.concepts.circuits).

## Prerequisites

To develop and run your circuits in Visual Studio Code (VS Code), you must have the following:

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- VS Code with the [Microsoft Quantum Development Kit (QDK)](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The `qdk` Python library with the `azure` extra, and the `ipykernel` package.

    ```bash
    python -m pip install --upgrade "qdk[azure]" ipykernel
    ```

## Create a new Jupyter notebook and connect to your Quantum workspace

To connect to your workspace in a Jupyter notebook in VS Code, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of the notebook, run the following code. You can find the resource ID in the **Overview** pane for your workspace in the Azure portal.

    ```python
    from qdk.azure import Workspace

    workspace = Workspace (resource_id="") # Add your resource ID 
    ```

## Submit QIR-formatted circuits

Quantum Intermediate Representation (QIR) is an intermediate representation that serves as a common interface between quantum programming languages and targeted quantum computation platforms. For more information, see [Quantum Intermediate Representation](xref:microsoft.quantum.concepts.qir).

To submit a QIR-formatted circuit, follow these steps:

1. Create the QIR circuit. For example, run the following code in a new cell to create a simple entanglement circuit.

    ```python
    QIR_routine = """%Result = type opaque
    %Qubit = type opaque
    
    define void @ENTRYPOINT__main() #0 {
      call void @__quantum__qis__h__body(%Qubit* inttoptr (i64 0 to %Qubit*))
      call void @__quantum__qis__cx__body(%Qubit* inttoptr (i64 0 to %Qubit*), %Qubit* inttoptr (i64 1 to %Qubit*))
      call void @__quantum__qis__h__body(%Qubit* inttoptr (i64 2 to %Qubit*))
      call void @__quantum__qis__cz__body(%Qubit* inttoptr (i64 2 to %Qubit*), %Qubit* inttoptr (i64 0 to %Qubit*))
      call void @__quantum__qis__h__body(%Qubit* inttoptr (i64 2 to %Qubit*))
      call void @__quantum__qis__h__body(%Qubit* inttoptr (i64 3 to %Qubit*))
      call void @__quantum__qis__cz__body(%Qubit* inttoptr (i64 3 to %Qubit*), %Qubit* inttoptr (i64 1 to %Qubit*))
      call void @__quantum__qis__h__body(%Qubit* inttoptr (i64 3 to %Qubit*))
      call void @__quantum__qis__mz__body(%Qubit* inttoptr (i64 2 to %Qubit*), %Result* inttoptr (i64 0 to %Result*)) #1
      call void @__quantum__qis__mz__body(%Qubit* inttoptr (i64 3 to %Qubit*), %Result* inttoptr (i64 1 to %Result*)) #1
      call void @__quantum__rt__tuple_record_output(i64 2, i8* null)
      call void @__quantum__rt__result_record_output(%Result* inttoptr (i64 0 to %Result*), i8* null)
      call void @__quantum__rt__result_record_output(%Result* inttoptr (i64 1 to %Result*), i8* null)
      ret void
    }
    
    declare void @__quantum__qis__ccx__body(%Qubit*, %Qubit*, %Qubit*)
    declare void @__quantum__qis__cx__body(%Qubit*, %Qubit*)
    declare void @__quantum__qis__cy__body(%Qubit*, %Qubit*)
    declare void @__quantum__qis__cz__body(%Qubit*, %Qubit*)
    declare void @__quantum__qis__rx__body(double, %Qubit*)
    declare void @__quantum__qis__rxx__body(double, %Qubit*, %Qubit*)
    declare void @__quantum__qis__ry__body(double, %Qubit*)
    declare void @__quantum__qis__ryy__body(double, %Qubit*, %Qubit*)
    declare void @__quantum__qis__rz__body(double, %Qubit*)
    declare void @__quantum__qis__rzz__body(double, %Qubit*, %Qubit*)
    declare void @__quantum__qis__h__body(%Qubit*)
    declare void @__quantum__qis__s__body(%Qubit*)
    declare void @__quantum__qis__s__adj(%Qubit*)
    declare void @__quantum__qis__t__body(%Qubit*)
    declare void @__quantum__qis__t__adj(%Qubit*)
    declare void @__quantum__qis__x__body(%Qubit*)
    declare void @__quantum__qis__y__body(%Qubit*)
    declare void @__quantum__qis__z__body(%Qubit*)
    declare void @__quantum__qis__swap__body(%Qubit*, %Qubit*)
    declare void @__quantum__qis__mz__body(%Qubit*, %Result* writeonly) #1
    declare void @__quantum__rt__result_record_output(%Result*, i8*)
    declare void @__quantum__rt__array_record_output(i64, i8*)
    declare void @__quantum__rt__tuple_record_output(i64, i8*)
    
    attributes #0 = { "entry_point" "output_labeling_schema" "qir_profiles"="base_profile" "required_num_qubits"="4" "required_num_results"="2" }
    attributes #1 = { "irreversible" }
    
    ; module flags
    
    !llvm.module.flags = !{!0, !1, !2, !3}
    
    !0 = !{i32 1, !"qir_major_version", i32 1}
    !1 = !{i32 7, !"qir_minor_version", i32 0}
    !2 = !{i32 1, !"dynamic_qubit_management", i1 false}
    !3 = !{i32 1, !"dynamic_result_management", i1 false}
    """
    ```

1. Create a `submit_qir_job` helper function to submit the QIR circuit to a target. In this example, the input and output data formats are `qir.v1` and `microsoft.quantum-results.v1`, respectively.

    ```python
    # Submit the job with proper input and output data formats
    def submit_qir_job(target, input, name, count=100):
        job = target.submit(
            input_data=input, 
            input_data_format="qir.v1",
            output_data_format="microsoft.quantum-results.v1",
            name=name,
            input_params = {
                "entryPoint": "ENTRYPOINT__main",
                "arguments": [],
                "count": count
                }
        )
    
        print(f"Queued job: {job.id}")
        job.wait_until_completed()
        print(f"Job completed with state: {job.details.status}")
        #if job.details.status == "Succeeded":
        result = job.get_results()
    
        return result
    ```

1. Submit the QIR circuit to a specific Azure Quantum target. For example, to submit the QIR circuit to the IonQ simulator target, run the following code:

    ```python
    target = workspace.get_targets(name="ionq.simulator") 
    result = submit_qir_job(target, QIR_routine, "QIR routine")
    result
    ```

## Submit a circuit with a provider-specific format to Azure Quantum

Each Azure Quantum provider has its own format to represent quantum circuits. You can submit circuits to Azure Quantum in provider-specific formats instead of QIR languages, such as Q# or Qiskit.

- [IonQ](#submit-a-circuit-to-ionq-in-json-format)
- [Pasqal](#submit-a-circuit-to-pasqal-in-pulser-sdk-format)
- [Quantinuum](#submit-an-openqasm-circuit-to-quantinuum)
- [Rigetti](#submit-a-quil-circuit-to-rigetti)

### Submit a circuit to IonQ in JSON format

IonQ uses JSON format to run circuits on their targets. For more information, see [IonQ targets](xref:microsoft.quantum.providers.ionq) and the [IonQ API documentation](https://docs.ionq.com/#tag/quantum_programs).

The following sample creates a superposition between three qubits in JSON format.

1. In a new cell, create a quantum circuit in JSON format.

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

1. Submit the circuit to the IonQ target. The following example uses the IonQ simulator, which returns a `Job` object.

    ```python
    target = workspace.get_targets(name="ionq.simulator")
    job = target.submit(circuit)
    ```

1. When the job completes, get the results.

    ```python
    results = job.get_results()
    print(results)
    ```

### Submit a circuit to Pasqal in Pulser SDK format

You can use the Pulser SDK to create pulse sequences and submit them to Pasqal targets.

#### Install the Pulser SDK

[Pulser](https://github.com/pasqal-io/Pulser) is a framework that allows you to create, simulate, and run pulse sequences for neutral-atom quantum devices. Pulser is designed by PASQAL as a pass-through to submit quantum experiments to their quantum processors. For more information, see the [Pulser documentation](https://pulser.readthedocs.io/en/latest/).

To submit the pulse sequences, first install the Pulser SDK packages:

```python
try:
    import pulser
    import pulser_pasqal
except ImportError:
    !pip -q install pulser pulser-pasqal --index-url https://pypi.org/simple
```

#### Create a quantum register

Define both a register and a layout. The register specifies where to arrange the atoms, and the layout specifies the positions of traps that capture and structure the atoms within the register.

For details on layouts, see the [Pulser documentation](https://pulser.readthedocs.io/en/stable/tutorials/reg_layouts.html).

Create a `devices` object to import the Pasqal quantum computer target, [FRESNEL_CAN1](xref:microsoft.quantum.providers.pasqal#fresnel_can1).

```python
from pulser_pasqal import PasqalCloud

devices = PasqalCloud().fetch_available_devices()
QPU = devices["FRESNEL_CAN1"]
```

##### Pre-calibrated layouts

The device defines a list of [pre-calibrated layouts](https://pulser.readthedocs.io/en/stable/tutorials/reg_layouts.html#Devices-with-pre-calibrated-layouts). You can build your register from one of these layouts.

Use pre-calibrated layouts when possible because they improve the performance of the QPU.

The following example uses the first pre-calibrated layout on the device:

```python
# Use the first layout available on the device
layout = QPU.pre_calibrated_layouts[0]

# Select traps 1, 3 and 5 of the layout to define the register
traps = [1,v3,v5]
reg = layout.define_register(*traps)

# Draw the register to verify that it matches your expectations
reg.draw()
```

##### Arbitrary layouts

Use a custom layout when the pre-calibrated layouts don't satisfy the requirements of your experiment.

For a given arbitrary register, a neutral-atom QPU places traps according to the layout, which must then be calibrated. Because each calibration takes time, it's a best practice to reuse an existing calibrated layout when possible.

To create an arbitrary layout, choose one of the following options:

- Automatically generate a layout based on a specified register. For large registers, this process can produce sub-optimal solutions. For example:

    ```python
    from pulser import Register
    qubits = {
        "q0": (0, 0),
        "q1": (0, 10),
        "q2": (8, 2),
        "q3": (1, 15),
        "q4": (-10, -3),
        "q5": (-8, 5),
    }

    reg = Register(qubits).with_automatic_layout(device) 
    ```

- Manually define a layout to create your register. For example, create an arbitrary layout with 20 traps that are randomly positioned in a 2D plane:

    ```python
    import numpy as np
    from pulser.register.register_layout import RegisterLayout

    # Generate random coordinates
    np.random.seed(301122)  # Keeps results consistent between runs
    traps = np.random.randint(0, 30, size=(20, 2))
    traps = traps - np.mean(traps, axis=0)
    
    # Create the layout
    layout = RegisterLayout(traps, slug="random_20")
    
    # Define your register with specific trap IDs
    trap_ids = [4, 8, 19, 0]
    reg = layout.define_register(*trap_ids, qubit_ids=["a", "b", "c", "d"])
    reg.draw()
    ```

#### Write a pulse sequence

Neutral atoms are controlled with laser pulses. The Pulser SDK allows you to create pulse sequences to apply to the quantum register.

1. Define the pulse sequence attributes by declaring the channels that control the atoms. To create a `Sequence`, provide a `Register` instance along with the device where the sequence will be executed. For example, the following code declares one channel: `ch0`.

    ```python
    from pulser import Sequence

    seq = Sequence(reg, QPU)
    
    # Print the available channels for your sequence
    print(seq.available_channels)
    
    # Declare a channel. For example, `rydberg_global`
    seq.declare_channel("ch0", "rydberg_global")
    ```

    > [!NOTE]
    > You can use the `QPU = devices["FRESNEL_CAN1"]` device or import a virtual device from Pulser for more flexibility. The use of a `VirtualDevice` allows for sequence creation that's less constrained by device specifications, which lets you run on an emulator. For more information, see [Pulser documentation](https://pulser.readthedocs.io/en/stable/tutorials/creating.html#2.-Initializing-the-Sequence).

1. Add pulses to your sequence. To do so, create and add pulses to the channels that you declared. For example, the following code creates a pulse and adds it to channel `ch0`:

    ```python
    from pulser import Pulse
    from pulser.waveforms import RampWaveform, BlackmanWaveform
    import numpy as np

    amp_wf = BlackmanWaveform(1000, np.pi)
    det_wf = RampWaveform(1000, -5, 5)
    pulse = Pulse(amp_wf, det_wf, 0)
    seq.add(pulse, "ch0")

    seq.draw()
    ```

    The following image shows the pulse sequence:

    :::image type="content" source="media/provider-format-pasqal-sequence.png" alt-text="Pulse sequence":::

#### Convert the sequence to a JSON string

To submit the pulse sequences, convert the Pulser objects into a JSON string that can be used as input data.

```python
import json

# Convert the sequence to a JSON string
def prepare_input_data(seq):
    input_data = {}
    input_data["sequence_builder"] = json.loads(seq.to_abstract_repr())
    to_send = json.dumps(input_data)
    return to_send
```

#### Submit the pulse sequence to Pasqal target

1. Set the proper input and output data formats. For example, the following code sets the input data format to `pasqal.pulser.v1` and the output data format to `pasqal.pulser-results.v1`.

    ```python
    # Submit the job with proper input and output data formats
    def submit_job(target, seq, shots):
        job = target.submit(
            input_data=prepare_input_data(seq), # Take the JSON string previously defined as input data
            input_data_format="pasqal.pulser.v1",
            output_data_format="pasqal.pulser-results.v1",
            name="Pasqal sequence",
            shots=shots # Number of shots
        )

        print(f"Queued job: {job.id}")
        return job
    ```

    > [!NOTE]
    > The time required to run a job on the QPU depends on current queue times. You can view the average queue time for a target in the **Providers** pane of your workspace.

1. Submit the program to Pasqal. Before you submit your code to real quantum hardware, it's a best practice to test your code on the emulator `pasqal.sim.emu-mps` target.

    ```python
    target = workspace.get_targets(name="pasqal.sim.emu-mps") # Change to "pasqal.qpu.fresnel-can1" to use FRESNEL_CAN1 QPU
    job = submit_job(target, seq, 10)

    job.wait_until_completed()
    print(f"Job completed with state: {job.details.status}")
    result = job.get_results()
    print(result)
    ```

    ```output
    {
        "1000000": 3, 
        "0010000": 1, 
        "0010101": 1
    }
    ```

### Submit an OpenQASM circuit to Quantinuum

1. Create a quantum circuit in the [OpenQASM](https://en.wikipedia.org/wiki/OpenQASM) representation. For example, the following code creates a Teleportation circuit:

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

    Or, load the circuit from an OpenQASM file:

    ```py
    with open("my_teleport.qasm", "r") as f:
        circuit = f.read()
    ```

1. Submit the circuit to a Quantinuum target. The following example submits the job to one of the Quantinuum simulator targets.

    ```python
    target = workspace.get_targets(name="quantinuum.sim.h2-1sc")
    job = target.submit(circuit, shots=500)
    ```

1. Wait until the job is complete and then fetch the results.

    ```python
    results = job.get_results()
    print(results)
    ```

> [!NOTE]
> These results return 000 for every shot, which isn't random. This is because the API Validator only checks whether your code can run on Quantinuum hardware, but returns 0 for every quantum measurement. For a true random number generator, you need to run your circuit on quantum hardware.

### Submit a Quil circuit to Rigetti

To submit a Quil job to a Rigetti target, use the `qdk.azure` Python module.

1. Load the required imports.

    ```python
    from azure.quantum import Workspace
    from azure.quantum.target.rigetti import Result, Rigetti, RigettiTarget, InputParams
    ```

1. Create a `target` object and pass the name of the Rigetti target that you want to submit your job to. For example, the following code selects the `QVM` target.

    ```python
    target = Rigetti(workspace=workspace, name=RigettiTarget.QVM)
    ```

1. Create a Quil program. For your program to be accepted, you must set the readout to `"ro"`.

    ```python
    readout = "ro"
    bell_state_quil = f"""
    DECLARE {readout} BIT[2]
    
    H 0
    CNOT 0 1
    
    MEASURE 0 {readout}[0]
    MEASURE 1 {readout}[1]
    """
    
    num_shots = 5
    job = target.submit(
        input_data=bell_state_quil, 
        name="bell state", 
        shots=100, 
        input_params=InputParams(skip_quilc=False)
    )

    print(f"Job completed with state: {job.details.status}")
    result = Result(job)  # This throws an exception if the job failed
    ```

1. You can index a Result with the name of the readout. In the following code, `data_per_shot` is a list of length `num_shots`, and each item in the list is another list that contains the data for the register from that shot.

    ```python
    data_per_shot = result[readout]
    
    ro_data_first_shot = data_per_shot[0]
    ```

    In this case, because the type of the register is BIT, the type is integer and the value either 0 or 1.

    ```python
    assert isinstance(ro_data_first_shot[0], int)
    assert ro_data_first_shot[0] == 1 or ro_data_first_shot[0] == 0
    ```

1. Print out all the data.

    ```python
    print(f"Data from '{readout}' register:")
    for i, shot in enumerate(data_per_shot):
        print(f"Shot {i}: {shot}")
    ```

> [!IMPORTANT]
> You can't submit multiple circuits on a single job. As a workaround you can call the `backend.run` method to submit each circuit asynchronously, and then fetch the results of each job. For example:
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

- [Submit a circuit with Qiskit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.qiskit).
- [Submit a circuit with Cirq to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.cirq).
