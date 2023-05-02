---
author: SoniaLopezBravo
description: In this tutorial, you estimate the physical resources required to calculate the energy of a Hamiltonian to chemical accuracy of 1 mHa, using the double-factorized qubitization algorithm.
ms.author: sonialopez
ms.date: 04/24/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: tutorial
title: 'Tutorial: Estimate the resources of a quantum chemistry problem'
uid: microsoft.quantum.tutorial.resource-estimator.chemistry
---

# Tutorial: Estimate the resources of a quantum chemistry problem

This tutorial shows how to estimate the physical resources required to calculate the energy of a Hamiltonian to chemical accuracy of 1 mHa using the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator). The quantum algorithm that calculates the energy of the Hamiltonian is based on *double-factorized qubitization*. The Hamiltonian is described in terms of one- and two-electron integrals in provided FCIDUMP (full configuration interaction) files that are available via an HTTPS URI. 

The *qubitization* approach is based on quantum phase estimation, but instead of constructing the standard $U = \\exp{(-i H/\\alpha)}$ from the Hamiltonian matrix $H$, one takes $U = \\exp{(-i \\sin^{-1} (H/\\alpha))}$, which can typically be implemented with fewer resources. Using *double-factorization*, $H$ is represented compactly through a combination of a judicious choice of orbitals and compression. The tolerated total error budget is $\\epsilon = 0.01$, corresponding to $1\\%$.

In this tutorial, you will:

