---
author: bradben
ms.author: brbenefield
ms.date: 09/26/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
---

## Prerequisites

To complete this tutorial, you need

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go).
- [Visual Studio Code](https://code.visualstudio.com/download), which you can download and use for free.
- The [Microsoft QDK for VS Code extension](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).
- The [Azure CLI and the quantum CLI extension](xref:microsoft.quantum.install-qdk.overview#azure-cli).
- An Azure Quantum workspace with the **Quantinuum** provider enabled. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Create a Q# project in Visual Studio Code

1. In VS Code open the **View** menu, and select **Command Palette**.

1. Type **Q#: Create New Project**.

1. Select **Standalone console application**.

1. Select a directory to hold your project, such as your home directory. Enter **QuantumRNG** as the project name, then select **Create Project**.

1. From the window that appears at the bottom, select **Open new project**.

1. You should see two files: **QuantumRNG.csproj**, the project file, and **Program.qs**, which contains starter code.

1. Start by opening the **QuantumRNG.csproj** file and adding the `ExecutionTarget` property, which provides design-time feedback on the compatibility of your program for Quantinuum's hardware.

    ```xml
    <Project Sdk="Microsoft.Quantum.Sdk">
      <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <ExecutionTarget>quantinuum.qpu.h1-1</ExecutionTarget>
      </PropertyGroup>
    </Project>
    ```

1. Replace the contents of **Program.qs** with the program:

    ```qsharp
    namespace QuantumRNG {
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Measurement;
        open Microsoft.Quantum.Canon;

        @EntryPoint()
        operation GenerateRandomBits() : Result[] {
            use qubits = Qubit[4];
            ApplyToEach(H, qubits);
            return MultiM(qubits);
        }
    }
    ```

> [!NOTE] 
> If you would like to learn more about this program code, see [Create your first Q# program by using the Quantum Development Kit](/training/modules/qsharp-create-first-quantum-development-kit/).

## Prepare the Azure CLI

Next, we'll prepare your environment to run the program against the workspace you created.

1. From the Visual Studio Code menu, select **Terminal** > **New Terminal**.

1. Log in to Azure using your credentials. You'll get a list of subscriptions associated with your account.

   ```azurecli
   az login
   ```

1. Specify the subscription you want to use from those associated with your Azure account. You can also find your subscription ID in the overview of your workspace in the Azure portal.

   ```azurecli
   az account set -s MySubscriptionID
   ```

1. Use `quantum workspace set` to select the workspace you created above
   as the default Workspace. Note that you also need to specify the resource
   group and the location you created it in:

   ```azurecli
   az quantum workspace set -g MyResourceGroup -w MyWorkspace -l MyLocation -o table
   ```

   ```output
    Location    Name         ProvisioningState    ResourceGroup    StorageAccount      Usable
    ----------  -----------  -------------------  ---------------  ------------------  --------
    MyLocation  MyWorkspace  Succeeded            MyResourceGroup  /subscriptions/...  Yes

   ```

    > [!NOTE]
    > The MyLocation parameter in the example above is the **Region** 
    > specified on the **Create Quantum Workspace** page when following 
    > the steps in [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
    > Region and Location are synonymous.  The parameter value may be 
    > expressed in mixed case surrounded by quotes, for example, `-l "West US 2"`,
    > or in lower case with no spaces or quotes, such as `-l westus2`.

1. In your workspace, there are different targets available from the
   providers that you added when you created the workspace. You can display a list of all
   the available targets with the command `az quantum target list -o table`:


   [!INCLUDE [Quantinuum target name update](quantinuum-name-change.md)]

   ```azurecli
   az quantum target list -o table
   ```

   which gives you the output

   ```output
   Provider      Target-id                                            Current Availability    Average Queue Time (seconds)
   ------------  ---------------------------------------------------  ----------------------  ------------------------------
   ionq          ionq.qpu                                             Available               38715
   ionq          ionq.qpu.aria-1                                      Available               2042052
   ionq          ionq.simulator                                       Available               2
   microsoft-qc  microsoft.estimator                                  Available               0
   quantinuum    quantinuum.hqs-lt-s1                                 Available               232817
   quantinuum    quantinuum.hqs-lt-s1-apival                          Available               331
   quantinuum    quantinuum.hqs-lt-s2                                 Unavailable             0
   quantinuum    quantinuum.hqs-lt-s2-apival                          Available               7
   quantinuum    quantinuum.hqs-lt-s1-sim                             Available               19488
   quantinuum    quantinuum.hqs-lt-s2-sim                             Available               1577
   quantinuum    quantinuum.hqs-lt                                    Available               0
   quantinuum    quantinuum.qpu.h1-1                                  Available               232817
   quantinuum    quantinuum.sim.h1-1sc                                Available               331
   quantinuum    quantinuum.qpu.h1-2                                  Unavailable             0
   quantinuum    quantinuum.sim.h1-2sc                                Available               7
   quantinuum    quantinuum.sim.h1-1e                                 Available               19488
   quantinuum    quantinuum.sim.h1-2e                                 Available               1577
   quantinuum    quantinuum.qpu.h1                                    Unavailable             0
   rigetti       rigetti.sim.qvm                                      Available               5
   rigetti       rigetti.qpu.aspen-11                                 Unavailable             0
   rigetti       rigetti.qpu.aspen-m-2                                Available               5
   rigetti       rigetti.qpu.aspen-m-3                                Available               5
   Microsoft     microsoft.paralleltempering-parameterfree.cpu        Available               0
   Microsoft     microsoft.paralleltempering.cpu                      Available               0
   Microsoft     microsoft.simulatedannealing-parameterfree.cpu       Available               0
   Microsoft     microsoft.simulatedannealing.cpu                     Available               0
   Microsoft     microsoft.tabu-parameterfree.cpu                     Available               0
   Microsoft     microsoft.tabu.cpu                                   Available               0
   Microsoft     microsoft.qmc.cpu                                    Available               0
   Microsoft     microsoft.populationannealing.cpu                    Available               0
   Microsoft     microsoft.populationannealing-parameterfree.cpu      Available               0
   Microsoft     microsoft.substochasticmontecarlo.cpu                Available               0
   Microsoft     microsoft.substochasticmontecarlo-parameterfree.cpu  Available               0
   ```

   > [!NOTE]
   > When you submit a job in Azure Quantum it will wait in a queue until the
   > provider is ready to run your program. The **Average Queue Time** column of
   > the target list command shows you how many seconds recently run jobs waited
   > in the queue. This can give you an idea of how long you might have to wait.


## Check your program in the Quantinuum syntax checker

Before you run a program against real hardware, we recommend running it against a quantum simulator first (if possible, based on the number of qubits required) to help ensure that your algorithm is doing what you want.

To run your program with the Quantinuum syntax checker, submit the following command:

```azurecli
az quantum execute --target-id quantinuum.sim.h1-1sc -o table
```

This command compiles your program, submits it to the Quantinuum syntax checker, and waits until it has finished simulating the program. Once it's done, it outputs a histogram similar to this:

```output
Result     Frequency
---------  -----------  ----------------------
[0,0,0,0]  1.00000000   |████████████████████|
```

Looking at the histogram, you may notice that the random number generator returned 0 every time, which isn't very random. This is because that, while the syntax checker ensures that your code will run successfully on Quantinuum hardware, it also returns 0 for every quantum measurement. For a true random number generator, you need to run your circuit on quantum hardware.

## Run the program on hardware

To run the program on hardware, we'll use the asynchronous job submission command `az quantum job submit`. Like the `execute` command, this will compile and submit your program, but it won't wait until the execution is complete. We recommend this pattern for running against hardware, because you may need to wait a while for your job to finish. To get an idea of how long that may be, you can run `az quantum target list -o table` as described earlier.


   ```azurecli
   az quantum job submit --target-id quantinuum.qpu.h1-1 -o table
   ```

   ```output
    Name        ID                                    Status    Target                Submission time
    ----------  ------------------------------------  --------  --------              ---------------------------------
    QuantumRNG  b4d17c63-2119-4d92-91d9-c18d1a07e08f  Waiting   quantinuum.qpu.h1-1   2020-01-12T22:41:27.8855301+00:00
   ```

The table shows that your job has been submitted and is waiting for its turn to run. To check on the status, use the `az quantum job show` command, being sure to replace the `job-id` parameter with the Id output by the previous command, for example:

   ```azurecli
    az quantum job show -o table --job-id b4d17c63-2119-4d92-91d9-c18d1a07e08f 
   ```

   ```output
    Name        ID                                    Status    Target               Submission time
    ----------  ------------------------------------  --------  --------             ---------------------------------
    QuantumRNG  b4d17c63-2119-4d92-91d9-c18d1a07e08f  Waiting   quantinuum.qpu.h1-1  2020-10-22T22:41:27.8855301+00:00
   ```

`Status` in the above table changes to `Succeeded`. Once that's done you can get the results from the job by running `az quantum job output`:

   ```azurecli
   az quantum job output -o table --job-id b4d17c63-2119-4d92-91d9-c18d1a07e08f 
   ```

   ```output
   Result     Frequency
   ---------  -----------  -------------------------
   [0,0,0,0]  0.05200000   ▐█                      |
   [1,0,0,0]  0.07200000   ▐█                      |
   [0,1,0,0]  0.05000000   ▐█                      |
   [1,1,0,0]  0.06800000   ▐█                      |
   [0,0,1,0]  0.04600000   ▐█                      |
   [1,0,1,0]  0.06000000   ▐█                      |
   [0,1,1,0]  0.06400000   ▐█                      |
   [1,1,1,0]  0.07600000   ▐██                     |
   [0,0,0,1]  0.04800000   ▐█                      |
   [1,0,0,1]  0.06200000   ▐█                      |
   [0,1,0,1]  0.07400000   ▐█                      |
   [1,1,0,1]  0.08000000   ▐██                     |
   [0,0,1,1]  0.05800000   ▐█                      |
   [1,0,1,1]  0.06800000   ▐█                      |
   [0,1,1,1]  0.05200000   ▐█                      |
   [1,1,1,1]  0.07000000   ▐█                      |
   ```

The histogram you receive may be slightly different than the one above, but you should find that the states generally are observed with equal frequency.
