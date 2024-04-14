---
author: bradben
description: This article describes how to define a Q# project that makes use of multiple Q# psource files in a multi-level folder structure. 
ms.author: brbenefield
ms.date: 03/21/2024
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: "How to Work With Qsharp Projects"
uid: microsoft.quantum.qsharp-projects
#customer intent: As a quantum developer, I want to understand how to use Q# projects
---

# Work with Q# projects

With the release of the Azure Quantum Development Kit, you can define *Q# projects*, which are folder structures with multiple Q# files that can access each other's resources. Projects are helpful for creating reusable libraries and logically organizing your source code.

A Q# project contains a Q# manifest file, named *qsharp.json*, and one or more *.qs files in a specified folder structure. When a user opens a *.qs file in VS Code, or sets the `project_root` in a Jupyter Notebook or Python file, the compiler searches the surrounding folder hierarchy for the manifest file and determines the project's scope. If no manifest file is found, the compiler operates in a single file mode.  A Q# project can be created manually or directly in VS Code. 

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed. 
- Visual Studio Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extension installed.
- The Azure Quantum `qsharp` and `azure-quantum` packages. 

## Define a Q# project

A Q# project is defined by the presence of a *qsharp.json* manifest file, a **src** folder that contains the Q# source files, and the root folder of the project. The process of determining the root folder depends on whether you are working with a Q# program, or with a Python program or Jupyter Notebook. The folder structure for a Q# project, however, remains the same for both types of programs.

:::image type="content" source="../media/multi-file-art.png" alt-text="Picture showing the folder hierarchy for a Q# project.":::

### [Using a Q# program](#tab/tabid-qsharp)

When a \*.qs file is opened in VS Code, the Q# compiler searches upward in the folder structure for a *qsharp.json* manifest file. If it finds a manifest file, the compiler then searches downward through all the subfolders of the **src** directory for *.qs files and caches any operations or functions, and makes those oerations and functions available to all the *.qs files, per the manifest file's exclusion rules. 

For example, given this folder structure:

* **Teleportation_project**
    * *qsharp.json*
    * **src**
        *  *RunTeleport.qs*
        *  **TeleportOperations**
            * *Teleport.qs*
            * **PrepareState**
                * *PrepareState.qs*

when you open the file */src/TeleportOperation/PrepareState/PrepareState.qs*, the Q# compiler: 
1.	Checks */src/TeleportOperation/PrepareState/* for a *qsharp.json* file.
1.	Checks */src/TeleportOperation* for *qsharp.json*.
1.  Checks */src* for *qsharp.json*.
1.	Checks */* for *qsharp.json*.
1.	Establishes */* as the root directory of the project, and includes all *.qs files under the root in the project, per the manifest file's exclusion rules.

### [Using Python or a Jupyter Notebook](#tab/tabid-python)

When you're using a Python program or Jupyter Notebook cell to access Q# resources, you set the root directory of the project directly with a `qsharp.init` statement. Using the example folder structure:

* **Teleportation_project**
    * *qsharp.json*
    * **src**
        *  *RunTeleport.qs*
        *  **TeleportOperations**
            * *Teleport.qs*
            * **PrepareState**
                * *PrepareState.qs*

you would set the `project_root` before making calls to any Q# operations:

```python
import qsharp

qsharp.init(project_root = './Teleportation_project')
```

The path of the root folder is relative to the file that is setting it, meaning that your program doesn't necessarily have to be in the project. A valid path may also be `'./MyProjects/Teleportation_project'`

The Q# compiler verifies there is a valid *qsharp.json* file in the specified root folder and makes any \*.qs resources under the **src** folder available for reference, per the manifest file's exclusion rules.

***

## Create a manifest file

A manifest file is a simple .json file named *qsharp.json* that can optionally include *author*, *license*, and *.ints* fields. The minimum viable manifest file is the string `{}`. When you create a Q# project in VS Code, a minimal manifest file is created for you. 

```json
{}
```

### Manifest file examples

The following are some examples of how manifest files can define the scope of your Q# project.

In this example, *author* is the only field specified, and therefore all *.qs files in this directory and all its subdirectories are included in the project. 

```json
{
    "author":"Microsoft"
}
```

```json
{
    "author":"Microsoft",
    "license":"MIT"
}
```

Within a Q# project, you can also use the manifest file to fine-tune the VS Code Q# Linter settings. By default, the three Linter rules are:

- `needlessParens`: default = `allow`
- `divisionByZero`: default = `warn`
- `redundantSemicolons`: default = `warn`

Using the manifest file, you can set each rule to either `allow`, `warn`, or `error`, for example 

```json
{
    "author":"Microsoft",
    "lints": [
        {
          "lint": "needlessParens",
          "level": "allow"
        },
        {
          "lint": "redundantSemicolons",
          "level": "warn"
        },
        {
          "lint": "divisionByZero",
          "level": "error"
        }
      ]
}
```

## Q# project requirements and properties

* All *.qs files that you want to be included in the project must be under a folder named **src**, which must be under the project root folder. When you create a Q# project in VS Code, the `/src` folder is created automatically. 
* The *qsharp.json* manifest file should be at the same level as the **src** folder. When you create a Q# project in VS Code, the *qsharp.json* file is created automatically.
* Operations and functions in available source files can be accessed using `open` statements:

```qsharp
open MyMathLib;
...
    Multiply(x,y);
```
or referencing them with the namespace:

```qsharp
MyMathLib.Multiply(x,y);
```

**For Q# programs only**
* Only one *.qs file in a project can have an `@EntryPoint()` defined. 
* The *.qs file with the `@EntryPoint()` definition can be located at any level below the manifest file.
* Any operation or function that is cached from a *.qs file anywhere in the project displays in predictive text in VS Code.
* If the namespace for a selected operation or function hasn't been added yet, VS Code automatically adds the necessary `open` statement.


