---
author: SoniaLopezBravo
description: Learn how to run experiments with long runtimes on Azure Quantum
ms.author: sonialopez
ms.date: 01/28/2023
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: ['Q#', '$$v']
title: Performing long running experiments
uid: microsoft.quantum.long-running-experiments
---

# How to perform long running experiments on Azure Quantum

When you submit a quantum program to Azure Quantum, the job is uploaded to the Azure Storage account that you configured in the workspace waiting to be executed in the QPU provider you've selected. When your quantum program is next on the queue for the corresponding provider, Azure Quantum downloads your program and submits it to the provider, going from *waiting* to *executing* state. For more information about the state of Azure Quantum jobs, see [Monitoring jobs](xref:microsoft.quantum.work-with-jobs#monitoring-jobs).

If your quantum program requires many iterations each one is submitted as a single job. For some quantum experiments, such as variational algorithms (VQE) and optimization algorithms (QAOA), it's common to run for hours or days, in particular when QPU queue times are high and the programs require many iterations.

> [!IMPORTANT]
> Azure Quantum hosted notebooks offer a free no-installation experience to run small scale experiments lasting less than [Ask Xinyi what we should put here]. 

See the following suggestion to run long runtime experiments in Azure Quantum.

## Program with few loops

If your program doesn't required many loops and the QPU queue time is high, you may wait a couple of hours and submit your job later, or submit your program to a different provider from the ones available in Azure Quantum. 

## Docker image running inside a cloud provider

Docker containers are a great tool that allows you to run your applications across any OS, including cloud platforms, without installing anything. You can use the QDK Docker image in your local Docker installation or in the cloud via any service that supports Docker images, such as ACI.

You can download the IQ# Docker image from <https://github.com/microsoft/iqsharp/#using-iq-as-a-container>. 

You can also use Docker with a Visual Studio Code Remote Development Container to quickly define development environments. For more information about VS Code Development Containers, see <https://github.com/microsoft/Quantum/tree/master/.devcontainer>.

## Jupyter notebooks with Google Colab

[Google Colab](https://colab.research.google.com/notebook) is a free cloud-based tool offered by Google Research that allows users to write and execute Python code in their web browsers. Google Colab is based on the Jupyter open source, and essentially allows you to create and share files without having to download or install anything.

To start using Google Colab notebooks to run your quantum programs on Azure Quantum follow this steps:

1. **Add** a new cell in the notebook, and **Copy** the following code to install the required Python packages:

  ```python
  !pip install -U azure-quantum
  !pip install -U azure-quantum[qiskit]
  ```
2. Click **Runtime** and select **Restart runtime**

3. To access to your Azure Quantum workspace, you will need to **Authenticate**. For example, you will get a prompt like the following one: `WARNING:azure.identity._internal.interactive:InteractiveBrowserCredential.get_token failed: Failed to open a browser`. To sign in, use a **Web browser** to open the page https://microsoft.com/devicelogin and enter the code **ET8BM63F3** to authenticate.

4. Once you went through the authentication process, you should be able to run all the cells as if you were doing it from Azure Quantum hosted notebooks or from a local environment.



