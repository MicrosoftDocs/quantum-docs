---
author: bradben
description: Explore the new features and tools in the Azure Quantum Development Kit (Modern QDK)
ms.author: brbenefield
ms.date: 01/09/2024
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
no-loc: [target, targets]
title: What's New in the Modern QDK
uid: microsoft.quantum.modern-qdk
---

# What's new in the Azure Quantum Development Kit (Modern QDK)

The [Modern QDK](https://github.com/microsoft/qsharp/wiki/Installation) is the latest version of the Q# language and development tools. With a smaller footprint and faster performance, it is a one-click Visual Studio Code extension, and features language improvements, integrated Python and Jupyter Notebook support, new syntax highlighting, debugger support, multi-file project support, error messages, and integrated Azure connectivity. By eliminating the dependencies of the previous Classic QDK, it is now truly platform independent, running on Windows, Mac, Linux, and the web. 

## Get started links
- For installation steps, see [Get started with the Azure Quantum Development Kit (Modern QDK)](xref:microsoft.quantum.install-qdk.overview).
- For tips on migrating your existing quantum programs to the Modern QDK, see [Migrate your Q# code to the Modern QDK](xref:microsoft.quantum.how-to.migrate-code).
- For examples of how to create and submit Q#, Jupyter Notebook, and Python jobs to Azure Quantum, see [Get started with Q# programs and VS Code](xref:microsoft.quantum.submit-jobs).


## Visual Studio Code integration

The Modern QDK is tightly integrated into the Visual Studio Code development environment. New features include:

- A new [Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator) for VS Code that you can run locally with no Azure account needed
- A [Q# debugger](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging) for integrated debugging with breakpoints, stepping, and local and quantum variables view
- Support for multi-file [Q# projects](xref:microsoft.quantum.qsharp-projects)
- Language server improvements with error messaging, syntax highlighting, code completions, hover info, and go to definitions  
- Integrated [Azure workspace connectivity](xref:microsoft.quantum.submit-jobs?pivots=ide-qsharp) and job submission
- A built-in sparse (noise free) simulator
- [Jupyter Notebook integration](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter) with Q# coding in cells and syntax highlighting
- QIR generation for Q# programs

## Coming soon

- Integrated hybrid computing with adaptive profile is not yet supported with the Modern QDK. If you need to run hybrid computing projects, see [Continue working in the Classic QDK](xref:microsoft.quantum.install-qdk.overview#continue-working-in-the-classic-qdk).

## Deprecated features

- Support for Visual Studio
- Support for .NET languages and projects
- The IQ# kernel and magic commands for Jupyter Notebooks. For details on using Q# and Jupyter Notebooks, see [Jupyter Notebook integration](xref:microsoft.quantum.submit-jobs?pivots=ide-jupyter) and [Migrating your code](xref:microsoft.quantum.how-to.migrate-code).


## Q# language updates

As quantum discoveries and innovations continue to evolve at a fast pace, the Q# language and the Azure Quantum Development Kit continue to evolve to meet current and future quantum development needs. The following sections describe the changes, updates, and improvements in the Modern QDK.

- [Language sytax updates](#language-syntax-updates)
- [Standard library](#standard-library)
- [Simulation](#simulation)
- [QIR generation](#qir-generation)

### Language syntax updates

#### Expression-based

The Q# language is now *expression-based* instead of *statement-based*. This allows for new use of existing syntax, such as embedding an if-expression into another expression:

```qsharp
let x = if check { 0 } else { 1 };
```

#### Implicit return

The previous example also takes advantage of using statements without a trailing semicolon at the end of a block to return a value from that block. This pattern can be used instead of explicit return-expressions in a callable:

```qsharp
function ReturnsThree() : Int {
    return 3;
}

function AlsoReturnsThree() : Int {
    3
}
```

#### Block-expressions

Q# now supports block-expressions that can organize multiple lines, scope variables, and return a value:

```qsharp
let flip = {
    use q = Qubit();
    H(q);
    if M(q) == One {
        X(q);
        "Heads"
    } else {
        "Tails"
    }
} ;
```

#### Items as statements

Items such as `newtype`, `operation`, `function` and even `open` can now appear as statements within a local scope. This allows for definition of local helper types and callables, as well as scoped includes. For example, a local helper function can be defined just before it is needed:

```qsharp
function ShowDecrement() : Unit {
    open Microsoft.Quantum.Arrays;
    let before = [1, 2, 3];

    function SubOne(in : Int) : Int {
        in - 1
    }

    let after = Mapped(SubOne, before);
    // after will be [0, 1, 2]
}
```

Both the function `SubOne` and the open of the `Microsoft.Quantum.Arrays` namespace are scoped to the `ShowDecrement` function and do not affect code outside of that.

#### Name shadowing

Q# now allows for shadowing of resolved names where this was previously disallowed. This allows for easier reuse of code that includes variable or callable names without the need for a mutable variable:

```qsharp
function Shadowing(input : Int) : Double {
    let input = 2 * input;
    let output = Calculate(input);
    let output = IntAsDouble(output);
    return output;
}
```

#### Explicit types for local variables

Local variables can now be explicitly typed using the same syntax as types for callable argument declarations:

```qsharp
let x : Int[] = [];
```

Explicit types are not required but can sometimes be helpful when resolving type ambiguity for functions that accept generics, such as `Length`. The previous pattern for handling this - adding concrete types to a generic function invocation with syntax such as `Length<Int[]>([]);` - is no longer supported.


#### Implicit namespace prelude

Name resolution now incorporates an implicit prelude which is a set of namespaces that are treated as if they had been opened, as long as no other resolved names supersede them. The namespaces that are treated this way are `Microsoft.Quantum.Core`, `Microsoft.Quantum.Canon`, and `Microsoft.Quantum.Intrinsic`. These do not need to be explicitly opened except when using aliases or otherwise differentiating from potential conflicts.

### Standard library

The Q# standard library is now hosted in the same repository as the compiler and runtime, and can be found in the [top-level library folder](https://github.com/microsoft/qsharp/tree/main/library). Not all functionality and features have been migrated from the Classic Q# libraries, which can still be accessed at https://github.com/microsoft/QuantumLibraries. If an item from the previous library is needed for a program, that item and any dependencies can be copied into the source program. If any library functionality is critical to a workflow and should be considered for inclusion in the new standard library, please file a [GitHub issue](https://github.com/microsoft/qsharp/issues) with the details.

### Simulation

#### Sparse simulation by default

The Modern QDK uses a built-in sparse state quantum simulator as the default target for local simulation. This simulator is written in Rust and comes from the [QIR Runner](https://github.com/qir-alliance/qir-runner) repository, allowing it to compile to WASM and run across a variety of environments. Currently this is the only simulation backend available in the QDK, though other backends are under consideration for future integration. For more information on the sparse simulation design, see [Testing large quantum algorithms using sparse simulation](https://devblogs.microsoft.com/qsharp/testing-large-quantum-algorithms-using-sparse-simulation/).

#### Stricter checks on qubit release

The Classic QDK had historically relaxed the requirement that qubits be in the ground or |0⟩ state before being released at the end of their scope, such that a qubit that has been measured and not operated on any further was also safe to release since the simulator would automatically reset the qubit. However, this caused confusion when the same program was run on real quantum hardware where such an automatic reset is not present and qubits may be reused in an unexpected state. For the Modern QDK, we've returned to the stricter behavior of enforcing that qubits are required to be in the ground state on release. This helps algorithm authors verify the behavior of their algorithm for correctness in preparation for running on hardware.

#### Decomposed multi-controlled gates

The Modern QDK now uses decomposition strategies for multi-controlled gates. While this doesn't take advantage of shortcuts available to simulation where multi-controlled gates are easily implemented, it does more closely match the behavior of physical quantum systems. This means performing a gate with a large number of control qubits will incur additional qubit allocations and preparation gates, the same way it would when compiled for execution on hardware. For more details on the decomposition algorithms used, see the implementation in the [standard library](https://github.com/microsoft/qsharp/tree/main/library).

### QIR Generation

The Modern QDK produces QIR by generating the textual representation of LLVM (.ll) instead of using bitcode (.bc). Most targets and tools that accept bitcode can also parse textual LLVM, including tools like [PyQIR](https://github.com/qir-alliance/pyqir) and [QIR Runner](https://github.com/qir-alliance/qir-runner).

The Modern QDK is currently limited to QIR generation for programs compatible with the [QIR Base Profile](https://github.com/qir-alliance/qir-spec/blob/main/specification/under_development/profiles/Base_Profile.md). When Base Profile compilation is configured, the compiler and VSCode extension produce errors for patterns that are not compatible with the target. The compiler can also conditionally skip compilation of items that have attributes indicating they are specific to particular compilation targets:

```qsharp
@Config(Unrestricted)
function ResultAsBool(input : Result) : Bool {
    input == One
}
```