---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 03/15/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites for Qiskit

- An Azure account with an active subscription. If you don’t have an Azure account, register for free and sign up for a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/).
- An Azure Quantum workspace. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

## Enable the Azure Quantum Resource Estimator target in your workspace

The Resource Estimator is a target of the Microsoft Quantum Computing provider. If you have created a workspace since the release of the Resource Estimator, the Microsoft Quantum Computing provider was added to your workspace automatically.

If you are using an *existing* Azure Quantum workspace:

1. Open your workspace in the [Azure portal](https://portal.azure.com/).
2. On the left panel, under **Operations**, select **Providers**.
3. Select **+ Add a provider**.
4. Select **+ Add** for **Microsoft Quantum Computing**.
5. Select **Learn & Develop** and select **Add**.

## Create a new notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. Under **Operations**, select **Notebooks**
1. Click on **My notebooks** and click **Add New**
1. In **Kernel Type**, select **IPython**.
1. Type a name for the file, and click **Create file**.

When your new notebook opens, it automatically creates the code for the first cell, based on your subscription and workspace information.

```python
from azure.quantum import Workspace
workspace = Workspace ( 
    resource_id = "", # Your resource_id 
    location = ""  # Your workspace location (for example, "westus") 
)
```

> [!NOTE]
> Unless otherwise noted, you should run each cell in order as you create it to avoid any compilation issues. 

Click the triangular "play" icon to the left of the cell to run the code. 

### Load the required imports

First, you'll need to import an additional modules from [azure-quantum](xref:azure.quantum) and [`qiskit`](xref:azure.quantum.qiskit).

Click **+ Code** to add a new cell, then add and run the following code:

```python
from azure.quantum.qiskit import AzureQuantumProvider
from qiskit import QuantumCircuit, transpile
from qiskit.circuit.library import RGQFTMultiplier
```

## Connect to the Azure Quantum service

Next, create an [AzureQuantumProvider](xref:azure.quantum.qiskit.AzureQuantumProvider) object using the [`workspace`](xref:azure.quantum.Workspace) object from the previous cell to connect to your Azure Quantum workspace. You create a backend instance and set the Resource Estimator as your target.

```python
provider = AzureQuantumProvider(workspace)
backend = provider.get_backend('microsoft.estimator')
```

### Create the quantum algorithm

In this example, you create a quantum circuit for a multiplier based on the construction presented in [Ruiz-Perez and Garcia-Escartin (arXiv:1411.5949)](https://arxiv.org/abs/1411.5949) which uses the Quantum Fourier Transform to implement arithmetic. 

You can adjust the size of the multiplier by changing the `bitwidth` variable. The circuit generation is wrapped in a function that can be called with the `bitwidth` value of the multiplier. The operation will have two input registers, each the size of the specified `bitwidth`, and one output register that is twice the size of the specified `bitwidth`. The function will also print some logical resource counts for the multiplier extracted directly from the quantum circuit.

```python
def create_algorithm(bitwidth):
    print(f"[INFO] Create a QFT-based multiplier with bitwidth {bitwidth}")
    
    # Print a warning for large bitwidths that will require some time to generate and
    # transpile the circuit.
    if bitwidth > 18:
        print(f"[WARN] It will take more than one minute generate a quantum circuit with a bitwidth larger than 18")

    circ = RGQFTMultiplier(num_state_qubits=bitwidth, num_result_qubits=2 * bitwidth)

    # One could further reduce the resource estimates by increasing the optimization_level,
    # however, this will also increase the runtime to construct the algorithm.  Note, that
    # it does not affect the runtime for resource estimation.
    print(f"[INFO] Decompose circuit into intrinsic quantum operations")

    circ = transpile(circ, basis_gates=SUPPORTED_INSTRUCTIONS, optimization_level=0)

    # print some statistics
    print(f"[INFO]   qubit count: {circ.num_qubits}")
    print("[INFO]   gate counts")
    for gate, count in circ.count_ops().items():
        print(f"[INFO]   - {gate}: {count}")

    return circ
  ```
  
> [!NOTE]
> You can submit physical resource estimation jobs for algorithms that have no T states, but that have at least one measurement. 

### Estimate the quantum algorithm
  
Create an instance of your algorithm using the `create_algorithm` function. You can adjust the size of the multiplier by changing the `bitwidth` variable.

```python
bitwidth = 4

circ = create_algorithm(bitwidth)
```

Estimate the physical resources for this operation using the default assumptions. You can submit the circuit to the Resource Estimator backend using the `run` method, and then run `job.result()` to wait for the job to complete and return the results.

```python
job = backend.run(circ)
result = job.result()
result
```

This creates a table that shows the overall physical resource counts. You can inspect cost details by collapsing the groups, which have more information. 

> [!TIP]
> For a more compact version of the output table, you can use `result.summary`.

For example, if you collapse the *Logical qubit parameters* group, you can more easily see that the error correction code distance is 15. 

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

In the *Physical qubit parameters* group you can see the physical qubit properties that were assumed for this estimation. For example, the time to perform a single-qubit measurement and a single-qubit gate are assumed to be 100 ns and 50 ns, respectively.

> [!TIP]
> You can also access the output of the Resource Estimator as a Python dictionary using the [result.data()](xref:qsharp.estimator.EstimatorResult)  method.

For more information, see [the full list of output data](xref:microsoft.quantum.overview.resources-estimator-output.data) for the Resource Estimator.

#### Space diagrams

The distribution of physical qubits used for the algorithm and the T factories is a factor which may impact the design of your algorithm. You can visualize this distribution to better understand the estimated space requirements for the algorithm.

```python
result.diagram.space
```

:::image type="content" source="../media/resource-estimator-space-diagram-qiskit.PNG" alt-text="Pie diagram showing the distribution of total physical qubits between algorithm qubits and T factory qubits. There's a table with the breakdown of number of T factory copies and number of physical qubits per T factory.":::

The space diagram shows the proportion of algorithm qubits and T factory qubits. Note that the number of T factory copies, 28, contributes to the number of physical qubits for T factories as $\text{T factories} \cdot \text{physical qubit per T factory}= 28 \cdot 18,000 = 504,000$.

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
job = backend.run(circ,
    qubitParams={
        "name": "qubit_maj_ns_e6"
    })
result = job.result()
result
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
    print(f"""- {tfactory["numModulesPerRound"][round]} {tfactory["moduleNamePerRound"][round]} unit(s)""")
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
job = backend.run(circ,
    qubitParams={
        "name": "qubit_maj_ns_e6"
    },
    qecScheme={
        "name": "floquet_code"
    })
result_maj_floquet = job.result()
result_maj_floquet
```

#### Change error budget

Let's rerun the same quantum circuit with an `errorBudget` of 10%.

```python
job = backend.run(circ,
    qubitParams={
        "name": "qubit_maj_ns_e6"
    },
    qecScheme={
        "name": "floquet_code"
    },
    errorBudget=0.1)
result_maj_floquet_e1 = job.result()
result_maj_floquet_e1
```
