---
author: bradben
description: Learn about the resources available on the Azure Quantum website.
ms.author: brbenefield
ms.date: 01/14/2025
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: get-started
no-loc: ['Q#', '$$v', target, targets]
title: Copilot in Azure Quantum
uid: microsoft.quantum.get-started.azure-quantum
---

# Copilot in Azure Quantum 

Get started with quantum computing, discover the latest quantum breakthroughs, and create and run quantum programs with the help of the Copilot in Azure Quantum on the [Azure Quantum website](https://quantum.microsoft.com/).

The Azure Quantum website features:

- **Copilot in Azure Quantum:** AI meets the world of quantum. Copilot in Azure Quantum is a generative AI assistant to help you learn and explore quantum computing.
- **Code in Azure Quantum:** Explore and run Q# code directly in your browser using the built-in code window and compiler, and submit your jobs to the in-memory simulator or the free [Quantinuum Emulator](xref:microsoft.quantum.providers.quantinuum#quantinuum-emulator-cloud-based). Use Copilot in Azure Quantum to explain Q# code and also generate code from your prompts.
- **Quantum Elements:** One of the most important applications of quantum computing is in the field of chemistry. Currently available in preview, Quantum Elements uses the Copilot in Azure Quantum to design, code, and render molecular models.
- **Quantum Katas:** [Hands-on tutorials](https://quantum.microsoft.com/tools/quantum-katas) that teach quantum computing concepts and the Q# programming language.
- **Code samples:** The Azure Quantum code library is a rich set of samples using Q#, Python, and Qiskit code to demonstrate quantum scenarios.
- **Quantum concepts:** From the basics of quantum theory to advanced techniques of quantum computing, the Concepts library is a crash course to bring you up to speed on quantum computing. 
- **Videos:** Browse the video library for interviews with leading quantum computing researchers and innovators.
- **Azure Quantum blogs:** Stay up to date with the latest quantum computing research and innovations. 

All you need to start exploring Azure Quantum is a Microsoft (MSA) email account. You can create an MSA for free at [https://account.microsoft.com/](https://account.microsoft.com/).
 
## Run a Q# program 

To start exploring the Copilot and coding in Azure Quantum, use one of the samples from the **Quantum Samples** dropdown.

1. Navigate to [Code in Azure Quantum](https://quantum.microsoft.com/tools/quantum-coding) using any Microsoft (MSA) account.
1. Select **Quantum Samples** and then select **Random Number Generator**. The following code is copied to the code window. 

    ```qsharp
    /// # Sample
    /// Quantum Random Number Generator
    ///
    /// # Description
    /// This program implements a quantum random number generator by setting qubits
    /// in superposition and then using the measurement results as random bits.

    import Microsoft.Quantum.Measurement;
    import Microsoft.Quantum.Intrinsic;

    operation Main() : Result[] {
        // Generate 5-bit random number.
        let nBits = 5;
        return GenerateNRandomBits(nBits);
    }

    /// # Summary
    /// Generates N random bits.
    operation GenerateNRandomBits(nBits : Int) : Result[] {
        // Allocate N qubits.
        use register = Qubit[nBits];

        // Set the qubits into superposition of 0 and 1 using the Hadamard
        // operation `H`.
        for qubit in register {
            H(qubit);
        }

        // At this point each has 50% chance of being measured in the |0〉 state
        // and 50% chance of being measured in the |1〉 state.
        // Measure each qubit and reset them all so they can be safely deallocated.
        let results = MeasureEachZ(register);
        ResetAll(register);
        return results;
    }
    ```

1. Select **In-Memory Simulator**. 
1. Select **Run**.

- The results are displayed in the **Results** field, and a histogram of the results is displayed below the code window. 
- You can move the slider for **Select number of shots** to specify how many times the program is run.
- The **Shots** field displays the result for each shot. 

To run your program again using a different simulator:

1. Select the **In-Memory Simulator** dropdown and select **Quantinuum Emulator**. 
1. Select the number of shots (currently limited to 20) and select **Run**. 

- The job status is displayed at the top of the code window.
- A histogram of the results is displayed below the code window. Results for each shot aren't currently available with the Quantinuum Emulator.  

### Prompting the Copilot

- In the code window, select **Explain code** to prompt the Copilot in Azure Quantum to generate an analysis of the code sample.

You can prompt the Copilot in Azure Quantum for almost anything quantum related, for example:

- "Explain the MResetZ operation"
- "Write Q# code that entangles two qubits"
- "Explain quantum interference"

### Open your code sample on VS Code for the Web

To explore the sample code further, you can easily open the code in [VS Code for the Web](https://vscode.dev/quantum) and take advantage of features such as improved error messaging, Q# syntax highlighting, and integrated debugging. If you already have an Azure account set up, you can connect directly to your Azure Quantum workspaces from VS Code. 

To open your code in VS Code for the Web:

1. Select the VS Code icon on the bottom of the code window.
  
    :::image type="content" source="media/launch-vs-code.png" alt-text="Screenshot of the icon to launch VS Code.":::


## Next steps

You can also run quantum programs using the Azure portal or by setting up a local development environment. 

- [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace) 
- [Get started with an Azure Quantum notebook](xref:microsoft.quantum.get-started.notebooks) 
- [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)
