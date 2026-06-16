---
author: azure-quantum-content
description: Learn how to build hardware architecture models for the quantum resource estimator.
ms.author: quantumdocwriters
ms.date: 05/28/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: How to build hardware architecture models for the quantum resource estimator
uid: microsoft.quantum.how-to.build-architectures-qre
# Customer intent: As a quantum developer, I want to know how to build hardware architecture models in the quantum resource estimator.
--- 

# How to build hardware architecture models in the quantum resource estimator

The Microsoft Quantum resource estimator takes a hardware architecture model as one of its inputs to estimate the resources needed to run a program on a quantum computer. The architecture model describes the physical hardware characteristics of the computer. The resource estimator includes default hardware models and lets you build custom models.

## Default architecture models

The quantum resource estimator provides three default architecture models:

- The `GateBased` class for general qubits with typical gate-based devices
- The `NeutralAtom` class for neutral atom qubit devices
- The `Majorana` class for Majorana qubits

The parameters for the default models apply to the entire architecture. For example, when you set a gate time, that time applies to all gates in the application. If you want different times for different types of gates, you need to build a custom architecture model.

### Create a gate-based architecture

To build a default gate-based architecture model, use the `GateBased` class. The default gate-based model requires four parameters:

| Parameter             | Units       | Default value        | Description                                                  |
|-----------------------|-------------|----------------------|--------------------------------------------------------------|
| `error_rate`          | Unitless    | $10^{-4}$            | Probability that an error occurs after a gate or measurement |
| `gate_time`           | Nanoseconds | None                 | Time it takes to apply a single-qubit gate                   |
| `measurement_time`    | Nanoseconds | None                 | Time it takes to measure a qubit's state                     |
| `two_qubit_gate_time` | Nanoseconds | Value of `gate_time` | Time it takes to apply a two-qubit gate                      |

The following code builds a gate-based architecture model with 200 ns gate times and 500 ns measurement times, and an overall error rate of $10^{-5}$:

```python
from qdk.qre.models import GateBased

gate_arch = GateBased(error_rate=1e-5, gate_time=200, measurement_time=500)
```

To view the properties of all the supported operations in the default gate-based architecture, run the following code:

```python
gate_arch.provided_isa(gate_arch.context()).as_frame()
```

Each gate and measurement operation has the following default parameters:

| Parameter  | Description                                                         |
|------------|---------------------------------------------------------------------|
| `encoding` | Specifies whether the operation acts on physical or logical qubits  |
| `arity`    | Number of inputs that the operation acts on                         |
| `space`    | Number of physical qubits that the operation acts on                |
| `time`     | The time in nanoseconds that it takes for the operation to complete |
| `error`    | The probability that an error occurs after the operation            |

### Create a neutral atom device architecture

To build a default neutral atom device architecture model, use the `NeutralAtom` class. This model incorporates the physical characteristic of neutral atom devices, such as qubit spacing, qubit movement, and a specific gate set. The default neutral atom model requires ten parameters. For more information, see the [API reference](/python/qdk/qdk.qre.models.qubits.neutralatom).

The following code builds a neutral atom architecture model with 5,000 ns measurement times, 5 μm atom spacing, and default values for the other parameters:

```python
from qdk.qre.models import NeutralAtom

atom_arch = NeutralAtom(measurement_time=5000, atom_spacing=5)
```

To view the properties of all the supported operations in the default neutral atom architecture, run the following code:

```python
atom_arch.provided_isa(gate_arch.context()).as_frame()
```

### Create a Majorana architecture

To build a default Majorana qubit architecture model, use the `Majorana` class. The default Majorana model takes an error rate as the only input. All operation and measurement times are fixed at 1,000 ns.

The following code builds a default Majorana architecture model with an overall error rate of $10^{-6}$:

```python
from qdk.qre.models import Majorana

maj_arch = Majorana(error_rate=1e-6)
```

To view the properties of all the supported operations in the default Majorana architecture, run the following code:

```python
maj_arch.provided_isa(maj_arch.context()).as_frame()
```

## Build custom architecture models

An architecture model defines the physical operations that the hardware of a quantum computer can perform, with times and error rates for each operation. The default `GateBased` and `Majorana` models have fixed operations and times. The resource estimator lets you build custom architecture models where you choose the set operations, and can set different times and error rates for each operation.

To create a custom architecture model, use the `Architecture` subclass and define its `provided_isa` method with the `ISAContext` parameter. For example, build a model where two-qubit gates have higher error rates and longer operation times than single-qubit gates, and measurement operations have a different time and error rate than gate operations.

The following code builds a configurable model with physical qubit operations called `ParameterizedArchitecture`:

