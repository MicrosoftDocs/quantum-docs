---
author: haileytap
description: This article introduces Q#, a programming language for developing and running quantum algorithms, and the structure of a Q# program.
ms.author: quantumdocwriters
ms.date: 01/14/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: overview
no-loc: ['Q#', '$$v', '$$', "$$", '$', "$", $, $$, '\cdots', 'bmatrix', '\ddots', '\equiv', '\sum', '\begin', '\end', '\sqrt', '\otimes', '{', '}', '\text', '\phi', '\kappa', '\psi', '\alpha', '\beta', '\gamma', '\delta', '\omega', '\bra', '\ket', '\boldone', '\mathbf{1}', '\\\\', '\\', '=', '\frac', '\text', '\mapsto', '\dagger', '\to', '\begin{cases}', '\end{cases}', '\operatorname', '\braket', '\id', '\expect', '\defeq', '\variance', '\dd', '&', '\begin{align}', '\end{align}', '\Lambda', '\lambda', '\Omega', '\mathrm', '\left', '\right', '\qquad', '\times', '\big', '\langle', '\rangle', '\bigg', '\Big', '|', '\mathbb', '\vec', '\in', '\texttt', '\ne', '<', '>', '\leq', '\geq', '~~', '~', '\begin{bmatrix}', '\end{bmatrix}', '\_']
title: Introduction to the Quantum Programming Language Q#
uid: microsoft.quantum.qsharp-overview
# Customer intent: As a new quantum programmer, I want to learn what Q# is and how a Q# program is structured so that I can begin writing my own quantum programs.
---

# Introduction to the quantum programming language Q#

