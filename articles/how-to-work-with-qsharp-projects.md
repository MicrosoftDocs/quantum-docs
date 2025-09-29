---
author: azure-quantum-content
description: Learn how to define a Q# project that uses multiple source files, and use your projects as reusable custom libraries.  
ms.author: quantumdocwriters
ms.date: 02/14/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: "Develop and Manage Q# Projects and Custom Libraries"
uid: microsoft.quantum.qsharp-projects
#customer intent: As a quantum developer, I want to understand how to use Q# projects to develop quantum programs and custom libraries
---

# How to create and manage Q# projects and custom libraries

In this article, you'll learn how to create, manage, and share *Q# projects*. Q# projects are folder structures with multiple Q# files that can access each other's operations and functions. Projects are helpful for logically organizing your source code. You can also use projects as custom libraries that can be accessed from external sources.

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- Visual Studio Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extension installed.
- A GitHub account, if you're planning to publish your external project to a public GitHub repository.

For running Python programs, you also need:

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The Azure Quantum `qsharp` and `azure-quantum` packages.

## How Q# projects work

A Q# project contains a Q# manifest file, named **qsharp.json**, and one or more *.qs files in a specified folder structure. When a user opens a \*.qs file in VS Code, or sets the `project_root` in a Jupyter Notebook or Python file, the compiler searches the surrounding folder hierarchy for the manifest file and determines the project's scope. If no manifest file is found, the compiler operates in a single file mode. You can create a Q# project manually or directly in VS Code.

An external Q# project is a standard Q# project that resides in another directory or on a public GitHub repository and acts as a custom library. An external project uses `export` statements to define which functions and operations can be accessed by external programs. Programs define the external project as a dependency in their manifest file, and use `import` statements to access the items (operations, functions, structs, and namespaces) in the external project. For more information, see [Using projects as external dependencies](#configuring-q-projects-as-external-dependencies).

## Define a Q# project

A Q# project is defined by the presence of a manifest file, named **qsharp.json**, and a **src** folder (which contains the Q# source files), both of which must be in the root folder of the project. For Q# programs and external projects, the Q# compiler detects the project folder automatically. For Python programs and Jupyter Notebooks, you must [specify the Q# project folder](#defining-the-project-folder-python-and-jupyter-notebook-programs) with a `qsharp.init` call. The folder structure for a Q# project, however, remains the same for all types of programs.

:::image type="content" source="media/multi-file-art.png" alt-text="The folder structure and hierarchy for a Q# project.":::

### [Using a Q# program](#tab/tabid-qsharp)

### Defining the project folder (Q# programs)

When a \*.qs file is opened in VS Code, the Q# compiler searches upward in the folder structure for a manifest file. If it finds a manifest file, the compiler then
includes all Q# files in the /src directory or any of its subdirectories. Each file's items are made available to all other files within the project.

For example, given this folder structure:

- **Teleportation_project**
  - *qsharp.json*
  - **src**
    - *Main.qs*
    - **TeleportOperations**
      - *TeleportLib.qs*
      - **PrepareState**
        - *PrepareStateLib.qs*

when you open the file */src/TeleportOperation/PrepareState/PrepareStateLib.qs*, the Q# compiler:

1. Checks */src/TeleportOperation/PrepareState/* for qsharp.json.
1. Checks */src/TeleportOperation* for qsharp.json.
1. Checks */src* for qsharp.json.
1. Checks */* for qsharp.json.
1. Establishes */* as the root directory of the project, and includes all *.qs files under the root in the project, per the manifest file's settings.

### [Using Python or a Jupyter Notebook](#tab/tabid-python)

### Defining the project folder (Python and Jupyter Notebook programs)

When you're using a Python program or Jupyter Notebook cell to access Q# resources, you need to set the root directory of the project directly with a `qsharp.init` statement. Using the same folder structure from the previous example

- **Teleportation_project**
  - *qsharp.json*
  - **src**
  - **MyPythonProgram.py**
    - *Main.qs*
    - **TeleportOperations**
      - *TeleportLib.qs*
      - **PrepareState**
        - *PrepareStateLib.qs*

you would set the `project_root` before making calls to any Q# operations.

Assuming your Python program is in the /src folder,

```python
import qsharp

qsharp.init(project_root = '../Teleportation_project')
```

> [!NOTE]
> If you're planning to compile your program to submit to the Azure Quantum service, you should also add your `target_profile` parameter to the `qsharp.init` statement. By default, `qsharp.init` sets the profile to `Unrestricted` so that you can test any quantum code in the local simulator. However, to submit a job to Azure Quantum, you may need to set the profile to `Base` or `Adaptive_RI`, for example, `qsharp.init(project_root = '../Teleportation_project', target_profile = qsharp.TargeProfile.Base)`. For more information about target profiles, see [QIR target profiles](xref:microsoft.quantum.target-profiles).

