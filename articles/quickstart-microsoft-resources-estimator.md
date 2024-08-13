---
author: SoniaLopezBravo
description: Learn how to submit a Q# sample to the Azure Quantum Resource Estimator to estimate the resources of a Q# program.
ms.author: sonialopez
ms.date: 06/03/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: quickstart
no-loc: ['Python', '$$v', Quantum Intermediate Representation, target, targets]
title: 'Quickstart: Use the Local Resource Estimator'
uid: microsoft.quantum.quickstarts.computing.resources-estimator
#customer intent: As a quantum programmer, I want to write programs that use the Resource Estimator. 
--- 

# Quickstart: Run your first resource estimate

In this quickstart, you learn how to use the Azure Quantum Resource Estimator to estimate the resources of a Q# program.  

## Prerequisites

* The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
* The latest version of the [Azure Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Installing the QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-qdk-on-vs-code).

> [!TIP]
> You don't need to have an Azure account to run the local Resource Estimator. 

## Load a Q# sample program

1. In VS Code, select **File > New File** and save the file as **RandomNum.qs**. 
1. Open **RandomNum.qs** and type `sample`, then select **Random Bit sample** and save the file.

## Run the Resource Estimator

The Resource Estimator offers [six pre-defined qubit parameters](xref:microsoft.quantum.overview.resources-estimator#physical-qubit-parameters), four of which have gate-based instruction sets and two that have a Majorana instruction set. It also offers two [quantum error correction codes](xref:microsoft.quantum.overview.resources-estimator#quantum-error-correction-codes), `surface_code` and `floquet_code`.

In this example, you run the Resource Estimator using the `qubit_gate_us_e3` qubit parameter and the `surface_code` quantum error correction code. For more information, see [Target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters) for the Resource Estimator.

1. Select **View -> Command Palette**, or press **Ctrl+Shift+P**, and type “resource” which should bring up the **Q#: Calculate Resource Estimates** option. Select this option to open the Resource Estimator window.
1. You can select one or more **Qubit parameter + Error Correction code** types to estimate the resources for. For this example, select **qubit_gate_us_e3** and click **OK**.
1. Specify the **Error budget** or accept the default value 0.001. For this example, leave the default value and press **Enter**.
1. Press **Enter** to accept the default result name based on the filename, in this case, **RandomNum**.

## View the results

The Resource Estimator provides multiple estimates for the same algorithm, each showing tradeoffs between the number of qubits and the runtime. Understanding the tradeoff between runtime and system scale is one of the more important aspects of resource estimation.  

1. The result of the resource estimation is displayed in the **Q# Estimate** window.
1. The **Results** tab displays a summary of the resource estimation. **Click the icon** next to the first row to select the columns you want to display. You can select from run name, estimate type, qubit type, qec scheme, error budget, logical qubits, logical depth, code distance, T states, T factories, T factory fraction, runtime, rQOPS, and physical qubits.

    :::image type="content" source="media/vscode-estimates-local-results-tab.png" alt-text="Screen shot showing how to display the menu to select the resource estimate outputs of your choice.":::

    In the **Estimate type** column of the results table, you can see the number of optimal combinations of *{number of qubits, runtime}* for your algorithm. These combinations can be seen in the space-time diagram.

    > [!NOTE]
    > If you select more than one qubit parameters and error correction codes in the configuration, the results are displayed in different rows in the **Results** tab. Clicking on a result from the table brings up the corresponding space diagram and report data.

1. The **Space-time diagram** shows the tradeoffs between the number of physical qubits and the runtime of the algorithm. In this case, the Resource Estimator finds 1  optimal combination out of many thousands possible ones. You can hover over each {number of qubits, runtime} point to see the details of the resource estimation at that point. For more information, see [Space-time diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagram).

    :::image type="content" source="media/vscode-estimates-local-diagram-space-time.png" alt-text="Screen shot showing the space-time diagram of the Resource Estimator .":::

    > [!NOTE]
    > You need to **click on one point** of the space-time diagram, that is a {number of qubits, runtime} pair, to see the space diagram and the details of the resource estimation corresponding to that point.

1. The **Space diagram** tab displays the distribution of physical qubits used for the algorithm and the [T factories](xref:microsoft.quantum.concepts.tfactories). In this example, the algorithm qubits and the total qubits are the same because the algorithm does not use any T factory copies. For more information, see [Space-time diagrams](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagrams).

    :::image type="content" source="media/vscode-estimates-local-diagram.png" alt-text="Screen shot showing the space diagram of the Resource Estimator .":::

1. Finally, the **Resource Estimates** tab displays the full list of output data for the Resource Estimator. You can inspect cost details by collapsing the groups, which have more information. For example, collapse the **Logical qubit parameters** group. For more information, see [the report data of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data#report-data) for the Resource Estimator.

    |Logical qubit parameter| Value |
    |----|---|
    |QEC scheme                                                |                           surface_code |
    |Code distance                                                                       |            5 |
    |Physical qubits                                                                   |            50 |
    |Logical cycle time                                                                   |   3 millisecs |
    |Logical qubit error rate                                                            |     3.00E-5 |
    |Crossing prefactor                                                                    |       0.03|
    |Error correction threshold                                                             |      0.01|
    |Logical cycle time formula    | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
    |Physical qubits formula     |                                      2 * `codeDistance` * `codeDistance`|

    > [!TIP]
    > Click **Show detailed rows** to display the description of each output of the report data. 
    

The full functionality of the Resource Estimator is beyond the scope of this quickstart. For more information, see [Use the Resource Estimator with different SDKs and IDEs](xref:microsoft.quantum.submit-resource-estimation-jobs#resources-estimation-with-q-and-python).

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next steps

- [Understand the results of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Handle large programs with the Resource Estimator](xref:microsoft.quantum.resource-estimator-caching)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
