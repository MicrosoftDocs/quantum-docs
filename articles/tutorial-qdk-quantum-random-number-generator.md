---
author: SoniaLopezBravo
description: Build a Q# project that demonstrates fundamental quantum concepts like superposition by creating a quantum random number generator.
ms.author: sonialopez
ms.date: 02/13/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: tutorial
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: 'Tutorial: Create a Quantum Random Number Generator'
uid: microsoft.quantum.tutorial-qdk.random-number
---

# Tutorial: Implement a quantum random number generator in Q\#

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

Learn to write a basic quantum program in Q# that leverages the nature of quantum mechanics to produce a random number.

In this tutorial, you will:

> [!div class="checklist"]
> * Create a Q# program.
> * Review the main components of a Q# program.
> * Define the logic of a problem.
> * Combine classical and quantum operations to solve a problem.
> * Work with qubits and superposition to build a quantum random number generator.

[!INCLUDE [Copilot in Azure Quantum banner](includes/copilot-banner.md)]

## Prerequisites

- To run the code sample in the [Copilot in Azure Quantum](https://quantum.microsoft.com/en-us/experience/quantum-coding):
  - A Microsoft (MSA) email account.

- To develop and run the code sample in Visual Studio Code:
    - The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
    - The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension. For installation details, see [Installing the Modern QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-modern-qdk-on-vs-code).
    - If you want to use Jupyter Notebooks, you also need to install [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions, and the latest `qsharp` Python package. To do so, open a terminal and run the following command:

        ```bash
        $ pip install --upgrade  qsharp
        ```

## Define the problem

Classical computers don't produce random numbers, but rather _pseudorandom_ numbers. A pseudorandom number generator generates a deterministic sequence of numbers based on some initial value, called a _seed_. To better approximate random values, this seed is often the current time from the CPU's clock.

Quantum computers, on the other hand, can generate truly random numbers. This is because the measurement of a qubit in superposition is a probabilistic process. The result of the measurement is random, and there's no way to predict the outcome. This is the basic principle of quantum random number generators.

A qubit is a unit of quantum information that can be in superposition. When measured, a qubit can only be either in the **0** state or in the **1** state. However, before measurement, the state of the qubit represents the *probability* of reading either a **0** or a **1** with a measurement. 

You start by taking a qubit in a basis state, for example zero. The first step of the random number generator is to use a Hadamard operation to put the qubit into an equal superposition. The measurement of this state results in a zero or a one with 50% probability of each outcome, a truly random bit.

There's no way of knowing what you will get after the measurement of the qubit in superposition, and the result is a different value each time the code is invoked. But how can you use this behavior to generate larger random numbers?

Let's say you repeat the process four times, generating this sequence of binary digits:

$${0, 1, 1, 0}$$

If you concatenate, or combine, these bits into a bit string, you can form a larger number. In this example, the bit sequence ${0110}$ is equivalent to six in decimal.

$${0110_{\ binary} \equiv 6_{\ decimal}}$$

If you repeat this process many times, you can combine multiple bits to form any large number. Now you can provide your superior with that number as a secure password, since you can be sure that no space hacker could determine the results of the sequence of measurements.

### Define the random number generator logic

Let's outline what the logic of a random number generator should be, provided we have a random bit generator:

1. Define `max` as the maximum number you want to generate.
1. Define the number of random bits that you need to generate. This is done by calculating how many bits, `nBits`, we need to express integers up to `max`.
1. Generate a random bit string that's `nBits` in length.
1. If the bit string represents a number greater than `max`, go back to step three.
1. Otherwise, the process is complete. Return the generated number as an integer.

As an example, let's set `max` to 12. That is, 12 is the largest number you want to use as a secure password.

You need ${\lfloor ln(12) / ln(2) + 1 \rfloor}$, or 4 bits to represent a number between 0 and 12. (For brevity, we'll skip how to derive this equation.)

Let's say you generate the bit string ${1101_{\ binary}}$, which is equivalent to ${13_{\ decimal}}$. Because 13 is greater than 12, you repeat the process.

Next, you generate the bit string ${0110_{\ binary}}$, which is equivalent to ${6_{\ decimal}}$. Because 6 is less than 12, the process is complete.

The quantum random number generator will return number 6 as your password. In practice, set a larger number as the maximum because lower numbers are easy to crack by just trying all possible passwords. In fact, to increase the difficulty of guessing or cracking your password, you could use ASCII code to convert binary to text and to generate a password by using numbers, symbols, and mixed-case letters.

## Write a random bit generator

The first step is to write a Q# operation that generates a random bit. This operation will be one of the building blocks of the random number generator.

```qsharp
operation GenerateRandomBit() : Result {
    // Allocate a qubit.
    use q = Qubit();

    // Set the qubit into superposition of 0 and 1 using the Hadamard 
    H(q);

    // At this point the qubit `q` has 50% chance of being measured in the
    // |0〉 state and 50% chance of being measured in the |1〉 state.
    // Measure the qubit value using the `M` operation, and store the
    // measurement value in the `result` variable.
    let result = M(q);

    // Reset qubit to the |0〉 state.
    // Qubits must be in the |0〉 state by the time they are released.
    Reset(q);

    // Return the result of the measurement.
    return result;
}
```

Now take a look at new code.

- You define the `GenerateRandomBit` operation, which takes no input and produces a value of type `Result`. The `Result` type represents the result of a measurement and can have two possible values: `Zero` or `One`.  
- You allocate a single qubit with the `use` keyword. When it gets allocated, a qubit is always in the `Zero` state.
- You use the `H` operation to place the qubit in an equal superposition.
- You use the `M` operation to measure the qubit, return the measured value (`Zero` or `One`).
- You use the `Reset` operation to reset the qubit to the |0〉 state.


By putting the qubit in superposition with the `H` operation and measuring it with the `M` operation, the result is a different value each time the code is invoked.

### Visualize the Q\# code with the Bloch sphere

In the Bloch sphere, the north pole represents the classical value **0** and the south pole represents the classical value **1**. Any superposition can be represented by a point on the sphere (represented by an arrow). The closer the end of the arrow to a pole the higher the probability the qubit collapses into the classical value assigned to that pole when measured. For example, the qubit state represented by the arrow in the following figure has a higher probability of giving the value **0** if you measure it.

<img src="~/media/qrng-Bloch.png" width="175" alt="A diagram showing a qubit state with a high probability of measuring zero.">

You can use this representation to visualize what the code is doing:

1. First, start with a qubit initialized in the state **0** and apply an `H` operation to create an equal superposition in which the probabilities for **0** and **1** are the same.

    <img src="~/media/qrng-H.png" width="450" alt="A diagram showing the preparation of a qubit in superposition by applying the hadamard gate.">

1. Then measure the qubit and save the output:

    <img src="~/media/qrng-meas.png" width="450" alt="A diagram showing the measurement of a qubit and saving the output.">

Since the outcome of the measurement is random and the probabilities of measuring **0** and **1** are the same, you have obtained a completely random bit. You can call this operation several times to create integers. For example, if you call the operation three times to obtain three random bits, you can build random 3-bit numbers (that is, a random number between 0 and 7).

### Write a complete random number generator

1. First, you need to add the required Q# namespaces to the program. For the complete random number generator, you need to include three Q# namespaces: `Microsoft.Quantum.Math`, `Microsoft.Quantum.Intrinsic`, and `Microsoft.Quantum.Convert`.

    ```qsharp
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Math;
    ```

1. Next, you define the `GenerateRandomNumberInRange` operation. This operation repeatedly calls the `GenerateRandomBit` operation to build a string of bits.

    ```qsharp
        /// Generates a random number between 0 and `max`.
        operation GenerateRandomNumberInRange(max : Int) : Int {
            // Determine the number of bits needed to represent `max` and store it
            // in the `nBits` variable. Then generate `nBits` random bits which will
            // represent the generated random number.
            mutable bits = [];
            let nBits = BitSizeI(max);
            for idxBit in 1..nBits {
                set bits += [GenerateRandomBit()];
            }
            let sample = ResultArrayAsInt(bits);
    
            // Return random number if it is within the requested range.
            // Generate it again if it is outside the range.
            return sample > max ? GenerateRandomNumberInRange(max) | sample;
        }
    
    ```

    Let's take a moment to review the new code.

    * You need to calculate the number of bits needed to express integers up to `max`. The `BitSizeI` function from the `Microsoft.Quantum.Math` namespace converts an integer to the number of bits needed to represent it.
    * The `SampleRandomNumberInRange` operation uses a `for` loop to generate random numbers until it generates one that's equal to or less than `max`. The `for` loop works exactly the same as a `for` loop in other programming languages.
    * The variable `bits` is a mutable variable. A mutable variable is one that can change during the computation. You use the `set` directive to change a mutable variable's value.
    * The `ResultArrayAsInt` function comes from the `Microsoft.Quantum.Convert` namespace. This function converts the bit string to a positive integer.

1. Finally, you add an entry point. In this example, the `Main` operation is the entry point of the program. It calls the `GenerateRandomNumberInRange` operation to generate a random number between 0 and 100.

    ```qsharp
        @EntryPoint()
        operation Main() : Int {
            let max = 100;
            Message($"Sampling a random number between 0 and {max}: ");
    
            // Generate random number in the 0..max range.
            return GenerateRandomNumberInRange(max);
        }
    ```

    The `let` directive declares variables that don't change during the computation. Here we define the maximum value as 100.

1. The complete code for the random number generator is as follows:

```qsharp
namespace QuantumRandomNumberGenerator {
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Math;

    @EntryPoint()
    operation Main() : Int {
        let max = 100;
        Message($"Sampling a random number between 0 and {max}: ");

        // Generate random number in the 0..max range.
        return GenerateRandomNumberInRange(max);
    }

    /// Generates a random number between 0 and `max`.
    operation GenerateRandomNumberInRange(max : Int) : Int {
        // Determine the number of bits needed to represent `max` and store it
        // in the `nBits` variable. Then generate `nBits` random bits which will
        // represent the generated random number.
        mutable bits = [];
        let nBits = BitSizeI(max);
        for idxBit in 1..nBits {
            set bits += [GenerateRandomBit()];
        }
        let sample = ResultArrayAsInt(bits);

        // Return random number if it is within the requested range.
        // Generate it again if it is outside the range.
        return sample > max ? GenerateRandomNumberInRange(max) | sample;
    }

    operation GenerateRandomBit() : Result {
        // Allocate a qubit.
        use q = Qubit();

        // Set the qubit into superposition of 0 and 1 using the Hadamard 
        H(q);

        // At this point the qubit `q` has 50% chance of being measured in the
        // |0〉 state and 50% chance of being measured in the |1〉 state.
        // Measure the qubit value using the `M` operation, and store the
        // measurement value in the `result` variable.
        let result = M(q);

        // Reset qubit to the |0〉 state.
        // Qubits must be in the |0〉 state by the time they are released.
        Reset(q);

        // Return the result of the measurement.
        return result;
    }
}
```

## Run the random number generator program

You can run the program in the [Copilot in Azure Quantum](https://quantum.microsoft.com/en-us/experience/quantum-coding), and in Visual Studio Code as a standalone Q# application or using a Python host program.

### [Copilot in Azure Quantum](#tab/tabid-copilot)

You can test your Q# code with the Copilot in Azure Quantum free of charge - all you need is a Microsoft (MSA) email account. For more information about the Copilot in Azure Quantum, see [Explore Azure Quantum](xref:microsoft.quantum.get-started.azure-quantum).

1. Open the [Copilot in Azure Quantum](https://quantum.microsoft.com/en-us/experience/quantum-coding) in your browser.
1. Copy and paste the following code into the code editor.

    ```qsharp
    namespace Tutorial {
        open Microsoft.Quantum.Convert;
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Math;
    
        @EntryPoint()
        operation Main() : Int {
            let max = 100;
            Message($"Sampling a random number between 0 and {max}: ");
    
            // Generate random number in the 0..max range.
            return GenerateRandomNumberInRange(max);
        }
    
        /// # Summary
        /// Generates a random number between 0 and `max`.
        operation GenerateRandomNumberInRange(max : Int) : Int {
            // Determine the number of bits needed to represent `max` and store it
            // in the `nBits` variable. Then generate `nBits` random bits which will
            // represent the generated random number.
            mutable bits = [];
            let nBits = BitSizeI(max);
            for idxBit in 1..nBits {
                set bits += [GenerateRandomBit()];
            }
            let sample = ResultArrayAsInt(bits);
    
            // Return random number if it is within the requested range.
            // Generate it again if it is outside the range.
            return sample > max ? GenerateRandomNumberInRange(max) | sample;
        }
    
        /// # Summary
        /// Generates a random bit.
        operation GenerateRandomBit() : Result {
            // Allocate a qubit.
            use q = Qubit();
    
            // Set the qubit into superposition of 0 and 1 using the Hadamard 
            // operation `H`.
            H(q);
    
            // At this point the qubit `q` has 50% chance of being measured in the
            // |0〉 state and 50% chance of being measured in the |1〉 state.
            // Measure the qubit value using the `M` operation, and store the
            // measurement value in the `result` variable.
            let result = M(q);
    
            // Reset qubit to the |0〉 state.
            // Qubits must be in the |0〉 state by the time they are released.
            Reset(q);
    
            // Return the result of the measurement.
            return result;
    
            // Note that Qubit `q` is automatically released at the end of the block.
        }
    }
    ```

1. Select the number of shots to run, and click **Run**.
1. The results are displayed in the histogram and in the **Results** fields.
1. Click **Explain code** to prompt Copilot to explain the code to you.

> [!TIP]
> From Copilot in Azure Quantum, you can open your program in [VS Code for the Web](https://vscode.dev/quantum) by clicking on the VS Code logo button in the right-hand corner of the code editor.

### [Q# program in Visual Studio Code](#tab/tabid-vscode)

1. Open Visual Studio Code and select **File > New Text File** to create a new file.
1. Save the file as `RandomNumberGenerator.qs`. This file will contain the Q# code for your program.
1. Copy the following code in the `RandomNumberGenerator.qs` file.

    ```qsharp
    namespace Tutorial {
        open Microsoft.Quantum.Convert;
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Math;
    
        @EntryPoint()
        operation Main() : Int {
            let max = 100;
            Message($"Sampling a random number between 0 and {max}: ");
    
            // Generate random number in the 0..max range.
            return GenerateRandomNumberInRange(max);
        }
    
        /// # Summary
        /// Generates a random number between 0 and `max`.
        operation GenerateRandomNumberInRange(max : Int) : Int {
            // Determine the number of bits needed to represent `max` and store it
            // in the `nBits` variable. Then generate `nBits` random bits which will
            // represent the generated random number.
            mutable bits = [];
            let nBits = BitSizeI(max);
            for idxBit in 1..nBits {
                set bits += [GenerateRandomBit()];
            }
            let sample = ResultArrayAsInt(bits);
    
            // Return random number if it is within the requested range.
            // Generate it again if it is outside the range.
            return sample > max ? GenerateRandomNumberInRange(max) | sample;
        }
    
        /// # Summary
        /// Generates a random bit.
        operation GenerateRandomBit() : Result {
            // Allocate a qubit.
            use q = Qubit();
    
            // Set the qubit into superposition of 0 and 1 using the Hadamard 
            // operation `H`.
            H(q);
    
            // At this point the qubit `q` has 50% chance of being measured in the
            // |0〉 state and 50% chance of being measured in the |1〉 state.
            // Measure the qubit value using the `M` operation, and store the
            // measurement value in the `result` variable.
            let result = M(q);
    
            // Reset qubit to the |0〉 state.
            // Qubits must be in the |0〉 state by the time they are released.
            Reset(q);
    
            // Return the result of the measurement.
            return result;
    
            // Note that Qubit `q` is automatically released at the end of the block.
        }
    }
    ```
1. Before running the program, you need to set the target profile to **Unrestricted**. Select **View -> Command Palette**, search for QIR, select **Q#: Set the Azure Quantum QIR target profile**, and then select **Q#: unrestricted**. 
1. To run your program, select **Run Q# File** from the play icon drop-down in the top-right, or press **Ctrl+F5**. The program runs the operation or function marked with the `@EntryPoint()` attribute on the default simulator.
1. Your output will appear in the debug console.
1. Run the program again to see a different result.

> [!NOTE]
> If the target profile is not set to **Unrestricted**, you will get an error when you run the program.


#### Plot the frequency histogram

Let's visualize the distribution of results obtained from running the quantum program multiple times. The frequency histogram helps visualize the probability distribution of these outcomes.

1. Select **View -> Command Palette**, or press **Ctrl+Shift+P**, and type “histogram” which should bring up the **Q#: Run file and show histogram** option. Select this option to open the Q# histogram window.
1. Enter a number of **shots** to execute the program, for example, 100 shots, and press **Enter**. The histogram will display in the Q# histogram window.
1. Each bar in the histogram corresponds to a possible outcome, and its height represents the number of times that outcome is observed. The number of different results may differ each time you run the histogram.

    :::image type="content" source="../media/histogram-vscode-qrng.png" alt-text="Screenshot the Q# histogram window in Visual Studio Code.":::

    > [!TIP]
    > You can zoom the histogram using the mouse scroll wheel or a trackpad gesture. When zoomed in, you can pan the chart by pressing 'Alt' while scrolling.

1. Click on a bar to display the **percentage** of that outcome.
1. Click the top-left **settings icon** to display options. You can display top 10 results, top 25 results, or all results. You can also sort the results from high to low, or low to high.

    :::image type="content" source="../media/histogram-vscode-qrng-tab.png" alt-text="Screenshot the Q# histogram window in Visual Studio Code showing how to display settings.":::



### [Jupyter Notebook in VS Code](#tab/tabid-python)

1. In VS Code, select **View > Command palette** and select **Create: New Jupyter Notebook**. 
1. In the first cell, import the `qsharp` package in your Python code:

    ```python
    import qsharp
    ```

1. Add the quantum random number generator program. To do so, you use the `%%qhsarp` magic command. Copy this code into the second cell. 

    ```qsharp
    %%qsharp
    
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Math;
    
    @EntryPoint()
    operation Main() : Int {
        let max = 100;
    
        // Generate random number in the 0..max range.
        return GenerateRandomNumberInRange(max);
    }
    
    /// # Summary
    /// Generates a random number between 0 and `max`.
    operation GenerateRandomNumberInRange(max : Int) : Int {
        // Determine the number of bits needed to represent `max` and store it
        // in the `nBits` variable. Then generate `nBits` random bits which will
        // represent the generated random number.
        mutable bits = [];
        let nBits = BitSizeI(max);
        for idxBit in 1..nBits {
            set bits += [GenerateRandomBit()];
        }
        let sample = ResultArrayAsInt(bits);
    
        // Return random number if it is within the requested range.
        // Generate it again if it is outside the range.
        return sample > max ? GenerateRandomNumberInRange(max) | sample;
    }
    
    /// # Summary
    /// Generates a random bit.
    operation GenerateRandomBit() : Result {
        // Allocate a qubit.
        use q = Qubit();
    
        // Set the qubit into superposition of 0 and 1 using the Hadamard 
        // operation `H`.
        H(q);
    
        // At this point the qubit `q` has 50% chance of being measured in the
        // |0〉 state and 50% chance of being measured in the |1〉 state.
        // Measure the qubit value using the `M` operation, and store the
        // measurement value in the `result` variable.
        let result = M(q);
    
        // Reset qubit to the |0〉 state.
        // Qubits must be in the |0〉 state by the time they are released.
        Reset(q);
    
        // Return the result of the measurement.
        return result;
    
        // Note that Qubit `q` is automatically released at the end of the block.
    }
    ```

1. Finally, run the code. You can run the same simulation a number of times, independently. Each independent simulation is called a "shot". For example, let's run the simulation, 100 times.

    ```python
    results = qsharp.run("Main()", shots=100)
    print(results)
    ```

***

> [!NOTE]
> This code snippet does not currently run on any available Azure Quantum hardware targets, as the callable `ResultArrayAsInt` requires a QPU with [full computation profile](/azure/quantum/concepts-targets-in-azure-quantum#quantum-processing-units-qpu-different-profiles).

## Next steps

Explore other Q# tutorials:

* [Quantum entanglement](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to write a Q# program that manipulates and measures qubits and demonstrates the effects of superposition and entanglement.
* [Grover's search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm.
* [Quantum Fourier Transforms](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
* The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
