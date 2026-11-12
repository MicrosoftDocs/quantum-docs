---
title: How to debug quantum programs in the QDK
description: Learn how to debug Q# and OpenQASM programs in VS Code, and inspect quantum states with QDK dump functions.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/11/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qsharp-guide
no-loc: ["Q#", "Microsoft Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Jupyter", "Jupyter Notebook", "OpenQASM", "Python"]
ai-usage: ai-assisted
uid: microsoft.quantum.user-guide-qdk.overview.testingdebugging
# Customer intent: As a quantum developer, I want to debug my quantum programs in the QDK so that I can find and fix problems in my code.
---

# How to debug quantum programs in the QDK

Debugging helps you understand how a quantum program runs and find problems in your code. This article shows you how to debug Q# and OpenQASM programs with the Microsoft Quantum Development Kit (QDK) in Visual Studio Code (VS Code), and how to inspect quantum states with QDK dump functions in Q# and Python.

The VS Code debugger supports both Q# and OpenQASM source files. The dump-function examples in this article use Q#; the Python `dump_operation` function can also inspect a compatible OpenQASM program after you import it as a Q# callable.

To learn how to test Q# and OpenQASM programs, see [How to test quantum programs in the QDK](xref:microsoft.quantum.how-to.test-quantum-code).

## Debug programs in VS Code

Use the debugger in the QDK extension for VS Code to step through functions and operations, track local variable values, and inspect qubit states.

The following example demonstrates how to use the debugger with a Q# program. For complete information on VS Code debuggers, see [Debugging](https://code.visualstudio.com/docs/editor/debugging) on the VS Code website.

1. In VS Code, create and save a new `.qs` file with the following code:

   ```qsharp
   import Std.Arrays.*;
   import Std.Convert.*;

   operation Main() : Result {
       use qubit = Qubit();
       H(qubit);
       let result = M(qubit);
       Reset(qubit);
       return result;
   }
   ```

1. On the `H(qubit);` line, select the area to the left of the line number to set a breakpoint. A red circle marks the breakpoint.
1. In the Activity Bar, select the **Run and Debug** icon to open the **Run and Debug** view, and then select **Run and Debug** to start debugging. The Debug toolbar opens.
1. When the debugger pauses at the breakpoint, expand **Quantum State** under **Variables** in the **Run and Debug** view to inspect the qubit's initial $\ket{0}$ state.
1. Press **F11** to step into the `H` operation. The source code for the `H` operation appears. Notice that **Quantum State** changes to a superposition as you step through the `H` operation.
1. Press **F10** to step over the `M` operation. Notice that **Quantum State** resolves to either $\ket{0}$ or $\ket{1}$ after the measurement. The `result` variable is listed under **Locals**.
1. Press **F10** again to step over the `Reset` operation. Notice that **Quantum State** is reset to $\ket{0}$.

When you finish exploring the debugger, press **Shift + F5** to exit the debugger.

### Debug an OpenQASM program

You can set breakpoints and inspect qubit states while you debug an OpenQASM file.

1. In an open Q# project in VS Code, create and save a new `.qasm` file with the following code:

   ```qasm
   OPENQASM 3.0;
   include "stdgates.inc";

   qubit q;
   bit result;
   h q;
   result = measure q;
   ```

1. On the `h q;` line, select the area to the left of the line number to set a breakpoint.
1. In the code editor, select the **Debug** code lens to start debugging.
1. When the debugger pauses at the breakpoint, expand **Quantum State** in the **Variables** pane to inspect the qubit state. Press **F10** to step over `h q;` and inspect the state again.
1. Press **F5** to continue, or **Shift + F5** to stop debugging.

> [!NOTE]
> The VS Code debugger works with Q# (`.qs`) and OpenQASM (`.qasm`) files. It doesn't debug Q# cells in Jupyter Notebook.

## Inspect quantum state with QDK dump functions

The QDK provides Q# and Python functions that display information about a program's quantum state. The following `DumpMachine` and `dump_machine` examples inspect Q# programs. The Python `dump_operation` function can inspect Q# operations and compatible OpenQASM programs imported as Q# callables.

### The Q# `DumpMachine` function

The Q# `DumpMachine` function prints information about the current state of the qubit system to the console without interrupting your program.

The following example calls `DumpMachine` at two points in a Q# program and explores the output.

1. In VS Code, create and save a new `.qs` file with the following code:

   ```qsharp
   import Std.Diagnostics.*;

   operation Main() : Unit {
       use qubits = Qubit[2];
       X(qubits[1]);
       H(qubits[1]);
       DumpMachine();

       R1Frac(1, 2, qubits[0]);
       R1Frac(1, 3, qubits[1]);
       DumpMachine();
    
       ResetAll(qubits);
   }
   ```

1. Press **Ctrl + Shift + Y** to open the **Debug Console**.
1. Press **Ctrl + F5** to run your program. The following output from `DumpMachine` appears in the **Debug Console**:

   ```output
   Basis | Amplitude      | Probability | Phase
   -----------------------------------------------
    |00⟩ |  0.7071+0.0000𝑖 |    50.0000% |   0.0000
    |01⟩ | −0.7071+0.0000𝑖 |    50.0000% |  -3.1416

   Basis | Amplitude      | Probability | Phase
   -----------------------------------------------
    |00⟩ |  0.7071+0.0000𝑖 |    50.0000% |   0.0000
    |01⟩ | −0.6533−0.2706𝑖 |    50.0000% |  -2.7489
   ```

The output from `DumpMachine` shows how the state of the qubit system changes after each set of gates.

