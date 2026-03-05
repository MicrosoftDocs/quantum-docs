---
author: azure-quantum-content
description: Learn how to define a Q# project that uses multiple source files, and use your projects as reusable custom libraries.  
ms.author: quantumdocwriters
ms.date: 02/26/2026
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ["AI", "azure-quantum", "Azure Quantum", "Microsoft Quantum Development Kit", "Circuit Editor", "Cirq", "CodeLens", "Copilot", "Google", "IBM", "IntelliSense", "Jupyter", "Jupyter Notebook", "Microsoft", "Microsoft's", "OpenQASM", "Python", "Q#", "QDK", "QDK's", "Qiskit", "SDK", "Visual Studio Code", "VS Code"]
title: "Develop and Manage Q# Projects and Custom Libraries"
uid: microsoft.quantum.qsharp-projects
#customer intent: As a quantum developer, I want to understand how to use Q# projects to develop quantum programs and custom libraries
---

# How to create and manage Q# projects and custom libraries

In this article, you learn how to create, manage, and share Q# projects. A Q# project is a folder structure with multiple Q# files that can access each other's operations and functions. Projects help you logically organize your source code. You can also use projects as custom libraries that you can access from external sources.

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- Visual Studio Code (VS Code) with the [Microsoft Quantum Development Kit (QDK)](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extensions installed.
- To publish your external project to a public GitHub repository, you need to have a GitHub account.

To run Python programs, you also need:

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The `qdk` Python library with the `azure` extra.

    ```bash
    python -m pip install --upgrade "qdk[azure]"
    ```

## How Q# projects work

A Q# project contains a Q# manifest file named `qsharp.json`, and one or more `.qs` and `.qsc` files in a specified folder structure. You can create a Q# project manually or directly in VS Code.

When you open a `.qs` or `.qsc` file in VS Code, the compiler searches the surrounding folder hierarchy for the manifest file and determines the project's scope. If the compiler doesn't find a manifest file, then the compiler operates in a single file mode.

When you set the `project_root` in a Jupyter Notebook or Python file, the compiler looks for the manifest file in the `project_root` folder.

An external Q# project is a standard Q# project that's located in another directory or on a public GitHub repository, and acts as a custom library. An external project uses `export` statements to define the functions and operations that are accessible by external programs. Programs define the external project as a dependency in their manifest file, and use `import` statements to access the items in the external project, such as operations, functions, structs, and namespaces. For more information, see [Using projects as external dependencies](#configure-q-projects-as-external-dependencies).

## Define a Q# project

A Q# project is defined by the presence of a `qsharp.json` manifest file and a `src` folder, both of which must be in the root folder of the project. The `src` folder contains the Q# source files. For Q# programs and external projects, the Q# compiler automatically detects the project folder. For Python programs and Jupyter Notebook files, you must [specify the Q# project folder](#define-the-project-folder-for-python-and-jupyter-notebook-programs) with a `qsharp.init` call. However, the folder structure for a Q# project is the same for all types of programs.

:::image type="content" source="media/multi-file-art.png" alt-text="The folder structure and hierarchy for a Q# project.":::

### [Use a Q# program](#tab/tabid-qsharp)

### Define the project folder for Q# programs

When you open a `.qs` file in VS Code, the Q# compiler searches upward in the folder structure for a manifest file. If the compiler finds a manifest file, then the compiler includes all Q# files in the `/src` directory and its subdirectories. The items defined in each file become available to all other files within the project.

For example, consider the following folder structure:

- **Teleportation_project**
  - *qsharp.json*
  - **src**
    - *Main.qs*
    - **TeleportOperations**
      - *TeleportLib.qs*
      - **PrepareState**
        - *PrepareStateLib.qs*

When you open the file `/src/TeleportOperation/PrepareState/PrepareStateLib.qs`, the Q# compiler does the following:

1. Checks `/src/TeleportOperation/PrepareState/` for `qsharp.json`.
1. Checks `/src/TeleportOperation` for `qsharp.json`.
1. Checks `/src` for `qsharp.json`.
1. Checks `/Teleportation_project` for `qsharp.json` and finds the file.
1. Establishes `/Teleportation_project` as the root directory of the project, and includes all `.qs` and `.qsc` files under the `/src` directory in the project. If the manifest file.

> [!NOTE]
> If you includes explicit references to `.qs` and `.qsc` file paths in `qsharp.json`, the compiler loads those files and doesn't go through the automatic discovery process. Explicit file path references are necessary only when you define a library to be loadable from a Git reference.

### [Use Python or Jupyter Notebook](#tab/tabid-python)

### Define the project folder for Python and Jupyter Notebook programs

When you use a Python program or Jupyter Notebook cell to access Q# resources, you must directly set the root directory of the project with a `qsharp.init` statement.

Consider the following folder structure, which contains a `.py` Python file:

- **Teleportation_project**
  - *qsharp.json*
  - **src**
    - *MyPythonProgram.py*
    - *Main.qs*
    - **TeleportOperations**
      - *TeleportLib.qs*
      - **PrepareState**
        - *PrepareStateLib.qs*

You must set the `project_root` before you make calls to Q# operations. For example:

```python
from qdk import qsharp

qsharp.init(project_root = '../Teleportation_project')
```

> [!NOTE]
> To compile your program to submit to the Azure Quantum service, add your `target_profile` parameter to the `qsharp.init` statement. By default, `qsharp.init` sets the profile to `Unrestricted` so that you can test any quantum code in the local simulator. However, to submit a job to Azure Quantum, you might need to set the profile to `Base` or `Adaptive_RI`. For example, `qsharp.init(project_root = '../Teleportation_project', target_profile = qsharp.TargeProfile.Base)`. For more information about target profiles, see [QIR target profiles](xref:microsoft.quantum.target-profiles).

The path of the root folder is relative to the file that sets the path, so your Q# project folder can be anywhere and the calling program doesn't have to be in the project. For example, the following paths are also valid:

- `'./MyProjects/Teleportation_project'`
- `../../Teleportation_project`

The Q# compiler verifies that there's a valid manifest file in the specified root folder. If the compiler finds a valid manifest file, then the compiler makes all resources from `.qs` and `.qsc` files under the `src` folder available for reference within the project.

***

## Create a manifest file

A manifest file is a JSON file named `qsharp.json` that can include optional `author`, `license`, and `lints` fields. The minimum viable manifest file is the string `{}`. When you create a Q# project in VS Code, a minimal manifest file is created for you.

```json
{}
```

### Manifest file examples

The following examples show how manifest files define the scope of your Q# project.

- In this example, `author` is the only specified field, so all `.qs` files in this directory and its subdirectories are included in the Q# project.

    ```json
    {
        "author":"Microsoft"
    }
    ```

- Within a Q# project, you can also use the manifest file to fine-tune the VS Code Q# Linter settings. By default, the three Linter rules are:

  - `needlessParens`: default = `allow`
  - `divisionByZero`: default = `warn`
  - `redundantSemicolons`: default = `warn`

    You can set each rule in the manifest file to either `allow`, `warn`, or `error`. For example:

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

- You can also use the manifest file to define an external Q# project as a dependency and remotely access operations and functions in that external project. For more information, see [Using projects as external dependencies](#configure-q-projects-as-external-dependencies).

## Q# project requirements and properties

The following requirements and configurations apply to all Q# projects.

- All `.qs` files that you want to include in the project must be under a folder named `src`, which must be under the root folder of the Q# project. When you create a Q# project in VS Code, the `/src` folder is automatically created.
- The manifest file should be at the same level as the `src` folder. When you create a Q# project in VS Code, a minimal manifest file is automatically created.
- Use `import` statements to reference operations and functions from other files in the project.

    ```qsharp
    import MyMathLib.*;  //imports all the callables in the MyMathLib namespace

    ...

    Multiply(x,y);
    ```

    Or, reference them individually with the namespace.

    ```qsharp
    MyMathLib.Multiply(x,y); 
    ```

### For Q# projects only

- You can define an entry point operation in only one `.qs` file in a Q# project, which is the `Main()` operation by default.
- You must put the `.qs` file with the entry point definition at a project directory level below the manifest file.
- All operations and functions in the Q# project that are cached from a `.qs` display in predictive text in VS Code.
- If the namespace for a selected operation or function isn't imported yet, then VS Code automatically adds the necessary `import` statement.

## How to create a Q# project

To create a Q# project, follow these steps:

1. In the VS Code file explorer, go to the folder that you want to use as the root folder for the Q# project.
1. Open the **View** menu and choose **Command Palette**.
1. Enter **QDK: Create Q# project**. VS Code creates a minimal manifest file in the folder, and adds a `/src` folder with a `Main.qs` template file.
1. Edit the manifest file for your project. See [Manifest file examples](#manifest-file-examples).
1. Add and organize your Q# source files under the `/src` folder.
1. If you're accessing the Q# project from a Python program or Jupyter Notebook, then set the [root folder path](#define-the-project-folder-for-python-and-jupyter-notebook-programs) with `qsharp.init`. This example assumes that your program is in the `/src` folder of the Q# project:

    ```python
    qsharp.init(project_root = '../Teleportation_project')
    ```

1. If you're using only Q# files in VS Code, then the compiler searches for a manifest file when you open a Q# file and determines the root folder of the project. Then, the compiler scans `/src` and its subdirectories for `.qs` and `.qsc` files.

> [!NOTE]
> You can manually create the manifest file and the `/src` folder instead.

## Example project

This quantum teleportation program is an example of a Q# project that runs on the local simulator in VS Code. To run the program on Azure Quantum hardware or third-party simulators, see [Get started with Q# programs and VS Code](xref:microsoft.quantum.submit-jobs) for steps to compile your program and connect to your Azure Quantum workspace.

This example has the following directory structure:

- **Teleportation_project**
  - *qsharp.json*
  - **src**
    - *Main.qs*
    - **TeleportOperations**
      - *TeleportLib.qs*
      - **PrepareState**
        - *PrepareStateLib.qs*

The manifest file contains the **author** and **license** fields:

```json
{
    "author":"Microsoft",
    "license":"MIT"
}
```

### Q# source files

The main file `Main.qs` contains the entry point and references the `TeleportOperations.TeleportLib` namespace from `TeleportLib.qs`.

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

The `TeleportLib.qs` file defines the `Teleport` operation and calls the `PrepareBellPair` operation from the `PrepareStateLib.qs` file.

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

The `PrepareStateLib.qs` file contains a standard reusable operation to create a Bell pair.

```qsharp
    operation PrepareBellPair(left : Qubit, right : Qubit) : Unit is Adj + Ctl {
        H(left);
        CNOT(left, right);
    }
```

### Run the programs

Choose the tab for the environment where you run your program.

### [Run Q# code in VS Code](#tab/tabid-qsharp-run)

To run this program, open the `Main.qs` file in VS Code and choose **Run**.

### [Run a Jupyter Notebook](#tab/tabid-notebook-run)

To run this program in a Jupyter Notebook, name your project's root directory `Teleportation_project`. Then, open a new notebook in the root directory and run the following cells:

```python
from qdk import qsharp
```

```python
# Set the root folder for the Q# project
# Make adjustments to the path depending on where your program is saved

# This example assumes that your program is in the /src folder
qsharp.init(project_root = '../Teleportation_project')
```

If your path is valid, then you get a confirmation message that shows you the configuration of your Q# initialization.

To run the program, use the `%%qsharp` magic command to call the `Main` operation.

```qsharp
%%qsharp

// call the main operation
Main.Main();
```

Or, call the `qsharp.eval` method.

```python
print(qsharp.eval("Main.Main()"))
```

### [Run a Python program](#tab/tabid-python-run)

To run this program, run the following Python script from a `.py` file in the project's root directory:

```python
from qdk import qsharp

# Set the root folder for the Q# project
# Make adjustments to the path depending on where your program is saved

# This example assumes that your program is in the same folder as the root folder
qsharp.init(project_root = '../Teleportation_project')

# To run the program, call the main operation
print (qsharp.eval("Main.Main()"))
```

***

## Configure Q# projects as external dependencies

You can configure Q# projects as an external dependency for other projects, similar to a library, to make functions and operations in the external Q# project available to other Q# projects. An external dependency can reside on a drive share or be published to a public GitHub repository.

To use a Q# project as an external dependency, you must:

- Add the external project as a dependency in the manifest file of the calling project.
- If the external project is published to GitHub, then add the `files` property to the manifest file of the external project.
- Add `export` statements to the external project.
- Add `import` statements to the calling project.

### Configure the manifest files

External Q# projects can reside on a local or network drive share, or you can publish them to a public GitHub repository.

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

In the preceding manifest file, `MyDependency` is a user-defined string that identifies the namespace when you call an operation. For example, if you create a dependency named `MyMathFunctions`, then you can call a function from that dependency with `MyMathFunctions.MyFunction()`.

To add a dependency to a project that's published to a public GitHub repository, use the following example manifest file:

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
}
```

> [!NOTE]
> For GitHub dependencies, `ref` refers to a GitHub [refspec](https://git-scm.com/book/en/v2/Git-Internals-The-Refspec). Microsoft recommends that you always use a commit hash so that you can rely on a specific version of your dependency.

#### The external project manifest file

If your external Q# project is published to a public GitHub repository, then you must add the `files` property to the manifest file of the external project, including all files that the project uses.

```json
{
    "author": "Microsoft",
    "license": "MIT",
    "files": [ "src/MyMathFunctions.qs", "src/Strings/MyStringFunctions.qs" ]
}
```

The `files` property is optional for an external project that you import via `"path"` with a local filepath-based import. The `files` property is required only for projects that are published to GitHub.

### Use the `export` statement

To make functions and operations in an external project accessible to calling projects, use the `export` statement. You can export any or all of the callables in the file. You can't use wild card syntax, so you must specify each callable that you want to export.

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

### Use the `import` statement

To make items from an external dependency available, use `import` statements from the calling program. The `import` statement uses the namespace that you define for the dependency in the manifest file.

For example, consider the dependency in the following manifest file:

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

Import the callables with the following code:

```qsharp
import MyMathFunctions.MyFunction;  // imports "MyFunction()" from the namespace

...
```

The `import` statement also supports wild card syntax and aliases.

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

### Example external project

For this example, use the same teleportation program as the earlier example, but separate the calling program and the callables into different projects.

1. Create two folders on your local drive, for example `Project_A` and `Project_B`.
1. Create a Q# project in each folder. For details, see the steps in [How to create a Q# project](#how-to-create-a-q-project).
1. In `Project_A`, the calling program, copy the following code into the manifest file, but edit the path as needed for `Project_B`:

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

1. In `Project_A`, copy the following code into `Main.qs`:

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

1. In `Project_B`, copy the following code into `Main.qs`:

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
    > You don't need to export the `PrepareBellPair` operation your program in `Project_A` doesn't directly call that operation. The `PrepareBellPair` operation is already accessible by the `Teleport` operation because `PrepareBellPair` is in the local scope of `Project_B`.

1. To run the program, open `/Project_A/Main.qs` in VS Code and choose **Run**.

## Projects and implicit namespaces

In Q# projects, if you don't specify a namespace in a `.qs` program, then the compiler uses the file name as the namespace. Then, when you reference a callable from an external dependency, you use the syntax `<dependencyName>.<namespace>.<callable>`. However, if the file is named `Main.qs`, then the compiler assumes that the namespace and the calling syntax is `<dependencyName>.<callable>`. For example, `import MyTeleportLib.Teleport`.

Because you might have multiple project files, you need to account for the correct syntax when you reference callables. For example, consider a project with the following file structure:

- **/src**
  - *Main.qs*
  - *MathFunctions.qs*

The following code makes calls to the external dependency:

```qsharp
import MyTeleportLib.MyFunction;        // "Main" namespace is implied

import MyTeleportLib.MathFunctions.MyFunction;   // "Math" namespace must be explicit 
```

For more information about namespace behavior, see [User namespaces](xref:microsoft.quantum.qsharp-overview#user-namespaces).
