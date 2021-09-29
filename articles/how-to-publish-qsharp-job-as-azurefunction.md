---
title: Publish a Q# job as an Azure Function
description: This article describes how you can publish your Q# job as an Azure Function and make it callable via RESTful API. 
author: hsirtl
ms.author: hsirtl
ms.service: azure-quantum
ms.topic: how-to
ms.date: 09/27/2021
#Customer intent: As a researcher, I want to make my quantum algorithm accessible via API so that developers without further quantum knowledge can call it via classical API-calls.
---

# Publish a Q# job as an Azure Function

Learn how to deploy your Q# job as a web service. You'll accomplish this task by using an Azure Function that can be called via a Web-API. The Function receives input via request-URL or via request-body. It then executes the Q# job on a simulator or quantum hardware and returns the result as JSON-string.

You can make your Q# job and its functionality available to other developers. These developers can integrate it into their classic code. This integration can be accomplished without any further knowledge of quantum concepts or QDK libraries. One way for exposing the Q# job for that purpose is via an Azure Function that can be called via Web-API.

Azure Functions is a serverless solution that allows you to host your functionality in Azure without worrying about underlying infrastructure.

The Q# job that will be published as an Azure Function implements a quantum random number generator. The algorithm used the nature of quantum mechanics to produce a random number. To learn more about this algorithm, have a look at the [Tutorial: Implement a Quantum Random Number Generator in Q#](tutorial-qdk-quantum-random-number-generator.md).

## Prerequisites

