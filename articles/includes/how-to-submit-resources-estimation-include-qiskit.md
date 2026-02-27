---
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 02/11/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites for Qiskit in VS Code

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [VS Code](https://code.visualstudio.com/download) or open [VS Code for the Web](https://vscode.dev/quantum).
- Install the [QDK](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions in VS Code.
- The latest `qdk` Python library with the `jupyter` and `qiskit` extras.  

    ```bash
    pip install --upgrade "qdk[jupyter,qiskit]"
    ```

> [!TIP]
> You don't need to have an Azure account to run the resource estimator.

### Create a new Jupyter Notebook

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**.

VS Code detects and displays the version of Python and the virtual Python environment that you selected for the notebook. If you have multiple Python environments, then use the kernel picker to select that kernel that you want to use. If VS Code doesn't detect a Python environment, then see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information.

### Create the quantum algorithm

In this example, you create a quantum circuit for a multiplier that's based on the construction presented in [Ruiz-Perez and Garcia-Escartin (arXiv:1411.5949)](https://arxiv.org/abs/1411.5949), which uses the Quantum Fourier Transform to implement arithmetic.

To adjust the size of the multiplier, change the `bitwidth` variable. The circuit generation is wrapped in a function that you can call with the `bitwidth` value of the multiplier. The operation has two input registers, each the size of `bitwidth`, and one output register that's twice the size of `bitwidth`. The function also prints some logical resource counts for the multiplier extracted directly from the quantum circuit.

Run the following code in the first cell of your notebook:

```python
from qiskit.circuit.library import RGQFTMultiplier 

def create_algorithm(bitwidth):
    print(f"[INFO] Create a QFT-based multiplier with bitwidth {bitwidth}")

    circ = RGQFTMultiplier(num_state_qubits=bitwidth)

    return circ
```

### Estimate the quantum algorithm
  
To create an instance of your algorithm, use the `create_algorithm` function. To adjust the size of the multiplier, change the value of the `bitwidth` variable.

For example, run the following code in a new cell to create an instance of your algorithm with a `bitwidth` of 4:

```python
bitwidth = 4

circ = create_algorithm(bitwidth)
```

Use the default resource estimator input parameters to estimate the physical resources needed to run this operation. To get the output from the resource estimator, call the `estimate` method, which is overloaded to accept a `QuantumCircuit` object from Qiskit.

Run the following code in a new cell:

```python
from qdk import qsharp
from qsharp.estimator import EstimatorParams
from qsharp.interop.qiskit import estimate

params = EstimatorParams()
result = estimate(circ, params)
```

The `result` object contains the output of the resource estimation job. Use the `EstimateDetails` function to display the results in a readable format.

Run the following code in a new cell:

```python
from qdk.widgets import EstimateDetails

EstimateDetails(result)
```

The `EstimateDetails` function displays a list of dropdowns with the estimates for different physical resource categories. To get more information on each resource, expand the dropdown groups in the output. For more information, see [Retrieve the output of the Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data).

For example, expand the **Logical qubit parameter** group to see a table of values for that category, such as 15 for the error correction code distance.

| Logical qubit parameter    | Value                                                                        |
|----------------------------|------------------------------------------------------------------------------|
| QEC scheme                 | `surface_code`                                                               |
| Code distance              | 15                                                                           |
| Physical qubits            | 450                                                                          |
| Logical cycle time         | 6 microsecs                                                                  |
| Logical qubit error rate   | 3.00e-10                                                                     |
| Crossing prefactor         | 0.03                                                                         |
| Error correction threshold | 0.01                                                                         |
| Logical cycle time formula | (4 \* `twoQubitGateTime` + 2 \* `oneQubitMeasurementTime`) \* `codeDistance` |
| Physical qubits formula    | 2 \* `codeDistance` \* `codeDistance`                                        |

> [!TIP]
> You can also access the output of the resource estimator as a Python dictionary by using the [result.data()](xref:qsharp.estimator.EstimatorResult) method. For example, to access the physical counts, use `result.data()["physicalCounts"]`.

#### Space diagram

Your algorithm design might depend on how the physical qubits are distributed between algorithm qubits and T factory qubits. To visualize this distribution and better understand the estimated space requirements for your algorithm, run the following code in a new cell:

```python
from qdk.widgets import SpaceChart

SpaceChart(result)
```

:::image type="content" source="../media/resource-estimator-space-diagram-qiskit.png" alt-text="Pie diagram showing the distribution of total physical qubits between algorithm qubits and T factory qubits. There's a table with the breakdown of number of T factory copies and number of physical qubits per T factory.":::

The space diagram shows the proportion of algorithm qubits and T factory qubits. The number of T factory copies, in this case 19, contributes to the number of physical qubits that are used for T factories according to the following equation:

$$\text{T factories} \cdot \text{physical qubit per T factory}= 19 \cdot 18,000 = 342,000$$$

For more information, see [T factory physical estimation](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-microsoft-quantum-resource-estimator).

### Change the input parameters and compare resource estimates

When you submit a resource estimate request for your program, you can specify some optional parameters. To see all the parameters that you can pass to the job run, along with the default values that are used for each parameter, use the `jobParams` field.

Run the following code in a new cell:

```python
result.data()["jobParams"]
```

```output
{'qecScheme': {'name': 'surface_code',
  'errorCorrectionThreshold': 0.01,
  'crossingPrefactor': 0.03,
  'distanceCoefficientPower': 0,
  'logicalCycleTime': '(4 * twoQubitGateTime + 2 * oneQubitMeasurementTime) * codeDistance',
  'physicalQubitsPerLogicalQubit': '2 * codeDistance * codeDistance',
  'maxCodeDistance': 50},
 'errorBudget': 0.001,
 'qubitParams': {'instructionSet': 'GateBased',
  'name': 'qubit_gate_ns_e3',
  'oneQubitMeasurementTime': '100 ns',
  'oneQubitGateTime': '50 ns',
  'twoQubitGateTime': '50 ns',
  'tGateTime': '50 ns',
  'oneQubitMeasurementErrorRate': 0.001,
  'oneQubitGateErrorRate': 0.001,
  'twoQubitGateErrorRate': 0.001,
  'tGateErrorRate': 0.001,
  'idleErrorRate': 0.001},
 'constraints': {'maxDistillationRounds': 3},
 'estimateType': 'singlePoint'}
 ```

You can pass custom values for the following target parameters:

| Customizable input parameter     | Description                                              |
|----------------------------------|----------------------------------------------------------|
| `errorBudget`                    | The overall allowed error budget                         |
| `qecScheme`                      | The quantum error correction (QEC) scheme                |
| `qubitParams`                    | The physical qubit parameters                            |
| `constraints`                    | The component-level constraints                          |
| `distillationUnitSpecifications` | The specifications for T factory distillation algorithms |

For more information on resource estimator parameters, see [Target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters) and the `qdk.qsharp.estimator` [API reference](https://learn.microsoft.com/python/qsharp/qsharp.estimator).

#### Change the qubit model

Estimate the cost for the same algorithm, but use the Majorana-based qubit parameter `qubit_maj_ns_e6` instead. Run the following code in a new cell:

```python
qubitParams = {"name": "qubit_maj_ns_e6"}

result = estimate(circ, qubitParams)
```

Call the `data` method to programmatically inspect resource estimates. For example, run the following code in a new cell to explore details about the T factory that's created to run the program.

```python
result.data()["tfactory"]
```

```output
{'physicalQubits': 18000,
 'runtime': 78000,
 'numTstates': 1,
 'numInputTstates': 30,
 'numRounds': 1,
 'numUnitsPerRound': [2],
 'unitNamePerRound': ['15-to-1 space efficient'],
 'codeDistancePerRound': [15],
 'physicalQubitsPerRound': [18000],
 'runtimePerRound': [78000],
 'logicalErrorRate': 3.713e-08}
 ```

> [!NOTE]
> The estimated runtime is shown in nanoseconds by default.

You can use this data to explain how the T factories produce the required T states. For example, run the following code in a new cell:

```python
data = result.data()
tfactory = data["tfactory"]
breakdown = data["physicalCounts"]["breakdown"]
producedTstates = breakdown["numTfactories"] * breakdown["numTfactoryRuns"] * tfactory["numTstates"]

print(f"""A single T factory produces {tfactory["logicalErrorRate"]:.2e} T states with an error rate of (required T state error rate is {breakdown["requiredLogicalTstateErrorRate"]:.2e}).""")
print(f"""{breakdown["numTfactories"]} copie(s) of a T factory are executed {breakdown["numTfactoryRuns"]} time(s) to produce {producedTstates} T states ({breakdown["numTstates"]} are required by the algorithm).""")
print(f"""A single T factory is composed of {tfactory["numRounds"]} rounds of distillation:""")
for round in range(tfactory["numRounds"]):
    print(f"""- {tfactory["numUnitsPerRound"][round]} {tfactory["unitNamePerRound"][round]} unit(s)""")
```

```output
A single T factory produces 3.71e-08 T states with an error rate of (required T state error rate is 3.99e-08).
19 copie(s) of a T factory are executed 441 time(s) to produce 8379 T states (8362 are required by the algorithm).
A single T factory is composed of 1 rounds of distillation:
- 2 15-to-1 space efficient unit(s)
```

#### Change the quantum error correction scheme

Rerun the resource estimation job for the same example on the Majorana-based qubit parameter, but with a floquet QEC scheme instead. Run the following code in a new cell:

```python
params = {
    "qubitParams": {"name": "qubit_maj_ns_e6"},
    "qecScheme": {"name": "floquet_code"}
}

result_maj_floquet = estimate(circ, params)
EstimateDetails(result_maj_floquet)
```

#### Change the error budget

Rerun the same quantum circuit with an `errorBudget` of 10%.

```python
params = {
    "errorBudget": 0.01,
    "qubitParams": {"name": "qubit_maj_ns_e6"},
    "qecScheme": {"name": "floquet_code"},
}
result_maj_floquet_e1 = backend.run(circ, params).result()
EstimateDetails(result_maj_floquet_e1)
```

Compare the output to see how the different combinations of qubit model, error correction scheme, and error budget parameters affect the estimation of the resources needed to run your algorithm on a real quantum computer.
