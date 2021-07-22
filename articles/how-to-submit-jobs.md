---
author: bradben
description: This document provides a basic guide to submit and run Azure Quantum using python, Jupyter Notebooks, or the Azure CLI.
ms.author: v-benbra
ms.date: 06/24/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Submit jobs to Azure Quantum
uid: microsoft.quantum.submit-jobs
---

# Submit jobs to Azure Quantum

This document provides steps on how to submit jobs to Azure Quantum using Python, Jupyter Notebooks, or the Azure CLI.

## Select your environment

Select the option for your development environment:

### [Python](#tab/tabid-python)

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.quickstarts.optimization.qio).
- The latest version of the [Quantum Development Kit for Python](xref:microsoft.quantum.install-qdk.overview.python#install-the-qsharp-python-package).

Follow the installation steps in the provided link to install Python and
the current version of the IQ# kernel, which powers the Q# Jupyter Notebook and
Python experiences.

## Quantum computing with Q# and Python

1. The Python environment in the conda environment that you created earlier already
   includes the `qsharp` Python package. Make sure you are running your Python
   script from a terminal where this conda environment is activated.

1. If you've never used Q# with Python, follow the steps in [Create your first Q#
   program with
   Python](xref:microsoft.quantum.install-qdk.overview.python).

1. Write your Q# operations in a `*.qs` file. When running `import qsharp` in
   Python, the IQ# kernel will automatically detect any .qs files in the same
   folder, compile them, and report any errors. If compilation is successful,
   those Q# operations will become available for use directly from within
   Python.
    - For example, the contents of your .qs file could look something like this:

        ```qsharp
        namespace Test {
            open Microsoft.Quantum.Intrinsic;
            open Microsoft.Quantum.Measurement;
            open Microsoft.Quantum.Canon;

            operation GenerateRandomBits(n : Int) : Result[] {
                use qubits = Qubit[n];
                ApplyToEach(H, qubits);
                return MultiM(qubits);
            }
        }
        ```

1. Create a Python script in the same folder as your `*.qs` file. Azure Quantum
   functionality is available by running `import qsharp.azure` and then calling
   the Python commands to interact with Azure Quantum. For reference, see the
   [complete list of `qsharp.azure` Python commands](/python/qsharp-core/qsharp.azure).
   You'll need the resource ID of your Azure Quantum workspace in order to
   connect. (The resource ID can be found on your workspace
   page in the Azure Portal.)

   If your workspace was created in an Azure region other than \"West US\", you also
   need to specify this as the `location` parameter to `qsharp.azure.connect()`.

   For example, your Python script could look like this:

    ```py
    import qsharp
    import qsharp.azure
    from Test import GenerateRandomBits

    qsharp.azure.connect(
       resourceId="/subscriptions/.../Microsoft.Quantum/Workspaces/WORKSPACE_NAME",
       location="West US")
    qsharp.azure.target("ionq.simulator")
    result = qsharp.azure.execute(GenerateRandomBits, n=3, shots=1000, jobName="Generate three random bits")
    print(result)
    ```

    where `GenerateRandomBits` is the Q# operation in a namespace `Test` that is
    defined in your `*.qs` file, `n=3` is the parameter to be passed to
    that operation, `shots=1000` (optional) specifies the number of repetitions
    to perform, and `jobName="Generate three random bits"` (optional) is a custom
    job name to identify the job in the Azure Quantum workspace.

1. Run your Python script by running the command `python test.py`, where `test.py` is
   the name of your Python file. If successful, you should see your job results
   displayed to the terminal. For example:

   ```output
   {'[0,0,0]': 0.125, '[1,0,0]': 0.125, '[0,1,0]': 0.125, '[1,1,0]': 0.125, '[0,0,1]': 0.125, '[1,0,1]': 0.125, '[0,1,1]': 0.125, '[1,1,1]': 0.125}
   ```