You need the following prerequisites to follow the steps in this article.

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?ref=microsoft.com).
- The latest version of the [Quantum Development Kit for Q# and .NET](/azure/quantum/install-overview-qdk?tabs=tabid-local).
- The [Azure Functions Core Tools](/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools) version 3.x.
- [Visual Studio Code](https://code.visualstudio.com/) on one of the [supported platforms](https://code.visualstudio.com/docs/supporting/requirements#_platforms).
- The [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for Visual Studio Code.

### Optional

- An Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.quickstarts.optimization.qio).

A workspace is only required, if you intend to run your Q# job on a target other than a simulator. This document describes how to execute the quantum algorithm on a simulator.

## Create a Q# library and an Azure Function host

The first step is to create projects for your Q# library, and for the Azure Function host that will call into the operations and functions defined in your Q# library.

Follow the instructions in the tab corresponding to your development environment.
When using an editor other than Visual Studio or VS Code, follow the command prompt steps.

### [Visual Studio Code or command prompt](#tab/tabid-cmdline)

- Create a new Q# library

  ```dotnetcli
  dotnet new classlib -lang Q# -o Service.Qsharp
  ```

- Create a new C# based Azure Function app project

  ```dotnetcli
  func init Function.Csharp --dotnet  
  ```

- Navigate into the project folder and add a function derived from the HTTP trigger template:

  ```dotnetcli
  cd .\Function.Csharp\
  func new --name RandomNumber --template "HTTP trigger" --authlevel "anonymous"
  ```

- Add your Q# library as a reference from your Function App project

  ```dotnetcli
  dotnet add reference ../Service.Qsharp/Service.Qsharp.csproj
  ```

- [Optional] Create a solution for both projects

  ```dotnetcli
  dotnet new sln -n function-qsharp
  dotnet sln function-qsharp.sln add .\Service.Qsharp\Service.Qsharp.csproj
  dotnet sln function-qsharp.sln add .\Function.Csharp\Function_Csharp.csproj
  ```

### [Visual Studio 2019](#tab/tabid-vs2019)

- Create a new Q# library
  - Go to **File** -> **New** -> **Project**
  - Type "Q#" in the search box
  - Select **Class Library**
  - Select **Next**
  - Choose a name and location for your library
  - Make sure that "place project and solution in same directory" is **unchecked**
  - Select **Create**
- Add an Azure Function project to the solution
  - Go to **File** -> **New** -> **Project**
  - Select "Azure Function" for C#
  - Select **Next**
  - Choose a name for your Function App
  - Select "Add to solution"
  - Select **Next**
  - Select ".NET Core 3 (LTS)", "Http trigger", and "Anonymous" as authorization level
  - Select **Create**

***

## Test the Azure Function in your local environment

1. Delete the reference to any Azure Storage Account. Navigate to the local.settings.json file located in the Function App project directory. Replace any string configured for ``AzureWebJobsStorage`` by the empty string. The file should look as follows:

    ```json
    {
      "IsEncrypted": false,
      "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet"
      }
    }
    ```

1. Navigate into the Function App project folder

    ```dotnetcli
    cd .\Function.Csharp\
    ```

1. Run the function by starting the local Azure Functions runtime host.

    ```dotnetcli
    func start
    ```

    Towards the end of the console output, the following lines should appear.

    ```dotnetcli
    ...
    Functions:

        RandomNumber: [GET,POST] http://localhost:7071/api/RandomNumber

    For detailed output, run func with --verbose flag.
    ...
    ```

1. Copy the URL of your RandomNumber function from this output to a browser. To the function URL, append the query string ``?name=<YOUR_NAME>``, making the full URL like ``http://http://localhost:7071/api/RandomNumber?name=Alice``. The browser should display a response message that echoes back your query string value. The terminal in which you started your project also shows log output as you make requests.

    :::image type="content" source="media/how-to-publish-qsharp-job-as-azurefunction/run-azure-function-locally-1.png" alt-text="Local execution of the function":::

1. When the function executes locally and returns a response, a notification is raised in Visual Studio Code. Information about the function execution is shown in **Terminal** panel.
1. Press **Ctrl + C** to stop Core Tools and disconnect the debugger.

## Add the Q# algorithm code

It's time to add some useful quantum algorithm code.

1. Open the ``Library.qs`` file located in the ``Service.Qsharp``-directory.
1. Replace its content by the following code.

    ```qsharp
    namespace Service.Qsharp {
    
        open Microsoft.Quantum.Canon;
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Measurement;
        open Microsoft.Quantum.Math;
        open Microsoft.Quantum.Convert;
    
        operation GenerateRandomBit() : Result {
            // Allocate a qubit.
            use q = Qubit();
            // Put the qubit to superposition.
            H(q);
            // It now has a 50% chance of being measured 0 or 1.
            // Measure the qubit value.
            return M(q);
        }
    
        operation SampleRandomNumberInRange(max : Int) : Int {
            mutable output = 0; 
            repeat {
                mutable bits = new Result[0]; 
                for idxBit in 1..BitSizeI(max) {
                    set bits += [GenerateRandomBit()]; 
                }
                set output = ResultArrayAsInt(bits);
            } until (output <= max);
            return output;
        }
    }
    ```

1. Save the file.

The function now contains two callables: The ``GenerateRandomBit``-operation generates a single random bit. Executed on a quantum computer, it has an exact 50% chance of returning 0 versus 1. The ``SampleRandomNumberInRange``-operation uses the first operation to generate a random integer between 0 and a maximum value specified by the ``max``-parameter.

## Call your Q# algorithm in the Azure Function

Once you have your projects set up, you can call into Q# from your Azure Function App. The Q# compiler will create .NET classes for both Q# operations. These classes allow you to run your quantum programs on a simulator. To call this operation from .NET on a quantum simulator, you can use the ``Run`` method of the ``RunAlgorithm`` .NET class generated by the Q# compiler.

1. Open the ``RandomNumber.cs``-file located in the Function app project directory.
1. Add references to required namespaces. Append following statements to the existing ``using``-statements.

    ```csharp
    using Microsoft.Quantum.Simulation.Simulators;
    using Service.Qsharp;
    ```

    The second statement references the namespace defined in your Q# algorithm file.

1. Change the body of the ``Run``-method as follows:

    ```csharp
    [FunctionName("RandomNumber")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        string maxValueStr = req.Query["maxValue"];
        
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);
        maxValueStr = maxValueStr ?? data?.maxValue;

        int maxValue;

        if(!int.TryParse(maxValueStr, out maxValue))
        {
            maxValue = 100;
        }

        using var sim = new QuantumSimulator();

        int randomNumber = (int) await SampleRandomNumberInRange.Run(sim, maxValue);

        string responseMessage = $"{randomNumber}";

        return new OkObjectResult(responseMessage);
    }
    ```

    The code above instantiates a ``QuantumSimulator``-object. The random number generation happens in a quantum simulator. Using other target machines is as simple as instantiating a different one, although the manner of doing so and processing the returns can be slightly different. For brevity, this section sticks to the ``QuantumSimulator``.

    > [!NOTE]
    > The ``Run`` method is run asynchronously because this will be the case for real quantum hardware, and therefore the ``await`` keyword blocks further processing until the task completes.

## Prepare your cloud environment

You can now prepare the target environment that will host the function. Preparation includes the creation of an empty Azure Function App.

1. Go to the [Azure Portal](https://portal.azure.com) and sign in to your Azure account.
1. Create a Function App. Select **Create a resource** in the upper left corner of the portal.

    :::image type="content" source="media/how-to-publish-qsharp-job-as-azurefunction/prepare-cloud-env-1.png" alt-text="Create a resource":::

1. Search for **Function App** and select **Create**.
1. Provide the following information:

    - **Subscription**: Choose the subscription to use. Use the one that also contains your Quantum Workspace.
    - **Resource Group**: Choose the one that also contains your Quantum Workspace.
    - **Function App name**: Enter a globally unique name for the Function App. Type a name that is valid in a URL path. The name you type is validated to make sure that it's unique in Azure Functions.
    - **Publish**: Select ``Code``.
    - **Runtime stack**: Select ``.NET``.
    - **Version**: Select ``3.1``.
    - **Region**: Choose the one that also contains your Quantum Workspace.

    Select **Review + Create** to confirm your input.

1. Validate your input and select **Create**. Deployment will take a few seconds. Wait until a confirmation is displayed.
1. Navigate to the new function. Select **Configuration** from the function menu and navigate to the **General settings** tab. Select ``64 Bit``.

    :::image type="content" source="media/how-to-publish-qsharp-job-as-azurefunction/prepare-cloud-env-2.png" alt-text="Configure 64-Bit-Platform setting":::

    > [!IMPORTANT]
    > Failing to configure the function to 64-Bit-platform will result in errors thrown in subsequent steps when quantum libraries need to be loaded. These libraries require a 64-bit-environment and won't be loaded in a 32-bit-environment.

Because this sample only uses simulated hardware, a Quantum Workspace is optional. When executing a quantum algorithm on quantum hardware, make sure that the Azure Function is properly authenticated to the Quantum Workspace.

## Deploy the Azure Function to the cloud

After you've successfully created your function app in Azure, you're now ready to deploy your local functions project by using the ``func azure functionapp publish`` command.

In the following example, replace ``<APP_NAME>`` with the name of your app (you used in the previous step).

```dotnetcli
func azure functionapp publish <APP_NAME>
```

Towards the end of the console output, the following lines should appear.

```dotnetcli
...
Deployment completed successfully.
Syncing triggers...
Functions in <APP_NAME>:
    RandomNumber - [httpTrigger]
        Invoke url: https://<APP_NAME>.azurewebsites.net/api/randomnumber
...
```

## Call your Q# algorithm via the Azure Function

You can now test the Function in the cloud.

1. Call the function by calling the Function-URL in a browser. Call following URL:

    ```text
    https://<APP_NAME>.azurewebsites.net/api/randomnumber
    ```

    This call should generate a random integer between 0 and 100. 100 is the maximum value, if no ``maxValue``-parameter is passed.

1. Call the function by calling the Function-URL with a ``maxValue``-parameter. Call following URL:

    ```text
    https://<APP_NAME>.azurewebsites.net/api/randomnumber?maxValue=10
    ```

    This call should generate a random integer between 0 and 10.

## Next steps

- Now that you know how to publish Q# jobs as Azure Functions, you can try to publish other jobs from our [samples collection](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum) we have available or try to publish your own job.
- When you are finished testing your job with a simulator environment, try to use one of the other targets (for example quantum simulators or quantum hardware). For learning more about how to target quantum hardware, have a look at the MS Learn Module [Run algorithms on quantum hardware by using Azure Quantum](/learn/modules/run-algorithms-quantum-hardware-azure-quantum/).
