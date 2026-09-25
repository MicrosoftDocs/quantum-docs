---
author: azure-quantum-content
description: Learn how to submit Q#, OpenQASM, Qiskit, Cirq, and PennyLane programs to Azure Quantum with the QDK Python package.
ms.author: quantumdocwriters
ms.date: 08/25/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["Microsoft Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Azure Quantum", "Q#", "OpenQASM", "Qiskit", "Cirq", "PennyLane", "Python", "Jupyter Notebook", "QIR", target, targets]
ai-usage: ai-assisted
title: Submit jobs with the QDK Python package
uid: microsoft.quantum.how-to.submit-jobs-python
# Customer intent: As a quantum developer who uses Python, I want to know how to use the QDK Python package to submit a quantum program to an Azure Quantum target in my preferred language or framework.
---

# Submit jobs to Azure Quantum with the QDK Python package

Use the Microsoft Quantum Development Kit (QDK) Python package to submit Q#, OpenQASM, Qiskit, Cirq, and PennyLane programs to Azure Quantum.

This article provides job submission examples for each supported quantum language or framework. For an interactive Q# or OpenQASM workflow that doesn't require Python code, see [Submit jobs with the QDK extension for VS Code](xref:microsoft.quantum.how-to.submit-jobs-vscode).

## Prerequisites

- An Azure account with an active subscription.
- An Azure Quantum workspace. To create one, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- Python 3.10 or later.
- If you use a Jupyter notebook, a Jupyter environment such as the [Jupyter extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) and the `ipykernel` package.
- Install [Azure CLI](/cli/azure/install-azure-cli) with the `quantum` extension.

    ```azurecli
    az extension add --upgrade --name quantum
    ```

- Install the latest version of the `qdk` Python package with the `azure` and `jupyter` extras.

    ```bash
    pip install --upgrade "qdk[azure,jupyter]"
    ```

    If you want to submit a Qiskit or Cirq program, install the `cirq` and `qiskit` extras.

    ```bash
    pip install --upgrade "qdk[qiskit,cirq]"
    ```

## Connect to your Azure Quantum workspace

> [!WARNING]
> Starting January 11, 2027, Azure Quantum will require users in a Quantum workspace to have the **Quantum Workspace Data Reader** or **Quantum Workspace Data Contributor** role to access job results. The **Quantum Workspace Data Contributor** role will be required to submit jobs. To avoid interruptions to your Azure Quantum workflows, assign these roles to the appropriate users before the deadline. For more information, see [Assign data access roles for users in the workspace](xref:microsoft.quantum.how-to.workspace#assign-data-access-roles-for-users-in-the-workspace).

Before you submit a job, you need to connect to an Azure Quantum workspace. The `qdk.azure` module provides the `Workspace` object to connect to Azure Quantum workspaces. To connect to your workspace, follow these steps.

### Sign in with Azure CLI

If you didn't already, sign in to Azure from a terminal before you open a Jupyter notebook.

```azurecli
az login
```

If you don't sign in from the terminal, you need to authenticate every time you connect to a Quantum workspace through Python. If your account has access to multiple subscriptions, set the subscription that contains your Azure Quantum workspace.

```azurecli
az account set --subscription <subscription-id>
```

Run `az login` again when the session expires or when you want to use a different Azure account.

### Get the resource ID of your workspace

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Go to the Quantum workspace where you want to submit your job.
1. In the **Overview** page, find and copy **Resource ID**.

### Connect to the workspace

1. To connect to your Quantum workspace, create a `Workspace` object with the resource ID that you copied.

    ```python
    from qdk.azure import Workspace
    
    workspace = Workspace(resource_id="") # Add your resource ID
    ```

    > [!NOTE]
    > Y

1. Verify the connection and view the targets available in the workspace.

    ```python
    for target in workspace.get_targets():
        print(target.name)
    ```

For other connection and authentication options, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace).

> [!NOTE]
> The following examples submit jobs to [simulator targets](xref:microsoft.quantum.machines.overview.backend-simulators). The targets available in your workspace depend on your configured providers.

## Prepare and submit your program