1. To view the details of all jobs in your Azure Quantum workspace, run the command `qsharp.azure.jobs()`:

   ```dotnetcli
   >>> qsharp.azure.jobs()
   [{'id': 'f4781db6-c41b-4402-8d7c-5cfce7f3cde4', 'name': 'GenerateRandomNumber 3 qubits', 'status': 'Succeeded', 'provider': 'ionq', 'target': 'ionq.simulator', 'creation_time': '2020-07-17T21:45:43.4405253Z', 'begin_execution_time': '2020-07-17T21:45:54.09Z', 'end_execution_time': '2020-07-17T21:45:54.101Z'}, {'id': '1b03cc74-b5d5-4ffa-81db-465f08ae6cd0', 'name': 'GenerateRandomBit', 'status': 'Succeeded', 'provider': 'ionq', 'target': 'ionq.simulator', 'creation_time': '2020-07-21T19:44:17.1065156Z', 'begin_execution_time': '2020-07-21T19:44:25.85Z', 'end_execution_time': '2020-07-21T19:44:25.858Z'}]
   ```

1. To view the detailed status of a particular job, pass the job ID to `qsharp.azure.status()` or `qsharp.azure.output()`, for example:

   ```dotnetcli
   >>> qsharp.azure.status('1b03cc74-b5d5-4ffa-81db-465f08ae6cd0')
   {'id': '1b03cc74-b5d5-4ffa-81db-465f08ae6cd0', 'name': 'GenerateRandomBit', 'status': 'Succeeded', 'provider': 'ionq', 'target': 'ionq.simulator', 
   'creation_time': '2020-07-21T19:44:17.1065156Z', 'begin_execution_time': '2020-07-21T19:44:25.85Z', 'end_execution_time': '2020-07-21T19:44:25.858Z'}

   >>> qsharp.azure.output('1b03cc74-b5d5-4ffa-81db-465f08ae6cd0')
   {'0': 0.5, '1': 0.5}
   ```

### [Jupyter Notebooks](#tab/tabid-jupyter)

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.quickstarts.optimization.qio).
- The latest version of the [Quantum Development Kit for Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview.jupyter#install-the-iq-jupyter-kernel).

Follow the installation steps in the provided link to install Jupyter Notebook and
the current version of the IQ# kernel, which powers the Q# Jupyter Notebook and
Python experiences.

## Quantum computing with Q# Jupyter Notebooks

1. Run `jupyter notebook` from the terminal where your conda environment is
   activated. This starts the notebook server and opens Jupyter in a browser.
1. Create your Q# notebook (via **New** → **Q#**) and write your Q# program.
1. If you've never used Q# with Jupyter, follow the steps in [Create your first Q#
    notebook](xref:microsoft.quantum.install-qdk.overview.jupyter).
1. Write your Q# operations directly in the notebook. Running the cells will
   compile the Q# code and report whether there are any errors.
    - For example, you could write a Q# operation that looks like this:

        ```qsharp
        operation GenerateRandomBit() : Result {
            use q = Qubit();
            H(q);
            let r = M(q);
            Reset(q);
            return r;
        }
        ```

1. Once you have your Q# operations defined, use the `%azure.*` magic commands
   to connect and submit jobs to Azure Quantum. You'll use the resource ID of
   your Azure Quantum workspace in order to connect. (The resource ID can be found
   on your workspace page in the Azure Portal.)

   If your workspace was created in an Azure region other than \"West US\", you also
   need to specify this as the `location` parameter to `%azure.connect`.

    - For example, the following commands will connect to an Azure Quantum
      workspace and run an operation on the `ionq.simulator` target:

        ```py
        %azure.connect "/subscriptions/.../Microsoft.Quantum/Workspaces/WORKSPACE_NAME" location="West US"

        %azure.target ionq.simulator

        %azure.execute GenerateRandomBit
        ```

        where `GenerateRandomBit` is the Q# operation that you have already
        defined in the notebook.

