---
author: SoniaLopezBravo
description: Understand the architecture of interactive (sessions) quantum computing and learn ho to create a new Session.
ms.date: 03/30/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v']
title: Introduction to Sessions
uid: microsoft.quantum.hybrid.interactive
---

# Interactive quantum computing: Sessions

In this model, the client compute resource is moved to the cloud, resulting in lower-latency and the ability to repeat execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session, and the jobs in that session can be prioritized over non-session jobs.  Although the qubit states do not persist between jobs, a session allows for shorter queue times for jobs and longer running problems.

![Interactive quantum computing](~/media/hybrid/interactive.png)

## What is a Session?

A session is a logical grouping of one or more jobs submitted to a single target. Each session has a unique ID attached to each job in that session. In some cases, jobs submitted within a session are prioritized in the queue of that target. For more information, see [Provider support](#provider-support).

Sessions allow you to organize multiple quantum computing jobs with the ability to run classical code between quantum jobs. You'll be able to run complex algorithms to better organize and track your individual quantum computing jobs.

User scenarios where you may want to combine jobs in a Session:

- Running parameterized quantum algorithms where the output of one quantum computing job informs the parameters of the next quantum computing job. The most common example of this type of algorithm is the Variational Quantum Eigensolver, or VQE. 

## Get started with Sessions

Sessions can be created for jobs running [QIR](xref:microsoft.quantum.concepts.qir) programs, such as Q#, Qiskit and Cirq programs, and for Quantum-Inspired Optimizations (QIO) jobs. 

> [!NOTE]
> Sessions are not supported for quantum targets not supporting QIR. 

### Prerequisites

To create a Session, you need the following prerequisites:

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

### [Q# + Python](#tab/tabid-iqsharp)

This example shows how to create a Session with Q# inline code using hosted Notebooks in Azure portal. You can also create Sessions using a [Python host program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs) that invokes an adjacent Q# program. 

1. Select **Notebooks** blade on your Quantum workspace, and in **My Notebooks** click on **Add New**.
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
    target.input_data_format = "qir.v1"
    target.content_type = "qir.v1"
    target.output_data_format = "microsoft.quantum-results.v1"
    input_params = {
        "entryPoint": "ENTRYPOINT__GenerateRandomBit",
        "arguments": []
    }

    # These line won't be necessary very soon. They will be inside the target.submit
    qir_bitcode = GenerateRandomBit._repr_qir_(target=target.name)
    ```
 7. Next, you create a Session. Let's say you want to run `GenerateRandomBit` operation three times, so you use `target.submit` to submit the Q# operation with the target data and you repeat the code three times. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the Session. For more information, see [How to manage Sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).
 
    ```python
    with target.open_session(name="Q# Session") as session:
        target.submit(input_data=qir_bitcode, name="Job 1", input_params=input_params) # First job submission
        target.submit(input_data=qir_bitcode, name="Job 2", input_params=input_params) # Second job submission
        target.submit(input_data=qir_bitcode, name="Job 3", input_params=input_params) # Third job submission 

    session_id = target.get_latest_session_id()
    session_jobs = workspace.list_session_jobs(session_id=session_id)

    [session_job.details.name for session_job in session_jobs]
    ```
8. After creating the Session, you can print the Session ID. 

    ```python
    print("Session Id is " + session_id)
    ```

### [Qiskit](#tab/tabid-qiskit)


1. First, you need to import an additional modules from `azure-quantum` and `qiskit`. Next, you create a `provider` object with your Quantum workspace information.

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
3. Next, you create a backend instance with the [quantum target](xref:microsoft.quantum.reference.qc-target-list)  of you choice. In this example, you're setting [IonQ simulator](xref:microsoft.quantum.providers.ionq) as target. 

    ```python
    backend = provider.get_backend("ionq.simulator")
    ```
4. Next, you create a Session. Let's say you want to run your quantum circuit three times, so you use `backend.run` to submit the Qiskit circuit, and you repeat the code three times. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the Session. For more information, see [How to manage Sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).

    ```python
    with backend.open_session(name="Qiskit Session") as session:
        job1 = backend.run(circuit=circuit, shots=100, job_name="Job 1") # First job submission
        job_monitor(job1)
        job2 = backend.run(circuit=circuit, shots=100, job_name="Job 2") # Second job submission
        job_monitor(job2)
        job3 = backend.run(circuit=circuit, shots=100, job_name="Job 3") # Third job submission
        job_monitor(job3)

    session_id = backend.get_latest_session_id()
    session_jobs = workspace.list_session_jobs(session_id=session_id)

    [session_job.details.name for session_job in session_jobs]
    ```
5. After creating the Session, you can print the Session ID. 

    ```python
    print("Session Id is " + session_id)
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
4. Next, you create a Session. Let's say you want to run your quantum circuit three times, so you use `target.submit` to submit the Cirq circuit, and you repeat the code three times. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the Session. For more information, see [How to manage Sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).
    
    ```python
    with target.open_session(name="Cirq Session") as session:
        target.submit(program=circuit, name="Job 1") # First job submission
        target.submit(program=circuit, name="Job 2") # Second job submission
        target.submit(program=circuit, name="Job 3") # Third job submission

    session_id = target.get_latest_session_id()
    session_jobs = workspace.list_session_jobs(session_id=session_id)

    [session_job.details.name for session_job in session_jobs]
    ```
5. After creating the Session, you can print the Session ID. 

    ```python
    print("Session Id is " + session_id)
    ```

### [QIO](#tab/tabid-qio)

You can create a Session with QIO jobs, and in that case the Session can only contain optimization jobs. 

1. First, create an optimization problem. For example, the following program solves an Ising type optimization problem. 

    ```python
    import azure.quantum.optimization as optimization

    problem = optimization.Problem(
        name="Ising Problem",
        problem_type=optimization.ProblemType.ising,
        terms=[
            optimization.Term(c=1, indices=[0]),
            optimization.Term(c=2, indices=[1,0])
            ]
        )
    ```
2. Select the [QIO target](xref:microsoft.quantum.reference.qio-target-list) of your choice. In this example, you're using [Parallel Tempering target](xref:microsoft.quantum.optimization.parallel-tempering) from Microsoft QIO. 

    ```python
    from azure.quantum.optimization import ParallelTempering
    solver = ParallelTempering(workspace)
    ```

3. Next, you create a Session. Let's say you want to run your optimization program three times, so you use `solver.open_session` to create a Session, and you repeat the code `solver.optimize(problem)` three times to sumit three jobs. You can use `workspace.list_session_jobs` to retrieve a list of all jobs in the Session. For more information, see [How to manage Sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions#retrieve-sessions-list-sessions-and-list-jobs-of-sessions).

    ```python
    with solver.open_session(name="QIO Session") as session:
        problem.name = "Problem 1"
        solver.optimize(problem) # First job submission
        problem.name = "Problem 2"
        solver.optimize(problem) # Second job submission
        problem.name = "Problem 3"
        solver.optimize(problem) # Third job submission

    session_id = solver.get_latest_session_id()
    session_jobs = workspace.list_session_jobs(session_id=session_id)

    [session_job.details.name for session_job in session_jobs]
    ```
4. After creating the Session, you can print the Session ID. 

    ```python
    print("Session Id is " + session_id)
    ```
***

## Monitoring Sessions

You can list all top-level submitted items within your Quantum workspace in **Job Management** blade, that is, Sessions and individual jobs that aren't associated with any Session.

1. Select **Job Management** blade in your Quantum workspace.
1. Identify the jobs of type **Session**. In this view you can see the Unique ID of a Session in column **Id** and monitor its **Status**. 
1. Click on a Session's name for more details.
1. You can see the list of **All jobs** within the Session and monitor their status.

## Provider support

Each quantum hardware provider define their own heuristics to best manage the prioritization of jobs within a Session. 

### Quantinuum 

If you choose to submit jobs within a Session to [Quantinuum target](xref:microsoft.quantum.providers.quantinuum), you'll have exclusive access to Quantinuum hardware until the 1 minute timeout. After that, any job will be accepted and handled with the standard queueing and prioritization logic. 

## Next steps

- [How to work with Sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions)
- [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)
