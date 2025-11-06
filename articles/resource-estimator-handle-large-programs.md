---
author: azure-quantum-content
description: Learn how to optimize the execution time when running large Q# programs with the Resource Estimator.
ms.date: 01/13/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Optimize Large Programs with the Resource Estimator
uid: microsoft.quantum.resource-estimator-caching
#customer intent: As a quantum programmer, I want to learn how to optimize the execution time of my programs. 
---

# How to optimize running large programs with the Resource Estimator

In this article, you learn how to optimize the execution time when running large Q# programs with the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator).

For information about how to run the Resource Estimator, see [Different ways to run the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Prerequisites

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- The latest version of the [Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).

If you want to use Python in VS Code, you also need the following:

- Install the latest version of the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
- The latest Azure Quantum `qdk` package.  

    ```bash
    python -m pip install --upgrade qdk
    ```

## Manual caching with Q# programs

When you submit a resource estimation job to the Resource Estimator, the quantum program is evaluated completely to extract the resource estimates. If you want estimate the resources of a Q# operation that is invoked many times, for example, in a loop with many iterations, the execution of the resource estimation job may take a long time. One way to reduce long execution times is to run the operation once, compute and cache its costs, and use the data on subsequent calls. This technique is called *manual caching*.

The Resource Estimator target supports two Q# functions to perform manual caching: `BeginEstimateCaching(name: String, variant: Int): Bool` and `EndEstimateCaching(): Unit`. `BeginEstimateCaching` function takes as inputs a `name` which is the unique name of the code fragment for which you want to cache costs, and an integer `variant` that distinguishes different variants of cost for the same fragment.

> [!NOTE]
> The two special operations `BeginEstimateCaching` and `EndEstimateCaching` are intrinsic operations for the Resource Estimator. They're not supported by other execution targets.

For example, let's say you have a Q# operation called `ExpensiveOperation` that is called many times in an iteration. You can use caching to reduce its estimation time:

```qsharp
operation ExpensiveOperation(c: Int, b : Bool): Unit {
    if BeginEstimateCaching("MyNamespace.ExpensiveOperation", SingleVariant()) {
        // Code block to be cached
        EndEstimateCaching();
    }
}
```

When `ExpensiveOperation` is used repeatedly, `BeginEstimateCaching` is called each time. When `BeginEstimateCaching` is called for the first time, it returns `true`  and begins accumulation of cost data. This causes code to proceed with execution of the expensive code fragment. When `EndEstimateCaching` is called, the cost data is stored for the future use and it's incorporated into overall cost of the program.

When `ExpensiveOperation` is called the second time (and subsequently), the Resource Estimator finds the stored (cached) cost data, incorporates it into overall cost of the program and returns `false`. This causes expensive code fragment to be skipped therefore the Resource Estimator executes program faster. `EndEstimateCaching` should be placed at the end of the condition, and regions enclosed in `BeginEstimateCaching-EndEstimateCaching` can be nested.

`SingleVariant()` indicates that the cost data collected on the first execution can be reused in all subsequent executions of the code fragment. This might be not always the case. For example, if your code have different cost for odd and even values of  a variable 'c', you can provide a `variant` value:

```qsharp
operation ExpensiveOperation(c: Int, b : Bool): Unit {
    if BeginEstimateCaching("MyNamespace.ExpensiveOperation", c % 2) {
        // Some code
        EndEstimateCaching();
    }
}
```

In this case, the cache is different for odd and even values of `c`. In other words, data collected for even values of `c` is only reused for even values of `c`, and the same applies for odd values of `c`.

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Retrieve the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Different ways to run the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize the target parameters of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator)
