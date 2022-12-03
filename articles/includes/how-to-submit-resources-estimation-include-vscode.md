---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 09/21/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
---

## Resource estimation with Q# in Visual Studio Code

In this example, you'll create a multiplier and estimate its costs on a fault-tolerant quantum computer. 

### Prerequisites

- Install the latest version of the [Quantum Development Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.quantum-devkit-vscode).
- Install [.NET SDK 6.0](https://dotnet.microsoft.com/en-us/download).
- Install the [Azure CLI and the quantum CLI extension](xref:microsoft.quantum.install-qdk.overview#azure-cli).

### Connect to your Azure Quantum workspace

1. **Open** a terminal with access to Azure CLI.
2. **Log in** to Azure using your credentials. You'll get a list of subscriptions associated with your account.

    ```azurecli
    az login
    ```

3. Specify the **Subscription** you want to use from those associated with your Azure account. You can also find your subscription ID in the overview of your workspace in Azure portal.

    ```azurecli
    az account set -s <Your subscription ID>
    ```

4. Set your **Resource group, workspace name, and location**:

    ```azurecli
    az quantum workspace set -g <resource-group> -w <workspace-name> -l <location> -o table
    ```

### Create the quantum algorithm

You'll create a multiplier using the [MultiplyI](/qsharp/api/qsharp/microsoft.quantum.arithmetic.multiplyi) operation.  You can configure the size of the multiplier with a `bitwidth` parameter. The operation will have two input registers, each the size of the specified `bitwidth`, and one output register that is twice the size of the specified `bitwidth`.

Create a new project in Visual Studio Code.

1. Select **View** -> **Command Palette** -> **Q#: Create New Project**.
2. Select **Standalone console application**.
3. Select a location to save the project, name it **EstimateMultiplication**, and select **Create Project**.
4. When the project is successfully created, select **Open new project...** in the
   lower right. This generates two files: the project file, *EstimateMultiplication.csproj*, and a Q# program template, *Program.qs*.
5. In *EstimateMultiplication.csproj*, if it does not already exist, add the \<ItemGroup\> reference to Microsoft.Quantum.Arithmetic:

    ```xml
    <Project Sdk="Microsoft.Quantum.Sdk/X.XX.XXXXXX">
     
      <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
      </PropertyGroup>
     
      <ItemGroup>
        <PackageReference Include="Microsoft.Quantum.Arithmetic" Version="X.XX.XXXXXX" />
      </ItemGroup>
     
    </Project>
    ```

6. **Replace** the contents of the *Program.qs* file with the following code:

    ```qsharp
    namespace QFTmultiplier {
    
        open Microsoft.Quantum.Arithmetic;
        
        @EntryPoint()
        operation EstimateMultiplication() : Unit {
            let bitwidth = 4;
    
            use factor1 = Qubit[bitwidth];
            use factor2 = Qubit[bitwidth];
            use product = Qubit[2 * bitwidth];
    
            MultiplyI(LittleEndian(factor1), LittleEndian(factor2), LittleEndian(product));
        }
    }
    ```

### Estimate the quantum algorithm

1. Open a terminal with access to **Azure CLI**. 
2. Copy the following command to submit a job to the Resource Estimator target.

    ```azurecli
    az quantum job submit --target-id microsoft.estimator -o json --query id
    ```

3. The output will contain the job ID. Copy the job ID and request the output of the job using `-o table` to display the output in the CLI as a table, or with `-o json` to display the output in JSON format.

    ```azurecli
    az quantum job output -j <job-id> -o table
    ```

4. The resulting table shows the overall physical resource counts. You can inspect cost details by collapsing the groups, which have more information. For example, if you collapse the *Logical qubit parameters* group, you can more easily see that the error correction code distance is 13. 

|Logical qubit parameter|Value|
|----|---|
|QEC scheme | surface_code |
|Code distance  | 13 |
|Physical qubits    |            338 |
|Logical cycle time   |   5us 200ns |
|Logical qubit error rate  |     3.00E-9 |
|Crossing prefactor | 0.03|
|Error correction threshold |  0.01|
|Logical cycle time formula | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
|Physical qubits formula |2 * `codeDistance` * `codeDistance`|

In the *Physical qubit parameters* group, you can see the physical qubit properties that were assumed for this estimation. 
For example, the time to perform a single-qubit measurement and a single-qubit gate are assumed to be 100 ns and 50 ns, respectively.

|Physical qubit parameter|Value|
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

### Change the default values and estimate the algorithm

When submitting a resource estimate request for your program, you can specify some optional parameters. There are three top-level input parameters that can be customized: 

* `errorBudget` - the overall allowed error budget
* `qecScheme` - the quantum error correction (QEC) scheme
* `qubitParams` - the physical qubit parameters 

For more information, see [Input parameters](xref:microsoft.quantum.overview.resources-estimator#input-parameters) for the Resource Estimator.

#### Change qubit model

Let's estimate the cost for the same algorithm using the Majorana-based qubit parameter, `qubitParams`, "qubit_maj_ns_e6".

1. Create a JSON file with the configuration, name it `jobParams.json`.

    ```json
    {
        "qubitParams": {
            "name": "qubit_maj_ns_e6"
        },
    }
    ```

2. You can pass them to the `--job-params` argument like this:

    ```azurecli
    az quantum job submit --target-id microsoft.estimator -o json --query id --job-params "@jobParams.json"
    ```

3. Inspect the table again with `-o table`.

    ```azurecli
    az quantum job output -j <job-id> -o table
    ```

For example, you can show a breakdown of the estimates by clicking on the **Breakdown** group. Here you see what logical qubit error and logical T state error rates are required to match the error budget. By default, runtimes are shown in nanoseconds.

|Name|Value |
|-----|-----|
|Logical algorithmic qubits |	84	|
|Logical algorithmic depth |	608	|
|Adjusted logical depth	|608|	
|Number of T states|	800	|
|Number of T factories|	10	|
|Number of T factory invocations	|80|
|Physical algorithmic qubits|4200	|
|Physical T factory qubits|	164160	|
|Physical T factory qubits (fraction)	|97.50 %	|
|Required logical qubit error rate	|9.79e-9	|
|Required logical Tstate error rate	|6.25e-7|	
|Number of T gates per rotation|	No rotations in algorithm|

You can also explore details about the T factory that was created to execute the algorithm.

|T factory parameters| Value|
|-----|-----|
|Physical qubits|	16416	|
|Runtime	|72us 900ns	|
|Number of output T states per run	|1	|
|Number of input T states per run	|20520	|
|Distillation rounds|	3	|
|Distillation units per round|	1368, 20, 1	|
|Distillation units|	15-to-1 space efficient physical, 15-to-1 RM prep physical, 15-to-1 RM prep logical	|
|Distillation code distances|	1, 1, 3	|
|Number of physical qubits per round	|12, 31, 558	|
|Runtime per round|	4us 500ns, 2us 400ns, 66us |
|Logical T state error rate|	2.52e-07|

A single T factory produces one T state. Notice that the logical error rate for an output T state (2.52e-07) is smaller than the required T state error rate in the physical counts breakdown (6.25e-07). The T factory is copied 10 times such that they can run in parallel to produce 10 T states. These copies are run 80 times in sequence, producing in total $10 \cdot 80 = 800$ T states that are required by the algorithm. A single T factory is composed of three rounds of distillation, where:

- 1368 copies of *15-to-1 space efficient physical* distillation modules were used 
- 20 copies of *15-to-1 RM prep physical* distillation modules were used 
- 1 copies of *15-to-1 RM prep logical* distillation modules were used 

#### Change quantum error correction scheme

Now rerun the resource estimation job for the same example on the Majorana-based qubit parameters with a floqued QEC scheme, `qecScheme`.

1. Add the quantum error correction scheme parameter to the `jobParams.json` file.

    ```json
    {
        "qubitParams": {
            "name": "qubit_maj_ns_e6"
        },
        "qecScheme": {
          "name": "floquet_code"
        }
    }
    ```

2. Pass the input parameters to the `--job-params` argument.

    ```azurecli
    az quantum job submit --target-id microsoft.estimator -o json --query id --job-params "@jobParams.json"
    ```

3. Inspect the result with `-o table`.

    ```azurecli
    az quantum job output -j <job-id> -o table
    ```

#### Change error budget

Rerun the same quantum circuit with an `errorBudget` of 10%.

1. Add the quantum error budget parameter to the `jobParams.json` file.

    ```json
    {
        "errorBudget": 0.1,
        "qubitParams": {
            "name": "qubit_maj_ns_e6"
        },
        "qecScheme": {
          "name": "floquet_code"
        }
    }
    ```

2. Pass the input parameters to the `--job-params` argument.

    ```azurecli
    az quantum job submit --target-id microsoft.estimator -o json --query id --job-params "@jobParams.json"
    ```

3. Inspect the result with `-o table`.

    ```azurecli
    az quantum job output -j <job-id> -o table
    ```
