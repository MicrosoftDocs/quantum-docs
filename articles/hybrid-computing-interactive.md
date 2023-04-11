---
author: SoniaLopezBravo
description: Understand the architecture of interactive (sessions) quantum computing and learn ho to create a new session.
ms.date: 04/10/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Introduction to sessions
uid: microsoft.quantum.hybrid.interactive
---

# Interactive quantum computing: sessions

In this model, the client compute resource may be moved to the cloud, resulting in lower-latency and the ability to repeat execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session, and the jobs in that session can be prioritized over non-session jobs.  Although the qubit states do not persist between jobs, a session allows for shorter queue times for jobs and longer running problems.

![Interactive quantum computing](~/media/hybrid/interactive.png)

## What is a session?

A session is a logical grouping of one or more jobs submitted to a single target. Each session has a unique ID attached to each job in that session. In some cases, jobs submitted within a session are prioritized in the queue of that target. For more information, see [Target behavior](#target-behavior).

Sessions allow you to organize multiple quantum computing jobs with the ability to run classical code between quantum jobs. You'll be able to run complex algorithms to better organize and track your individual quantum computing jobs.

A key user scenario where you may want to combine jobs in a session is *parameterized* quantum algorithms where the output of one quantum computing job informs the parameters of the next quantum computing job. The most common examples of this type of algorithm are Variational Quantum Eigensolver (VQE) and Quantum Approximate Optimization Algorithm (QAOA).

## Get started with sessions

Sessions can be created for quantum programs written in Q# or Python (Qiskit, Cirq etc.) 

### Prerequisites

To create a session, you need the following prerequisites:

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

### [Q# + Python](#tab/tabid-iqsharp)

This example shows how to create a session with Q# inline code using hosted Notebooks in the Azure portal. You can also create sessions using a [Python host program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs#q-with-host-programs) that invokes an adjacent Q# program. 

1. Select the **Notebooks** blade in your Quantum workspace, and in **My Notebooks** click on **Add New**.
2. In **Kernel Type**, select **IPython**.
3. Type a name for the file, and click **Create file**. 
4. Click **+ Code** to add a new cell in the notebook and import `qsharp` Python SDK. 

    ```python
    import qsharp
    ```
5. Write your Q# program. For example, the following Q# program generates a random bit. 

    ```python
    %%qsharp
    open Microsoft.Quantum.Intrinsic;

    operation GenerateRandomBit() : Result {
        use q0 = Qubit();
        H(q0);
        return M(q0);
    }
    ```

6. Select the [quantum target](xref:microsoft.quantum.reference.qc-target-list) of your choice. In this example, you're using [Rigetti simulator](xref:microsoft.quantum.providers.rigetti) as target. 

    ```python
    target = workspace.get_targets("rigetti.sim.qvm")
    ```
    > [!NOTE]
    > For Q# programs, sessions are not currently supported for IonQ targets. 
    
 7. Next, you create a session. Let's say you want to run `GenerateRandomBit` operation three times, so you use `target.submit` to submit the Q# operation with the target data and you repeat the code three times - in a real world scenario, you may want to submit different programs instead of the same code. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the session. For more information, see [How to manage sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).
 
    ```python
    with target.open_session(name="Q# Session") as session:
        target.submit(input_data=GenerateRandomBit, name="Job 1", input_params={"count":100}) # First job submission
        target.submit(input_data=GenerateRandomBit, name="Job 2", input_params={"count":100}) # Second job submission
        target.submit(input_data=GenerateRandomBit, name="Job 3", input_params={"count":100}) # Third job submission 

    session_jobs = workspace.list_session_jobs(session_id=session.id)
    [session_job.details.name for session_job in session_jobs]
    ```

### [Qiskit](#tab/tabid-qiskit)

1. First, you need to import additional modules from `azure-quantum` and `qiskit`. Next, create a `provider` object with your Quantum workspace information.

    ```python
    from qiskit import QuantumCircuit
    from qiskit.tools.monitor import job_monitor
    from azure.quantum.qiskit import AzureQuantumProvider

    provider = AzureQuantumProvider(
                resource_id = "", # add your resource ID
                location = "") # add your location
    ```

2. Write your quantum circuit. For example, the following circuit generates a random bit. 

    ```python
    circuit = QuantumCircuit(2, 2)
    circuit.name = "GenerateRandomBit"
    circuit.h(0)
    circuit.cnot(0,1)
    circuit.measure([0,1], [0,1])
    circuit.draw()
    ```
3. Next, create a backend instance with the [quantum target](xref:microsoft.quantum.reference.qc-target-list)  of your choice. In this example, set [IonQ simulator](xref:microsoft.quantum.providers.ionq) as the target. 

    ```python
    backend = provider.get_backend("ionq.simulator")
    ```
4. Next, create a session. Let's say you want to run your quantum circuit three times, so you use `backend.run` to submit the Qiskit circuit, and you repeat the code three times - in a real world scenario, you may want to submit different programs instead of the same code. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the session. For more information, see [How to manage sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).

    ```python
    with backend.open_session(name="Qiskit Session") as session:
        job1 = backend.run(circuit=circuit, shots=100, job_name="Job 1") # First job submission
        job_monitor(job1)
        job2 = backend.run(circuit=circuit, shots=100, job_name="Job 2") # Second job submission
        job_monitor(job2)
        job3 = backend.run(circuit=circuit, shots=100, job_name="Job 3") # Third job submission
        job_monitor(job3)

    session_jobs = workspace.list_session_jobs(session_id=session.id)
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

    ```python
    target = service.get_target("ionq.simulator")
    ```
4. Next, you create a session. Let's say you want to run your quantum circuit three times, so you use `target.submit` to submit the Cirq circuit, and you repeat the code three times - in a real world scenario, you may want to submit different programs instead of the same code.. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the session. For more information, see [How to manage sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).
    
    ```python
    with target.open_session(name="Cirq Session") as session:
        target.submit(program=circuit, name="Job 1") # First job submission
        target.submit(program=circuit, name="Job 2") # Second job submission
        target.submit(program=circuit, name="Job 3") # Third job submission

    session_id = target.get_latest_session_id()
    session_jobs = workspace.list_session_jobs(session_id=session_id)

    [session_job.details.name for session_job in session_jobs]
    ```
***

## Monitoring sessions

You can use the **Job management** blade in your Quantum workspace to view all top-level submitted items, including sessions and individual jobs that aren't associated with any session.

1. Select the **Job management** blade in your Quantum workspace.
1. Identify the jobs of type **Session**. In this view you can see the Unique ID of a Session in column **Id** and monitor its **Status**. 
1. Click on a session's name for more details.
1. You can see the list of **All jobs** within the session and monitor their status.

## Target behavior 

Each quantum hardware provider defines their own heuristics to best manage the prioritization of jobs within a session. 

### Quantinuum 

If you choose to submit jobs within a session to a [Quantinuum target](xref:microsoft.quantum.providers.quantinuum), your session will have exclusive access to the hardware as long as you queue jobs within one minute from each other. After that, any job will be accepted and handled with the standard queueing and prioritization logic. 

## Next steps

- [How to manage sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions)
- [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)
