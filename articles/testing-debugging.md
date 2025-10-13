---
title: How to Debug and Test Quantum Programs in Azure Quantum
description: Learn how to use unit tests, facts and assertions, and dump functions to test and debug quantum programs. 
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 10/09/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: how-to
uid: microsoft.quantum.user-guide-qdk.overview.testingdebugging
no-loc: ["Q#", '$$v', Quantum Development Kit, target, targets]
#customer intent: As a quantum developer, I want to understand how to debug and test my quantum programs
---

# How to debug and test your quantum code

As with classical programming, it is essential to be able to check that quantum programs act as intended, and to be able to diagnose incorrect behavior. This article discusses the tools offered by the Azure Quantum Development Kit for testing and debugging quantum programs.

Testing and debugging are just as important in quantum programming as they are in classical programming. This article discusses how to debug and test your quantum programs with the Azure Quantum Development Kit (QDK) in Visual Studio Code (VS Code) and Jupyter Notebook.

## Debug your quantum code

The QDK provides several tools to debug your code. If you write Q# or OpenQASM programs in VS Code, then you can use the VS Code debugger to set breakpoints in your programs and analyze your code. The QDK also provides a set of dump functions that you can use to get information at different points in your program.

### How to use the VS Code debugger

With the QDK extension in VS Code, you can use the debugger to step through your code and into each function or operation, track the values of local variables, and follow the quantum states of the qubits.

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

1. On line 6, `H(qubit)`, click to the left of the line number to set a breakpoint. A red circle appears.
1. In the Primary Side Bar, choose the debugger icon to open the debugger pane, and then choose **Run and Debug**. The debugger control bar appears.
1. Press **F5** to start the debugger and continue to the breakpoint. In **Variables** menu of the debugger pane, expand the **Quantum State** dropdown to see that the qubit has been initialized in the $\ket{0}$ state.
1. Press **F11** to step into the `H` operation. The source code for the `H` operation appears. Notice that **Quantum State** changes to a superposition as you step through the `H` operation.
1. Press **F10** to step over the `M` operation. Notice that **Quantum State** resolves to either $\ket{0}$ or $\ket{1}$ after the measurement. The `result` variable also appears under **Locals**.
1. Press **F10** again to step over the `Reset` operation. Notice that **Quantum State** is reset to $\ket{0}$.

When you're finished exploring the debugger, press ***Ctrl + F5** to exit the debugger.

> [!NOTE]
> The VS Code debugger only works with Q# (`.qs`) and OpenQASM (`.qasm`) files. You can't use the VS Code debugger on Q# cells in Jupyter Notebook.

### How to debug with QDK dump functions

The QDK provides several Q# and Python functions that dump information about the current state of your program when you call these functions. Use information from these dump functions to check whether your program behaves as you expect.

#### The Q# `DumpMachine` function

`DumpMachine` is a Q# function that allows you to dump information about the current state of the qubit system to the console as your program runs. `DumpMachine` doesn't stop or interrupt your program during runtime.

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

The output from `DumpMachine` shows how the state of the qubit systems changes after each set of gates.

> [!NOTE]
> The output from `DumpMachine` uses big-endian ordering.

### The Python `dump_machine` function

