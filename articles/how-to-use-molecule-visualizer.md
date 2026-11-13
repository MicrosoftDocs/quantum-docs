---
title: How to use the molecule visualizer with QDK for chemistry
description: Learn how to display molecular structures and orbitals with the molecule visualizer in QDK for chemistry.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/04/2026
ms.topic: how-to
ms.service: azure-quantum
ms.subservice: core
no-loc: ["Microsoft", "Microsoft Quantum Development Kit", "QDK", "QDK/Chemistry", "Jupyter", "Jupyter Notebook", "MOs", "Python", "Pip", "Visual Studio Code", "VS Code", "p-benzyne", "GitHub", "API"]
ai-usage: ai-assisted
uid: microsoft.quantum.how-to.qdk-molecule-visualizer
# Customer intent: As a quantum chemistry researcher, I want to inspect molecular structures and orbitals with the QDK molecule visualizer.
---

# How to use the molecule visualizer with QDK for chemistry

The Microsoft Quantum Development Kit (QDK) includes a molecule visualizer to use with QDK for chemistry (QDK/Chemistry). Use the visualizer to interact with the 3D structure of your molecule and overlay the molecular orbitals (MOs) in a Jupyter notebook.

## Prerequisites

To use the molecule visualizer, install the following tools:

- Python environment (version 3.11, 3.12, 3.13, or 3.14) with Python and pip
- Visual Studio Code (VS Code) with the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
- The latest version of the `qdk` Python package with the `jupyter` extra, and the `qdk-chemistry` library with all extras:

    ```bash
    pip install --upgrade "qdk[jupyter]" "qdk-chemistry[all]"
    ```

For more information on QDK/Chemistry installation, see [How to install QDK for chemistry](xref:microsoft.quantum.how-to.install-qdk-chemistry).

## Create a `Structure` object

The molecule visualizer requires a `Structure` object from the `qdk-chemistry` library. A `Structure` object has the three-dimensional coordinates and element type of each atom in the molecule. To create a `Structure` object, load data from a `.xyz` or `.json` structure file, or specify the coordinates and elements directly in your code.

The example below uses *p*-benzyne coordinates in angstroms. To load the structure from a `.xyz` file, follow these steps:

1. In VS Code, open the folder where you want to save your files.
1. Create an empty text file named *para-benzyne.structure.xyz*.
1. Copy the following text into *para-benzyne.structure.xyz*, and then save the file.

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

1. In VS Code, select **View** > **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**. A new tab opens with an empty Jupyter Notebook file.
1. Use the kernel picker in the notebook toolbar to select the Python environment where you installed `qdk` and `qdk-chemistry`.
1. To load the structure, copy the following code into the first cell of your notebook, and then run the cell:

    ```python
    from qdk_chemistry.data import Structure

    structure = Structure.from_xyz_file('para-benzyne.structure.xyz')

    structure
    ```

For more information about `Structure` objects in QDK/Chemistry, see [Structure](https://microsoft.github.io/qdk-chemistry/user/comprehensive/data/structure.html) in the QDK/Chemistry documentation on GitHub.

## View the molecular structure

To open the molecule visualizer, use the `to_xyz` method to pass an XYZ string to the `MoleculeViewer` widget. Copy and run the following code in a new cell:

```python
from qdk.widgets import MoleculeViewer

viewer = MoleculeViewer(molecule_data=structure.to_xyz())

viewer
```

The molecule visualizer opens in the output cell and renders a 3D representation of the molecular structure. The visualizer automatically draws bonds between atoms that are within a chemically reasonable distance.

:::image type="content" source="media/molecule-visualizer-style.png" alt-text="Screenshot of the molecule visualizer with the style dropdown menu open.":::

To change the visual representation, open the **Visualization Style** dropdown and choose one of the following options:

| Visualization style | Description                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------|
| **Sphere**          | Space-filling representation that shows atoms as spheres with element-specific size and color |
| **Stick**           | Stick model that shows explicit bonds between atoms and element-specific colors               |
| **Line**            | Wireframe representation that shows bond connectivity but no color                            |

### Interact with the molecule visualizer

Use the following mouse and keyboard controls to interact with the molecule visualizer.

| Input                           | Action                                    |
|---------------------------------|-------------------------------------------|
| Left-click and drag             | Rotate the molecule in 3D space           |
| Hold down **Shift** while you left-click and drag | Zoom in (drag up) or zoom out (drag down) |
| Hold down **Ctrl** while you left-click and drag | Move the molecule                    |

## View the molecular orbitals

To view molecular orbitals, use cube files from your electronic-structure calculation and the corresponding molecular structure. The cube data and structure must describe the same molecular geometry. Store the cube data in a Python dictionary with MO labels as keys, then pass the dictionary to `MoleculeViewer`.

If you need to generate cube data with QDK/Chemistry, see the [`qdk_chemistry.utils.cubegen` module](https://microsoft.github.io/qdk-chemistry/api/api_autogen/qdk_chemistry.utils.cubegen.html#qdk_chemistry.utils.cubegen.generate_cubefiles_from_orbitals) in the API reference.

> [!NOTE]
> If your QDK/Chemistry calculation outputs an `Orbitals` object, `generate_cubefiles_from_orbitals` can return cube data as a Python dictionary when you omit `output_folder`. Pass this dictionary directly to `MoleculeViewer` without separate cube files.

In the following examples, replace the placeholder filenames with the paths to your own files. Choose descriptive labels for your orbitals.

```python
from pathlib import Path
from qdk_chemistry.data import Structure
from qdk.widgets import MoleculeViewer

structure = Structure.from_xyz_file("your-molecule.xyz")

cube_data = {
    "Orbital 1": Path("orbital-1.cube").read_text(),
    "Orbital 2": Path("orbital-2.cube").read_text(),
}

MoleculeViewer(molecule_data=structure.to_xyz(), cube_data=cube_data, isoval=0.03)
```

:::image type="content" source="media/molecule-visualizer-mos.png" alt-text="Screenshot of the molecule visualizer with display options for molecular orbitals.":::

When you pass cube data to the `MoleculeViewer` widget, the visualizer shows the following UI elements:

| UI element          | Description                                                                     |
|---------------------|---------------------------------------------------------------------------------|
| **Cube selection**  | Choose the MO that the visualizer shows. View one MO at a time.                 |
| **Adjust isovalue** | Set the orbital-value threshold for the displayed surfaces.                     |

### Display other MO information

The molecule visualizer can also show custom information about the MOs. To add custom information to the visualizer output, use dictionaries to define the cube data and include the `"info"` key. The value for the `"info"` key is another dictionary that has the custom information.

This example shows the energy, symmetry, and electron occupation of each MO. Replace the sample values with information from your own calculation.

```python
cube_data_with_info = {
    "Orbital 1": {
        "data": cube_data["Orbital 1"],
        "info": {"Energy (Ha)": -0.392, "Symmetry": "A1", "Occupation": 1.0},
    },
    "Orbital 2": {
        "data": cube_data["Orbital 2"],
        "info": {"Energy (Ha)": 0.581, "Symmetry": "B2", "Occupation": 0.0},
    },
}

MoleculeViewer(
    molecule_data=structure.to_xyz(), cube_data=cube_data_with_info, isoval=0.03
)
```

:::image type="content" source="media/molecule-visualizer-mo-info.png" alt-text="Screenshot of the molecule visualizer that displays custom information about the molecular orbitals.":::
