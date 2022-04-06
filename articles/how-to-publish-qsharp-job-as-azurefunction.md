---
title: Publish a Q# job as an Azure Function
description: This article describes how you can publish your Q# job as an Azure Function and make it callable via RESTful API. 
author: hsirtl
ms.author: hsirtl
ms.service: azure-quantum
ms.topic: how-to
ms.date: 03/30/2022
uid: microsoft.quantum.publish-qc-as-azure-function
#Customer intent: As a researcher, I want to make my quantum algorithm accessible via API so that developers without further quantum knowledge can call it via classical API-calls.
---

# Publish a Q# job as an Azure Function

Learn how to deploy your Q# job as a web service using Azure Functions.  Azure Functions is a serverless solution that allows you to host your functionality in Azure without worrying about underlying infrastructure.

With Azure Functions, you can make your Q# job and its functionality available to other developers, who can then integrate it into their classic code. This integration can be accomplished without any additional knowledge of quantum concepts or QDK libraries. One way you can expose your Q# job for this purpose is via a function that can be called via a Web API.

The function receives input via a request URL or via a request body. It then executes the Q# job on a simulator or quantum hardware and returns the result as a JSON string.

The Q# job that you will publish as an Azure function implements a quantum random number generator. The algorithm uses the nature of quantum mechanics to produce a random number. To learn more about this algorithm, see the [Tutorial: Implement a Quantum Random Number Generator in Q#](xref:microsoft.quantum.tutorial-qdk.random-number).

## Prerequisites

