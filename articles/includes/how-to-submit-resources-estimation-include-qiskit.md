---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 03/15/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites for Qiskit in VS Code

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets`, and `qiskit` packages.  

    ```bash
    !pip install --upgrade qsharp qsharp-widgets qiskit
    ```

> [!TIP]
> You don't need to have an Azure account to run the Resource Estimator.


### Create a new Jupyter Notebook

1. In VS Code, select **View > Command palette** and select **Create: New Jupyter Notebook**. 
1. In the top-right, VS Code will detect and display the version of Python and the virtual Python environment that was selected for the notebook. If you have multiple Python environments, you may need to select a kernel using the kernel picker in the top right. If no environment was detected, see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information.


### Create the quantum algorithm

In this example, you create a quantum circuit for a multiplier based on the construction presented in [Ruiz-Perez and Garcia-Escartin (arXiv:1411.5949)](https://arxiv.org/abs/1411.5949) which uses the Quantum Fourier Transform to implement arithmetic. 

You can adjust the size of the multiplier by changing the `bitwidth` variable. The circuit generation is wrapped in a function that can be called with the `bitwidth` value of the multiplier. The operation will have two input registers, each the size of the specified `bitwidth`, and one output register that is twice the size of the specified `bitwidth`. The function will also print some logical resource counts for the multiplier extracted directly from the quantum circuit.

```python
from qiskit.circuit.library import RGQFTMultiplier 

def create_algorithm(bitwidth):
    print(f"[INFO] Create a QFT-based multiplier with bitwidth {bitwidth}")

    circ = RGQFTMultiplier(num_state_qubits=bitwidth)

    return circ
```
  
> [!NOTE]
> If you select a Python kernel and the `qiskit` module isn't recognized, try selecting a different Python environment in the kernel picker.

### Estimate the quantum algorithm
  
Create an instance of your algorithm using the `create_algorithm` function. You can adjust the size of the multiplier by changing the `bitwidth` variable.

```python
bitwidth = 4

circ = create_algorithm(bitwidth)
```

Estimate the physical resources for this operation using the default assumptions. You can use the `estimate` call, which is overloaded to accept a `QuantumCircuit` object from Qiskit. 

```python
from qsharp.estimator import EstimatorParams
from qsharp.interop.qiskit import estimate

params = EstimatorParams()
result = estimate(circ, params)
```

Alternatively, you can use the `ResourceEstimatorBackend` to perform the estimation as the existing backend does.

```python
from qsharp.interop.qiskit import ResourceEstimatorBackend
from qsharp.estimator import EstimatorParams

params = EstimatorParams()
backend = ResourceEstimatorBackend()

job = backend.run(circ, params)
result = job.result()
```

The `result` object contains the output of the resource estimation job. You can use the `EstimateDetails` function to display the results in a more readable format.

```python
from qsharp_widgets import EstimateDetails
EstimateDetails(result)
```

`EstimateDetails` function displays a table with the overall physical resource counts. You can inspect cost details by expanding the groups, which have more information. For more information, see [the full report data of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data#report-data).

For example, if you expand the **Logical qubit parameters** group, you can more easily see that the error correction code distance is 15. 

|Logical qubit parameter | Value |
|----|---|
|QEC scheme | surface_code |
|Code distance |15 |
|Physical qubits | 450 |
|Logical cycle time    | 6us |
|Logical qubit error rate  |     3.00E-10 |
|Crossing prefactor |       0.03|
|Error correction threshold   |      0.01|
|Logical cycle time formula | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
|Physical qubits formula	      | 2 * `codeDistance` * `codeDistance`|

In the **Physical qubit parameters** group you can see the physical qubit properties that were assumed for this estimation. For example, the time to perform a single-qubit measurement and a single-qubit gate are assumed to be 100 ns and 50 ns, respectively.

> [!TIP]
> You can also access the output of the Resource Estimator as a Python dictionary using the [result.data()](xref:qsharp.estimator.EstimatorResult) method. For example, to access the physical counts `result.data()["physicalCounts"]`.

#### Space diagrams

The distribution of physical qubits used for the algorithm and the T factories is a factor which may impact the design of your algorithm. You can visualize this distribution to better understand the estimated space requirements for the algorithm.

```python
from qsharp_widgets import SpaceChart

