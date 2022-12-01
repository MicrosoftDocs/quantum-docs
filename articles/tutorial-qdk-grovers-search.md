---
author: SoniaLopezBravo
description: In this tutorial, you will build a Q# project that demonstrates Grover's search algorithm, one of the canonical quantum algorithms.
ms.author: sonialopez
ms.date: 12/01/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v']
title: "Tutorial: Implement Grover's algorithm in Q#"
uid: microsoft.quantum.tutorial-qdk.grovers
---

# Tutorial: Implement Grover's search algorithm in Q\#

In this tutorial, you'll learn to implement Grover's algorithm in Q# to solve search-based problems.

Grover's algorithm is one of the most famous algorithms in quantum computing. The problem it solves is often referred to as "searching a database", but it's more accurate to think of it in terms of the *search problem*.

Any search problem can be mathematically formulated with an abstract function $f(x)$ that accepts search items $x$. If the item $x$ is a solution to the search problem, then $f(x)=1$. If the item $x$ isn't a solution, then $f(x)=0$. The search problem consists of finding any item $x_0$ such that $f(x_0)=1$.

> [!NOTE]
> This tutorial is intended for people who are already familiar with
> Grover's algorithm and want to learn how to implement it in Q#. For a more
> introductory tutorial, see the Learn module [Solve graphcoloring problems by using Grover's search](/training/modules/solve-graph-coloring-problems-grovers-search/).
> For an in-depth explanation of the theory behind Grover's algorithm, see the [Theory of Grover's algorithm](xref:microsoft.quantum.concepts.grovers).

In this tutorial, you'll learn how to:

> [!div class="checklist"]
> - Build a quantum oracle that implements classical functions on a quantum computer.
> - Write a Q# program that uses Grover's algorithm to find factors of an integer.

## Prerequisites 

