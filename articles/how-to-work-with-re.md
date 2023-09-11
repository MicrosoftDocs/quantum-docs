---
author: SoniaLopezBravo
description: Learn how to get the most out of the Resource Estimator and make your job submission more efficient. 
ms.date: 09/11/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Harness the Resource Estimator
uid: microsoft.quantum.work-with-resource-estimator
---

# Get the most out of the Azure Quantum Resource Estimator

Once you've learned how to [customize](xref:microsoft.quantum.overview.resources-estimator) and [submit](xref:microsoft.quantum.quickstarts.computing.resources-estimator) jobs to the Resource Estimator, you can learn how to optimize the execution time of resource estimation jobs.

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The **Microsoft Quantum Computing** provider added to your workspace. For more information, see [Enabling the Resource Estimator target](xref:microsoft.quantum.quickstarts.computing.resources-estimator#enable-the-resources-estimator-in-your-workspace).

## How to run multiple configurations as a single job

The Azure Quantum Resource Estimator allows you to submit jobs with multiple configuration of job parameters, also referred as *items*, as a single job to avoid rerunning multiple jobs on the same quantum program.

A resource estimation job consist of two types of job parameters:

- [Target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters): qubit model, QEC schemes, error budget, constraints on the component-level, and profiling parameters.
- Operation arguments: arguments that can be passed to the program (if the QIR entry point contains arguments).

One item consists of one configuration of job parameters, that is one configuration of target parameters and operation arguments. Several items are represented as an array of job parameters.

Some scenarios where you may want to submit multiple items as a single job:

- Submit multiple target parameters with *same* operation arguments in all items.
- Submit multiple target parameters with *different* operation arguments in all items.
- Easily compare multiple results in a tabular format.
- Easily compare multiple results in a chart.

### [Batching with Q\#](#tab/tabid-batching-qsharp)

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

1. You import some packages to use the Resource Estimator target and the `MicrosoftEstimatorQubitParams` class, which is used to specify the target parameters.

    ```python
    from azure.quantum.target.microsoft import MicrosoftEstimator, QubitParams
    from azure.quantum.target.microsoft.target import MicrosoftEstimatorQubitParams
    ```

2. You want to estimate the resources of the operation `Multiply` using four different bit widths [8, 16, 32, 64], and for four different qubit models ["qubit_gate_ns_e3", "qubit_gate_ns_e4", "qubit_gate_us_e3", "qubit_gate_us_e4"]. Each configuration consists of one operation argument and one target parameter.

    ```python
    target_params = [
        ("Gate-based ns, 10⁻³", MicrosoftEstimatorQubitParams(name=QubitParams.GATE_NS_E3)),
        ("Gate-based ns, 10⁻⁴", MicrosoftEstimatorQubitParams(name=QubitParams.GATE_NS_E4)),
        ("Gate-based us, 10⁻³", MicrosoftEstimatorQubitParams(name=QubitParams.GATE_US_E3)),
        ("Gate-based us, 10⁻⁴", MicrosoftEstimatorQubitParams(name=QubitParams.GATE_US_E4)),
    ]
    
    bitwidths = [8, 16, 32, 64]
    
    # This is to access the names of the target parameters
    names = [name for (name, _) in target_params]
    
    ```

    > [!NOTE]
    > Note that `target_params` are a tuple of the label and the qubit parameter. The qubit parameter is an instance of the class `MicrosoftEstimatorQubitParams`. The `name` field is the only required field. The rest of the fields are optional and will be set to the default values if not specified.

3. By running each configuration as a single job, this would lead to the submission of 16 jobs, which means 16 separate compilations for the same program. Instead, you create one batching job with multiple items. The bit width is assigned by accessing it through the `arguments` field of the item.

    ```python
    params = estimator.make_params(num_items=len(bitwidths) * len(target_params))
    
    for i, (_, target_param) in enumerate(target_params):
        for j, bitwidth in enumerate(bitwidths):
            params.items[i * len(bitwidths) + j].qubit_params = target_param
            params.items[i * len(bitwidths) + j].arguments["bitwidth"] = bitwidth
    
    job = estimator.submit(EstimateMultiplication, input_params=params, name="Multiplier estimation")
    
    results = job.get_results()
    ```

    > [!NOTE]
    > You can set a name for the job by passing the `name` parameter to the `submit` method.
    >
    > ```python
    > job = estimator.submit(operation, input_params=params, name="My operation")
    > ```

4. The result of the resource estimation job is displayed in a table with multiple results coming from the list of items. By default the maximum number of items to be displayed is five. To display a list of $N$ items where $N > 5$, use `results[0:N]`. You can also access individual results by providing a number as index. For example, `results[0]` to show the results table of the first configuration.

### [Batching with Qiskit](#tab/tabid-batching-qiskit)

Consider the following Qiskit circuit that takes three qubits and apply a CCX or Toffoli gate using the third qubit as target. In this case, you want to estimate the resources of this quantum circuit for four different target parameters, so each configuration consists of one target parameter. Batching allows you to submit all configurations at the same time.

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

The result of the resource estimation job is displayed in a table with multiple results coming from the list of items. By default the maximum number of items to be displayed is five. To display a list of $N$ items where $N > 5$, use `results[0:N]`. You can also access individual results by providing a number as index. For example, `results[0]` to show the results table of the first configuration.

### [Batching with PyQIR](#tab/tabid-batching-pyqir)

Consider that you want to estimate the resources of a quantum operation using all six pre-defined qubit parameters. As pre-defined QEC scheme we are using `surface_code` with gate-based qubit parameters, and `floquet_code` with Majorana based qubit parameters. The operation takes six different arguments.

This code is based on the sample Quantum dynamics, which you can find at the Resource Estimation tab of the sample gallery in the [Azure Quantum portal](https://portal.azure.com).

1. You import some packages to use the Resource Estimator target and the `QubitParams` class.

    ```python
    from azure.quantum.target.microsoft import MicrosoftEstimator, QubitParams, QECScheme
    ```

2. You define the labels for the qubit parameters. The labels are used to identify the qubit parameters in the results table. You set a number of items for the job by passing the `num_items` parameter to the `make_params` method. In this case, the number of items is six, one for each pre-defined qubit parameter.

    ```python
    estimator = MicrosoftEstimator(workspace)

    labels = ["Gate-based µs, 10⁻³", "Gate-based µs, 10⁻⁴", "Gate-based ns, 10⁻³", "Gate-based ns, 10⁻⁴", "Majorana ns, 10⁻⁴", "Majorana ns, 10⁻⁶"]
    params = estimator.make_params(num_items=6)
    ```

3. The arguments are passed as a dictionary. The keys are the names of the arguments and the values are the values of the arguments. Arguments can be numbers or arrays of numbers. In this case, you pass the following arguments:

    ```python
    params.arguments["N"] = 10
    params.arguments["J"] = 1.0
    params.arguments["g"] = 1.0
    params.arguments["totTime"] = 20.0
    params.arguments["dt"] = 0.25
    params.arguments["eps"] = 0.001
    ```

4. Next, you can pass the qubit parameters for each configuration by specifying the item in `items[]`, and then use `qubit_params.name` or `qec_scheme.name`.

    ```python
    params.items[0].qubit_params.name = QubitParams.GATE_US_E3
    params.items[1].qubit_params.name = QubitParams.GATE_US_E4
    params.items[2].qubit_params.name = QubitParams.GATE_NS_E3
    params.items[3].qubit_params.name = QubitParams.GATE_NS_E4
    params.items[4].qubit_params.name = QubitParams.MAJ_NS_E4
    params.items[4].qec_scheme.name = QECScheme.FLOQUET_CODE
    params.items[5].qubit_params.name = QubitParams.MAJ_NS_E6
    params.items[5].qec_scheme.name = QECScheme.FLOQUET_CODE
    ```

5. By running each configuration as a single job, this would lead to the submission of six jobs, which means six separate compilations for the same program. Instead, you submit one batching job with multiple items.

    ```python
    job = estimator.submit(Operation, input_params=params, name="My operation")
    results = job.get_results()
    ```

    > [!NOTE]
    > You can set a name for the job by passing the `name` parameter to the `submit` method.
    >
    > ```python
    > job = estimator.submit(operation, input_params=params, name="My operation")
    > ```

***

## Use known estimates for an operation

If you already know some estimates for an operation, for example from a published paper, one way to reduce the execution time is taking the known estimates and incorporate them into the overall program cost.

You can use the `AccountForEstimates` Q# operation to incorporate known estimates into the overall cost of the program.

```qsharp
operation AccountForEstimates(estimates: (Int, Int)[], layout: Int, arguments: Qubit[]): Unit is Adj
```
The `AccountForEstimates` operation takes as inputs an array of known `estimates` that need to be incorporated into the final cost of the program, a `layout` scheme  that is used to derive physical estimates, and array of qubits, which the unimplemented operation is using as its `arguments`.

> [!NOTE]
> The special operation `AccountForEstimates` is an intrinsic operation for the Resource Estimator. It's not supported by other execution targets.

Some scenarios where you may want to use `AccountForEstimates` operation:

- You want to try a novel algorithm described in a paper to check if it improves the performance of your program. You can take estimates from the paper and incorporated them into the program by calling `AccountForEstimates`.
- You want to develop [program top-down](https://en.wikipedia.org/wiki/Top-down_and_bottom-up_design#Programming), that is, start developing from main function and then implement lower levels. You can use `AccoutForEstimates` at the top level with expected estimates for the entire program. As development process progresses, new components start calling to `AccountForEstimates` and expected estimates are replaced by the actual implementation. In this way, estimates for the entire program are known upfront and get more precise as development progresses.

For example, consider the following Q# operation called `AddInPlace`. The operation takes two arrays of qubits as input. Suppose you've read in a paper that  estimating the resources of such $n$-bit in-place adder requires $n-1$ auxiliary qubits, $4n−4$ T gates, and $n−1$ measurements. Then, you want to use `AccountForEstimates` operation to estimate the resources including the number of auxiliary qubits, T gates, and measurements needed. 

```qsharp
operation AddInPlace(operand1 : Qubit[], operand2 : Qubit[]) : Unit {
    let n = Length(operand1);
    // n-bit in-place adder requires n-1 helper qubits, 4n−4 T gates, and n−1 measurements:
    AccountForEstimates([ AuxQubitCount(n-1), TCount(4*n-4), MeasurementCount(n-1) ], PSSPCLayout(), operand1 + operand2);
}
```

In this example `PSSPCLayout()` is the only layout scheme available at this time. `AuxQubitCount()`, `TCount()`, `MeasurementCount()` are the functions
defined in [`ResourceEstimation` namespace](https://github.com/microsoft/qsharp-runtime/blob/main/src/Simulation/QSharpFoundation/Estimation/AccountForEstimates.qs). They are used to indicate which specific cost value is provided by constructing an appropriate tuple.

|Functions with `AccountForEstimates`| Description|
|---|---|
|`AuxQubitCount(amount : Int)`| Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of auxilliary qubits is equal to the `amount`.|
|`TCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of T gates is equal to the `amount`.|
|`MeasurementCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of measurements is equal to the `amount`.|
|`RotationCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of rotations is equal to the `amount`.|
|`RotationDepth(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the rotation depth is equal to the `amount`.|
|`CczCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of CCZ gates is equal to the `amount`.|
|`PSSPCLayout()`| Indicate Parallel Synthesis Sequential Pauli Computation (PSSPC) layout. For more information, see [arXiv:2211.0769](https://arxiv.org/pdf/2211.07629.pdf).|


## How to handle large programs

When you submit a resource estimation job to the Resource Estimator, the quantum program is evaluated completely to extract the resource estimates. If you want estimate the resources of a Q# operation that is invoked many times, for example, in a loop with many iterations, the execution of the resource estimation job may take a long time. One way to reduce long execution times is to run the operation once, compute and cache its costs, and use the data on subsequent calls. This technique is called manual caching.

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


## Next steps

- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Tutorial: Submit a QIR program to the Azure Quantum Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
- [Sample: Resource estimation with Q# and VS Code](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/integer-factorization-with-cli)