Choose the tab for your quantum language or framework.

### [Q#](#tab/qsharp)

Use the `qdk.qsharp` module to define or load Q# code, compile an entry point to QIR, and submit the QIR to an Azure Quantum target.

#### Define and compile the Q# program

1. Initialize Q# with a QIR target profile that the Azure Quantum target supports.

    ```python
    from qdk import qsharp, TargetProfile
    
    qsharp.init(target_profile=TargetProfile.Base)
    ```

    For more information about QIR target profiles, see [Azure Quantum QIR target profiles in the QDK](xref:microsoft.quantum.target-profiles).

1. Define a Q# operation. For example, use the following `RandomBit` operation.

    ```python
    qsharp.eval("""
        operation RandomBit() : Result {
            use q = Qubit();
            H(q);
            return MResetZ(q);
        }
    """)
    ```

1. Test the operation on the local simulator.

    ```python
    print(qsharp.run("RandomBit()", shots=10))
    ```

1. Compile the operation to QIR.

    ```python
    from qdk.qsharp import compile

    program = compile("RandomBit()")
    ```

#### Submit the Q# job

1. Select a compatible target from your workspace.

    ```python
    target = workspace.get_targets("rigetti.sim.qvm")
    ```

1. Submit the compiled program.

    ```python
    job = target.submit(program, "qsharp-job", shots=100)
    print("Job ID:", job.id)
    ```

1. Wait for the job to complete and retrieve its results.

    ```python
    job.wait_until_completed()
    print("Status:", job.details.status)

    results = job.get_results()
    print(results)
    ```

### [OpenQASM](#tab/openqasm)

Use the `qdk.openqasm` module to compile OpenQASM 3 source code to QIR, and then submit the QIR to an Azure Quantum target.

#### Define and compile the OpenQASM program

1. Define an OpenQASM circuit as a Python string.

    ```python
    qasm_source = """
    OPENQASM 3.0;
    include "stdgates.inc";
    
    bit[2] c;
    qubit[2] q;
    
    h q[0];
    cx q[0], q[1];
    c = measure q;
    """
    ```

1. Compile the program to QIR.

    ```python
    from qdk.openqasm import compile
    
    program = compile(qasm_source)
    ```

#### Submit the OpenQASM job

1. Select a target that accepts the compiled program.

    ```python
    target = workspace.get_targets("ionq.simulator")
    ```

1. Submit the compiled program.

    ```python
    job = target.submit(program, "openqasm-job", shots=100)
    print("Job ID:", job.id)
    ```

1. Wait for the job to complete and retrieve its results.

    ```python
    job.wait_until_completed()
    print("Status:", job.details.status)
    
    results = job.get_results()
    print(results)
    ```

For parameterized OpenQASM programs, bind the input values before you submit a job. For more information on OpenQASM in the QDK, see [Develop OpenQASM programs in the QDK](xref:microsoft.quantum.how-to.openqasm-development-qdk).

### [Qiskit](#tab/qiskit)

Use `AzureQuantumProvider` from the `qdk.azure` module to submit Qiskit jobs to an Azure Quantum provider. The provider object lists compatible Azure Quantum targets and returns Qiskit jobs and results.

#### Create a Qiskit circuit

```python
from qiskit import QuantumCircuit

circuit = QuantumCircuit(3, 3)
circuit.h(0)
circuit.cx(0, 1)
circuit.cx(1, 2)
circuit.measure([0, 1, 2], [0, 1, 2])
```

#### Submit the Qiskit job

1. Create an Azure Quantum provider object from the workspace.

    ```python
    from qdk.azure.qiskit import AzureQuantumProvider
    
    provider = AzureQuantumProvider(workspace)
    ```

1. List the backends that accept Qiskit circuits.

    ```python
    for backend in provider.backends():
        print(backend.name)
    ```

1. Select a backend and submit the circuit.

    ```python
    backend = provider.get_backend("rigetti.sim.qvm")
    job = backend.run(circuit, shots=100)
    
    print("Job ID:", job.job_id())
    print("Status:", job.status())
    ```

