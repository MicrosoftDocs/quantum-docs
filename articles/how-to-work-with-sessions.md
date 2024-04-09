---
author: SoniaLopezBravo
description: Learn how to manually manage your jobs using sessions, what are the job failure policies, and how to avoid session timeouts.
ms.date: 04/09/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Manage your Sessions
uid: microsoft.quantum.hybrid.interactive.how-to-sessions
#customer intent: As a quantum developer, I want understand how to work with multiple sessions. 
---

# How to manage sessions

In this article, you learn how to work with sessions. With sessions, you can group one or more jobs against a single target, which allows you to manage jobs effectively. For more information, see [Interactive quantum computing: sessions](xref:microsoft.quantum.hybrid.interactive).

> [!NOTE]
> Sessions are managed with Python, even when running Q# inline code. For more information, see “Q# + Python” section of [Get started with sessions](xref:microsoft.quantum.hybrid.interactive#get-started-with-sessions).

## Retrieve sessions, list sessions, and list jobs of sessions

The following table shows the Python commands to get the list of all sessions and all jobs for a given session. 

|Command| Description|
|---|---|
|[`workspace.list_sessions()`](xref:azure.quantum.Workspace) or `session.list_sessions()` | Retrieve a list of all sessions in a Quantum Workspace.|
|[`workspace.get_session(sessionId)`](xref:azure.quantum.Workspace) or `session.get_session(sessionId)` | Retrieve the session with ID `sessionId`. Each session has a unique ID. |
|[`workspace.list_session_jobs(sessionId)`](xref:azure.quantum.Workspace) or `session.list_session_jobs(sessionId)`  | Retrieve a list of all jobs in the session with ID `sessionId`. Each session has a unique ID.|

For example, the following code defines a function that gets a session with a minimum number of jobs. Then, for that session, it lists all the jobs, the total number of jobs, and the first 10 jobs. 

```python
def get_a_session_with_jobs(min_jobs):
    all_sessions = workspace.list_sessions() # list of all sessions
    for session in all_sessions:
        if len(workspace.list_session_jobs(session.id)) >= min_jobs:
            return session

session = get_a_session_with_jobs(min_jobs=3) # Get a Session with at least 3 jobs

session_jobs = workspace.list_session_jobs(session.id) # List of all jobs within Session ID

print(f"Job count: {len(session_jobs)} \n")
print(f"First 10 jobs for session {session.id}:")
for job in session_jobs[0:10]:
    print(f"Id: {job.id}, Name={job.details.name}")
```

## Manual methods of opening/closing sessions

