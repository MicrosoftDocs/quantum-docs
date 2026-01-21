---
author: azure-quantum-content
description: This article shows how to install, create, and use the molecule visualizer for the QDK chemistry libraries. 
ms.date: 01/12/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: How to use the molecule visualizer in the QDK
uid: microsoft.quantum.how-to.qdk-molecule-visualizer
#customer intent: As a quantum chemistry researcher, I want to know how to use the QDK's molecule visualizer to examine the structure and molecular orbitals of my molecule
---

# How to use the molecule visualizer in the QDK

The Microsoft Quantum Development Kit (QDK) includes a molecule visualizer as part of the chemistry libraries. You can use the molecule visualizer to view the 3D structure and the molecular orbitals (MOs) of your molecule in a Jupyter notebook in Visual Studio Code (VS Code).

## Prerequisites

To use the molecule visualizer, you must install the following:

- Python environment (version 3.10 or greater) with Python and Pip
- Visual Studio Code (VS Code) with the Jupyter Notebook extension, or open VS Code for the Web
- The latest version of the `qdk` Python library with the `jupyter` extra, and the `qdk-chemistry` library

    ```bash
    pip install --upgrade "qdk[jupyter]" qdk-chemistry
    ```

## Create a structure object

To open the molecule visualizer, you need to use a `Structure` object from the QDK chemistry libraries. A `Structure` object contains the 3D spatial coordinates and atom type of each atomic nucleus in the molecule. To create a `Structure` object, you can read data from a `xyz` or `.json` structure file, or you can directly specify the coordinates in your code.

For example, to create a `Structure` object for a benzene diradical, follow these steps:

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with an empty Jupyter Notebook file.
1. In the first cell of your notebook, copy and run the following code:

    ```python
    import numpy as np
    from qdk_chemistry.data import Structure

    # Define benzene diradical structure directly using numpy arrays
    coords = np.array(
        [
            [0.00000000, 2.63805767, 0.00000000],
            [2.28482439, 1.31902883, 0.00000000],
            [2.28482439, -1.31902883, 0.00000000],
            [0.00000000, -2.63805767, 0.00000000],
            [-2.28482439, -1.31902883, 0.00000000],
            [-2.28482439, 1.31902883, 0.00000000],
            [4.06480089, 2.34703985, 0.00000000],
            [4.06480089, -2.34703985, 0.00000000],
            [-4.06480089, -2.34703985, 0.00000000],
            [-4.06480089, 2.34703985, 0.00000000],
        ]
    )

    elements = ["C", "C", "C", "C", "C", "C", "H", "H", "H", "H"]
    structure = Structure(coords, elements)
    ```

For more information about `Structure` objects in the QDK chemistry libraries, see [Structure](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/data/structure.html) in the QDK Chemistry documentation on GitHub.

## View the molecular structure

To view the molecular structure, copy and run the following code in a new cell:

```python
from qdk.widgets import MoleculeViewer

MoleculeViewer(molecule_data=molecule_data)
```

The molecule visualizer appears in the output cell with a 3D representation of the atoms in your molecule. To change the visual representation, choose the **Visualization Style** dropdown and select one of the three options: **Sphere**, **Stick**, or **Line**.

### Interact with the molecule visualizer

Use the following mouse and keyboard controls to interact with the molecule visualizer

| Input                           | Description                        |
|---------------------------------|------------------------------------|
| Click and drag                  | Rotate the molecule in 3D space    |
| Hold **Shift** + click and drag | Zoom in and out                    |
| Hold **Ctrl** + click and drag  | Move the molecule without rotation |

## View the molecular orbitals

If you have `.cube` files that store the MO data for your molecule, then you can load these files into the molecule visualizer to view the MOs overlaid on the molecule structure. Store the cube data in a Python dictionary with MO labels as keys, then pass the dictionary to `MoleculeViewer`.

For example, the following code renders MOs for two active space orbitals in benzene diradical when you have the cube files in your working directory:

```python
from pathlib import Path

cube_data = {
    "alpha_18": Path("MO_alpha_18.cube").read_text(),
    "alpha_19": Path("MO_alpha_19.cube").read_text(),
}

MoleculeViewer(molecule_data=molecule_data, cube_data=cube_data, isoval=0.03)
```

When the molecule visualizer displays MOs, use the **Cube selection** dropdown to choose which MO to display and use the **Adjust isovalue** slider to change the isovalue of how the MOs display.
