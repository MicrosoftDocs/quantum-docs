---
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 01/13/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites

For installation details, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extensions installed.
- The `qdk` Python package with the optional `qiskit` and `jupyter` extras.

    ```cmd
    python pip install "qdk[qiskit,widgets]"
    ```

    > [!IMPORTANT]
    > Ensure that you have the latest version of Qiskit. For more information, see [Update the azure-quantum Python package](xref:microsoft.quantum.update-qdk#update-the-azure-quantum-python-packages).

## Run a basic circuit

In VS Code, open a new Python file to define and run a basic circuit with the built-in sparse simulator from the `qsharp` package.  

```python
# load the required imports 
from qdk import qsharp
from qsharp.interop.qiskit import QSharpBackend
from qiskit.circuit.random import random_circuit

# define and display the circuit
circuit = random_circuit(2, 2, measure=True)
print(circuit)

# run the circuit using the built-in sparse simulator
backend = QSharpBackend()
job = backend.run(circuit)
counts = job.result().get_counts()

print(counts)
```

To run the program, select the Run icon in the upper right, and select **Run Python file**. The output displays in a new terminal window.

```html
                  ┌─────────────────────────┐┌─┐
q_0: ─■───────────┤0                        ├┤M├───
      │P(0.79983) │  (XX-YY)(1.9337,1.7385) │└╥┘┌─┐
q_1: ─■───────────┤1                        ├─╫─┤M├
                  └─────────────────────────┘ ║ └╥┘
c: 2/═════════════════════════════════════════╩══╩═
                                              0  1
{'11': 680, '00': 344}
```

## Generate QIR for the circuit

From that same circuit, you can generate QIR that's used to run on quantum hardware.

> [!NOTE]
> To generate QIR, all registers must be measured into. If there are any unused registers, then an error is raised. Additionally, you get an error when you attempt to generate QIR with an `Unrestricted` target profile. The `Unrestricted` profile is only valid for simulation. You must use `TargetProfile.Base`, `TargetProfile.Adaptive_RI`, or `TargetProfile.Adaptive_RIF`. You can override the `target_profile` in the `backend.qir(...)` call to switch profiles.

1. Import `QSharpError` and `TargetProfile`

    ```python
    from qdk.qsharp import QSharpError, TargetProfile
    ```

1. To generate QIR, modify the output:

    ```python
        print(backend.qir(circuit, target_profile=TargetProfile.Adaptive_RI))
    ```

Your code should now look like this:

```python
# load the required imports 
from qdk import qsharp
from qsharp import QSharpError, TargetProfile
from qsharp.interop.qiskit import QSharpBackend
from qiskit.circuit.random import random_circuit

# define and display the circuit
circuit = random_circuit(2, 2, measure=True)
print(circuit)

# generate QIR for the circuit
print(backend.qir(circuit, target_profile=TargetProfile.Adaptive_RI))
```

Your code's output should look like this:

```html
     ┌────────────┐             ┌─┐   
q_0: ┤ Rx(2.7195) ├─■───────────┤M├───
     └──┬─────┬───┘ │U1(5.5924) └╥┘┌─┐
q_1: ───┤ Tdg ├─────■────────────╫─┤M├
        └─────┘                  ║ └╥┘
c: 2/════════════════════════════╩══╩═
                                 0  1
%Result = type opaque
%Qubit = type opaque

define void @ENTRYPOINT__main() #0 {
block_0:
  call void @__quantum__qis__rx__body(double 2.7194945105768586, %Qubit* inttoptr (i64 0 to %Qubit*))
  call void @__quantum__qis__rz__body(double 2.796204066686262, %Qubit* inttoptr (i64 0 to %Qubit*))
  call void @__quantum__qis__t__adj(%Qubit* inttoptr (i64 1 to %Qubit*))
  call void @__quantum__qis__cx__body(%Qubit* inttoptr (i64 0 to %Qubit*), %Qubit* inttoptr (i64 1 to %Qubit*))
  call void @__quantum__qis__rz__body(double -2.796204066686262, %Qubit* inttoptr (i64 1 to %Qubit*))
  call void @__quantum__qis__cx__body(%Qubit* inttoptr (i64 0 to %Qubit*), %Qubit* inttoptr (i64 1 to %Qubit*))
  call void @__quantum__qis__rz__body(double 2.796204066686262, %Qubit* inttoptr (i64 1 to %Qubit*))
  call void @__quantum__qis__m__body(%Qubit* inttoptr (i64 0 to %Qubit*), %Result* inttoptr (i64 0 to %Result*))
  call void @__quantum__qis__m__body(%Qubit* inttoptr (i64 1 to %Qubit*), %Result* inttoptr (i64 1 to %Result*))
  call void @__quantum__rt__array_record_output(i64 2, i8* null)
  call void @__quantum__rt__result_record_output(%Result* inttoptr (i64 1 to %Result*), i8* null)
  call void @__quantum__rt__result_record_output(%Result* inttoptr (i64 0 to %Result*), i8* null)
  ret void
}

declare void @__quantum__qis__rx__body(double, %Qubit*)

declare void @__quantum__qis__rz__body(double, %Qubit*)

declare void @__quantum__qis__t__adj(%Qubit*)

declare void @__quantum__qis__cx__body(%Qubit*, %Qubit*)

declare void @__quantum__qis__m__body(%Qubit*, %Result*) #1

declare void @__quantum__rt__array_record_output(i64, i8*)

declare void @__quantum__rt__result_record_output(%Result*, i8*)

attributes #0 = { "entry_point" "output_labeling_schema" "qir_profiles"="adaptive_profile" "required_num_qubits"="2" "required_num_results"="2" }
attributes #1 = { "irreversible" }

; module flags

!llvm.module.flags = !{!0, !1, !2, !3, !4, !5, !6, !7, !8, !9, !10}

!0 = !{i32 1, !"qir_major_version", i32 1}
!1 = !{i32 7, !"qir_minor_version", i32 0}
!2 = !{i32 1, !"dynamic_qubit_management", i1 false}
!3 = !{i32 1, !"dynamic_result_management", i1 false}
!4 = !{i32 1, !"classical_ints", i1 true}
!5 = !{i32 1, !"qubit_resetting", i1 true}
!6 = !{i32 1, !"classical_floats", i1 false}
!7 = !{i32 1, !"backwards_branching", i1 false}
!8 = !{i32 1, !"classical_fixed_points", i1 false}
!9 = !{i32 1, !"user_functions", i1 false}
!10 = !{i32 1, !"multiple_target_branching", i1 false}
```

Not all programs can run on all hardware. Here, if you try to target the `Base` profile, then you get detailed errors about which parts of the program aren't supported.

```python
try:
    backend.qir(qc, target_profile=TargetProfile.Base)
except QSharpError as e:
    print(e)
```
