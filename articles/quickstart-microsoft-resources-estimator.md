---
author: SoniaLopezBravo
description: Learn how to submit a Q# program to the Azure Quantum Resource Estimator
ms.author: sonialopez
ms.date: 11/22/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: quickstart
no-loc: ['Python', '$$v']
title: 'Quickstart: Submit a quantum program to the Resource Estimator'
uid: microsoft.quantum.quickstarts.computing.resources-estimator
--- 

# Quickstart: Run your first resource estimate

Learn how to use the Azure Quantum service to submit quantum programs to the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator). This example uses a Jupyter Notebook in Azure Quantum and the built-in *azure-quantum* Python package - no installation or configuration is required. For more information about using Jupyter Notebooks with Azure Quantum, see [Run Jupyter Notebooks in an Azure Quantum workspace](xref:microsoft.quantum.how-to.notebooks).

In this example, you'll run a sample notebook that estimates the costs of a multiplier on a fault-tolerant quantum computer written in Q# and Python.

## Prerequisites

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Enable the Azure Quantum Resource Estimator target in your workspace

The Resource Estimator is a target of the Microsoft Quantum Computing provider. If you have created a workspace since the release of the Resource Estimator, the Microsoft Quantum Computing provider was added to your workspace automatically. 

If you are using an *existing* Azure Quantum workspace:

