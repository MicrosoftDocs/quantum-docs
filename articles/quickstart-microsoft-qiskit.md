---
author: azure-quantum-content
description: Learn how to submit Qiskit quantum circuits to the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 10/17/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: How to submit Qiskit programs to Azure Quantum with the QDK
zone_pivot_groups: ide-local-simulator
uid: microsoft.quantum.quickstarts.computing.qiskit
--- 

# How to submit Qiskit programs to Azure Quantum with the QDK

You can submit Qiskit programs to run on Azure Quantum targets with the Microsoft Quantum Development Kit (QDK). You can also run Qiskit programs on your local machine with the QDK's built-in sparse simulator. The QDK supports both version 1 and version 2 of Qiskit.

In this article, you learn how to run Qiskit programs with the QDK Python library from a Jupyter Notebook in Visual Studio Code (VS Code).

> [!NOTE]
> It's a best practice to run your quantum program on a simulator target before you submit a job to run on a quantum computer target. Each Azure Quantum provider offers one or more free simulator targets.

## Prerequisites

To submit Qiskit jobs to Azure Quantum and to run Qiskit programs on the local sparse simulator, you must have the following:

- An Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A local Python environment (version 3.10 or higher) with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- Visual Studio Code (VS Code) with the [Microsoft Quantum Development Kit (QDK)](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The `qdk` Python library with the `azure` and `qiskit` extras, and the `ipykernel` package.

    ```bash
    pip install --upgrade "qdk[azure,qiskit]" ipykernel 
    ```

## Submit a job to an Azure Quantum target in your Quantum workspace

To submit a Qiskit program to run on an Azure Quantum target, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. An empty Jupyter Notebook file opens in a new tab.
1. In the first cell of your notebook, write a Qiskit circuit. For example, use the following circuit:

    ```python
    from qiskit import QuantumCircuit

    # Create a Quantum circuit that acts on the q register
    circuit = QuantumCircuit(3, 3)
    circuit.name = "Qiskit Sample - 3-qubit GHZ circuit"
    circuit.h(0)
    circuit.cx(0, 1)
    circuit.cx(1, 2)
    circuit.measure([0,1,2], [0, 1, 2])

    # Print out the circuit
    circuit.draw()
    ```

1. Connect to your Azure Quantum workspace.

    ```python
    from qdk.azure import Workspace 

    workspace = Workspace(resource_id="") # Add the resource ID of your workspace
    ```

1. Get the providers from your workspace that can run Qiskit programs, and print the available targets for each provider.

    ```python
    from qdk.azure.qiskit import AzureQuantumProvider

    providers = AzureQuantumProvider(workspace)

    for backend in providers.backends():
        print("- " + backend.name)
    ```

1. Set the Azure Quantum backend with the target that you want to submit your job to. For example, the following code sets up a backend to run your program as a simulation on the Quantinuum H2-1 emulator:

     ```python
    backend = providers.get_backend('quantinuum.sim.h2-1e')
    ```

1. Run your program on the Azure Quantum target and get the results. The following code runs 1,000 shots of your program on the specified target and stores the results:

    ```python
    job = backend.run(circuit, shots=1000)

    result = job.result()
    print(result)
    ```

## Examine your job results

The `result` object contains information about your job results, such as the measurement result for each shot, and total counts and probabilities for each possible measurement.

To create a histogram of measurement results, pass your circuit to the `get_counts` method and then pass the counts to the `plot_histogram` function from the `qiskit.visualization` module. The following code reformats the `counts` object to show all possible measurement outcomes:

```python
from qiskit.visualization import plot_histogram

print("Job ID:", job.job_id())

counts = result.get_counts(circuit)

# Reformat counts to include all possible measurement outcomes, even those with zero counts
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print('Counts:', counts)

plot_histogram(counts)
```

### Qiskit job results for programs with qubit loss

Some types of quantum hardware can experience qubit loss during a program run. If qubit loss occurs at any point during a shot for a Qiskit program, then that shot is removed from the Azure Quantum job results. For example, if qubit loss occurs in 10 out of 200 shots, then the job results have only 190 total measurement counts.

The raw results for all shots, including shots where qubit loss occurred, are still available in the `results` object. The following code gets both sets of results:

```python
# Get results only for shots without qubit loss
print('Counts:', result.results[0].data.counts)
print('Probabilities:', result.results[0].data.probabilities)
print('Memory:', result.results[0].data.memory)

# Get the raw total shot results
print('Raw counts:', result.results[0].data.raw_counts)
print('Raw probabilities:', result.results[0].data.raw_probabilities)
print('Raw memory:', result.results[0].data.raw_memory)
```

> [!NOTE]
> The `memory` attribute for Qiskit job results is a list of the measurement result for each shot.

## Run a job on the QDK sparse simulator

The QDK includes a built-in sparse simulator that you can use to run Qiskit programs on your local machine instead of submitting a job to Azure Quantum. To run a Qiskit program on the sparse simulator, use `QSharpBackend` to create an instance of a backend object.

```python
from qsharp.interop.qiskit import QSharpBackend

backend = QSharpBackend()
job = backend.run(circuit)
counts = job.result().get_counts()
print(counts)
```

## Next steps

- [Quickstart: Submit a circuit with Cirq to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.cirq).
- [Quickstart: Submit a circuit with a provider-specific format to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.provider).