```python
from dataclasses import KW_ONLY, dataclass
from qdk.qre import Architecture, ISAContext, ISA
from qdk.qre.instruction_ids import H, S, S_DAG, T, T_DAG, CNOT, CZ, MEAS_X, MEAS_Y, MEAS_Z

@dataclass
class ParameterizedArchitecture(Architecture):
    """
    A configurable architecture with separate timing and error parameters for
    single-qubit gates, two-qubit gates, and measurements.
    """

    _: KW_ONLY
    single_qubit_gate_time: int
    two_qubit_gate_time: int
    measurement_time: int
    single_qubit_error_rate: float
    two_qubit_error_rate: float
    measurement_error_rate: float

    def provided_isa(self, ctx: ISAContext) -> ISA:
        instructions = []

        # Single-qubit gates: Clifford gates and T gates
        for gate_id in [H, S, S_DAG, T, T_DAG]:
            instructions.append(
                ctx.add_instruction(
                    gate_id,
                    encoding=PHYSICAL,
                    arity=1,
                    time=self.single_qubit_gate_time,
                    error_rate=self.single_qubit_error_rate,
                )
            )

        # Measurements
        for meas_id in [MEAS_X, MEAS_Y, MEAS_Z]:
            instructions.append(
                ctx.add_instruction(
                    meas_id,
                    encoding=PHYSICAL,
                    arity=1,
                    time=self.measurement_time,
                    error_rate=self.measurement_error_rate,
                )
            )

        # Two-qubit entangling gates
        for gate_id in [CNOT, CZ]:
            instructions.append(
                ctx.add_instruction(
                    gate_id,
                    encoding=PHYSICAL,
                    arity=2,
                    time=self.two_qubit_gate_time,
                    error_rate=self.two_qubit_error_rate,
                )
            )

        return ctx.make_isa(*instructions)
```

The `add_instruction` method from `ISAContext` lets you define physical hardware characteristics, such as gate type, qubit encoding, and qubit arity. 

To use the custom model, call `ParameterizedArchitecture` and set values for the custom parameters. For example, the following model describes hardware with fast but noisy operations:

```python
fast_noisy = ParameterizedArchitecture(
    single_qubit_gate_time=50,
    two_qubit_gate_time=100,
    measurement_time=200,
    single_qubit_error_rate=1e-4,
    two_qubit_error_rate=5e-4,
    measurement_error_rate=5e-4,
)

# Inspect the physical ISA provided by the fast-but-noisy architecture
fast_noisy.provided_isa(fast_noisy.context()).as_frame()
```

## Run estimates for custom hardware architectures

To run an estimate on this model, pass the `fast_noisy` model to the `estimate` function as the architecture parameter along with an application model and an error correction model.

1. Import the necessary modules and objects.

    ```python
    from qdk import qsharp
    from qdk.qre import estimate, plot_estimates
    from qdk.qre.application import QSharpApplication
    from qdk.qre.models import SurfaceCode, RoundBasedFactory
    ```

1. Build an application model. For example, write an 8-bit adder program in Q# with single-qubit rotations.

    ```qsharp
    %%qsharp
    
    import Std.Arithmetic.*;
    import Std.Math.*;
    import Std.Convert.*;
    
    /// An 8-bit adder with single-qubit rotations.
    /// The rotations introduce T gates via synthesis, which exercises
    /// the magic state factory during resource estimation.
    operation AdderWithRotations() : Unit {
        use a = Qubit[8];
        use b = Qubit[8];
        for i in 0..7 {
            Ry(PI() / IntAsDouble(i + 2), a[i]);
        }
        RippleCarryCGIncByLE(a, b);
    }
    ```

1. Convert the Q# program into an application model.

    ```python
    from qdk import code
    
    app = QSharpApplication(code.AdderWithRotations)
    ```

1. Build an error correction and factory distillation model. For example, use a surface error correction code and round-based factory distillation.

    ```python
    isa_query = SurfaceCode.q() * RoundBasedFactory.q()
    ```

1. To run an estimate, pass the application model, architecture model, and error correction model to the `estimate` function. Set a 1% maximum error rate.

    ```python
    result = estimate(app, fast_noisy, isa_query, max_error=0.01)
    
    result.plot(figsize=(8, 5))
    ```

1. To compare estimates for different custom architecture parameter sets, build a list of estimates and plot the results. For example, compare the `fast_noisy` model to a `slow_clean` model that has longer operation times but less noise. Set the same maximum error rate for each estimate.

    ```python
    slow_clean = ParameterizedArchitecture(
        single_qubit_gate_time=500,
        two_qubit_gate_time=1000,
        measurement_time=1000,
        single_qubit_error_rate=1e-6,
        two_qubit_error_rate=5e-6,
        measurement_error_rate=1e-5,
    )
    
    results = [
        estimate(app, fast_noisy, isa_query, max_error=0.01, name="Fast but noisy"),
        estimate(app, slow_clean, isa_query, max_error=0.01, name="Slow but clean")
    ]
    
    plot_estimates(results, figsize=(8, 5), runtime_unit="ms")
    ```

## Related content

- [How to build custom application models in the quantum resource estimator](xref:microsoft.quantum.how-to.build-custom-applications-qre)
- [How to build error correction models in the quantum resource estimator](xref:microsoft.quantum.how-to.build-error-correction-models-qre)
- [How to work with results from the quantum resource estimator](xref:microsoft.quantum.how-to.access-customize-results-qre)
