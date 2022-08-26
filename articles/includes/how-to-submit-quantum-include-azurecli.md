---
author: bradben
ms.author: brbenefield
ms.date: 11/12/2021
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
---

## Prerequisites

Ensure that the following items are installed on your computer:

- An Azure Quantum workspace in your Azure subscription. To create
  a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of the [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview.standalone).
- The [Azure CLI and the quantum CLI extension](xref:microsoft.quantum.install-qdk.overview.standalone#azure-cli-net-core-sdk-31-not-required).

## Submit a job to Azure Quantum with the Azure CLI

These steps show how to use the Azure CLI to run a Q# application and select a target from
the different providers of your Azure Quantum workspace.

You will also find a full reference for all commands and features available through the `az quantum` extension in the corresponding section of the [Azure CLI documentation](/cli/azure/quantum).

> [!NOTE]
> A provider is a partner quantum service consisting of quantum
> hardware, a simulator, or an optimization service.

1. Log in to Azure using your credentials. You'll get a list of subscriptions associated with your account.

   ```azurecli
   az login
   ```

1. Specify the subscription you want to use from those associated with your Azure account. You can also find your subscription ID in the overview of your workspace in Azure portal.

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
   az quantum job show --job-id yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy -o table
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
    az quantum job output --job-id yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy -o table
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
az quantum job output --job-id yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy -o table
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
