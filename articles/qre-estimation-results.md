---
author: azure-quantum-content
description: This article explains how to access results from the quantum resource estimator, and how to customize the kinds of results that the resource estimator produces.
ms.date: 06/17/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Output of the Microsoft Quantum resource estimator
uid: microsoft.quantum.how-to.access-customize-results-qre
# Customer intent: As a quantum developer and researcher, I want to know how to access estimation results from the quantum resource estimator, and how to customize the results that I get.
---

# How to work with results from the quantum resource estimator

The quantum resource estimator in the Microsoft Quantum Development Kit (QDK) produces optimal estimates of the run time and number of qubits required to run a quantum program on a certain type of hardware. For each estimate result, you can get statistics, the instruction set architecture (ISA), magic state factories, and other properties. You can also build and plot custom result properties.

This article shows how to access and analyze results from the resource estimator, and how to customize the results. The code examples are meant to be run in a Jupyter notebook in the order they appear in the article.

For instructions on how to install and use the resource estimator, see [How to install and use the Microsoft Quantum resource estimator](xref:microsoft.quantum.quickstart.install-use-qre).

> [!WARNING]
> The resource estimator in the QDK extension for VS Code will be deprecated soon. Use the `qdk.qre` Python module to perform resource estimation.

## Run the resource estimator

To run the resource estimator and work with the estimation results, build an application model, a hardware architecture model, and an error correction model. Then, pass the models to the resource estimator and run an estimate for a given maximum error rate.

### Build an application model from a Q\# program

For this example, write a Q# program that performs eight parallel 8-bit ripple-carry additions, with a single-qubit rotation that precedes each addition. The rotations introduce T-gate decomposition into the estimation results.

To build an application from the Q# adder program, follow these steps in a Jupyter notebook:

1. Import the necessary objects.

    ```python
    from qdk import qsharp
    from qdk.qre.application import QSharpApplication
    ```

1. In a new cell, write the Q# program.

    ```qsharp
    import Std.Arithmetic.*;
    import Std.Math.*;
    import Std.Convert.*;
    
    operation EstimateAdder() : Unit {
        for _ in 1..8 {
            use a = Qubit[8];
            use b = Qubit[8];
            for i in 0..7 {
                Ry(PI() / IntAsDouble(i + 2), a[i]);
            }
            RippleCarryCGIncByLE(a, b);
        }
    }
    ```

1. Build the application model.

    ```python
    from qdk.code import EstimateAdder
    
    app = QSharpApplication(EstimateAdder)
    ```

### Build a hardware architecture model

Build a gate-based architecture model using the default `GateBased` class. The architecture model has a $10^{-4}$ maximum error rate, 100 ns gate times, and 500 ns measurement times.

```python
from qdk.qre.models import GateBased

arch = GateBased(error_rate=1e-4, gate_time=100, measurement_time=500)
```

### Build an error correction model

For the error correction model, use the default surface QEC code and default round-based factory distillation model. Combine the QEC code and distillation model to create an ISA query that defines the set of architecture ISAs that the resource estimator explores.

```python
from qdk.qre.models import SurfaceCode, RoundBasedFactory

isa_q = SurfaceCode.q() * RoundBasedFactory.q()
```

### Get basic estimation results

To run the resource estimator, pass a maximum error threshold, application model, architecture model, and ISA query to the `estimate` function. To increase the number of optimal estimation points, also pass an optional trace query that defines the set of application traces that resource estimator explores. For this example, use the `PSSPC` trace transform and the `LatticeSurgery` trace transform with a set of slow down factors.

Set a 1% maximum error rate and run the resource estimator. To print the basic results for each Pareto optimal point, use the `as_frame` method.

```python
from qdk.qre import estimate, PSSPC, LatticeSurgery

results = estimate(
    app,
    arch,
    isa_q,
    trace_query=PSSPC.q() * LatticeSurgery.q(slow_down_factor=[1.0, 1.5, 2.0, 3.0, 4.0]),
    max_error=0.01
)

print(f"Number of Pareto-optimal results: {len(results)}")
results.as_frame()
```

The `estimate` function returns an `EstimationTable` that contains the following resource estimates for each optimal point:

| Results parameter | Description                                                     |
|-------------------|-----------------------------------------------------------------|
| `qubits`          | The total number of physical qubits required to run the program |
| `runtime`         | The amount of time it takes for the program to finish running   |
| `error`           | The overall error rate after error correction                   |

The basic result from the resource estimator is an optimal set of points for run time and physical qubit requirements within a maximum error threshold. This information helps you choose the best parameters to run your program on real quantum hardware given your constraints on time and physical qubit availability.

#### Plot the Pareto-optimal results

To view the results as a plot of the number of qubits versus the run time, use the `plot` method. For example, plot the six Pareto-optimal points with the run time in milliseconds.

```python
results.plot(figsize=(8, 5), runtime_unit="ms")
```

## Get detailed estimation results

The resource estimator produces detailed information about the estimation process and results. To access and display more detailed information about the estimation that you performed, see the following code examples.

### Get estimation statistics

The estimation result has a `stats` attribute that contains the following information about the estimation process:

| Estimation statistic                          | How to access                |
|-----------------------------------------------|------------------------------|
| Number of application traces                  | `stats.num_traces`           |
| Number of ISAs                                | `stats.num_isas`             |
| Number of estimation jobs                     | `stats.total_jobs`           |
| Number of estimates below the error threshold | `stats.successful_estimates` |
| Number of Pareto-optimal results              | `stats.pareto_results`       |

