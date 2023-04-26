---
author: SoniaLopezBravo
description: In this tutorial, you'll learn how to 
ms.author: sonialopez
ms.date: 04/24/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: tutorial
title: 'Tutorial: '
uid: microsoft.quantum.tutorial.resource-estimator.chemistry
---

# Tutorial: Estimate the resources of a quantum chemistry problem

This tutorial shows how to estimate the physical resources needed to calculate the energy of a Hamiltonian using the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator). The quantum algorithm used to calculate the energy is based on *double-factorized qubitization*. The Hamiltonian is described in terms of one- and two-electron integrals in the FCIDUMP (full configuration interaction) files that are available via an HTTPS URI. 

The *qubitization* approach is based on quantum phase estimation, but instead of constructing the standard $U = \\exp{(-i H/\\alpha)}$ from the Hamiltonian matrix $H$, one takes $U = \\exp{(-i \\sin^{-1} (H/\\alpha))}$, which can typically be implemented with fewer resources. Using *double-factorization*, $H$ is represented compactly through a combination of a judicious choice of orbitals and compression. The tolerated total error budget is $\\epsilon = 0.01$, corresponding to $1\\%$.


This sample

In this tutorial, you will:

> [!div class="checklist"]
> * Connect to the Azure Quantum service.
> * Use FCIDUMP files as argument parameters for chemical modelling and simulation applications.


## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The **Microsoft Quantum Computing** provider added to your workspace. For more information, see [Enabling the Resource Estimator target](xref:microsoft.quantum.quickstarts.computing.resources-estimator#enable-the-resources-estimator-in-your-workspace).

## Get started


### Load the required imports

First, you need to import some Python classes and functions from `azure.quantum`.

```python
from azure.quantum import Workspace
from azure.quantum.target.microsoft import MicrosoftEstimator
from azure.quantum.chemistry import df_chemistry
```

### Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program will need the resource ID and the
location of your workspace, which you can obtain from the **Overview** page in your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).

:::image type="content" source="media/azure-quantum-resource-id.png" alt-text="Screenshot showing how to retrieve the resource ID and location from an Azure Quantum workspace":::

Paste the values into the following `Workspace` constructor to create a `workspace` object that connects to your Azure Quantum workspace.

```python
provider = AzureQuantumProvider(
  resource_id="",
  location=""
)
```
This workspace is then used to create an instance to the Resource Estimator.

```python
estimator = MicrosoftEstimator(workspace)
```


You want to estimate the resources on a fault-tolerant quantum computer and with a chemical accuracy of 1 mHa. 

## Choose the resource estimation job parameters

A resource estimation job consist of two types of job parameters:

- [Target parameters](xref:microsoft.quantum.overview.resources-estimator), that is qubit model, QEC schemes, and error budget.
- Operation arguments, that is arguments that can be passed to the quantum program. In this case, the FCIDUMP files are passed as operation arguments. 

### Select and pass a FCIDUMP file

The Hamiltonian is described in terms of one- and two-electron integrals in the FCIDUMP format. FCIDUMP files are publicly accessible HTTPS URIs. You can choose one FCIDUMP files from the following table or select your own FCIDUMP file.

For example, one of the files provided with this sample describes the nitrogenase enzyme. If we could accurately simulate how this enzyme works at a quantum level, it could help us to understand how to manufacture it at scale, paving the way to replace the highly energy-intensive process currently used to produce enough fertilizer to feed the planet. This has the potential to not only significantly reduce our global carbon footprint, but also to help address concerns regarding food insecurity in the face of a growing population.


|URI|Instance name|Description|
|---|---|---|
|<https://aka.ms/fcidump/XVIII-cas4-fb-64e-56o> |XVIII-cas4-fb-64e56o | 64 electron, 56 orbital active space of one of the stable intermediates in the ruthenium-catalyzed carbon fixation cycl. |
|<https://aka.ms/fcidump/nitrogenase-54e-54o>|nitrogenase_54orbital | 54 electron, 54 orbital active space of the active core of the nitrogenase that is used in this paper|
|<https://aka.ms/fcidump/fe2s2-10e-40o>|	fe2s2-10e-40o|10 electron, 40 orbital active space of [2Fe, 2S] cluster that is shown in this paper.|
|<https://aka.ms/fcidump/polyyne-24e-24o>|polyyne-24e-24o|24 electron, 24 orbital active space of the polyyne molecule.|
|<https://aka.ms/fcidump/n2-10e-8o>|n2-10e-8o|10 electron, 8 orbital active space of he dissociated nitrogen at 3 Angstrom distance.|


You can also pass your own FCIDUMP files via:

- [Raw links to files in Github](https://docs.github.com/repositories/working-with-files/using-files/viewing-a-file#viewing-or-copying-the-raw-file-content) repositories (see [how to add files to Github repositories](https://docs.github.com/repositories/working-with-files/managing-files/creating-new-files)).
- [Files on Github gists](https://docs.github.com/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists).
- [Files in Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction) using SAS tokens


The URI is passed to the algorithm as operation arguments with the name `"fcidumpUri"`. For example, let's choose XVIII-cas4-fb-64e56o FCIDUMP file.

```python
params.file_uris["fcidumpUri"] = "https://aka.ms/fcidump/XVIII-cas4-fb-64e-56o"
```

### Set the error budget

The quantum algorithms requires a total accuracy if 0.01, i.e., 1%, in order to obtain a chemical accuracy of 1 mHa. We can instruct the resource estimator to use a total error budget of 0.01, which is distributed to all possible sub components in the execution of the quantum algorithm that may fail. (More details on the error budget can be found in the Azure Quantum documentation.)

```python
params.error_budget = 0.01
```

### Set the qubit parameters

Finally, you specify the qubit parameters. You choose six [pre-defined qubit parameter models](xref:microsoft.quantum.overview.resources-estimator#physical-qubit-parameters), four are gate-based and two are Majorana based models. For the Majorana based models we assume a Floquet code as QEC scheme. For more information, see [QEC schemes](xref:microsoft.quantum.overview.resources-estimator#quantum-error-correction-schemes).

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

## Estimate the quantum algorithm

The parameters are now all set up, and you're ready to submit the resource estimation job. As quantum program, you use the double-factorization based quantum chemistry algorithm, which is provided via the `df_chemistry` function. 

> [!NOTE]
> The execution of this cell may take a few minutes depending on program size. 

```python
job = estimator.submit(df_chemistry(), input_params=params)
results = job.get_results()
```

## Analyzing the results

## Next steps

Continue to explore other quantum algorithms and techniques:

* The tutorial [Implement Grover’s search algorithm](xref:microsoft.quantum.tutorial-qdk.grovers) shows how to write a Q# program that uses Grover's search algorithm to solve a graph coloring problem.
* The tutorial [Write and simulate qubit-level programs in Q#](xref:microsoft.quantum.tutorial-qdk.circuit) explores how to write a Q# program that directly addresses specific qubits.
* The tutorial [Explore quantum entanglement with Q#](xref:microsoft.quantum.tutorial-qdk.entanglement) shows how to operate on qubits with Q# to change their state, and demonstrates the effects of superposition and entanglement.
* The [Quantum Katas](xref:microsoft.quantum.tutorial-qdk.katas) are Jupyter Notebook-based, self-paced tutorials and programming exercises aimed at teaching the elements of quantum computing and Q# programming at the same time.
