---
author: bradben
description: Learn how to develop and run Python host programs that call Q# operations on a local simulator.
ms.author: v-benbra
ms.date: 12/17/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Write a Q# and Python program to run on a local quantum simulator
uid: microsoft.quantum.how-to.python-local
---

# Write a Q# and Python program to run on a local quantum simulator

Learn how you can run a Q# program using a Python host program, which invokes the Q# program and further processes return results. The Microsoft Quantum Development Kit contains several [quantum simulators](xref:microsoft.quantum.machines.overview) that allow you to test and run quantum programs locally, without having to access the Azure Quantum service.

## Prerequisite

Set up a Python environment, or configure your existing Python environment, to use the Microsoft Quantum Development Kit following the steps in [Set up a Q# and Python environment](xref:microsoft.quantum.install-qdk.overview.python).

## Choose your IDE

While you can use Q# with Python in any IDE, we recommend using Visual Studio Code (VS Code) for your Q# + Python applications. With the QDK extension for VS Code you gain access to richer functionality such as warnings, syntax highlighting, project templates, and more.

If you would like to use VS Code:

- Install [VS Code](https://code.visualstudio.com/download) (Windows, Linux and Mac).
- Install the [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).

VS Code also offers its own terminal from which you can run code. If you are using conda, make sure you follow the procedure detailed in the installation section to initialize conda for the shell used by VS Code. On Windows, VS Code will use PowerShell unless configured differently. Doing so will allow you to run *Q# with Python* programs directly from VS Code's integrated terminal, however you can use any terminal of your choice with access to Python. Remember to activate your Q# environment there before running any programs, using `conda activate qsharp-env`.

If you would like to use a different editor, the instructions so far have you all set.

> [!NOTE]
> Notice that the output of your program may appear differently if you run the code in a Python notebook, as Jupyter notebook, instead of at the command line, as that interface understands how to forward HTML-based diagnostics from the IQ# kernel to the IPython kernel.

## Use Q\# with Python

To begin, your Python program needs to import the `qsharp` Python package. This package provides Q# interoperability for Python, as well as the IQ# kernel for Jupyter, allowing you to compile and run Q# operations from Python and Q# Jupyter Notebooks.

Once imported, the `qsharp` package allows Q# namespaces to appear as Python modules, from which we can "import" Q# callables. You can use Q# functions and operations as Python objects, and use methods on these objects to specify the target machines to simulate quantum programs, estimate quantum resources, and so forth.

> [!NOTE]
> The Python code is just a normal Python program. You can use any Python environment, including Python-based Jupyter Notebooks, to write the Python program and call Q# operations. The Python host program can import Q# operations from any `.qs` files located in the same folder as the Python code itself.

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
    > The `@EntryPoint()` attribute used for Q# applications cannot be used with host programs. An error will be raised if it is present in the Q# file being called by a host.


1. In the same folder as `HostPython.qs`, create the following Python program called `host.py`. This program [imports the Q# operation](/azure/quantum/user-guide/host-programs?tabs=tabid-python#q-with-host-programs) `SayHello()` defined in the previous step and runs it on the [default simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) by using the `.simulate()` method:

    ```python
    import qsharp
    from HostPython import SayHello

    print(SayHello.simulate(name="quantum world"))
    ```
    
1. From a terminal with access to your Python/Q# environment created during installation, navigate to your project folder and run the Python host program:

    ```shell
    python host.py
    ```
    ```output
    Hello, quantum world!
    ```
    
> [!NOTE]
> If you are running your operations in Jupyter Notebooks, the `%%qsharp` magic command allows you to define new Q# operations within the same Jupyter notebook as the Python code, eluding the use of a host program. For more information, see [Q# and Jupyter Notebooks](/azure/quantum/user-guide/host-programs?tabs=tabid-python#q-jupyter-notebooks).

Inputs to your Q# operation are represented by Python keyword arguments, and outputs are returned back to the Python host. For example, add the following code to the `HostPython.qs` program:

```qsharp
function Plus(x : Int, y : Int) : Int {
    return x + y;
}
```
```python
from HostPython import Plus

print(Plus.simulate(x=3, y=5))
```
```output
8
```
You can also work with the qubits allocated in the Q# programs and simulate the operation from Python. Consider the following operation, which creates a quantum random bit generator. 

```qsharp
open Microsoft.Quantum.Measurement;

operation Qrng() : Result {
    use q = Qubit(); // Allocate a qubit.
    H(q); // Put the qubit to superposition. It now has a 50% chance of being 0 or 1.
    return MResetZ(q); // Measure the qubit value.
}
```
```python
from HostPython import Qrng

print(Qrng.simulate())
```
Because the `Qrng` operation generates a random result, the outcome will be either 0 or 1. If you run the program repeatedly, you should see each result approximately half the time.

The `qsharp` package also provides the `compile` function, which allows for compiling Q# code from Python strings:
```python
sample_qrng = qsharp.compile("""
    operation Qrng() : Result {
        use q = Qubit();
        H(q);
        return MResetZ(q);
    }
""")

print(sample_qrng.simulate())
```

## Workspaces, Projects, and Packages

As your quantum programs get larger, it can be inconvienent to keep all of your Q# code in a single notebook or Python script. Instead, the `qsharp` package allows you to call into Q# code from source code in the same directory as your notebook or scripts.

For example, in the same folder as `host.py` and `HostPython.qs`create the following Q# program called `OperationSamples.qs`, which defines three different operations:

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

The `PrepareBellPair` operation is defined in `./OperationSamples.qs`, but you can call it from Q# operations defined using `%%qsharp` magic command in Jupyter Notebooks.

![qsharp magic command](~/media/qsharp-magic-command.png)

After importing the `qsharp` package, you can also import Q# namespaces as though they were Python packages. For example, `OperationSamples.qs` also defines an operation that demonstrates how to run quantum teleportation; you can import it here and run the `RunTeleportationExample` operation on the simulator.

```python
from Microsoft.Quantum.Samples import RunTeleportationExample
print(RunTeleportationExample.simulate())
```
```output
Teleported successfully!
```

The Q# code in your workspace can also depend on other Q# *packages* and *projects* by using `.csproj` project files.

> [!TIP]
> If you don't have a project file for your workspace, the `qsharp` package will assume some reasonable defaults. Having a project file makes it easy to use additional packages, to get code completion and hover documentation while you edit your Q# files, and so forth.

To see what packages are currently added to your workspace, you can use the `qsharp.packages` object. You can also add new packages dynamically by using `qsharp.packages.add` object. For example, to add the [the QDK Chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview):

```python
qsharp.packages.add('Microsoft.Quantum.Chemistry')
```

## Next steps

Now that you have tested the Quantum Development Kit in your environment, you can follow this tutorial to write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).

For more information on how to run Q# programs with Python, see the following articles:

- [Q# with a Python host program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs?tabs=tabid-python#q-with-host-programs)
- [Run Q# on a local simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)
- [Run Q# on quantum hardware](xref:microsoft.quantum.submit-jobs) through Azure Quantum
- [Estimate quantum resources](xref:microsoft.quantum.machines.overview.resources-estimator) required by your program
- [Testing and debugging](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
