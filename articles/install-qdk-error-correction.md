---
title: Install QDK for error correction
description: Install the qdk.ec module, qodec, notebook tools, and optional decoders for quantum error correction development.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 10/21/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: qdk
no-loc: ["QDK", "Python", "qodec", "qdk-ec", "Stim", "Windows", "Linux", "macOS", "Arm64", "Jupyter Notebook", "C++", "HiGHS", "MWPF", "deq", "C4", "YAML"]
ai-usage: ai-assisted
uid: microsoft.quantum.how-to.install-qdk-error-correction
# Customer intent: As a quantum developer or researcher, I want to install the QDK error correction tools so that I can develop and test QEC protocols.
---

# How to install QDK for error correction

Install the `qdk.ec` Python module from the Microsoft Quantum Development Kit (QDK) to develop and test quantum error correction (QEC) codes and protocols. The module uses the `qodec` package for protocol models and persistence.

## Prerequisites

Install these tools before you start:

- Python 3.11 or later
- `pip` or another Python package manager

The base `qdk` package supports Python 3.10 or later. The `qdk.ec` module requires Python 3.11 or later because of its `qodec` dependency.

### (Optional) Create a virtual environment

Use a virtual environment to keep the `qdk.ec` dependencies separate from other Python projects.

1. Create the virtual environment, for example `.venv`.

   ```bash
   python -m venv .venv
   ```

1. Activate the environment.

   On Windows:

   ```powershell
   .venv\Scripts\Activate.ps1
   ```

   On Linux or macOS:

   ```bash
   source .venv/bin/activate
   ```

1. Update pip in the active environment.

   ```bash
   python -m pip install --upgrade pip
   ```

## Install QDK for error correction

Install the `qdk` Python package with the `ec` extra.

```bash
python -m pip install --upgrade "qdk[ec]"
```

To use Jupyter Notebook and QDK widgets, install the `jupyter` extra too.

```bash
python -m pip install --upgrade "qdk[ec,jupyter]" ipykernel
```

The `ec` extra installs `qodec`, the Stim parser on supported platforms, and the algebra and solver packages that `qdk.ec` uses. It also includes HiGHS for distance searches.

> [!NOTE]
> The `qdk.ec` module uses the separate [Stim Python package](https://github.com/quantumlib/Stim) through qodec. It doesn't use the `qdk.stim` module.

### Install on Linux Arm64 or Windows Arm64

Stim doesn't publish wheels for Linux Arm64 or Windows Arm64. On those platforms, `qdk[ec]` installs qodec without its Stim parser.

You can load and save YAML qodecs and use a custom circuit parser. Features that parse `format="stim"` circuits don't work on these platforms. This limitation includes `qdk.ec.build_qodec`.

To enable the parser, install Stim separately. Your system needs a C++20 compiler to install Stim.

```bash
python -m pip install --upgrade stim
```

## Install optional distance and decoder packages

The default distance solver uses HiGHS, which the `qdk.ec` module includes. To select the optional MWPF solver, install `mwpf` separately.

```bash
python -m pip install mwpf
```

To use the deq circuit-level decoder with `qdk.simulation.run_qir`, install `deq` and `deq-runtime`.

```bash
python -m pip install deq deq-runtime
```

The QDK tests the deq adapter with version 0.5.7 of `deq` and `deq-runtime`.

> [!NOTE]
> The `deq-runtime` package doesn't publish Windows Arm64 wheels. The deq adapter also requires Stim, which doesn't publish Linux Arm64 or Windows Arm64 wheels.

## Verify the installation

Create a Python file or Jupyter Notebook cell with the following code. The example defines the four-qubit C4 code and checks its distance.

```python
import qodec
from qdk import ec

c4 = qodec.Code(
    "C4",
    stabilizers=["X_0 X_1 X_2 X_3", "Z_0 Z_1 Z_2 Z_3"],
    x=["X_0 X_1", "X_0 X_2"],
    z=["Z_0 Z_2", "Z_0 Z_1"],
)

distance = ec.CodeProfile(c4).distance()
print("Code distance:", distance)
assert distance.value == 2
```

The program prints this result:

```output
Code distance: 2
```

If the import and distance search succeed, the core `qdk.ec` dependencies are ready.

## Verify Stim support

Run this check on a platform that supports the Stim parser.

```python
from qdk import ec

protocol = ec.build_qodec(c4, strategy="bare-css/v1", strict=False)
print(ec.audit(protocol))
```

A correctly generated protocol prints an audit summary. A protocol that passes all checks prints:

```output
audit: ok
```

If `build_qodec` reports that no parser exists for the `stim` format, confirm that you installed `qdk[ec]` in the active environment. On Linux Arm64 or Windows Arm64, install Stim from source and restart Python or the Jupyter kernel.

## Continue with protocol development

To define a code, build a qodec, and validate its gadgets, see [Develop and validate a QEC protocol](xref:microsoft.quantum.how-to.develop-qec-protocol).
