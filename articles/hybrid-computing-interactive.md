---
author: SoniaLopezBravo
description: Understand the architecture of sessions in hybrid quantum computing and learn how to create a new session.
ms.date: 07/22/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: ['Q#', '$$v', Variational Quantum Eigensolver, Quantum Approximate Optimization Algorithm, target, targets]
title: Get Started with Sessions
uid: microsoft.quantum.hybrid.interactive

#customer intent: As a quantum developer, I want to understand the architecture of interactive sessions.
---

# Get started with sessions

Sessions are a key feature of hybrid quantum computing that allow you to group multiple quantum computing jobs together.

This article explains the architecture of sessions in hybrid quantum computing and how to create a new session.

## Prerequisites

To create a session, you need the following prerequisites:

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The Azure Quantum `azure-quantum` package. If you want to use Qiskit or Cirq, you need to install the `azure-quantum` package with the \[qiskit\] or \[cirq\] tags. 

    ```bash
    pip install --upgrade azure-quantum[qiskit] 
    ```

## What is a session?

A session is a logical grouping of one or more jobs submitted to a single target. Each session has a unique ID attached to each job in that session. 

In sessions, the client compute resource may be moved to the cloud, resulting in lower-latency and the ability to repeat execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session, and the jobs in that session can be prioritized over non-session jobs. Although the qubit states don't persist between jobs, a session allows for shorter queue times for jobs and longer running problems.

Sessions allow you to organize multiple quantum computing jobs with the ability to run classical code between quantum jobs. You'll be able to run complex algorithms to better organize and track your individual quantum computing jobs.

A key user scenario where you may want to combine jobs in a session is *parameterized* quantum algorithms where the output of one quantum computing job informs the parameters of the next quantum computing job. The most common examples of this type of algorithm are :::no-loc text="Variational Quantum Eigensolvers"::: (VQE) and :::no-loc text="Quantum Approximate Optimization Algorithms":::  (QAOA).

## Supported hardware

