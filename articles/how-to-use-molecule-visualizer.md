---
author: azure-quantum-content
description: This article describes how to install, create, and use the molecule visualizer with QDK for chemistry. 
ms.date: 01/23/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, p-benzyne, "Jupyter Notebook", GitHub, API]
title: How to use the molecule visualizer with QDK for chemistry
uid: microsoft.quantum.how-to.qdk-molecule-visualizer
#customer intent: As a quantum chemistry researcher, I want to know how to use the QDK's molecule visualizer to examine the structure and molecular orbitals of my molecule
---

# How to use the molecule visualizer with QDK for chemistry

The Microsoft Quantum Development Kit (QDK) includes a molecule visualizer to use with QDK for chemistry (QDK/Chemistry). You can use the visualizer to interact with the 3D structure of your molecule and overlay the molecular orbitals (MOs) in a Jupyter notebook.

## Prerequisites

To use the molecule visualizer, you must install the following:

- Python environment (version 3.11, 3.12, or 3.13) with Python and Pip
- Visual Studio Code (VS Code) with the Jupyter Notebook extension, or open VS Code for the Web
- The latest version of the `qdk` Python library with the `jupyter` extra, and the `qdk-chemistry` library

    ```bash
    pip install --upgrade "qdk[jupyter]" qdk-chemistry
    ```

## Create a `Structure` object

The molecule visualizer requires a `Structure` object from the `qdk-chemistry` library. A `Structure` object contains the three-dimensional coordinates and element type of each atom in the molecule. To create a `Structure` object, you can load data from a `.xyz` or `.json` structure file, or you can directly specify the coordinates and elements in your code.

For example, to load a `Structure` object for *p*-benzyne from a `.xyz` file, follow these steps:

1. In VS Code, open the folder where you want to save your files.
1. Create an empty text file named `para_benzyne.structure.xyz`.
1. Copy the following text into `para_benzyne.structure.xyz` and save the file.

    ```plaintext
    10
    para benzyne
    C  0.000000  1.396000  0.000000
    C  1.209077  0.698000  0.000000
    C  1.209077 -0.698000  0.000000
    C  0.000000 -1.396000  0.000000
    C -1.209077 -0.698000  0.000000
    C -1.209077  0.698000  0.000000
    H  2.151000  1.242000  0.000000
    H  2.151000 -1.242000  0.000000
    H -2.151000 -1.242000  0.000000
    H -2.151000  1.242000  0.000000
    ```

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with an empty Jupyter Notebook file.
1. In the first cell of your notebook, copy and run the following code to load the structure:

    ```python
    from qdk-chemistry import Structure

    structure = Structure()
    structure.from_xyz_file('para-benzyne.structure.xyz')
    ```

For more information about `Structure` objects in the QDK/Chemistry, see [Structure](https:/microsoft.github.io/qdk-chemistry/user/comprehensive/data/structure.html) in the QDK/Chemistry documentation on GitHub.

## View the molecular structure

To open the molecule visualizer, use the `to_xyz` method to pass an XYZ string to the `MoleculeViewer` widget. Copy and run the following code in a new cell:

```python
from qdk.widgets import MoleculeViewer

viewer = MoleculeViewer(molecule_data=structure.to_xyz())
viewer
```

The molecule visualizer opens in the output cell and renders a 3D representation of the molecular structure. The visualizer automatically draws bonds between atoms that are within a chemically reasonable distance threshold.

To change the visual representation, open the **Visualization Style** dropdown and choose one of the following options:

| Visualization style | Description                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------|
| **Sphere**          | Space-filling representation that shows atoms as spheres with element-specific size and color |
| **Stick**           | Stick model that shows explicit bonds between atoms and element-specific colors               |
| **Line**            | Wireframe representation that shows bond connectivity but no color                            |

### Interact with the molecule visualizer

Use the following mouse and keyboard controls to interact with the molecule visualizer

| Input                           | Action                                    |
|---------------------------------|-------------------------------------------|
| Left-click and drag             | Rotate the molecule in 3D space           |
| **Shift** + left-click and drag | Zoom in (drag up) or zoom out (drag down) |
| **Ctrl** + left-click and drag  | Translate the molecule                    |

## View the molecular orbitals

If you have `.cube` files that store the MO data for your molecule, then you can load these files into the molecule visualizer to view the MOs overlaid on the molecule structure. Store the cube data in a Python dictionary with MO labels as keys, then pass the dictionary to `MoleculeViewer`.

For example, the following code renders MOs for two active space orbitals in *p*-benzyne when you have the cube files in your working directory:

```python
from pathlib import Path

cube_data = {
    "alpha_18": Path("MO_alpha_18.cube").read_text(),
    "alpha_19": Path("MO_alpha_19.cube").read_text(),
}

MoleculeViewer(molecule_data=structure.to_xyz(), cube_data=cube_data, isoval=0.03)
```

When you pass cube data to the `MoleculeViewer` widget, the visualizer has the following additional UI elements:

| UI element          | Description                                                                                |
|---------------------|--------------------------------------------------------------------------------------------|
| **Cube selection**  | Choose the MO that visualizer displays. You can view only one MO at a time.                |
| **Adjust isovalue** | Set the isovalue of the MO coefficients. The isovalue determines how the MOs are rendered. |

For information on how to generate `.cube` files, see [`qdk_chemistry.utils.cubegen module](https://microsoft.github.io/qdk-chemistry/api/api_autogen/qdk_chemistry.utils.cubegen.html#qdk_chemistry.utils.cubegen.generate_cubefiles_from_orbitals) in the QDK/Chemistry API reference on GitHub.
