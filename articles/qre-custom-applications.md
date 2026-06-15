---
author: azure-quantum-content
description: Learn how to build custom application models for the quantum resource estimator.
ms.author: quantumdocwriters
ms.date: 06/15/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: How to build custom application models for the quantum resource estimator
uid: microsoft.quantum.how-to.build-custom-applications-qre
# Customer intent: As a quantum developer, I want to know how to build custom application models for the quantum resource estimator.
--- 

# How to build custom application models in the quantum resource estimator

The Microsoft Quantum resource estimator has default application support for several quantum programming frameworks, such as Q# and Cirq. The parameters for these supported application types are predefined by the resource estimator. The resource estimator also lets you build custom applications for when you need finer control over the application parameters.

For instructions on how to install and use the resource estimator in the Microsoft Quantum Development Kit (QDK), see [How to install and use the Microsoft Quantum resource estimator](xref:microsoft.quantum.quickstart.install-use-qre).

> [!WARNING]
> The resource estimator in the QDK extension for VS Code will be deprecated soon. Use the `qdk.qre` Python module to perform resource estimation.

## Custom application model parameters

To build your own applications, use the `Application` subclass. Custom application models consist of two types of parameters:

| Parameter type      | Description                                                                                                                                                              | Examples                                                            |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| Instance parameters | Define the problem that the application solves. These parameters are fixed for a given estimation run.                                                                   | The bit-size of an adder, the key length of an encryption scheme    |
| Trace parameters    | Algorithmic hyperparameters that control how the application solves the problem. The resource estimator explores all combinations of these parameters during estimation. | Choice of adder circuit, compute-to-memory ratio, eviction strategy |

## Example custom application

As an example custom application, build a configurable adder application with the following parameters:

- **Instance parameter**: Bit-size
- **Trace parameters**: Adder implementation, compute fraction, memory-management strategy

With a fixed bit-size, the resource estimator produces application traces for each combination of adder implementation, compute fraction, and memory-management strategy. The output is the Pareto-optimal result that minimizes the trade-offs between number of qubits and total run time for the algorithm.

To build the adder in with the custom parameters in Q#, follow these steps:

1. In VS Code, open the **View** menu and select **Command Palette**.
1. Enter **Create: New Jupyter Notebook**.
1. In the first cell, import `qsharp` to use the `%%qsharp` magic cell.

    ```python
    from qdk import qsharp
    ```

1. In a new cell, run the Q# adder function code. Some of the variables, like `adder` and `strategy`, are defined in subsequent steps.

    ```qsharp
    %%qsharp

    import Std.Arithmetic.*;
    import Std.Convert.*;
    import Std.Math.*;
    import Std.ResourceEstimation.*;
    
    // An adder operation that with custom instance and trace parameters for resource estimation
    operation Adder(n : Int, adder: (Qubit[], Qubit[]) => Unit, computeFraction: Double, strategy: Int) : Unit {
        use a = Qubit[n];
        use b = Qubit[n];
    
        if computeFraction > 0.0 {
            // Enables an automatic memory/compute architecture with a fixed number of compute qubits
            // (computed as a fraction of the total number of qubits).  The strategy controls how
            // compute qubits are deallocated if free compute qubits are needed (either least recently
            // used or least frequently used).
            EnableMemoryComputeArchitecture(Ceiling(computeFraction * IntAsDouble(n)), strategy);
        }
    
        // Run the adder
        adder(a, b);
    
        // Reset all qubits (if code is used in simulation)
        ResetAll(a + b);
    }
    
    // Re-export adders and strategies to use in Python, together with strings to display the results
    function CGAdder(): ((Qubit[], Qubit[]) => Unit, String) { (RippleCarryCGIncByLE, "CG") }
    function TTKAdder(): ((Qubit[], Qubit[]) => Unit, String) { (RippleCarryTTKIncByLE, "TTK") }
    function LRU(): (Int, String) { (LeastRecentlyUsed(), "LRU") }
    function LFU(): (Int, String) { (LeastFrequentlyUsed(), "LFU") }
    ```

