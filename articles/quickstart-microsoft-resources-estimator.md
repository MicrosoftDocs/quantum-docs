---
author: azure-quantum-content
description: Learn how to submit a Q# sample to the Microsoft Quantum resource estimator to estimate the resources of a Q# program.
ms.author: quantumdocwriters
ms.date: 02/09/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: quickstart
no-loc: ['Python', '$$v', target, targets]
title: 'Quickstart: Learn to use the Microsoft Quantum resource estimator'
uid: microsoft.quantum.quickstarts.computing.resources-estimator
#customer intent: As a quantum programmer, I want to write programs that use the resource estimator. 
--- 

# Quickstart: Run your first resource estimate

In this quickstart, you learn how to use the Microsoft Quantum resource estimator to estimate the resources of a Q# program.  

## Prerequisites

- The latest version of [Visual Studio Code (VS Code)](https://code.visualstudio.com/download) or open [VS Code for the Web](https://vscode.dev/quantum).
- The latest version of the [Microsoft Quantum Development Kit (QDK) extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).

> [!TIP]
> You don't need to have an Azure account to run the resource estimator.

## Load a Q# sample program

1. In VS Code, open the **File** menu and choose **New File**.
1. Save the file as **RandomNum.qs**.
1. To open the menu of Q# samples, open **RandomNum.qs** and enter `sample`.
1. Choose **Random Bits sample** and save the file again.

## Run the resource estimator

The resource estimator offers [six predefined qubit parameters](xref:microsoft.quantum.overview.resources-estimator#physical-qubit-parameters), four of which have gate-based instruction sets and two that have a Majorana instruction set. The resource estimator also offers two [quantum error correction codes](xref:microsoft.quantum.overview.resources-estimator#quantum-error-correction-codes), `surface_code` and `floquet_code`.

In this example, you run the resource estimator with the `qubit_gate_us_e3` qubit parameter and the `surface_code` quantum error correction code.

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **QDK: Calculate Resource Estimates**. The **Qubit types** menu appears where you can select one or more qubit parameters.
1. For this example, select only **qubit_gate_us_e3**,  and then choose the **OK** button.
1. In the **Error budget** menu, enter 0.001.
1. In the **Friendly name for run** menu, press **Enter** to accept the default run name, which is based on the Q\# filename **RandomNum.qs**.

A new **QDK Estimates** tab opens with the resource estimator results for your random bit program.

## View the resource estimator results

The resource estimator provides multiple estimates for the same algorithm. Compare the estimates to understand the tradeoffs between the number of qubits and the runtime. To view the results and compare estimates, follow these steps:

1. Go to the **QDK Estimates** tab.
1. The **Results** dropdown displays a summary of the resource estimation. Choose the **menu icon** in the first row to select the columns that display. For example, select **Estimate type**, **Qubit type**, **Logical qubits**, **T factory fraction**, **Runtime**, and **Physical qubits**.

    :::image type="content" source="media/vscode-estimates-local-results-tab.png" alt-text="Screen shot showing how to display the menu to select the resource estimate outputs of your choice.":::

    The number of optimal combinations of *{number of qubits, runtime}* for your algorithm is in the **Estimate type** column of the results table. Each combination appears as a point in the space-time diagram. In this case, there's only one combination.

    > [!NOTE]
    > If you select more than one qubit parameter and error correction code in the configuration, then the results display in different rows for each selection. Choose a result row from the table to bring up the corresponding space-time diagram and report data.

1. The **Space-time diagram** dropdown shows the tradeoffs between the number of physical qubits and the runtime of the algorithm. In this case, the resource estimator finds one optimal combination out of many thousands of possible combinations. To view an estimation summary for a combination, hover over or select the corresponding point in the diagram. For more information, see [Space-time diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagram).

    :::image type="content" source="media/vscode-estimates-local-diagram-space-time.png" alt-text="Screen shot showing the space-time diagram of the resource estimator .":::

    > [!NOTE]
    > Select a point in the space-time diagram to see the space diagram and the details of the resource estimation that correspond to that point.

1. The **Space diagram** dropdown displays the distribution of physical qubits that your algorithm uses and the [T factories](xref:microsoft.quantum.concepts.tfactories). In this example, the algorithm qubits and the total qubits are the same because the algorithm doesn't use any T factory copies.

    :::image type="content" source="media/vscode-estimates-local-diagram.png" alt-text="Screen shot showing the space diagram of the resource estimator .":::

1. The **Resource Estimates** dropdown displays the full list of output data from the resource estimator. To view more information about each resource category, expand the corresponding dropdown. For example, expand the **Logical qubit parameters** group.

    | Logical qubit parameter    | Value                                                                        |
    |----------------------------|------------------------------------------------------------------------------|
    | QEC scheme                 | `surface_code`                                                               |
    | Code distance              | 5                                                                            |
    | Physical qubits            | 50                                                                           |
    | Logical cycle time         | 3 millisecs                                                                  |
    | Logical qubit error rate   | 3.00e-5                                                                      |
    | Crossing prefactor         | 0.03                                                                         |
    | Error correction threshold | 0.01                                                                         |
    | Logical cycle time formula | (4 \* `twoQubitGateTime` + 2 \* `oneQubitMeasurementTime`) \* `codeDistance` |
    | Physical qubits formula    | 2 \* `codeDistance` \* `codeDistance`                                        |

    > [!TIP]
    > Click **Show detailed rows** to display the description of each output of the report data.

    For more information, see [Retrieve the output of the Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data) for the resource estimator.

The full functionality of the resource estimator is beyond the scope of this quickstart. For more information, see [Different ways to run the Microsoft Quantum resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs).

> [!NOTE]
> If you have issues when you work with the resource estimator, then see the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator), or contact [AzureQuantumInfo@microsoft.com](mailto:AzureQuantumInfo@microsoft.com).

## Next steps

- [Understand the results of the resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Handle large programs with the resource estimator](xref:microsoft.quantum.resource-estimator-caching)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
