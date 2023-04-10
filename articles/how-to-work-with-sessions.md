---
author: SoniaLopezBravo
description: Learn how to work with jobs and sessions.
ms.date: 04/10/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Manage your Sessions
uid: microsoft.quantum.hybrid.interactive.how-to-sessions
---

# How to manage sessions

In this article, you'll learn how to work with sessions. With sessions, you can group one or more jobs against a single target, which allows you to manage jobs effectively. For more information, see [Interactive quantum computing: sessions](xref:microsoft.quantum.hybrid.interactive).

## Retrieve sessions, list sessions, and list jobs of sessions

The following table shows the Python commands to get the list of all sessions and all jobs for a given Session. 

|Command|Description|
|---|---|
|`workspace.list_sessions()`| Retrieve a list of all sessions in a Quantum Workspace.|
|`workspace.list_session(session.id)` | Retrieve the session with ID `sessionID`. Each session has a unique ID. |
|`workspace.list_session_jobs(session.id)` | Retrieve a list of all jobs in the session with ID `sessionID`. Each session has a unique ID.|

For example, the following code defines a function that get a session with a minimum number of jobs. Then, it lists all jobs within that Session, and prints out the number of jobs and the first 10 jobs for that session. 

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


## Manual methods of creating/ending sessions

We recomend to follow the steps in [Get started with sessions](xref:microsoft.quantum.hybrid.interactive#get-started-with-sessions) to create a new session. However, for advanced features it's also possible to manually create sessions. 

1. First, you create a **Session object**. 

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
  To this point, the session only exists in the client and you see that the status is **None**. You need to create the session in the service.

2. To **create** a session in the service, you can use `workspace.open_session(session)` or `session.open()`.

3. You can refresh the **status** and the session details with `session.refresh()`, or by getting a new session object from a session ID. 

  ```python
  same_session = workspace.get_session(session.id) 
  print(f"Session: {session.details} \n")
  print(f"Session: {same_session.details} \n")
  ```

4. You can **close** a session with `session.close()` or `workspace.close_session(session)`.   
  
## Session timeouts

A session times out if no new job is submitted within the Session for 10 minutes. The session reports a status of **TimedOut**. To avoid that, you can add a `with` block so the session close() is invoked at the end of the code block. 

> [!NOTE]
> If there're errors or bugs in your program, it might be possible that your code takes more than 10 minutes to submit a new job after their previous jobs in the Session have all completed. 

## Job failure policy within sessions

The default policy for a session when a job fails is to end that Session. If you try to submit any subsequent job within the same session, they'll be rejected by the service and the session'll report a status of **Failed**. Any in progress job is attempted to be cancelled.

However, this behavior can be changed by specifying a job failure policy of `job_failure_policy=SessionJobFailurePolicy.CONTINUE`, instead of the default `SessionJobFailurePolicy.ABORT`, when creating the session. When the job failure policy is `CONTINUE`, the service continues to accept jobs. The session reports a status of **Failure(s)** in this case, which will change to **Failed** once the session is closed.
If the session is never closed and times out, the status is **TimedOut** even if there's been job failures. 

## Next steps

[Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)
