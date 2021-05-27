---
author: bradben
description: Learn how to run a quantum sequential classifier written in Q# using the Quantum Machine Learning library of the Microsoft QDK.
ms.author: v-benbra
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Basic classification with the Quantum Machine Learning library
uid: microsoft.quantum.libraries.overview.machine-learning.basics
---

# Basic classification: Classify data with the QDK

In this guide, you will learn how to run a quantum sequential classifier written in Q# using the Quantum Machine Learning library of the QDK. To do that, we will train a simple sequential model using a classifier structure defined in Q#. The model is trained on a half-moon dataset with training and validation data that you can find in the [code samples](https://github.com/microsoft/Quantum/tree/main/samples/machine-learning/half-moons). We will create our Q# project using either a Python or a C# program to load data and call Q# operations from.

## Prerequisites

- The Microsoft [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview).
- Create a Q# project for either a [Python host program](xref:microsoft.quantum.install-qdk.overview.python) or a [C# host program](xref:microsoft.quantum.install-qdk.overview.cs).
- To add the [Microsoft.Quantum.MachineLearning](https://www.nuget.org/packages/Microsoft.Quantum.MachineLearning) package to your Q# project, run the following command from the root of your project folder:

```dotnetcli
dotnet add package Microsoft.Quantum.MachineLearning
```

## Q\# classifier code

We start by creating a a file called `Training.qs`and adding the following code to it:

:::code language="qsharp" source="~/quantum/samples/machine-learning/half-moons/Training.qs" range="4-":::

The most important functions and operations defined in the code above are:

- `ClassifierStructure() : ControlledRotation[]` : in this function we set the structure of our circuit model by adding the layers of the controlled gates we consider. This step is analogous to the declaration of layers of neurons in a sequential deep learning model.
- `TrainHalfMoonModel() : (Double[], Double)` : this operation is the core part of the code and defines the training. Here we load the samples from the dataset included in the library, we set the hyper parameters and the initial parameters for the training and we start the training by calling the operation `TrainSequentialClassifier` included in the library. It outputs the parameters and the bias that determine the classifier.
- `ValidateHalfMoonModel(parameters : Double[], bias : Double) : Int` : this operation defines the validation process to evaluate the model. Here we load the samples for validation, the number of measurements per sample and the tolerance. It outputs the number of misclassifications on the chosen batch of samples for validation.

## Host program

Next, in the same folder we create a host program. Your host program consists of three parts:

- Load the dataset `data.json` and choose a set of classifier parameters where you want to start your training iterations for your model.
- Run training to determine the parameters and bias of the model.
- After training, validate the model to determine its accuracy.

    ### [Python with Visual Studio Code or the Command Line](#tab/tabid-python)

    To run your the Q# classifier from Python, save the following code as `host.py`. Remember that you also need the Q# file `Training.qs` that is explained above in this tutorial.

    :::code language="python" source="~/quantum/samples/machine-learning/half-moons/host.py" range="3-":::

    You can then run your Python host program from the command line:

    ```bash
    $ python host.py
    ```
    ```output
    Preparing Q# environment...
    [...]
    Observed X.XX% misclassifications.
    ```

    ### [C# with Visual Studio Code or the Command Line](#tab/tabid-csharp)

    To run your the Q# classifier from C#, save the following code as `Host.cs`. Remember that you also need the Q# file `Training.qs` that is explained above in this tutorial.

    :::code language="csharp" source="~/quantum/samples/machine-learning/half-moons/Host.cs" range="4-":::

    You can then run your C# host program from the command line:

    ```bash
    $ dotnet run
    ```
    ```output
    [...]
    Observed X.XX% misclassifications.
    ```

    ### [C# with Visual Studio 2019](#tab/tabid-vs2019)

    To run your new Q# program from C# in Visual Studio, modify `Host.cs` to include the following C# code. Remember that you also need the Q# file `Training.qs` that is explained above in this tutorial.

    :::code language="csharp" source="~/quantum/samples/machine-learning/half-moons/Host.cs" range="4-":::

    Press F5, and the program will start to run. A new window will display the following results: 

    ```bash
    $ dotnet run
    ```
    ```output
    [...]
    Observed X.XX% misclassifications.
    ```
    ***

## Next steps

First, you can play with the code and try to change some parameters to see how it affects the training. Then, in the next tutorial, [Design your own classifier](xref:microsoft.quantum.libraries.overview.machine-learning.design),  you will learn how to define the structure of the classifier.
