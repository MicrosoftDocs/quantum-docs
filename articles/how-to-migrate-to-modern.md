---
author: bradben
description: Learn how to update your Classic QDK Q# programs to run on the Modern QDK, which platforms are supported, and what functionality has been deprecated. 
ms.date: 01/04/2024
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: core
ms.topic: whats-new
no-loc: ['Q#', '$$v']
title: Migrate Your Q# Programs for the Modern QDK
uid: microsoft.quantum.how-to.migrate-code
#customer intent: As a quantum programmer, I want to update my programs that use the old qdk. 
---

# Migrate your Q# code to the Modern QDK

The Azure Quantum Development Kit (Modern QDK), released in January 2024, is the default Q# development kit used in Visual Studio Code and the Azure Quantum portal. For more information about the new features and improvements, see [What's new in the Modern QDK](xref:microsoft.quantum.modern-qdk).

 If you have existing programs written for the Microsoft Quantum Development Kit (Classic QDK), at least some elements will need to be modified for the new APIs, processes, and tools. In addition, there are improvements to the Q# language syntax to make coding easier and more flexible. 

 This article guides you through the most common scenarios to get your code up and running on the new QDK.S

## Deprecating Visual Studio as a development platform

The Modern QDK removes support for Visual Studio and the associated .NET quantum libraries. If you have existing Visual Studio projects, it is strongly recommended to migrate them to the Modern QDK using the guidance in this article. To continue to use the Classic QDK for your projects, see [Continue working in the Classic QDK](xref:microsoft.quantum.install-qdk.overview#continue-working-in-the-classic-qdk).

## Importing modules from a Q# file 

For Python programs that use Q# (*.qs) files to import Q# functions and operations as modules, the import syntax has changed.

In the Classic QDK, to import and run the `Random()` operation from the file `source.qs`:

```qsharp
namespace Sample {
    operation Random() : Result {
        use q = Qubit();
        H(q);
        let result = M(q);
        Reset(q);
        return result
    }
}
```

you would use standard Python import syntax:

```python
from Sample import Random

print(Random.simulate())
``` 

with the requirement that `source.qs` and your Python program were in the same folder.

To import the same operation with the Modern QDK, you define a *Q# project*, which lets you organize your source files and libraries in a more efficient and logical way. For detailed steps to define a Q# project, see [Working with Q# projects](xref:microsoft.quantum.qsharp-projects). 

Once you have set up your project folders and created a simple manifest file, use `qsharp.init` to point to your project root and `qsharp.eval` to access the source files and import the \<*namespace*>.\<*operation_name*>.

```python
qsharp.init(project_root = '/MyProjectFolder')
print(qsharp.eval("Sample.Random()"))
```

If the operation or function you're importing takes input values, these can be also be passed:

```python
print(qsharp.eval("Sample.Random(4)"))
```

## Running your program on the local simulator

Most of the in-memory simulators from the Classic QDK have been deprecated, leaving the [sparse simulator](xref:microsoft.quantum.machines.overview.sparse-simulator) as the default local simulator in VS Code and the Azure Quantum portal. 

Deprecated simulators:
- Full state simulator
- Noise simulator 
- Trace simulator
- Toffoli simulator

To run the default sparse simulator:

| Scenario | Method   |
|----------|----------|
|**In a Q# program in VS Code** | Select **Run Q# file** |
|**In a Python notebook cell** | `result=qsharp.eval("EntryPointOperation()")`<br>or<br>`result=qsharp.run("EntryPointOperation()", shots=##)` |
|**In a `%%qsharp` notebook cell** | `EntryPointOperation()` |

### Enforced qubit release

The Modern QDK enforces the requirement that qubits be in the ground or |0⟩ state before being released at the end of their scope. This is to prevent qubits from possibly being reused in an unexpected state when running programs on quantum hardware. 

For example, the following code triggers a runtime error:

```qsharp
operation MyOperation() : Result {
    use q = Qubit();
        X(q);
        return M(q);
}
``` 

and would need to be modified to either reset the qubit before returning the measurement:

```qsharp
operation MyOperation() : Result {
    use q = Qubit();
        X(q);
        let r = M(q);
        Reset(q);
        return r;
}
``` 

or use an operation that resets the qubit as part of taking the measurement:

```qsharp
open Microsoft.Quantum.Measurement;
operation MyOperation() : Result {
    use q = Qubit();
    X(q);
    return MResetZ(q);
}
```

## Configure the Base profile

Unlike the local simulator, Azure Quantum hardware targets do not yet support the full capabilities required to run all Q# programs. If you are submitting a job to Azure Quantum, before you compile the program you need to set your target profile to tell Q# which capabilities that your target hardware supports. Currently, only programs compliant with the QIR Base Profile can be submitted to Azure Quantum. Note that for running code on the local simulator, any profile configuration can be used.

### VS Code

VS Code displays the profile mode in the status bar at the bottom for Q# files, either **QIR: Base** or **Unrestricted**. **Unrestricted** mode is most useful for running code on the simulator. If you are submitting a job to Azure Quantum and get a warning that a program is not set for the Base profile, select **Unrestricted** in the status bar and select **QIR: Base** as the profile. 

### Jupyter Notebooks and Python 

To set the Base profile, use the `qsharp.init` function:

```python
qsharp.init(target_profile=qsharp.TargetProfile.Base)
``` 
> [!NOTE]
> - The `qsharp.init` function replaces the *%azure.target-capability* magic command. 
> - If you reset the target profile, you will need to rerun your Q# cells or imports before you compile.


## Compiling a Q# program to submit to Azure Quantum

With the Modern QDK, your program needs to be compiled before submitting the job to Azure Quantum. 

> [!NOTE] 
> For step-by-step scenarios to submit jobs to Azure Quantum using Q# programs, Python programs, or Jupyter Notebooks, see [Submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs).

### VS Code

Q# programs in VS Code compile your program automatically when you select a provider target in your workspace and select **Submit current Q# program**. If there are compiler errors, you can debug the file by pressing **F5**. For more information, see [Submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp).

### Jupyter Notebooks and Python

For Jupyter Notebook and Python programs that use the `Workspace` class to connect to Azure Quantum, you need to compile your program and then send it to Azure Quantum with the job submittal. 

1. Run the Q# code that you [imported](#importing-modules-from-a-q-file) or wrote in a `%%qsharp` cell.
1. Use the `qsharp.compile` function, passing the Q# operation or function to use as the entry point. For example, for this Q# program:

    ```qsharp
    operation MyOperation() : Result {
        use q = Qubit();
            H(q);
            let r = M(q);
            Reset(q);
            return r;
    }
    ```

    you would pass the `MyOperation()` operation as:

    ```python
    MyProgram = qsharp.compile("MyOperation()")
    ```

1. The compiled result `MyProgram` is then passed to Azure Quantum with the `target.submit` function:

    ```python
    job = target.submit(MyProgram, "job name", ...)
    ```

#### Azure CLI

You can also use the Azure CLI to connect and submit Python and Q# jobs to Azure Quantum. For this scenario, you must save your compiled program as a text file. For the step-by-step procedure, see [Submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-python).


## Connecting to Azure Quantum

For Q# programs in VS Code, you can connect to your Azure Quantum workspace and submit jobs all within VS Code.  

For Python and Jupyter Notebook programs, the default connection method is the `azure.quantum.Workspace` class, which replaces the deprecated IQ# `%azure` magic commands and the `qsharp.azure` module. For examples of all these commands, see [Submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-python).



| Deprecated magic command or API | Use  | 
|-----------------|-----------|
| *%azure.connect<br>qsharp.azure.connect()*  | *wksp = azure.quantum.Workspace(<br>resource_id="",<br>location="")*  |         
| *%azure.target<br>qsharp.azure.target()*  | *target = wksp.get_targets("\<target_name>")*  |        
| *%azure.execute<br>qsharp.azure.execute()*  | *job = target.submit(…)* Non blocking I/O   |       
| *%azure.submit<br>qsharp.azure.submit()*  | *job = target.submit(\<QirInputData>, \<jobName>, input_params={"count: \<##>"})*  |        
| *%azure.jobs<br>qsharp.azure.jobs()*  | *wksp.list_jobs()*  |        
| *%azure.output<br>qsharp.azure.output(*)  | *job.get_results()*  |        
| *%azure.status<br>qsharp.azure.status()*  | *job.details.status* |        
| *%azure.quotas* | *wksp.get_quotas()*  |        


## Other deprecated magic commands

| Deprecated magic command |&nbsp; |&nbsp; |
|---------------| -----------|---------|
| *%check_kata*  | Deprecated  |  |       
| *%chemistry.broombridge*  | Deprecated  |   |    
| *%chemistry.encode*  | Deprecated  |        |
| *%chemistry.fh.add_terms*  | Deprecated  |    |     
| *%chemistry.fh.load*  | Deprecated  |         |
| *%chemistry.inputstate.load*  | Deprecated  |   |      
| *%config* | Deprecated  |         |
| *%debug*  | Deprecated  |         |
| *%experimental.build_info*  | Deprecated  |    |     
| *%kata*  | Deprecated  |         |
| *%lsmagic*  | Deprecated  |        | 
| *%lsopen*  | Deprecated  |         |
| *%noise_model*  | Deprecated |       |  
| *%package*  | Deprecated  |         |
| *%performance*  | Deprecated  |       |  
| *%project*  | Deprecated  |         |
| *%who*  | Deprecated  |         |
| *%workspace*  | Deprecated  |     |    
 
