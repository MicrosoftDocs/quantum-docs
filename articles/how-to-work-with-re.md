---
author: SoniaLopezBravo
description: Learn how to get the most out of the Resource Estimator and make your job submission more efficient. 
ms.date: 01/08/2024
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Harness the Resource Estimator
uid: microsoft.quantum.work-with-resource-estimator
---

# Get the most out of the Azure Quantum Resource Estimator

In this article, you learn how to optimize the execution time when running the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). 

For information about how to run the Resource Estimator, see [Use different SDKs and IDEs with the Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

## Prerequisites

### [Q# and Python in VS Code](#tab/tabid-vscode)

To run Q# programs in the Resource Estimator, you need the following:

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension. For installation details, see [Installing the Modern QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-modern-qdk-on-vs-code).

If you want to use Python in VS Code, you also need the following:

- Install the latest version of the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions for VS Code.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets 
    ```

### [Qiskit in Azure portal](#tab/tabid-portal)

To submit jobs to the Resource Estimator, you need the following:

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

***

## How to run multiple configurations as a single job

The Azure Quantum Resource Estimator allows you to submit jobs with multiple configuration of job parameters, also referred as *items*, as a single job to avoid rerunning multiple jobs on the same quantum program.

A resource estimation job consist of two types of job parameters:

- [Target parameters](xref:microsoft.quantum.overview.resources-estimator): qubit model, QEC schemes, error budget, constraints on the component-level, and distillation units.
- Operation arguments: arguments that can be passed to the program (if the QIR entry point contains arguments).

One item consists of one configuration of job parameters, that is one configuration of target parameters and operation arguments. Several items are represented as an array of job parameters.

Some scenarios where you may want to submit multiple items as a single job:

- Submit multiple target parameters with *same* operation arguments in all items.
- Submit multiple target parameters with *different* operation arguments in all items.
- Easily compare multiple results in a tabular format.
- Easily compare multiple results in a chart.

### [Batching with Q#](#tab/tabid-batching-qsharp)

If you are estimating the resources of a Q# program, you can run multiple configurations of target parameters, also known as *batching*. Batching with Q# can be done in a [Jupyter Notebook in VS Code](xref:microsoft.quantum.submit-resource-estimation-jobs).

You can perform a batch estimation by passing a list of target parameters to the `params` parameter of the `qsharp.estimate` function. The following example shows how to submit two configurations of target parameters as a single job. The first configuration uses the default target parameters, and the second configuration uses the `qubit_maj_ns_e6` qubit parameter and the `floquet_code` QEC scheme.

In the same Jupyter Notebook of your Q# program, add a new cell and run the following code:

```python
result_batch = qsharp.estimate("RunProgram()", params=
                [{}, # Default parameters
                {
                    "qubitParams": {
                        "name": "qubit_maj_ns_e6"
                    },
                    "qecScheme": {
                        "name": "floquet_code"
                    }
                }])
result_batch.summary_data_frame(labels=["Gate-based ns, 10⁻³", "Majorana ns, 10⁻⁶"])
```

You can also construct a list of estimation target parameters using the `EstimatorParams` object. The following code shows how to submit six configurations of target parameters as a single job.

```python
from qsharp.estimator import EstimatorParams, QubitParams, QECScheme

labels = ["Gate-based µs, 10⁻³", "Gate-based µs, 10⁻⁴", "Gate-based ns, 10⁻³", "Gate-based ns, 10⁻⁴", "Majorana ns, 10⁻⁴", "Majorana ns, 10⁻⁶"]

params = EstimatorParams(num_items=6)
params.error_budget = 0.333
params.items[0].qubit_params.name = QubitParams.GATE_US_E3
params.items[1].qubit_params.name = QubitParams.GATE_US_E4
params.items[2].qubit_params.name = QubitParams.GATE_NS_E3
params.items[3].qubit_params.name = QubitParams.GATE_NS_E4
params.items[4].qubit_params.name = QubitParams.MAJ_NS_E4
params.items[4].qec_scheme.name = QECScheme.FLOQUET_CODE
params.items[5].qubit_params.name = QubitParams.MAJ_NS_E6
params.items[5].qec_scheme.name = QECScheme.FLOQUET_CODE

qsharp.estimate("RunProgram()", params=params).summary_data_frame(labels=labels)
```

### [Batching with Qiskit](#tab/tabid-batching-qiskit)

If you are estimating the resources of a Qiskit program, you can run multiple configurations of target parameters, also known as *batching*. Batching with Qiskit can be done in a [notebook in Azure portal](xref:microsoft.quantum.submit-resource-estimation-jobs).

Consider the following Qiskit circuit that takes three qubits and apply a CCX or Toffoli gate using the third qubit as target. In this case, you want to estimate the resources of this quantum circuit for four different target parameters, so each configuration consists of one target parameter. Batching allows you to submit all configurations at the same time.

In the same notebook of your Qiskit program, add a new cell and run the following code:

```python
from azure.quantum import Workspace
from azure.quantum.qiskit import AzureQuantumProvider 

workspace = Workspace ( 
    resource_id = "", 
    location = "" 
) 

provider = AzureQuantumProvider(workspace)

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

If you are estimating the resources of a PyQIR program, you can run multiple configurations of target parameters, also known as *batching*. Batching with PyQIR can be done in a [notebook in Azure portal](xref:microsoft.quantum.tutorial.resource-estimator.qir).

Consider that you want to estimate the resources of a quantum operation using all six pre-defined qubit parameters. As pre-defined QEC scheme we are using `surface_code` with gate-based qubit parameters, and `floquet_code` with Majorana based qubit parameters. The operation takes six different arguments.

In the same notebook of your PyQIR program, add a new cell and run:

1. First, you import some packages to use the Resource Estimator target and the `QubitParams` class.

    ```python
    from azure.quantum.target.microsoft import MicrosoftEstimator, QubitParams, QECScheme
    ```

1. You define the labels for the qubit parameters. The labels are used to identify the qubit parameters in the results table. You set a number of items for the job by passing the `num_items` parameter to the `make_params` method. In this case, the number of items is six, one for each pre-defined qubit parameter.

    ```python
    estimator = MicrosoftEstimator(workspace)

    labels = ["Gate-based µs, 10⁻³", "Gate-based µs, 10⁻⁴", "Gate-based ns, 10⁻³", "Gate-based ns, 10⁻⁴", "Majorana ns, 10⁻⁴", "Majorana ns, 10⁻⁶"]
    params = estimator.make_params(num_items=6)
    ```

1. The arguments are passed as a dictionary. The keys are the names of the arguments and the values are the values of the arguments. Arguments can be numbers or arrays of numbers. In this case, you pass the following arguments:

    ```python
    params.arguments["N"] = 10
    params.arguments["J"] = 1.0
    params.arguments["g"] = 1.0
    params.arguments["totTime"] = 20.0
    params.arguments["dt"] = 0.25
    params.arguments["eps"] = 0.001
    ```

1. Next, you can pass the qubit parameters for each configuration by specifying the item in `items[]`, and then use `qubit_params.name` or `qec_scheme.name`.

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

1. By running each configuration as a single job, this would lead to the submission of six jobs, which means six separate compilations for the same program. Instead, you submit one batching job with multiple items.

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

Some scenarios where you may want to perform estimation from pre-calculated estimates:

- You want to try a novel algorithm described in a paper to check if it improves the performance of your program. You can take estimates from the paper and incorporated them into the program.
- You want to develop [program top-down](https://en.wikipedia.org/wiki/Top-down_and_bottom-up_design#Programming), that is, start developing from main function and then implement lower levels. You can use the known estimates at the top level with expected estimates for the entire program. As development process progresses, new components start calling to the known estimates and expected estimates are replaced by the actual implementation. In this way, estimates for the entire program are known upfront and get more precise as development progresses.

### [Use Q#](#tab/tabid-known-estimates-qsharp)

You can use the `AccountForEstimates` Q# operation to pass known estimates to the Resource Estimator.

> [!NOTE]
> The special operation `AccountForEstimates` is an intrinsic operation for the Resource Estimator. It's not supported by other execution targets.

For example, consider the following Q# operation called `FactoringFromLogicalCounts` that takes a list of known estimates and a list of qubits.

```qsharp
open Microsoft.Quantum.ResourceEstimation;

operation FactoringFromLogicalCounts() : Unit {
    use qubits = Qubit[12581];

    AccountForEstimates(
        [TCount(12), RotationCount(12), RotationDepth(12),
         CczCount(3731607428), MeasurementCount(1078154040)],
        PSSPCLayout(), qubits);
}
```

The `AccountForEstimates` operation can take the following parameters:

|Functions with `AccountForEstimates`| Description|
|---|---|
|`AuxQubitCount(amount : Int)`| Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of auxilliary qubits is equal to the `amount`.|
|`TCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of T gates is equal to the `amount`.|
|`MeasurementCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of measurements is equal to the `amount`.|
|`RotationCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of rotations is equal to the `amount`.|
|`RotationDepth(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the rotation depth is equal to the `amount`.|
|`CczCount(amount : Int)`|Returns a tuple that can be passed to the `AccountForEstimates` operation to specify that the number of CCZ gates is equal to the `amount`.|
|`PSSPCLayout()`| Indicate Parallel Synthesis Sequential Pauli Computation (PSSPC) layout. For more information, see [arXiv:2211.0769](https://arxiv.org/pdf/2211.07629.pdf).|

### [Use Python](#tab/tabid-known-estimates-python)

You can use the `LogicalCounts` operation to pass known estimates to the Resource Estimator.

> [!NOTE]
> The special operation `LogicalCounts` is an intrinsic operation for the Resource Estimator. It's not supported by other execution targets.

For example, consider the following code that takes a list of known estimates.

```python
logical_counts = LogicalCounts({
    'numQubits': 12581,
    'tCount': 12,
    'rotationCount': 12,
    'rotationDepth': 12,
    'cczCount': 3731607428,
    'measurementCount': 1078154040})

logical_counts.estimate(params)
```

***

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

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator).

## Next steps

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Tutorial: Submit a QIR program to the Azure Quantum Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
