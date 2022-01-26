---

title: Write and simulate qubit-level programs in Q#
description: In this tutorial, learn how to write and simulate a quantum program that operates at the individual qubit level.
author: bradben
ms.author: v-benbra
ms.date: 12/10/2021
ms.service: azure-quantum
ms.subservice: qdk
uid: microsoft.quantum.tutorial-qdk.circuit
ms.topic: tutorial
no-loc: ['Q#', '$$v']
---


# Tutorial: Write and simulate qubit-level programs in Q\#

This tutorial shows you how to write and simulate a basic quantum program that operates on individual qubits.

Although Q# was primarily created as a high-level programming language for large-scale quantum programs, it can also be used to explore the lower level of quantum programming, that is, directly addressing specific qubits. Specifically, this tutorial takes a closer look at the [Quantum Fourier Transform](https://en.wikipedia.org/wiki/Quantum_Fourier_transform) (QFT), a subroutine that is integral to many larger quantum algorithms.


> [!NOTE]
>This lower level view of quantum information processing is often described in terms of [**quantum circuits**](xref:microsoft.quantum.concepts.circuits), which represent the sequential application of gates, or *operations*, to specific qubits of a system. Thus, the single- and multi-qubit operations you sequentially apply can be readily represented in [circuit diagrams](xref:microsoft.quantum.glossary-qdk#quantum-circuit-diagram). For example, the full three-qubit quantum Fourier transform used in this tutorial has the following representation as a circuit:
>![QFT circuit](./media/qft_full.PNG)

In this tutorial, you'll learn how to

> [!div class="checklist"]
> * Define quantum operations in Q#
> * Call Q# operations directly from the command prompt or using a classical host program
> * Simulate a quantum operation from qubit allocation to measurement output
> * Observe how the quantum system's simulated wavefunction evolves throughout the operation

## Prerequisites

* [Install the Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview?tabs=tabid-local#install-the-qdk-and-develop-quantum-applications-locally) using your preferred language and development environment.
* If you already have the QDK installed, make sure you have [updated to the latest version](xref:microsoft.quantum.update-qdk).
* Create a Q# project for either a [Q# application](xref:microsoft.quantum.how-to.standalone-local) or a [C# host program](xref:microsoft.quantum.how-to.csharp-local). Alternatively, you can run your Q# code from a [Python host program](xref:microsoft.quantum.how-to.python-local).

## Allocate qubits and define quantum operations

The first part of this tutorial consists of defining the Q# operation `Perform3qubitQFT`, which performs the quantum Fourier transform on three qubits. The `DumpMachine` function is used to observe how the simulated wavefunction of the three-qubit system evolves across the operation. In the second part of the tutorial, you will add measurement functionality and compare the pre- and post-measurement states of the qubits. 

You will build the operation step by step. However, you can view the [full Q# code](#the-complete-operation) for this section as reference. 

### Namespaces to access other Q# operations

Inside your Q# file, define the namespace `NamespaceQFT`, which is accessed by the compiler.
For this operation to make use of existing Q# operations, open the relevant `Microsoft.Quantum.<>` namespaces.

```qsharp
namespace NamespaceQFT {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Arrays;

    // operations go here
}
```

### Define operations with arguments and returns

Next, define the `Perform3qubitQFT` operation:

```qsharp
    operation Perform3qubitQFT() : Unit {
        // do stuff
    }
```

For now, the operation takes no arguments and returns a `Unit` object, which is analogous to returning `void` in C# or an empty tuple, `Tuple[()]`, in Python.
Later, you will modify the operation to return an array of measurement results.

### Allocate qubits with `use`

Within the Q# operation, allocate a register of three qubits with the `use` keyword:

```qsharp
        use qs = Qubit[3];

        Message("Initial state |000>:");
        DumpMachine();

```

With `use`, the qubits are automatically allocated in the $\ket{0}$ state. You can verify their allocated state by using `DumpMachine`, which prints the system's current state to the console.

> [!NOTE]
> As in real quantum computations, Q# does not allow you to directly access qubit states. However, as `DumpMachine` prints the target machine's current state, it can provide valuable insight for debugging and learning when used in conjunction with the full state simulator.

### Applying single-qubit and controlled operations

Next, apply the operations that comprise the `Perform3qubitQFT` operation itself. Q# already contains these and many other basic quantum operations in the `Microsoft.Quantum.Intrinsic` namespace.

The first operation applied is the `H` (Hadamard) operation to the first qubit:

![Circuit diagram for three qubit QFT through first Hadamard](./media/qft_firstH.PNG)

To apply an operation to a specific qubit from a register (for example, a single `Qubit` from an array `Qubit[]`), use standard index notation.
So, applying the `H` operation to the first qubit of the register `qs` takes the form:

```qsharp
            H(qs[0]);
```

Besides applying the `H` operation to individual qubits, the QFT circuit consists primarily of controlled `R1` rotations.
An `R1(θ, <qubit>)` operation in general leaves the $\ket{0}$ component of the qubit unchanged while applying a rotation of $e^{i\theta}$ to the $\ket{1}$ component.

### Controlled operations

Q# makes it easy to condition the run of an operation upon one, or multiple, control qubits.
In general, the call is prefaced with `Controlled`, and the operation arguments change as follows:

 `Op(<normal args>)` $\to$ `Controlled Op([<control qubits>], (<normal args>))`.

Note that the control qubit argument must be an array, even if it is for a single qubit.

The next operations are the `R1` operations that act on the first qubit (and controlled by the second and third qubits):

![Circuit diagram for three qubit QFT through first qubit](./media/qft_firstqubit.PNG)

In your Q# file, call these operations with these statements:

```qsharp
            Controlled R1([qs[1]], (PI()/2.0, qs[0]));
            Controlled R1([qs[2]], (PI()/4.0, qs[0]));
```

The `PI()` function is used to define the rotations in terms of pi radians.

After applying the relevant `H` operations and controlled rotations to the second and third qubits,

```qsharp
            //second qubit:
            H(qs[1]);
            Controlled R1([qs[2]], (PI()/2.0, qs[1]));

            //third qubit:
            H(qs[2]);
```

you need only apply a `SWAP` operation to complete the circuit:

```qsharp
            SWAP(qs[2], qs[0]);
```

This is necessary because the nature of the quantum Fourier transform outputs the qubits in reverse order, so the swaps allow for seamless integration of the subroutine into larger algorithms.

Now you have finished writing the qubit-level operations of the quantum Fourier transform into your Q# operation:

![Three qubit quantum Fourier transform circuit diagram](./media/qft_full.PNG)

### Deallocate qubits

The last step is to call `DumpMachine()` again to see the post-operation state, and to deallocate the qubits. The qubits were in state $\ket{0}$ when you allocated them and need to be reset to their initial state using the `ResetAll` operation.

Requiring that all deallocated qubits be explicitly set to $\ket{0}$ is a basic feature of Q#, as it allows other operations to know their state precisely when they begin using those same qubits (a scarce resource). Additionally, this assures that they are not entangled with any other qubits in the system. If the reset is not performed at the end of a `use` allocation block, a runtime error might be thrown.

Add the following lines to your Q# file:

```qsharp
            Message("After:");
            DumpMachine();

            ResetAll(qs);
```

## The complete operation

Your full Q# file should now look like this:

```qsharp
namespace NamespaceQFT {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Arrays;

    operation Perform3qubitQFT() : Unit {

        use qs = Qubit[3];

        Message("Initial state |000>:");
        DumpMachine();

        //QFT:
        //first qubit:
        H(qs[0]);
        Controlled R1([qs[1]], (PI()/2.0, qs[0]));
        Controlled R1([qs[2]], (PI()/4.0, qs[0]));

        //second qubit:
        H(qs[1]);
        Controlled R1([qs[2]], (PI()/2.0, qs[1]));

        //third qubit:
        H(qs[2]);

        SWAP(qs[2], qs[0]);

        Message("After:");
        DumpMachine();

        ResetAll(qs);

    }
}
```

With the Q# file and operation complete, your quantum program is ready to be called and simulated.

## Test the operation

Having defined the Q# operation in a `.qs` file, you now need to call that operation and observe any returned classical data. For now, the operation doesn't return any value (recall that the operation previously defined returns `Unit`). Later, you will modify the operation to return an array of measurement results (`Result[]`).

While the Q# program is ubiquitous across the environments used to call it, the manner of doing so varies.
As such, follow the instructions in the tab corresponding to your setup: working from the Q# application, or using a host program in Python or C#.

### [Command prompt](#tab/tabid-cmdline)

Running the Q# program from the command prompt requires one small change to the Q# file - adding an `@EntryPoint()` to the line preceding the operation you want to run:

```qsharp
    @EntryPoint()
    operation Perform3qubitQFT() : Unit {
        // ...
```

To run the program, open the terminal in the folder of your project and enter

```dotnetcli
dotnet run
```

Upon completion, you should see the following `Message` and `DumpMachine` outputs printed in your console.

### [Python](#tab/tabid-python)

Create a Python host file: `host.py`.

The host file is constructed as follows:

1. First, import the `qsharp` module, which registers the module loader for Q# interoperability. This allows Q# namespaces (for example, the `NamespaceQFT` defined in the Q# file) to appear as Python modules, from which you can import Q# operations.
2. Next, import the Q# operations that you will directly invoke, in this case, `Perform3qubitQFT`.
    You need only import the entry point into a Q# program (for example, _not_ operations like `H` and `R1`, which are called by other Q# operations but never by the host program).
3. To run your Q# program on a quantum simulator, use the form `<Q#callable>.simulate(<args>)`.

4. Upon performing the simulation, the operation call returns values as defined in the Q# file.
    Currently there is nothing returned, but in the next step you will add measurements and return those values.

Your full `host.py` file should be:

```python
import qsharp
from NamespaceQFT import Perform3qubitQFT

Perform3qubitQFT.simulate()
```

Run the Python file, and you should see the `Message` and `DumpMachine` outputs displayed in your console.

### [C#](#tab/tabid-csharp)

Following the instructions in [Write a Q# and .NET program to run on a local quantum simulator](xref:microsoft.quantum.how-to.csharp-local), create a C# host file, and rename it to `host.cs`.

The C# host has three parts:

1. Constructing a quantum simulator.
    In the C# code, this is the variable `qsim`.
2. Running the quantum algorithm.
    Each Q# operation generates a C# class with the same name, *Perform3QubitQFT*, and a `Run` method that runs the operation **asynchronously**.
    The run is asynchronous because running it on actual hardware will be asynchronous.
    Because the `Run` method is asynchronous, you need to call the `Wait()` method; this blocks the run until the task completes and returns the result synchronously.
3. Processing the returned result of the operation.
    Currently there is nothing returned, but in the next step you will add measurements and return those values.

```csharp
using System;

using Microsoft.Quantum.Simulation.Core;
using Microsoft.Quantum.Simulation.Simulators;

namespace NamespaceQFT
{
    class Driver
    {
        static void Main(string[] args)
        {
            using (var qsim = new QuantumSimulator())
            {
                Perform3QubitQFT.Run(qsim).Wait();
            }

            System.Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }
    }
}
```

Run the application, and your output should match the following.
The program exits after you press a key.
***

```Output
Initial state |000>:
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:	 1.000000 +  0.000000 i	 == 	******************** [ 1.000000 ]     --- [  0.00000 rad ]
|1>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|2>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|3>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|4>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|5>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|6>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|7>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
After:
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|1>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|2>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|3>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|4>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|5>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|6>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|7>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
```

### Understanding the output

When called on the full-state simulator, `DumpMachine()` provides these multiple representations of the quantum state's wavefunction.
The possible states of an $n$-qubit system can be represented by $2^n$ computational basis states, each with a corresponding complex coefficient (an amplitude and a phase).
The computational basis states correspond to all the possible binary strings of length $n$, that is, all the possible combinations of qubit states $\ket{0}$ and $\ket{1}$, where each binary digit corresponds to an individual qubit.

The first row provides a comment with the IDs of the corresponding qubits in their significant order.
Qubit `2` being the "most significant" means that in the binary representation of basis state vector $\ket{i}$, the state of qubit `2` corresponds to the left-most digit.
For example, $\ket{6} = \ket{110}$ comprises qubits `2` and `1` both in $\ket{1}$ and qubit `0` in $\ket{0}$.

The rest of the rows describe the probability amplitude of measuring the basis state vector $\ket{i}$ in both Cartesian and polar formats.
Examining the first row for the input state $\ket{000}$:

* **`|0>:`** This row corresponds to the `0` computational basis state (given that the initial state post-allocation was $\ket{000}$, this is expected to be the only state with probability amplitude at this point).
* **`1.000000 +  0.000000 i`**: The probability amplitude in Cartesian format.
* **` == `**: the `equal` sign separates both equivalent representations.
* **`********************`**: A graphical representation of the magnitude. The number of `*` is proportionate to the probability of measuring this state vector.
* **`[ 1.000000 ]`**: The numeric value of the magnitude.
* **`    ---`**: A graphical representation of the amplitude's phase.
* **`[ 0.0000 rad ]`**: The numeric value of the phase (in radians).

Both the magnitude and the phase are displayed with a graphical representation. The magnitude representation is straightforward: it shows a bar of `*` and the higher the probability, the longer the bar will be. 

The displayed output illustrates that the programmed operations transformed the state from

$$
\ket{\psi}\_{initial} = \ket{000}
$$

to

$$
\begin{align}
    \ket{\psi}\_{final} &= \frac{1}{\sqrt{8}} \left( \ket{000} + \ket{001} + \ket{010} + \ket{011} + \ket{100} + \ket{101} + \ket{110} + \ket{111}  \right) \\\\
    &= \frac{1}{\sqrt{2^n}}\sum\_{j=0}^{2^n-1} \ket{j},
\end{align}
$$

which is precisely the behavior of the three-qubit Fourier transform.

If you are curious about how other input states are affected, you are encouraged to experiment with applying other qubit operations before the transform.

## Add measurements

The display from the `DumpMachine` function showed the results of the operation, but unfortunately, a cornerstone of quantum mechanics states that a real quantum system cannot have such a `DumpMachine` function.
Instead, the information is extracted through measurements, which in general not only fail to provide information on the full quantum state, but can also drastically alter the system itself.
There are many sorts of quantum measurements, but the example here focuses on the most basic: projective measurements on single qubits.
Upon measurement in a given basis (for example, the computational basis $ \{ \ket{0}, \ket{1} \} $), the qubit state is projected onto whichever basis state was measured, hence destroying any superposition between the two.

### Modify the operation

To implement measurements within a Q# program, use the `M` operation, which returns a `Result` type.

First, modify the `Perform3QubitQFT` operation to return an array of measurement results, `Result[]`, instead of `Unit`.

```qsharp
    operation Perform3QubitQFT() : Result[] {
```

### Define and initialize `Result[]` array

Before allocating qubits (for example, before the `use` statement), declare and bind a three-element array (one `Result` for each qubit):

```qsharp
        mutable resultArray = [Zero, size=3];
```

The `mutable` keyword prefacing `resultArray` allows the variable to be modified later in the code, for example, when adding your measurement results.

### Perform measurements in a `for` loop and add results to array

After the Fourier transform operations, insert the following code:

```qsharp
            for i in IndexRange(qs) {
                set resultArray w/= i <- M(qs[i]);
            }
```

The `IndexRange` function called on an array (for example, the array of qubits, `qs`) returns a range over the indices of the array.
Here, it is used in the `for` loop to sequentially measure each qubit using the `M(qs[i])` statement.
Each measured `Result` type (either `Zero` or `One`) is then added to the corresponding index position in `resultArray` with an update-and-reassign statement.

> [!NOTE]
> The syntax of this statement is unique to Q#, but corresponds to the similar variable reassignment `resultArray[i] <- M(qs[i])` seen in other languages such as F# and R.

The keyword `set` is always used to reassign variables bound using `mutable`.

### Return `resultArray`

With all three qubits measured and the results added to `resultArray`, you are safe to reset and deallocate the qubits as before. To
return the measurements, insert:

```qsharp
        return resultArray;
```

## Run the measurements

Now change the placement of the `DumpMachine` functions to output the state before and after the measurements.
Your final Q# code should look like this:

```qsharp
namespace NamespaceQFT {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Arrays;

    @EntryPoint()
    operation Perform3QubitQFT() : Result[] {

        mutable resultArray = new Result[3];

        use qs = Qubit[3];

        //QFT:
        //first qubit:
        H(qs[0]);
        Controlled R1([qs[1]], (PI()/2.0, qs[0]));
        Controlled R1([qs[2]], (PI()/4.0, qs[0]));

        //second qubit:
        H(qs[1]);
        Controlled R1([qs[2]], (PI()/2.0, qs[1]));

        //third qubit:
        H(qs[2]);

        SWAP(qs[2], qs[0]);

        Message("Before measurement: ");
        DumpMachine();

        for i in IndexRange(qs) {
            set resultArray w/= i <- M(qs[i]);
        }

        Message("After measurement: ");
        DumpMachine();

        ResetAll(qs);

        return resultArray;

    }
}
```

If you are working from the command prompt, the returned array displays directly to the console at the end of the run.
Otherwise, update your host program to process the returned array.

### [Command prompt](#tab/tabid-cmdline)

To have more understanding of the returned array printed in the console, you can add another `Message` in the Q# file just before the `return` statement:

```qsharp
        Message("Post-QFT measurement results [qubit0, qubit1, qubit2]: ");
        return resultArray;
```

Run the project, and your output should look similar to the output:

```Output
Before measurement: 
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|1>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|2>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|3>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|4>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|5>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|6>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|7>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
After measurement:
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|1>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|2>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|3>:     1.000000 +  0.000000 i  ==     ******************** [ 1.000000 ]     --- [  0.00000 rad ]
|4>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|5>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|6>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|7>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]

Post-QFT measurement results [qubit0, qubit1, qubit2]: 
[One,One,Zero]
```

### [Python](#tab/tabid-python)

Update your Python program to the following:

```python
import qsharp
from NamespaceQFT import Perform3QubitQFT

measurementResult = Perform3QubitQFT.simulate()
print("\n")
print("Measured post-QFT state: [qubit0, qubit1, qubit2]")
print(measurementResult)

# reversing order to show corresponding basis state in binary form
binaryCompBasisState = ""
for i in measurementResult:
    binaryCompBasisState = str(i) + binaryCompBasisState
print("Corresponding basis state in binary:")
print("|" + binaryCompBasisState + ">")
```

Run the file, and your output should look similar to the following:

```Output
Before measurement: 
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|1>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|2>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|3>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|4>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|5>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|6>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
|7>:	 0.353553 +  0.000000 i	 == 	***                  [ 0.125000 ]     --- [  0.00000 rad ]
After measurement: 
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|1>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|2>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|3>:	 1.000000 +  0.000000 i	 == 	******************** [ 1.000000 ]     --- [  0.00000 rad ]
|4>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|5>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|6>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   
|7>:	 0.000000 +  0.000000 i	 == 	                     [ 0.000000 ]                   

Post-QFT measurement results [qubit0, qubit1, qubit2]: 
[1, 1, 0]

Corresponding basis state in binary:
|011>
```

### [C#](#tab/tabid-csharp)

Now that the operation is returning a result, replace the method call `Wait()` with fetching the `Result` property.
The `Result` property still accomplishes the same synchronicity discussed earlier, and you can directly bind this value to the variable `measurementResult`.

```csharp
using System;

using Microsoft.Quantum.Simulation.Core;
using Microsoft.Quantum.Simulation.Simulators;

namespace NamespaceQFT
{
    class Driver
    {
        static void Main(string[] args)
        {
            using (var qsim = new QuantumSimulator())
            {
                var measurementResult = Perform3QubitQFT.Run(qsim).Result;
                System.Console.WriteLine(
                    $"Post-QFT measurement results [qubit0, qubit1, qubit2]: ");
                System.Console.WriteLine(
                    measurementResult);

                // reversing order to show corresponding basis state in binary form
                string binaryCompBasisState = String.Empty;

                foreach (Result i in measurementResult)
                {
                    string iString = i.ToString();
                    binaryCompBasisState = iString + binaryCompBasisState;
                }
                binaryCompBasisState = "|" + binaryCompBasisState + ">";
                System.Console.WriteLine(
                    $"Corresponding basis state in binary:");
                System.Console.WriteLine(
                    binaryCompBasisState);
            }

            System.Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }
    }
}
```

Run the project, and your output should look similar to the following:

```Output
Before measurement: 
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|1>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|2>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|3>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|4>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|5>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|6>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
|7>:     0.353553 +  0.000000 i  ==     ***                  [ 0.125000 ]     --- [  0.00000 rad ]
After measurement:
# wave function for qubits with ids (least to most significant): 0;1;2
|0>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|1>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|2>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|3>:     1.000000 +  0.000000 i  ==     ******************** [ 1.000000 ]     --- [  0.00000 rad ]
|4>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|5>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|6>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]
|7>:     0.000000 +  0.000000 i  ==                          [ 0.000000 ]

Post-QFT measurement results [qubit0, qubit1, qubit2]: 
[One,One,Zero]

Corresponding basis state in binary:
|ZeroOneOne>

Press any key to continue...
```

***

This output illustrates a few different things:

1. Comparing the returned result to the pre-measurement `DumpMachine`, it clearly does _not_ illustrate the post-QFT superposition over basis states.
    A measurement only returns a single basis state, with a probability determined by the amplitude of that state in the system's wavefunction.
2. From the post-measurement `DumpMachine`, you see that measurement _changes_ the state itself, projecting it from the initial superposition over basis states to the single basis state that corresponds to the measured value.

If you repeat this operation many times, you will see the result statistics begin to illustrate the equally weighted superposition of the post-QFT state that gives rise to a random result on each shot.
_However_, besides being inefficient and still imperfect, this would nevertheless only reproduce the relative amplitudes of the basis states, not the relative phases between them.
The latter is not an issue in this example, but you would see relative phases appear if given a more complex input to the QFT than $\ket{000}$.

#### Partial measurements

To explore how measuring only some qubits of the register can affect the system's state, try adding the following inside the `for` loop, after the measurement line:

```qsharp
                let iString = IntAsString(i);
                Message("After measurement of qubit " + iString + ":");
                DumpMachine();
```

Note that to access the `IntAsString` function, you have to add an additional `open` statement:

```qsharp
    open Microsoft.Quantum.Convert;
```

In the resulting output, you see the gradual projection into subspaces as each qubit is measured.

## Use the Q# libraries

As mentioned in the introduction, much of Q#'s power rests in the fact that it allows you to abstract-away the worries of dealing with individual qubits.
Indeed, if you want to develop full-scale, applicable quantum programs, worrying about whether an `H` operation goes before or after a particular rotation would only slow you down.

The Q# libraries contain the `QFT` operation, which you can use and apply for any number of qubits.
To give it a try, define a new operation in your Q# file that has the same contents of `Perform3QubitQFT`, but with everything from the first `H` to the `SWAP` replaced by two easy lines:

```qsharp
            let register = BigEndian(qs);    //from Microsoft.Quantum.Arithmetic
            QFT(register);                   //from Microsoft.Quantum.Canon
```

The first line creates a `BigEndian` expression of the allocated array of qubits, `qs`, which is what the QFT operation takes as an argument.
This corresponds to index ordering of the qubits in the register.

To have access to these operations, add `open` statements for their respective namespaces at the beginning of the Q# file:

```qsharp
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Arithmetic;
```

Now, adjust your host program to call the name of your new operation, for example,`PerformIntrinsicQFT`, and run it again.

To see the real benefit of using the Q# library operations, change the number of qubits to something other than `3`:

```qsharp
        mutable resultArray = new Result[4];

        use qs = Qubit[4];
        //...

```

You can thus apply the proper QFT for any given number of qubits, without having to worry about the mess of new `H` operations and rotations on each qubit.

## Next steps

Continue to explore other quantum algorithms and techniques:

* The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
* [Explore entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement.
* The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are Jupyter Notebook-based, self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
