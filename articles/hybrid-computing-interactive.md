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

In this model, the client compute resource is moved to the cloud, resulting in lower-latency and the ability to repeat execution of the quantum circuit with different parameters. Jobs can be grouped logically into one session, and the jobs in that session can be prioritized over non-session jobs.  Although the qubit states do not persist between jobs, a job Session allows for shorter queue times and longer running problems.

![Interactive quantum computing](~/media/hybrid/interactive.png)

## What is a Session?

A Session is a logical grouping of any combination of one or more jobs against a single target. Each Session has a unique ID, `sessionID`, attached to each job submitted to a provider. Every job within a Session is proritized to run as close as possible from the previously queued job.

Sessions allow you to organize multiple quantum computing jobs with the ability to run classical code between quantum jobs. You'll be able to run complex algorithms to better organize and track your individual quantum computing jobs.

User scenarios where you may want to combine jobs in a Session:

- Running parameterized quantum algorithms where the output of one quantum computing job informs the parameters of the next quantum computing job. The most common example of this type of algorithm is the Variational Quantum Eigensolver, or VQE. 



You can list all top-level submitted items within your Quantum Workspace, that is, Sessions and individual jobs that aren't associated with any Session.
1. Select **Job Management** blade
1. Identify the jobs of type **Session**. 
1. You can see the Unique ID of a Session in column **Id**. 
3. Click on the Session to see the list of all jobs. 

For more information, see [Provider support](#provider-support).

## Get started with Sessions



### Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

> [!NOTE]
> Sessions are not supported for quantum targets not supporting QIR. 

### [Q# + Python](#tab/tabid-iqsharp)

This example shows how to create a Session with Q# inline code using hosted Notebooks in Azure portal. You can also create Sessions using a Python host program that invokes an adjacent Q# program. 

1. Select **Notebooks** blade on your Quantum workspace, and in **My Notebooks** click on **Add New**.
2. In **Kernel Type**, select **IPython**.
3. Type a name for the file, and click **Create file**. 
5. Click **+ Code** to add a new cell in the notebook and import `qsharp` Python SDK. 

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

3. Choose the . In this example, you're using Rigetti simulator as target. 

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
    
    ```python
    with target.open_session(name="Q# Inline Session") as session:
        target.submit(input_data=qir_bitcode, name="Job 1", input_params=input_params)
        target.submit(input_data=qir_bitcode, name="Job 2", input_params=input_params)
        target.submit(input_data=qir_bitcode, name="Job 3", input_params=input_params)

    session_id = target.get_latest_session_id()
    session_jobs = workspace.list_session_jobs(session_id=session_id)

    [session_job.details.name for session_job in session_jobs]
    ```

### [Qiskit](#tab/tabid-qiskit)

1. First, you need to create a `provider` object with your workspace information.

    ```python
    from qiskit import QuantumCircuit
    from qiskit.tools.monitor import job_monitor
    from azure.quantum.qiskit import AzureQuantumProvider

    provider = AzureQuantumProvider(
                resource_id = "", # add your resource ID
                location = "") ## add your location
    ```

2. Write your quantum circuit. 

    ```python
    circuit = QuantumCircuit(2, 2)
    circuit.name = "GenerateRandomBit"
    circuit.h(0)
    circuit.cnot(0,1)
    circuit.measure([0,1], [0,1])
    circuit.draw()
    ```
3. Next, you create a backend instance. In this example, you're setting IonQ simulator as target. 

    ```python
    backend = provider.get_backend("ionq.simulator")
    ```
4. Let's say you want to run your quantum circuit three times, so you set
    ```python
    with backend.open_session(name="Qiskit Session") as session:
        job1 = backend.run(circuit=circuit, shots=100, job_name="Job 1")
        job_monitor(job1)
        job2 = backend.run(circuit=circuit, shots=100, job_name="Job 2")
        job_monitor(job2)
        job3 = backend.run(circuit=circuit, shots=100, job_name="Job 3")
        job_monitor(job3)

    session_id = backend.get_latest_session_id()
    session_jobs = workspace.list_session_jobs(session_id=session_id)

    [session_job.details.name for session_job in session_jobs]
    ```
5. After creating the Session, you can print the Session ID. 

    ```python
    print("Session Id is " + session_id)
    ```

> [!NOTE]
> Check the status of the Session in the **Job Management** blade. Make sure you have "https://ms.portal.azure.com/?Microsoft_Azure_Quantum_sessionapi=true" in the URL.

### [Cirq](#tab/tabid-cirq)

1. First, write your quantum circuit. 

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

```python
from azure.quantum.cirq import AzureQuantumService

service = AzureQuantumService(
            resource_id = "",
            location = "")
```

```python
target = service.get_target("ionq.simulator")
```
```python
with target.open_session(name="Cirq Session") as session:
    target.submit(program=circuit, name="Job 1")
    target.submit(program=circuit, name="Job 2")
    target.submit(program=circuit, name="Job 3")

session_id = target.get_latest_session_id()
session_jobs = workspace.list_session_jobs(session_id=session_id)

[session_job.details.name for session_job in session_jobs]
```

### [QIO](#tab/tabid-qio)

You can create a Session with QIO jobs, and in that case the Session can only contain optimization jobs. 

1. First, create an optimization problem. 

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
2. Then, you choose the solver against you want to run the optimization problem. In this example, you're using [Parallel Tempering target](xref:microsoft.quantum.optimization.parallel-tempering) from QIO. 

```python
from azure.quantum.optimization import ParallelTempering
solver = ParallelTempering(workspace)
```

3. 

```python
with solver.open_session(name="QIO Session") as session:
    problem.name = "Problem 1"
    solver.optimize(problem)
    problem.name = "Problem 2"
    solver.optimize(problem)
    problem.name = "Problem 3"
    solver.optimize(problem)

session_id = solver.get_latest_session_id()
session_jobs = workspace.list_session_jobs(session_id=session_id)

[session_job.details.name for session_job in session_jobs]
```
***






## Provider support

Each quantum hardware provider define their own heuristics to best manage the prioritization of jobs within a Session. 

### Quantinuum 

If you choose to submit jobs within a Session to [Quantinuum target](xref:microsoft.quantum.providers.quantinuum), you'll have exclusive access to Quantinuum hardware until the 1 minute timeout. After that, any job will be accepted and handled with the standard queueing and prioritization logic. 

## Next steps

- [How to work with Sessions](xref:microsoft.quantum.hybrid.interactive.how-to-sessions)
- [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)