1. After submitting a job, you can check its status with the command `%azure.status` or view
   its results with the command `%azure.output`. You can view a list of all your jobs with the command `%azure.jobs`.

Some helpful tips while using Q# Jupyter Notebooks:

- Use the command `%lsmagic` to see all of the available magic commands, including
  the ones for Azure Quantum.
- Detailed usage information for any magic command can be displayed by simply
  appending a `?` to the command, for example, `%azure.connect?`.

- Documentation for magic commands is also available online:
  [%azure.connect](/qsharp/api/iqsharp-magic/azure.connect),
  [%azure.target](/qsharp/api/iqsharp-magic/azure.target),
  [%azure.submit](/qsharp/api/iqsharp-magic/azure.submit),
  [%azure.execute](/qsharp/api/iqsharp-magic/azure.execute),
  [%azure.status](/qsharp/api/iqsharp-magic/azure.status),
  [%azure.output](/qsharp/api/iqsharp-magic/azure.output),
  [%azure.jobs](/qsharp/api/iqsharp-magic/azure.jobs)

### [Azure CLI](#tab/tabid-cli)

## Prerequisites

Ensure that the following items are installed on your computer:

- An Azure Quantum workspace in your Azure subscription. To create
  a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.quickstarts.optimization.qio).
- The latest version of the [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview.standalone).
- The [Azure CLI](/cli/azure/install-azure-cli).
- The [necessary utilities to use Azure Quantum](xref:microsoft.quantum.setup.cli) (includes the `quantum`
  extension for the Azure CLI).

## Submit a job to Azure Quantum with the Azure CLI

These steps show how to use the Azure CLI to run a Q# application and select a target from
the different providers of your Azure Quantum workspace.

> [!NOTE]
> A provider is a partner quantum service consisting of quantum
> hardware, a simulator, or an optimization service.

1. Log in to Azure using your credentials. You'll get a list of subscriptions associated with your account.

   ```azurecli
   az login
   ```

1. Specify the subscription you want to use from those associated with your Azure account. You can also find your subscription ID in the overview of your workspace in Azure Portal.

   ```azurecli
   az account set -s <Your subscription ID>
   ```

1. You can see all the Azure Quantum workspaces in your subscription with the
   following command:

   ```azurecli
   az quantum workspace list
   ```

1. You can use `quantum workspace set` to select a default workspace that you want to
   use to list and submit jobs. Note that you also need to specify the resource
   group and the location:

   ```azurecli
   az quantum workspace set -g MyResourceGroup -w MyWorkspace -l MyLocation -o table
   ```

   ```ouput

   Location     Name                               ResourceGroup
   -----------  ---------------------------------  --------------------------------
   MyLocation       ws-yyyyyy                          rg-yyyyyyyyy

   ```

> [!TIP]
> You can check the current workspace with the command `az quantum workspace show -o table`.

1. In your Azure Quantum workspace, there are different targets available from the
   providers that you added when you created the workspace. You can display a list of all
   the available targets with the command `az quantum target list -o table`:

   ```azurecli
   az quantum target list -o table
   ```

   ```output
      Provider    Target-id                                       Status     Average Queue Time
   ----------  ----------------------------------------------  ---------  --------------------
   Microsoft   microsoft.paralleltempering-parameterfree.cpu   Available  0
   Microsoft   microsoft.paralleltempering.cpu                 Available  0
   Microsoft   microsoft.simulatedannealing-parameterfree.cpu  Available  0
   Microsoft   microsoft.simulatedannealing.cpu                Available  0
   Microsoft   microsoft.paralleltempering.fpga                Available  0
   Microsoft   microsoft.simulatedannealing.fpga               Available  0
   ionq        ionq.qpu                                        Available  0
   ionq        ionq.simulator                                  Available  0
   ```