## Steps for creating a Q# project

1. In the VS Code file explorer, right-click the folder you want to use for the project root folder and select **Create Q# project**, or open the folder and select **View > Command Palette > Q#: Create a Q# project...**.
1. VS Code creates a minimal *qsharp.json* manifest file in the folder, and adds a `/src` folder with a `Main.qs` template file. 
1. Edit the manifest file as needed. See [Manifest file examples](#manifest-file-examples).
1. Add and organize your Q# source files under the `/src` folder. 
1. If you are accessing the project from a Python program or Jupyter Notebook, set the root folder path using `qsharp.init`, for example:

    ```python
    qsharp.init(project_root = './Teleportation_project')
    ```
1. If you are using only Q# files in VS Code, when you open a Q# file, the compiler searches for the *qsharp.json* manifest file, determine the project root folder, and then scan the subfolder for \*.qs files. 

> [!NOTE]
> You can also manually create the manifest file and the `/src` folder in step 2. 

## Example project

This quantum teleportation program is an example of a Q# project based the folder structure shown earlier, and runs on the local simulator in VS Code. To run the program on Azure Quantum hardware or third-party simulators, see [Get started with Q# programs and VSCode ](xref:microsoft.quantum.submit-jobs) for steps to compile your program and connect to your Azure workspace. 

The example uses this directory structure:

* **Teleportation_project**
    * *qsharp.json*
    * **src**
        *  *RunTeleport.qs*
        *  **TeleportOperations**
            * *Teleport.qs*
            * **PrepareState**
                * *PrepareState.qs*

The *qsharp.json* manifest file contains the *author* and *license* fields:

```json
{
    "author":"Microsoft",
    "license":"MIT"
}
```

While the source files are the same for a Q# program and a Python program or Jupyter Notebook, there are some implementation differences. 

### [Using Q# ](#tab/tabid-qsharp-run)


The main file, *RunTeleport.qs*, contains the entry point and references the `TeleportLib` namespace in *Teleport.qs*.

```qsharp
namespace RunTeleport {

    open TeleportLib;   // references the TeleportLib namespace in Teleport.qs

    @EntryPoint()
    operation RunTeleportationExample() : Unit {
        use msg = Qubit();
        use target = Qubit();

        H(msg);
        Teleport(msg, target);    // calls the Teleport() operation from Teleport.qs
        H(target);

        if M(target) == Zero {
            Message("Teleported successfully!");
        
        Reset(msg);
        Reset(target);
        }
    }
}
```

*Teleport.qs* defines the `Teleport()` operation and calls the `PrepareBellPair()` operation from *PrepareState.qs*.

```qsharp
namespace TeleportLib {

    open PrepareBell;     // references the PrepareBell namespace in PrepareState.qs

    operation Teleport(msg : Qubit, target : Qubit) : Unit {
        use here = Qubit();

        PrepareBellPair(here, target);      // calls the PrepareBellPair() operation from PrepareState.qs
        Adjoint PrepareBellPair(msg, here);

        if M(msg) == One { Z(target); }
        if M(here) == One { X(target); }

        Reset(here);
    }
}
```

The *PrepareState.qs* file contains a standard reusable operation to create a Bell pair. 

```qsharp
namespace PrepareBell {    
    
    operation PrepareBellPair(left : Qubit, right : Qubit) : Unit is Adj + Ctl {
        H(left);
        CNOT(left, right);
    }
}
```

### [Using Python or a Jupyter Notebook](#tab/tabid-python-run)

For a Python or Jupyter Notebook driver program, the main file, *RunTeleport.qs*, doesn't require an entry point, because it won't actually be run. It is there as a source library only.

For variety, these \*.qs files reference the function and operation calls using the full namespace - otherwise they are the same as the Q# program version.  

To run this program in a Juptyer Notebook, open a new notebook and run the following cells:

```python
import qsharp
```

```python
# set the root folder for the project
# make adjustments to the path depending on where your program is saved
qsharp.init(project_root = './Teleportation_project')

```

If your path is valid, you see a confirmation message, `Q# initialized with configuration: {'targetProfile': 'unrestricted'}`


```qsharp
%%qsharp
// call the main operation 
RunTeleport.RunTeleportationExample();
```

**Q# source files**


```qsharp
namespace RunTeleport {

    operation RunTeleportationExample() : Unit {
        use msg = Qubit();
        use target = Qubit();

        H(msg);
        TeleportLib.Teleport(msg, target);    // calls the Teleport() operation with its full namespace
        H(target);

        if M(target) == Zero {
            Message("Teleported successfully!");
        
        Reset(msg);
        Reset(target);
        }
    }
}
```

*Teleport.qs* defines the `Teleport()` operation and calls the `PrepareBellPair()` operation from *PrepareState.qs*.

```qsharp
namespace TeleportLib {

    operation Teleport(msg : Qubit, target : Qubit) : Unit {
        use here = Qubit();

        PrepareBell.PrepareBellPair(here, target);      // calls the PrepareBellPair() operation 
        Adjoint PrepareBell.PrepareBellPair(msg, here);

        if M(msg) == One { Z(target); }
        if M(here) == One { X(target); }

        Reset(here);
    }
}
```

The *PrepareState.qs* file contains a standard reusable operation to create a Bell pair. 

```qsharp
namespace PrepareBell {    
    
    operation PrepareBellPair(left : Qubit, right : Qubit) : Unit is Adj + Ctl {
        H(left);
        CNOT(left, right);
    }
}
```
