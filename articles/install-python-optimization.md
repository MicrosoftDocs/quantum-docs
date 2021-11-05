---
author: bradben
description: Learn how to install the azure-quantum Python package to define optimization problems to run on Azure Quantum.
ms.author: v-benbra
ms.date: 11/04/2021
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v']
title: Use Python without Q#
uid: microsoft.quantum.install-qdk.overview.python-only
---

# Use Python without Q#

There are some processes that you can run on Azure Quantum that use Python without explicitly calling any Q# code, such as submitting [Qiskit](xref:microsoft.quantum.quickstarts.computing.qiskit) or [Cirq](xref:microsoft.quantum.quickstarts.computing.cirq) circuits, or submitting [optimization problems](xref:microsoft.quantum.submit-jobs-optimization). To use these features, you must install the `azure-quantum` Python package.

## Install the `azure-quantum` Python package

1. Install [Python](https://www.python.org/downloads/) 3.6 or later if you haven't already.
1. Install [PIP](https://pip.pypa.io/en/stable/) and ensure you have **version 19.2 or higher**.
1. Install the `azure-quantum` python package. Use the `--upgrade` flag to make sure to get the latest version.

   ```Shell
   pip install --upgrade azure-quantum
   ```

## Next steps

- [Submit a Qiskit circuit](xref:microsoft.quantum.quickstarts.computing.qiskit)
- [Submit a Cirq circuit](xref:microsoft.quantum.quickstarts.computing.cirq)
- [Solve a simple optimization problem](xref:microsoft.quantum.quickstarts.optimization.qio)
