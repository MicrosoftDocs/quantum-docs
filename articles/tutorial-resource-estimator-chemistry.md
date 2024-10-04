---
author: SoniaLopezBravo
description: In this tutorial, you estimate the physical resources required to calculate the energy of a Hamiltonian to chemical accuracy of 1 mHa.
ms.author: sonialopez
ms.date: 09/10/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: tutorial
no-loc: [target, targets]
title: 'Tutorial: Estimate Resources of a Quantum Chemistry Problem'
uid: microsoft.quantum.tutorial.resource-estimator.chemistry
#customer intent: As a quantum programmer, 
---

# Tutorial: Estimate the resources of a quantum chemistry problem

In this tutorial, you estimate the physical resources required to calculate the energy of a Hamiltonian to chemical accuracy of 1 mHa using the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator). 

In this tutorial, you will:

> [!div class="checklist"]
> * Clone a sample repository from GitHub.
> * Use FCIDUMP files as argument parameters for chemical modelling and simulation applications.
> * Run resource estimation for a large-scale problem, which is a double-factorized chemistry sample.

## Prerequisites 

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), and [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extensions installed.
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

## Select and pass an FCIDUMP file

In this example, the Hamiltonian is described in terms of one- and two-electron integrals in the FCIDUMP format. You can choose one of the FCIDUMP files from the following table or select your own FCIDUMP file available on your machine or online via a publicly accessible HTTPS URI.

|URI|Instance name|Description|
|---|---|---|
|<https://aka.ms/fcidump/XVIII-cas4-fb-64e-56o> |XVIII-cas4-fb-64e56o | 64 electron, 56 orbital active space of one of the stable intermediates in [the ruthenium-catalyzed carbon fixation cycle.](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.033055) |
|<https://aka.ms/fcidump/nitrogenase-54e-54o>|nitrogenase_54orbital | 54 electron, 54 orbital active space of the active core of [the nitrogenase](https://www.pnas.org/doi/10.1073/pnas.1619152114).|
|<https://aka.ms/fcidump/fe2s2-10e-40o>|	fe2s2-10e-40o|10 electron, 40 orbital active space of [[2Fe, 2S] cluster](https://www.pnas.org/doi/10.1073/pnas.1619152114).|
|<https://aka.ms/fcidump/polyyne-24e-24o>|polyyne-24e-24o|24 electron, 24 orbital active space of the polyyne molecule.|
|<https://aka.ms/fcidump/n2-10e-8o>|n2-10e-8o|10 electron, 8 orbital active space of he dissociated nitrogen at 3 Angstrom distance.|

To pass the FCIDUMP file, you need to run the chemistry.py file and pass the FCIDUMP file name or URI as an argument using either `-f` or `--fcidumpfile`.

```bash
usage: chemistry.py [-h] [-f FCIDUMPFILE]

options:
  -h, --help           
  -f FCIDUMPFILE, --fcidumpfile FCIDUMPFILE                      
```

## Run the chemistry sample

1. In Visual Studio Code, **open** the folder where you cloned the Q# sample repository.
1. Open a new terminal, **Terminal -> New Terminal**, and **navigate** to the directory where the quantum chemistry sample is located. For example, if you clone the Q# sample repository in your local machine, the path is `qsharp/samples/estimation/df-chemistry`.
1. **Run** the chemistry.py file and **pass** the FCIDUMP file. For example, the following command will download the FCIDUMP file *n2-10e-8o* to the working folder and run resource estimation for it.

    ```bash
    python chemistry.py -f https://aka.ms/fcidump/n2-10e-8o
    ```

    After that, you can pass the path to the downloaded file to the script instead.

    ```bash
    python chemistry.py -f n2-10e-8o
    ```

1. The **result** of the resource estimation is displayed in the terminal. For example, the following output shows the resource estimation for the *n2-10e-8o* FCIDUMP file.

    ```output
    Algorithm runtime: 19 mins
    Number of physical qubits required: 207.60k
    For more detailed resource counts, see file resource_estimate.json
    ```

> [!NOTE]
> After running the chemistry.py file, a *resource_estimation.json* file is created in the working folder. The resource_estimation.json file contains the detailed [output of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data#output-parameters). These are, the job parameters, physical counts, T factory properties, logical counts, and logical qubit properties.

### Change target parameters

1. Open the **chemistry.py** file.
1. The target parameters of the resource estimation can be found in the call to `qsharp.estimate` of the chemistry.py file. The following code snippet shows the parameters used in this tutorial.

    ```python
    # Get resource estimates
    res = qsharp.estimate(qsharp_string,
                          params={"errorBudget": 0.01,
                                  "qubitParams": {"name": "qubit_maj_ns_e6"},
                                  "qecScheme": {"name": "floquet_code"}})
    ```

1. If you want to change the target parameters, you can do it by modifying the previous code snippet. For example, the following code snippet shows how to change the error budget to 0.333. For more information, see [Customize the target parameters of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator).

    ```python
    # Get resource estimates
    res = qsharp.estimate(qsharp_string,
                          params={"errorBudget": 0.333,
                                  "qubitParams": {"name": "qubit_maj_ns_e6"},
                                  "qecScheme": {"name": "floquet_code"}})
    ```

## Why chemistry applications of quantum computing are important? 

This tutorial represents a first step to integrate resource estimation of quantum solutions to electronic structure problems. One of the most important applications of scaled quantum computers is solving quantum chemistry problems. The simulation of complex quantum mechanical systems has the potential to unlock breakthroughs in areas such as carbon capture, food insecurity, and designing better fuels and materials.  

For example, one of the FCIDUMP files provided in this sample, *nitrogenase_54orbital*, describes the nitrogenase enzyme. If you could accurately simulate how this enzyme works at a quantum level, it could help us to understand how to produce it at scale. You could replace the highly energy-intensive process which is used to produce enough fertilizer to feed the planet. This has the potential to reduce the global carbon footprint and also to help address concerns regarding food insecurity in a growing population.

If you want to deepen your knowledge, here are some experiments you can try:

- Estimate some custom FCIDUMP files.
- Modify the assumptions on the target quantum computer by providing custom qubit parameters.
- Check out the other resource estimation sample notebooks in the Azure Quantum sample gallery.

## Related content

- The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
- The tutorial [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
- The tutorial [Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to operate on qubits with Q# to change their state, and demonstrates the effects of superposition and entanglement.
- The [Quantum Katas](https://quantum.microsoft.com/tools/quantum-katas) are Jupyter Notebook-based, self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
