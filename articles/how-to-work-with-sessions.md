---
author: SoniaLopezBravo
description: Learn how to work with jobs and sessions.
ms.date: 04/10/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Manage your sessions
uid: microsoft.quantum.hybrid.interactive.how-to-sessions
---

# How to manage sessions

In this article, you'll learn how to work with sessions. With sessions, you can group one or more jobs against a single target, which allows you to manage jobs effectively. For more information, see [Interactive quantum computing: sessions](xref:microsoft.quantum.hybrid.interactive).

## Retrieve sessions, list sessions, and list jobs of sessions

The following table shows the Python commands to get the list of all sessions and all jobs for a given session. 

|Command|Description|
|---|---|
|`workspace.list_sessions()`| Retrieve a list of all sessions in a Quantum Workspace.|
|`workspace.get_session(sessionId)` | Retrieve the session with ID `sessionId`. Each session has a unique ID. |
|`workspace.list_session_jobs(sessionId)` | Retrieve a list of all jobs in the session with ID `sessionId`. Each session has a unique ID.|

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
      job_failure_policy=SessionJobFailurePolicy.ABORT # optional, detaults to abort
      )

  print(f"Session status: {session.details.status}")
  ```
  At this point, the session only exists on the client, and you can see that the status is **None**. To view the status of the session, you also need to create the session in the service.

2. To **create** a session in the service, you can use `workspace.open_session(session)` or `session.open()`.

3. You can refresh the **status** and the session details with `session.refresh()`, or by getting a new session object from a session ID. 

  ```python
  same_session = workspace.get_session(session.id) 
  print(f"Session: {session.details} \n")
  print(f"Session: {same_session.details} \n")
  ```

4. You can **close** a session with `session.close()` or `workspace.close_session(session)`.   
  
## Session timeouts

A session times out if no new job is submitted within the session for 10 minutes. The session reports a status of **TimedOut**. To avoid this, add a `with` block using `backend.open_session(name="Name")`, so the session `close()` is invoked by the service at the end of the code block. 

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
    job_monitor(job1)
    job2 = backend.run(circuit=circuit, shots=100, job_name="Job 2") # Second job submission
    job_monitor(job2)
    job3 = backend.run(circuit=circuit, shots=100, job_name="Job 3") # Third job submission
    job_monitor(job3)
```

## Job failure policy within sessions

The default policy for a session when a job fails is to end that session. If you submit an additional job within the same session, the service rejects it and the session reports a status of **Failed**. Any in progress jobs are cancelled.

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

## Next steps

[Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)
