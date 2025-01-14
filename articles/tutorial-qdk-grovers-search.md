---
author: SoniaLopezBravo
description: In this tutorial, you will build a Q# project that demonstrates Grover's search algorithm, one of the canonical quantum algorithms.
ms.author: sonialopez
ms.date: 01/13/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v', Quantum Development Kit,target, targets]
title: "Tutorial: Implement Grover's Algorithm in Q#"
uid: microsoft.quantum.tutorial-qdk.grovers
#customer intent: As a quantum programmer, I want to learn how to demonstrate Grover's algorithm in a Q# program.
---

# Tutorial: Implement Grover's search algorithm in Q\#

In this tutorial, you implement Grover's algorithm in Q# to solve search-based problems. For an in-depth explanation of the theory behind Grover's algorithm, see the [Theory of Grover's algorithm](xref:microsoft.quantum.concepts.grovers).

In this tutorial, you:

> [!div class="checklist"]
> * Define the Grover's algorithm for a search problem
> * Implement Grover's algorithm in Q#

[!INCLUDE [Copilot in Azure Quantum banner](includes/copilot-banner.md)]

## Prerequisites

- To run the code sample in the [Copilot in Azure Quantum](https://quantum.microsoft.com/tools/quantum-coding):
  - A Microsoft (MSA) email account.

- To develop and run the code sample in Visual Studio Code:
    - The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
    - The latest version of the [Azure Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).


## Define the problem

Grover's algorithm is one of the most famous algorithms in quantum computing. The type of problem it solves is often referred to as "searching a database", but it's more accurate to think of it in terms of the *search problem*.

Any search problem can be mathematically formulated with an abstract function $f(x)$ that accepts search items $x$. If the item $x$ is a solution to the search problem, then $f(x)=1$. If the item $x$ isn't a solution, then $f(x)=0$. The search problem consists of finding any item $x_0$ such that $f(x_0)=1$.

Thus, you can formulate the any search problem as: given a classical function $f(x):\\{0,1\\}^n \rightarrow\\{0,1\\}$, where $n$ is the bit-size of the search space, find an input $x_0$ for which $f(x_0)=1$.

To implement Grover's algorithm to solve a search problem, you need to:

1. Transform the problem to the form of a **Grover's task**. For example, suppose you want to find the factors of an integer $M$ using Grover's algorithm. You can transform the integer factorization problem to a Grover's task by creating a function $$f_M(x)=1[r],$$ where $1[r]=1$ if $r=0$ and $1[r]=0$ if $r\neq0$ and $r$ is the remainder of $M/x$. This way, the integers $x_i$ that make $f_M(x_i)=1$ are the factors of $M$ and you have transformed the problem to a Grover's task.
1. Implement the function of the Grover's task as a quantum oracle. To implement Grover's algorithm, you need to implement the function $f(x)$ of your Grover's task as a [quantum oracle](xref:microsoft.quantum.concepts.oracles).
1. Use Grover's algorithm with your oracle to solve the task. Once you have a quantum oracle, you can plug it into your Grover's algorithm implementation to solve the problem and interpret the output.

## The Grover's algorithm

Suppose there are $N=2^n$ eligible items for the search problem and they are indexed by assigning each item an integer from $0$ to $N-1$. The steps of the algorithm are:

1. Start with a register of $n$ qubits initialized in the state $\ket{0}$.
1. Prepare the register into a uniform superposition by applying $H$ to each qubit in the register:
   $$|\psi\rangle=\frac{1}{N^{1 / 2}} \sum_{x=0}^{N-1}|x\rangle$$
1. Apply the following operations to the register $N_{\text{optimal}}$ times:
   1. The phase oracle $O_f$ that applies a conditional phase shift of $-1$ for the solution items.
   1. Apply $H$ to each qubit in the register.
   1. Apply $-O_0$, a conditional phase shift of $-1$ to every computational basis state except $\ket{0}$.
   1. Apply $H$ to each qubit in the register.
1. Measure the register to obtain the index of an item that's a solution with very high probability.
1. Check the item to see if it's a valid solution. If not, start again.

## Write the code for Grover's algorithm in Q\#

This section discusses how to implement the algorithm in Q#. There are few things to consider when implementing Grover's algorithm. You need to define what is your marked state, how to reflect about it, and how many iterations to run the algorithm for. You also need to define the oracle that implements the function of the Grover's task.

### Define the marked state

First, you define what input you are trying to find in the search. To do so, write an operation that applies the steps **b**, **c** and **d** from the [Grover's algorithm](#the-grovers-algorithm).

Together, these steps are also known as the **Grover'S diffusion operator** $-H^{\otimes n} O_0 H^{\otimes n}$.

```qsharp
operation ReflectAboutMarked(inputQubits : Qubit[]) : Unit {
    Message("Reflecting about marked state...");
    use outputQubit = Qubit();
    within {
        // We initialize the outputQubit to (|0⟩ - |1⟩) / √2, so that
        // toggling it results in a (-1) phase.
        X(outputQubit);
        H(outputQubit);
        // Flip the outputQubit for marked states.
        // Here, we get the state with alternating 0s and 1s by using the X
        // operation on every other qubit.
        for q in inputQubits[...2...] {
            X(q);
        }
    } apply {
        Controlled X(inputQubits, outputQubit);
    }
}
```

The `ReflectAboutMarked` operation reflects about the basis state marked by alternating zeros and ones. It does so by applying the Grover's diffusion operator to the input qubits. The operation uses an auxiliary qubit, `outputQubit`, which is initialized in the state $\ket{-}=\frac{1}{\sqrt{2}}(\ket{0}-\ket{1})$ by applying the $X$ and $H$ gates. The operation then applies the $X$ gate to every other qubit in the register, which flips the state of the qubit. Finally, it applies the controlled $X$ gate to the auxiliary qubit and the input qubits. This operation flips the auxiliary qubit if and only if all the input qubits are in the state $\ket{1}$, which is the marked state.

### Define the number of optimal iterations

Grover's search has an optimal number of iterations that yields the highest probability of measuring a valid output. If the problem has $N=2^n$ possible eligible items, and $M$ of them are solutions to the problem, the optimal number of iterations is:

$$N_{\text{optimal}}\approx\frac{\pi}{4}\sqrt{\frac{N}{M}}$$

Continuing to iterate past the optimal number of iterations starts reducing that probability until you reach nearly-zero success probability on iteration $2 N_{\text{optimal}}$. After that, the probability grows again until $3 N_{\text{optimal}}$, and so on.

In practical applications, you don't usually know how many solutions your problem has before you solve it. An efficient strategy to handle this issue is to "guess" the number of solutions $M$ by progressively increasing the guess in powers of two (i.e. $1, 2, 4, 8, 16, ..., 2^n$). One of these guesses will be close enough that the algorithm will still find the solution with an average number of iterations around $\sqrt{\frac{N}{M}}$.

The following Q# function calculates the optimal number of iterations for a given number of qubits in a register.

```qsharp
function CalculateOptimalIterations(nQubits : Int) : Int {
    if nQubits > 63 {
        fail "This sample supports at most 63 qubits.";
    }
    let nItems = 1 <<< nQubits; // 2^nQubits
    let angle = ArcSin(1. / Sqrt(IntAsDouble(nItems)));
    let iterations = Round(0.25 * PI() / angle - 0.5);
    return iterations;
}
```

The `CalculateOptimalIterations` function uses the formula above to calculate the number of iterations, and then rounds it to the nearest integer.

### Define the Grover's operation

The Q# operation for Grover's search algorithm has three inputs:

* The number of qubits, `nQubits : Int`, in the qubit register. This register will encode the tentative solution to the search problem. After the operation, it will be measured.
* The number of optimal iterations, `iterations : Int`.
* An operation, `phaseOracle : Qubit[] => Unit) : Result[]`, that represents the phase oracle for the Grover's task. This operation applies an unitary transformation over a generic qubit register.

```qsharp
operation GroverSearch( nQubits : Int, iterations : Int, phaseOracle : Qubit[] => Unit) : Result[] {

    use qubits = Qubit[nQubits];
    PrepareUniform(qubits);

    for _ in 1..iterations {
        phaseOracle(qubits);
        ReflectAboutUniform(qubits);
    }

    // Measure and return the answer.
    return MResetEachZ(qubits);
}
```

The `GroverSearch` operation initializes a register of $n$ qubits in the state $\ket{0}$, prepares the register into a uniform superposition, and then applies the Grover's algorithm for the specified number of iterations.  The search itself consists of repeatedly reflecting about the marked state and the start state, which you can write out in Q# as a for loop. Finally, it measures the register and returns the result.

The code makes use of three helper operations: `PrepareUniform`, `ReflectAboutUniform`, and `ReflectAboutAllOnes`.

Given a register in the all-zeros state, the `PrepareUniform` operation prepares a uniform superposition over all basis states.

```qsharp
operation PrepareUniform(inputQubits : Qubit[]) : Unit is Adj + Ctl {
    for q in inputQubits {
        H(q);
    }
}
```

The ``ReflectAboutAllOnes` operation reflects about the all-ones state.

```qsharp
operation ReflectAboutAllOnes(inputQubits : Qubit[]) : Unit {
    Controlled Z(Most(inputQubits), Tail(inputQubits));
}
```

The operation `ReflectAboutUniform` reflects about the uniform superposition state. First, it transforms the uniform superposition to all-zero. Then, it transforms the all-zero state to all-ones. Finally, it reflects about the all-ones state. The operation is called `ReflectAboutUniform` because it can be geometrically interpreted as a reflection in the vector space about the uniform superposition state.

```qsharp
operation ReflectAboutUniform(inputQubits : Qubit[]) : Unit {
    within {
        Adjoint PrepareUniform(inputQubits);
        // Transform the all-zero state to all-ones
        for q in inputQubits {
            X(q);
        }
    } apply {
        ReflectAboutAllOnes(inputQubits);
    }
}
```

## Run the final code

Now you have all the ingredients to implement a particular instance of Grover's search algorithm and solve the factoring problem. To finish, the `Main` operation sets up the problem by specifying the number of qubits and the number of iterations

```qsharp
operation Main() : Result[] {
    let nQubits = 5;
    let iterations = CalculateOptimalIterations(nQubits);
    Message($"Number of iterations: {iterations}");
    
    // Use Grover's algorithm to find a particular marked state.
    let results = GroverSearch(nQubits, iterations, ReflectAboutMarked);
    return results;
}
```


## Run the program

Select the desired platform to run your program. 

### [Copilot in Azure Quantum](#tab/tabid-copilot)

You can test your Q# code with the Copilot in Azure Quantum free of charge - all you need is a Microsoft (MSA) email account. For more information about the Copilot in Azure Quantum, see [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum).

1. Open the [Copilot in Azure Quantum](https://quantum.microsoft.com/tools/quantum-coding) in your browser.
1. Copy and paste the following code into the code editor.

    ```qsharp
    import Microsoft.Quantum.Convert.*;
    import Microsoft.Quantum.Math.*;
    import Microsoft.Quantum.Arrays.*;
    import Microsoft.Quantum.Measurement.*;
    import Microsoft.Quantum.Diagnostics.*;
    
    operation Main() : Result[] {
        let nQubits = 5;
        let iterations = CalculateOptimalIterations(nQubits);
        Message($"Number of iterations: {iterations}");
        
        // Use Grover's algorithm to find a particular marked state.
        let results = GroverSearch(nQubits, iterations, ReflectAboutMarked);
        return results;
    }
    
    operation GroverSearch(
        nQubits : Int,
        iterations : Int,
        phaseOracle : Qubit[] => Unit) : Result[] {
    
        use qubits = Qubit[nQubits];
    
        PrepareUniform(qubits);
    
        for _ in 1..iterations {
            phaseOracle(qubits);
            ReflectAboutUniform(qubits);
        }
    
        // Measure and return the answer.
        return MResetEachZ(qubits);
    }
    
    function CalculateOptimalIterations(nQubits : Int) : Int {
        if nQubits > 63 {
            fail "This sample supports at most 63 qubits.";
        }
        let nItems = 1 <<< nQubits; // 2^nQubits
        let angle = ArcSin(1. / Sqrt(IntAsDouble(nItems)));
        let iterations = Round(0.25 * PI() / angle - 0.5);
        return iterations;
    }
    
    operation ReflectAboutMarked(inputQubits : Qubit[]) : Unit {
        Message("Reflecting about marked state...");
        use outputQubit = Qubit();
        within {
            // We initialize the outputQubit to (|0⟩ - |1⟩) / √2, so that
            // toggling it results in a (-1) phase.
            X(outputQubit);
            H(outputQubit);
            // Flip the outputQubit for marked states.
            // Here, we get the state with alternating 0s and 1s by using the X
            // operation on every other qubit.
            for q in inputQubits[...2...] {
                X(q);
            }
        } apply {
            Controlled X(inputQubits, outputQubit);
        }
    }
    
    operation PrepareUniform(inputQubits : Qubit[]) : Unit is Adj + Ctl {
        for q in inputQubits {
            H(q);
        }
    }
    
    operation ReflectAboutAllOnes(inputQubits : Qubit[]) : Unit {
        Controlled Z(Most(inputQubits), Tail(inputQubits));
    }
    
    operation ReflectAboutUniform(inputQubits : Qubit[]) : Unit {
        within {
            // Transform the uniform superposition to all-zero.
            Adjoint PrepareUniform(inputQubits);
            // Transform the all-zero state to all-ones
            for q in inputQubits {
                X(q);
            }
        } apply {
            // Now that we've transformed the uniform superposition to the
            // all-ones state, reflect about the all-ones state, then let the
            // within/apply block transform us back.
            ReflectAboutAllOnes(inputQubits);
        }
    }
    ```

> [!TIP]
> From Copilot in Azure Quantum, you can open your program in [VS Code for the Web](https://vscode.dev/quantum) by selecting the VS Code logo button in the right-hand corner of the code editor.

### Run the program using the in-memory simulator

1. Select **In-memory Simulator**.
1. Select the number of shots to run, and select **Run**.
1. The results are displayed in the histogram and in the **Results** fields.
1. Select **Explain code** to prompt Copilot to explain the code to you.

### Run the program using the Quantinuum Emulator

You can also submit your program to the free [Quantinuum Emulator](xref:microsoft.quantum.providers.quantinuum#quantinuum-emulator-cloud-based). The emulator simulates a quantum computer with 20 qubits.

1. Select the **In-Memory Simulator** dropdown and select **Quantinuum Emulator**.
1. Select the number of shots (currently limited to 20) and select Run.

### [Visual Studio Code](#tab/tabid-vscode)

1. Open Visual Studio Code and select **File > New Text File** to create a new file.
1. Save the file as `GroversAlgorithm.qs`. This file will contain the Q# code for your program.
1. Copy the following code into the `GroversAlgorithm.qs` file.

    ```qsharp
  
    import Microsoft.Quantum.Convert.*;
    import Microsoft.Quantum.Math.*;
    import Microsoft.Quantum.Arrays.*;
    import Microsoft.Quantum.Measurement.*;
    import Microsoft.Quantum.Diagnostics.*;


    operation Main() : Result[] {
        let nQubits = 5;
        let iterations = CalculateOptimalIterations(nQubits);
        Message($"Number of iterations: {iterations}");
    
        // Use Grover's algorithm to find a particular marked state.
        let results = GroverSearch(nQubits, iterations, ReflectAboutMarked);
        return results;
    }

    operation GroverSearch(
        nQubits : Int,
        iterations : Int,
        phaseOracle : Qubit[] => Unit) : Result[] {

        use qubits = Qubit[nQubits];

        PrepareUniform(qubits);

        for _ in 1..iterations {
            phaseOracle(qubits);
            ReflectAboutUniform(qubits);
        }

        // Measure and return the answer.
        return MResetEachZ(qubits);
    }

    function CalculateOptimalIterations(nQubits : Int) : Int {
        if nQubits > 63 {
            fail "This sample supports at most 63 qubits.";
        }
        let nItems = 1 <<< nQubits; // 2^nQubits
        let angle = ArcSin(1. / Sqrt(IntAsDouble(nItems)));
        let iterations = Round(0.25 * PI() / angle - 0.5);
        return iterations;
    }

    operation ReflectAboutMarked(inputQubits : Qubit[]) : Unit {
        Message("Reflecting about marked state...");
        use outputQubit = Qubit();
        within {
            // We initialize the outputQubit to (|0⟩ - |1⟩) / √2, so that
            // toggling it results in a (-1) phase.
            X(outputQubit);
            H(outputQubit);
            // Flip the outputQubit for marked states.
            // Here, we get the state with alternating 0s and 1s by using the X
            // operation on every other qubit.
            for q in inputQubits[...2...] {
                X(q);
            }
        } apply {
            Controlled X(inputQubits, outputQubit);
        }
    }

    operation PrepareUniform(inputQubits : Qubit[]) : Unit is Adj + Ctl {
        for q in inputQubits {
            H(q);
        }
    }

    operation ReflectAboutAllOnes(inputQubits : Qubit[]) : Unit {
        Controlled Z(Most(inputQubits), Tail(inputQubits));
    }

    operation ReflectAboutUniform(inputQubits : Qubit[]) : Unit {
        within {
            // Transform the uniform superposition to all-zero.
            Adjoint PrepareUniform(inputQubits);
            // Transform the all-zero state to all-ones
            for q in inputQubits {
                X(q);
            }
        } apply {
            // Now that we've transformed the uniform superposition to the
            // all-ones state, reflect about the all-ones state, then let the
            // within/apply block transform us back.
            ReflectAboutAllOnes(inputQubits);
        }
    }
    ```

1. Before running the program, ensure the target profile is set to **Unrestricted**. Select **View -> Command Palette**, search for QIR, select **Q#: Set the Azure Quantum QIR target profile**, and then select **Q#: unrestricted**. 
1. To run your program, select **Run** from the list of commands above the `Main` operation, or press **Ctrl+F5**. By default, the compiler runs the `Main` operation or function on the default simulator.
1. Your output will appear in the debug console in the terminal.

> [!NOTE]
> If the target profile is not set to **Unrestricted**, you will get an error when you run the program.

***

## Related content

Explore other Q# tutorials:

* [Quantum entanglement](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement.
* [Quantum random number generator](xref:microsoft.quantum.tutorial-qdk.random-number) shows how to write a Q# program that generates random numbers out of qubits in superposition.
* [Quantum Fourier Transform](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
* The [Quantum Katas](https://quantum.microsoft.com/tools/quantum-katas) are self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.