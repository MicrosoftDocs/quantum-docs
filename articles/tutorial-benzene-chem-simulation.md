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

# Tutorial: Simulate quantum chemistry calculations for benzene diradical with QDK Chemistry Python libraries in VS Code

In this tutorial, you go through an end-to-end quantum chemistry workflow for benzene diradical with the Microsoft Quantum Development Kit (QDK) in Visual Studio Code (VS Code). You learn how to perform a series of classical quantum chemistry calculations, prepare a quantum circuit from your classical computational results, run the quantum circuit on different simulators, and visualize the results of your molecular calculations and quantum circuit.

## Prerequisites

To do this tutorial, you must install the following:

- VS Code with the QDK and Jupyter extensions [LINKS TO INSTALLATION DOCS]
- A Python environment with Python version 3.9 or higher
- The latest version of the `qdk` Python library with the `chemistry` and `jupyter` extras

    ```bash
    pip install --upgrade "qdk[chemistry,jupyter]"
    ```

## Load and view the molecular structure

The first step in a quantum chemistry calculation is to calculate the optimized molecular geometry for your molecule. You can use any computational chemistry software of your choice for geometry optimization.

To load the optimized geometry with QDK Chemistry, you must have a structure file that contains the Cartesian coordinates in 3-dimensional space for each atomic nucleus in the molecule.

For the benzene diradical in this tutorial, the optimized geometry is already provided for you in `.xyz` file format. The structure file also includes the name of the molecule and the total number of electrons. To load the optimized geometry and view the molecular structure, follow these steps:

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
1. To load the molecular structure data and display information about the benzene diradical, copy and then run the following code in the first cell of your notebook:

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

    For more information about `Structure` objects in QDK Chemistry, see [Structure](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/data/structure.html) in the QDK Chemistry documentation on GitHub.

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

### Determine the energy and wavefunction from an SCF calculation

To run an SCF calculation, create an `scf_solver` object and call the `run` method. Specify a basis set when you call `run`. Copy and run the following code in a new cell to perform an SCF calculation for benzene diradical:

```python
from qdk_chemistry.algorithms import create

# Perform an SCF calculation, and return the energy and wavefunction
scf_solver = create("scf_solver")
E_hf, wfn_hf = scf_solver.run(structure, charge=0, spin_multiplicity=1, basis_or_guess="cc-pvdz")
print(f"SCF energy is {E_hf:.3f} Hartree")

# Display a summary of the MOs
print("SCF Orbitals:\n", wfn_hf.get_orbitals().get_summary())
```

The SCF solver outputs the energy of the molecule and the MO coefficients that define the wavefunction in the specified basis.

