---
author: bradben
ms.author: brbenefield
ms.date: 07/10/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [Quantum Development Kit, target, targets]
---

## Submitting Jupyter Notebooks jobs to Azure Quantum

Learn how to use VS Code to run, debug, and submit a Q# Jupyter Notebook to Azure Quantum. The steps in this article also apply to Jupyter Notebooks on your local Jupyter server or notebooks in the Azure Quantum portal. 

## Prerequisites

For installation details, see [Installing the QDK on VS Code](xref:microsoft.quantum.install-qdk.overview#installing-the-qdk-on-vs-code).

- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed. 
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)  extensions installed.
- The Azure Quantum `qsharp`, `qsharp-widgets`, and `azure-quantum` packages, and the `ipykernel` package. 

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets azure-quantum ipykernel
    ```

## Run and test your program in the local simulator

1. In VS Code, select **View > Command palette** and select **Create: New Jupyter Notebook**. 
1. In the top-right, VS Code will detect and display the version of Python and the virtual Python environment that was selected for the notebook. If you have multiple Python environments, you may need to select a kernel using the kernel picker in the top right. If no environment was detected, see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information. 
1. In the first cell of the notebook, run the following Python code to import the necessary modules:

    ```python
    import qsharp
    import azure.quantum
    ```
    
    - The `qsharp` module activates the `%%qsharp` magic command that lets you enter Q# code directly into a cell. 
    - The `azure-quantum` module provides connectivity to your Azure Quantum workspace.
    > [!NOTE]
    > If the Jupyter Python kernel `ipykernel` is not detected, VS Code will prompt you to install it.  

1. Add another cell and enter this Q# code that returns a user-specified number of random bits:

    > [!NOTE]
    > Notice that as soon as you type in the magic command `%%qsharp`, the notebook cell changes type from *Python* to *Q#*. 
 
    ```qsharp
    %%qsharp

    operation Random() : Result {
        use q = Qubit();
        H(q);
        let result = M(q);
        Reset(q);
        return result
    }
    
    operation RandomNBits(N: Int): Result[] {
        mutable results = [];
        for i in 0 .. N - 1 {
            let r = Random();
            set results += [r];
        }
        return results
    }
    ```

1. To test your operation, you can use the `eval` method, which can call any Q# operation previously defined in the notebook:

    ```python
    qsharp.eval("RandomNBits(4)")
    ```

    ```output
    [Zero, One, One, Zero]
    ```

1. To run your program to the local simulator, use the `run` method. Specify the `shots`, or number of times to run the program, and the simulator returns the results as a Python list.

    ```python
    qsharp.run("RandomNBits(4)", shots=10)
    ```

    ```output
    [[One, One, One, One],
    [Zero, Zero, One, Zero],
    [One, Zero, Zero, One],
    [Zero, One, Zero, Zero],
    [One, Zero, One, One],
    [One, Zero, One, Zero],
    [One, One, One, Zero],
    [One, One, One, One],
    [Zero, Zero, Zero, One],
    [One, Zero, Zero, One]]
    ```

## Visualize  the quantum circuit

You can visualize quantum circuits using the `qsharp-widgets` package. This package provides a widget that renders a quantum circuit diagram as an SVG image. For more information, see [Quantum circuit diagrams with Jupyter Notebooks](xref:microsoft.quantum.how-to.visualize-circuits#quantum-circuits-with-visual-studio-code).

Add the following code to a new cell to visualize the circuit:

```python
from qsharp_widgets import Circuit

