---
author: bradben
ms.author: brbenefield
ms.date: 07/10/2024
ms.service: azure-quantum
ms.subservice: computing
ms.custom: devx-track-azurecli
ms.topic: include
no-loc: [Quantum Development Kit, target, targets]
---

## Submitting Python with Q# jobs to Azure Quantum

Learn how to use VS Code to write a Python program that calls Q# operations, connect to Azure using the Python commands or Azure CLI, and submit your job. 

## Prerequisites

For installation details, see [Installing the QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-qdk-on-vs-code).

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed. 
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extension installed.
- The Azure Quantum `qsharp` and `azure-quantum` packages. 
- [Azure CLI](xref:microsoft.quantum.install-qdk.overview#add-support-for-azure-cli) with the latest Azure Quantum extension installed. 

## Create and import your Q# operations

With the `qsharp` package, you can store your functions and operations in Q# files and create [Q# projects](xref:microsoft.quantum.qsharp-projects) that let you call into any of them from your Python code. This especially helpful when you need to launch a program that takes input parameters.


1. Follow the steps to create a [Q# project](xref:microsoft.quantum.qsharp-projects#steps-for-creating-a-q-project).
1. Open a new text file, add the following Q# code that returns a user-specified number of random bits, and save the file to the */src* directory in your project as `source.qs`. 

    > [!NOTE]
    > Note that this Q# code doesn't have an `@EntryPoint` function like a Q# program (see [Submitting Q# jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp)), but it does require a namespace, unlike a Jupyter Notebook (see [Submitting Jupyter Notebook jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter)).

    ```qsharp
   namespace Sample {
   
      operation Random() : Result {
            use q = Qubit();
            H(q);
            let result = M(q);
            Reset(q);
            return result
      }
   
      operation RandomNBits(N: Int): Result[] {
            mutable results = [];
            for i in 0 .. N - 1 {
               let r = Random();
               set results += [r];
            }
            return results
      }
   }
    ```

1. In the project root folder (with the *qsharp.json* file), open another file and save it as `randomNum.py`.
1. Add the following code to import the `qsharp` and `azure.quantum` modules.

    ```python
    import qsharp
    import azure.quantum
    ```

1. Next, add code to define the Q# project root folder and test run the target operation on the local simulator. The operation is called by *\<namespace>.\<operation_name( )>*, and in this case, you are passing in the number of random bits to return. 

    ```python
    qsharp.init(project_root = '../MyProjectRootFolder')
    print(qsharp.eval("Sample.RandomNBits(4)"))
    ```

    ```output
    [Zero, One, One, Zero]
    ```

1. You can also test the operation with the `run` method, which passes an additional `shots` parameter, and returns the results in a Python list. In `randomNum.py`, replace the previous print statement with the following:

    ```python
    result = qsharp.run("Sample.RandomNBits(4)", shots=10)
    for x in result:
        print(x)
    ```

    ```output
    [[One, One, One, One],
    [Zero, Zero, One, Zero],
    [One, Zero, Zero, One],
    [Zero, One, Zero, Zero],
    [One, Zero, One, One],
    [One, Zero, One, Zero],
    [One, One, One, Zero],
    [One, One, One, One],
    [Zero, Zero, Zero, One],
    [One, Zero, Zero, One]]
    ```
    
## Compile your job using the Base profile

When you run programs on the local quantum simulator, you can submit any type of Q# program. However, Azure Quantum hardware targets do not yet support the full capabilities required to run all Q# programs. In order to compile and submit Q# programs to Azure Quantum, you need to set your target profile to tell Q# which capabilities that your target hardware supports. Currently, that is either the `Base` or `Adpative_RI` profile. For more information, see [Profile types in Azure Quantum](xref:microsoft.quantum.target-profiles).
    
   > [!NOTE]
   > For [Q# only programs in VS Code](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp), VS Code sets the `Base` profile automatically. 

1. Use the `init` method to set the profile:

    ```python
    qsharp.init(project_root = '../MyProjectRootFolder', target_profile=qsharp.TargetProfile.Base)
    ```
    > [!NOTE]
    > Because you are reinitializing your qsharp state, you need to set the `project_root` parameter again so the compiler knows where to find the `RandomNBits` operation. This could also have been done in step 5 of the previous procedure. 


1. Then use the `compile` method to specify the operation or function that is the entry point to your program. The compiled program can then be submitted to any quantum hardware:

    ```python
    MyProgram = qsharp.compile("Sample.RandomNBits(4)")
    ```

## Connect to Azure Quantum and submit your job

You can connect to Azure Quantum and submit your job using a Python-created `Workspace` object, or connect and submit your job using Azure CLI. Using Azure CLI requires that you save the compiled program as a text file and submit that file using a CLI command. 


### [Using Python](#tab/tabid-python)

Now that you have your program compiled into the correct format, create an `azure.quantum.Workspace` object to connect to Azure Quantum. You'll use the Resource ID of your Azure Quantum workspace in order to connect. The Resource ID and location can be copied from your workspace overview page in the Azure portal.

1. Add the following code to `randomNum.py`, filling in your resource ID and location from your Azure Quantum workspace:

    ```python
    workspace = azure.quantum.Workspace(
        resource_id = "MyResourceID",
        location = "MyLocation"
    )
    ```

1. Use the `get_targets` method to display the available hardware targets in your workspace:

    ```python
    MyTargets = workspace.get_targets()
    print("This workspace's targets:")
    for x in MyTargets:
        print(x)
    ```

1. Select the `rigetti.sim.qvm` target:

    ```python
    MyTarget = workspace.get_targets("rigetti.sim.qvm")
    ```

1. Lastly, use the `submit` method to submit your program with its parameters. The job results are returned as a Python dictionary.

    ```python
    job = MyTarget.submit(MyProgram, "MyPythonJob", shots=100)
    results = job.get_results()
    print("\nResults: ", results)
    ```

1. To extract just the values and display them:

    ```python
    for x in resultList:
        print(x)
    ```

    ```output
    [0, 0, 0, 0]
    0.3
    [1, 0, 0, 0]
    0.1
    [1, 1, 1, 1]
    0.3
    [0, 1, 1, 1]
    0.3
    ```

1. All the properties of the job are accessible in `job.details`, for example:

    ```python
    print(job.details)
    print("\nJob name:", job.details.name)
    print("Job status:", job.details.status)
    print("Job ID:", job.details.id)
    ```

    ```output
    {'additional_properties': {'isCancelling': False}, 'id': '0fc396d2-97dd-11ee-9958-6ca1004ff31f', 'name': 'MyPythonJob', 'provider_id': 'rigetti'...}
    Job name: MyPythonJob
    Job status: Succeeded
    Job ID: fc396d2-97dd-11ee-9958-6ca1004ff31f
    ```

### [Using the Azure CLI](#tab/tabid-cli)

To submit a job to Azure Quantum with the Azure CLI, you need to submit a physical file of the program that you just compiled. 

1. Add to following code to your `randomNum.py` file. This opens a text file and writes your compiled program to the proper format. 

    ```python
    file = open("compiled_output.txt", "w")
    file.write(MyProgram._ll_str)
    file.close()
    ```

1. To submit the job to Azure Quantum, login with the Azure CLI:

    ```azurecli
    az login
    ```

1. Ensure you are running the latest version of the Azure CLI `quantum` extension:

    ```azurecli
    az extension add --upgrade --name quantum
    ```

1. Specify the subscription you want to use from those associated with your Azure account. You can also find your subscription ID in the overview of your workspace in Azure portal.

    ```azurecli
    az account set -s <MySubscriptionID>
    ``` 

1. View your available workspaces with:

    ```azurecli
    az quantum workspace list
    ```

1. You can use `quantum workspace set` to select a default workspace that you want to use to list and submit jobs. 

    ```azurecli
    az quantum workspace set \
       -g <MyResourceGroup> \
       -w <MyWorkspace> \
       -l <MyLocation> \
       -o table
    ```

1. Display the available targets in your workspace with:

    ```azurecli
    az quantum target list -o table
    ```

1. Submit your job using the `job submit` command. 
    - `--target-id` can be any target. For this example, use the **rigetti.sim.qvm** target.
    - `--job-name` can be any string.
    - `--job-input-format` is always **qir.v1**.
    - `--job-input-file` is the name of the text file you created in step 1.
    - `--entry-point` is always **ENTRYPOINT__main**

    ```azurecli
    az quantum job submit \
        --target-id rigetti.sim.qvm \
        --job-name MyQuantumJob \
        --job-input-format qir.v1 \
        --job-input-file compiled_output.txt \
        --entry-point ENTRYPOINT__main
    ```
1. To check the status of the job, copy the **id** from the output of the last step and use the `job show` command:

    ```azurecli
    az quantum job show --job-id b0012975-744a-4405-970e-3d8dc4afb2c0 -o table
    ```

    ```output
    Name      Id                                    Status     Target           Submission time                   Completion time                  
    --------  ------------------------------------  ---------  ---------------  --------------------------------  -------------------------------- 
    MyQuantumJob  b2f07cc4-b49b-40b0-b63b-9a4885e5fef5  Succeeded  rigetti.sim.qvm  2023-12-11T05:33:23.187773+00:00  2023-12-11T05:33:29.252742+00:00 
    ```

1. To view the output of the job, use the `job output` command:

    ```azurecli
    az quantum job output --job-id b0012975-744a-4405-970e-3d8dc4afb2c0 -o table
    ```

    ```output
    Result        Frequency
    ------------  -----------  ----------------------
    [0, 1, 1, 1]  1.00000000   |████████████████████|
    ```
***
