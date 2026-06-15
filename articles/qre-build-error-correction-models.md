---
author: azure-quantum-content
description: Learn how to build error correction models with custom QEC codes and magic state factory models in the quantum resource estimator.
ms.author: quantumdocwriters
ms.date: 05/28/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: How to build error correction models in the quantum resource estimator
uid: microsoft.quantum.how-to.build-error-correction-models-qre
# Customer intent: As a quantum developer, I want to know how to build error correction models with custom QEC codes and magic state factory models in the quantum resource estimator
--- 

# How to build error correction models in the quantum resource estimator

The Microsoft Quantum resource estimator takes a quantum error correction (QEC) code transform and magic state factory transform model as one of its core inputs. The QEC and factory transforms determine how the physical instruction set (ISA) from the hardware architecture model converts to a logical instruction set for error correction.

From the QEC code model and magic state factory model, you build an ISA query that you pass to the resource estimator. The ISA query defines the combinations of QEC codes and magic state factories that the resource estimator explores. Each combination of QEC code and magic state factory determines how the resource estimator converts the physical ISA into a logical ISA. In this article, you learn how to build ISA queries from the default QEC code models and default magic state factory models, and how to build your own custom models.

For instructions on how to install and use the resource estimator in the Microsoft Quantum Development Kit (QDK), see [How to install and use the Microsoft Quantum resource estimator](xref:microsoft.quantum.quickstart.install-use-qre).

> [!WARNING]
> The resource estimator in the QDK extension for VS Code will be deprecated soon. Use the `qdk.qre` Python module to perform resource estimation.

## Build ISA queries from the default QEC code and magic state factory models

The quantum resource estimator includes four default QEC code models and three default magic state factory models.

### Default QEC code models

The quantum resource estimator includes the following default QEC models:

| QEC model                                                                                       | Description                                                                                    |
|-------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| [SurfaceCode](/python/qdk/qdk.qre.models.qec.surfacecode)                                       | Gate-based rotated surface code                                                                |
| [SurfaceCodeLowMove](/python/qdk/qdk.qre.models.qec.surfacecodelowmove)                         | Gate-based rotated surface code for neutral atom hardware that has mobile ancilla qubits       |
| [OneDimensionalYokedSurfaceCode](/python/qdk/qdk.qre.models.qec.onedimensionalyokedsurfacecode) | 1D Yoked surface code that provides generic memory instructions                                |
| [TwoDimensionalYokedSurfaceCode](/python/qdk/qdk.qre.models.qec.twodimensionalyokedsurfacecode) | 2D Yoked surface code that provides generic memory instructions                                |
| [ThreeAux](/python/qdk/qdk.qre.models.qec.threeaux)                                             | Pairwise measurement-based surface code with three auxiliary qubits per stabilizer measurement |

### Default magic state factory models

The quantum resource estimator includes the following default magic state factory models:

