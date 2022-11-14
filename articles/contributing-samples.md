---
author: bradben
description: Learn how to contribute sample code to Azure Quantum
ms.author: brbenefield
ms.date: 10/28/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: contributor-guide
ms.custom: kr2b-contr-experiment
no-loc: ['Q#', '$$v']
title: Contribute samples
uid: microsoft.quantum.contributing-qdk.overview.samples
---

# Contribute samples to Azure Quantum

Thank you for your interest in contributing samples to the [Microsoft Quantum Development Kit samples](https://github.com/Microsoft/Quantum) and making the quantum development community a better place!

For additional resources on creating your sample, see

- [Contributing code to Azure Quantum](xref:microsoft.quantum.contributing-qdk.overview.code)
- [The  Q# programming language style guide](xref:microsoft.quantum.contributing-qdk.overview.style)
- [The Q# quantum programming language user guide](xref:microsoft.quantum.user-guide-qdk.overview)
- [API design principles for the Q# language](xref:microsoft.quantum.contributing-qdk.overview.api-design)

## The QDK samples repository

To help you prepare your contribution, let's take a look at how the samples repository is laid out:

```plaintext
microsoft/Quantum
📁 samples/
  📁 algorithms/
    📁 chsh-game/
      📝 CHSHGame.csproj
      📝 Game.qs
      📝 Host.cs
      📝 host.py
      📝 README.md
     ⋮
  📁 arithmetic/
  📁 characterization/
  📁 chemistry/
   ⋮
```

The samples in the [microsoft/Quantum] (https://github.com/microsoft/Quantum) repository are broken down by subject area into different folders such as `algorithms/`, `arithmetic/`, or `characterization/`.
Within the folder for each subject area, each sample consists of a single folder that contains all the resources that a user needs to explore and make use of that sample.

## How samples are structured

For an example, navigate to the [`algorithms/chsh-game/`](https://github.com/microsoft/Quantum/tree/main/samples/algorithms/chsh-game) sample project and look at the files in the folder. 

| File              | Description                                                |
|-------------------|------------------------------------------------------------|
| `CHSHGame.csproj` | Q# project used to build the sample with the .NET Core SDK |
| `Game.qs`         | Q# operations and functions for the sample                 |
| `Host.cs`         | C# host program used to run the sample                     |
| `host.py`         | Python host program used to run the sample                 |
| `README.md`       | Documentation on what the sample does and how to use it    |

Not all samples will have the exact same set of files (for example, some samples may be C# only, others may not have a Python host, or some samples may require auxillary data files to work).

## Anatomy of a sample README file

A `README.md` file is not only helpful for users to get started with your sample, but is required for `learn.microsoft.com/samples` to find and publish your contribution. There should only be one `README.md` file per sample.

Your `README.md` should start with some metadata that helps `learn.microsoft.com/samples` find and publish your sample. This metadata is provided as a [YAML header](https://dotnet.github.io/docfx/spec/docfx_flavored_markdown.html#yaml-header) that indicates what languages your sample covers (typically, this will be `qsharp`, `csharp`, and `python`), and what products your sample covers (typically, just `qdk`).

> [!NOTE]
> To view how this sample renders live, see [Validating Quantum Mechanics with the CHSH Game](/samples/microsoft/quantum/validating-quantum-mechanics/).

```markdown
    ---
    page_type: sample
    languages:
    - qsharp
    - python
    - csharp
    products:
    - qdk
    description: "This sample uses the CHSH game to demonstrate how Q# programs can be used to prepare and work with entanglement."
    urlFragment: validating-quantum-mechanics
    ---
```

> [!IMPORTANT]
> The `page_type: sample` key in the header is **required** for your sample to appear at `learn.microsoft.com/samples`.
> Similarly, the `product` and `language` keys are critical for helping users to search for and find your sample.


After that, it's helpful to give a short intro that says what your new sample does:

```markdown
    # Validating Quantum Mechanics with the CHSH Game

    This sample demonstrates:
    - How to prepare entangled states with Q#.
    - How to measure part of an entangled register.
    - Using Q# to understand superposition and entanglement.

    In this sample, you can use Q# to prepare qubits in an entangled state, and to check that measuring these qubits lets you win a game known as the _CHSH game_ more often than you can without entanglement.
    This game helps you understand entanglement, and has even been used experimentally to help test that the universe really is quantum mechanical in nature.
```

Users of your sample will also appreciate knowing what they need to run it (for example, do users just need the Quantum Development Kit itself, or do they need additional resources such as node.js or a Microsoft Azure subscription?):

```markdown
    ## Prerequisites

    - The Microsoft [Quantum Development Kit](/azure/quantum/install-overview-qdk).

```

With all that in place, you can tell users how to run your sample:

```markdown

    ## Running the sample

    This sample can be run in a number of different ways, depending on your preferred environment.

    ### Python in Visual Studio Code or the command line

    At a terminal, run the following command:

    ```powershell
    python host.py
    ```

    ### C# in Visual Studio Code or the command line

    At a terminal, run the following command:

    ```powershell
    dotnet run
    ```

    ### C# in Visual Studio 2022

    Open the folder containing this sample in Visual Studio (**Open a local folder**
    from the **Getting Started** screen or **File → Open → Folder...** from the menu bar)
    and set `CHSHGame.csproj` as the startup project. 
    Press **Start** in Visual Studio to run the sample. 
```

Finally, it's helpful to tell users what each file in your sample does, and where they can go for more information:

```markdown
## Manifest

- [Game.qs](https://github.com/microsoft/Quantum/blob/main/samples/algorithms/chsh-game/Game.qs): Q# code implementing the game.
- [host.py](https://github.com/microsoft/Quantum/blob/main/samples/algorithms/chsh-game/host.py): Python host program to call into the Q# sample.
- [Host.cs](https://github.com/microsoft/Quantum/blob/main/samples/algorithms/chsh-game/Host.cs): C# code to call the operations defined in Q#.
- [CHSHGame.csproj](https://github.com/microsoft/Quantum/blob/main/samples/algorithms/chsh-game/CHSHGame.csproj): Main C# project for the sample.

## Further resources

- [Measurement concepts](/azure/quantum/concepts-pauli-measurements)
```

> [!WARNING]
> Make sure to use absolute URLs here, since your sample will appear at a different URL when rendered at [Microsoft sample browser](/samples)!