1. Open your workspace in the [Azure portal](https://portal.azure.com/) 
2. On the left panel, under **Operations**, select **Providers** 
3. Select **+ Add a provider** 
4. Select **+ Add** for **Microsoft Quantum Computing**
5. Select **Learn & Develop** and select **Add**

## Copy a sample notebook

1. Sign in to the [Azure portal](https://portal.azure.com) and select your Azure Quantum workspace.
1. Select **Notebooks**.
1. In the **Sample gallery**, navigate to the **Resource estimation** tab. 
1. Locate the **Estimates with Q# input** notebook tile, and select **Copy to my notebooks**.
1. The sample notebook can be found under **My notebooks** and you can now run the notebook.

    :::image type="content" source="media/resource-estimator-sample-gallery.png" alt-text="Screenshot of the sample Jupyter Notebook gallery showing how to copy a resource estimation notebook in your gallery.":::

## Run the notebook

1. In **My notebooks**, select the **Estimates with Q# input** notebook. 
1. To run the full program from top to bottom, select **Run all**. 
1. To walk through the example and run each cell individually from top to bottom, select the cell you want to run and select the **run icon**.

    :::image type="content" source="media/run_or_run_all.png" alt-text="Screenshot of the Jupyter Notebook showing how to run it.":::

### Stepping through the program 

The *Estimates with Q# input* program runs a multiplier and analyzes the physical resource estimates targeted on a fault-tolerant quantum computer.

- **1st and 2nd cell**: Preloads `qsharp` package and your subscription information to connect to the Azure Quantum service. 
- **3rd cell**: Selects the *Resource Estimator* as the target using the `microsoft.estimator` target ID and loads some required packages.
- **4th cell**: The Q# code that defines the quantum algorithm. It creates a multiplier using the [MultiplyI](/qsharp/api/qsharp/microsoft.quantum.arithmetic.multiplyi) operation. You can configure the size of the multiplier by passing an input parameter `bitwidth` to the operation. The operation will have two input registers, each the size of the specified `bitwidth`, and one output register that is twice the size of the specified `bitwidth`.

    > [!NOTE]
    > The *%%qsharp* magic command allows you to enter Q# code directly into the notebook when using the **Python 3 (ipykernel)**. For more information, see [%%qsharp magic command](xref:microsoft.quantum.how-to.python-local#the-qsharp-magic-command).

- **5th and 6th cells**: Submits the quantum algorithm to the Resource Estimator using the `qsharp.azure.execute` function. The function calls the Q# operation `EstimateMultiplication` and passes the input parameter `bitwidth=8`. 
- **8th cell**: Retrieves the results of the resource estimation job and shows a table with overall physical resource counts. You can inspect cost details by collapsing the groups, which have more information. For example, if you collapse the **Logical qubit parameters** group, you can more easily see that the error correction code distance is 13. 

    |Logical qubit parameter| Value |
    |----|---|
    |QEC scheme                                                |                           surface_code |
    |Code distance                                                                       |            13 |
    |Physical qubits                                                                   |            338 |
    |Logical cycle time                                                                   |   5us 200 ns |
    |Logical qubit error rate                                                            |     3.00E-9 |
    |Crossing prefactor                                                                    |       0.03|
    |Error correction threshold                                                             |      0.01|
    |Logical cycle time formula    | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
    |Physical qubits formula	      |                                      2 * `codeDistance` * `codeDistance`|


    In the **Physical qubit parameters** group, you can see the physical qubit properties that were assumed for this estimation. 
    For example, the time to perform a single-qubit measurement and a single-qubit gate are assumed to be 100 ns and 50 ns, respectively.

    |Physical qubit parameter | Value |
    |---|---|
    |Qubit name     |                    qubit_gate_ns_e3 |
    |Instruction set                      |     GateBased  |
    |Single-qubit measurement time         |       100 ns |
    |T gate time	                            |      50 ns|
    |T gate error rate                       |      0.001 |
    |Single-qubit measurement error rate      |     0.001 |
    |Single-qubit gate time                    |    50 ns |
    |Single-qubit error rate                   |    0.001 |
    |Two-qubit gate time                       |    50 ns |
    |Two-qubit error rate                        |  0.001 |

For more information, see [the full list of output data](xref:microsoft.quantum.overview.resources-estimator#output-data) for the Resource Estimator.

- **From 9th cell to the end**: Changes the target parameters of the program and estimates the same quantum algorithm.

### Input parameters

When submitting a resource estimate request for your program, you can specify some optional parameters. There are three top-level target parameters that can be customized: 

* `errorBudget` - the overall allowed error budget
* `qecScheme` - the quantum error correction (QEC) scheme
* `qubitParams` - the physical qubit parameters 

For more information, see [Target parameters](xref:microsoft.quantum.overview.resources-estimator#input-parameters) for the Resource Estimator.

 In the **9th cell** of the notebook, you can see the defaults and access all the values that can be passed to a job execution.

```python
result['jobParams']
```

```output
{'errorBudget': 0.001,
 'qecScheme': {'crossingPrefactor': 0.03,
  'errorCorrectionThreshold': 0.01,
  'logicalCycleTime': '(4 * twoQubitGateTime + 2 * oneQubitMeasurementTime) * codeDistance',
  'name': 'surface_code',
  'physicalQubitsPerLogicalQubit': '2 * codeDistance * codeDistance'},
 'qubitParams': {'instructionSet': 'GateBased',
  'name': 'qubit_gate_ns_e3',
  'oneQubitGateErrorRate': 0.001,
  'oneQubitGateTime': '50 ns',
  'oneQubitMeasurementErrorRate': 0.001,
  'oneQubitMeasurementTime': '100 ns',
  'tGateErrorRate': 0.001,
  'tGateTime': '50 ns',
  'twoQubitGateErrorRate': 0.001,
  'twoQubitGateTime': '50 ns'}}
 ```
    
The Resource Estimator offers [six pre-defined qubit parameters](xref:microsoft.quantum.overview.resources-estimator#physical-qubit-parameters), four of which have gate-based instruction sets and two that have a Majorana instruction set. In the **10th cell**, you can estimate the cost for the same algorithm using the Majorana-based qubit parameter, `qubitParams`, "qubit_maj_ns_e6".

```python
result = qsharp.azure.execute(EstimateMultiplication8,
            jobParams={
                "qubitParams": {
                    "name": "qubit_maj_ns_e6"
                }})
result
```

The pre-defined qubit parameters can also be customized by specifying the name and then updating the values of other fields. For more information, see [Custom pre-defined qubit parameters](xref:microsoft.quantum.overview.resources-estimator#custom-pre-defined-qubit-parameters). 

Run the following cells of the notebook and learn how to customize the quantum error correction code (QED), `qecScheme`, and the error budget, `errorBudget`.

The full functionality of the Resource Estimator is beyond the scope of this quickstart. For more information, see [Submitting jobs to the Resource Estimator with different SDKs and IDEs](xref:microsoft.quantum.submit-resource-estimation-jobs#resources-estimation-with-q-and-python).

## Load and run other sample notebooks

You'll find more sample notebooks in the **Resource estimation** tab of the sample gallery.

- **Advanced analysis of estimates**: This sample uses the implementations from the *Estimates with Q#* notebook to compute advance analysis of the results such as computing multiple resource estimates, plot and compare their results. 
- **Estimates with Qiskit input**: This sample estimates the resources of a quantum circuit for a multiplier written in Qiskit that uses the Quantum Fourier Transform to implement arithmetic.
- **Estimates with tools producing QIR**: This sample shows how to generate and submit a quantum intermediate representation (QIR) program to the Resource Estimator using the QIR generator [PyQIR](https://github.com/qir-alliance/pyqir). You can also find this sample in the [Tutorial: Submit a QIR program to the Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir).

The following sample notebooks assess requirements for scaling quantum computers in real-world scenarios. You can learn about the context of these samples in the paper [Accessing requirements for scaling quantum computers and their applications](https://aka.ms/AQ/RE/Paper).

- **Quantum dynamics**: This sample estimates the resources needed to simulate the quantum spin in a quantum magnet. 
- **Quantum chemistry**: This sample estimates the resources needed to analyze the activation energy of a ruthenium-based catalyst for carbon fixation, which could have implications for reversing the effects of global warming.
- **Factoring**: This sample estimates the resources needed to factorize a 2048-bit number, which could have implications in quantum cryptography.

> [!NOTE]
> If you have questions or run into any issue using Azure Quantum, bookmark [Azure Quantum office hours](https://aka.ms/AQ/OfficeHours) and join our open office hours every Thursday 8∶30 AM Pacific Time zone (PT).

## Next steps

- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Learn how the Resource Estimator works](xref:microsoft.quantum.learn-how-resource-estimator-works)
- [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator)
- [Tutorial: Submit a QIR program to the Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
- [Sample: Resource estimation with Q# and VS Code](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum/resource-estimation/integer-factorization-with-cli)