> [!NOTE]
> The output from `DumpMachine` uses big-endian ordering.

### The Python `dump_machine` function

The [`dump_machine`](/python/qdk/qdk.qsharp#qdk-qsharp-dump-machine) function is part of the `qdk.qsharp` Python module. This function returns a `StateDump` object that contains the qubit count and the sparse state amplitudes of the qubit system.

The following example uses `dump_machine` to inspect qubit states in a Jupyter notebook.

1. In VS Code, press **Ctrl + Shift + P** to open the **Command Palette**.
1. Enter **Create: New Jupyter Notebook** and press **Enter**. A new Jupyter Notebook tab opens.
1. In the first cell, copy and run the following code:

   ```python
   from qdk import qsharp 
   ```

1. Create a new code cell, then copy and run the following Q# code:

   ```qsharp
   %%qsharp

   use qubits = Qubit[2];
   X(qubits[0]);
   H(qubits[1]);
   ```

1. Create a new code cell. Copy and run the following Python code to view the qubit state at this point in the program:

   ```python
   dump = qsharp.dump_machine()
   dump
   ```
  
   The `dump_machine` function displays the following output:
  
   ```output
   Basis State
   (|𝜓₁…𝜓ₙ⟩)  Amplitude       Measurement Probability  Phase
   |10⟩       0.7071+0.0000𝑖   50.0000%                 ↑  0.0000
   |11⟩       0.7071+0.0000𝑖   50.0000%                 ↑  0.0000
   ```

1. Create a new code cell, then copy and run the following Q# code:

   ```qsharp
   %%qsharp

   R1Frac(1, 2, qubits[0]);
   R1Frac(1, 3, qubits[1]);
   ```

1. Create a new code cell. Copy and run the following Python code to view the qubit state at this point in the program:

   ```python
   dump = qsharp.dump_machine()
   dump
   ```

   The `dump_machine` function displays the following output:

   ```output
   Basis State
   (|𝜓₁…𝜓ₙ⟩)  Amplitude      Measurement Probability  Phase
   |10⟩       0.5000+0.5000𝑖  50.0000%                 ↗  0.7854
   |11⟩       0.2706+0.6533𝑖  50.0000%                 ↗  1.1781
   ```

1. To print an abbreviated version of the `dump_machine` output, create a new code cell and run the following Python code:

   ```python
   print(dump)
   ```

1. To get the total number of qubits in the system, create a new code cell and run the following Python code:

   ```python
   dump.qubit_count
   ```

1. To get the amplitudes of the $\ket{10}$ and $\ket{11}$ basis states, create a new code cell and run the following Python code:

   ```python
   print(dump[2])
   print(dump[3])
   ```

### Inspect operations with Python `dump_operation`

The `dump_operation` function is available in the `qdk.qsharp` Python module. This function takes two inputs: a Q# operation or operation definition as a string and the number of qubits that the operation uses. The output from `dump_operation` is a nested list that represents the square matrix of complex numbers that corresponds to the given quantum operation. The matrix values are in the computational basis, and each sublist represents a row of the matrix.

The following example uses `dump_operation` to display matrices for single-qubit and two-qubit operations.

1. In VS Code, press **Ctrl + Shift + P** to open the **Command Palette**.
1. Enter **Create: New Jupyter Notebook** and press **Enter**. A new Jupyter Notebook tab opens.
1. In the first cell, copy and run the following code:

   ```python
   from qdk import qsharp
   from qdk.qsharp import dump_operation
   ```

1. To display the matrix elements of a single-qubit gate, call `dump_operation` and pass 1 for the number of qubits. For example, copy and run the following Python code in a new code cell to get the matrix elements for an identity gate and a Hadamard gate:

   ```python
   res = dump_operation("qs => ()", 1)
   print("Single-qubit identity gate:\n", res)
   print()
   
   res = dump_operation("qs => H(qs[0])", 1)
   print("Single-qubit Hadamard gate:\n", res)
   ```

1. You can also call the `qsharp.eval` function and then reference the Q# operation in `dump_operation` to get the same result. For example, create a new code cell, then copy and run the following Python code to print the matrix elements for a single-qubit Hadamard gate:

   ```python
   qsharp.eval("operation SingleH(qs : Qubit[]) : Unit { H(qs[0]) }")

   res = dump_operation("SingleH", 1)
   print("Single-qubit Hadamard gate:\n", res)
   ```

1. To display the matrix elements of a two-qubit gate, call `dump_operation` and pass 2 for the number of qubits. For example, copy and run the following Python code in a new code cell to get the matrix elements for a Controlled Ry operation where the second qubit is the target qubit:

   ```python
   qsharp.eval ("operation ControlRy(qs : Qubit[]) : Unit { Controlled Ry([qs[0]], (0.5, qs[1])); }")

   res = dump_operation("ControlRy", 2)
   print("Controlled Ry rotation gate:\n", res)
   ```

You can also inspect an OpenQASM program after you import it as a Q# callable. For example, the following code gets the matrix for an OpenQASM `x` gate:

```python
from qdk.openqasm import import_openqasm

import_openqasm("""
    OPENQASM 3.0;
    include "stdgates.inc";
    qubit[1] qs;
    x qs[0];
""", name="ApplyX")

res = dump_operation("ApplyX", 1)
print("OpenQASM X gate:\n", res)
```

For more examples of how to test and debug your code with `dump_operation`, see [Testing operations](https://github.com/microsoft/qdk/tree/main/samples/testing/operations) from the QDK samples.

## Related content

- [How to test quantum programs in the QDK](xref:microsoft.quantum.how-to.test-quantum-code)
