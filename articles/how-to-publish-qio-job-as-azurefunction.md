---
title: Publish a QIO job as an Azure Function
description: This article describes how you can publish your QIO job as an Azure Function and make it callable via RESTful API. 
author: hsirtl
ms.author: hsirtl
ms.service: azure-quantum
ms.topic: how-to
ms.date: 04/06/2022
uid: microsoft.quantum.publish-qio-as-azure-function
#Customer intent: As a researcher, I want to make my quantum algorithm accessible via API so that developers without further quantum knowledge can call it via classical API-calls.
---

# Publish a QIO job as an Azure Function

Learn how to deploy your QIO model as a web service. You'll accomplish this task by using an Azure Function that can be called via a Web-API. The Function receives model input via request-URL or via request-body. It then calls an Azure Quantum Solver and returns the result as JSON-string.

You can make your QIO model and its functionality available to other developers, who will be able to integrate it into their classic code. This integration can be possible without any further knowledge of quantum concepts or QDK libraries. One for exposing the QIO functionality for that purpose is via an Azure Function that can be called via Web-API.

Azure Functions is a serverless solution that allows you to host your functionality in Azure without worrying about underlying infrastructure.

The QIO job that will be published as an Azure Function implements the so called *number partitioning problem*. It splits a given set of integer numbers into two subsets with equal (or similar) sum of their elements. Have a look at following **MS Learn Module** to learn more about this problem and its implementation: [Solve optimization problems by using quantum-inspired optimization](/learn/modules/solve-quantum-inspired-optimization-problems/).

## Prerequisites

You need the following prerequisites to follow the steps in this article.

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- An Azure Quantum workspace in your Azure subscription. To create a workspace,
  see [Create an Azure Quantum workspace](xref:microsoft.quantum.quickstarts.optimization.qio).