👉 **[Learn more about the Microsoft Quantum platform](https://quantum.microsoft.com/en-us/solutions/microsoft-quantum-platform)**

Q# is a high-level, [open-source](https://github.com/microsoft/qdk) programming language developed by Microsoft for writing quantum programs. Q# is included in the Microsoft Quantum Development Kit (QDK). For more information, see [Set up the Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).

As a quantum programming language, Q# meets the following requirements for language, compiler, and runtime:

- **Hardware agnostic:** Qubits in quantum algorithms aren't tied to a specific quantum hardware or layout. The Q# compiler and runtime handle the mapping from program qubits to physical qubits, allowing the same code to run on different quantum processors.
- **Integration of quantum and classical computing:** Q# allows for the integration of quantum and classical computations, which is essential for universal quantum computing.
- **Qubit management:** Q# provides built-in operations and functions for managing qubits, including creating superposition states, entangling qubits, and performing quantum measurements.
- **Respect the laws of physics:** Q# and quantum algorithms must follow the rules of quantum physics. For example, you can't directly copy or access the qubit state in Q#.

For more information about the origins of Q#, see the blog post [Why do we need Q#?](https://devblogs.microsoft.com/qsharp/why-do-we-need-q/).

## Structure of a Q# program

Before you start writing Q# programs, it's important to understand their structure and components. Consider the following Q# program, named `Superposition`, that creates a superposition state:

```qsharp
namespace Superposition {
    @EntryPoint()
    operation MeasureOneQubit() : Result {
        // Allocate a qubit. By default, it's in the 0 state.  
        use q = Qubit();  
        // Apply the Hadamard operation, H, to the state.
        // It now has a 50% chance of being measured as 0 or 1.
        H(q);      
        // Measure the qubit in the Z-basis.
        let result = M(q);
        // Reset the qubit before releasing it.
        Reset(q);
        // Return the result of the measurement.
        return result;
    }
}
```

Based on the comments (`//`), the Q# program first allocates a qubit, applies an operation to put the qubit in superposition, measures the qubit state, resets the qubit, and finally returns the result.

Let's break this Q# program down into its components.

### User namespaces

Q# programs can optionally start with a user-defined namespace, such as:

```qsharp
namespace Superposition {
    // Your code goes here.
}
```

Namespaces can help you organize related functionality. Namespaces are optional in Q# programs, meaning that you can write a program without defining a namespace.

For example, the `Superposition` program from the example can also be written without a namespace as:

```qsharp
@EntryPoint()
operation MeasureOneQubit() : Result {
    // Allocate a qubit. By default, it's in the 0 state.  
    use q = Qubit();  
    // Apply the Hadamard operation, H, to the state.
    // It now has a 50% chance of being measured as 0 or 1.
    H(q);      
    // Measure the qubit in the Z-basis.
    let result = M(q);
    // Reset the qubit before releasing it.
    Reset(q);
    // Return the result of the measurement.
    return result;
}
```

> [!NOTE]
> Each Q# program can have only one `namespace`. If you don't specify a namespace, the Q# compiler uses the filename as the namespace.

### Entry points

Every Q# program must have an entry point, which is the starting point of the program. By default, the Q# compiler starts executing a program from the `Main()` operation, if available, which can be located anywhere in the program. Optionally, you can use the `@EntryPoint()` attribute to specify any operation in the program as the point of execution.

For example, in the `Superposition` program, the `MeasureOneQubit()` operation is the entry point of the program because it has the `@EntryPoint()` attribute before the operation definition:

```qsharp
@EntryPoint()
operation MeasureOneQubit() : Result {
    ...
}
```

However, the program could also be written without the `@EntryPoint()` attribute by renaming the `MeasureOneQubit()` operation to `Main()`, such as:

```qsharp
// The Q# compiler automatically detects the Main() operation as the entry point. 

operation Main() : Result {
    // Allocate a qubit. By default, it's in the 0 state.  
    use q = Qubit();  
    // Apply the Hadamard operation, H, to the state.
    // It now has a 50% chance of being measured as 0 or 1.
    H(q);      
    // Measure the qubit in the Z-basis.
    let result = M(q);
    // Reset the qubit before releasing it.
    Reset(q);
    // Return the result of the measurement.
    return result;
}
```

### Types

Types are essential in any programming language because they define the data that a program can work with. Q# provides built-in types that are common to most languages, including `Int`, `Double`, `Bool`, and `String`, and types that define ranges, arrays, and tuples.

Q# also provides types that are specific to quantum computing. For example, the `Result` type represents the result of a qubit measurement and can have two values: `Zero` or `One`.

In the `Superposition` program, the `MeasureOneQubit()` operation returns a `Result` type, which corresponds to the return type of the `M` operation. The measurement result is stored in a new variable that's defined using the `let` statement:

```qsharp
// The operation definition returns a Result type.
operation MeasureOneQubit() : Result {
    ...
    // Measure the qubit in the Z-basis, returning a Result type.
    let result = M(q);
    ...
}
```

Another example of a quantum-specific type is the `Qubit` type, which represents a quantum bit.

Q# also allows you to define your own custom types. For more information, see [Type declarations](xref:microsoft.quantum.qsharp.typedeclarations).

### Allocating qubits

In Q#, you allocate qubits using the `use` keyword and the `Qubit` type. Qubits are always allocated in the $\ket{0}$ state.

For example, the `Superposition` program defines a single qubit and stores it in the variable `q`:

```qsharp
// Allocate a qubit.
use q = Qubit();
```

You can also allocate multiple qubits and access each one through its index:

```qsharp
use qubits = Qubit[2]; // Allocate two qubits.
H(qubits[0]); // Apply H to the first qubit.
X(qubits[1]); // Apply X to the second qubit.
```

### Quantum operations

After allocating a qubit, you can pass it to operations and functions. Operations are the basic building blocks of a Q# program. A Q# operation is a quantum subroutine, or a callable routine that contains quantum operations that change the state of the qubit register.

To define a Q# operation, you specify a name for the operation, its inputs, and its output. In the `Superposition` program, the `MeasureOneQubit()` operation takes no parameters and returns a `Result` type:

```qsharp
operation MeasureOneQubit() : Result {
    ...
}
```

Here's a basic example that takes no parameters and expects no return value. The `Unit` value is equivalent to `NULL` in other languages:

```qsharp
operation SayHelloQ() : Unit {
    Message("Hello quantum world!");
}
```

The Q# standard library also provides operations that you can use in quantum programs, such as the Hadamard operation, `H`, in the `Superposition` program. Given a qubit in the Z-basis, `H` puts the qubit into an even superposition, where it has a 50% chance of being measured as `Zero` or `One`.

### Measuring qubits

While there are many types of quantum measurements, Q# focuses on projective measurements on single qubits, also known as [Pauli measurements](xref:microsoft.quantum.concepts.pauli).

In Q#, the `Measure` operation measures one or more qubits in the specified Pauli basis, which can be `PauliX`, `PauliY`, or `PauliZ`. `Measure` returns a `Result` type of either `Zero` or `One`.

To implement a measurement in the computational basis $\lbrace\ket{0},\ket{1}\rbrace$, you can also use the `M` operation, which measures a qubit in the Pauli Z-basis. This makes `M` equivalent to `Measure([PauliZ], [qubit])`.

For example, the `Superposition` program uses the `M` operation:

```qsharp
// Measure the qubit in the Z-basis.
let result = M(q);
```

### Resetting qubits

In Q#, qubits **must** be in the $\ket{0}$ state when they're released to avoid errors in the quantum hardware. You can reset a qubit to the $\ket{0}$ state using the `Reset` operation at the end of the program. Failure to reset a qubit results in a runtime error.

```qsharp
// Reset a qubit.
Reset(q);
```

### Standard library namespaces

The Q# standard library has built-in namespaces that contain functions and operations you can use in quantum programs. For example, the `Std.Intrinsic` namespace contains commonly used operations and functions, such as `M` to measure results and `Message` to display user messages anywhere in the program.

To call a function or operation, you can specify the full namespace or use an `import` statement, which makes all the functions and operations for that namespace available and makes your code more readable. The following examples call the same operation:

```qsharp
Std.Intrinsic.Message("Hello quantum world!");
```

```qsharp
// imports all functions and operations from the Std.Intrinsic namespace.
import Std.Intrinsic.*;
Message("Hello quantum world!");

// imports just the `Message` function from the Std.Intrinsic namespace.
import Std.Intrinsic.Message;
Message("Hello quantum world!");
```

> [!NOTE]
> The `Superposition` program doesn't have any `import` statements or calls with full namespaces. That's because the Q# development environment automatically loads two namespaces, `Std.Core` and `Std.Intrinsic`, which contain commonly used functions and operations.

You can take advantage of the `Std.Measurement` namespace by using the `MResetZ` operation to optimize the `Superposition` program. `MResetZ` combines the measurement and reset operations into one step, as in the following example:

```qsharp
// Import the namespace for the MResetZ operation.
import Std.Measurement.*;

@EntryPoint()
operation MeasureOneQubit() : Result {
    // Allocate a qubit. By default, it's in the 0 state.      
    use q = Qubit();  
    // Apply the Hadamard operation, H, to the state.
    // It now has a 50% chance of being measured as 0 or 1. 
    H(q);   
    // Measure and reset the qubit, and then return the result value.
    return MResetZ(q);
}
```

## Learn to develop quantum programs with Q# and Azure Quantum

Q# and Azure Quantum are a powerful combination for developing and running quantum programs. With Q# and Azure Quantum, you can write quantum programs, simulate their behavior, estimate resource requirements, and run them on real quantum hardware. This integration allows you to explore the potential of quantum computing and develop innovative solutions for complex problems. Whether you are a beginner or an experienced quantum developer, Q# and Azure Quantum provide the tools and resources you need to unlock the power of quantum computing.

The following diagram shows the stages through which a quantum program passes when you develop it with Q# and Azure Quantum. Your program starts with the development environment and ends with the submission of the job to real quantum hardware.

:::image type="content" source="media/quantum-development-kit-flow-diagram.svg" alt-text="Diagram showing the workflow of quantum programming development.":::

Let's break down the steps in the diagram.

### Choose your development environment

Run your quantum programs in your preferred development environment. You can use the online code editor in the Microsoft Quantum website, a local development environment with Visual Studio Code, or combine Q# code with Python code in Jupyter Notebooks. For more information, see [Different ways to run Q# programs](xref:microsoft.quantum.qsharp-ways-to-work).

### Write your quantum program

You can write quantum programs in Q# using the QDK. To get started, see [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart).

Besides Q#, the QDK offers support for other languages for quantum computing, such as [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) and [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq).

### Integrate with Python

You can use Q# by itself or together with Python in various IDEs. For example, you can use a Q# project with a Python host program to call Q# operations or integrate Q# with Python in Jupyter Notebooks. For more information, see [Integration of Q# and Python](xref:microsoft.quantum.qsharp-ways-to-work#integration-of-q-and-python).

#### The %%qsharp command

By default, Q# programs in Jupyter Notebooks use the `ipykernel` Python package. To add Q# code to a notebook cell, use the `%%qsharp` command, which is enabled with the `qsharp` Python package, followed by your Q# code.

When using `%%qsharp`, keep the following in mind:

- You must first run `from qdk import qsharp` to enable `%%qsharp`.
- `%%qsharp` scopes to the notebook cell in which it appears and changes the cell type from Python to Q#.
- You can't put a Python statement before or after `%%qsharp`.
- Q# code that follows `%%qsharp` must adhere to Q# syntax. For example, use `//` instead of `#` to denote comments and `;` to end code lines.

### Estimate resources

Before running on real quantum hardware, you need to figure out whether your program can run on existing hardware, and how many resources it'll consume.

The [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.resources-estimator) allows you to assess architectural decisions, compare qubit technologies, and determine the resources needed to execute a given quantum algorithm. You can choose from pre-defined fault-tolerant protocols and specify assumptions of the underlying physical qubit model.

For more information, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).

