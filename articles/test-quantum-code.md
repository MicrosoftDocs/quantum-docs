---
title: How to test quantum programs in the QDK
description: Learn how to test Q# and OpenQASM programs with the QDK, including Q# unit tests and Python assertions.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/11/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qsharp-guide
no-loc: ["Q#", "OpenQASM", "Microsoft Quantum Development Kit", "QDK", "Visual Studio Code", "VS Code", "Jupyter", "Jupyter Notebook", "Python", "pytest", "QIR"]
ai-usage: ai-assisted
uid: microsoft.quantum.how-to.test-quantum-code
# Customer intent: As a quantum developer, I want to test my quantum programs in the QDK so that I can make sure my code behaves the way I expect.
---

# How to test quantum programs in the QDK

Testing helps you check that quantum programs behave as expected. This article shows you how to test Q# and OpenQASM programs with the Microsoft Quantum Development Kit (QDK).

The QDK provides Q# functions and operations that check your code as it runs, and you can write Q# unit tests to run in Visual Studio Code (VS Code) or Python. You can also run OpenQASM programs from Python and use Python assertions to check their results.

To learn how to debug Q# and OpenQASM programs, see [How to debug quantum programs in the QDK](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging).

## Prerequisites

To run Q# unit tests in VS Code, install the following:

- The latest version of [VS Code](https://code.visualstudio.com/download), or open [VS Code for the Web](https://vscode.dev/).
- The latest version of the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) in VS Code.

To test programs from Python, install the latest version of the `qdk` Python package. To run examples in a Jupyter notebook, also install the following:

- The [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) in VS Code.
- The latest version of the `qdk` Python package with the `jupyter` extra. You need version 1.31.0 or later to run Q# unit tests from Python.

  ```bash
  pip install --upgrade "qdk[jupyter]"
  ```

## Test Q# code with the `fail` expression