- The latest version of the [Quantum Development Kit for Python](xref:microsoft.quantum.install-qdk.overview.python#install-the-qsharp-python-package).
- The [Azure Functions Core Tools](/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools) version 3.x.
- [Python versions that are supported by Azure Functions](/azure/azure-functions/supported-languages#languages-by-runtime-version).
- [Visual Studio Code](https://code.visualstudio.com/) on one of the [supported platforms](https://code.visualstudio.com/docs/supporting/requirements#_platforms).
- The [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for Visual Studio Code.
- The [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for Visual Studio Code.

## Create a new Azure Function project

First, use Visual Studio Code to create a local Azure Functions project in Python. Later, you'll publish your function code to Azure.

1. Choose the Azure icon in the Activity bar, then in the **Azure: Functions** area, select the **Create new project...** icon. The icons might only appear when moving the mouse pointer into the Azure Functions field.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/create-new-project.png" alt-text="Create a new project":::

1. Choose a directory location for your project workspace and choose **Select**.
1. Provide the following information at the prompts:

    - **Select a language for your function project**: Choose `Python`
    - **Select a Python interpreter to create a virtual environment**: Choose one of the offered interpreters (for example, `python 3.9.6`)
    - **Select a template for your project's first function**: Choose `HTTP trigger`.
    - **Provide a function name**: Type `SplitWeights`.
    - **Authorization level**: Choose `Anonymous`, which enables anyone to call your function endpoint. To learn about authorization levels (and ways for restricting access to your Function), see [Authorization keys](/azure/azure-functions/functions-bindings-http-webhook-trigger#authorization-keys).
    - **Select how you would like to open your project**: Choose `Open in current window`.

1. Using this information, Visual Studio Code generates an Azure Functions project with an HTTP trigger, which means that the Function will be callable via an http-RESTful API. You can view the local project files in the Explorer. To learn more about files that are created, see [Generated project files](/azure/azure-functions/functions-develop-vs-code#generated-project-files).

## Test the Azure Function in your local environment

Even though the Function doesn't provide any useful functionality yet, it's perfect time to test the Function locally.
> [!TIP]
> It's good practice to repeat this step after each following step to ensure your changes didn't break anything. As we proceed, you should change the request parameters appropriately.

1. To call your function, press **F5** to start the function app project. Output from Core Tools is displayed in the **Terminal** panel. Your app starts in the **Terminal** panel. You can see the URL endpoint of your HTTP-triggered function running locally.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/run-azure-function-locally-1.png" alt-text="Run the Azure Function locally":::

    If you have trouble running on Windows, make sure that the default terminal for Visual Studio Code isn't set to **WSL Bash**.

1. With Core Tools running, go to the **Azure: Functions area**. Under **Functions**, expand **Local Project > Functions**. Right-click (Windows) or *Ctrl*-select (macOS) the `SplitWeights` function and choose **Execute Function Now...**.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/run-azure-function-locally-2.png" alt-text="Call the Function":::

1. In **Enter request body**, you see the request message body value of `{ "name": "Azure" }`. Press **Enter** to send this request message to your function.
1. When the function executes locally and returns a response, a notification is raised in Visual Studio Code. Information about the function execution is shown in **Terminal** panel.
1. Press **Ctrl + C** to stop Core Tools and disconnect the debugger.

## Reference Azure Quantum libraries

By default, the generated Azure Functions project only references standard Python libraries. All other libraries needed for the specific function must be explicitly referenced. These references tell the Azure Functions runtime what libraries to load when a function is called. You can add a reference to the Azure Quantum Python library.

1. Select the file `requirements.txt` to it.
1. After `azure-functions` add a reference to the Azure Quantum Python library by adding `azure-quantum` at the end of the file. The complete file should look as follows:

    ```python
    # DO NOT include azure-functions-worker in this file
    # The Python Worker is managed by Azure Functions platform
    # Manually managing azure-functions-worker may cause unexpected issues

    azure-functions
    azure-quantum
    ```

1. Save the file.

## Add a reference to your Azure Quantum workspace

You now have a Function that could access necessary Azure Quantum libraries when being called via http-call. But so far, the function doesn't do anything. To change that, add a reference to your Quantum Workspace.

1. Open the file `__init__.py` located in the folder `SplitWeights`. This file contains the code executed when an http-request is received.
1. Add a reference to your Azure Quantum Workspace. Add following code right after the last `import` statement.

    ```python
    from azure.quantum import Workspace
    
    workspace = Workspace (
        subscription_id = "",  # Add your subscription_id
        resource_group = "",   # Add your resource_group
        name = "",             # Add your workspace name
        location = ""          # Add your workspace location (for example, "eastus")
        )
    ```

1. Save the file.

## Add the QIO algorithm code

So far, we only prepared the function to load necessary Python libraries and create a connection to your Azure Quantum Workspace. It's time to add some useful optimization code.

1. Add necessary ``import`` statements at the beginning. Add following line after the first ``import`` statement.

    ```python
    import json
    ```

1. Add following statements after the ``Workspace``-import.

    ```python
    from typing import List
    from azure.quantum.optimization import Problem, ProblemType, Term
    from azure.quantum.optimization import QuantumMonteCarlo
    ```

1. Replace the existing ``main``-function by following code.

    ```python
    def main(req: func.HttpRequest) -> func.HttpResponse:
        mineralWeights = []
    
        # Try to read the mineralWeights from the URL-string.
        mwStr = req.params.get('mineralWeights')
        if mwStr:
            list = mwStr.split (",")
            for i in list:
                mineralWeights.append(int(i))
        else:
            # If not passed via URL, try to extract the mineral Weights from the request body.
            try:
                req_body = req.get_json()
            except ValueError:
                pass
            else:
                mineralWeights = req_body.get('mineralWeights')
        
        if mineralWeights:
            # Create a problem for the given list of minerals:
            problem = createProblemForMineralWeights(mineralWeights)
    
            # Instantiate a solver to solve the problem.
            solver = QuantumMonteCarlo(workspace, sweeps = 2, trotter_number = 10, restarts = 72, seed = 22, beta_start = 0.1, transverse_field_start = 10, transverse_field_stop = 0.1)
    
            # Optimize the problem
            result = solver.optimize(problem)
            
            return func.HttpResponse(
                 json.dumps(result['configuration']),
                 status_code=200
            )
        else:
            return func.HttpResponse(
                 "The function couldn't be executed successfully. Pass a mineralWeights param in the query string or in the request body for a personalized response.",
                 status_code=400
            )

    def createProblemForMineralWeights(mineralWeights: List[int]) -> Problem:
        terms: List[Term] = []
    
        # Expand the squared summation
        for i in range(len(mineralWeights)):
            for j in range(len(mineralWeights)):
                if i == j:
                    # Skip the terms where i == j as they form constant terms in an Ising problem and can be disregarded.
                    continue
    
                terms.append(
                    Term(
                        c = mineralWeights[i] * mineralWeights[j],
                        indices = [i, j]
                    )
                )
    
        # Return an Ising-type problem
        return Problem(name="Freight Balancing Problem", problem_type=ProblemType.ising, terms=terms)
    ```

The function now contains two functions: The ``main``-function is executed when an http-request is received. It parses the request and looks at the request URL. If a ``mineralWeights``-parameter is found in the URL, these weights are processed. If the URL doesn't contain this parameter, the request body is analyzed. If a ``mineralWeights``-parameter is found in the body, these weights are processed. Weights are passed to the ``createProblemForMineralWeights``-function that creates a ``Problem``-object. The ``main``-function passes this ``Problem``-object to an Azure Quantum solver and returns the results.

## Prepare your cloud environment

You can now prepare the target environment that will host the Function. Preparation includes the creation of an empty Azure Function App and granting access to your Quantum Workspace.

1. Go to the [Azure portal](https://portal.azure.com) and sign in to your Azure account.
1. Create a Function App. Select **Create a resource** in the upper left corner of the portal.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-1.png" alt-text="Create a resource":::

1. Search for **Function App** and select **Create**.
1. Provide the following information:

    - **Subscription**: Choose the subscription to use. Use the one that also contains your Quantum Workspace.
    - **Resource Group**: Choose the one that also contains your Quantum Workspace.
    - **Function App name**: Enter a globally unique name for the Function App. Type a name that is valid in a URL path. The name you type is validated to make sure that it's unique in Azure Functions.
    - **Publish**: Select ``Code``.
    - **Runtime stack**: Select ``Python``.
    - **Version**: Choose the version of Python you've been running on locally. You can use the ``python --version`` command to check your version.
    - **Region**: Choose the one that also contains your Quantum Workspace.

    Select **Review + Create** to confirm your input.
1. Validate your input and select **Create**. Deployment will take a few seconds. Wait until a confirmation is displayed.
1. Select **Go to resource** for navigating to your Function App.
1. Configure a managed identity for the Function App. A managed identity allows the App to access other Azure resources (such as the Quantum Workspace) and authenticate with these resources.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-2.png" alt-text="Create a managed identity for the Function App":::

    Select **Save** to persist your configuration and confirm the opening dialog with **Yes**.
1. Allow the Function App to access your Quantum Workspace. Navigate to your Quantum Workspace and select **Access control (IAM)** from the left-side menu. Select **Add** and **Add role assignment**.
:::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-3.png" alt-text="Create a new role assignment on your Quantum Workspace":::
1. The role assignment dialog opens. Provide the following information:

    - **Role**: Select ``Contributor``.
    - **Assign access to**: Select ``Function App``.
    - **Subscription**: Select your subscription.
    - **Select**: Enter your Function App name.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/prepare-cloud-env-4.png" alt-text="Add your Function App as a Contributor to your Quantum Workspace":::

1. Select your Function App and confirm your selection with **Save**.

## Deploy the Azure Function to the cloud

Deploy your Function code to the environment you prepared in the previous step.

1. In Visual Studio Code, choose the Azure icon in the Activity bar, then in the **Azure: Functions** area, choose the **Deploy to function app...** button.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/deploy-function-1.png" alt-text="Deploy the Function":::

1. At the prompt, **Select Function App in Azure** select the Function App that you previously created.
1. A notification is displayed after your function app is deployed. Select **View Output** to display status information and the URL the Function can be called by.

:::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/deploy-function-2.png" alt-text="Notification after successful deployment":::

## Call your QIO algorithm via the Azure Function

You can now test the Function in the cloud.

1. Call the function by calling the Function-URL in a browser. Call following URL:

    ```text
    https://<your_function_app_name>.azurewebsites.net/api/splitweights
    ```

    This call should generate following output:

    ```text
    The function couldn't be executed successfully. Pass a mineralWeights param in the query string or in the request body for a personalized response.
    ```

1. Call the function by calling the Function-URL with required parameters in a browser. Call the following URL:

    ```text
    https://<your_function_app_name>.azurewebsites.net/api/splitweights?mineralWeights=5,11,8,7,1,1
    ```

    This call should generate following output:

    ```text
    {"0": -1, "1": 1, "2": -1, "3": 1, "4": -1, "5": -1}
    ```

1. Call the Function with mineral weights passed within the request body. Back in Visual Studio Code in the **Azure: Functions** area in the side bar, expand your subscription, your new function app, and Functions. Right-click (Windows) or *Ctrl*-select (macOS) the ``SplitWeights`` function and choose **Execute Function Now...**.

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/execute-function-1.png" alt-text="Execute the Function via Visual Studio Code":::

1. In the input field **Enter request body**, you'll see the request message body. Enter the value of ``{ "mineralWeights": [5,11,8,7,1,1] }``. Press **Enter** to send this request message to your function.
1. The following confirmation message should appear after a few seconds:

    :::image type="content" source="media/how-to-publish-qio-job-as-azurefunction/execute-function-2.png" alt-text="Result after Function call":::

> [!TIP]
> The Function you just deployed implements the *number partitioning problem*. It allows you to split a given set of numbers into two subsets with equal (or similar) sum of their elements. To learn more about this problem and its implementation have a look at [MS Learn Module: Solve optimization problems by using quantum-inspired optimization](/learn/modules/solve-quantum-inspired-optimization-problems/).

## Next steps

- Now that you know how to publish jobs as Azure Functions, you can try to publish other jobs from our [samples collection](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum) we have available or try to publish your own job.
- Learn more about the *number partitioning problem* and its implementation in following **MS Learn Module** [Solve optimization problems by using quantum-inspired optimization](/learn/modules/solve-quantum-inspired-optimization-problems/).
