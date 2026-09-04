---
author: azure-quantum-content
description: Learn how to submit Q# and OpenQASM programs to Azure Quantum with the QDK extension for VS Code.
ms.author: quantumdocwriters
ms.date: 08/25/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
title: Submit jobs to Azure Quantum with the QDK extension for VS Code
uid: microsoft.quantum.how-to.submit-jobs-vscode
no-loc: ["Microsoft Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Azure Quantum", "Q#", "OpenQASM", "QIR", target, targets]
# Customer intent: As a quantum developer who writes Q# or OpenQASM programs in VS Code, I want to use the QDK extension to submit my programs to Azure Quantum.
---

# Submit jobs to Azure Quantum with the QDK extension for VS Code

Use the Microsoft Quantum Development Kit (QDK) extension for Visual Studio Code (VS Code) to submit Q# and OpenQASM programs to Azure Quantum. You can test your program locally, connect to your Azure Quantum workspace, select a provider target, submit the active program, and view its results without writing submission code.

If you use Qiskit, Cirq, PennyLane, or a Python-based Q# or OpenQASM workflow, see [Submit jobs with the QDK Python package](xref:microsoft.quantum.how-to.submit-jobs-python).

## Prerequisites

- An Azure account with an active subscription.
- An Azure Quantum workspace. To create one, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of [VS Code](https://code.visualstudio.com/download).
- The latest version of the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).

For installation details, see [Set up the Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).

> [!NOTE]
> The examples in this article submit jobs to [simulator targets](xref:microsoft.quantum.machines.overview.backend-simulators). The targets available to you depend on the providers that you configure in your workspace.

## Prepare and test your program

Choose the tab for the language of your source file.

### [Q#](#tab/qsharp)

1. In VS Code, select **File** > **New Text File**, and save the file as `Main.qs`.
1. Add the following Q# program, which uses the **Base** QIR target profile.

    ```qsharp
    @EntryPoint(Base)
    operation Main() : Result {
        use q = Qubit();
        H(q);
        return MResetZ(q);
    }
    ```

1. Select **Run** from the code lens above the `Main` operation to test the program on the local simulator.

### [OpenQASM](#tab/openqasm)

1. In VS Code, select **File** > **New Text File**, and save the file as `bell.qasm`.
1. Add the following OpenQASM program:

    ```qasm
    OPENQASM 3.0;
    include "stdgates.inc";
    
    bit[2] c;
    qubit[2] q;
    
    h q[0];
    cx q[0], q[1];
    c = measure q;
    ```

1. Select **Run** at the beginning of the file to test the program on the local simulator.

> [!NOTE]
> The QDK attempts to select a QIR target profile that supports the OpenQASM program. If the selected profile doesn't support an operation in the program, VS Code displays a compiler error. For more information, see [Quantum computing target profiles](xref:microsoft.quantum.target-profiles).

***

## Connect to your Azure Quantum workspace

You can connect to a workspace using an Azure account.

1. In VS Code, select **View** > **Command Palette**.
1. Enter **QDK: Connect to an Azure Quantum workspace**.
1. Choose **Azure account**.
1. A VS Code message appears stating that QDK wants to sign in, press **Allow**.
1. Choose an account to use.
1. Select a **tenant**.
1. Select the **subscription**.
1. Confirm that your workspace appears under **Quantum Workspaces**.

For more information about connecting to workspaces, see [Connect to your Azure Quantum workspace](xref:microsoft.quantum.how-to.connect-workspace).

## Select an Azure Quantum target

1. In the **Microsoft Quantum** panel, expand your workspace.
1. Expand **Providers**.
1. Expand a provider and review its available targets in your workspace.
1. Select a simulator target that accepts your program's input format and QIR target profile.

> [!TIP]
> Test on a simulator target before you use a paid quantum hardware target. Before your submit to quantum hardware, review the provider pricing and estimate the job cost when the provider supports cost estimation.

## Submit your program

1. In VS Code, open the Q# or OpenQASM file that you want to submit.
1. In the **Microsoft Quantum** panel, find the target that you selected.
1. Select the play icon next to the target.
1. Enter a name that identifies the job.
1. Enter the number of shots (the number of times to run the program).
1. Press **Enter** to submit the job.

VS Code displays a notification when you submit the job. The time required to complete the job depends on the target and its queue.

## Monitor the job and view results

1. In the **Microsoft Quantum** panel, expand **Jobs**.
1. Find the job that you submitted. Hover over the job to view details such as its status and submission time.
1. After the job succeeds, select the histogram icon next to the job to display supported results as a histogram. To display or download the raw result, select the text icon.

Result formats differ by provider and target. If the result can't be displayed as a histogram, view the raw output.

For information about job states, cancellation, and output data, see [Work with Azure Quantum jobs](xref:microsoft.quantum.work-with-jobs).

## Troubleshoot job submission

If you experience issues with job submission, refer to the following guidance for help.

### The target doesn't appear

Confirm that:

- The provider is configured in your workspace.
- The target is currently available.
- You connected to the intended Azure directory, subscription, and workspace.

For information about managing providers, see [Add or remove a provider in an Azure Quantum workspace](xref:microsoft.quantum.add-provider).

### The program doesn't compile for the target

The program must use a QIR target profile and operations that the target supports. Review the compiler error, the program's target profile, and the target capabilities. For more information, see [Quantum computing target profiles](xref:microsoft.quantum.target-profiles).

### The job fails after submission

Open the job details and review the provider error message. Job failures can result from unsupported input, invalid job parameters, provider availability, or quota limits. For common resolutions, see [Troubleshoot Azure Quantum](xref:microsoft.quantum.azure.common-issues).

## Related content

- [How to submit jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs)
- [Submit jobs with the QDK Python package](xref:microsoft.quantum.how-to.submit-jobs-python)
- [Submit jobs to Azure Quantum with Azure CLI](xref:microsoft.quantum.how-to.submit-jobs-azure-cli)
- [Work with Azure Quantum jobs](xref:microsoft.quantum.work-with-jobs)
- [Azure Quantum computing provider targets](xref:microsoft.quantum.reference.qc-target-list)
- [VS Code reference for the QDK](xref:microsoft.quantum.reference.vscode)