1. Wait for the job to complete and retrieve the Qiskit results.

    ```python
    result = job.result()
    counts = result.get_counts(circuit)
    print(counts)
    ```

The Qiskit adapter handles the Azure Quantum input format and converts the provider response to a Qiskit result.

#### Qiskit job results for programs with qubit loss

Some quantum hardware can experience qubit loss when a program is running. If qubit loss occurs at any point during a shot for a Qiskit program, then that shot is removed from the Azure Quantum job results. For example, if qubit loss occurs in 10 out of 200 shots, then the job results have 190 total measurement counts.

The raw results for all shots, including shots where qubit loss occurred, are still available in the `results` object. The following code gets both sets of results.

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

For jobs or targets that don't have qubit loss, the default results and raw results are identical.

> [!NOTE]
> The `memory` attribute for Qiskit job results is a list of the measurement result for each shot.

### [Cirq](#tab/cirq)

Use `AzureQuantumService` from the `qdk.azure` module to submit Cirq jobs to an Azure Quantum provider. The service object lists compatible Azure Quantum targets and returns Cirq-native or provider-native results.

#### Create a Cirq circuit

```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.H(q0),
    cirq.CX(q0, q1),
    cirq.measure(q0, q1, key="result"),
)
```

#### Submit the Cirq job

1. Create the Azure Quantum service object.

    ```python
    from qdk.azure.cirq import AzureQuantumService
    
    service = AzureQuantumService(workspace)
    ```

1. List the targets that accept Cirq circuits.

    ```python
    for target in service.targets():
        print(target.name)
    ```

1. Create an asynchronous job.

    ```python
    job = service.create_job(
        program=circuit,
        repetitions=100,
        target="ionq.simulator",
    )
    
    print("Status:", job.status())
    ```

1. Wait for the job to complete and retrieve its results.

    ```python
    result = job.results()
    print(result)
    ```

The format of the results depends on the provider and target. Some provider result objects can be converted to a `cirq.Result` object.

### [PennyLane](#tab/pennylane)

Convert a PennyLane quantum node to OpenQASM, compile the OpenQASM to QIR, and submit the QIR to an Azure Quantum target.

#### Create a PennyLane circuit

The following circuit is a parameterized circuit. The effect of the `RY` gate depends on the angle `theta`.

```python
import pennylane as qml

device = qml.device("default.qubit", wires=2)

@qml.qnode(device)
def circuit(theta):
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    qml.RY(theta, wires=1)
    return qml.expval(qml.PauliZ(1))
```

#### Convert the circuit to QIR

1. Convert the parameterized circuit to OpenQASM for a specific parameter value.

    ```python
    theta = 0.3
    qasm_source = qml.to_openqasm(circuit)(theta)
    ```

1. Compile the OpenQASM to QIR with a compatible target profile.

    ```python
    from qdk import TargetProfile
    from qdk.openqasm import compile
    
    program = compile(qasm_source, TargetProfile.Base)
    ```

#### Submit the PennyLane job

1. Select a compatible target and submit the QIR.

    ```python
    target = workspace.get_targets("rigetti.sim.qvm")
    job = target.submit(program, "pennylane-job", shots=100)
    
    print("Job ID:", job.id)
    ```

1. Wait for the job to complete and retrieve its results.

    ```python
    job.wait_until_completed()
    print("Status:", job.details.status)
    
    results = job.get_results()
    print(results)
    ```

The format of the results depends on the provider and target. Azure Quantum doesn't return PennyLane quantum node results from the submitted QIR.

***

## Related content

- [How to submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs)
- [Submit jobs with the QDK extension for VS Code](xref:microsoft.quantum.how-to.submit-jobs-vscode)
- [Submit jobs to Azure Quantum with Azure CLI](xref:microsoft.quantum.how-to.submit-jobs-azure-cli)
- [Work with Azure Quantum jobs](xref:microsoft.quantum.work-with-jobs)
- [Quantum programming language support in the QDK](xref:microsoft.quantum.overview.qdk-language-support)
- [Azure Quantum computing provider targets](xref:microsoft.quantum.reference.qc-target-list)