The following code displays this information for the resource estimation that you did:

```python
stats = results.stats

print(f"Traces explored:        {stats.num_traces}")
print(f"ISAs explored:          {stats.num_isas}")
print(f"Total estimation jobs:  {stats.total_jobs}")
print(f"Successful estimates:   {stats.successful_estimates}")
print(f"Pareto-optimal results: {stats.pareto_results}")
```

The total number of possible estimation jobs is the product of the number of traces and the number of ISAs. However, the actual number of estimation jobs is lower because the resource estimator uses a pruning strategy that keeps only the more reasonable combinations.

### Get details for individual Pareto-optimal results

The estimation result has an `EstimationTableEntry` item for each Pareto-optimal point. The table entries contain detailed information about the individual optimal estimates.

To access the estimation table entry for an individual point, use the index for that point. For example, run the following code to get the estimation results for the third optimal point.

```python
entry = results[2]
```

#### Basic results

To access the basic estimation results for an individual optimal point, use the `qubits`, `runtime`, and `error` attributes. For example, the following code displays the basic estimation results for the third optimal point.

```python
print(f"Total physical qubits: {entry.qubits}")
print(f"Runtime:               {entry.runtime} ns")
print(f"Error:                 {entry.error:.6f}")
```

#### Detailed properties

Each estimation table entry has a `properties` attribute that contains detailed information on factories and the distribution of qubits. To view all the properties, run the following code:

```python
from qdk.qre import property_name

props = {property_name(k): v for k, v in entry.properties.items()}

for name, value in props.items():
    print(f"  {name}: {value}")
```

You can also access each property individually. For example, get only the number of T gates per rotation.

```python
from qdk.qre.property_keys import NUM_TS_PER_ROTATION

print(f"Number of T gates per rotation:  {entry.properties.get(NUM_TS_PER_ROTATION, 'N/A')}")
```

### Display qubit partition and factory information

The resource estimator provides tools that let you display more detailed information in the results table. For example, the `add_qubit_partition_column` method adds columns to the results table that show how the physical qubits are distributed. The `add_factory_summary_column` shows the number of T factories that each optimal point requires.

```python
results.add_qubit_partition_column()
results.add_factory_summary_column()

results.as_frame()
```

### Analyze the ISA of an estimate

Each optimal estimation result has an instruction source graph that describes how logical instructions are implemented in terms of lower-level operations. To access the instruction source graph for a result, use the `source` attribute of the `EstimationTableEntry` for that result.

For example, print the instruction source graph for the third result in the `entry` variable that you created.

```python
print("Instruction source graph for the third result:\n")
print(entry.source)
```

The instruction source graph behaves like a Python dictionary where the instruction IDs are the dictionary keys. For example, run the following code to get information about T gate instructions.

```python
from qdk.qre import instruction_name
from qdk.qre.instruction_ids import T

if T in entry.source:
    t_node = entry.source[T]
    t_inst = t_node.instruction
    print("T instruction:")
    print(f"  ID:         {instruction_name(t_inst.id)}")
    print(f"  Encoding:   {'LOGICAL' if t_inst.encoding == 1 else 'PHYSICAL'}")
    print(f"  Arity:      {t_inst.arity}")
    print(f"  Space:      {t_inst.space()} physical qubits")
    print(f"  Time:       {t_inst.time()} ns")
    print(f"  Error rate: {t_inst.error_rate():.2e}")
    if t_node.transform is not None:
        print(f"  Transform:  {t_node.transform}")
```

### Get factory information

Each estimation result entry has a `factories` attribute, which is a dictionary that contains the following information about the magic-state factories:

- Type of factory
- Number of copies of the factory
- Number of times the factory runs
- Number of magic states that the factory creates
- Error rate after distillation

For example, run the following code to view all the factory information for the third result:

```python
print("Factories in the third result:")

for inst_id, factory in entry.factories.items():
    print(f"\n  {instruction_name(inst_id)} factory:")
    print(f"    Copies:     {factory.copies}")
    print(f"    Runs:       {factory.runs}")
    print(f"    States:     {factory.states}")
    print(f"    Error rate: {factory.error_rate:.2e}")
```

## Customize the resource estimator results

You can add custom columns to the `EstimationTable` output from the resource estimator using the `add_property_column` and `add_column`functions.

The `add_property_column` takes a property key as input and creates a column for that property in the results table. For example, use the `NUM_TS_PER_ROTATION` property key to add a column for this property.

```python
results.add_property_column(NUM_TS_PER_ROTATION)

results.as_frame()
```

The `add_column` function takes a column name and a function as input. The input function gets values from the `EstimationTableEntry` attributes for each result to populate the new column. For example, create columns for the T gate error rate, logical operation error rate, and number of T states.

```python
from qdk.qre.instruction_ids import LATTICE_SURGERY

results.add_column(
    "t_error_rate",
    lambda r: r.source[T].instruction.error_rate() if T in r.source else None,
)
results.add_column(
    "logical_error_rate",
    lambda r: r.source[LATTICE_SURGERY].instruction.error_rate(1) if LATTICE_SURGERY in r.source else None,
)
results.add_column(
    "t_states",
    lambda r: r.factories[T].states if T in r.factories else 0,
)

results.as_frame()
```
