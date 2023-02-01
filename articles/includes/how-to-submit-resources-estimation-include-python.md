---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 01/31/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
---

## Resource estimation with Q# and Python

In this example, you'll create a multiplier and estimate its costs on a fault-tolerant quantum computer.

### Create a new Notebook in your workspace

1. Log in to the [Azure portal](https://portal.azure.com/) and select the workspace from the previous step.
1. In the left blade, select **Notebooks**.
1. Click **My Notebooks** and click **Add New**.
1. In **Kernel Type**, select **IPython**.
1. Type a name for the file, and click **Create file**. 

When your new notebook opens, it automatically creates the code for the first cell, based on your subscription and workspace information.

```py
from azure.quantum import Workspace
workspace = Workspace (
    subscription_id = <your subscription ID>, 
    resource_group = <your resource group>,   
    name = <your workspace name>,          
    location = <your location>        
    )
```

### Load the required imports

You'll need to import some modules. Import the `Microsoft.Quantum.Numerics` package that is required for this example algorithm, and select the Resource Estimator as the target. 

Click **+ Code** to add a new cell, then add and run the following code:

```python
import qsharp
qsharp.packages.add("Microsoft.Quantum.Numerics") # To create the multiplier for this example
qsharp.azure.target("microsoft.estimator") # To set Resource Estimator as target
```

### Create the quantum algorithm

Next, create a multiplier using the [MultiplyI](/qsharp/api/qsharp/microsoft.quantum.arithmetic.multiplyi) operation.  You can configure the size of the multiplier with a `bitwidth` parameter. The operation will have two input registers, each the size of the specified `bitwidth`, and one output register that is twice the size of the specified `bitwidth`.

Click **+ Code** to add a new cell, then add the following Q# code using the [%%qsharp magic command](xref:microsoft.quantum.how-to.python-local#the-qsharp-magic-command).

```python
%%qsharp

open Microsoft.Quantum.Arithmetic;

operation EstimateMultiplication(bitwidth : Int) : Unit {
    use factor1 = Qubit[bitwidth];
    use factor2 = Qubit[bitwidth];
    use product = Qubit[2 * bitwidth];
    
    MultiplyI(LittleEndian(factor1), LittleEndian(factor2), LittleEndian(product));
}
```

> [!NOTE]
> You can submit physical resource estimation jobs for algorithms that have no T states, but that have at least one measurement. 

### Estimate the quantum algorithm

In order to estimate an operation using the Resource Estimator, it must have a `Unit` return value. You can create a new instance for a specific bitwidth, for example `8` in this case.

```python
%%qsharp

operation EstimateMultiplication8() : Unit {
    EstimateMultiplication(8);
}
```

> [!IMPORTANT]
> To submit an Q# operation to the Resource Estimator, the operation must have a `Unit` return value. 

Now, estimate the physical resources for this operation using the default assumptions. You can submit the operation to the Resource Estimator target using the `qsharp.azure.execute` function.

```python
result = qsharp.azure.execute(EstimateMultiplication8)
result
```

The `qsharp.azure.execute` function creates a table that shows the overall physical resource counts. You can inspect cost details by collapsing the groups, which have more information. For example, if you collapse the *Logical qubit parameters* group, you can see that the error correction code distance is 13. 

|Logical qubit parameter | Value |
|----|---|
|QEC scheme  |surface_code |
|Code distance  |  13 |
|Physical qubits| 338 |
|Logical cycle time |   5us 200ns |
|Logical qubit error rate  |     3.00E-9 |
|Crossing prefactor  |0.03|
|Error correction threshold |      0.01|
|Logical cycle time formula | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
|Physical qubits formula|2 * `codeDistance` * `codeDistance`|

In the *Physical qubit parameters* group, you can see the physical qubit properties that were assumed for this estimation. 
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

> [!NOTE]
> You can access the output of the Azure Quantum Resources Estimator in JSON format using the `result.data()` method.
> 
> ```python
> result.data()
> ```

For more information, see [the full list of output data](xref:microsoft.quantum.overview.resources-estimator#output-data) of the Resource Estimator.

### Change the default values and estimate the algorithm

When submitting a resource estimate request for your program, you can specify some optional parameters. Use the `jobParams` field to access all the values that can be passed to the job execution and see which default values were assumed:

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

There are three top-level input parameters that can be customized: 

* `errorBudget` - the overall allowed error budget
* `qecScheme` - the quantum error correction (QEC) scheme
* `qubitParams` - the physical qubit parameters 

For more information, see [Input parameters](xref:microsoft.quantum.overview.resources-estimator#input-parameters) for the Resource Estimator.

#### Change qubit model

Next, estimate the cost for the same algorithm using the Majorana-based qubit parameter, `qubitParams`, "qubit_maj_ns_e6".

```python
result = qsharp.azure.execute(EstimateMultiplication8,
            jobParams={
                "qubitParams": {
                    "name": "qubit_maj_ns_e6"
                }})
result
```

Inspect the physical counts programmatically. For example, you can show all physical resource estimates and its breakdown using the `physicalCounts` field in the result's data. Here you'll learn what logical qubit error and logical T state error rates are required to match the error budget. By default, runtimes are shown in nanoseconds.

```python
result['physicalCounts']
```

```output
{'breakdown': {'adjustedLogicalDepth': 608,
  'cliffordErrorRate': 1e-06,
  'logicalDepth': 608,
  'logicalQubits': 84,
  'numTfactories': 10,
  'numTfactoryRuns': 80,
  'numTsPerRotation': None,
  'numTstates': 800,
  'physicalQubitsForAlgorithm': 4200,
  'physicalQubitsForTfactories': 164160,
  'requiredLogicalQubitErrorRate': 9.790100250626566e-09,
  'requiredLogicalTstateErrorRate': 6.25e-07},
 'physicalQubits': 168360,
 'runtime': 6080000}
 ```
 
You can also explore details about the T factory that was created to execute the algorithm.
 
```python
result['tfactory']
```

```output
{'eccDistancePerRound': [1, 1, 3],
 'logicalErrorRate': 2.5244447992120037e-07,
 'unitNamePerRound': ['15-to-1 space efficient physical',
  '15-to-1 RM prep physical',
  '15-to-1 RM prep logical'],
 'numInputTstates': 20520,
 'numUnitsPerRound': [1368, 20, 1],
 'numRounds': 3,
 'numTstates': 1,
 'physicalQubits': 16416,
 'physicalQubitsPerRound': [12, 31, 558],
 'runtime': 72900.0,
 'runtimePerRound': [4500.0, 2400.0, 66000.0]}
```

You can use this data to produce some explanations of how the T factories produce the required T states.

```python
tfactory = result["tfactory"]
breakdown = result["physicalCounts"]["breakdown"]
producedTstates = breakdown["numTfactories"] * breakdown["numTfactoryRuns"] * tfactory["numTstates"]

print(f"""A single T factory produces {tfactory["numTstates"]} T state(s) with an error rate of {tfactory["logicalErrorRate"]:.2e} (required T state error rate is {breakdown["requiredLogicalTstateErrorRate"]:.2e}).""")
print(f"""{breakdown["numTfactories"]} copie(s) of a T factory are executed {breakdown["numTfactoryRuns"]} time(s) to produce {producedTstates} T states ({breakdown["numTstates"]} are required by the algorithm).""")
print(f"""A single T factory is composed of {tfactory["numRounds"]} rounds of distillation:""")
for round in range(tfactory["numRounds"]):
    print(f"""- {tfactory["numModulesPerRound"][round]} {tfactory["moduleNamePerRound"][round]} unit(s)""")
```

```output
A single T factory produces 1 T state(s) with an error rate of 2.52e-07 (required T state error rate is 6.25e-07).
10 copie(s) of a T factory are executed 80 time(s) to produce 800 T states (800 are required by the algorithm).
A single T factory is composed of 3 rounds of distillation:
- 1368 15-to-1 space efficient physical unit(s)
- 20 15-to-1 RM prep physical unit(s)
- 1 15-to-1 RM prep logical unit(s)
```

#### Change quantum error correction scheme

You can rerun the resource estimation job for the same example on the Majorana-based qubit parameters with a floqued QEC scheme, `qecScheme`.

```python
result_maj_floquet = qsharp.azure.execute(EstimateMultiplication8,
            jobParams={
                "qubitParams": {
                    "name": "qubit_maj_ns_e6"
                },
                "qecScheme": {
                    "name": "floquet_code"
                }})
result_maj_floquet
```

#### Change error budget

Next, rerun the same quantum circuit with an `errorBudget` of 10%.

```python
result_maj_floquet_e1 = qsharp.azure.execute(EstimateMultiplication8,
            jobParams={
                "qubitParams": {
                    "name": "qubit_maj_ns_e6"
                },
                "qecScheme": {
                    "name": "floquet_code"
                },
                "errorBudget": 0.1})
result_maj_floquet_e1
```

### Advanced analysis of the resource estimation results

Now that you’ve learned how to retrieve physical resource estimates and how to access them programmatically, you can perform more elaborate experiments. In this part, you'll evaluate the costs for the Quantum Fourier Transform based multiplier for different bitwidths, qubit parameters, and quantum error correction codes.

Add a new cell and import the following required packages.

```python
from ipywidgets import IntProgress       # To show interactive progress while job submission
from IPython.display import HTML         # To display HTML inside Jupyter notebooks
import time                              # To sleep while polling for job completion
import numpy as np                       # To store experimental data from job results
from matplotlib import pyplot as plt     # To plot experimental results
from matplotlib.colors import hsv_to_rgb # To automatically find colors for plots
```

You'll use two of the six pre-defined qubit parameter models, and one customized model based on the model qubit_gate_nds_e3, in which you'll set the error rates to 
$10^{-3.5}$. In your own experiments, you can change the number of items, and also the parameters. You may use other pre-defined models or define custom models. 

Further, you are choosing bitwidths that are powers-of-2, ranging from 8 to 64.

```python
input_params = {
    "Gate-based ns, 10⁻³": {"qubitParams": {"name": "qubit_gate_ns_e3"}},
    "Gate-based ns, 10⁻³ᐧ⁵": {"qubitParams": {"name": "qubit_gate_ns_e3", "oneQubitMeasurementErrorRate": 0.00032, "oneQubitGateErrorRate": 0.00032, "twoQubitGateErrorRate": 0.00032, "tGateErrorRate": 0.00032}},
    "Gate-based ns, 10⁻⁴": {"qubitParams": {"name": "qubit_gate_ns_e4"}}
}

bitwidths = [8, 16, 32, 64]

# We also store the names of the experiments; if you like to force some order
# you can explicitly initialize the list with names from the `input_params`
# dictionary.
names = list(input_params.keys())

bitwidths = [8, 16, 32, 64]

# We also store the names of the experiments; if you like to force some order
# you can explicitly initialize the list with names from the `input_params`
# dictionary.
names = list(input_params.keys())
```

> [!NOTE]
> When submitting jobs to the Resource Estimator, you can't pass input parameters for operations.

Now, you submit the quantum circuit to the Azure Quantum Resource Estimator for all combinations of job parameters and input arguments.

Since the Resource Estimator doesn't support input parameters for operations, you'll create a wrapper operation on the fly by inserting the bitwidth directly into the source code and then compiling it using `qsharp.compile`. This is a generic method that you can use to generate operations for resource estimation from Python.

Next, submit this wrapper operation for each experiment configuration using `qsharp.azure.submit`. This will return a `job` object from which you can extract the `job_id` and store it in the `jobs` dictionary.  Note that the loop will not wait for jobs to be finished.

```python
# This initializes a `jobs` dictionary with the same keys as `input_params` and
# empty arrays as values
jobs = {name: [] for name in names}

progress_bar = IntProgress(min=0, max=len(input_params) * len(bitwidths) - 1, style={'description_width': 'initial'}, layout=Layout(width='75%'))
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
do that, it first waits for a job to have succeeded, whenever it is still in a waiting or executing state.  All results are saved to a `results` dictionary, that has an array for each experiment name that has all corresponding results sorted by bitwidth.

```python
# This initializes a `results` dictionary with the same keys as `input_params`
# and empty arrays as values
results = {name: [] for name in names}

progress_bar = IntProgress(min=0, max=len(input_params) * len(bitwidths) - 1, style={'description_width': 'initial'}, layout=Layout(width='75%'))
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

Now that you have all the results, you can extract some data from it, such as the number of physical qubits, the total runtime in nanoseconds, and the QEC code distance for the logical qubits. In addition to the total number of physical qubits, you can extract their breakdown into number of physical qubits for executing the algorithm, and the number of physical qubits required for the T factories that produce the required T states.

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

        distances[(name_index, bitwidth_index)] = data['logicalQubit']['codeDistance']
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
ax_runtime.legend()

# Plot code distances
for i in range(num_experiments):
    ax_code_distance.scatter(xs, distances[i,:], label=names[i], marker='*', color=hsv_to_rgb((i / num_experiments, 1.0, 0.8)))
ax_code_distance.set_title("QEC code distance")
ax_code_distance.set_xlabel("Bitwidth")
ax_code_distance.set_xticks(xs)
ax_code_distance.set_xticklabels(bitwidths)
ax_code_distance.legend()

fig.suptitle("Resource estimates for multiplication")
plt.show()
```

:::image type="content" source="../media/plot-resource-estimation-multiplication.png" alt-text="Plot showing a bar chart of the physical resource estimation of physical qubits, runtime and code distance for three different settings of input parameters.":::

### How to show the resource estimation data in custom tables

The data required to display the output of the resource estimation in an HTML table is also part of the resource estimation results. You can access that
data using the `reportData` key from the results dictionary, and use this data to create your own tables.  

The next code block shows how to create a side-to-side comparison table for the _T factory parameters_ from the resource
estimation results. This is done for all input parameters and a fixed bitwidth.

```python
bitwidth = 16 # Choose one of the bitwidths here
bitwidth_index = bitwidths.index(bitwidth)

# Get all results from all input parameters for given bitwidth
data = [results[name][bitwidth_index] for name in names]

# From each result get the group that contains data about "T-factory parameters"
groups = [group for result in data for group in result['reportData']['groups'] if group['title'] == "T factory parameters"]

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

| Name |Gate-based ns, 10⁻³	|	Gate-based ns, 10⁻³ᐧ⁵	|Gate-based ns, 10⁻⁴|
|---|---|---|---|
|Physical qubits |	13520	|3240	|1960|
|Runtime|	67us 600ns|	46us 800ns|	36us 400ns|
|Number of ouput T states per run|	1	|1|	1|
|Number of input T states per run|	30	|15|15|
|Distillation rounds|	1|	1|	1|
|Distillation units per round|	2|	1|	1|
|Distillation units|	15-to-1 space efficient logical|	15-to-1 space efficient logical|	15-to-1 space efficient logical|
|Distillation code distances|	13|	9|7|
|Number of physical qubits per round|	13520|	3240|1960|
|Runtime per round|	67us 600ns|	46us 800ns|	36us 400ns|
|Logical T state error rate	|5.63e-8|	8.29e-9	| 2.16e-9|
