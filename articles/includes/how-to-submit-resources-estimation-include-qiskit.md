---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 10/21/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
---

## Resource estimation with Qiskit in Azure Quantum notebook

In this example, you'll create a quantum circuit for a multiplier based on the construction presented in [Ruiz-Perez and Garcia-Escartin (arXiv:1411.5949)](https://arxiv.org/abs/1411.5949) which uses the Quantum Fourier Transform to implement arithmetic. 

### Create a new Notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select your Azure Quantum workspace.
1. Under **Operations**, select **Notebooks**
2. Click on **My notebooks** and click **Add New**
3. In **Kernel Type**, select **IPython**.
4. Type a name for the file, and click **Create file**.

When your new notebook opens, it automatically creates the code for the first cell, based on your subscription and workspace information.

```python
from azure.quantum import Workspace
workspace = Workspace (
    subscription_id = <your subscription ID>, 
    resource_group = <your resource group>,   
    name = <your workspace name>,          
    location = <your location>        
    )
```

### Load the required imports

First, you'll need to import an additional modules from `azure-quantum` and `qiskit`.

Click **+ Code** to add a new cell, then add and run the following code:
```python
from azure.quantum.qiskit import AzureQuantumProvider
from qiskit import QuantumCircuit, transpile
from qiskit.circuit.library import RGQFTMultiplier
from qiskit.tools.monitor import job_monitor
from qiskit_qir import SUPPORTED_INSTRUCTIONS
```

Create a backend instance and set the **Azure Quantum Resource Estimator** as your target. 
```python
backend = provider.get_backend('microsoft.estimator')
```

### Create the quantum algorithm

You can adjust the size of the multiplier by changing the `bitwidth` variable. The circuit generation is wrapped in a function that can be called with the bitwidth of the multiplier. The circuit will have two input registers with that bitwidth, and one output register with the size of twice the bitwidth. 
The function will also print some logical resource counts for the multiplier extracted directly from the quantum circuit.

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
 
### Estimate the quantum algorithm
  
Create an instance of our algorithm using the `create_algorithm` function. You can adjust the size of the multiplier by changing the `bitwidth` variable.

```python
bitwidth = 4

circ = create_algorithm(bitwidth)
```
Estimate the physical resources for this operation using the default assumptions. You can submit the circuit to the Resource Estimation backend using the `run` method. 
Afterwards, you’ll run `job_monitor` to await completion.
```python
job = backend.run(circ)
job_monitor(job)
result = job.result()
result
```

This will create a table that shows the overall physical resource counts. You can further inspect cost details by collapsing the groups, which have more information. For example, if you collapse the *Logical qubit parameters* group, you can more easily see that the error correction code distance is 15. 

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

In the *Physical qubit parameters* group you can see the physical qubit properties that were assumed for this estimation. 
For example, see that the time to perform a single-qubit measurement and a single-qubit gate are assumed to be 100 ns and 50 ns, respectively.

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


> [!NOTE]
> You can access the output of the Azure Quantum Resource Estimator in JSON format using the `result.data()` method.
> 
> ```python
> result.data()
> ```