> [!NOTE]
> The Microsoft Quantum resource estimator is free of charge and doesn't require an Azure account.

### Run your program in simulation

When you compile and run a quantum program, the QDK creates an instance of the quantum simulator and passes the Q# code to it. The simulator uses the Q# code to create qubits (simulations of quantum particles) and apply transformations to modify their state. The results of the quantum operations in the simulator are then returned to the program. Isolating the Q# code in the simulator ensures that the algorithms follow the laws of quantum physics and can run correctly on quantum computers.

### Submit your program to real quantum hardware

Once you've tested your program in simulation, you can run it on real quantum hardware. When you run a quantum program in Azure Quantum, you create and run a **job**. To submit a job to the Azure Quantum providers, you need an Azure account and quantum workspace. If you don't have a quantum workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

Azure Quantum offers some of the most compelling and diverse quantum hardware. See [Quantum computing providers](xref:microsoft.quantum.reference.qc-target-list) for the current list of supported hardware providers.

Once you submit your job, Azure Quantum manages the job lifecycle, including job scheduling, execution, and monitoring. You can track the status of your job and view the results in the Azure Quantum portal.

## Related content

- [Different ways to run Q# programs](xref:microsoft.quantum.qsharp-ways-to-work)
- [Set up the Microsoft Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
- [Quickstart: Create your first Q# program](xref:microsoft.quantum.qsharp-quickstart)