1. Define the trace parameters as a `dataclass` with `kw_only=True` because the resource estimator treats only keyword-only fields as variable trace parameters. Other fields are fixed during estimation.

    ```python
    from dataclasses import dataclass, field
    from typing import Any
    from qdk import code
    
    @dataclass(kw_only=True)
    class AdderParameters:
        adder: tuple[Any, str] = field(default = code.CGAdder(), metadata={"domain": [code.CGAdder(), code.TTKAdder()]})
        compute_fraction: float = field(default=1.0, metadata={"domain": [0.5, 1.0, 1.5, 2.0]})
        strategy: tuple[int, str] = field(default=code.LRU(), metadata={"domain": [code.LRU(), code.LFU()]})
    ```

    You need to specify a `"domain"` in each keyword's metadata dictionary because the domain tells the resource estimator what trace values to explore during estimation. You also need to specify a default value from the list of domain values for each parameter. The resource estimator evaluates the following trace parameters for the adder program:

    | Parameter          | Description                                                   | Values                                                                                 |
    |--------------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------|
    | `adder`            | Adder implementation                                          | Craig Gidney (CG) ripple-carry adder, Takahashi–Tani–Kunihiro (TTK) ripple-carry adder |
    | `compute_fraction` | Ratio of qubits allocated to active computation versus memory | 0.5, 1.0, 1.5, 2.0                                                                     |
    | `strategy`         | Eviction policy when compute capacity is exceeded             | Least Recently Used (LRU), Least Frequently Used (LFU)                                 |

1. To bind the trace parameter types, set `Application[AdderParameters]` as a subclass to `Adder` with the fixed instance parameters. Define instance parameters as regular (non-keyword) dataclass fields. In this case, `bitsize` is the only instance parameter.

    ```python
    from qdk.qre import Application
    from qdk.qre.interop import trace_from_entry_expr
    from qdk.qre.property_keys import custom_properties
    
    # Property keys are integers; we can use the custom_properties function to
    # define custom properties that do not conflict with existing properties.
    ADDER, COMPUTE_FRACTION, STRATEGY = custom_properties(3)
    
    @dataclass
    class Adder(Application[AdderParameters]):
        bitsize: int
    
        def __post_init__(self):
            # Disable parallel trace generation since passing the Q# adder operations is not thread-safe.
            self.disable_parallel_traces()
    
        def get_trace(self, parameters: AdderParameters):
            # obtain the adder function and its name
            adder_fn, adder_name = parameters.adder
            # obtain the memory/compute strategy and its name
            strategy, strategy_name = parameters.strategy
            # generate a trace from the Q# entry point with the specified parameters
            trace = trace_from_entry_expr(code.Adder, self.bitsize, adder_fn, parameters.compute_fraction, strategy)
    
            # Set trace properties for later analysis and display
            trace.set_property(ADDER, adder_name)
            trace.set_property(COMPUTE_FRACTION, parameters.compute_fraction)
            trace.set_property(STRATEGY, strategy_name)
    
            return trace
    ```

    The `get_trace` builds an application trace for every combination of variable trace parameter value, with fixed instance parameter values for each trace. The `set_property` method sets custom metadata that you can use to filter estimation results.

1. Build an architecture model and physical instruction set (ISA) model for quantum error correction (QEC) and factory distillation protocol. For this example, use a gate-based hardware model and an ISA model that includes a 2D yoked surface code to account for memory qubits.

    ```python
    from qdk.qre.models import GateBased, RoundBasedFactory, SurfaceCode, TwoDimensionalYokedSurfaceCode
    
    # Define the target architecture: gate-based with specified timing (ns)
    arch = GateBased(gate_time=100, measurement_time=500)
    
    # Explore surface code distances × round-based magic state factories x 2D yoked surface code distances
    isa_query = SurfaceCode.q() * RoundBasedFactory.q() * TwoDimensionalYokedSurfaceCode.q(source=SurfaceCode.q())
    ```

1. Run the resource estimator and add custom results columns.

    ```python
    from qdk.qre import estimate
    
    results = estimate(Adder(64), arch, isa_query, max_error=0.01, name="Configurable adder")
    
    # Add results columns using default resource estimator functions
    results.add_factory_summary_column()
    results.add_qubit_partition_column()
    
    # Add results columns for custom application parameters
    results.add_property_column(ADDER, "adder")
    results.add_property_column(COMPUTE_FRACTION, "compute_fraction")
    results.add_property_column(STRATEGY, "strategy")
    
    results.as_frame()
    ```

1. Plot the Pareto frontier estimation results.

    ```python
    results.plot()
    ```

For more information on how to access results from the resource estimator, see [How to work with results from the quantum resource estimator](xref:microsoft.quantum.how-to.access-customize-results-qre).

## Related content

- [What is the Microsoft Quantum resource estimator?](xref:microsoft.quantum.overview.intro-resource-estimator)
- [How to build supported application models in the quantum resource estimator](xref:microsoft.quantum.how-to.build-supported-applications-qre)
