---
author: bradben
description: Build a Q# project that demonstrates fundamental quantum concepts like superposition by creating a quantum random number generator.
ms.author: brbenefield
ms.date: 10/31/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v']
title: 'Tutorial: Create a Quantum Random Number Generator'
uid: microsoft.quantum.tutorial-qdk.random-number
---

# Tutorial: Implement a quantum random number generator in Q\#

Learn to write a basic quantum program in Q# that leverages the nature of quantum mechanics to produce a random number.

In this tutorial, you'll learn how to

- Create a Q# project.
- Prepare your development environment for writing quantum programs in Q#.
- Understand how Q# programs are structured.
- Work with qubits and superposition to build a quantum random number generator.

## Prerequisites

- Install the Quantum Development Kit (QDK) using your preferred language and development environment. This tutorial presents the solution in three different formats:
    - Q# standalone ([Set up a Q# standalone environment](xref:microsoft.quantum.install-qdk.overview.standalone))
    - Q# and Python ([Set up a Q# and Python environment](xref:microsoft.quantum.install-qdk.overview.python))
    - Q# and C# ([Set up a Q# and .NET environment](xref:microsoft.quantum.install-qdk.overview.standalone#q-and-other-ides))
- If you already have the QDK installed, make sure you have [updated the QDK](xref:microsoft.quantum.update-qdk) (and the [Python qsharp package](xref:microsoft.quantum.update-qdk#update-the-qsharp-python-package), if applicable) to the latest version.

## Creating a Q# project

The first thing you need to do is to create a new Q# project. This tutorial uses the environment based on [Q# applications with VS Code](xref:microsoft.quantum.install-qdk.overview.standalone#q-and-other-ides), but you can use your preferred IDE. 

To create a new project in Visual Studio Code: 

1. Select **View** -> **Command Palette** and select **Q#: Create New Project**.
2. Select **Standalone console application**.
3. Select a location to save the project, name it **Qrng**, and select **Create Project**.
4. When the project is successfully created, select **Open new project...** in the
   lower right.

This generates two files: the project file, *Qrng.csproj*, and a Q# application template, *Program.qs*, that you will use to write your application.

## Write a Q\# operation

Now, replace the contents of the *Program.qs* file with the following code:

```qsharp
namespace Qrng {
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    
    operation SampleQuantumRandomNumberGenerator() : Result {
        // Allocate a qubit        
        use q = Qubit();  
        // Put the qubit to superposition
        // It now has a 50% chance of being measured 0 or 1  
        H(q);      
        // Measure the qubit value            
        return M(q); 
    }
}
```

Now take a look at new code.

- First, you `open` the necessary namespaces from the Q# libraries for the functions and operations needed. 
- You define the `SampleQuantumRandomNumberGenerator` operation, which takes no input and produces a value of type [`Result`](xref:microsoft.quantum.qsharp.typesystem-overview#available-types). The `Result` type represents the result of a measurement and can have two possible values: `Zero` or `One`.  
- Allocate a single [qubit](xref:microsoft.quantum.glossary-qdk#qubit) with the `use` keyword. 
- Use the [`H`](xref:Microsoft.Quantum.Intrinsic.H) ([Hadamard](xref:microsoft.quantum.glossary-qdk#hadamard)) operation to place the qubit in an equal [superposition](xref:microsoft.quantum.glossary-qdk#superposition). 
- Use the [`M`](xref:Microsoft.Quantum.Intrinsic.M) operation to measure the qubit and return the measured value (`Zero` or `One`). 

As discussed in the [Understanding quantum computing](xref:microsoft.quantum.overview.understanding) article, a qubit is a unit of quantum information that can be in [superposition](xref:microsoft.quantum.glossary-qdk#superposition). When measured, a qubit can only be either in the **0** state or in the **1** state. However, before measurement, the state of the qubit represents the *probability* of reading either a **0** or a **1** with a measurement. In this example, before the measurement the qubit is in an equal superposition, that is there is a probability of 50% of reading  **0** and 50% of reading **1**.  You can use this probability to generate random numbers.

The user-defined `SampleQuantumRandomNumberGenerator` operation introduces the [`Qubit`](xref:microsoft.quantum.qsharp.quantumdatatypes#qubits) datatype, which is native to Q#. You can only allocate a `Qubit` with a `use` statement. When it gets allocated, a qubit is always in the `Zero` state. 

By putting the qubit in superposition with the [`H`](xref:Microsoft.Quantum.Intrinsic.H) operation and measuring it with the [`M`](xref:Microsoft.Quantum.Intrinsic.M) operation, the result is a different value each time the code is invoked.

### Visualizing the code with the Bloch sphere

In the [Bloch sphere](xref:microsoft.quantum.glossary-qdk#bloch-sphere), the north pole represents the classical value **0** and the south pole represents the classical value **1**. Any superposition can be represented by a point on the sphere (represented by an arrow). The closer the end of the arrow to a pole the higher the probability the qubit collapses into the classical value assigned to that pole when measured. For example, the qubit state represented by the arrow in the following figure has a higher probability of giving the value **0** if you measure it.

:::image type="content" source="~/media/qrng-Bloch.png>" alt-text="A diagram showing a qubit state with a high probability of measuring zero.":::

You can use this representation to visualize what the code is doing:

* First, start with a qubit initialized in the state **0** and apply an [`H`](xref:Microsoft.Quantum.Intrinsic.H) operation to create an equal superposition in which the probabilities for **0** and **1** are the same.

<img src="~/media/qrng-H.png" width="450" alt="A diagram showing the preparation of a qubit in superposition by applying the hadamard gate.">

* Then measure the qubit and save the output:

<img src="~/media/qrng-meas.png" width="450" alt="A diagram showing the measurement of a qubit and saving the output.">

Since the outcome of the measurement is random and the probabilities of measuring **0** and **1** are the same, you have obtained a completely random bit. You can call this operation several times to create integers. For example, if you call the operation three times to obtain three random bits, you can build random 3-bit numbers (that is, a random number between 0 and 7).

## Create a complete random number generator

Now that you have a Q# operation that generates random bits, you can combine multiple random bits to build a complete quantum random number generator. You can run your program as a standalone Q# application, or use a host program in Python or .NET to call your Q# code.

### Define the random number generator logic

First, outline what the logic of a random number generator should be, provided there already exists a random bit generator:

1. Define *max* as the maximum number you want to generate.
1. Define the number of random bits that you need to generate. This is done by calculating how many bits, *numBits*, you need to express integers up to *max*.
1. Generate a random bit string that is *numBits* in length.
1. If the bit string represents a number greater than *max*, go back to step three.
1. Otherwise, the process is complete. Return the generated number as an integer.

### Define the operation 

Next, define the `SampleRandomNumberInRange` operation, which uses a `for` loop to repeatedly call the `SampleQuantumRandomNumberGenerator` operation and build a string of bits.

Modify *Program.qs* to add the new operation:

```qsharp
namespace Qrng {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;

    operation SampleQuantumRandomNumberGenerator() : Result {
        // Allocate a qubit        
        use q = Qubit();  
        // Put the qubit to superposition
        // It now has a 50% chance of being measured 0 or 1  
        H(q);      
        // Measure the qubit value            
        return M(q);           
    }

    operation SampleRandomNumberInRange(max : Int) : Int {
        mutable output = 0; 
        repeat {
            mutable bits = []; 
            for idxBit in 1..BitSizeI(max) {
                set bits += [SampleQuantumRandomNumberGenerator()]; 
            }
            set output = ResultArrayAsInt(bits);
        } until (output <= max);
        return output;
    }
}
```

Now take a moment to review the new operation.

- In order to calculate the number of bits needed to express integers up to `max`, use the [`BitSizeI`](xref:Microsoft.Quantum.Math.BitSizeI) function.
- The `SampleRandomNumberInRange` operation uses a [`repeat`](xref:Microsoft.Quantum.Canon.Repeat) loop to generate random numbers until it generates one that's equal to or less than `max`.
- The `for` loop inside `repeat` works exactly the same as a for loop in other programming languages.
- In this example, `output` and `bits` are [mutable](xref:microsoft.quantum.glossary-qdk#mutable) variables. A mutable variable is one that can change during the computation. You use the `set` directive to change the value of a mutable variable.
- The [`ResultArrayAsInt`](xref:Microsoft.Quantum.Convert.ResultArrayAsInt) function converts the bit string to a positive integer.

The `Qrng` program can now generate random numbers. 

## Run the random number generator program

Using your final version of the Q# code,

```qsharp
namespace Qrng {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;

    operation SampleQuantumRandomNumberGenerator() : Result {
        // Allocate a qubit        
        use q = Qubit();  
        // Put the qubit to superposition
        // It now has a 50% chance of being measured 0 or 1  
        H(q);      
        // Measure the qubit value            
        return M(q);           
    }

    operation SampleRandomNumberInRange(max : Int) : Int {
        mutable output = 0; 
        repeat {
            mutable bits = []; 
            for idxBit in 1..BitSizeI(max) {
                set bits += [SampleQuantumRandomNumberGenerator()]; 
            }
            set output = ResultArrayAsInt(bits);
        } until (output <= max);
        return output;
    }
}
```

select the tab for your preferred language and environment and follow the instructions for running or calling your Q# program. 

### [Standalone Q# application with Visual Studio or Visual Studio Code](#tab/tabid-qsharp)

A standalone Q# application requires an `EntryPoint` so the Q# compiler knows where to start the program. To create the full Q# application, add the following entry point to your Q# program, *Program.qs*:

```qsharp
namespace Qrng {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;

    operation SampleQuantumRandomNumberGenerator() : Result {
        // Allocate a qubit.
        use q = Qubit();
        // Put the qubit to superposition.
        H(q);
        // It now has a 50% chance of being measured 0 or 1.
        // Measure the qubit value.
        return M(q);
    }

    operation SampleRandomNumberInRange(max : Int) : Int {
        mutable output = 0; 
        repeat {
            mutable bits = []; 
            for idxBit in 1..BitSizeI(max) {
                set bits += [SampleQuantumRandomNumberGenerator()]; 
            }
            set output = ResultArrayAsInt(bits);
        } until (output <= max);
        return output;
    }

    @EntryPoint()
    operation SampleRandomNumber() : Int {
        let max = 50;
        Message($"Sampling a random number between 0 and {max}: ");
        return SampleRandomNumberInRange(max);
    }
}
```

The program runs the operation or function marked with the `@EntryPoint()` attribute on a simulator or resource estimator, depending on the project configuration and command-line options.

In Visual Studio, simply press **Ctrl + F5** to run the script.

In VS Code, build *Program.qs* the first time by typing the following in the terminal:

```dotnetcli
dotnet build
```

For subsequent runs, there is no need to build it again. To run it, type the following command and press enter:

```dotnetcli
dotnet run --no-build
```

### [Python with Visual Studio Code or the command prompt](#tab/tabid-python)

When using Python to run a Q# program, there is no need to add an `EntryPoint` to the Q# file. Instead, you create a Python host program that imports and runs the `SampleQuantumRandomNumberGenerator` operation.

Save the following code as `host.py`:

```python
import qsharp
# Import the quantum operation from the namespace defined in the program.qs file 
from Qrng import SampleQuantumRandomNumberGenerator 
# Set the maximum range
max = 50 
# Variable to store the output
output = max + 1 
while output > max:
    # Initialize a list to store the bits that will define the random integer
    bit_string = [] 
    # Call the quantum operation as many times as there are bits
    # needed to define the maximum of the range. For example, if max=7, you need three bits
    # to generate all the numbers from 0 to 7.
    for i in range(0, max.bit_length()):  
        # Call the quantum operation and store the random bit in the list
        bit_string.append(SampleQuantumRandomNumberGenerator.simulate()) 
    # Transform bit string to integer
    output = int("".join(str(x) for x in bit_string), 2) 
# Print the random number
print("The random number generated is " + str(output))

```

You can then run your Python host program from the command prompt:

```bash
$ python host.py
Preparing Q# environment...
..The random number generated is 42
```

### [C# with Visual Studio Code or Visual Studio](#tab/tabid-csharp)

When using C# (or F#) to run a Q# program, there is no need to add an `EntryPoint` to the Q# file. Instead, you create a C# host program that references the Q# file and calls the `SampleQuantumRandomNumberGenerator` operation. 

In your project, modify *Program.qs* with the following C# code:

:::code language="csharp" source="~/quantum/samples/interoperability/qrng/Host.cs" range="4-":::

You can then run your C# host program from the command prompt (in Visual Studio, press **Ctrl + F5**):

```bash
$ dotnet run
The random number generated is 42
```

***

> [!NOTE]
> This code snippet does not currently run on any available Azure Quantum hardware targets, as the callable `ResultArrayAsInt` requires a QPU with [full computation profile](/azure/quantum/concepts-targets-in-azure-quantum#quantum-processing-units-qpu-different-profiles).

## Next steps

Explore other Q# tutorials:

- [Explore entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement.
- [Implement Grover's search algorithm in Q#](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem. 
- [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