You need the following prerequisites to follow the steps in this article:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- The latest version of the [Quantum Development Kit for Q# and .NET](/azure/quantum/install-overview-qdk?tabs=tabid-local).
- The [Azure Functions Core Tools](/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools) version 3.x.
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/) on one of the [supported platforms](https://code.visualstudio.com/docs/supporting/requirements#_platforms).
- The [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for VS Code.

### Optional

- An Azure Quantum workspace in your Azure subscription. To create a workspace, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).

A workspace is only required if you intend to run your Q# job on a target other than a simulator. This document describes how to execute the quantum algorithm on a simulator.

## Create a Q# library and an Azure Function host

The first step is to create projects for your Q# library and for the Azure Function host that will call into the operations and functions defined in your Q# library.

Follow the instructions in the tab corresponding to your development environment.
When using an editor other than Visual Studio or VS Code, follow the command prompt steps.

### [VS Code or command prompt](#tab/tabid-cmdline)

- Create a new Q# library

  ```dotnetcli
  dotnet new classlib -lang Q# -o Service.Qsharp
  ```

- Create a new C#-based Azure function app project

  ```dotnetcli
  func init Function.Csharp --dotnet  
  ```

- Navigate into the project folder and add a function derived from the HTTP trigger template:

  ```dotnetcli
  cd .\Function.Csharp\
  func new --name RandomNumber --template "HTTP trigger" --authlevel "anonymous"
  ```

- Add your Q# library as a reference from your function app project

  ```dotnetcli
  dotnet add reference ../Service.Qsharp/Service.Qsharp.csproj
  ```

- [Optional] Create a solution for both projects

  ```dotnetcli
  dotnet new sln -n function-qsharp
  dotnet sln function-qsharp.sln add .\Service.Qsharp\Service.Qsharp.csproj
  dotnet sln function-qsharp.sln add .\Function.Csharp\Function_Csharp.csproj
  ```

### [Visual Studio 2022](#tab/tabid-vs2022)

- Create a new Q# library
  - Go to **File** -> **New** -> **Project**
  - Type "Q#" in the search box
  - Select **Class Library**
  - Select **Next**
  - Choose a name and location for your library
  - Make sure that **place project and solution in same directory** is unchecked
  - Select **Create**
- Add an Azure Function project to the solution
  - Go to **File** -> **New** -> **Project**
  - Select **Azure Function** for C#
  - Select **Next**
  - Choose a name for your function app
  - Select **Add to solution**
  - Select **Next**
  - Select **.NET Core 3 (LTS)**, **Http trigger**, and **Anonymous** as authorization level
  - Select **Create**

***

## Test the Azure Function in your local environment

1. Delete any reference to an Azure storage account. Navigate to the local.settings.json file located in the function app project directory. Replace any string configured for ``AzureWebJobsStorage`` by the empty string. The file should look as follows:

    ```json
    {
      "IsEncrypted": false,
      "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet"
      }
    }
    ```

1. Navigate into the function app project folder

    ```dotnetcli
    cd .\Function.Csharp\
    ```

1. Run the function by starting the local Azure Functions runtime host.

    ```dotnetcli
    func start
    ```

    Towards the end of the console output, the following lines should display:

    ```dotnetcli
    ...
    Functions:

        RandomNumber: [GET,POST] http://localhost:7071/api/RandomNumber

    For detailed output, run func with --verbose flag.
    ...
    ```

1. Copy the URL of your `RandomNumber` function from this output to a browser. To the function URL, append the query string *?name=<YOUR_NAME>*, making the full URL *http://http://localhost:7071/api/RandomNumber?name=Alice*. The browser should display a response message that echoes back your query string value. The terminal in which you started your project also displays log output as you make requests.

    :::image type="content" source="media/how-to-publish-qsharp-job-as-azurefunction/run-azure-function-locally-1.png" alt-text="Local execution of the function":::

1. When the function executes locally and returns a response, a notification is raised in VS Code. Information about the function execution is shown in **Terminal** panel.
1. Press **Ctrl + C** to stop Core Tools and disconnect the debugger.

## Add the Q# algorithm code

It's time to add some useful quantum algorithm code.

1. Open the Library.qs file located in the Service.Qsharp directory.
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

The function now contains two callables: The ``GenerateRandomBit`` operation generates a single random bit. When executed on a quantum computer, it has an exact 50% chance of returning 0 versus 1. The ``SampleRandomNumberInRange`` operation uses the ``GenerateRandomBit`` operation to generate a random integer between 0 and a maximum value specified by the ``max`` parameter.

## Call your Q# algorithm in the Azure Function

Once you have your projects set up, you can call into Q# from your Azure function app. The Q# compiler creates .NET classes for both Q# operations that allow you to run your quantum programs on a simulator. To call this operation from .NET on a quantum simulator, use the ``Run`` method of the ``RunAlgorithm`` .NET class generated by the Q# compiler.

1. Open the RandomNumber.cs file located in the function app project directory.
1. Add references to the required namespaces by appending the following statements to the existing ``using`` statements.

    ```csharp
    using Microsoft.Quantum.Simulation.Simulators;
    using Service.Qsharp;
    ```

    The second statement references the namespace defined in your Q# algorithm file.

1. Change the body of the ``Run`` method as follows:

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

This code instantiates a ``QuantumSimulator`` object, where the random number generation occurs. You can use other target machines by instantiating them here, although the manner of doing so and the processing of the returns can be slightly different. For brevity, this section uses the ``QuantumSimulator``.  For information about other quantum computing targets, see [Quantum simulators](xref:microsoft.quantum.machines.overview) and [Quantum computing providers](xref:microsoft.quantum.reference.qc-target-list).

> [!NOTE]
> The ``Run`` method is run asynchronously because this will be the case for real quantum hardware, and therefore the ``await`` keyword blocks further processing until the task completes.

## Prepare your cloud environment

You can now prepare the target environment that will host the function. Preparation includes the creation of an empty Azure function app.

1. Go to the [Azure Portal](https://portal.azure.com) and sign in to your Azure account.
1. Create a function app. Select **Create a resource** in the upper left corner of the portal.

    :::image type="content" source="media/how-to-publish-qsharp-job-as-azurefunction/prepare-cloud-env-1.png" alt-text="Create a resource":::

1. Search for **Function App** and select **Create**.
1. Provide the following information:

    - **Subscription**: Select the subscription that contains your Quantum Workspace.
    - **Resource Group**: Select the resource group that contains your Quantum Workspace.
    - **Function App name**: Enter a globally unique name for the function app. Type a name that is valid in a URL path. The name you type is validated to make sure that it's unique in Azure Functions.
    - **Publish**: Select ``Code``.
    - **Runtime stack**: Select ``.NET``.
    - **Version**: Select ``6.0``.
    - **Region**: Select the region that contains your Quantum Workspace.

    Select **Review + Create** to confirm your input.

1. Validate your input and select **Create**. Deployment will take a few seconds. Wait until a confirmation is displayed.
1. Navigate to the new function. Select **Configuration** from the *Settings* menu and click **General settings** .  For the **Platform**, select **64 Bit**.

    :::image type="content" source="media/how-to-publish-qsharp-job-as-azurefunction/prepare-cloud-env-2.png" alt-text="Configure 64-Bit-Platform setting":::

    > [!IMPORTANT]
    > Failing to configure the function for a 64-bit platform will result in errors when the compiler tries to load the quantum libraries. These libraries require a 64-bit environment and won't load in a 32-bit environment.

Because this sample only uses simulated hardware, a Quantum Workspace is optional. When executing a quantum algorithm on quantum hardware, make sure that the Azure Function is properly authenticated to the Quantum Workspace. For necessary steps see [Publish a QIO job as an Azure Function](/azure/quantum/how-to-publish-qio-job-as-azurefunction).

## Deploy the Azure Function to the cloud

After you've successfully created your function app in Azure, you're now ready to deploy your local functions project by using the ``func azure functionapp publish`` command.

In the following example, replace ``<APP_NAME>`` with the name of your app that you created in the previous steps.

```dotnetcli
func azure functionapp publish <APP_NAME>
```

Towards the end of the console output, the following lines should display:

```dotnetcli
...
Deployment completed successfully.
Syncing triggers...
Functions in <APP_NAME>:
    RandomNumber - [httpTrigger]
        Invoke url: https://<APP_NAME>.azurewebsites.net/api/randomnumber
...
```

## Call your Q# algorithm via Azure Functions

You can now test the function in the cloud.

1. Call the function by entering the function's URL in a browser:

    ```text
    https://<APP_NAME>.azurewebsites.net/api/randomnumber
    ```

    This call should generate a random integer between 0 and 100. 100 is the maximum value, if no ``maxValue`` parameter is passed.

1. Call the function again, using the ``maxValue`` parameter:

    ```text
    https://<APP_NAME>.azurewebsites.net/api/randomnumber?maxValue=10
    ```

    This call should generate a random integer between 0 and 10.

## Next steps

- Now that you know how to publish Q# jobs using Azure Functions, you can try to publish other jobs from our [samples collection](https://github.com/microsoft/Quantum/tree/main/samples/azure-quantum) or try to publish your own job.
- When you are finished testing your job in a simulator environment, try using other targets available on Azure Quantum (for example, other quantum simulators or quantum hardware). For learning more about how to target quantum hardware, see the MS Learn Module [Run algorithms on quantum hardware by using Azure Quantum](/learn/modules/run-algorithms-quantum-hardware-azure-quantum/).
