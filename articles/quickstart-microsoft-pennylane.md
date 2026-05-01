---
author: azure-quantum-content
description: Learn how to submit PennyLane quantum circuits to the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 04/30/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["Python", "PennyLane", "Microsoft", "Quantum Development Kit", "QDK", "OpenQASM", "QIR"]
title: Submit PennyLane quantum circuits to Azure Quantum
uid: microsoft.quantum.how-to.submit-pennylane-programs
# Customer intent: As a quantum developer who writes programs in PennyLane, I want to know how to submit PennyLane programs to run on Azure Quantum targets.
--- 

# How to submit a PennyLane circuit to Azure Quantum

PennyLane is an open-source Python framework for quantum programming. With the Microsoft Quantum Development Kit (QDK), you can write a quantum program in PennyLane, convert the program into QIR, and then submit the QIR to run on Azure Quantum targets. This article shows how to submit a PennyLane program to Azure Quantum from a Jupyter notebook in Visual Studio Code (VS Code).

For more information about PennyLane, see the [PennyLane website](https://pennylane.ai/).

## Prerequisites

To submit a PennyLane program to Azure Quantum using the QDK Python library, you need to have an Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

To follow the steps in this article, you need to have:

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9pnrbtzxmb4z).
- VS Code with the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest version of the `qdk` Python library with the `azure` extra.

    ```bash
    pip install --upgrade "qdk[azure]"
    ```

- The latest version of the PennyLane Python library.

    ```bash
    pip install --upgrade "pennylane"
    ```

## Submit a PennyLane program to Azure Quantum as QIR

The following steps explain how write a PennyLane program, convert the program to QIR, and submit the program to Azure Quantum using the QDK Python library.

### Import the required packages and objects

1. In VS Code, open the **View** menu and select **Command Palette**.
1. Enter **Create: New Jupyter Notebook**. An empty Jupyter notebook opens in a new tab.
1. In the first cell of the notebook, run the following imports:

    ```python
    import pennylane as qml
    from qdk.openqasm import compile
    from qdk.azure import Workspace
    from qdk import TargetProfile
    ```

### Create a PennyLane circuit

1. Run the following code in a new cell to create a simple parameterized PennyLane circuit called `small_ansatz`:

    ```python
    device = qml.device('default.qubit', wires=2)
    
    @qml.qnode(device)
    def small_ansatz(theta):
        qml.H(0); qml.CNOT(wires=[0,1])
        qml.RY(theta, wires=1)
        return qml.expval(qml.PauliZ(1))
    ```

    This circuit takes the parameter `theta` to apply a rotation with the `RY` gate.

1. Draw the circuit for a given value of `theta`, for example `0.3`.

    ```python
    print(qml.draw(small_ansatz)(0.3))
    ```

### Convert the PennyLane program to QIR

To submit the PennyLane program to Azure Quantum, you need to convert the program to OpenQASM and then convert the OpenQASM to QIR.

1. Convert the PennyLane program to OpenQASM.

    ```python
    qasm_str = qml.to_openqasm(small_ansatz)(theta)
    ```

1. Set a QIR target profile and convert the OpenQASM to QIR.

    ```python
    target_profile = TargetProfile.Base
    qir = compile(qasm_str, target_profile)
    ```

    The target profile must be compatible with the Azure Quantum target that you submit your job to. For more information about QIR target profiles, see [Different types of target profiles in Azure Quantum](xref:microsoft.quantum.target-profiles).

### Connect to your Azure Quantum workspace

To connect to your Azure Quantum workspace, you need the resource ID of the workspace. To find the resource ID, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Go to your Azure Quantum workspace.
1. Open the **Overview** panel.
1. Copy the value in the **Resource ID** field.

TO connect to your workspace, run the following code in your Jupyter notebook:

```python
workspace = Workspace(resource_id="") # Add the resource ID of your workspace
```

### Submit the program to Azure Quantum

1. Set your job parameters, including the Azure Quantum target name and the number of shots. For this example, the target is the free Rigetti simulator.

    ```python
    # Define parameters for the job submission
    target_name = 'rigetti.sim.qvm'
    job_name = 'pennylane-job'
    shots = 100
    
    # Define parameter for the circuit
    theta = 0.3
    ```

    > [!NOTE]
    > You can only submit to Azure Quantum targets that are available in your workspace. To see your available targets, go to the **Providers** panel in your workspace in the Azure portal.

1. Set the target and run the job.

    ```python
    target = workspace.get_targets(target_name)
    job = target.submit(qir, job_name, shots)
    ```

1. Display the job results.

    ```python
    results = job.get_results()
    print(results)
    ```

## Related content

- [How to submit Qiskit programs to Azure Quantum with the QDK](xref:microsoft.quantum.quickstarts.computing.qiskit)
- [How to submit a Cirq circuit to Azure Quantum](xref:microsoft.quantum.quickstarts.computing.cirq)