---
author: SoniaLopezBravo
description: Learn how to work with jobs and Sessions
ms.date: 03/30/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Manage your Sessions
uid: microsoft.quantum.hybrid.interactive.how-to-sessions
---

# How to manage Sessions

In this article, you'll learn how to work with Sessions. With Sessions you can group one or more jobs against a single target, which allows you to manage jobs effectively. For more information, see [Interactive quantum computing: Sessions](xref:microsoft.quantum.hybrid.interactive).

## Retrieve Sessions, list Sessions, and list jobs of Sessions

The following table shows the Python commands to get the list of all Sessions and all jobs for a given Session. 

|Command|Description|
|---|---|
|`workspace.list_sessions()`| Retrieve a list of all Sessions in a Quantum Workspace.|
|`workspace.list_session(session.id)` | Retrieve the Session with ID `sessionID`. Each Session has a unique ID. |
|`workspace.list_session_jobs(session.id)` | Retrieve a list of all jobs in the Session with ID `sessionID`. Each Session has a unique ID.|

For example, the following code defines an operation that 

```python
def get_a_session_with_jobs(min_jobs):
    all_sessions = workspace.list_sessions() # list of all Sessions
    for session in all_sessions:
        if len(workspace.list_session_jobs(session.id)) >= min_jobs:
            return session

session = get_a_session_with_jobs(min_jobs=3) 

session_jobs = workspace.list_session_jobs(session.id) # list of all jobs within Session ID

print(f"Job count: {len(session_jobs)} \n")
print(f"First 10 jobs for session {session.id}:")
for job in session_jobs[0:10]:
    print(f"Id: {job.id}, Name={job.details.name}")
```

> [!NOTE]
> Filter functionality of jobs and Sessions is currently not supported. 

## Manual methods of creating/ending Sessions

We recomend to follow the steps in [Get started with Sessions](xref:microsoft.quantum.hybrid.interactive-get-started-with-sessions) to create a new Session. However, for advanced features it's also possible to manually create Sessions. 

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
  To this point, the session only exists in the client and you see that the status is **None**. You need to create the Session in the service.

2. To **create** a Session in the service, you can use `workspace.open_session(session)` or `session.open()`.

3. You can refresh the **status** of a Session and the Session details with `session.refresh()`, or by getting a new Session object from a Session ID. 

  ```python
  same_session = workspace.get_session(session.id) 
  print(f"Session: {session.details} \n")
  print(f"Session: {same_session.details} \n")
  ```

4. You can **close** a Session with `session.close()` or `workspace.close_session(session)`.   
  
## Session timeouts

A Session times out if no new job is submitted within the Session for 10 minutes. The Session reports a status of **TimedOut**. To avoid that, you can add a `with` block so the Session close() is invoked at the end of the code block. 

> [!NOTE]
> If there're errors or bugs in your program, it might be possible that your code takes more than 10 minutes to submit a new job after their previous jobs in the Session have all completed. 

## Job failure policy within Sessions

The default policy for a Session when a job fails is to end that Session. If you try to submit any subsequent job within the same Session, they'll be rejected by the service and the Session'll report a status of **Failed**. Any in progress job is attempted to be cancelled.

However, this behavior can be changed by specifying a job failure policy of `job_failure_policy=SessionJobFailurePolicy.CONTINUE`, instead of the default `SessionJobFailurePolicy.ABORT`, when creating the Session. When the job failure policy is `CONTINUE`, the service continues to accept jobs. The Session reports a status of **Failure(s)** in this case, which will change to **Failed** once the Session is closed.
If the Session is never closed and times out, the status is **TimedOut** even if there's been job failures. 

## Next steps

[Integrated quantum computing](xref:microsoft.quantum.hybrid.integrated)
