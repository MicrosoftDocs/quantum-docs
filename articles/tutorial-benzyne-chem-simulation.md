---
author: azure-quantum-content
description: Use the QDK chemistry libraries to run quantum chemistry simulations and visualize the results in VS Code.
ms.date: 12/29/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: tutorial
no-loc: [Azure, Microsoft, Azure Quantum, Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: Run chemistry calculations with the QDK chemistry libraries and neutral atom simulators in VS Code and visualize the results
uid: microsoft.quantum.tutorial.qdk-chem-benzyne-sim
#customer intent: As a quantum chemistry researcher, I want an end-to-end workflow for how to use the QDK chemistry libraries to run simulations for a quantum chemistry calculation and visualize the results in VS Code
---

# Tutorial: Simulate quantum chemistry calculations for para-benzyne with the QDK in VS Code

In this tutorial, you go through an end-to-end quantum chemistry workflow in Visual Studio Code (VS Code) for para-benzyne with QDK for chemistry (QDK/Chemistry) in the Microsoft Quantum Development Kit (QDK). You learn how to perform a series of classical quantum chemistry calculations, prepare a quantum circuit from your classical computational results, run the quantum circuit on a neutral atom device simulator, and visualize the results of your calculations and quantum circuit.

## Prerequisites

To do this tutorial, you must install the following:

- VS Code with the [QDK](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) and Jupyter extensions
- A Python environment (Python version 3.11, 3.12, or 3.13)
- The latest version of the `qdk` Python library with the `jupyter` extra, and the `qdk-chemistry` library:

    ```bash
    pip install --upgrade "qdk[jupyter]" qdk-chemistry
    ```

## Perform classical computational chemistry calculations to build your state preparation quantum circuit

Before you can run a quantum chemistry program on a quantum computer, you need to perform a series of classical computational chemistry calculations. These calculations provide the initial quantum state of your molecule, and then map that state to a set of qubits and a circuit on a quantum computer. The circuit that you build from the classical calculations is called a state preparation circuit, which puts the qubits into a state that represents the real quantum state of your molecule.

To perform all the classical calculations and build your state preparation circuit for para-benzyne, follow the [Quickstart](https:/microsoft.github.io/qdk-chemistry/user/quickstart.html) guide in the QDK/Chemistry documentation on GitHub. To work through the guide, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with a blank Jupyter Notebook file.
1. On the first code block in the quickstart guide, choose **Python API**.
1. Run each code block from the quickstart guide in a new cell in your Jupyter notebook. Run the code blocks in the same order they appear in the quickstart guide.

When you complete the quickstart guide, your notebook environment contains the following Python objects that you use in the next parts of the tutorial:

| Variable name             | Description                                                         | Usage                              |
|---------------------------|---------------------------------------------------------------------|------------------------------------|
| `structure`               | Contains the 3D coordinates of each nucleus in the molecule         | View the molecule in 3D            |
| `active_orbitals`         | Contains the MO coefficients and other data for the active orbitals | Generate `.cube` files to view MOs |
| `sparse_isometry_circuit` | Contains the state preparation circuit                              | Generate QIR for simulation        |

## Visualize your molecule and active space MOs

The QDK uses `.cube` files to store date about MOs. To view the structure and active space MOs of para-benzyne, follow these steps:

1. Generate cube files for the active space MOs. In a new cell, copy and run the following code:

    ```python
    from qdk_chemistry.utils.cubegen import generate_cubefiles_from_orbitals
    
    cube_generator = generate_cubefiles_from_orbitals(orbitals=active_orbitals)
        
    # Generate the image data in the Cubefile format
    cubes = cube_generator.generate()
    
    # Write selected cube files to disk
    for cc in cubes:
        cc.to_cubefile(f"{cc.description}.cube")
    ```

    The preceding code creates a `.cube` file for each active space MO in your working directory.

1. Pass the MOs that you want to view as a Python dictionary to the `MoleculeViewer` widget. For example, to view two of the MOs, copy and run the following code in a new cell:

    ```python
    cube_data = {
        "alpha_18": Path("MO_alpha_18.cube").read_text(),
        "alpha_19": Path("MO_alpha_19.cube").read_text(),
    }

    MoleculeViewer(molecule_data=structure, cube_data=cube_data)
    ```

Use the molecular visualizer to examine the structure of the para-benzyne and the two MOs. For more information about how to use the molecular visualizer, see [How to use the molecule visualizer in the QDK](xref:microsoft.quantum.how-to.qdk-molecule-visualizer).

## Convert the state preparation circuit to QIR

To run your circuit on a quantum computer or QDK simulator, you must create a quantum intermediate representation (QIR) of the circuit. Quantum computers and simulators use the language of QIR to run quantum programs.

To convert your state preparation circuit to QIR, copy and run the following code in a new cell:

```python
from qdk import init, TargetProfile
from qdk.openqasm import circuit, compile, run

init(target_profile=TargetProfile.Base)
qir = compile(sparse_isometry_circuit)
```

To view the circuit in the QDK circuit visualizer, copy and run the following code in a new cell:

```python
from qdk.widgets import Circuit

Circuit(circuit(src))
```

## Run a machine-agnostic simulation on the sparse simulator

The sparse simulator is the default simulator in the QDK. This simulator is machine-agnostic and returns a noiseless sample of measurement results.

To run your circuit on the sparse simulator and view a histogram of the results, copy and run the following code in a new cell:

```python
from qdk.widgets import Histogram

# Run using the default sparse simulator
sim_results = run(src, shots=1024)
Histogram(sim_results, labels="kets")
```

Your histogram results change each time you run the program because of the inherent randomness in quantum measurement. Run the simulation multiple times to see how the histogram changes.

## Run a neutral atom machine simulation on the GPU simulator

The QDK includes the full-state GPU neutral atom simulator, which incorporate noise from neutral atom machines, such as qubit loss, into the simulation. The noise makes your simulation results closer to the results on an actual neutral atom quantum computer. The GPU simulator is useful for chemistry programs because chemistry circuits tend to have non-Clifford gates.

To run a neutral atom device GPU simulation with noise, copy and run the following code in a new cell:

```python
from qdk.simulation import NeutralAtomDevice, NoiseConfig

# Use the GPU simulator with noise
noise = NoiseConfig()
noise.cz.set_depolarizing(0.05)
noise.sx.set_bitflip(0.01)
noise.mov.loss = 0.001 # Atom loss from neutral atom device

device = NeutralAtomDevice()
results = device.simulate(qir, shots=1000, noise=noise, type="gpu")
Histogram(results, labels="kets", items="top-25")
```

## Visualize how the program runs on a basic neutral atom device

There are different neutral atom device technologies, but these devices tend to feature arrays of qubits where each qubit is a single neutral atom. Qubits move between zones for storage, processing, and measurement. The QDK provides a basic neutral atom device visualizer that shows how the qubits might move through the device during a program run.

To open the neutral atom device visualizer for your program, copy and run the following code in a new cell:

```python
from qdk.simulation import NeutralAtomDevice, NoiseConfig

device = NeutralAtomDevice()
device.show_trace(qir)
```

The neutral atom device visualizer appears in the output cell. Use the visualizer to see how the qubits move and get processed as your circuit runs. For more information on how to use the neutral atom visualizer, see [How to use the neutral atom device visualizer](xref:microsoft.quantum.how-to.qdk-neutral-atom-visualizer).
