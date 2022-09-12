---
author: bradben
description: Learn how to create a Q# application using .NET languages. Q# is built to work well with .NET languages such as C# and F#.
ms.author: brbenefield
ms.date: 03/30/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Develop with Q# and .NET
uid: microsoft.quantum.install-qdk.overview.cs
---

# Develop with Q# and .NET

The Q# programming language is built to work well with .NET languages such as C# and F#. In this guide, we demonstrate how to use Q# with a host program written in a .NET language.

First we create the Q# application and .NET host, and then demonstrate how to call to Q# from the host.

## Prerequisites

- Install the Quantum Development Kit (QDK) [for use with Q# projects](xref:microsoft.quantum.install-qdk.overview.standalone).

## Creating a Q# library and a .NET host

The first step is to create projects for your Q# library, and for the .NET host that will call into the operations and functions defined in your Q# library.

Follow the instructions in the tab corresponding to your development environment.
If you are using an editor other than Visual Studio or VS Code, simply follow the command prompt steps.

### [Visual Studio Code or command prompt](#tab/tabid-cmdline)

- Create a new Q# library

  ```dotnetcli
  dotnet new classlib -lang Q# -o quantum
  ```

- Create a new C# or F# console project

  ```dotnetcli
  dotnet new console -lang C# -o host  
  ```

- Add your Q# library as a reference from your host program

  ```dotnetcli
  cd host
  dotnet add reference ../quantum/quantum.csproj
  ```

- [Optional] Create a solution for both projects

  ```dotnetcli
  cd ..
  dotnet new sln -n quantum-dotnet
  dotnet sln quantum-dotnet.sln add ./quantum/quantum.csproj
  dotnet sln quantum-dotnet.sln add ./host/host.csproj
  ```

### [Visual Studio 2022](#tab/tabid-vs2022)

- Create a new Q# library
  - Go to **File** -> **New** -> **Project**
  - Type "Q#" in the search box
  - Select **Q# Library**
  - Select **Next**
  - Choose a name and location for your library
  - Make sure that "place project and solution in same directory" is **unchecked**
  - Select **Create**
- Create a new C# or F# host program
  - Go to **File** → **New** → **Project**
  - Select "Console App (.NET Core")" for either C# or F#
  - Select **Next**
  - Under *solution*, select "add to solution"
  - Choose a name for your host program
  - Select **Create**

***

## Calling into Q# from .NET

Once you have your projects set up following the above instructions, you can call into Q# from your .NET console application.
The Q# compiler will create .NET classes for each Q# operation and function that allow you to run your quantum programs on a simulator.

For example, the [.NET interoperability sample](https://github.com/microsoft/Quantum/tree/main/samples/interoperability/dotnet) includes the following example of a Q# operation:

```qsharp
namespace Microsoft.Quantum.Samples {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Arrays;
    open Microsoft.Quantum.Measurement;

    /// # Summary
    /// A quantum oracle which implements the following function:
    /// f(x₀, …, xₙ₋₁) = Σᵢ (rᵢ xᵢ + (1 - rᵢ)(1 - xᵢ)) modulo 2 for a given bit vector r = (r₀, …, rₙ₋₁).
    ///
    /// # Input
    /// ## r
    /// A bit vector of length N
    /// ## x
    /// N qubits in arbitrary state |x⟩ (input register)
    /// ## y
    /// A qubit in arbitrary state |y⟩ (output qubit)
    operation ApplyProductWithNegationFunction (vector : Bool[], controls : Qubit[], target : Qubit)
    : Unit is Adj {
        for (bit, control) in Zipped(vector, controls) {
            ControlledOnInt(bit ? 1 | 0, X)([control], target);
        }
    }

    /// # Summary
    /// Reconstructs the parameters of the oracle in a single query
    ///
    /// # Input
    /// ## N
    /// The number of qubits in the input register N for the function f
    /// ## oracle
    /// A quantum operation which implements the oracle |x⟩|y⟩ -> |x⟩|y ⊕ f(x)⟩, where
    /// x is an N-qubit input register, y is a 1-qubit answer register, and f is a Boolean function.
    /// The function f implemented by the oracle can be represented as
    /// f(x₀, …, xₙ₋₁) = Σᵢ (rᵢ xᵢ + (1 - rᵢ)(1 - xᵢ)) modulo 2 for some bit vector r = (r₀, …, rₙ₋₁).
    ///
    /// # Output
    /// A bit vector r which generates the same oracle as the given one
    /// Note that this doesn't have to be the same bit vector as the one used to initialize the oracle!
    operation ReconstructOracleParameters(N : Int, oracle : ((Qubit[], Qubit) => Unit)) : Bool[] {
        use x = Qubit[N];
        use y = Qubit();

        // apply oracle to qubits in all 0 state
        oracle(x, y);

        // f(x) = Σᵢ (rᵢ xᵢ + (1 - rᵢ)(1 - xᵢ)) = 2 Σᵢ rᵢ xᵢ + Σᵢ rᵢ + Σᵢ xᵢ + N = Σᵢ rᵢ + N
        // remove the N from the expression
        if (N % 2 == 1) {
            X(y);
        }

        // now y = Σᵢ rᵢ

        // measure the output register
        let m = MResetZ(y);

        // before releasing the qubits make sure they are all in |0⟩ state
        ResetAll(x);
        return m == One
                ? ConstantArray(N, false) w/ 0 <- true
                | ConstantArray(N, false);
    }

    /// # Summary
    /// Instantiates the oracle and runs the parameter restoration algorithm.
    operation RunAlgorithm(bits : Bool[]) : Bool[] {
        Message("Hello, quantum world!");
        // construct an oracle using the input array
        let oracle = ApplyProductWithNegationFunction(bits, _, _);
        // run the algorithm on this oracle and return the result
        return ReconstructOracleParameters(Length(bits), oracle);
    }
}
```

To call this operation from .NET on a quantum simulator, you can use the `Run` method of the `RunAlgorithm` .NET class generated by the Q# compiler:

### [C#](#tab/tabid-csharp)

:::code language="csharp" source="~/quantum/samples/interoperability/dotnet/csharp/Host.cs" range="4-":::

### [F#](#tab/tabid-fsharp)

:::code language="fsharp" source="~/quantum/samples/interoperability/dotnet/fsharp/Host.fs" range="4-":::

***

## Next steps

Now that you have the Quantum Development Kit set up for both Q# applications and interoperability with .NET, you can write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).