For more information, see [the full list of output data](xref:microsoft.quantum.overview.resources-estimator#output-data) of the Azure Quantum Resource Estimator.

### Change the default values and estimate the algorithm

When submitting a resource estimate request for your program, you can optionally specify some characteristics. Use the `jobParams` field to acccess all the values that can be passed to the job execution and see which default values were assumed:

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

You see that there are three top-level input parameters that can be customized: `errorBudget`, which is the overall allowed error, `qecScheme`, which is the quantum error correction (QEC) scheme, and `qubitParams`, which are the physical qubit parameters.

For more information about the pre-defined input parameters, see [Input parameters of the Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.resources-estimator#input-parameters).

#### Change qubit model

Let's estimate the cost for the same algorithm using the Majorana-based qubit parameter `qubit_maj_ns_e6`

```python
job = backend.run(circ,
    qubitParams={
        "name": "qubit_maj_ns_e6"
    })
job_monitor(job)
result = job.result()
result
```

Let's inspect the physical counts programmatically. For example, you can show all physical resource estimates and their breakdown using the `physicalCounts` field 
in the result data. This will show the logical qubit error and logical T state error rates required to match the error budget. By default runtimes are shown in nanoseconds.

```python
result.data()["physicalCounts"]
```
```output
{'breakdown': {'adjustedLogicalDepth': 6168,
  'cliffordErrorRate': 1e-06,
  'logicalDepth': 6168,
  'logicalQubits': 45,
  'numTfactories': 23,
  'numTfactoryRuns': 523,
  'numTsPerRotation': 17,
  'numTstates': 12017,
  'physicalQubitsForAlgorithm': 2250,
  'physicalQubitsForTfactories': 377568,
  'requiredLogicalQubitErrorRate': 1.200941538165922e-09,
  'requiredLogicalTstateErrorRate': 2.773848159551746e-08},
 'physicalQubits': 379818,
 'runtime': 61680000}
 ```

You can also explore details about the T factory that was created to execute this algorithm.

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
23 copie(s) of a T factory are executed 523 time(s) to produce 12029 T states (12017 are required by the algorithm).
A single T factory is composed of 3 rounds of distillation:
- 1368 15-to-1 space efficient physical unit(s)
- 20 15-to-1 RM prep physical unit(s)
- 1 15-to-1 RM prep logical unit(s)
```

#### Change quantum error correction scheme

Let's rerun the resource estimation job for the same runnignexample on the Majorana-based qubit parameters with a floqued QEC scheme, `qecScheme`.

```python
job = backend.run(circ,
    qubitParams={
        "name": "qubit_maj_ns_e6"
    },
    qecScheme={
        "name": "floquet_code"
    })
job_monitor(job)
result_maj_floquet = job.result()
result_maj_floquet
```

#### Change error budget

Let's rerun the same quantum circuit with an error budget `errorBudget` of 10%.

```python
job = backend.run(circ,
    qubitParams={
        "name": "qubit_maj_ns_e6"
    },
    qecScheme={
        "name": "floquet_code"
    },
    errorBudget=0.1)
job_monitor(job)
result_maj_floquet_e1 = job.result()
result_maj_floquet_e1
```

### Advanced analysis of the resource estimation results

Now that you’ve learned how to retrieve physical resource estimates and how to access them programmatically, you can perform more elaborate experiments. In this part, you'll evaluate the costs for the Quantum Fourier Transform based multiplier for different bitwidths, qubit parameters and quantum error correction codes.

Add a new cell and import the following required packages.

```python
from ipywidgets import IntProgress       # To show interactive progress while job submission
from IPython.display import HTML         # To display HTML inside Jupyter notebooks
import time                              # To sleep while polling for job completion
import numpy as np                       # To store experimental data from job results
from matplotlib import pyplot as plt     # To plot experimental results
from matplotlib.colors import hsv_to_rgb # To automatically find colors for plots
```

You'll use three of the six pre-defined qubit parameter models. For the Majorana-based model, use the Floquet code as pre-defined QEC scheme. Further, you are choosing bitwidths that are powers-of-2 ranging from 8 to 64.

```python
input_params = {
    "gate_ns": {"qubitParams": {"name": "qubit_gate_ns_e3"}},
    "gate_us": {"qubitParams": {"name": "qubit_gate_us_e4"}},
    "maj_ns": {"qubitParams": {"name": "qubit_maj_ns_e6"}, "qecScheme": {"name": "floquet_code"}}
}

bitwidths = [8, 16, 32, 64]

# We also store the names of the experiments; if you like to force some order
# you can explicitly initialize the list with names from the `input_params`
# dictionary.
names = list(input_params.keys())
```

> [!NOTE]
> When submittting jobs to the Azure Quantum Resource Estimator, you can't pass input parameters for operations.

Now, you submit the quantum circuit to the Azure Quantum Resource Estimator for all combinations of job parameters and input arguments.

Since the Azure Quantum Resource Estimator doesn't support input parameters for operations, you'll create a wrapper operation on the fly by inserting the bitwidth directly into the source code and then compiling it using `qsharp.compile`. This is a generic method that you can use to generate operations for resource estimation from Python.

You'll then submit this wrapper operation for each experiment configuration using `qsharp.azure.submit`. This will return a job object from which you can extract the Job ID and store it in the `jobs` dictionary.  Note that loop will not wait for jobs to be finished.

```python
# This initializes a `jobs` dictionary with the same keys as `input_params` and
# empty arrays as values
jobs = {name: [] for name in names}

progress_bar = IntProgress(min=0, max=len(input_params) * len(bitwidths) - 1)
display(progress_bar)

for bitwidth in bitwidths:
    callable = qsharp.compile(f"""operation EstimateMultiplication{bitwidth}() : Unit {{ EstimateMultiplication({bitwidth}); }}""");
    print(callable)

    for name, params in input_params.items():
        progress_bar.description = f"{bitwidth}: {name}"

        result = qsharp.azure.submit(callable, jobParams=params)
        jobs[name].append(result.id)
        progress_bar.value += 1
```

All jobs have been submitted now, but they may have not been finished.  The next code cell is extracting the resource estimation results from each job.  To
do that, it will first wait for a job to have succeeded, whenever it is still in a waiting or executing state.  All results are saved to a `results` dictionary, that has an array for each experiment name that has all corresponding results sorted by bitwidth.

```python
# This initializes a `results` dictionary with the same keys as `input_params`
# and empty arrays as values
results = {name: [] for name in names}

progress_bar = IntProgress(min=0, style={'description_width': '150px'}, max=len(input_params) * len(bitwidths) - 1)
display(progress_bar)

for name, job_ids in jobs.items():
    for job_id in job_ids:
        progress_bar.description = job_id

        # Wait until a job has succeeded or failed
        while True:
            status = qsharp.azure.status(job_id)
            if status.status in ["Waiting", "Executing"]:
                time.sleep(1) # Waits one second
            elif status.status == "Succeeded":
                break
            else:
                raise Exception(f"{status.status} job {job_id} in {name}")

        result = qsharp.azure.output(job_id)
        results[name].append(result)
        progress_bar.value += 1
```



Now that you have all results, let's extract some data from it. You can extract the number of physical qubits, the total runtime in nanoseconds, and the QEC code distance for the logical qubits. In addition to the total number of physical qubits, you can extract their breakdown into number of physical qubits for executing the algorithm and the number of physical qubits required for the T-factories that produce the required T states.

```python
names = list(input_params.keys())

qubits = np.zeros((len(names), len(bitwidths), 3))
runtime = np.zeros((len(names), len(bitwidths)))
distances = np.zeros((len(names), len(bitwidths)))

for bitwidth_index, bitwidth in enumerate(bitwidths):
    for name_index, name in enumerate(names):
        data = results[names[name_index]][bitwidth_index]

        qubits[(name_index, bitwidth_index, 0)] = data['physicalCounts']['physicalQubits']
        qubits[(name_index, bitwidth_index, 1)] = data['physicalCounts']['breakdown']['physicalQubitsForAlgorithm']
        qubits[(name_index, bitwidth_index, 2)] = data['physicalCounts']['breakdown']['physicalQubitsForTfactories']

        runtime[(name_index, bitwidth_index)] = data['physicalCounts']['runtime']

        distances[(name_index, bitwidth_index)] = data['logicalQubit']['eccDistance']
```

Finally, you can use [Matplotlib](https://matplotlib.org/) to plot the number of physical qubits and the runtime as bar plots, and the QEC code distances as a
scatter plot. For the physical qubits, the plot shows the partition into qubits required for the algorithm and qubits required for the T factories.

```python
fig, axs = plt.subplots(1, 3, figsize=(22, 6))

num_experiments = len(names)                         # Extract number of experiments form names (can be made smaller)
xs = np.arange(0, len(bitwidths))                    # Map bitwidths to numeric indexes for plotting
full_width = .8                                      # Total width of all bars (should be smaller than 1)
width = full_width / num_experiments                 # Fractional width of a single bar
xs_left = xs - (((num_experiments - 1) * width) / 2) # Starting x-coordinate for bars

# Split axes into qubit and runtime plots
ax_qubits, ax_runtime, ax_code_distance = axs

# Plot physical qubits
for i in range(num_experiments):
    ax_qubits.bar(xs_left + i * width, qubits[i,:,1], width, label=f"{names[i]} (Alg.)", color=hsv_to_rgb((i / num_experiments, 1.0, .8)))
    ax_qubits.bar(xs_left + i * width, qubits[i,:,2], width, bottom=qubits[i,:,1], label=f"{names[i]} (T fac.)", color=hsv_to_rgb((i / num_experiments, 0.3, .8)))
ax_qubits.set_title("#Physical qubits")
ax_qubits.set_xlabel("Bitwidth")
ax_qubits.set_xticks(xs)
ax_qubits.set_xticklabels(bitwidths)
ax_qubits.legend()

# Plot runtime
for i in range(num_experiments):
    ax_runtime.bar(xs_left + i * width, np.array(runtime[i,:]) / 1e6, width, label=names[i], color=hsv_to_rgb((i / num_experiments, 1.0, .8)))
ax_runtime.set_title("Runtime (ms)")
ax_runtime.set_xlabel("Bitwidth")
ax_runtime.set_xticks(xs)
ax_runtime.set_xticklabels(bitwidths)
ax_runtime.set_yscale("log")
ax_runtime.legend()

# Plot code distances
for i in range(num_experiments):
    ax_code_distance.scatter(xs, distances[i,:], label=names[i], marker=i, color=hsv_to_rgb((i / num_experiments, 1.0, 0.8)))
ax_code_distance.set_title("QEC code distance")
ax_code_distance.set_xlabel("Bitwidth")
ax_code_distance.set_xticks(xs)
ax_code_distance.set_xticklabels(bitwidths)
ax_code_distance.legend()

fig.suptitle("Resource estimates for multiplication")
plt.show()
```
The plot shows the results physical resource estimation of physical qubits, runtime and code distance for three differents settings of input parameters. 

:::image type="content" source="../media/plot-resource-estimation-multiplication.png" alt-text="Plot showing a bar chart of the physical resource estimation of physical qubits, runtime and code distance for three different settings of input parameters.":::

### How to show the resource estimation data in custom tables

The data required to display the output of the resource estimation in an HTML table is also part of the resource estimation results. You can access that
data using the `reportData` key from the results dictionary, and use this data to create your own tables.  

The next code block shows how to create a side-to-side comparison table for the _T-factory parameters_ from the resource
estimation results. This is done for all input parameters and a fixed bitwidth.

```python
bitwidth = 16 # Choose one of the bitwidths here
bitwidth_index = bitwidths.index(bitwidth)

# Get all results from all input parameters for given bitwidth
data = [results[name][bitwidth_index] for name in names]

# From each result get the group that contains data about "T-factory parameters"
groups = [group for group in result['reportData']['groups'] for result in data if group['title'] == "T-factory parameters"]

html = "<table><thead><tr><th></th>"

# Produce a table header using the experiment names
for name in names:
    html += f"<td>{name}</th>"

html += "</tr></thead><tbody>"

# Iterate through all entries (we extract the count from the first group, and then iterate through all of them)
for entry_index in range(len(groups[0]['entries'])):
    # Extract the entry label from the first group
    html += f"""<tr><td style="text-align: left; font-weight: bold">{groups[0]['entries'][entry_index]['label']}</td>"""

    # Iterate through all experiments
    for group_index in range(len(groups)):
        # The 'path' variable in the entry is a '/'-separated path to access the
        # result dictionary. So we start from the result dictionary of the
        # current experiment and then access the field based on the path part.
        # Eventually we obtain the final value.
        value = data[group_index]
        for key in groups[group_index]['entries'][entry_index]['path'].split("/"):
            value = value[key]
        html += f"<td>{value}</td>"
    html += "</tr>"

html += "</tbody></table>"

HTML(html)
```

|Name|gate_ns |	gate_us	|maj_ns|
|---|---|---|---|
|Physical qubits |	13520	|13520	|16416|
|Runtime|	67us 600ns|	33ms 833us 800ns|	16us 800ns|
|Number of T-states per run|	1	|1|	1|
|Number of input T-stats per run|	30	|30|	20520|
|Distillation rounds|	1|	1|	3|
|Modules per distillation round|	2|	2|	1368, 20, 1|
|Distillation modules|	15-to-1 space efficient logical|	15-to-1 space efficient logical|	15-to-1 space efficient physical, 15-to-1 RM prep physical, 15-to-1 RM prep logical|
|Distillation ECC distances|	13|	13	|1, 1, 3|
|Physical qubits per round|	6760|	6760|	12, 31, 1612|
|Runtime per round|	67us 600ns|	33ms 833us 800ns|	4us 500ns, 2us 400ns, 9us 900ns|
|Logical T-state error rate	|5.63e-8|	5.63e-8	4.97e-9|




