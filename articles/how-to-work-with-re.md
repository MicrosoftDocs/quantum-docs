---
author: SoniaLopezBravo
description: Learn how to run the Resource Estimator target in Azure Quantum and tips to make your work and job submission more efficient 
ms.date: 02/12/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Harness the Resource Estimator
uid: microsoft.quantum.work-with-resource-estimator
---

# Get the most out of the Azure Quantum Resource Estimator

Once you've learned how to [customize](xref:microsoft.quantum.overview.resources-estimator) and [submit](xref:microsoft.quantum.quickstarts.computing.resources-estimator) jobs to the Resource Estimator, you can learn how to optimize the execution time of resource estimation jobs.

## Run multiple configurations as a single job

A resource estimation job consist of two types of job parameters: [target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters), that is qubit model, QEC schemes, and error budget; and, optionally, operation arguments, that is arguments that can be passed to the QIR program. The Azure Quantum Resource Estimator allows you to submit jobs with multiple configuration of job parameters, or multiple *items*, as a single job to avoid rerunning multiple jobs on the same quantum program. This is also known as *batching*.

One item consists of one configuration of job parameters, that is one configuration of target parameters and operation arguments. Several items are represented as an array of job parameters. 

Some scenarios where you may want to submit multiple items as a single job:

- Submit multiple target parameters with *same* operation arguments in all items.
- Submit multiple target parameters with *different* operation arguments in all items.
- Easily compare multiple results in a tabular format.
- Easily compare multiple results in a chart.



For example, consider the following Q# operation that creates multiplier with a `bitwidth` parameter that can be passed to the operation as argument. The operation have two input registers, each the size of the specified `bitwidth`, and one output register that is twice the size of the specified `bitwidth`. 

```python 
%%qsharp 
open Microsoft.Quantum.Arithmetic;

operation Multiply(bitwidth : Int) : Unit { 

    use factor1 = Qubit[bitwidth]; 
    use factor2 = Qubit[bitwidth]; 
    use product = Qubit[2 * bitwidth]; 
    MultiplyI(LittleEndian(factor1), LittleEndian(factor2), LittleEndian(product)); 

} 
```
You want to estimate the resources of the operation `Multiply` using four different bit widths [8, 16, 32, 64], and for four different qubit models ["qubit_gate_ns_e3", "qubit_gate_ns_e4", "qubit_gate_us_e3", "qubit_gate_us_e4"]. Each configuration consists of one operation argument and one target parameter.

```python
bitwidths = [8, 16, 32, 64] 
estimation_params = [
    {"qubitParams": {"name": "qubit_gate_ns_e3"}},
    {"qubitParams": {"name": "qubit_gate_ns_e4"}},
    {"qubitParams": {"name": "qubit_gate_us_e3"}},
    {"qubitParams": {"name": "qubit_gate_us_e4"}}
]

```
By running each configuration as a single job, this would lead to the submission of 16 jobs, which means 16 separate compilations for the same program. 
Instead, you want to run one resource estimation job with multiple items. 

```python
items = []

for bitwidth in bitwidths:
    for params in estimation_params:
        items.append({
            "arguments": [{
                "name": "bitwidth",
                "value": bitwidth,
                "type": "Int"
            }],
            **params
        })

results = qsharp.azure.execute(Multiply, jobParams={"items": items})
```

The result of the resource estimation job is displayed in a table with multiple results coming from the list of items. By default the max number of items to be displayed is $N = 5$. To display a list of items where $N > 5$, use `results[0:N]`. 

Consider the following Qiskit circuit

```python
from azure.quantum.qiskit import AzureQuantumProvider 
provider = AzureQuantumProvider ( 
    resource_id = "", 
    location = "" 
) 

backend = provider.get_backend('microsoft.estimator') 

from qiskit import QuantumCircuit 
from qiskit.tools.monitor import job_monitor 

circ = QuantumCircuit(3) 
circ.ccx(0, 1, 2) 
items = [ 
    {"qubitParams": {"name": "qubit_gate_ns_e3"}, "errorBudget": 0.0001}, 
    {"qubitParams": {"name": "qubit_gate_ns_e4"}, "errorBudget": 0.0001}, 
    {"qubitParams": {"name": "qubit_maj_ns_e4"}, "errorBudget": 0.0001}, 
    {"qubitParams": {"name": "qubit_maj_ns_e6"}, "errorBudget": 0.0001}, 
] # target parameters 

job = backend.run(circ, items=items) 
job_monitor(job) 
results = job.result() 
results 
```

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


## Next steps

- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Tutorial: Submit a QIR program to the Azure Quantum Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
- [Sample: Resource estimation with Q# and VS Code](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/integer-factorization-with-cli)

