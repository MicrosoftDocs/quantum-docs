---
author: SoniaLopezBravo
description: In this tutorial, you estimate the physical resources required to calculate the energy of a Hamiltonian to chemical accuracy of 1 mHa, using the double-factorized qubitization algorithm.
ms.author: sonialopez
ms.date: 01/24/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: tutorial
no-loc: [target, targets]
title: 'Tutorial: Estimate the Resources of a Quantum Chemistry Problem'
uid: microsoft.quantum.tutorial.resource-estimator.chemistry
---

# Tutorial: Estimate the resources of a quantum chemistry problem

This tutorial shows how to estimate the physical resources required to calculate the energy of a Hamiltonian to chemical accuracy of 1 mHa using the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). 

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

In this tutorial, you will:

> [!div class="checklist"]
> * Combine and run multiple configurations of parameters as a single job.
> * Use FCIDUMP files as argument parameters for chemical modelling and simulation applications.


## Prerequisites 

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extensions installed.
- The latest Azure Quantum `qsharp` package, and `numpy` and `scipy` packages.  

    ```bash
    python -m pip install --upgrade qsharp numpy scipy 
    ```

> [!TIP]
> You don't need to have an Azure account to run the local Resource Estimator. 

## Describe the problem

In this tutorial, you evaluate the physical resource estimates of the qubitization algorithm described in [Phys. Rev. Research 3, 033055 (2021)](https://doi.org/10.1103/PhysRevResearch.3.033055) to calculate the energy of a user provided Hamiltonian to chemical accuracy of 1 mHa.

The quantum algorithm that calculates the energy of the Hamiltonian is based on *double-factorized qubitization*. The Hamiltonian is described in terms of one- and two-electron integrals in provided FCIDUMP (full configuration interaction) files that are available via an HTTPS URI. 

The *qubitization* approach is based on quantum phase estimation, but instead of constructing the standard $U = \\exp{(-i H/\\alpha)}$ from the Hamiltonian matrix $H$, one takes $U = \\exp{(-i \\sin^{-1} (H/\\alpha))}$, which can typically be implemented with fewer resources. Using *double-factorization*, $H$ is represented compactly through a combination of a judicious choice of orbitals and compression.

## Load the sample in Visual Studio Code

The code for this tutorial can be found in the [Q# sample repository](https://github.com/microsoft/qsharp), under [estimation/df-chemistry](https://github.com/microsoft/qsharp/tree/main/samples/estimation/df-chemistry). We recommend that you clone the repository in your local machine to run the sample. 

To clone the repository, run the following command from your terminal:

```bash
git clone https://github.com/microsoft/qsharp.git
```

## Select and pass a FCIDUMP file

In this example, the Hamiltonian is described in terms of one- and two-electron integrals in the FCIDUMP format. FCIDUMP files are publicly accessible HTTPS URIs. You can choose one FCIDUMP files from the following table or select your own FCIDUMP file.

|URI|Instance name|Description|
|---|---|---|
|<https://aka.ms/fcidump/XVIII-cas4-fb-64e-56o> |XVIII-cas4-fb-64e56o | 64 electron, 56 orbital active space of one of the stable intermediates in [the ruthenium-catalyzed carbon fixation cycle.](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.033055) |
|<https://aka.ms/fcidump/nitrogenase-54e-54o>|nitrogenase_54orbital | 54 electron, 54 orbital active space of the active core of [the nitrogenase](https://www.pnas.org/doi/10.1073/pnas.1619152114).|
|<https://aka.ms/fcidump/fe2s2-10e-40o>|	fe2s2-10e-40o|10 electron, 40 orbital active space of [[2Fe, 2S] cluster](https://www.pnas.org/doi/10.1073/pnas.1619152114).|
|<https://aka.ms/fcidump/polyyne-24e-24o>|polyyne-24e-24o|24 electron, 24 orbital active space of the polyyne molecule.|
|<https://aka.ms/fcidump/n2-10e-8o>|n2-10e-8o|10 electron, 8 orbital active space of he dissociated nitrogen at 3 Angstrom distance.|

To pass the FCIDUMP file


## Run the chemistry sample

To run the sample, locate. 

1. **Open** Visual Studio Code.
1. **Open** the folder where you cloned the Q# sample repository.
1. **Navigate** to the directory where your Python file is located. For example, if you cloned the Q# sample repository in your local machine, the path to the Python file is `qsharp/samples/estimation/df-chemistry`.
1. **Run** the chemistry sample and pass the FCIDUMP file For example, the following command will download the FCIDUMP file *n2-10e-8o* to the working folder and run resource estimation for it.

```bash
python chemistry.py -f https://aka.ms/fcidump/n2-10e-8o
```

After that, you can pass the path to the downloaded file to the script instead:

```bash
python chemistry.py -f n2-10e-8o
```

```output
Algorithm runtime: 19 mins
Number of physical qubits required: 207.60k
For more detailed resource counts, see file resource_estimate.json
```

## Change target parameters

1. Open the **chemistry.py** file in Visual Studio Code.
1. The target parameters of the resource estimation can be found in **line 471** of the chemistry.py file. The following code snippet shows the parameters used in this tutorial.

```python
# Get resource estimates
res = qsharp.estimate(qsharp_string,
                      params={"errorBudget": 0.01,
                              "qubitParams": {"name": "qubit_maj_ns_e6"},
                              "qecScheme": {"name": "floquet_code"}})
```

If you want to change the target parameters, you can do it by modifying the previous code snippet. For example, the following code snippet shows how to change the error budget to 0.1.

```python
# Get resource estimates
res = qsharp.estimate(qsharp_string,
                      params={"errorBudget": 0.1,
                              "qubitParams": {"name": "qubit_maj_ns_e6"},
                              "qecScheme": {"name": "floquet_code"}})
```

## Why chemistry applications of quantum computing are important? 

This tutorial represents a first step to integrate resource estimation of quantum solutions to electronic structure problems. One of the most important applications of scaled quantum computers is solving quantum chemistry problems. The simulation of complex quantum mechanical systems has the potential to unlock breakthroughs in areas such as carbon capture, food insecurity, and designing better fuels and materials.  

For example, one of the FCIDUMP files provided in this sample, *nitrogenase_54orbital*, describes the nitrogenase enzyme. If you could accurately simulate how this enzyme works at a quantum level, it could help us to understand how to produce it at scale. You could replace the highly energy-intensive process which is used to produce enough fertilizer to feed the planet. This has the potential to reduce the global carbon footprint and also to help address concerns regarding food insecurity in a growing population.

## Next steps

If you want to deepen your knowledge, here are some experiments you can try:

- Estimate some custom FCIDUMP files.
- Investigate the details of resource estimation by exploring the detailed resource estimation tables.
- Modify the assumptions on the target quantum computer by providing custom qubit parameters.
- Check out the other resource estimation sample notebooks in the Azure Quantum sample gallery.

Continue to explore other quantum algorithms and techniques:

- The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
- The tutorial [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
- The tutorial [Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to operate on qubits with Q# to change their state, and demonstrates the effects of superposition and entanglement.
- The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are Jupyter Notebook-based, self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
