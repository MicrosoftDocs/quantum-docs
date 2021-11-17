---
author: bradben
description: Learn how to write a quantum program in Q#. Develop a Bell State application using the Quantum Development Kit (QDK)
ms.author: v-benbra
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

You will write an application called `Bell` to demonstrate quantum entanglement. The name Bell is in reference to [Bell states](xref:microsoft.quantum.glossary-qdk#bell-state), which are specific quantum states of two qubits that are used to represent the simplest examples of superposition and quantum entanglement.

## Prerequisites

* [Install the Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview) using your preferred language and development environment.
* If you already have the QDK installed, make sure you have [updated](xref:microsoft.quantum.update-qdk) to the latest version.
* Create a Q# project for either a [Q# application](xref:microsoft.quantum.how-to.standalone-local), with a [Python host program](xref:microsoft.quantum.how-to.python-local), or a [C# host program](xref:microsoft.quantum.how-to.csharp-local).

You can also follow along with the narrative without installing the QDK, reviewing the overviews of the Q# programming language and the first concepts of quantum computing.

In this tutorial, you'll learn how to

* Create and combine operations in Q#. 
* Create operations to put qubits in superposition, entangle them, and then measure them.
* Demonstrate quantum entanglement with a Q# program run in a simulator. 

## Demonstrating qubit behavior with the QDK

Where classical bits hold a single binary value such as a 0 or 1, the state of a [qubit](xref:microsoft.quantum.glossary-qdk#qubit) can be in a **superposition** of
having an equal possibility of being either 0 or 1.  Conceptually, the state of a qubit can be thought of as a direction in an abstract space (also known as a vector).  A qubit state can be in any of the possible directions. The two **classical states** are the two directions that represent a 100% chance of measuring 0 and a 100% chance of measuring 1.

The act of measurement produces a binary result and changes the qubit state. Measurement produces a binary value, either 0 or 1. The qubit goes from being in superposition (any direction) to one of the classical states. Thereafter, repeating the same measurement without any intervening operations produces the same binary result.  

Multiple qubits can be [**entangled**](xref:microsoft.quantum.glossary-qdk#entanglement) such that they cannot be described independently from each other. When we make a measurement of one entangled qubit, our knowledge of the state of the other(s) is updated as well.

## Write the Q# application
 
The goal is to prepare two qubits in a specific quantum state, demonstrate how to operate on qubits with Q# to change their state, and show the effects
of superposition and entanglement. You will build this up piece by piece to introduce qubit states, operations, and measurement.

### Initialize qubit using measurement

The following code snippet shows how to work with qubits in Q#. The code introduces two standard operations, [`M`](xref:Microsoft.Quantum.Intrinsic.M) and [`X`](xref:Microsoft.Quantum.Intrinsic.X), that transform the state of a qubit, and a user-defined operation, `SetQubitState`. 

In your project, replace the contents of `Program.qs` with the following code:

```qsharp
   namespace Bell {
       open Microsoft.Quantum.Intrinsic;
       open Microsoft.Quantum.Canon;

       operation SetQubitState(desired : Result, q1 : Qubit) : Unit {
           if desired != M(q1) {
               X(q1);
           }
       }
   }
```

The  `SetQubitState` operation

* Takes two parameters: a type [`Result`](xref:microsoft.quantum.qsharp.typesystem-overview#available-types), named `desired`, that represents the desired state for the qubit to be in, and a type [`Qubit`](xref:microsoft.quantum.qsharp.typesystem-overview#available-types). 
* Performs a measurement operation (`M`) on the qubit and compares the result to the value specified in `desired`.
* If the measurement does not match the desired value, it runs an `X` operation, which changes the qubit state to a new state in which the probabilities of a measurement returning `Zero` and `One` are reversed. This way, `SetQubitState` always puts the target qubit in the desired state. 

This operation may now be called to set a qubit to a classical state, either returning `Zero` 100% of the time or returning `One` 100% of the time.
`Zero` and `One` are constants that represent the only two possible results of a measurement of a qubit.

#### About Q# operations

A Q# operation is a quantum subroutine. That is, it is a callable routine that contains calls to other quantum operations.

The arguments to an operation are specified as a tuple, within parentheses.

The return type of the operation is specified after a colon. In the previous example, the
`SetQubitState` operation has no return type, so it is marked as returning `Unit`. This is the
Q# equivalent of `unit` in F#, which is roughly analogous to `void` in C#, and
an empty tuple in Python (`()`, represented by the type hint `Tuple[()]`).

There are two quantum operations in the example:

* The [`M`](xref:Microsoft.Quantum.Intrinsic.M) operation, which measures the
  state of the qubit
* The [`X`](xref:Microsoft.Quantum.Intrinsic.X) operation, which flips the state
  of a qubit

A quantum operation transforms the state of a qubit. Operations are sometimes called
*quantum gates*, in analogy to classical logic gates. This
is rooted in the early days of quantum computing when algorithms were merely a
theoretical construct and visualized as diagrams similar to circuit diagrams
in classical computing.

### Counting measurement outcomes

To demonstrate the effect of the `SetQubitState` operation, a
`TestBellState` operation is added. This operation takes as input a `Zero`
or `One`, calls the `SetQubitState` operation some number of times with that input,
and counts the number of times that `Zero` was returned from the measurement of
the qubit and the number of times that `One` was returned. Of course, in this
first simulation of the `TestBellState` operation, it is expected that the output
will show that all measurements of the qubit set with `Zero` as the parameter
input will return `Zero`, and all measurements of a qubit set with `One` as the
parameter input will return `One`. Later on, code will be added to `TestBellState`
to demonstrate superposition and entanglement.

Add the following operation to your `Program.qs` file after the `SetQubitState` operation:

```qsharp
   operation TestBellState(count : Int, initial : Result) : (Int, Int) {

       mutable numOnes = 0;
       use qubit = Qubit();
       for test in 1..count {
           SetQubitState(initial, qubit);
           let res = M(qubit);

           // Count the number of ones we saw:
           if res == One {       
               set numOnes += 1;
           }
       }

       SetQubitState(Zero, qubit);

       

       // Return number of times we saw a |0> and number of times we saw a |1>
       Message("Test results (# of 0s, # of 1s): ");
       return (count - numOnes, numOnes);
   }
```

The `TestBellState`operation:

1. Calls the `use` statement to initialize a qubit.
1. Loops for `count` iterations. For each loop, it
    1. Calls `SetQubitState` to set a specified `initial` value on a qubit.
    1. Uses the [`M`](xref:Microsoft.Quantum.Intrinsic.M) operation to measure the result.
    1. Stores the number of measurements that return `One`.
1. After the loop completes, it calls `SetQubitState` again to reset the qubit to a known state (`Zero`) to allow others to
allocate this qubit in a known state. This is required by the `use` statement. 
1. Finally, it uses the [`Message`](xref:Microsoft.Quantum.Intrinsic.Messagee) function to print an explanatory message in the console before returning the results.

Your code should look like this now:

```qsharp

namespace Bell {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;

    operation SetQubitState(desired : Result, q1 : Qubit) : Unit {
        if desired != M(q1) {
            X(q1);
        }
    }

   operation TestBellState(count : Int, initial : Result) : (Int, Int) {

       mutable numOnes = 0;
       use qubit = Qubit();
       for test in 1..count {
           SetQubitState(initial, qubit);
           let res = M(qubit);

           // Count the number of ones we saw:
           if res == One {       
               set numOnes += 1;
           }
       }

       SetQubitState(Zero, qubit);

       
       // Return number of times we saw a |0> and number of times we saw a |1>
       Message("Test results (# of 0s, # of 1s): ");
       return (count - numOnes, numOnes);
   }
}

```

#### About variables in Q\#

By default, variables in Q# are immutable; their value may not be changed after
they are bound. The `let` keyword is used to indicate the binding of an
immutable variable. Operation arguments are always immutable.

If you need a variable whose value can change, such as `numOnes` in the example,
you can declare the variable with the `mutable` keyword. The value of a mutable variable
may be changed using a `set` statement.

In both cases, the type of a variable is inferred by the compiler. Q# doesn't
require any type annotations for variables.

#### About the `use` statement in Q\#

The `use` statement is special to Q#. It is used to allocate qubits for
use in a block of code. In Q#, all qubits are dynamically allocated and
released, rather than being fixed resources that are there for the entire
lifetime of a complex algorithm. A `use` statement allocates a set of qubits
at the start, and releases those qubits at the end of the block.

## Run the code from the command prompt

In order to run the code as a standalone program, the Q# compiler needs to know *which* callable to run
when use the `dotnet run` command. This is done with a simple change in
the Q# file by adding a line with `@EntryPoint()` directly preceding the
operation that you want to run: the `TestBellState` operation in this case. 

> [!NOTE]
> `@EntryPoint()` is only required for standalone Q# programs. When running a Q# program in [Jupyter Notebooks](xref:microsoft.quantum.how-to.standalone-local), or calling a Q# program from a [Python](xref:microsoft.quantum.how-to.python-local) or [.NET](xref:microsoft.quantum.how-to.csharp-local) host file, it is not required. 

The full code should now be:

```qsharp
namespace Bell {
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    operation SetQubitState(desired : Result, target : Qubit) : Unit {
        if desired != M(target) {
            X(target);
        }
    }

    @EntryPoint()
    operation TestBellState(count : Int, initial : Result) : (Int, Int) {

        mutable numOnes = 0;
        use qubit = Qubit();
        for test in 1..count {
            SetQubitState(initial, qubit);
            let res = M(qubit);

            // Count the number of ones we saw:
            if res == One {
                  set numOnes += 1;
            }
        }

        SetQubitState(Zero, qubit);
        

    // Return number of times we saw a |0> and number of times we saw a |1>
    Message("Test results (# of 0s, # of 1s): ");
    return (count - numOnes, numOnes);
    }
}
```

To run the program, you need to specify the `count` and `initial` arguments from the
command prompt, for example, `count = 1000` and `initial = One`. Run the following command:

```dotnetcli
dotnet run --count 1000 --initial One
```

and you should observe the following output:

```output
Test results (# of 0s, # of 1s):
(0, 1000)
```

If you run it with `initial = Zero` you should observe:

```dotnetcli
dotnet run --count 1000 --initial Zero
```

```output
Test results (# of 0s, # of 1s):
(1000, 0)
```

## Prepare superposition

Now, look at how Q# expresses ways to put qubits in superposition. Recall that the state of a qubit can be in a superposition of 0 and 1. This can be accomplished by using the [`H`](xref:Microsoft.Quantum.Intrinsic.H), or *Hadamard*, operation. If the qubit is in either of the classical states (where a measurement returns `Zero` every time or `One` every time), then the `H` operation will put the qubit in a state where a measurement of the qubit will return `Zero` 50% of the time and
`One` 50% of the time. Conceptually, the qubit can be thought of as halfway between the `Zero` and `One`. So, adding the `H` operation to the `TestBellState`
operation before you measure the qubit should return roughly an equal number of `Zero` and `One` results after measurement.  

### Use `X` to flip the qubit state

First, add the code to flip the qubit (if the qubit is in `Zero` state it will
flip to `One` and vice versa). This is accomplished by performing an `X` operation before you measure the qubit. 

Modify the code in the `TestBellState` operation:

```qsharp
for test in 1..count {
    SetQubitState(initial, qubit);
    X(qubit);                        // add the X operation to flip the qubit state
    let res = M(qubit);
```

Now, run the program with the same input and the results are reversed:

```dotnetcli
dotnet run --count 1000 --initial One
```

```output
Test results (# of 0s, # of 1s):
(1000, 0)
```

```dotnetcli
dotnet run --count 1000 --initial Zero
```

```output
Test results (# of 0s, # of 1s):
(0, 1000)
```

### Use the `H` operation to prepare superposition

Now, replace the `X` operation in the previous example with an `H`,
or Hadamard, operation. Instead of flipping the qubit all the way from 0 to 1, this
will only flip it halfway into a state of equal superposition. 

Modify the code in the `TestBellState` operation:

```qsharp
for test in 1..count {
    SetQubitState(initial, qubit);
    H(qubit);                        // replace the X operation
    let res = M(qubit);
```

Now the results get more interesting:

```dotnetcli
dotnet run --count 1000 --initial One
```

```output
Test results (# of 0s, # of 1s):
(496, 504)   // results will vary
```

```dotnetcli
dotnet run --count 1000 --initial Zero
```

```output
Test results (# of 0s, # of 1s):
(506, 494)
```

Every measurement asks for a classical value, but the qubit is halfway
between 0 and 1, so we get (statistically) 0 half the time and 1 half the time.
You can see the effect of the superposition in the output.

## Preparing entanglement

As mentioned earlier in the tutorial, entangled qubits are connected such that they cannot be described independently from each other. That is, whatever happens to one qubit, also happens to the entangled qubit. (This example uses two qubits; however, it is also possible to entangle three or more qubits).


To set up the entanglement, modify the code to

- Create a second qubit
- Put both qubits into superposition
- Use the `CNOT` operation to entangle the qubits. 


Now, look at how Q# expresses ways to entangle qubits. First, set the first qubit to the initial state and then use the `H` operation to put it into superposition. Then, before measuring the first qubit, use a new operation (`CNOT`), which stands for *Controlled-NOT*.  The
result of running this operation on two qubits is to flip the second qubit if
the first qubit is `One`.  Now, the two qubits are entangled. The statistics
for the first qubit haven't changed (50-50 chance of a `Zero` or a `One` after
measurement), but now when measured the second qubit, it is __always__ the
same as what we measured for the first qubit. Our `CNOT` has entangled the two
qubits, so that whatever happens to one of them, happens to the other. If you
reversed the measurements (did the second qubit before the first), the same
thing would happen. The first measurement would be random and the second would
be in lock step with whatever was discovered for the first.

First, allocate two qubits instead of one in the `TestBellState` operation:

```qsharp
use (q0, q1) = (Qubit(), Qubit());   
```

Next, modify the `SetQubitState` operation and add a second one to make sure that both qubits are always in the `Zero` state.

```qsharp
SetQubitState(initial, q0);
SetQubitState(Zero, q1);
```

Next, add a `CNOT` operation after the first qubit is in superposition and before the measurement. `CNOT` stands for *Controlled-NOT*.  The
result of running this operation on two qubits is to flip the second qubit if the first qubit is `One`. The statistics
for the first qubit haven't changed (50-50 chance of a `Zero` or a `One` after measurement), but now when measuring the second qubit, it is __always__ the
same as what we measured for the first qubit. Our `CNOT` has entangled the two qubits, so that whatever happens to one of them, happens to the other.

```qsharp
SetQubitState(initial, q0);
SetQubitState(Zero, q1);

H(q0);
CNOT(q0, q1);
let res = M(q0);
```

And finally, reset both qubits before releasing them.

```qsharp
SetQubitState(Zero, q0);
SetQubitState(Zero, q1);
```

The full routine now looks like this:

```qsharp
    operation TestBellState(count : Int, initial : Result) : (Int, Int) {

        mutable numOnes = 0;
        use (q0, q1) = (Qubit(), Qubit());  
        for test in 1..count {
            SetQubitState(initial, q0);
            SetQubitState(Zero, q1);
            
            H(q0);       
            CNOT(q0,q1);
            
            let res = M(q0);

            // Count the number of ones we saw:
            if res == One {
                set numOnes += 1;
            }
        }

        SetQubitState(Zero, q0);
        SetQubitState(Zero, q1);
        

        // Return number of times we saw a |0> and number of times we saw a |1>
        return (count-numOnes, numOnes);
    }
```

If you run this program, you will get the same 50-50 results that you got before. However, to see how the second qubit reacts to the first qubit being
measured, you can also measure the second qubit and compare the results with the first qubit. 

```qsharp
    operation TestBellState(count : Int, initial : Result) : (Int, Int, Int) {
        mutable numOnes = 0;
        mutable agree = 0;
        use (q0, q1) = (Qubit(), Qubit());
        for test in 1..count {
            SetQubitState(initial, q0);
            SetQubitState(Zero, q1);

            H(q0);
            CNOT(q0, q1);
            let res = M(q0);

            // Measure the second qubit and compare result to the first qubit
            if M(q1) == res {
                set agree += 1;
            }

            // Count the number of ones we saw:
            if res == One {
                set numOnes += 1;
            }
        }

        SetQubitState(Zero, q0);
        SetQubitState(Zero, q1);
        

        // Return times we saw |0>, times we saw |1>, and times the first and second qubit agreed
        Message("Test results (# of 0s, # of 1s, # of agreements)");
        return (count-numOnes, numOnes, agree);
    }
```

The new return value (`agree`) keeps track of every time the measurement from
the second qubit matches the measurement of the first qubit.

Running the code results in:

```dotnetcli
dotnet run --count 1000 --initial One
```

```output
(505, 495, 1000)
```

```dotnetcli
dotnet run --count 1000 --initial Zero
```

```output
Test results (# of 0s, # of 1s, # of agreements)
(507, 493, 1000)
```

As stated in the overview, the statistics for the first qubit haven't changed (50-50 chance of being a 0 or a 1), but now when you measure the second qubit, it is
__always__ the same result as for the first qubit, because they are entangled!

## Next steps

* The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
* The tutorial [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