The path of the root folder is relative to the file that is setting it, meaning that your Q# project folder can be anywhere and the calling program doesn't necessarily have to be in the project. A valid path may also be `'./MyProjects/Teleportation_project'`, or `../../Teleportation_project`.

The Q# compiler verifies there is a valid manifest file in the specified root folder and makes any \*.qs resources under the **src** folder available for reference within the project.

***

## Create a manifest file

A manifest file is a simple .json file named **qsharp.json** that can optionally include **author**, **license**, and **lints** fields. The minimum viable manifest file is the string `{}`. When you create a Q# project in VS Code, a minimal manifest file is created for you.

```json
{}
```

### Manifest file examples

The following are some examples of how manifest files can define the scope of your Q# project.

- In this example, *author* is the only field specified, and therefore all *.qs files in this directory and all its subdirectories are included in the Q# project.

    ```json
    {
        "author":"Microsoft",
        "license": "MIT"
    }
    ```

- Within a Q# project, you can also use the manifest file to fine-tune the VS Code Q# Linter settings. By default, the three Linter rules are:

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

- You can also use the manifest file to define an external Q# project as a dependency and remotely access operations and functions in that external project. For more information, see [Using projects as external dependencies](#configuring-q-projects-as-external-dependencies).

## Q# project requirements and properties

The following requirements and configurations apply to all Q# projects.

- All *.qs files that you want to be included in the project must be under a folder named **src**, which must be under the root folder of the Q#. When you create a Q# project in VS Code, the `/src` folder is created automatically.
- The manifest file should be at the same level as the **src** folder. When you create a Q# project in VS Code, a minimal file is created automatically.
- Use `import` statements to reference operations and functions from other files in the project.

    ```qsharp
    import MyMathLib.*;  //imports all the callables in the MyMathLib namespace
    ...
        Multiply(x,y);
    ```

    or referencing them individually with the namespace

    ```qsharp
    MyMathLib.Multiply(x,y); 
    ```

**For Q# projects only**

- Only one *.qs file in a Q# project can have an entry point defined, defined by a single `Main()` operation.
- The *.qs file with the entry point definition can be located at any level below the manifest file.
- Any operation or function that is cached from a *.qs file anywhere in the Q# project displays in predictive text in VS Code.
- If the namespace for a selected operation or function isn't imported yet, VS Code automatically adds the necessary `import` statement.

## Steps for creating a Q# project

These steps apply to all Q# projects.