SpaceChart(result)
```

:::image type="content" source="../media/resource-estimator-space-diagram-qiskit.PNG" alt-text="Pie diagram showing the distribution of total physical qubits between algorithm qubits and T factory qubits. There's a table with the breakdown of number of T factory copies and number of physical qubits per T factory.":::

The space diagram shows the proportion of algorithm qubits and T factory qubits. Note that the number of T factory copies, 19, contributes to the number of physical qubits for T factories as $\text{T factories} \cdot \text{physical qubit per T factory}= 19 \cdot 18,000 = 342,000$.

For more information, see [T factory physical estimation](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-azure-quantum-resource-estimator).

### Change the default values and estimate the algorithm

When submitting a resource estimate request for your program, you can specify some optional parameters. Use the `jobParams` field to access all the values that can be passed to the job execution and see which default values were assumed:

```python
result.data()["jobParams"]
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

These are the target parameters that can be customized: 

* `errorBudget` - the overall allowed error budget
* [`qecScheme`](xref:qsharp.estimator.QECScheme) - the quantum error correction (QEC) scheme
* [`qubitParams`](xref:qsharp.estimator.QubitParams) - the physical qubit parameters
* [`constraints`](xref:qsharp.estimator.EstimatorConstraints) - the constraints on the component-level
* [`distillationUnitSpecifications`](xref:qsharp.estimator.DistillationUnitSpecification) - the specifications for T factories distillation algorithms

For more information, see [Target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters) for the Resource Estimator.

#### Change qubit model

Next, estimate the cost for the same algorithm using the Majorana-based qubit parameter `qubit_maj_ns_e6`

```python
qubitParams = {
    "name": "qubit_maj_ns_e6"
}

result = backend.run(circ, qubitParams).result()
```

You can inspect the physical counts programmatically. For example, you can explore details about the T factory that was created to execute the algorithm.

```python
result.data()["tfactory"]
```

```output
{'eccDistancePerRound': [1, 1, 5],
 'logicalErrorRate': 1.6833177305222897e-10,
 'moduleNamePerRound': ['15-to-1 space efficient physical',
  '15-to-1 RM prep physical',
  '15-to-1 RM prep logical'],
 'numInputTstates': 20520,
 'numModulesPerRound': [1368, 20, 1],
 'numRounds': 3,
 'numTstates': 1,
 'physicalQubits': 16416,
 'physicalQubitsPerRound': [12, 31, 1550],
 'runtime': 116900.0,
 'runtimePerRound': [4500.0, 2400.0, 110000.0]}
 ```

> [!NOTE]
> By default, runtime is shown in nanoseconds.

You can use this data to produce some explanations of how the T factories produce the required T states.

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
A single T factory produces 1.68e-10 T states with an error rate of (required T state error rate is 2.77e-08).
23 copies of a T factory are executed 523 time(s) to produce 12029 T states (12017 are required by the algorithm).
A single T factory is composed of 3 rounds of distillation:
- 1368 15-to-1 space efficient physical unit(s)
- 20 15-to-1 RM prep physical unit(s)
- 1 15-to-1 RM prep logical unit(s)
```

#### Change quantum error correction scheme

Now, rerun the resource estimation job for the same example on the Majorana-based qubit parameters with a floqued QEC scheme, [`qecScheme`](xref:qsharp.estimator.QECScheme).

```python
params = {
    "qubitParams": {"name": "qubit_maj_ns_e6"},
    "qecScheme": {"name": "floquet_code"}
}

result_maj_floquet = backend.run(circ, params).result()
EstimateDetails(result_maj_floquet)
```

#### Change error budget

Let's rerun the same quantum circuit with an `errorBudget` of 10%.

```python
params = {
    "errorBudget": 0.01,
    "qubitParams": {"name": "qubit_maj_ns_e6"},
    "qecScheme": {"name": "floquet_code"},
}
result_maj_floquet_e1 = backend.run(circ, params).result()
EstimateDetails(result_maj_floquet_e1)
```
