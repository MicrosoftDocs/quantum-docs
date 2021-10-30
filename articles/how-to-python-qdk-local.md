---
author: bradben
description: Learn how to develop and run Python host programs that call Q# operations on a local simulator.
ms.author: v-benbra
ms.date: 10/25/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Run a Q# and Python program on a local quantum simulator
uid: microsoft.quantum.how-to.python-local
---

# Run a Q# and Python program on a local quantum simulator

The Microsoft Quantum Development Kit contains several [quantum simulators](xref:microsoft.quantum.machines.overview) that allow you to test and run quantum programs locally, without having to access the Azure Quantum service.

## Prerequisite

Set up your Python environment with the Microsoft Quantum Development Kit following the steps in [Set up a Python environment](xref:microsoft.quantum.install-qdk.overview.python).

## Choose your IDE

While you can use Q# with Python in any IDE, we recommend using Visual Studio Code (VS Code) for your Q# + Python applications. With the QDK extension for VS Code you gain access to richer functionality such as warnings, syntax highlighting, project templates, and more.

If you would like to use VS Code:

- Install [VS Code](https://code.visualstudio.com/download) (Windows, Linux and Mac).
- Install the [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).

VS Code also offers its own terminal from which you can run code. If you are using conda, make sure you follow the procedure detailed in the installation section to initialize conda for the shell used by VS Code. On Windows, VS Code will use PowerShell unless configured differently. Doing so will allow you to run *Q# with Python* programs directly from VS Code's integrated terminal, however you can use any terminal of your choice with access to Python. Remember to activate your Q# environment there before running any programs, using `conda activate qsharp-env`.

If you would like to use a different editor, the instructions so far have you all set.

## Write your first Q# program

THe sample program creates a random number generator and runs it on a quantum [simulator](xref:microsoft.quantum.machines.overview).

1. Create a minimal Q# [operation](xref:microsoft.quantum.qsharp.operationsandfunctions) by creating a file called `Operation.qs` and adding the following code to it:

    :::code language="qsharp" source="~/quantum/samples/interoperability/qrng/Qrng.qs" range="3-14":::

1. In the same folder as `Operation.qs`, create the following Python program called `host.py`. This program [imports the Q# operation](/azure/quantum/user-guide/host-programs?tabs=tabid-python#q-with-host-programs) `SampleQuantumRandomNumberGenerator()` defined in the previous step and runs it on the [default simulator](xref:microsoft.quantum.machines.overview.full-state-simulator) with a `.simulate()` call:

    ```python
    import qsharp
    from Qrng import SampleQuantumRandomNumberGenerator

    print(SampleQuantumRandomNumberGenerator.simulate())
    ```

1. From a terminal with access to your Python/Q# environment created during installation, navigate to your project folder and run the Python host program:

    ```shell
    python host.py
    ```

1. You should see the result of the operation you invoked. In this case, because your operation generates a random result, you will see either `0` or `1` printed on the screen. If you run the program repeatedly, you should see each result approximately half the time.

> [!NOTE]
> The Python code is just a normal Python program. You can use any Python environment, including Python-based Jupyter Notebooks, to write the Python program and call Q# operations. The Python program can import Q# operations from any .qs files located in the same folder as the Python code itself.

## Next steps

Now that you have tested the Quantum Development Kit in your environment, you can follow this tutorial to write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).

For more information on how to run Q# programs with Python, see the following articles:

- how [Q# interacts with a Python host program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs?tabs=tabid-python#q-with-host-programs)

- how to [run Q# on a local simulator](xref:microsoft.quantum.machines.overview.full-state-simulator)

- how to [run Q# on quantum hardware](xref:microsoft.quantum.submit-jobs) through Azure Quantum

- how to first [estimate quantum resources](xref:microsoft.quantum.machines.overview.resources-estimator) required by your program
