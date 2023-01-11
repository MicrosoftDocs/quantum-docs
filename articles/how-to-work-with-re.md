---
author: SoniaLopezBravo
description: Learn how to run the Resource Estimator target in Azure Quantum and tips to make your work and job submission more efficient 
ms.date: 11/05/2022
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Work with the Resource Estimator
uid: microsoft.quantum.work-with-resource-estimator
---

# Get the most out of the Azure Quantum Resource Estimator

Once you've learned how to [customize](xref:microsoft.quantum.overview.resources-estimator) and [submit](xref:microsoft.quantum.quickstarts.computing.resources-estimator) jobs to the Resource Estimator, you can learn how to optimize the execution time of resource estimation jobs.

## Handle large programs

When you submit a resource estimation job to the Resource Estimator, the quantum program is evaluated completely to extract the resource estimates. As such, large programs or programs that have loops with many iterations may take a long time to complete the resource estimation job.

One way to reduce long execution times is to perform *resource estimation caching*, a dedicated technique for the Resource Estimator to reduce execution time in Q# programs. 

```qsharp
if BeginCaching(id) {
    // Code block to be cached
    EndCaching(id);
}
```

The two special operations `BeginCaching` and `EndCaching` are intrinsic operations for the Resource Estimator. They both take as input an identifier `id`, which should be an integer unique for every code block that should be cached. `BeginCaching` should be used as a condition to an if-block that will contain the block to be cached. These operations will instruct resource counting such that the if-block will be executed only once, its resources will be cached, and appended in every other iteration.

When `BeginCaching` is called for the first time, it will return `true` and record all resources until `EndCaching` is called for the same `id`. `EndCaching` should be placed at the end of the condition, and it will store the cached resources in a dictionary with the `id` as a key. All subsequent times that `BeginCaching` is called with an `id` that is already cached, the cached resources will be added to the existing ones, instead of executing the code again.

There is no verification that resources are the same in every iteration. However, the resources are approximately the same, such that the improvement in runtime is a good trade-off.

> [!IMPORTANT]
> Currently, special operations `BeginCaching` and `EndCaching` are only supported from Q# programs and the Azure CLI. 

## How to avoid rerunning the same job
 
If you've already submitted a resource estimation job for a quantum program, you can retrieve the results in the future and avoid rerunning the same job.

- After running the jobs in the same notebook, you can print the jobs using the `print`
  command and then paste it into the cell. This way, you can easily access the job IDs in future sessions without needing to resubmit jobs.
- After running jobs in some other notebook, you can paste the job IDs that you can access from the **Job management** page in your Azure Quantum workspace and collect the results in your current notebook.

```python
# Use the following line to print all job IDs and then update them in the bottom of the cell
print(f"jobs = {jobs}")

# These job ids are not complete and are just printed to provide an idea of what to expect from the output.
jobs = {'gate_ns': ['fdd354d9-...', ...], 'gate_us': ['453f7039-...', ...], 'maj_ns': ['cf273c84-...', ...]} 
```

## Next steps

- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Tutorial: Submit a QIR program to the Azure Quantum Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
- [Sample: Resource estimation with Q# and VS Code](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/integer-factorization-with-cli)

