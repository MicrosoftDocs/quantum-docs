---
author: bradben
description: Learn how to create a Q# application using Binder. You can use Binder to run and share Jupyter Notebooks online.
ms.author: v-benbra
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Develop with Q# and Binder
uid: microsoft.quantum.install-qdk.overview.binder
---

# Develop with Q# and Binder

Learn how to create a Q# application using Binder. You can use Binder to run and share Jupyter Notebooks online, and even run Q# console applications online, allowing for a zero-install experience if desired.

## Use Binder with the QDK samples

To configure Binder automatically to use the Quantum Development Kit (QDK) samples:

1. Open a browser and run https://aka.ms/try-qsharp.
1. On the **Quantum Development Kit Samples** landing page, click the **Q# notebook** link on the **Intro to IQ#** sample to learn how to use IQ# and write your own quantum application notebooks.

![QDK samples overview - highlight Q# notebook link](~/media/binder-install.png)

Note that you are not restricted to the existing samples, as you can create new notebook or text files by first selecting **File** -> **Open...** from the Jupyter interface to open the directory view, and then hitting the **New▾** button in the top right of the page.

> [!WARNING]
> Files created within the pre-configured binder are not persistent and should thus only be used for exploratory purposes.

### Run Jupyter Notebook samples

Binder supports both types of Q# development styles for Jupyter Notebook:

- the *Q# notebook*, which uses the IQ# kernel to directly run code cells written in Q# (see [here](xref:microsoft.quantum.install-qdk.overview.jupyter)).
- the *Q# + Python* notebook, which contains regular Python code that calls into Q# operations from a `.qs` file (see [here](xref:microsoft.quantum.install-qdk.overview.python)).

You will find that the different Jupyter samples might use either of the two styles, and are sometimes available in both, so feel free to explore what best suites your preferences. You can create a notebook of your own by clicking on **New▾ → Python 3** (*Q# + Python* style) or **New▾ → Q#** (*Q# notebook* style) from the directory view.

![Create a new notebook in Jupyter - highlight Python and Q# options](~/media/binder-new-notebook.png)

### Run console application samples

In addition to notebooks, you can also run Q# console applications via Binder. To do so, you'll have to open a terminal in the Jupyter interface, by selecting **New▾ → Terminal** from the directory view. You can then run bash commands, such as to run the CHSH sample as shown below.

![Run Q# from a Jupyter terminal](~/media/binder-terminal.png)

Here as well you might notice that there are two types of console applications present in the samples:

- the *Q# standalone* application, which uses an `EntryPoint` function/operation in a `.qs` file to run the Q# program from the command line (see [here](xref:microsoft.quantum.install-qdk.overview.standalone)).
- the *Q# + .NET* application, which uses a .NET language (C# or F#) host program to call into operations from a `.qs` file (see [here](xref:microsoft.quantum.install-qdk.overview.cs)).

As an alternative to the Jupyter terminal, you can also run Q# console applications from a .NET PowerShell notebook such as the CHSH README.md shown below, but also from your own notebook via **New▾ → .NET (PowerShell)**.

![Run Q# from a PowerShell notebook](~/media/binder-powershell-notebook.png)

## Use Binder with your own notebooks and repository

If you already have notebooks in a GitHub repository, you can configure Binder to work with your repo:

1. Ensure that there is a file named *Dockerfile* in the root of your repository. The file must contain at least the following lines:

    ```bash
    FROM mcr.microsoft.com/quantum/iqsharp-base:0.12.20082513

    USER root
    COPY . ${HOME}
    RUN chown -R ${USER} ${HOME}

    USER ${USER}
    ```

    > [!NOTE]
    > You can verify the most current version of IQ# in the [Release Notes](xref:microsoft.quantum.relnotes-qdk).

    For more information about creating a Dockerfile, see the [Dockerfile reference](https://docs.docker.com/engine/reference/builder/).

2. Open a browser to [mybinder.org](https://mybinder.org).
3. Enter your repository name as the **GitHub URL** (for example *MyName/MyRepo*), and click **launch**.

![MyBinder form](~/media/mybinder.png)

## Next steps

Now that you have set up your Binder environment, you can write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).
