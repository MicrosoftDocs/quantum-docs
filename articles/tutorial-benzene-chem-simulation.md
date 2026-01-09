---
author: azure-quantum-content
description: Use QDK Chemistry to run quantum chemistry simulations and visualize the results in VS Code.
ms.date: 12/29/2025
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Quantum Development Kit, Quantum Intermediate Representation, target, targets]
title: Run a quantum chemistry calculation on the Neutral Atom Simulator in Visual Studio Code and visualize the results
uid: microsoft.quantum.tutorial.qdk-chem-benzene-sim
#customer intent: As a quantum chemistry researcher, I want an end-to-end workflow for how to use QDK Chemistry to run simulations for a quantum chemistry calculation and visualize the results in VS Code
---

# Tutorial: Simulate quantum chemistry calculations for benzene diradical with QDK Chemistry in VS Code

In this tutorial, you go through an end-to-end quantum chemistry workflow for benzene diradical with the Microsoft Quantum Development Kit (QDK) in Visual Studio Code (VS Code). You learn how to perform a series of classical quantum chemistry calculations, prepare a quantum circuit from your classical computational results, run the quantum circuit on different simulators, and visualize the results of your molecular calculations and quantum circuit.

## Prerequisites

To do this tutorial, you must install the following:

- VS Code with the QDK and Jupyter extensions [LINKS TO INSTALLATION DOCS]
- A Python environment with Python version 3.9 or higher.
- The latest version of the `qdk` Python library with the `jupyter` extra

    ```bash
    pip install --upgrade "qdk[jupyter]" 
    ```

## Load and view the molecular structure

The first step in a quantum chemistry calculation is to calculate the optimized molecular geometry for your molecule. You can use any computational chemistry software of your choice for geometry optimization.

To load the optimized geometry with the QDK Chemistry Python libraries, you must have a `.xyz` file that contains the number of electrons in the molecule, the name of the molecule, and the Cartesian coordinates in 3-dimensional space for each atomic nucleus in the molecule.

For the benzene diradical in this tutorial, the optimized geometry is already provided for you. To load the optimized geometry and view the molecular structure, follow these steps:

1. In VS Code, create a folder for this quantum chemistry project, and then open the folder.
1. Create an empty text file named `benzene_diradical.structure.xyz`.
1. Copy the following text, including the last empty line, into `benzene_diradical.structure.xyz` and save the file.

    ```plaintext
    10
    benzene radical
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

1. To create a new Jupyter Notebook file, open the **View** menu and choose **Command Palette**, and then enter **Create: New Jupyter Notebook**. Save the notebook file and use the notebook to run the code in this tutorial.
1. To load the molecular structure data and display information about the benzene diradical, copy and the run the following code in the first cell of your notebook:

    ```python
    from qatk.data import Structure

    structure = Structure()
    structure.from_xyz_file('benzene_diradical.structure.xyz')
    print(structure.get_summary())
    ```

    The output from `get_summary` shows the number of each atom, the total mass in atomic mass units (AMU), and the total nuclear repulsion energy in units of Hartrees.

    ```output
    Structure Summary:
      Number of atoms: 10
      Composition: H4, C6
      Total mass: 76.098 AMU
      Nuclear Repulsion Energy: 184.689 Eh
    ```

1. To view the structure of your molecule, copy and run the following code in a new cell:

    ```python
    from pathlib import Path
    from qdk.widgets import MoleculeViewer

    molecular_structure = Path("benzene_diradical.structure.xyz").read_text()
    MoleculeViewer(molecule_data=molecular_structure)
    ```

Use the molecular visualizer to examine the structure of the benzene diradical. For more information about how to use the molecular visualizer, see [LINK TO QDK CHEM VISUALIZER HOW-TO ARTICLE].

## Calculate and choose the molecular orbitals

Now that you're familiar with the structure of your molecule, the next step is to perform a self-consistent field (SCF) calculation to determine the molecular orbitals (MOs) and choose a subset of MOs as the active space.

### Generate MOs from an SCF calculation

To run an SCF calculation, you need to choose a basis set for your MOs and an SCF solver. You can set both of these choices as parameters in the `create_scf_solver` function from QDK Chemistry. Copy and run the following code in a new cell to calculate MOs for benzene diradical in the cc-pVDZ basis with the default SCF solver.

```python
from qatk.algorithms import create_scf_solver

