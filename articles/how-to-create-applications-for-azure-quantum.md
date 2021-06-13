---
author: KittyYeungQ
description: Explanation of how to create applications for the different targets of Azure-Quantum
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: Create and run Q# applications in Azure Quantum
uid: microsoft.quantum.create-applications
---

# Create and run Q# applications in Azure Quantum

This guide outlines the process to create a Q# application and run it on the different quantum computing targets available in Azure Quantum. To see what types of quantum computing targets Azure Quantum offers, you can check our article [Targets in Azure Quantum](xref:microsoft.quantum.concepts.targets).

## Create and run applications for Full profile targets

**Full** profile targets can run any Q# program, meaning you can write programs without functionality restrictions. Azure Quantum does not provide any target with this profile yet, but you can try any Q# program locally using the [full state simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) or the [resources estimator](xref:microsoft.quantum.machines.overview.resources-estimator) from the QDK.

If you need help setting up your environment to run Q# programs locally, see [Getting started with the QDK](xref:microsoft.quantum.get-started-qdk).

You can also explore different [Q# code samples](/samples/browse/?languages=qsharp) to run locally with the QDK.

## Create and run applications for No Control Flow profile targets

**No Control Flow** profile targets can run a wide variety of Q# applications, with the constraint that they can't use results from qubit measurements to control the program flow. More specifically, values of type `Result` do not support equality comparison.

For example, this operation can NOT be run on a No Control Flow target:

```qsharp
    operation SetQubitState(desired : Result, q : Qubit) : Result {
        if (desired != M(q)) {
            X(q);
        }
    }
```

Trying to run this operation on a No Control Flow target will fail because it evaluates a comparison between two results (`desired != M(q)`) to control the computation flow with an `if` statement.

> [!NOTE]
> Currently, there is an additional limitation for this type of profile target: *you can't apply operations on qubits that have been measured, even if you don't use the results to control the program flow.* This limitation is not inherent to this profile type but is circumstantial to the situation of the Public Preview.

Presently, these No Control Flow targets are available for Azure Quantum:

- **Provider:** IonQ
  - IonQ simulator (`ionq.simulator`)
  - IonQ QPU: (`ionq.qpu`)

## Create and run applications for Basic Measurement Feedback targets

**Basic Measurement Feedback** profile targets can run a wide variety of Q# applications, with the constraint that you can only compare values of type `Result` as part of conditions within `if` statements in operations. The corresponding conditional blocks may not contain `return` or `set` statements. This profile type supposes an improvement over No Control Flow profiles, but still is subject to some limitations.

Presently, these Basic Measurement Feedback targets are available for Azure Quantum:

- **Provider:** Honeywell
  - Honeywell System Model H0 (`honeywell.hqs-lt-1.0`)
  - Honeywell System Model H1 (`honeywell.hqs-lt-s1`)

## Step-by-step guide to creating applications for hardware targets

Follow the steps in this section to create an application to run on available quantum computing targets.

### Prerequisites

- Install the [QDK](xref:microsoft.quantum.install-qdk.overview.standalone).
- An Azure Quantum workspace with an appropriate provider subscription for your selected target. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.workspaces-portal).

### Steps

1. [Create a Q# application using the Q# project template.](xref:microsoft.quantum.install-qdk.overview.standalone)
1. Open the `*.csproj` file in a text editor (for example, VS Code) and edit the file to:
    - Make sure the project points to the latest version of the QDK. You can verify the latest version in the official [QDK Release Notes](xref:microsoft.quantum.relnotes-qdk).
    - Add a line specifying the preferred target inside the `<PropertyGroup>`. For example by picking one of the targets below:
      - IonQ simulator: `<ExecutionTarget>ionq.simulator</ExecutionTarget>`
      - IonQ QPU: `<ExecutionTarget>ionq.qpu</ExecutionTarget>`
      - Honeywell API validator: `<ExecutionTarget>honeywell.hqs-lt-1.0-apival</ExecutionTarget>`
      - Honeywell system model H0: `<ExecutionTarget>honeywell.hqs-lt-1.0</ExecutionTarget>`
      - Honeywell system model H1: `<ExecutionTarget>honeywell.hqs-lt-s1</ExecutionTarget>`

   Your `*.csproj` file should look something like this:

    ```xml
    <Project Sdk="Microsoft.Quantum.Sdk/X.XX.XXXX.XXXXXX">

      <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>netcoreapp3.1</TargetFramework>
        <ExecutionTarget>my.target</ExecutionTarget>
      </PropertyGroup>

    </Project>
    ```

   where `X.XX.XXXX.XXXXXX` is a place holder for the latest version number of the QDK, and `my.target` a placeholder for your chosen target.
1. Write your Q# program, keeping in mind the restrictions applying to the computation profile of your particular target.  you cannot compare measurement results to control the program flow.
1. Build and run your program locally using the targets supplied by the QDK. This will let you know if your Q# application can run on the specified Azure Quantum target by checking the fulfillment of the computation profile restrictions and calculating the needed resources.
   - You can run your Q# program locally using the QDK full state simulator by using the command `dotnet run`. Since you selected the `ExecutionTarget` in the `*.csproj` file, the console output will warn you if you created a file that is not compatible with selected computation profile.
   - You can use the [`resources estimator`](xref:microsoft.quantum.machines.overview.resources-estimator) to estimate what resources your Q# program requires to run. You invoke the resources estimator with the command: `dotnet run --simulator ResourcesEstimator`.
1. Once your Q# program is ready, submit the job to Azure Quantum using your preferred environment by specifying the target ID, for example `ionq.qpu` or `honeywell.hqs-lt-1.0`.

For more information on how to submit jobs to Azure Quantum, see:

- [Submit jobs to Azure Quantum using the Azure CLI](xref:microsoft.quantum.submit-jobs.azcli).
- [Submit jobs to Azure Quantum using Python](xref:microsoft.quantum.submit-jobs.python).
- [Submit jobs to Azure Quantum using Q# Jupyter Notebooks](xref:microsoft.quantum.submit-jobs.jupyter)

The full list of targets can be found on the [Azure Quantum providers page](xref:microsoft.quantum.reference.qc-target-list).

> [!NOTE]
> If you run into an error while working with Azure Quantum, you can check our [list of common issues](xref:microsoft.quantum.azure.common-issues).

## Next steps

- Now that you know how to create Q# applications, you can learn more details about [how to submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs.azcli).
- You can also  try the different [samples](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum) we have available or try to submit your own projects.
