---
author: tedhudek
description: In this tutorial, you will learn how to write a quantum program in Q# that demonstrates the superposition and entanglement of qubits.
ms.author: tedhudek
ms.date: 11/15/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v']
title: Explore entanglement with Q#
uid: microsoft.quantum.tutorial-qdk.entanglement
---

# Tutorial: Explore entanglement with Q\#

This tutorial shows you how to write a Q# program that manipulates and measures qubits, and demonstrates the effects of superposition and entanglement. 

* Where classical bits hold a single binary value such as a 0 or 1, the state of a [qubit](xref:microsoft.quantum.glossary-qdk#qubit) can be in a [superposition](xref:microsoft.quantum.glossary-qdk#superposition) of two quantum states, 0 and 1. Each possible quantum state has an associated probability amplitude..
* The act of [**measuring**](xref:microsoft.quantum.glossary-qdk#measurement) a qubit produces a binary result, either 0 or 1, with a certain probability, and changes the state of the qubit out of superposition. 
* Multiple qubits can be [**entangled**](xref:microsoft.quantum.glossary-qdk#entanglement) such that they cannot be described independently from each other. That is, whatever happens to one qubit, also happens to the entangled qubit.

In this tutorial, you will prepare two qubits in a specific quantum state, learn how to operate on qubits with Q# to change their state, and demonstrate the effects
of superposition and entanglement. You will build your Q# program piece by piece to introduce qubit states, operations, and measurement.

## Prerequisites

* [Install the Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview) using your preferred language and development environment.
* If you already have the QDK installed, make sure you have [updated](xref:microsoft.quantum.update-qdk) to the latest version.
* Create a Q# project named **Bell** for either a [Q# application](xref:microsoft.quantum.how-to.standalone-local) or a [C# host program](xref:microsoft.quantum.how-to.csharp-local). Alternatively, you can run your Q# code directly in [Juptyer Notebooks](xref:microsoft.quantum.how-to.standalone-local) or from a [Python host program](xref:microsoft.quantum.how-to.python-local).

In this tutorial, you'll learn how to

> [!div class="checklist"]
> * Create Q# operations to measure and initialize a qubit to a desired state.
> * Create qubits and test your program.
> * Put a qubit in superposition.
> * Entangle a pair of qubits. 

## Initialize a qubit using measurement

The first step is to define a Q# operation that will initialize a qubit to a known state. This can be called to set a qubit to a classical state, meaning it either returns `Zero` 100% of the time or returns `One` 100% of the time. `Zero` and `One` are Q# values that represent the only two possible results of a measurement of a qubit.

In your project, replace the contents of `Program.qs` with the following code:

```qsharp
   namespace Bell {
       open Microsoft.Quantum.Intrinsic;
       open Microsoft.Quantum.Canon;

       operation SetQubitState(desired : Result, target : Qubit) : Unit {
           if desired != M(target) {
               X(target);
           }
       }
   }
```

The code example introduces two standard operations, [`M`](xref:Microsoft.Quantum.Intrinsic.M) and [`X`](xref:Microsoft.Quantum.Intrinsic.X), which transform the state of a qubit. 

The  `SetQubitState` operation:

1. Takes two parameters: a type [`Result`](xref:microsoft.quantum.qsharp.typesystem-overview#available-types), named `desired`, that represents the desired state for the qubit to be in (0 or 1), and a type [`Qubit`](xref:microsoft.quantum.qsharp.typesystem-overview#available-types). 
1. Performs a measurement operation, `M`, which measures the state of the qubit (`Zero` or `One`) and compares the result to the value specified in `desired`.
1. If the measurement does not match the compared value, it runs an `X` operation, which flips the state of the qubit to where the probabilities of a measurement returning `Zero` and `One` are reversed. This way, `SetQubitState` always puts the target qubit in the desired state. 

## Test the measurement

Next, to demonstrate the effect of the `SetQubitState` operation, create another operation named `TestBellState`. 

Add the following operation to your `Program.qs` file after the `SetQubitState` operation:

```qsharp
operation TestBellState(count : Int, initial : Result) : (Int, Int, Int, Int) {
    mutable numOnesQ1 = 0;
    mutable numOnesQ2 = 0;

    // allocate the qubits
    use (q1, q2) = (Qubit(), Qubit());   
    for test in 1..count {
        SetQubitState(initial, q1);
        SetQubitState(Zero, q2);
        
        // measure each qubit
        let resultQ1 = M(q1);            
        let resultQ2 = M(q2);           

        // Count the number of 'Ones' we saw:
        if resultQ1 == One {
            set numOnesQ1 += 1;
        }
        if resultQ2 == One {
            set numOnesQ2 += 1;
        }
    }

    // reset the qubits
    SetQubitState(Zero, q1);             
    SetQubitState(Zero, q2);
    

    // Return times we saw |0>, times we saw |1>
    Message("q1:Zero, One  q2:Zero, One");
    return (count - numOnesQ1, numOnesQ1, count - numOnesQ2, numOnesQ2 );

}
```

The `TestBellState`operation:

1. Takes two parameters: `count`, the number of times to run a measurement, and `initial`, the desired state to initialize the qubit. 
1. Calls the `use` statement to initialize two qubits.
1. Loops for `count` iterations. For each loop, it
    1. Calls `SetQubitState` to set a specified `initial` value on the first qubit.
    1. Calls `SetQubitState` again to set the second qubit to a `Zero` state. 
    1. Uses the `M` operation to measure each qubit.
    1. Stores the number of measurements for each qubit that return `One`.
1. After the loop completes, it calls `SetQubitState` again to reset the qubits to a known state (`Zero`) to allow others to
allocate the qubits in a known state. This is required by the `use` statement. 
1. Finally, it uses the [`Message`](xref:Microsoft.Quantum.Intrinsic.Message) function to print a message to the console before returning the results.

### Run the code from the command prompt

Before moving on to the procedures for superposition and entanglement, test the code up to this point to see the initialization and measurement of the qubits. 

In order to run the code as a standalone program, the Q# compiler needs to know *where* to start the program when you run the `dotnet run` command. This is done in the Q# file by adding an `@EntryPoint()` directly preceding the operation that you want to run: the `TestBellState` operation in this case. 

> [!NOTE]
> `@EntryPoint()` is only required for standalone Q# programs. When running a Q# program in [Jupyter Notebooks](xref:microsoft.quantum.how-to.standalone-local), or calling a Q# program from a [Python](xref:microsoft.quantum.how-to.python-local) or [.NET](xref:microsoft.quantum.how-to.csharp-local) host file, it is not required and will throw an error if included. 

Your `program.qs` file should now look like this:

```qsharp
namespace Bell {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;

       operation SetQubitState(desired : Result, target : Qubit) : Unit {
           if desired != M(target) {
               X(target);
           }
       }

    @EntryPoint()
    operation TestBellState(count : Int, initial : Result) : (Int, Int, Int, Int) {
        mutable numOnesQ1 = 0;
        mutable numOnesQ2 = 0;

        // allocate the qubits
        use (q1, q2) = (Qubit(), Qubit());   
        for test in 1..count {
            SetQubitState(initial, q1);
            SetQubitState(Zero, q2);
            
            // measure each qubit
            let resultQ1 = M(q1);            
            let resultQ2 = M(q2);           
    
            // Count the number of 'Ones' we saw:
            if resultQ1 == One {
                set numOnesQ1 += 1;
            }
            if resultQ2 == One {
                set numOnesQ2 += 1;
            }
        }
    
        // reset the qubits
        SetQubitState(Zero, q1);             
        SetQubitState(Zero, q2);
        
    
        // Return times we saw |0>, times we saw |1>
        Message("q1:Zero, One  q2:Zero, One");
        return (count - numOnesQ1, numOnesQ1, count - numOnesQ2, numOnesQ2 );

    }
}

```

To run the program, you need to specify the `count` and `initial` arguments from the command prompt. For example, `--count 1000` and `--initial One` will initialize the first qubit to `One` and measure each qubit 1000 times. Run the following command:

```dotnetcli
dotnet run --count 1000 --initial One
```

and you should observe the following output:

```output
Q1:Zero/One  Q2:Zero/One
(0, 1000, 1000, 0)
```

Because the qubits haven't been manipulated yet, they have retained their initial values: the first qubit returns `One` every time, and the second qubit returns `Zero`.

If you run it with `--initial Zero`, you should observe that the first qubit also returns `Zero` every time.

```dotnetcli
dotnet run --count 1000 --initial Zero
```

```output
Q1:Zero/One  Q2:Zero/One
(1000, 0, 1000, 0)
```

## Put a qubit in superposition

Currently, the qubits in the program are all in a **classical state**, that is, they are either 1 or 0. You know this because the program initializes the qubits to a known state, and you haven't added any processes to manipulate them.  Before entangling the qubits, you will put the first qubit into a **superposition state**, where a measurement of the qubit will return `Zero` 50% of the time and `One` 50% of the time. Conceptually, the qubit can be thought of as halfway between the `Zero` and `One`.

To put a qubit in superposition, Q# provides the [`H`](xref:Microsoft.Quantum.Intrinsic.H), or *Hadamard*, operation. Recall the `X` operation from the [Initialize a qubit using measurement](#initialize-a-qubit-using-measurement) procedure earlier, which flipped a qubit from 0 to 1 (or vice versa); the `H` operation flips the qubit *halfway* into a state of equal probabilities of 0 or 1. When measured, a qubit in superposition should return roughly an equal number of `Zero` and `One` results.

Modify the code in the `TestBellState` operation to include the `H` operation:

```qsharp
    for test in 1..count {
        use (q1, q2) = (Qubit(), Qubit());   
        for test in 1..count {
            SetQubitState(initial, q1);
            SetQubitState(Zero, q2);
            
            H(q1);                // Add the H operation after initialization and before measurement

            // measure each qubit
            let resultQ1 = M(q1);            
            let resultQ2 = M(q2); 
```

Now when you run the program, you can see the results of the first qubit in superposition:

```dotnetcli
dotnet run --count 1000 --initial One
```

```output
Q1:Zero/One  Q2:Zero/One
(523, 477, 1000, 0)      // results will vary
```

Every time you run the program, the results for the first qubit will vary slightly, but will be close to 50% `One` and 50% `Zero`, while the results for the second qubit will remain `Zero` all the time.

```dotnetcli
dotnet run --count 1000 --initial One
```

```output
Q1:Zero/One  Q2:Zero/One
(510, 490, 1000, 0)
```

Initializing the first qubit to `Zero` returns similar results.

```dotnetcli
dotnet run --count 1000 --initial Zero
```

```output
Q1:Zero/One  Q2:Zero/One
(504, 496, 1000, 0)
```

## Entangle two qubits

As mentioned earlier, entangled qubits are connected such that they cannot be described independently from each other. That is, whatever operation happens to one qubit, also happens to the entangled qubit. This allows you to know the resulting state of one qubit without measuring it, just by measuring the state of the other qubit. (This example uses two qubits; however, it is also possible to entangle three or more qubits).

To enable entanglement, Q# provides the `CNOT` operation, which stands for *Controlled-NOT*.  The result of running this operation on two qubits is to flip the second qubit if the first qubit is `One`.

Add the `CNOT` operation to your program immediately after the `H` operation. Your full program should look like this:

```qsharp
namespace Bell {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;

       operation SetQubitState(desired : Result, target : Qubit) : Unit {
           if desired != M(target) {
               X(target);
           }
       }

    @EntryPoint()
    operation TestBellState(count : Int, initial : Result) : (Int, Int, Int, Int) {
        mutable numOnesQ1 = 0;
        mutable numOnesQ2 = 0;

        // allocate the qubits
        use (q1, q2) = (Qubit(), Qubit());   
        for test in 1..count {
            SetQubitState(initial, q1);
            SetQubitState(Zero, q2);
        
            H(q1);            
            CNOT(q1, q2);      // Add the CNOT operation after the H operation

            // measure each qubit
            let resultQ1 = M(q1);            
            let resultQ2 = M(q2);           
    
            // Count the number of 'Ones' we saw:
            if resultQ1 == One {
                set numOnesQ1 += 1;
            }
            if resultQ2 == One {
                set numOnesQ2 += 1;
            }
        }
    
        // reset the qubits
        SetQubitState(Zero, q1);             
        SetQubitState(Zero, q2);
        
    
        // Return times we saw |0>, times we saw |1>
        Message("q1:Zero, One  q2:Zero, One");
        return (count - numOnesQ1, numOnesQ1, count - numOnesQ2, numOnesQ2 );

    }
}

```

Now when you run the program:

```dotnetcli
dotnet run --count 1000 --initial One
```

```output
Q1:Zero/One  Q2:Zero/One
(502, 498, 502, 498)
```

The statistics for the first qubit haven't changed (a 50/50 chance of a `Zero` or a `One` after measurement), but the measurement results for the second qubit are **always** the same as the measurement of the first qubit. The `CNOT` operation has entangled the two qubits, so that whatever happens to one of them, happens to the other. 

## Next steps

Continue to explore other quantum algorithms and techniques:

* The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
* The tutorial [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
* The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are Jupyter Notebook-based, self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