For more information on SCF calculations in QDK Chemistry, see [Run a self-consistent field (SCF) calculation](https://animated-adventure-mwrpnpe.pages.github.io/user/quickstart.html#run-a-self-consistent-field-scf-calculation).

### Select an active space

In the chosen basis, your molecule has ###### MOs, but that's too many MOs to accurately model with qubits on a quantum computer. Instead of using all the MOs, select an active space that contains only the MOs where the interesting chemistry happens in your molecule. To select an active space, you can either visualize the MOs and use your chemical intuition to make your selection or you can use an `active_space_selector` object from QDK Chemistry to automatically select the active space for you.

For more information on active space selection in QDK Chemistry, see [Active space selection](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/algorithms/active_space.html).

#### Visualize the SCF MOs

QDK Chemistry uses `.cube` files to visualize MOs. To generate `.cube` files from your optimized MOs and view the MOs together with your molecular structure, follow these steps:

1. Generate `.cube` files from your SCF MOs. In a new cell, copy and run the following code:

    ```python
    from qdk_chemistry.utils.cubegen import generate_cubefiles_from_orbitals
    
    cube_generator = generate_cubefiles_from_orbitals(orbitals=wfn_hf.get_orbitals())
    
    # Generate the image data in the Cubefile format
    cubes = cube_generator.generate()
    
    # Write selected cube files to disk
    for cc in cubes:
        cc.to_cubefile(f"{cc.description}.cube")
    ```

    This code creates a set of `.cube` files in your working directory.

1. To visualize the MOs over the molecular structure, copy and run the following code in a new cell:

    ```python
    cube_data = {
        "alpha_18": Path("MO_alpha_18.cube").read_text(),
        "alpha_19": Path("MO_alpha_19.cube").read_text(),
        # ... etc etc etc
    }
    
    MoleculeViewer(molecule_data=molecular_structure, cube_data=cube_data)
    ```

Use the molecular visualizer to view the MOs and help you select an active space. For more information about how to view MOs in the visualizer, see [LINK TO HOW-TO ARTICLE ABOUT VISUALIZER].

#### Automatically select the active space MOs

The easiest way to select the active space is to use an `active_space_selector` object from QDK Chemistry. This object allows you to set the number of electrons and orbitals in the active space. For example, run the following code in a new cell to select an active space with 6 electrons and 6 MOs:

```python
# Select active space to choose the most chemically relevant orbitals
active_space_selector = create(
    "active_space_selector",
    algorithm_name="qdk_valence",
    num_active_electrons=6,
    num_active_orbitals=6
)

active_wfn = active_space_selector.run(wfn_hf)
active_orbitals = active_wfn.get_orbitals()

# Print a summary of the active space orbitals
print("Active Space Orbitals:\n", active_orbitals.get_summary())
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

### Visualize the active space MOs

You can use the molecular visualizer to view only the active space MOs, which are the ones that you use to build your quantum circuit.

To view only the active space MOs, follow these steps:

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

    ```python
    cube_generator = generate_cubefiles_from_orbitals(orbitals=active_orbitals)
    
    # Generate the image data in the Cubefile format
    cubes = cube_generator.generate()
    
    # Write selected cube files to disk
    for cc in cubes:
        cc.to_cubefile(f"{cc.description}.cube")
    ```

1. To visualize the active MOs from the cube files, run the following code in a new cell:

    ```python
    cube_data = {
        "alpha_18": Path("MO_alpha_18.cube").read_text(),
        "alpha_19": Path("MO_alpha_19.cube").read_text(),
        # ... etc etc etc
    }
    
    MoleculeViewer(molecule_data=molecule_data, cube_data=cube_data)
    ```

## Construct a multi-configurational wavefunction from the active space Hamiltonian

From the active space MOs, you can construct a multi-configurational wavefunction for only the active space. This wavefunction is a linear combination of products of single-determinant wavefunctions. Each determinant in the multi-configurational wavefunction maps to a qubit in the circuit that prepares the initial state of your molecule on the quantum computer. To construct the multi-configurational wavefunction, you must calculate the active space Hamiltonian.

### Calculate the active space Hamiltonian

The active space Hamiltonian contains the one-electron and two-electron integrals for the active space MOs. To construct the active space Hamiltonian, use a `hamiltonian_constructor` object. run the following code in a new cell:

```python
# Construct Hamiltonian in the active space and print its summary
hamiltonian_constructor = create("hamiltonian_constructor")
hamiltonian = hamiltonian_constructor.run(active_orbitals)
print("Active Space Hamiltonian:\n", hamiltonian.get_summary())
```

The output shows information about the Hamiltonian, like the number of orbitals and electrons, the core energy, and the number of significant one-electron and two-electron integrals. For more information about Hamiltonian calculations in QDK Chemistry, see [Hamiltonian](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/data/hamiltonian.html) and [Hamiltonian construction](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/algorithms/hamiltonian_constructor.html).

### Construct the multi-configurational wavefunction

To construct the multi-configurational wavefunction for the active space, use a `multi_configuration_calculator` object with the active space Hamiltonian that you calculated. Copy and run the following code in a new cell to construct the wavefunction with a complete active space configuration interaction (CASCI) calculation:

```python
# Perform CASCI calculation to get the wavefunction and exact energy for the active space
mc = create("multi_configuration_calculator")
E_cas, wfn_cas = mc.run(hamiltonian, n_active_alpha_electrons=3, n_active_beta_electrons=3)

print(f"CASCI energy is {E_cas:.3f} Hartree, and the electron correlation energy is {E_cas - E_hf:.3f} Hartree")
```

The output from this shows the CASCI energy, which is lower than the single-determinant energy. The CASCI energy is closer to the true energy of the molecule because the CASCI energy includes electron correlation energy. For more information about multi-configurational wavefunctions in QDK Chemistry, see [Multi-configuration calculations](https://animated-adventure-mwrpnpe.pages.github.io/user/comprehensive/algorithms/mc_calculator.html).

### Choose only the most significant determinants

~~~~~~You can't use this wavefunction directly because 400 determinants is too many to run accurately on current quantum hardware technologies.

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

Use the new wavefunction `wfn_sci`to recalculate the quantum state and Hamiltonian if your qubit system. Run the following code in a new cell:

```python
from prepq_mini.utils.qdk_chemistry import prepare_qubit_hamiltonian, prepare_quantum_state
from prepq_mini.hamiltonian import filter_and_group_hamiltonian_from_statevector

quantum_state = prepare_quantum_state(
    wavefunction=wfn_sci, num_orbitals=hamiltonian.get_num_orbitals(),
    num_electrons=hamiltonian.get_num_electrons(), num_determinants=num_dets_keep
    )

# Construction Qubit Hamiltonian with one of the available mappings (default: Jordan-Wigner)
qubit_hamiltonian = prepare_qubit_hamiltonian(fermionic_hamiltonian=hamiltonian)
print(
    "Number of Pauli terms in the initial qubit Hamiltonian:",
    len(qubit_hamiltonian.pauli_ops)
)
```

The initial qubit Hamiltonian has 247 Pauli terms, which is too many to run accurately on a modern quantum computer. To reduce the number of Pauli terms, run the following code in a new cell to filter and group the Pauli terms:

```python
print("Filtering and grouping Pauli terms")
filtered_hamiltonian_op, classical_coeffs = filter_and_group_hamiltonian_from_statevector(
    hamiltonian=qubit_hamiltonian, statevector=quantum_state.statevector
    )
print("Number of Pauli terms after filtering:", len(filtered_hamiltonian_op))
```

Now there are only 2 Pauli terms, which is manageable for a quantum computer.

## Prepare the quantum circuit with sparse isometry

----------------------------------------------

## Related content

To learn more about ... , see the following links:

- [Link A](xref:microsoft.quantum.)
- [Link B](xref:microsoft.quantum.)
