---
title: How to Debug and Test Quantum Programs in Azure Quantum
description: Learn how to use unit tests, facts and assertions, and dump functions to test and debug quantum programs. 
author: bradben
ms.author: brbenefield
ms.date: 01/05/2024
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: how-to
uid: microsoft.quantum.user-guide-qdk.overview.testingdebugging
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
#customer intent: As a quantum developer, I want to understand how to debug and test my quantum programs
---

# Debugging and testing your quantum code

As with classical programming, it is essential to be able to check that quantum programs act as intended, and to be able to diagnose incorrect behavior. This article discusses the tools offered by the Azure Quantum Development Kit for testing and debugging quantum programs.

## Debugging your Q# program

The Azure Quantum Development Kit (Modern QDK) Visual Studio Code extension includes a debugger for Q# programs. You can set breakpoints, step through your code and into each function or operation, and track not only the local variables, but the quantum state of the qubits as well. 

> [!NOTE]
> The VS Code debugger only works with Q# (.qs) files, and doesn't work with Q# cells in a Jupyter Notebook. For testing Jupyter Notebook cells, see [Testing your code](#testing-your-code).

The following example demonstrates the basic features of the debugger. For complete information about using VS Code debuggers, see [Debugging](https://code.visualstudio.com/docs/editor/debugging).

In VS Code, create and save a new .qs file with the following code:

```qsharp
namespace Sample {

    open Microsoft.Quantum.Arrays;
    open Microsoft.Quantum.Convert;

    @EntryPoint()
    operation Superposition() : Result {

        use qubit = Qubit();
        H(qubit);
        let result = M(qubit);
        Reset(qubit);
        return result;
    }
}
```

1. Set a breakpoint on the line `H(qubit)` by clicking to the left of the line number. 
1. Select the debugger icon to open the debugger pane and select **Run and Debug**. The debugger controls are displayed at the top of the screen.
1. Select F5 to start debugging and continue to the breakpoint. In the debugger **Variables** pane, expand the **Quantum State** category. You can see that the qubit has been initialized in the |0> state. 
1. Step into (F11) the `H` operation and the source code for the `H` operation displays. As you step through the operation, note the quantum value changes as the `H` operation puts the qubit into superposition. 
1. As you step over (F10) the `M` operation, the quantum value is resolved to either |0> or |1> as a result of the measurement, and the value of the classical variable `result` is displayed.
1. As you step over the `Reset` operation, the qubit is reset to |0>.

## Testing your code

Although the VS Code Q# debugger is not available for Q# cells in a Jupyter Notebook, the Modern QDK provides some expressions and functions that can help troubleshoot your code.


### Fail expression

The [`fail`](xref:microsoft.quantum.qsharp.returnsandtermination#fail-expression) expression ends the computation entirely, corresponding to a fatal error that stops the program. 

Consider this simple example that validates a parameter value:

```qsharp
%%qsharp

function PositivityFact(value : Int) : Unit {

    if value <= 0 {

            fail $"{value} isn't a positive number.";
    }   
}
PositivityFact(0);
```

```output
Error: program failed: 0 isn't a positive number.
Call stack:
    at PositivityFact in line_2
Qsc.Eval.UserFail

  × runtime error
  ╰─▶ program failed: 0 isn't a positive number.
   ╭─[line_2:5:1]
 5 │ 
 6 │             fail $"{value} isn't a positive number.";
   ·             ────────────────────┬───────────────────
   ·                                 ╰── explicit fail
 7 │     }   
   ╰────
```

Here, the `fail` expression prevents the program from continuing to run with invalid data. 

### Fact() function

You can implement the same behavior as the previous example using the `Fact()` function from the `Microsoft.Quantum.Diagnostics` namespace. The `Fact()` function evaluates a given classical condition and throws an exception if it is false. 

```qsharp
%%qsharp

    function PositivityFact(value : Int) : Unit {

    Fact(value > 0, "Expected a positive number."); 

    }
    PositivityFact(4);
```

```output
Error: program failed: Expected a positive number.
Call stack:
    at Microsoft.Quantum.Diagnostics.Fact in diagnostics.qs
    at PositivityFact in line_4
Qsc.Eval.UserFail

  × runtime error
  ╰─▶ program failed: Expected a positive number.
    ╭─[diagnostics.qs:29:1]
 29 │         if (not actual) {
 30 │             fail message;
    ·             ──────┬─────
    ·                   ╰── explicit fail
 31 │         }
    ╰────
```

### DumpMachine() function



`DumpMachine()` is a Q# function that allows you to dump information about the current state of the target machine to the console and continue to run your program.

> [!NOTE]
> With the release of the Azure Quantum Development Kit, the `DumpMachine()` function now uses big-endian ordering for its output. 

```python
import qsharp
```

```qsharp
%%qsharp

open Microsoft.Quantum.Diagnostics;

operation MultiQubitDumpMachineDemo() : Unit {
    use qubits = Qubit[2];
    X(qubits[1]);
    H(qubits[1]);
    
    DumpMachine();

    R1Frac(1, 2, qubits[0]);
    R1Frac(1, 3, qubits[1]);
    
    DumpMachine();
    
    ResetAll(qubits);
      }

MultiQubitDumpMachineDemo();
```

```output
Basis State
(|𝜓ₙ…𝜓₁⟩)	Amplitude	Measurement Probability	Phase
|00⟩	0.7071+0.0000𝑖	 50.0000%	↑	0.0000
|10⟩	−0.7071+0.0000𝑖	 50.0000%	↑	-3.1416

Basis State
(|𝜓ₙ…𝜓₁⟩)	Amplitude	Measurement Probability	Phase
|00⟩	0.5879−0.3928𝑖	 50.0000%	↑	-0.5890
|10⟩	−0.6935+0.1379𝑖	 50.0000%	↑	2.9452
```

### dump_machine() function

[`dump_machine`](/python/qsharp/qsharp?view=qsharp-py#qsharp-dump-machine&preserve-view=true) is a Python function that returns the current allocated qubit count and a Python dictionary of sparse state amplitudes that you can parse. Using either of these functions in a Jupyter Notebook allows you to step through your operations much like a debugger. Using the previous example program:

```python
import qsharp
```

```qsharp
%%qsharp

use qubits = Qubit[2];
X(qubits[0]);
H(qubits[1]);
```

```python
dump = qsharp.dump_machine()
dump
```

```output

Basis State
(|𝜓ₙ…𝜓₁⟩)	Amplitude	Measurement Probability	Phase
|11⟩	0.7071+0.0000𝑖	 50.0000%	↑	0.0000
|01⟩	0.7071+0.0000𝑖	 50.0000%	↑	0.0000
```


```qsharp
%%qsharp
R1Frac(1, 2, qubits[0]);
R1Frac(1, 3, qubits[1]);
```

```python
dump = qsharp.dump_machine()
dump
```

```output
Basis State
(|𝜓ₙ…𝜓₁⟩)	Amplitude	Measurement Probability	Phase
|11⟩	0.5879+0.3928𝑖	 50.0000%	↑	0.5890
|01⟩	0.6935+0.1379𝑖	 50.0000%	↑	0.1963
```

```python
# you can print an abbreviated version of the values
print(dump)
```

```output
STATE:
|11⟩: 0.5879+0.3928𝑖
|01⟩: 0.6935+0.1379𝑖
```

```python
# you can access the current qubit count
dump.qubit_count
```

```output
2
```

```python
# you can access individal states by their index
dump[1]
```

```output
(0.6935199226610738, 0.1379496896414715)
```

```python
dump[3]
```

```output
(0.5879378012096794, 0.3928474791935511)
```