> [!div class="checklist"]
> * Connect to the Azure Quantum service.
> * Combine and run multiple configurations of parameters as a single job.
> * Use FCIDUMP files as argument parameters for chemical modelling and simulation applications.
> * Create a reusable function to display resource estimates in HTML format table. 

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The **Microsoft Quantum Computing** provider added to your workspace. For more information, see [Enabling the Resource Estimator target](xref:microsoft.quantum.quickstarts.computing.resources-estimator#enable-the-resources-estimator-in-your-workspace).

## Get started

Using the Resource Estimator is the same as submitting a job against other software and hardware provider targets in Azure Quantum - define your program, set a target, and submit your job for computation.

### Load the required imports

First, you need to import some Python classes and functions from `azure.quantum`.

Click **+ Code** to add a new cell, then add and run the following code:

```python
from azure.quantum import Workspace
from azure.quantum.target.microsoft import MicrosoftEstimator
from azure.quantum.chemistry import df_chemistry
```

### Connect to the Azure Quantum service

To connect to the Azure Quantum service, your program need the resource ID and the location of your workspace, which you can obtain from the **Overview** page in your Azure Quantum workspace in the [Azure portal](https://portal.azure.com).

:::image type="content" source="media/azure-quantum-resource-id.png" alt-text="Screenshot showing how to retrieve the resource ID and location from an Azure Quantum workspace":::

Paste the values into the following `Workspace` constructor to create a `workspace` object that connects to your Azure Quantum workspace.

```python
workspace = Workspace(
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

- Target parameters, which consist on three predefined parameters: qubit model, QEC schemes, and error budget. For more information, see [Target parameters of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator).
- Operation arguments, that is arguments that can be passed to the quantum program. In this case, the FCIDUMP files are passed as operation arguments. 

### Select and pass a FCIDUMP file

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


The URI is passed to the algorithm as operation arguments with the name `"fcidumpUri"`. For example, let's choose XVIII-cas4-fb-64e56o FCIDUMP file.

```python
params.file_uris["fcidumpUri"] = "https://aka.ms/fcidump/XVIII-cas4-fb-64e-56o"
```

### Set the error budget

The quantum algorithms requires a total accuracy if 0.01, that is, 1%, to obtain a chemical accuracy of 1 mHa. For more information, see [Error budget](xref:microsoft.quantum.overview.resources-estimator#error-budget).

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

## Estimate the quantum algorithm

The parameters are now all set up, and you're ready to submit the resource estimation job. You can submit multiple configuration of job parameters as a single job to avoid rerunning multiple jobs on the same quantum program. For more information, see [Run multiple configurations as a single job](xref:microsoft.quantum.work-with-resource-estimator).

As quantum program, you use the double-factorization based quantum chemistry algorithm, which is provided via the `df_chemistry` function. 

> [!NOTE]
> The execution of this cell may take a few minutes depending on program size. 

```python
job = estimator.submit(df_chemistry(), input_params=params)
results = job.get_results()
```

## Analyze the results

Now that the results have been computed, you can display them in a summary table. The following code includes a dashboard function that creates an HTML display from a pandas data frame and the resource estimation tables. You can copy and reuse this function in other resource estimates jobs. 

```python
labels = ["Gate-based µs, 10⁻³", "Gate-based µs, 10⁻⁴", "Gate-based ns, 10⁻³", "Gate-based ns, 10⁻⁴", "Majorana ns, 10⁻⁴", "Majorana ns, 10⁻⁶"]

def dashboard(results):
    def get_row(result):
        # Extract raw data from result dictionary
        logical_qubits = result["physicalCounts"]["breakdown"]["algorithmicLogicalQubits"]
        logical_depth = result["physicalCounts"]["breakdown"]["logicalDepth"]
        num_tstates = result["physicalCounts"]["breakdown"]["numTstates"]
        code_distance = result["logicalQubit"]["codeDistance"]
        num_tfactories = result["physicalCounts"]["breakdown"]["numTfactories"]
        tfactory_fraction = (result["physicalCounts"]["breakdown"]["physicalQubitsForTfactories"] / result["physicalCounts"]["physicalQubits"]) * 100
        physical_qubits = result["physicalCounts"]["physicalQubits"]
        runtime = result["physicalCounts"]["runtime"]

        # Format some entries
        logical_depth_formatted = f"{logical_depth:.1e}"
        num_tstates_formatted = f"{num_tstates:.1e}"
        tfactory_fraction_formatted = f"{tfactory_fraction:.1f}%"
        physical_qubits_formatted = f"{physical_qubits / 1e6:.2f}M"

        # Make runtime human readable; we find the largest units for which the
        # runtime has a value that is larger than 1.0.  For that unit we are
        # rounding the value and append the unit suffix.
        units = [("nanosecs", 1), ("microsecs", 1000), ("millisecs", 1000), ("secs", 1000), ("mins", 60), ("hours", 60), ("days", 24), ("years", 365)]
        runtime_formatted = runtime
        for idx in range(1, len(units)):
            if runtime_formatted / units[idx][1] < 1.0:
                runtime_formatted = f"{round(runtime_formatted) % units[idx][1]} {units[idx - 1][0]}"
                break
            else:
                runtime_formatted = runtime_formatted / units[idx][1]

        # special case for years
        if isinstance(runtime_formatted, float):
            runtime_formatted = f"{round(runtime_formatted)} {units[-1][0]}"

        # Append all extracted and formatted data to data array
        return (logical_qubits, logical_depth_formatted, num_tstates_formatted, code_distance, num_tfactories, tfactory_fraction_formatted, physical_qubits_formatted, runtime_formatted)

    data = [get_row(results.data(index)) for index in range(len(results))]

    # Create data frame with explicit column names and configuration names extracted from array
    import pandas as pd
    df = pd.DataFrame(data, columns=["Logical qubits", "Logical depth", "T states", "Code distance", "T factories", "T factory fraction", "Physical qubits", "Physical runtime"], index=labels)

    return df

dashboard(results)
```

|Configuration | Logical qubits |	Logical depth |	T states |	Code distance |	T factories  |	T factory fraction |	Physical qubits |	Physical runtime |
|--- |--- |--- |--- |--- |--- |--- |--- |--- |
|Gate-based µs, 10⁻³ |	2844	 |4.0e+11 |	5.4e+11	 |33 |	15	 |6.6% | 	6.63M |	254 years |
|Gate-based µs, 10⁻⁴	 |2844 |	4.0e+11 |	5.4e+11 |	17 |	14 |	5.4% |	1.74M	 |131 years |
|Gate-based ns, 10⁻³	 |2844 |	4.0e+11 |	5.4e+11 |	33 |	17 |	13.1% |	7.13M	 |62 days |
|Gate-based ns, 10⁻⁴	 |2844	 |4.0e+11	 |5.4e+11 |	17 |	17 |	14.2% |	1.92M |	32 days |
|Majorana ns, 10⁻⁴	 |2844 |	4.0e+11	 |5.4e+11	 |17	 |19 |	21.6%	 | 4.65M	 |24 days |
|Majorana ns, 10⁻⁶	 |2844 |	4.0e+11 |	5.4e+11	 |9 |	19 |	22.3%	 |1.42M |	13 days |


1. Each row of the table corresponds to one of the six qubit parameter configurations, where the first column shows a textual description for the model. 
2. The next three columns show technology-independent resources, which are the number of *logical qubits*, the *logical depth*, which is the number of logical operations performed in sequence, and the number of *T states* that are consumed by the logical operations. 
4. The *code distance* indicates the error correction overhead to guarantee a sufficient logical error rate for the logical operations. 
5. The number of *T factories* indicates how many T factories are executed in parallel to produce the total number of T states. 
6. The *T factory fraction* describes the percentage of the number of qubits that are used to execute T factories, the rest is used to execute the logical operations of the algorithm. 
7. The last two columns show the total number of *physical qubits* and the *runtime* to execute the quantum algorithm given the assumed qubit parameters.

For more information, see [Output data of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator#output-data). If you're interested in the workflow of the Resource Estimator, see [How the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works).

### Access the results table

The results of the resource estimation job are displayed in a table with multiple results coming from the list of items. By default the maximum number of items to be displayed is five. To display a list of $N$ items where $N > 5$, use `results[0:N]`.  

You can also access individual results by providing a number as index. For exmample, the last configuration has index 5. You can further inspect more details about the resource estimates by collapsing various groups which have more information. For example, if you collapse the Logical qubit parameters group, you can see how the overhead to represent a logical qubit using physical qubits is derived. The last group shows the physical qubit properties that were assumed for this estimation.

```python
results[5]
```

You can also compare different configurations.For example, lets' compare the gate-based nanosecond model with the Majorana based model for an error rate of $10^-4$. These configurations correspond to indices 3 and 4.

```python
results[3:5]
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
