---
author: SoniaLopezBravo
description: Learn how to 
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

> [!IMPORTANT]
> Azure Quantum hosted notebooks are free of cost, but the kernel remains alive only for a few hours.



## Jupyter notebooks with Google Colab

1. Add a new cell to install Python packages, copy and run the following code:

```python
!pip install -U azure-quantum
!pip install -U azure-quantum[qiskit]
```
2. Click **Runtime** and select **Restart runtime**

3. To access your Azure Quantum workspace, you will need to **Authenticate**. For example, you will get a prompt like the following one: 'WARNING:azure.identity._internal.interactive:InteractiveBrowserCredential.get_token failed: Failed to open a browser'. To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code **ET8BM63F3** to authenticate.

4. Once you went through the authentication process, you should be able to run all the cells as if you were doing it from Azure Quantum hosted notebooks or from a local environment.



For more information, see [](xref:microsoft.quantum.work-with-resource-estimator#handle-large-programs)