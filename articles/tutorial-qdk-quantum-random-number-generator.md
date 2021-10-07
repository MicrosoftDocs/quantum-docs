---
author: bromeg
description: Build a Q# project that demonstrates fundamental quantum concepts like superposition by creating a quantum random number generator.
ms.author: megbrow
ms.date: 08/12/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v']
title: Create a Quantum Random Number Generator
uid: microsoft.quantum.tutorial-qdk.random-number
---

# Tutorial: Implement a Quantum Random Number Generator in Q\#

In this tutorial, you'll write your first quantum program by using the Quantum Development Kit (QDK). A simple example of a quantum algorithm written in Q# is a quantum random number generator. This algorithm leverages the nature of quantum mechanics to produce a random number.

## Prerequisites

- [Install the Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview?tabs=tabid-local#install-the-qdk-and-develop-quantum-applications-locally) using your preferred language and development environment.
- If you already have the QDK installed, make sure you have [updated](xref:microsoft.quantum.update-qdk) to the latest version.

## In this tutorial, you'll learn how to:

> [!div class="checklist"]
> - Create a Q# project.
> - Prepare your development environment for writing quantum programs in Q#.
> - Understand how Q# programs are structured.
> - Work with qubits and superposition to build a quantum random number generator.


## Creating a Q# project

The first thing you need to do is to create a new Q# project. This tutorial uses the environment based on [Q# applications with VS Code](xref:microsoft.quantum.install-qdk.overview.standalone), but you can use your preferred IDE. 

To create a new project, in VS Code: 

1. Click **View** -> **Command Palette** and select **Q#: Create New Project**.
2. Click **Standalone console application**.
3. Navigate to the location to save the project and click **Create Project**.
4. When the project is successfully created, click **Open new project...** in the
   lower right.

In this case the project is called `Qrng`. This generates two files: `Qrng.csproj`, the project file and `Program.qs`, a template of a Q# application
that we will use to write our application. The content of `Program.qs` should be:

```qsharp
   namespace Qrng {

      open Microsoft.Quantum.Canon;
      open Microsoft.Quantum.Intrinsic;
      
      @EntryPoint()
      operation HelloQ() : Unit {
          Message("Hello quantum world!");
      }
   }
```

## Write a Q\# operation

Replace the contents of the Program.qs file with the following code:

```qsharp
namespace Qrng {
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    
    @EntryPoint()
    operation GenerateRandomBit() : Result {
        use q = Qubit();   // Allocate a qubit.
        H(q);              // Put the qubit to superposition. It now has a 50% chance of being 0 or 1.
        return MResetZ(q); // Measure the qubit value.
    }
}
```

Let's take a look at this code. You define the `GenerateRandomBit` operation, which takes no input and produces a value of type `Result`. The `Result` type represents the result of a measurement and can have two possible values: `Zero` and `One`. `EntryPoint` tells the Q# compiler to begin executing the program here. In Q#, qubits are allocated through the `use` keyword. The `H` operation places the qubit in superposition. The `M` operation measures the qubit and returns the measured value (a zero or a one).

As mentioned in the [Understanding quantum computing](xref:microsoft.quantum.overview.understanding) article, a qubit is a unit of quantum information that can be in superposition. When measured, a qubit can only be either 0 or 1. However, before measurement, the state of the qubit represents the probability of reading either a 0 or a 1 with a measurement. This probabilistic state is known as superposition. One can use this probability to generate random numbers.

This Q# operation introduces the `Qubit` datatype, native to Q#. We can only allocate a `Qubit` with a `use` statement. When it gets allocated, a qubit is always in the `Zero`  state. 

By putting the `Qubit` in superposition with the `H` operation and measuring it with the `M` intrinsic operation, the result will be a different value each time the code is invoked.

When a `Qubit` is deallocated it must be explicitly set back to the `Zero` state, otherwise the simulator will report a runtime error. An easy way to achieve this is invoking `Reset`.

### Visualizing the code with the Bloch sphere

In the Bloch sphere, the north pole represents the classical value **0** and the south pole represents the classical value **1**. Any superposition can be represented by a point on the sphere (represented by an arrow). The closer the end of the arrow to a pole the higher the probability the qubit collapses into the classical value assigned to that pole when measured. For example, the qubit state represented by the red arrow below has a higher probability of giving the value **0** if we measure it.

<img src="~/media/qrng-Bloch.png" width="175" alt="A qubit state with a high probability of measuring zero">

We can use this representation to visualize what the code is doing:

* First we start with a qubit initialized in the state **0** and apply `H` to create a superposition in which the probabilities for **0** and **1** are the same.

<img src="~/media/qrng-H.png" width="450" alt="Preparing a qubit in superposition">

* Then we measure the qubit and save the output:

<img src="~/media/qrng-meas.png" width="450" alt="Measuring a qubit and saving the output">

Since the outcome of the measurement is completely random, we have obtained a random bit. We can call this operation several times to create integers. For example, if we call the operation three times to obtain three random bits, we can build random 3-bit numbers (that is, a random number between 0 and 7).

## Create a complete random number generator

Now that you have a Q# operation that generates random bits, you can combine multiple random bits to build a complete quantum random number generator. You can use a Q# application or use a host program to do it.

### Define the random number generator logic
First, let's outline what the logic of a random number generator should be, provided there already exists a random bit generator:

1. Define `max` as the maximum number you want to generate.
1. Define the number of random bits that you need to generate. This is done by calculating how many bits, `nBits`, we need to express integers up to max.
1. Generate a random bit string that is `nBits` in length.
1. If the bit string represents a number greater than `max`, go back to step three.
1. Otherwise, the process is complete. Return the generated number as an integer.

### Define the operation 

Define the `SampleRandomNumberInRange` operation, which repeatedly calls the `GenerateRandomBit` operation to build a string of bits.

Modify `Program.qs` like this:

```qsharp
namespace Qrng {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;

    operation GenerateRandomBit() : Result {
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
            mutable bits = new Result[0]; 
            for idxBit in 1..BitSizeI(max) {
                set bits += [GenerateRandomBit()]; 
            }
            set output = ResultArrayAsInt(bits);
        } until (output <= max);
        return output;
    }
}
```
Let's take a moment to review the new code.

In order to calculate the number of bits needed to express integers up to max, the `Microsoft.Quantum.Math` library provides the `BitSizeI` function to accomplish this task.

The `SampleRandomNumberInRange` operation uses a `repeat` loop to generate random numbers until it generates one that's equal to or less than max.

The `for` loop inside `repeat` works exactly the same as a for loop in other programming languages.

In this example, `output` and `bits` are mutable variables. A mutable variable is one that can change during the computation. You use the set directive to change a mutable variable's value.

The `ResultArrayAsInt` function comes from the `Microsoft.Quantum.Convert library`. This function converts the bit string to a positive integer.

The `Qrng` program can now generate random numbers. Modify `Program.qs` like this to define the entry point.

### [Q# applications with Visual Studio or Visual Studio Code](#tab/tabid-qsharp)

To create the full Q# application, add the following entry point to your Q# program:

```qsharp
namespace Qrng {

    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;

    operation GenerateRandomBit() : Result {
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
            mutable bits = new Result[0]; 
            for idxBit in 1..BitSizeI(max) {
                set bits += [GenerateRandomBit()]; 
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

The program will run the operation or function marked with the `@EntryPoint()` attribute on a simulator or resource estimator, depending on the project configuration and command-line options.

In Visual Studio, simply press Ctrl + F5 to run the script.

In VS Code, build the Program.qs the first time by typing the below in the terminal:

```dotnetcli
dotnet build
```

For subsequent runs, there is no need to build it again. To run it, type the following command and press enter:

```dotnetcli
dotnet run --no-build
```

### [Python with Visual Studio Code or the command prompt](#tab/tabid-python)

To run your new Q# program from Python, save the following code as `host.py`:

:::code language="python" source="~/quantum/samples/interoperability/qrng/host.py" range="11-":::

You can then run your Python host program from the command prompt:

```bash
$ python host.py
Preparing Q# environment...
..The random number generated is 42
```

### [C# with Visual Studio Code or Visual Studio](#tab/tabid-csharp)

To run your new Q# program from C#, modify `Driver.cs` to include the following C# code:

:::code language="csharp" source="~/quantum/samples/interoperability/qrng/Host.cs" range="4-":::

You can then run your C# host program from the command prompt (in Visual Studio you should press F5):

```bash
$ dotnet run
The random number generated is 42
```

***

> [!NOTE]
> This code snippet does not currently run on any available Azure Quantum hardware targets, as the callable `ResultArrayAsInt` requires a QPU with [full computation profile](/azure/quantum/concepts-targets-in-azure-quantum#quantum-processing-units-qpu-different-profiles).

## Next steps

The tutorial [Explore entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement.

[Set up Azure Quantum](xref:microsoft.quantum.install-qdk.overview)
recommends more ways to learn Q# and quantum programming.
