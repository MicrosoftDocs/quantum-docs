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

Learn how to create a Q# application using Binder. You can use Binder to run and share Jupyter Notebooks online. 

## Use Binder with the QDK samples

To configure Binder automatically to use the Quantum Development Kit (QDK) samples:

1. Open a browser and run https://aka.ms/try-qsharp.
1. On the **Quantum Development Kit Samples** landing page, click **Q# notebook** to learn how to use IQ# to write your own quantum application notebooks.

![QDK landing page](~/media/binder-install.png)

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