---
author: bradben
description: Learn how to develop a standalone Q# application and run it on a local simulator.
ms.author: v-benbra
ms.date: 10/25/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Write a Q# standalone program to run on a local quantum simulator
uid: microsoft.quantum.how-to.standalone-local
---

# Write a Q# standalone program to run on a local quantum simulator

The Microsoft Quantum Development Kit contains several [quantum simulators](xref:microsoft.quantum.machines.overview) that allow you to test and run quantum programs locally, without having to access the Azure Quantum service.

## Prerequisites

Set up your preferred local environment with the Microsoft Quantum Development Kit following the steps in [Set up a Q# standalone environment](xref:microsoft.quantum.install-qdk.overview.standalone).

## Run a Q# program

Follow the instructions on the tab corresponding to your development environment that you created during set up.

### [Jupyter Notebooks](#tab/tabid-jupyter)

1. From your environment (that is, either the conda environment you created, or the Python environment where you installed Jupyter), run the following command to start the Jupyter Notebook server:

    ```shell
    jupyter notebook
    ```

    - If the Jupyter Notebook doesn't open automatically in your browser, copy and paste the URL provided by the command line into your browser.

1. Choose **New → Q#** to create a Jupyter Notebook with a Q# kernel, and add the following code to the first notebook cell:

    ```qsharp
    operation SampleQuantumRandomNumberGenerator() : Result {
        use q = Qubit(); // Allocate a qubit in the |0⟩ state.
        H(q);            // Put the qubit to superposition. It now has a 50% chance of being 0 or 1.
        let r = M(q);    // Measure the qubit value.
        Reset(q);
        return r;
    }
    ```

1. Run this cell of the notebook. You should see `SampleQuantumRandomNumberGenerator` in the output of the cell. When running in Jupyter Notebook, the Q# code is compiled, and the cell outputs the name of any operations that it finds.

1. In a new cell, run the operation you just created in a simulator by using the [`%simulate` magic command](xref:microsoft.quantum.iqsharp.magic-ref.simulate):

    ![Jupyter Notebook cell with %simulate magic](~/media/install-guide-jupyter-simulate.png)

    You should see the result of the operation you invoked. In this case, because your operation generates a random result, you will see either `Zero` or `One` printed on the screen. If you run the cell repeatedly, you should see each result approximately half the time.

### [VS Code](#tab/tabid-vscode)

If you are receiving an error "'npm' is not recognized as an internal or external command", in the below steps, install [node.js including npm](https://nodejs.org/en/?azure-portal=true). Alternatively, use our the command line templates to create a Q# project , or use Visual Studio.

To create a new project in VS Code:

1. Click **View** -> **Command Palette** and select **Q#: Create New Project**.
2. Click **Standalone console application**.
3. Navigate to the location to save the project. Enter the project name and click **Create Project**.
4. When the project is successfully created, click **Open new project...** in the lower right.

Inspect the project. You should see a source file named `Program.qs`, which is a Q# program that defines a simple operation to print a message to the console.

To run the application:

1. Click **Terminal** -> **New Terminal**.
2. At the terminal prompt, enter `dotnet run`.
3. You should see the following text in the output window `Hello quantum world!`

> [!NOTE]
> Workspaces with multiple root folders are not currently supported by the VS Code Q# extension. If you have multiple projects within one VS Code workspace, all projects need to be contained within the same root folder.

### [Visual Studio (Windows only)](#tab/tabid-vs)

To create a new Q# application in Visual Studio:

1. Open Visual Studio and click **File** -> **New** -> **Project**.
2. Type `Q#` in the search box, select **Q# Application** and click **Next**.
3. Enter a name and location for your application and click **Create**.

Inspect the project. You should see a source file named `Program.qs`, which is a Q# program that defines a simple operation to print a message to the console.

To run the application:

1. Select **Debug** -> **Start Without Debugging**.
2. You should see the text `Hello quantum world!` printed to a console window.

> [!NOTE]
> If you have multiple projects within one Visual Studio solution, all projects contained in the solution need to be in the same folder as the solution, or in one of its sub-folders.  

### [Other editors with the command prompt](#tab/tabid-cmdline)

To run a Q# program in the .NET console:

1. Create a new application:

    ```dotnetcli
    dotnet new console -lang Q# -o runSayHello
    ```

1. Navigate to the application directory:

    ```dotnetcli
    cd runSayHello
    ```

    This directory should now contain a file `Program.qs`, which is a Q# program that defines a simple operation to print a message to the console. You can modfiy this template with a text editor and overwrite it with your own quantum applications.

1. Run the program:

    ```dotnetcli
    dotnet run
    ```

1. You should see the following text printed: `Hello quantum world!`

***

## Next steps

Now that you have run a Q# program on a local quantum simulator, learn how you can also run your program on remote [quantum hardware](xref:microsoft.quantum.quickstarts.computing).
