---

title: Test and debug quantum programs
description: Learn how to use unit tests, facts and assertions, and dump functions to test and debug quantum programs. 
author: bradben
ms.author: brbenefield
ms.date: 03/30/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
uid: microsoft.quantum.user-guide-qdk.overview.testingdebugging
no-loc: ['Q#', '$$v']
---

# Testing and debugging

As with classical programming, it is essential to be able to check that quantum programs act as intended, and to be able to diagnose incorrect behavior. Unlike classical programming, though, observing the state of a quantum system and tracking the behavior of a quantum program is not always easy.
In this section, we cover the tools offered by the Quantum Development Kit for testing and debugging quantum programs.

## Unit Tests

One common approach to testing classical programs is to write small programs called *unit tests*, which run code in a library and compare its output to some expected output.
For example, you can ensure that `Square(2)` returns `4` since you know *a priori* that $2^2 = 4$.

Q# supports creating unit tests for quantum programs, and which can run as tests within the [xUnit](https://xunit.net/) unit testing framework.

### Creating a Test Project

#### [Visual Studio 2022](#tab/tabid-vs2022)

Open Visual Studio 2022. Go to the **File** menu and select **New > Project...**.
In the upper right corner, search for `Q#`, and select the **Q# Test Project** template.

#### [Command Line / Visual Studio Code](#tab/tabid-vscode)

From your favorite command line, run the following command:

```dotnetcli
dotnet new xunit -lang Q# -o Tests
cd Tests
code . # To open in Visual Studio Code
```

Alternatively, in VS Code you can create a new test project by opening the command palette (**View > Command Palette...** or **Ctrl+Shift+P**) and searching for **Q#: Create new project...** and then **Unit testing project**.

****

Your new project will have two files in it, a code file and a project file. `Tests.qs` provides a convenient place to define new Q# unit tests, while the `.csproj` file contains configuration parameters needed to build the project.

Initially, the code file contains one sample unit test `AllocateQubit` which checks that a newly allocated qubit is in the $\ket{0}$ state and prints a message:

```qsharp
namespace TestProject {
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Intrinsic;
    
    @Test("QuantumSimulator")
    operation AllocateQubit () : Unit {

        use qubit = Qubit();
        AssertMeasurement([PauliZ], [qubit], Zero, "Newly allocated qubit must be in the |0⟩ state.");

        Message("Test passed");
    }
}
   
```

Any Q# operation or function that takes an argument of type `Unit` and returns `Unit` can be marked as a unit test via the `@Test("...")` attribute.
In the previous example, the argument to that attribute, `"QuantumSimulator"`, specifies the target on which the test runs. A single test can run on multiple targets. For example, add an attribute `@Test("ResourcesEstimator")` before `AllocateQubit`.

```qsharp
namespace TestProject {
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Intrinsic;
    
    @Test("QuantumSimulator")
    @Test("ResourcesEstimator")
    operation AllocateQubit () : Unit {
        ...
    }
}
```

After saving the file you will see two unit tests when running the tests: one where `AllocateQubit` runs on the `QuantumSimulator`, and one where it runs in the `ResourcesEstimator`.

The Q# compiler recognizes the built-in targets `"QuantumSimulator"`, `"ToffoliSimulator"`, and `"ResourcesEstimator"` as valid run targets for unit tests. It is also possible to specify any fully qualified simulator name to define a custom run target.

Besides the code file, the test project template includes the `.csproj` file with the following contents:

```xml
<Project Sdk="Microsoft.Quantum.Sdk/0.24.201332">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Quantum.Xunit" Version="0.24.201332" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.4.0" />
    <PackageReference Include="xunit" Version="2.4.1" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.1" />
    <DotNetCliToolReference Include="dotnet-xunit" Version="2.3.1" />
  </ItemGroup>

</Project>
```

The first line specifies the version number of the Microsoft Quantum Development Kit used to build the application. Note that the exact version numbers you see in this file will depend on your installation.

The `TargetFramework` generally contains either of two values for Q# applications depending on the project type: `net6.0` for executable and test projects, and `netstandard2.1` for libraries. Next, the `IsPackable` parameter is set to false (true when omitted). It determines whether a NuGet package is generated from this project when the [`dotnet pack`](/dotnet/core/tools/dotnet-pack) command is run.