Sessions are supported on **all** quantum computing hardware providers. In some cases, jobs submitted within a session are prioritized in the queue of that target. For more information, see [Target behavior](#target-behavior).

## How to create a session

To create a session, you need to follow these steps:

### [Q# + Python](#tab/tabid-iqsharp)

This example shows how to create a session with Q# inline code using a Jupyter Notebook in Visual Studio Code. You can also create sessions using a [Python program](xref:microsoft.quantum.submit-jobs?pivots=ide-python) that invokes an adjacent Q# program. 

> [!NOTE]
> Sessions are managed with Python, even when running Q# inline code.

1. In VS Code, select **View > Command palette** and select **Create: New Jupyter Notebook**.
1. In the top-right, VS Code will detect and display the version of Python and the virtual Python environment that was selected for the notebook. If you have multiple Python environments, you may need to select a kernel using the kernel picker in the top right. If no environment was detected, see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information.
1. In the first cell of the notebook, run 

    ```python
    import azure.quantum

    workspace = azure.quantum.Workspace(
        resource_id = "", # add your resource ID
        location = "", # add your location, for example "westus"
    )
    ```

1. Click **+ Code** to add a new cell in the notebook and import `qsharp` Python SDK. 

    ```python
    import qsharp
    ```

1. Select the [quantum target](xref:microsoft.quantum.reference.qc-target-list) of your choice. In this example, you're using [IonQ simulator](xref:microsoft.quantum.providers.ionq) as target.

    ```python
    target = workspace.get_targets("ionq.simulator")
    ```	

1. Select the configurations of the [target profile](xref:microsoft.quantum.target-profiles), either `Base`, `Adaptive_RI`, or `Unrestricted`.

    ```python
    qsharp.init(target_profile=qsharp.TargetProfile.Base) # or qsharp.TargetProfile.Adaptive_RI, qsharp.TargetProfile.Unrestricted
    ```

    > [!NOTE]
    > `Adaptive_RI` target profile jobs are currently supported on Quantinuum targets. For more information, see [Integrated hybrid quantum computing](xref:microsoft.quantum.hybrid.integrated).

1. Write your Q# program. For example, the following Q# program generates a random bit. To illustrate the use of input arguments, this program takes an integer, `n`, and an array of angles, `angle`, as input.

    ```qsharp
    %%qsharp
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Arrays;

    operation GenerateRandomBits(n: Int, angle: Double[]) : Result[] {
       use qubits = Qubit[n]; // n parameter as the size of the qubit array
       for q in qubits {
           H(q);
       }
       R(PauliZ, angle[0], qubits[0]); // arrays as entry-points parameters
       R(PauliZ, angle[1], qubits[1]);
       let results = MeasureEachZ(qubits);
       ResetAll(qubits);
       return results;
    }
    ```

1. Next, you create a session. Let's say you want to run `GenerateRandomBit` operation three times, so you use `target.submit` to submit the Q# operation with the `target` data and you repeat the code three times - in a real world scenario, you may want to submit different programs instead of the same code.
 
    ```python
    angle = [0.0, 0.0]
    with target.open_session(name="Q# session of three jobs") as session:
        target.submit(input_data=qsharp.compile(f"GenerateRandomBits(2, {angle})"), name="Job 1", shots=100) # First job submission
        angle[0] += 1
        target.submit(input_data=qsharp.compile(f"GenerateRandomBits(2, {angle})"), name="Job 2", shots=100) # Second job submission
        angle[1] += 1
        target.submit(input_data=qsharp.compile(f"GenerateRandomBits(2, {angle})"), name="Job 3", shots=100) # Third job submission
    
    session_jobs = session.list_jobs()
    [session_job.details.name for session_job in session_jobs]
    ```

    > [!IMPORTANT]
    > When passing arguments as parameters to the job, they are formatted into the Q# expression when calling `qsharp.compile`. This means that you need to be careful to format your arguments as Q# objects. In this example, because arrays in Python are already printed as \[item0, item1, ...\], the input arguments match the Q# formatting. For other Python data structures you might need more handling to get the string values inserted into the Q# in a compatible way.

1. Once you create a session, you can use `workspace.list_session_jobs` to retrieve a list of all jobs in the session. For more information, see [How to manage sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).


### [Qiskit](#tab/tabid-qiskit)

1. First, you need to import additional modules from `azure-quantum` and `qiskit`. Next, create a `provider` object with your Quantum workspace information.

    ```python
    from qiskit import QuantumCircuit
    from azure.quantum import Workspace
    from azure.quantum.qiskit import AzureQuantumProvider

    workspace = Workspace(
                resource_id = "", # add your resource ID
                location = "") # add your location
    
    provider = AzureQuantumProvider(workspace)
    ```

2. Write your quantum circuit. For example, the following circuit generates a random bit. 

    ```python
    circuit = QuantumCircuit(2, 2)
    circuit.name = "GenerateRandomBit"
    circuit.h(0)
    circuit.cx(0,1)
    circuit.measure([0,1], [0,1])
    circuit.draw()
    ```

3. Next, create a backend instance with the [quantum target](xref:microsoft.quantum.reference.qc-target-list) of your choice. In this example, set [IonQ simulator](xref:microsoft.quantum.providers.ionq) as the target. 

    ```python
    backend = provider.get_backend("ionq.simulator")
    ```

4. Next, create a session. Let's say you want to run your quantum circuit three times, so you use `backend.run` to submit the Qiskit circuit, and you repeat the code three times - in a real world scenario, you may want to submit different programs instead of the same code. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the session. For more information, see [How to manage sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).

    ```python
    with backend.open_session(name="Qiskit Session") as session:
        job1 = backend.run(circuit=circuit, shots=100, job_name="Job 1") # First job submission
        job1.wait_for_final_state()
        job2 = backend.run(circuit=circuit, shots=100, job_name="Job 2") # Second job submission
        job2.wait_for_final_state()
        job3 = backend.run(circuit=circuit, shots=100, job_name="Job 3") # Third job submission
        job3.wait_for_final_state()

    session_jobs = session.list_jobs()
    [session_job.details.name for session_job in session_jobs]
    ```

### [Cirq](#tab/tabid-cirq)

1. First, write your quantum circuit. For example, the following circuit generates a random bit. 

    ```python
    import cirq

    q0 = cirq.LineQubit(0)
    q1 = cirq.LineQubit(1)
    circuit = cirq.Circuit(
        cirq.H(q0),  # H gate
        cirq.CNOT(q0, q1),
        cirq.measure(q0, key='q0'),
        cirq.measure(q1, key='q1')
    )
    print(circuit)
    ```

2. Then, create a `service` object with your Quantum workspace information. 

    ```python
    from azure.quantum.cirq import AzureQuantumService

    service = AzureQuantumService(
                resource_id = "", # add your resource ID
                location = "") # add your location
    ```

3. Select the [quantum target](xref:microsoft.quantum.reference.qc-target-list) of your choice. In this example, you're using [IonQ simulator](xref:microsoft.quantum.providers.ionq) as target.

    > [!NOTE]
    > Cirq circuits can only use IonQ or Quantinuum targets.

    ```python
    target = service.get_target("ionq.simulator")
    ```

4. Next, you create a session. Let's say you want to run your quantum circuit three times, so you use `target.submit` to submit the Cirq circuit, and you repeat the code three times - in a real world scenario, you may want to submit different programs instead of the same code.. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the session. For more information, see [How to manage sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).

    ```python
    with target.open_session(name="Cirq Session") as session:
        target.submit(program=circuit, name="Job 1", repetitions=100) # First job submission
        target.submit(program=circuit, name="Job 2", repetitions=100) # Second job submission
        target.submit(program=circuit, name="Job 3", repetitions=100) # Third job submission
    
    session_jobs = session.list_jobs()
    [session_job.details.name for session_job in session_jobs]
    ```

***

## Target behavior 

Each quantum hardware provider defines their own heuristics to best manage the prioritization of jobs within a session. 

### Quantinuum 

If you choose to submit jobs within a session to a [Quantinuum target](xref:microsoft.quantum.providers.quantinuum), your session will have exclusive access to the hardware as long as you queue jobs within one minute from each other. After that, your jobs will be accepted and handled with the standard queueing and prioritization logic. 

## Related content

- [How to manage your sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions)
- [Run hybrid quantum computing](xref:microsoft.quantum.hybrid.integrated)