1. In the VS Code file explorer, go to the folder that you want to use for the root folder of the Q# project.
1. Open the **View** menu and choose **Command Palette**.
1. Enter and **QDK: Create Q# project** and press **Enter**. VS Code creates a minimal manifest file in the folder, and adds a `/src` folder with a `Main.qs` template file.
1. Edit the manifest file as needed. See [Manifest file examples](#manifest-file-examples).
1. Add and organize your Q# source files under the `/src` folder.
1. If you're accessing the Q# project from a Python program or Jupyter Notebook, set the [root folder path](#defining-the-project-folder-python-and-jupyter-notebook-programs) using `qsharp.init`. This example assumes that your program is in the `/src` folder of the Q# project:

    ```python
    qsharp.init(project_root = '../Teleportation_project')
    ```

1. If you're using only Q# files in VS Code, when you open a Q# file, the compiler searches for a manifest file, determines the root folder of the project, and then scans the subfolder for \*.qs files.

> [!NOTE]
> You can also manually create the manifest file and the `/src` folder.

## Example project

This quantum teleportation program is an example of a Q# project based the single folder structure shown earlier, and runs on the local simulator in VS Code. To run the program on Azure Quantum hardware or third-party simulators, see [Get started with Q# programs and VSCode](xref:microsoft.quantum.submit-jobs) for steps to compile your program and connect to your Azure workspace.

The example uses this directory structure:

- **Teleportation_project**
  - *qsharp.json*
  - **src**
    - *Main.qs*
    - **TeleportOperations**
      - *TeleportLib.qs*
      - **PrepareState**
        - *PrepareStateLib.qs*

The manifest file contains the *author* and *license* fields:

```json
{
    "author":"Microsoft",
    "license":"MIT"
}
```

### Q\# source files

The main file, Main.qs, contains the entry point and references the `TeleportOperations.TeleportLib` namespace from TeleportLib.qs.

```qsharp

    import TeleportOperations.TeleportLib.Teleport; // references the Teleport operation from TeleportLib.qs

    operation Main() : Unit {
        use msg = Qubit();
        use target = Qubit();

        H(msg);
        Teleport(msg, target); // calls the Teleport() operation from TeleportLib.qs
        H(target);

        if M(target) == Zero {
            Message("Teleported successfully!");
        
        Reset(msg);
        Reset(target);
        }
    }
```

*TeleportLib.qs* defines the `Teleport()` operation and calls the `PrepareBellPair()` operation from *PrepareStateLib.qs*.

```qsharp

    import TeleportOperations.PrepareState.PrepareStateLib.*; // references the namespace in PrepareStateLib.qs
 
    operation Teleport(msg : Qubit, target : Qubit) : Unit {
        use here = Qubit();

        PrepareBellPair(here, target); // calls the PrepareBellPair() operation from PrepareStateLib.qs
        Adjoint PrepareBellPair(msg, here);

        if M(msg) == One { Z(target); }
        if M(here) == One { X(target); }

        Reset(here);
    }
```

The *PrepareStateLib.qs* file contains a standard reusable operation to create a Bell pair.

```qsharp
    
    operation PrepareBellPair(left : Qubit, right : Qubit) : Unit is Adj + Ctl {
        H(left);
        CNOT(left, right);
    }
```

### Running the programs

Select the tab for the environment in which you're running your program.

### [Running a Q# program](#tab/tabid-qsharp-run)

To run this program, open the Main.qs file in VS Code and select **Run**.

### [Running a Jupyter Notebook](#tab/tabid-notebook-run)

To run this program in a Jupyter Notebook, open a new notebook and run the following cells:

```python
import qsharp
```

```python
# set the root folder for the Q# project
# make adjustments to the path depending on where your program is saved

# this example assumes your program is in the /src folder
qsharp.init(project_root = '../Teleportation_project')

```

If your path is valid, you see a confirmation message, `Q# initialized with configuration: {'targetProfile': 'unrestricted'}`

Run the program by calling the main operation using the `%%qsharp` magic command

```qsharp
%%qsharp
// call the main operation
Main.Main();
```

or by using the `qsharp.eval()` statement

```python
print (qsharp.eval("Main.Main()"))
```

### [Running a Python program](#tab/tabid-python-run)

To run this program, run the following commands:

```python
import qsharp
```

```python
# set the root folder for the Q# project
# make adjustments to the path depending on where your program is saved

# this example assumes your program is in the same folder as the root folder
qsharp.init(project_root = '../Teleportation_project')
```

Run the program by calling the main operation with `qsharp.eval()`

```python
print (qsharp.eval("Main.Main()"))
```

***

## Configuring Q# projects as external dependencies

A Q# project can also be configured as an external dependency for other projects, acting much like a library, where the functions and operations in the external Q# project are made available to multiple Q# projects. An external dependency can reside on a drive share or published to a public GitHub repository.

To use a Q# project as an external dependency, you need to:

- Add the external project as a dependency in the manifest file of the calling project.
- If the external project is published to GitHub, add the "files" property to the manifest file of the external project.
- Add `export` statements to the external project.
- Add `import` statements to the calling project.

### Configuring the manifest files

External Q# projects can reside on a local or network drive share, or published to a public GitHub repository.

#### The calling project manifest file

To add a dependency to an external project on a drive share, define the dependency in the manifest file of the calling project.

```json
{
    "author": "Microsoft",
    "license": "MIT",
    "dependencies": {
        "MyDependency": {
            "path": "/path/to/project/folder/on/disk"
        }
    }
}
```

where "MyDependency" is a user defined string that identifies the namespace when calling an operation. For example, if you create a dependency named "MyMathFunctions", you would call a function from that dependency with `MyMathFunctions.MyFunction()`.

To add a dependency to a project that is published to a public GitHub repository

```json
{
    "author": "Microsoft",
    "dependencies": {
        "MyDependency": {
            "github": {
                "owner": "GitHubUser",
                "repo": "GitHubRepoName",
                "ref": "CommitHash",
                "path": "/path/to/dependency"
            }
        }
}
```

> [!NOTE]
> For GitHub dependencies, "ref" refers to a GitHub [refspec](https://git-scm.com/book/en/v2/Git-Internals-The-Refspec). Microsoft recommends always using a commit hash, so you can rely on a specific version of your dependency.

#### The external project manifest file

If your external Q# project is published to a public GitHub repository, you **must** add the *files* property to the manifest file of the external project, including all files used in the project.

```json
{
    "author": "Microsoft",
    "license": "MIT",
    "files": [ "src/MyMathFunctions.qs", "src/Strings/MyStringFunctions.qs" ]
}
```

The "files" property is optional for an external project being imported via `"path"` (that is, a local filepath-based import). It is only required for projects published to GitHub.

### Using the export statement

To make functions and operations in an external project accessible to calling projects, you use the `export` statement. You can export any or all of the callables in the file. Wild card syntax is not supported, you must specify each callable to export.

```qsharp
operation Operation_A() : Unit {
...
}
operation Operation_B() : Unit  {
...
}

// makes just Operation_A available to calling programs
export Operation_A;

// makes Operation_A and Operation_B available to calling programs 
export Operation_A, Operation_B, etc.; 

// makes Operation_A available as 'OpA'
export Operation_A as OpA;
```

### Using the import statement

From the calling program, you use `import` statements to make items from an external dependency available. `import` statements use the namespace that is defined for the dependency in the manifest file. For example, for this dependency

```json
{
    "author": "Microsoft",
    "license": "MIT",
    "dependencies": {
        "MyMathFunctions": {
            "path": "/path/to/project/folder/on/disk"
        }
    }
}
```

you import callables as

```qsharp
import MyMathFunctions.MyFunction;  // imports "MyFunction()" from the namespace
...
```

The `import` statement also supports wild card syntax and aliases

```qsharp
// imports all items from the "MyMathFunctions" namespace
import MyMathFunctions.*; 

// imports the namespace as "Math", all items are accessible via "Math.<callable>"
import MyMathFunctions as Math;

// imports a single item, available in the local scope as "Add"
import MyMathFunctions.MyFunction as Add;

// imports can be combined on one line
import MyMathFunctions.MyFunction, MyMathFunctions.AnotherFunction as Multiply; 
```

> [!NOTE]
> The currently used `open` statement in Q#, which is used to reference libraries and namespaces, is still supported but will be deprecated eventually. In the meantime, you can optionally update your current files to use the `import` statement. For example, `open Microsoft.Quantum.Diagnostics;` can be replaced with `import Microsoft.Quantum.Diagnostics.*;`.
> Also note that when using the `import` statement with the standard Q# libraries, you can shorten the root namespace to `Std`. For example, `import Microsoft.Quantum.Diagnostics.*;` can be written as `import Std.Diagnostics.*;`.

### Example external project

For this example, you'll use the same teleportation program as the earlier example, but separate the calling program and the callables into different projects.

1. Create two folders on your local drive, for example "Project_A" and "Project_B".
1. Create a Q# project in each folder following the steps in [Steps for creating a Q# project](#steps-for-creating-a-q-project).
1. In **Project_A**, the calling program, copy the following code into the manifest file, editing the path as needed for Project_B

    ```json
    {
      "author": "Microsoft",
      "license": "MIT",
      "dependencies": {
        "MyTeleportLib": {
          "path": "/Project_B" 
          }
        }
      }    
    ```

1. In Project_A, copy the following code into Main.qs

    ```qsharp
    import MyTeleportLib.Teleport; // imports the Teleport operation from the MyTeleportLib namespace defined in the manifest file

    operation Main() : Unit {
        use msg = Qubit();
        use target = Qubit();

        H(msg);
        Teleport(msg, target); // calls the Teleport() operation from the MyTeleportLib namespace
        H(target);

        if M(target) == Zero {
            Message("Teleported successfully!");
        
        Reset(msg);
        Reset(target);
        }
    }   
    ```

1. In **Project_B**, copy the following code into Main.qs

    ```qsharp
        
        operation Teleport(msg : Qubit, target : Qubit) : Unit {
            use here = Qubit();
    
            PrepareBellPair(here, target); 
            Adjoint PrepareBellPair(msg, here);
    
            if M(msg) == One { Z(target); }
            if M(here) == One { X(target); }
    
            Reset(here);
        }

        operation PrepareBellPair(left : Qubit, right : Qubit) : Unit is Adj + Ctl {
            H(left);
            CNOT(left, right);
        }

        export Teleport;       //  makes the Teleport operation available to external programs
    ```

    > [!NOTE]
    > Note that the `PrepareBellPair` operation does not need to be exported because it is not called directly from your program in Project_A. Because it is in the local scope of Project_B, it is already accessible by the `Teleport` operation

1. To run the program, open /Project_A/Main.qs in VS Code and select **Run**.

## Projects and implicit namespaces

In Q# projects, if a namespace is not specified in a *.qs program, then the compiler uses the file name as the namespace. Referencing a callable from an external dependency then uses the syntax \<dependencyName>.\<namespace>.\<callable>. However, if the file is named "Main.qs", then the compiler assumes the namespace and the calling syntax is \<dependencyName>.\<callable>, as in the previous example, `import MyTeleportLib.Teleport`.

Since it is not uncommon to have multiple project files, you need to account for the correct syntax when referencing callables. For example, in a project with the following file structure

- /src
  - Main.qs
  - MathFunctions.qs

calls to the external dependency would be

```qsharp
import MyTeleportLib.MyFunction;        // "Main" namespace is implied

import MyTeleportLib.MathFunctions.MyFunction;   // "Math" namespace must be explicit 
```

For more information about namespace behavior, see [User namespaces](xref:microsoft.quantum.qsharp-overview#user-namespaces).
