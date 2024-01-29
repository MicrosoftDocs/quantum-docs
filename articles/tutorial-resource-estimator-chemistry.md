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

This tutorial shows how to estimate the physical resources required to calculate the energy of a Hamiltonian to chemical accuracy of 1 mHa using the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator). The quantum algorithm that calculates the energy of the Hamiltonian is based on *double-factorized qubitization*. The Hamiltonian is described in terms of one- and two-electron integrals in provided FCIDUMP (full configuration interaction) files that are available via an HTTPS URI. 

The *qubitization* approach is based on quantum phase estimation, but instead of constructing the standard $U = \\exp{(-i H/\\alpha)}$ from the Hamiltonian matrix $H$, one takes $U = \\exp{(-i \\sin^{-1} (H/\\alpha))}$, which can typically be implemented with fewer resources. Using *double-factorization*, $H$ is represented compactly through a combination of a judicious choice of orbitals and compression. The tolerated total error budget is $\\epsilon = 0.01$, corresponding to $1\\%$.

[!INCLUDE [Classic QDK banner](includes/classic-qdk-deprecation.md)]

In this tutorial, you will:

> [!div class="checklist"]
> * Combine and run multiple configurations of parameters as a single job.
> * Use FCIDUMP files as argument parameters for chemical modelling and simulation applications.
> * Create a reusable function to display resource estimates in HTML format table.


## Prerequisites for VS Code

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- The latest version of the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode) extension. For installation details, see [Installing the Modern QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-modern-qdk-on-vs-code).

> [!TIP]
> You don't need to have an Azure account to run the local Resource Estimator. 

## Select and pass a FCIDUMP file

In this example, the Hamiltonian is described in terms of one- and two-electron integrals in the FCIDUMP format. FCIDUMP files are publicly accessible HTTPS URIs. You can choose one FCIDUMP files from the following table or select your own FCIDUMP file.

|URI|Instance name|Description|
|---|---|---|
|<https://aka.ms/fcidump/XVIII-cas4-fb-64e-56o> |XVIII-cas4-fb-64e56o | 64 electron, 56 orbital active space of one of the stable intermediates in [the ruthenium-catalyzed carbon fixation cycle.](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.033055) |
|<https://aka.ms/fcidump/nitrogenase-54e-54o>|nitrogenase_54orbital | 54 electron, 54 orbital active space of the active core of [the nitrogenase](https://www.pnas.org/doi/10.1073/pnas.1619152114).|
|<https://aka.ms/fcidump/fe2s2-10e-40o>|	fe2s2-10e-40o|10 electron, 40 orbital active space of [[2Fe, 2S] cluster](https://www.pnas.org/doi/10.1073/pnas.1619152114).|
|<https://aka.ms/fcidump/polyyne-24e-24o>|polyyne-24e-24o|24 electron, 24 orbital active space of the polyyne molecule.|
|<https://aka.ms/fcidump/n2-10e-8o>|n2-10e-8o|10 electron, 8 orbital active space of he dissociated nitrogen at 3 Angstrom distance.|

> [!NOTE]
> You can also pass your own FCIDUMP files via:
> - [Raw links to files in Github](https://docs.github.com/repositories/working-with-files/using-files/viewing-a-file#viewing-or-copying-the-raw-file-content) repositories (see [how to add files to Github repositories](https://docs.github.com/repositories/working-with-files/managing-files/creating-new-files)).
> - [Files on Github gists](https://docs.github.com/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists).
> - [Files in Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction) using SAS tokens.



### Set the error budget

You want to estimate the resources on a fault-tolerant quantum computer and with a chemical accuracy of 1 mHa. The quantum algorithms requires a total accuracy if 0.01, that is, 1%, to obtain a chemical accuracy of 1 mHa. For more information, see [Error budget](xref:microsoft.quantum.overview.resources-estimator#error-budget).

```python
params.error_budget = 0.01
```

### Set the qubit parameters

Finally, you specify the qubit parameters. You choose six [predefined qubit parameter models](xref:microsoft.quantum.overview.resources-estimator#physical-qubit-parameters), four are gate-based and two are Majorana based models. For the Majorana based models, you assume a Floquet code as QEC scheme. For more information, see [QEC schemes](xref:microsoft.quantum.overview.resources-estimator#quantum-error-correction-schemes).

```python
params.items[0].qubit_params.name = "qubit_gate_us_e3"
params.items[1].qubit_params.name = "qubit_gate_us_e4"
params.items[2].qubit_params.name = "qubit_gate_ns_e3"
params.items[3].qubit_params.name = "qubit_gate_ns_e4"
params.items[4].qubit_params.name = "qubit_maj_ns_e4"
params.items[4].qec_scheme.name = "floquet_code"
params.items[5].qubit_params.name = "qubit_maj_ns_e6"
params.items[5].qec_scheme.name = "floquet_code"
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