scf_solver = create_scf_solver()
scf_solver.settings().set("basis_set", "cc-pvdz")
scf_solver.settings().set("show_internal_logs", True)
E, orbitals = scf_solver.solve(structure)
print(f"SCF Energy: {E + structure.calculate_nuclear_repulsion_energy():.8f} Hartree")
```

Because you turned on `show_internal_logs`, the output from this cell shows information for each step of the SCF algorithm. The output also shows information about your molecule that's calculated from the optimized MOs, such as energy terms, molecular dipole moment, and Mulliken charges.

For more information about SCF calculations in QDK Chemistry, including the log information and full list of parameters for `create_scf_solver`, see [LINK TO QDK CHEM GITHUB DOCS FOR THIS TOPIC].

### Select an active space

You have ###### MOs for your molecule, but that's too many to model each one with qubits on a quantum computer. Instead, select an active space that consists of a few MOs where the interesting chemistry happens. You can view the MOs to decide which ones to include in the active space, or you can use QDK Chemistry to automatically select the active space for you.

#### Visualize the SCF MOs

QDK Chemistry uses `.cube` files to visualize MOs. To generate `.cube` files from your optimized MOs and view the MOs together with your molecular structure, follow these steps:

1. Generate `.cube` files from your SCF MOs. In a new cell, copy and run the following code:

    ```python
    from qatk.algorithms.cubegen import create_cube_generator
    
    cube_generator = create_cube_generator("pyscf")
    cube_generator.settings().set("type", "orbitals")
    
    # Generate the image data in the Cubefile format
    cubes = cube_generator.generate(orbitals)
    
    # Write selected cube files to disk
    for cc in cubes:
        cc.to_cubefile(f"{cc.description}.cube")
    ```

    This code creates a set of `.cube` files in your working directory.

1. To visualize the MOs over the molecular structure, copy and the following code in a new cell:

    ```python
    cube_data = {
        "alpha_18": Path("MO_alpha_18.cube").read_text(),
        "alpha_19": Path("MO_alpha_19.cube").read_text()
        # ... etc etc etc
    }
    
    MoleculeViewer(molecule_data=molecular_structure, cube_data=cube_data)
    ```

1. Use the molecular visualizer to view all the MOs and help you select an active space. For more information about how to select MOs for the active space, see [LINK TO ARTICLE ABOUT HOW TO SELECT ACTIVE SPACE???]. For more information about how to view MOs in the visualizer, see [LINK TO HOW-TO ARTICLE ABOUT VISUALIZER].

#### Select the active space MOs automatically

The easiest way to select the active space is use the `create_active_space_selector` function from QDK Chemistry. This function allows you to set the number of electrons and orbitals in the active space. For example, run the following code in a new cell to select an active space with 6 electrons and 6 MOs:

```python
from qatk.algorithms import create_active_space_selector

# Select active space with *one* of the available methods
active_space_selector = create_active_space_selector("valence")
active_space_selector.settings().set("num_active_electrons", 6)
active_space_selector.settings().set("num_active_orbitals", 6)
active_orbitals = active_space_selector.select_active_space(orbitals)
print(active_orbitals.get_summary(False))
```

The preceding code produces the following output with information about the active space:

```output
Orbitals Summary:
  AOs: 104
  MOs: 104
  Electrons: α=20.000000, β=20.000000
  Type: Restricted
  Spin: Closed shell
  Has active space: Yes
  Active Electrons: α=3, β=3
  Active Orbitals: α=6, β=6
```

#### Visualize the active space MOs

However you select your active space, you can use the molecular visualizer to view only the active space MOs. These MOs are the ones that you use to build your quantum circuit.

To view the active space MOs, follow these steps:

1. Generate cube files for only the active space MOs. Run the following code in a new cell:

    ```python
    from qatk.algorithms.cubegen import create_cube_generator
    
    cube_generator = create_cube_generator("pyscf")
    cube_generator.settings().set("type", "active_orbitals")
    
    # Generate the image data in the Cubefile format
    cubes = cube_generator.generate(active_orbitals)
    
    # Write selected cube files to disk
    for cc in cubes:
        cc.to_cubefile(f"{cc.description}.cube")
    ```

1. To visualize the MOs from the cube files, run the following code in a new cell:

    ```python
    cube_data = {
        "alpha_18": Path("MO_alpha_18.cube").read_text(),
        "alpha_19": Path("MO_alpha_19.cube").read_text()
        # ... etc etc etc
    }
    
    MoleculeViewer(molecule_data=molecule_data, cube_data=cube_data)
    ```

## Construct the wavefunction and quantum state from the molecular Hamiltonian

From the active space MOs, construct the molecular Hamiltonian operator that determines the time evolution and energy of your molecule. The molecular Hamiltonian is used to calculate the wavefunction and initial quantum state for your molecule, which is used the build your quantum circuit.

### Construct the molecular Hamiltonian

To construct the molecular Hamiltonian, run the following code in a new cell:

```python
from qatk.algorithms import create_hamiltonian_constructor