1. To submit a new job, navigate to the directory containing your project using
   the command line and submit your job. Use the command `az quantum job submit`. You need to specify the target where you want to run your job, for example:

   ```azurecli
   az quantum job submit --target-id MyProvider.MyTarget
   ```

   ```output
   Id                                    State    Target               Submission time
   ------------------------------------  -------  -------------------  ---------------------------------
   yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy  Waiting  MyProvider.MyTarget  2020-06-12T14:20:18.6109317+00:00
   ```

   The console will output the job information, including the job ID.

1. You can use the job ID to track its status:

   ```azurecli
   az quantum job show -j yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy -o table
   ```

   ```output
   Id                                    State      Target               Submission time
   ------------------------------------  ---------  -------------------  ---------------------------------
   yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy  Succeeded  MyProvider.MyTarget  2020-06-12T14:20:19.819981+00:00
   ```

> [!TIP]
> To see all the jobs in the workspace, use the command `az quantum
> job list -o table`.

1. Once the job finishes, display the job's results with the command `az quantum
   job output`:

   ```azurecli
    az quantum job output -j yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy -o table
   ```

   ```output
    Result    Frequency
    --------  -----------  -------------------------
    [0,0]     0.00000000                           |
    [1,0]     0.50000000   ▐███████████            |
    [0,1]     0.25000000   ▐█████                  |
    [1,1]     0.25000000   ▐█████                  |
   ```

> [!TIP]
> To submit a job synchronously, for example, waiting for the job to complete and
> showing results, use the command `az quantum execute --target-id
> MyProvider.MyTarget`.

## Example

### Write your quantum application

First, you need the Q# quantum application that you want to run in
Azure Quantum.

> [!TIP]
> If this is your first time creating Q# quantum applications, see our [Microsoft Learn
> module](/learn/modules/qsharp-create-first-quantum-development-kit/).

In this case, we will use a simple quantum random bit generator. Create a Q#
project and substitute the content of `Program.qs` with the following code:

```qsharp
namespace RandomBit {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;

    @EntryPoint()
    operation GenerateRandomBit() : Result {
        use q = Qubit();
        H(q);
        return MResetZ(q);
    }
}
```

Note that the `@EntryPoint` attribute tells Q# which operation to run when the
program starts.

### Submit the job

In this example, we are going to use IonQ as the provider and the
`ionq.simulator` as the target. To submit the job to the currently selected default
workspace, use the command `az quantum job submit`:

> [!IMPORTANT]
> Verify that the Quantum SDK version of the `*.csproj` file is
> `0.11.2006.403` or higher. If not, it could cause a compilation error.

```azurecli
az quantum job submit --target-id ionq.simulator --job-name ExampleJob -o table
```

```output
Name   Id                                    Status    Target          Submission time
-----  ------------------------------------  --------  --------------  ---------------------------------
ExampleJob   yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy  Waiting   ionq.simulator  2020-06-17T17:07:07.3484901+00:00

```

Once the job completes (that is, when it's in a **Successful** state), use the command `az quantum
job output` to view the results:

```azurecli
az quantum job output -j yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy -o table
```

```output
Result    Frequency
--------  -----------  -------------------------
[0,0]     0.50000000   ▐███████████            |
[0,1]     0.50000000   ▐███████████            |
```

The output displays a histogram with the frequency that a specific result was measured.
In the example above, the result `[0,1]` was observed 50% of the times.

Optionally, you can use the command `az quantum execute` as a shortcut for both submitting and
returning the results of a run.

```azurecli
az quantum execute --target-id ionq.simulator --job-name ExampleJob2 -o table
```

```output
Result    Frequency
--------  -----------  -------------------------
[0,0]     0.50000000   ▐███████████            |
[0,1]     0.50000000   ▐███████████            |
```

Note that the IonQ simulator gives the probabilities of obtaining each output if we run the algorithm an infinite number of times. In this case, we see that each state has a 50% probability of being measured.

> [!TIP]
> You can also check the status of your jobs from your Azure portal.

***

## Next steps

Now that you know how to submit jobs to Azure quantum, you can try to run the
different [samples](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum) we have
available or try to submit your own projects.