The [`fail`](xref:microsoft.quantum.qsharp.returnsandtermination#fail-expression) expression immediately ends your program. To test your code, use a fail expression inside a conditional statement.

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

## Test Q# code with the `Fact` function

Use the Q# Fact function from the Std.Diagnostics namespace to test your code. The function takes a Boolean expression and an error message string. If the expression is true, the test passes and your program continues. Otherwise, Fact ends your program and shows the error message.

To test the array length with Fact, follow these steps:

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

## Check qubit states in Q#

The `CheckZero` and `CheckAllZero` Q# operations check whether the current state of a qubit or qubit array is $\ket{0}$. The `CheckZero` operation takes a single qubit and returns `true` only when the qubit is in the $\ket{0}$ state. The `CheckAllZero` operation takes a qubit array and returns `true` only when all qubits in the array are in the $\ket{0}$ state. To use `CheckZero` and `CheckAllZero`, import them from the `Std.Diagnostics` namespace.

The following example uses both operations. The `CheckZero` operation tests that the `X` operation flips the first qubit from the $\ket{0}$ state to the $\ket{1}$ state, and the `CheckAllZero` operation tests that both qubits are reset to the $\ket{0}$ state.

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

## Write Q# unit tests with the `@Test()` annotation

In Q# programs, you can apply the `@Test()` annotation to a callable (function or operation) to turn the callable into a unit test. These unit tests appear in the **Testing** menu in VS Code so that you can take advantage of this VS Code feature. You can turn a callable into a unit test only when the callable doesn't take input parameters.

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

1. Select the green arrow to run TestCase and view the test results.
1. To interact with your unit tests in the VS Code Test Explorer, choose the **Testing** flask icon in the Activity Bar.
1. Edit your code from `Qubit[3]` to `Qubit[6]` and run the unit test again to see how the test information changes.

You can write and run Q# unit tests in VS Code without an entrypoint operation in your program.

> [!NOTE]
> Callables from the `Std.Diagnostics` namespace aren't compatible with QIR generation, so only include unit tests in Q# code that you run on simulators. If you want to generate QIR from your Q# code, then don't include unit tests in your code.

## Test OpenQASM programs from Python

The `qdk.openqasm.run` function runs an OpenQASM program on the local simulator and returns its results. Use Python assertions to check those results, or put the assertions in a pytest test function to run them as part of your Python test suite.

The following example checks that an OpenQASM program applies an `x` gate and measures the qubit as `One` in all three shots:

```python
from qdk import Result
from qdk.openqasm import run

qasm_code = """
    OPENQASM 3.0;
    include "stdgates.inc";
    qubit q;
    output bit result;
    x q;
    result = measure q;
"""

results = run(qasm_code, shots=3)
assert results == [Result.One, Result.One, Result.One]
```

The `qdk.test_utils.run_tests` function discovers Q# callables marked with `@Test()`. It doesn't discover OpenQASM programs directly. To use `run_tests` with OpenQASM code, import the program as a Q# callable and call it from a Q# unit test:

```python
from qdk import qsharp
from qdk.openqasm import import_openqasm
from qdk.test_utils import run_tests

import_openqasm("""
    OPENQASM 3.0;
    include "stdgates.inc";
    qubit[1] qs;
    x qs[0];
""", name="ApplyX")

qsharp.eval("""
import Std.Diagnostics.Fact;

@Test()
operation TestApplyX() : Unit {
    use qs = Qubit[1];
    ApplyX(qs);
    Fact(MResetZ(qs[0]) == One, "Expected the OpenQASM program to return One.");
}
""")

run_tests()
```

## Run Q# unit tests from Python

The `qdk.test_utils` Python module lets you run your Q# unit tests from Python. Use the `run_tests` function to find and run all the Q# callables that have the `@Test()` annotation. You can call `run_tests` from a Jupyter notebook, a Python script, or a Python test framework like pytest. For example, you can use `run_tests` to run your Q# tests in a continuous integration (CI) pipeline.

The `qdk.test_utils` module also includes helpers that test the effect of Q# operations on qubits.

### Run Q# unit tests in a Jupyter notebook

The following example defines two Q# unit tests in a Jupyter notebook and then runs them with `run_tests`.

1. In VS Code, press **Ctrl + Shift + P** to open the **Command Palette**.
1. Enter **Create: New Jupyter Notebook** and press **Enter**. A new Jupyter Notebook tab opens.
1. In the first cell, copy and run the following code:

   ```python
   from qdk import qsharp
   from qdk.test_utils import run_tests
   ```

1. Create a new code cell. Copy and run the following code to define two Q# unit tests:

   ```python
   qsharp.eval("""
   import Std.Diagnostics.*;

   @Test()
   operation TestQubitCount() : Unit {
       use qs = Qubit[3];
       let n_qubits = Length(qs);
       Fact(n_qubits == 3, $"The system should have 3 qubits, not {n_qubits}.");
   }

   @Test()
   operation TestXFlipsQubit() : Unit {
       use q = Qubit();
       X(q);
       Fact(not CheckZero(q), "X operation failed.");
       Reset(q);
   }
   """)
   ```

1. Create a new code cell. Copy and run the following code to run your tests:

   ```python
   run_tests()
   ```

   The `run_tests` function prints a dot for each test that passes, and then prints a summary:

   ```output
   Running 2 tests...
   ..
   Finished tests: 2 passed, 0 failed.
   ```

1. To see what happens when a test fails, create a new code cell. Copy and run the following code to add a test that fails, and then run all your tests again:

   ```python
   qsharp.eval("""
   @Test()
   operation TestQubitCountFails() : Unit {
       use qs = Qubit[6];
       let n_qubits = Length(qs);
       Std.Diagnostics.Fact(n_qubits == 3, $"The system should have 3 qubits, not {n_qubits}.");
   }
   """)

   run_tests()
   ```

   For each test that fails, `run_tests` prints the name of the test and the error message. After all the tests run, `run_tests` prints a summary and then raises a `RuntimeError`.

### Choose which tests run and how much output you get

The `run_tests` function takes the following optional parameters:

| Parameter | Description |
|---|---|
| `context` | The `qdk.Context` to find and run tests in. If you don't pass a context, then `run_tests` uses the default context. |
| `seed` | The seed for the simulator's random number generator. Set a seed to get the same results each time you run tests that include measurements. |
| `regex` | A regular expression that filters tests by their fully qualified names, such as `MyNamespace.MyTest`. Only tests with names that match the expression run. |
| `verbose` | The amount of output to print. `0` prints nothing. `1` prints a dot for each test that passes, and is the default. `2` prints the name of each test. `3` or higher also prints the output from your Q# code, such as from `Message` calls. |

For example, to run only `TestXFlipsQubit` and print the test names, create a new code cell, then copy and run the following code:

```python
run_tests(regex="XFlips", verbose=2)
```

The output shows the name of the test that ran:

```output
Running 1 tests...
Running TestXFlipsQubit...
PASSED: TestXFlipsQubit

Finished tests: 1 passed, 0 failed.
```

### Run unit tests in a Q# project

To run the unit tests in a Q# project, load the project with `qsharp.init` and then call `run_tests`. Pass the path to the folder that contains your project's `qsharp.json` file. For more information about Q# projects, see [Develop and Manage Q# Projects and Custom Libraries](xref:microsoft.quantum.qsharp-projects).

```python
from qdk import qsharp
from qdk.test_utils import run_tests

qsharp.init(project_root="./my_project")
run_tests()
```

To run your tests separately from other Q# code in your Python session, create a `Context` object for your project and pass it to `run_tests`:

```python
from qdk import Context
from qdk.test_utils import run_tests

run_tests(context=Context(project_root="./my_project"))
```

Tests in a Q# project have fully qualified names that include the namespace. By default, the namespace is the name of the file that contains the test. For example, a test named `TestAddition` in a file named `Tests.qs` has the fully qualified name `Tests.TestAddition`.

### Run Q# unit tests with pytest

The `run_tests` function raises a `RuntimeError` when any test fails, so you can call `run_tests` inside a pytest test function. When any of your Q# tests fail, pytest reports that the Python test fails.

1. In the folder that contains your Q# project folder, create a file named `test_qsharp.py` with the following code:

   ```python
   from pathlib import Path

   from qdk import Context
   from qdk.test_utils import run_tests

   PROJECT_ROOT = Path(__file__).parent / "my_project"

   def test_qsharp_project():
       run_tests(context=Context(project_root=str(PROJECT_ROOT)))
   ```

1. Install pytest and then run your tests:

   ```bash
   pip install pytest
   pytest
   ```

### Test arithmetic operations with `ArithmeticOpTester`

The `ArithmeticOpTester` class runs a Q# arithmetic operation on integer inputs. The class puts each input integer into a qubit register, applies the operation, and then reads each register back as an integer. The integers are unsigned and use little-endian order.

To create an `ArithmeticOpTester` object, pass the name of the operation and the number of qubits in each register. The operation must take one `Qubit[]` input for each register. Then, call `run` with one integer for each register.

For example, the `IncByLE` operation adds the integer in the first register to the integer in the second register. The following code tests `IncByLE` on two 8-qubit registers:

```python
from qdk.test_utils import ArithmeticOpTester

tester = ArithmeticOpTester("Std.Arithmetic.IncByLE", [8, 8])
assert tester.run([5, 7]) == [5, 12]
assert tester.run([100, 27]) == [100, 127]
```

### Test a Q# operation's state with `dump_operation_on_state`

The `dump_operation_on_state` function applies a Q# operation to a qubit register and returns the state vector of the register as a list of complex numbers. The operation must take a single `Qubit[]` input. You can also pass a compatible OpenQASM program after you import it with `import_openqasm`. By default, the qubits start in the $\ket{0 \cdots 0}$ state. To start in a different state, pass a list of real amplitudes to the `initial_state` parameter. The state vector uses big-endian order.

For example, the following code tests that an operation prepares the Bell state $\frac{1}{\sqrt{2}}(\ket{00} + \ket{11})$:

```python
import math

from qdk import qsharp
from qdk.test_utils import dump_operation_on_state

qsharp.eval("operation PrepareBellState(qs : Qubit[]) : Unit { H(qs[0]); CNOT(qs[0], qs[1]); }")

state = dump_operation_on_state("PrepareBellState", 2)
expected = [1 / math.sqrt(2), 0, 0, 1 / math.sqrt(2)]
assert all(abs(a - b) < 1e-9 for a, b in zip(state, expected))

from qdk.openqasm import import_openqasm

import_openqasm("""
    OPENQASM 3.0;
    include "stdgates.inc";
    qubit[2] qs;
    h qs[0];
    cx qs[0], qs[1];
""", name="PrepareBellQasm")

qasm_state = dump_operation_on_state("PrepareBellQasm", 2)
assert all(abs(a - b) < 1e-9 for a, b in zip(qasm_state, expected))
```

For more examples of how to test Q# operations from Python, see [Testing operations](https://github.com/microsoft/qdk/tree/main/samples/testing/operations) from the QDK samples.

## Related content

- [How to debug quantum programs in the QDK](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
- [Develop and Manage Q# Projects and Custom Libraries](xref:microsoft.quantum.qsharp-projects)