hamiltonian_constructor = create_hamiltonian_constructor()
hamiltonian = hamiltonian_constructor.construct(active_orbitals)
print(hamiltonian.get_summary())
```

The output shows information about the Hamiltonian, like the number of orbitals and electrons, the core energy, and the number of significant one-electron and two-electron integrals.

### Construct the multi-determinant molecular wavefunction and initial quantum state

The wavefunction for a chemistry calculation on a quantum computer is a multi-determinant wavefunction where each determinant is represented by a qubit on the quantum computer. Run the following code in a new cell to construct an initial wavefunction:

```python
from qatk.algorithms import create_mc_calculator

mc = create_mc_calculator()
E_cas, wfn_cas = mc.calculate(hamiltonian)

print("Energy output:")
print(f"E(CASCI) = {E_cas + hamiltonian.get_core_energy():.8f} Hartree")
print(
    "Correlation energy = "
    f"{(E_cas +  hamiltonian.get_core_energy())
       - (E + structure.calculate_nuclear_repulsion_energy()):.8f} Hartree"
    )
```

The output from this code contains much information about the wavefunction, including the number of determinants (`NDETS` in the output). You can't use this wavefunction directly because 400 determinants is too many to run accurately on current quantum hardware technologies.

### Choose only the most significant determinants

To help reduce the number of determinants that you use in your wavefunction for the actual quantum circuit, plot the coefficients for all of the determinants in the full wavefunction. Run the following code in a new cell:

```python
import numpy as np
import matplotlib.pyplot as plt

print("Total number of the determinants:", len(wfn_cas.get_determinants()))
print("Sort determinants by coefficient:")
indices = range(len(wfn_cas.get_determinants()))
sorted_indices = sorted(indices, key=lambda i: -np.abs(wfn_cas.get_coefficients()[i]))

# Get top determinants by coefficients (e.g., top 10)
num_top = 10
labels = [
    wfn_cas.get_determinants()[i].to_string()[-6:][::-1]
    for i in sorted_indices[:num_top]
]
values = [(wfn_cas.get_coefficients()[i].real)**2 for i in sorted_indices[:num_top]]
plt.figure(figsize=(6, 4))
plt.bar(range(len(labels)), values, tick_label=labels)
plt.yscale('log')
plt.ylim(3e-3, 1)
plt.xlabel('Determinant')
plt.ylabel('Coefficient²')
plt.title(f'Top {num_top} Determinants by (coefficient)²')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

The preceding code produces a bar chart that shows the magnitude of square of the coefficient for the 10 determinants with the largest square coefficient values.

[INSERT SCREENSHOT OF BAR CHART]

Only two of the square coefficients values are greater than 0.01, with the other values approaching zero. This means that, out of the 400 coefficients, you can construct an accurate approximation of the full wavefunction with a subset of only a few determinants. For this tutorial, keep only the two determinants with the greatest square coefficients.

## Recalculate the reduced wavefunction

Because you're using a modified wavefunction, you must recalculate the energy of the 2-determinant wavefunction, of the Hamiltonian, and of the initial quantum state of the molecule.

### Calculate the energy of the 2-determinant wavefunction

To calculate the new energy of the approximate 2-determinant wavefunction, run the following code in a new cell:

```python
from prepq_mini.qatk.sci import energy_minimize_sci

num_dets_keep = 2
E_sci, wfn_sci = energy_minimize_sci(wfn_cas, hamiltonian, num_dets_keep)

print(
    "Reference energy for 2-determinant wavefunction: "
    f"{(E_sci + hamiltonian.get_core_energy()):.8f} Hartree"
)
```

Note that `NDETS` in the output is now equal to 2 instead of 400, and the new reference energy is greater than the energy of the 400-determinant wavefunction.

### Prepare the new quantum state and qubit Hamiltonian



----------------------------------------------

## Related content

To learn more about ... , see the following links:

- [Link A](xref:microsoft.quantum.)
- [Link B](xref:microsoft.quantum.)
