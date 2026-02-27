---
author: azure-quantum-content
description: Learn how to optimize the execution time when running large Q# programs with the resource estimator.
ms.date: 02/12/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Optimize Large Programs with the resource estimator
uid: microsoft.quantum.resource-estimator-caching
#customer intent: As a quantum programmer, I want to learn how to optimize the execution time of my programs. 
---

# How to optimize run times for large programs with the resource estimator

In this article, you learn how to use the [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator) to optimize the run times for large Q# programs.

For information about how to run the resource estimator, see [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Prerequisites

- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download) or open [VS Code for the Web](https://vscode.dev/quantum).
- The latest version of the [Microsoft Quantum Development Kit (QDK) extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

If you want to use Python in VS Code, then you also need to do the following:

- Install the latest versions of the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions in VS Code.
- Install the latest version of the `qdk` Python library.  

    ```bash
    python -m pip install --upgrade qdk
    ```

## Manual caching with Q# programs

When you submit a resource estimation job to the resource estimator, the resource estimator evaluates your entire quantum program to calculate the estimates. If your Q# program calls the same operation many times, for example in a loop with many iteration, then the resource estimation job run time might be very long. To reduce long run for these kinds of programs, you can run the operation once to compute and cache its costs, and then use the cached data on subsequent calls to the operation. This technique is called manual caching.

The resource estimator target supports two Q# functions to perform manual caching: `BeginEstimateCaching` and `EndEstimateCaching`. The `BeginEstimateCaching` function takes the following inputs:

| Input parameter | Type   | Description                                                        |
|-----------------|--------|--------------------------------------------------------------------|
| `name`          | String | Unique name for the piece of code that you want to cache costs for |
| `variant`       | Int    | Indicates the variant of cost for the same piece of code           |

> [!NOTE]
> The two special operations `BeginEstimateCaching` and `EndEstimateCaching` are intrinsic operations for the resource estimator. If your Q# program contains either of these operation, then your program can't run on other simulator or hardware targets.

For example, let's say that you have a Q# operation called `ExpensiveOperation` that's called many times in your program. Cache the cost estimate to run `ExpensiveOperation` to reduce the total resource estimation run time:

```qsharp
operation ExpensiveOperation(c: Int, b : Bool): Unit {
    if BeginEstimateCaching("MyNamespace.ExpensiveOperation", SingleVariant()) {
        // Code block to be cached
        EndEstimateCaching();
    }
}
```

The `BeginEstimateCaching` function is called each time that your program calls `ExpensiveOperation`. When `BeginEstimateCaching` is called for the first time, it returns `true` and begins to accumulate cost data for `ExpensiveOperation`. This causes your code to proceed with execution of the expensive code fragment. When `EndEstimateCaching` is called, the cost data is stored for future use and is incorporated into the overall cost of your program.

When `ExpensiveOperation` is called the second time (and subsequently), the resource estimator finds the stored (cached) cost data, incorporates it into overall cost of the program and returns `false`. This causes the resource estimator to skip subsequent runs of the expensive code fragment. For the caching to work correctly, place `EndEstimateCaching` at the end of the condition, and nest regions that are enclosed between `BeginEstimateCaching` and `EndEstimateCaching`.

The `SingleVariant()` argument indicates that the cost data collected on the first run of `ExpensiveOperation` can be reused in all subsequent runs of the code fragment. This might be not always the case. For example, if your code has different costs for odd and even values of a variable `c`, then you can provide a `variant` value:

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
> If you experience issues when you work with the resource estimator, then see the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Related content

- [Retrieve the results of the resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize the target parameters of the resource estimator](xref:microsoft.quantum.overview.resources-estimator)