Finally, the file lists NuGet package dependencies inside the `<ItemGroup>` tag. [xUnit](https://xunit.net/) is a popular testing framework for the .NET framework, which Q# test projects make use of (third reference in the list). The `Microsoft.Quantum.Xunit` and `Microsoft.NET.Test.Sdk` packages are used to expose Q# constructs to xUnit and build .NET test projects. In order to run any tests, xUnit also requires a unit test runner. Both the `xunit.runner.visualstudio` and the `dotnet-xunit` runners are required to run tests from the command line, while the former is sufficient when running tests from within Visual Studio. Make sure to include the appropriate package references if you are creating a test project manually or are converting from a regular project.

### Running Q# Unit Tests

#### [Visual Studio 2022](#tab/tabid-vs2022)

As a one-time per-solution setup, go to the **Test** menu and select **Test Settings > Default Processor Architecture > X64**.

> [!TIP]
> The default processor architecture setting for Visual Studio is stored in the solution options (`.suo`) file for each solution.
> If you delete this file, then you need to select **X64** as your processor architecture again.

Build the project, open the **Test** menu, and select **Windows > Test Explorer**. **AllocateQubit** displays in the list of tests in the **Not Run Tests** group. Select **Run All** or run this individual test.

#### [Command Line / Visual Studio Code](#tab/tabid-vscode)

To run tests, navigate to the project folder (the folder which contains the `.csproj` file), and run the command:

```shell
dotnet restore
dotnet test
```

You should get output similar to the following:

```output
  Determining projects to restore...
  All projects are up-to-date for restore.
 
  ____________________________________________

  Q#: Success! (0 errors, 0 warnings) 
  
  TestProject -> C:\Users\user\TestProject\bin\Debug\net6.0\test2.dll
Test run for C:\Users\user\TestProject\bin\Debug\net6.0\test2.dll (.NETCoreApp,Version=v6.0)
Microsoft (R) Test Execution Command Line Tool Version 17.1.0
Copyright (c) Microsoft Corporation.  All rights reserved.

Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     1, Skipped:     0, Total:     1, Duration: < 1 ms - test2.dll (net6.0)
```

Unit tests can be filtered according to their name or the run target:

```shell
dotnet test --filter "Target=QuantumSimulator"
dotnet test --filter "Name=AllocateQubit"
```

***

The intrinsic function <xref:Microsoft.Quantum.Intrinsic.Message> has type `(String -> Unit)` and enables the creation of diagnostic messages.

#### [Visual Studio 2022](#tab/tabid-vs2022)

After you run a test in Test Explorer and click the test name, a panel displays with information about test run: Pass/fail status, elapsed time, and a link to the output. Click **Output** to open the test output in a new window.

:::image type="content" source="../media/unit-test-output.png" alt-text="Screenshot of Test Explorer showung the output of a run.":::


#### [Command Line / Visual Studio Code](#tab/tabid-vscode)

The pass/fail status for each test is printed to the console by `dotnet test`.
For failing tests, the outputs are also printed to the console to help diagnose the failure.

***

## Facts and Assertions

Because functions in Q# have no _logical_ side effects, you can never observe, from within a Q# program, any other kinds of effects from running a function whose output type is the empty tuple `()`.
That is, a target machine can choose not to run any function which returns `()` with the guarantee that this omission will not modify the behavior of any following Q# code.
This behavior makes functions returning `()` (such as `Unit`) a useful tool for embedding assertions and debugging logic into Q# programs.

Let's consider a simple example:

```qsharp
namespace DebuggingFactsTest {

    @EntryPoint()
    function PositivityFact(value : Int) : Unit {

        if value <= 0 {

             fail "Expected a positive number.";
        }   
    }
}
```

Here, the keyword `fail` indicates that the computation should not proceed, and raises an exception in the target machine running the Q# program.
By definition, a failure of this kind cannot be observed from within Q#, as the target machine no longer runs the Q# code after reaching a `fail` statement.
Thus, if we proceed past a call to `PositivityFact`, we can be assured that its input was positive.

Note that we can implement the same behavior as `PositivityFact` using the [*Fact*](xref:Microsoft.Quantum.Diagnostics.Fact) function from the <xref:Microsoft.Quantum.Diagnostics>:

```qsharp
    Fact(value > 0, "Expected a positive number.");
```

*Assertions*, on the other hand, are used similarly to facts but may depend on the state of the target machine. Correspondingly, they are defined as operations, whereas facts are defined as functions (as in the previous example). 

[The prelude](xref:microsoft.quantum.libraries.overview.standard.prelude), building on these ideas, offers two especially useful assertions, <xref:Microsoft.Quantum.Diagnostics.AssertMeasurement> and <xref:Microsoft.Quantum.Diagnostics.AssertMeasurementProbability> both modeled as operations onto `()`. These assertions each take a Pauli operator describing a particular measurement of interest, a quantum register on which a measurement is performed, and a hypothetical outcome.
Target machines which work by simulation are not bound by [the no-cloning theorem](https://en.wikipedia.org/wiki/No-cloning_theorem), and can perform such measurements without disturbing the register that passes to such assertions.
A simulator can then, similar to the `PositivityFact` function previous, stop computation if the hypothetical outcome is not observed in practice:

```qsharp
namespace AssertionsTest {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Diagnostics;
    
    @EntryPoint()
    operation Assert() : Unit {
        use register = Qubit();
        H(register);
        AssertMeasurement([PauliX], [register], Zero, "The state of the quantum register is not |+〉");

        ResetAll([register]);
        
        // Even though we do not have access to states in Q#,
        // we know by the anthropic principle that the state
        // of register at this point is |+〉.
    }
}

```

On physical quantum hardware, where the no-cloning theorem prevents examination of a quantum state, the `AssertMeasurement` and `AssertMeasurementProbability` operations simply return `()` with no other effect.

The <xref:Microsoft.Quantum.Diagnostics> provides several more functions of the `Assert` family, with which you can check more advanced conditions.

## Dump Functions

Just like a real quantum computation, Q# does not allow us to directly access qubit states. However, the <xref:Microsoft.Quantum.Diagnostics> offers three functions that can dump into a file the current status of the target machine and can provide valuable insight for debugging and learning when used in conjunction with the full state simulator: <xref:Microsoft.Quantum.Diagnostics.DumpOperation>, <xref:Microsoft.Quantum.Diagnostics.DumpMachine> and <xref:Microsoft.Quantum.Diagnostics.DumpRegister>. The generated output of each depends on the target machine.

### DumpOperation

Suppose you are implementing a quantum gate described by a matrix. You’ve written a Q# operation and want to check that it implements exactly the unitary matrix you’re looking for. The <xref:Microsoft.Quantum.Diagnostics.DumpOperation> takes an operation that acts on an array of qubits as a parameter (if your operation acts on a single qubit, like most intrinsic gates, or on a mix of individual qubits and qubit arrays, you’ll need to write a wrapper for it to use `DumpOperation` on it), and prints a matrix implemented by this operation. Let's take the CNOT gate as an exmaple.

```qsharp
namespace DumpOperationTest {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Diagnostics;
    
    @EntryPoint()
    operation DumpCnot() : Unit {
    DumpOperation(2, ApplyToFirstTwoQubitsCA(CNOT, _));
    }
}
```
Calling `DumpOperation` will print the following matrix,

```output
Real:
[[1, 0, 0, 0],
[0, 0, 0, 1],
[0, 0, 1, 0],
[0, 1, 0, 0]]
Imag:
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]]
```
> [!NOTE]
> `DumpOperation` and the rest of Dump functions use the little-endian encoding for converting basis states to the indices of matrix elements. Thus, the second column of the CNOT matrix corresponds to the input state |1⟩\_{LE} = |10⟩, which the CNOT gate converts to |11⟩ = |3\_{LE}. Similarly, the imput state |2⟩\_{LE} = |01⟩.

### DumpMachine

The full-state quantum simulator distributed as part of the Quantum Development Kit writes into the file the [wave function](https://en.wikipedia.org/wiki/Wave_function) of the entire quantum system, as a one-dimensional array of complex numbers, in which each element represents the amplitude of the probability of measuring the computational basis state $\ket{n}$, where $\ket{n} = \ket{b_{n-1}...b_1b_0}$ for bits $\{b_i\}$. For example, consider the following operation that allocates two qubits and prepares an uneven superposition state on them:

 ```qsharp
namespace MultiDumpMachineTest {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Diagnostics;
 
    @EntryPoint()
    operation MultiQubitDumpMachineDemo() : Unit {
        use qubits = Qubit[2];
        X(qubits[1]);
        H(qubits[1]);
        R1Frac(1, 2, qubits[1]);
        
        DumpMachine("dump.txt");

        ResetAll(qubits);
    }
}
```
The resulting quantum state of `MultiQubitDumpMachineDemo` operation is

$$
\begin{align}
    \ket{\psi} = \frac{1}{\sqrt{2}} \ket{00} - \frac{(1 + i)}{2} \ket{10}.
\end{align}
$$

Calling <xref:Microsoft.Quantum.Diagnostics.DumpMachine> on the previous quantum state generates the following output:

```output
# wave function for qubits with ids (least to most significant): 0;1
∣0❭:	 0.707107 +  0.000000 i	 == 	**********           [ 0.500000 ]     --- [  0.00000 rad ]
∣1❭:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
∣2❭:	-0.500000 + -0.500000 i	 == 	**********           [ 0.500000 ]   /     [ -2.35619 rad ]
∣3❭:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
```
The first row provides a comment with the ids of the corresponding qubits in their significant order.
The rest of the rows describe the probability amplitude of measuring the basis state vector $\ket{n}$ in both Cartesian and polar formats. In detail for the first row:

* **`∣0❭:`** this row corresponds to the `0` computational basis state
* **`0.707107 +  0.000000 i`**: the probability amplitude in Cartesian format.
* **` == `**: the `equal` sign separates both equivalent representations.
* **`**********  `**: A graphical representation of the magnitude, the number of `*` is proportionate to the probability of measuring this state vector.
* **`[ 0.500000 ]`**: the numeric value of the magnitude
* **`    ---`**: A graphical representation of the amplitude's phase (see the following output).
* **`[ 0.0000 rad ]`**: the numeric value of the phase (in radians).

Both the magnitude and the phase are displayed with a graphical representation. The magnitude representation is straight-forward: it shows a bar of `*`, the bigger the probability the bigger the bar will be. For the phase, we show the following symbols to represent the angle based on ranges:

```
[ -π/16,   π/16)       ---
[  π/16,  3π/16)        /-
[ 3π/16,  5π/16)        / 
[ 5π/16,  7π/16)       +/ 
[ 7π/16,  9π/16)      ↑   
[ 8π/16, 11π/16)    \-    
[ 7π/16, 13π/16)    \     
[ 7π/16, 15π/16)   +\     
[15π/16, 19π/16)   ---    
[17π/16, 19π/16)   -/     
[19π/16, 21π/16)    /     
[21π/16, 23π/16)    /+    
[23π/16, 25π/16)      ↓   
[25π/16, 27π/16)       -\ 
[27π/16, 29π/16)        \ 
[29π/16, 31π/16)        \+
[31π/16,   π/16)       ---
```

The following examples show `DumpMachine` for some common states:

### `∣0❭`

```output
# wave function for qubits with ids (least to most significant): 0
∣0❭:	 1.000000 +  0.000000 i	 == 	******************** [ 1.000000 ]     --- [  0.00000 rad ]
∣1❭:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
```

### `∣1❭`

```output
# wave function for qubits with ids (least to most significant): 0
∣0❭:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
∣1❭:	 1.000000 +  0.000000 i	 == 	******************** [ 1.000000 ]     --- [  0.00000 rad ]
```

### `∣+❭`

```output
# wave function for qubits with ids (least to most significant): 0
∣0❭:	 0.707107 +  0.000000 i	 == 	**********           [ 0.500000 ]      --- [  0.00000 rad ]
∣1❭:	 0.707107 +  0.000000 i	 == 	**********           [ 0.500000 ]      --- [  0.00000 rad ]
```

### `∣-❭`

```output
# wave function for qubits with ids (least to most significant): 0
∣0❭:	 0.707107 +  0.000000 i	 == 	**********           [ 0.500000 ]      --- [  0.00000 rad ]
∣1❭:	-0.707107 +  0.000000 i	 == 	**********           [ 0.500000 ]  ---     [  3.14159 rad ]
```

  > [!NOTE]
  > The id of a qubit is assigned at runtime and is not necessarily aligned with the order in which the qubit was allocated or its position within a qubit register.

#### [Visual Studio 2022](#tab/tabid-vs2022)

  > [!TIP]
  > You can locate a qubit id in Visual Studio by putting a breakpoint in your code and inspecting the value of a qubit variable, for example:
  > 
  > :::image type="content" source="../media/qubit_id.png" alt-text="Screenshot of Visual Studio showing how to locate qubit id.":::
  >
  > the qubit with index `0` on `register2` has id=`3`, the qubit with index `1` has id=`2`.

#### [Command Line / Visual Studio Code](#tab/tabid-vscode)

  > [!TIP]
  > You can locate a qubit id by using the <xref:Microsoft.Quantum.Intrinsic.Message> function and passing the qubit variable in the message, for example:
  >
  > ```qsharp
  > Message($"0={register2[0]}; 1={register2[1]}");
  > ```
  >
  > which could generate this output:
  >
  >```output
  > 0=q:3; 1=q:2
  >```
  >
  > which means that the qubit with index `0` on `register2` has id=`3`, the qubit with index `1` has id=`2`.

***

#### DumpMachine with Jupyter Notebook

For the sake of simplicity, in the previous testing and debugging tools we displayed examples of code using a Q# standalone application at a command prompt and any IDE. However, you can use any of the development options offered by Quantum Development Kit to develop quantum computing applications in Q#. For more information, see [Set up the QDK](xref:microsoft.quantum.install-qdk.overview).

In this example for <xref:Microsoft.Quantum.Diagnostics.DumpMachine>, we explicitly show the development using a Q# Jupyter Notebook, as it offers more visualization tools for testing and debugging quantum programs.

1. To run `DumpMachine` on a Jupyter Notebook, open a [new Jupyter Notebook with a Q# kernel](xref:microsoft.quantum.how-to.standalone-local) and copy the following code to the first notebook cell:

 ```qsharp
open Microsoft.Quantum.Diagnostics;
 
operation MultiQubitDumpMachineDemo() : Unit {
        use qubits = Qubit[2];
        X(qubits[1]);
        H(qubits[1]);
        R1Frac(1, 2, qubits[1]);
        
        DumpMachine();

        ResetAll(qubits);
    }

```
1. In a new cell, run the `MultiQubitDumpMachineDemo` operation on a full state quantum simulator by using the `%simulate` magic command. The `DumpMachine` call prints the information about the quantum state of the program after the Controlled Ry gate as a set of lines, one per basis state, showing their complex amplitudes, phases, and measurement probabilities.

:::image type="content" source="../media/dumpmachine-output.png" alt-text="Screenshot of the DumpMachine operation output in Jupyter Notebooks.":::

> [!NOTE]
> You can use <xref:microsoft.quantum.iqsharp.magic-ref.config> (available only in Q# Jupyter Notebooks) to tweak the format of the `DumpMachine` output. It offers many settings that you can use in different scenarios. For example, by default `DumpMachine` uses little-endian integers to denote the basis states (the first column of the output); if you find raw bit strings easier to read, you can use `%config dump.basisStateLabelingConvention="Bitstring"` to switch.


1. Jupyter Notebooks offers the option to visualize the run of the quantum program as a quantum circuit by using <xref:microsoft.quantum.iqsharp.magic-ref.trace> (available only in Q# Jupyter Notebooks). This command traces one run of the Q# programs and build a circuit based on that run. This is the circuit resulting from the running of `%trace MultiQubitDumpMachineDemo`, 

:::image type="content" source="../media/dumpmachine-trace-output.png" alt-text="Screenshot of the DumpMachine operation using the trace magic command in Jupyter Notebooks.":::


   The visualization is interactive, allowing you to click on each block to drill down to the intrinsic gates.

1. Finally, <xref:microsoft.quantum.iqsharp.magic-ref.debug> (available only in Q# Jupyter Notebooks) allows you to combine tracing the program execution (as a circuit) and observing the program state as it evolves at the same time. The visualization is also interactive; you can click through each of the steps until the program run is complete, and switch to observe real and imaginary components of the amplitudes, instead of measurement probabilities in the beginning of the program.

:::image type="content" source="../media/dumpmachine-debug-output.png" alt-text="Screenshot of the DumpMachine operation using the debug magic command in Jupyter Notebooks.":::


### DumpRegister

<xref:Microsoft.Quantum.Diagnostics.DumpRegister> works like <xref:Microsoft.Quantum.Diagnostics.DumpMachine>, except that it also takes an array of qubits to limit the amount of information to only that relevant to the corresponding qubits.

As with <xref:Microsoft.Quantum.Diagnostics.DumpMachine>, the information generated by <xref:Microsoft.Quantum.Diagnostics.DumpRegister> depends on the target machine. For the full-state quantum simulator it writes into the file the wave function up to a global phase of the quantum sub-system generated by the provided qubits in the same format as <xref:Microsoft.Quantum.Diagnostics.DumpMachine>.  For example, take again a machine with only two qubits allocated and in the quantum state
$$
\begin{align}
    \ket{\psi} = \frac{1}{\sqrt{2}} \ket{00} - \frac{(1 + i)}{2} \ket{10} = - e^{-i\pi/4} ( (\frac{1}{\sqrt{2}} \ket{0} - \frac{(1 + i)}{2} \ket{1} ) \otimes \frac{-(1 + i)}{\sqrt{2}} \ket{0} ) ,
\end{align}
$$
calling <xref:Microsoft.Quantum.Diagnostics.DumpRegister> for `qubit[0]` generates this output:

```output
# wave function for qubits with ids (least to most significant): 0
∣0❭:	-0.707107 + -0.707107 i	 == 	******************** [ 1.000000 ]  /      [ -2.35619 rad ]
∣1❭:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
```

and calling <xref:Microsoft.Quantum.Diagnostics.DumpRegister> for `qubit[1]` generates this output:

```output
# wave function for qubits with ids (least to most significant): 1
∣0❭:	 0.707107 +  0.000000 i	 == 	***********          [ 0.500000 ]     --- [  0.00000 rad ]
∣1❭:	-0.500000 + -0.500000 i	 == 	***********          [ 0.500000 ]  /      [ -2.35619 rad ]
```

In general, the state of a register that is entangled with another register is a mixed state rather than a pure state. In this case, <xref:Microsoft.Quantum.Diagnostics.DumpRegister> outputs the following message:

```output
Qubits provided (0;) are entangled with some other qubit.
```

The following example shows you how you can use both <xref:Microsoft.Quantum.Diagnostics.DumpRegister> and <xref:Microsoft.Quantum.Diagnostics.DumpMachine> in your Q# code:

```qsharp
namespace DumpRegisterTest {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Diagnostics;
 
    @EntryPoint()
    operation DumpRegisterTestOp () : Unit {
        use qubits = Qubit[2];
        X(qubits[1]);
        H(qubits[1]);
        R1Frac(1, 2, qubits[1]);
        
        DumpMachine("dump.txt");
        DumpRegister("q0.txt", qubits[0..0]);
        DumpRegister("q1.txt", qubits[1..1]);
        ResetAll(qubits);
    }
}

```

## Debugging

On top of `Assert` and `Dump` functions and operations, Q# supports a subset of standard Visual Studio debugging capabilities: [setting line breakpoints](/visualstudio/debugger/using-breakpoints), [stepping through code using F10](/visualstudio/debugger/navigating-through-code-with-the-debugger), and [inspecting values of classic variables](/visualstudio/debugger/autos-and-locals-windows) are all possible when running your code on the simulator.

Debugging in Visual Studio Code leverages the debugging capabilities provided by the C# for Visual Studio Code extension powered by OmniSharp and requires installing the [latest version](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp).