- [Install the Quantum Development Kit (QDK)](xref:microsoft.quantum.install-qdk.overview?tabs=tabid-local#install-the-qdk-and-develop-quantum-applications-locally) using your preferred language and development environment.
- If you already have the QDK installed, make sure you have [updated](xref:microsoft.quantum.update-qdk) to the latest version.
- This tutorial requires the Microsoft.Quantum.Numerics library. For more information, follow the steps to [install additional quantum libraries](xref:microsoft.quantum.libraries.overview#installation).
- Create a Q# project for a [Q# standalone application](xref:microsoft.quantum.submit-jobs?pivots=ide-azurecli) or a [C# host program](xref:microsoft.quantum.how-to.csharp-local), or use a [Python host program](xref:microsoft.quantum.install-qdk.overview) in your preferred Python environment.

> [!NOTE]
> To use the optional procedure [Extra: verify the statistics with Python](#extra-verify-the-statistics-with-python), you will need a Python development environment for Q# set up. For more information, see [Set up a Q# and Python environment](xref:microsoft.quantum.install-qdk.overview).

## Grover's algorithm task and background

Given a classical function $f(x):\\{0,1\\}^n \rightarrow\\{0,1\\}$, where $n$ is the bit-size of the search space, find an input $x_0$ for which $f(x_0)=1$.

To implement Grover's algorithm to solve a problem, you need to:

1. Transform the problem to the form of a **Grover's task**. For example, suppose you want to find the factors of an integer $M$ using Grover's algorithm. You can transform the integer factorization problem to a Grover's task by creating a function $$f_M(x)=1[r],$$ where $1[r]=1$ if $r=0$ and $1[r]=0$ if $r\neq0$ and $r$ is the remainder of $M/x$. This way, the integers $x_i$ that make $f_M(x_i)=1$ are the factors of $M$ and you have transformed the problem to a Grover's task.
1. Implement the function of the Grover's task as a quantum oracle. To implement Grover's algorithm, you need to implement the function $f(x)$ of your Grover's task as a [quantum oracle](xref:microsoft.quantum.concepts.oracles).
1. Use Grover's algorithm with your oracle to solve the task. Once you have a quantum oracle, you can plug it into your Grover's algorithm implementation to solve the problem and interpret the output.

### Quick review of Grover's algorithm

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

## Write the code for Grover's algorithm

This section discusses how to implement the algorithm in Q#.

### Grover's diffusion operator

First, write an operation that applies the steps **b**, **c** and **d** from the loop above. Together, these steps are also known as the Grover diffusion operator $-H^{\otimes n} O_0 H^{\otimes n}$

```qsharp
operation ReflectAboutUniform(inputQubits : Qubit[]) : Unit {

    within {
        ApplyToEachA(H, inputQubits);
        ApplyToEachA(X, inputQubits);
    } apply {
        Controlled Z(Most(inputQubits), Tail(inputQubits));
    }

}
```

This operation uses the [within-apply](xref:microsoft.quantum.qsharp.conjugations) statement that implements the automatic conjugation of operations that occur in Grover's diffusion operator.

> [!NOTE]
> To learn more about conjugations in Q#, see [Conjugations](xref:microsoft.quantum.qsharp.conjugations) in the Q# language guide.

A good exercise to understand the code and the operations is to check with pen and paper that the operation `ReflectAboutUniform` applies Grover's diffusion operator. To see it note that the operation `Controlled Z(Most(inputQubits),Tail(inputQubits))` only has an effect different than the identity if and only if all qubits are in the state $\ket{1}$.

The operation is called `ReflectAboutUniform` because it can be geometrically interpreted as a reflection in the vector space about the uniform superposition state.

### Number of iterations

Grover's search has an optimal number of iterations that yields the highest probability of measuring a valid output. If the problem has $N=2^n$ possible eligible items, and $M$ of them are solutions to the problem, the optimal number of iterations is:

$$N_{\text{optimal}}\approx\frac{\pi}{4}\sqrt{\frac{N}{M}}$$

Continuing to iterate past that number starts reducing that probability until you reach nearly-zero success probability on iteration $2 N_{\text{optimal}}$. After that, the probability grows again until $3 N_{\text{optimal}}$, and so on.

In practical applications, you don't usually know how many solutions your problem has before you solve it. An efficient strategy to handle this issue is to "guess" the number of solutions $M$ by progressively increasing the guess in powers of two (i.e. $1, 2, 4, 8, 16, ..., 2^n$). One of these guesses will be close enough that the algorithm will still find the solution with an average number of iterations around $\sqrt{\frac{N}{M}}$.

### Complete Grover's operation

Now you are ready to write a Q# operation for Grover's search algorithm. It will have three inputs:

- A qubit array `register : Qubit[]` that should be initialized in the all `Zero` state. This register will encode the tentative solution to the search problem. After the operation it will be measured.
- An operation `phaseOracle : (Qubit[]) => Unit is Adj` that represents the phase oracle for the Grover's task. This operation applies an unitary transformation over a generic qubit register.
- An integer `iterations : Int` to represent the iterations of the algorithm.

```qsharp
operation RunGroversSearch(register : Qubit[], phaseOracle : (Qubit[]) => Unit is Adj, iterations : Int) : Unit {
    // Prepare register into uniform superposition.
    ApplyToEach(H, register);
    // Start Grover's loop.
    for _ in 1 .. iterations {
        // Apply phase oracle for the task.
        phaseOracle(register);
        // Apply Grover's diffusion operator.
        ReflectAboutUniform(register);
    }
}
```

> [!TIP]
> This code is generic, that is, it can be used to solve any search problem. You pass the quantum oracle - the only operation that relies on the knowledge of the problem instance you want to solve - as a parameter to the search code.

## Write the code to implement the oracle

One of the key properties that makes Grover's algorithm faster is the ability of quantum computers to perform calculations not only on individual inputs but also on superpositions of inputs. You need to compute the function $f(x)$ that describes the instance of a search problem using only quantum operations. This way it can be computed over a superposition of inputs.

Unfortunately there isn't an automatic way to translate classical functions to quantum operations. It's an open field of research in computer science called *reversible computing*.

However, there are some guidelines that might help you to translate your function $f(x)$ into a quantum oracle:

1. **Break down the classical function into small building blocks that are easy to implement.** For example, you can try to decompose your function $f(x)$ into a series of arithmetic operations or Boolean logic gates.
1. **Use the higher-level building blocks of the Q# library to implement the intermediate operations.** For instance, if you decomposed your function into a combination of simple arithmetic operations, you can use the [Numerics library](xref:microsoft.quantum.libraries-numerics.usage) to implement the intermediate operations.

The following equivalence table might prove useful when implementing Boolean functions in Q#.

| Classical logic gate | Q# operation        |
|----------------|--------------------------|
| $NOT$          | `X`                      |
| $XOR$          | `CNOT`                   |
| $AND$          | `CCNOT` with an auxiliary qubit|

### Create a quantum operation to check if a number is a divisor

> [!IMPORTANT]
> This tutorial factorizes a number using Grover's search algorithm as a didactic example to show how to translate a simple mathematical problem into a Grover's task. However, Grover's algorithm is **not** an efficient algorithm to solve the integer factorization problem. To explore a quantum algorithm that **does** solve the integer factorization problem faster than any classical algorithm, see the [**Shor's algorithm** sample](https://github.com/microsoft/Quantum/tree/main/samples/algorithms/integer-factorization).

The following example shows how you would express the function $f_M(x)=1[r]$ of the factoring problem as a quantum operation in Q#.

Classically, you would compute the remainder of the division $M/x$ and see if it's equal to zero. If it is, the program outputs `1`, and if it's not, the program outputs `0`. You need to:

- Compute the remainder of the division.
- Apply a controlled operation over the output bit so that it's `1` if the remainder is `0`.

You need to calculate a division of two numbers with a quantum operation. Fortunately, you don't need to write the circuit implementing the division from scratch, you can use the [`DivideI`](xref:Microsoft.Quantum.Arithmetic.DivideI) operation from the Numerics library instead.

Looking into the description of `DivideI`, it says that it needs three qubit registers: the $n$-bit dividend `xs`, the $n$-bit divisor `ys`, and the $n$-bit `result` that must be initialized in the state `Zero`. The operation is `Adj + Ctl`, so you can conjugate it and use it in *within-apply* statements. Also, in the description it says that the dividend in the input register `xs` is replaced by the remainder. This is perfect, since you are interested exclusively in the remainder and not in the result of the operation.

You can then build a quantum operation that does the following:

1. Takes three inputs:
   - The dividend, `number : Int`. This is the $M$ in $f_M(x)$.
   - A qubit array encoding the divisor, `divisorRegister : Qubit[]`. This is the $x$ in $f_M(x)$, possibly in a superposition state.
   - A target qubit, `target : Qubit`, that flips if the output of $f_M(x)$ is $1$.
1. Calculates the division $M/x$ using only reversible quantum operations, and flips the state of `target` if and only if the remainder is zero.
1. Reverts all operations except the flipping of `target`, so as to return the used auxiliary qubits to the zero state without introducing irreversible operations, such as measurement. This step is important in order to preserve entanglement and superposition during the process.

The code to implement this quantum operation is:

```qsharp
operation MarkDivisor (
    dividend : Int,
    divisorRegister : Qubit[],
    target : Qubit
) : Unit is Adj + Ctl {
    // Calculate the bit-size of the dividend.
    let size = BitSizeI(dividend);
    // Allocate two new qubit registers for the dividend and the result.
    use dividendQubits = Qubit[size];
    use resultQubits = Qubit[size];
    // Create new LittleEndian instances from the registers to use DivideI
    let xs = LittleEndian(dividendQubits);
    let ys = LittleEndian(divisorRegister);
    let result = LittleEndian(resultQubits);

    // Start a within-apply statement to perform the operation.
    within {
        // Encode the dividend in the register.
        ApplyXorInPlace(dividend, xs);
        // Apply the division operation.
        DivideI(xs, ys, result);
        // Flip all the qubits from the remainder.
        ApplyToEachA(X, xs!);
    } apply {
        // Apply a controlled NOT over the flipped remainder.
        Controlled X(xs!, target);
        // The target flips if and only if the remainder is 0.
    }
}
```

> [!NOTE]
> The program takes advantage of the statement *within-apply* to achieve step 3. Alternatively, one could explicitly write the adjoints of each of the operations inside the `within` block after the controlled flipping of `target`. The *within-apply* statement does it for us, making the code shorter and more readable. One of the main goals of Q# is to make quantum programs easy to write and read.

### Transform the operation into a phase oracle

The operation `MarkDivisor` is what's known as a *marking oracle*, since it marks the valid items with an entangled auxiliary qubit (`target`). However, Grover's algorithm needs a *phase oracle*, that is, an oracle that applies a conditional phase shift of $-1$ for the solution items. But don't panic, the operation above wasn't written in vain. It's very easy to switch from one oracle type to the other in Q#.

You can apply any marking oracle as a phase oracle with the following operation:

```qsharp
operation ApplyMarkingOracleAsPhaseOracle(
    markingOracle : (Qubit[], Qubit) => Unit is Adj,
    register : Qubit[]
) : Unit is Adj {
    use target = Qubit();
    within {
        X(target);
        H(target);
    } apply {
        markingOracle(register, target);
    }
}
```

This famous transformation is often known as the *phase kickback* and it's widely used in many quantum computing algorithms. You can find a detailed explanation of this technique in this [Learn module](/training/modules/solve-graph-coloring-problems-grovers-search/4-implement-quantum-oracle).

## Run the final code

Now you have all the ingredients to implement a particular instance of Grover's search algorithm and solve the factoring problem. Your final code should look like this:

```qsharp
namespace GroversTutorial {
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Arithmetic;
    open Microsoft.Quantum.Arrays;
    open Microsoft.Quantum.Preparation;

    @EntryPoint()
    operation FactorizeWithGrovers(number : Int) : Unit {

        // Define the oracle that for the factoring problem.
        let markingOracle = MarkDivisor(number, _, _);
        let phaseOracle = ApplyMarkingOracleAsPhaseOracle(markingOracle, _);
        // Bit-size of the number to factorize.
        let size = BitSizeI(number);
        // Estimate of the number of solutions.
        let nSolutions = 4;
        // The number of iterations can be computed using the formula.
        let nIterations = Round(PI() / 4.0 * Sqrt(IntAsDouble(size) / IntAsDouble(nSolutions)));

        // Initialize the register to run the algorithm
        use (register, output) = (Qubit[size], Qubit());
        mutable isCorrect = false;
        mutable answer = 0;
        // Use a Repeat-Until-Succeed loop to iterate until the solution is valid.
        repeat {
            RunGroversSearch(register, phaseOracle, nIterations);
            let res = MultiM(register);
            set answer = BoolArrayAsInt(ResultArrayAsBoolArray(res));
            // See if the result is a solution with the oracle.
            markingOracle(register, output);
            if MResetZ(output) == One and answer != 1 and answer != number {
                set isCorrect = true;
            }
            ResetAll(register);
        } until isCorrect;

        // Print out the answer.
        Message($"The number {answer} is a factor of {number}.");

    }

    operation MarkDivisor (
        dividend : Int,
        divisorRegister : Qubit[],
        target : Qubit
    ) : Unit is Adj+Ctl {
        let size = BitSizeI(dividend);
        use (dividendQubits, resultQubits) = (Qubit[size], Qubit[size]);
        let xs = LittleEndian(dividendQubits);
        let ys = LittleEndian(divisorRegister);
        let result = LittleEndian(resultQubits);
        within{
            ApplyXorInPlace(dividend, xs);
            DivideI(xs, ys, result);
            ApplyToEachA(X, xs!);
        }
        apply{
            Controlled X(xs!, target);
        }
    }

    operation PrepareUniformSuperpositionOverDigits(digitReg : Qubit[]) : Unit is Adj + Ctl {
        PrepareArbitraryStateCP(ConstantArray(10, ComplexPolar(1.0, 0.0)), LittleEndian(digitReg));
    }

    operation ApplyMarkingOracleAsPhaseOracle(
        markingOracle : (Qubit[], Qubit) => Unit is Adj,
        register : Qubit[]
    ) : Unit is Adj {
        use target = Qubit();
        within {
            X(target);
            H(target);
        } apply {
            markingOracle(register, target);
        }
    }

    operation RunGroversSearch(register : Qubit[], phaseOracle : ((Qubit[]) => Unit is Adj), iterations : Int) : Unit {
        ApplyToEach(H, register);
        for _ in 1 .. iterations {
            phaseOracle(register);
            ReflectAboutUniform(register);
        }
    }

    operation ReflectAboutUniform(inputQubits : Qubit[]) : Unit {
        within {
            ApplyToEachA(H, inputQubits);
            ApplyToEachA(X, inputQubits);
        } apply {
            Controlled Z(Most(inputQubits), Tail(inputQubits));
        }
    }
}
```

Use the program to find a factor of 21. To simplify the code, assume that you know the number of valid items, $M$. In this case, $M=4$, since there are two factors, 3 and 7, plus 1 and 21 itself.

### Run the program with Visual Studio or Visual Studio Code

The program above will run the operation or function marked with the `@EntryPoint()` attribute on a simulator or resource estimator, depending on the project configuration and command-line options.

#### [Visual Studio](#tab/tabid-visualstudio)

This tutorial requires the Microsoft.Quantum.Numerics library. For more information, follow the steps to [install additional quantum libraries](xref:microsoft.quantum.libraries.overview#installation) to your project.

In general, running a Q# program in Visual Studio is as simple as pressing `Ctrl + F5`. But first, you need to provide the right command-line arguments to your program.

Command-line arguments can be configured via the debug page of your project properties. You can visit the [Visual Studio reference guide](/visualstudio/ide/reference/debug-page-project-designer) for more information about this, or follow the steps below:

1. In the solution explorer on the right, right-click the name of your project (the project node, one level below the solution) and select **Properties**.

1. From the new window that opens, navigate to the **Debug** tab.

1. In the field **Application arguments**, you can enter any arguments you wish to pass to the entry point of your program. Enter `--number 21` in the arguments field.

Now press `Ctrl + F5` to run the program.

#### [VS Code](#tab/tabid-vscode)

This tutorial requires the Microsoft.Quantum.Numerics library. For more information, follow the steps to [install additional quantum libraries](xref:microsoft.quantum.libraries.overview#installation) to your project.

In VS Code, first build your project by executing following command in the terminal:

```Command line
dotnet build
```

When running your program, you can now save time by skipping the build phase via the `--no-build` flag. Arguments to pass to the entry point of your program can also be specified at this stage. To run Grover's algorithm on the number 21, type the following command and press enter:

```Command line
dotnet run --no-build --number 21
```

***

With either environment, you should now see the following message displayed in the terminal:

```Command line
The number 7 is a factor of 21.
```

## Extra: Verify the statistics with Python

How can you verify that the algorithm is behaving correctly? For example, if you substitute Grover's search with a random number generator in the previous code example, it will eventually find a factor as well (after ~$N$ attempts).

This example shows how to write a short Python script to verify that the program is working as it should.

> [!TIP]
> If you need help running Q# applications with Python, see [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview) and [Develop with Q# and Python](xref:microsoft.quantum.how-to.python-local).

First, replace your main operation, `FactorizeWithGrovers`, with the following operation, `FactorizeWithGrovers2`:

```qsharp
@EntryPoint()
operation FactorizeWithGrovers2(number : Int) : Int {

    let markingOracle = MarkDivisor(number, _, _);
    let phaseOracle = ApplyMarkingOracleAsPhaseOracle(markingOracle, _);
    let size = BitSizeI(number);
    let nSolutions = 4;
    let nIterations = Round(PI() / 4.0 * Sqrt(IntAsDouble(size) / IntAsDouble(nSolutions)));

    use register = Qubit[size] {
        RunGroversSearch(register, phaseOracle, nIterations);
        let res = MultiM(register);
        return ResultArrayAsInt(res);
        // Verify whether the result is correct.
    }

}
```

Note the changes from the original operation:

- The output type has changed from `Unit` to `Int`, which is more useful for the Python program.
- The repeat-until-success loop has been removed. Instead, you output the first measurement result after running Grover's search. 

The Python program is very simple; it just calls the operation `FactorizeWithGrovers2` several times and plots the results in a histogram.

Save the following code as a Python file in your project folder:

```python
import qsharp
qsharp.packages.add("Microsoft.Quantum.Numerics")
qsharp.reload()
from GroversTutorial import FactorizeWithGrovers2
import matplotlib.pyplot as plt
import numpy as np

def main():

    # Instantiate variables
    frequency =  {}
    N_Experiments = 1000
    results = []
    number = 21

    # Run N_Experiments times the Q# operation.
    for i in range(N_Experiments):
        print(f'Experiment: {i} of {N_Experiments}')
        results.append(FactorizeWithGrovers2.simulate(number = number))

    # Store the results in a dictionary
    for i in results:
        if i in frequency:
            frequency[i]=frequency[i]+1
        else:
            frequency[i]=1

    # Sort and print the results
    frequency = dict(reversed(sorted(frequency.items(), key=lambda item: item[1])))
    print('Output,  Frequency' )
    for k, v in frequency.items():
        print(f'{k:<8} {v}')

    # Plot an histogram with the results
    plt.bar(frequency.keys(), frequency.values())
    plt.xlabel("Output")
    plt.ylabel("Frequency of the outputs")
    plt.title("Outputs for Grover's factoring. N=21, 1000 iterations")
    plt.xticks(np.arange(1, 33, 2.0))
    plt.show()

if __name__ == "__main__":
    main()

```

> [!NOTE]
> The line `from GroversTutorial import FactorizeWithGrovers2` in the Python program imports the Q# code you previously wrote. Note that the Python module name (`GroversTutorial`) needs to be identical to the Namespace of the operation you want to import (in this case, `FactorizeWithGrovers2`).
> You will need the Matplotlib package to display the histogram. For more information, see [Matploblib](https://matplotlib.org/stable/users/installing/index.html).

The program generates the following histogram:

:::image type="content" source="~/media/grovers-histogram.png" alt-text="Histogram with the results of running several times the Grover's algorithm." :::

As you can see in the histogram, the algorithm outputs the solutions to the search problem (1, 3, 7 and 21) with much higher probability than the non-solutions. You can think of Grover's algorithm as a quantum random generator that is purposefully biased towards those indices that are solutions to the search problem.

## Next steps

For more Q# code samples that use Grover's algorithm, see the [Samples Browser](/samples/browse/?languages=qsharp&terms=grovers), or try to transform a mathematical problem of your own into a search problem and solve it with Q# and Grover's algorithm.