| Magic state factory model                                                   | Description                                                                                     |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| [RoundBasedFactory](/python/qdk/qdk.qre.models.factories.roundbasedfactory) | Magic state factory that uses round-based distillation pipelines to produce T gate instructions |
| [Litinski19Factory](/python/qdk/qdk.qre.models.factories.litinski19factory) | T and CCZ factories based on the paper [arXiv:1905.06903](https://arxiv.org/abs/1905.06903)     |
| [GSJ24CCXFactory](/python/qdk/qdk.qre.models.factories.gsj24ccxfactory)     | 8T-to-CCZ factories based on the paper [arXiv:2409.17595](https://arxiv.org/abs/2409.17595)     |
| [GSJ24Factory](/python/qdk/qdk.qre.models.factories.gsj24factory)           | Magic state cultivation based on the paper [arXiv:2409.17595](https://arxiv.org/abs/2409.17595) |
| [MagicUpToClifford](/python/qdk/qdk.qre.models.factories.magicuptoclifford) | ISA transform that adds Clifford equivalent representations of magic states                     |

### Build an ISA query from default models

To build an ISA query, combine a QEC model with a magic state factory model using either the `+` or `*` operator. For example, build an ISA query from the gate-based surface code QEC model and the round-based magic state factory model.

```python
from qdk.qre.models import SurfaceCode, RoundBasedFactory

isa_query = SurfaceCode.q() * RoundBasedFactory.q()
```

## Build ISA queries from custom QEC code and magic state factory models

The quantum resource estimator lets you build custom QEC and magic state factory models. These custom models use the `ISATransform` subclass to convert physical qubit instructions into logical qubit instructions.

To build these custom models, use the `ISATransform` subclass and define two methods:

- `required_isa`: A static method that defines what operations to use from the architecture model's ISA. This method can't reference fields, such as `error_correction_threshold`. Instead, use `ConstraintBound` with comparison operators to set limits or ranges on values.
- `provided_isa`: Computes logical instruction properties from physical instructions to produce one or more logical ISAs. This method references the custom fields in your model.

### Build a custom QEC model

A QEC transform encodes qubits into an error correction code based on these main parameters:

| QEC code parameter  | Description                                                   | Depends on                                                 |
|---------------------|---------------------------------------------------------------|------------------------------------------------------------|
| Space               | The number of physical qubits per logical qubits              | Code distance                                              |
| Time                | The time it takes to complete one logical operation           | Syndrome extraction cycles                                 |
| Error               | The probability that an error occurs from a logical operation | Physical error rate, maximum error rate, and code distance |

Custom QEC transforms need to define values for these parameters. For example, the following code builds a custom QEC model called `GenericQEC` that converts physical H gate, CNOT gate, and measurement instructions into a logical lattice surgery instruction set.

```python
from dataclasses import KW_ONLY, dataclass, field
from typing import Generator
from qdk.qre import (
    ISAContext,
    ConstraintBound,
    ISA,
    ISARequirements,
    ISATransform,
    LOGICAL,
    constraint,
    linear_function
)
from qdk.qre.instruction_ids import H, CNOT, MEAS_Z, LATTICE_SURGERY

@dataclass
class GenericQEC(ISATransform):
    """
    A configurable QEC code model with tunable threshold, overhead,
    and error suppression.

    This transform consumes physical H, CNOT, and MEAS_Z instructions and
    produces a logical LATTICE_SURGERY instruction. The resource formulas
    are parameterized so you can model different QEC code families.

    The logical error rate follows:

        error = crossing_prefactor × (p_physical / threshold) ^ ⌊(d+1)/2⌋

    Space per data qubit is:

        qubits_per_data_qubit × d²
    """

    crossing_prefactor: float = 0.03
    error_correction_threshold: float = 0.01
    qubits_per_data_qubit: int = 2
    syndrome_extraction_depth: int = 4
    _: KW_ONLY
    distance: int = field(default=3, metadata={"domain": range(3, 22, 2)})

    @staticmethod
    def required_isa() -> ISARequirements:
        # required_isa is static, so we cannot reference instance fields here.
        # Instead, we use ConstraintBound to express fixed constraints on the
        # implementation ISA. ConstraintBound supports .lt(), .le(), .eq(),
        # .gt(), and .ge() comparisons.
        return ISARequirements(
            constraint(H, error_rate=ConstraintBound.lt(0.01)),
            constraint(CNOT, arity=2, error_rate=ConstraintBound.lt(0.01)),
            constraint(MEAS_Z, error_rate=ConstraintBound.lt(0.01)),
        )

    def provided_isa(
        self, impl_isa: ISA, ctx: ISAContext
    ) -> Generator[ISA, None, None]:
        cnot = impl_isa[CNOT]
        h = impl_isa[H]
        meas_z = impl_isa[MEAS_Z]

        # Physical error rate is the worst case across all required gates
        physical_error_rate = max(
            cnot.expect_error_rate(),
            h.expect_error_rate(),
            meas_z.expect_error_rate(),
        )

        d = self.distance

        # Space: physical qubits per data qubit, scaled by distance².
        #
        # Because LATTICE_SURGERY has variable arity (it can operate on any
        # number of logical qubits), space and error_rate must be provided as
        # functions of arity rather than as fixed numbers. The estimator
        # provides several helpers for this:
        #
        #   linear_function(slope)          → f(n) = slope × n
        #   constant_function(value)        → f(n) = value
        #   block_linear_function(k, s, o)  → f(n) = s × ⌈n/k⌉ + o
        #   generic_function(callable)      → f(n) = callable(n)
        #
        # For QEC codes, resources scale linearly with the number of logical
        # qubits, so linear_function is the natural choice.
        space = linear_function(self.qubits_per_data_qubit * d**2)

        # Time: syndrome extraction cycle × code distance
        code_cycle_time = (
            h.expect_time()
            + self.syndrome_extraction_depth * cnot.expect_time()
            + meas_z.expect_time()
        )
        time = code_cycle_time * d

        # Error: exponential suppression below threshold
        logical_error = self.crossing_prefactor * (
            (physical_error_rate / self.error_correction_threshold)
            ** ((d + 1) // 2)
        )
        error = linear_function(logical_error)

        yield ctx.make_isa(
            ctx.add_instruction(
                LATTICE_SURGERY,
                encoding=LOGICAL,
                arity=None,
                space=space,
                time=time,
                error_rate=error,
                # transform=self records that this instruction was produced by
                # this QEC transform instance, and source=[...] records which
                # physical instructions it was derived from. Together, they
                # form the provenance chain that you can inspect in the
                # estimation results (see notebook 2).
                transform=self,
                source=[cnot, h, meas_z],
                # Extra keyword arguments (like distance) are stored as
                # properties on the instruction.  This lets you retrieve the
                # code distance used for each Pareto-optimal result when
                # analyzing the estimation output. Further, the property can be
                # required and read by a parent ISATransform to create new
                # logical instructions based on this one.
                distance=d,
            ),
        )
```

You can call `GenericQEC` with the default parameter values, or you can set other values when you call the model. For example, create a QEC model that has a high error threshold and low qubit overhead.

```python
custom_qec = GenericQEC.q(
    crossing_prefactor=0.01,
    error_correction_threshold=0.03,
    qubits_per_data_qubit=1,
)
```

### Build a custom magic state factory model

A magic state factory model transform produces high-fidelity magic states from low-level physical instructions.

You can build a custom magic state factory model, or use a custom model to explore how established models behave with changes to specific parameters. For example, build a custom factory model called `ScaledLitinskiFactory` that's based on the default `Litinski19Factory` model. The custom model lets you modify the space factor for logical qubits and the number of cycles that the factory requires.

```python
from dataclasses import dataclass
from typing import Generator
from math import ceil
from qdk.qre import (
    ISAContext,
    ConstraintBound,
    ISA,
    ISARequirements,
    ISATransform,
    LOGICAL,
    constraint
)
from qdk.qre.instruction_ids import T, H, CNOT, MEAS_Z

# Reference data from Litinski (arXiv:1905.06903), Table 1.
# Assumes Clifford and T error rates at most 1e-4.
# Each tuple: (output_error_rate, space_in_physical_qubits, cycles)
_LITINSKI_TABLE = [
    (4.4e-8,    810, 18.1),
    (1.5e-9,    762, 36.2),
    (9.3e-10,  1150, 18.1),
    (1.9e-11,  2070, 30.0),
    (2.4e-15, 16400, 90.3),
    (6.3e-25, 18600, 67.8),
]

@dataclass
class ScaledLitinskiFactory(ISATransform):
    """
    A factory transform based on the Litinski (2019) distillation protocols,
    with configurable scaling factors for space and cycle costs.

    The base data is taken directly from Table 1 in arXiv:1905.06903.
    Each entry specifies a distillation protocol's output error rate, space
    footprint (in physical qubits), and time (in syndrome extraction cycles).
    The space already includes the QEC overhead within the factory itself.

    Scaling factors let you explore hypothetical improvements:

    - ``space_factor=0.5`` models a factory that uses half the qubits.
    - ``cycle_factor=0.5`` models a factory that runs twice as fast.

    Note:
        The error rates are kept fixed when scaling.  In practice, changing
        space or cycles would affect error rates too, but modelling that
        relationship requires protocol-specific analysis.
    """

    space_factor: float = 1.0
    cycle_factor: float = 1.0

    @staticmethod
    def required_isa() -> ISARequirements:
        return ISARequirements(
            constraint(T, error_rate=ConstraintBound.le(1e-4)),
            constraint(H, error_rate=ConstraintBound.le(1e-4)),
            constraint(CNOT, arity=2, error_rate=ConstraintBound.le(1e-4)),
            constraint(MEAS_Z, error_rate=ConstraintBound.le(1e-4)),
        )

    def provided_isa(
        self, impl_isa: ISA, ctx: ISAContext
    ) -> Generator[ISA, None, None]:
        cnot = impl_isa[CNOT]
        h = impl_isa[H]
        meas_z = impl_isa[MEAS_Z]
        t = impl_isa[T]

        # Syndrome extraction time from the physical ISA
        syndrome_extraction_time = (
            4 * cnot.expect_time() + h.expect_time() + meas_z.expect_time()
        )

        for error_rate, base_space, base_cycles in _LITINSKI_TABLE:
            # Apply scaling factors to space and time
            space = ceil(base_space * self.space_factor)
            time = ceil(syndrome_extraction_time * base_cycles * self.cycle_factor)

            yield ctx.make_isa(
                ctx.add_instruction(
                    T,
                    encoding=LOGICAL,
                    arity=1,
                    space=space,
                    time=time,
                    error_rate=error_rate,
                    transform=self,
                    source=[cnot, h, meas_z, t],
                ),
            )
```

With the custom `ScaledLitinskiFactory` model, you can lower `space_factor` to explore factories that use fewer physical qubits or lower `cycle_factory` to explore factories that need fewer cycles for distillation. For example, create a model that uses half the physical qubits as `LitinskiFactory`, and another model that needs half as many cycles.

```python
compact_factory = ScaledLitinskiFactory.q(space_factor=0.5)
fast_factory = ScaledLitinskiFactory.q(cycle_factor=0.5)
```

### Build an ISA query from custom models

To build an ISA query from custom QEC and distillation models, set the custom parameter values and combine the models using either the `+` or `*` operator. For example, build an ISA query from the custom QEC model that you already built. Set the `GenericQEC` model to have a higher error threshold and set the `ScaledLitinskiFactory` model to require fewer cycles.

```python
custom_qec = GenericQEC.q(error_correction_threshold=0.02)
custom_factory = ScaledLitinskiFactory.q(cycle_factor=0.75)

custom_query = custom_qec * custom_factory
```

## Run estimates for custom QEC and distillation models

To run estimates with your custom models, pass `custom_query` to the `estimate` function as the ISA query parameter along with an application model and a hardware architecture model.

1. Import the necessary modules and objects.

    ```python
    from qdk import qsharp
    from qdk.qre.application import QSharpApplication
    from qdk.qre.models import GateBased
    from qdk.qre import estimate, plot_estimates
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

1. Build a hardware architecture model. For example, use the default gate-based model.

    ```python
    arch = GateBased(error_rate=1e-4, gate_time=100, measurement_time=500)
    ```

1. To run an estimate, pass the application model, architecture model, and custom ISA query to the `estimate` function. Set a 1% maximum error rate.

    ```python
    result = estimate(app, arch, custom_query, max_error=0.01)
        
    result.plot(figsize=(8, 5))
    ```

1. To compare estimates for different sets of QEC and magic state factory models, build a list of estimates and plot the results. For example, build a query from the default parameters of the custom models and compare that with models that have different parameters.

    ```python
    baseline = GenericQEC.q() * ScaledLitinskiFactory.q()
    high_cross = GenericQEC.q(crossing_prefactor=0.05) * ScaledLitinskiFactory.q()
    compact_factory = GenericQEC.q() * ScaledLitinskiFactory.q(space_factor=0.5)
    high_compact = GenericQEC.q(crossing_prefactor=0.05) * ScaledLitinskiFactory.q(space_factor=0.5)
    
    results = [
        estimate(app, arch, baseline, max_error=0.02, name="Baseline"),
        estimate(app, arch, high_cross, max_error=0.02, name="High crossing prefactor"),
        estimate(app, arch, compact_factory, max_error=0.02, name="Compact factory"),
        estimate(app, arch, high_compact, max_error=0.02, name="High crossing prefactor & Compact factory"),
    ]
    
    plot_estimates(results, figsize=(8, 5), runtime_unit="ms")
    ```

## Related content

- [How to build custom application models in the quantum resource estimator](xref:microsoft.quantum.how-to.build-custom-applications-qre)
- [How to build hardware architecture models in the quantum resource estimator](xref:microsoft.quantum.how-to.build-architectures-qre)
- Work with estimation results