We recommend following the steps in [Get started with sessions](xref:microsoft.quantum.hybrid.interactive#get-started-with-sessions) to create a new session. However,  you can manually create sessions.

### [Q# + Python](#tab/tabid-pythonsdk)

1. First, create a **Session object**.

      ```python
      from azure.quantum.job.session import Session, SessionDetails, SessionJobFailurePolicy
      import uuid
    
      session = Session(
          workspace=workspace, # required
          id=f"{uuid.uuid1()}", # optional, if not passed will use uuid.uuid1()
          name="", # optional, will be blank if not passed
          provider_id="ionq", # optional, if not passed will try to parse from the target
          target="ionq.simulator", # required
          job_failure_policy=SessionJobFailurePolicy.ABORT # optional, defaults to abort
          )
    
      print(f"Session status: {session.details.status}")
      ```

    > [!NOTE]
    > At this point, the session only exists on the client, and you can see that the status is **None**. To view the status of the session, you also need to create the session in the service.

1. To **create** a session in the service, you can use [`workspace.open_session(session)`](xref:azure.quantum.Workspace) or [`session.open()`](xref:azure.quantum.job.Session).
1. You can refresh the **status** and the session details with [`session.refresh()`](xref:azure.quantum.job.Session), or by getting a new session object from a session ID. 

      ```python
      same_session = workspace.get_session(session.id) 
      print(f"Session: {session.details} \n")
      print(f"Session: {same_session.details} \n")
      ```

1. You can **close** a session with [`session.close()`](xref:azure.quantum.job.Session) or [`workspace.close_session(session)`](xref:azure.quantum.Workspace).
1. To **attach the session** to a target, you can use `target.latest_session`.
1. You can **wait** for a session to be completed:

     ```python
    session_jobs = session.list_jobs()
    [session_job.id for session_job in session_jobs]
    
    import time
    while (session.details.status != "Succeeded" and session.details.status != "Failed" and session.details.status != "TimedOut"):
       session.refresh()
       time.sleep(5)
      ```

### [Qiskit](#tab/tabid-qiskit)

1. First, import the **credentials** of your Azure Quantum workspace.

    ```python
    import os
    resource_id = os.environ.get("AZURE_QUANTUM_RESOURCE_ID")
    location = os.environ.get("AZURE_QUANTUM_LOCATION")
    ```

1. Next, you create a **Provider object**.

    ```python
    from azure.quantum import Workspace
    from azure.quantum.qiskit import AzureQuantumProvider

    workspace = Workspace (
        resource_id = resource_id,
        location = location
    )

    provider = AzureQuantumProvider(workspace)
    ```

1. You create a **quantum backend** using the target you want to use. For example, the following code creates a quantum backend for IonQ simulator. For more information, see [Create an Azure Quantum backend](xref:microsoft.quantum.how-to.adapting-qiskit#create-an-azure-quantum-backend).

    ```python
    ionq_simulator_backend = provider.get_backend("ionq.simulator")
    provider_backend = ionq_simulator_backend
    backend_id = provider_backend.name()
    ```

1. To **create** a session object, you can use the `.open_session` function.

    ```python
    from azure.quantum.job.session import Session, SessionJobFailurePolicy
    session = provider_backend.open_session(name="Azure Quantum Session",
    job_failure_policy=SessionJobFailurePolicy.CONTINUE) # optional, defaults to abort
    session.open()
    
    print("Creating session")
    ```
    
1. To **attach the session** manually created to the quantum backend, you can use `session = provider_backend.latest_session`.
1. You can **retrieve** the jobs of your session using `session.list(jobs)`.
1. You can **close** a session with `session.close()`.
1. You can **wait** for a session to be completed:

    ```python
    print("Waiting for jobs to complete")
    
    import time
    while (session.details.status != "Succeeded" and session.details.status != "Failed" and session.details.status != "TimedOut"):
      session.refresh()
      time.sleep(5)
    print("Session status: " + session.details.status)
    ```
    
***

## Passing arguments in Q#  

If your Q# operation requires passing arguments, those arguments aren't known until job submission. This leads to some cases when the QIR program generated by the compiler isn't compatible with hardware targets because it makes use of functions that are not known until runtime. Therefore some arguments aren't susceptible to use in sessions. This is the case of passing arrays of unknown size.

Consider the following Q# program.

```qsharp
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

1. If you use the `n` parameter as the size of the qubit array, its size isn't known until runtime. To solve it, use qubit registers whose size is known at compile time, `use qubits = Qubit[2]`.
1. If you use arrays as entry-point parameters, the size of these arrays isn't known until runtime. To solve it, use individual `Double` parameters instead of an array, `operation GenerateRandomBits(angle1: Double[], angle2: Double[]) : Result[]`.

Currently sessions are managed exclusively with Python. You can use `"arguments"` to pass arguments individually into your Q# operation to each job submission. 

```python
with target.open_session(name="Q# session of three jobs") as session:
    target.submit(input_data=GenerateRandomBits, name="Job 1", shots=100, input_params={"arguments":    [
        {"name": "angle1", "type": "Double", "value": angle[0]},
        {"name": "angle2", "type": "Double", "value": angle[1]}, 
    ]}) # First job submission
    angle[0] += 1
    target.submit(input_data=GenerateRandomBits, name="Job 2", shots=100, input_params={"arguments":    [
        {"name": "angle1", "type": "Double", "value": angle[0]},
        {"name": "angle2", "type": "Double", "value": angle[1]}, 
    ]}) # Second job submission
    angle[1] += 1
    target.submit(input_data=GenerateRandomBits, name="Job 3", shots=100, input_params={"arguments":    [
        {"name": "angle1", "type": "Double", "value": angle[0]},
        {"name": "angle2", "type": "Double", "value": angle[1]}, 
    ]}) # Third job submission
```

## Session timeouts

A session times out if no new job is submitted within the session for 10 minutes. The session reports a status of **TimedOut**. To avoid this situation, add a `with` block using `backend.open_session(name="Name")`, so the session `close()` is invoked by the service at the end of the code block. 

> [!NOTE]
> If there are errors or bugs in your program, it might take more than 10 minutes to submit a new job after the previous jobs in the session have all completed. 

The following code snippets show an example of a session times out after 10 minutes because no new jobs are submitted. To avoid that, the next code snippet shows how to use a `with` block to create a session. 

```python
#Example of a session that times out 

session = backend.open_session(name="Qiskit circuit session") # Session times out because only contains one job
backend.run(circuit=circuit, shots=100, job_name="Job 1")
```

```python
#Example of a session that includes a with block to avoid timeout

with backend.open_session(name="Qiskit circuit session") as session:  # Use a with block to submit multiple jobs within a session
    job1 = backend.run(circuit=circuit, shots=100, job_name="Job 1") # First job submission
    job1.wait_for_final_state()
    job2 = backend.run(circuit=circuit, shots=100, job_name="Job 2") # Second job submission
    job2.wait_for_final_state()
    job3 = backend.run(circuit=circuit, shots=100, job_name="Job 3") # Third job submission
    job3.wait_for_final_state()
```

## Job failure policy within sessions

The default policy for a session when a job fails is to end that session. If you submit an additional job within the same session, the service rejects it and the session reports a status of **Failed**. Any in progress jobs are canceled.

However, this behavior can be changed by specifying a job failure policy of `job_failure_policy=SessionJobFailurePolicy.CONTINUE`, instead of the default `SessionJobFailurePolicy.ABORT`, when creating the session. When the job failure policy is `CONTINUE`, the service continues to accept jobs. The session reports a status of **Failure(s)** in this case, which will change to **Failed** once the session is closed.

If the session is never closed and times out, the status is **TimedOut** even if jobs have failed. 

For example, the following program creates a session with three jobs. The first job fails because it specifies `"garbage"` as input data. To avoid the end of the session at this point, the program shows how to add `job_failure_policy=SessionJobFailurePolicy.CONTINUE` when creating the session. 

```python
#Example of a session that does not close but reports Failure(s) when a jobs fails

with target.open_session(name="JobFailurePolicy Continue", job_failure_policy=SessionJobFailurePolicy.CONTINUE) as session:
    target.submit(input_data="garbage", name="Job 1") #Input data is missing, this job fails
    target.submit(input_data=quil_program, name="Job 2") #Subsequent jobs are accepted beacuse of CONTINUE policy
    target.submit(input_data=quil_program, name="Job 3")
```

## Next step

> [!div class="nextstepaction"]
> [Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)
