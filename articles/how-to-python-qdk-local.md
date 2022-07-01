---
author: bradben
description: Learn how to develop and run Python host programs that call Q# operations on a local simulator.
ms.author: brbenefield
ms.date: 06/28/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Write a Q# and Python program to run on a local quantum simulator
uid: microsoft.quantum.how-to.python-local
---

# Write a Q# and Python program to run on a local quantum simulator

Learn how you can run a Q# program using a Python host program or Jupyter Notebook, which invokes the Q# code and further processes return results. The Microsoft Quantum Development Kit (QDK) contains several [quantum simulators](xref:microsoft.quantum.machines.overview) that allow you to test and run quantum programs locally, without having to access the Azure Quantum service.

> [!NOTE]
> A Python host program is just a normal Python program. You can use any Python environment, including Python-based Jupyter Notebooks, to write the Python program and call Q# operations. The Python host program can also import Q# operations from any Q# (`.qs`) files located in the same folder as the Python code itself.

## Prerequisite

Set up a Python environment, or configure your existing Python environment, to use the Microsoft QDK and Jupyter Notebooks following the steps in [Set up a Q# and Python environment](xref:microsoft.quantum.install-qdk.overview.python). 

## Choose your IDE

While you can use Q# with Python in any IDE to write your Python program and call Q# operations, we recommend using either Jupyter Notebooks or Visual Studio Code (VS Code) for your Q# + Python applications. 

### Jupyter Notebooks

A Jupyter Notebook is a document that contains both rich text and code and can run in your browser, and can run Q# and Python code in Azure Quantum. Notebooks can also be created directly in the Azure Quantum portal, which has the `qsharp` Python package preinstalled and offers features such as sample notebooks and preloaded connection information.

#### Types of quantum notebooks

Installing the QDK extends the Juptyer Notebooks' Python kernel, **ipykernel**, with the `qsharp` Python package, and also adds the **IQ#** kernel, which allows you to create standalone Q# notebooks. You select the kernel type when you create a new notebook. Select **Python 3 (ipykernel)** for a Python + Q# notebook, and **Q#** for a Q# standalone notebook.

:::image type="content" source="media/jupyter-kernels.png" alt-text="Options for notebook kernels":::

- *Python + Q# notebook*: Write your program in Python, importing Q# operations and functions from a separate Q# file. You can also use the [*%%qsharp* magic command](#the-qsharp-magic-command) to write Q# code directly in a notebook cell. 
- *Q# standalone notebook*: Write Q# code directly in your notebook and make use of Azure Quantum-specific magic commands installed with the QDK.

This article describes processes and procedures used with Python + Q# notebooks only.

For more information on using Jupyter Notebooks in the Azure Quantum portal, see [Get started with Q# and an Azure Quantum notebook](xref:microsoft.quantum.get-started.notebooks).

### Visual Studio Code (VS Code)

With the QDK extension for VS Code, you gain access to richer functionality such as warnings, syntax highlighting, project templates, and more.

If you would like to use VS Code:

- Install [VS Code](https://code.visualstudio.com/download) (Windows, Linux and Mac).
- Install the [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).

VS Code also offers its own terminal from which you can run code. If you are using conda, make sure you follow the procedure detailed in the installation section to initialize conda for the shell used by VS Code. On Windows, VS Code will use PowerShell unless configured differently. Doing so will allow you to run *Q# with Python* programs directly from VS Code's integrated terminal, however you can use any terminal of your choice with access to Python. Remember to activate your Q# environment there before running any programs, using `conda activate qsharp-env`.

If you would like to use a different editor, the instructions so far have you all set.

> [!NOTE]
> Notice that the output of your program may appear differently if you run the code in a Jupyter Notebook instead of at the command line, as that interface understands how to forward HTML-based diagnostics from the IQ# kernel to the IPython kernel.

## Use Q\# with Python

To begin, your Python program needs to import the `qsharp` Python package. This package provides Q# interoperability for Python, as well as the IQ# kernel for Jupyter, allowing you to compile and run Q# operations from Python and Q# Jupyter Notebooks.

Once imported into your program, the `qsharp` package allows Q# namespaces to appear as Python packages, from which you can import Q# callables. You can use Q# functions and operations as Python objects, and use methods on these objects to specify the target machines to simulate quantum programs, estimate quantum resources, and so forth. Your Python host program or Jupyter Notebook can import Q# namespaces from any Q# files (with the extension `.qs`) located in the same folder.

1. Create a minimal Q# [operation](xref:microsoft.quantum.qsharp.operationsandfunctions) by creating a file called `HostPython.qs` and adding the following code to it:

    ```qsharp
    namespace HostPython {
        open Microsoft.Quantum.Intrinsic;

        operation SayHello(name : String) : Unit {
            Message($"Hello, {name}!");
        }
    }
    ```

    > [!Note]
    > The `@EntryPoint()` attribute used for Q#-only applications cannot be used with host programs. An error will be raised if it is present in the Q# file being called by a host.

1. In the same folder as `HostPython.qs`, create the following Python program called `host.py`, or enter the code in your Juptyer Notebook cell. This program [imports the Q# operation](/azure/quantum/user-guide/host-programs?tabs=tabid-python#q-with-host-programs) `SayHello()`, defined in the previous step, and runs it on the [default simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) by using the `.simulate()` method:

    ```python
    import qsharp
    from HostPython import SayHello

    print(SayHello.simulate(name="quantum world"))
    ```

1. From a terminal with access to your Python/Q# environment created during installation, navigate to your project folder and run the Python host program or Juptyer Notebook cell:

    ```shell
    python host.py
    ```

    ```output
    Hello, quantum world!
    ```

1. Inputs to your Q# operation are represented by Python keyword arguments, and outputs are returned back to the Python host. For example, add the following function `Plus` to the `HostPython.qs` program and save it:

    ```qsharp
    namespace HostPython {
        open Microsoft.Quantum.Intrinsic;
    
        operation SayHello(name : String) : Unit {
            Message($"Hello, {name}!");
        }
    
        function Plus(x : Int, y : Int) : Int {
            return x + y;
        }
    }
    ```
    
    ```python
    from HostPython import Plus
    
    print(Plus.simulate(x=3, y=5))
    ```
    
    ```output
    8
    ```

1. You can also work with the qubits allocated in the Q# programs and simulate the operation from Python. Add the following operation `CreateQuantumRNG`, which creates a quantum random bit generator, to the `HostPython.qs` program:

    ```qsharp
    namespace HostPython {
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Measurement;
    
        operation SayHello(name : String) : Unit {
            Message($"Hello, {name}!");
        }
    
        function Plus(x : Int, y : Int) : Int {
            return x + y;
        }
    
        operation CreateQuantumRNG() : Result {
            use q = Qubit(); // Allocate a qubit.
            H(q); // Put the qubit to superposition. A Z-basis measurement now has a 50% chance of returning 0 or 1.
            return MResetZ(q); // Measure the qubit value.
        }
    }
    ```

    ```python
    from HostPython import CreateQuantumRNG
    
    print(CreateQuantumRNG.simulate())
    ```
    
Because the `CreateQuantumRNG` operation generates a random result, the outcome will be either 0 or 1. If you run the program repeatedly, you should see each result approximately half the time.
    
## The \%\%qsharp magic command

If you are running your operations in a Python-based Jupyter Notebook (using the Python 3 (*ipykernel*)), the `%%qsharp` magic command allows you to write new Q# code within the same Jupyter Notebook as the Python code, avoiding the necessity of a separate Q# program and host program.

- You must run `import qsharp` first to enable the `%%qsharp` command.
- The `%%qsharp` command is scoped to the cell in which it appears.
- The Q# code that follows the command must adhere to standard Q# coding syntax. For example, comments are denoted by `//` instead of `#` within `%%qsharp` cells.

As an example, the first Q# example in the previous section could be written and run with the following three cells:

```py
import qsharp
```

```py
%%qsharp

open Microsoft.Quantum.Intrinsic;

operation SayHello(name : String) : Unit {
    Message($"Hello, {name}!");
}
```

```py
print(SayHello.simulate(name="quantum world"))
```

Note that `import qsharp` must be run in its own cell before using the `%%qsharp` command, and the `print` function must also run in its own cell. The `%%qsharp` command cannot be preceded by or followed by a Python statement within its cell. 

### Calling into a Q# program

Using the `%%qsharp` command, you can enter Q# code directly into a notebook cell while also leveraging externally defined Q# callables.  

For example, in the same folder as your notebook and the `HostPython.qs` file, create the following Q# program called `OperationSamples.qs`, which defines three different operations:

```qsharp
namespace Microsoft.Quantum.Samples {
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Canon;

    operation PrepareBellPair(left : Qubit, right : Qubit) : Unit is Adj + Ctl {
        H(left);
        CNOT(left, right);
    }

    operation Teleport(msg : Qubit, target : Qubit) : Unit {
        use here = Qubit();

        PrepareBellPair(here, target);
        Adjoint PrepareBellPair(msg, here);

        if M(msg) == One { Z(target); }
        if M(here) == One { X(target); }
    }

    operation RunTeleportationExample() : Unit {
        use msg = Qubit();
        use target = Qubit();

        H(msg);
        Teleport(msg, target);
        H(target);

        if M(target) == Zero {
            Message("Teleported successfully!");
        }
    }
}
```

The `PrepareBellPair` operation is defined in the `OperationSamples.qs` file, but you can call it from the Q# operation `PrepareAndMeasureBellPair()`, which you define in your notebook using the `%%qsharp` magic command (you may need to refresh your notebook and kernel to recognize the new Q# file):

```py
%%qsharp
open Microsoft.Quantum.Samples;

operation PrepareAndMeasureBellPair() : (Result, Result) {
    use left = Qubit();
    use right = Qubit();

    PrepareBellPair(left, right);
    return (MResetZ(left), MResetZ(right));
}
```

```py
PrepareAndMeasureBellPair.simulate()
```

## Compiling Q# from Python strings

In addition to the `%%qsharp` magic command, the `qsharp` package also provides the `compile` function, which allows you to compile Q# code from Python strings:

```python
sample_qrng = qsharp.compile("""
    open Microsoft.Quantum.Measurement; // namespace required for MResetZ operation
    operation CreateQuantumRNG() : Result {
        use q = Qubit();
        H(q);
        return MResetZ(q);
    }
""")
    
print(sample_qrng.simulate())
```

## Packages and projects

The Q# code in your workspace can also depend on other Q# *packages* and *projects* by using `.csproj` project files.

> [!TIP]
> If you don't have a project file for your workspace, the `qsharp` package will assume some reasonable defaults. Having a project file makes it easy to use additional packages, to get code completion and hover documentation while you edit your Q# files, and so forth.

> [!NOTE]
> Currently, `.csproj` files are only supported in local environments, not in notebooks hosted in the Azure Quantum portal.

To see what packages are currently added to your workspace, use the `qsharp.packages` object:

```python
qsharp.packages
```

You can also add new packages dynamically by using `qsharp.packages.add` object. For example, to add the [the QDK Chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview):

```python
qsharp.packages.add('Microsoft.Quantum.Chemistry')
```

```python
qsharp.packages
```

## Next steps

Now that you have tested the Quantum Development Kit in your environment, you can follow this tutorial to write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).

For more information on how to run Q# programs with Python, see the following articles:

- [Q# with a Python host program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs?tabs=tabid-python#q-with-host-programs)
- [Run Q# on a local simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)
- [Run Q# on quantum hardware](xref:microsoft.quantum.submit-jobs) through Azure Quantum
- [Estimate quantum resources](xref:microsoft.quantum.machines.overview.resources-estimator) required by your program
- [Testing and debugging](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
