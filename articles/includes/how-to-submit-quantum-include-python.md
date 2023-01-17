---
author: bradben
ms.author: brbenefield
ms.date: 01/17/2023
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
---

## Prerequisites

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The latest version of the [Quantum Development Kit for Python](xref:microsoft.quantum.install-qdk.overview#use-q-and-python-with-jupyter-notebooks). This installs the `qsharp` Python package and the IQ# kernel, which powers the Q# Jupyter Notebook and
Python experiences.

> [!NOTE]
> When installing Python, the option to **Install using conda** is recommended. The steps in this article assume a conda installation. 

## Quantum computing with Q# and Python

1. The Python environment in the conda environment that you created earlier already
   includes the `qsharp` Python package. Make sure you are running your Python
   script from a terminal where this conda environment is activated.
1. Write your Q# operations in a `*.qs` file. When running `import qsharp` in
   Python, the IQ# kernel automatically detects any .qs files in the same
   folder, compiles them, and reports any errors. If compilation is successful,
   the compiled Q# operations will become available for use directly from within
   Python.
    - For example, the contents of your .qs file could look something like this:

        ```qsharp
        namespace Test {
            open Microsoft.Quantum.Intrinsic;
            open Microsoft.Quantum.Measurement;
            open Microsoft.Quantum.Canon;

            operation GenerateRandomBits(n : Int) : Result[] {
                use qubits = Qubit[n];
                ApplyToEach(H, qubits);
                return MultiM(qubits);
            }
        }
        ```

1. Create a Python script in the same folder as your `*.qs` file. Azure Quantum
   functionality is available by running `import qsharp.azure` and then calling
   the Python commands to interact with Azure Quantum. For reference, see the
   [complete list of `qsharp.azure` Python commands](/python/qsharp-core/qsharp.azure).
   You'll need the resource ID of your Azure Quantum workspace in order to
   connect. (The resource ID can be found on your workspace
   page in the Azure portal.)

   If your workspace was created in an Azure region other than \"West US\", you also
   need to specify the region as the `location` parameter to `qsharp.azure.connect()`.

   For example, your Python script could look like this:

    ```py
    import qsharp
    import qsharp.azure
    from Test import GenerateRandomBits

    qsharp.azure.connect(
       resourceId="/subscriptions/.../Microsoft.Quantum/Workspaces/WORKSPACE_NAME",
       location="West US")
    qsharp.azure.target("ionq.simulator")
    result = qsharp.azure.execute(GenerateRandomBits, n=3, shots=1000, jobName="Generate three random bits")
    print(result)
    ```

    where `GenerateRandomBits` is the Q# operation in a namespace `Test` that is
    defined in your `*.qs` file, `n=3` is the parameter to be passed to
    that operation, `shots=1000` (optional) specifies the number of repetitions
    to perform, and `jobName="Generate three random bits"` (optional) is a custom
    job name to identify the job in the Azure Quantum workspace.

1. Run your Python script by running the command `python test.py`, where `test.py` is
   the name of your Python file. If successful, you should see your job results
   displayed to the terminal. For example:

   ```output
   {'[0,0,0]': 0.125, '[1,0,0]': 0.125, '[0,1,0]': 0.125, '[1,1,0]': 0.125, '[0,0,1]': 0.125, '[1,0,1]': 0.125, '[0,1,1]': 0.125, '[1,1,1]': 0.125}
   ```

1. To view the details of all jobs in your Azure Quantum workspace, run the command `qsharp.azure.jobs()`:

   ```dotnetcli
   >>> qsharp.azure.jobs()
   [{'id': 'f4781db6-c41b-4402-8d7c-5cfce7f3cde4', 'name': 'GenerateRandomNumber 3 qubits', 'status': 'Succeeded', 'provider': 'ionq', 'target': 'ionq.simulator', 'creation_time': '2020-07-17T21:45:43.4405253Z', 'begin_execution_time': '2020-07-17T21:45:54.09Z', 'end_execution_time': '2020-07-17T21:45:54.101Z'}, {'id': '1b03cc74-b5d5-4ffa-81db-465f08ae6cd0', 'name': 'GenerateRandomBit', 'status': 'Succeeded', 'provider': 'ionq', 'target': 'ionq.simulator', 'creation_time': '2020-07-21T19:44:17.1065156Z', 'begin_execution_time': '2020-07-21T19:44:25.85Z', 'end_execution_time': '2020-07-21T19:44:25.858Z'}]
   ```

1. To view the detailed status of a particular job, pass the job ID to `qsharp.azure.status()` or `qsharp.azure.output()`, for example:

   ```dotnetcli
   >>> qsharp.azure.status('1b03cc74-b5d5-4ffa-81db-465f08ae6cd0')
   {'id': '1b03cc74-b5d5-4ffa-81db-465f08ae6cd0', 'name': 'GenerateRandomBit', 'status': 'Succeeded', 'provider': 'ionq', 'target': 'ionq.simulator', 
   'creation_time': '2020-07-21T19:44:17.1065156Z', 'begin_execution_time': '2020-07-21T19:44:25.85Z', 'end_execution_time': '2020-07-21T19:44:25.858Z'}

   >>> qsharp.azure.output('1b03cc74-b5d5-4ffa-81db-465f08ae6cd0')
   {'0': 0.5, '1': 0.5}
   ```
