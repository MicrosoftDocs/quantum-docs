---
author: azure-quantum-content
description: Learn how to install the Microsoft Quantum resource estimator and run and estimate for a simple Q# sample with default hardware settings.
ms.author: quantumdocwriters
ms.date: 05/26/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: quickstart
no-loc: ['Python', '$$v', target, targets]
title: How to install and use the Microsoft Quantum resource estimator
uid: microsoft.quantum.quickstart.install-use-qre
# Customer intent: As a quantum developer, I want to know how to install and use the Microsoft Quantum resource estimator in the QDK.
--- 

# How to install and use the Microsoft Quantum resource estimator

The Microsoft Quantum resource estimator is part of the Microsoft Quantum Development Kit (QDK). In this article, you learn how to install the quantum resource estimator and run an estimation for a simple Q# program with a default architecture model.

> [!WARNING]
> The resource estimator in the QDK extension for VS Code will be deprecated soon. Use the `qdk.qre` Python module to perform resource estimation.

## Prerequisites

To follow the steps in this article, you need to have the following installed:

- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download)
- The latest version of the [QDK extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) installed in VS Code
- The latest versions of the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) in VS Code

## Install the quantum resource estimator

The resource estimator is available through the `qdk.qre` Python module. To use the resource estimator, install the latest version of the `qdk` Python library with the `qre` extra:

```bash
pip install --upgrade "qdk[qre]"
```

> [!TIP]
> You don't need to have an Azure account to use the resource estimator.

## Run a simple resource estimation with default settings

To perform a basic resource estimate, pass an application model, a hardware architecture model, and an error correction model to the resource estimator. Then, run the resource estimator to get the results. The following example runs the resource estimator from Jupyter Notebook in VS Code.

### Create an application model

For this example, use the 1D Ising model algorithm from the Q# samples in the QDK VS Code extension. Or, use one of your existing Q# programs.

#### Write a Q# program

1. In VS Code, create a new text file and save the file as `ising-1d-sample.qs`.
1. On the first line of the file, enter **sample** to bring up the Q# sample program list.
1. Choose **Ising Model (Simple 1D) sample**, and then save the file.

#### Create an application

Use the Q# program to create an application model for the resource estimator.

1. To create a new Jupyter Notebook file in VS Code, open the **Command Palette** and enter **Create: New Jupyter Notebook**.
1. In the first notebook cell, evaluate the Q# program.

    ```python
    from pathlib import Path
    from qdk import qsharp

    qsharp.eval(Path("ising-1d-sample.qs").read_text(encoding="utf-8"))
    ```

    This code creates a `Main` object in the `qdk.code` namespace that contains the Q# program.

1. In a new cell, create a resource estimator application from the Q# program.

    ```python
    import qdk
    from qdk.qre.application import QSharpApplication

    app = QSharpApplication(qdk.code.Main)
    ```

### Create an architecture model

For the hardware architecture, use the default `GateBased` model that the resource estimator comes with. The `GateBased` model requires inputs for error rate, gate time, and measurement time.

In a new cell, create a gate-based architecture with an error rate of $10^{-4}$, a gate time of 100 ns, and a measurement time of 500 ns.

```python
from qdk.qre.models import GateBased

# Times are in units of nanoseconds
arch = GateBased(error_rate=1e-4, gate_time=100, measurement_time=500)
```

### Run an estimation

To run an estimate, use the `estimate` function and pass the following inputs:

- Application
- Architecture
- Physical instruction set (ISA) query
- Maximum error rate

The ISA query tells the resource estimator what combinations of error correction code and T factory distillation protocols to evaluate. The resource estimator finds the Pareto frontier optimized set of results from those combinations. For this example, use the default `SurfaceCode` QEC and `RoundBasedFactory` distillation protocol that the resource estimator comes with.

```python
from qdk.qre import estimate
from qdk.qre.models import SurfaceCode, RoundBasedFactory

results = estimate(app, arch, isa_query=SurfaceCode.q() * RoundBasedFactory.q(), max_error=0.01)```
```

#### View the results

To view the optimal combinations of number of physical qubits and program run time, use the `as_frame` method to display the estimation results in a pandas DataFrame.

```python
results.as_frame()
```

To plot the results, use the `plot_estimates` method and pass a unit for run time.

```python
from qdk.qre import plot_estimates

plot_estimates(results, figsize=(6, 4), runtime_unit="ms")
```
