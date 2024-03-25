---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 02/13/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
no-loc: [Quantum Development Kit, target, targets]
---

## Prerequisites

To develop and run the code sample in your local development environment:

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension. For installation details, see [Installing the Modern QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-modern-qdk-on-vs-code).

## Create a new Q# file

1. Open Visual Studio Code and select **File > New Text File** to create a new file.
1. Save the file as `CreateBellStates.qs`. This file will contain the Q# code for your program.

## Initialize a qubit to a known state

The first step is to define a Q# operation that will initialize a qubit to a known state. This can be called to set a qubit to a classical state, meaning it either returns `Zero` 100% of the time or returns `One` 100% of the time. `Zero` and `One` are Q# values that represent the only two possible results of a measurement of a qubit.

Open `CreateBellStates.qs` and copy the following code:

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

The code example introduces two standard operations, `M` and `X`, which transform the state of a qubit.

The  `SetQubitState` operation:

1. Takes two parameters: a type [`Result`](xref:microsoft.quantum.qsharp.typesystem-overview#available-types), named `desired`, that represents the desired state for the qubit to be in (`Zero` or `One`), and a type [`Qubit`](xref:microsoft.quantum.qsharp.typesystem-overview#available-types). 
1. Performs a measurement operation, `M`, which measures the state of the qubit (`Zero` or `One`) and compares the result to the value specified in `desired`.
1. If the measurement does not match the compared value, it runs an `X` operation, which flips the state of the qubit to where the probabilities of a measurement returning `Zero` and `One` are reversed. This way, `SetQubitState` always puts the target qubit in the desired state. 

## Write a test operation to test the Bell state

Next, to demonstrate the effect of the `SetQubitState` operation, create another operation named `TestBellState`. This operation will allocate two qubits, call `SetQubitState` to set the first qubit to a known state, and then measure the qubits to see the results.

Add the following operation to your `CreateBellStates.qs` file after the `SetQubitState` operation:

```qsharp
operation TestBellState() : (Int, Int, Int, Int) {
    mutable numOnesQ1 = 0;
    mutable numOnesQ2 = 0;
    let count = 1000;
    let initial = One;

    // allocate the qubits
    use (q1, q2) = (Qubit(), Qubit());   
    for test in 1..count {
        SetQubitState(initial, q1);
        SetQubitState(Zero, q2);
        
        // measure each qubit
        let resultQ1 = M(q1);            
        let resultQ2 = M(q2);           

        // Count the number of 'Ones' returned:
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
    

    // Display the times that |0> is returned, and times that |1> is returned
    Message($"Q1 - Zeros: {count - numOnesQ1}");
    Message($"Q1 - Ones: {numOnesQ1}");
    Message($"Q2 - Zeros: {count - numOnesQ2}");
    Message($"Q2 - Ones: {numOnesQ2}");
    return (count - numOnesQ1, numOnesQ1, count - numOnesQ2, numOnesQ2 );

}
```

In the code, the `count` and `initial` variables are set to `1000` and `One` respectively. This initializes the first qubit to `One` and measures each qubit 1000 times.

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
1. Finally, it uses the `Message` function to print a message to the console before returning the results.

## Run the code 

Before moving on to the procedures for superposition and entanglement, test the code up to this point to see the initialization and measurement of the qubits.

This is done in the Q# file by adding an `@EntryPoint()` directly preceding the operation that you want to run. For example, in this case is the `TestBellState` operation.

> [!NOTE]
> `@EntryPoint()` is only required for standalone Q# programs. When running a Q# program in Jupyter Notebooks, or calling a Q# program from a Python host file, it isn't required and will throw an error if included.

1. Your `CreateBellStates.qs` file should now look like this:

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
        operation TestBellState() : (Int, Int, Int, Int) {
            mutable numOnesQ1 = 0;
            mutable numOnesQ2 = 0;
            let count = 1000;
            let initial = One;
    
            // allocate the qubits
            use (q1, q2) = (Qubit(), Qubit());   
            for test in 1..count {
                SetQubitState(initial, q1);
                SetQubitState(Zero, q2);
                
                // measure each qubit
                let resultQ1 = M(q1);            
                let resultQ2 = M(q2);           
        
                // Count the number of 'Ones' returned:
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
            
        
            // Display the times that |0> is returned, and times that |1> is returned
            Message($"Q1 - Zeros: {count - numOnesQ1}");
            Message($"Q1 - Ones: {numOnesQ1}");
            Message($"Q2 - Zeros: {count - numOnesQ2}");
            Message($"Q2 - Ones: {numOnesQ2}");
            return (count - numOnesQ1, numOnesQ1, count - numOnesQ2, numOnesQ2 );
    
        }
    }
    ```

1. Before running the program, you need to set the target profile to **Unrestricted**. Select **View -> Command Palette**, search for QIR, select **Q#: Set the Azure Quantum QIR target profile**, and then select **Q#: unrestricted**. 

    > [!NOTE]
> If the target profile is not set to **Unrestricted**, you will get an error when you run the program.

1. To run the program, select **Run Q# File** from the play icon drop-down in the top-right, click on **Run** from the list of commands below `@EntryPoint()`, or press **Ctrl+F5**. The program runs the operation or function marked with the `@EntryPoint()` attribute on the default simulator.
1. Your output appear in the debug console.

    ```output
    Q1 - Zeros: 0
    Q1 - Ones: 1000
    Q2 - Zeros: 1000
    Q2 - Ones: 0
    ```

    Because the qubits haven't been manipulated yet, they have retained their initial values: the first qubit returns `One` every time, and the second qubit returns `Zero`.

1. If you change the value of `initial` to `Zero` and run the program again, you should observe that the first qubit also returns `Zero` every time.

    ```output
    Q1 - Zeros: 0
    Q1 - Ones: 1000
    Q2 - Zeros: 0
    Q2 - Ones: 1000
    ```

> [!TIP]
> Recall to save your file every time you introduce a change to the code before running it again.

## Put a qubit in superposition

Currently, the qubits in the program are all in a **classical state**, that is, they are either 1 or 0. You know this because the program initializes the qubits to a known state, and you haven't added any processes to manipulate them.  Before entangling the qubits, you will put the first qubit into a **superposition state**, where a measurement of the qubit will return `Zero` 50% of the time and `One` 50% of the time. Conceptually, the qubit can be thought of as halfway between the `Zero` and `One`.

To put a qubit in superposition, Q# provides the `H`, or *Hadamard*, operation. Recall the `X` operation from the [Initialize a qubit to a known state](#initialize-a-qubit-to-a-known-state) procedure earlier, which flipped a qubit from `Zero` to `One` (or vice versa); the `H` operation flips the qubit *halfway* into a state of equal probabilities of `Zero` or `One`. When measured, a qubit in superposition should return roughly an equal number of `Zero` and `One` results.

1. Modify the code in the `TestBellState` operation to include the `H` operation:

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
                ...
    ```
    
1. Now when you run the program, you can see the results of the first qubit in superposition:

    ```output
    Q1 - Zeros: 523            // results will vary
    Q1 - Ones: 477
    Q2 - Zeros: 1000
    Q2 - Ones: 0
    ```

1. Every time you run the program, the results for the first qubit will vary slightly, but will be close to 50% `One` and 50% `Zero`, while the results for the second qubit will remain `Zero` all the time.

    ```output
    Q1 - Zeros: 510           
    Q1 - Ones: 490
    Q2 - Zeros: 1000
    Q2 - Ones: 0
    ```
    
1. Initializing the first qubit to `Zero` returns similar results.

    ```output
    Q1 - Zeros: 504           
    Q1 - Ones: 496
    Q2 - Zeros: 1000
    Q2 - Ones: 0
    ```
    
## Entangle two qubits

As mentioned earlier, entangled qubits are connected such that they cannot be described independently from each other. That is, whatever operation happens to one qubit, also happens to the entangled qubit. This allows you to know the resulting state of one qubit without measuring it, just by measuring the state of the other qubit. (This example uses two qubits; however, it is also possible to entangle three or more qubits).

To enable entanglement, Q# provides the `CNOT` operation, which stands for *Controlled-NOT*.  The result of running this operation on two qubits is to flip the second qubit if the first qubit is `One`.

1. Add the `CNOT` operation to your program immediately after the `H` operation. Your full program should look like this:

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
        operation TestBellState() : (Int, Int, Int, Int) {
            mutable numOnesQ1 = 0;
            mutable numOnesQ2 = 0;
            let count = 1000;
            let initial = One;
    
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
        
                // Count the number of 'Ones' returned:
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
            
        
            // Display the times that |0> is returned, and times that |1> is returned
            Message($"Q1 - Zeros: {count - numOnesQ1}");
            Message($"Q1 - Ones: {numOnesQ1}");
            Message($"Q2 - Zeros: {count - numOnesQ2}");
            Message($"Q2 - Ones: {numOnesQ2}");
            return (count - numOnesQ1, numOnesQ1, count - numOnesQ2, numOnesQ2 );
    
        }
    }
    
    ```
    
    ```output
    Q1 - Zeros: 502           
    Q1 - Ones: 498       // results will vary
    Q2 - Zeros: 502
    Q2 - Ones: 498
    ```

The statistics for the first qubit haven't changed (a 50/50 chance of a `Zero` or a `One` after measurement), but the measurement results for the second qubit are **always** the same as the measurement of the first qubit. The `CNOT` operation has entangled the two qubits, so that whatever happens to one of them, happens to the other. 

### Plot the frequency histogram

Let's visualize the distribution of results obtained from running the quantum program multiple times. The frequency histogram helps visualize the probability distribution of these outcomes.

1. Select **View -> Command Palette**, or press **Ctrl+Shift+P**, and type “histogram” which should bring up the **Q#: Run file and show histogram** option. You can also click on **Histogram** from the list of commands below `@EntryPoint()`. Select this option to open the Q# histogram window.
1. Enter a number of **shots** to execute the program, for example, 100 shots, and press **Enter**. The histogram will display in the Q# histogram window.
1. Each bar in the histogram corresponds to a possible outcome, and its height represents the number of times that outcome is observed. In this case, there are 50 different unique results. Note that for each outcome the measurement results for the first and the  second qubit are always the same. 

    :::image type="content" source="../media/histogram-vscode-entanglement.png" alt-text="Screenshot the Q# histogram window in Visual Studio Code.":::

    > [!TIP]
    > You can zoom the histogram using the mouse scroll wheel or a trackpad gesture. When zoomed in, you can pan the chart by pressing 'Alt' while scrolling.

1. Click on a bar to display the **percentage** of that outcome.
1. Click the top-left **settings icon** to display options. You can display top 10 results, top 25 results, or all results. You can also sort the results from high to low, or low to high.

    :::image type="content" source="../media/histogram-vscode-entanglement-tab.png" alt-text="Screenshot the Q# histogram window in Visual Studio Code showing how to display settings.":::

> [!NOTE]
> The `CreateBellStates.qs` program doesn't allow quantum circuit visualization because `Unrestricted` target profiles don't support quantum circuit visualization if the program contains a comparison of a `Result` value.
