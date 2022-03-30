---
author: cjgronlund
description: Learn how to create a Q# application using Binder. You can use Binder to run and share Jupyter Notebooks online.
ms.author: cgronlun
ms.date: 03/30/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Develop with Q# and Binder
uid: microsoft.quantum.install-qdk.overview.binder
---

# Develop with Q# and Binder

Learn how to create a Q# application using Binder. You can use Binder to run and share Jupyter Notebooks online, and even run Q# console applications online, which allows you to try Q# without installing the QDK.

## Use Binder with the QDK samples

To configure Binder automatically to use the Quantum Development Kit (QDK) samples:

1. Open a browser and navigate to <https://aka.ms/try-qsharp>.
1. On the **Quantum Development Kit Samples** landing page, click the **Q# notebook** link on the **Intro to IQ#** sample to learn how to use IQ# and write your own quantum application notebooks.

![QDK samples overview - highlight Q# notebook link](~/media/binder-install.png)

Note that you are not restricted to the existing samples, as you can create new notebook or text files by first selecting **File** -> **Open...** from the Jupyter interface to open the directory view, and then hitting the **New▾** button in the top right of the page.

> [!WARNING]
> Files created in a Binder environment will not persist across sessions. Should you wish to preserve any changes or new files you created during your session, make sure to save them locally by downloading them via the Jupyter interface.

### Run Jupyter Notebook samples

Binder supports both types of Q# development styles for Jupyter Notebook:

- the *Q# notebook*, which uses the IQ# kernel to directly run code cells written in Q# (see [developing with Q# Jupyter Notebooks](xref:microsoft.quantum.install-qdk.overview.standalone)).
- the *Q# + Python* notebook, which contains regular Python code that calls into Q# operations from a `.qs` file (see [developing with Q# and Python](xref:microsoft.quantum.install-qdk.overview.python)).

You will find that the different Jupyter samples might use either of the two styles, and are sometimes available in both, so feel free to explore what best suites your preferences. You can create a notebook of your own by clicking on **New▾ → Python 3** (*Q# + Python* style) or **New▾ → Q#** (*Q# notebook* style) from the directory view.

![Create a new notebook in Jupyter - highlight Python and Q# options](~/media/binder-new-notebook.png)

### Run console application samples

In addition to notebooks, you can also run Q# console applications via Binder. You'll notice notice that there are different types of console applications present in the samples:

- the *Q# standalone* application, which uses an `EntryPoint` function/operation in a `.qs` file to run the Q# program from the command line (see [developing with Q# applications](xref:microsoft.quantum.install-qdk.overview.standalone)).
- the *Q# + .NET* application, which uses a .NET language (C# or F#) host program to call into operations from a `.qs` file (see [developing with Q# and .NET](xref:microsoft.quantum.install-qdk.overview.cs)).
- while not directly shown in the samples overview, a lot of samples are also available as Python console applications. These contain the same Python code as a *Q# + Python* Jupyter Notebook would, just without the notebook part (see [developing with Q# and Python](xref:microsoft.quantum.install-qdk.overview.python)).

To run the samples, you can open a terminal in the Jupyter interface by selecting **New▾ → Terminal** from the directory view. You may then run any bash commands from within the Binder environment, for example to run the CHSH sample via `python host.py` as shown below.

![Run Q# from a Jupyter terminal](~/media/binder-terminal.png)

As an alternative to the Jupyter terminal, you can also run Q# console applications from a .NET PowerShell notebook in which the cells act like a PowerShell terminal. You can then run some of the samples via their README file by clicking on the sample name (e.g. the CHSH README shown below), or from your own notebook via **New▾ → .NET (PowerShell)**.

![Run Q# from a PowerShell notebook](~/media/binder-powershell-notebook.png)

## Use Binder with your own notebooks and repository

If you already have notebooks in a (public!) GitHub repository, you can configure Binder to work with your repo:

1. Ensure that there is a file named *Dockerfile* in the root of your repository. The file must contain at least the following lines:

    ```bash
    FROM mcr.microsoft.com/quantum/iqsharp-base:0.24.201332

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

## Use Binder with the Quantum Katas

To configure Binder automatically to use the Quantum Katas:

1. Open a browser and navigate to <https://aka.ms/try-quantum-katas>.
1. On the **Quantum Katas and Tutorials** landing page, select any of the Katas listed in the learning path to open them as Jupyter Notebooks, allowing you to run and interact with a Kata without requiring any installation.

![Quantum Katas overview on Binder](~/media/binder-katas.png)

## Next steps

Now that you have set up your Binder environment, you can write and run [your first quantum program](xref:microsoft.quantum.tutorial-qdk.random-number).