The [`dump_machine`](/python/qsharp/qsharp?view=qsharp-py#qsharp-dump-machine&preserve-view=true) function is a function from the `qsharp` Python library. This function returns the current allocated qubit count and a dictionary of that contains the sparse state amplitudes of the qubit system.

The following example runs the same program as the previous `DumpMachine` example, but in a Jupyter notebook instead of a `.qs` file.

1. In VS Code, press **Ctrl + Shift + P** to open the **Command Palette**.
1. Enter **Create: New Jupyter Notebook** and press **Enter**. A new Jupyter Notebook tab opens.
1. In the first cell, copy and run the following code:

   ```python
   import qsharp 
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

1. To print an abbreviated version the `dump_machine` output, create a new cell and run the following Python code:

   ```python
   print(dump)
   ```

1. To get the total number of qubits in the system, create a new code cell and run the following Python code:

   ```python
   dump.qubit_count
   ```

1. You can access the amplitudes of individual qubits states that have nonzero amplitude. For example, create a new code cell and run the following Python code to get the individual amplitudes for the $\ket{10}$ and $\ket{11}$ states:

   ```python
   print(dump[2])
   print(dump[3])
   ```

### The `dump_operation` function

The `dump_operation` function is a function from the `qsharp.utils` Python package. This function takes two inputs: a Q# operation or operation definition as a string and the number of qubits that are used in the operation. The output from `dump_operation` is a nested list that represents the square matrix of complex numbers that corresponds to the given quantum operation. The matrix values are in the computational basis, and each sublist represents a row of the matrix.

The following example uses `dump_operation` to display information for a 1-qubit and 2-qubit system.

1. In VS Code, press **Ctrl + Shift + P** to open the **Command Palette**.
1. Enter **Create: New Jupyter Notebook** and press **Enter**. A new Jupyter Notebook tab opens.
1. In the first cell, copy and run the following code:

   ```python
   import qsharp
   from qsharp.utils import dump_operation
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

For more examples of how to test and debug your code with `dump_operation`, see [Testing operations](https://github.com/microsoft/qdk/tree/main/samples/testing/operations) from the QDK samples.

## Test your quantum code

The QDK provides several Q# functions and operations that you can use to test your code as it runs. You can also write unit tests for Q# programs.

### The `fail` expression

The [`fail`](xref:microsoft.quantum.qsharp.returnsandtermination#fail-expression) expression immediately ends your program. To incorporate tests into your code, use the `fail` expressions inside of conditional statements.

The following example uses a `fail` statement to test that a qubit array contains exactly 3 qubits. The program ends with an error message when the test doesn't pass.

1. In VS Code, create and save a new `.qs` file with the following code:

   ```qsharp
   operation Main() : Unit {
       use qs = Qubit[6];
       let n_qubits = Length(qs);

       if n_qubits != 3 {
           fail $"The system should have 3 qubits, not {n_qubits}.";
       }  
   }
   ```

1. Press **Ctrl + F5** to run the program. Your program fails and the following output appears in the **Debug Console**:

   ```output
   Error: program failed: The system should have 3 qubits, not 6.
   ```

1. Edit your code from `Qubit[6]` to `Qubit[3]`, save your file, and then press **Ctrl + F5** to run the program again. The program runs without an error because the test passes.

### The `Fact` function

You can also use the Q# `Fact` function from the `Std.Diagnostics` namespace to test your code. The `Fact` function takes a Boolean expression and en error message string. If the Boolean expression is true, then the test passes and your program continues to run. If the Boolean expression is false, then `Fact` ends your program and displays the error message.

To perform the same array length test in your previous code, nut with the `Fact` function, follow these steps:

1. In VS Code, create and save a new `.qs` file with the following code:

   ```qsharp
   import Std.Diagnostics.Fact;

   operation Main() : Unit {
       use qs = Qubit[6];
       let n_qubits = Length(qs);

       Fact(n_qubits == 3,  $"The system should have 3 qubits, not {n_qubits}.")
   }
   ```

1. Press **Ctrl + F5** to run the program. The test condition in `Fact` doesn't pass and the error message appears in the **Debug Console**.

1. Edit your code from `Qubit[6]` to `Qubit[3]`, save your file, and then press **Ctrl + F5** to run the program again. The test condition in `Fact` passes and your program runs without an error.

### Write Q# unit tests with the `@Test()` annotation

In Q# programs, you can apply the `@Test()` annotation to a callable (function or operation) to turn the callable into a unit test. These units tests appear in the **Testing** menu in VS Code so that you can take advantage of this VS Code feature. You can turn a callable into a unit test only when the callable doesn't take input parameters.

The following example wraps the array length test code in an operation and turns that operation into a unit test:

1. In VS Code, create and save a new `.qs` file with the following code:

   ```qsharp
   import Std.Diagnostics.Fact;

   @Test()
   operation TestCase() : Unit {
       use qs = Qubit[3];
       let n_qubits = Length(qs);

       Fact(n_qubits == 3, $"The system should have 3 qubits, not {n_qubits}.");
   }
   ```

   The `@Test()` annotation on the line before the `TestCase` operation definition turns the operation into a VS Code unit test. A green arrow appears on the operation definition line.

1. Choose the green arrow to run `TestCase` and report the test results.
1. To interact with your units tests in the VS Code Test Explorer, choose the **Testing** flask icon in the Primary Side Bar.
1. Edit your code from `Qubit[3]` to `Qubit[6]` and run the unit test again to see how the test information changes.

You can write and run Q# unit tests in VS Code without an entrypoint operation in your program.

> [!NOTE]
> Callables from the `Std.Diagnostics` namespace aren't compatible with QIR generation, so only include unit tests in Q# code that you run on simulators. If you want to generate QIR from your Q# code, then don't include unit tests in your code.

### The `CheckZero` and `CheckAllZero` operations

The `CheckZero` and `CheckAllZero` Q# operations check whether the current state of a qubit or qubit array is $\ket{0}$. The `CheckZero` operation takes a single qubit and returns `true` only when the qubit is in the $\ket{0}$ state. The `CheckAllZero` operations take a qubit array and returns `true` only when all qubits in the array are in the $\ket{0}$ state. To use `CheckZero` and `CheckAllZero`, import them from the `Std.Diagnostics` namespace.

The following example uses both operations. The `CheckZero` tests that the `X` operation flips the first qubit from the $\ket{0}$ state to the $\ket{1}$ state, and the `CheckAllZero` operation tests that both qubits are reset to the $\ket{0}$ state.

In VS Code, create and save a new `.qs` file with the following code, then run the program and examine the output in the **Debug Console**.

```qsharp
import Std.Diagnostics.*;

operation Main() : Unit {
    use qs = Qubit[2];
    X(qs[0]); 

    if CheckZero(qs[0]) {
        Message("X operation failed");
    }
    else {
        Message("X operation succeeded");
    }

    ResetAll(qs);

    if CheckAllZero(qs) {
        Message("Reset operation succeeded");
    }
    else {
        Message("Reset operation failed");
    }
}
```
