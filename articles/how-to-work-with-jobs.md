---
author: aviviano
description: This document provides a basic guide to working with jobs in Azure Quantum.
ms.author: amvivian
ms.date: 10/20/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
title: Introduction to jobs
uid: microsoft.quantum.work-with-jobs
---

# Work with Azure Quantum jobs

When you run a quantum program or solve an optimization problem in Azure Quantum,
you create and run a **job**. The steps to create and run a job depend on
the job type and the provider and target that you configure for the workspace.  

## Job properties

All jobs have the following properties in common:

|Property |Description|
|-----|----|
|**ID**|A unique identifier for the job. It must be unique within the workspace.    |
|**Provider**|_Who_ you want to run your job. For example, the Microsoft QIO provider, or a third-party provider. |
|**Target**| _What_ you want to run your job on. For example, the exact quantum hardware or quantum simulator offered by the provider. |
|**Name**|A user-defined name to help organize your jobs.|
|**Parameters**|Optional input parameters for targets. See the documentation for the selected target for a definition of available parameters.|

Once you create a job, various metadata is available about its state and run history.

## Job lifecycle

You typically create jobs for either [quantum computing](xref:microsoft.quantum.overview.understanding) or [quantum inspired optimization(QIO)](xref:microsoft.quantum.optimization.concepts.overview.introduction). Once you've written
your quantum program or expressed your QIO problem, you can select a target and
submit your job.

This diagram shows the basic workflow after you submit your job:

![azure quantum job flow](~/media/azure-quantum-flow-diagram-providers.svg)

First, Azure Quantum uploads the job to the Azure Storage account that you configured in the workspace. Then, the job is added to the job queue for the provider that you specified in the job. Azure Quantum then downloads your program and translates it for the provider. The provider processes the job and returns the output to Azure Storage, where it is available for download. 

## Monitoring jobs

Once you submit a job, you must poll for the status of the job. Jobs have
the following possible states:

|Status|Description|
|---|---|
|*waiting*|The job is waiting to run. Some jobs will perform  pre-processing tasks in the waiting state. `waiting` is always the first state, however, a job may move to the `executing` state before you can observe it in `waiting`.   |
|*executing*|The target is currently running the job.   |
|*succeeded*|The job has succeeded, and output is available. This is a *final* state. |
|*failed*|The job has failed, and error information is available. This is a *final* state.|
|*cancelled*|The user requested to cancel the job run. This is a *final* state. For more information, see [Job Cancellation](#job-cancellation) in this article.|

The `succeeded`, `failed`, and `cancelled` states are considered **final states**. Once a job is in one of these states, no more updates occur, and the corresponding job output data does not change.

This diagram shows the possible job state transitions:

:::image type="content" source="./media/aq-diagram.png" alt-text="Diagram showing the workflow of a job submission to Azure Qauntum.":::


After a job completes successfully, it displays a link to the output data in your Azure Storage account. How you access this data depends on the SDK or tool you used to [submit the job](xref:microsoft.quantum.submit-jobs).

## Job cancellation

When a job is not yet in a final state (for example, `succeeded`, `failed`, or `cancelled`), you can request to cancel the job. All providers will cancel your job if it is in the `waiting` state. However, not all providers support cancellation if your job is in the `executing` state.

> [!NOTE]
>If you cancel a job after it has started running, your account may still be billed a
partial or full amount for that job. See the billing documentation for
your selected provider


