---
author: azure-quantum-content
description: Learn how to build application models for the quantum resource estimator for the supported quantum programming frameworks.
ms.author: quantumdocwriters
ms.date: 06/15/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: how-to
no-loc: ['Python', '$$v', target, targets]
title: How to build application models for supported quantum programming frameworks
uid: microsoft.quantum.how-to.build-supported-applications-qre
# Customer intent: As a quantum developer, I want to know what applications models are in the quantum resource estimator and the default options I have to build application models
--- 

# How to build supported application models in the quantum resource estimator

The Microsoft Quantum resource estimator takes one or more quantum programs as input and converts the programs to applications and applications traces for resource estimation. You can write programs for the resource estimator in several quantum programming languages and frameworks. This article shows how to import programs and create applications for the default supported frameworks.

For instructions on how to install and use the resource estimator in the Microsoft Quantum Development Kit (QDK), see [How to install and use the Microsoft Quantum resource estimator](xref:microsoft.quantum.quickstart.install-use-qre).

> [!WARNING]
> The resource estimator in the QDK extension for VS Code will be deprecated soon. Use the `qdk.qre` Python module to perform resource estimation.

## Build application models for supported frameworks

The resource estimator provides default tools to import quantum programs written in the following frameworks:

- Q#
- Cirq
- OpenQASM
- Quantum intermediate representation (QIR)

To build the following applications and run estimates for them, create a new Jupyter notebook in Visual Studio Code (VS Code):

1. In Visual Studio Code (VS Code), open the **View** menu and select **Command Palette**.
1. Enter **Create: New Jupyter Notebook**.

An empty Jupyter notebook opens in a new tab.

### Build a Q# application

To import a Q# program, you can either load an existing `qs` Q# file or you can write a Q# directly in Python.

To write a Q# program directly in Jupyter Notebook and load it into the resource estimator as an application, follow these steps your empty Jupyter notebook:

1. Import the `qsharp` module from the QDK Python library.

    ```python
    from qdk import qsharp
    ```

1. In a new cell, write a Q# operation that performs ripple-carry addition on two registers of qubits.

    ```qsharp
    %%qsharp

    import Std.Arithmetic.*;

    // Ripple-carry addition on two n-qubit registers
    operation Program(n : Int) : Unit {
        use a = Qubit[n];
        use b = Qubit[n];

        RippleCarryCGIncByLE(a, b);
    }
    ```

1. To create an application model, wrap the compiled program in `QSharpApplication` and pass the qubit register size as a runtime argument.

    ```python
    from qdk import code
    from qdk.qre.application import QSharpApplication

    # Wrap the compiled Q# entry point with a register size of 10 qubits
    qsharp_app = QSharpApplication(code.Program, args=(10,))
    ```

1. The application contains traces that the resource estimator uses to assess different configurations of application parameters. To view a summary of the ISA required to run the first trace, use the application's `enumerate_traces` method.

    ```python
    # Get the first generated application trace
    trace = next(app.enumerate_traces())

    # View the physical instruction set required to run the trace
    trace.required_isa.as_frame()
    ```

The summary shows that the trace requires a $CCX$ gate and a measurement in the $Z$ basis.

### Build a Cirq application

To build a Cirq application, import the `cirq` library to write a Cirq program, and then pass the program to `CirqApplication`. For example, use the built-in `qft` helper from `cirq` to create 10-qubit quantum Fourier transform program.

```python
import cirq
from qdk.qre.application import CirqApplication

# Build a 10-qubit QFT circuit and make it an application
circuit = cirq.Circuit(cirq.qft(*cirq.LineQubit.range(10)))
cirq_app = CirqApplication(circuit)
```

View the ISA summary for the first trace of the Cirq application:

```python
trace = next(cirq_app.enumerate_traces())
trace.required_isa.as_frame()
```

### Build an OpenQASM application

To build an OpenQASM application, pass an OpenQASM 3 source string to `OpenQASMApplication`. For example, use Qiskit to generate an OpenQASM 3 program for a 4-qubit RGQFT multiplier, and then convert the program to an application.

```python
from qdk.qre.application import OpenQASMApplication
from qiskit.circuit.library import RGQFTMultiplier
from qiskit.qasm3.exporter import Exporter

# Export a Qiskit circuit to OpenQASM 3
qasm = Exporter().dumps(RGQFTMultiplier(num_state_qubits=4))

qasm_app = OpenQASMApplication(qasm)
```

View the ISA summary for the first trace of the OpenQASM application:

```python
trace = next(qasm_app.enumerate_traces())
trace.required_isa.as_frame()
```

### Create a QIR application

QIR is an LLVM-based intermediate representation for quantum programs. Programs in most other quantum language frameworks can be compiled into QIR. To create an application from QIR, pass the QIR to `QIRApplication` as a string or bitcode.

For example, compile an OpenQASM Bell state preparation circuit into QIR, and then convert a string representation of the QIR into a resource estimator application.

```python
from qdk.openqasm import compile
from qdk.qre.application import QIRApplication

qasm_source = """
    include "stdgates.inc";
    bit[2] c;
    qubit[2] q;
    h q[0];
    cx q[0], q[1];
    c = measure q;
"""

qir = compile(qasm_source)

qir_app = QIRApplication(str(qir))
```

View the ISA summary for the first trace of the QIR application:

```python
trace = next(qir_app.enumerate_traces())
trace.required_isa.as_frame()
```

## Run resource estimations for multiple applications

The preceding code created four resource estimator applications, each from a different programming framework. With the resource estimator, you can run estimates on all four applications and compare the results. To compare estimates, the applications don't need to be from the same programming framework.

To run estimates for all four applications with the same architecture models, follow these steps:

1. Create a gate-based architecture model with a 100 ns gate time and a 500 ns measurement time.

    ```python
    from qdk.qre.models import GateBased

    arch = GateBased(gate_time=100, measurement_time=500)
    ```

1. Create and ISA query for a surface-based QEC and round-based factory distillation.

    ```python
    from qdk.qre.models import SurfaceCode, RoundBasedFactory

    isa_query = SurfaceCode.q() * RoundBasedFactory.q()
    ```

1. Run estimates for each application.

    ```python
    apps = [("Q# adder", qsharp_app), ("Cirq QFT", cirq_app), ("QIR Bell state", qir_app), ("OpenQASM multiplier", qasm_app)]
    
    estimates = []
    for name, app in apps:
        estimates.append(estimate(app, arch, isa_query, max_error=0.01, name=name))
    ```

1. Plot the Pareto frontier optimal estimates for each application.

    ```python
    from qdk.qre import plot_estimates
    
    plot_estimates(estimates)
    ```

## Custom applications

The quantum resource estimator offers the flexibility to build your own custom applications from a set of fixed program parameters and variable application parameters. For more information, see [How to build custom application models in the quantum resource estimator](xref:microsoft.quantum.how-to.build-custom-applications-qre).