Circuit(qsharp.circuit("RandomNBits(4)"))
```

:::image type="content" source="../media/circuit-jupyter-notebook.png" alt-text="Screenshot of Jupyter Notebook showing how to visualize the circuit for a Q# operation.":::


For more information, see [Quantum circuits conventions](xref:microsoft.quantum.concepts.circuits).


## Compile your job using the Base profile

When you run programs on the local quantum simulator, you can submit any type of Q# program. However, Azure Quantum hardware targets do not yet support the full capabilities required to run all Q# programs. In order to compile and submit Q# programs to Azure Quantum, you need to set your target profile to tell Q# which capabilities your target hardware supports. Currently, that is the Base profile. For more information, see [Profile types in Azure Quantum](xref:microsoft.quantum.target-profiles).

To reinitialize the Q# interpreter and compile your program with the base profile:

1. Use the `init` method to set the profile:

    ```python
    qsharp.init(target_profile=qsharp.TargetProfile.Base)
    ```

1. Since you reinitialized the interpreter, you need to run your code again with the new profile:

    ```qsharp
    %%qsharp

    operation Random() : Result {
        use q = Qubit();
        H(q);
        let result = M(q);
        Reset(q);
        return result
    }
    
    operation RandomNBits(N: Int): Result[] {
        mutable results = [];
        for i in 0 .. N - 1 {
            let r = Random();
            set results += [r];
        }
        return results
    }
    ```

1. Next, use the `compile` method to specify the operation or function that is the entry point to your program. This compiles your code into QIR format, which can then be submitted to any quantum hardware:

    ```python
    MyProgram = qsharp.compile("RandomNBits(4)")
    ```

## Connect to Azure Quantum and submit your job

Now that you have your program compiled into the correct format, create an `azure.quantum.Workspace` object to connect to Azure Quantum. You'll use the Resource ID of your Azure Quantum workspace in order to connect. The Resource ID and location can be copied from your workspace overview page in the Azure portal.

1. In a new cell, fill in your resource ID and location from your Azure Quantum workspace:

    ```python
    MyWorkspace = azure.quantum.Workspace(
        resource_id = "MyResourceID",
        location = "MyLocation"
    )
    ```

1. Use the `get_targets` method to see the available hardware targets in your workspace:

    ```python
    MyTargets = MyWorkspace.get_targets()
    print("This workspace's targets:")
    MyTargets
    ```

1. Select the `rigetti.sim.qvm` target:

    ```python
    MyTarget = MyWorkspace.get_targets("rigetti.sim.qvm")
    ```

1. Lastly, use the `submit` method to submit your program with its parameters and display the results:

    ```python
    job = MyTarget.submit(MyProgram, "MyQuantumJob", shots=100)
    job.get_results()
    ```

    ```output
    {'[0, 1, 1, 1]': 0.08,
     '[1, 1, 0, 0]': 0.1,
     '[0, 0, 1, 0]': 0.04,
     '[0, 1, 0, 0]': 0.05,
     '[1, 0, 1, 0]': 0.05,
     '[1, 0, 0, 0]': 0.07,
     '[0, 1, 0, 1]': 0.07,
     '[1, 0, 1, 1]': 0.07,
     '[0, 0, 0, 0]': 0.08,
     '[1, 1, 1, 0]': 0.05,
     '[0, 0, 0, 1]': 0.1,
     '[0, 0, 1, 1]': 0.04,
     '[0, 1, 1, 0]': 0.09,
     '[1, 0, 0, 1]': 0.04,
     '[1, 1, 1, 1]': 0.05,
     '[1, 1, 0, 1]': 0.02}
    ```

1. All the properties of the job are accessible in `job.details`, for example:

    ```python
    print(job.details)
    print("\nJob name:", job.details.name)
    print("Job status:", job.details.status)
    print("Job ID:", job.details.id)
    ```

    ```output
    {'additional_properties': {'isCancelling': False}, 'id': '0150202e-9638-11ee-be2f-b16153380354', 'name': 'MyQuantumJob', 'provider_id': 'rigetti'...}
    Job name: MyQuantumJob
    Job status: Succeeded
    Job ID: 0150202e-9638-11ee-be2f-b16153380354
    ```
### Additional job details

The `azure.quantum` Python package includes additional methods to display more detailed job data.

- `job.get_results_histogram()`: This method returns a dictionary of the outcomes and shot count for each unique measurement. For example, the results for the previous job would be

    ```python
    print(job.get_results_histogram()) 
    ```

    ```output
    {   
        '[0, 1, 1, 1]' : {'Outcome' : [0, 1, 1, 1], 'Count' : 8},  
        '[1, 1, 0, 0]' : {'Outcome' : [1, 1, 0, 0], 'Count' : 10},
        '[0, 0, 1, 0]' : {'Outcome' : [0, 0, 1, 0], 'Count' : 4},
        '[0, 1, 0, 0]' : {'Outcome' : [0, 1, 0, 0], 'Count' : 5},
        '[1, 0, 1, 0]' : {'Outcome' : [1, 0, 1, 0], 'Count' : 5},  
        '[1, 0, 0, 0]' : {'Outcome' : [1, 0, 0, 0], 'Count' : 7},
        '[0, 1, 0, 1]' : {'Outcome' : [0, 1, 0, 1], 'Count' : 7},
        '[1, 0, 1, 1]' : {'Outcome' : [1, 0, 1, 1], 'Count' : 7},
        '[0, 0, 0, 0]' : {'Outcome' : [0, 0, 0, 0], 'Count' : 8},  
        '[1, 1, 1, 0]' : {'Outcome' : [1, 1, 1, 0], 'Count' : 5},
        '[0, 0, 0, 1]' : {'Outcome' : [0, 0, 0, 1], 'Count' : 10},
        '[0, 0, 1, 1]' : {'Outcome' : [0, 0, 1, 1], 'Count' : 4},
        '[0, 1, 1, 0]' : {'Outcome' : [0, 1, 1, 0], 'Count' : 9},  
        '[1, 0, 0, 1]' : {'Outcome' : [1, 0, 0, 1], 'Count' : 4},
        '[1, 1, 1, 1]' : {'Outcome' : [1, 1, 1, 1], 'Count' : 5},
        '[1, 1, 0, 1]' : {'Outcome' : [1, 1, 0, 1], 'Count' : 2}
    }
    ```

- `job.get_results_shots()` : This method returns a list of each shot result. For example, the results for the previous job would be

    ```python
    print(job.get_results_shots()) 
    ```

    ```output
    [ [0, 1, 1, 1], [1, 0, 1, 1], [0, 0, 1, 1], [1, 1, 0, 1], [1, 0, 0, 0], [1, 0, 1, 1], [1, 1, 0, 1], ...]
    ```